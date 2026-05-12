// Blog post manifest — single source of truth for routing, blog index, and sitemap generation.
export const POSTS = [
  {
    slug: 'how-to-find-your-gps-coordinates',
    title: 'How to Find Your GPS Coordinates (Complete 2026 Guide for Any Device)',
    excerpt: 'The fastest, most accurate ways to get your exact latitude and longitude — on iPhone, Android, Mac, Windows, and any browser. With privacy tips and free tools.',
    date: '2026-05-13',
    readingTime: 7,
    tags: ['gps', 'coordinates', 'guide'],
  },
];

export const findPost = (slug) => POSTS.find((p) => p.slug === slug);
