import { motion } from 'motion/react';
import { WeatherIcon } from './WeatherIcon';
import { HourlyWeather } from '../types/weather';

interface HourlyForecastProps {
  hourly: HourlyWeather[];
  isDarkMode?: boolean;
}

export function HourlyForecast({ hourly, isDarkMode = false }: HourlyForecastProps) {
  const cardClass = isDarkMode 
    ? 'bg-black/40 backdrop-blur-xl border border-white/20' 
    : 'frosted-glass-card';
  
  return (
    <motion.div
      className={`mb-5 ${cardClass} rounded-2xl overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      {/* Hourly Forecast Strip */}
      <div className="px-5 py-5 overflow-x-auto scrollable-container">
        <div className="flex gap-7">
          {hourly.map((hour, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center gap-2.5 min-w-[50px]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.05, duration: 0.3 }}
              whileHover={{ y: -4 }}
            >
              <div className="text-[13px] text-white/80 font-medium">
                {hour.time}
              </div>
              <WeatherIcon icon={hour.icon} size={32} />
              <div className="text-[16px] font-medium text-white">
                {hour.temperature}°
              </div>
            </motion.div>
          ))}
          {/* Sunset Marker */}
          <motion.div
            className="flex flex-col items-center gap-2.5 min-w-[50px]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + hourly.length * 0.05, duration: 0.3 }}
            whileHover={{ y: -4 }}
          >
            <div className="text-[13px] text-white/80 font-medium">
              16:32
            </div>
            <WeatherIcon icon="sunset" size={32} />
            <div className="text-[13px] font-medium text-white">
              Sunset
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}