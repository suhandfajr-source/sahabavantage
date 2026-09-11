'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import PrivateVisitModal from '../ui/PrivateVisitModal';
import { brandDetails } from '@/data/brandContent';

export default function PrivateVisitCta() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const waUrl = `https://wa.me/${brandDetails.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Halo Sahaba Vantage Estates, saya ingin menjadwalkan Private Visit untuk melihat portofolio hunian Anda.'
  )}`;

  return (
    <>
      <section id="cta" className="relative py-28 sm:py-36 bg-[#071326] text-[#F8F6F1] overflow-hidden">
        {/* Background Architectural Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=80"
            alt="Sahaba Vantage Evening Ambience"
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-[0.3] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071326] via-[#071326]/60 to-[#071326]" />
        </div>

        <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center relative z-10 space-y-8">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#0B1D3A]/80 border border-[#C7A66A]/40 backdrop-blur-md">
            <Sparkles size={13} className="text-[#C7A66A]" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C7A66A] font-semibold">
              EXCLUSIVE INVITATION
            </span>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-luxury font-normal leading-tight text-[#F8F6F1]">
              A Better Life Starts With a Visit.
            </h2>
            <p className="text-sm sm:text-base text-[#F8F6F1]/80 font-sans-luxury max-w-xl mx-auto leading-relaxed">
              Rasakan langsung proporsi ruang arsitektur, kesejukan udara alami, dan ketenangan eksklusif di Sahaba Vantage Estates.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsModalOpen(true)}
              className="px-9 py-4 rounded-full bg-[#C7A66A] hover:bg-[#E5C992] text-[#0B1D3A] font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_4px_25px_rgba(199,166,106,0.4)] flex items-center space-x-2 group"
              data-cursor="SCHEDULE"
            >
              <span>Schedule a Private Visit</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full border border-[#C7A66A]/40 hover:border-[#C7A66A] bg-[#0B1D3A]/60 hover:bg-[#0B1D3A] text-[#F8F6F1] font-medium text-xs uppercase tracking-widest backdrop-blur-sm transition-all flex items-center space-x-2"
              data-cursor="TALK"
            >
              <MessageSquare size={15} className="text-[#C7A66A]" />
              <span>Talk to Property Advisor</span>
            </a>
          </div>
        </div>
      </section>

      <PrivateVisitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
