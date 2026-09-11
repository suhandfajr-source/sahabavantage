'use client';

import React from 'react';
import { brandPillars } from '@/data/brandContent';
import { Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function PhilosophyPage() {
  return (
    <div className="pt-32 pb-28 bg-[#F8F6F1] text-[#0B1D3A] min-h-screen">
      {/* Editorial Manifesto Hero */}
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center space-y-6 mb-20">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#0B1D3A]/10 text-[#0B1D3A] text-[10px] uppercase tracking-[0.25em] font-semibold">
          <Sparkles size={12} className="text-[#C7A66A]" />
          <span>BRAND MANIFESTO</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif-luxury font-normal leading-[1.12] text-[#0B1D3A]">
          The Philosophy of <br />
          <span className="italic text-[#9D7D45]">Live Better.</span>
        </h1>

        <p className="text-base sm:text-xl font-serif-luxury italic text-[#6B6B6B] max-w-2xl mx-auto leading-relaxed">
          “Kami tidak sekadar mendirikan struktur fisik. Kami mengukir ruang tempat ketenangan, martabat keluarga, dan harmoni alam bersatu.”
        </p>
      </div>

      {/* Featured Editorial Photo */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-24">
        <div className="rounded-[36px] overflow-hidden border border-[#C7A66A]/40 shadow-2xl h-[420px] sm:h-[520px] relative">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=85"
            alt="Sahaba Vantage Philosophy Estate"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D3A]/70 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-white flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C7A66A] font-semibold">
              ARCHITECTURAL INTEGRITY
            </span>
            <p className="text-xs font-serif-luxury text-white/80 max-w-md">
              Membangun dengan material jujur yang merespons perubahan cahaya matahari sepanjang tahun.
            </p>
          </div>
        </div>
      </div>

      {/* Narrative Essay Sections */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-16 text-sm sm:text-base text-[#6B6B6B] font-sans-luxury leading-relaxed mb-24">
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C7A66A] block">
            01 / SPATIAL CLARITY
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif-luxury text-[#0B1D3A]">
            Ketenangan Sebagai Kemewahan Tertinggi
          </h2>
          <p>
            Di dunia modern yang serba cepat dan sarat distraksi visual, kemewahan sejati bergeser dari ornamen yang berlebihan menuju kejernihan ruang. Rumah harus menjadi tempat pemulihan energi (restorative space) bagi jiwa dan raga.
          </p>
          <p>
            Di setiap denah yang kami rancang, kami mengeliminasi sudut-sudut mati dan partisi yang menghambat aliran cahaya serta udara. Penggunaan plafon tinggi dan bukaan berkaca ganda menciptakan sensasi kebebasan tanpa mengorbankan keamanan privat.
          </p>
        </div>

        <div className="space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C7A66A] block">
            02 / BIOPHILIC LIVING
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif-luxury text-[#0B1D3A]">
            Alam Bukan Pelengkap, Melainkan Rekan Hidup
          </h2>
          <p>
            Pendekatan biophilic design kami menempatkan lansekap hijau sebagai pusat kehidupan hunian. Pohon-pohon pinus dan eucalyptus yang berusia puluhan tahun dipertahankan dalam masterplan. 
          </p>
          <p>
            Courtyard internal dan kolam refleksi dirancang untuk mengalirkan gemericik air alami yang meredam kebisingan luar, menciptakan mikroklimat yang senantiasa 2–3 derajat lebih sejuk secara pasif.
          </p>
        </div>

        <div className="space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C7A66A] block">
            03 / GENERATIONAL VALUE
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif-luxury text-[#0B1D3A]">
            Integritas Material Abadi
          </h2>
          <p>
            Kami menolak material sintetis sekali pakai. Batu andesit vulkanik, kayu jati kelas satu dengan sertifikasi lestari, dan panel titanium zinc dipilih karena karakternya yang kian matang dan berwibawa seiring berjalannya dekade.
          </p>
        </div>
      </div>

      {/* 4 Pillars Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 bg-[#0B1D3A] rounded-[40px] text-[#F8F6F1]">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C7A66A]">
            FOUR BRAND PILLARS
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury text-[#F8F6F1]">
            Guiding Principles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {brandPillars.map((p) => (
            <div key={p.number} className="p-6 rounded-3xl bg-[#132B52]/60 border border-[#C7A66A]/20 space-y-3">
              <span className="text-2xl font-serif-luxury text-[#C7A66A] font-bold">{p.number}</span>
              <h3 className="font-serif-luxury text-xl font-normal text-[#F8F6F1]">{p.title}</h3>
              <p className="text-xs text-[#F8F6F1]/70 leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="max-w-4xl mx-auto px-6 text-center pt-24 space-y-6">
        <h3 className="text-3xl sm:text-4xl font-serif-luxury text-[#0B1D3A]">
          Mulailah Perjalanan Menuju Kualitas Hidup Lebih Baik.
        </h3>
        <div>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-[#0B1D3A] hover:bg-[#132B52] text-[#F8F6F1] text-xs uppercase tracking-widest font-semibold transition-all shadow-lg"
          >
            <span>Hubungi Private Concierge →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
