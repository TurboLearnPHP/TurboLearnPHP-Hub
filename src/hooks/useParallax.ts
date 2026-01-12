import { useEffect, useRef, useState, useCallback } from 'react';

interface ParallaxOptions {
  speed?: number; // 0 = no movement, 1 = normal scroll, >1 = faster, <1 = slower
  direction?: 'up' | 'down';
}

export function useParallax({ speed = 0.5, direction = 'up' }: ParallaxOptions = {}) {
  const elementRef = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState(0);
  const ticking = useRef(false);

  const updatePosition = useCallback(() => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate how far the element is from the center of the viewport
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = windowHeight / 2;
    const distanceFromCenter = elementCenter - viewportCenter;
    
    // Calculate parallax offset based on distance from center
    const parallaxOffset = distanceFromCenter * speed * (direction === 'up' ? -1 : 1) * 0.1;
    
    setOffset(parallaxOffset);
    ticking.current = false;
  }, [speed, direction]);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(updatePosition);
      ticking.current = true;
    }
  }, [updatePosition]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial calculation
    updatePosition();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, updatePosition]);

  const setRef = useCallback((node: HTMLElement | null) => {
    elementRef.current = node;
    if (node) {
      updatePosition();
    }
  }, [updatePosition]);

  return { ref: setRef, offset };
}

// Hook for grid items with staggered parallax speeds
export function useGridParallax(index: number) {
  // Create varied speeds based on index for visual depth
  const speeds = [0.15, 0.25, 0.35, 0.2, 0.3, 0.4, 0.18, 0.28];
  const speed = speeds[index % speeds.length];
  
  return useParallax({ speed, direction: 'up' });
}
