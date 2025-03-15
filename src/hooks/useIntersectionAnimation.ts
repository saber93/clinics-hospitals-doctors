
import { useEffect, useRef } from 'react';

export const useIntersectionAnimation = (elementsCount: number) => {
  const fadeRefsRef = useRef<(HTMLElement | null)[]>([]);
  
  useEffect(() => {
    const fadeRefs = fadeRefsRef.current.filter(Boolean) as HTMLElement[];
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
        }
      });
    }, { threshold: 0.1 });
    
    fadeRefs.forEach((ref) => {
      observer.observe(ref);
    });
    
    return () => {
      fadeRefs.forEach((ref) => {
        observer.unobserve(ref);
      });
    };
  }, []);
  
  return { fadeRefsRef };
};

export default useIntersectionAnimation;
