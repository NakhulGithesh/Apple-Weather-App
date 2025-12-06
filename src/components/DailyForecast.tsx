import { motion } from 'motion/react';
import { WeatherIcon } from './WeatherIcon';
import { DailyWeather } from '../types/weather';

interface DailyForecastProps {
  daily: DailyWeather[];
}

export function DailyForecast({ daily }: DailyForecastProps) {
  const maxTemp = Math.max(...daily.map(d => d.high));
  const minTemp = Math.min(...daily.map(d => d.low));
  const tempRange = maxTemp - minTemp;

  const getBarWidth = (low: number, high: number) => {
    const lowPercent = ((low - minTemp) / tempRange) * 100;
    const highPercent = ((high - minTemp) / tempRange) * 100;
    return { left: lowPercent, width: highPercent - lowPercent };
  };

  return (
    <motion.div
      className="mb-5 frosted-glass-card rounded-2xl p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      {/* Header with Calendar Icon */}
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-3.5 h-3.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 className="text-[11px] font-semibold text-white/60 uppercase tracking-wider">
          10-Day Forecast
        </h3>
      </div>

      <div className="space-y-0">
        {daily.map((day, index) => (
          <motion.div
            key={index}
            className={`flex items-center gap-3 py-2.5 transition-all duration-200 ${
              index !== daily.length - 1 ? 'border-b border-white/10' : ''
            }`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.05, duration: 0.3 }}
          >
            {/* Day Name */}
            <div className="w-14 text-[15px] text-white font-medium">
              {day.day}
            </div>

            {/* Weather Icon + Precipitation */}
            <div className="flex flex-col items-center justify-center w-12 relative">
              <WeatherIcon icon={day.icon} size={28} />
              {day.precipitation && (
                <div className="text-[11px] text-[#5AC8FA] font-semibold mt-0.5">
                  {day.precipitation}%
                </div>
              )}
            </div>

            {/* Temperature Range */}
            <div className="flex-1 flex items-center gap-3">
              {/* Low Temperature */}
              <div className="text-[16px] text-white/70 w-8 text-right">
                {day.low}°
              </div>

              {/* Temperature Bar */}
              <div className="flex-1 relative h-1.5">
                <div className="absolute inset-0 bg-white/15 rounded-full" />
                <motion.div
                  className="absolute h-full rounded-full"
                  style={{
                    left: `${getBarWidth(day.low, day.high).left}%`,
                    width: `${getBarWidth(day.low, day.high).width}%`,
                    background: 'linear-gradient(90deg, #5AC8FA 0%, #5AC8FA 100%)',
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.7 + index * 0.05, duration: 0.5 }}
                />
              </div>

              {/* High Temperature */}
              <div className="text-[16px] text-white font-medium w-8">
                {day.high}°
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}