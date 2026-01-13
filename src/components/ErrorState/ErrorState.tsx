import { Link } from 'react-router-dom';
import { AlertCircle, RefreshCw, Settings } from 'lucide-react';
import { useFeed } from '../../hooks/useFeed';
import { Button } from '../ui/button';
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
        <Button
          magnetic
          onClick={() => refreshFeed()}
          className={styles.buttonPrimary}
        >
          <RefreshCw size={16} />
          Try again
        </Button>
        <Button
          magnetic
          variant="outline"
          asChild
        >
          <Link to="/settings">
            <Settings size={16} />
            Go to Settings
          </Link>
        </Button>
      </div>
    </div>
  );
}
