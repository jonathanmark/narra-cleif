import React from 'react';
import { cn } from './utils';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Badge } from './badge';
import { Button } from './button';
import { Bed, Bath, Square, MapPin, Calendar } from 'lucide-react';

// Property Card Component
// Usage: Property listings, featured properties
// Sizes: small, medium, large
// States: default, hover, featured

interface PropertyCardProps {
  property: {
    id: string | number;
    title: string;
    image: string;
    price: string;
    beds?: number;
    baths?: number;
    area?: string;
    location?: string;
    status?: 'Available' | 'Sold' | 'Reserved' | 'New';
    featured?: boolean;
  };
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  className?: string;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  size = 'medium',
  onClick,
  className,
}) => {
  const sizeClasses = {
    small: 'max-w-sm',
    medium: 'max-w-md',
    large: 'max-w-lg',
  };

  const imageHeights = {
    small: 'h-40',
    medium: 'h-48',
    large: 'h-64',
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-600 text-white';
      case 'Sold':
        return 'bg-red-600 text-white';
      case 'Reserved':
        return 'bg-orange-600 text-white';
      case 'New':
        return 'bg-blue-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300',
        'hover:shadow-lg hover:scale-[1.02] cursor-pointer',
        property.featured && 'ring-2 ring-amber-400',
        sizeClasses[size],
        className
      )}
      onClick={onClick}
    >
      {/* Property Image */}
      <div className="relative">
        <ImageWithFallback
          src={property.image}
          alt={property.title}
          className={cn('w-full object-cover', imageHeights[size])}
        />
        
        {/* Status Badge */}
        {property.status && (
          <Badge className={cn(
            'absolute top-3 right-3',
            getStatusColor(property.status)
          )}>
            {property.status}
          </Badge>
        )}
        
        {/* Featured Badge */}
        {property.featured && (
          <Badge className="absolute top-3 left-3 bg-amber-400 text-gray-900">
            Featured
          </Badge>
        )}
      </div>

      {/* Property Details */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className={cn(
            'font-semibold text-gray-900',
            size === 'small' ? 'text-lg' : size === 'large' ? 'text-xl' : 'text-lg'
          )}>
            {property.title}
          </h3>
          
          {property.location && (
            <div className="flex items-center text-gray-500 text-sm mt-1">
              <MapPin className="w-3 h-3 mr-1" />
              <span>{property.location}</span>
            </div>
          )}
        </div>

        {/* Property Specs */}
        {(property.beds || property.baths || property.area) && (
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            {property.beds && (
              <div className="flex items-center">
                <Bed className="w-4 h-4 mr-1" />
                <span>{property.beds}</span>
              </div>
            )}
            {property.baths && (
              <div className="flex items-center">
                <Bath className="w-4 h-4 mr-1" />
                <span>{property.baths}</span>
              </div>
            )}
            {property.area && (
              <div className="flex items-center">
                <Square className="w-4 h-4 mr-1" />
                <span>{property.area}</span>
              </div>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className={cn(
            'font-bold text-green-700',
            size === 'small' ? 'text-lg' : size === 'large' ? 'text-2xl' : 'text-xl'
          )}>
            {property.price}
          </span>
        </div>

        {/* CTA Button */}
        <Button 
          variant="outline" 
          className={cn(
            'w-full',
            size === 'small' ? 'text-sm' : 'text-base'
          )}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

// Project Card Component
// Usage: Upcoming projects, development showcases
// Includes: thumbnail, status, description, timeline

interface ProjectCardProps {
  project: {
    id: string | number;
    name: string;
    thumbnail: string;
    description: string;
    status: 'Pre-Selling' | 'Coming Soon' | 'Now Selling' | 'Completed';
    timeline?: string;
    location?: string;
    featured?: boolean;
  };
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  size = 'medium',
  onClick,
  className,
}) => {
  const sizeClasses = {
    small: 'max-w-sm',
    medium: 'max-w-md',
    large: 'max-w-lg',
  };

  const imageHeights = {
    small: 'h-32',
    medium: 'h-40',
    large: 'h-48',
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pre-Selling':
        return 'bg-blue-600 text-white';
      case 'Coming Soon':
        return 'bg-purple-600 text-white';
      case 'Now Selling':
        return 'bg-green-600 text-white';
      case 'Completed':
        return 'bg-gray-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300',
        'hover:shadow-lg hover:scale-[1.02] cursor-pointer',
        project.featured && 'ring-2 ring-amber-400',
        sizeClasses[size],
        className
      )}
      onClick={onClick}
    >
      {/* Project Thumbnail */}
      <div className="relative">
        <ImageWithFallback
          src={project.thumbnail}
          alt={project.name}
          className={cn('w-full object-cover', imageHeights[size])}
        />
        
        {/* Status Badge */}
        <Badge className={cn(
          'absolute top-3 right-3',
          getStatusColor(project.status)
        )}>
          {project.status}
        </Badge>
        
        {/* Featured Badge */}
        {project.featured && (
          <Badge className="absolute top-3 left-3 bg-amber-400 text-gray-900">
            Featured
          </Badge>
        )}
      </div>

      {/* Project Details */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className={cn(
            'font-semibold text-gray-900',
            size === 'small' ? 'text-lg' : size === 'large' ? 'text-xl' : 'text-lg'
          )}>
            {project.name}
          </h3>
          
          {project.location && (
            <div className="flex items-center text-gray-500 text-sm mt-1">
              <MapPin className="w-3 h-3 mr-1" />
              <span>{project.location}</span>
            </div>
          )}
        </div>

        {/* Project Description */}
        <p className={cn(
          'text-gray-600 leading-relaxed',
          size === 'small' ? 'text-base' : size === 'large' ? 'text-lg' : 'text-base'
        )}>
          {project.description}
        </p>

        {/* Timeline */}
        {project.timeline && (
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{project.timeline}</span>
          </div>
        )}

        {/* CTA Button */}
        <Button 
          variant="outline" 
          className={cn(
            'w-full',
            size === 'small' ? 'text-sm' : 'text-base'
          )}
        >
          View Project
        </Button>
      </div>
    </div>
  );
};

// Property List Item (for list view)
interface PropertyListItemProps {
  property: PropertyCardProps['property'];
  onClick?: () => void;
  className?: string;
}

export const PropertyListItem: React.FC<PropertyListItemProps> = ({
  property,
  onClick,
  className,
}) => {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-600 text-white';
      case 'Sold':
        return 'bg-red-600 text-white';
      case 'Reserved':
        return 'bg-orange-600 text-white';
      case 'New':
        return 'bg-blue-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-sm border p-4 transition-all duration-300',
        'hover:shadow-md hover:border-amber-300 cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      <div className="flex space-x-4">
        {/* Property Image */}
        <div className="relative flex-shrink-0">
          <ImageWithFallback
            src={property.image}
            alt={property.title}
            className="w-32 h-24 object-cover rounded-md"
          />
          {property.status && (
            <Badge className={cn(
              'absolute -top-2 -right-2 text-xs',
              getStatusColor(property.status)
            )}>
              {property.status}
            </Badge>
          )}
        </div>

        {/* Property Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {property.title}
            </h3>
            <span className="text-xl font-bold text-green-700 ml-4">
              {property.price}
            </span>
          </div>
          
          {property.location && (
            <div className="flex items-center text-gray-500 text-sm mb-2">
              <MapPin className="w-3 h-3 mr-1" />
              <span>{property.location}</span>
            </div>
          )}

          {/* Property Specs */}
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            {property.beds && (
              <div className="flex items-center">
                <Bed className="w-4 h-4 mr-1" />
                <span>{property.beds} beds</span>
              </div>
            )}
            {property.baths && (
              <div className="flex items-center">
                <Bath className="w-4 h-4 mr-1" />
                <span>{property.baths} baths</span>
              </div>
            )}
            {property.area && (
              <div className="flex items-center">
                <Square className="w-4 h-4 mr-1" />
                <span>{property.area}</span>
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="flex-shrink-0 flex items-center">
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};