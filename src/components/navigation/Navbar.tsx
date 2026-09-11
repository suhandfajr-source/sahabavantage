'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ArrowRight } from 'lucide-react';
import FullscreenMenu from './FullscreenMenu';
import PrivateVisitModal from '../ui/PrivateVisitModal';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'py-3.5 bg-[#0B1D3A]/90 backdrop-blur-xl border-b border-[#C7A66A]/20 shadow-lg'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group" data-cursor="HOME">
            <div className="w-10 h-10 rounded-full border border-[#C7A66A] flex items-center justify-center bg-[#0B1D3A]/80 shadow-md group-hover:border-[#E5C992] transition-colors">
              <span className="font-serif-luxury font-bold text-sm text-[#C7A66A] tracking-wider">SV</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif-luxury text-sm sm:text-base tracking-[0.18em] uppercase font-bold text-[#F8F6F1] group-hover:text-[#C7A66A] transition-colors">
                SAHABA VANTAGE
              </span>
              <span className="text-[8.5px] sm:text-[9px] tracking-[0.35em] uppercase text-[#C7A66A] font-sans-luxury font-semibold">
                ESTATES
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs uppercase tracking-[0.2em] font-sans-luxury font-medium text-[#F8F6F1]/90">
            <Link
              href="/developments"
              className={`hover:text-[#C7A66A] transition-colors ${
                pathname === '/developments' ? 'text-[#C7A66A] font-semibold' : ''
              }`}
            >
              Developments
            </Link>
            <Link
              href="/philosophy"
              className={`hover:text-[#C7A66A] transition-colors ${
                pathname === '/philosophy' ? 'text-[#C7A66A] font-semibold' : ''
              }`}
            >
              Philosophy
            </Link>
            <Link
              href="/about"
              className={`hover:text-[#C7A66A] transition-colors ${
                pathname === '/about' ? 'text-[#C7A66A] font-semibold' : ''
              }`}
            >
              About
            </Link>
            <Link
              href="/journal"
              className={`hover:text-[#C7A66A] transition-colors ${
                pathname === '/journal' ? 'text-[#C7A66A] font-semibold' : ''
              }`}
            >
              Journal
            </Link>
          </nav>

          {/* Right Action CTA & Menu Toggle */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={() => setIsVisitModalOpen(true)}
              className="hidden sm:inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border border-[#C7A66A] bg-[#C7A66A]/10 hover:bg-[#C7A66A] text-[#F8F6F1] hover:text-[#0B1D3A] text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-sm group"
              data-cursor="VISIT"
            >
              <span>Private Visit</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-full border border-[#C7A66A]/30 bg-[#0B1D3A]/60 hover:bg-[#0B1D3A] text-xs uppercase tracking-widest text-[#F8F6F1] transition-all group"
              aria-label="Open Navigation Menu"
              data-cursor="MENU"
            >
              <Menu size={16} className="text-[#C7A66A]" />
              <span className="font-semibold pr-1">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Overlay Menu */}
      <FullscreenMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenPrivateVisit={() => setIsVisitModalOpen(true)}
      />

      {/* Global Private Visit Modal */}
      <PrivateVisitModal
        isOpen={isVisitModalOpen}
        onClose={() => setIsVisitModalOpen(false)}
      />
    </>
  );
}
