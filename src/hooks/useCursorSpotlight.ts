import { useState, useCallback, useEffect } from 'react';

interface SpotlightState {
  x: number;
  y: number;
  isActive: boolean;
}

export function useCursorSpotlight() {
  const [spotlight, setSpotlight] = useState<SpotlightState>({
    x: 0,
    y: 0,
    isActive: false,
  });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setSpotlight({
      x: e.clientX,
      y: e.clientY,
      isActive: true,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setSpotlight(prev => ({ ...prev, isActive: false }));
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return spotlight;
}
