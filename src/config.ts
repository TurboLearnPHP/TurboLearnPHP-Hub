export const config = {
    // Site Information
    site: {
        name: 'Python Peak',
        title: 'Python Peak Video Hub - Creative Python Programming & Visual Coding',
        description: 'Discover Python Peak\'s stunning turtle graphics, coding tips, and algorithmic art. Watch Python Shorts showcasing fractals, animations, and programming techniques.',
        url: 'https://www.youtube.com/channel/UCyxR3ualvHiBvzyhx69aEIw', // Update with your actual domain
    },

    // SEO Meta Tags
    seo: {
        keywords: 'Python programming, Python Turtle graphics, coding tutorials, Python Shorts, algorithmic art, Python tips, visual programming, fractals, Python animations',
        author: 'Python Peak',
        ogImage: 'https://i.ytimg.com/vi/Kw1PxeOnRhk/hqdefault.jpg',
        twitterCard: 'summary_large_image',
    },

    // YouTube Channel
    youtube: {
        channelId: 'UCyxR3ualvHiBvzyhx69aEIw',
        channelUrl: 'https://www.youtube.com/channel/UCyxR3ualvHiBvzyhx69aEIw',
        channelName: 'Python Peak',
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
            text: 'Python Peak',
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
            title: 'Python Peak Video Hub',
            subtitle: 'Your gateway to creative Python programming',
            description: 'Welcome to the Python Peak Video Hub – your gateway to discovering creative Python programming, mind-bending visualizations, and coding techniques that make programming both beautiful and educational.',
            channelDescription: 'Python Peak is a YouTube channel dedicated to showcasing the artistic and technical possibilities of Python programming. From stunning Turtle graphics animations to practical coding shortcuts, each video demonstrates how code can be both functional and visually captivating.',
            features: [
                {
                    title: 'Python Turtle Graphics',
                    description: 'Mesmerizing animations including fractals, spirals, cosmic patterns, and mathematical visualizations',
                },
                {
                    title: 'Coding Tips & Tricks',
                    description: 'Quick Python shortcuts for sorting, conversions, data manipulation, and problem-solving',
                },
                {
                    title: 'Visual Programming',
                    description: 'Creative coding demonstrations from particle effects to geometric patterns',
                },
                {
                    title: 'Python Fundamentals',
                    description: 'Clear explanations of core concepts like collections, iterators, and built-in functions',
                },
                {
                    title: 'Algorithmic Art',
                    description: 'Where mathematics meets creativity through code',
                },
            ],
        },
        privacy: {
            title: 'Privacy Policy',
            sections: [
                {
                    title: 'Your Privacy Matters',
                    content: 'Python Peak Video Hub is built with privacy as a core principle. This is a client-side application that runs entirely in your browser with zero tracking, zero data collection, and zero external servers storing your information.',
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
