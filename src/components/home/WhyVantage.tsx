'use client';

import React from 'react';
import { ShieldCheck, Compass, Trees, Award } from 'lucide-react';

const valuePillars = [
  {
    icon: Compass,
    title: 'Architectural Distinctiveness',
    description: 'Bukan model massal klise. Setiap hunian dikembangkan melalui studi topografi, arah angin, dan pencahayaan alami yang eksklusif.'
  },
  {
    icon: Trees,
    title: 'Preserved Nature & Low Density',
    description: 'Lebih dari 60% area kawasan dipertahankan sebagai kanopi hijau, jalur pejalan kaki alami, dan resapan air biophilic.'
  },
  {
    icon: ShieldCheck,
    title: 'Generational Craftsmanship',
    description: 'Material premium seperti batu Andesit alam, marmer Travertine, dan kayu jati tersertifikasi yang semakin indah seiring waktu.'
  },
  {
    icon: Award,
    title: 'Discrete Privacy & Prestige',
    description: 'Akses terbatas, gerbang keamanan berstandar tinggi, serta komunitas penghuni yang menghargai ketenangan dan martabat.'
  }
];

export default function WhyVantage() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#0B1D3A] text-[#F8F6F1] border-t border-[#C7A66A]/20 overflow-hidden">
      {/* Monogram Backdrop */}
      <div className="absolute inset-0 monogram-watermark opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C7A66A]">
            WHY SAHABA VANTAGE
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-normal text-[#F8F6F1]">
            A Commitment to Enduring Value
          </h2>
          <p className="text-xs sm:text-sm text-[#F8F6F1]/70 font-sans-luxury">
            Memilih Sahaba Vantage adalah investasi pada kualitas hidup keluarga dan aset arsitektur yang melampaui generasi.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {valuePillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#132B52]/50 border border-[#C7A66A]/20 hover:border-[#C7A66A]/60 transition-all duration-300 space-y-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#0B1D3A] border border-[#C7A66A]/40 flex items-center justify-center text-[#C7A66A] group-hover:scale-110 transition-transform">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-serif-luxury font-medium text-[#F8F6F1]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#F8F6F1]/70 leading-relaxed font-sans-luxury">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
