import { motion } from 'motion/react';
import { Sun, Wind, Droplets, Leaf, Sunrise, CloudRain } from 'lucide-react';
import { WeatherWidget } from './WeatherWidget';
import { DailyForecastWidget } from './DailyForecastWidget';
import { CityWeather } from '../types/weather';

interface WidgetGridProps {
  city: CityWeather;
}

export function WidgetGrid({ city }: WidgetGridProps) {
  const isDarkMode = city.condition.toLowerCase().includes('partly cloudy');
  
  const getUVColor = (uvIndex: number) => {
    if (uvIndex <= 2) return '#34C759';
    if (uvIndex <= 5) return '#FFCC00';
    if (uvIndex <= 7) return '#FF9500';
    if (uvIndex <= 10) return '#FF3B30';
    return '#A020F0';
  };

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return '#34C759';
    if (aqi <= 100) return '#FFCC00';
    if (aqi <= 150) return '#FF9500';
    if (aqi <= 200) return '#FF3B30';
    return '#A020F0';
  };

  const getSunPosition = () => {
    const now = new Date();
    const [sunriseHour, sunriseMin] = city.sunrise.split(':').map(s => {
      const num = parseInt(s);
      return s.includes('PM') && num !== 12 ? num + 12 : num;
    });
    const [sunsetHour, sunsetMin] = city.sunset.split(':').map(s => {
      const num = parseInt(s);
      return s.includes('PM') && num !== 12 ? num + 12 : num;
    });
    
    const sunriseTime = sunriseHour * 60 + sunriseMin;
    const sunsetTime = sunsetHour * 60 + sunsetMin;
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    if (currentTime < sunriseTime || currentTime > sunsetTime) {
      return 0;
    }
    
    const dayLength = sunsetTime - sunriseTime;
    const elapsed = currentTime - sunriseTime;
    return (elapsed / dayLength) * 100;
  };

  return (
    <div className="grid grid-cols-3 gap-3 mt-4">
      {/* 10-Day Forecast - Takes 2 columns */}
      <DailyForecastWidget daily={city.daily} delay={0.6} isDarkMode={isDarkMode} />

      {/* UV Index */}
      <WeatherWidget
        title="UV Index"
        icon={<Sun className="w-4 h-4" />}
        delay={0.6}
        isDarkMode={isDarkMode}
      >
        <div className="flex items-end gap-2">
          <div className="text-[28px] font-bold text-white">
            {city.uvIndex}
          </div>
          <div className="text-[14px] text-white/70 mb-1">
            {city.uvLabel}
          </div>
        </div>
        <div className="mt-3 relative h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full rounded-full"
            style={{
              backgroundColor: getUVColor(city.uvIndex),
              width: `${(city.uvIndex / 11) * 100}%`,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${(city.uvIndex / 11) * 100}%` }}
            transition={{ delay: 0.8, duration: 0.6 }}
          />
        </div>
        <div className="mt-2 text-[11px] text-white/50">
          Low for the rest of the day.
        </div>
      </WeatherWidget>

      {/* Sunrise & Sunset */}
      <WeatherWidget
        title="Sunrise"
        icon={<Sunrise className="w-4 h-4" />}
        delay={0.65}
        isDarkMode={isDarkMode}
      >
        <div className="text-[24px] font-semibold text-white mb-1">
          {city.sunrise}
        </div>
        <div className="text-[12px] text-white/60 mb-4">
          Sunset: {city.sunset}
        </div>
        <div className="relative h-12">
          <svg className="w-full h-full" viewBox="0 0 200 60">
            <path
              d="M 20 50 Q 100 10 180 50"
              fill="none"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="2"
            />
            <motion.circle
              cx="20"
              cy="50"
              r="4"
              fill="#FFD700"
              initial={{ cx: 20 }}
              animate={{ cx: 20 + (getSunPosition() / 100) * 160 }}
              transition={{ duration: 0.8 }}
            />
          </svg>
        </div>
      </WeatherWidget>

      {/* Wind */}
      <WeatherWidget
        title="Wind"
        icon={<Wind className="w-4 h-4" />}
        delay={0.7}
        isDarkMode={isDarkMode}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="text-[32px] font-light text-white">
            {city.windSpeed}
          </div>
          <motion.div
            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center"
            animate={{ rotate: city.windDegree }}
            transition={{ duration: 0.5 }}
          >
            <Wind className="w-6 h-6 text-white" />
          </motion.div>
        </div>
        <div className="text-[12px] text-white/60">
          km/h
        </div>
      </WeatherWidget>

      {/* Air Quality */}
      <WeatherWidget
        title="Air Quality"
        icon={
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.3"/>
            <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.2"/>
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.1"/>
          </svg>
        }
        delay={0.75}
        isDarkMode={isDarkMode}
      >
        <div className="mb-3">
          <div className="text-[28px] font-semibold text-white mb-1">
            {city.aqi} - {city.aqiLabel}
          </div>
          <div className="text-[13px] text-white/70 leading-relaxed">
            Air quality index is {city.aqi}, which is similar to yesterday at about this time.
          </div>
        </div>
        
        {/* AQI Gradient Bar */}
        <div className="relative h-1.5 rounded-full overflow-hidden">
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(90deg, #34C759 0%, #FFCC00 20%, #FF9500 40%, #FF3B30 60%, #A020F0 80%, #5856D6 100%)'
            }}
          />
          <motion.div
            className="absolute top-0 w-1 h-3 bg-white rounded-full shadow-lg"
            style={{
              left: `${(city.aqi / 200) * 100}%`,
              transform: 'translateX(-50%) translateY(-25%)',
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.9, duration: 0.3 }}
          />
        </div>
      </WeatherWidget>

      {/* Humidity */}
      <WeatherWidget
        title="Humidity"
        icon={<Droplets className="w-4 h-4" />}
        delay={0.8}
        isDarkMode={isDarkMode}
      >
        <div className="text-[28px] font-bold text-white mb-2">
          {city.humidity}%
        </div>
        <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
          <motion.div
            className="absolute left-0 top-0 h-full rounded-full bg-blue-400"
            initial={{ width: 0 }}
            animate={{ width: `${city.humidity}%` }}
            transition={{ delay: 0.9, duration: 0.6 }}
          />
        </div>
        <div className="text-[12px] text-white/60">
          The dew point is {city.dewPoint}° right now.
        </div>
      </WeatherWidget>
    </div>
  );
}