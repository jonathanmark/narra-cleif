import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import image1 from 'figma:asset/c0b95d6561670fe18db793b87c3afba0be4be5cd.png';
import image2 from 'figma:asset/15a8012cfc7737db9ae56aa72638a54a5173f769.png';
import image3 from 'figma:asset/68a2a261936101d3b4b330bd5d548d060662a971.png';
import image4 from 'figma:asset/68a2a261936101d3b4b330bd5d548d060662a971.png';
import image5 from 'figma:asset/67c46f8645df9de40183798dec5ab6a5fcedfbd8.png';
import image6 from 'figma:asset/58b35d7c68d73196bd1bc65be3402ea81019aa0a.png';
import image7 from 'figma:asset/1398b5807d1c3fc5b337230e3c78f9f7415f1436.png';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface Phase {
  id: string;
  title: string;
  description: string;
  images: GalleryImage[];
  status: 'completed' | 'ongoing' | 'planned';
}

interface GalleryPageProps {
  onNavigateToHome?: () => void;
  onNavigateToLots?: () => void;
}

export function GalleryPage({ onNavigateToHome, onNavigateToLots }: GalleryPageProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<string>('phase-1');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample development phases with images
  const phases: Phase[] = [
    {
      id: 'phase-1',
      title: 'Phase 1',
      description: 'The premier golf course community featuring luxurious lots with stunning fairway views.',
      status: 'ongoing',
      images: [
        {
          id: 'phase1-1',
          src: image1,
          alt: 'Narra Cliffs aerial view with golf course and clubhouse'
        },
        {
          id: 'phase1-2',
          src: image2,
          alt: 'Narra Cliffs development aerial landscape view'
        },
        {
          id: 'phase1-3',
          src: image4,
          alt: 'Narra Cliffs Phase 1 golf course aerial view'
        },
        {
          id: 'phase1-4',
          src: image5,
          alt: 'Narra Cliffs Phase 1 development progress aerial view'
        },
        {
          id: 'phase1-5',
          src: image6,
          alt: 'Narra Cliffs Phase 1 construction and development aerial view'
        },
        {
          id: 'phase1-6',
          src: image7,
          alt: 'Narra Cliffs panoramic aerial view with golf course and Manila skyline'
        }
      ]
    },
    {
      id: 'phase-2',
      title: 'Phase 2',
      description: 'Premium elevated lots offering panoramic views of the surrounding landscape and Manila skyline.',
      status: 'planned',
      images: [
        {
          id: 'phase2-1',
          src: image3,
          alt: 'Narra Cliffs Phase 2 aerial view with golf course fairways'
        }
      ]
    }
  ];

  const filteredImages = phases.find(phase => phase.id === selectedPhase)?.images || [];

  // Carousel navigation functions
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredImages.length);
  };

  const getPreviousIndex = (current: number) => (current - 1 + filteredImages.length) % filteredImages.length;
  const getNextIndex = (current: number) => (current + 1) % filteredImages.length;

  // Reset carousel when phase changes
  React.useEffect(() => {
    setCurrentSlide(0);
  }, [selectedPhase]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'ongoing':
        return 'text-[#DA743F] bg-orange-50';
      case 'planned':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'ongoing':
        return 'Under Development';
      case 'planned':
        return 'Coming Soon';
      default:
        return status;
    }
  };

  useEffect(() => {
    // Smooth scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 bg-gradient-to-br from-[#4A573B] to-[#5A6748]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-garamond text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6">
              Development Gallery
            </h1>
            <p className="font-rotunda text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Explore the evolution of Narra Cliffs through our comprehensive gallery showcasing each development phase, from initial construction to completed communities.
            </p>
            <div className="font-garamond text-base md:text-lg text-white/80">
              <span className="italic">The Life Above</span> - Binangonan, Rizal
            </div>
          </motion.div>
        </div>
      </section>

      {/* Phase Filter Navigation */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-8">
            {phases.map((phase) => {
              const isDisabled = phase.id === 'phase-2';
              return (
                <div key={phase.id} className="flex flex-col items-center">
                  <div className={`text-sm font-rotunda mb-2 px-3 py-1 rounded-full ${
                    phase.status === 'ongoing' 
                      ? 'text-blue-700 bg-blue-50' 
                      : 'text-orange-700 bg-orange-50'
                  }`}>
                    {getStatusText(phase.status)}
                  </div>
                  <motion.button
                    onClick={isDisabled ? undefined : () => setSelectedPhase(phase.id)}
                    disabled={isDisabled}
                    className={`px-6 py-3 rounded-lg font-rotunda font-medium transition-all duration-300 ${
                      isDisabled
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : selectedPhase === phase.id
                        ? 'bg-[#4A573B] text-white shadow-lg'
                        : 'bg-gray-100 text-[#4A573B] hover:bg-gray-200'
                    }`}
                    whileHover={isDisabled ? {} : { scale: 1.05 }}
                    whileTap={isDisabled ? {} : { scale: 0.95 }}
                  >
                    {phase.title}
                  </motion.button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Phase Information */}


      {/* Image Gallery - Carousel */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Phase Description */}
          {phases.find(phase => phase.id === selectedPhase) && (
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              key={`phase-description-${selectedPhase}`}
            >
              <h2 className="font-garamond text-3xl md:text-4xl text-[#4A573B] mb-4">
                {phases.find(phase => phase.id === selectedPhase)?.title}
              </h2>
              <p className="font-rotunda text-lg text-gray-700 max-w-3xl mx-auto">
                {phases.find(phase => phase.id === selectedPhase)?.description}
              </p>
            </motion.div>
          )}

          {/* Carousel Container */}
          {filteredImages.length > 0 && (
            <motion.div
              className="relative w-full overflow-hidden carousel-optimized"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              key={`phase-carousel-${selectedPhase}`}
            >
              <div className="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] flex items-center">
                
                {/* Mobile Layout: Single Image */}
                <div className="md:hidden w-full h-full relative overflow-hidden">
                  <motion.div
                    key={`mobile-${selectedPhase}-${currentSlide}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                      opacity: { duration: 0.4 }
                    }}
                    className="w-full h-full group cursor-pointer"
                    onClick={() => setSelectedImage(filteredImages[currentSlide])}
                  >
                    <div className="w-full h-full relative overflow-hidden rounded-lg shadow-xl">
                      <ImageWithFallback
                        src={filteredImages[currentSlide].src}
                        alt={filteredImages[currentSlide].alt}
                        className="w-full h-full object-cover carousel-smooth"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Desktop Layout: Three Images (Previous, Current, Next) */}
                {filteredImages.length > 1 && (
                  <div className="hidden md:flex w-full h-full gap-4 px-4">
                    {/* Previous Image (Left) */}
                    <motion.div 
                      className="w-1/4 h-full relative overflow-hidden"
                      initial={{ opacity: 0.6, scale: 0.95 }}
                      animate={{ opacity: 0.6, scale: 0.95 }}
                      whileHover={{ opacity: 0.8, scale: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div 
                        className="absolute inset-0 carousel-smooth touch-feedback cursor-pointer group"
                        onClick={goToPrevious}
                      >
                        <div className="w-full h-full relative overflow-hidden rounded-lg shadow-lg">
                          <ImageWithFallback
                            src={filteredImages[getPreviousIndex(currentSlide)].src}
                            alt={filteredImages[getPreviousIndex(currentSlide)].alt}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-opacity duration-300" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Current Image (Center) */}
                    <motion.div 
                      className="w-1/2 h-full relative overflow-hidden"
                      key={`current-${selectedPhase}-${currentSlide}`}
                      initial={{ opacity: 0.8, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div 
                        className="w-full h-full relative overflow-hidden rounded-lg shadow-xl cursor-pointer group"
                        onClick={() => setSelectedImage(filteredImages[currentSlide])}
                      >
                        <ImageWithFallback
                          src={filteredImages[currentSlide].src}
                          alt={filteredImages[currentSlide].alt}
                          className="w-full h-full object-cover carousel-smooth lazy-fade-in"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                          <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                    </motion.div>

                    {/* Next Image (Right) */}
                    <motion.div 
                      className="w-1/4 h-full relative overflow-hidden"
                      initial={{ opacity: 0.6, scale: 0.95 }}
                      animate={{ opacity: 0.6, scale: 0.95 }}
                      whileHover={{ opacity: 0.8, scale: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div 
                        className="absolute inset-0 carousel-smooth touch-feedback cursor-pointer group"
                        onClick={goToNext}
                      >
                        <div className="w-full h-full relative overflow-hidden rounded-lg shadow-lg">
                          <ImageWithFallback
                            src={filteredImages[getNextIndex(currentSlide)].src}
                            alt={filteredImages[getNextIndex(currentSlide)].alt}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-opacity duration-300" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* Single Image Layout for Desktop when only one image */}
                {filteredImages.length === 1 && (
                  <div className="hidden md:flex w-full h-full justify-center">
                    <motion.div 
                      className="w-full max-w-4xl h-full relative overflow-hidden"
                      initial={{ opacity: 0.8, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div 
                        className="w-full h-full relative overflow-hidden rounded-lg shadow-xl cursor-pointer group"
                        onClick={() => setSelectedImage(filteredImages[0])}
                      >
                        <ImageWithFallback
                          src={filteredImages[0].src}
                          alt={filteredImages[0].alt}
                          className="w-full h-full object-cover carousel-smooth lazy-fade-in"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                          <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* Navigation Arrows - Only show when there are multiple images */}
                {filteredImages.length > 1 && (
                  <>
                    <motion.button
                      onClick={goToPrevious}
                      className="absolute left-4 top-1/2 -translate-y-1/2 carousel-nav-enhanced rounded-full p-2 text-gray-800 transition-all duration-300 z-20 touch-manipulation flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </motion.button>
                    
                    <motion.button
                      onClick={goToNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 carousel-nav-enhanced rounded-full p-2 text-gray-800 transition-all duration-300 z-20 touch-manipulation flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </>
                )}

                {/* Dot Indicators - Only show when there are multiple images */}
                {filteredImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                    {filteredImages.map((_, index) => (
                      <motion.button
                        key={`dot-${selectedPhase}-${index}`}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 touch-manipulation ${
                          index === currentSlide 
                            ? 'bg-white scale-110 shadow-lg' 
                            : 'bg-white/50 hover:bg-white/70'
                        }`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* No Images Message */}
          {filteredImages.length === 0 && (
            <div className="text-center py-16">
              <p className="font-rotunda text-lg text-gray-500">
                No images available for this phase yet. Please check back later!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-[#4A573B] to-[#5A6748]">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-garamond text-3xl md:text-4xl text-white mb-6">
              Ready to Find Your Perfect Lot?
            </h2>
            <p className="font-rotunda text-lg text-white/90 mb-8">
              Explore our available lots and find the perfect space to build your dream home in this exceptional development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={onNavigateToLots}
                className="font-rotunda bg-[#DA743F] hover:bg-[#c5662f] text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
                whileTap={{ scale: 0.95 }}
              >
                View Available Lots
              </motion.button>
              <motion.button
                onClick={() => {
                  if (onNavigateToHome) {
                    onNavigateToHome();
                    setTimeout(() => {
                      const contact = document.getElementById('contact');
                      if (contact) {
                        contact.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  }
                }}
                className="font-rotunda bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#4A573B] px-8 py-3 rounded-lg font-medium transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl max-h-[90vh] w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="relative">
              <ImageWithFallback
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              

            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}