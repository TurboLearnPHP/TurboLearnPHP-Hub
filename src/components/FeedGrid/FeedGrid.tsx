import { VideoOff } from 'lucide-react';
import { FeedItem } from '../../types';
import { FeedCard, FeedCardSkeleton } from '../FeedCard';
import { AdSlot } from '../AdSlot';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { useApp } from '../../contexts/AppContext';
import { config } from '../../config';
import styles from './FeedGrid.module.css';

interface FeedGridProps {
  items: FeedItem[];
  isLoading: boolean;
}

export function FeedGrid({ items, isLoading }: FeedGridProps) {
  const { settings } = useApp();
  const { visibleItems, hasMore, setLoadMoreElement } = useInfiniteScroll(items);

  if (isLoading && items.length === 0) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: 12 }).map((_, i) => (
          <FeedCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={styles.grid}>
        <div className={styles.empty}>
          <VideoOff className={styles.emptyIcon} />
          <h2 className={styles.emptyTitle}>No videos found</h2>
          <p className={styles.emptyText}>
            Try adjusting your filters or search query, or refresh the feed to load new content
          </p>
        </div>
      </div>
    );
  }

  const renderItemsWithAds = () => {
    const result: React.ReactNode[] = [];
    let adCounter = 0;

    // Get only vertical ads (first 3 banners)
    const verticalAdsCount = config.ads.banners.filter(b => b.format === 'vertical').length;

    visibleItems.forEach((item, index) => {
      result.push(<FeedCard key={item.videoId} item={item} />);

      // Insert ad based on config frequency
      if (
        config.ads.enabled &&
        config.ads.positions.feedGrid &&
        settings.adsEnabled &&
        (index + 1) % config.ads.displayFrequency === 0 &&
        index < visibleItems.length - 1
      ) {
        // Cycle through only the first 3 vertical banners (0, 1, 2)
        const adIndex = adCounter % verticalAdsCount;
        result.push(<AdSlot key={`ad-${index}`} adIndex={adIndex} />);
        adCounter++;
      }
    });

    return result;
  };

  return (
    <>
      <div className={styles.grid}>
        {renderItemsWithAds()}
      </div>
      {hasMore && (
        <div className={styles.loadMore} ref={setLoadMoreElement}>
          <div className={styles.loader} aria-label="Loading more" />
        </div>
      )}
    </>
  );
}
