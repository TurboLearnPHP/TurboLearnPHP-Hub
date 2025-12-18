import { Header } from '../../components/Header';
import { ExternalLink, Lightbulb, Code2, Sparkles } from 'lucide-react';
import styles from './About.module.css';

export function AboutPage() {
  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.content}>
        <h1 className={styles.title}>Python Peak Video Hub</h1>

        <section className={styles.section}>
          <p className={styles.paragraph}>
            Welcome to the Python Peak Video Hub – your gateway to discovering creative Python programming,
            mind-bending visualizations, and coding techniques that make programming both beautiful and educational.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <Sparkles size={24} />
            About Python Peak
          </h2>
          <p className={styles.paragraph}>
            Python Peak is a YouTube channel dedicated to showcasing the artistic and technical possibilities
            of Python programming. From stunning Turtle graphics animations to practical coding shortcuts,
            each video demonstrates how code can be both functional and visually captivating.
          </p>
          <p className={styles.paragraph}>
            Whether you're learning Python fundamentals, exploring advanced techniques, or simply enjoying
            beautiful algorithmic art, Python Peak delivers bite-sized content that inspires and educates.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <Code2 size={24} />
            What You'll Find Here
          </h2>
          <ul className={styles.list}>
            <li><strong>Python Turtle Graphics:</strong> Mesmerizing animations including fractals, spirals, cosmic patterns, and mathematical visualizations</li>
            <li><strong>Coding Tips & Tricks:</strong> Quick Python shortcuts for sorting, conversions, data manipulation, and problem-solving</li>
            <li><strong>Visual Programming:</strong> Creative coding demonstrations from particle effects to geometric patterns</li>
            <li><strong>Python Fundamentals:</strong> Clear explanations of core concepts like collections, iterators, and built-in functions</li>
            <li><strong>Algorithmic Art:</strong> Where mathematics meets creativity through code</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <Lightbulb size={24} />
            Features of This Hub
          </h2>
          <ul className={styles.list}>
            <li>Browse all Python Peak videos and Shorts in one streamlined interface</li>
            <li>Filter content by type: all videos, full-length videos, or Shorts only</li>
            <li>Search videos by title to find specific topics or techniques</li>
            <li>Continue watching from where you left off with automatic history tracking</li>
            <li>Queue videos for continuous learning sessions</li>
            <li>Clean, distraction-free viewing experience optimized for learning</li>
            <li>Dark and light theme support for comfortable viewing anytime</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Visit Python Peak</h2>
          <p className={styles.paragraph}>
            This hub showcases content from the Python Peak YouTube channel. For the full experience,
            including community interaction, playlists, and channel updates, visit the official channel:
          </p>
          <a
            href="https://www.youtube.com/channel/UCyxR3ualvHiBvzyhx69aEIw"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            <ExternalLink size={18} />
            Visit Python Peak on YouTube
          </a>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About This Platform</h2>
          <p className={styles.paragraph}>
            TubeDeck is built with React and TypeScript, running entirely in your browser with no backend required.
            Videos are loaded through YouTube's public RSS feed, providing a lightweight, privacy-focused viewing experience.
          </p>
          <p className={styles.paragraph}>
            This platform intelligently detects video types using thumbnail analysis, allowing you to easily
            filter between Python Peak's quick Shorts and more detailed tutorial videos.
          </p>
        </section>
      </div>
    </div>
  );
}
