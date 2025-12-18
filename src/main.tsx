import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { updateSEOTags } from './utils/seo';

// Update SEO tags on app load
updateSEOTags();

createRoot(document.getElementById('root')!).render(<App />);
