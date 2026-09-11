'use client';

import React, { useState } from 'react';
import { Development } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface ProjectGalleryModalProps {
  gallery: Development['gallery'];
  projectName: string;
}

export default function ProjectGalleryModal({ gallery, projectName }: ProjectGalleryModalProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleNext = () => {
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx + 1) % gallery.length);
    }
  };

  const handlePrev = () => {
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx - 1 + gallery.length) % gallery.length);
    }
  };

  return (
    <div className="space-y-6">
      {/* Editorial Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -4 }}
            onClick={() => setSelectedIdx(idx)}
            className="relative rounded-3xl overflow-hidden border border-[#C7A66A]/30 shadow-lg cursor-pointer h-72 group"
            data-cursor="VIEW"
          >
            <Image
              src={item.url}
              alt={item.caption}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D3A]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="absolute bottom-4 left-4 right-4 text-[#F8F6F1] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-between">
              <div className="space-y-1 max-w-[80%]">
                <span className="text-[10px] uppercase tracking-widest text-[#C7A66A] font-semibold block">
                  {item.category}
                </span>
                <p className="text-xs font-serif-luxury leading-snug line-clamp-2">{item.caption}</p>
              </div>
              <div className="p-2 rounded-full bg-[#0B1D3A]/90 text-[#C7A66A] border border-[#C7A66A]/40">
                <ZoomIn size={14} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#071326]/95 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center"
            >
              {/* Top Controls */}
              <div className="w-full flex items-center justify-between pb-3 text-[#F8F6F1]">
                <span className="text-xs uppercase tracking-widest text-[#C7A66A] font-semibold">
                  {projectName} • {selectedIdx + 1} / {gallery.length}
                </span>
                <button
                  onClick={() => setSelectedIdx(null)}
                  className="hover:text-[#C7A66A] p-2 transition-colors flex items-center space-x-1.5 text-xs uppercase tracking-widest"
                >
                  <span>Close</span>
                  <X size={18} />
                </button>
              </div>

              {/* Main Image View */}
              <div className="relative rounded-2xl overflow-hidden border border-[#C7A66A]/40 shadow-2xl max-h-[75vh] w-full flex items-center justify-center bg-black">
                <Image
                  src={gallery[selectedIdx].url}
                  alt={gallery[selectedIdx].caption}
                  width={1600}
                  height={1000}
                  sizes="90vw"
                  className="h-auto w-auto max-h-[75vh] max-w-full object-contain"
                />

                {/* Prev / Next Arrows */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0B1D3A]/80 border border-[#C7A66A]/40 text-[#F8F6F1] hover:text-[#C7A66A] flex items-center justify-center"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0B1D3A]/80 border border-[#C7A66A]/40 text-[#F8F6F1] hover:text-[#C7A66A] flex items-center justify-center"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Caption */}
              <div className="mt-3 text-center text-[#F8F6F1] space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#C7A66A] font-semibold">
                  {gallery[selectedIdx].category}
                </span>
                <p className="text-sm font-serif-luxury text-[#F8F6F1]/90">{gallery[selectedIdx].caption}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
