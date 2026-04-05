import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Rocket, Heart, Target } from 'lucide-react';
import ProfilePhoto from './ProfilePhoto';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const highlights = [
    {
      icon: Code2,
      title: 'Clean Code',
      description: 'Writing maintainable and scalable solutions',
    },
    {
      icon: Rocket,
      title: 'Fast Learner',
      description: 'Constantly exploring new technologies',
    },
    {
      icon: Heart,
      title: 'Passionate',
      description: 'Love building products that matter',
    },
    {
      icon: Target,
      title: 'Goal-Oriented',
      description: 'Focused on delivering results',
    },
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F] via-[#0B0B0F]/50 to-[#0B0B0F]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#6366F1] font-medium text-sm tracking-wider uppercase">
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#E5E7EB] mt-4 mb-6">
            Crafting Digital Experiences
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#6366F1] to-[#22C55E] mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="flex items-center justify-center py-8">
              <ProfilePhoto size="md" animate={isInView} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-[#E5E7EB]">
              Building the Future, One Line at a Time
            </h3>
            <div className="space-y-4 text-[#9CA3AF] leading-relaxed">
              <p>
                I completed my Master of Computer Applications (MCA) at ISTAR College, Anand,
                with a CGPA of 9.27, and I'm now pursuing an MSc in Artificial Intelligence at
                Kingston University, London. My foundation was built during my BCA at SEMCOM
                College where I graduated with a CGPA of 8.67.
              </p>
              <p>
                My journey into software engineering began with curiosity about how things work.
                That curiosity has evolved into a passion for building real-world web applications
                using modern technologies across the full stack.
              </p>
              <p>
                I work as a Web Developer & Digital Content Editor at HappinessFactors,
                building with Laravel and Groove.cm. Previously, I interned at NTech Infoway where
                I developed a MERN stack CRM system. From crafting elegant frontends with React
                to architecting robust backends with Node.js and Laravel, I thrive on the complete
                product development lifecycle.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to
                open source, or diving into topics like AI, history and geopolitics. These diverse
                interests fuel my creativity and problem-solving approach.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="group p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#6366F1]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#6366F1]/20"
            >
              <item.icon className="w-8 h-8 text-[#6366F1] mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="text-[#E5E7EB] font-semibold mb-2">{item.title}</h4>
              <p className="text-[#9CA3AF] text-sm">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
