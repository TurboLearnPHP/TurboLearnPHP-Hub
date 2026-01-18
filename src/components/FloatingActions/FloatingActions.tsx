import { useState, useEffect } from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';
import styles from './FloatingActions.module.css';

export function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.container}>
      {showScrollTop && (
        <button
          className={styles.floatingButton}
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="Scroll to top"
        >
          <span className={styles.buttonGlow} />
          <span className={styles.buttonRing} />
          <ArrowUp className={styles.icon} />
          {isHovered && (
            <span className={styles.tooltip}>Back to top</span>
          )}
        </button>
      )}
    </div>
  );
}
