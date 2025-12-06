import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface WeatherWidgetProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  delay?: number;
  className?: string;
  isDarkMode?: boolean;
}

export function WeatherWidget({ title, icon, children, delay = 0, className = '', isDarkMode = false }: WeatherWidgetProps) {
  const baseClass = isDarkMode 
    ? 'bg-black/40 backdrop-blur-xl border border-white/20' 
    : 'frosted-glass-card';
  
  return (
    <motion.div
      className={`${baseClass} rounded-xl p-4 transition-all duration-300 cursor-pointer ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{
        y: -4,
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className={isDarkMode ? 'text-white/80' : 'text-white/60'}>{icon}</div>
        <h3 className={`text-[11px] font-medium ${isDarkMode ? 'text-white/80' : 'text-white/60'} uppercase tracking-wide`}>
          {title}
        </h3>
      </div>
      {children}
    </motion.div>
  );
}