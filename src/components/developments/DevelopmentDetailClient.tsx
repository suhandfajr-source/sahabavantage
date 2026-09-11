'use client';

import React, { useState } from 'react';
import { Development } from '@/types';
import MasterplanViewer from '@/components/developments/MasterplanViewer';
import UnitTypeCard from '@/components/developments/UnitTypeCard';
import ProjectGalleryModal from '@/components/developments/ProjectGalleryModal';
import PrivateVisitModal from '@/components/ui/PrivateVisitModal';
import { MapPin, Navigation } from 'lucide-react';
import Image from 'next/image';

interface DevelopmentDetailClientProps {
  development: Development;
}

export default function DevelopmentDetailClient({ development: project }: DevelopmentDetailClientProps) {
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const [selectedUnitForVisit, setSelectedUnitForVisit] = useState<string | undefined>(undefined);

  const openVisitModal = () => {
    setSelectedUnitForVisit(project.slug);
    setIsVisitModalOpen(true);
  };

  return (
    <div className="bg-[#F8F6F1] text-[#0B1D3A]">
      {/* 1. Project Hero Full Viewport */}
      <section className="relative h-[85vh] sm:h-[90vh] w-full bg-[#071326] flex items-end justify-start overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={project.heroImage}
            alt={project.name}
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-[0.7] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071326] via-[#071326]/30 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-16 relative z-10 w-full text-[#F8F6F1] space-y-4">
          <div className="flex items-center space-x-2 text-xs uppercase tracking-[0.3em] text-[#C7A66A] font-semibold">
            <MapPin size={14} />
            <span>{project.location.city}, {project.location.province}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif-luxury font-normal text-[#F8F6F1]">
            {project.name}
          </h1>

          <p className="text-base sm:text-xl text-[#F8F6F1]/85 font-serif-luxury italic max-w-2xl">
            {project.tagline}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setIsVisitModalOpen(true)}
              className="px-8 py-3.5 rounded-full bg-[#C7A66A] hover:bg-[#E5C992] text-[#0B1D3A] font-semibold text-xs uppercase tracking-widest transition-all shadow-lg"
            >
              Schedule Private Viewing
            </button>
            <a
              href="#masterplan"
              className="px-6 py-3.5 rounded-full border border-white/30 hover:border-[#C7A66A] bg-black/30 text-white text-xs uppercase tracking-widest font-semibold backdrop-blur-md transition-all"
            >
              Interactive Masterplan ↓
            </a>
          </div>
        </div>
      </section>

      {/* 2. Project Story & Narrative */}
      <section className="py-24 sm:py-32 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C7A66A] block">
              THE VISION
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-luxury text-[#0B1D3A]">
              An Architectural Sanctuary of Natural Equilibrium.
            </h2>
            <div className="p-6 rounded-2xl bg-[#0B1D3A] text-[#F8F6F1] space-y-3 mt-6">
              <span className="text-[10px] uppercase tracking-widest text-[#C7A66A] font-semibold block">
                Development Quick Specs
              </span>
              <div className="space-y-2 text-xs text-[#F8F6F1]/80">
                <div className="flex justify-between border-b border-[#C7A66A]/20 pb-1.5">
                  <span className="text-[#C7A66A]">Site Area:</span>
                  <span>{project.stats.siteArea}</span>
                </div>
                <div className="flex justify-between border-b border-[#C7A66A]/20 pb-1.5">
                  <span className="text-[#C7A66A]">Total Residences:</span>
                  <span>{project.stats.totalUnits} Exclusive Units</span>
                </div>
                <div className="flex justify-between border-b border-[#C7A66A]/20 pb-1.5">
                  <span className="text-[#C7A66A]">Conserved Greenery:</span>
                  <span>{project.stats.greenAreaPercentage}</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-[#C7A66A]">Handover Target:</span>
                  <span>{project.stats.completionYear}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6 text-sm sm:text-base text-[#6B6B6B] font-sans-luxury leading-relaxed">
            <p className="whitespace-pre-line text-[#0B1D3A] font-serif-luxury text-lg sm:text-xl italic leading-relaxed">
              {project.fullStory}
            </p>

            {/* Highlights Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              {project.highlights.map((hl, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white border border-[#C7A66A]/30 shadow-md space-y-2">
                  <div className="w-8 h-8 rounded-full bg-[#0B1D3A] text-[#C7A66A] flex items-center justify-center font-bold text-xs">
                    0{i + 1}
                  </div>
                  <h3 className="font-serif-luxury text-base font-semibold text-[#0B1D3A]">{hl.title}</h3>
                  <p className="text-xs text-[#6B6B6B] leading-relaxed">{hl.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Masterplan Section */}
      <section id="masterplan" className="py-24 sm:py-32 bg-[#071326] text-[#F8F6F1]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C7A66A] block">
              SITE CONFIGURATION
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif-luxury font-normal text-[#F8F6F1]">
              Interactive Masterplan
            </h2>
            <p className="text-xs sm:text-sm text-[#F8F6F1]/70 font-sans-luxury">
              Klik pada nomor kavling untuk memeriksa status ketersediaan, luas tanah, orientasi hadap, dan tipe unit.
            </p>
          </div>

          <MasterplanViewer
            lots={project.masterplanLots}
            projectName={project.name}
            onSelectLotForVisit={openVisitModal}
          />
        </div>
      </section>

      {/* 4. Unit Types & Floorplans */}
      <section className="py-24 sm:py-32 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C7A66A] block">
            RESIDENCE COLLECTION
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-normal text-[#0B1D3A]">
            Architectural Unit Types
          </h2>
          <p className="text-xs sm:text-sm text-[#6B6B6B] font-sans-luxury">
            Setiap denah dirancang dengan orientasi privasi, ventilasi silang optimal, dan pencahayaan alami yang melimpah.
          </p>
        </div>

        <div className="space-y-12">
          {project.unitTypes.map((unit) => (
            <UnitTypeCard
              key={unit.id}
              unit={unit}
              onInquire={openVisitModal}
            />
          ))}
        </div>
      </section>

      {/* 5. Architectural Gallery Section */}
      <section className="py-24 sm:py-32 bg-[#071326] text-[#F8F6F1]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C7A66A] block">
              CURATED MEDIA
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif-luxury font-normal text-[#F8F6F1]">
              Architecture & Details
            </h2>
            <p className="text-xs sm:text-sm text-[#F8F6F1]/70 font-sans-luxury">
              Klik gambar untuk melihat galeri beresolusi tinggi dalam mode lightbox imersif.
            </p>
          </div>

          <ProjectGalleryModal
            gallery={project.gallery}
            projectName={project.name}
          />
        </div>
      </section>

      {/* 6. Specifications Sheet */}
      <section className="py-24 sm:py-32 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-2xl mb-12 space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C7A66A] block">
            MATERIAL INTEGRITY
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-luxury text-[#0B1D3A]">
            Building Specifications
          </h2>
          <p className="text-xs sm:text-sm text-[#6B6B6B] font-sans-luxury">
            Daftar material dan sistem mekanikal elektrikal berstandar internasional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {project.specifications.map((spec, i) => (
            <div key={i} className="p-8 rounded-3xl bg-white border border-[#C7A66A]/30 shadow-md space-y-4">
              <h3 className="font-serif-luxury text-lg font-semibold text-[#0B1D3A] border-b border-[#0B1D3A]/10 pb-3">
                {spec.category}
              </h3>
              <div className="space-y-3 text-xs font-sans-luxury">
                {spec.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-baseline gap-4">
                    <span className="text-[#6B6B6B] font-medium">{item.label}</span>
                    <span className="text-[#0B1D3A] font-semibold text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Location & Landmarks */}
      <section className="py-24 sm:py-32 bg-[#0B1D3A] text-[#F8F6F1]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C7A66A] block">
                  ACCESSIBILITY & SURROUNDINGS
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif-luxury text-[#F8F6F1]">
                  Strategic Seclusion
                </h2>
              </div>

              <div className="p-4 rounded-2xl bg-[#132B52] border border-[#C7A66A]/30 text-xs text-[#F8F6F1]/80 space-y-1">
                <span className="text-[#C7A66A] font-semibold block">Alamat Resmi:</span>
                <p>{project.location.address}</p>
              </div>

              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest text-[#C7A66A] font-semibold block">
                  Aksesibilitas & Fasilitas Sekitar:
                </span>
                <ul className="space-y-2.5 text-xs text-[#F8F6F1]/80 font-sans-luxury">
                  {project.location.nearbyLandmarks.map((lm, i) => (
                    <li key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#071326] border border-white/10">
                      <span>{lm.name}</span>
                      <span className="text-[#C7A66A] font-semibold">{lm.travelTime} ({lm.distance})</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Map Placeholder Card with Navigation coordinates */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl overflow-hidden border border-[#C7A66A]/40 bg-[#071326] h-[380px] sm:h-[440px] relative p-8 flex flex-col justify-between">
                <div className="absolute inset-0 monogram-watermark opacity-30 pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between text-xs text-[#C7A66A]">
                  <span className="font-bold uppercase tracking-widest">GPS Coordinates</span>
                  <span>{project.location.coordinates.lat}° S, {project.location.coordinates.lng}° E</span>
                </div>

                <div className="relative z-10 text-center space-y-3 max-w-sm mx-auto">
                  <div className="w-14 h-14 rounded-full bg-[#C7A66A] text-[#0B1D3A] flex items-center justify-center mx-auto shadow-lg">
                    <Navigation size={26} />
                  </div>
                  <h3 className="font-serif-luxury text-xl font-normal text-[#F8F6F1]">
                    {project.name}
                  </h3>
                  <p className="text-xs text-[#F8F6F1]/70">
                    {project.location.address}
                  </p>
                </div>

                <div className="relative z-10 text-center">
                  <a
                    href={`https://maps.google.com/?q=${project.location.coordinates.lat},${project.location.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-[#C7A66A] hover:bg-[#E5C992] text-[#0B1D3A] text-xs uppercase tracking-widest font-semibold transition-all shadow-md"
                  >
                    <span>Open in Google Maps ↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Bottom Private Visit CTA */}
      <section className="py-24 bg-[#071326] text-[#F8F6F1] border-t border-[#C7A66A]/20 text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C7A66A]">
            SCHEDULE VIEWING
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury text-[#F8F6F1]">
            Experience {project.name} in Person.
          </h2>
          <p className="text-xs sm:text-sm text-[#F8F6F1]/70 font-sans-luxury max-w-lg mx-auto">
            Dapatkan presentasi privat dari Principal Advisor mengenai pemilihan lot dan spesifikasi personalisasi villa.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setIsVisitModalOpen(true)}
              className="px-9 py-4 rounded-full bg-[#C7A66A] hover:bg-[#E5C992] text-[#0B1D3A] font-semibold text-xs uppercase tracking-widest transition-all shadow-xl"
            >
              Request Private Visit →
            </button>
          </div>
        </div>
      </section>

      {/* Global Private Visit Modal */}
      <PrivateVisitModal
        isOpen={isVisitModalOpen}
        onClose={() => setIsVisitModalOpen(false)}
        preselectedDevelopment={selectedUnitForVisit || project.slug}
      />
    </div>
  );
}
