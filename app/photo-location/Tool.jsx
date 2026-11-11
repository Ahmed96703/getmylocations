'use client';

import { useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import CopyButton from '../components/CopyButton.jsx';
import { track } from '../components/track.js';
import { compass } from '../distance-calculator/dist.js';
import { reverseLookup } from '../address-finder/geocode.js';

const PointsMap = dynamic(() => import('../components/PointsMap.jsx'), {
  ssr: false,
  loading: () => <div className="w-full aspect-[4/3] sm:aspect-[16/10] bg-tint/5 animate-pulse rounded-2xl border border-line" aria-label="Loading map" />,
});

const COLORS = ['#2563eb', '#dc2626', '#16a34a', '#d97706', '#9333ea', '#0891b2', '#db2777', '#4b5563'];

// Read the photo's metadata on this device; the file is never uploaded.
async function readPhoto(file) {
  const exifr = (await import('exifr')).default;
  let tags = null;
  try {
    tags = await exifr.parse(file, { tiff: true, exif: true, gps: true, ifd1: false, xmp: false, icc: false, iptc: false });
  } catch {
    tags = null;
  }
  const lat = tags?.latitude;
  const lon = tags?.longitude;
  const hasGps = Number.isFinite(lat) && Number.isFinite(lon) && !(lat === 0 && lon === 0);
  const taken = tags?.DateTimeOriginal || tags?.CreateDate || null;
  return {
    name: file.name,
    size: file.size,
    url: URL.createObjectURL(file),
    lat: hasGps ? lat : null,
    lon: hasGps ? lon : null,
    altitude: Number.isFinite(tags?.GPSAltitude) ? tags.GPSAltitude * (tags.GPSAltitudeRef === 1 ? -1 : 1) : null,
    heading: Number.isFinite(tags?.GPSImgDirection) ? tags.GPSImgDirection : null,
    taken: taken instanceof Date && !Number.isNaN(taken.getTime()) ? taken : null,
    camera: [tags?.Make, tags?.Model].filter(Boolean).join(' ').replace(/^(\w+) \1 /i, '$1 ').trim() || null,
    lens: tags?.LensModel || null,
    software: tags?.Software || null,
    hasTags: !!tags,
  };
}

const kb = (n) => (n > 1048576 ? `${(n / 1048576).toFixed(1)} MB` : `${Math.round(n / 1024)} KB`);
// EXIF dates carry no time zone, so show them as written in the camera.
const takenText = (d) => d.toLocaleString('en-GB', { timeZone: 'UTC', weekday: 'short', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });

export default function Tool() {
  const [photos, setPhotos] = useState([]);
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const [focus, setFocus] = useState(null);
  const [fitKey, setFitKey] = useState(0);
  const [addr, setAddr] = useState({});
  const input = useRef(null);

  const add = async (files) => {
    const list = [...files].filter((f) => /^image\//.test(f.type) || /\.(heic|heif|jpe?g|png|tiff?|webp|avif|dng)$/i.test(f.name)).slice(0, 20);
    if (!list.length) return;
    setBusy(true);
    const read = await Promise.all(list.map(readPhoto));
    photos.forEach((p) => URL.revokeObjectURL(p.url));
    setPhotos(read);
    setAddr({});
    setFocus(null);
    setFitKey((k) => k + 1);
    setBusy(false);
    track('tool_run');
    // Look up the address of the first photo with a location.
    const first = read.findIndex((p) => p.lat != null);
    if (first >= 0) lookup(first, read[first]);
  };

  const lookup = async (i, p) => {
    setAddr((a) => ({ ...a, [i]: { loading: true } }));
    try {
      const r = await reverseLookup(p.lat.toFixed(5), p.lon.toFixed(5));
      setAddr((a) => ({ ...a, [i]: { text: r?.display_name || 'No address found for this point.' } }));
    } catch (err) {
      setAddr((a) => ({ ...a, [i]: { err: err.message } }));
    }
  };

  const located = photos.filter((p) => p.lat != null);
  const center = located.length ? { lat: located[0].lat, lon: located[0].lon } : null;
  const points = useMemo(() => photos.map((p, i) => (p.lat == null ? null : {
    key: `${i}`,
    lat: p.lat,
    lon: p.lon,
    color: COLORS[i % COLORS.length],
    r: 9,
    tip: `${i + 1}. ${p.name}`,
  })).filter(Boolean), [photos]);

  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <h2 className="text-lg font-bold mb-4">Find where a photo was taken</h2>

      <div
        role="button"
        tabIndex={0}
        onClick={() => input.current?.click()}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), input.current?.click())}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); add(e.dataTransfer.files); }}
        className={`rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition ${drag ? 'border-accent bg-accent/10' : 'border-line hover:border-accent/60 hover:bg-accent/5'}`}
        aria-label="Choose photos to check"
      >
        <p className="text-3xl" aria-hidden="true">📷</p>
        <p className="font-semibold text-fg mt-2">{busy ? 'Reading photos…' : 'Drop photos here, or tap to choose'}</p>
        <p className="text-sm text-fg-muted mt-1">JPEG, HEIC (iPhone), PNG, WebP, TIFF and RAW. Up to 20 at a time. Photos stay on your device.</p>
        <input ref={input} type="file" accept="image/*,.heic,.heif,.dng" multiple className="hidden" onChange={(e) => { add(e.target.files); e.target.value = ''; }} />
      </div>

      {photos.length > 0 && (
        <p className="text-sm font-semibold text-fg my-3" aria-live="polite">
          {located.length
            ? `${located.length} of ${photos.length} photo${photos.length === 1 ? '' : 's'} ${located.length === 1 ? 'has' : 'have'} a GPS location.`
            : `No GPS location in ${photos.length === 1 ? 'this photo' : 'these photos'}. See below for why.`}
        </p>
      )}

      {(located.length > 0 || photos.length === 0) && (
        <>
          <PointsMap center={center} points={points} fitKey={fitKey} focus={focus} label="Map of where the photos were taken" centerTip={photos[0]?.name || 'Photo'} />
          {located.length > 0 && <p className="mt-2 text-xs text-fg-subtle">Each dot is a photo, numbered as in the list.</p>}
        </>
      )}

      {photos.length > 0 && (
        <ol className="mt-5 space-y-3">
          {photos.map((p, i) => (
            <li key={p.url} className="rounded-xl ring-1 ring-line p-3 bg-tint/5 flex gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.url} alt="" className="w-20 h-20 sm:w-28 sm:h-28 rounded-lg object-cover bg-tint/10 shrink-0" onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }} />
              <div className="min-w-0 flex-1 text-sm">
                <p className="font-semibold text-fg break-all">
                  <span className="inline-block w-2.5 h-2.5 rounded-full mr-2" style={{ background: p.lat != null ? COLORS[i % COLORS.length] : 'transparent' }} aria-hidden="true" />
                  {i + 1}. {p.name} <span className="font-normal text-fg-subtle">({kb(p.size)})</span>
                </p>
                {p.lat != null ? (
                  <>
                    <p className="mt-1 flex flex-wrap items-center gap-x-3">
                      <span className="font-mono text-fg">{p.lat.toFixed(6)}, {p.lon.toFixed(6)}</span>
                      <CopyButton text={`${p.lat.toFixed(6)}, ${p.lon.toFixed(6)}`} className="text-xs text-accent hover:underline" />
                    </p>
                    <p className="text-fg-muted mt-0.5">
                      {addr[i]?.loading && 'Finding the address…'}
                      {addr[i]?.text}
                      {addr[i]?.err && <span className="text-rose-500">{addr[i].err}</span>}
                      {!addr[i] && <button type="button" className="text-accent hover:underline" onClick={() => lookup(i, p)}>Find the address</button>}
                    </p>
                  </>
                ) : (
                  <p className="mt-1 text-fg-muted">No GPS location saved in this photo.</p>
                )}
                <ul className="mt-1 text-fg-muted space-y-0.5">
                  {p.taken && <li>Taken {takenText(p.taken)} (camera clock)</li>}
                  {p.camera && <li>Camera: {p.camera}{p.lens && !p.lens.includes(p.camera) ? ` · ${p.lens}` : ''}</li>}
                  {p.altitude != null && <li>Altitude {Math.round(p.altitude)} m</li>}
                  {p.heading != null && <li>Camera facing {compass(p.heading)} ({Math.round(p.heading)}°)</li>}
                  {!p.hasTags && <li>No metadata at all: the photo was probably saved from a messaging app, social network or screenshot.</li>}
                </ul>
                {p.lat != null && (
                  <div className="mt-2 flex flex-wrap gap-x-4">
                    <button type="button" onClick={() => setFocus({ lat: p.lat, lon: p.lon })} className="text-accent hover:underline">Show on map</button>
                    <a href={`https://www.google.com/maps/search/?api=1&query=${p.lat.toFixed(6)},${p.lon.toFixed(6)}`} target="_blank" rel="noopener" className="text-accent hover:underline">Open in Google Maps</a>
                    <a href={`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${p.lat.toFixed(6)},${p.lon.toFixed(6)}${p.heading != null ? `&heading=${Math.round(p.heading)}` : ''}`} target="_blank" rel="noopener" className="text-accent hover:underline">Street View</a>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}

      <p className="mt-4 text-xs text-fg-subtle leading-relaxed">
        Photos are read in your browser and never uploaded. Only when an address is looked up are the photo&rsquo;s coordinates, rounded to about 1 m, sent to OpenStreetMap&rsquo;s Nominatim geocoder.
      </p>
    </section>
  );
}
