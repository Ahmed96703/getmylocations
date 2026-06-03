// Blog post manifest — single source of truth for routing, blog index, and sitemap generation.
export const POSTS = [
  {
    slug: 'enable-location-on-windows-and-mac',
    title: 'Enable Location Services on Windows and Mac — Step-by-Step Fix',
    excerpt:
      'When a website needs your location and your laptop refuses, the problem is usually one of three switches. Here is where each one lives on Windows 10, Windows 11, and macOS, plus the browser settings most people forget.',
    date: '2026-06-03',
    readingTime: 7,
    tags: ['troubleshooting', 'desktop', 'browser'],
  },
  {
    slug: 'enable-location-on-iphone-and-android',
    title: 'Enable Location on iPhone and Android — A Complete Setup Guide',
    excerpt:
      'Three layers control whether an app or website can read your phone’s location: the OS-wide switch, the per-app permission, and the browser’s per-site permission. Walk through all three for iPhone and Android.',
    date: '2026-06-03',
    readingTime: 7,
    tags: ['troubleshooting', 'mobile', 'privacy'],
  },
  {
    slug: 'history-of-latitude-and-longitude',
    title: 'The history of latitude and longitude — from sextants to satellites',
    excerpt:
      'How a Greek scholar, a Yorkshire clockmaker, and a global voting conference in 1884 produced the two numbers your phone shows you today.',
    date: '2026-06-01',
    readingTime: 7,
    tags: ['history', 'coordinates', 'gps'],
  },
  {
    slug: 'why-maps-show-wrong-street',
    title: 'Why your maps app sometimes puts you on the wrong street',
    excerpt:
      'Five common reasons the pin lands at the wrong door, from interpolated house numbers to mislabelled buildings to new streets the database has not caught up with.',
    date: '2026-05-30',
    readingTime: 8,
    tags: ['maps', 'troubleshooting', 'addresses'],
  },
  {
    slug: 'what-your-ip-reveals',
    title: 'What does my IP address really tell apps about me?',
    excerpt:
      'A plain-language look at what an IP lookup actually returns, what it does not, and why mobile data and VPNs make the city wrong so often.',
    date: '2026-05-28',
    readingTime: 7,
    tags: ['ip', 'privacy'],
  },
  {
    slug: 'gps-coordinates-emergencies-aml-guide',
    title: 'GPS Coordinates in Emergencies — The Complete AML & 911/112 Guide',
    excerpt: 'How emergency dispatchers use coordinates, what Advanced Mobile Location does automatically, when to read your own coordinates, and how to communicate them over the phone.',
    date: '2026-05-20',
    readingTime: 10,
    tags: ['emergency', 'gps', 'safety'],
  },
  {
    slug: 'browser-geolocation-api-explained',
    title: 'Browser Geolocation API Explained — What Websites Can and Can\'t See',
    excerpt: 'A complete walkthrough of navigator.geolocation: how it works, what the OS fuses to produce a coordinate, accuracy/permission/error model, and real privacy implications.',
    date: '2026-05-19',
    readingTime: 9,
    tags: ['geolocation', 'api', 'privacy'],
  },
  {
    slug: 'how-to-share-gps-location-safely',
    title: 'How to Share Your GPS Location Safely — iMessage, WhatsApp, Maps, Signal',
    excerpt: 'Six common ways to share your live or static location, what each one actually exposes, and a safety checklist to avoid the most common privacy mistakes.',
    date: '2026-05-18',
    readingTime: 8,
    tags: ['privacy', 'sharing', 'safety'],
  },
  {
    slug: 'how-to-find-your-gps-coordinates',
    title: 'How to Find Your GPS Coordinates (Complete 2026 Guide for Any Device)',
    excerpt: 'The fastest, most accurate ways to get your exact latitude and longitude — on iPhone, Android, Mac, Windows, and any browser. With privacy tips and free tools.',
    date: '2026-05-13',
    readingTime: 7,
    tags: ['gps', 'coordinates', 'guide'],
  },
  {
    slug: 'what-is-ip-location-and-how-accurate',
    title: 'What Is IP Location and How Accurate Is It Really?',
    excerpt: 'IP geolocation explained from scratch: how databases map IPs to cities, why VPNs break it, and the real-world accuracy you can expect compared to GPS.',
    date: '2026-05-12',
    readingTime: 8,
    tags: ['ip', 'geolocation', 'privacy'],
  },
  {
    slug: 'latitude-vs-longitude-explained',
    title: 'Latitude vs Longitude — A Beginner’s Guide to Geographic Coordinates',
    excerpt: 'The clearest explanation of latitude and longitude, decimal degrees vs DMS, how many decimals you need, and the gotchas that confuse beginners.',
    date: '2026-05-11',
    readingTime: 6,
    tags: ['coordinates', 'basics', 'guide'],
  },
  {
    slug: 'how-gps-works',
    title: 'How GPS Works: From Satellites to Your Phone',
    excerpt: 'A clear, no-buzzword walkthrough of how satellites 20,000 km overhead let your phone know exactly where you are — and what can go wrong.',
    date: '2026-05-10',
    readingTime: 9,
    tags: ['gps', 'satellites', 'technology'],
  },
  {
    slug: '10-uses-for-gps-coordinates',
    title: '10 Surprising Uses for GPS Coordinates in Everyday Life',
    excerpt: 'From geocaching to verifying VPNs to precision farming — ten practical things you can do once you know how to read your own latitude and longitude.',
    date: '2026-05-09',
    readingTime: 6,
    tags: ['gps', 'use-cases', 'guide'],
  },
];

export const findPost = (slug) => POSTS.find((p) => p.slug === slug);
