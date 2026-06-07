
// Utility functions for image optimization

/**
 * Determines if the current environment is development or production
 */
export const isDev = import.meta.env.DEV;

/**
 * Returns an optimized image URL
 * In production, this can connect to an image CDN or transformation service
 */
export const getOptimizedImageUrl = (url?: string, width = 800): string => {
  if (!url) return '/placeholder.svg';
  
  // If it's a relative URL (one from our own server)
  if (url.startsWith('/')) {
    return url;
  }
  
  // For unsplash images, we can use their optimization API
  if (url.includes('unsplash.com')) {
    // Add width parameter if not already present
    if (!url.includes('w=')) {
      return `${url}${url.includes('?') ? '&' : '?'}w=${width}&auto=format&q=80`;
    }
    return url;
  }
  
  // For other external images, return as is
  return url;
};

/**
 * Preloads key images for faster rendering
 */
export const preloadCriticalImages = (urls: string[]) => {
  if (typeof window === 'undefined') return;
  
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = getOptimizedImageUrl(url);
    document.head.appendChild(link);
  });
};
