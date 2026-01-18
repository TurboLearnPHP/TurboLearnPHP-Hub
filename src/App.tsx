import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { FeedPage } from './pages/Feed';
import { WatchPage } from './pages/Watch';
import { CursorEffects } from './components/CursorEffects';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <CursorEffects />
        <Routes>
          <Route path="/" element={<FeedPage />} />
          <Route path="/watch/:videoId" element={<WatchPage />} />
          <Route path="/shorts/:videoId" element={<WatchPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
