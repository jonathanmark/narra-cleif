import React, { useState } from 'react';
import { cn } from '../ui/utils';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { 
  Download, 
  Map,
  ZoomIn,
  ZoomOut,
  Search,
  Filter,
  MapPin,
  Square,
  Home,
  TreePine,
  Car,
  Wifi,
  Shield,
  Calendar,
  Phone
} from 'lucide-react';

// MasterPlan Page Component
interface MasterPlanPageProps {
  className?: string;
}

export const MasterPlanPage: React.FC<MasterPlanPageProps> = ({ className }) => {
  const [selectedPhase, setSelectedPhase] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showAmenities, setShowAmenities] = useState(true);
  const [hoveredLot, setHoveredLot] = useState<string | null>(null);

  // Sample development phases
  const phases = [
    {
      id: 'phase1',
      name: 'Verdant Heights - Phase 1',
      status: 'Selling',
      totalLots: 45,
      availableLots: 12,
      soldLots: 28,
      reservedLots: 5,
      priceRange: '₱2.8M - ₱5.2M',
      deliveryDate: 'Q4 2024'
    },
    {
      id: 'phase2', 
      name: 'Forest Grove - Phase 2',
      status: 'Pre-Selling',
      totalLots: 38,
      availableLots: 35,
      soldLots: 0,
      reservedLots: 3,
      priceRange: '₱3.2M - ₱6.8M',
      deliveryDate: 'Q2 2025'
    },
    {
      id: 'phase3',
      name: 'River Bend - Phase 3',
      status: 'Coming Soon',
      totalLots: 52,
      availableLots: 52,
      soldLots: 0,
      reservedLots: 0,
      priceRange: '₱4.0M - ₱8.5M',
      deliveryDate: 'Q4 2025'
    }
  ];

  // Sample amenities data
  const amenities = [
    { id: 'clubhouse', name: 'Clubhouse', icon: Home, position: { x: 45, y: 30 } },
    { id: 'pool', name: 'Swimming Pool', icon: Shield, position: { x: 48, y: 32 } },
    { id: 'playground', name: 'Playground', icon: TreePine, position: { x: 60, y: 45 } },
    { id: 'security', name: 'Security Gate', icon: Shield, position: { x: 30, y: 10 } },
    { id: 'parking', name: 'Visitor Parking', icon: Car, position: { x: 32, y: 15 } }
  ];

  // Sample lot data with positions
  const lots = [
    { id: 'VH-A-001', phase: 'phase1', status: 'Available', position: { x: 25, y: 20 } },
    { id: 'VH-A-002', phase: 'phase1', status: 'Sold', position: { x: 28, y: 20 } },
    { id: 'VH-A-003', phase: 'phase1', status: 'Reserved', position: { x: 31, y: 20 } },
    { id: 'VH-B-001', phase: 'phase1', status: 'Available', position: { x: 25, y: 35 } },
    { id: 'FG-A-001', phase: 'phase2', status: 'Available', position: { x: 55, y: 25 } },
    { id: 'FG-A-002', phase: 'phase2', status: 'Reserved', position: { x: 58, y: 25 } },
    { id: 'RB-A-001', phase: 'phase3', status: 'Available', position: { x: 70, y: 60 } },
    { id: 'RB-A-002', phase: 'phase3', status: 'Available', position: { x: 73, y: 60 } }
  ];

  const filteredLots = lots.filter(lot => {
    const phaseMatch = selectedPhase === 'all' || lot.phase === selectedPhase;
    const statusMatch = selectedStatus === 'all' || lot.status === selectedStatus;
    return phaseMatch && statusMatch;
  });

  return (
    <div className={cn('min-h-screen bg-gray-50', className)}>
      {/* Page Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">MasterPlan</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our thoughtfully designed community layout. View available lots, amenities, and development phases in our interactive masterplan.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters & Controls Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full bg-green-700 hover:bg-green-800">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Visit
                </Button>
                <Button variant="outline" className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Sales Office
                </Button>
              </div>
            </Card>

            {/* Phase Filter */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Filter by Phase</h3>
              <Select value={selectedPhase} onValueChange={setSelectedPhase}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Phases</SelectItem>
                  <SelectItem value="phase1">Phase 1 - Verdant Heights</SelectItem>
                  <SelectItem value="phase2">Phase 2 - Forest Grove</SelectItem>
                  <SelectItem value="phase3">Phase 3 - River Bend</SelectItem>
                </SelectContent>
              </Select>
            </Card>

            {/* Status Filter */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Filter by Status</h3>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Reserved">Reserved</SelectItem>
                  <SelectItem value="Sold">Sold</SelectItem>
                </SelectContent>
              </Select>
            </Card>

            {/* Legend */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Legend</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                  <span className="text-sm">Available</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-amber-500 rounded mr-2"></div>
                  <span className="text-sm">Reserved</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                  <span className="text-sm">Sold</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                  <span className="text-sm">Amenities</span>
                </div>
              </div>
            </Card>

            {/* View Controls */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">View Controls</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Zoom Level</span>
                  <div className="flex space-x-1">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.25))}
                    >
                      <ZoomOut className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setZoomLevel(Math.min(3, zoomLevel + 0.25))}
                    >
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Show Amenities</span>
                  <Button 
                    size="sm" 
                    variant={showAmenities ? "default" : "outline"}
                    onClick={() => setShowAmenities(!showAmenities)}
                  >
                    {showAmenities ? 'Hide' : 'Show'}
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Interactive MasterPlan */}
          <div className="lg:col-span-3 space-y-6">
            {/* MasterPlan Container */}
            <Card className="p-0 overflow-hidden">
              <div className="relative bg-green-50" style={{ minHeight: '600px' }}>
                {/* Map Background */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200"
                  style={{ 
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'center center',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  {/* Sample terrain features */}
                  <div className="absolute top-10 left-20 w-32 h-20 bg-green-300 rounded-full opacity-50"></div>
                  <div className="absolute bottom-20 right-16 w-24 h-16 bg-blue-200 rounded-full opacity-50"></div>
                  <div className="absolute top-1/2 left-1/3 w-16 h-40 bg-green-400 rounded-full opacity-30"></div>

                  {/* Roads */}
                  <div className="absolute top-0 left-1/3 w-2 h-full bg-gray-400"></div>
                  <div className="absolute top-1/4 left-0 w-full h-2 bg-gray-400"></div>
                  <div className="absolute top-2/3 left-0 w-full h-2 bg-gray-400"></div>

                  {/* Lot Markers */}
                  {filteredLots.map((lot) => (
                    <button
                      key={lot.id}
                      className={cn(
                        'absolute w-6 h-6 rounded transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200',
                        lot.status === 'Available' ? 'bg-green-500 hover:bg-green-600' :
                        lot.status === 'Reserved' ? 'bg-amber-500 hover:bg-amber-600' :
                        'bg-red-500 hover:bg-red-600',
                        hoveredLot === lot.id && 'scale-150 z-20'
                      )}
                      style={{
                        left: `${lot.position.x}%`,
                        top: `${lot.position.y}%`
                      }}
                      onMouseEnter={() => setHoveredLot(lot.id)}
                      onMouseLeave={() => setHoveredLot(null)}
                      onClick={() => console.log('Selected lot:', lot.id)}
                    >
                      {hoveredLot === lot.id && (
                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap z-30">
                          {lot.id} - {lot.status}
                        </div>
                      )}
                    </button>
                  ))}

                  {/* Amenity Markers */}
                  {showAmenities && amenities.map((amenity) => (
                    <div
                      key={amenity.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${amenity.position.x}%`,
                        top: `${amenity.position.y}%`
                      }}
                    >
                      <div className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors">
                        <amenity.icon className="w-4 h-4" />
                      </div>
                      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-blue-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                        {amenity.name}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map Controls */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <Button size="sm" variant="outline" className="bg-white">
                    <Search className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="bg-white">
                    <Map className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Phase Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {phases.map((phase) => (
                <Card key={phase.id} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-lg">{phase.name}</h3>
                    <Badge className={cn(
                      phase.status === 'Selling' ? 'bg-green-600' :
                      phase.status === 'Pre-Selling' ? 'bg-amber-600' :
                      'bg-blue-600',
                      'text-white'
                    )}>
                      {phase.status}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Lots:</span>
                      <span className="font-medium">{phase.totalLots}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Available:</span>
                      <span className="font-medium text-green-600">{phase.availableLots}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Reserved:</span>
                      <span className="font-medium text-amber-600">{phase.reservedLots}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Sold:</span>
                      <span className="font-medium text-red-600">{phase.soldLots}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Price Range:</span>
                      <span className="font-medium">{phase.priceRange}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Delivery:</span>
                      <span className="font-medium">{phase.deliveryDate}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => setSelectedPhase(phase.id)}
                    >
                      View This Phase
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Development Timeline */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">Development Timeline</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-4"></div>
                  <div className="flex-1">
                    <div className="font-medium">Phase 1 - Verdant Heights</div>
                    <div className="text-sm text-gray-600">Infrastructure completed • Now selling</div>
                  </div>
                  <div className="text-sm text-green-600 font-medium">Q4 2024</div>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-amber-500 rounded-full mr-4"></div>
                  <div className="flex-1">
                    <div className="font-medium">Phase 2 - Forest Grove</div>
                    <div className="text-sm text-gray-600">Development in progress • Pre-selling</div>
                  </div>
                  <div className="text-sm text-amber-600 font-medium">Q2 2025</div>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mr-4"></div>
                  <div className="flex-1">
                    <div className="font-medium">Phase 3 - River Bend</div>
                    <div className="text-sm text-gray-600">Planning stage • Coming soon</div>
                  </div>
                  <div className="text-sm text-blue-600 font-medium">Q4 2025</div>
                </div>
              </div>
            </Card>

            {/* How to Get There */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">How to Get There</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">By Private Vehicle</h4>
                  <ol className="text-sm text-gray-600 space-y-1">
                    <li>1. Take EDSA to Ortigas Avenue</li>
                    <li>2. Head east via Marikina-Infanta Highway</li>
                    <li>3. Turn left at Narra Cliffs entrance</li>
                    <li>4. Proceed to Sales Office</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-medium mb-3">By Public Transport</h4>
                  <ol className="text-sm text-gray-600 space-y-1">
                    <li>1. Take MRT to Santolan Station</li>
                    <li>2. Board jeepney to Antipolo</li>
                    <li>3. Alight at Narra Cliffs entrance</li>
                    <li>4. Short walk to Sales Office</li>
                  </ol>
                </div>
              </div>
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  <MapPin className="w-4 h-4 mr-2" />
                  Open in Google Maps
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};