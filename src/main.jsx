import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'leaflet/dist/leaflet.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Core Web Vitals — observe LCP, CLS, INP without third-party libs.
if ('PerformanceObserver' in window) {
  try {
    new PerformanceObserver((l) => l.getEntries().forEach((e) => console.debug('[CWV]', e.entryType, e.startTime, e))).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((l) => l.getEntries().forEach((e) => console.debug('[CWV] CLS', e.value))).observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver((l) => l.getEntries().forEach((e) => console.debug('[CWV] INP', e.duration))).observe({ type: 'event', buffered: true });
  } catch {}
}
