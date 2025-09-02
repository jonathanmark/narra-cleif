import { useEffect } from 'react';

export function ViewportMeta() {
  useEffect(() => {
    // Set document title
    document.title = 'Narra Cliffs. The Life Above';
    
    // Set viewport meta tag for optimal mobile experience
    const setViewportMeta = () => {
      let viewport = document.querySelector('meta[name=viewport]');
      if (viewport) {
        viewport.setAttribute('content', 
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
        );
      } else {
        viewport = document.createElement('meta');
        viewport.name = 'viewport';
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
        document.getElementsByTagName('head')[0].appendChild(viewport);
      }

      // Add iPhone-specific meta tags
      const iphoneMetas = [
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'msapplication-tap-highlight', content: 'no' }
      ];

      iphoneMetas.forEach(meta => {
        let existingMeta = document.querySelector(`meta[name="${meta.name}"]`);
        if (!existingMeta) {
          existingMeta = document.createElement('meta');
          existingMeta.name = meta.name;
          existingMeta.content = meta.content;
          document.getElementsByTagName('head')[0].appendChild(existingMeta);
        }
      });

      // Set additional meta tags for SEO and social sharing
      const additionalMetas = [
        { name: 'description', content: 'Narra Cliffs - Premium lot development in Binangonan, Rizal featuring golf course views, mountain landscapes, and luxury living. The Life Above.' },
        { name: 'keywords', content: 'Narra Cliffs, real estate, lots, Binangonan, Rizal, golf course, luxury, premium development, mountain views' },
        { name: 'author', content: 'Greendot Land Inc.' },
        { property: 'og:title', content: 'Narra Cliffs. The Life Above' },
        { property: 'og:description', content: 'Premium lot development in Binangonan, Rizal featuring golf course views and luxury living.' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Narra Cliffs. The Life Above' },
        { name: 'twitter:description', content: 'Premium lot development in Binangonan, Rizal featuring golf course views and luxury living.' }
      ];

      additionalMetas.forEach(meta => {
        const selector = meta.property ? `meta[property="${meta.property}"]` : `meta[name="${meta.name}"]`;
        let existingMeta = document.querySelector(selector);
        if (!existingMeta) {
          existingMeta = document.createElement('meta');
          if (meta.property) {
            existingMeta.setAttribute('property', meta.property);
          } else {
            existingMeta.setAttribute('name', meta.name);
          }
          existingMeta.content = meta.content;
          document.getElementsByTagName('head')[0].appendChild(existingMeta);
        } else {
          existingMeta.content = meta.content;
        }
      });
    };

    setViewportMeta();

    // Handle iOS viewport height issues
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  return null;
}