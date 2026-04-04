import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Layers, Database, Cloud, Server, Lock, Zap } from 'lucide-react';

const Architecture = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const architectures = [
    {
      title: 'Microservices Architecture',
      description: 'Scalable, distributed system design with independent services',
      icon: Server,
      color: '#6366F1',
    },
    {
      title: 'Cloud-Native Stack',
      description: 'Modern cloud infrastructure with containerization and orchestration',
      icon: Cloud,
      color: '#22C55E',
    },
    {
      title: 'Event-Driven System',
      description: 'Asynchronous messaging patterns for real-time processing',
      icon: Zap,
      color: '#F59E0B',
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#6366F1]/10 rounded-full filter blur-[128px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Layers className="w-6 h-6 text-[#6366F1]" />
            <span className="text-[#6366F1] font-medium text-sm tracking-wider uppercase">
              System Design
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#E5E7EB] mb-4">
            Architecture Patterns
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#6366F1] to-[#22C55E] mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {architectures.map((arch, index) => (
            <motion.div
              key={arch.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-[#6366F1]/50 transition-all duration-300 group"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `${arch.color}20` }}
              >
                <arch.icon className="w-6 h-6" style={{ color: arch.color }} />
              </div>
              <h3 className="text-xl font-bold text-[#E5E7EB] mb-2">{arch.title}</h3>
              <p className="text-[#9CA3AF] text-sm">{arch.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-[#E5E7EB] mb-8 text-center">
            Full-Stack Application Architecture
          </h3>

          <div className="relative">
            <svg
              viewBox="0 0 800 600"
              className="w-full h-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#6366F1', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#22C55E', stopOpacity: 1 }} />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <rect x="50" y="50" width="180" height="120" rx="10" fill="#1F2937" stroke="url(#grad1)" strokeWidth="2" filter="url(#glow)" />
              <text x="140" y="95" textAnchor="middle" fill="#E5E7EB" fontSize="16" fontWeight="bold">Frontend</text>
              <text x="140" y="120" textAnchor="middle" fill="#9CA3AF" fontSize="12">React / Vue</text>
              <text x="140" y="140" textAnchor="middle" fill="#9CA3AF" fontSize="12">TypeScript</text>

              <rect x="310" y="50" width="180" height="120" rx="10" fill="#1F2937" stroke="url(#grad1)" strokeWidth="2" filter="url(#glow)" />
              <text x="400" y="95" textAnchor="middle" fill="#E5E7EB" fontSize="16" fontWeight="bold">API Gateway</text>
              <text x="400" y="120" textAnchor="middle" fill="#9CA3AF" fontSize="12">REST / GraphQL</text>
              <text x="400" y="140" textAnchor="middle" fill="#9CA3AF" fontSize="12">Authentication</text>

              <rect x="570" y="50" width="180" height="120" rx="10" fill="#1F2937" stroke="url(#grad1)" strokeWidth="2" filter="url(#glow)" />
              <text x="660" y="95" textAnchor="middle" fill="#E5E7EB" fontSize="16" fontWeight="bold">Backend</text>
              <text x="660" y="120" textAnchor="middle" fill="#9CA3AF" fontSize="12">Node.js / Python</text>
              <text x="660" y="140" textAnchor="middle" fill="#9CA3AF" fontSize="12">Business Logic</text>

              <rect x="180" y="250" width="180" height="120" rx="10" fill="#1F2937" stroke="#22C55E" strokeWidth="2" filter="url(#glow)" />
              <text x="270" y="295" textAnchor="middle" fill="#E5E7EB" fontSize="16" fontWeight="bold">Database</text>
              <text x="270" y="320" textAnchor="middle" fill="#9CA3AF" fontSize="12">PostgreSQL</text>
              <text x="270" y="340" textAnchor="middle" fill="#9CA3AF" fontSize="12">Redis Cache</text>

              <rect x="440" y="250" width="180" height="120" rx="10" fill="#1F2937" stroke="#22C55E" strokeWidth="2" filter="url(#glow)" />
              <text x="530" y="295" textAnchor="middle" fill="#E5E7EB" fontSize="16" fontWeight="bold">Message Queue</text>
              <text x="530" y="320" textAnchor="middle" fill="#9CA3AF" fontSize="12">RabbitMQ</text>
              <text x="530" y="340" textAnchor="middle" fill="#9CA3AF" fontSize="12">Event Bus</text>

              <rect x="180" y="430" width="180" height="120" rx="10" fill="#1F2937" stroke="#F59E0B" strokeWidth="2" filter="url(#glow)" />
              <text x="270" y="475" textAnchor="middle" fill="#E5E7EB" fontSize="16" fontWeight="bold">Storage</text>
              <text x="270" y="500" textAnchor="middle" fill="#9CA3AF" fontSize="12">S3 / CDN</text>
              <text x="270" y="520" textAnchor="middle" fill="#9CA3AF" fontSize="12">Media Assets</text>

              <rect x="440" y="430" width="180" height="120" rx="10" fill="#1F2937" stroke="#F59E0B" strokeWidth="2" filter="url(#glow)" />
              <text x="530" y="475" textAnchor="middle" fill="#E5E7EB" fontSize="16" fontWeight="bold">Monitoring</text>
              <text x="530" y="500" textAnchor="middle" fill="#9CA3AF" fontSize="12">Analytics</text>
              <text x="530" y="520" textAnchor="middle" fill="#9CA3AF" fontSize="12">Logging</text>

              <line x1="230" y1="110" x2="310" y2="110" stroke="#6366F1" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="490" y1="110" x2="570" y2="110" stroke="#6366F1" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="660" y1="170" x2="530" y2="250" stroke="#22C55E" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="660" y1="170" x2="270" y2="250" stroke="#22C55E" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="270" y1="370" x2="270" y2="430" stroke="#F59E0B" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="530" y1="370" x2="530" y2="430" stroke="#F59E0B" strokeWidth="2" markerEnd="url(#arrowhead)" />

              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="#6366F1" />
                </marker>
              </defs>
            </svg>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
              <div className="w-3 h-3 rounded-full bg-[#6366F1]"></div>
              <span>Client Layer</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
              <div className="w-3 h-3 rounded-full bg-[#22C55E]"></div>
              <span>Data Layer</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
              <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
              <span>Infrastructure</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
              <Database className="w-4 h-4" />
              <span>Data Flow</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Architecture;
