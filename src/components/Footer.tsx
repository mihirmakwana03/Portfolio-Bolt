import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative border-t border-white/5 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[#9CA3AF] text-sm">
            © {new Date().getFullYear()} Mihir Makwana. All rights reserved.
          </div>

          <div className="flex items-center gap-2 text-[#9CA3AF] text-sm">
            <span>Built with</span>
            <Heart size={16} className="text-[#6366F1] fill-[#6366F1] animate-pulse" />
            <span>and React</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
