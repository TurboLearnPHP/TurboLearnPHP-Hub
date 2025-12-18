import { SkipBack, SkipForward, ExternalLink } from 'lucide-react';
import { FeedItem } from '../../types';
import { useApp } from '../../contexts/AppContext';
import { getVideoEmbedUrl, getYouTubeWatchUrl, getShortsUrl } from '../../utils/classification';
import styles from './Player.module.css';

interface PlayerProps {
  item: FeedItem;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

export function Player({ item, onPrevious, onNext, hasPrevious = false, hasNext = false }: PlayerProps) {
  const { settings, updateSettings } = useApp();
  const isShort = item.type === 'short';
  
  const embedUrl = getVideoEmbedUrl(item.videoId, settings.autoplay);
  const externalUrl = isShort ? getShortsUrl(item.videoId) : getYouTubeWatchUrl(item.videoId);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className={styles.playerContainer}>
      <div className={`${styles.playerWrapper} ${isShort ? styles.short : ''}`}>
        <iframe
          className={styles.iframe}
          src={embedUrl}
          title={item.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      
      <div className={styles.controls}>
        <div className={styles.navButtons}>
          <button
            className={styles.navButton}
            onClick={onPrevious}
            disabled={!hasPrevious}
            aria-label="Previous video"
          >
            <SkipBack size={20} />
          </button>
          <button
            className={styles.navButton}
            onClick={onNext}
            disabled={!hasNext}
            aria-label="Next video"
          >
            <SkipForward size={20} />
          </button>
        </div>
        
        <div className={styles.autoplayToggle}>
          <span>Autoplay</span>
          <button
            className={`${styles.toggle} ${settings.autoplay ? styles.active : ''}`}
            onClick={() => updateSettings({ autoplay: !settings.autoplay })}
            role="switch"
            aria-checked={settings.autoplay}
            aria-label="Toggle autoplay"
          >
            <span className={styles.toggleKnob} />
          </button>
        </div>
      </div>
      
      <div className={styles.videoInfo}>
        <h1 className={styles.videoTitle}>{item.title}</h1>
        <div className={styles.videoMeta}>
          <span>{item.authorName}</span>
          <span>{formatDate(item.publishedAt)}</span>
          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.externalLink}
          >
            Watch on YouTube
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
