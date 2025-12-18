export type VideoType = 'video' | 'short' | 'unknown';

export interface FeedItem {
  videoId: string;
  title: string;
  publishedAt: string;
  authorName: string;
  thumbnailUrl: string;
  linkUrl: string;
  type: VideoType;
  category?: string;
  keywords: string[];
}

export interface FeedCache {
  items: FeedItem[];
  cachedAt: number;
  etag?: string;
  ttl: number;
}

export interface ClassificationCache {
  [videoId: string]: VideoType;
}

export interface HistoryEntry {
  videoId: string;
  watchedAt: number;
  progress?: number;
}

export type FilterType = 'all' | 'videos' | 'shorts';

export type SortType = 'newest' | 'oldest';

export interface Settings {
  theme: 'light' | 'dark' | 'system';
  autoplay: boolean;
  adsEnabled: boolean;
}

export interface AppState {
  items: FeedItem[];
  isLoading: boolean;
  error: string | null;
  filter: FilterType;
  sort: SortType;
  searchQuery: string;
  selectedKeyword: string | null;
  currentVideoId: string | null;
  queue: FeedItem[];
  history: HistoryEntry[];
  settings: Settings;
}

export interface ParsedFeedResult {
  items: FeedItem[];
  channelTitle?: string;
}
