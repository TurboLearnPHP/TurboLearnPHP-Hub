import React from 'react';
import styles from './RippleEffect.module.css';

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface RippleEffectProps {
  ripples: Ripple[];
}

export function RippleEffect({ ripples }: RippleEffectProps) {
  return (
    <>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className={styles.ripple}
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
    </>
  );
}
