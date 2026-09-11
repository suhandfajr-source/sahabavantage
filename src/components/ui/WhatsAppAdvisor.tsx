'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { brandDetails } from '@/data/brandContent';

interface WhatsAppAdvisorProps {
  projectName?: string;
}

export default function WhatsAppAdvisor({ projectName }: WhatsAppAdvisorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const defaultMessage = projectName
    ? `Halo Sahaba Vantage Estates, saya tertarik mengetahui informasi eksklusif mengenai ${projectName}. Mohon bantuan Property Advisor.`
    : `Halo Sahaba Vantage Estates, saya ingin berkonsultasi mengenai portofolio hunian eksklusif Anda.`;

  const waUrl = `https://wa.me/${brandDetails.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    defaultMessage
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Prompt Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 w-80 rounded-2xl bg-[#0B1D3A]/95 backdrop-blur-xl border border-[#C7A66A]/30 p-5 shadow-2xl text-[#F8F6F1]"
          >
            <div className="flex items-start justify-between pb-3 border-b border-[#C7A66A]/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full border border-[#C7A66A] flex items-center justify-center bg-[#132B52]">
                  <span className="font-serif-luxury text-sm font-bold text-[#C7A66A]">SV</span>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-[#C7A66A]">
                    Private Concierge
                  </h4>
                  <p className="text-xs text-[#F8F6F1]/70 font-sans-luxury">Sahaba Vantage Estates</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#F8F6F1]/50 hover:text-[#C7A66A] transition-colors p-1"
                aria-label="Close concierge"
              >
                <X size={16} />
              </button>
            </div>

            <div className="py-4 space-y-2">
              <p className="text-xs text-[#F8F6F1]/90 leading-relaxed font-sans-luxury">
                Selamat datang di Sahaba Vantage. Diskusikan rencana kunjungan pribadi, ketersediaan unit, atau portofolio arsitektur kami secara privat.
              </p>
              <div className="flex items-center space-x-1.5 text-[11px] text-[#C7A66A]">
                <ShieldCheck size={13} />
                <span>Respon langsung dalam 15 menit</span>
              </div>
            </div>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full py-2.5 px-4 rounded-xl bg-[#C7A66A] hover:bg-[#E5C992] text-[#0B1D3A] font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-md group"
            >
              <span>Hubungi Property Advisor</span>
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Concierge Button */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 px-4 py-3 rounded-full bg-[#0B1D3A]/90 hover:bg-[#0B1D3A] border border-[#C7A66A] shadow-[0_4px_25px_rgba(11,29,58,0.5)] backdrop-blur-md text-[#F8F6F1] group transition-all"
        aria-label="Toggle Property Advisor"
        data-cursor="CHAT"
      >
        <div className="relative">
          <div className="w-2.5 h-2.5 rounded-full bg-[#C7A66A] absolute -top-0.5 -right-0.5 animate-ping" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#C7A66A] absolute -top-0.5 -right-0.5" />
          <MessageSquare size={18} className="text-[#C7A66A]" />
        </div>
        <span className="text-xs tracking-widest uppercase font-semibold font-sans-luxury text-[#F8F6F1] group-hover:text-[#C7A66A] transition-colors pr-1 hidden sm:inline">
          Property Advisor
        </span>
      </motion.button>
    </div>
  );
}
