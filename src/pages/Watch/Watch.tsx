import { useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { VideoOff, ArrowLeft } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useFeed } from '../../hooks/useFeed';
import { Header } from '../../components/Header';
import { Player } from '../../components/Player';
import { Queue } from '../../components/Queue';
import { AdSlot } from '../../components/AdSlot';
import styles from './Watch.module.css';

export function WatchPage() {
  const { videoId } = useParams<{ videoId: string }>();
  const navigate = useNavigate();
  const { items, settings, addToHistory, setCurrentVideo, getFilteredItems } = useApp();
  const { fetchFeed } = useFeed();
  
  const filteredItems = getFilteredItems();
  const currentItem = items.find((item) => item.videoId === videoId);
  
  const currentIndex = useMemo(() => {
    return filteredItems.findIndex((item) => item.videoId === videoId);
  }, [filteredItems, videoId]);
  
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < filteredItems.length - 1;

  useEffect(() => {
    if (items.length === 0) {
      fetchFeed();
    }
  }, [items.length, fetchFeed]);

  useEffect(() => {
    if (videoId) {
      addToHistory(videoId);
      setCurrentVideo(videoId);
    }
  }, [videoId, addToHistory, setCurrentVideo]);

  const handlePrevious = () => {
    if (hasPrevious) {
      navigate(`/watch/${filteredItems[currentIndex - 1].videoId}`);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      navigate(`/watch/${filteredItems[currentIndex + 1].videoId}`);
    }
  };

  const handleQueueSelect = (selectedVideoId: string) => {
    navigate(`/watch/${selectedVideoId}`);
  };

  if (!currentItem && items.length > 0) {
    return (
      <div className={styles.watchPage}>
        <Header />
        <div className={styles.notFound}>
          <VideoOff className={styles.notFoundIcon} />
          <h1 className={styles.notFoundTitle}>Video not found</h1>
          <p className={styles.notFoundText}>
            This video may not be in the current feed or the video ID is invalid
          </p>
          <Link to="/" className={styles.backButton}>
            <ArrowLeft size={16} />
            Back to feed
          </Link>
        </div>
      </div>
    );
  }

  if (!currentItem) {
    return (
      <div className={styles.watchPage}>
        <Header />
        <div className={styles.notFound}>
          <p className={styles.notFoundText}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.watchPage}>
      <Header />
      <div className={styles.watchContent}>
        <div className={styles.mainColumn}>
          <Player
            item={currentItem}
            onPrevious={handlePrevious}
            onNext={handleNext}
            hasPrevious={hasPrevious}
            hasNext={hasNext}
          />
          {settings.adsEnabled && <AdSlot adIndex={3} />}
        </div>
        <div className={styles.sideColumn}>
          <Queue
            items={filteredItems}
            currentVideoId={videoId || ''}
            onSelect={handleQueueSelect}
          />
          {settings.adsEnabled && <AdSlot adIndex={4} />}
        </div>
      </div>
    </div>
  );
}
