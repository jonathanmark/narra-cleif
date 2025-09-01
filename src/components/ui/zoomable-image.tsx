import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
  zoomLevel?: number;
  zoomSize?: number;
}

export const ZoomableImage: React.FC<ZoomableImageProps> = ({
  src,
  alt,
  className = "",
  zoomLevel = 2,
  zoomSize = 200
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateImageDimensions = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const img = container.querySelector('img');
        
        if (img) {
          setImageDimensions({
            width: img.offsetWidth,
            height: img.offsetHeight
          });
        }
      }
    };

    // Update dimensions after a short delay to ensure image is loaded
    const timer = setTimeout(updateImageDimensions, 100);
    
    window.addEventListener('resize', updateImageDimensions);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateImageDimensions);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Update dimensions when mouse enters to ensure accuracy
    if (containerRef.current) {
      const img = containerRef.current.querySelector('img');
      if (img) {
        setImageDimensions({
          width: img.offsetWidth,
          height: img.offsetHeight
        });
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Calculate the background position for the zoomed view
  const calculateBackgroundPosition = () => {
    if (imageDimensions.width === 0 || imageDimensions.height === 0) return '50% 50%';
    
    const xPercent = (mousePosition.x / imageDimensions.width) * 100;
    const yPercent = (mousePosition.y / imageDimensions.height) * 100;
    return `${xPercent}% ${yPercent}%`;
  };

  // Calculate zoom window position to stay within viewport
  const calculateZoomPosition = () => {
    let left = mousePosition.x + 20;
    let top = mousePosition.y + 20;

    // Adjust if zoom window would go off screen
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      
      if (left + zoomSize > containerRect.width) {
        left = mousePosition.x - zoomSize - 20;
      }
      if (top + zoomSize > containerRect.height) {
        top = mousePosition.y - zoomSize - 20;
      }
      
      // Ensure zoom window doesn't go off the left or top edge
      left = Math.max(10, left);
      top = Math.max(10, top);
    }

    return { left, top };
  };

  const zoomPosition = calculateZoomPosition();

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Image */}
      <ImageWithFallback
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${isHovered ? 'opacity-90' : 'opacity-100'}`}
      />

      {/* Zoom Overlay */}
      <AnimatePresence>
        {isHovered && imageDimensions.width > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute pointer-events-none z-20 border-2 border-white shadow-2xl rounded-lg overflow-hidden bg-white"
            style={{
              left: zoomPosition.left,
              top: zoomPosition.top,
              width: zoomSize,
              height: zoomSize,
            }}
          >
            {/* Zoomed Image */}
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url(${src})`,
                backgroundSize: `${imageDimensions.width * zoomLevel}px ${imageDimensions.height * zoomLevel}px`,
                backgroundPosition: calculateBackgroundPosition(),
                backgroundRepeat: 'no-repeat',
              }}
            />
            
            {/* Zoom Indicator */}
            <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
              {zoomLevel}x
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover Indicator */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-blue-500/5 pointer-events-none"
        />
      )}

      {/* Instructions Text - Desktop Only */}
      <AnimatePresence>
        {!isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-4 left-4 bg-black/70 text-white text-sm px-3 py-2 rounded-lg backdrop-blur-sm hidden md:block"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Hover to zoom and explore details</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};