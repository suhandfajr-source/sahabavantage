'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSiteData } from '@/components/DataProvider';
import { motion } from 'framer-motion';
import { MapPin, ArrowUpRight, Compass } from 'lucide-react';
import Image from 'next/image';

export default function DevelopmentsPage() {
  const { developments } = useSiteData();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'residential' | 'upcoming'>('all');

  const filtered = developments.filter((dev) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'residential') return dev.category === 'residential';
    if (selectedCategory === 'upcoming') return dev.status === 'upcoming';
    return true;
  });

  return (
    <div className="pt-32 pb-28 bg-[#F8F6F1] text-[#0B1D3A] min-h-screen">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-16">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#0B1D3A]/10 text-[#0B1D3A] text-[10px] uppercase tracking-[0.25em] font-semibold">
            <Compass size={12} className="text-[#C7A66A]" />
            <span>PORTFOLIO DIRECTORY</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif-luxury font-normal leading-tight text-[#0B1D3A]">
            Architectural Sanctuaries Designed for Generations.
          </h1>

          <p className="text-sm sm:text-base text-[#6B6B6B] font-sans-luxury leading-relaxed">
            Setiap kawasan hunian Sahaba Vantage dikembangkan dengan integritas lanskap, kepadatan rendah (low density), dan estetika modern tropis yang tak lekang oleh waktu.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mt-10 flex items-center space-x-3 border-b border-[#0B1D3A]/10 pb-4">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#0B1D3A] text-[#F8F6F1] shadow-md'
                : 'text-[#6B6B6B] hover:text-[#0B1D3A]'
            }`}
          >
            All Developments ({developments.length})
          </button>
          <button
            onClick={() => setSelectedCategory('residential')}
            className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
              selectedCategory === 'residential'
                ? 'bg-[#0B1D3A] text-[#F8F6F1] shadow-md'
                : 'text-[#6B6B6B] hover:text-[#0B1D3A]'
            }`}
          >
            Residential Estates
          </button>
          <button
            onClick={() => setSelectedCategory('upcoming')}
            className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
              selectedCategory === 'upcoming'
                ? 'bg-[#0B1D3A] text-[#F8F6F1] shadow-md'
                : 'text-[#6B6B6B] hover:text-[#0B1D3A]'
            }`}
          >
            Upcoming Releases
          </button>
        </div>
      </div>

      {/* Large Editorial Project Cards */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
        {filtered.map((dev, idx) => (
          <motion.div
            key={dev.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[32px] overflow-hidden border border-[#C7A66A]/30 bg-white shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-0 group"
          >
            {/* Project Image */}
            <div className="lg:col-span-7 relative h-[380px] sm:h-[460px] lg:h-auto overflow-hidden">
              <Image
                src={dev.heroImage}
                alt={dev.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D3A]/70 via-transparent to-transparent" />

              {/* Status and Location Badges */}
              <div className="absolute top-6 left-6 flex items-center space-x-2">
                <span className="px-3 py-1 rounded-full bg-[#0B1D3A]/85 backdrop-blur-md border border-[#C7A66A]/40 text-[#C7A66A] text-[10px] uppercase tracking-widest font-semibold">
                  {dev.status === 'active' ? 'Active Collection' : 'Private Preview'}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#0B1D3A]/80 backdrop-blur-md text-[#F8F6F1] text-[10px] uppercase tracking-widest">
                  {dev.stats.totalUnits} Units
                </span>
              </div>
            </div>

            {/* Project Content */}
            <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-xs text-[#C7A66A] font-semibold">
                  <MapPin size={14} />
                  <span>{dev.location.city}, {dev.location.province}</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-serif-luxury text-[#0B1D3A]">
                  {dev.name}
                </h2>

                <p className="text-xs uppercase tracking-widest text-[#9D7D45] font-semibold">
                  {dev.tagline}
                </p>

                <p className="text-xs sm:text-sm text-[#6B6B6B] font-sans-luxury leading-relaxed">
                  {dev.shortDescription}
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#0B1D3A]/10 text-xs">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#6B6B6B] block">Green Landscape</span>
                    <span className="font-serif-luxury font-bold text-base text-[#0B1D3A]">{dev.stats.greenAreaPercentage}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#6B6B6B] block">Site Area</span>
                    <span className="font-serif-luxury font-bold text-base text-[#0B1D3A]">{dev.stats.siteArea}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div>
                <Link
                  href={`/developments/${dev.slug}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-3.5 rounded-full bg-[#0B1D3A] hover:bg-[#132B52] text-[#F8F6F1] text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md group-hover:bg-[#C7A66A] group-hover:text-[#0B1D3A]"
                >
                  <span>Explore Development Details</span>
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
