import React, { useState, useEffect } from "react";
import LotsPage from "./LotsPage";

import AmenitiesPage from "./components/pages/AmenitiesPage";
import { HomePage } from "./components/pages/HomePage";
import { ContactPage } from "./components/pages/ContactPage";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Toaster } from "./components/ui/sonner";

// Main App Component with Routing
export default function App() {
  const [currentPage, setCurrentPage] = useState<
    "home" | "lots" | "amenities" | "contact"
  >("home");

  useEffect(() => {
    // DNS prefetch is now handled in HeroSection component to avoid duplication
  }, []);

  // Simplified navigation - no window event listeners needed

  const navigateToLots = () => {
    setCurrentPage("lots");
    // Scroll to top when navigating to lots page
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };



  const navigateToAmenities = () => {
    setCurrentPage("amenities");
    // Scroll to top when navigating to amenities page
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const navigateToContact = () => {
    setCurrentPage("contact");
    // Scroll to top when navigating to contact page
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const navigateToHome = () => {
    setCurrentPage("home");
    // Scroll to top when navigating to home page
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  if (currentPage === "contact") {
    return (
      <div className="font-rotunda bg-white min-h-screen">
        <Header
          onNavigateToHome={navigateToHome}
          onNavigateToLots={navigateToLots}
          onNavigateToAmenities={navigateToAmenities}
          onNavigateToContact={navigateToContact}
          staticPosition={true}
        />
        <ContactPage />
        <Footer
          onNavigateToHome={navigateToHome}
          onNavigateToLots={navigateToLots}
          onNavigateToAmenities={navigateToAmenities}
          onNavigateToContact={navigateToContact}
        />
        <Toaster />
      </div>
    );
  }

  if (currentPage === "lots") {
    return (
      <div className="font-rotunda bg-white min-h-screen">
        <Header
          onNavigateToHome={navigateToHome}
          onNavigateToLots={navigateToLots}
          onNavigateToAmenities={navigateToAmenities}
          onNavigateToContact={navigateToContact}
        />
        <LotsPage
          onNavigateToHome={navigateToHome}
          onNavigateToAmenities={navigateToAmenities}
        />
        <Footer
          onNavigateToHome={navigateToHome}
          onNavigateToLots={navigateToLots}
          onNavigateToAmenities={navigateToAmenities}
          onNavigateToContact={navigateToContact}
        />
        <Toaster />
      </div>
    );
  }



  if (currentPage === "amenities") {
    return (
      <div className="font-rotunda bg-white min-h-screen">
        <Header
          onNavigateToHome={navigateToHome}
          onNavigateToLots={navigateToLots}
          onNavigateToAmenities={navigateToAmenities}
          onNavigateToContact={navigateToContact}
        />
        <AmenitiesPage
          onNavigateToHome={navigateToHome}
          onNavigateToLots={navigateToLots}
        />
        <Footer
          onNavigateToHome={navigateToHome}
          onNavigateToLots={navigateToLots}
          onNavigateToAmenities={navigateToAmenities}
          onNavigateToContact={navigateToContact}
        />
        <Toaster />
      </div>
    );
  }

  return (
    <div className="font-rotunda min-h-screen">
      <Header
        onNavigateToHome={navigateToHome}
        onNavigateToLots={navigateToLots}
        onNavigateToAmenities={navigateToAmenities}
        onNavigateToContact={navigateToContact}
      />
      <HomePage
        onNavigateToLots={navigateToLots}
        onNavigateToAmenities={navigateToAmenities}
        onNavigateToContact={navigateToContact}
      />
      <Footer
        onNavigateToHome={navigateToHome}
        onNavigateToLots={navigateToLots}
        onNavigateToAmenities={navigateToAmenities}
        onNavigateToContact={navigateToContact}
      />
      <Toaster />
    </div>
  );
}