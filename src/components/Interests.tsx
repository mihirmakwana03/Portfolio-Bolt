import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Laptop, Book, Globe, Sparkles, Music, Trophy } from 'lucide-react';

const Interests = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const interests = [
    {
      icon: Laptop,
      title: 'Technology',
      description: 'Exploring emerging tech, AI, and software innovations',
      gradient: 'from-[#6366F1] to-[#8B5CF6]',
    },
    {
      icon: Book,
      title: 'History',
      description: 'Understanding past civilizations and historical events',
      gradient: 'from-[#8B5CF6] to-[#EC4899]',
    },
    {
      icon: Globe,
      title: 'Geopolitics',
      description: 'Following global affairs and international relations',
      gradient: 'from-[#EC4899] to-[#F59E0B]',
    },
    {
      icon: Sparkles,
      title: 'Space',
      description: 'Fascinated by cosmos, astronomy, and space exploration',
      gradient: 'from-[#F59E0B] to-[#10B981]',
    },
    {
      icon: Music,
      title: 'Guitar',
      description: 'Playing guitar and appreciating diverse music',
      gradient: 'from-[#10B981] to-[#22C55E]',
    },
    {
      icon: Trophy,
      title: 'Sports',
      description: 'Following cricket, football, and athletic achievements',
      gradient: 'from-[#22C55E] to-[#6366F1]',
    },
  ];

  return (
    <section id="interests" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#6366F1]/10 rounded-full filter blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-[#22C55E]/10 rounded-full filter blur-[128px] animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#6366F1] font-medium text-sm tracking-wider uppercase">
            Beyond Code
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#E5E7EB] mt-4 mb-6">
            Interests & Passions
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#6366F1] to-[#22C55E] mx-auto rounded-full" />
          <p className="text-[#9CA3AF] mt-6 max-w-2xl mx-auto">
            Diverse interests fuel creativity and bring unique perspectives to problem-solving
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {interests.map((interest, index) => (
            <motion.div
              key={interest.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: 'spring',
                stiffness: 100,
              }}
              className="group relative p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#6366F1]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#6366F1]/20 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${interest.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

              <div className="relative z-10">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${interest.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <interest.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-bold text-[#E5E7EB] mb-2 group-hover:text-[#6366F1] transition-colors">
                  {interest.title}
                </h3>

                <p className="text-[#9CA3AF] text-sm leading-relaxed">
                  {interest.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 text-center"
        >
          <p className="text-[#9CA3AF] max-w-3xl mx-auto leading-relaxed">
            These diverse interests shape my approach to software development, bringing creativity,
            historical perspective, global awareness, and a passion for exploration to every project I build.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Interests;
