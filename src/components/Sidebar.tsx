import { CityCard } from './CityCard';
import { CityWeather } from '../types/weather';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  cities: CityWeather[];
  selectedCityId: string;
  onCitySelect: (id: string) => void;
  isSidebarOpen: boolean;
  onToggleSidebar: (open: boolean) => void;
  isDarkMode?: boolean;
}

export function Sidebar({ cities, selectedCityId, onCitySelect, isSidebarOpen, onToggleSidebar, isDarkMode = false }: SidebarProps) {
  const sidebarClass = isDarkMode ? 'bg-black/20' : 'bg-white/5';
  
  return (
    <>
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className={`w-[220px] h-full border-r border-white/12 flex flex-col ${sidebarClass}`}
            initial={{ x: -220, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -220, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* City List */}
            <div className="flex-1 py-4 overflow-y-auto scrollable-container">
              <div className="space-y-0.5 px-2.5">
                {cities.map((city, index) => (
                  <CityCard
                    key={city.id}
                    city={city.city}
                    country={city.country}
                    temperature={city.temperature}
                    condition={city.condition}
                    localTime={city.localTime}
                    icon={city.icon}
                    high={city.high}
                    low={city.low}
                    isSelected={selectedCityId === city.id}
                    onClick={() => onCitySelect(city.id)}
                    delay={0.1 + index * 0.05}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar Toggle Button - Shows when sidebar is closed */}
      {!isSidebarOpen && (
        <motion.button
          className="absolute left-4 top-20 w-10 h-10 rounded-lg bg-white/10 backdrop-blur-md border border-white/12 flex items-center justify-center text-white transition-all duration-200 hover:bg-white/15 z-20"
          onClick={() => onToggleSidebar(true)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      )}

      {/* Close Sidebar Button - Shows when sidebar is open */}
      {isSidebarOpen && (
        <motion.button
          className="absolute left-[210px] top-20 w-6 h-10 rounded-r-lg bg-white/10 backdrop-blur-md border border-white/12 border-l-0 flex items-center justify-center text-white transition-all duration-200 hover:bg-white/15 z-20"
          onClick={() => onToggleSidebar(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
      )}
    </>
  );
}