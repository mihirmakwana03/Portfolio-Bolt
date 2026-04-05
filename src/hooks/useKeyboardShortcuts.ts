import { useEffect, useRef } from 'react';

type ShortcutHandler = () => void;

interface Shortcuts {
  onCommandPalette: ShortcutHandler;
  onShortcutsHelp: ShortcutHandler;
}

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

export const useKeyboardShortcuts = ({ onCommandPalette, onShortcutsHelp }: Shortcuts) => {
  const pendingKey = useRef<string | null>(null);
  const pendingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || (e.target as HTMLElement).isContentEditable) return;

      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onCommandPalette();
        return;
      }

      if (e.key === '?') {
        onShortcutsHelp();
        return;
      }

      if (pendingKey.current) {
        const combo = `${pendingKey.current}+${e.key.toLowerCase()}`;
        pendingKey.current = null;
        if (pendingTimer.current) clearTimeout(pendingTimer.current);

        switch (combo) {
          case 'g+h': scrollTo('hero'); break;
          case 'g+a': scrollTo('about'); break;
          case 'g+s': scrollTo('skills'); break;
          case 'g+p': scrollTo('projects'); break;
          case 'g+j': scrollTo('journey'); break;
          case 'g+c': scrollTo('contact'); break;
          case 'g+g': window.open('https://github.com/mihirmakwana03', '_blank'); break;
          case 'g+l': window.open('https://www.linkedin.com/in/mihir-makwana-a098a21b7/', '_blank'); break;
          case 'd+r': {
            const a = document.createElement('a');
            a.href = '/Mihir_Makwana_CV.pdf';
            a.download = 'Mihir_Makwana_CV.pdf';
            a.click();
            break;
          }
        }
        return;
      }

      if (['g', 'd'].includes(e.key.toLowerCase())) {
        pendingKey.current = e.key.toLowerCase();
        pendingTimer.current = setTimeout(() => {
          pendingKey.current = null;
        }, 1000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (pendingTimer.current) clearTimeout(pendingTimer.current);
    };
  }, [onCommandPalette, onShortcutsHelp]);
};
