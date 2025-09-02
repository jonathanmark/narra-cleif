import React from 'react';
import { HeroSection } from '../sections/HeroSection';
import { WhyChooseSection } from '../sections/WhyChooseSection';
import { ContactSection } from '../sections/ContactSection';

interface HomePageProps {
  onNavigateToLots: () => void;
  onNavigateToAmenities: () => void;
  onVideoFailure?: (hasFailed: boolean) => void;
}

export function HomePage({ onNavigateToLots, onNavigateToAmenities, onVideoFailure }: HomePageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero section starts at top, other sections follow immediately */}
      <HeroSection onVideoFailure={onVideoFailure} />
      <WhyChooseSection onNavigateToAmenities={onNavigateToAmenities} onNavigateToLots={onNavigateToLots} />
      <ContactSection onNavigateToLots={onNavigateToLots} />
    </div>
  );
}