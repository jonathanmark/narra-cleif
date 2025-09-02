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

import golfCourseImage from 'figma:asset/1bac27e8d21bb01b9c0e9933eff3fa08d0842ca1.png';
import narraDriveImage from 'figma:asset/3705bd77305e632e033cfff6c352ebd2a51a06e3.png';
import fairwayParkImage from 'figma:asset/3509976485ee87b37ecfa5789adc01277abccee8.png';
import eastParkImage from 'figma:asset/ed00eff96c321be4e281222712a8d89c45d61829.png';
import sunsetParkMobileImage from 'figma:asset/9380a19ac43a9ced624b5380250f1ff51f83e34a.png';

interface AmenitiesPageProps {
  onNavigateToHome: () => void;
  onNavigateToLots: () => void;
}

// Clubhouse Section (MANUAL ONLY)
function ClubhouseSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
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

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const getPreviousIndex = (current: number) => (current - 1 + totalSlides) % totalSlides;
  const getNextIndex = (current: number) => (current + 1) % totalSlides;

  return (
    <section className="pt-8 pb-16 bg-[rgba(255,255,255,1)]" style={{ paddingTop: '132px' }}>
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

          {/* Enhanced Navigation Arrows - Smaller Circles */}
          <motion.button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 carousel-nav-enhanced rounded-full p-1.5 sm:p-2 text-gray-800 transition-all duration-300 z-20 touch-manipulation flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
          
          <motion.button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 carousel-nav-enhanced rounded-full p-1.5 sm:p-2 text-gray-800 transition-all duration-300 z-20 touch-manipulation flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>



        </div>
      </motion.div>
    </section>
  );
}

// Sunset Park Section (MANUAL ONLY - NO AUTO-PLAY) 
function SunsetParkSection() {
  const [mobileSlide, setMobileSlide] = useState(0);
  
  // Parks carousel data
  const mobileParks = [
    {
      title: "FAIRWAY PARK",
      description: "Encourages open air activity with its outdoor fitness equipment, hillside walking trail and greenery.",
      image: fairwayParkImage,
      alt: "Fairway Park with outdoor fitness equipment and trails"
    },
    {
      title: "EAST PARK",
      description: "It's the perfect spot for your furry companions to stay active, happy, and engaged in a friendly outdoor setting.",
      image: eastParkImage,
      alt: "East Park dog exercise area with obstacles"
    },
    {
      title: "SUNSET PARK",
      description: "A cliff edge deck for residents to unwind and end the day appreciating views of the sun as it sets behind the city skyline.",
      image: sunsetParkMobileImage,
      alt: "Sunset Park cliff edge deck with city skyline views"
    },
    {
      title: "NARRA DRIVE",
      description: "A 200 meter stretch for morning jogs or afternoon strolls.",
      image: narraDriveImage,
      alt: "Narra Drive jogging and walking path"
    }
  ];

  const totalMobileSlides = mobileParks.length;

  // Parks navigation functions
  const goToMobileSlide = (index: number) => {
    setMobileSlide(index);
  };

  const goToPreviousMobile = () => {
    setMobileSlide((prev) => (prev - 1 + totalMobileSlides) % totalMobileSlides);
  };

  const goToNextMobile = () => {
    setMobileSlide((prev) => (prev + 1) % totalMobileSlides);
  };

  return (
    <section className="pt-8 pb-16 bg-[#F5F3ED]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#4A573B] mb-6 font-garamond text-[40px]">
            Explore the Parks and Trails
          </h2>
          {/* Mobile description */}
          <p className="block md:hidden text-base text-gray-700 max-w-2xl mx-auto font-rotunda text-center mb-4">
            Discover our beautifully designed parks and recreational spaces, each offering unique amenities for residents to enjoy.
          </p>
          {/* Desktop description */}
          <p className="hidden md:block text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-rotunda text-center">
            Discover our thoughtfully designed parks and trails, each offering unique recreational opportunities. From fitness trails and dog parks to scenic sunset viewing decks and peaceful walking paths.
          </p>
        </motion.div>
      </div>

      {/* Mobile Parks Carousel */}
      <div className="md:hidden mb-8">
        <motion.div
          className="relative w-full overflow-hidden carousel-optimized"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative h-[500px] flex items-center">
            {/* Mobile Park Card */}
            <div className="w-full h-full relative overflow-hidden px-4">
              <motion.div
                key={`park-card-${mobileSlide}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  opacity: { duration: 0.4 }
                }}
                className="w-full h-full max-w-sm mx-auto"
              >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full">
                  {/* Park Image */}
                  <div className="h-4/5 relative">
                    <ImageWithFallback
                      src={mobileParks[mobileSlide].image}
                      alt={mobileParks[mobileSlide].alt}
                      className="w-full h-full object-cover bg-amber-50"
                    />
                  </div>
                  
                  {/* Park Content */}
                  <div className="h-1/5 p-4 flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-[#4A573B] mb-2 font-garamond text-center">
                      {mobileParks[mobileSlide].title}
                    </h3>
                    <p className="text-sm text-gray-700 font-rotunda leading-snug text-center">
                      {mobileParks[mobileSlide].description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Mobile Navigation Arrows */}
            <motion.button
              onClick={goToPreviousMobile}
              className="absolute left-4 top-1/2 -translate-y-1/2 carousel-nav-enhanced rounded-full p-1.5 text-gray-800 transition-all duration-300 z-20 touch-manipulation flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous park"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
            
            <motion.button
              onClick={goToNextMobile}
              className="absolute right-4 top-1/2 -translate-y-1/2 carousel-nav-enhanced rounded-full p-1.5 text-gray-800 transition-all duration-300 z-20 touch-manipulation flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next park"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Desktop Parks Grid */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {mobileParks.map((park, index) => (
            <motion.div
              key={park.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: 0.1 * index,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden h-[500px] lg:h-[550px] xl:h-[600px] cursor-pointer transform transition-all duration-300"
            >
              {/* Park Image */}
              <div className="h-3/4 relative overflow-hidden">
                <ImageWithFallback
                  src={park.image}
                  alt={park.alt}
                  className="w-full h-full object-cover bg-amber-50 transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Park Content */}
              <div className="h-1/4 p-4 lg:p-6 flex flex-col justify-center">
                <h3 className="text-lg lg:text-xl xl:text-2xl font-bold text-[#4A573B] mb-2 lg:mb-3 font-garamond text-center">
                  {park.title}
                </h3>
                <p className="text-sm lg:text-base text-gray-700 font-rotunda leading-snug text-center line-clamp-3">
                  {park.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>


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
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-gray-800 font-rotunda mb-8">
              Just minutes from Eastridge, explore a range of exciting destinations and scenic spots. Venture beyond the village gates for your next great adventure!
            </p>
            
            <motion.button
              onClick={() => onNavigateToLots('places-nearby')}
              className="inline-flex items-center px-8 py-4 bg-[#DA743F] text-white font-rotunda hover:bg-[#c4642f] transition-all duration-300 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MapPin className="w-5 h-5 mr-2" />
              Explore Places Nearby
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Main export
export default function AmenitiesPage({ onNavigateToHome, onNavigateToLots }: AmenitiesPageProps) {
  return (
    <div className="min-h-screen">
      <ClubhouseSection />
      <SunsetParkSection />
      <EastridgeSection onNavigateToLots={onNavigateToLots} />
    </div>
  );
}