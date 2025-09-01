import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Loader2, MapPin, Phone, Mail, Instagram } from 'lucide-react';
import image_9ab578b1541157adbb5044fbb43ad377130406ff from 'figma:asset/9ab578b1541157adbb5044fbb43ad377130406ff.png';

export function ContactPage() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [connectionType, setConnectionType] = useState<'fast' | 'slow' | 'unknown'>('unknown');

  useEffect(() => {
    // Preconnect to Vimeo for faster loading
    const preconnectLink = document.createElement('link');
    preconnectLink.rel = 'preconnect';
    preconnectLink.href = 'https://player.vimeo.com';
    document.head.appendChild(preconnectLink);

    const preconnectLink2 = document.createElement('link');
    preconnectLink2.rel = 'preconnect';
    preconnectLink2.href = 'https://vimeo.com';
    document.head.appendChild(preconnectLink2);

    // Detect connection speed (if available)
    const detectConnectionSpeed = () => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        if (connection) {
          if (connection.effectiveType === '4g' || connection.downlink > 10) {
            setConnectionType('fast');
          } else if (connection.effectiveType === '3g' || connection.effectiveType === '2g') {
            setConnectionType('slow');
          }
        }
      }
      // Fallback: assume fast connection on desktop, slow on mobile
      if (connectionType === 'unknown') {
        setConnectionType(window.innerWidth > 768 ? 'fast' : 'slow');
      }
    };

    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    detectConnectionSpeed();
    window.addEventListener('resize', checkMobile);

    // Progressive loading: Start with static background, then load video
    const loadingTimer = setTimeout(() => {
      setShowVideo(true);
    }, 500);

    // Enhanced video autoplay handling
    const videoTimer = setTimeout(() => {
      const iframe = document.querySelector('iframe[title="Narra Cliffs Contact Video"]') as HTMLIFrameElement;
      if (iframe) {
        setVideoLoaded(true);
        
        // For mobile devices, try to trigger video play with user interaction
        if (isMobile) {
          const handleFirstTouch = () => {
            const src = iframe.src;
            iframe.src = '';
            iframe.src = src;
            document.removeEventListener('touchstart', handleFirstTouch);
          };
          document.addEventListener('touchstart', handleFirstTouch, { passive: true });
        }
      }
    }, 1000);

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(videoTimer);
      window.removeEventListener('resize', checkMobile);
      document.head.removeChild(preconnectLink);
      document.head.removeChild(preconnectLink2);
    };
  }, [connectionType]);

  const getVideoQuality = () => {
    if (connectionType === 'slow' || isMobile) return '540p';
    if (connectionType === 'fast') return '1080p';
    return '720p'; // default
  };

  const handleVideoLoad = () => {
    setVideoLoaded(true);
    setTimeout(() => {
      setVideoReady(true);
    }, 500);
  };

  const handleVideoError = () => {
    console.warn('Video failed to load, using static background');
    setVideoLoaded(false);
    setVideoReady(true);
  };

  return (
    <div className="min-h-screen relative">
      {/* Content Container - Starts right at header bottom */}
      <div className="relative z-0">
        {/* Contact Information Section with Video Background */}
        <section 
          className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28 min-h-screen flex items-center justify-center relative overflow-hidden"
          style={{backgroundColor: '#E5F0FA'}}
        >
          {/* Enhanced Background Container */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundColor: '#E5F0FA',
              display: 'grid',
              placeItems: 'center',
              overflow: 'hidden'
            }}
          >
            {/* Primary Fallback Background Image - Always visible */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
              style={{
                backgroundImage: `url(${image_9ab578b1541157adbb5044fbb43ad377130406ff})`,
                filter: videoReady ? 'brightness(0.3) blur(2px)' : 'brightness(0.4)',
                transform: 'scale(1.1)',
                opacity: videoReady ? 0.5 : 1
              }}
            />
            
            {/* Loading Indicator */}
            {showVideo && !videoReady && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center z-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-6 border border-white/20">
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                  <p className="text-white text-sm mt-2 text-center">Loading video...</p>
                </div>
              </motion.div>
            )}
            
            {/* Optimized Video Iframe - Conditionally loaded */}
            {showVideo && (
              <motion.iframe 
                src={`https://player.vimeo.com/video/1109379913?badge=0&autopause=0&autoplay=1&loop=1&muted=1&background=1&controls=0&title=0&byline=0&portrait=0&playsinline=1&quality=${getVideoQuality()}&dnt=1&preload=metadata`}
                style={{ 
                  width: 'max(100vw, calc(100vh * (16/9)))',
                  height: 'max(100vh, calc(100vw * (9/16)))',
                  border: 'none',
                  aspectRatio: '16/9',
                  position: 'relative',
                  zIndex: 1,
                  opacity: videoReady ? 1 : 0,
                  transition: 'opacity 0.5s ease-in-out'
                }}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Narra Cliffs Contact Video"
                loading="lazy"
                playsInline
                onLoad={handleVideoLoad}
                onError={handleVideoError}
                initial={{ opacity: 0 }}
                animate={{ opacity: videoReady ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </div>


          
          {/* Contact Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 text-left relative z-10">
            <h1 className="font-garamond text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl 4xl:text-[10rem] text-[rgba(251,255,249,1)] mb-4 sm:mb-6 md:mb-8 text-center">
              Contact Us
            </h1>
            <p className="font-garamond text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl 4xl:text-7xl text-[rgba(251,255,249,0.9)] mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-center">
              Start Living <em>The Life Above</em>
            </p>
            
            {/* Enhanced Contact Information Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 max-w-6xl mx-auto">
              {/* Address Card */}
              <motion.div 
                className="group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative p-6 sm:p-8 lg:p-10 xl:p-12 2xl:p-14 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl transition-all duration-500 group-hover:bg-white/15 group-hover:border-white/30 group-hover:shadow-3xl group-hover:scale-105">
                  {/* Decorative gradient overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-4 sm:mb-6 lg:mb-8">
                      <div className="p-3 sm:p-4 lg:p-5 xl:p-6 rounded-full bg-[#DA743F]/20 backdrop-blur-sm border border-[#DA743F]/30 group-hover:bg-[#DA743F]/30 transition-all duration-300">
                        <MapPin className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-[#DA743F] group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="ml-4 sm:ml-6 lg:ml-8">
                        <h3 className="font-garamond text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-[rgba(229,137,89,1)] mb-1 sm:mb-2 group-hover:text-[#E8854F] transition-colors duration-300">
                          Address
                        </h3>
                      </div>
                    </div>
                    
                    <div className="pl-3 sm:pl-4 lg:pl-6 border-l-2 sm:border-l-3 lg:border-l-4 border-[#DA743F]/30 group-hover:border-[#DA743F]/50 transition-colors duration-300">
                      <p className="font-rotunda text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-white/90 leading-relaxed group-hover:text-white transition-colors duration-300">
                        Eastridge, Binangonan, Rizal
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Email Card */}
              <motion.div 
                className="group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="relative p-6 sm:p-8 lg:p-10 xl:p-12 2xl:p-14 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl transition-all duration-500 group-hover:bg-white/15 group-hover:border-white/30 group-hover:shadow-3xl group-hover:scale-105">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-4 sm:mb-6 lg:mb-8">
                      <div className="p-3 sm:p-4 lg:p-5 xl:p-6 rounded-full bg-[#DA743F]/20 backdrop-blur-sm border border-[#DA743F]/30 group-hover:bg-[#DA743F]/30 transition-all duration-300">
                        <Mail className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-[#DA743F] group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="ml-4 sm:ml-6 lg:ml-8">
                        <h3 className="font-garamond text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-[rgba(228,141,99,1)] mb-1 sm:mb-2 group-hover:text-[#E8854F] transition-colors duration-300">
                          Email
                        </h3>
                      </div>
                    </div>
                    
                    <div className="pl-3 sm:pl-4 lg:pl-6 border-l-2 sm:border-l-3 lg:border-l-4 border-[#DA743F]/30 group-hover:border-[#DA743F]/50 transition-colors duration-300">
                      <a 
                        href="mailto:inquire@narracliffs.com" 
                        className="font-rotunda text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-white/90 hover:text-white transition-all duration-300 underline decoration-[#DA743F]/50 underline-offset-4 hover:decoration-[#DA743F] leading-relaxed block"
                      >
                        inquire@narracliffs.com
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Phone Card */}
              <motion.div 
                className="group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="relative p-6 sm:p-8 lg:p-10 xl:p-12 2xl:p-14 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl transition-all duration-500 group-hover:bg-white/15 group-hover:border-white/30 group-hover:shadow-3xl group-hover:scale-105">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-4 sm:mb-6 lg:mb-8">
                      <div className="p-3 sm:p-4 lg:p-5 xl:p-6 rounded-full bg-[#DA743F]/20 backdrop-blur-sm border border-[#DA743F]/30 group-hover:bg-[#DA743F]/30 transition-all duration-300">
                        <Phone className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-[#DA743F] group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="ml-4 sm:ml-6 lg:ml-8">
                        <h3 className="font-garamond text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-[rgba(237,139,88,1)] mb-1 sm:mb-2 group-hover:text-[#E8854F] transition-colors duration-300">
                          Phone
                        </h3>
                      </div>
                    </div>
                    
                    <div className="pl-3 sm:pl-4 lg:pl-6 border-l-2 sm:border-l-3 lg:border-l-4 border-[#DA743F]/30 group-hover:border-[#DA743F]/50 transition-colors duration-300">
                      <a 
                        href="tel:+639171230321" 
                        className="font-rotunda text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-white/90 hover:text-white transition-all duration-300 underline decoration-[#DA743F]/50 underline-offset-4 hover:decoration-[#DA743F] leading-relaxed block"
                      >
                        +639171230321
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Instagram Card */}
              <motion.div 
                className="group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="relative p-6 sm:p-8 lg:p-10 xl:p-12 2xl:p-14 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl transition-all duration-500 group-hover:bg-white/15 group-hover:border-white/30 group-hover:shadow-3xl group-hover:scale-105">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-4 sm:mb-6 lg:mb-8">
                      <div className="p-3 sm:p-4 lg:p-5 xl:p-6 rounded-full bg-[#DA743F]/20 backdrop-blur-sm border border-[#DA743F]/30 group-hover:bg-[#DA743F]/30 transition-all duration-300">
                        <Instagram className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-[#DA743F] group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="ml-4 sm:ml-6 lg:ml-8">
                        <h3 className="font-garamond text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-[rgba(226,127,77,1)] mb-1 sm:mb-2 group-hover:text-[#E8854F] transition-colors duration-300">
                          Instagram
                        </h3>
                      </div>
                    </div>
                    
                    <div className="pl-3 sm:pl-4 lg:pl-6 border-l-2 sm:border-l-3 lg:border-l-4 border-[#DA743F]/30 group-hover:border-[#DA743F]/50 transition-colors duration-300">
                      <a 
                        href="https://www.instagram.com/narracliffs/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-rotunda text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-white/90 hover:text-white transition-all duration-300 underline decoration-[#DA743F]/50 underline-offset-4 hover:decoration-[#DA743F] leading-relaxed block"
                      >
                        @narracliffs
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

        </section>
      </div>
    </div>
  );
}