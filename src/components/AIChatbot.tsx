import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Minimize2, Copy, RotateCcw } from "lucide-react";
import { pipeline, env } from "@xenova/transformers";
import ReactMarkdown from "react-markdown";

// Tell Transformers.js to fetch models from HuggingFace CDN, not localhost
env.allowLocalModels = false;
env.useBrowserCache = true; // cache in IndexedDB so it only downloads once

interface SourceInfo {
  id: string;
  source: string;
  title: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
  sources?: SourceInfo[];
  isStreaming?: boolean;
}

// Retrieval-based answer flow: load local KB, embed the question in-browser,
// rank chunks by cosine similarity and call the serverless LLM handler.
interface KBChunk {
  id: string;
  source: string;
  title: string;
  text: string;
  embedding: number[];
}

interface KnowledgeBase {
  chunks: KBChunk[];
}

interface EmbeddingOutput {
  data: Float32Array | number[] | unknown;
}

const BASE_SIMILARITY_THRESHOLD = 0.3;
const HISTORY_AWARE_THRESHOLD = 0.2;
const NO_CONTEXT_REPLY =
  "I don't have information about that on Mihir's portfolio. Try the contact form to ask him directly.";

// Topic-based follow-up suggestions
const topicSuggestions: Record<string, string[]> = {
  "01-bio.md": ["Tell me more about Mihir", "What are his main interests?"],
  "02-education.md": ["What degrees does he have?", "Where did he study?"],
  "03-experience.md": ["What are his previous roles?", "Tell me about his internships"],
  "04-projects.md": ["Tell me about another project", "What was the tech stack?"],
  "05-skills.md": ["What technologies does he know?", "What are his strongest skills?"],
  "06-cv-extract.md": ["What's his professional background?", "Can you summarize his career?"],
  "07-faq.md": ["Any other questions?", "How can I contact him?"],
};

type Embedder = (
  text: string,
  options: { pooling: "mean"; normalize: true },
) => Promise<EmbeddingOutput>;

let kb: KnowledgeBase | null = null;
let embedder: Embedder | null = null;

// Anonymous question logging (no IP, no PII)
async function logQuestion(question: string) {
  try {
    const hash = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(question)
    );
    const hashHex = Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    
    // Store anonymously hashed unique questions via serverless
    await fetch("/api/log-question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionHash: hashHex }),
    }).catch(() => {
      // Silently fail if logging endpoint unavailable
    });
  } catch {
    // Ignore logging errors
  }
}

async function ensureLoaded() {
  if (!kb) {
    const res = await fetch("/kb.json");
    if (!res.ok) throw new Error(`kb.json fetch failed: ${res.status}`);
    kb = await res.json();
  }
  if (!embedder) {
    embedder = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2",
    );
  }
}

function cosine(a: number[], b: number[]) {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s; // embeddings are normalized
}

async function answerQuestion(
  question: string,
  history: Message[],
  onToken: (token: string) => void,
  onSources?: (sources: SourceInfo[]) => void,
  onStage?: (stage: "searching" | "generating") => void,
): Promise<void> {
  await ensureLoaded();
  if (!embedder || !kb) {
    throw new Error("Knowledge base failed to load");
  }

  onStage?.("searching");

  const q = await embedder(question, { pooling: "mean", normalize: true });
  const qVec = Array.from(q.data as ArrayLike<number>);

  const chatHistory = history
    .filter((msg) => msg.id !== "0")
    .slice(-4) // last 2 turns
    .map((msg) => ({
      role: msg.role === "user" ? "user" : "assistant",
      content: msg.text,
    }));

  const similarityThreshold =
    chatHistory.length > 0 ? HISTORY_AWARE_THRESHOLD : BASE_SIMILARITY_THRESHOLD;

  const scored = kb.chunks
    .map((chunk) => ({ ...chunk, score: cosine(qVec, chunk.embedding) }))
    .sort((a, b) => b.score - a.score);

  const topScore = scored[0]?.score ?? -1;
  const maxChunks = topScore >= 0.55 ? 2 : topScore >= 0.4 ? 3 : 4;

  const ranked = scored
    .filter((chunk) => chunk.score > similarityThreshold)
    .slice(0, maxChunks);

  if (ranked.length === 0) {
    onSources?.([]);
    onToken(NO_CONTEXT_REPLY);
    return;
  }

  if (onSources) {
    onSources(ranked.map((chunk) => ({
      id: chunk.id,
      source: chunk.source,
      title: chunk.title,
    })));
  }

  const context = ranked.map((chunk) => chunk.text).join("\n\n---\n\n");
  if (onStage) onStage("generating");

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, context, history: chatHistory }),
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  if (!res.body) {
    throw new Error("No response body");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines[lines.length - 1];

      for (const line of lines.slice(0, -1)) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6);
          if (data === "[DONE]") break;

          try {
            const parsed = JSON.parse(data);
            const token =
              parsed.choices?.[0]?.delta?.content ?? "";
            if (token) onToken(token);
          } catch {
            // ignore JSON parse errors
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      role: "assistant",
      text: "Hi! This is the Quick Q&A for Mihir's portfolio. Ask me anything about his skills, experience, projects, or how to get in touch!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loadingStage, setLoadingStage] = useState<"searching" | "generating" | null>(null);
  const [dynamicSuggestions, setDynamicSuggestions] = useState<string[]>([]);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setMessages([
      {
        id: "0",
        role: "assistant",
        text: "Hi! This is the Quick Q&A for Mihir's portfolio. Ask me anything about his skills, experience, projects, or how to get in touch!",
        timestamp: new Date(),
      },
    ]);
    setInput("");
    setDynamicSuggestions([]);
    setLoadingStage(null);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, isOpen, isMinimized]);

  const send = async () => {
    const text = input.trim();
    if (!text) return;

    // Log anonymous question (hash-based, no PII)
    logQuestion(text);

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text,
      timestamp: new Date(),
    };
    const assistantMsgId = (Date.now() + 1).toString();

    // Add user message only; create the assistant bubble when the first token arrives
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setDynamicSuggestions([]);

    try {
      let sources: SourceInfo[] = [];
      // Stream tokens into the assistant message
      await answerQuestion(
        text,
        messages,
        (token: string) => {
          setLoadingStage(null);
          setMessages((m) =>
            m.some((msg) => msg.id === assistantMsgId)
              ? m.map((msg) =>
                  msg.id === assistantMsgId
                    ? { ...msg, text: msg.text + token, isStreaming: true }
                    : msg,
                )
              : [
                  ...m,
                  {
                    id: assistantMsgId,
                    role: "assistant",
                    text: token,
                    timestamp: new Date(),
                    isStreaming: true,
                    ...(sources.length > 0 ? { sources } : {}),
                  },
                ],
          );
        },
        (srcs: SourceInfo[]) => {
          sources = srcs;
          setMessages((m) =>
            m.some((msg) => msg.id === assistantMsgId)
              ? m.map((msg) =>
                  msg.id === assistantMsgId ? { ...msg, sources: srcs } : msg,
                )
              : m,
          );
        },
        (stage: "searching" | "generating") => {
          setLoadingStage(stage);
        },
      );

      // Set dynamic follow-up suggestions based on source documents
      if (sources.length > 0) {
        const topicKey = sources[0].source;
        const suggestions = topicSuggestions[topicKey] || [];
        setDynamicSuggestions(suggestions.slice(0, 3));
      }

      setMessages((m) =>
        m.map((msg) =>
          msg.id === assistantMsgId ? { ...msg, isStreaming: false } : msg,
        ),
      );
    } catch (err) {
      console.error("Chat error:", err);
      setLoadingStage(null);
      setMessages((m) =>
        m.some((msg) => msg.id === assistantMsgId)
          ? m.map((msg) =>
              msg.id === assistantMsgId
                ? {
                    ...msg,
                    text: `Sorry, I couldn't fetch an answer right now. ${err instanceof Error ? err.message : String(err)}`,
                    isStreaming: false,
                  }
                : msg,
            )
          : [
              ...m,
              {
                id: assistantMsgId,
                role: "assistant",
                text: `Sorry, I couldn't fetch an answer right now. ${err instanceof Error ? err.message : String(err)}`,
                timestamp: new Date(),
                isStreaming: false,
              },
            ],
      );
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{
              duration: 0.2,
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
            className="fixed bottom-20 sm:bottom-24 right-2 left-2 sm:left-auto sm:right-6 sm:w-full sm:max-w-sm z-50"
          >
            <div className="bg-[#111118] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden flex flex-col h-[70vh] max-h-[480px] sm:h-[480px]">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-[#0D0D14]">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#22C55E] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#E5E7EB]">
                    Quick Q&A
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse" />
                    <span className="text-[10px] text-[#6B7280]">
                      Llama 3.3 70B · RAG
                    </span>
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm("Clear conversation?")) {
                        reset();
                      }
                    }}
                    className="p-1.5 text-[#6B7280] hover:text-[#E5E7EB] transition-colors rounded-lg hover:bg-white/5"
                    aria-label="Reset conversation"
                    title="Clear chat history"
                  >
                    <RotateCcw className="w-4 h-4" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsMinimized(true)}
                    className="p-1.5 text-[#6B7280] hover:text-[#E5E7EB] transition-colors rounded-lg hover:bg-white/5"
                    aria-label="Minimize chat"
                  >
                    <Minimize2 className="w-4 h-4" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 text-[#6B7280] hover:text-[#E5E7EB] transition-colors rounded-lg hover:bg-white/5"
                    aria-label="Close chat"
                  >
                    <X className="w-4 h-4" aria-hidden />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#6366F1] to-[#22C55E] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div className="flex flex-col gap-1.5 group">
                      <div className={`relative max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "bg-[#6366F1] text-white rounded-br-sm whitespace-pre-line"
                            : "bg-white/5 border border-white/10 text-[#D1D5DB] rounded-bl-sm prose prose-invert prose-sm"
                        }`}
                      >
                        {msg.role === "assistant" && !msg.isStreaming ? (
                          <ReactMarkdown>{msg.text}</ReactMarkdown>
                        ) : (
                          msg.text
                        )}
                        {msg.role === "assistant" && msg.text && (
                          <button
                            type="button"
                            onClick={() => copyToClipboard(msg.text)}
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-white/10"
                            title="Copy answer"
                            aria-label="Copy message"
                          >
                            <Copy className="w-3 h-3 text-[#9CA3AF]" />
                          </button>
                        )}
                      </div>
                      {msg.role === "assistant" && msg.sources && msg.sources.length > 0 && (
                        <div className="flex gap-1.5 flex-wrap">
                          {msg.sources.map((s) => (
                            <span
                              key={s.id}
                              className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#9CA3AF] hover:text-[#D1D5DB] hover:border-white/20 transition-colors cursor-help"
                              title={s.title}
                            >
                              📄 {s.source.replace(/\.md$/, "")}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    {msg.role === "user" && (
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <User className="w-3 h-3 text-[#9CA3AF]" />
                      </div>
                    )}
                  </div>
                ))}

                {loadingStage && (
                  <div className="flex gap-2 justify-start">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#6366F1] to-[#22C55E] flex items-center justify-center flex-shrink-0 mt-0.5 animate-pulse">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed bg-white/5 border border-white/10 text-[#D1D5DB] rounded-bl-sm">
                        {loadingStage === "searching" ? "🔍 Searching knowledge base..." : "⚡ Generating answer..."}
                      </div>
                    </div>
                  </div>
                )}

                <div ref={endRef} />
              </div>

              {messages.length === 1 ? (
                <div className="px-4 pb-2 flex flex-wrap gap-2">
                  {[
                    "What are your skills?",
                    "Tell me about your projects",
                    "How can I contact you?",
                    "What is your education?",
                  ].map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setInput(s);
                        setTimeout(send, 50);
                      }}
                      className="text-xs px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[#9CA3AF] hover:text-[#E5E7EB] hover:border-[#6366F1]/50 transition-all"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              ) : dynamicSuggestions.length > 0 ? (
                <div className="px-4 pb-2 flex flex-wrap gap-2">
                  {dynamicSuggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setInput(s);
                        setTimeout(send, 50);
                      }}
                      className="text-xs px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[#9CA3AF] hover:text-[#E5E7EB] hover:border-[#6366F1]/50 transition-all"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              ) : null}

              <div className="px-4 py-3 border-t border-white/10 flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask me anything..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-[#E5E7EB] placeholder-[#4B5563] outline-none focus:border-[#6366F1]/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={send}
                  disabled={!input.trim()}
                  className="w-9 h-9 bg-gradient-to-r from-[#6366F1] to-[#22C55E] rounded-xl flex items-center justify-center disabled:opacity-40 hover:shadow-lg hover:shadow-[#6366F1]/20 transition-all flex-shrink-0"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4 text-white" aria-hidden />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => {
          if (isOpen && !isMinimized) setIsOpen(false);
          else {
            setIsOpen(true);
            setIsMinimized(false);
          }
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 bg-gradient-to-br from-[#6366F1] to-[#22C55E] rounded-2xl shadow-xl shadow-[#6366F1]/30 flex items-center justify-center"
        onMouseEnter={() => {
          void ensureLoaded();
        }}
        onTouchStart={() => {
          void ensureLoaded();
        }}
        aria-label={
          isOpen && !isMinimized
            ? "Close Quick Q&A"
            : isOpen && isMinimized
              ? "Restore Quick Q&A"
              : "Open Quick Q&A"
        }
        aria-expanded={isOpen && !isMinimized}
      >
        <AnimatePresence mode="wait">
          {isOpen && !isMinimized ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6 text-white" aria-hidden />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="w-6 h-6 text-white" aria-hidden />
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="absolute -top-1 -right-1 w-3 h-3 bg-[#22C55E] rounded-full border-2 border-[#0B0B0F]"
          />
        )}
      </motion.button>
    </>
  );
};

export default AIChatbot;
