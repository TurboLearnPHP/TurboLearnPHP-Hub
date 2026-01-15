import { useEffect, useRef, useMemo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';
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
  const [isHovering, setIsHovering] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { ref: parallaxRef, offset } = useGridParallax(index);
  const { ref: tiltRef, tiltStyle, glareStyle, handlers: tiltHandlers } = useTilt({
    maxTilt: 12,
    scale: 1.03,
    perspective: 800,
  });

  // Combine refs
  const combinedRef = useCallback((node: HTMLElement | null) => {
    parallaxRef(node);
    tiltRef(node);
  }, [parallaxRef, tiltRef]);

  // Handle hover with delay for video preview
  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    tiltHandlers.onMouseEnter();
    // Delay video load to prevent accidental triggers
    hoverTimeoutRef.current = setTimeout(() => {
      setShowVideo(true);
    }, 800);
  }, [tiltHandlers]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setShowVideo(false);
    tiltHandlers.onMouseLeave();
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  }, [tiltHandlers]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);
  
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

  // Get YouTube embed URL for preview
  const embedUrl = useMemo(() => {
    return `https://www.youtube.com/embed/${item.videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${item.videoId}&modestbranding=1&playsinline=1`;
  }, [item.videoId]);

  return (
    <article
      ref={combinedRef}
      className={`${styles.card} ${isHovering ? styles.hovering : ''}`}
      style={combinedStyle}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseMove={tiltHandlers.onMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
          className={`${styles.thumbnail} ${showVideo ? styles.thumbnailHidden : ''}`}
          loading="lazy"
        />
        
        {/* Video preview on hover */}
        {showVideo && (
          <div className={styles.videoPreview}>
            <iframe
              src={embedUrl}
              title={`Preview: ${item.title}`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className={styles.videoIframe}
            />
          </div>
        )}

        {/* Play icon indicator while loading video */}
        {isHovering && !showVideo && (
          <div className={styles.playIndicator}>
            <div className={styles.playIconWrapper}>
              <Play className={styles.playIcon} />
            </div>
          </div>
        )}

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
