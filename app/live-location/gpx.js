// Builds a GPX 1.1 track (https://www.topografix.com/GPX/1/1/) from the
// points the tracker kept. The file is made in the browser and handed
// straight to the download, so the route never reaches a server.

const esc = (s) =>
  s.replace(/[<>&"']/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[c]);

// points: [{ lat, lon, ele (meters or null), time (ms since epoch) }]
export function toGpx(points, name) {
  const trkpts = points
    .map((p) => {
      const ele = p.ele != null && Number.isFinite(p.ele) ? `<ele>${p.ele.toFixed(1)}</ele>` : '';
      return `      <trkpt lat="${p.lat.toFixed(7)}" lon="${p.lon.toFixed(7)}">${ele}<time>${new Date(p.time).toISOString()}</time></trkpt>`;
    })
    .join('\n');
  const started = new Date(points[0]?.time ?? Date.now()).toISOString();
  return `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="getmylocations.com" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata>
    <name>${esc(name)}</name>
    <time>${started}</time>
  </metadata>
  <trk>
    <name>${esc(name)}</name>
    <trkseg>
${trkpts}
    </trkseg>
  </trk>
</gpx>
`;
}

export function downloadGpx(points) {
  const t = new Date(points[0].time);
  const pad = (n) => String(n).padStart(2, '0');
  const stamp = `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}-${pad(t.getHours())}${pad(t.getMinutes())}`;
  const blob = new Blob([toGpx(points, `Route ${stamp}`)], { type: 'application/gpx+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `route-${stamp}.gpx`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
