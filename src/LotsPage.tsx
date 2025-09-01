import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { ZoomableImage } from './components/ui/zoomable-image';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Textarea } from './components/ui/textarea';
import { Badge } from './components/ui/badge';
import { Card, CardContent } from './components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Home, 
  Trees, 
  Filter, 
  Grid3X3, 
  List, 
  Search, 
  Square, 
  Calendar,
  Share2,
  Heart,
  Download,
  Map,
  Compass,
  Ruler,
  DollarSign,
  Tag,
  Eye,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Building,
  Shield,
  Car,
  Waves,
  Mountain,
  Clock,
  Star,
  Users,
  Camera,
  Play,
  ChevronDown,
  Check,
  X,
  MoreHorizontal,
  Menu,
  ShoppingBag,
  Utensils,
  GraduationCap,
  Hospital,
  Fuel,
  Coffee
} from 'lucide-react';

// Import your existing images
import opportunityImage from 'figma:asset/c0b95d6561670fe18db793b87c3afba0be4be5cd.png';
import practicalityImage from 'figma:asset/ed24b660976e299b433ca5a84e6937d5de69140f.png';
import stabilityImage from 'figma:asset/1398b5807d1c3fc5b337230e3c78f9f7415f1436.png';
import familyImage from 'figma:asset/c82c662c327a9dd6213f9642c531b6942bc1731e.png';
import contactImage from 'figma:asset/2db58a2bf88849c47bf5d595b648bed504a81e76.png';
import logoImage from 'figma:asset/9a7631c2d0aaf2c7b1c7f670d6f8fd142db61b48.png';
import newLogoImage from 'figma:asset/cbe4e5cf4681db7ea38ef222bd056fd8943d49da.png';
import greendotLogo from 'figma:asset/7eca62fa99dc2d515834509f61917afe5602bc0f.png';
import masterPlanImage from 'figma:asset/bece4662c3b4fc87617d652a09845c0030f8829d.png';
import siteDevelopmentPlanImage from 'figma:asset/fce70aabb99b2a0865f5b11e3ffdf27b43951da9.png';
import conceptualMasterPlanImage from 'figma:asset/bece4662c3b4fc87617d652a09845c0030f8829d.png';
import narraCliffsBrandedImage from 'figma:asset/e5db26daac6e46864e2cadf5adf1bff3ff4fe503.png';
import theLifeAboveImage from 'figma:asset/b7e14886dba398454b224ae5c7fa875c3295d18d.png';
import narraLiffsLogoImage from 'figma:asset/00744ae4c32e3043f178a3000916c277133c4e41.png';
import newNarraCliffsBrandLogo from 'figma:asset/2728156b618e86a6b834c4e017a2d587792717a4.png';
import latestNarraCliffsBrandLogo from 'figma:asset/92a2c4b321751d47284c4c8af6c452fd86c91d46.png';
import sitePlanImage from 'figma:asset/75f3f687bacc938acbbd1c5f18975e07a4b34882.png';
import fairwayImage from 'figma:asset/54e02147c32e0d12ba9cf9a165f1c845a328e9b0.png';
import lakeviewImage from 'figma:asset/a591e0305b456d3a0960c3826c8dc4390d278ba5.png';
import cliffsideImage from 'figma:asset/19dd7eab9f3eeaa371dd87309d4fccfa7839cd9e.png';

interface LotsPageProps {
  onNavigateToHome: () => void;
  onNavigateToAmenities: () => void;
}

const LotsPage: React.FC<LotsPageProps> = ({ onNavigateToHome, onNavigateToAmenities }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLot, setSelectedLot] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    phase: '',
    block: '',
    area: '',
    price: '',
    status: '',
    orientation: '',
    viewType: ''
  });

  // Sample lot data - you can replace with your actual data
  const lots = [
    {
      id: '1',
      lotNumber: 'A-001',
      phase: 'Verdant Heights',
      block: 'A',
      area: 350,
      price: 3200000,
      pricePerSqm: 9143,
      status: 'available',
      orientation: 'North-facing',
      viewType: 'Premium View',
      features: ['Corner Lot', 'City View', 'Near Amenities'],
      images: [opportunityImage, practicalityImage],
      corner: true,
      featured: true
    },
    {
      id: '2',
      lotNumber: 'A-002',
      phase: 'Verdant Heights',
      block: 'A',
      area: 300,
      price: 2800000,
      pricePerSqm: 9333,
      status: 'available',
      orientation: 'East-facing',
      viewType: 'Forest View',
      features: ['Mature Trees', 'Quiet Area', 'Level Terrain'],
      images: [practicalityImage, stabilityImage]
    },
    {
      id: '3',
      lotNumber: 'B-001',
      phase: 'Forest Grove',
      block: 'B',
      area: 280,
      price: 2500000,
      pricePerSqm: 8929,
      status: 'reserved',
      orientation: 'South-facing',
      viewType: 'Hill View',
      features: ['Sloping Terrain', 'Natural Drainage', 'Privacy'],
      images: [stabilityImage, familyImage]
    },
    {
      id: '4',
      lotNumber: 'C-001',
      phase: 'River Bend',
      block: 'C',
      area: 450,
      price: 4200000,
      pricePerSqm: 9333,
      status: 'available',
      orientation: 'West-facing',
      viewType: 'Riverside',
      features: ['Large Lot', 'Riverside Access', 'Exclusive Area'],
      images: [familyImage, opportunityImage],
      featured: true
    },
    {
      id: '5',
      lotNumber: 'A-003',
      phase: 'Verdant Heights',
      block: 'A',
      area: 320,
      price: 2950000,
      pricePerSqm: 9219,
      status: 'available',
      orientation: 'North-facing',
      viewType: 'Premium View',
      features: ['Level Terrain', 'Wide Frontage', 'Corner Access'],
      images: [practicalityImage, opportunityImage]
    },
    {
      id: '6',
      lotNumber: 'B-002',
      phase: 'Forest Grove',
      block: 'B',
      area: 260,
      price: 2350000,
      pricePerSqm: 9038,
      status: 'available',
      orientation: 'East-facing',
      viewType: 'Forest View',
      features: ['Intimate Setting', 'Natural Shade', 'Family-friendly'],
      images: [stabilityImage, practicalityImage]
    }
  ];

  // Nearby places data
  const nearbyPlaces = [
    { name: 'All Home', category: 'Home Store', distance: '5.2 km', icon: Home, color: 'text-orange-600' },
    { name: 'SM Center Angono', category: 'Shopping Mall', distance: '7.8 km', icon: ShoppingBag, color: 'text-blue-600' },
    { name: 'Marketplace', category: 'Shopping Center', distance: '4.1 km', icon: ShoppingBag, color: 'text-green-600' },
    { name: 'Shopwise', category: 'Supermarket', distance: '6.3 km', icon: ShoppingBag, color: 'text-blue-500' },
    { name: 'Antipolo Church', category: 'Religious Site', distance: '12.5 km', icon: Building, color: 'text-purple-600' },
    { name: 'Manila East Medical Center', category: 'Hospital', distance: '8.7 km', icon: Hospital, color: 'text-red-600' },
    { name: 'Unciano Medical Center', category: 'Medical Center', distance: '6.9 km', icon: Hospital, color: 'text-red-500' },
    { name: 'PAREF Rosehill School', category: 'Private School', distance: '5.4 km', icon: GraduationCap, color: 'text-indigo-600' },
    { name: 'Assumption Antipolo', category: 'Educational Institution', distance: '11.2 km', icon: GraduationCap, color: 'text-purple-500' },
    { name: 'La Salle College Antipolo', category: 'College', distance: '10.8 km', icon: GraduationCap, color: 'text-green-700' },
    { name: 'San Beda University', category: 'University', distance: '13.1 km', icon: GraduationCap, color: 'text-orange-500' }
  ];

  const phases = [
    {
      id: 0,
      name: 'Cliffside',
      image: cliffsideImage,
      icon: Mountain,
      bgColor: 'bg-[#453311]',
      textColor: 'text-white',
      description: 'Perched on elevated terrain with views of the Sierra Madre mountain range and greenery below.',
      alt: 'Cliffside Development Aerial View'
    },
    {
      id: 1,
      name: 'Fairway',
      image: fairwayImage,
      icon: Trees,
      bgColor: 'bg-[#4A573B]',
      textColor: 'text-white',
      description: 'Backyards overlooking Eastridge Golf course\'s manicured fairways with a few prime lots adjacent to hole #10.',
      alt: 'Fairway Golf Course Aerial View'
    },
    {
      id: 2,
      name: 'Lakeview',
      image: lakeviewImage,
      icon: Waves,
      bgColor: 'bg-[#E5F0FA]',
      textColor: 'text-gray-800',
      description: 'Overlooking the tranquil waters of Laguna Lake and the Metro Manila skyline beyond.',
      alt: 'Lakeview Development Aerial View',
      
      subtitle: 'Lakeview',
      
    }
  ];

  const filteredLots = lots.filter(lot => {
    return (
      (filters.search === '' || 
       lot.lotNumber.toLowerCase().includes(filters.search.toLowerCase()) ||
       lot.phase.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.phase === '' || lot.phase === filters.phase) &&
      (filters.block === '' || lot.block === filters.block) &&
      (filters.status === '' || lot.status === filters.status) &&
      (filters.orientation === '' || lot.orientation === filters.orientation) &&
      (filters.viewType === '' || lot.viewType === filters.viewType)
    );
  });

  const availableLots = lots.filter(lot => lot.status === 'available');
  const reservedLots = lots.filter(lot => lot.status === 'reserved');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      phase: '',
      block: '',
      area: '',
      price: '',
      status: '',
      orientation: '',
      viewType: ''
    });
  };

  // Auto-play carousel functionality (matching HomePage style)
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % phases.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, phases.length]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % phases.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + phases.length) % phases.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main content - no separate header as it's handled by App.jsx */}
      <div>
        {/* Hero Section */}
        <section className="relative h-[50vh] overflow-hidden" style={{backgroundColor: '#453311'}}>
        <div className="relative z-10 h-full w-full">
          {/* Hero Image */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full relative"
          >
            <ImageWithFallback
              src={opportunityImage}
              alt="Narra Cliffs Golf Course Views"
              className="w-full h-full object-cover opacity-95"
            />

            {/* White Overlay */}
            <div 
              className="absolute inset-0 w-full h-full"
              style={{ backgroundColor: 'white', opacity: 0.5 }}
            ></div>

            {/* Quote Text Overlay */}
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="max-w-4xl mx-auto px-4 md:px-6 font-bold mx-[300px] my-[0px]" style={{ marginTop: '30px' }}>
                <motion.p 
                  className="font-garamond text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-center text-[#4A573B] leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  A place to call yours is more than just a feat — it's peace of mind.
                </motion.p>
              </div>
            </div>

            {/* Hero Text Content */}
            <div className="relative z-10 min-h-[50vh] lg:min-h-[60vh] flex items-center justify-center">
              <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
                <div className="text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-4 md:space-y-6 lg:space-y-8"
                  >
                    <h1 className="font-garamond text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl 4xl:text-[10rem] font-bold text-[#4A573B]">
                      Discover Your
                    </h1>
                    
                    <div className="flex items-center justify-center">
                      <div className="flex-1 h-px bg-[#4A573B]/40 max-w-[80px] md:max-w-[120px]"></div>
                      <p className="font-garamond text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl mx-4 md:mx-6 lg:mx-8 text-[#4A573B] italic">
                        Perfect Lot
                      </p>
                      <div className="flex-1 h-px bg-[#4A573B]/40 max-w-[80px] md:max-w-[120px]"></div>
                    </div>
                    
                    <p className="font-rotunda text-lg md:text-xl lg:text-2xl xl:text-3xl max-w-4xl mx-auto leading-relaxed text-[#4A573B]/90">
                      Choose from exclusive land parcels with breathtaking cliffside, fairway, and lake views. 
                      Each lot offers the perfect foundation for your elevated lifestyle at Narra Cliffs.
                    </p>

                    <div className="pt-4 md:pt-6 lg:pt-8">
                      <p className="font-rotunda text-base md:text-lg lg:text-xl text-[#4A573B]/80 mb-4">
                        <span className="font-bold text-[#DA743F]">Limited availability</span> • Premium locations • Ready for development
                      </p>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                      >
                        <button className="bg-gradient-to-r from-[#DA743F] to-[#E8824F] text-white px-6 md:px-8 lg:px-10 py-3 md:py-4 lg:py-5 rounded-xl shadow-lg hover:shadow-xl text-base md:text-lg lg:text-xl font-bold tracking-wide transition-all duration-300 hover:scale-105 group">
                          <div className="flex items-center space-x-2 md:space-x-3">
                            <MapPin className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
                            <span>View Available Lots</span>
                          </div>
                        </button>
                        
                        <button className="border-2 border-[#4A573B] text-[#4A573B] bg-transparent hover:bg-[#4A573B] hover:text-white px-6 md:px-8 lg:px-10 py-3 md:py-4 lg:py-5 rounded-xl text-base md:text-lg lg:text-xl font-bold tracking-wide transition-all duration-300 group">
                          <div className="flex items-center space-x-2 md:space-x-3">
                            <Calendar className="w-5 h-5 md:w-6 md:h-6" />
                            <span>Schedule Site Visit</span>
                          </div>
                        </button>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
            

          </motion.div>
        </div>
      </section>

      {/* Development Phases Section - HOME PAGE CAROUSEL STYLE */}
      <div className="py-12 md:py-16 lg:py-20 overflow-hidden w-full relative">
        {/* Content Overlay */}
        <div className="relative z-10" style={{backgroundColor: '#CEC6AD'}}>
          {/* Header Section */}
          <div className="max-w-7xl mx-auto px-4 md:px-6 pt-8 pb-12 md:pb-16">
            <motion.div 
              className="text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.h2 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#4A573B] font-garamond mb-3 md:mb-4 font-garamond"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Choose your perfect vantage point:
              </motion.h2>
              <motion.p 
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#4A573B] max-w-4xl mx-auto font-rotunda leading-relaxed text-justify"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                the dramatic Cliffside, the serene Fairway, or the tranquil Lakeview—each phase offering unique vistas and premier selections.
              </motion.p>
            </motion.div>
          </div>

          {/* Mobile List View */}
          <div className="block md:hidden px-4 pb-8">
            <motion.div 
              className="space-y-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {phases.map((phase, index) => (
                <motion.div 
                  key={phase.id} 
                  className="grid grid-cols-1 min-h-[400px] gap-6"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <motion.div className="relative h-full">
                    <ImageWithFallback
                      src={phase.image}
                      alt={phase.alt}
                      className="w-full h-full min-h-[300px] object-cover rounded-lg shadow-xl"
                    />
                    <div className="absolute inset-0 bg-black opacity-30 rounded-lg" />
                  </motion.div>

                  <motion.div className={`flex items-center justify-center py-8 px-6 rounded-lg ${phase.bgColor}`}>
                    <div className="space-y-6 max-w-lg">
                      {/* Phase Icon */}
                      <motion.div 
                        className="flex justify-center mb-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        <phase.icon className={`w-10 h-10 md:w-12 md:h-12 ${phase.textColor}`} />
                      </motion.div>
                      
                      <div className={`font-rotunda tracking-wider mb-6 uppercase ${phase.textColor}`}
                        style={{ 
                          marginTop: '30px',
                          fontSize: 'clamp(1.16rem, 1.7vw, 2.04rem)'
                        }}
                      >
                        {phase.name}
                      </div>
                      <h3 className={`font-garamond text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 ${phase.textColor}`}>
                        {phase.customTitle || phase.name}
                      </h3>
                      <p className={`font-rotunda text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-justify ${phase.textColor === 'text-white' ? 'text-gray-200' : 'text-gray-700'}`}>
                        {phase.description}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Desktop Carousel View - HOME PAGE STYLE */}
          <div className="hidden md:block w-full relative pb-8">
            <div className="relative w-full h-[600px] lg:h-[700px] overflow-hidden">
              <div className="relative w-full h-full">
                {phases.map((phase, index) => (
                  <motion.div
                    key={phase.id}
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
                          src={phase.image}
                          alt={phase.alt}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black opacity-30" />
                      </motion.div>

                      <motion.div 
                        className={`flex items-center justify-center px-8 lg:px-12 xl:px-16 py-8 ${phase.bgColor}`}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      >
                        <div className="space-y-8 max-w-2xl">
                          <motion.div>
                            {/* Phase Icon */}
                            <motion.div 
                              className="flex justify-start mb-6"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.6, delay: 0.4 }}
                            >
                              <phase.icon className={`w-12 h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 ${phase.textColor}`} />
                            </motion.div>
                            
                            <motion.div 
                              className={`font-rotunda tracking-wider mb-6 uppercase ${phase.textColor}`}
                              style={{ 
                                marginTop: '30px',
                                fontSize: 'clamp(1.36rem, 2.04vw, 2.72rem)'
                              }}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.5 }}
                            >
                              {phase.name}
                            </motion.div>
                            <motion.h3 
                              className={`font-garamond text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-8 ${phase.textColor}`}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.6 }}
                            >
                              {phase.customTitle || phase.name}
                            </motion.h3>
                          </motion.div>
                          
                          <motion.p 
                            className={`font-rotunda text-lg lg:text-xl xl:text-2xl 2xl:text-3xl leading-relaxed text-justify ${phase.textColor === 'text-white' ? 'text-gray-200' : 'text-gray-700'}`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                          >
                            {phase.description}
                          </motion.p>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Navigation - HOME PAGE STYLE */}
              <button
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentSlide((prev) => (prev - 1 + phases.length) % phases.length);
                  setTimeout(() => setIsAutoPlaying(true), 10000);
                }}
                className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 p-3 lg:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <ChevronLeft className="w-6 h-6 lg:w-8 lg:h-8 group-hover:scale-110 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentSlide((prev) => (prev + 1) % phases.length);
                  setTimeout(() => setIsAutoPlaying(true), 10000);
                }}
                className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 p-3 lg:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <ChevronRight className="w-6 h-6 lg:w-8 lg:h-8 group-hover:scale-110 transition-transform" />
              </button>

              {/* Indicators - HOME PAGE STYLE */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
                {phases.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentSlide(index);
                      setTimeout(() => setIsAutoPlaying(true), 10000);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-white shadow-lg scale-125' 
                        : 'bg-white/50 hover:bg-white/75 hover:scale-110'
                    }`}
                  />
                ))}
              </div>

              {/* Progress Bar - HOME PAGE STYLE */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-black/10">
                <motion.div
                  className="h-full bg-[#4A573B]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((currentSlide + 1) / phases.length) * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Site Development Plan Section */}
      <div className="py-8 md:py-12 lg:py-16" style={{backgroundColor: '#CEC6AD'}}>
        {/* Section Header - Constrained */}
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div 
            className="text-center mb-8 md:mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-6 font-plantin">
              From your chosen vantage point, envision the bigger picture
            </h2>
            <p className="text-gray-700 text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto">
              Explore our comprehensive development plans showcasing the thoughtful design and strategic layout of Narra Cliffs.
            </p>
          </motion.div>
        </div>

        {/* Interactive Plans Tabs - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full"
        >
          <Tabs defaultValue="conceptual" className="w-full">
            {/* Tab Buttons - Centered */}
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <TabsList className="grid w-full grid-cols-2 mb-8 md:mb-12 max-w-md mx-auto bg-white/50 backdrop-blur-sm">
                <TabsTrigger 
                  value="conceptual" 
                  className="data-[state=active]:bg-white data-[state=active]:text-gray-800 data-[state=active]:shadow-md font-plantin font-medium"
                >
                  <Map className="w-4 h-4 mr-2" />
                  Conceptual Master Plan
                </TabsTrigger>
                <TabsTrigger 
                  value="site" 
                  className="data-[state=active]:bg-white data-[state=active]:text-gray-800 data-[state=active]:shadow-md font-plantin font-medium"
                >
                  <Compass className="w-4 h-4 mr-2" />
                  Site Plan
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Conceptual Master Plan Content - Full Width */}
            <TabsContent value="conceptual" className="mt-0">
              <motion.div 
                className="w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Text Content - Centered */}
                <div className="max-w-7xl mx-auto px-4 md:px-6 mb-6 md:mb-8">
                  <div className="text-center">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-3 font-plantin">
                      Conceptual Master Plan
                    </h3>

                  </div>
                </div>
                {/* Image - Full Width */}
                <div className="w-full bg-white py-4 md:py-6 shadow-2xl relative">
                  <ZoomableImage
                    src={conceptualMasterPlanImage}
                    alt="Narra Cliffs Conceptual Master Plan"
                    className="w-full h-auto object-contain"
                    zoomLevel={3}
                    zoomSize={900}
                  />
                  {/* Mobile Touch Instructions */}
                  <div className="absolute bottom-6 right-6 md:hidden bg-[#4A573B]/90 text-white text-sm px-3 py-2 rounded-lg backdrop-blur-sm flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="font-rotunda">Use two fingers to zoom</span>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            {/* Site Plan Content - Full Width */}
            <TabsContent value="site" className="mt-0">
              <motion.div 
                className="w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Text Content - Centered */}
                <div className="max-w-7xl mx-auto px-4 md:px-6 mb-6 md:mb-8">
                  <div className="text-center">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-3 font-plantin">
                      Site Plan
                    </h3>

                  </div>
                </div>
                {/* Image - Full Width */}
                <div className="w-full bg-white py-4 md:py-6 shadow-2xl relative">
                  <ZoomableImage
                    src={sitePlanImage}
                    alt="Narra Cliffs Site Plan"
                    className="w-full h-auto object-contain"
                    zoomLevel={3}
                    zoomSize={900}
                  />
                  {/* Mobile Touch Instructions */}
                  <div className="absolute bottom-6 right-6 md:hidden bg-[#4A573B]/90 text-white text-sm px-3 py-2 rounded-lg backdrop-blur-sm flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="font-rotunda">Use two fingers to zoom</span>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* Property Information Section */}
      <div className="py-8 md:py-12 lg:py-16" style={{backgroundColor: '#DA743F'}}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Property Size */}
            <motion.div 
              className="flex flex-col items-center space-y-3 md:space-y-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="bg-white/20 rounded-full p-3 md:p-4 mb-1 md:mb-2">
                <Square className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-base md:text-lg font-medium text-white/90 mb-1 md:mb-2">Property Size</h3>
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">308 - 650</div>
              <p className="text-sm md:text-base lg:text-lg text-white/80">Square Meters</p>
            </motion.div>

            {/* Price Range */}
            <motion.div 
              className="flex flex-col items-center space-y-3 md:space-y-4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="bg-white/20 rounded-full p-3 md:p-4 mb-1 md:mb-2">
                <Tag className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-base md:text-lg font-medium text-white/90 mb-1 md:mb-2">Price Range</h3>
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">₱9M - ₱13M</div>
              <p className="text-sm md:text-base lg:text-lg text-white/80">Philippine Peso</p>
            </motion.div>
          </motion.div>

          {/* Additional Information */}
          <motion.div 
            className="text-center mt-8 md:mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <p className="text-white/70 text-xs md:text-sm">
              *Prices are exclusive of VAT and subject to change without prior notice
            </p>
          </motion.div>
        </div>
      </div>

      {/* Places Nearby Section */}
      <div className="w-full pt-0 pb-8 md:pb-12 lg:pb-16">
        <motion.div 
          className="mb-8 md:mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] md:min-h-[600px] lg:min-h-[700px]">
    
            {/* Left Side - Places Nearby */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="flex flex-col justify-center h-full p-6 md:p-8 lg:p-12"
              style={{ backgroundColor: '#CEC6AD' }}
            >
              <div className="max-w-lg mx-auto w-full">
                <motion.div 
                  className="text-center mb-6 md:mb-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 md:mb-4 font-plantin">
                    Places Nearby
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base lg:text-lg">
                    Discover the convenience of living at Narra Cliffs with easy access to essential establishments and recreational facilities.
                  </p>
                </motion.div>

                <div className="space-y-3 md:space-y-4">
                  {nearbyPlaces.map((place, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      className="flex items-center justify-between p-3 md:p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:bg-white/90"
                    >
                      <div className="flex items-center space-x-3 md:space-x-4">
                        <div className={`p-2 rounded-full bg-gray-100 ${place.color}`}>
                          <place.icon className="w-4 h-4 md:w-5 md:h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 text-sm md:text-base">{place.name}</h4>
                          <p className="text-gray-600 text-xs md:text-sm">{place.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-700 font-medium text-xs md:text-sm">{place.distance}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Side - Google Maps */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="relative h-full min-h-[500px] md:min-h-[600px] lg:min-h-[700px] overflow-hidden"
            >
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.237!2d121.18629126429096!3d14.526725717060508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f15.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDMxJzM2LjIiTiAxMjHCsDExJzEwLjYiRQ!5e1!3m2!1sen!2sph!4v1703123456789!5m2!1sen!2sph"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Narra Cliffs Location Map"
                />
              </div>
              
              {/* Map Overlay */}
              <div className="absolute bg-white bg-opacity-95 p-4 rounded-lg shadow-lg" style={{ top: '2px', left: '2px' }}>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-6 h-6 text-orange-600" />
                  <span className="text-base font-medium text-gray-800">Narra Cliffs</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
    </div>
  );
};

export default LotsPage;