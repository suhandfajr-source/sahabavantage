'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface GalleryItem {
  url: string;
  caption: string;
  category: string;
  aspect: string;
}

const galleryItems: GalleryItem[] = [
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    caption: 'Vantage Residence — Cantilevered concrete and Andesite stone form',
    category: 'Architecture',
    aspect: 'col-span-1 md:col-span-2 row-span-2'
  },
  {
    url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    caption: 'Great Living Salon — Italian Travertine marble & fluted teak joinery',
    category: 'Interior',
    aspect: 'col-span-1'
  },
  {
    url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80',
    caption: 'Vantage Sanctuary — Biophilic forest villa suspended above Dago Ridge',
    category: 'Highland',
    aspect: 'col-span-1'
  },
  {
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80',
    caption: 'Evening Reflection — Private infinity pool with twilight lighting',
    category: 'Landscape',
    aspect: 'col-span-1 md:col-span-2'
  },
  {
    url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
    caption: 'Master Suite Sanctuary — Connecting to private outdoor onsen deck',
    category: 'Interior',
    aspect: 'col-span-1'
  },
  {
    url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    caption: 'The Grand Vantage — Monolithic limestone urban facade in South Jakarta',
    category: 'Architecture',
    aspect: 'col-span-1'
  }
];

export default function EditorialGallery() {
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  return (
    <section id="gallery" className="relative py-28 sm:py-36 bg-[#F8F6F1] text-[#0B1D3A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C7A66A] block">
              EDITORIAL CURATION
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif-luxury font-normal text-[#0B1D3A]">
              Architecture & Living
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] font-sans-luxury">
              Dokumentasi visual detail material, komposisi ruang terbuka, dan suasana kehidupan di Sahaba Vantage.
            </p>
          </div>

          <Link
            href="/developments"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-[#0B1D3A] hover:text-[#C7A66A] transition-colors group"
          >
            <span>Explore All Projects</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Masonry Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[260px]">
          {galleryItems.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              onClick={() => setActiveImage(item)}
              className={`relative rounded-3xl overflow-hidden border border-[#C7A66A]/30 shadow-lg cursor-pointer group ${item.aspect}`}
              data-cursor="EXPAND"
            >
              <img
                src={item.url}
                alt={item.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D3A]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Hover Caption */}
              <div className="absolute bottom-4 left-4 right-4 text-[#F8F6F1] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 flex items-end justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#C7A66A] font-semibold block">
                    {item.category}
                  </span>
                  <p className="text-xs font-serif-luxury leading-snug">{item.caption}</p>
                </div>
                <div className="p-2 rounded-full bg-[#0B1D3A]/80 text-[#C7A66A] border border-[#C7A66A]/40">
                  <ZoomIn size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#071326]/95 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            >
              <button
                onClick={() => setActiveImage(null)}
                className="absolute -top-12 right-0 text-[#F8F6F1] hover:text-[#C7A66A] p-2 transition-colors flex items-center space-x-2 text-xs uppercase tracking-widest"
              >
                <span>Close</span>
                <X size={20} />
              </button>

              <div className="rounded-2xl overflow-hidden border border-[#C7A66A]/40 shadow-2xl max-h-[75vh] w-full flex items-center justify-center bg-black">
                <img
                  src={activeImage.url}
                  alt={activeImage.caption}
                  className="max-h-[75vh] w-auto object-contain"
                />
              </div>

              <div className="mt-4 text-center text-[#F8F6F1] space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#C7A66A] font-semibold">
                  {activeImage.category}
                </span>
                <p className="text-sm font-serif-luxury text-[#F8F6F1]/90 max-w-2xl">{activeImage.caption}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
