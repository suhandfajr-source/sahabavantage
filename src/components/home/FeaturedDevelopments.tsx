'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { developments } from '@/data/developments';
import { ArrowUpRight, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function FeaturedDevelopments() {
  const [activeIdx, setActiveIdx] = useState(0);

  const nextProject = () => {
    setActiveIdx((prev) => (prev + 1) % developments.length);
  };

  const prevProject = () => {
    setActiveIdx((prev) => (prev - 1 + developments.length) % developments.length);
  };

  const currentDev = developments[activeIdx];

  return (
    <section id="developments" className="relative py-28 sm:py-36 bg-[#F8F6F1] text-[#0B1D3A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 sm:pb-16 border-b border-[#0B1D3A]/10 gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C7A66A] block">
              FEATURED PORTFOLIO
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif-luxury font-normal text-[#0B1D3A]">
              Selected Developments
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] font-sans-luxury">
              Koleksi mahakarya arsitektur yang dirancang secara spesifik dengan kesadaran lanskap dan kenyamanan abadi.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-4">
            <div className="text-xs tracking-widest font-sans-luxury text-[#6B6B6B] font-semibold pr-2">
              <span className="text-[#0B1D3A] text-sm">0{activeIdx + 1}</span> / 0{developments.length}
            </div>
            <button
              onClick={prevProject}
              className="w-12 h-12 rounded-full border border-[#0B1D3A]/20 hover:border-[#C7A66A] hover:bg-[#0B1D3A] hover:text-[#F8F6F1] flex items-center justify-center transition-all"
              aria-label="Previous project"
              data-cursor="PREV"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextProject}
              className="w-12 h-12 rounded-full border border-[#0B1D3A]/20 hover:border-[#C7A66A] hover:bg-[#0B1D3A] hover:text-[#F8F6F1] flex items-center justify-center transition-all"
              aria-label="Next project"
              data-cursor="NEXT"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Cinematic Showcase Presentation */}
        <div className="pt-12 sm:pt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Project Card Preview (Door Transition Target) */}
          <div className="lg:col-span-7">
            <motion.div
              key={currentDev.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl overflow-hidden border border-[#C7A66A]/30 shadow-2xl group"
              data-cursor="VIEW ↗"
            >
              <Link href={`/developments/${currentDev.slug}`} className="block relative">
                <div className="relative h-[380px] sm:h-[480px] lg:h-[540px] overflow-hidden">
                  <Image
                    src={currentDev.heroImage}
                    alt={currentDev.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D3A]/80 via-transparent to-transparent" />

                {/* Status Badge */}
                <div className="absolute top-6 left-6 flex items-center space-x-2">
                  <span className="px-3.5 py-1 rounded-full bg-[#0B1D3A]/80 backdrop-blur-md border border-[#C7A66A]/40 text-[#C7A66A] text-[10px] uppercase tracking-widest font-semibold">
                    {currentDev.status === 'active' ? 'Limited Availability' : 'Upcoming Release'}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#0B1D3A]/80 backdrop-blur-md border border-white/10 text-[#F8F6F1] text-[10px] uppercase tracking-widest">
                    {currentDev.stats.totalUnits} Units Only
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-[#F8F6F1]">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1.5 text-xs text-[#C7A66A]">
                      <MapPin size={14} />
                      <span>{currentDev.location.city}, {currentDev.location.province}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif-luxury">{currentDev.name}</h3>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-[#C7A66A] text-[#0B1D3A] flex items-center justify-center shadow-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Right Project Editorial Data & Units */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              key={`text-${currentDev.id}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C7A66A]">
                  0{activeIdx + 1} • {currentDev.location.city.toUpperCase()}
                </span>
                <h3 className="text-3xl sm:text-4xl font-serif-luxury text-[#0B1D3A]">
                  {currentDev.tagline}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#6B6B6B] font-sans-luxury leading-relaxed">
                {currentDev.shortDescription}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#0B1D3A]/10">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#6B6B6B] block">
                    Total Area
                  </span>
                  <span className="text-lg font-serif-luxury font-semibold text-[#0B1D3A]">
                    {currentDev.stats.siteArea}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#6B6B6B] block">
                    Green Landscape
                  </span>
                  <span className="text-lg font-serif-luxury font-semibold text-[#0B1D3A]">
                    {currentDev.stats.greenAreaPercentage}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#6B6B6B] block">
                    Collection
                  </span>
                  <span className="text-lg font-serif-luxury font-semibold text-[#0B1D3A]">
                    {currentDev.stats.totalUnits} Residences
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#6B6B6B] block">
                    Estimated Completion
                  </span>
                  <span className="text-lg font-serif-luxury font-semibold text-[#0B1D3A]">
                    {currentDev.stats.completionYear}
                  </span>
                </div>
              </div>

              {/* CTA link */}
              <div className="pt-2 flex items-center space-x-4">
                <Link
                  href={`/developments/${currentDev.slug}`}
                  className="px-7 py-3.5 rounded-full bg-[#0B1D3A] hover:bg-[#132B52] text-[#F8F6F1] font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-md flex items-center space-x-2"
                >
                  <span>Discover Development</span>
                  <ArrowUpRight size={15} className="text-[#C7A66A]" />
                </Link>

                <Link
                  href="/developments"
                  className="text-xs uppercase tracking-widest font-semibold text-[#6B6B6B] hover:text-[#0B1D3A] transition-colors"
                >
                  View All Projects
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
