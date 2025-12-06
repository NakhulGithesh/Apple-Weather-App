import { motion } from 'motion/react';

interface CityCardProps {
  city: string;
  country: string;
  temperature: number;
  condition: string;
  localTime: string;
  icon: string;
  high: number;
  low: number;
  isSelected?: boolean;
  onClick?: () => void;
  delay?: number;
}

export function CityCard({
  city,
  country,
  temperature,
  condition,
  localTime,
  icon,
  high,
  low,
  isSelected = false,
  onClick,
  delay = 0,
}: CityCardProps) {
  return (
    <motion.button
      className={`w-full px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer ${
        isSelected
          ? 'bg-white/15'
          : 'bg-transparent hover:bg-white/8'
      }`}
      onClick={onClick}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      {/* City Name and Time */}
      <div className="flex items-baseline justify-between mb-1.5">
        <div className="text-left">
          <div className="text-[14px] font-semibold text-white">
            {city}
          </div>
          <div className="text-[11px] text-white/50">
            {localTime}
          </div>
        </div>
        <div className="text-[32px] font-light text-white tracking-tight">
          {temperature}°
        </div>
      </div>

      {/* Condition and H/L */}
      <div className="flex items-baseline justify-between">
        <div className="text-[12px] text-white/70">
          {condition}
        </div>
        <div className="text-[11px] text-white/50">
          H:{high}° L:{low}°
        </div>
      </div>
    </motion.button>
  );
}