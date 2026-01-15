import { useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FeedItem } from '../../types';
import { useClassification } from '../../hooks/useClassification';
import { useApp } from '../../contexts/AppContext';
import { useGridParallax } from '../../hooks/useParallax';
import { useTilt } from '../../hooks/useTilt';
import { config } from '../../config';
import styles from './FeedCard.module.css';

interface FeedCardProps {
  item: FeedItem;
  index?: number;
}

export function FeedCard({ item, index = 0 }: FeedCardProps) {
  const navigate = useNavigate();
  const { classifyItem } = useClassification();
  const { setSelectedKeyword } = useApp();
  const hasClassified = useRef(false);
  const { ref: parallaxRef, offset } = useGridParallax(index);
  const { ref: tiltRef, tiltStyle, glareStyle, handlers } = useTilt({
    maxTilt: 12,
    scale: 1.03,
    perspective: 800,
  });

  // Combine refs
  const combinedRef = useCallback((node: HTMLElement | null) => {
    parallaxRef(node);
    tiltRef(node);
  }, [parallaxRef, tiltRef]);
  
  const combinedStyle = useMemo(() => ({
    ...tiltStyle,
    transform: `translateY(${offset}px) ${tiltStyle.transform}`,
  }), [offset, tiltStyle]);

  useEffect(() => {
    if (item.type === 'unknown' && !hasClassified.current) {
      hasClassified.current = true;
      classifyItem(item);
    }
  }, [item, classifyItem]);

  const handleClick = () => {
    navigate(`/watch/${item.videoId}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const handleKeywordClick = (keyword: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedKeyword(keyword);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getBadgeLabel = () => {
    switch (item.type) {
      case 'short':
        return 'Short';
      case 'video':
        return 'Video';
      default:
        return '';
    }
  };

  return (
    <article
      ref={combinedRef}
      className={styles.card}
      style={combinedStyle}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseMove={handlers.onMouseMove}
      onMouseEnter={handlers.onMouseEnter}
      onMouseLeave={handlers.onMouseLeave}
      tabIndex={0}
      role="button"
      aria-label={`Watch ${item.title}`}
    >
      {/* 3D Glare overlay */}
      <div className={styles.glareOverlay} style={glareStyle} />
      <div className={`${styles.thumbnailWrapper} ${item.type === 'short' ? styles.short : ''}`}>
        <img
          src={item.thumbnailUrl}
          alt=""
          className={styles.thumbnail}
          loading="lazy"
        />
        {item.keywords && item.keywords.length > 0 && (
          <div className={styles.videoBadges}>
            {item.keywords.slice(0, config.ui.grid.maxKeywordsPerCard).map((keyword, idx) => (
              <button
                key={idx}
                className={styles.videoBadge}
                onClick={(e) => handleKeywordClick(keyword, e)}
                aria-label={`Filter by ${keyword}`}
              >
                {keyword}
              </button>
            ))}
          </div>
        )}
        <div className={styles.videoInfo}>
          <h3 className={styles.title}>{item.title}</h3>
          <time className={styles.date} dateTime={item.publishedAt}>
            {formatDate(item.publishedAt)}
          </time>
        </div>
      </div>
    </article>
  );
}

export function FeedCardSkeleton() {
  return (
    <div className={`${styles.card} ${styles.skeleton}`} aria-hidden="true">
      <div className={styles.thumbnailWrapper}>
        <div className={styles.skeletonShimmer} />
      </div>
      <div className={styles.skeletonContent}>
        <div className={styles.skeletonTitle} />
        <div className={styles.skeletonMeta} />
      </div>
    </div>
  );
}
