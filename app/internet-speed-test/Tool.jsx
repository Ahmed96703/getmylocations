'use client';

import { useRef, useState } from 'react';
import { Card, Rows } from '../components/toolUi.jsx';

// Speed test against Cloudflare's public speed-test endpoints (the same ones
// speed.cloudflare.com uses), which answer browsers from any site.
const BASE = 'https://speed.cloudflare.com';
const SECONDS = 8;
const STREAMS = 4;
const DOWN_CAP = 200e6; // bytes, so a fast mobile connection does not burn its data
const UP_CAP = 50e6;
const UP_CHUNK = 2e6;

const mbps = (bytes, ms) => (ms > 0 ? (bytes * 8) / (ms / 1000) / 1e6 : 0);
const fmt = (n) => (n >= 100 ? n.toFixed(0) : n >= 10 ? n.toFixed(1) : n.toFixed(2));

async function latency(signal) {
  const times = [];
  let meta = {};
  for (let i = 0; i < 20; i += 1) {
    const t = performance.now();
    const r = await fetch(`${BASE}/__down?bytes=0&r=${Math.random()}`, { cache: 'no-store', signal });
    await r.arrayBuffer();
    times.push(performance.now() - t);
    if (i === 0) meta = { ip: r.headers.get('cf-meta-ip'), colo: r.headers.get('cf-meta-colo'), city: r.headers.get('cf-meta-city'), country: r.headers.get('cf-meta-country'), asn: r.headers.get('cf-meta-asn') };
  }
  const warm = times.slice(2).sort((a, b) => a - b);
  const median = warm[Math.floor(warm.length / 2)];
  const jitter = times.slice(3).reduce((s, t, i) => s + Math.abs(t - times[i + 2]), 0) / (times.length - 3);
  return { ping: median, jitter, meta };
}

// Several parallel streams for SECONDS; onTick(mbps) shows the live value.
async function download(signal, onTick) {
  let bytes = 0;
  const start = performance.now();
  const stop = start + SECONDS * 1000;
  const stream = async () => {
    while (performance.now() < stop && bytes < DOWN_CAP && !signal.aborted) {
      const r = await fetch(`${BASE}/__down?bytes=25000000&r=${Math.random()}`, { cache: 'no-store', signal });
      const reader = r.body.getReader();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        bytes += value.length;
        onTick(mbps(bytes, performance.now() - start));
        if (performance.now() > stop || bytes >= DOWN_CAP) { await reader.cancel(); break; }
      }
    }
  };
  await Promise.all(Array.from({ length: STREAMS }, stream));
  return mbps(bytes, performance.now() - start);
}

async function upload(signal, onTick) {
  const chunk = new Uint8Array(UP_CHUNK);
  for (let i = 0; i < chunk.length; i += 65536) crypto.getRandomValues(chunk.subarray(i, i + 65536));
  let bytes = 0;
  const start = performance.now();
  const stop = start + SECONDS * 1000;
  const stream = async () => {
    while (performance.now() < stop && bytes < UP_CAP && !signal.aborted) {
      await fetch(`${BASE}/__up?r=${Math.random()}`, { method: 'POST', body: chunk, signal });
      bytes += chunk.length;
      onTick(mbps(bytes, performance.now() - start));
    }
  };
  await Promise.all(Array.from({ length: STREAMS }, stream));
  return mbps(bytes, performance.now() - start);
}

export default function Tool() {
  const [phase, setPhase] = useState('idle');
  const [live, setLive] = useState(0);
  const [res, setRes] = useState({});
  const [err, setErr] = useState('');
  const ctrl = useRef(null);

  const start = async () => {
    ctrl.current = new AbortController();
    const { signal } = ctrl.current;
    setErr('');
    setRes({});
    try {
      setPhase('ping');
      const l = await latency(signal);
      setRes((r) => ({ ...r, ...l }));
      setPhase('download');
      setLive(0);
      const d = await download(signal, setLive);
      setRes((r) => ({ ...r, down: d }));
      setPhase('upload');
      setLive(0);
      const u = await upload(signal, setLive);
      setRes((r) => ({ ...r, up: u }));
      setPhase('done');
    } catch (e) {
      setPhase('idle');
      if (e.name !== 'AbortError') setErr('The test could not reach the speed-test server. Check your connection or ad blocker and try again.');
    }
  };

  const busy = ['ping', 'download', 'upload'].includes(phase);
  const big = phase === 'download' || phase === 'upload' ? live : phase === 'done' ? res.down : null;

  return (
    <Card title="Test your internet speed">
      <div className="text-center py-6">
        <p className="text-xs uppercase tracking-[0.18em] text-fg-subtle font-semibold">
          {phase === 'idle' ? 'Ready' : phase === 'ping' ? 'Measuring ping…' : phase === 'download' ? 'Download' : phase === 'upload' ? 'Upload' : 'Download speed'}
        </p>
        <p className="font-display text-6xl font-extrabold text-fg mt-2 tabular-nums">{big != null ? fmt(big) : '—'}</p>
        <p className="text-sm text-fg-muted">Mbps</p>
        <div className="mt-5 flex justify-center gap-2">
          {!busy && <button type="button" className="btn-primary" onClick={start}>{phase === 'done' ? 'Test again' : 'Start test'}</button>}
          {busy && <button type="button" className="btn-ghost" onClick={() => ctrl.current?.abort()}>Stop</button>}
        </div>
      </div>
      {err && <p role="alert" className="bg-rose-500/10 border border-rose-400/30 text-rose-500 rounded-lg p-3 text-sm">{err}</p>}
      <Rows rows={[
        ['Download', res.down != null ? `${fmt(res.down)} Mbps` : ''],
        ['Upload', res.up != null ? `${fmt(res.up)} Mbps` : ''],
        ['Ping (latency)', res.ping != null ? `${res.ping.toFixed(0)} ms` : ''],
        ['Jitter', res.jitter != null ? `${res.jitter.toFixed(1)} ms` : ''],
        ['Your IP', res.meta?.ip && <span className="font-mono">{res.meta.ip}</span>],
        ['Network', res.meta?.asn && `AS${res.meta.asn}`],
        ['Test server', res.meta?.colo && `Cloudflare ${res.meta.colo}${res.meta.city ? ` (near ${res.meta.city})` : ''}`],
      ]} />
      <p className="text-xs text-fg-subtle mt-3">A full test uses up to about {Math.round((DOWN_CAP + UP_CAP) / 1e6)} MB of data on a fast connection, less on slower ones.</p>
    </Card>
  );
}
