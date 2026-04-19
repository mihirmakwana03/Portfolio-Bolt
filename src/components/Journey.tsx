import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, BookOpen, Code, Rocket } from 'lucide-react';

const Journey = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const milestones = [
    {
      icon: GraduationCap,
      year: 'Jan 2026 – Jan 2028',
      title: 'MSc Artificial Intelligence',
      institution: 'Kingston University, London',
      description:
        'Specialising in computer vision and deep learning. Includes a Professional Placement year. Coursework covers CNNs, transfer learning, classical ML, and applied AI research.',
      color: 'from-[#6366F1] to-[#22C55E]',
      current: true,
    },
    {
      icon: Rocket,
      year: 'Jan 2025 – Nov 2025',
      title: 'Web Developer & Digital Content Editor (Freelance)',
      institution: 'HappinessFactors',
      description:
        'Built and maintained a Laravel website with Blade templates and Tailwind, integrated with Groove.cm for headless content management. Managed digital content strategy and platform integrations.',
      color: 'from-[#22C55E] to-[#6366F1]',
    },
    {
      icon: Code,
      year: 'Dec 2024 – Apr 2025',
      title: 'Full-Stack Development Intern',
      institution: 'NTech Infoway',
      description:
        'Built a MERN-stack CRM for Growatt InfoSystem — tracking clients and service tickets with role-based views for admin and field engineers.',
      color: 'from-[#EC4899] to-[#22C55E]',
    },
    {
      icon: BookOpen,
      year: 'Jul 2023 – May 2025',
      title: 'Master of Computer Applications (MCA)',
      institution: 'ISTAR College, Anand',
      description:
        'Graduated with CGPA 9.27. Specialised in full-stack development and modern web technologies.',
      color: 'from-[#8B5CF6] to-[#EC4899]',
    },
    {
      icon: GraduationCap,
      year: 'Jun 2020 – Apr 2023',
      title: 'Bachelor of Computer Applications (BCA)',
      institution: 'SEMCOM College, Anand',
      description:
        'Graduated with CGPA 8.67. Built foundations in programming, web development, and software engineering.',
      color: 'from-[#6366F1] to-[#8B5CF6]',
    },
  ];

  return (
    <section id="journey" className="py-32 relative overflow-hidden">
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
            My Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#E5E7EB] mt-4 mb-6">
            The Road So Far
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#6366F1] to-[#22C55E] mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[#6366F1] via-[#8B5CF6] to-[#22C55E] hidden lg:block" />

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`flex flex-col lg:flex-row gap-8 items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                <div className="flex-1 lg:text-right" style={{ textAlign: index % 2 === 0 ? 'right' : 'left' }}>
                  <div className={`inline-block p-6 rounded-xl backdrop-blur-sm border transition-all duration-300 hover:shadow-lg hover:shadow-[#6366F1]/20 ${
                    milestone.current
                      ? 'bg-gradient-to-br from-[#6366F1]/10 to-[#22C55E]/10 border-[#22C55E]/40 hover:border-[#22C55E]/70'
                      : 'bg-white/5 border-white/10 hover:border-[#6366F1]/50'
                  } ${index % 2 === 0 ? '' : 'lg:ml-auto'}`}>
                    <div className="flex items-center gap-3 mb-3" style={{ justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start' }}>
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${milestone.color}`}>
                        <milestone.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-[#6366F1] font-semibold text-sm">
                        {milestone.year}
                      </span>
                      {milestone.current && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] text-[10px] font-semibold uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse" />
                          Currently
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-[#E5E7EB] mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-[#9CA3AF] text-sm mb-3 font-medium">
                      {milestone.institution}
                    </p>
                    <p className="text-[#9CA3AF] text-sm leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                <div className="hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#6366F1] to-[#22C55E] border-4 border-[#0B0B0F] z-10">
                  <div className="w-3 h-3 rounded-full bg-white" />
                </div>

                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
