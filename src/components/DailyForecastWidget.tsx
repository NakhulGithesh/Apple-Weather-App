import { motion } from 'motion/react';
import { WeatherIcon } from './WeatherIcon';
import { DailyWeather } from '../types/weather';
import { WeatherWidget } from './WeatherWidget';
import { Calendar } from 'lucide-react';

interface DailyForecastWidgetProps {
  daily: DailyWeather[];
  delay?: number;
  isDarkMode?: boolean;
}

export function DailyForecastWidget({ daily, delay = 0.6, isDarkMode = false }: DailyForecastWidgetProps) {
  const maxTemp = Math.max(...daily.map(d => d.high));
  const minTemp = Math.min(...daily.map(d => d.low));
  const tempRange = maxTemp - minTemp;

  const getBarWidth = (low: number, high: number) => {
    const lowPercent = ((low - minTemp) / tempRange) * 100;
    const highPercent = ((high - minTemp) / tempRange) * 100;
    return { left: lowPercent, width: highPercent - lowPercent };
  };

  return (
    <WeatherWidget
      title="10-Day Forecast"
      icon={<Calendar className="w-4 h-4" />}
      delay={delay}
      className="col-span-2 row-span-2"
      isDarkMode={isDarkMode}
    >
      <div className="space-y-0 -mx-1 mt-1">
        {daily.map((day, index) => (
          <motion.div
            key={index}
            className={`flex items-center gap-2.5 py-2 px-1 transition-all duration-200 ${
              index !== daily.length - 1 ? 'border-b border-white/8' : ''
            }`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.1 + index * 0.03, duration: 0.3 }}
          >
            {/* Day Name */}
            <div className="w-12 text-[14px] text-white font-medium">
              {day.day}
            </div>

            {/* Weather Icon + Precipitation */}
            <div className="flex flex-col items-center justify-center w-10 relative">
              <WeatherIcon icon={day.icon} size={24} />
              {day.precipitation && (
                <div className="text-[10px] text-[#5AC8FA] font-semibold mt-0.5">
                  {day.precipitation}%
                </div>
              )}
            </div>

            {/* Temperature Range */}
            <div className="flex-1 flex items-center gap-2.5">
              {/* Low Temperature */}
              <div className="text-[14px] text-white/60 w-7 text-right font-medium">
                {day.low}°
              </div>

              {/* Temperature Bar */}
              <div className="flex-1 relative h-1.5">
                <div className="absolute inset-0 bg-white/12 rounded-full" />
                <motion.div
                  className="absolute h-full rounded-full"
                  style={{
                    left: `${getBarWidth(day.low, day.high).left}%`,
                    width: `${getBarWidth(day.low, day.high).width}%`,
                    background: 'linear-gradient(90deg, #5AC8FA 0%, #5AC8FA 100%)',
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: delay + 0.2 + index * 0.03, duration: 0.4 }}
                />
              </div>

              {/* High Temperature */}
              <div className="text-[14px] text-white font-medium w-7">
                {day.high}°
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </WeatherWidget>
  );
}