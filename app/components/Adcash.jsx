'use client';

import { useEffect } from 'react';
import { afterLoad } from './adQueue.js';

// Adcash AutoTag (zone ungo8strks), on every page from the layout. Added
// 2026-10-24 at the user's request alongside the Monetag Multitag, accepting
// that both networks may show a popunder on the same visit. Which formats
// AutoTag shows is set in the Adcash dashboard.
//
// Adcash's instructions put the library high in <head>; it loads here after
// the page has loaded instead, like the other ad tags, so it cannot delay the
// first paint or the first taps on the tools. AutoTag still runs on that
// first page view.
const LIB = 'https://acscdn.com/script/aclib.js';
const ZONE = 'ungo8strks';

function run() {
  if (window.aclib?.runAutoTag) { window.aclib.runAutoTag({ zoneId: ZONE }); return; }
  if (document.getElementById('aclib')) return; // still loading; its onload runs the tag
  const s = document.createElement('script');
  s.id = 'aclib';
  s.src = LIB;
  s.async = true;
  s.onload = () => window.aclib?.runAutoTag({ zoneId: ZONE });
  document.head.appendChild(s);
}

export default function Adcash() {
  useEffect(() => afterLoad(run), []);
  return null;
}
