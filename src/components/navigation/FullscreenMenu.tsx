'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Phone, MapPin } from 'lucide-react';
import { brandDetails } from '@/data/brandContent';

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPrivateVisit: () => void;
}

const menuItems = [
  {
    number: '01',
    title: 'Developments',
    href: '/developments',
    subtitle: 'Bogor • Bandung • Jakarta',
    previewImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    number: '02',
    title: 'Philosophy',
    href: '/philosophy',
    subtitle: 'The Meaning of Live Better',
    previewImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    number: '03',
    title: 'About Sahaba',
    href: '/about',
    subtitle: 'Vision, Legacy & Leadership',
    previewImage: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80'
  },
  {
    number: '04',
    title: 'Journal & Insights',
    href: '/journal',
    subtitle: 'Architectural Editorial & Market Insights',
    previewImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
  },
  {
    number: '05',
    title: 'Private Visit',
    href: '/contact',
    subtitle: 'Schedule Your Exclusive Viewing',
    previewImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
  }
];

export default function FullscreenMenu({
  isOpen,
  onClose,
  onOpenPrivateVisit
}: FullscreenMenuProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 bg-[#071326] text-[#F8F6F1] flex flex-col justify-between overflow-hidden"
        >
          {/* Background Ambient Preview Image */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25 transition-opacity duration-700">
            <motion.img
              key={activeIdx}
              initial={{ scale: 1.08, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.35 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              src={menuItems[activeIdx].previewImage}
              alt="Menu Background Preview"
              className="w-full h-full object-cover filter blur-[2px]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071326] via-[#071326]/85 to-transparent" />
          </div>

          {/* Top Bar */}
          <div className="max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-12 py-8 flex items-center justify-between relative z-20">
            <Link href="/" onClick={onClose} className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-full border border-[#C7A66A] flex items-center justify-center bg-[#0B1D3A]">
                <span className="font-serif-luxury font-bold text-sm text-[#C7A66A]">SV</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif-luxury text-base tracking-[0.15em] uppercase font-bold text-[#F8F6F1]">
                  SAHABA VANTAGE
                </span>
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#C7A66A] font-semibold">
                  ESTATES
                </span>
              </div>
            </Link>

            <button
              onClick={onClose}
              className="flex items-center space-x-2 px-4 py-2 rounded-full border border-[#C7A66A]/30 hover:border-[#C7A66A] bg-[#0B1D3A]/60 hover:bg-[#0B1D3A] text-xs uppercase tracking-widest text-[#F8F6F1] transition-all group"
            >
              <span>Close</span>
              <X size={16} className="text-[#C7A66A] group-hover:rotate-90 transition-transform" />
            </button>
          </div>

          {/* Main Menu Links */}
          <div className="max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-12 py-4 relative z-20 flex-1 flex flex-col justify-center">
            <nav className="space-y-4 sm:space-y-6">
              {menuItems.map((item, idx) => (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 + 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className="group"
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="inline-flex items-baseline space-x-4 sm:space-x-8 text-left py-1"
                  >
                    <span className="font-sans-luxury text-xs sm:text-sm tracking-[0.25em] text-[#C7A66A] font-medium opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">
                      {item.number}
                    </span>
                    <span className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-normal text-[#F8F6F1] group-hover:text-[#C7A66A] group-hover:translate-x-3 transition-all duration-300">
                      {item.title}
                    </span>
                    <ArrowUpRight
                      size={24}
                      className="text-[#C7A66A] opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 hidden sm:inline"
                    />
                  </Link>
                  <p className="text-xs text-[#F8F6F1]/50 font-sans-luxury pl-8 sm:pl-16 mt-0.5 group-hover:text-[#F8F6F1]/80 transition-colors">
                    {item.subtitle}
                  </p>
                </motion.div>
              ))}
            </nav>
          </div>

          {/* Bottom Footer Info */}
          <div className="max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-12 py-8 relative z-20 border-t border-[#C7A66A]/20 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F8F6F1]/60 gap-4">
            <div className="flex items-center space-x-6">
              <span className="flex items-center space-x-2">
                <MapPin size={14} className="text-[#C7A66A]" />
                <span>Jakarta • Bogor • Bandung</span>
              </span>
              <span className="flex items-center space-x-2">
                <Phone size={14} className="text-[#C7A66A]" />
                <span>{brandDetails.phone}</span>
              </span>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenPrivateVisit();
              }}
              className="px-6 py-2.5 rounded-full bg-[#C7A66A] hover:bg-[#E5C992] text-[#0B1D3A] font-semibold uppercase tracking-widest text-[11px] transition-all shadow-md"
            >
              Book Private Visit →
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
