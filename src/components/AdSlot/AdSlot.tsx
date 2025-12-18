import { useState, useEffect } from 'react';
import { config } from '../../config';
import styles from './AdSlot.module.css';

interface AdSlotProps {
  variant?: 'default' | 'inline' | 'large';
  adIndex?: number;
}

export function AdSlot({ variant = 'default', adIndex }: AdSlotProps) {
  const [currentAd, setCurrentAd] = useState(0);

  useEffect(() => {
    if (!config.ads.enabled || config.ads.banners.length === 0) return;

    // If specific ad index is provided, use it
    if (adIndex !== undefined) {
      setCurrentAd(adIndex % config.ads.banners.length);
      return;
    }

    // Otherwise rotate ads every 10 seconds
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % config.ads.banners.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [adIndex]);

  if (!config.ads.enabled || config.ads.banners.length === 0) {
    return null;
  }

  const ad = config.ads.banners[currentAd];

  // Determine format class based on ad format or variant prop
  const formatClass = ad.format === 'horizontal'
    ? styles.adSlotHorizontal
    : ad.format === 'square'
    ? styles.adSlotSquare
    : ad.format === 'vertical'
    ? styles.adSlotVertical
    : variant === 'inline'
    ? styles.adSlotInline
    : variant === 'large'
    ? styles.adSlotLarge
    : '';

  return (
    <div className={`${styles.adSlot} ${formatClass}`} aria-label="Advertisement">
      <span className={styles.adLabel}>Ad</span>
      <a
        href={ad.link}
        target={ad.target}
        rel={ad.target === '_blank' ? 'noopener noreferrer' : undefined}
        className={styles.adLink}
      >
        <img
          src={ad.image}
          alt={ad.alt}
          className={styles.adImage}
          loading="lazy"
        />
      </a>
    </div>
  );
}
