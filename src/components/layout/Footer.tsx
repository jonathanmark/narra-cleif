import React from 'react';
import { Separator } from '../ui/separator';

interface FooterProps {
  onNavigateToHome: () => void;
  onNavigateToLots: () => void;
  onNavigateToAmenities: () => void;
  onNavigateToContact?: () => void;
  currentPage?: string;
}

export function Footer({
  onNavigateToHome,
  onNavigateToLots,
  onNavigateToAmenities,
  onNavigateToContact,
  currentPage,
}: FooterProps) {
  const handleHomeClick = () => {
    onNavigateToHome();
    // Scroll to top when navigating to home
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleLotsClick = () => {
    onNavigateToLots();
    // Scroll to top when navigating to lots page
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleAmenitiesClick = () => {
    onNavigateToAmenities();
    // Scroll to top when navigating to amenities page
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleAboutUsClick = () => {
    onNavigateToHome();
    // Scroll to contact section after navigation
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  const handleSocialResponsibilityClick = () => {
    onNavigateToHome();
    // Scroll to why choose section after navigation (closest to social responsibility content)
    setTimeout(() => {
      const whyChooseSection = document.getElementById('why-choose');
      if (whyChooseSection) {
        whyChooseSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  const handleGalleryClick = () => {
    onNavigateToHome();
    // Scroll to top for gallery view
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };



  const handleContactUsClick = () => {
    if (onNavigateToContact) {
      onNavigateToContact();
      // Scroll to top when navigating to contact page
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      // Fallback to home page contact section
      onNavigateToHome();
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
  };

  return (
    <footer className="text-white py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16 2xl:py-20 relative z-40" style={{backgroundColor: '#453311'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 xl:gap-16">
          <div className="lg:col-span-1 space-y-3 sm:space-y-4 lg:space-y-5 xl:space-y-6">
            <h3 className="font-plantin text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-white mb-2 sm:mb-3 lg:mb-4">Narra Cliffs</h3>
            <p className="font-garamond text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-gray-300 italic mb-3 sm:mb-4 lg:mb-5">The Life <em>Above</em></p>
            <p className="font-rotunda text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-gray-400 leading-relaxed max-w-md">
              Creating sustainable communities where your dream home begins with the perfect lot.
            </p>
          </div>
          
          <div className="mt-8 sm:mt-6 lg:mt-0">
            <h4 className="font-plantin text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-white mb-4 sm:mb-5 lg:mb-6 xl:mb-7">Quick Links</h4>
            <ul className="space-y-3 sm:space-y-4 lg:space-y-5 xl:space-y-6">
              <li>
                <button 
                  onClick={handleHomeClick} 
                  className="font-rotunda text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-gray-400 hover:text-white hover:text-[#DA743F] transition-all duration-300 text-left group"
                >
                  <span className="border-b border-transparent group-hover:border-[#DA743F] transition-all duration-300">Home</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={handleLotsClick} 
                  className="font-rotunda text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-gray-400 hover:text-white hover:text-[#DA743F] transition-all duration-300 text-left group"
                >
                  <span className="border-b border-transparent group-hover:border-[#DA743F] transition-all duration-300">Available Lots</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={handleAmenitiesClick} 
                  className="font-rotunda text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-gray-400 hover:text-white hover:text-[#DA743F] transition-all duration-300 text-left group"
                >
                  <span className="border-b border-transparent group-hover:border-[#DA743F] transition-all duration-300">Amenities</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={handleSocialResponsibilityClick} 
                  className="font-rotunda text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-gray-400 hover:text-white hover:text-[#DA743F] transition-all duration-300 text-left group"
                >
                  <span className="border-b border-transparent group-hover:border-[#DA743F] transition-all duration-300">Social Responsibility</span>
                </button>
              </li>
            </ul>
          </div>

          <div className="mt-8 sm:mt-6 lg:mt-0">
            <h4 className="font-plantin text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-white mb-4 sm:mb-5 lg:mb-6 xl:mb-7">Explore</h4>
            <ul className="space-y-3 sm:space-y-4 lg:space-y-5 xl:space-y-6">
              <li>
                <button 
                  onClick={handleGalleryClick} 
                  className="font-rotunda text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-gray-400 hover:text-white hover:text-[#DA743F] transition-all duration-300 text-left group"
                >
                  <span className="border-b border-transparent group-hover:border-[#DA743F] transition-all duration-300">Gallery</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={handleAboutUsClick} 
                  className="font-rotunda text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-gray-400 hover:text-white hover:text-[#DA743F] transition-all duration-300 text-left group"
                >
                  <span className="border-b border-transparent group-hover:border-[#DA743F] transition-all duration-300">About Us</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={handleContactUsClick} 
                  className="font-rotunda text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-gray-400 hover:text-white hover:text-[#DA743F] transition-all duration-300 text-left group"
                >
                  <span className="border-b border-transparent group-hover:border-[#DA743F] transition-all duration-300">Contact</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8 sm:my-10 lg:my-12 xl:my-16 2xl:my-20 bg-gray-600 opacity-50" />
        
        <div className="text-center">
          <p className="font-rotunda text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl text-gray-400">&copy; 2025 Narra Cliffs. All rights reserved.</p>
          <p className="font-rotunda text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl text-gray-500 mt-2 sm:mt-3 lg:mt-4">Eastridge, Binangonan, Rizal</p>
        </div>
      </div>
    </footer>
  );
}