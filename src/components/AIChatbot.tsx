import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Minimize2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

const PORTFOLIO_KNOWLEDGE = {
  name: 'Mihir Makwana',
  title: 'AI Engineer · CV',
  location: 'London, UK',
  email: 'mihirpmakwana786@gmail.com',
  github: 'https://github.com/mihirmakwana03',
  linkedin: 'https://www.linkedin.com/in/mihir-makwana-a098a21b7/',
  education: [
    { degree: 'MSc Artificial Intelligence', institution: 'Kingston University, London', year: 'Jan 2026 - Present' },
    { degree: 'Master of Computer Applications (MCA)', institution: 'ISTAR College, Anand', year: '2023-2025', cgpa: '9.27' },
    { degree: 'Bachelor of Computer Applications (BCA)', institution: 'SEMCOM College, Anand', year: '2020-2023', cgpa: '8.67' },
  ],
  experience: [
    { role: 'Web Developer & Digital Content Editor', company: 'HappinessFactors', period: 'Jan 2025 - Present', tech: ['Laravel', 'Groove.cm'] },
    { role: 'Full-Stack Development Intern', company: 'NTech Infoway', period: 'Dec 2024 - Apr 2025', tech: ['MongoDB', 'Express.js', 'React', 'Node.js'] },
  ],
  skills: {
    frontend: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    backend: ['Node.js', 'Express.js', 'Laravel', 'PHP'],
    database: ['MongoDB', 'PostgreSQL', 'MySQL', 'Supabase'],
    tools: ['Git', 'GitHub', 'VS Code', 'Jupyter', 'Postman', 'Docker (learning)'],
    ai: ['PyTorch', 'TensorFlow / Keras', 'scikit-learn', 'Python'],
  },
  projects: [
    { name: 'Growatt Infosystems Website', tech: 'MERN Stack', desc: 'Business platform for Growatt solar products' },
    { name: 'HappinessFactors Website', tech: 'Laravel', desc: 'Wellbeing services platform' },
    { name: 'Yoga Website', tech: 'React + Node.js', desc: 'Studio management system' },
    { name: 'E-Commerce Platform', tech: 'Laravel', desc: 'Full-featured online store' },
    { name: 'Online Job Portal', tech: 'React + Node.js', desc: 'Recruitment platform' },
  ],
  interests: ['AI/ML', 'Web Development', 'Open Source', 'History', 'Geopolitics'],
  availability: 'Open to opportunities',
};

// Retrieval-based answer flow: load local KB, embed the question in-browser,
// rank chunks by cosine similarity and call the serverless LLM handler.
let kb: any = null;
let embedder: any = null;

async function ensureLoaded() {
  if (!kb) {
    const res = await fetch('/kb.json');
    kb = await res.json();
  }
  if (!embedder) {
    // dynamic pipeline import to avoid bundling costs at module load
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { pipeline } = await import('@xenova/transformers');
    embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  }
}

function cosine(a: number[], b: number[]) {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s; // embeddings are normalized
}

async function answerQuestion(question: string): Promise<string> {
  await ensureLoaded();
  const q = await embedder(question, { pooling: 'mean', normalize: true });
  const qVec = Array.from(q.data) as number[];

  const ranked = kb.chunks
    .map((c: any) => ({ ...c, score: cosine(qVec, c.embedding) }))
    .sort((a: any, b: any) => b.score - a.score)
    .slice(0, 3);

  const context = ranked.map((c: any) => c.text).join('\n\n---\n\n');

  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, context }),
  });
  const data = await res.json();
  return data.answer ?? "I don't have that information about Mihir — try asking him directly via the contact form.";
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      text: "Hi! This is the Quick Q&A for Mihir's portfolio. Ask me anything about his skills, experience, projects, or how to get in touch!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, isOpen, isMinimized]);

  const send = async () => {
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text, timestamp: new Date() };
    setMessages((m) => [...m, userMsg]);
    setInput('');

    try {
      const reply = await answerQuestion(text);
      setMessages((m) => [...m, { id: (Date.now() + 1).toString(), role: 'assistant', text: reply, timestamp: new Date() }]);
    } catch (err) {
      setMessages((m) => [...m, { id: (Date.now() + 1).toString(), role: 'assistant', text: "Sorry — I couldn't fetch an answer right now.", timestamp: new Date() }]);
    }
  };

  const suggestions = ['What are your skills?', 'Tell me about your projects', 'How can I contact you?', 'What is your education?'];

  return (
    <>
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed bottom-20 sm:bottom-24 right-2 left-2 sm:left-auto sm:right-6 sm:w-full sm:max-w-sm z-50"
          >
            <div className="bg-[#111118] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden flex flex-col h-[70vh] max-h-[480px] sm:h-[480px]">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-[#0D0D14]">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#22C55E] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#E5E7EB]">Quick Q&A</div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse" />
                    <span className="text-[10px] text-[#6B7280]">Always online</span>
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-1">
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
                  <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'assistant' && (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#6366F1] to-[#22C55E] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-3 py-2 rounded-xl text-sm whitespace-pre-line leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[#6366F1] text-white rounded-br-sm'
                          : 'bg-white/5 border border-white/10 text-[#D1D5DB] rounded-bl-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                    {msg.role === 'user' && (
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <User className="w-3 h-3 text-[#9CA3AF]" />
                      </div>
                    )}
                  </div>
                ))}
                
                <div ref={endRef} />
              </div>

              {messages.length === 1 && (
                <div className="px-4 pb-2 flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => { setInput(s); setTimeout(send, 50); }}
                      className="text-xs px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[#9CA3AF] hover:text-[#E5E7EB] hover:border-[#6366F1]/50 transition-all"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              <div className="px-4 py-3 border-t border-white/10 flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask me anything..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && send()}
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
        aria-label={
          isOpen && !isMinimized
            ? 'Close Quick Q&A'
            : isOpen && isMinimized
              ? 'Restore Quick Q&A'
              : 'Open Quick Q&A'
        }
        aria-expanded={isOpen && !isMinimized}
      >
        <AnimatePresence mode="wait">
          {isOpen && !isMinimized ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6 text-white" aria-hidden />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
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
