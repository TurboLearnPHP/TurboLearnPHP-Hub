import { useState } from 'react';
import { Check, AlertCircle, Trash2 } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useFeed } from '../../hooks/useFeed';
import { Header } from '../../components/Header';
import { clearFeedCache, clearManualFeed, clearHistory } from '../../utils/storage';
import styles from './Settings.module.css';

export function SettingsPage() {
  const { settings, updateSettings, error } = useApp();
  const { importManualFeed, refreshFeed } = useFeed();
  
  const [xmlInput, setXmlInput] = useState('');
  const [importSuccess, setImportSuccess] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleImport = () => {
    setImportSuccess(false);
    setLocalError(null);
    
    if (!xmlInput.trim()) {
      setLocalError('Please paste XML content first');
      return;
    }

    const success = importManualFeed(xmlInput);
    if (success) {
      setImportSuccess(true);
      setXmlInput('');
    }
  };

  const handleClearCache = () => {
    clearFeedCache();
    clearManualFeed();
    refreshFeed();
  };

  const handleClearHistory = () => {
    clearHistory();
    window.location.reload();
  };

  return (
    <div className={styles.settingsPage}>
      <Header />
      <div className={styles.content}>
        <h1 className={styles.title}>Settings</h1>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Manual Feed Import</h2>
          <p className={styles.sectionDescription}>
            Paste the XML content from a YouTube RSS feed to import videos manually.
          </p>
          
          <div className={styles.field}>
            <label className={styles.label}>Paste XML Feed Content</label>
            <textarea
              className={`${styles.input} ${styles.textarea}`}
              value={xmlInput}
              onChange={(e) => setXmlInput(e.target.value)}
              placeholder="Paste the XML content from the YouTube RSS feed here..."
            />
            <button
              className={`${styles.button} ${styles.buttonPrimary}`}
              onClick={handleImport}
            >
              Import Feed
            </button>
            
            {importSuccess && (
              <div className={styles.successMessage}>
                <Check size={16} />
                Feed imported successfully
              </div>
            )}
            
            {(localError || error) && (
              <div className={styles.errorMessage}>
                <AlertCircle size={16} />
                {localError || error}
              </div>
            )}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Playback</h2>
          
          <div className={styles.toggle}>
            <span className={styles.toggleLabel}>Autoplay next video</span>
            <button
              className={`${styles.toggleSwitch} ${settings.autoplay ? styles.active : ''}`}
              onClick={() => updateSettings({ autoplay: !settings.autoplay })}
              role="switch"
              aria-checked={settings.autoplay}
            >
              <span className={styles.toggleKnob} />
            </button>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Display</h2>
          
          <div className={styles.toggle}>
            <span className={styles.toggleLabel}>Show advertisement placeholders</span>
            <button
              className={`${styles.toggleSwitch} ${settings.adsEnabled ? styles.active : ''}`}
              onClick={() => updateSettings({ adsEnabled: !settings.adsEnabled })}
              role="switch"
              aria-checked={settings.adsEnabled}
            >
              <span className={styles.toggleKnob} />
            </button>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Data Management</h2>
          
          <button
            className={`${styles.button} ${styles.buttonDanger}`}
            onClick={handleClearCache}
          >
            <Trash2 size={16} />
            Clear feed cache
          </button>
          
          <button
            className={`${styles.button} ${styles.buttonDanger}`}
            onClick={handleClearHistory}
            style={{ marginLeft: '0.5rem' }}
          >
            <Trash2 size={16} />
            Clear watch history
          </button>
        </section>
      </div>
    </div>
  );
}
