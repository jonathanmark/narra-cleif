import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Award, Home, Shield, ChevronLeft, ChevronRight, MapPin, Building, TreePine, Activity, Users, Coffee, Bike, Star } from 'lucide-react';
import opportunityImage from 'figma:asset/c0b95d6561670fe18db793b87c3afba0be4be5cd.png';
import practicalityImage from 'figma:asset/1398b5807d1c3fc5b337230e3c78f9f7415f1436.png';
import stabilityImage from 'figma:asset/41ec5f1cdb1be73154667c70700ca34deeb2b534.png';
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
    const parts = fullText.split(/(\s+)/);
    
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
                    className={`font-rotunda tracking-wider mb-6 uppercase ${
                      reason.title === 'STABILITY' || reason.title === 'OPPORTUNITY' || reason.title === 'PRACTICALITY' ? 'text-white' : 'text-[#4A573B]'
                    }`}
                    style={{ 
                      marginTop: '30px',
                      fontSize: 'clamp(1.16rem, 1.7vw, 2.04rem)' // 15% smaller than mobile responsive sizes
                    }}
                  >
                    {reason.title}
                  </div>
                  <h3 className={`font-garamond text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 ${
                    reason.title === 'STABILITY' || reason.title === 'OPPORTUNITY' || reason.title === 'PRACTICALITY' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {renderHeaderWithItalics(reason.headline, reason.subline)}
                  </h3>
                  <p className={`font-rotunda text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-justify ${
                    reason.title === 'STABILITY' || reason.title === 'OPPORTUNITY' || reason.title === 'PRACTICALITY' ? 'text-gray-200' : 'text-gray-700'
                  }`}>
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

      {/* New Editing Space */}
      <div className="w-full mt-12 md:mt-16 lg:mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            className="text-center py-8 md:py-12 lg:py-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Editable Content Area */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 lg:p-16 xl:p-20 max-w-7xl mx-auto">
              {/* Amenities Sneak Peek */}
              <h3 className="font-garamond text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#4A573B] mb-6 md:mb-8 lg:mb-10 text-center">
                World-Class Amenities
              </h3>
              <p className="font-rotunda text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-700 leading-relaxed mb-8 md:mb-10 lg:mb-12 text-center max-w-4xl mx-auto">
                Experience premium facilities and recreational spaces designed to enhance your everyday living at Narra Cliffs.
              </p>
              
              {/* Amenities Showcase Image */}
              <motion.div 
                className="mb-12 md:mb-14 lg:mb-16 xl:mb-20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl group">
                  <ImageWithFallback
                    src={narraCliffsFacilityImage}
                    alt="Narra Cliffs modern clubhouse architectural rendering featuring contemporary design, covered walkways, and premium amenities"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Image Overlay with Text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-6 md:p-8 lg:p-10">
                    <div className="text-center text-white">
                      <h4 className="font-garamond text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 md:mb-3">
                        Premium Lifestyle Awaits
                      </h4>
                      <p className="font-rotunda text-sm md:text-base lg:text-lg xl:text-xl opacity-90">
                        Modern clubhouse • Infinity pool • Scenic views
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Featured Amenities Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12 xl:gap-16 mb-12 md:mb-14 lg:mb-16">
                {/* Clubhouse */}
                <motion.div 
                  className="text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="bg-[#4A573B] rounded-full w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 mx-auto mb-6 md:mb-8 flex items-center justify-center group-hover:bg-[#DA743F] transition-colors duration-300 shadow-lg group-hover:shadow-xl">
                    <Building className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 text-white" />
                  </div>
                  <h4 className="font-garamond text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#4A573B] mb-3 md:mb-4">
                    Modern Clubhouse
                  </h4>
                  <p className="font-rotunda text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 leading-relaxed">
                    Contemporary clubhouse with stylish lounge, infinity lap pool, and manicured lawns
                  </p>
                </motion.div>

                {/* Sunset Park */}
                <motion.div 
                  className="text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="bg-[#4A573B] rounded-full w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 mx-auto mb-6 md:mb-8 flex items-center justify-center group-hover:bg-[#DA743F] transition-colors duration-300 shadow-lg group-hover:shadow-xl">
                    <TreePine className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 text-white" />
                  </div>
                  <h4 className="font-garamond text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#4A573B] mb-3 md:mb-4">
                    Sunset Park
                  </h4>
                  <p className="font-rotunda text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 leading-relaxed">
                    Elevated sanctuary with breathtaking views and modern pavilion architecture
                  </p>
                </motion.div>

                {/* Eastridge Amenities */}
                <motion.div 
                  className="text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="bg-[#4A573B] rounded-full w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 mx-auto mb-6 md:mb-8 flex items-center justify-center group-hover:bg-[#DA743F] transition-colors duration-300 shadow-lg group-hover:shadow-xl">
                    <Award className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 text-white" />
                  </div>
                  <h4 className="font-garamond text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#4A573B] mb-3 md:mb-4">
                    Eastridge Golf Club
                  </h4>
                  <p className="font-rotunda text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 leading-relaxed">
                    Championship golf course, driving range, dining, and recreational facilities
                  </p>
                </motion.div>
              </div>

              {/* Additional Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-10 mb-12 md:mb-14 lg:mb-16">
                <motion.div 
                  className="flex items-center space-x-4 p-4 md:p-5 lg:p-6 bg-white/60 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Activity className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-[#4A573B] flex-shrink-0" />
                  <span className="font-rotunda text-sm md:text-base lg:text-lg xl:text-xl text-gray-700 font-medium">Fitness Center</span>
                </motion.div>

                <motion.div 
                  className="flex items-center space-x-4 p-4 md:p-5 lg:p-6 bg-white/60 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Users className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-[#4A573B] flex-shrink-0" />
                  <span className="font-rotunda text-sm md:text-base lg:text-lg xl:text-xl text-gray-700 font-medium">Family Areas</span>
                </motion.div>

                <motion.div 
                  className="flex items-center space-x-4 p-4 md:p-5 lg:p-6 bg-white/60 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Coffee className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-[#4A573B] flex-shrink-0" />
                  <span className="font-rotunda text-sm md:text-base lg:text-lg xl:text-xl text-gray-700 font-medium">Dining Options</span>
                </motion.div>

                <motion.div 
                  className="flex items-center space-x-4 p-4 md:p-5 lg:p-6 bg-white/60 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <Bike className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-[#4A573B] flex-shrink-0" />
                  <span className="font-rotunda text-sm md:text-base lg:text-lg xl:text-xl text-gray-700 font-medium">Bike Trails</span>
                </motion.div>
              </div>
              
              {/* Call to Action */}
              <div className="text-center">
                <motion.button
                  onClick={() => {
                    if (onNavigateToAmenities) {
                      onNavigateToAmenities();
                    }
                  }}
                  className="border-2 border-[#4A573B]/40 text-[#4A573B] bg-transparent hover:bg-[#4A573B]/5 px-4 md:px-6 py-2 md:py-3 rounded-lg hover:border-[#4A573B]/60 text-sm md:text-base font-medium tracking-wide transition-all duration-300 hover:scale-[1.02] group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-6 transition-transform duration-300 opacity-70" />
                    <span>Explore All Amenities</span>
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced CTA Button */}
      <div className="w-full mt-8 md:mt-12 lg:mt-16">
        <div className="relative py-8 md:py-10 lg:py-12">


          <div className="text-center max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <div className="relative inline-block">
              <button
                className="bg-gradient-to-r from-[#DA743F] to-[#E8824F] text-white px-8 md:px-12 lg:px-16 py-4 md:py-5 lg:py-6 rounded-xl shadow-2xl text-lg md:text-xl lg:text-2xl font-bold tracking-wide transition-transform duration-200 hover:scale-105"
                onClick={handleDiscoverLots}
              >
                <div className="flex items-center space-x-3 md:space-x-4 lg:space-x-5">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 drop-shadow-lg" />
                  <span className="font-bold tracking-wide drop-shadow-lg">
                    Discover Available Lots
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