import { motion } from 'framer-motion';
import { useState } from 'react';
import profileWebp from '../assets/profile-800.webp';
import profileJpeg from '../assets/profile-800.jpg';

interface ProfilePhotoProps {
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
  /** Hero/LCP: eager; About / below-fold: lazy */
  loading?: 'eager' | 'lazy';
}

const ProfilePhoto = ({ size = 'md', animate = true, loading = 'lazy' }: ProfilePhotoProps) => {
  const [imageError, setImageError] = useState(false);

  const sizeMap = {
    sm: { container: 'w-32 h-32', text: 'text-4xl', ring1: 'inset-[-8px]', ring2: 'inset-[-16px]', ring3: 'inset-[-24px]' },
    md: { container: 'w-64 h-64', text: 'text-6xl', ring1: 'inset-[-10px]', ring2: 'inset-[-20px]', ring3: 'inset-[-30px]' },
    lg: { container: 'w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80', text: 'text-8xl', ring1: 'inset-[-12px]', ring2: 'inset-[-24px]', ring3: 'inset-[-36px]' },
  };

  const s = sizeMap[size];

  const orbitDots = [
    { angle: 0, delay: 0, color: 'bg-[#6366F1]' },
    { angle: 60, delay: 0.5, color: 'bg-[#22C55E]' },
    { angle: 120, delay: 1.0, color: 'bg-[#6366F1]' },
    { angle: 180, delay: 1.5, color: 'bg-[#22C55E]' },
    { angle: 240, delay: 2.0, color: 'bg-[#6366F1]' },
    { angle: 300, delay: 2.5, color: 'bg-[#22C55E]' },
  ];

  return (
    <div className="relative flex items-center justify-center">
      {animate && (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0"
            style={{ inset: size === 'lg' ? '-36px' : size === 'md' ? '-30px' : '-24px' }}
          >
            <div className="w-full h-full rounded-full border border-[#6366F1]/20" />
            {orbitDots.slice(0, 3).map((dot, i) => (
              <div
                key={i}
                className="absolute inset-0 pointer-events-none"
                style={{ transform: `rotate(${dot.angle}deg)` }}
              >
                <div
                  className={`absolute left-1/2 w-2 h-2 -translate-x-1/2 ${dot.color} rounded-full shadow-lg`}
                  style={{ top: '10%' }}
                />
              </div>
            ))}
          </motion.div>

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="absolute"
            style={{ inset: size === 'lg' ? '-60px' : size === 'md' ? '-50px' : '-40px' }}
          >
            <div className="w-full h-full rounded-full border border-[#22C55E]/10 border-dashed" />
            {orbitDots.slice(3).map((dot, i) => (
              <div
                key={i}
                className="absolute inset-0 pointer-events-none"
                style={{ transform: `rotate(${dot.angle}deg)` }}
              >
                <div
                  className={`absolute left-1/2 w-1.5 h-1.5 -translate-x-1/2 ${dot.color} rounded-full opacity-60`}
                  style={{ top: '5%' }}
                />
              </div>
            ))}
          </motion.div>
        </>
      )}

      <motion.div
        whileHover={animate ? { scale: 1.05 } : undefined}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`relative ${s.container} rounded-full`}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#6366F1] to-[#22C55E] p-[2px]">
          <div className="w-full h-full rounded-full bg-[#0B0B0F]" />
        </div>

        {animate && (
          <motion.div
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full bg-gradient-to-br from-[#6366F1]/30 to-[#22C55E]/30 blur-xl"
          />
        )}

        <div className="absolute inset-[2px] rounded-full overflow-hidden">
          {!imageError ? (
            <picture>
              <source srcSet={profileWebp} type="image/webp" />
              <img
                src={profileJpeg}
                alt="Mihir Makwana"
                className="w-full h-full object-cover object-center"
                loading={loading}
                decoding="async"
                onError={() => setImageError(true)}
              />
            </picture>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1a1a2e] to-[#0B0B0F] flex items-center justify-center">
              <motion.div
                animate={animate ? { scale: [1, 1.05, 1] } : undefined}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="text-center"
              >
                <div className={`${s.text} font-bold bg-gradient-to-br from-[#6366F1] via-[#818CF8] to-[#22C55E] bg-clip-text text-transparent select-none`}>
                  MM
                </div>
                <div className="text-[#9CA3AF] text-xs mt-1 font-medium tracking-widest uppercase">
                  Mihir Makwana
                </div>
              </motion.div>
            </div>
          )}
        </div>

      </motion.div>
    </div>
  );
};

export default ProfilePhoto;
