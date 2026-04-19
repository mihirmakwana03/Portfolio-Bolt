import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ScanFace, Brain, Rocket, LineChart } from 'lucide-react';
import ProfilePhoto from './ProfilePhoto';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const highlights = [
    {
      icon: ScanFace,
      title: 'Computer Vision',
      description: 'Face recognition, CNNs, transfer learning with PyTorch and OpenCV.',
    },
    {
      icon: Brain,
      title: 'Deep Learning',
      description: 'Training pipelines in PyTorch and TensorFlow/Keras, from MLPs to ResNet50.',
    },
    {
      icon: Rocket,
      title: 'Full-Stack Deployment',
      description: 'MERN stack and Laravel — turning trained models into shipped products.',
    },
    {
      icon: LineChart,
      title: 'Research Rigour',
      description: 'Ablation studies, hyperparameter tuning, benchmarking across architectures.',
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
            Building Intelligent Systems
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
              From Notebooks to Production
            </h3>
            <div className="space-y-4 text-[#9CA3AF] leading-relaxed">
              <p>
                I'm pursuing an MSc in Artificial Intelligence at Kingston University, London,
                focused on computer vision and deep learning. My recent work includes a real-time
                face recognition system (MTCNN + FaceNet + ArcFace), medical image classification
                with transfer learning (MobileNetV2, ResNet50) on MedMNIST+ OrganSMNIST, and
                benchmarking eight classical ML classifiers on imbalanced data.
              </p>
              <p>
                Before my MSc I completed an MCA in India (9.27 CGPA) and spent a year shipping
                production software — a MERN-stack CRM for Growatt InfoSystem at NTech Infoway,
                and a Laravel website for HappinessFactors. That background means I can take ML
                models from notebook to deployed product, end to end.
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
