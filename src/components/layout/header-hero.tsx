import React, { useState, useEffect } from 'react';
import { cn } from '../ui/utils';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Button } from '../ui/button';
import { Menu, X, Award, Leaf, Shield } from 'lucide-react';

// Responsive Header Component
// Features: sticky behavior, logo left, nav right, mobile hamburger
interface HeaderProps {
  className?: string;
}

export const ResponsiveHeader: React.FC<HeaderProps> = ({ className }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Projects', href: '#projects' },
    { label: 'Properties', href: '#properties' },
    { label: 'MasterPlan', href: '#masterplan' },
    { label: 'Articles', href: '#articles' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-lg py-3'
          : 'bg-transparent py-4',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1
              className={cn(
                'text-2xl font-bold transition-colors duration-300',
                isScrolled ? 'text-green-800' : 'text-white'
              )}
            >
              Narra Cliffs
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors duration-300 hover:text-amber-500',
                  isScrolled ? 'text-gray-700' : 'text-white'
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button
              className={cn(
                'transition-all duration-300',
                isScrolled
                  ? 'bg-amber-400 text-gray-900 hover:bg-amber-500'
                  : 'bg-white/20 text-white border border-white/30 hover:bg-white hover:text-gray-900'
              )}
            >
              Request Site Visit
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              'md:hidden p-2 rounded-md transition-colors duration-300',
              isScrolled ? 'text-gray-700' : 'text-white'
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-3 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-700 font-medium py-2 hover:text-amber-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-2 border-t border-gray-200">
                <Button className="w-full bg-amber-400 text-gray-900 hover:bg-amber-500">
                  Request Site Visit
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

// Hero Section Component
// Features: video background, overlay content, CTAs, partner logos
interface HeroSectionProps {
  className?: string;
  videoUrl?: string;
  fallbackImage?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  className,
  videoUrl = "https://player.vimeo.com/external/434045526.hd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35ea1a9412f9&profile_id=174",
  fallbackImage = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=2000&q=80",
}) => {
  const partnerLogos = [
    { icon: Award, label: "Green Building Award" },
    { icon: Leaf, label: "Sustainable Development" },
    { icon: Shield, label: "Quality Assured" },
  ];

  return (
    <section
      id="home"
      className={cn(
        'relative h-screen overflow-hidden flex items-center justify-center',
        className
      )}
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster={fallbackImage}
        >
          <source src={videoUrl} type="video/mp4" />
          {/* Fallback image if video fails */}
          <ImageWithFallback
            src={fallbackImage}
            alt="Narra Cliffs scenic landscape"
            className="w-full h-full object-cover"
          />
        </video>
        
        {/* Hero Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 to-black/40" />
      </div>

      {/* Partner Logos Row */}
      <div className="absolute top-24 right-4 md:right-8 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3 z-20">
        {partnerLogos.map((partner, index) => (
          <div
            key={index}
            className="bg-white/20 backdrop-blur-sm rounded-lg p-2 md:p-3 group hover:bg-white/30 transition-all duration-300"
            title={partner.label}
          >
            <partner.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Headlines */}
        <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
            Narra Cliffs
          </h1>
          
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white/90 mb-4">
            The living starts here
          </p>
          
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Discover exceptional properties surrounded by lush greenery and breathtaking landscapes. 
            Your perfect home awaits in harmony with nature.
          </p>
        </div>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Primary CTA */}
          <Button
            size="lg"
            className="w-full sm:w-auto bg-amber-400 text-gray-900 hover:bg-amber-500 px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            Explore Projects
          </Button>
          
          {/* Secondary CTA */}
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            Book a Visit
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-12 md:mt-16 text-white/70 text-sm">
          <p>Scroll down to explore our developments</p>
          <div className="mt-2 w-px h-8 bg-white/50 mx-auto animate-bounce" />
        </div>
      </div>
    </section>
  );
};

// Combined Header + Hero Layout
interface HeaderHeroLayoutProps {
  className?: string;
  headerProps?: Partial<React.ComponentProps<typeof ResponsiveHeader>>;
  heroProps?: Partial<React.ComponentProps<typeof HeroSection>>;
}

export const HeaderHeroLayout: React.FC<HeaderHeroLayoutProps> = ({
  className,
  headerProps,
  heroProps,
}) => {
  return (
    <div className={cn('relative', className)}>
      <ResponsiveHeader {...headerProps} />
      <HeroSection {...heroProps} />
    </div>
  );
};

// Mobile-optimized Hero Variant
export const MobileHeroSection: React.FC<HeroSectionProps> = ({
  className,
  ...props
}) => {
  return (
    <HeroSection
      className={cn('min-h-screen md:h-screen', className)}
      {...props}
    />
  );
};