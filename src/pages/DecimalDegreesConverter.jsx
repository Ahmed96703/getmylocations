import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout.jsx';

function ddToDms(dd) {
  if (dd === '' || dd === null || dd === undefined || Number.isNaN(Number(dd))) return null;
  const num = Number(dd);
  const sign = num < 0 ? -1 : 1;
  const abs = Math.abs(num);
  const deg = Math.floor(abs);
  const minFloat = (abs - deg) * 60;
  const min = Math.floor(minFloat);
  const sec = (minFloat - min) * 60;
  return { sign, deg, min, sec: Number(sec.toFixed(3)) };
}

function dmsToDd(deg, min, sec, hemisphere) {
  const d = parseFloat(deg) || 0;
  const m = parseFloat(min) || 0;
  const s = parseFloat(sec) || 0;
  const sign = hemisphere === 'S' || hemisphere === 'W' ? -1 : 1;
  return sign * (d + m / 60 + s / 3600);
}

export default function DecimalDegreesConverter() {
  const [latDd, setLatDd] = useState('48.858420');
  const [lonDd, setLonDd] = useState('2.294500');

  const [latDms, setLatDms] = useState({ d: '48', m: '51', s: '30.312', h: 'N' });
  const [lonDms, setLonDms] = useState({ d: '2', m: '17', s: '40.200', h: 'E' });

  const latDmsFromDd = useMemo(() => ddToDms(latDd), [latDd]);
  const lonDmsFromDd = useMemo(() => ddToDms(lonDd), [lonDd]);

  const latDdFromDms = useMemo(() => dmsToDd(latDms.d, latDms.m, latDms.s, latDms.h), [latDms]);
  const lonDdFromDms = useMemo(() => dmsToDd(lonDms.d, lonDms.m, lonDms.s, lonDms.h), [lonDms]);

  return (
    <PageLayout title="Decimal Degrees Converter — DD ↔ DMS Coordinate Conversion">
      <article>
        <p className="text-xs uppercase tracking-[0.18em] text-electric-400 font-semibold">Tool &amp; Guide</p>
        <h1 className="font-display text-4xl font-extrabold tracking-tight mt-2 leading-[1.1]">
          Decimal degrees converter &mdash; convert DD &harr; DMS instantly
        </h1>
        <p className="mt-4 text-lg text-slate-300/90 leading-relaxed">
          Latitude and longitude come in two common formats: decimal degrees (DD) like
          {' '}<code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">48.858420</code>, and
          degrees-minutes-seconds (DMS) like
          {' '}<code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">48&deg; 51&apos; 30.3&quot; N</code>.
          Modern apps prefer DD; older charts and surveys use DMS. The converter below translates
          between them in both directions, in real time, with no signup &mdash; useful when a hiking
          map gives you one format and the navigation app wants the other.
        </p>

        <hr className="my-10 border-white/10" />

        <h2 className="font-display text-2xl font-bold">Decimal Degrees &rarr; DMS</h2>
        <p className="mt-3 text-slate-300/90 text-sm leading-relaxed">
          Enter signed decimal numbers (negative for South or West). The converter updates as you type.
        </p>

        <div className="mt-5 grid sm:grid-cols-2 gap-5">
          <div className="glass rounded-2xl p-5 ring-1 ring-white/10">
            <label htmlFor="latDd" className="text-[11px] uppercase tracking-[0.18em] text-electric-400 font-semibold block mb-2">Latitude (DD)</label>
            <input
              id="latDd"
              type="text"
              inputMode="decimal"
              value={latDd}
              onChange={(e) => setLatDd(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-slate-100 font-mono text-base focus:outline-none focus:ring-2 focus:ring-electric-400"
            />
            <p className="mt-3 text-sm text-slate-400">DMS equivalent</p>
            <p className="font-mono text-base text-slate-100 mt-1">
              {latDmsFromDd
                ? `${latDmsFromDd.deg}° ${latDmsFromDd.min}' ${latDmsFromDd.sec}" ${latDmsFromDd.sign < 0 ? 'S' : 'N'}`
                : '—'}
            </p>
          </div>

          <div className="glass rounded-2xl p-5 ring-1 ring-white/10">
            <label htmlFor="lonDd" className="text-[11px] uppercase tracking-[0.18em] text-electric-400 font-semibold block mb-2">Longitude (DD)</label>
            <input
              id="lonDd"
              type="text"
              inputMode="decimal"
              value={lonDd}
              onChange={(e) => setLonDd(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-slate-100 font-mono text-base focus:outline-none focus:ring-2 focus:ring-electric-400"
            />
            <p className="mt-3 text-sm text-slate-400">DMS equivalent</p>
            <p className="font-mono text-base text-slate-100 mt-1">
              {lonDmsFromDd
                ? `${lonDmsFromDd.deg}° ${lonDmsFromDd.min}' ${lonDmsFromDd.sec}" ${lonDmsFromDd.sign < 0 ? 'W' : 'E'}`
                : '—'}
            </p>
          </div>
        </div>

        <hr className="my-10 border-white/10" />

        <h2 className="font-display text-2xl font-bold">DMS &rarr; Decimal Degrees</h2>
        <p className="mt-3 text-slate-300/90 text-sm leading-relaxed">
          Enter the components separately and pick the hemisphere.
        </p>

        <div className="mt-5 grid sm:grid-cols-2 gap-5">
          <div className="glass rounded-2xl p-5 ring-1 ring-white/10">
            <label className="text-[11px] uppercase tracking-[0.18em] text-electric-400 font-semibold block mb-2">Latitude (DMS)</label>
            <div className="grid grid-cols-4 gap-2">
              <input
                aria-label="Latitude degrees"
                placeholder="deg"
                type="text"
                inputMode="decimal"
                value={latDms.d}
                onChange={(e) => setLatDms({ ...latDms, d: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-lg px-2 py-2 text-slate-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-electric-400 text-center"
              />
              <input
                aria-label="Latitude minutes"
                placeholder="min"
                type="text"
                inputMode="decimal"
                value={latDms.m}
                onChange={(e) => setLatDms({ ...latDms, m: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-lg px-2 py-2 text-slate-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-electric-400 text-center"
              />
              <input
                aria-label="Latitude seconds"
                placeholder="sec"
                type="text"
                inputMode="decimal"
                value={latDms.s}
                onChange={(e) => setLatDms({ ...latDms, s: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-lg px-2 py-2 text-slate-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-electric-400 text-center"
              />
              <select
                aria-label="Latitude hemisphere"
                value={latDms.h}
                onChange={(e) => setLatDms({ ...latDms, h: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-lg px-2 py-2 text-slate-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-electric-400"
              >
                <option value="N">N</option>
                <option value="S">S</option>
              </select>
            </div>
            <p className="mt-3 text-sm text-slate-400">DD equivalent</p>
            <p className="font-mono text-base text-slate-100 mt-1">{latDdFromDms.toFixed(6)}</p>
          </div>

          <div className="glass rounded-2xl p-5 ring-1 ring-white/10">
            <label className="text-[11px] uppercase tracking-[0.18em] text-electric-400 font-semibold block mb-2">Longitude (DMS)</label>
            <div className="grid grid-cols-4 gap-2">
              <input
                aria-label="Longitude degrees"
                placeholder="deg"
                type="text"
                inputMode="decimal"
                value={lonDms.d}
                onChange={(e) => setLonDms({ ...lonDms, d: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-lg px-2 py-2 text-slate-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-electric-400 text-center"
              />
              <input
                aria-label="Longitude minutes"
                placeholder="min"
                type="text"
                inputMode="decimal"
                value={lonDms.m}
                onChange={(e) => setLonDms({ ...lonDms, m: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-lg px-2 py-2 text-slate-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-electric-400 text-center"
              />
              <input
                aria-label="Longitude seconds"
                placeholder="sec"
                type="text"
                inputMode="decimal"
                value={lonDms.s}
                onChange={(e) => setLonDms({ ...lonDms, s: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-lg px-2 py-2 text-slate-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-electric-400 text-center"
              />
              <select
                aria-label="Longitude hemisphere"
                value={lonDms.h}
                onChange={(e) => setLonDms({ ...lonDms, h: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-lg px-2 py-2 text-slate-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-electric-400"
              >
                <option value="E">E</option>
                <option value="W">W</option>
              </select>
            </div>
            <p className="mt-3 text-sm text-slate-400">DD equivalent</p>
            <p className="font-mono text-base text-slate-100 mt-1">{lonDdFromDms.toFixed(6)}</p>
          </div>
        </div>

        <hr className="my-10 border-white/10" />

        <h2 className="font-display text-2xl font-bold">What the two formats mean</h2>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          A coordinate is just an angle. Decimal degrees write that angle as a single number with a
          fractional part: <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">48.858420</code>.
          DMS breaks the same angle into three integer-ish parts: 48 full degrees, then 51 minutes
          (1/60 of a degree each), then 30.3 seconds (1/60 of a minute each).
        </p>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          The math is the same in both cases. To go from DD to DMS, take the integer part as degrees,
          multiply the fractional part by 60 to get minutes (integer part of the result), then
          multiply <em>that</em> fractional part by 60 to get seconds. To go the other way, add
          everything up: degrees + minutes/60 + seconds/3600.
        </p>

        <hr className="my-10 border-white/10" />

        <h2 className="font-display text-2xl font-bold">When to use which format</h2>
        <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
          <li><strong>Use DD</strong> for anything digital &mdash; APIs, spreadsheets, Google Maps URLs, GIS files, navigation apps. It&apos;s the modern standard and avoids parsing the &deg; &apos; &quot; symbols.</li>
          <li><strong>Use DMS</strong> for paper nautical charts, aviation publications, land-survey documents, and historical references. Many published surveys still cite DMS.</li>
          <li><strong>Convert when crossing formats</strong> &mdash; e.g., reading a coordinate off an old chart and pasting it into Google Maps, or copying a phone&apos;s coordinate into a printed expedition report.</li>
        </ul>

        <hr className="my-10 border-white/10" />

        <h2 className="font-display text-2xl font-bold">How much precision do you really need?</h2>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          Each decimal place of latitude or longitude shrinks your error by roughly a factor of ten.
          A practical rule:
        </p>
        <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
          <li>3 decimals (~110 m) &mdash; enough to identify a city block.</li>
          <li>4 decimals (~11 m) &mdash; enough to identify a building.</li>
          <li>5 decimals (~1.1 m) &mdash; enough to identify a parking space. This is what most smartphone GPS chips realistically deliver.</li>
          <li>6 decimals (~11 cm) &mdash; the de facto storage format, but the real-world accuracy is rarely better than ~1 m.</li>
        </ul>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          For DMS, one second of latitude is about 31 meters, and one decimal of a second is about
          3 meters. Old surveys often give whole-second precision &mdash; perfectly adequate for
          showing a landmark, less so for guiding a drone.
        </p>

        <hr className="my-10 border-white/10" />

        <h2 className="font-display text-2xl font-bold">Hemispheres and signs &mdash; common mistakes</h2>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          DD uses signs: positive for North/East, negative for South/West. DMS uses hemisphere
          letters (N, S, E, W) instead. Mixing the two is the single most common mistake in
          conversion. Two examples to keep in mind:
        </p>
        <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
          <li>Sydney Opera House &mdash; <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">-33.8568, 151.2153</code> in DD &harr; <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">33&deg; 51&apos; 24.5&quot; S, 151&deg; 12&apos; 55.1&quot; E</code> in DMS. The S flips the sign, not the magnitude.</li>
          <li>Statue of Liberty &mdash; <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">40.6892, -74.0445</code> in DD &harr; <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">40&deg; 41&apos; 21.1&quot; N, 74&deg; 2&apos; 40.2&quot; W</code> in DMS. North is positive, West is negative.</li>
        </ul>

        <hr className="my-10 border-white/10" />

        <h2 className="font-display text-2xl font-bold">Find your own live GPS coordinates</h2>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          Need a fresh coordinate to convert? Open
          {' '}<Link to="/" className="text-electric-400 hover:underline font-semibold">GetMyLocations</Link>{' '}
          and allow the location prompt. You&apos;ll see your live latitude and longitude in
          six-decimal DD format &mdash; paste them into the converter above to see the DMS equivalent.
        </p>

        <h2 className="font-display text-2xl font-bold mt-10">Related guides</h2>
        <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
          <li><Link to="/gps-coordinates-finder" className="text-electric-400 hover:underline">GPS coordinates finder &mdash; complete guide</Link></li>
          <li><Link to="/blog/latitude-vs-longitude-explained" className="text-electric-400 hover:underline">Latitude vs longitude &mdash; the difference, explained</Link></li>
          <li><Link to="/blog/how-to-find-your-gps-coordinates" className="text-electric-400 hover:underline">How to find your GPS coordinates</Link></li>
          <li><Link to="/ip-location-lookup" className="text-electric-400 hover:underline">IP location lookup &mdash; complete guide</Link></li>
          <li><Link to="/fix-location-not-working" className="text-electric-400 hover:underline">Fix location not working &mdash; troubleshooting</Link></li>
        </ul>
      </article>
    </PageLayout>
  );
}
