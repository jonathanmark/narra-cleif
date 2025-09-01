import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Home, 
  Trees, 
  Award, 
  ChevronLeft, 
  ChevronRight, 
  Square, 
  Download, 
  Map,
  Shield,
  Car,
  Waves,
  Mountain,
  Building,
  Clock,
  Star,
  Users,
  Compass,
  Camera,
  Play,
  ChevronDown,
  Check,
  ArrowRight
} from 'lucide-react';

// Import your existing images
import opportunityImage from 'figma:asset/c0b95d6561670fe18db793b87c3afba0be4be5cd.png';
import practicalityImage from 'figma:asset/ed24b660976e299b433ca5a84e6937d5de69140f.png';
import stabilityImage from 'figma:asset/1398b5807d1c3fc5b337230e3c78f9f7415f1436.png';
import familyImage from 'figma:asset/c82c662c327a9dd6213f9642c531b6942bc1731e.png';
import contactImage from 'figma:asset/2db58a2bf88849c47bf5d595b648bed504a81e76.png';
import logoImage from 'figma:asset/9a7631c2d0aaf2c7b1c7f670d6f8fd142db61b48.png';

interface PropertyShowcaseProps {
  onNavigateToHome: () => void;
  onNavigateToLots: () => void;
}

export const PropertyShowcase: React.FC<PropertyShowcaseProps> = ({ onNavigateToHome, onNavigateToLots }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Hero Gallery Images
  const heroImages = [
    {
      src: opportunityImage,
      title: "Panoramic City Views",
      description: "Breathtaking vistas of Metro Manila skyline"
    },
    {
      src: practicalityImage,
      title: "Lush Green Landscapes", 
      description: "Mature trees and pristine natural environment"
    },
    {
      src: stabilityImage,
      title: "Premium Infrastructure",
      description: "World-class amenities and facilities"
    },
    {
      src: familyImage,
      title: "Family Living",
      description: "Perfect environment for growing families"
    }
  ];

  // Project Highlights
  const highlights = [
    {
      icon: Mountain,
      title: "Elevated Living",
      description: "Perched on Rizal's highest peak with 360° views"
    },
    {
      icon: Shield,
      title: "Gated Security",
      description: "24/7 security with controlled access points"
    },
    {
      icon: Trees,
      title: "60% Green Space",
      description: "Preserved natural environment and landscaping"
    },
    {
      icon: Building,
      title: "Ready Infrastructure",
      description: "Complete utilities and paved roads"
    }
  ];

  // Amenities
  const amenities = [
    {
      category: "Recreation",
      items: [
        { name: "Clubhouse", icon: Home },
        { name: "Swimming Pool", icon: Waves },
        { name: "Basketball Court", icon: Users },
        { name: "Children's Playground", icon: Users },
        { name: "Jogging Trails", icon: Compass },
        { name: "Picnic Grounds", icon: Trees }
      ]
    },
    {
      category: "Convenience",
      items: [
        { name: "Shopping Center", icon: Building },
        { name: "Medical Clinic", icon: Shield },
        { name: "Chapel", icon: Home },
        { name: "Admin Office", icon: Building }
      ]
    }
  ];

  // Lot Types
  const lotTypes = [
    {
      name: "Verdant Heights",
      size: "300-400 sqm",
      price: "₱2.8M - ₱3.5M",
      features: ["Hillside location", "Premium views", "Corner lots available"],
      image: opportunityImage
    },
    {
      name: "Forest Grove", 
      size: "250-350 sqm",
      price: "₱2.2M - ₱3.0M", 
      features: ["Tree-lined streets", "Mature vegetation", "Family-friendly"],
      image: practicalityImage
    },
    {
      name: "River Bend",
      size: "400-500 sqm",
      price: "₱3.5M - ₱4.5M",
      features: ["Riverside proximity", "Larger lots", "Exclusive area"],
      image: stabilityImage
    }
  ];

  // Location Advantages
  const locationAdvantages = [
    {
      title: "Metro Manila",
      distance: "45 minutes",
      description: "Direct access via major highways"
    },
    {
      title: "Antipolo City Center", 
      distance: "15 minutes",
      description: "Shopping, dining, and services"
    },
    {
      title: "Eastridge Golf Club",
      distance: "5 minutes",
      description: "Championship 18-hole course"
    },
    {
      title: "Top Schools",
      distance: "10-20 minutes", 
      description: "International and local institutions"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onNavigateToHome} className="text-green-700">
              ← Back to Home
            </Button>
          </div>
          
          <div className="font-semibold text-xl text-green-800">
            Narra Cliffs
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={onNavigateToLots}>
              View Available Lots
            </Button>
            <Button className="bg-green-700 hover:bg-green-800">
              Schedule Visit
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Gallery Section */}
      <section className="relative h-screen overflow-hidden mt-16">
        <div className="relative w-full h-full">
          {heroImages.map((image, index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
              transition={{ duration: 1 }}
            >
              <ImageWithFallback
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
            </motion.div>
          ))}
          
          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl px-6">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-7xl font-bold mb-6 font-[Abhaya_Libre]">
                  {heroImages[currentImageIndex].title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-white/90">
                  {heroImages[currentImageIndex].description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-green-700 hover:bg-green-800 px-8 py-4">
                    Download Brochure
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-800 px-8 py-4">
                    Schedule Site Visit
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Image Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-[Abhaya_Libre]">
              Narra Cliffs at a Glance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A master-planned community that redefines elevated living in Rizal, 
              where natural beauty meets modern convenience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <highlight.icon className="w-8 h-8 text-green-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {highlight.title}
                </h3>
                <p className="text-gray-600">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Key Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-700 mb-2">45</div>
              <div className="text-gray-600">Hectares</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-700 mb-2">300+</div>
              <div className="text-gray-600">Premium Lots</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-700 mb-2">60%</div>
              <div className="text-gray-600">Green Space</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-700 mb-2">24/7</div>
              <div className="text-gray-600">Security</div>
            </div>
          </div>
        </div>
      </section>

      {/* Master Plan */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 font-[Abhaya_Libre]">
                Thoughtfully Planned Community
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our master plan seamlessly integrates residential areas with recreational 
                spaces, ensuring every lot offers privacy, convenience, and natural beauty.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-lg p-2">
                    <Home className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Residential Phases</h3>
                    <p className="text-gray-600">Three carefully planned phases with distinct characteristics</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-lg p-2">
                    <Trees className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Central Park</h3>
                    <p className="text-gray-600">5-hectare green space with walking trails and recreation areas</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-lg p-2">
                    <Building className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Amenity Center</h3>
                    <p className="text-gray-600">Clubhouse, pool, and sports facilities at the heart of the community</p>
                  </div>
                </div>
              </div>

              <Button className="mt-8 bg-green-700 hover:bg-green-800">
                <Map className="w-4 h-4 mr-2" />
                View Interactive Map
              </Button>
            </div>

            <div className="relative">
              <ImageWithFallback
                src={familyImage}
                alt="Narra Cliffs Master Plan"
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-20" style={{backgroundColor: '#E5F0FA'}}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 font-[Abhaya_Libre]">
              World-Class Amenities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for an active, fulfilling lifestyle right at your doorstep.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {amenities.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, x: categoryIndex === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                  {category.category}
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  {category.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="bg-green-100 rounded-lg p-2">
                        <item.icon className="w-5 h-5 text-green-700" />
                      </div>
                      <span className="text-gray-700 font-medium">{item.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lot Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 font-[Abhaya_Libre]">
              Choose Your Perfect Lot
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From intimate family lots to expansive estate parcels, find the perfect foundation for your dream home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {lotTypes.map((lot, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48">
                  <ImageWithFallback
                    src={lot.image}
                    alt={lot.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-green-700 text-white">
                      {lot.size}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {lot.name}
                  </h3>
                  <div className="text-2xl font-bold text-green-700 mb-4">
                    {lot.price}
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    {lot.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button className="w-full bg-green-700 hover:bg-green-800">
                    View Available Lots
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Advantages */}
      <section className="py-20" style={{backgroundColor: '#EFEFEF'}}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 font-[Abhaya_Libre]">
              Strategic Location
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Perfectly positioned for convenience while maintaining the tranquility of elevated living.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {locationAdvantages.map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all"
              >
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-green-700" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {location.title}
                </h3>
                <div className="text-2xl font-bold text-green-700 mb-2">
                  {location.distance}
                </div>
                <p className="text-sm text-gray-600">
                  {location.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 font-[Abhaya_Libre]">
                Ready to Call Narra Cliffs Home?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Schedule a private tour and discover why Narra Cliffs is Rizal's most coveted address. 
                Our specialists are ready to help you find your perfect lot.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 rounded-lg p-3">
                    <Phone className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Sales Hotline</div>
                    <div className="text-gray-600">+63 917 123 4567</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 rounded-lg p-3">
                    <Mail className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Email</div>
                    <div className="text-gray-600">sales@narracliffs.com</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 rounded-lg p-3">
                    <Clock className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Site Visits</div>
                    <div className="text-gray-600">Daily 9:00 AM - 5:00 PM</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-green-700 hover:bg-green-800">
                  Schedule Site Visit
                </Button>
                <Button size="lg" variant="outline" onClick={onNavigateToLots}>
                  Browse Available Lots
                </Button>
              </div>
            </div>

            <div className="relative">
              <ImageWithFallback
                src={contactImage}
                alt="Narra Cliffs Contact"
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyShowcase;