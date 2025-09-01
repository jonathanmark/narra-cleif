import React, { useState } from 'react';
import { cn } from '../ui/utils';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { PropertyCard, PropertyListItem } from '../ui/property-cards';
import { FormInput, FormTextarea, FormSubmitButton } from '../ui/form-components';
import { 
  Filter, 
  Grid3X3, 
  List, 
  Search, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Car, 
  Wifi, 
  Shield,
  Calendar,
  Share2,
  Heart,
  Phone,
  Mail,
  MessageCircle
} from 'lucide-react';

// Properties Listing Page Template
interface PropertiesListingPageProps {
  className?: string;
}

export const PropertiesListingPage: React.FC<PropertiesListingPageProps> = ({ className }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Sample property data
  const properties = [
    {
      id: 1,
      title: "Modern Villa with Garden",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&h=400&q=80",
      price: "₱8,500,000",
      beds: 4,
      baths: 3,
      area: "250 sqm",
      location: "Antipolo Heights",
      status: "New" as const,
      featured: true
    },
    {
      id: 2,
      title: "Eco-Friendly Townhouse",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&h=400&q=80",
      price: "₱6,200,000",
      beds: 3,
      baths: 2,
      area: "180 sqm",
      location: "Forest Grove",
      status: "Available" as const
    },
    {
      id: 3,
      title: "Luxury Condo Unit",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&h=400&q=80",
      price: "₱4,800,000",
      beds: 2,
      baths: 2,
      area: "120 sqm",
      location: "River Bend",
      status: "Reserved" as const
    },
    {
      id: 4,
      title: "Garden View Apartment",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=600&h=400&q=80",
      price: "₱3,500,000",
      beds: 2,
      baths: 1,
      area: "95 sqm",
      location: "Verdant Heights",
      status: "Available" as const
    }
  ];

  return (
    <div className={cn('min-h-screen bg-gray-50', className)}>
      {/* Page Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Available Properties</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover your perfect home in our carefully curated selection of premium properties
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search by location, property name..."
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Select>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-full sm:w-[120px]">
                  <SelectValue placeholder="Bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Bed</SelectItem>
                  <SelectItem value="2">2 Beds</SelectItem>
                  <SelectItem value="3">3 Beds</SelectItem>
                  <SelectItem value="4">4+ Beds</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-3">₱0 - ₱3M</SelectItem>
                  <SelectItem value="3-6">₱3M - ₱6M</SelectItem>
                  <SelectItem value="6-10">₱6M - ₱10M</SelectItem>
                  <SelectItem value="10+">₱10M+</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="sm:w-auto"
              >
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>

          {/* Extended Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Bathrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Bath</SelectItem>
                    <SelectItem value="2">2 Baths</SelectItem>
                    <SelectItem value="3">3+ Baths</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Parking" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Space</SelectItem>
                    <SelectItem value="2">2 Spaces</SelectItem>
                    <SelectItem value="3">3+ Spaces</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="reserved">Reserved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <p className="text-gray-600">
              Showing <span className="font-semibold">1-{properties.length}</span> of{' '}
              <span className="font-semibold">{properties.length}</span> properties
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 mr-2">View:</span>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Properties Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                size="medium"
                onClick={() => console.log('View property', property.id)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-6 mb-12">
            {properties.map((property) => (
              <PropertyListItem
                key={property.id}
                property={property}
                onClick={() => console.log('View property', property.id)}
              />
            ))}
          </div>
        )}

        {/* Load More / Pagination */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            Load More Properties
          </Button>
        </div>
      </div>
    </div>
  );
};

// Property Detail Page Template
interface PropertyDetailPageProps {
  className?: string;
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({ className }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  // Sample property detail data
  const property = {
    id: 1,
    title: "Modern Villa with Garden",
    price: "₱8,500,000",
    location: "123 Hillside Drive, Antipolo Heights",
    status: "Available",
    beds: 4,
    baths: 3,
    area: "250 sqm",
    lotArea: "400 sqm",
    parking: 2,
    yearBuilt: 2023,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&h=600&q=80"
    ],
    description: "This stunning modern villa offers the perfect blend of luxury and comfort. Featuring spacious living areas, a beautiful garden, and premium finishes throughout. Located in the prestigious Antipolo Heights with breathtaking views of the surrounding landscape.",
    features: [
      "Air Conditioning",
      "High-Speed Internet",
      "Security System",
      "Garden/Landscaping",
      "Modern Kitchen",
      "Walk-in Closets",
      "Balcony/Terrace",
      "Garage Parking"
    ],
    amenities: [
      "Swimming Pool",
      "Clubhouse",
      "Playground",
      "24/7 Security",
      "Jogging Path",
      "Basketball Court"
    ]
  };

  const agent = {
    name: "Maria Santos",
    title: "Senior Property Consultant",
    phone: "+63 917 123 4567",
    email: "maria.santos@narracliffs.com",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=200&h=200&q=80"
  };

  return (
    <div className={cn('min-h-screen bg-gray-50', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Images */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative">
                <ImageWithFallback
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  className="w-full h-96 object-cover"
                />
                
                {/* Image Navigation */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex space-x-2">
                    {property.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={cn(
                          'w-3 h-3 rounded-full transition-colors',
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        )}
                      />
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white/90 hover:bg-white"
                    onClick={() => setIsFavorited(!isFavorited)}
                  >
                    <Heart className={cn('w-4 h-4', isFavorited && 'fill-current text-red-500')} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white/90 hover:bg-white"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Image Thumbnails */}
              <div className="p-4 flex space-x-2 overflow-x-auto">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      'flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 transition-colors',
                      index === currentImageIndex ? 'border-amber-400' : 'border-gray-200'
                    )}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`${property.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{property.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-700 mb-2">{property.price}</div>
                  <Badge className="bg-green-600 text-white">{property.status}</Badge>
                </div>
              </div>

              {/* Property Specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Bed className="w-8 h-8 mx-auto text-gray-600 mb-2" />
                  <div className="font-semibold">{property.beds}</div>
                  <div className="text-sm text-gray-600">Bedrooms</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Bath className="w-8 h-8 mx-auto text-gray-600 mb-2" />
                  <div className="font-semibold">{property.baths}</div>
                  <div className="text-sm text-gray-600">Bathrooms</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Square className="w-8 h-8 mx-auto text-gray-600 mb-2" />
                  <div className="font-semibold">{property.area}</div>
                  <div className="text-sm text-gray-600">Floor Area</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Car className="w-8 h-8 mx-auto text-gray-600 mb-2" />
                  <div className="font-semibold">{property.parking}</div>
                  <div className="text-sm text-gray-600">Parking</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">About This Property</h3>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>

              {/* Features & Amenities */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Property Features</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-green-600 rounded-full mr-2" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Community Amenities</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-amber-600 rounded-full mr-2" />
                        <span className="text-sm text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Contact Agent</h3>
              
              <div className="flex items-center mb-4">
                <ImageWithFallback
                  src={agent.image}
                  alt={agent.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">{agent.name}</div>
                  <div className="text-sm text-gray-600">{agent.title}</div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-sm">{agent.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-sm">{agent.email}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full bg-amber-400 text-gray-900 hover:bg-amber-500">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Request Information</h3>
              
              <form className="space-y-4">
                <FormInput
                  placeholder="Your Name"
                  required
                />
                <FormInput
                  type="email"
                  placeholder="Email Address"
                  required
                />
                <FormInput
                  type="tel"
                  placeholder="Phone Number"
                />
                <FormTextarea
                  placeholder="I'm interested in this property. Please send me more information."
                  rows={4}
                />
                <FormSubmitButton>
                  Send Inquiry
                </FormSubmitButton>
              </form>
            </div>

            {/* Property Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Property Summary</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Property ID</span>
                  <span className="font-medium">NC-{property.id.toString().padStart(4, '0')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Year Built</span>
                  <span className="font-medium">{property.yearBuilt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lot Area</span>
                  <span className="font-medium">{property.lotArea}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <Badge className="bg-green-600 text-white text-xs">{property.status}</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};