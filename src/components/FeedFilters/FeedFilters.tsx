import { Search, X, Tag } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { FilterType, SortType } from '../../types';
import styles from './FeedFilters.module.css';

export function FeedFilters() {
  const { filter, sort, searchQuery, selectedKeyword, setFilter, setSort, setSearch, setSelectedKeyword, getAllKeywords } = useApp();
  const allKeywords = getAllKeywords();

  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'videos', label: 'Videos' },
    { value: 'shorts', label: 'Shorts' },
  ];

  return (
    <div className={styles.filters}>
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

      <div className={styles.filterGroup}>
        {filters.map((f) => (
          <button
            key={f.value}
            className={`${styles.filterButton} ${filter === f.value ? styles.active : ''}`}
            onClick={() => setFilter(f.value)}
            aria-pressed={filter === f.value}
          >
            {f.label}
          </button>
        ))}
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

      {selectedKeyword && (
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
      )}

      {allKeywords.length > 0 && (
        <div className={styles.keywordCloud}>
          <span className={styles.keywordCloudLabel}>Popular tags:</span>
          {allKeywords.slice(0, 15).map((keyword) => (
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
    </div>
  );
}
