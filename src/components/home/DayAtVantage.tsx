'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, CloudSun, Moon, Clock } from 'lucide-react';
import Image from 'next/image';

const timeFrames = [
  {
    id: 'morning',
    time: '06:30 WIB',
    label: 'Morning Awakening',
    headline: 'Start With Calm.',
    subhead: 'Embun pagi, udara pegunungan 19°C, dan cahaya emas pertama menyapa ruang santai keluarga.',
    description: 'Ketika kabut tipis perlahan terangkat di lembah Rancamaya, sinar matahari pagi masuk melalui kisi-kisi kayu jati. Nikmati secangkir seduhan teh hangat di dek terbuka dengan simfoni burung-burung liar.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1800&q=85',
    theme: {
      bg: 'bg-[#F4F1EA]',
      textColor: 'text-[#0B1D3A]',
      subTextColor: 'text-[#6B6B6B]',
      accentColor: 'text-[#9D7D45]',
      badgeBg: 'bg-[#0B1D3A]/10 text-[#0B1D3A]'
    },
    icon: Sun
  },
  {
    id: 'afternoon',
    time: '14:00 WIB',
    label: 'Afternoon Flow',
    headline: 'Space to Grow.',
    subhead: 'Ruang kerja bernapas, sirkulasi silang tanpa henti, dan ketenangan fokus yang produktif.',
    description: 'Kanopi pepohonan pinus menyaring panas tropis, menciptakan bayangan teduh alami. Courtyard di tengah hunian mengalirkan udara sejuk ke seluruh ruangan kerja dan ruang baca privat.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85',
    theme: {
      bg: 'bg-[#EDE7D9]',
      textColor: 'text-[#0B1D3A]',
      subTextColor: 'text-[#5C5C5C]',
      accentColor: 'text-[#C7A66A]',
      badgeBg: 'bg-[#C7A66A]/20 text-[#0B1D3A]'
    },
    icon: CloudSun
  },
  {
    id: 'evening',
    time: '18:45 WIB',
    label: 'Evening Haven',
    headline: 'Come Home to Better.',
    subhead: 'Kilau lampu hangat, api unggun di teras terbuka, dan keintiman makan malam multi-generasi.',
    description: 'Malam hari menghadirkan ketenangan absolut. Gemericik kolam refleksi dan pencahayaan aksen arsitektural menyambut kepulangan Anda ke tempat di mana waktu melambat.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
    theme: {
      bg: 'bg-[#071326]',
      textColor: 'text-[#F8F6F1]',
      subTextColor: 'text-[#F8F6F1]/75',
      accentColor: 'text-[#E5C992]',
      badgeBg: 'bg-[#C7A66A]/20 text-[#C7A66A]'
    },
    icon: Moon
  }
];

export default function DayAtVantage() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const current = timeFrames[selectedIdx];

  return (
    <section
      id="lifestyle"
      className={`relative py-28 sm:py-36 transition-colors duration-1000 ${current.theme.bg} ${current.theme.textColor} overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C7A66A] block">
              SIGNATURE EXPERIENCE
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif-luxury font-normal">
              A Day at Vantage
            </h2>
            <p className={`text-xs sm:text-sm font-sans-luxury ${current.theme.subTextColor}`}>
              Saksikan bagaimana pencahayaan arsitektur dan suasana hunian bertransformasi sepanjang 24 jam.
            </p>
          </div>

          {/* Timeframe Selector Buttons */}
          <div className="flex items-center p-1.5 rounded-full bg-[#0B1D3A]/10 backdrop-blur-md border border-[#C7A66A]/30">
            {timeFrames.map((tf, idx) => {
              const Icon = tf.icon;
              const isSelected = selectedIdx === idx;
              return (
                <button
                  key={tf.id}
                  onClick={() => setSelectedIdx(idx)}
                  className={`flex items-center space-x-2 px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-500 ${
                    isSelected
                      ? 'bg-[#C7A66A] text-[#0B1D3A] shadow-md scale-105'
                      : 'text-[#6B6B6B] hover:text-[#0B1D3A] dark:hover:text-[#F8F6F1]'
                  }`}
                  data-cursor={tf.time}
                >
                  <Icon size={14} />
                  <span className="hidden sm:inline">{tf.time}</span>
                  <span className="sm:hidden">{tf.id}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Presentation Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Visual Showcase */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-3xl overflow-hidden border border-[#C7A66A]/40 shadow-2xl h-[400px] sm:h-[480px] lg:h-[540px] group"
              >
                <Image
                  src={current.image}
                  alt={current.label}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071326]/75 via-transparent to-transparent" />

                {/* Floating Time Stamp */}
                <div className="absolute top-6 left-6 flex items-center space-x-2 px-4 py-2 rounded-full bg-[#0B1D3A]/80 backdrop-blur-md border border-[#C7A66A]/40 text-[#C7A66A] text-xs font-semibold">
                  <Clock size={14} />
                  <span>{current.time}</span>
                  <span className="text-white/40">•</span>
                  <span className="text-white">{current.label}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-5 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${current.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <span className={`text-xs uppercase tracking-[0.25em] font-semibold ${current.theme.accentColor} block`}>
                  {current.label}
                </span>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-normal leading-tight">
                  {current.headline}
                </h3>

                <p className={`text-sm sm:text-base font-sans-luxury font-medium leading-relaxed ${current.theme.textColor}`}>
                  {current.subhead}
                </p>

                <p className={`text-xs sm:text-sm font-sans-luxury leading-relaxed ${current.theme.subTextColor}`}>
                  {current.description}
                </p>

                <div className="pt-2">
                  <div className="p-4 rounded-2xl border border-[#C7A66A]/30 bg-black/5 dark:bg-white/5 space-y-1">
                    <span className="text-[10px] uppercase tracking-widest text-[#C7A66A] font-semibold block">
                      Architectural Feature
                    </span>
                    <p className={`text-xs font-sans-luxury ${current.theme.textColor}`}>
                      {selectedIdx === 0 && 'Low-E Acoustic Double Glazing & East-Facing Private Mountain Balconies.'}
                      {selectedIdx === 1 && 'Passive Wind Catcher Courtyards & Automated Solar Louvre Shading.'}
                      {selectedIdx === 2 && 'Indirect Architectural Warm Glow (2700K) & Heated Infinity Plunge Onsen.'}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
