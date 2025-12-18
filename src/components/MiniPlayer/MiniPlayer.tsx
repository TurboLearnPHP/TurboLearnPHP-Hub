import { useNavigate } from 'react-router-dom';
import { X, SkipForward } from 'lucide-react';
import { FeedItem } from '../../types';
import styles from './MiniPlayer.module.css';

interface MiniPlayerProps {
  item: FeedItem;
  onNext?: () => void;
  hasNext?: boolean;
  onClose: () => void;
}

export function MiniPlayer({ item, onNext, hasNext = false, onClose }: MiniPlayerProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/watch/${item.videoId}`);
  };

  return (
    <div className={styles.miniPlayer}>
      <div className={styles.miniPlayerContent}>
        <img
          src={item.thumbnailUrl}
          alt=""
          className={styles.thumbnail}
          onClick={handleClick}
          style={{ cursor: 'pointer' }}
        />
        
        <div className={styles.info} onClick={handleClick} style={{ cursor: 'pointer' }}>
          <p className={styles.title}>{item.title}</p>
          <p className={styles.author}>{item.authorName}</p>
        </div>
        
        <div className={styles.controls}>
          <button
            className={styles.controlButton}
            onClick={onNext}
            disabled={!hasNext}
            aria-label="Next video"
          >
            <SkipForward size={20} />
          </button>
          <button
            className={`${styles.controlButton} ${styles.closeButton}`}
            onClick={onClose}
            aria-label="Close mini player"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
