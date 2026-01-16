
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FlipUnitProps {
  value: string;
  label: string;
}

const FlipUnit: React.FC<FlipUnitProps> = ({ value, label }) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative h-8 w-10 bg-slate-50/40 backdrop-blur-md rounded-lg overflow-hidden border border-slate-200/50 shadow-sm flex items-center justify-center">
        {/* Subtle internal depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none"></div>
        
        {/* Silky Sliding Numbers */}
        <div className="relative h-5 w-full flex justify-center items-center overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={value}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ 
                duration: 0.6,
                ease: [0.32, 0.72, 0, 1] // Smooth exponential ease-out
              }}
              className="text-[13px] font-black text-slate-600 font-mono tracking-tighter"
            >
              {value}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
      <span className="text-[6px] font-black text-slate-400 uppercase tracking-[0.25em]">{label}</span>
    </div>
  );
};

export const FlipClock: React.FC<{ time: string }> = ({ time }) => {
  // Expected format HH:MM:SS
  const parts = time.split(':');
  if (parts.length < 3) return null;

  return (
    <div className="flex items-start gap-1.5 select-none scale-90 origin-bottom-right">
      <FlipUnit value={parts[0]} label="HRS" />
      <div className="pt-3">
        <span className="text-slate-300 font-black text-[10px]">:</span>
      </div>
      <FlipUnit value={parts[1]} label="MIN" />
      <div className="pt-3">
        <span className="text-slate-300 font-black text-[10px]">:</span>
      </div>
      <FlipUnit value={parts[2]} label="SEC" />
    </div>
  );
};
