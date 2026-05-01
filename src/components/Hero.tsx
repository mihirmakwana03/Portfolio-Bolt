import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, MapPin, Mail } from 'lucide-react';
import ProfilePhoto from './ProfilePhoto';
import HeroCanvas from './HeroCanvas';

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/10 via-[#0B0B0F] to-[#22C55E]/10" />

      <HeroCanvas />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#6366F1]/20 rounded-full filter blur-[128px]" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#22C55E]/15 rounded-full filter blur-[128px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1 lg:order-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] text-sm font-medium">
                <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
                Available for opportunities
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
            >
              <span className="block text-[#E5E7EB]">Mihir</span>
              <span className="block text-[#E5E7EB]">Makwana</span>
              <span className="block text-2xl sm:text-4xl lg:text-5xl bg-gradient-to-r from-[#6366F1] to-[#22C55E] bg-clip-text text-transparent mt-2">
                AI Engineer · Computer Vision
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-4 text-sm text-[#9CA3AF] mb-6"
            >
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-[#6366F1]" />
                London, UK
              </span>
              <span className="flex items-center gap-1.5 break-all">
                <Mail size={14} className="text-[#22C55E] shrink-0" />
                mihirpmakwana786@gmail.com
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-base sm:text-lg text-[#9CA3AF] mb-8 sm:mb-10 leading-relaxed max-w-xl"
            >
              MSc Artificial Intelligence student at Kingston University, London, with
              hands-on computer vision and deep learning experience. Full-stack background
              in MERN and Laravel from a year of production work. Currently seeking AI/ML
              internships in London — with the engineering skills to take models from
              notebook to deployed product.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="flex flex-wrap gap-3 mb-8 sm:mb-10"
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="group px-5 sm:px-7 py-3 sm:py-3.5 bg-gradient-to-r from-[#6366F1] to-[#22C55E] text-white rounded-lg font-medium hover:shadow-xl hover:shadow-[#6366F1]/30 transition-all duration-300 flex items-center gap-2 text-sm sm:text-base"
              >
                View Projects
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-5 sm:px-7 py-3 sm:py-3.5 bg-white/5 backdrop-blur-sm text-[#E5E7EB] rounded-lg font-medium border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-sm sm:text-base"
              >
                Contact Me
              </button>
              <a
                href="/Mihir_Makwana_CV.pdf"
                download="Mihir_Makwana_CV.pdf"
                className="px-5 sm:px-7 py-3 sm:py-3.5 bg-white/5 backdrop-blur-sm text-[#E5E7EB] rounded-lg font-medium border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center gap-2 text-sm sm:text-base"
              >
                <Download size={16} />
                Download CV
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex items-center gap-4"
            >
              <a
                href="https://github.com/mihirmakwana03"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-[#9CA3AF] hover:text-[#E5E7EB] hover:border-[#6366F1]/50 hover:bg-[#6366F1]/10 transition-all duration-300"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/mihir-makwana-a098a21b7/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-[#9CA3AF] hover:text-[#E5E7EB] hover:border-[#22C55E]/50 hover:bg-[#22C55E]/10 transition-all duration-300"
              >
                <Linkedin size={20} />
              </a>
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
              <span className="text-xs text-[#6B7280] font-mono">MCA · CGPA 9.27</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, type: 'spring', stiffness: 80 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              <ProfilePhoto size="lg" animate={true} />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-4 -left-2 sm:-left-8 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#0B0B0F]/90 backdrop-blur-sm border border-white/10 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
                  <span className="text-[#E5E7EB] text-xs font-medium">Open to Work</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="absolute -top-2 -right-2 sm:-right-8 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#0B0B0F]/90 backdrop-blur-sm border border-white/10 shadow-xl"
              >
                <div className="text-center">
                  <div className="text-[#22C55E] text-lg font-bold leading-none">9.27</div>
                  <div className="text-[#9CA3AF] text-[10px] mt-0.5">CGPA</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="hidden sm:block absolute top-1/2 -translate-y-1/2 -right-14 px-3 py-2 rounded-xl bg-[#0B0B0F]/90 backdrop-blur-sm border border-white/10 shadow-xl"
              >
                <div className="text-center">
                  <div className="text-[#6366F1] text-lg font-bold leading-none">2+</div>
                  <div className="text-[#9CA3AF] text-[10px] mt-0.5">Years exp</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-[#6366F1]/50 rounded-full flex justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-[#6366F1] rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
