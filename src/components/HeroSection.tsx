import { motion } from 'motion/react';
import { CityWeather } from '../types/weather';

interface HeroSectionProps {
  city: CityWeather;
}

function getCurrentDateTime() {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  return now.toLocaleString('en-US', options);
}

export function HeroSection({ city }: HeroSectionProps) {
  return (
    <motion.div
      className="text-center pt-6 pb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* City Name */}
      <motion.h1
        className="text-[40px] font-semibold text-white mb-3 text-shadow-glow"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        {city.city}
      </motion.h1>

      {/* Temperature */}
      <motion.div
        className="text-[96px] font-thin text-white text-shadow-glow leading-none mb-2"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {city.temperature}°
      </motion.div>

      {/* Condition */}
      <motion.div
        className="text-[18px] text-white/90 mb-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        {city.condition}
      </motion.div>

      {/* High/Low */}
      <motion.div
        className="text-[16px] text-white/80 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.3 }}
      >
        H:{city.high}° L:{city.low}°
      </motion.div>
    </motion.div>
  );
}