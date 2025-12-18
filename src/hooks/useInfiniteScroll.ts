import { useState, useEffect, useCallback, useRef } from 'react';

const ITEMS_PER_PAGE = 12;

export function useInfiniteScroll<T>(allItems: T[]) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const visibleItems = allItems.slice(0, visibleCount);
  const hasMore = visibleCount < allItems.length;

  const loadMore = useCallback(() => {
    if (hasMore) {
      setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, allItems.length));
    }
  }, [hasMore, allItems.length]);

  const reset = useCallback(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, []);

  useEffect(() => {
    reset();
  }, [allItems.length, reset]);

  const setLoadMoreElement = useCallback((element: HTMLDivElement | null) => {
    if (loadMoreRef.current) {
      observerRef.current?.unobserve(loadMoreRef.current);
    }

    loadMoreRef.current = element;

    if (!element) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: '100px' }
    );

    observerRef.current.observe(element);
  }, [loadMore]);

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return {
    visibleItems,
    hasMore,
    setLoadMoreElement,
    reset,
  };
}
