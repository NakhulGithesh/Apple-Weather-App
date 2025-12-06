import { motion } from 'motion/react';

export function WindowChrome() {
  return (
    <div className="absolute top-0 left-0 right-0 h-14 flex items-center justify-between px-4 z-10">
      {/* Traffic Light Buttons */}
      <div className="flex gap-2 -ml-4 -mt-5">
        <motion.button
          className="w-3 h-3 rounded-full bg-[#FF5F57] hover:bg-[#FF5F57]/80 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Close"
        />
        <motion.button
          className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:bg-[#FFBD2E]/80 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Minimize"
        />
        <motion.button
          className="w-3 h-3 rounded-full bg-[#28C840] hover:bg-[#28C840]/80 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Maximize"
        />
      </div>
    </div>
  );
}