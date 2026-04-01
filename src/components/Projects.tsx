import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      title: 'Growatt Infosystems Website',
      description:
        'Developed a full-stack business website using the MERN stack during my internship at NTech Infoway. The platform showcases services and company information with a modern responsive user experience.',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['MongoDB', 'Express.js', 'React', 'Node.js'],
      github: 'https://github.com/mihirmakwana03',
      demo: 'https://growatt-frontend.vercel.app/',
      category: 'fullstack',
    },
    {
      title: 'HappinessFactors Website',
      description:
        'Built the HappinessFactors website from scratch using the Laravel framework. The platform focuses on personal development and wellbeing services with a clean, responsive interface.',
      image: 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Laravel', 'PHP', 'MySQL', 'JavaScript'],
      github: 'https://github.com/mihirmakwana03',
      demo: 'https://happinessfactors.com/',
      category: 'fullstack',
    },
    {
      title: 'Yoga Website',
      description:
        'A comprehensive yoga studio platform featuring class booking system, user authentication, payment integration, and admin panel for managing classes and members.',
      image: 'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['React', 'Node.js', 'MongoDB', 'Authentication'],
      github: 'https://github.com/mihirmakwana03',
      demo: '#',
      category: 'fullstack',
    },
    {
      title: 'E-Commerce Platform',
      description:
        'Full-featured online shopping platform with product catalog, shopping cart, checkout process, order management, and secure payment gateway integration.',
      image: 'https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
      tags: ['PHP', 'Laravel', 'MySQL', 'Payment Gateway'],
      github: 'https://github.com/mihirmakwana03',
      demo: '#',
      category: 'fullstack',
    },
    {
      title: 'Online Job Portal',
      description:
        'Job search and recruitment platform connecting employers with job seekers. Features include job postings, application tracking, resume management, and advanced search filters.',
      image: 'https://images.pexels.com/photos/5310571/pexels-photo-5310571.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['React', 'Node.js', 'Express', 'MySQL'],
      github: 'https://github.com/mihirmakwana03',
      demo: '#',
      category: 'fullstack',
    },
  ];

  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#22C55E]/10 rounded-full filter blur-[128px]" />
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
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#E5E7EB] mt-4 mb-6">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#6366F1] to-[#22C55E] mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {['all', 'fullstack', 'frontend', 'backend'].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                filter === category
                  ? 'bg-gradient-to-r from-[#6366F1] to-[#22C55E] text-white'
                  : 'bg-white/5 text-[#9CA3AF] hover:bg-white/10 border border-white/10'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#6366F1]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#6366F1]/20"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] to-transparent opacity-60" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-[#E5E7EB] mb-3 group-hover:text-[#6366F1] transition-colors">
                  {project.title}
                </h3>
                <p className="text-[#9CA3AF] text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full bg-[#6366F1]/10 text-[#6366F1] border border-[#6366F1]/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors"
                  >
                    <Github size={18} />
                    <span className="text-sm">Code</span>
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors"
                  >
                    <ExternalLink size={18} />
                    <span className="text-sm">Demo</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
