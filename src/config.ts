export const config = {
    // Site Information
    site: {
        name: 'TurboLearnPHP',
        title: 'TurboLearnPHP Video Hub - Daily PHP Insights & Clean Code Tips',
        description: 'Master PHP with TurboLearnPHP\'s fast tips and mini-lessons. Real-world code, problem-solving techniques, and clean-coding practices for backend developers.',
        url: 'https://www.youtube.com/@TurboLearnPHP', // Update with your actual domain
    },

    // SEO Meta Tags
    seo: {
        keywords: 'PHP programming, PHP tutorials, backend development, clean code PHP, PHP tips, PHP Shorts, PHP best practices, web development, server-side programming',
        author: 'TurboLearnPHP',
        ogImage: 'https://i.ytimg.com/vi/Kw1PxeOnRhk/hqdefault.jpg',
        twitterCard: 'summary_large_image',
    },

    // YouTube Channel
    youtube: {
        channelId: 'UCyxR3ualvHiBvzyhx69aEIw',
        channelUrl: 'https://www.youtube.com/@TurboLearnPHP',
        channelName: 'TurboLearnPHP',
    },

    // Data Source
    data: {
        feedFile: '/data.xml', // XML feed file path
        cacheEnabled: true,
        cacheTTL: 15 * 60 * 1000, // 15 minutes
    },

    // UI Settings
    ui: {
        logo: {
            text: 'TurboLearnPHP',
            image: '/logo.png',
        },
        theme: {
            default: 'dark', // 'light' | 'dark' | 'system'
        },
        grid: {
            maxKeywordsPerCard: 3, // Keywords shown on video thumbnails
            maxKeywordsInHeader: 20, // Popular tags in header
            maxKeywordsInCardFooter: 5, // Keywords shown below video title
        },
    },

    // Content
    content: {
        about: {
            title: 'TurboLearnPHP Video Hub',
            subtitle: 'Your gateway to mastering PHP',
            description: 'Welcome to the TurboLearnPHP Video Hub – your gateway to mastering PHP with daily insights, real-world code examples, and clean-coding techniques that sharpen your backend development skills.',
            channelDescription: 'TurboLearnPHP is a YouTube channel delivering fast PHP tips and mini-lessons focused on backend development excellence. Each video provides practical insights with real-world code, problem-solving techniques, and clean-coding practices to help you become a better PHP developer.',
            features: [
                {
                    title: 'Fast PHP Tips',
                    description: 'Quick, actionable PHP lessons and mini-tutorials delivered in minutes',
                },
                {
                    title: 'Clean Code Practices',
                    description: 'Best practices for writing maintainable, professional PHP code',
                },
                {
                    title: 'Real-World Examples',
                    description: 'Practical PHP solutions to common backend development challenges',
                },
                {
                    title: 'Backend Techniques',
                    description: 'Deep dives into PHP fundamentals, patterns, and modern approaches',
                },
                {
                    title: 'Problem-Solving',
                    description: 'Smart tricks and techniques to solve PHP development challenges efficiently',
                },
            ],
        },
        privacy: {
            title: 'Privacy Policy',
            sections: [
                {
                    title: 'Your Privacy Matters',
                    content: 'TurboLearnPHP Video Hub is built with privacy as a core principle. This is a client-side application that runs entirely in your browser with zero tracking, zero data collection, and zero external servers storing your information.',
                },
            ],
        },
    },

    // Features
    features: {
        autoplay: true,
        adsEnabled: true,
        continueWatching: true,
        miniPlayer: true,
        keywordFiltering: true,
    },

    // Advertisement Banners
    ads: {
        enabled: true,
        banners: [
            // Vertical ads (9:16 aspect ratio)
            {
                id: 'banner-1',
                image: '/ads/banner-1.png',
                link: 'https://lovable.dev/invite/1T87B54',
                alt: 'Lovable 1',
                target: '_blank',
                format: 'vertical', // 9:16
            },
            {
                id: 'banner-2',
                image: '/ads/banner-2.png',
                link: 'https://lovable.dev/invite/1T87B54',
                alt: 'Lovable 2',
                target: '_blank',
                format: 'vertical', // 9:16
            },
            {
                id: 'banner-3',
                image: '/ads/banner-3.png',
                link: 'https://lovable.dev/invite/1T87B54',
                alt: 'Lovable 3',
                target: '_blank',
                format: 'vertical', // 9:16
            },
            // Horizontal ad (728x90)
            {
                id: 'banner-4',
                image: '/ads/banner-4.png',
                link: 'https://lovable.dev/invite/1T87B54',
                alt: 'Lovable Horizontal',
                target: '_blank',
                format: 'horizontal', // 728x90
            },
            // Square ad (1:1)
            {
                id: 'banner-5',
                image: '/ads/banner-5.png',
                link: 'https://lovable.dev/invite/1T87B54',
                alt: 'Lovable Square',
                target: '_blank',
                format: 'square', // 1:1
            },
        ],
        // Display settings
        displayFrequency: 6, // Show ad every N videos in feed
        positions: {
            feedGrid: true, // Show in feed grid
            sidebar: false, // Show in sidebar (if implemented)
            header: false, // Show in header (if implemented)
        },
    },
};

export type Config = typeof config;
