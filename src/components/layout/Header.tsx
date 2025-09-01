import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Menu, X } from 'lucide-react';
import narraCliffs_Logo from 'figma:asset/46311d8644a5ac83181e53404d85d94c68395719.png';

interface HeaderProps {
  onNavigateToLots?: () => void;
  onNavigateToHome?: () => void;
  onNavigateToAmenities?: () => void;
  onNavigateToContact?: () => void;
  staticPosition?: boolean;
}

export function Header({ 
  onNavigateToLots, 
  onNavigateToHome, 
  onNavigateToAmenities,
  onNavigateToContact,
  staticPosition = false
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [lastScrollY, setLastScrollY] = useState(0);

  // Scroll effect handler
  useEffect(() => {
    // Skip scroll effects if static position is enabled
    if (staticPosition) {
      setIsScrolled(true); // Always show solid background for static header
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      
      // Check if scrolled past header height
      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
    };
  }, [lastScrollY, staticPosition]);

  const handleNavClick = (target: string) => {
    if (target === '#home' && onNavigateToHome) {
      onNavigateToHome();
    }
    setIsMobileMenuOpen(false);
  };

  const handleLotsClick = () => {
    if (onNavigateToLots) {
      onNavigateToLots();
    }
    setIsMobileMenuOpen(false);
  };

  const handleAmenitiesClick = () => {
    if (onNavigateToAmenities) {
      onNavigateToAmenities();
    }
    setIsMobileMenuOpen(false);
  };

  const handleContactClick = () => {
    if (onNavigateToContact) {
      onNavigateToContact();
    }
    setIsMobileMenuOpen(false);
  };

  const handleRequestSiteVisit = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else if (onNavigateToContact) {
      // Navigate to contact page if available
      onNavigateToContact();
    } else {
      // If contact section not found, navigate to home and then scroll
      if (onNavigateToHome) {
        onNavigateToHome();
        setTimeout(() => {
          const contact = document.getElementById('contact');
          if (contact) {
            contact.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
    setIsMobileMenuOpen(false);
  };

  // Calculate dynamic opacity and background based on scroll
  const getHeaderStyles = () => {
    let opacity = 1;
    let backgroundColor = 'rgba(255, 255, 255, 0)';
    
    if (staticPosition) {
      // Static position - always solid white background
      opacity = 1;
      backgroundColor = 'rgba(255, 255, 255, 1)';
    } else if (!isScrolled) {
      // At the top - transparent background
      opacity = 1;
      backgroundColor = 'rgba(255, 255, 255, 0)';
    } else {
      // When scrolling - white background with backdrop blur
      opacity = 1;
      backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }
    
    return {
      opacity,
      backgroundColor,
      backdropFilter: (staticPosition || isScrolled) ? 'blur(12px)' : 'none',
      borderBottom: (staticPosition || isScrolled) ? '1px solid rgba(74, 87, 59, 0.1)' : 'none',
    };
  };

  const headerStyles = getHeaderStyles();

  return (
    <header 
      className={`${staticPosition ? 'static z-50' : 'fixed top-0 left-0 right-0 z-50'} transition-all duration-300`}
      style={{
        ...headerStyles,
        paddingTop: 'clamp(0.5rem, 2vw, 2rem)',
        paddingBottom: 'clamp(0.5rem, 2vw, 2rem)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-center transition-all duration-300 relative"
           style={{ 
             minHeight: 'clamp(5.5rem, 9vw, 12rem)',
             gap: 'clamp(2rem, 3vw, 2.5rem)',
           }}>
        
        {/* Centered Logo, Navigation and CTA Container */}
        <div className="flex items-center justify-center flex-shrink-0">
          {/* Logo with Enhanced Scalability */}
          <div className="flex items-center overflow-visible">
            <button onClick={onNavigateToHome} className="focus:outline-none">
              <img 
                src={narraCliffs_Logo} 
                alt="Narra Cliffs - The Life Above" 
                className="w-auto max-w-none transition-all duration-300 hover:scale-105"
                style={{ 
                  height: 'clamp(5rem, 9vw, 12rem)',
                }}
              />
            </button>
          </div>
          
          {/* Desktop Navigation with Consistent Font Styling */}
          <nav className={`hidden lg:flex items-center transition-all duration-300 ml-8`}
               style={{ 
                 gap: 'clamp(1rem, 1.5vw, 2rem)',
                 whiteSpace: 'nowrap',
                 overflow: 'visible',
               }}>
          <button 
            onClick={() => handleNavClick('#home')} 
            className="font-rotunda font-bold text-[#4A573B] hover:text-[#4A573B] transition-all duration-300 rounded-md hover:bg-green-50/50 whitespace-nowrap"
            style={{ 
              fontSize: 'clamp(0.875rem, 1.1vw, 1.125rem)',
              padding: 'clamp(0.5rem, 0.7vw, 1rem) clamp(1rem, 1.2vw, 1.5rem)',
              textOverflow: 'ellipsis',
              overflow: 'visible',
              fontFamily: "'Rotunda Regular', 'Roboto', 'Arial', sans-serif",
            }}
          >
            Home
          </button>
          <button 
            onClick={handleLotsClick} 
            className="font-rotunda font-bold text-[#4A573B] hover:text-[#4A573B] transition-all duration-300 rounded-md hover:bg-green-50/50 whitespace-nowrap"
            style={{ 
              fontSize: 'clamp(0.875rem, 1.1vw, 1.125rem)',
              padding: 'clamp(0.5rem, 0.7vw, 1rem) clamp(1rem, 1.2vw, 1.5rem)',
              textOverflow: 'ellipsis',
              overflow: 'visible',
              fontFamily: "'Rotunda Regular', 'Roboto', 'Arial', sans-serif",
            }}
          >
            Available Lots
          </button>
          <button 
            onClick={handleAmenitiesClick} 
            className="font-rotunda font-bold text-[#4A573B] hover:text-[#4A573B] transition-all duration-300 rounded-md hover:bg-green-50/50 whitespace-nowrap"
            style={{ 
              fontSize: 'clamp(0.875rem, 1.1vw, 1.125rem)',
              padding: 'clamp(0.5rem, 0.7vw, 1rem) clamp(1rem, 1.2vw, 1.5rem)',
              textOverflow: 'ellipsis',
              overflow: 'visible',
              fontFamily: "'Rotunda Regular', 'Roboto', 'Arial', sans-serif",
            }}
          >
            Amenities
          </button>
          <button 
            onClick={() => handleNavClick('#home')} 
            className="font-rotunda font-bold text-[#4A573B] hover:text-[#4A573B] transition-all duration-300 rounded-md hover:bg-green-50/50 whitespace-nowrap"
            style={{ 
              fontSize: 'clamp(0.875rem, 1.1vw, 1.125rem)',
              padding: 'clamp(0.5rem, 0.7vw, 1rem) clamp(1rem, 1.2vw, 1.5rem)',
              textOverflow: 'ellipsis',
              overflow: 'visible',
              fontFamily: "'Rotunda Regular', 'Roboto', 'Arial', sans-serif",
            }}
          >
            Social Responsibility
          </button>
          <button 
            onClick={() => handleNavClick('#home')} 
            className="font-rotunda font-bold text-[#4A573B] hover:text-[#4A573B] transition-all duration-300 rounded-md hover:bg-green-50/50 whitespace-nowrap"
            style={{ 
              fontSize: 'clamp(0.875rem, 1.1vw, 1.125rem)',
              padding: 'clamp(0.5rem, 0.7vw, 1rem) clamp(1rem, 1.2vw, 1.5rem)',
              textOverflow: 'ellipsis',
              overflow: 'visible',
              fontFamily: "'Rotunda Regular', 'Roboto', 'Arial', sans-serif",
            }}
          >
            Gallery
          </button>
          <button 
            onClick={() => handleNavClick('#home')} 
            className="font-rotunda font-bold text-[#4A573B] hover:text-[#4A573B] transition-all duration-300 rounded-md hover:bg-green-50/50 whitespace-nowrap"
            style={{ 
              fontSize: 'clamp(0.875rem, 1.1vw, 1.125rem)',
              padding: 'clamp(0.5rem, 0.7vw, 1rem) clamp(1rem, 1.2vw, 1.5rem)',
              textOverflow: 'ellipsis',
              overflow: 'visible',
              fontFamily: "'Rotunda Regular', 'Roboto', 'Arial', sans-serif",
            }}
          >
            About Us
          </button>
          </nav>
          
          {/* Desktop CTA Button with Consistent Orange Styling */}
          <div className="hidden md:flex ml-8">
            <Button 
              className="font-rotunda bg-transparent border-2 border-[#DA743F] text-[#DA743F] hover:bg-[#DA743F] hover:text-white transition-all duration-300 hover:shadow-lg whitespace-nowrap"
              style={{ 
                fontSize: 'clamp(0.875rem, 1.1vw, 1.125rem)',
                padding: 'clamp(0.75rem, 1vw, 1.25rem) clamp(1.5rem, 2vw, 2rem)',
                borderColor: '#DA743F',
                color: '#DA743F',
                fontWeight: '700',
                fontFamily: "'Rotunda Regular', 'Roboto', 'Arial', sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#DA743F';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#DA743F';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              onClick={handleRequestSiteVisit}
            >
              Request Site Visit
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button with Enhanced Scaling */}
        <button
          className="lg:hidden p-2 transition-all duration-300 hover:bg-green-50/50 rounded-md absolute right-4"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={!isScrolled ? "text-[#4A573B]" : "text-[#4A573B]"} 
               style={{ 
                 width: 'clamp(1.25rem, 3vw, 1.75rem)', 
                 height: 'clamp(1.25rem, 3vw, 1.75rem)' 
               }} />
          ) : (
            <Menu className={!isScrolled ? "text-[#4A573B]" : "text-[#4A573B]"} 
                  style={{ 
                    width: 'clamp(1.25rem, 3vw, 1.75rem)', 
                    height: 'clamp(1.25rem, 3vw, 1.75rem)' 
                  }} />
          )}
        </button>
      </div>

      {/* Enhanced Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 shadow-lg border-t transition-all duration-300"
             style={{ 
               backgroundColor: 'rgba(74, 87, 59, 0.95)',
               backdropFilter: 'blur(12px)'
             }}>
          <nav className="px-4 py-6 space-y-4">
            <button 
              onClick={() => handleNavClick('#home')} 
              className="font-rotunda block w-full text-left text-white hover:text-green-200 py-3 px-2 rounded-md hover:bg-green-700/20 transition-colors duration-300 font-medium"
              style={{ 
                fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                fontFamily: "'Rotunda Regular', 'Roboto', 'Arial', sans-serif",
              }}
            >
              Home
            </button>
            <button 
              onClick={handleLotsClick} 
              className="font-rotunda block w-full text-left text-white hover:text-green-200 py-3 px-2 rounded-md hover:bg-green-700/20 transition-colors duration-300 font-medium"
              style={{ 
                fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                fontFamily: "'Rotunda Regular', 'Roboto', 'Arial', sans-serif",
              }}
            >
              Available Lots
            </button>
            <button 
              onClick={handleAmenitiesClick} 
              className="font-rotunda block w-full text-left text-white hover:text-green-200 py-3 px-2 rounded-md hover:bg-green-700/20 transition-colors duration-300 font-medium"
              style={{ 
                fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                fontFamily: "'Rotunda Regular', 'Roboto', 'Arial', sans-serif",
              }}
            >
              Amenities
            </button>
            <button 
              onClick={() => handleNavClick('#home')} 
              className="font-rotunda block w-full text-left text-white hover:text-green-200 py-3 px-2 rounded-md hover:bg-green-700/20 transition-colors duration-300 font-medium"
              style={{ 
                fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                fontFamily: "'Rotunda Regular', 'Roboto', 'Arial', sans-serif",
              }}
            >
              Social Responsibility
            </button>
            <button 
              onClick={() => handleNavClick('#home')} 
              className="font-rotunda block w-full text-left text-white hover:text-green-200 py-3 px-2 rounded-md hover:bg-green-700/20 transition-colors duration-300 font-medium"
              style={{ 
                fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                fontFamily: "'Rotunda Regular', 'Roboto', 'Arial', sans-serif",
              }}
            >
              Gallery
            </button>
            <button 
              onClick={() => handleNavClick('#home')} 
              className="font-rotunda block w-full text-left text-white hover:text-green-200 py-3 px-2 rounded-md hover:bg-green-700/20 transition-colors duration-300 font-medium"
              style={{ 
                fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                fontFamily: "'Rotunda Regular', 'Roboto', 'Arial', sans-serif",
              }}
            >
              About Us
            </button>
            <Button 
              className="font-rotunda w-full bg-transparent border-2 mt-4 transition-all duration-300 hover:shadow-lg"
              style={{ 
                fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                padding: 'clamp(0.75rem, 2vw, 1rem)',
                borderColor: '#DA743F',
                color: '#DA743F',
                fontWeight: '600',
                fontFamily: "'Rotunda Regular', 'Roboto', 'Arial', sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#DA743F';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#DA743F';
              }}
              onClick={handleRequestSiteVisit}
            >
              Request Site Visit
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}