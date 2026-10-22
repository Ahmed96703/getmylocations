'use client';

import { useEffect, useState } from 'react';
import { Card, QueryForm, Status, ResultTable, Examples, Badge } from '../components/toolUi.jsx';
import { fetchPage, toUrl } from '../components/net.js';

// Meta tags that control link previews.
export function readTags(html, base) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const meta = (attr, name) => doc.querySelector(`meta[${attr}="${name}" i]`)?.getAttribute('content')?.trim() || '';
  const abs = (u) => { try { return u ? new URL(u, base).toString() : ''; } catch { return u; } };
  const og = (k) => meta('property', `og:${k}`) || meta('name', `og:${k}`);
  const tw = (k) => meta('name', `twitter:${k}`) || meta('property', `twitter:${k}`);
  return {
    title: doc.querySelector('title')?.textContent?.trim() || '',
    description: meta('name', 'description'),
    canonical: abs(doc.querySelector('link[rel="canonical" i]')?.getAttribute('href')),
    ogTitle: og('title'),
    ogDescription: og('description'),
    ogImage: abs(og('image') || og('image:url') || og('image:secure_url')),
    ogImageAlt: og('image:alt'),
    ogUrl: abs(og('url')),
    ogType: og('type'),
    ogSiteName: og('site_name'),
    twCard: tw('card'),
    twTitle: tw('title'),
    twDescription: tw('description'),
    twImage: abs(tw('image') || tw('image:src')),
    twSite: tw('site'),
  };
}

function useImageSize(src) {
  const [size, setSize] = useState(null);
  useEffect(() => {
    setSize(null);
    if (!src) return undefined;
    let live = true;
    const img = new Image();
    img.onload = () => live && setSize({ w: img.naturalWidth, h: img.naturalHeight });
    img.onerror = () => live && setSize({ error: true });
    img.src = src;
    return () => { live = false; };
  }, [src]);
  return size;
}

function Preview({ t, host }) {
  const title = t.ogTitle || t.twTitle || t.title;
  const desc = t.ogDescription || t.twDescription || t.description;
  const img = t.ogImage || t.twImage;
  return (
    <div className="grid md:grid-cols-2 gap-4 mt-4">
      <div>
        <p className="text-xs font-semibold text-fg-subtle mb-1.5">Facebook, LinkedIn, WhatsApp</p>
        <div className="rounded-lg overflow-hidden border border-line bg-surface">
          {img ? <img src={img} alt="" className="w-full aspect-[1.91/1] object-cover bg-tint/10" /> : <div className="w-full aspect-[1.91/1] bg-tint/10 flex items-center justify-center text-xs text-fg-subtle">No image</div>}
          <div className="p-3 bg-tint/5">
            <p className="text-[11px] uppercase text-fg-subtle">{host}</p>
            <p className="font-semibold text-fg text-sm mt-0.5 line-clamp-2">{title || 'No title'}</p>
            <p className="text-xs text-fg-muted mt-0.5 line-clamp-1">{desc}</p>
          </div>
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-fg-subtle mb-1.5">X (Twitter) · {t.twCard || 'summary'} card</p>
        {(t.twCard || 'summary') === 'summary_large_image' ? (
          <div className="rounded-2xl overflow-hidden border border-line relative">
            {img ? <img src={img} alt="" className="w-full aspect-[1.91/1] object-cover bg-tint/10" /> : <div className="w-full aspect-[1.91/1] bg-tint/10" />}
            <span className="absolute left-2 bottom-2 text-[11px] bg-black/60 text-white px-1.5 py-0.5 rounded">{host}</span>
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden border border-line flex">
            {img ? <img src={img} alt="" className="w-28 h-28 object-cover bg-tint/10 shrink-0" /> : <div className="w-28 h-28 bg-tint/10 shrink-0" />}
            <div className="p-3 min-w-0">
              <p className="text-xs text-fg-subtle">{host}</p>
              <p className="text-sm text-fg line-clamp-2">{t.twTitle || title}</p>
              <p className="text-xs text-fg-muted line-clamp-2">{t.twDescription || desc}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Tool() {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState(null);
  const [res, setRes] = useState(null);

  const run = async (input) => {
    setQ(input);
    const url = toUrl(input);
    if (!url) { setRes(null); setStatus({ type: 'err', msg: 'Enter a web address such as example.com/page.' }); return; }
    setStatus({ type: 'loading', msg: `Reading ${url}…` });
    setRes(null);
    try {
      const p = await fetchPage(url);
      if (!p.body) throw new Error(`The page returned no HTML (status ${p.status}).`);
      setRes({ url: p.finalUrl, tags: readTags(p.body, p.finalUrl) });
      setStatus(null);
    } catch (err) {
      setStatus({ type: 'err', msg: err.message });
    }
  };

  const t = res?.tags;
  const size = useImageSize(t?.ogImage || t?.twImage || '');
  const issues = [];
  if (t) {
    if (!t.ogTitle) issues.push([false, 'og:title is missing; platforms fall back to the page title.']);
    if (!t.ogDescription) issues.push([null, 'og:description is missing.']);
    if (!t.ogImage) issues.push([false, 'og:image is missing, so shares show no picture.']);
    if (size?.error) issues.push([false, 'The og:image could not be loaded.']);
    if (size?.w && (size.w < 1200 || size.h < 630)) issues.push([null, `The image is ${size.w}×${size.h}; 1200×630 or larger looks sharp everywhere.`]);
    if (size?.w && size.w >= 1200) issues.push([true, `Image size ${size.w}×${size.h}.`]);
    if (!t.ogUrl) issues.push([null, 'og:url is missing; add the page’s canonical address.']);
    if (!t.twCard) issues.push([null, 'twitter:card is missing; X shows a small summary card by default.']);
    if (t.ogTitle && t.ogTitle.length > 90) issues.push([null, `og:title is ${t.ogTitle.length} characters; long titles get cut off.`]);
  }

  return (
    <Card title="Check a page’s Open Graph tags">
      <QueryForm value={q} onChange={setQ} onSubmit={run} placeholder="example.com/page" label="Page address" busy={status?.type === 'loading'} />
      <Examples items={['github.com', 'getmylocations.com/radius-map', 'bbc.com']} onPick={run} />
      <Status status={status} />
      {t && (
        <>
          <Preview t={t} host={new URL(res.url).hostname.replace(/^www\./, '')} />
          {issues.length > 0 && (
            <ul className="mt-4 space-y-1.5 text-sm">
              {issues.map(([ok, msg]) => <li key={msg} className="flex gap-2 items-start"><Badge ok={ok}>{ok === true ? 'OK' : ok === false ? 'Fix' : 'Tip'}</Badge><span className="text-fg-muted">{msg}</span></li>)}
            </ul>
          )}
          <ResultTable
            head={['Tag', 'Value']}
            mono={[0]}
            rows={[
              ['og:title', t.ogTitle], ['og:description', t.ogDescription], ['og:image', t.ogImage], ['og:image:alt', t.ogImageAlt],
              ['og:url', t.ogUrl], ['og:type', t.ogType], ['og:site_name', t.ogSiteName],
              ['twitter:card', t.twCard], ['twitter:title', t.twTitle], ['twitter:description', t.twDescription], ['twitter:image', t.twImage], ['twitter:site', t.twSite],
              ['<title>', t.title], ['meta description', t.description], ['canonical', t.canonical],
            ].map(([k, v]) => [k, v ? <span className="break-all">{v}</span> : <span className="text-fg-subtle">—</span>])}
          />
        </>
      )}
    </Card>
  );
}
