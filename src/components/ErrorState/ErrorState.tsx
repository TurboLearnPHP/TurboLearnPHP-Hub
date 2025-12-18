import { Link } from 'react-router-dom';
import { AlertCircle, RefreshCw, Settings } from 'lucide-react';
import { useFeed } from '../../hooks/useFeed';
import styles from './ErrorState.module.css';

interface ErrorStateProps {
  message: string;
}

export function ErrorState({ message }: ErrorStateProps) {
  const { refreshFeed } = useFeed();

  return (
    <div className={styles.errorState}>
      <AlertCircle className={styles.errorIcon} />
      <h2 className={styles.errorTitle}>Unable to load feed</h2>
      <p className={styles.errorMessage}>{message}</p>
      <div className={styles.errorActions}>
        <button
          className={`${styles.button} ${styles.buttonPrimary}`}
          onClick={() => refreshFeed()}
        >
          <RefreshCw size={16} />
          Try again
        </button>
        <Link
          to="/settings"
          className={`${styles.button} ${styles.buttonSecondary}`}
        >
          <Settings size={16} />
          Go to Settings
        </Link>
      </div>
    </div>
  );
}
