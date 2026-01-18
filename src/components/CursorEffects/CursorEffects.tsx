import { useCursorSpotlight } from '../../hooks/useCursorSpotlight';
import styles from './CursorEffects.module.css';

export function CursorEffects() {
  const { x, y, isActive } = useCursorSpotlight();

  return (
    <>
      {/* Cursor glow */}
      <div
        className={`${styles.cursorGlow} ${isActive ? styles.active : ''}`}
        style={{
          left: x,
          top: y,
        }}
      />
      {/* Cursor trail */}
      <div
        className={`${styles.cursorTrail} ${isActive ? styles.active : ''}`}
        style={{
          left: x,
          top: y,
        }}
      />
    </>
  );
}
