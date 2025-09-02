import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Award, Trees, Play, Loader2, ChevronDown } from 'lucide-react';
import newFallbackImage from 'figma:asset/c0b95d6561670fe18db793b87c3afba0be4be5cd.png';
import narraCliffs from 'figma:asset/d3a1836bb125ffce8bbd7f3abe126f38571c9cc0.png';
import videoPlaceholderImage from 'figma:asset/68a2a261936101d3b4b330bd5d548d060662a971.png';

export function HeroSection({ onVideoFailure }: { onVideoFailure?: (hasFailed: boolean) => void }) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
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
      // Don't set loading state here - only when video actually starts loading
    }, 500); // Small delay to ensure smooth initial load

    // Enhanced video autoplay handling
    const videoTimer = setTimeout(() => {
      const iframe = document.querySelector('iframe[title="Narra Cliffs Intro Video"]') as HTMLIFrameElement;
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
      if (document.head.contains(preconnectLink)) {
        document.head.removeChild(preconnectLink);
      }
      if (document.head.contains(preconnectLink2)) {
        document.head.removeChild(preconnectLink2);
      }
    };
  }, [connectionType]);

  const getVideoQuality = () => {
    if (connectionType === 'slow' || isMobile) return '540p';
    if (connectionType === 'fast') return '1080p';
    return '720p'; // default
  };

  const handleVideoLoad = () => {
    setVideoLoaded(true);
    // Give a brief moment for the video to fully render before transitioning
    setTimeout(() => {
      setVideoReady(true);
      setVideoFailed(false); // Video loaded successfully
    }, 800);
  };

  const handleVideoError = () => {
    console.warn('Video failed to load, using static background');
    setVideoLoaded(false);
    setVideoReady(true);
    setVideoFailed(true); // Video has failed to load
    onVideoFailure?.(true); // Notify that video failed
  };

  return (
      <section id="home" className="relative min-h-screen overflow-hidden" style={{backgroundColor: '#E5F0FA'}}>
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
          {/* Primary Video Placeholder Image - Shows while video loads */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
            style={{
              backgroundImage: `url(${videoPlaceholderImage})`,
              filter: videoReady ? 'brightness(0.3) blur(2px)' : 'brightness(1)', // No dark overlay when video not ready
              transform: 'scale(1.1)',
              opacity: videoReady ? 0.3 : 1
            }}
          />
          
          {/* Secondary Fallback Image - Only if video fails to load */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
            style={{
              backgroundImage: `url(${newFallbackImage})`,
              filter: 'brightness(1)', // No dark overlay on fallback either
              transform: 'scale(1.1)',
              opacity: (!showVideo || (showVideo && !videoLoaded && videoReady)) ? 1 : 0,
              zIndex: -1
            }}
          />
          
          {/* Loading Indicator - Only show after video iframe starts loading */}
          {showVideo && !videoLoaded && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 2.0 }}
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
                zIndex: videoReady ? 2 : 0,
                opacity: videoReady ? 1 : 0,
                transition: 'opacity 0.8s ease-in-out, z-index 0.1s'
              }}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Narra Cliffs Intro Video"
              loading="lazy"
              playsInline
              onLoad={handleVideoLoad}
              onLoadStart={() => {
                // Video iframe has started loading - don't change header yet
              }}
              onError={handleVideoError}
              initial={{ opacity: 0 }}
              animate={{ opacity: videoReady ? 1 : 0 }}
              transition={{ duration: 0.8 }}
            />
          )}
          
          {/* Mobile Touch Overlay - Hidden to remove tap to play button */}
          {/* Removed tap to play button as requested */}
        </div>

        {/* Awards/Partners Badge */}
        <div className="absolute top-20 md:top-24 lg:top-28 xl:top-32 2xl:top-36 4xl:top-40 right-4 md:right-6 flex space-x-2 md:space-x-4 opacity-80">
          <motion.div 
            className="bg-white/20 backdrop-blur-sm rounded-lg p-2 md:p-3"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.3)' }}
            transition={{ duration: 0.2 }}
          >
            <Award className="w-4 h-4 md:w-6 md:h-6 text-white" />
          </motion.div>
          <motion.div 
            className="bg-white/20 backdrop-blur-sm rounded-lg p-2 md:p-3"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.3)' }}
            transition={{ duration: 0.2 }}
          >
            <Trees className="w-4 h-4 md:w-6 md:h-6 text-white" />
          </motion.div>
        </div>
        
        {/* Enhanced Content with perfect center positioning */}
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <motion.div 
            className="text-center max-w-[90vw] mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.div 
              className="text-center relative z-30 flex flex-col items-center justify-center w-full"
              style={{ marginTop: '15px' }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            >
              <p className="font-garamond hero-iphone-16 iphone-16-hero-max text-7xl sm:text-8xl md:text-9xl lg:text-[8rem] xl:text-[10rem] 2xl:text-[11rem] 4xl:text-[12rem] text-white/90 font-medium tracking-wide text-center transform sm:transform-none translate-y-[-60px] sm:translate-y-0">
                The Life<br /><span className="italic">Above</span>
              </p>
            </motion.div>
            
            <motion.p 
              className="font-garamond text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 4xl:text-5xl text-white text-center tracking-wide relative z-30 mt-8 md:mt-12 lg:mt-16 xl:mt-20 2xl:mt-24"
              style={{ fontWeight: 400 }}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.0, delay: 1.2, ease: "easeOut" }}
            >
              Binangonan, Rizal
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll Down Indicator */}
        <motion.div 
          className="absolute bottom-16 sm:bottom-12 md:bottom-8 mobile-scroll-button left-1/2 transform -translate-x-1/2 z-40 flex flex-col items-center cursor-pointer"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.0, ease: "easeOut" }}
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: 'smooth'
            });
          }}
        >
          <motion.div
            className="flex flex-col items-center space-y-2"
            animate={{ 
              y: [0, -8, 0],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.p 
              className="font-rotunda text-white/90 text-sm sm:text-base md:text-lg font-medium tracking-wider uppercase px-4 py-2 rounded-lg text-center"
              style={{ 
                fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
                letterSpacing: '0.15em',
                fontWeight: 600,
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(8px)',
                textAlign: 'center'
              }}
              whileHover={{ scale: 1.05, color: '#ffffff', backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
              transition={{ duration: 0.2 }}
            >
              Scroll Down to Explore
            </motion.p>
            
            <motion.div
              className="relative"
              animate={{ 
                y: [0, 8, 0],
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <ChevronDown 
                className="text-white/90 hover:text-white transition-colors duration-200" 
                style={{ 
                  width: 'clamp(1.5rem, 3vw, 2rem)', 
                  height: 'clamp(1.5rem, 3vw, 2rem)',
                  strokeWidth: 2
                }}
              />
            </motion.div>
            
            {/* Subtle glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-white/20 blur-lg -z-10"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>


      </section>
  );
}