import { Play } from 'lucide-react';
import { FeedItem } from '../../types';
import styles from './Queue.module.css';

interface QueueProps {
  items: FeedItem[];
  currentVideoId: string;
  onSelect: (videoId: string) => void;
}

export function Queue({ items, currentVideoId, onSelect }: QueueProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className={styles.queue}>
      <div className={styles.queueHeader}>
        <h2 className={styles.queueTitle}>Up Next</h2>
        <span className={styles.queueCount}>{items.length} videos</span>
      </div>
      
      <div className={styles.queueList}>
        {items.map((item) => (
          <div
            key={item.videoId}
            className={`${styles.queueItem} ${item.videoId === currentVideoId ? styles.active : ''}`}
            onClick={() => onSelect(item.videoId)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect(item.videoId);
              }
            }}
          >
            <img
              src={item.thumbnailUrl}
              alt=""
              className={styles.queueThumbnail}
              loading="lazy"
            />
            <div className={styles.queueInfo}>
              {item.videoId === currentVideoId && (
                <span className={styles.nowPlaying}>
                  <Play size={12} fill="currentColor" />
                  Now playing
                </span>
              )}
              <p className={styles.queueItemTitle}>{item.title}</p>
              <p className={styles.queueItemMeta}>{formatDate(item.publishedAt)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
