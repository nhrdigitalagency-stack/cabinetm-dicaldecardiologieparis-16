import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ClinicSiteData, Language } from '../data/initialClinicData';

interface LogoSplashLoaderProps {
  isVisible: boolean;
  siteData: ClinicSiteData;
  lang: Language;
  onComplete: () => void;
}

export const LogoSplashLoader: React.FC<LogoSplashLoaderProps> = ({
  isVisible,
  siteData,
  lang,
  onComplete,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const durationMs = 3000; // Exactement 3 secondes
    const intervalMs = 30;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const ratio = Math.min(1, elapsed / durationMs);
      setProgress(Math.round(ratio * 100));

      if (ratio >= 1) {
        clearInterval(timer);
        onComplete();
      }
    }, intervalMs);

    const hardTimeout = setTimeout(() => {
      clearInterval(timer);
      onComplete();
    }, durationMs);

    return () => {
      clearInterval(timer);
      clearTimeout(hardTimeout);
    };
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="paris16-splash-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.45, ease: 'easeInOut' },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-6 bg-[#061B49] text-white select-none"
          role="dialog"
          aria-modal="true"
          aria-label={siteData.clinicName[lang] || 'Cabinet Médical de Cardiologie Paris 16'}
        >
          <div className="flex flex-col items-center text-center max-w-md w-full space-y-6">
            {/* Logo Container */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-white p-4 shadow-2xl flex items-center justify-center border border-white/10"
            >
              <img
                src={siteData.logoUrl}
                alt={siteData.clinicName[lang]}
                className="w-full h-full object-contain"
              />
            </motion.div>

            {/* Company Name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="space-y-1.5"
            >
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                {siteData.clinicName[lang]}
              </h1>
              <p className="text-xs sm:text-sm text-sky-200 font-medium tracking-wide">
                {siteData.doctorName} · {siteData.specialty[lang]}
              </p>
            </motion.div>

            {/* Discreet 3-Second Loading Line */}
            <div className="w-48 sm:w-56 h-1 rounded-full bg-white/20 overflow-hidden">
              <motion.div
                style={{ width: `${progress}%` }}
                className="h-full rounded-full bg-[#0088FF]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
