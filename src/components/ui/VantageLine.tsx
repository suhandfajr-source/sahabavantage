'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface VantageLineProps {
  variant?: 'vertical' | 'horizontal' | 'curve';
  className?: string;
}

export default function VantageLine({ variant = 'vertical', className = '' }: VantageLineProps) {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (variant === 'horizontal') {
    return (
      <div className={`relative w-full h-[1px] bg-[#C7A66A]/20 overflow-hidden ${className}`}>
        <motion.div
          className="h-full bg-gradient-to-r from-transparent via-[#C7A66A] to-transparent w-full"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
        />
      </div>
    );
  }

  if (variant === 'curve') {
    return (
      <div className={`relative w-full overflow-hidden flex justify-center ${className}`}>
        <svg viewBox="0 0 1200 120" className="w-full max-w-6xl stroke-[#C7A66A]/40 fill-none">
          <path
            d="M0,60 Q300,10 600,60 T1200,60"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative w-[1px] bg-[#C7A66A]/20 flex flex-col items-center ${className}`}>
      <motion.div
        className="w-[1.5px] bg-gradient-to-b from-[#C7A66A] via-[#E5C992] to-[#9D7D45] origin-top"
        style={{ scaleY, height: '100%' }}
      />
      <div className="absolute -bottom-1 w-2 h-2 rounded-full bg-[#C7A66A] shadow-[0_0_8px_#C7A66A]" />
    </div>
  );
}
