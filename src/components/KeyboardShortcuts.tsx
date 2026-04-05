import { motion, AnimatePresence } from 'framer-motion';
import { X, Keyboard } from 'lucide-react';

interface ShortcutGroup {
  title: string;
  shortcuts: { keys: string[]; description: string }[];
}

interface KeyboardShortcutsProps {
  isOpen: boolean;
  onClose: () => void;
}

const KeyboardShortcuts = ({ isOpen, onClose }: KeyboardShortcutsProps) => {
  const groups: ShortcutGroup[] = [
    {
      title: 'General',
      shortcuts: [
        { keys: ['⌘', 'K'], description: 'Open command palette' },
        { keys: ['?'], description: 'Show keyboard shortcuts' },
        { keys: ['Esc'], description: 'Close any overlay' },
      ],
    },
    {
      title: 'Navigation',
      shortcuts: [
        { keys: ['G', 'H'], description: 'Go to Home' },
        { keys: ['G', 'A'], description: 'Go to About' },
        { keys: ['G', 'S'], description: 'Go to Skills' },
        { keys: ['G', 'P'], description: 'Go to Projects' },
        { keys: ['G', 'J'], description: 'Go to Journey' },
        { keys: ['G', 'C'], description: 'Go to Contact' },
      ],
    },
    {
      title: 'Actions',
      shortcuts: [
        { keys: ['G', 'G'], description: 'Open GitHub profile' },
        { keys: ['G', 'L'], description: 'Open LinkedIn' },
        { keys: ['D', 'R'], description: 'Download resume' },
      ],
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15, type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-[101] px-4"
          >
            <div className="bg-[#111118] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Keyboard className="w-5 h-5 text-[#6366F1]" />
                  <span className="text-[#E5E7EB] font-semibold">Keyboard Shortcuts</span>
                </div>
                <button
                  onClick={onClose}
                  className="text-[#6B7280] hover:text-[#E5E7EB] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                {groups.map((group) => (
                  <div key={group.title}>
                    <div className="text-xs font-semibold text-[#4B5563] uppercase tracking-widest mb-3">
                      {group.title}
                    </div>
                    <div className="space-y-2">
                      {group.shortcuts.map((s) => (
                        <div
                          key={s.description}
                          className="flex items-center justify-between py-1.5"
                        >
                          <span className="text-sm text-[#9CA3AF]">{s.description}</span>
                          <div className="flex items-center gap-1">
                            {s.keys.map((k, i) => (
                              <span key={i} className="flex items-center gap-1">
                                <kbd className="px-2 py-1 text-xs text-[#E5E7EB] bg-white/5 border border-white/10 rounded font-mono min-w-[28px] text-center">
                                  {k}
                                </kbd>
                                {i < s.keys.length - 1 && (
                                  <span className="text-[#4B5563] text-xs">+</span>
                                )}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default KeyboardShortcuts;
