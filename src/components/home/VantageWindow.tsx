'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function VantageWindow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Scale frame from modest size into full perspective
  const scale = useTransform(scrollYProgress, [0.1, 0.6], [0.82, 1.05]);
  const imageScale = useTransform(scrollYProgress, [0.1, 0.6], [1.2, 1]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.4, 0.8, 1], [0.6, 1, 1, 0.7]);
  const textY = useTransform(scrollYProgress, [0.2, 0.5], [60, 0]);

  return (
    <section
      id="window"
      ref={containerRef}
      className="relative py-28 sm:py-36 bg-[#071326] text-[#F8F6F1] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center mb-12 space-y-3">
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C7A66A]">
          SIGNATURE EXPERIENCE
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif-luxury font-normal text-[#F8F6F1]">
          The Vantage Window
        </h2>
        <p className="text-xs sm:text-sm text-[#F8F6F1]/70 font-sans-luxury max-w-lg mx-auto">
          Sebuah portal visual yang mengaburkan batas antara ruang digital dan realitas arsitektur hunian.
        </p>
      </div>

      {/* Interactive Scaling Window Frame */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          style={{ scale, opacity }}
          className="relative rounded-[32px] sm:rounded-[40px] overflow-hidden border-2 border-[#C7A66A]/40 shadow-[0_20px_70px_rgba(0,0,0,0.8)] h-[480px] sm:h-[600px] lg:h-[650px] group"
          data-cursor="ENTER"
        >
          {/* Internal Portal Image */}
          <motion.img
            style={{ scale: imageScale }}
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=85"
            alt="The Vantage Window Portal to Vantage Residence"
            className="w-full h-full object-cover origin-center"
          />

          {/* Luxury Frame Accents */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#071326] via-[#071326]/20 to-transparent" />
          <div className="absolute inset-4 sm:inset-6 rounded-[24px] sm:rounded-[32px] border border-[#C7A66A]/20 pointer-events-none" />

          {/* Corner Monogram Stamps */}
          <div className="absolute top-8 left-8 text-[10px] uppercase tracking-[0.3em] text-[#C7A66A] font-sans-luxury font-semibold hidden sm:block">
            PORTAL 01 // VANTAGE RESIDENCE
          </div>
          <div className="absolute top-8 right-8 text-[10px] uppercase tracking-[0.3em] text-[#C7A66A] font-sans-luxury font-semibold hidden sm:block">
            6.65° S, 106.82° E
          </div>

          {/* Floating Card Content */}
          <motion.div
            style={{ y: textY }}
            className="absolute bottom-8 left-8 right-8 sm:bottom-12 sm:left-12 sm:right-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6"
          >
            <div className="space-y-2 text-left max-w-xl">
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#C7A66A] bg-[#0B1D3A]/80 px-3 py-1 rounded-full border border-[#C7A66A]/30">
                Bogor Hillside Sanctuary
              </span>
              <h3 className="text-2xl sm:text-4xl font-serif-luxury text-[#F8F6F1]">
                Vantage Residence
              </h3>
              <p className="text-xs sm:text-sm text-[#F8F6F1]/80 font-sans-luxury leading-relaxed">
                24 hunian kontemporer di ketinggian sejuk Rancamaya dengan pemandangan langsung Gunung Salak.
              </p>
            </div>

            <Link
              href="/developments/vantage-residence"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#C7A66A] hover:bg-[#E5C992] text-[#0B1D3A] font-semibold text-xs uppercase tracking-widest transition-all shadow-lg group-hover:scale-105"
            >
              <span>Enter Development</span>
              <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
