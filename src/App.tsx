import React, { useState, useEffect } from "react";
import LotsPage from "./LotsPage";

import AmenitiesPage from "./components/pages/AmenitiesPage";
import { GalleryPage } from "./components/pages/GalleryPage";
import { HomePage } from "./components/pages/HomePage";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Toaster } from "./components/ui/sonner";
import { ViewportMeta } from "./components/utils/ViewportMeta";

// Main App Component with Routing
export default function App() {
  const [currentPage, setCurrentPage] = useState<
    "home" | "lots" | "amenities" | "gallery"
  >("home");
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    // DNS prefetch is now handled in HeroSection component to avoid duplication
  }, []);

  // Simplified navigation - no window event listeners needed

  const navigateToLots = (sectionId?: string) => {
    setCurrentPage("lots");
    // Scroll to specific section or top
    setTimeout(() => {
      if (sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };



  const navigateToAmenities = () => {
    setCurrentPage("amenities");
    // Scroll to top when navigating to amenities page
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const navigateToGallery = () => {
    setCurrentPage("gallery");
    // Scroll to top when navigating to gallery page
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

  const handleVideoFailure = (hasFailed: boolean) => {
    setVideoFailed(hasFailed);
  };

  if (currentPage === "lots") {
    return (
      <div className="font-rotunda bg-white min-h-screen full-height-mobile safe-area-padding">
        <ViewportMeta />
        <Header
          onNavigateToHome={navigateToHome}
          onNavigateToLots={navigateToLots}
          onNavigateToAmenities={navigateToAmenities}
          onNavigateToGallery={navigateToGallery}
          currentPage={currentPage}
          videoFailed={videoFailed}
        />
        <LotsPage
          onNavigateToHome={navigateToHome}
          onNavigateToAmenities={navigateToAmenities}
        />
        <Footer
          onNavigateToHome={navigateToHome}
          onNavigateToLots={navigateToLots}
          onNavigateToAmenities={navigateToAmenities}
          onNavigateToGallery={navigateToGallery}
        />
        <Toaster />
      </div>
    );
  }

  if (currentPage === "amenities") {
    return (
      <div className="font-rotunda bg-white min-h-screen full-height-mobile safe-area-padding">
        <ViewportMeta />
        <Header
          onNavigateToHome={navigateToHome}
          onNavigateToLots={navigateToLots}
          onNavigateToAmenities={navigateToAmenities}
          onNavigateToGallery={navigateToGallery}
          currentPage={currentPage}
        />
        <AmenitiesPage
          onNavigateToHome={navigateToHome}
          onNavigateToLots={navigateToLots}
        />
        <Footer
          onNavigateToHome={navigateToHome}
          onNavigateToLots={navigateToLots}
          onNavigateToAmenities={navigateToAmenities}
          onNavigateToGallery={navigateToGallery}
        />
        <Toaster />
      </div>
    );
  }

  if (currentPage === "gallery") {
    return (
      <div className="font-rotunda bg-white min-h-screen full-height-mobile safe-area-padding">
        <ViewportMeta />
        <Header
          onNavigateToHome={navigateToHome}
          onNavigateToLots={navigateToLots}
          onNavigateToAmenities={navigateToAmenities}
          onNavigateToGallery={navigateToGallery}
          staticPosition={true}
          currentPage={currentPage}
        />
        <GalleryPage
          onNavigateToHome={navigateToHome}
          onNavigateToLots={navigateToLots}
        />
        <Footer
          onNavigateToHome={navigateToHome}
          onNavigateToLots={navigateToLots}
          onNavigateToAmenities={navigateToAmenities}
          onNavigateToGallery={navigateToGallery}
        />
        <Toaster />
      </div>
    );
  }

  return (
    <div className="font-rotunda min-h-screen full-height-mobile safe-area-padding">
      <ViewportMeta />
      <Header
        onNavigateToHome={navigateToHome}
        onNavigateToLots={navigateToLots}
        onNavigateToAmenities={navigateToAmenities}
        onNavigateToGallery={navigateToGallery}
        currentPage={currentPage}
        videoFailed={videoFailed}
      />
      <HomePage
        onNavigateToLots={navigateToLots}
        onNavigateToAmenities={navigateToAmenities}
        onVideoFailure={handleVideoFailure}
      />
      <Footer
        onNavigateToHome={navigateToHome}
        onNavigateToLots={navigateToLots}
        onNavigateToAmenities={navigateToAmenities}
        onNavigateToGallery={navigateToGallery}
      />
      <Toaster />
    </div>
  );
}