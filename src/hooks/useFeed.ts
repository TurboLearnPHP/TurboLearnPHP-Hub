import { useCallback } from 'react';
import { useApp } from '../contexts/AppContext';
import { parseYouTubeFeedXml, validateXmlContent } from '../utils/feedParser';
import { getManualFeed, setManualFeed, getClassificationCache } from '../utils/storage';
import { FeedItem } from '../types';
import { config } from '../config';

export function useFeed() {
  const { setItems, setLoading, setError } = useApp();

  const applyClassificationCache = useCallback((feedItems: FeedItem[]): FeedItem[] => {
    const classificationCache = getClassificationCache();
    return feedItems.map((item) => ({
      ...item,
      type: classificationCache[item.videoId] || item.type,
    }));
  }, []);

  const fetchFeed = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const manualFeed = getManualFeed();
      if (manualFeed && manualFeed.length > 0) {
        const itemsWithClassification = applyClassificationCache(manualFeed);
        setItems(itemsWithClassification);
        setLoading(false);
        return;
      }

      const response = await fetch(config.data.feedFile);
      if (!response.ok) {
        throw new Error('Failed to load feed');
      }

      const xmlText = await response.text();
      if (!validateXmlContent(xmlText)) {
        throw new Error('Invalid feed content');
      }

      const { items: parsedItems } = parseYouTubeFeedXml(xmlText);
      const itemsWithClassification = applyClassificationCache(parsedItems);
      setManualFeed(itemsWithClassification);
      setItems(itemsWithClassification);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load feed';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [setItems, setLoading, setError, applyClassificationCache]);

  const importManualFeed = useCallback((xmlText: string): boolean => {
    if (!validateXmlContent(xmlText)) {
      setError('Invalid XML content - make sure it contains feed, entry, and yt:videoId elements');
      return false;
    }

    try {
      const { items: parsedItems } = parseYouTubeFeedXml(xmlText);
      const itemsWithClassification = applyClassificationCache(parsedItems);
      setManualFeed(itemsWithClassification);
      setItems(itemsWithClassification);
      setError(null);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to parse XML';
      setError(message);
      return false;
    }
  }, [setItems, setError, applyClassificationCache]);

  const refreshFeed = useCallback(() => {
    fetchFeed();
  }, [fetchFeed]);

  return {
    fetchFeed,
    importManualFeed,
    refreshFeed,
  };
}
