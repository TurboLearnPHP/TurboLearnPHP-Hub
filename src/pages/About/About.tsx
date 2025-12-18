import { Header } from '../../components/Header';
import { ExternalLink, Lightbulb, Code2, Sparkles } from 'lucide-react';
import styles from './About.module.css';

export function AboutPage() {
  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.content}>
        <h1 className={styles.title}>TurboLearnPHP Video Hub</h1>

        <section className={styles.section}>
          <p className={styles.paragraph}>
            Welcome to the TurboLearnPHP Video Hub – your gateway to mastering PHP with daily insights,
            real-world code examples, and clean-coding techniques that sharpen your backend development skills.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <Sparkles size={24} />
            About TurboLearnPHP
          </h2>
          <p className={styles.paragraph}>
            TurboLearnPHP is a YouTube channel delivering fast PHP tips and mini-lessons focused on backend
            development excellence. Each video provides practical insights with real-world code, problem-solving
            techniques, and clean-coding practices to help you become a better PHP developer.
          </p>
          <p className={styles.paragraph}>
            Whether you're learning PHP fundamentals, exploring advanced backend patterns, or looking for
            quick problem-solving techniques, TurboLearnPHP delivers bite-sized content that educates
            and empowers you with actionable skills.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <Code2 size={24} />
            What You'll Find Here
          </h2>
          <ul className={styles.list}>
            <li><strong>Fast PHP Tips:</strong> Quick, actionable PHP lessons and mini-tutorials delivered in minutes</li>
            <li><strong>Clean Code Practices:</strong> Best practices for writing maintainable, professional PHP code</li>
            <li><strong>Real-World Examples:</strong> Practical PHP solutions to common backend development challenges</li>
            <li><strong>Backend Techniques:</strong> Deep dives into PHP fundamentals, patterns, and modern approaches</li>
            <li><strong>Problem-Solving:</strong> Smart tricks and techniques to solve PHP development challenges efficiently</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <Lightbulb size={24} />
            Features of This Hub
          </h2>
          <ul className={styles.list}>
            <li>Browse all TurboLearnPHP videos and Shorts in one streamlined interface</li>
            <li>Filter content by type: all videos, full-length videos, or Shorts only</li>
            <li>Search videos by title to find specific PHP topics or techniques</li>
            <li>Continue watching from where you left off with automatic history tracking</li>
            <li>Queue videos for continuous learning sessions</li>
            <li>Clean, distraction-free viewing experience optimized for learning</li>
            <li>Dark and light theme support for comfortable viewing anytime</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Visit TurboLearnPHP</h2>
          <p className={styles.paragraph}>
            This hub showcases content from the TurboLearnPHP YouTube channel. For the full experience,
            including community interaction, playlists, and channel updates, visit the official channel:
          </p>
          <a
            href="https://www.youtube.com/@TurboLearnPHP"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            <ExternalLink size={18} />
            Visit TurboLearnPHP on YouTube
          </a>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About This Platform</h2>
          <p className={styles.paragraph}>
            This hub is built with React and TypeScript, running entirely in your browser with no backend required.
            Videos are loaded through YouTube's public RSS feed, providing a lightweight, privacy-focused viewing experience.
          </p>
          <p className={styles.paragraph}>
            This platform intelligently detects video types using thumbnail analysis, allowing you to easily
            filter between TurboLearnPHP's quick Shorts and more detailed tutorial videos.
          </p>
        </section>
      </div>
    </div>
  );
}
