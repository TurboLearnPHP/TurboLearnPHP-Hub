import { useState, useEffect, useCallback } from 'react';
import styles from './Sparkles.module.css';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

interface SparklesProps {
  count?: number;
  trigger?: boolean;
  color?: string;
}

export function Sparkles({ count = 6, trigger = false, color }: SparklesProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const generateSparkles = useCallback(() => {
    const newSparkles: Sparkle[] = [];
    for (let i = 0; i < count; i++) {
      newSparkles.push({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 4,
        delay: Math.random() * 0.3,
      });
    }
    setSparkles(newSparkles);

    // Clear sparkles after animation
    setTimeout(() => {
      setSparkles([]);
    }, 1000);
  }, [count]);

  useEffect(() => {
    if (trigger) {
      generateSparkles();
    }
  }, [trigger, generateSparkles]);

  return (
    <div className={styles.sparklesContainer}>
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className={styles.sparkle}
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: sparkle.size,
            height: sparkle.size,
            animationDelay: `${sparkle.delay}s`,
            backgroundColor: color || 'var(--color-accent)',
          }}
        />
      ))}
    </div>
  );
}

// Hook to trigger sparkles
export function useSparkles() {
  const [trigger, setTrigger] = useState(false);

  const sparkle = useCallback(() => {
    setTrigger(true);
    setTimeout(() => setTrigger(false), 50);
  }, []);

  return { trigger, sparkle };
}
