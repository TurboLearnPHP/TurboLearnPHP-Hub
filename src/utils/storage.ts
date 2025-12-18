import { FeedCache, ClassificationCache, HistoryEntry, Settings, FeedItem } from '../types';
import { config } from '../config';

const STORAGE_KEYS = {
  FEED_CACHE: 'tubedeck_feed_cache',
  CLASSIFICATION_CACHE: 'tubedeck_classification_cache',
  HISTORY: 'tubedeck_history',
  SETTINGS: 'tubedeck_settings',
  MANUAL_FEED: 'tubedeck_manual_feed',
};

const DEFAULT_TTL = config.data.cacheTTL;
const MAX_HISTORY_ITEMS = 50;

export function getFeedCache(): FeedCache | null {
  try {
    const cached = localStorage.getItem(STORAGE_KEYS.FEED_CACHE);
    if (!cached) return null;
    
    const parsed: FeedCache = JSON.parse(cached);
    const now = Date.now();
    
    if (now - parsed.cachedAt > parsed.ttl) {
      return null;
    }
    
    return parsed;
  } catch {
    return null;
  }
}

export function setFeedCache(items: FeedItem[], ttl: number = DEFAULT_TTL): void {
  try {
    const cache: FeedCache = {
      items,
      cachedAt: Date.now(),
      ttl,
    };
    localStorage.setItem(STORAGE_KEYS.FEED_CACHE, JSON.stringify(cache));
  } catch (e) {
    console.warn('Failed to cache feed:', e);
  }
}

export function clearFeedCache(): void {
  localStorage.removeItem(STORAGE_KEYS.FEED_CACHE);
}

export function getClassificationCache(): ClassificationCache {
  try {
    const cached = localStorage.getItem(STORAGE_KEYS.CLASSIFICATION_CACHE);
    return cached ? JSON.parse(cached) : {};
  } catch {
    return {};
  }
}

export function setClassification(videoId: string, type: 'video' | 'short'): void {
  try {
    const cache = getClassificationCache();
    cache[videoId] = type;
    localStorage.setItem(STORAGE_KEYS.CLASSIFICATION_CACHE, JSON.stringify(cache));
  } catch (e) {
    console.warn('Failed to cache classification:', e);
  }
}

export function getHistory(): HistoryEntry[] {
  try {
    const history = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return history ? JSON.parse(history) : [];
  } catch {
    return [];
  }
}

export function addToHistory(videoId: string, progress?: number): void {
  try {
    let history = getHistory();
    
    history = history.filter((entry) => entry.videoId !== videoId);
    
    history.unshift({
      videoId,
      watchedAt: Date.now(),
      progress,
    });
    
    if (history.length > MAX_HISTORY_ITEMS) {
      history = history.slice(0, MAX_HISTORY_ITEMS);
    }
    
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
  } catch (e) {
    console.warn('Failed to update history:', e);
  }
}

export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEYS.HISTORY);
}

const DEFAULT_SETTINGS: Settings = {
  theme: config.ui.theme.default as 'light' | 'dark' | 'system',
  autoplay: config.features.autoplay,
  adsEnabled: config.features.adsEnabled,
};

export function getSettings(): Settings {
  try {
    const settings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!settings) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(settings) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function setSettings(settings: Partial<Settings>): Settings {
  try {
    const current = getSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    return updated;
  } catch {
    return getSettings();
  }
}

export function getManualFeed(): FeedItem[] | null {
  try {
    const feed = localStorage.getItem(STORAGE_KEYS.MANUAL_FEED);
    if (!feed) return null;

    const parsed = JSON.parse(feed);
    // Ensure backward compatibility by adding keywords array if missing
    return parsed.map((item: any) => ({
      ...item,
      keywords: item.keywords || [],
    }));
  } catch {
    return null;
  }
}

export function setManualFeed(items: FeedItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.MANUAL_FEED, JSON.stringify(items));
  } catch (e) {
    console.warn('Failed to save manual feed:', e);
  }
}

export function clearManualFeed(): void {
  localStorage.removeItem(STORAGE_KEYS.MANUAL_FEED);
}

export function isOnline(): boolean {
  return navigator.onLine;
}
