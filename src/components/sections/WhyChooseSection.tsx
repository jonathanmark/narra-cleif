import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Award, Home, Shield, ChevronLeft, ChevronRight, MapPin, Building, TreePine, Activity, Users, Coffee, Bike, Star, Phone } from 'lucide-react';
import opportunityImage from 'figma:asset/c0b95d6561670fe18db793b87c3afba0be4be5cd.png';
import practicalityImage from 'figma:asset/1398b5807d1c3fc5b337230e3c78f9f7415f1436.png';
import stabilityImage from 'figma:asset/d15f5e0f71f04d7fc2c655d3efc36c8e55a8f718.png';
import narraCliffsFacilityImage from 'figma:asset/7e2b84dd52b078042a9ccdb2a7f17cf7fa6c6900.png';


interface WhyChooseSectionProps {
  onNavigateToAmenities?: () => void;
  onNavigateToLots?: () => void;
}

export function WhyChooseSection({ onNavigateToAmenities, onNavigateToLots }: WhyChooseSectionProps = {}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Helper function to italicize specific words
  const renderHeaderWithItalics = (headline: string, subline: string) => {
    const fullText = `${headline} ${subline}`;
    const wordsToItalicize = ['space', 'growth', 'secret'];
    
    // Split text into words while preserving spaces
    const parts = fullText.split(/(\\s+)/);
    
    return parts.map((part, index) => {
      const cleanWord = part.toLowerCase().replace(/[.,!?;:]/g, '');
      if (wordsToItalicize.includes(cleanWord)) {
        return <em key={index}>{part}</em>;
      }
      return part;
    });
  };

  const reasons = [
    {
      icon: Award,
      title: "OPPORTUNITY",
      headline: "Narra Cliffs:",
      subline: "Rizal's best kept secret.",
      description: "Experience the prestige, natural tranquility and stunning panoramas that distinguish this private village enclave situated atop the highest point in Eastridge. Due to limited lot availability, few will ever drive beyond the guarded gates and into homes surrounded by scenic views of the city, Laguna lake and Eastridge Golf Club's rolling fairway greens.",
      image: opportunityImage
    },
    {
      icon: Home,
      title: "PRACTICALITY", 
      headline: "A space for",
      subline: "living",
      description: "A place to live is more than just four walls and a roof — it's a space that allows you to move, work, and function. The Narra Cliffs is built to meet your day-to-day needs. With our intentional design and easy access to the city, we're ready to support your lifestyle and give value to your home, setting a new standard to suburban living.",
      image: practicalityImage
    },
    {
      icon: Shield,
      title: "STABILITY",
      headline: "Strong roots allow",
      subline: "steady growth.",
      description: "A home to call your own. Peace of mind. Security. Modern conveniences alongside the soothing, restorative elements of nature makes Narra Cliffs an ideal community for your forever home. Here you will have the space to thrive and the freedom to pursue the life you desire.",
      image: stabilityImage
    }
  ];

  // Auto-play carousel functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reasons.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, reasons.length]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % reasons.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + reasons.length) % reasons.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleDiscoverLots = () => {
    if (onNavigateToLots) {
      onNavigateToLots();
    }
  };

  const handleContactUs = () => {
    // Scroll to contact section on current page
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section id="why-choose" className="py-12 md:py-16 lg:py-20 overflow-hidden w-full relative">

      {/* Content Overlay */}
      <div className="relative z-10">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-12 md:mb-16">
        <motion.div 
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#4A573B] mb-3 md:mb-4 font-garamond"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Live Elevated at Narra Cliffs
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#4A573B] max-w-4xl mx-auto font-[Abhaya_Libre] leading-relaxed text-justify"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            With thoughtful design, functional spaces, and a supportive community, you can work, play, and grow alongside what matters most. Here, independence is a reality, holistic living is possible, and life truly rises above.
          </motion.p>
        </motion.div>
      </div>

      {/* Mobile List View */}
      <div className="block md:hidden px-4">
        <motion.div 
          className="space-y-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {reasons.map((reason, index) => (
            <motion.div 
              key={index} 
              className="grid grid-cols-1 min-h-[400px] gap-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <motion.div className="relative h-full">
                <ImageWithFallback
                  src={reason.image}
                  alt={reason.title}
                  className="w-full h-full min-h-[300px] object-cover rounded-lg shadow-xl"
                />
              </motion.div>

              <motion.div className={`flex items-center justify-center py-8 px-6 rounded-lg ${
                reason.title === 'STABILITY' ? 'bg-[#4A573B]' : 
                reason.title === 'OPPORTUNITY' ? 'bg-[#DA743F]' : 
                reason.title === 'PRACTICALITY' ? 'bg-[#4A573B]' : ''
              }`}>
                <div className="space-y-6 max-w-lg">
                  <div 
                    className="font-rotunda tracking-wider mb-6 uppercase text-white"
                    style={{ 
                      marginTop: '30px',
                      fontSize: 'clamp(1.16rem, 1.7vw, 2.04rem)' // 15% smaller than mobile responsive sizes
                    }}
                  >
                    {reason.title}
                  </div>
                  <h3 className="font-garamond text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-white">
                    {renderHeaderWithItalics(reason.headline, reason.subline)}
                  </h3>
                  <p className="font-rotunda text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-justify text-white">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Desktop Carousel View */}
      <div className="hidden md:block w-full relative">
        <div className="relative w-full h-[600px] lg:h-[700px] overflow-hidden">
          <div className="relative w-full h-full">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0, x: index === 0 ? 0 : 100 }}
                animate={{
                  opacity: index === currentSlide ? 1 : 0,
                  x: index === currentSlide ? 0 : index < currentSlide ? -100 : 100
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                  <motion.div 
                    className="relative h-full overflow-hidden"
                    whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                  >
                    <ImageWithFallback
                      src={reason.image}
                      alt={reason.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  <motion.div 
                    className={`flex items-center justify-center px-8 lg:px-12 xl:px-16 py-8 ${
                      reason.title === 'STABILITY' ? 'bg-[#4A573B]' : 
                      reason.title === 'OPPORTUNITY' ? 'bg-[#DA743F]' : 
                      reason.title === 'PRACTICALITY' ? 'bg-[#4A573B]' : ''
                    }`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <div className="space-y-8 max-w-2xl">
                      <motion.div>
                        <motion.div 
                          className="font-rotunda tracking-wider mb-6 uppercase text-white"
                          style={{ 
                            marginTop: '30px',
                            fontSize: 'clamp(1.36rem, 2.04vw, 2.72rem)' // 15% smaller than text-xl to xl:text-4xl
                          }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.5 }}
                        >
                          {reason.title}
                        </motion.div>
                        <motion.h3 
                          className="font-garamond text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-8 text-white"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.6 }}
                        >
                          {renderHeaderWithItalics(reason.headline, reason.subline)}
                        </motion.h3>
                      </motion.div>
                      
                      <motion.p 
                        className="font-rotunda text-lg lg:text-xl xl:text-2xl 2xl:text-3xl leading-relaxed text-justify text-gray-200"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                      >
                        {reason.description}
                      </motion.p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 p-3 lg:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <ChevronLeft className="w-6 h-6 lg:w-8 lg:h-8 group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 p-3 lg:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <ChevronRight className="w-6 h-6 lg:w-8 lg:h-8 group-hover:scale-110 transition-transform" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
            {reasons.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white shadow-lg scale-125' 
                    : 'bg-white/50 hover:bg-white/75 hover:scale-110'
                }`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-black/10">
            <motion.div
              className="h-full bg-green-600"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentSlide + 1) / reasons.length) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>



      {/* Enhanced CTA Button */}
      <div className="w-full mt-8 md:mt-12 lg:mt-16">
        <div className="relative py-8 md:py-10 lg:py-12">


          <div className="text-center max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <div className="relative block lg:inline-block w-full lg:w-auto">
              <button
                className="bg-gradient-to-r from-[#DA743F] to-[#E8824F] text-white px-8 md:px-12 lg:px-16 py-4 md:py-5 lg:py-6 rounded-xl shadow-2xl text-lg md:text-xl lg:text-2xl font-bold tracking-wide transition-transform duration-200 hover:scale-105 w-full lg:w-auto"
                onClick={handleDiscoverLots}
              >
                <div className="flex items-center justify-center space-x-3 md:space-x-4 lg:space-x-5">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 drop-shadow-lg" />
                  <span className="font-bold tracking-wide drop-shadow-lg">
                    Discover Available Lots
                  </span>
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 drop-shadow-lg" />
                </div>
              </button>
            </div>
            
            {/* Contact Us Button - Mobile Only */}
            <div className="relative block mt-4 lg:hidden w-full">
              <button
                className="bg-gradient-to-r from-[#DA743F] to-[#E8824F] text-white px-8 md:px-12 lg:px-16 py-4 md:py-5 lg:py-6 rounded-xl shadow-2xl text-lg md:text-xl lg:text-2xl font-bold tracking-wide transition-transform duration-200 hover:scale-105 w-full"
                onClick={handleContactUs}
              >
                <div className="flex items-center justify-center space-x-3 md:space-x-4 lg:space-x-5">
                  <Phone className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 drop-shadow-lg" />
                  <span className="font-bold tracking-wide drop-shadow-lg">
                    Contact Us
                  </span>
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 drop-shadow-lg" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}