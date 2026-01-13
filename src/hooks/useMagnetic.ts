import { useRef, useState, useCallback } from 'react';

interface MagneticState {
  x: number;
  y: number;
}

interface UseMagneticOptions {
  strength?: number;
  radius?: number;
}

export function useMagnetic(options: UseMagneticOptions = {}) {
  const { strength = 0.3, radius = 100 } = options;
  const ref = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState<MagneticState>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < radius) {
      const pullStrength = (1 - distance / radius) * strength;
      setOffset({
        x: distanceX * pullStrength,
        y: distanceY * pullStrength,
      });
    }
  }, [strength, radius]);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setOffset({ x: 0, y: 0 });
  }, []);

  const setRef = useCallback((element: HTMLElement | null) => {
    ref.current = element;
  }, []);

  const magneticStyle: React.CSSProperties = {
    transform: `translate(${offset.x}px, ${offset.y}px)`,
    transition: isHovering ? 'transform 0.15s ease-out' : 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
  };

  return {
    ref: setRef,
    magneticStyle,
    isHovering,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
}
