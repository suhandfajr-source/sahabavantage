'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CinematicHero() {
  const { scrollY } = useScroll();

  // Scroll animations for split typography
  const textLeftX = useTransform(scrollY, [0, 500], [0, -80]);
  const textRightX = useTransform(scrollY, [0, 500], [0, 80]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.12]);
  const opacity = useTransform(scrollY, [0, 450], [1, 0.2]);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-[#071326] flex items-center justify-center">
      {/* Background Architectural Imagery with Parallax Scale */}
      <motion.div
        style={{ scale: heroScale }}
        className="absolute inset-0 z-0 origin-center"
      >
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85"
          alt="Sahaba Vantage Architectural Estate"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.62] contrast-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071326] via-transparent to-[#071326]/70" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#071326]/40 to-[#071326]/80" />
      </motion.div>

      {/* Hero Content Overlay */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center text-[#F8F6F1] flex flex-col items-center justify-center space-y-6 pt-16"
      >
        {/* Intro Monogram Reveal */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#0B1D3A]/70 border border-[#C7A66A]/40 backdrop-blur-md shadow-lg"
        >
          <Sparkles size={12} className="text-[#C7A66A]" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#C7A66A] font-semibold font-sans-luxury">
            MORE THAN HOMES
          </span>
        </motion.div>

        {/* Headline with Mask Reveal & Scroll Split */}
        <div className="overflow-hidden py-2">
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-5 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif-luxury font-normal tracking-tight"
          >
            <motion.span style={{ x: textLeftX }} className="inline-block text-[#F8F6F1]">
              Live
            </motion.span>
            
            {/* Center Gold Signature Line */}
            <span className="hidden sm:inline-block w-8 sm:w-16 h-[2px] bg-gradient-to-r from-[#C7A66A] to-[#E5C992]" />

            <motion.span
              style={{ x: textRightX }}
              className="inline-block gold-gradient-text italic font-serif-luxury"
            >
              Better.
            </motion.span>
          </motion.div>
        </div>

        {/* Supporting Narrative */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs sm:text-sm md:text-base text-[#F8F6F1]/80 font-sans-luxury max-w-xl mx-auto leading-relaxed tracking-wide"
        >
          Thoughtful spaces designed for a better way of living. Where modernist architecture harmonizes with undisturbed nature and timeless serenity.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#purpose"
            className="px-8 py-3.5 rounded-full bg-[#C7A66A] hover:bg-[#E5C992] text-[#0B1D3A] font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_4px_20px_rgba(199,166,106,0.35)] hover:shadow-[0_6px_28px_rgba(199,166,106,0.5)]"
            data-cursor="EXPLORE"
          >
            Explore Our World
          </a>

          <Link
            href="/developments"
            className="px-8 py-3.5 rounded-full border border-[#C7A66A]/50 hover:border-[#C7A66A] bg-[#0B1D3A]/40 hover:bg-[#0B1D3A]/80 text-[#F8F6F1] font-medium text-xs uppercase tracking-widest backdrop-blur-sm transition-all"
            data-cursor="PORTFOLIO"
          >
            View Developments
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center space-y-2 text-[#C7A66A]"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] font-semibold">SCROLL TO DISCOVER</span>
        <ArrowDown size={14} />
      </motion.div>
    </section>
  );
}
