import type { Metadata } from 'next';

// Base URL for all relative URLs
const BASE_URL = 'https://gitprofileview.vercel.app';

export const siteMetadata: Metadata = {
  title: 'GitHub Profile Viewer',
  description:
    'Search and explore GitHub profiles and repositories with detailed insights and analytics',
  metadataBase: new URL(BASE_URL),
  keywords: [
    'GitHub',
    'GitHub Profile',
    'Repository Explorer',
    'GitHub Search',
    'Developer Tools',
    'Code Explorer',
    'GitHub Stats',
    'GitHub Analytics',
    'Repository Metrics',
  ],

  // These standard fields work well
  applicationName: 'GitHub Profile Viewer',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  authors: [{ name: 'Aditya Pratama', url: 'https://github.com/aditypraa' }],
  creator: 'Aditya Pratama',
  publisher: 'Aditya Pratama',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  icons: {
    icon: '/github.svg',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    title: 'GitHub Profile Viewer',
    description:
      'Search and explore GitHub profiles and repositories with detailed insights and analytics',
    siteName: 'GitHub Profile Viewer',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GitHub Profile Viewer',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@yaditypraa',
    creator: '@aditypraa',
    title: 'GitHub Profile Viewer',
    description:
      'Search and explore GitHub profiles and repositories with detailed insights and analytics',
    images: ['/og-image.png'],
  },

  alternates: {
    canonical: BASE_URL,
    types: {
      'application/rss+xml': `${BASE_URL}/rss.xml`,
    },
  },
};
