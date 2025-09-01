import React, { useState } from 'react';
import { cn } from '../ui/utils';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { FormInput, FormTextarea, FormSubmitButton } from '../ui/form-components';
import { 
  Filter, 
  Grid3X3, 
  List, 
  Search, 
  MapPin, 
  Square, 
  Calendar,
  Share2,
  Heart,
  Phone,
  Mail,
  MessageCircle,
  Download,
  Map,
  Home,
  Compass,
  TreePine,
  Ruler,
  DollarSign
} from 'lucide-react';

// Lot Card Component
interface LotCardProps {
  lot: {
    id: string;
    title: string;
    image: string;
    totalPrice: string;
    pricePerSqm: string;
    lotArea: string;
    phase: string;
    block: string;
    status: 'Available' | 'Reserved' | 'Sold';
    orientation?: string;
    elevation?: string;
  };
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

export const LotCard: React.FC<LotCardProps> = ({ lot, size = 'medium', onClick }) => {
  const cardSizes = {
    small: 'w-full',
    medium: 'w-full',
    large: 'w-full'
  };

  const imageSizes = {
    small: 'h-48',
    medium: 'h-56',
    large: 'h-64'
  };

  return (
    <Card 
      className={cn(
        'overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer',
        cardSizes[size]
      )}
      onClick={onClick}
    >
      <div className="relative">
        <ImageWithFallback
          src={lot.image}
          alt={lot.title}
          className={cn('w-full object-cover', imageSizes[size])}
        />
        
        {/* Status Badge */}
        <Badge className={cn(
          'absolute top-4 right-4',
          lot.status === 'Available' ? 'bg-green-600' :
          lot.status === 'Reserved' ? 'bg-amber-600' :
          'bg-red-600',
          'text-white'
        )}>
          {lot.status}
        </Badge>

        {/* Lot ID */}
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-white/90 text-gray-900">
            {lot.id}
          </Badge>
        </div>

        {/* Featured overlay for premium lots */}
        {lot.elevation && (
          <div className="absolute bottom-4 left-4">
            <Badge className="bg-amber-600 text-white">
              {lot.elevation}
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">{lot.title}</h3>
          
          {/* Pricing */}
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-100/80 to-emerald-50/80 rounded-xl blur-sm"></div>
              
              <div className="relative bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200/50 shadow-sm">
                <div className="flex items-baseline space-x-2 mb-1">
                  <div className="text-3xl font-bold text-green-700 font-plantin">{lot.totalPrice}</div>
                  <div className="text-green-600 text-sm font-medium">total</div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-base text-green-600 font-medium">{lot.pricePerSqm}/sqm</div>
                  <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                  <div className="text-sm text-green-600">{lot.lotArea}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lot Details Grid */}
        <div className="grid grid-cols-2 gap-4 text-base text-gray-600 mb-6">
          <div className="flex items-center bg-gray-50 p-3 rounded-lg">
            <Square className="w-5 h-5 mr-3 text-green-600" />
            <div>
              <div className="text-sm text-gray-500">Area</div>
              <div className="font-semibold">{lot.lotArea}</div>
            </div>
          </div>
          <div className="flex items-center bg-gray-50 p-3 rounded-lg">
            <Map className="w-5 h-5 mr-3 text-green-600" />
            <div>
              <div className="text-sm text-gray-500">Phase</div>
              <div className="font-semibold">{lot.phase}</div>
            </div>
          </div>
          <div className="flex items-center bg-gray-50 p-3 rounded-lg">
            <Home className="w-5 h-5 mr-3 text-green-600" />
            <div>
              <div className="text-sm text-gray-500">Block</div>
              <div className="font-semibold">{lot.block}</div>
            </div>
          </div>
          {lot.orientation && (
            <div className="flex items-center bg-gray-50 p-3 rounded-lg">
              <Compass className="w-5 h-5 mr-3 text-green-600" />
              <div>
                <div className="text-sm text-gray-500">Orientation</div>
                <div className="font-semibold">{lot.orientation}</div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button 
            className="w-full bg-green-700 hover:bg-green-800" 
            disabled={lot.status !== 'Available'}
          >
            {lot.status === 'Available' ? 'Reserve Lot' : 
             lot.status === 'Reserved' ? 'Reserved' : 'Sold'}
          </Button>
          <Button variant="outline" className="w-full">
            View Lot Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Lots Listing Page Template
interface LotsListingPageProps {
  className?: string;
}

export const LotsListingPage: React.FC<LotsListingPageProps> = ({ className }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showMap, setShowMap] = useState(false);

  // Sample lot data
  const lots = [
    {
      id: "VH-A-001",
      title: "Corner Lot 1, Block A",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&h=400&q=80",
      totalPrice: "₱3,500,000",
      pricePerSqm: "₱11,667",
      lotArea: "300 sqm",
      phase: "Phase 1",
      block: "Block A",
      status: "Available" as const,
      orientation: "East-facing",
      elevation: "Premium View"
    },
    {
      id: "VH-B-005",
      title: "Lot 5, Block B", 
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&h=400&q=80",
      totalPrice: "₱4,200,000",
      pricePerSqm: "₱10,500",
      lotArea: "400 sqm",
      phase: "Phase 1",
      block: "Block B",
      status: "Available" as const,
      orientation: "South-facing"
    },
    {
      id: "FG-C-012",
      title: "Lot 12, Block C",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&h=400&q=80",
      totalPrice: "₱5,800,000",
      pricePerSqm: "₱11,600",
      lotArea: "500 sqm",
      phase: "Phase 2",
      block: "Block C",
      status: "Reserved" as const,
      orientation: "North-facing",
      elevation: "Hill View"
    },
    {
      id: "RB-D-008",
      title: "Riverside Lot 8, Block D",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&h=400&q=80",
      totalPrice: "₱6,500,000",
      pricePerSqm: "₱13,000",
      lotArea: "500 sqm",
      phase: "Phase 1",
      block: "Block D",
      status: "Available" as const,
      orientation: "West-facing",
      elevation: "Riverside"
    },
    {
      id: "VH-A-003",
      title: "Lot 3, Block A",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&h=400&q=80",
      totalPrice: "₱2,875,000",
      pricePerSqm: "₱11,500",
      lotArea: "250 sqm",
      phase: "Phase 1", 
      block: "Block A",
      status: "Available" as const,
      orientation: "South-facing"
    },
    {
      id: "FG-B-007",
      title: "Forest Lot 7, Block B",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&h=400&q=80",
      totalPrice: "₱4,800,000",
      pricePerSqm: "₱12,000",
      lotArea: "400 sqm",
      phase: "Phase 2",
      block: "Block B",
      status: "Sold" as const,
      orientation: "East-facing",
      elevation: "Forest View"
    }
  ];

  return (
    <div className={cn('min-h-screen bg-gray-50', className)}>
      {/* Page Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Available Lots</h1>
            <p className="text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover your perfect lot in our master-planned community. Each parcel offers the ideal foundation for your dream home with breathtaking views and premium amenities.
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
                  placeholder="Search by lot number, phase, block..."
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Select>
                <SelectTrigger className="w-full sm:w-[120px]">
                  <SelectValue placeholder="Phase" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="phase1">Phase 1</SelectItem>
                  <SelectItem value="phase2">Phase 2</SelectItem>
                  <SelectItem value="phase3">Phase 3</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Lot Area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">200-300 sqm</SelectItem>
                  <SelectItem value="medium">300-400 sqm</SelectItem>
                  <SelectItem value="large">400-500 sqm</SelectItem>
                  <SelectItem value="xlarge">500+ sqm</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2-3">₱2M - ₱3M</SelectItem>
                  <SelectItem value="3-4">₱3M - ₱4M</SelectItem>
                  <SelectItem value="4-5">₱4M - ₱5M</SelectItem>
                  <SelectItem value="5+">₱5M+</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-full sm:w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="reserved">Reserved</SelectItem>
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Block" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Block A</SelectItem>
                    <SelectItem value="B">Block B</SelectItem>
                    <SelectItem value="C">Block C</SelectItem>
                    <SelectItem value="D">Block D</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Orientation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="north">North-facing</SelectItem>
                    <SelectItem value="south">South-facing</SelectItem>
                    <SelectItem value="east">East-facing</SelectItem>
                    <SelectItem value="west">West-facing</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="View Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="premium">Premium View</SelectItem>
                    <SelectItem value="forest">Forest View</SelectItem>
                    <SelectItem value="hill">Hill View</SelectItem>
                    <SelectItem value="riverside">Riverside</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline">
                  Reset Filters
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <p className="text-gray-600">
              Showing <span className="font-semibold">1-{lots.length}</span> of{' '}
              <span className="font-semibold">{lots.length}</span> available lots
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="w-4 h-4 mr-2" />
              Grid
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4 mr-2" />
              List
            </Button>
            <Button
              variant={showMap ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowMap(!showMap)}
            >
              <Map className="w-4 h-4 mr-2" />
              Map View
            </Button>
          </div>
        </div>

        {/* Map View */}
        {showMap && (
          <div className="bg-white rounded-lg shadow-sm mb-8 p-6">
            <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Map className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Interactive Lot Map</h3>
                <p>Click on lot pins to view details and availability</p>
                <Button className="mt-4" variant="outline">
                  View Full MasterPlan
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Lots Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {lots.map((lot) => (
              <LotCard
                key={lot.id}
                lot={lot}
                size="medium"
                onClick={() => console.log('View lot', lot.id)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-6 mb-12">
            {lots.map((lot) => (
              <Card key={lot.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-64 flex-shrink-0">
                      <ImageWithFallback
                        src={lot.image}
                        alt={lot.title}
                        className="w-full h-48 md:h-32 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{lot.title}</h3>
                          <Badge className="mb-2" variant="secondary">{lot.id}</Badge>
                        </div>
                        <div className="text-right">
                          <div className="relative bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200/50 shadow-sm">
                            <div className="text-3xl font-bold text-green-700 font-plantin">{lot.totalPrice}</div>
                            <div className="text-base text-green-600 font-medium">{lot.pricePerSqm}/sqm</div>
                          </div>
                          <Badge className={cn(
                            'mt-2',
                            lot.status === 'Available' ? 'bg-green-600' :
                            lot.status === 'Reserved' ? 'bg-amber-600' : 'bg-red-600',
                            'text-white'
                          )}>
                            {lot.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Square className="w-4 h-4 mr-1" />
                          <span>{lot.lotArea}</span>
                        </div>
                        <div className="flex items-center">
                          <Map className="w-4 h-4 mr-1" />
                          <span>{lot.phase}</span>
                        </div>
                        <div className="flex items-center">
                          <Home className="w-4 h-4 mr-1" />
                          <span>{lot.block}</span>
                        </div>
                        <div className="flex items-center">
                          <Compass className="w-4 h-4 mr-1" />
                          <span>{lot.orientation}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" disabled={lot.status !== 'Available'}>
                          {lot.status === 'Available' ? 'Reserve Lot' : lot.status}
                        </Button>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Load More / Pagination */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            Load More Lots
          </Button>
        </div>
      </div>
    </div>
  );
};

// Lot Detail Page Template
interface LotDetailPageProps {
  className?: string;
}

export const LotDetailPage: React.FC<LotDetailPageProps> = ({ className }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  // Sample lot detail data
  const lot = {
    id: "VH-A-001",
    title: "Premium Corner Lot 1, Block A",
    lotNumber: "Lot 1",
    phase: "Verdant Heights - Phase 1",
    block: "Block A",
    totalPrice: "₱3,500,000",
    pricePerSqm: "₱11,667",
    lotArea: "300 sqm",
    status: "Available",
    orientation: "East-facing",
    elevation: "Premium View",
    location: "Corner of Narra Street & Cliffs Avenue",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&h=600&q=80"
    ],
    description: "This premium corner lot offers exceptional value with its strategic location and stunning east-facing orientation. Perfect for building your dream home with panoramic views of the surrounding hills and valleys. The lot comes with complete infrastructure including water, electricity, and road access.",
    features: [
      "Corner lot with dual street access",
      "Ready-to-build with all permits",
      "Underground utilities installed", 
      "Concrete road frontage",
      "Perimeter fence included",
      "24/7 security patrol",
      "Gated community access",
      "Landscaped entrance"
    ],
    nearbyPlaces: [
      { name: "Antipolo Elementary School", distance: "1.2 km", icon: "🏫" },
      { name: "Rizal Provincial Hospital", distance: "3.5 km", icon: "🏥" },
      { name: "SM City Masinag", distance: "5.8 km", icon: "🛒" },
      { name: "Marikina-Infanta Highway", distance: "800 m", icon: "🛣️" }
    ]
  };

  const agent = {
    name: "Carlos Rivera",
    title: "Senior Lot Sales Specialist",
    phone: "+63 917 123 4567",
    email: "carlos.rivera@narracliffs.com",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80"
  };

  return (
    <div className={cn('min-h-screen bg-gray-50', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Lot Images */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative">
                <ImageWithFallback
                  src={lot.images[currentImageIndex]}
                  alt={lot.title}
                  className="w-full h-96 object-cover"
                />
                
                {/* Image Navigation */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex space-x-2">
                    {lot.images.map((_, index) => (
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
                {lot.images.map((image, index) => (
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
                      alt={`${lot.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Lot Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{lot.title}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{lot.location}</span>
                  </div>
                  <div className="flex space-x-4 text-sm text-gray-500">
                    <span>ID: {lot.id}</span>
                    <span>•</span>
                    <span>{lot.phase}</span>
                    <span>•</span>
                    <span>{lot.block}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-700 mb-1">{lot.totalPrice}</div>
                  <div className="text-lg text-gray-600 mb-2">{lot.pricePerSqm} per sqm</div>
                  <Badge className="bg-green-600 text-white">{lot.status}</Badge>
                </div>
              </div>

              {/* Lot Specifications */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Square className="w-8 h-8 mx-auto text-gray-600 mb-2" />
                  <div className="font-semibold">{lot.lotArea}</div>
                  <div className="text-sm text-gray-600">Lot Area</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Compass className="w-8 h-8 mx-auto text-gray-600 mb-2" />
                  <div className="font-semibold">{lot.orientation}</div>
                  <div className="text-sm text-gray-600">Orientation</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <TreePine className="w-8 h-8 mx-auto text-gray-600 mb-2" />
                  <div className="font-semibold">{lot.elevation}</div>
                  <div className="text-sm text-gray-600">Elevation</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Map className="w-8 h-8 mx-auto text-gray-600 mb-2" />
                  <div className="font-semibold">{lot.phase.split(' - ')[1]}</div>
                  <div className="text-sm text-gray-600">Development</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">About This Lot</h3>
                <p className="text-gray-700 leading-relaxed">{lot.description}</p>
              </div>

              {/* Features & Nearby Places */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Lot Features</h3>
                  <div className="space-y-2">
                    {lot.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Nearby Places</h3>
                  <div className="space-y-3">
                    {lot.nearbyPlaces.map((place, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-xl mr-3">{place.icon}</span>
                          <span className="text-gray-700">{place.name}</span>
                        </div>
                        <span className="text-sm text-gray-500">{place.distance}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* MasterPlan Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4">MasterPlan Location</h3>
              <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center text-gray-500">
                  <Map className="w-12 h-12 mx-auto mb-2" />
                  <p>Interactive MasterPlan</p>
                  <p className="text-sm">Lot {lot.lotNumber} highlighted in {lot.block}</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Full MasterPlan PDF
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-3">
                <Button className="w-full bg-green-700 hover:bg-green-800 text-lg py-3">
                  Reserve This Lot
                </Button>
                <Button variant="outline" className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Site Visit
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download Brochure
                </Button>
              </div>
            </div>

            {/* Agent Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Contact Specialist</h3>
              
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
              <h3 className="text-lg font-semibold mb-4">Get More Information</h3>
              
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
                  placeholder={`I'm interested in ${lot.id} - ${lot.title}. Please provide more details about financing options and site visit availability.`}
                  rows={4}
                />
                <FormSubmitButton>
                  Send Inquiry
                </FormSubmitButton>
              </form>
            </div>

            {/* Lot Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Lot Summary</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Lot ID</span>
                  <span className="font-medium">{lot.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phase</span>
                  <span className="font-medium">{lot.phase.split(' - ')[1]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Block</span>
                  <span className="font-medium">{lot.block}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Area</span>
                  <span className="font-medium">{lot.lotArea}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price per sqm</span>
                  <span className="font-medium">{lot.pricePerSqm}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <Badge className="bg-green-600 text-white text-xs">{lot.status}</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};