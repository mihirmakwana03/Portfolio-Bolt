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
  title: 'Full Stack Developer',
  location: 'London, UK',
  email: 'mihirpmakwana786@gmail.com',
  github: 'https://github.com/mihirmakwana03',
  linkedin: 'https://www.linkedin.com/in/mihir-makwana-a098a21b7/',
  education: [
    { degree: 'MSc Artificial Intelligence', institution: 'Kingston University, London', year: 'Sep 2025 - Present' },
    { degree: 'Master of Computer Applications (MCA)', institution: 'ISTAR College, Anand', year: '2023-2025', cgpa: '9.27' },
    { degree: 'Bachelor of Computer Applications (BCA)', institution: 'SEMCOM College, Anand', year: '2020-2023', cgpa: '8.67' },
  ],
  experience: [
    { role: 'Web Developer & Digital Content Editor', company: 'HappinessFactors', period: 'Jan 2025 - Present', tech: ['Laravel', 'Groove.cm'] },
    { role: 'Full-Stack Development Intern', company: 'NTech Infoway', period: 'Dec 2024 - Apr 2025', tech: ['MongoDB', 'Express.js', 'React', 'Node.js'] },
  ],
  skills: {
    frontend: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    backend: ['Node.js', 'Express.js', 'Laravel', 'PHP'],
    database: ['MongoDB', 'PostgreSQL', 'MySQL', 'Supabase'],
    tools: ['Git', 'Docker', 'AWS', 'Vite', 'REST APIs'],
    ai: ['Machine Learning', 'Deep Learning', 'Python', 'TensorFlow'],
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

const getAnswer = (question: string): string => {
  const q = question.toLowerCase();

  if (/\b(hi|hello|hey|greet)\b/.test(q)) {
    return `Hello! I'm Mihir's AI assistant. I can answer questions about his skills, experience, projects, education, and more. What would you like to know?`;
  }

  if (/\b(name|who are you|who is|introduce)\b/.test(q)) {
    return `Mihir Makwana is a Full Stack Developer based in London, UK. He's an MSc AI student at Kingston University and an MCA graduate with a CGPA of 9.27. He specialises in MERN stack, Laravel, and modern web technologies.`;
  }

  if (/\b(location|based|where|city|country|london|uk)\b/.test(q)) {
    return `Mihir is currently based in London, UK where he's pursuing his MSc in Artificial Intelligence at Kingston University.`;
  }

  if (/\b(education|study|degree|university|college|msc|mca|bca|cgpa|gpa|academic)\b/.test(q)) {
    return `Mihir's education:\n• MSc Artificial Intelligence — Kingston University, London (Sep 2025 - Present)\n• MCA — ISTAR College, Anand (2023-2025, CGPA: 9.27)\n• BCA — SEMCOM College, Anand (2020-2023, CGPA: 8.67)`;
  }

  if (/\b(skill|tech|stack|language|framework|tool|know|use|expertise)\b/.test(q)) {
    return `Mihir's tech stack:\n\nFrontend: ${PORTFOLIO_KNOWLEDGE.skills.frontend.join(', ')}\nBackend: ${PORTFOLIO_KNOWLEDGE.skills.backend.join(', ')}\nDatabase: ${PORTFOLIO_KNOWLEDGE.skills.database.join(', ')}\nTools: ${PORTFOLIO_KNOWLEDGE.skills.tools.join(', ')}\nAI/ML: ${PORTFOLIO_KNOWLEDGE.skills.ai.join(', ')}`;
  }

  if (/\b(react|node|express|laravel|typescript|mongodb|postgresql|tailwind|next)\b/.test(q)) {
    return `Yes, Mihir is proficient with that technology! He uses React, Node.js, Express, Laravel, TypeScript, MongoDB, PostgreSQL, Tailwind CSS, and Next.js extensively across his projects.`;
  }

  if (/\b(project|build|made|portfolio|work|app)\b/.test(q)) {
    const list = PORTFOLIO_KNOWLEDGE.projects
      .map((p) => `• ${p.name} (${p.tech}) — ${p.desc}`)
      .join('\n');
    return `Mihir's notable projects:\n\n${list}\n\nScroll to the Projects section or check his GitHub for more details!`;
  }

  if (/\b(experience|job|work|intern|company|employ)\b/.test(q)) {
    return `Mihir's work experience:\n\n• Web Developer & Digital Content Editor at HappinessFactors (Jan 2025 - Present) — Laravel, Groove.cm\n\n• Full-Stack Development Intern at NTech Infoway (Dec 2024 - Apr 2025) — Built a MERN stack CRM system`;
  }

  if (/\b(contact|email|reach|hire|message)\b/.test(q)) {
    return `You can contact Mihir via:\n• Email: mihirpmakwana786@gmail.com\n• LinkedIn: linkedin.com/in/mihir-makwana-a098a21b7\n• Or use the Contact section on this portfolio!`;
  }

  if (/\b(github|open source|repo|code)\b/.test(q)) {
    return `Mihir's GitHub is at github.com/mihirmakwana03 — he actively contributes to projects and maintains open source repositories. You can view the GitHub contribution graph on this portfolio page!`;
  }

  if (/\b(linkedin|social|network)\b/.test(q)) {
    return `Mihir's LinkedIn profile: linkedin.com/in/mihir-makwana-a098a21b7 — feel free to connect with him there!`;
  }

  if (/\b(available|hire|freelance|opportunity|job|open to)\b/.test(q)) {
    return `Mihir is currently open to opportunities! He's available for full-stack development roles, internships, and freelance projects. Reach out via email at mihirpmakwana786@gmail.com.`;
  }

  if (/\b(interest|hobby|passion|like|enjoy)\b/.test(q)) {
    return `Outside coding, Mihir is passionate about AI/ML, Web Development, Open Source, History, and Geopolitics. These varied interests fuel his creative problem-solving approach.`;
  }

  if (/\b(ai|machine learning|ml|deep learning|artificial intelligence)\b/.test(q)) {
    return `Mihir is currently pursuing an MSc in Artificial Intelligence at Kingston University, London. His AI/ML skills include Machine Learning, Deep Learning, Python, and TensorFlow. It's a core area of his current focus!`;
  }

  if (/\b(resume|cv|download)\b/.test(q)) {
    return `You can download Mihir's resume/CV directly from this portfolio — look for the "Resume" button in the Hero section!`;
  }

  if (/\b(portfolio|website|built with|site|made with)\b/.test(q)) {
    return `This portfolio is built with React, TypeScript, Tailwind CSS, Framer Motion, Three.js (for the 3D background), and Supabase. It features live GitHub contribution data and this AI assistant!`;
  }

  return `I'm not sure about that specific question, but I can help you learn about Mihir's skills, education, work experience, projects, or how to contact him. What would you like to know?`;
};

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      text: "Hi! I'm Mihir's AI assistant. Ask me anything about his skills, experience, projects, or how to get in touch!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, isOpen, isMinimized]);

  const send = () => {
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text, timestamp: new Date() };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = getAnswer(text);
      setMessages((m) => [
        ...m,
        { id: (Date.now() + 1).toString(), role: 'assistant', text: reply, timestamp: new Date() },
      ]);
      setIsTyping(false);
    }, 600 + Math.random() * 400);
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
            className="fixed bottom-24 right-4 sm:right-6 w-full max-w-sm z-50"
          >
            <div className="bg-[#111118] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden flex flex-col"
              style={{ height: '480px' }}>
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-[#0D0D14]">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#22C55E] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#E5E7EB]">Portfolio Assistant</div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse" />
                    <span className="text-[10px] text-[#6B7280]">Always online</span>
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="p-1.5 text-[#6B7280] hover:text-[#E5E7EB] transition-colors rounded-lg hover:bg-white/5"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 text-[#6B7280] hover:text-[#E5E7EB] transition-colors rounded-lg hover:bg-white/5"
                  >
                    <X className="w-4 h-4" />
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
                {isTyping && (
                  <div className="flex gap-2 justify-start">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#6366F1] to-[#22C55E] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl rounded-bl-sm px-4 py-3">
                      <div className="flex gap-1 items-center">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                            className="w-1.5 h-1.5 bg-[#6B7280] rounded-full"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
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
                  onClick={send}
                  disabled={!input.trim()}
                  className="w-9 h-9 bg-gradient-to-r from-[#6366F1] to-[#22C55E] rounded-xl flex items-center justify-center disabled:opacity-40 hover:shadow-lg hover:shadow-[#6366F1]/20 transition-all flex-shrink-0"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => { setIsOpen(true); setIsMinimized(false); }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 bg-gradient-to-br from-[#6366F1] to-[#22C55E] rounded-2xl shadow-xl shadow-[#6366F1]/30 flex items-center justify-center"
        title="Chat with AI Assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen && !isMinimized ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="w-6 h-6 text-white" />
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
