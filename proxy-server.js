import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3001;

app.use(cors());

app.get('/proxy', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Failed to fetch: ${response.statusText}`
      });
    }

    const contentType = response.headers.get('content-type');
    const text = await response.text();

    res.set('Content-Type', contentType || 'application/xml');
    res.send(text);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({
      error: 'Failed to fetch the requested URL',
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 CORS Proxy Server running at http://localhost:${PORT}`);
  console.log(`\nExample usage:`);
  console.log(`http://localhost:${PORT}/proxy?url=https://www.youtube.com/feeds/videos.xml?channel_id=UCyxR3ualvHiBvzyhx69aEIw\n`);
});
