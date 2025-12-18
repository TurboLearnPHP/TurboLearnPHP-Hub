import React, { createContext, useContext, useReducer, useEffect, useCallback, ReactNode } from 'react';
import { AppState, FeedItem, FilterType, SortType, Settings, HistoryEntry } from '../types';
import { getSettings, setSettings, getHistory, addToHistory as addToHistoryStorage, clearHistory as clearHistoryStorage, setManualFeed, getManualFeed } from '../utils/storage';
import { parseYouTubeFeedXml } from '../utils/feedParser';
import { config } from '../config';

type Action =
  | { type: 'SET_ITEMS'; payload: FeedItem[] }
  | { type: 'UPDATE_ITEM'; payload: FeedItem }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_FILTER'; payload: FilterType }
  | { type: 'SET_SORT'; payload: SortType }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_SELECTED_KEYWORD'; payload: string | null }
  | { type: 'SET_CURRENT_VIDEO'; payload: string | null }
  | { type: 'SET_QUEUE'; payload: FeedItem[] }
  | { type: 'SET_HISTORY'; payload: HistoryEntry[] }
  | { type: 'SET_SETTINGS'; payload: Settings }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<Settings> };

const initialState: AppState = {
  items: [],
  isLoading: false,
  error: null,
  filter: 'all',
  sort: 'newest',
  searchQuery: '',
  selectedKeyword: null,
  currentVideoId: null,
  queue: [],
  history: [],
  settings: getSettings(),
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map((item) =>
          item.videoId === action.payload.videoId ? action.payload : item
        ),
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'SET_SORT':
      return { ...state, sort: action.payload };
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };
    case 'SET_SELECTED_KEYWORD':
      return { ...state, selectedKeyword: action.payload };
    case 'SET_CURRENT_VIDEO':
      return { ...state, currentVideoId: action.payload };
    case 'SET_QUEUE':
      return { ...state, queue: action.payload };
    case 'SET_HISTORY':
      return { ...state, history: action.payload };
    case 'SET_SETTINGS':
      return { ...state, settings: action.payload };
    case 'UPDATE_SETTINGS':
      const updatedSettings = { ...state.settings, ...action.payload };
      setSettings(updatedSettings);
      return { ...state, settings: updatedSettings };
    default:
      return state;
  }
}

interface AppContextValue extends AppState {
  dispatch: React.Dispatch<Action>;
  setItems: (items: FeedItem[]) => void;
  updateItem: (item: FeedItem) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFilter: (filter: FilterType) => void;
  setSort: (sort: SortType) => void;
  setSearch: (query: string) => void;
  setSelectedKeyword: (keyword: string | null) => void;
  setCurrentVideo: (videoId: string | null) => void;
  setQueue: (queue: FeedItem[]) => void;
  addToHistory: (videoId: string) => void;
  clearHistory: () => void;
  updateSettings: (settings: Partial<Settings>) => void;
  getFilteredItems: () => FeedItem[];
  getAllKeywords: () => string[];
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const history = getHistory();
    dispatch({ type: 'SET_HISTORY', payload: history });

    const existingFeed = getManualFeed();
    if (!existingFeed) {
      fetch(config.data.feedFile)
        .then((res) => res.text())
        .then((xmlText) => {
          const { items } = parseYouTubeFeedXml(xmlText);
          setManualFeed(items);
          dispatch({ type: 'SET_ITEMS', payload: items });
        })
        .catch((err) => {
          console.error('Failed to load default feed:', err);
        });
    } else {
      dispatch({ type: 'SET_ITEMS', payload: existingFeed });
    }
  }, []);

  useEffect(() => {
    const theme = state.settings.theme;
    const root = document.documentElement;
    
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
      root.setAttribute('data-theme', theme);
    }
  }, [state.settings.theme]);

  const setItems = useCallback((items: FeedItem[]) => {
    dispatch({ type: 'SET_ITEMS', payload: items });
  }, []);

  const updateItem = useCallback((item: FeedItem) => {
    dispatch({ type: 'UPDATE_ITEM', payload: item });
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, []);

  const setError = useCallback((error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, []);

  const setFilter = useCallback((filter: FilterType) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  }, []);

  const setSort = useCallback((sort: SortType) => {
    dispatch({ type: 'SET_SORT', payload: sort });
  }, []);

  const setSearch = useCallback((query: string) => {
    dispatch({ type: 'SET_SEARCH', payload: query });
  }, []);

  const setSelectedKeyword = useCallback((keyword: string | null) => {
    dispatch({ type: 'SET_SELECTED_KEYWORD', payload: keyword });
  }, []);

  const setCurrentVideo = useCallback((videoId: string | null) => {
    dispatch({ type: 'SET_CURRENT_VIDEO', payload: videoId });
  }, []);

  const setQueue = useCallback((queue: FeedItem[]) => {
    dispatch({ type: 'SET_QUEUE', payload: queue });
  }, []);

  const addToHistory = useCallback((videoId: string) => {
    addToHistoryStorage(videoId);
    const history = getHistory();
    dispatch({ type: 'SET_HISTORY', payload: history });
  }, []);

  const clearHistory = useCallback(() => {
    clearHistoryStorage();
    dispatch({ type: 'SET_HISTORY', payload: [] });
  }, []);

  const updateSettings = useCallback((settings: Partial<Settings>) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
  }, []);

  const getFilteredItems = useCallback(() => {
    let filtered = [...state.items];

    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(query)
      );
    }

    if (state.selectedKeyword) {
      filtered = filtered.filter((item) =>
        item.keywords && Array.isArray(item.keywords) && item.keywords.some(k => k.toLowerCase() === state.selectedKeyword?.toLowerCase())
      );
    }

    if (state.filter === 'videos') {
      filtered = filtered.filter((item) => item.type === 'video' || item.type === 'unknown');
    } else if (state.filter === 'shorts') {
      filtered = filtered.filter((item) => item.type === 'short');
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();
      return state.sort === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [state.items, state.searchQuery, state.selectedKeyword, state.filter, state.sort]);

  const getAllKeywords = useCallback(() => {
    const keywordSet = new Set<string>();
    state.items.forEach((item) => {
      if (item.keywords && Array.isArray(item.keywords)) {
        item.keywords.forEach((keyword) => {
          if (keyword) keywordSet.add(keyword);
        });
      }
    });
    return Array.from(keywordSet).sort((a, b) => a.localeCompare(b));
  }, [state.items]);

  const value: AppContextValue = {
    ...state,
    dispatch,
    setItems,
    updateItem,
    setLoading,
    setError,
    setFilter,
    setSort,
    setSearch,
    setSelectedKeyword,
    setCurrentVideo,
    setQueue,
    addToHistory,
    clearHistory,
    updateSettings,
    getFilteredItems,
    getAllKeywords,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
