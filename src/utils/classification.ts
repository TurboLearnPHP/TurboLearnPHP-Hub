import { VideoType } from '../types';

const SHORTS_ASPECT_THRESHOLD = 1.2;

export function classifyByThumbnailRatio(
  naturalWidth: number,
  naturalHeight: number
): VideoType {
  if (naturalWidth === 0 || naturalHeight === 0) {
    return 'unknown';
  }
  
  const aspectRatio = naturalHeight / naturalWidth;
  
  if (aspectRatio > SHORTS_ASPECT_THRESHOLD) {
    return 'short';
  }
  
  return 'video';
}

export function loadImageAndClassify(
  thumbnailUrl: string
): Promise<VideoType> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const type = classifyByThumbnailRatio(img.naturalWidth, img.naturalHeight);
      resolve(type);
    };
    
    img.onerror = () => {
      resolve('unknown');
    };
    
    img.src = thumbnailUrl;
  });
}

export function getShortsEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}

export function getVideoEmbedUrl(videoId: string, autoplay: boolean = false): string {
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    autoplay: autoplay ? '1' : '0',
  });
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

export function getYouTubeWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export function getShortsUrl(videoId: string): string {
  return `https://www.youtube.com/shorts/${videoId}`;
}
