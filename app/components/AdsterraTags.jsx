'use client';

import { useEffect } from 'react';
import { afterLoad } from './adQueue.js';

// Adsterra page-level tags: Popunder and Social Bar, on every page. Rendered
// once in the layout; they load once per visit, after the page has loaded and
// the browser is idle.
//
// Monetag runs only Popunder and Push (see Monetag.jsx), so the Social Bar is
// the only floating ad besides the sticky footer banner.
const TAGS = [
  'https://abscloud.org/1/14b8bf1b144f52e43edc4bc2c03685d3', // Popunder
  'https://bauval.org/14/d3accd5a03bc2090fbfb2c627084f90b', // Social Bar
];

function addTags() {
  for (const src of TAGS) {
    if (document.querySelector(`script[src="${src}"]`)) continue;
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.dataset.cfasync = 'false';
    document.body.appendChild(s);
  }
}

export default function AdsterraTags() {
  useEffect(() => afterLoad(addTags), []);
  return null;
}
