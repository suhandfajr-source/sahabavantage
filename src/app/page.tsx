import React from 'react';
import CinematicHero from '@/components/home/CinematicHero';
import BrandPurpose from '@/components/home/BrandPurpose';
import VantageWindow from '@/components/home/VantageWindow';
import FeaturedDevelopments from '@/components/home/FeaturedDevelopments';
import OurPrinciples from '@/components/home/OurPrinciples';
import DayAtVantage from '@/components/home/DayAtVantage';
import EditorialGallery from '@/components/home/EditorialGallery';
import WhyVantage from '@/components/home/WhyVantage';
import PrivateVisitCta from '@/components/home/PrivateVisitCta';
import ScrollProgress from '@/components/navigation/ScrollProgress';

export default function HomePage() {
  return (
    <div className="relative">
      {/* Subtle Side Scroll Progress */}
      <ScrollProgress />

      {/* 1. Cinematic Hero */}
      <CinematicHero />

      {/* 2. Brand Purpose */}
      <BrandPurpose />

      {/* 3. The Vantage Window Portal */}
      <VantageWindow />

      {/* 4. Featured Developments Cinematic Showcase */}
      <FeaturedDevelopments />

      {/* 5. Our Principles Architectural Grid */}
      <OurPrinciples />

      {/* 6. A Day at Vantage (Time of Day Storytelling) */}
      <DayAtVantage />

      {/* 7. Architecture & Lifestyle Gallery */}
      <EditorialGallery />

      {/* 8. Why Vantage */}
      <WhyVantage />

      {/* 9. Private Visit CTA */}
      <PrivateVisitCta />
    </div>
  );
}
