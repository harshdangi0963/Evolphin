
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface BorderBeamProps {
  className?: string;
  size?: number;          // Length of the laser trail
  duration?: number;      // Speed of the loop (higher = slower/premium)
  borderWidth?: number;   // Thickness (default 1px)
  colorFrom?: string;     // Leading color
  colorTo?: string;       // Trailing color (usually transparent)
  borderRadius?: number;  // Must match parent's border-radius
  delay?: number;
}

/**
 * BorderBeam
 * A precision-engineered single-path border animation.
 */
export const BorderBeam: React.FC<BorderBeamProps> = ({
  className = "",
  size = 220, 
  duration = 12,
  borderWidth = 1.5, // Slightly thicker for visibility
  colorFrom = "#6366f1",
  colorTo = "transparent",
  borderRadius = 22,
  delay = 0,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div 
      className={`pointer-events-none absolute inset-0 z-[0] overflow-hidden rounded-[inherit] ${className}`}
      style={{ 
        borderRadius: `${borderRadius}px` 
      }}
    >
      <motion.div
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: "100%" }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          delay: delay,
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: size,
          height: borderWidth,
          background: `linear-gradient(to right, ${colorTo}, ${colorFrom})`,
          // offsetPath: rect() ensures a single continuous perimeter loop
          offsetPath: `rect(0 100% 100% 0 round ${borderRadius}px)`,
          offsetRotate: 'auto',
          willChange: 'offset-distance',
          // Added glow/blur to ensure visibility on light backgrounds
          filter: `blur(0.5px) drop-shadow(0 0 2px ${colorFrom})`,
        }}
      />
    </div>
  );
};
