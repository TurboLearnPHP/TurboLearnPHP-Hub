import { useCallback, useRef } from 'react';
import { useApp } from '../contexts/AppContext';
import { loadImageAndClassify } from '../utils/classification';
import { setClassification, getClassificationCache } from '../utils/storage';
import { FeedItem, VideoType } from '../types';

export function useClassification() {
  const { updateItem } = useApp();
  const pendingClassifications = useRef<Set<string>>(new Set());
  const classificationCache = useRef<Record<string, VideoType>>(getClassificationCache());

  const classifyItem = useCallback(async (item: FeedItem) => {
    if (item.type !== 'unknown') {
      return;
    }

    if (classificationCache.current[item.videoId]) {
      updateItem({ ...item, type: classificationCache.current[item.videoId] });
      return;
    }

    if (pendingClassifications.current.has(item.videoId)) {
      return;
    }

    pendingClassifications.current.add(item.videoId);

    try {
      const type = await loadImageAndClassify(item.thumbnailUrl);
      
      if (type !== 'unknown') {
        setClassification(item.videoId, type);
        classificationCache.current[item.videoId] = type;
        updateItem({ ...item, type });
      }
    } finally {
      pendingClassifications.current.delete(item.videoId);
    }
  }, [updateItem]);

  const classifyItems = useCallback(async (items: FeedItem[]) => {
    const unknownItems = items.filter(
      (item) => item.type === 'unknown' && !pendingClassifications.current.has(item.videoId)
    );

    const batchSize = 5;
    for (let i = 0; i < unknownItems.length; i += batchSize) {
      const batch = unknownItems.slice(i, i + batchSize);
      await Promise.all(batch.map(classifyItem));
    }
  }, [classifyItem]);

  return {
    classifyItem,
    classifyItems,
  };
}
