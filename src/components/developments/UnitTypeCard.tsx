'use client';

import React, { useState } from 'react';
import { UnitType } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Bed, Car, Maximize, Layers, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import FloorplanViewer from './FloorplanViewer';

interface UnitTypeCardProps {
  unit: UnitType;
  onInquire: (unit: UnitType) => void;
}

export default function UnitTypeCard({ unit, onInquire }: UnitTypeCardProps) {
  const [showFloorplan, setShowFloorplan] = useState(false);
  const [activeTab, setActiveTab] = useState<'exterior' | 'interior'>('exterior');

  return (
    <div className="rounded-3xl border border-[#C7A66A]/30 bg-[#0B1D3A] text-[#F8F6F1] overflow-hidden shadow-2xl transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Visual Image Showcase */}
        <div className="lg:col-span-6 relative h-[360px] sm:h-[420px] lg:h-auto overflow-hidden">
          <Image
            src={activeTab === 'exterior' ? unit.exteriorImage : unit.interiorImage}
            alt={unit.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D3A] via-transparent to-transparent" />

          {/* Exterior / Interior Switcher */}
          <div className="absolute top-6 left-6 flex items-center space-x-2 p-1 rounded-full bg-[#0B1D3A]/80 backdrop-blur-md border border-[#C7A66A]/30">
            <button
              onClick={() => setActiveTab('exterior')}
              className={`px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-semibold transition-all ${
                activeTab === 'exterior'
                  ? 'bg-[#C7A66A] text-[#0B1D3A]'
                  : 'text-[#F8F6F1]/70 hover:text-[#F8F6F1]'
              }`}
            >
              Exterior
            </button>
            <button
              onClick={() => setActiveTab('interior')}
              className={`px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-semibold transition-all ${
                activeTab === 'interior'
                  ? 'bg-[#C7A66A] text-[#0B1D3A]'
                  : 'text-[#F8F6F1]/70 hover:text-[#F8F6F1]'
              }`}
            >
              Interior
            </button>
          </div>

          {/* Code Badge */}
          <div className="absolute bottom-6 left-6">
            <span className="px-3.5 py-1.5 rounded-full bg-[#132B52]/90 border border-[#C7A66A]/40 text-[#C7A66A] text-xs font-semibold uppercase tracking-widest">
              {unit.code}
            </span>
          </div>
        </div>

        {/* Right Architectural Specifications */}
        <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C7A66A] font-semibold block">
                RESIDENCE SPECIFICATION
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif-luxury font-normal text-[#F8F6F1]">
                {unit.name}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-[#F8F6F1]/75 leading-relaxed font-sans-luxury">
              {unit.description}
            </p>

            {/* Spec Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-[#C7A66A]/20">
              <div className="space-y-1">
                <div className="flex items-center space-x-1.5 text-[#C7A66A] text-xs">
                  <Maximize size={14} />
                  <span className="text-[10px] uppercase tracking-wider">Building</span>
                </div>
                <span className="text-sm font-semibold text-[#F8F6F1]">{unit.buildingArea} m²</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-1.5 text-[#C7A66A] text-xs">
                  <Maximize size={14} />
                  <span className="text-[10px] uppercase tracking-wider">Land</span>
                </div>
                <span className="text-sm font-semibold text-[#F8F6F1]">{unit.landArea} m²</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-1.5 text-[#C7A66A] text-xs">
                  <Bed size={14} />
                  <span className="text-[10px] uppercase tracking-wider">Beds</span>
                </div>
                <span className="text-sm font-semibold text-[#F8F6F1]">{unit.bedrooms} Suites</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-1.5 text-[#C7A66A] text-xs">
                  <Car size={14} />
                  <span className="text-[10px] uppercase tracking-wider">Garage</span>
                </div>
                <span className="text-sm font-semibold text-[#F8F6F1]">{unit.carports} Cars</span>
              </div>
            </div>

            {/* Price Starting */}
            {unit.priceStarting && (
              <div className="flex items-baseline space-x-2">
                <span className="text-xs text-[#F8F6F1]/60">Starting from:</span>
                <span className="text-xl font-serif-luxury font-bold text-[#C7A66A]">
                  {unit.priceStarting}
                </span>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => setShowFloorplan(!showFloorplan)}
              className="w-full sm:w-auto px-5 py-3 rounded-full border border-[#C7A66A]/50 hover:border-[#C7A66A] bg-[#132B52]/60 hover:bg-[#132B52] text-xs uppercase tracking-widest text-[#F8F6F1] font-semibold transition-all flex items-center justify-center space-x-2"
            >
              <Layers size={14} className="text-[#C7A66A]" />
              <span>{showFloorplan ? 'Hide Floorplan' : 'Interactive Floorplan'}</span>
            </button>

            <button
              onClick={() => onInquire(unit)}
              className="w-full sm:w-auto flex-1 px-6 py-3 rounded-full bg-[#C7A66A] hover:bg-[#E5C992] text-[#0B1D3A] font-semibold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <span>Inquire This Type</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Accordion Interactive Floorplan View */}
      <AnimatePresence>
        {showFloorplan && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-6 sm:p-10 border-t border-[#C7A66A]/30 bg-[#071326]"
          >
            <div className="mb-6 space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#C7A66A] font-semibold">
                Architectural Blueprint
              </span>
              <h4 className="text-xl font-serif-luxury text-[#F8F6F1]">
                {unit.name} • Floorplan & Room Layout
              </h4>
            </div>
            <FloorplanViewer unitType={unit} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
