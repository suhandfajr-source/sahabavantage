'use client';

import React from 'react';
import { motion } from 'framer-motion';
import VantageLine from '../ui/VantageLine';
import Link from 'next/link';

export default function BrandPurpose() {
  return (
    <section id="purpose" className="relative py-28 sm:py-36 bg-[#F8F6F1] text-[#0B1D3A] overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 monogram-watermark opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="flex justify-center mb-8">
          <VantageLine variant="vertical" className="h-16" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Editorial Statement */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C7A66A] block">
                OUR PURPOSE
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif-luxury font-normal leading-[1.15] text-[#0B1D3A]">
                Building Meaningful Spaces for a{' '}
                <span className="italic text-[#9D7D45] font-serif-luxury">Better Life.</span>
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#6B6B6B] font-sans-luxury leading-relaxed max-w-xl">
              <p>
                Di Sahaba Vantage, kami percaya bahwa rumah bukan sekadar susunan dinding dan luas lantai. Rumah adalah fondasi bagi ketenangan batin, keharmonisan keluarga, dan memori yang diwariskan lintas generasi.
              </p>
              <p>
                Setiap proyek dirancang dengan pendekatan arsitektur editorial — mengintegrasikan iklim mikro, sirkulasi udara alami, material abadi, dan privasi tanpa kompromi. Kami tidak membangun untuk tren sesaat, melainkan menciptakan ruang hidup yang kian bernilai seiring waktu.
              </p>
            </div>

            <div className="pt-2 flex items-center space-x-6">
              <Link
                href="/philosophy"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-[#0B1D3A] hover:text-[#C7A66A] transition-colors group"
              >
                <span className="border-b border-[#0B1D3A] group-hover:border-[#C7A66A] pb-0.5">
                  Explore Our Philosophy
                </span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>

          {/* Right Architectural Image Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#C7A66A]/30 shadow-2xl group" data-cursor="VIEW">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
                alt="Architectural Harmony at Sahaba Vantage"
                className="w-full h-[420px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D3A]/60 via-transparent to-transparent" />
              
              {/* Floating Quote Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#0B1D3A]/80 backdrop-blur-md border border-[#C7A66A]/30 text-[#F8F6F1]">
                <p className="font-serif-luxury italic text-xs leading-relaxed text-[#F8F6F1]/90">
                  “Architecture is the learned game, correct and magnificent, of forms assembled in the light.”
                </p>
                <span className="text-[10px] uppercase tracking-widest text-[#C7A66A] mt-1 block font-sans-luxury">
                  Sahaba Architectural Creed
                </span>
              </div>
            </div>

            {/* Accent Gold Frame Offset */}
            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl border border-[#C7A66A]/40 -z-10 hidden sm:block pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
