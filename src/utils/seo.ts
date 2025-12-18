import { config } from '../config';

export function updateSEOTags() {
  // Update title
  document.title = config.site.title;

  // Update or create meta tags
  const metaTags = [
    { name: 'description', content: config.site.description },
    { name: 'author', content: config.seo.author },
    { name: 'keywords', content: config.seo.keywords },

    // Open Graph
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: config.site.title },
    { property: 'og:description', content: config.site.description },
    { property: 'og:image', content: config.seo.ogImage },
    { property: 'og:url', content: config.site.url },

    // Twitter Card
    { name: 'twitter:card', content: config.seo.twitterCard },
    { name: 'twitter:title', content: config.site.title },
    { name: 'twitter:description', content: config.site.description },
    { name: 'twitter:image', content: config.seo.ogImage },
  ];

  metaTags.forEach(({ name, property, content }) => {
    const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
    let element = document.querySelector(selector);

    if (!element) {
      element = document.createElement('meta');
      if (name) element.setAttribute('name', name);
      if (property) element.setAttribute('property', property);
      document.head.appendChild(element);
    }

    element.setAttribute('content', content);
  });
}
