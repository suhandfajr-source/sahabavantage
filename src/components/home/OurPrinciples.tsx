'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { brandPillars } from '@/data/brandContent';
import { ArrowUpRight } from 'lucide-react';

export default function OurPrinciples() {
  const [activePillar, setActivePillar] = useState<number>(0);

  return (
    <section id="principles" className="relative py-28 sm:py-36 bg-[#071326] text-[#F8F6F1] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C7A66A] block">
            ARCHITECTURAL PHILOSOPHY
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-normal text-[#F8F6F1]">
            Our Foundational Principles
          </h2>
          <p className="text-xs sm:text-sm text-[#F8F6F1]/70 font-sans-luxury leading-relaxed">
            Empat pilar nilai yang mendasari setiap garis sketsa, pemilihan material, dan konfigurasi lansekap di seluruh kawasan Sahaba Vantage.
          </p>
        </div>

        {/* Architectural Grid / Interactive Floorplan Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {brandPillars.map((pillar, idx) => {
            const isActive = activePillar === idx;
            return (
              <motion.div
                key={pillar.number}
                onMouseEnter={() => setActivePillar(idx)}
                className={`relative rounded-3xl p-6 sm:p-8 border transition-all duration-500 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[380px] ${
                  isActive
                    ? 'bg-[#0B1D3A] border-[#C7A66A] shadow-[0_10px_35px_rgba(199,166,106,0.2)]'
                    : 'bg-[#0B1D3A]/40 border-[#C7A66A]/20 hover:border-[#C7A66A]/60'
                }`}
                data-cursor="EXPAND"
              >
                {/* Background Image on Hover */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 pointer-events-none"
                  >
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D3A] via-[#0B1D3A]/80 to-transparent" />
                  </motion.div>
                )}

                {/* Top Number & Tag */}
                <div className="relative z-10 flex items-start justify-between">
                  <span className="font-serif-luxury text-2xl font-bold text-[#C7A66A]">
                    {pillar.number}
                  </span>
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                    isActive ? 'border-[#C7A66A] bg-[#C7A66A] text-[#0B1D3A]' : 'border-[#C7A66A]/30 text-[#C7A66A]'
                  }`}>
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 space-y-3 pt-8">
                  <span className="text-[10px] uppercase tracking-widest text-[#C7A66A] font-semibold block">
                    {pillar.subtitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif-luxury text-[#F8F6F1]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#F8F6F1]/70 leading-relaxed font-sans-luxury">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
