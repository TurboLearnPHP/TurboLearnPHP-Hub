import { useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { useFeed } from '../../hooks/useFeed';
import { Header } from '../../components/Header';
import { Hero } from '../../components/Hero';
import { FeedGrid } from '../../components/FeedGrid';
import { ContinueWatching } from '../../components/ContinueWatching';
import { ErrorState } from '../../components/ErrorState';
import { MiniPlayer } from '../../components/MiniPlayer';
import styles from './Feed.module.css';

export function FeedPage() {
  const { isLoading, error, currentVideoId, items, getFilteredItems, setCurrentVideo } = useApp();
  const { fetchFeed } = useFeed();
  const filteredItems = getFilteredItems();

  const currentItem = currentVideoId
    ? items.find((item) => item.videoId === currentVideoId)
    : null;

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  const handleNextVideo = () => {
    if (!currentVideoId) return;
    const currentIndex = filteredItems.findIndex((item) => item.videoId === currentVideoId);
    if (currentIndex < filteredItems.length - 1) {
      setCurrentVideo(filteredItems[currentIndex + 1].videoId);
    }
  };

  const hasNextVideo = currentVideoId
    ? filteredItems.findIndex((item) => item.videoId === currentVideoId) < filteredItems.length - 1
    : false;

  return (
    <div className={`${styles.feedPage} ${currentItem ? styles.feedPageWithMiniPlayer : ''}`}>
      <Header />

      {error && items.length === 0 ? (
        <ErrorState message={error} />
      ) : (
        <>
          {filteredItems.length > 0 && <Hero items={filteredItems} />}
          <ContinueWatching />
          <FeedGrid items={filteredItems} isLoading={isLoading} />
        </>
      )}
      
      {currentItem && (
        <MiniPlayer
          item={currentItem}
          onNext={handleNextVideo}
          hasNext={hasNextVideo}
          onClose={() => setCurrentVideo(null)}
        />
      )}
    </div>
  );
}
