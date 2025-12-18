import { Link } from 'react-router-dom';
import { Sun, Moon, Search, X, Tag } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { SortType } from '../../types';
import { config } from '../../config';
import styles from './Header.module.css';

export function Header() {
  const { settings, updateSettings, searchQuery, selectedKeyword, sort, setSearch, setSelectedKeyword, setSort, getAllKeywords } = useApp();
  const allKeywords = getAllKeywords();

  const toggleTheme = () => {
    const newTheme = settings.theme === 'dark' ? 'light' : 'dark';
    updateSettings({ theme: newTheme });
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link to="/" className={styles.logo}>
          <img src={config.ui.logo.image} alt={config.ui.logo.text} className={styles.logoImage} />
          {config.ui.logo.text}
        </Link>

        <div className={styles.searchWrapper}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search videos by title"
          />
        </div>

        <select
          className={styles.sortSelect}
          value={sort}
          onChange={(e) => setSort(e.target.value as SortType)}
          aria-label="Sort order"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>

        <button
          className={styles.themeToggle}
          onClick={toggleTheme}
          aria-label={settings.theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {settings.theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {selectedKeyword && (
        <div className={styles.selectedKeywordBar}>
          <div className={styles.selectedKeyword}>
            <Tag size={16} />
            <span>{selectedKeyword}</span>
            <button
              className={styles.clearKeyword}
              onClick={() => setSelectedKeyword(null)}
              aria-label="Clear keyword filter"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {allKeywords.length > 0 && (
        <div className={styles.keywordCloud}>
          <span className={styles.keywordCloudLabel}>Popular tags:</span>
          {allKeywords.slice(0, config.ui.grid.maxKeywordsInHeader).map((keyword) => (
            <button
              key={keyword}
              className={`${styles.keywordTag} ${selectedKeyword === keyword ? styles.keywordTagActive : ''}`}
              onClick={() => setSelectedKeyword(keyword === selectedKeyword ? null : keyword)}
            >
              {keyword}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
