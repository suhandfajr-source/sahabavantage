'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#071326] text-[#F8F6F1] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Monogram */}
      <div className="absolute inset-0 monogram-watermark opacity-25 pointer-events-none" />

      <div className="max-w-xl text-center space-y-6 relative z-10">
        <div className="w-16 h-16 rounded-full bg-[#0B1D3A] border border-[#C7A66A]/40 flex items-center justify-center mx-auto text-[#C7A66A]">
          <Compass size={32} />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C7A66A] font-semibold block">
            404 NOT FOUND
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif-luxury font-normal text-[#F8F6F1]">
            You’ve Taken a Different Turn.
          </h1>
          <p className="text-xs sm:text-sm text-[#F8F6F1]/70 font-sans-luxury max-w-md mx-auto leading-relaxed">
            Halaman yang Anda cari mungkin telah dipindahkan atau berada di luar rute panduan arsitektur kami. Let us guide you back.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-3.5 rounded-full bg-[#C7A66A] hover:bg-[#E5C992] text-[#0B1D3A] font-semibold text-xs uppercase tracking-widest transition-all shadow-lg flex items-center space-x-2"
          >
            <span>Return Home</span>
            <ArrowRight size={14} />
          </Link>

          <Link
            href="/developments"
            className="px-8 py-3.5 rounded-full border border-white/20 hover:border-[#C7A66A] text-[#F8F6F1] text-xs uppercase tracking-widest font-semibold transition-all"
          >
            View Developments
          </Link>
        </div>
      </div>
    </div>
  );
}
