import { useNavigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import styles from './ContinueWatching.module.css';

export function ContinueWatching() {
  const navigate = useNavigate();
  const { history, items } = useApp();

  const historyItems = history
    .slice(0, 10)
    .map((entry) => items.find((item) => item.videoId === entry.videoId))
    .filter(Boolean);

  if (historyItems.length === 0) {
    return null;
  }

  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <section className={styles.continueWatching}>
      <h2 className={styles.sectionTitle}>Continue Watching</h2>
      <div className={styles.scrollContainer}>
        {historyItems.map((item, index) => {
          const historyEntry = history[index];
          return (
            <div
              key={item!.videoId}
              className={styles.item}
              onClick={() => navigate(`/watch/${item!.videoId}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigate(`/watch/${item!.videoId}`);
                }
              }}
            >
              <img
                src={item!.thumbnailUrl}
                alt=""
                className={styles.thumbnail}
                loading="lazy"
              />
              <div className={styles.itemInfo}>
                <p className={styles.itemTitle}>{item!.title}</p>
                <p className={styles.itemMeta}>Watched {formatTimeAgo(historyEntry.watchedAt)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
