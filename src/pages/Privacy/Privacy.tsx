import { Header } from '../../components/Header';
import { Shield, Lock, Eye, Database } from 'lucide-react';
import styles from './Privacy.module.css';

export function PrivacyPage() {
  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.content}>
        <h1 className={styles.title}>Privacy Policy</h1>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <Shield size={24} />
            Your Privacy Matters
          </h2>
          <p className={styles.paragraph}>
            TurboLearnPHP Video Hub is built with privacy as a core principle. This is a client-side
            application that runs entirely in your browser with zero tracking, zero data collection,
            and zero external servers storing your information.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <Lock size={24} />
            What Data Stays in Your Browser
          </h2>
          <p className={styles.paragraph}>
            To enhance your experience, we store minimal data locally in your browser's storage.
            This data never leaves your device and can be cleared at any time.
          </p>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>
              <Database size={18} />
              Theme Preference
            </h3>
            <p className={styles.cardText}>
              Your choice between light and dark mode is saved so the interface looks the way you prefer.
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>
              <Database size={18} />
              Watch History
            </h3>
            <p className={styles.cardText}>
              The last 50 videos you watched are stored locally to power the "Continue Watching" feature,
              helping you pick up where you left off. This history stays on your device only.
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>
              <Database size={18} />
              Video Classification
            </h3>
            <p className={styles.cardText}>
              When the app determines whether a video is a Short or regular video based on thumbnail dimensions,
              it caches this information locally to avoid re-analyzing on future visits.
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>
              <Database size={18} />
              Feed Data
            </h3>
            <p className={styles.cardText}>
              TurboLearnPHP video information is stored locally so you can browse content quickly
              without repeated network requests.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <Eye size={24} />
            External Connections
          </h2>
          <p className={styles.paragraph}>
            This hub loads content from YouTube's public services. Here's what connects externally:
          </p>
          <ul className={styles.list}>
            <li><strong>Video Content:</strong> All videos are embedded from YouTube. When you watch a video, YouTube's embed player loads and may set cookies according to YouTube's privacy policy.</li>
            <li><strong>Thumbnails:</strong> Video preview images are loaded from YouTube's servers to show you what each video contains.</li>
            <li><strong>Feed Data:</strong> TurboLearnPHP channel information comes from YouTube's public RSS feed.</li>
          </ul>
          <p className={styles.paragraph}>
            YouTube may collect viewing data through their embed player. Please review
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer"> YouTube's Privacy Policy</a> for
            details on how they handle data.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>No Tracking, No Analytics</h2>
          <p className={styles.paragraph}>
            TurboLearnPHP Video Hub does not use:
          </p>
          <ul className={styles.list}>
            <li>Analytics services (Google Analytics, etc.)</li>
            <li>Tracking pixels or cookies</li>
            <li>Third-party advertising networks</li>
            <li>Social media tracking scripts</li>
            <li>Backend servers collecting usage data</li>
          </ul>
          <p className={styles.paragraph}>
            We don't know who you are, what you watch, or how you use this hub – and we like it that way.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Clearing Your Data</h2>
          <p className={styles.paragraph}>
            You have full control over your local data:
          </p>
          <ul className={styles.list}>
            <li>Use your browser's developer tools (F12) to inspect and clear localStorage</li>
            <li>Use private/incognito browsing mode for a completely fresh session with no stored data</li>
            <li>Clear your browser's site data for this domain to reset everything</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Questions?</h2>
          <p className={styles.paragraph}>
            This is an open-source project showcasing TurboLearnPHP's educational content. The code is transparent
            and you can verify that no data collection occurs. If you have privacy concerns or questions, feel free
            to inspect the source code or reach out through the TurboLearnPHP YouTube channel.
          </p>
        </section>
      </div>
    </div>
  );
}
