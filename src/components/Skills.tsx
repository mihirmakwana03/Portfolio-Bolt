import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface SkillBadge {
  name: string;
  note?: string;
}

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const skillCategories: { category: string; highlight?: boolean; skills: SkillBadge[] }[] = [
    {
      category: 'AI / ML',
      highlight: true,
      skills: [
        { name: 'PyTorch' },
        { name: 'TensorFlow / Keras' },
        { name: 'scikit-learn' },
        { name: 'OpenCV' },
        { name: 'FaceNet' },
        { name: 'MTCNN' },
        { name: 'Streamlit' },
        { name: 'imbalanced-learn' },
        { name: 'Deep Learning' },
        { name: 'Computer Vision' },
        { name: 'CNNs' },
        { name: 'Transfer Learning' },
      ],
    },
    {
      category: 'Languages',
      skills: [
        { name: 'Python' },
        { name: 'JavaScript' },
        { name: 'Java' },
        { name: 'PHP' },
        { name: 'SQL' },
      ],
    },
    {
      category: 'Frontend',
      skills: [
        { name: 'React' },
        { name: 'HTML5' },
        { name: 'CSS3' },
        { name: 'Tailwind CSS' },
        { name: 'jQuery' },
      ],
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js' },
        { name: 'Express.js' },
        { name: 'Laravel' },
        { name: 'REST APIs' },
      ],
    },
    {
      category: 'Databases',
      skills: [
        { name: 'MongoDB' },
        { name: 'MySQL' },
      ],
    },
    {
      category: 'Tools & Others',
      skills: [
        { name: 'Git' },
        { name: 'GitHub' },
        { name: 'VS Code' },
        { name: 'Jupyter' },
        { name: 'Postman' },
        { name: 'Docker', note: 'learning' },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 sm:py-28 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#6366F1]/10 rounded-full filter blur-[128px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-[#6366F1] font-medium text-sm tracking-wider uppercase">
            Technical Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#E5E7EB] mt-4 mb-6">
            Skills & Technologies
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#6366F1] to-[#22C55E] mx-auto rounded-full" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className={`group p-5 sm:p-6 rounded-xl backdrop-blur-sm border transition-all duration-300 ${
                category.highlight
                  ? 'bg-gradient-to-br from-[#6366F1]/10 to-[#22C55E]/10 border-[#6366F1]/30 hover:border-[#6366F1]/60 sm:col-span-2 lg:col-span-3 hover:shadow-lg hover:shadow-[#6366F1]/20'
                  : 'bg-white/5 border-white/10 hover:border-[#6366F1]/50 hover:shadow-lg hover:shadow-[#6366F1]/20'
              }`}
            >
              <div className="flex items-center gap-2 mb-4 sm:mb-6 justify-between flex-wrap">
                <h3 className="text-lg sm:text-xl font-bold text-[#E5E7EB] flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${category.highlight ? 'bg-[#22C55E]' : 'bg-[#6366F1]'}`} />
                  {category.category}
                </h3>
                {category.highlight && (
                  <span className="text-[10px] uppercase tracking-wider text-[#22C55E] font-semibold px-2 py-0.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 shrink-0">
                    Primary Focus
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm border transition-colors ${
                      category.highlight
                        ? 'bg-white/5 border-[#6366F1]/20 text-[#E5E7EB] hover:border-[#6366F1]/50'
                        : 'bg-white/5 border-white/10 text-[#E5E7EB] hover:border-[#6366F1]/40'
                    }`}
                  >
                    {skill.name}
                    {skill.note && (
                      <span className="text-[10px] uppercase tracking-wider text-[#9CA3AF]">
                        · {skill.note}
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
        >
          {[
            { label: 'Pinned AI & Web Projects', value: '6' },
            { label: 'Kingston MSc ML Coursework Projects', value: '3' },
            { label: 'MCA CGPA (out of 10)', value: '9.27' },
            { label: 'GitHub Contributions (past year)', value: '427' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              className="text-center p-4 sm:p-6 rounded-xl bg-gradient-to-br from-[#6366F1]/10 to-[#22C55E]/10 border border-white/10"
            >
              <div className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-[#6366F1] to-[#22C55E] bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-[#9CA3AF] text-xs sm:text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
