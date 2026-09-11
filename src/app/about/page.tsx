'use client';

import React from 'react';
import { brandDetails, leadershipMembers, brandMilestones } from '@/data/brandContent';
import { motion } from 'framer-motion';
import { Award, Compass, ShieldCheck, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="pt-32 pb-28 bg-[#F8F6F1] text-[#0B1D3A] min-h-screen">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-20">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C7A66A] block">
            ABOUT SAHABA VANTAGE
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif-luxury font-normal leading-tight text-[#0B1D3A]">
            Architecting Generational Legacies.
          </h1>
          <p className="text-sm sm:text-base text-[#6B6B6B] font-sans-luxury leading-relaxed">
            Didirikan dengan visi melahirkan mahakarya properti bernilai tinggi di Indonesia yang memadukan keunggulan teknik, kelestarian ekologi, dan privasi tanpa cela.
          </p>
        </div>
      </div>

      {/* Brand Story & Vision / Mission */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden border border-[#C7A66A]/30 shadow-2xl h-[420px] sm:h-[480px]">
              <img
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
                alt="Sahaba Vantage Heritage"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#C7A66A] font-semibold block">
                OUR HERITAGE
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif-luxury text-[#0B1D3A]">
                More Than Homes — Building for a Better Life
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed font-sans-luxury">
                Sahaba Vantage Estates lahir dari pengamatan mendalam terhadap perkembangan hunian urban di Indonesia yang kerap mengorbankan kualitas ruang dan alam demi densitas. Kami hadir untuk membuktikan bahwa kemewahan sejati terletak pada kesederhanaan proporsi arsitektur, kelestarian lanskap, dan keberlanjutan material.
              </p>
            </div>

            {/* Vision & Mission Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-6 rounded-2xl bg-white border border-[#C7A66A]/30 shadow-sm space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-[#C7A66A] font-semibold block">
                  Visi Perusahaan
                </span>
                <p className="text-xs text-[#0B1D3A] font-serif-luxury leading-relaxed font-medium">
                  Menjadi pengembang properti arsitektural terkemuka di Asia Tenggara yang diakui atas keunggulan estetika abadi dan kelestarian ekologi.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#C7A66A]/30 shadow-sm space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-[#C7A66A] font-semibold block">
                  Misi Perusahaan
                </span>
                <p className="text-xs text-[#0B1D3A] font-serif-luxury leading-relaxed font-medium">
                  Merancang dan membangun hunian berkepadatan rendah dengan standar craftmanship tertinggi serta menjamin privasi generasi penghuni.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership & Architectural Principals */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-24">
        <div className="max-w-2xl mb-12 space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C7A66A] block">
            THE STEWARDSHIP
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-normal text-[#0B1D3A]">
            Leadership & Visionaries
          </h2>
          <p className="text-xs sm:text-sm text-[#6B6B6B] font-sans-luxury">
            Dipimpin oleh para pakar arsitektur, manajemen proyek, dan kurator gaya hidup dengan rekam jejak prestisius.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leadershipMembers.map((leader, idx) => (
            <div
              key={idx}
              className="rounded-3xl overflow-hidden border border-[#C7A66A]/30 bg-white shadow-lg flex flex-col justify-between"
            >
              <div className="h-72 overflow-hidden">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6 space-y-3">
                <div>
                  <h3 className="font-serif-luxury text-xl font-bold text-[#0B1D3A]">{leader.name}</h3>
                  <span className="text-[11px] uppercase tracking-wider text-[#C7A66A] font-semibold block">
                    {leader.role}
                  </span>
                </div>
                <p className="text-xs text-[#6B6B6B] leading-relaxed font-sans-luxury">
                  {leader.bio}
                </p>
                {leader.quote && (
                  <p className="font-serif-luxury italic text-xs text-[#0B1D3A] border-t border-[#0B1D3A]/10 pt-3">
                    “{leader.quote}”
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones Timeline */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 bg-[#071326] rounded-[40px] text-[#F8F6F1] mb-24">
        <div className="max-w-2xl mb-12 space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C7A66A] block">
            CHRONOLOGY
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-luxury text-[#F8F6F1]">
            Our Milestones
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {brandMilestones.map((m, i) => (
            <div key={i} className="p-6 rounded-2xl bg-[#0B1D3A] border border-[#C7A66A]/20 space-y-2">
              <span className="font-serif-luxury text-2xl font-bold text-[#C7A66A] block">
                {m.year}
              </span>
              <h4 className="font-serif-luxury text-base font-medium text-[#F8F6F1]">
                {m.title}
              </h4>
              <p className="text-xs text-[#F8F6F1]/70 leading-relaxed font-sans-luxury">
                {m.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Contact Inquiries */}
      <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
        <h3 className="text-3xl sm:text-4xl font-serif-luxury text-[#0B1D3A]">
          Diskusikan Investasi Properti Bersama Kami.
        </h3>
        <div>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-[#0B1D3A] hover:bg-[#132B52] text-[#F8F6F1] text-xs uppercase tracking-widest font-semibold transition-all shadow-lg"
          >
            <span>Hubungi Kantor Pusat →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
