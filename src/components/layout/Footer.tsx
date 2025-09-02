import React from 'react';
import { Separator } from '../ui/separator';
import narraCliffsBrandLogo from 'figma:asset/99a6011e76198b44bd757b8f9e33e4351dd2ac61.png';

interface FooterProps {
  onNavigateToHome: () => void;
  onNavigateToLots: () => void;
  onNavigateToAmenities: () => void;
  onNavigateToGallery?: () => void;
  currentPage?: string;
}

export function Footer({
  onNavigateToHome,
  onNavigateToLots,
  onNavigateToAmenities,
  onNavigateToGallery,
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
    if (onNavigateToGallery) {
      onNavigateToGallery();
    } else {
      onNavigateToHome();
    }
    // Scroll to top for gallery view
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };



  const handleContactUsClick = () => {
    // Navigate to home page contact section
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
  };

  return (
    <footer className="text-white py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16 2xl:py-20 relative z-40" style={{backgroundColor: '#453311'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Mobile Layout - Single Column */}
        <div className="block lg:hidden">
          <div className="flex flex-col items-center space-y-8">
            <img 
              src={narraCliffsBrandLogo} 
              alt="Narra Cliffs - A Project of Greendot Land Inc." 
              className="w-full max-w-[280px] h-auto brightness-0 invert" 
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            
            <ul className="space-y-4 text-left w-full">
              <li>
                <button 
                  onClick={handleHomeClick} 
                  className="font-rotunda text-base text-white hover:text-[#DA743F] transition-all duration-300 group uppercase tracking-normal"
                >
                  <span className="border-b border-transparent group-hover:border-[#DA743F] transition-all duration-300">HOME</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={handleLotsClick} 
                  className="font-rotunda text-base text-white hover:text-[#DA743F] transition-all duration-300 group uppercase tracking-normal"
                >
                  <span className="border-b border-transparent group-hover:border-[#DA743F] transition-all duration-300">AVAILABLE LOTS</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={handleAmenitiesClick} 
                  className="font-rotunda text-base text-white hover:text-[#DA743F] transition-all duration-300 group uppercase tracking-normal"
                >
                  <span className="border-b border-transparent group-hover:border-[#DA743F] transition-all duration-300">AMENITIES</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={handleSocialResponsibilityClick} 
                  className="font-rotunda text-base text-white hover:text-[#DA743F] transition-all duration-300 group uppercase tracking-normal"
                >
                  <span className="border-b border-transparent group-hover:border-[#DA743F] transition-all duration-300">SOCIAL RESPONSIBILITY</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={handleGalleryClick} 
                  className="font-rotunda text-base text-white hover:text-[#DA743F] transition-all duration-300 group uppercase tracking-normal"
                >
                  <span className="border-b border-transparent group-hover:border-[#DA743F] transition-all duration-300">GALLERY</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={handleAboutUsClick} 
                  className="font-rotunda text-base text-white hover:text-[#DA743F] transition-all duration-300 group uppercase tracking-normal"
                >
                  <span className="border-b border-transparent group-hover:border-[#DA743F] transition-all duration-300">ABOUT US</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={handleContactUsClick} 
                  className="font-rotunda text-base text-white hover:text-[#DA743F] transition-all duration-300 group uppercase tracking-normal"
                >
                  <span className="border-b border-transparent group-hover:border-[#DA743F] transition-all duration-300">CONTACT US</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Desktop Layout - Two Columns */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 xl:gap-16">
          <div className="lg:col-span-1 space-y-5 xl:space-y-6">
            <img 
              src={narraCliffsBrandLogo} 
              alt="Narra Cliffs - A Project of Greendot Land Inc." 
              className="w-full max-w-[350px] xl:max-w-[380px] 2xl:max-w-[420px] h-auto brightness-0 invert -mt-5" 
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>
          
          <div>
            <ul className="space-y-5 xl:space-y-6">
              <li>
                <button 
                  onClick={handleHomeClick} 
                  className="font-rotunda text-lg xl:text-xl 2xl:text-2xl text-white hover:text-[#DA743F] transition-all duration-300 text-left group uppercase tracking-wider"
                >
                  <span className="border-b border-transparent group-hover:border-[#DA743F] transition-all duration-300">HOME</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={handleLotsClick} 
                  className="font-rotunda text-lg xl:text-xl 2xl:text-2xl text-white hover:text-[#DA743F] transition-all duration-300 text-left group uppercase tracking-wider"
                >
                  <span className="border-b border-transparent group-hover:border-[#DA743F] transition-all duration-300">AVAILABLE LOTS</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={handleAmenitiesClick} 
                  className="font-rotunda text-lg xl:text-xl 2xl:text-2xl text-white hover:text-[#DA743F] transition-all duration-300 text-left group uppercase tracking-wider"
                >
                  <span className="border-b border-transparent group-hover:border-[#DA743F] transition-all duration-300">AMENITIES</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={handleSocialResponsibilityClick} 
                  className="font-rotunda text-lg xl:text-xl 2xl:text-2xl text-white hover:text-[#DA743F] transition-all duration-300 text-left group uppercase tracking-wider"
                >
                  <span className="border-b border-transparent group-hover:border-[#DA743F] transition-all duration-300">SOCIAL RESPONSIBILITY</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={handleGalleryClick} 
                  className="font-rotunda text-lg xl:text-xl 2xl:text-2xl text-white hover:text-[#DA743F] transition-all duration-300 text-left group uppercase tracking-wider"
                >
                  <span className="border-b border-transparent group-hover:border-[#DA743F] transition-all duration-300">GALLERY</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={handleAboutUsClick} 
                  className="font-rotunda text-lg xl:text-xl 2xl:text-2xl text-white hover:text-[#DA743F] transition-all duration-300 text-left group uppercase tracking-wider"
                >
                  <span className="border-b border-transparent group-hover:border-[#DA743F] transition-all duration-300">ABOUT US</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={handleContactUsClick} 
                  className="font-rotunda text-lg xl:text-xl 2xl:text-2xl text-white hover:text-[#DA743F] transition-all duration-300 text-left group uppercase tracking-wider"
                >
                  <span className="border-b border-transparent group-hover:border-[#DA743F] transition-all duration-300">CONTACT</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8 sm:my-10 lg:my-12 xl:my-16 2xl:my-20 bg-gray-600 opacity-50" />
        
        <div className="text-center">
          <p className="font-rotunda text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl text-white">&copy; 2025 Narra Cliffs. All rights reserved.</p>
          <p className="font-rotunda text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl text-white/80 mt-2 sm:mt-3 lg:mt-4">Eastridge, Binangonan, Rizal</p>
        </div>
      </div>
    </footer>
  );
}