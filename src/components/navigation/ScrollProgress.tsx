'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const sections = [
  { id: 'hero', label: 'Intro' },
  { id: 'purpose', label: 'Purpose' },
  { id: 'window', label: 'Portal' },
  { id: 'developments', label: 'Portfolio' },
  { id: 'principles', label: 'Principles' },
  { id: 'lifestyle', label: 'A Day' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'cta', label: 'Visit' }
];

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-center pointer-events-none">
      {/* Progress Track */}
      <div className="relative h-48 w-[1px] bg-[#C7A66A]/20 flex flex-col justify-between py-2">
        <motion.div
          className="absolute top-0 left-0 w-[2px] bg-[#C7A66A] origin-top shadow-[0_0_8px_#C7A66A]"
          style={{ scaleY, height: '100%' }}
        />

        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <div key={sec.id} className="relative flex items-center group pointer-events-auto">
              <a
                href={`#${sec.id}`}
                className={`w-2 h-2 -ml-[3.5px] rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-[#C7A66A] scale-125 shadow-[0_0_8px_#C7A66A]'
                    : 'bg-[#C7A66A]/40 hover:bg-[#C7A66A]'
                }`}
                aria-label={`Scroll to ${sec.label}`}
              />
              <span
                className={`absolute left-5 text-[9px] uppercase tracking-[0.2em] font-sans-luxury font-semibold whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'text-[#C7A66A] opacity-100 translate-x-0'
                    : 'text-[#6B6B6B] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                }`}
              >
                {sec.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
