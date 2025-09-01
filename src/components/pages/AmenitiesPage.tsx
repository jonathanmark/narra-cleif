import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Award,
  ChevronLeft,
  ChevronRight,
  Square,
  Play,
  Users,
  Activity,
  Coffee,
  Building,
  Globe,
  Star,
  Flower,
  Bike,
  TreePine,
  Utensils,
  Instagram,
  ExternalLink,
  MapPin,
  Triangle
} from 'lucide-react';
import aerialLandscapeImage from 'figma:asset/67c46f8645df9de40183798dec5ab6a5fcedfbd8.png';
import clubhouseImage1 from 'figma:asset/16da7f0c1fbed57a09a6f0e5b38183659eb01983.png';
import newClubhouseExterior from 'figma:asset/d81cff0c05bb71d7225da828efac623ee4f63be1.png';
import clubhouseInterior1 from 'figma:asset/e0c088cef911e9046fde5d1f5d7d9af1b1952abc.png';
import playgroundAreaImage from 'figma:asset/5458b57bf13b83b70a611c5ef89f417782abcf0b.png';
import fitnessCenter from 'figma:asset/190566ced3e4d1eff154b4c8e2c07effed4608b7.png';
import clubhouseEntrance from 'figma:asset/db808806d63f6be3ddd82bf1688c2e862c13ad34.png';
import clubhouseExteriorView from 'figma:asset/1ac4185686a29a83cca6c43556e6deef222b9c82.png';
import clubhouseWithPlayground from 'figma:asset/e5cd8a12a94e79194cac6aeb218067989414c0af.png';
import clubhouseArchitecturalView from 'figma:asset/7bc50b0f18a2425e4a3cc5f3765591246827d75d.png';
import clubhouseAerialView from 'figma:asset/7324608e6a23d1c3fe701b6cb5d8147a9b5d4d08.png';
import clubhouseEntranceSign from 'figma:asset/7e2b84dd52b078042a9ccdb2a7f17cf7fa6c6900.png';
import clubhouseModernInterior from 'figma:asset/9843fdbafc3d9f71db9e5ee0b34823a6688edaa2.png';
import clubhouseInteriorLounge from 'figma:asset/4b3dd2db0b49c68559818346c07462f424a21609.png';
import clubhouseElevatedView from 'figma:asset/017fed1d3f715b816a418abbcbd248ce69b26e7c.png';
import clubhousePoolsideView from 'figma:asset/f7e5ca0205eb81a418958bff82da1281fe3a56b3.png';
import clubhouseComplexAngle from 'figma:asset/38a25325b9da6d5a00fbe89806d36d2090676a4c.png';
import clubhouseMeetingRoom from 'figma:asset/0f3fd4d6ee50e1e0895857e838469db282a1bc7a.png';
import sunsetParkImage1 from 'figma:asset/a50ce1a018d3c763b48a584d39480029ef7ba2b2.png';
import sunsetParkImage2 from 'figma:asset/c3d06948c7267eb199fcd55f5999efef8658833f.png';
import golfCourseImage from 'figma:asset/1bac27e8d21bb01b9c0e9933eff3fa08d0842ca1.png';

interface AmenitiesPageProps {
  onNavigateToHome: () => void;
  onNavigateToLots: () => void;
}

// Hero Section
function AmenitiesHero({ onNavigateToLots }: { onNavigateToLots: () => void }) {
  return (
    <section className="relative min-h-[70vh] md:min-h-[60vh] lg:min-h-[50vh] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: `url(${aerialLandscapeImage})`
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundColor: '#FFFFFF',
            opacity: 0.55
          }}
        ></div>
      </div>

      <div className="relative z-10 min-h-[70vh] md:min-h-[60vh] lg:min-h-[50vh] flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 md:space-y-6 mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24 font-garamond"
              style={{ transform: 'translateY(30px)' }}
            >
              <motion.h1 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold"
                style={{ color: '#4A573B' }}
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                World-Class Amenities
              </motion.h1>
              
              <motion.div 
                className="flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex-1 h-px bg-white/30 max-w-[50px] sm:max-w-[60px]"></div>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mx-4" style={{ color: '#4A573B' }}>
                  Live The Elevated Lifestyle
                </p>
                <div className="flex-1 h-px bg-white/30 max-w-[50px] sm:max-w-[60px]"></div>
              </motion.div>
              
              <motion.p 
                className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl max-w-3xl mx-auto leading-relaxed font-bold"
                style={{ color: '#4A573B' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Experience premium facilities and recreational spaces designed to enhance your everyday living at Narra Cliffs.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Clubhouse Section (WITH AUTO-PLAY)
function ClubhouseSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const images = [
    {
      src: clubhouseArchitecturalView,
      alt: "Architectural Rendering of Narra Cliffs Clubhouse",
      title: "Visionary Clubhouse Design",
      description: "Stunning architectural rendering showcasing the modern clubhouse from street level"
    },
    {
      src: clubhouseAerialView,
      alt: "Aerial View of Complete Clubhouse Complex",
      title: "Bird's Eye Clubhouse Perspective",
      description: "Comprehensive aerial view showing the entire clubhouse complex and surrounding landscape"
    },
    {
      src: clubhouseElevatedView,
      alt: "Elevated Architectural View of Clubhouse Complex",
      title: "Complete Resort-Style Complex",
      description: "Elevated perspective showcasing the full clubhouse development with pool, landscaping, and recreational areas"
    },
    {
      src: clubhouseEntranceSign,
      alt: "Narra Cliff Clubhouse Entrance with Signage",
      title: "Branded Clubhouse Entrance",
      description: "Elegant entrance featuring the distinctive Narra Cliff Clubhouse branding and welcoming approach"
    },
    {
      src: clubhouseModernInterior,
      alt: "Modern Clubhouse Interior with Floor-to-Ceiling Windows",
      title: "Contemporary Interior Spaces",
      description: "Open-plan interior design featuring floor-to-ceiling windows, modern furnishing, and seamless indoor-outdoor living"
    },
    {
      src: clubhouseInteriorLounge,
      alt: "Clubhouse Lounge Area with Pool Views",
      title: "Sophisticated Lounge Design",
      description: "Elegantly designed lounge areas with contemporary furniture and panoramic views of the pool and gardens"
    },
    {
      src: clubhousePoolsideView,
      alt: "Clubhouse Poolside Architectural Rendering",
      title: "Resort-Style Poolside Living",
      description: "Architectural rendering showcasing the clubhouse's stunning poolside design with covered terraces and outdoor entertainment areas"
    },
    {
      src: clubhouseComplexAngle,
      alt: "Alternative View of Clubhouse Complex",
      title: "Integrated Pool & Landscape Design",
      description: "Comprehensive view highlighting the seamless integration of pool facilities with natural landscaping and modern architecture"
    },
    {
      src: clubhouseMeetingRoom,
      alt: "Clubhouse Meeting Room Interior",
      title: "Executive Meeting Spaces",
      description: "Elegant interior meeting and dining room featuring floor-to-ceiling windows with scenic pool and garden views"
    },
    {
      src: newClubhouseExterior,
      alt: "Modern Clubhouse with Pool Integration",
      title: "Luxury Clubhouse & Pool Complex",
      description: "Stunning modern architecture with seamless pool integration"
    },
    {
      src: clubhouseEntrance,
      alt: "Narra Cliffs Clubhouse Main Entrance",
      title: "Grand Clubhouse Entrance",
      description: "Welcoming entrance with modern design and clear signage"
    },
    {
      src: clubhouseInterior1,
      alt: "Open-Concept Interior Space",
      title: "Sophisticated Interior Design",
      description: "Light-filled open spaces with modern finishes"
    },
    {
      src: fitnessCenter,
      alt: "Modern Fitness Center with Pool Views",
      title: "State-of-the-Art Fitness Center",
      description: "Fully equipped gym with panoramic views of the pool and gardens"
    },
    {
      src: clubhouseExteriorView,
      alt: "Clubhouse Exterior with Parking and Landscaping",
      title: "Complete Clubhouse Complex",
      description: "Full view of the clubhouse featuring parking facilities and beautiful landscaping"
    },
    {
      src: clubhouseWithPlayground,
      alt: "Clubhouse with Children's Playground Area",
      title: "Family-Friendly Amenities",
      description: "Clubhouse overview showcasing the adjacent children's playground and recreational areas"
    },
    {
      src: clubhouseImage1,
      alt: "Modern Clubhouse Exterior",
      title: "Contemporary Clubhouse Design",
      description: "Architectural excellence with natural landscape integration"
    },
    {
      src: playgroundAreaImage,
      alt: "Family Recreation Area",
      title: "Family Recreation Hub",
      description: "Dedicated playground and recreational spaces for families"
    }
  ];

  const totalSlides = images.length;

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const getPreviousIndex = (current: number) => (current - 1 + totalSlides) % totalSlides;
  const getNextIndex = (current: number) => (current + 1) % totalSlides;

  return (
    <section className="py-16 bg-[rgba(255,255,255,1)]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#4A573B] mb-6 font-garamond">
            Discover the Clubhouse
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-rotunda text-justify">
            A contemporary modern clubhouse featuring a stylish lounge perfect for hanging out or "work near home" sessions, an infinity lap pool, and beautifully manicured lawns where children can play safely.
          </p>
        </motion.div>
      </div>

      {/* Full-width carousel container */}
      <motion.div
        className="relative w-full overflow-hidden carousel-optimized"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Carousel Images - More landscape oriented with responsive layout */}
        <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] flex items-center">
          
          {/* Mobile Layout: Single Image */}
          <div className="md:hidden w-full h-full relative overflow-hidden">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.25, 0.46, 0.45, 0.94],
                opacity: { duration: 0.4 }
              }}
              className="w-full h-full"
            >
              <ImageWithFallback
                src={images[currentSlide].src}
                alt={images[currentSlide].alt}
                className="w-full h-full object-cover carousel-smooth"
              />
            </motion.div>
          </div>

          {/* Desktop Layout: Three Images (Previous, Current, Next) */}
          <div className="hidden md:flex w-full h-full">
            {/* Previous Image (Left) */}
            <motion.div 
              className="w-1/4 h-full relative overflow-hidden"
              initial={{ opacity: 0.6, scale: 0.95 }}
              animate={{ opacity: 0.6, scale: 0.95 }}
              whileHover={{ opacity: 0.8, scale: 1 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <div className="absolute inset-0 carousel-smooth touch-feedback">
                <ImageWithFallback
                  src={images[getPreviousIndex(currentSlide)].src}
                  alt={images[getPreviousIndex(currentSlide)].alt}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={goToPrevious}
                />
                <div className="absolute inset-0 bg-black/20 transition-opacity duration-300" />
              </div>
            </motion.div>

            {/* Current Image (Center) */}
            <motion.div 
              className="w-1/2 h-full relative overflow-hidden"
              key={`current-${currentSlide}`}
              initial={{ opacity: 0.8, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <ImageWithFallback
                src={images[currentSlide].src}
                alt={images[currentSlide].alt}
                className="w-full h-full object-cover carousel-smooth lazy-fade-in"
              />
            </motion.div>

            {/* Next Image (Right) */}
            <motion.div 
              className="w-1/4 h-full relative overflow-hidden"
              initial={{ opacity: 0.6, scale: 0.95 }}
              animate={{ opacity: 0.6, scale: 0.95 }}
              whileHover={{ opacity: 0.8, scale: 1 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <div className="absolute inset-0 carousel-smooth touch-feedback">
                <ImageWithFallback
                  src={images[getNextIndex(currentSlide)].src}
                  alt={images[getNextIndex(currentSlide)].alt}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={goToNext}
                />
                <div className="absolute inset-0 bg-black/20 transition-opacity duration-300" />
              </div>
            </motion.div>
          </div>

          {/* Enhanced Navigation Arrows */}
          <motion.button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 carousel-nav-enhanced rounded-full p-3 sm:p-4 text-gray-800 transition-all duration-300 z-20 touch-manipulation"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>
          
          <motion.button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 carousel-nav-enhanced rounded-full p-3 sm:p-4 text-gray-800 transition-all duration-300 z-20 touch-manipulation"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>

          {/* Enhanced Play/Pause Button */}
          <motion.button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-2 text-gray-800 transition-all duration-300 z-20 shadow-lg touch-manipulation"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isAutoPlaying ? (
              <Square className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </motion.button>

          {/* Enhanced Dot Indicators */}

        </div>
      </motion.div>
    </section>
  );
}

// Sunset Park Section (MANUAL ONLY - NO AUTO-PLAY) 
function SunsetParkSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const mediaItems = [
    {
      type: 'image',
      src: sunsetParkImage1,
      alt: "Sunset Park Pavilion with Scenic Mountain Views",
      title: "Scenic Mountain Pavilion",
      description: "Modern pavilion structure offering panoramic views of the surrounding landscape"
    },
    {
      type: 'image',
      src: sunsetParkImage2,
      alt: "Sunset Park Pavilion Alternative View",
      title: "Natural Integration Design",
      description: "Architectural design seamlessly integrated with the natural landscape and lush greenery"
    },
    {
      type: 'video',
      src: "https://vimeo.com/1110247157",
      videoId: "1110247157",
      alt: "Sunset Park Virtual Tour",
      title: "Virtual Experience",
      description: "Take a virtual tour through the stunning landscape and architecture of Sunset Park"
    }
  ];

  const totalSlides = mediaItems.length;

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const renderMediaItem = (item: any) => {
    if (item.type === 'video') {
      return (
        <div className="w-full h-full relative">
          <iframe
            src={`https://player.vimeo.com/video/${item.videoId}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&background=1`}
            className="w-full h-full object-cover"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={item.alt}
          />
        </div>
      );
    } else {
      return (
        <ImageWithFallback
          src={item.src}
          alt={item.alt}
          className="w-full h-full object-cover carousel-smooth lazy-fade-in"
        />
      );
    }
  };

  return (
    <section className="py-16 bg-[#F5F3ED]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#4A573B] mb-6 font-garamond">
            Explore Sunset Park
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-rotunda text-justify">
            Experience the breathtaking beauty of Sunset Park, where modern architecture meets nature's grandeur. This elevated sanctuary offers unparalleled views and serves as the perfect backdrop for moments of tranquility and reflection.
          </p>
        </motion.div>
      </div>

      {/* Media Gallery */}
      <motion.div
        className="relative w-full overflow-hidden carousel-optimized"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] xl:h-[700px] flex items-center">
          
          {/* Mobile Layout: Single Media Item */}
          <div className="md:hidden w-full h-full relative overflow-hidden">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.25, 0.46, 0.45, 0.94],
                opacity: { duration: 0.4 }
              }}
              className="w-full h-full"
            >
              {renderMediaItem(mediaItems[currentSlide])}
            </motion.div>
          </div>

          {/* Desktop Layout: Single Centered Media Item */}
          <div className="hidden md:flex w-full h-full justify-center">
            <motion.div 
              className="w-full max-w-6xl xl:max-w-7xl h-full relative overflow-hidden rounded-lg shadow-xl"
              key={`sunset-park-${currentSlide}`}
              initial={{ opacity: 0.8, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              {renderMediaItem(mediaItems[currentSlide])}
            </motion.div>
          </div>

          {/* Enhanced Navigation Arrows */}
          <motion.button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 carousel-nav-enhanced rounded-full p-3 sm:p-4 text-gray-800 transition-all duration-300 z-20 touch-manipulation"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous media"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>
          
          <motion.button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 carousel-nav-enhanced rounded-full p-3 sm:p-4 text-gray-800 transition-all duration-300 z-20 touch-manipulation"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next media"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>

          {/* Enhanced Dot Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
            {mediaItems.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 touch-manipulation ${
                  index === currentSlide 
                    ? 'bg-white scale-110 shadow-lg' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// Eastridge Amenities Section - RESTORED TO EXACT ORIGINAL FROM IMAGES
function EastridgeSection({ onNavigateToLots }: { onNavigateToLots: () => void }) {
  const [activeTab, setActiveTab] = useState("recreational");

  const recreationalAmenities = [
    {
      name: "Eastridge Golf Club",
      description: "Championship golf course offering scenic views and challenging play",
      icon: <Award className="w-6 h-6" />,
      category: "Recreation"
    },
    {
      name: "Eastridge Driving Range", 
      description: "Practice your swing at our professional driving range facility",
      icon: <MapPin className="w-6 h-6" />,
      category: "Recreation"
    },
    {
      name: "Eastridge Bike Trails",
      description: "Scenic cycling paths winding through beautiful landscapes", 
      icon: <Bike className="w-6 h-6" />,
      category: "Recreation"
    },
    {
      name: "Bunker Park",
      description: "Adventure playground and recreational space for outdoor activities",
      icon: <Triangle className="w-6 h-6" />,
      category: "Recreation"
    }
  ];

  const diningAmenities = [
    {
      name: "Cafe Giya",
      description: "Café with breathtaking views and artisanal coffee",
      icon: <Coffee className="w-6 h-6" />,
      category: "Dining"
    },
    {
      name: "Escalera Restaurant", 
      description: "Fine dining restaurant with panoramic scenic views",
      icon: <Building className="w-6 h-6" />,
      category: "Dining"
    },
    {
      name: "Thunderbird Resort",
      description: "Resort and casino for entertainment and relaxation",
      icon: <Star className="w-6 h-6" />,
      category: "Entertainment"
    }
  ];

  return (
    <section className="py-16" style={{ backgroundColor: '#D4C7A6' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Inside Eastridge Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#4A573B] mb-6 font-garamond">
            Inside Eastridge
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-xl md:text-2xl text-gray-800 font-rotunda">
              Narra Cliffs sits at the <strong>highest point of Eastridge</strong> — a sprawling <strong>500-hectare residential development</strong> that offers an extraordinary array of recreational and lifestyle amenities.
            </p>
            <p className="text-lg md:text-xl text-gray-700 font-rotunda">
              Discover world-class facilities and experiences right at your doorstep.
            </p>
          </div>
        </motion.div>

        {/* Tab Navigation - Pill-shaped buttons */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab("recreational")}
              className={`px-6 py-3 rounded-full font-rotunda transition-all duration-300 flex items-center space-x-2 ${
                activeTab === "recreational"
                  ? 'bg-[#4A573B] text-white'
                  : 'bg-white/50 text-[#4A573B] hover:bg-white/70'
              }`}
            >
              <TreePine className="w-4 h-4" />
              <span>Recreational Paradise</span>
            </button>
            <button
              onClick={() => setActiveTab("dining")}
              className={`px-6 py-3 rounded-full font-rotunda transition-all duration-300 flex items-center space-x-2 ${
                activeTab === "dining"
                  ? 'bg-[#4A573B] text-white'
                  : 'bg-white/50 text-[#4A573B] hover:bg-white/70'
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>Dining & Entertainment</span>
            </button>
          </div>
        </motion.div>

        {/* Tab Content */}
        {activeTab === "recreational" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Recreational Paradise Section */}
            <div className="text-center mb-12">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#4A573B] mb-4 font-garamond">
                Recreational Paradise
              </h3>
              <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-rotunda">
                Immerse yourself in championship-level recreational facilities and outdoor adventures.
              </p>
            </div>

            {/* Golf Course Hero Image */}
            <div className="mb-16 w-full">
              <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg shadow-2xl mx-auto max-w-6xl">
                <ImageWithFallback
                  src={golfCourseImage}
                  alt="Championship Golf Course at Eastridge"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute bottom-8 left-8">
                  <h4 className="text-3xl md:text-4xl font-bold text-white mb-2 font-garamond">
                    Championship Golf Course
                  </h4>
                  <p className="text-lg md:text-xl text-white/90 font-rotunda">
                    Experience world-class golfing in the heart of Rizal
                  </p>
                </div>
              </div>
            </div>

            {/* 4-Card Amenities Grid */}
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {recreationalAmenities.map((amenity, index) => (
                  <motion.div
                    key={amenity.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300 bg-transparent border border-[#4A573B]">
                      <CardHeader className="text-center pb-4">
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-green-100 text-green-700 border-green-200">
                            {amenity.category}
                          </Badge>
                        </div>
                        <div className="mx-auto mb-4 p-3 bg-gray-100 rounded-full w-fit text-gray-600">
                          {amenity.icon}
                        </div>
                        <CardTitle className="text-lg font-rotunda text-gray-800 mb-2">
                          {amenity.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-gray-600 font-rotunda text-center leading-relaxed">
                          {amenity.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Media Partner Cards */}
            <div className="text-center">
              <p className="text-lg text-gray-700 mb-6 font-rotunda">
                Follow our recreational partners for the latest updates.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 flex items-center space-x-3 w-full max-w-xs">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-semibold text-gray-800 font-rotunda text-sm">@bunkerpark</p>
                    <p className="text-xs text-gray-500 font-rotunda">Adventure Playground</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 flex items-center space-x-3 w-full max-w-xs">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-semibold text-gray-800 font-rotunda text-sm">@eastridgegolf.ph</p>
                    <p className="text-xs text-gray-500 font-rotunda">Championship Golf Club</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "dining" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Dining & Entertainment Section */}
            <div className="text-center mb-12">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#4A573B] mb-4 font-garamond">
                Dining & Entertainment
              </h3>
              <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-rotunda">
                Savor exceptional dining experiences and community spaces that bring people together.
              </p>
            </div>

            {/* 3-Card Dining Amenities Grid */}
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {diningAmenities.map((amenity, index) => (
                  <motion.div
                    key={amenity.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300 bg-white border border-gray-200">
                      <CardHeader className="text-center pb-4">
                        <div className="absolute top-3 right-3">
                          <Badge className={`${
                            amenity.category === 'Dining' 
                              ? 'bg-orange-100 text-orange-700 border-orange-200' 
                              : 'bg-pink-100 text-pink-700 border-pink-200'
                          }`}>
                            {amenity.category}
                          </Badge>
                        </div>
                        <div className="mx-auto mb-4 p-3 bg-gray-100 rounded-full w-fit text-gray-600">
                          {amenity.icon}
                        </div>
                        <CardTitle className="text-lg font-rotunda text-gray-800 mb-2">
                          {amenity.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-gray-600 font-rotunda text-center leading-relaxed">
                          {amenity.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// Main Component
export default function AmenitiesPage({ onNavigateToHome, onNavigateToLots }: AmenitiesPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <AmenitiesHero onNavigateToLots={onNavigateToLots} />
      <ClubhouseSection />
      <SunsetParkSection />
      <EastridgeSection onNavigateToLots={onNavigateToLots} />
    </div>
  );
}