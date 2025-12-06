import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search } from 'lucide-react';
import { WindowChrome } from './components/WindowChrome';
import { Sidebar } from './components/Sidebar';
import { HeroSection } from './components/HeroSection';
import { HourlyForecast } from './components/HourlyForecast';
import { WidgetGrid } from './components/WidgetGrid';
import { mockCities } from './utils/mockData';
import { getTimeOfDay, getBackgroundGradient } from './utils/gradients';
import { CityWeather } from './types/weather';

export default function App() {
  const [selectedCityId, setSelectedCityId] = useState<string>('1');
  const [selectedCity, setSelectedCity] = useState<CityWeather>(mockCities[0]);
  const [timeOfDay, setTimeOfDay] = useState(getTimeOfDay());
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const city = mockCities.find((c) => c.id === selectedCityId);
    if (city) {
      setSelectedCity(city);
    }
  }, [selectedCityId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOfDay(getTimeOfDay());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const { gradient, overlay } = getBackgroundGradient(timeOfDay, selectedCity.condition);
  const isPartlyCloudy = selectedCity.condition.toLowerCase().includes('partly cloudy');

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden p-4">
      {/* Animated Background */}
      <motion.div
        className="fixed inset-0 -z-10"
        style={{ background: gradient }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        key={`${selectedCityId}-gradient`}
      />
      <div
        className="fixed inset-0 -z-10"
        style={{ background: overlay }}
      />

      {/* Main Window */}
      <motion.div
        className="relative w-full h-full max-w-[1440px] max-h-[900px] rounded-xl frosted-glass shadow-2xl overflow-hidden"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}
      >
        <WindowChrome />

        <div className="flex h-full pt-14">
          {/* Sidebar */}
          <Sidebar
            cities={mockCities}
            selectedCityId={selectedCityId}
            onCitySelect={setSelectedCityId}
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={setIsSidebarOpen}
            isDarkMode={isPartlyCloudy}
          />

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Bar with Map Toggle and Search */}
            <div className="flex items-center justify-between px-6 pt-5 pb-3">
              <div className="w-9"></div>

              <motion.div
                className="relative w-64"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Search className="w-4 h-4 text-white/50" />
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full h-9 pl-10 pr-4 rounded-lg bg-white/10 backdrop-blur-md border border-white/12 text-white placeholder:text-white/40 outline-none transition-all duration-200 hover:bg-white/15 focus:bg-white/12 focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/15"
                />
              </motion.div>

              <motion.button
                className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-md border border-white/12 flex items-center justify-center text-white transition-all duration-200 hover:bg-white/15"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Add City"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </motion.button>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto scrollable-container">
              <div className="px-6 pb-6">
                {/* Hero Section */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedCityId}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <HeroSection city={selectedCity} />
                    <HourlyForecast hourly={selectedCity.hourly} isDarkMode={isPartlyCloudy} />
                    <div className="mt-6">
                      <WidgetGrid city={selectedCity} />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}