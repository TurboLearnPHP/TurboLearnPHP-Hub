import { useState } from 'react';
import { Database, Globe, FileText, Check, AlertCircle, Trash2 } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useFeed } from '../../hooks/useFeed';
import { Header } from '../../components/Header';
import { DataMode } from '../../types';
import { clearFeedCache, clearManualFeed, clearHistory } from '../../utils/storage';
import styles from './Settings.module.css';

export function SettingsPage() {
  const { settings, updateSettings, error } = useApp();
  const { importManualFeed, refreshFeed } = useFeed();
  
  const [xmlInput, setXmlInput] = useState('');
  const [importSuccess, setImportSuccess] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const dataModes: { value: DataMode; label: string; description: string; icon: React.ReactNode }[] = [
    {
      value: 'direct',
      label: 'Direct',
      description: 'Fetch the RSS feed directly from YouTube. This may fail in browsers due to security restrictions.',
      icon: <Globe size={20} />,
    },
    {
      value: 'proxy',
      label: 'Proxy',
      description: 'Use a CORS proxy server to fetch the feed. Enter your proxy URL below.',
      icon: <Database size={20} />,
    },
    {
      value: 'manual',
      label: 'Manual Import',
      description: 'Paste the XML content directly. Works fully offline after import.',
      icon: <FileText size={20} />,
    },
  ];

  const handleModeChange = (mode: DataMode) => {
    updateSettings({ dataMode: mode });
    setImportSuccess(false);
    setLocalError(null);
  };

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

  const handleChannelIdChange = (channelId: string) => {
    updateSettings({ channelId });
    clearFeedCache();
  };

  const handleProxyUrlChange = (proxyUrl: string) => {
    updateSettings({ proxyUrl });
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
          <h2 className={styles.sectionTitle}>
            <Database size={20} />
            Data Mode
          </h2>
          <p className={styles.sectionDescription}>
            Choose how TubeDeck fetches the YouTube RSS feed. Due to browser security restrictions,
            direct fetching often fails. Use Proxy mode with a CORS proxy, or paste the XML manually.
          </p>

          <div className={styles.radioGroup}>
            {dataModes.map((mode) => (
              <label
                key={mode.value}
                className={`${styles.radioOption} ${settings.dataMode === mode.value ? styles.selected : ''}`}
              >
                <input
                  type="radio"
                  name="dataMode"
                  value={mode.value}
                  checked={settings.dataMode === mode.value}
                  onChange={() => handleModeChange(mode.value)}
                  className={styles.radioInput}
                />
                <div className={styles.radioContent}>
                  <span className={styles.radioLabel}>{mode.label}</span>
                  <p className={styles.radioDescription}>{mode.description}</p>
                </div>
              </label>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Channel Configuration</h2>
          
          <div className={styles.field}>
            <label className={styles.label}>Channel ID</label>
            <input
              type="text"
              className={styles.input}
              value={settings.channelId}
              onChange={(e) => handleChannelIdChange(e.target.value)}
              placeholder="UCxxxxxxxxxxxxxxxxxx"
            />
          </div>

          {settings.dataMode === 'proxy' && (
            <div className={styles.field}>
              <label className={styles.label}>Proxy Base URL</label>
              <input
                type="text"
                className={styles.input}
                value={settings.proxyUrl}
                onChange={(e) => handleProxyUrlChange(e.target.value)}
                placeholder="https://your-cors-proxy.com/proxy"
              />
              <p className={styles.sectionDescription} style={{ marginTop: '0.5rem', marginBottom: 0 }}>
                The feed URL will be appended as a url query parameter
              </p>
            </div>
          )}

          {settings.dataMode === 'manual' && (
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
          )}
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
