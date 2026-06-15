// Blog post manifest — single source of truth for routing, blog index, and sitemap generation.
export const POSTS = [
  {
    slug: 'enable-location-on-windows-and-mac',
    title: 'How to Enable Location Services on Windows 10, Windows 11, and Mac',
    excerpt:
      'Step-by-step fix for Windows 10, Windows 11, and macOS: turn on Location Services, allow your browser, reset the per-site permission in Chrome / Safari / Firefox / Edge, and beat the greyed-out toggle problem.',
    date: '2026-06-03',
    readingTime: 9,
    tags: ['troubleshooting', 'desktop', 'browser'],
  },
  {
    slug: 'enable-location-on-iphone-and-android',
    title: 'How to Turn On Location Services on iPhone and Android (Every Setting Explained)',
    excerpt:
      "Step-by-step: enable Location Services on iPhone and Android, fix per-app and per-site permissions, turn on Precise Location, and beat the battery-saver gotcha that silently disables location on Samsung and Xiaomi.",
    date: '2026-06-03',
    readingTime: 9,
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
    title: 'GPS Coordinates in an Emergency — How to Send Your Location to 911 or 112',
    excerpt: 'Exactly how to send your GPS coordinates to a 911 or 112 dispatcher — what AML does automatically, the four-line script to say on the call, and how to read coordinates off any phone.',
    date: '2026-05-20',
    readingTime: 12,
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
    title: 'How to Share Your Location Safely — WhatsApp, Maps, iMessage, Signal Compared',
    excerpt: 'Compare WhatsApp, iMessage, Google Maps, and Signal for sharing your GPS location safely. What each one leaks, durations to pick, and how to stop a share you already sent.',
    date: '2026-05-18',
    readingTime: 10,
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
    title: 'What Is IP Location and How Accurate Is It? (Honest 2026 Numbers)',
    excerpt: 'Country accuracy 95–99%, city accuracy 50–75%, street level basically zero. The real numbers behind IP geolocation, why mobile and VPN break it, and how to check (or hide) your own IP location.',
    date: '2026-05-12',
    readingTime: 10,
    tags: ['ip', 'geolocation', 'privacy'],
  },
  {
    slug: 'latitude-vs-longitude-explained',
    title: 'Latitude vs Longitude — Which Is Which (and the Memory Trick That Sticks)',
    excerpt: 'A clear answer to which is which, plus the order in coordinates, signs, decimal precision, the three formats you will meet, and the antimeridian bug that breaks naive software.',
    date: '2026-05-11',
    readingTime: 8,
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
