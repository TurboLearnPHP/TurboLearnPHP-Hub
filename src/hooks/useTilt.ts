import { useState, useCallback, useRef } from 'react';

interface TiltState {
  rotateX: number;
  rotateY: number;
  scale: number;
  glareX: number;
  glareY: number;
}

interface UseTiltOptions {
  maxTilt?: number; // Maximum rotation in degrees
  scale?: number; // Scale on hover
  perspective?: number; // CSS perspective value
  transitionDuration?: number; // Transition duration in ms
  glareEnabled?: boolean;
}

export function useTilt({
  maxTilt = 15,
  scale = 1.02,
  perspective = 1000,
  transitionDuration = 400,
  glareEnabled = true,
}: UseTiltOptions = {}) {
  const [tilt, setTilt] = useState<TiltState>({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    glareX: 50,
    glareY: 50,
  });
  const [isHovering, setIsHovering] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to element center (0 to 1, centered at 0.5)
    const mouseX = (e.clientX - rect.left) / width;
    const mouseY = (e.clientY - rect.top) / height;
    
    // Calculate rotation (inverted for natural feel)
    const rotateY = (mouseX - 0.5) * maxTilt * 2;
    const rotateX = (0.5 - mouseY) * maxTilt * 2;
    
    // Calculate glare position
    const glareX = mouseX * 100;
    const glareY = mouseY * 100;

    setTilt({
      rotateX,
      rotateY,
      scale,
      glareX,
      glareY,
    });
  }, [maxTilt, scale]);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setTilt({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      glareX: 50,
      glareY: 50,
    });
  }, []);

  const setRef = useCallback((node: HTMLElement | null) => {
    elementRef.current = node;
  }, []);

  const tiltStyle: React.CSSProperties = {
    transform: `perspective(${perspective}px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
    transition: isHovering 
      ? 'transform 0.1s ease-out' 
      : `transform ${transitionDuration}ms cubic-bezier(0.23, 1, 0.32, 1)`,
    transformStyle: 'preserve-3d',
  };

  const glareStyle: React.CSSProperties = glareEnabled ? {
    background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.25) 0%, transparent 60%)`,
    opacity: isHovering ? 1 : 0,
    transition: isHovering ? 'opacity 0.2s ease-out' : 'opacity 0.4s ease-out',
  } : {};

  return {
    ref: setRef,
    tiltStyle,
    glareStyle,
    isHovering,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
}
