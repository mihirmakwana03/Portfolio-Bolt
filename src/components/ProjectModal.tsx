import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle, Zap, Database, Server } from 'lucide-react';
import { ProjectCaseStudy } from '../types/project';

interface ProjectModalProps {
  project: ProjectCaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="min-h-screen px-4 py-8 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-5xl bg-[#0B0B0F] border border-white/10 rounded-2xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors z-10"
                >
                  <X size={24} />
                </button>

                <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-[#0B0B0F]/50 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#E5E7EB] mb-2">
                      {project.title}
                    </h2>
                    <p className="text-[#6366F1] font-medium">{project.tagline}</p>
                  </div>
                </div>

                <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto">
                  <div className="flex flex-wrap gap-3 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-full bg-[#6366F1]/10 text-[#6366F1] border border-[#6366F1]/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 mb-8">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[#E5E7EB] transition-colors"
                    >
                      <Github size={18} />
                      View Code
                    </a>
                    {project.demo !== '#' && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#6366F1] to-[#22C55E] text-white rounded-lg hover:shadow-lg hover:shadow-[#6366F1]/50 transition-all"
                      >
                        <ExternalLink size={18} />
                        Live Demo
                      </a>
                    )}
                  </div>

                  <div className="space-y-8">
                    <section>
                      <h3 className="text-xl font-bold text-[#E5E7EB] mb-3 flex items-center gap-2">
                        <Zap className="text-[#6366F1]" size={20} />
                        The Problem
                      </h3>
                      <p className="text-[#9CA3AF] leading-relaxed">{project.problem}</p>
                    </section>

                    <section>
                      <h3 className="text-xl font-bold text-[#E5E7EB] mb-3 flex items-center gap-2">
                        <CheckCircle className="text-[#22C55E]" size={20} />
                        The Solution
                      </h3>
                      <p className="text-[#9CA3AF] leading-relaxed">{project.solution}</p>
                    </section>

                    <section>
                      <h3 className="text-xl font-bold text-[#E5E7EB] mb-3 flex items-center gap-2">
                        <Server className="text-[#6366F1]" size={20} />
                        Architecture
                      </h3>
                      <p className="text-[#9CA3AF] leading-relaxed">{project.architecture}</p>
                    </section>

                    <section>
                      <h3 className="text-xl font-bold text-[#E5E7EB] mb-3">Key Features</h3>
                      <ul className="space-y-2">
                        {project.keyFeatures.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3 text-[#9CA3AF]">
                            <CheckCircle className="text-[#22C55E] flex-shrink-0 mt-1" size={16} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-xl font-bold text-[#E5E7EB] mb-3">Technical Challenges</h3>
                      <ul className="space-y-2">
                        {project.challenges.map((challenge, index) => (
                          <li key={index} className="flex items-start gap-3 text-[#9CA3AF]">
                            <Zap className="text-[#6366F1] flex-shrink-0 mt-1" size={16} />
                            <span>{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-xl font-bold text-[#E5E7EB] mb-4 flex items-center gap-2">
                        <Database className="text-[#6366F1]" size={20} />
                        Technology Stack
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {project.techStack.frontend && (
                          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                            <h4 className="font-semibold text-[#E5E7EB] mb-2">Frontend</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.techStack.frontend.map((tech) => (
                                <span
                                  key={tech}
                                  className="text-xs px-2 py-1 bg-[#6366F1]/10 text-[#6366F1] rounded"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {project.techStack.backend && (
                          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                            <h4 className="font-semibold text-[#E5E7EB] mb-2">Backend</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.techStack.backend.map((tech) => (
                                <span
                                  key={tech}
                                  className="text-xs px-2 py-1 bg-[#22C55E]/10 text-[#22C55E] rounded"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {project.techStack.database && (
                          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                            <h4 className="font-semibold text-[#E5E7EB] mb-2">Database</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.techStack.database.map((tech) => (
                                <span
                                  key={tech}
                                  className="text-xs px-2 py-1 bg-[#EC4899]/10 text-[#EC4899] rounded"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {project.techStack.deployment && (
                          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                            <h4 className="font-semibold text-[#E5E7EB] mb-2">Deployment</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.techStack.deployment.map((tech) => (
                                <span
                                  key={tech}
                                  className="text-xs px-2 py-1 bg-[#8B5CF6]/10 text-[#8B5CF6] rounded"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </section>

                    <section>
                      <h3 className="text-xl font-bold text-[#E5E7EB] mb-3">Outcome</h3>
                      <p className="text-[#9CA3AF] leading-relaxed">{project.outcome}</p>
                    </section>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
