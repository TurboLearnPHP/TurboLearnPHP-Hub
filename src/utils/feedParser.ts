import { FeedItem, ParsedFeedResult } from '../types';

export function parseYouTubeFeedXml(xmlText: string): ParsedFeedResult {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, 'application/xml');
  
  const parseError = doc.querySelector('parsererror');
  if (parseError) {
    throw new Error('Invalid XML format - please check the feed content');
  }
  
  const feed = doc.querySelector('feed');
  if (!feed) {
    throw new Error('No feed element found - this does not appear to be a valid YouTube RSS feed');
  }
  
  const entries = feed.querySelectorAll('entry');
  if (entries.length === 0) {
    throw new Error('No entries found in the feed - the channel may have no public videos');
  }
  
  const channelTitleEl = feed.querySelector('title');
  const channelTitle = channelTitleEl?.textContent || undefined;
  
  const items: FeedItem[] = [];
  
  entries.forEach((entry) => {
    const videoIdEl = entry.getElementsByTagName('yt:videoId')[0];
    const titleEl = entry.querySelector('title');
    const publishedEl = entry.querySelector('published');
    const authorEl = entry.querySelector('author name');

    const mediaGroup = entry.getElementsByTagName('media:group')[0];
    const thumbnailEl = mediaGroup?.getElementsByTagName('media:thumbnail')[0];
    const categoryEl = mediaGroup?.getElementsByTagName('media:category')[0];
    const keywordsEl = mediaGroup?.getElementsByTagName('media:keywords')[0];

    const videoId = videoIdEl?.textContent;
    const title = titleEl?.textContent;
    const publishedAt = publishedEl?.textContent;
    const authorName = authorEl?.textContent || 'Unknown';
    const thumbnailUrl = thumbnailEl?.getAttribute('url') || '';
    const category = categoryEl?.textContent || undefined;
    const keywordsText = keywordsEl?.textContent || '';
    const keywords = keywordsText
      .split(',')
      .map(k => k.trim())
      .filter(k => k.length > 0);

    if (videoId && title && publishedAt) {
      items.push({
        videoId,
        title,
        publishedAt,
        authorName,
        thumbnailUrl: thumbnailUrl || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        linkUrl: `https://www.youtube.com/watch?v=${videoId}`,
        type: 'unknown',
        category,
        keywords,
      });
    }
  });
  
  return { items, channelTitle };
}

export function validateXmlContent(xmlText: string): boolean {
  if (!xmlText || typeof xmlText !== 'string') {
    return false;
  }
  
  const trimmed = xmlText.trim();
  
  if (!trimmed.includes('<feed') || !trimmed.includes('</feed>')) {
    return false;
  }
  
  if (!trimmed.includes('<entry') || !trimmed.includes('yt:videoId')) {
    return false;
  }
  
  return true;
}

export function buildRssUrl(channelId: string): string {
  return `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
}

export function buildProxyUrl(proxyBase: string, feedUrl: string): string {
  const encodedUrl = encodeURIComponent(feedUrl);
  const separator = proxyBase.includes('?') ? '&' : '?';
  return `${proxyBase}${separator}url=${encodedUrl}`;
}
