// Pure IP-address helpers for the IP Location tool (no React, testable on
// their own). Private and reserved addresses are recognised locally so they
// are never sent to the lookup service: they have no public location.

function parseIPv4(s) {
  const m = s.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (!m) return null;
  const parts = m.slice(1).map(Number);
  if (parts.some((p, i) => p > 255 || (m[i + 1].length > 1 && m[i + 1].startsWith('0')))) return null;
  return parts;
}

// Returns eight 16-bit groups, or null if not valid IPv6.
function parseIPv6(s) {
  let str = s.toLowerCase().replace(/^\[|\]$/g, '').split('%')[0];
  // Embedded IPv4 tail (e.g. ::ffff:192.0.2.1)
  const v4tail = str.match(/(\d{1,3}(?:\.\d{1,3}){3})$/);
  if (v4tail) {
    const v4 = parseIPv4(v4tail[1]);
    if (!v4) return null;
    str = str.slice(0, -v4tail[1].length)
      + ((v4[0] << 8) | v4[1]).toString(16) + ':' + ((v4[2] << 8) | v4[3]).toString(16);
  }
  if (!/^[0-9a-f:]+$/.test(str) || (str.match(/::/g) || []).length > 1) return null;
  const [head, tail] = str.includes('::') ? str.split('::') : [str, null];
  const h = head ? head.split(':') : [];
  const t = tail ? tail.split(':') : [];
  if ([...h, ...t].some((g) => g === '' || g.length > 4)) return null;
  const missing = 8 - h.length - t.length;
  if (tail === null ? missing !== 0 : missing < 1) return null;
  return [...h, ...Array(tail === null ? 0 : missing).fill('0'), ...t].map((g) => parseInt(g, 16));
}

const V4_RANGES = [
  // [first octets..., prefix length, label, reference]
  [[0], 8, 'a "this network" placeholder address', 'RFC 1122'],
  [[10], 8, 'a private network address', 'RFC 1918'],
  [[100, 64], 10, 'a carrier-grade NAT (CGNAT) address used inside mobile and ISP networks', 'RFC 6598'],
  [[127], 8, 'a loopback address that always means "this device"', 'RFC 1122'],
  [[169, 254], 16, 'a link-local address a device assigns itself when no router answers', 'RFC 3927'],
  [[172, 16], 12, 'a private network address', 'RFC 1918'],
  [[192, 0, 2], 24, 'reserved for documentation and examples', 'RFC 5737'],
  [[192, 168], 16, 'a private network address', 'RFC 1918'],
  [[198, 18], 15, 'reserved for network benchmarking', 'RFC 2544'],
  [[198, 51, 100], 24, 'reserved for documentation and examples', 'RFC 5737'],
  [[203, 0, 113], 24, 'reserved for documentation and examples', 'RFC 5737'],
  [[224], 4, 'a multicast address', 'RFC 5771'],
  [[240], 4, 'reserved for future use', 'RFC 1112'],
];

function v4InRange(ip, [base, len]) {
  const n = ((ip[0] << 24) >>> 0) + (ip[1] << 16) + (ip[2] << 8) + ip[3];
  const b = base.concat([0, 0, 0, 0]).slice(0, 4);
  const bn = ((b[0] << 24) >>> 0) + (b[1] << 16) + (b[2] << 8) + b[3];
  const mask = len === 0 ? 0 : (0xffffffff << (32 - len)) >>> 0;
  return ((n & mask) >>> 0) === ((bn & mask) >>> 0);
}

function v6Special(g) {
  if (g.every((x) => x === 0)) return ['the unspecified address', 'RFC 4291'];
  if (g.slice(0, 7).every((x) => x === 0) && g[7] === 1) return ['the loopback address that always means "this device"', 'RFC 4291'];
  if ((g[0] & 0xfe00) === 0xfc00) return ['a unique local (private) address', 'RFC 4193'];
  if ((g[0] & 0xffc0) === 0xfe80) return ['a link-local address that only works on the local network', 'RFC 4291'];
  if ((g[0] & 0xff00) === 0xff00) return ['a multicast address', 'RFC 4291'];
  if (g[0] === 0x2001 && g[1] === 0x0db8) return ['reserved for documentation and examples', 'RFC 3849'];
  return null;
}

// classifyIp('8.8.8.8') -> { ip, version: 'IPv4', public: true }
// classifyIp('192.168.1.5') -> { ip, version: 'IPv4', public: false, label, ref }
// classifyIp('nonsense') -> null
export function classifyIp(input) {
  const s = String(input || '').trim();
  const v4 = parseIPv4(s);
  if (v4) {
    const hit = V4_RANGES.find((r) => v4InRange(v4, r));
    return hit
      ? { ip: s, version: 'IPv4', public: false, label: hit[2], ref: hit[3] }
      : { ip: s, version: 'IPv4', public: true };
  }
  const v6 = parseIPv6(s);
  if (v6) {
    // IPv4-mapped (::ffff:a.b.c.d): judge by the IPv4 part.
    if (v6.slice(0, 5).every((x) => x === 0) && v6[5] === 0xffff) {
      const inner = classifyIp([v6[6] >> 8, v6[6] & 255, v6[7] >> 8, v6[7] & 255].join('.'));
      return { ...inner, ip: s, version: 'IPv6' };
    }
    const sp = v6Special(v6);
    return sp
      ? { ip: s, version: 'IPv6', public: false, label: sp[0], ref: sp[1] }
      : { ip: s, version: 'IPv6', public: true };
  }
  return null;
}

// A plausible domain name: labels of letters, digits and hyphens, with a
// letter-only top-level label. Accepts pasted URLs and strips the scheme/path.
export function asDomain(input) {
  let s = String(input || '').trim().toLowerCase();
  s = s.replace(/^[a-z]+:\/\//, '').split(/[/?#]/)[0].replace(/:\d+$/, '').replace(/\.$/, '');
  if (s.length > 253) return null;
  return /^(?!-)[a-z0-9-]{1,63}(?<!-)(\.(?!-)[a-z0-9-]{1,63}(?<!-))*\.[a-z]{2,63}$/.test(s) ? s : null;
}

// Great-circle distance in km (haversine).
export function kmBetween(lat1, lon1, lat2, lon2) {
  const R = 6371.0088;
  const r = (d) => (d * Math.PI) / 180;
  const a = Math.sin(r(lat2 - lat1) / 2) ** 2
    + Math.cos(r(lat1)) * Math.cos(r(lat2)) * Math.sin(r(lon2 - lon1) / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}
