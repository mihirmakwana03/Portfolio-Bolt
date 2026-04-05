import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, User, Code, Briefcase, Mail, BookOpen, Map,
  Github, Linkedin, Download, X, ArrowRight, Star, Zap,
} from 'lucide-react';

interface Command {
  id: string;
  label: string;
  description?: string;
  icon: React.ElementType;
  action: () => void;
  group: string;
  shortcut?: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const CommandPalette = ({ isOpen, onClose }: CommandPaletteProps) => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    onClose();
  };

  const commands: Command[] = [
    { id: 'hero', label: 'Go to Home', icon: Star, action: () => scrollTo('hero'), group: 'Navigation', shortcut: 'G H' },
    { id: 'about', label: 'Go to About', icon: User, action: () => scrollTo('about'), group: 'Navigation', shortcut: 'G A' },
    { id: 'skills', label: 'Go to Skills', icon: Zap, action: () => scrollTo('skills'), group: 'Navigation', shortcut: 'G S' },
    { id: 'projects', label: 'Go to Projects', icon: Code, action: () => scrollTo('projects'), group: 'Navigation', shortcut: 'G P' },
    { id: 'journey', label: 'Go to Journey', icon: Map, action: () => scrollTo('journey'), group: 'Navigation', shortcut: 'G J' },
    { id: 'contact', label: 'Go to Contact', icon: Mail, action: () => scrollTo('contact'), group: 'Navigation', shortcut: 'G C' },
    { id: 'blog', label: 'Go to Blog', icon: BookOpen, action: () => scrollTo('blog'), group: 'Navigation' },
    {
      id: 'github', label: 'Open GitHub Profile', description: 'github.com/mihirmakwana03',
      icon: Github, action: () => { window.open('https://github.com/mihirmakwana03', '_blank'); onClose(); },
      group: 'Links',
    },
    {
      id: 'linkedin', label: 'Open LinkedIn', description: 'linkedin.com/in/mihir-makwana',
      icon: Linkedin, action: () => { window.open('https://www.linkedin.com/in/mihir-makwana-a098a21b7/', '_blank'); onClose(); },
      group: 'Links',
    },
    {
      id: 'email', label: 'Send Email', description: 'mihirpmakwana786@gmail.com',
      icon: Mail, action: () => { window.location.href = 'mailto:mihirpmakwana786@gmail.com'; onClose(); },
      group: 'Links',
    },
    {
      id: 'resume', label: 'Download Resume', icon: Download,
      action: () => { const a = document.createElement('a'); a.href = '/Mihir_Makwana_CV.pdf'; a.download = 'Mihir_Makwana_CV.pdf'; a.click(); onClose(); },
      group: 'Actions',
    },
    {
      id: 'theme', label: 'View Projects', description: 'Browse all portfolio projects',
      icon: Briefcase, action: () => scrollTo('projects'), group: 'Actions',
    },
  ];

  const filtered = query.trim()
    ? commands.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.description?.toLowerCase().includes(query.toLowerCase()) ||
          c.group.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  const groups = Array.from(new Set(filtered.map((c) => c.group)));

  const flatFiltered = groups.flatMap((g) => filtered.filter((c) => c.group === g));

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, flatFiltered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        flatFiltered[selected]?.action();
      } else if (e.key === 'Escape') {
        onClose();
      }
    },
    [isOpen, flatFiltered, selected, onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${selected}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [selected]);

  let globalIdx = -1;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15, type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed top-[15vh] left-1/2 -translate-x-1/2 w-full max-w-xl z-[101] px-4"
          >
            <div className="bg-[#111118] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
                <Search className="w-5 h-5 text-[#6B7280] flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search commands, pages, links..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent text-[#E5E7EB] placeholder-[#4B5563] outline-none text-sm"
                />
                {query && (
                  <button onClick={() => setQuery('')} className="text-[#6B7280] hover:text-[#E5E7EB] transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                )}
                <kbd className="hidden sm:block px-2 py-0.5 text-[10px] text-[#6B7280] bg-white/5 border border-white/10 rounded font-mono">
                  ESC
                </kbd>
              </div>

              <div ref={listRef} className="max-h-80 overflow-y-auto overscroll-contain">
                {flatFiltered.length === 0 ? (
                  <div className="py-12 text-center text-[#6B7280] text-sm">
                    No results for "{query}"
                  </div>
                ) : (
                  groups.map((group) => {
                    const items = filtered.filter((c) => c.group === group);
                    return (
                      <div key={group}>
                        <div className="px-4 py-2 text-[10px] font-semibold text-[#4B5563] uppercase tracking-widest">
                          {group}
                        </div>
                        {items.map((cmd) => {
                          globalIdx++;
                          const idx = globalIdx;
                          const isActive = idx === selected;
                          return (
                            <button
                              key={cmd.id}
                              data-idx={idx}
                              onClick={cmd.action}
                              onMouseEnter={() => setSelected(idx)}
                              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                                isActive ? 'bg-[#6366F1]/15' : 'hover:bg-white/5'
                              }`}
                            >
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                isActive ? 'bg-[#6366F1]/20' : 'bg-white/5'
                              }`}>
                                <cmd.icon className={`w-4 h-4 ${isActive ? 'text-[#6366F1]' : 'text-[#9CA3AF]'}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className={`text-sm font-medium ${isActive ? 'text-[#E5E7EB]' : 'text-[#D1D5DB]'}`}>
                                  {cmd.label}
                                </div>
                                {cmd.description && (
                                  <div className="text-xs text-[#6B7280] truncate">{cmd.description}</div>
                                )}
                              </div>
                              {cmd.shortcut && (
                                <div className="flex items-center gap-1">
                                  {cmd.shortcut.split(' ').map((k, i) => (
                                    <kbd key={i} className="px-1.5 py-0.5 text-[10px] text-[#6B7280] bg-white/5 border border-white/10 rounded font-mono">
                                      {k}
                                    </kbd>
                                  ))}
                                </div>
                              )}
                              {isActive && <ArrowRight className="w-3.5 h-3.5 text-[#6366F1] flex-shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })
                )}
              </div>

              <div className="px-4 py-2 border-t border-white/5 flex items-center gap-4 text-[10px] text-[#4B5563]">
                <span className="flex items-center gap-1"><kbd className="bg-white/5 border border-white/10 rounded px-1 font-mono">↑↓</kbd> navigate</span>
                <span className="flex items-center gap-1"><kbd className="bg-white/5 border border-white/10 rounded px-1 font-mono">↵</kbd> select</span>
                <span className="flex items-center gap-1"><kbd className="bg-white/5 border border-white/10 rounded px-1 font-mono">ESC</kbd> close</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
