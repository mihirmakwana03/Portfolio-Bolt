import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Journey', id: 'journey' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0B0F]/80 backdrop-blur-lg border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.button
            type="button"
            onClick={() => scrollToSection('hero')}
            className="text-xl font-bold bg-gradient-to-r from-[#6366F1] to-[#22C55E] bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Home — scroll to top"
          >
            MM
          </motion.button>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors text-sm"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <a
              href="https://github.com/mihirmakwana03"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors"
              aria-label="GitHub profile (opens in new tab)"
            >
              <Github size={18} aria-hidden />
            </a>
            <a
              href="https://www.linkedin.com/in/mihir-makwana-a098a21b7/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors"
              aria-label="LinkedIn profile (opens in new tab)"
            >
              <Linkedin size={18} aria-hidden />
            </a>
            <a
              href="mailto:mihirpmakwana786@gmail.com"
              className="text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors"
              aria-label="Email Mihir Makwana"
            >
              <Mail size={18} aria-hidden />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[#E5E7EB]"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isMobileMenuOpen ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <motion.div
          id="mobile-navigation-menu"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-[#0B0B0F]/95 backdrop-blur-lg border-t border-white/5"
          role="region"
          aria-label="Site sections"
        >
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors py-2"
              >
                {item.label}
              </button>
            ))}
            <div className="flex items-center space-x-4 pt-4 border-t border-white/5">
              <a
                href="https://github.com/mihirmakwana03"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors"
                aria-label="GitHub profile (opens in new tab)"
              >
                <Github size={20} aria-hidden />
              </a>
              <a
                href="https://www.linkedin.com/in/mihir-makwana-a098a21b7/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors"
                aria-label="LinkedIn profile (opens in new tab)"
              >
                <Linkedin size={20} aria-hidden />
              </a>
              <a
                href="mailto:mihirpmakwana786@gmail.com"
                className="text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors"
                aria-label="Email Mihir Makwana"
              >
                <Mail size={20} aria-hidden />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navigation;
