import { Search } from 'lucide-react';
import { motion } from 'motion/react';

export function SearchBar() {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <Search className="w-4 h-4 text-white/50" />
      </div>
      <input
        type="text"
        placeholder="Search for a city or airport"
        className="w-full h-11 pl-10 pr-4 rounded-[10px] bg-white/10 backdrop-blur-md border border-white/12 text-white placeholder:text-white/40 outline-none transition-all duration-200 hover:bg-white/15 focus:bg-white/12 focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/15"
      />
    </motion.div>
  );
}
