import React from 'react';
import { HeroSection } from '../sections/HeroSection';
import { WhyChooseSection } from '../sections/WhyChooseSection';
import { ContactSection } from '../sections/ContactSection';

interface HomePageProps {
  onNavigateToLots: () => void;
  onNavigateToAmenities: () => void;
  onNavigateToContact?: () => void;
}

export function HomePage({ onNavigateToLots, onNavigateToAmenities, onNavigateToContact }: HomePageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero section starts at top, other sections follow immediately */}
      <HeroSection />
      <WhyChooseSection onNavigateToAmenities={onNavigateToAmenities} onNavigateToLots={onNavigateToLots} />
      <ContactSection onNavigateToLots={onNavigateToLots} onNavigateToContact={onNavigateToContact} />
    </div>
  );
}