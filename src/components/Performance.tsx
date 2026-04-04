import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Gauge, Zap, Shield, Accessibility, Search } from 'lucide-react';

const Performance = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const metrics = [
    {
      name: 'Performance',
      score: 98,
      icon: Zap,
      color: '#22C55E',
      description: 'Fast load times and optimized assets',
    },
    {
      name: 'Accessibility',
      score: 95,
      icon: Accessibility,
      color: '#6366F1',
      description: 'WCAG compliant and screen reader friendly',
    },
    {
      name: 'Best Practices',
      score: 97,
      icon: Shield,
      color: '#22C55E',
      description: 'Secure and modern web standards',
    },
    {
      name: 'SEO',
      score: 100,
      icon: Search,
      color: '#22C55E',
      description: 'Optimized for search engines',
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#22C55E';
    if (score >= 50) return '#F59E0B';
    return '#EF4444';
  };

  const CircularProgress = ({ score, size = 120 }: { score: number; size?: number }) => {
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#1F2937"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={getScoreColor(score)}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: offset } : {}}
            transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-3xl font-bold"
              style={{ color: getScoreColor(score) }}
            >
              {score}
            </motion.div>
            <div className="text-xs text-[#9CA3AF]">/ 100</div>
          </div>
        </div>
      </div>
    );
  };

  const performanceDetails = [
    { label: 'First Contentful Paint', value: '0.8s', status: 'excellent' },
    { label: 'Largest Contentful Paint', value: '1.2s', status: 'excellent' },
    { label: 'Total Blocking Time', value: '50ms', status: 'excellent' },
    { label: 'Cumulative Layout Shift', value: '0.02', status: 'excellent' },
    { label: 'Speed Index', value: '1.5s', status: 'excellent' },
    { label: 'Time to Interactive', value: '1.8s', status: 'excellent' },
  ];

  const getStatusColor = (status: string) => {
    return status === 'excellent' ? 'text-[#22C55E]' : status === 'good' ? 'text-[#F59E0B]' : 'text-[#EF4444]';
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#22C55E]/10 rounded-full filter blur-[128px]" />
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
            <Gauge className="w-6 h-6 text-[#22C55E]" />
            <span className="text-[#6366F1] font-medium text-sm tracking-wider uppercase">
              Metrics
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#E5E7EB] mb-4">
            Performance Scores
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#6366F1] to-[#22C55E] mx-auto rounded-full" />
          <p className="text-[#9CA3AF] mt-4 max-w-2xl mx-auto">
            Lighthouse audit results demonstrating commitment to web performance and user experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-[#6366F1]/50 transition-all duration-300 group"
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${metric.color}20` }}
                >
                  <metric.icon className="w-6 h-6" style={{ color: metric.color }} />
                </div>
                <CircularProgress score={metric.score} size={100} />
                <h3 className="text-lg font-bold text-[#E5E7EB] mt-4 mb-2">{metric.name}</h3>
                <p className="text-[#9CA3AF] text-sm">{metric.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-[#E5E7EB] mb-6 text-center">
            Core Web Vitals
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {performanceDetails.map((detail, index) => (
              <motion.div
                key={detail.label}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.05 }}
                className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10"
              >
                <div>
                  <div className="text-[#9CA3AF] text-sm mb-1">{detail.label}</div>
                  <div className={`text-xl font-bold ${getStatusColor(detail.status)}`}>
                    {detail.value}
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-[#22C55E]"></div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/20">
              <div className="text-3xl font-bold text-[#22C55E] mb-1">97.5%</div>
              <div className="text-sm text-[#9CA3AF]">Overall Score</div>
            </div>
            <div className="p-4 rounded-lg bg-[#6366F1]/10 border border-[#6366F1]/20">
              <div className="text-3xl font-bold text-[#6366F1] mb-1">&lt; 2s</div>
              <div className="text-sm text-[#9CA3AF]">Average Load Time</div>
            </div>
            <div className="p-4 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/20">
              <div className="text-3xl font-bold text-[#22C55E] mb-1">100%</div>
              <div className="text-sm text-[#9CA3AF]">Accessibility Score</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Performance;
