'use client';

import React from 'react';
import Link from 'next/link';
import { brandDetails } from '@/data/brandContent';
import { developments } from '@/data/developments';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#071326] text-[#F8F6F1] pt-20 pb-12 border-t border-[#C7A66A]/20 overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[#C7A66A]/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-[#C7A66A]/15">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-6">
            <Link href="/" className="inline-block group">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full border border-[#C7A66A] flex items-center justify-center bg-[#0B1D3A]">
                  <span className="font-serif-luxury font-bold text-base text-[#C7A66A]">SV</span>
                </div>
                <div>
                  <span className="font-serif-luxury text-lg tracking-[0.15em] uppercase font-bold text-[#F8F6F1] block">
                    SAHABA VANTAGE
                  </span>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#C7A66A] font-sans-luxury font-semibold block">
                    ESTATES
                  </span>
                </div>
              </div>
            </Link>

            <p className="text-sm text-[#F8F6F1]/70 font-sans-luxury leading-relaxed max-w-sm">
              Building meaningful architectural spaces for a better way of living. Crafted with quiet luxury, restorative landscapes, and enduring integrity.
            </p>

            <div className="pt-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C7A66A] font-semibold block mb-1">
                Corporate Address
              </span>
              <p className="text-xs text-[#F8F6F1]/60 leading-relaxed">
                {brandDetails.headquarters}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#C7A66A] font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F8F6F1]/75">
              <li>
                <Link href="/developments" className="hover:text-[#C7A66A] transition-colors">
                  Developments
                </Link>
              </li>
              <li>
                <Link href="/philosophy" className="hover:text-[#C7A66A] transition-colors">
                  Philosophy
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#C7A66A] transition-colors">
                  About Sahaba
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-[#C7A66A] transition-colors">
                  Journal & Insights
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C7A66A] transition-colors">
                  Private Visit
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-[#C7A66A]/80 hover:text-[#C7A66A] transition-colors">
                  Admin CMS
                </Link>
              </li>
            </ul>
          </div>

          {/* Developments List */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#C7A66A] font-semibold">
              Portfolio
            </h4>
            <ul className="space-y-3 text-xs text-[#F8F6F1]/75">
              {developments.map((dev) => (
                <li key={dev.id}>
                  <Link
                    href={`/developments/${dev.slug}`}
                    className="hover:text-[#C7A66A] transition-colors flex items-center justify-between group"
                  >
                    <span>{dev.name}</span>
                    <span className="text-[10px] text-[#C7A66A] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                      {dev.location.city} ↗
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Concierge & Newsletter */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#C7A66A] font-semibold">
              Private Concierge
            </h4>
            <p className="text-xs text-[#F8F6F1]/70 leading-relaxed">
              Daftarkan email Anda untuk menerima editorial arsitektur dan rilis proyek privat.
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Alamat email Anda..."
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-[#132B52]/70 border border-[#C7A66A]/30 text-xs text-[#F8F6F1] focus:outline-none focus:border-[#C7A66A]"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#C7A66A] hover:text-[#E5C992] p-1"
                aria-label="Subscribe"
              >
                <ArrowUpRight size={16} />
              </button>
            </div>
            <div className="flex items-center space-x-2 text-[11px] text-[#F8F6F1]/50 pt-1">
              <ShieldCheck size={14} className="text-[#C7A66A]" />
              <span>Privasi data Anda terjaga dengan ketat</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F8F6F1]/50 gap-4">
          <p>© {new Date().getFullYear()} Sahaba Vantage Estates. All Rights Reserved.</p>
          <div className="flex items-center space-x-6 text-xs">
            <span className="hover:text-[#C7A66A] cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-[#C7A66A] cursor-pointer transition-colors">Terms of Experience</span>
            <span className="hover:text-[#C7A66A] cursor-pointer transition-colors">Architectural Registry</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
