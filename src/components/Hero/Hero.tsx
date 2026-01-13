import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Info, Star } from 'lucide-react';
import type { FeedItem } from '../../types';
import styles from './Hero.module.css';

interface HeroProps {
  items: FeedItem[];
  maxSlides?: number;
  autoPlayInterval?: number;
}

export function Hero({ items, maxSlides = 5, autoPlayInterval = 6000 }: HeroProps) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Get featured items (first N items)
  const featuredItems = items.slice(0, maxSlides);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [currentIndex, isTransitioning]);

  const nextSlide = useCallback(() => {
    const next = (currentIndex + 1) % featuredItems.length;
    goToSlide(next);
  }, [currentIndex, featuredItems.length, goToSlide]);

  // Auto-play
  useEffect(() => {
    if (featuredItems.length <= 1) return;

    const timer = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(timer);
  }, [nextSlide, autoPlayInterval, featuredItems.length]);

  if (featuredItems.length === 0) return null;

  const currentItem = featuredItems[currentIndex];
  const kenBurnsClass = [styles.kenBurns1, styles.kenBurns2, styles.kenBurns3][currentIndex % 3];

  const handlePlay = () => {
    navigate(`/watch/${currentItem.videoId}`);
  };


  return (
    <section className={styles.hero}>
      {/* Background Image with Ken Burns */}
      <div className={styles.heroImageWrapper} key={currentIndex}>
        <img
          src={currentItem.thumbnailUrl}
          alt={currentItem.title}
          className={`${styles.heroImage} ${kenBurnsClass}`}
        />
      </div>

      {/* Overlays */}
      <div className={styles.heroOverlay} />
      <div className={styles.heroVignette} />

      {/* Content */}
      <div className={styles.heroContent} key={`content-${currentIndex}`}>
        <span className={styles.featuredBadge}>
          <Star size={12} /> Featured
        </span>

        <h1 className={styles.heroTitle}>{currentItem.title}</h1>

        <div className={styles.heroMeta}>
          {currentItem.authorName && (
            <span className={styles.heroMetaItem}>{currentItem.authorName}</span>
          )}
          {currentItem.publishedAt && (
            <span className={styles.heroMetaItem}>
              {new Date(currentItem.publishedAt).toLocaleDateString()}
            </span>
          )}
          {currentItem.type && (
            <span className={styles.heroMetaItem}>
              {currentItem.type === 'short' ? 'Short' : 'Video'}
            </span>
          )}
        </div>

        <div className={styles.heroActions}>
          <button className={styles.playButton} onClick={handlePlay}>
            <Play size={20} fill="currentColor" />
            Play Now
          </button>
          <button className={styles.moreInfoButton} onClick={handlePlay}>
            <Info size={20} />
            More Info
          </button>
        </div>
      </div>

      {/* Slide Indicators */}
      {featuredItems.length > 1 && (
        <div className={styles.indicators}>
          {featuredItems.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === currentIndex ? styles.indicatorActive : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
