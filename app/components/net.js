// Shared helpers for the network tools. DNS questions go to Cloudflare's
// DNS-over-HTTPS JSON API and registration data to the RDAP registries (via
// the rdap.org redirector); both answer browsers directly. Page fetches go
// through this site's Worker (/api/page), because browsers cannot read other
// sites' pages.

export const RR = { A: 1, NS: 2, CNAME: 5, SOA: 6, PTR: 12, MX: 15, TXT: 16, AAAA: 28, SRV: 33, CAA: 257 };
const RR_NAME = Object.fromEntries(Object.entries(RR).map(([k, v]) => [v, k]));
export const rrName = (n) => RR_NAME[n] || `TYPE${n}`;

const RCODE = { 0: 'OK', 1: 'Format error', 2: 'Server failure', 3: 'No such domain (NXDOMAIN)', 5: 'Refused' };

const RESOLVERS = {
  cloudflare: 'https://cloudflare-dns.com/dns-query',
  google: 'https://dns.google/resolve',
};

// One DNS question. Returns { status, statusText, answers: [{ name, type, ttl, data }] }.
export async function dns(name, type, resolver = 'cloudflare') {
  const url = `${RESOLVERS[resolver]}?name=${encodeURIComponent(name)}&type=${type}`;
  const r = await fetch(url, { headers: { accept: 'application/dns-json' } });
  if (!r.ok) throw new Error(`The DNS service returned HTTP ${r.status}.`);
  const j = await r.json();
  return {
    status: j.Status,
    statusText: RCODE[j.Status] || `Error ${j.Status}`,
    answers: (j.Answer || []).map((a) => ({ name: a.name, type: rrName(a.type), ttl: a.TTL, data: a.data })),
  };
}

// TXT records arrive quoted and sometimes split into 255-byte pieces.
export const txt = (data) => data.replace(/^"|"$/g, '').replace(/"\s+"/g, '');

// "https://www.Example.com/path" → "www.example.com"; null if it does not look like a domain.
export function toDomain(input) {
  let s = String(input || '').trim().toLowerCase();
  if (!s) return null;
  s = s.replace(/^[a-z]+:\/\//, '').replace(/^[^@/]*@/, '').split(/[/?#:]/)[0].replace(/\.$/, '');
  if (!/^(?=.{1,253}$)([a-z0-9¡-￿](-*[a-z0-9¡-￿])*\.)+[a-z¡-￿]{2,}$/i.test(s)) return null;
  return s;
}

export const isIPv4 = (s) => /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/.test(s);

export function isIPv6(s) {
  if (!/^[0-9a-f:.]+$/i.test(s) || !s.includes(':')) return false;
  try { return new URL(`http://[${s}]/`).hostname.length > 2; } catch { return false; }
}

// Registration data (RDAP) for 'ip', 'autnum' or 'domain'.
export async function rdap(kind, query) {
  const r = await fetch(`https://rdap.org/${kind}/${encodeURIComponent(query)}`, { headers: { accept: 'application/rdap+json' } });
  if (r.status === 404) throw new Error('No registration record was found for that.');
  if (!r.ok) throw new Error(`The registry returned HTTP ${r.status}. Try again in a minute.`);
  return r.json();
}

// The display name of an RDAP entity (from its vCard), or its handle.
export function entityName(e) {
  const card = e?.vcardArray?.[1] || [];
  const fn = card.find((x) => x[0] === 'fn');
  const org = card.find((x) => x[0] === 'org');
  return (fn && fn[3]) || (org && org[3]) || e?.handle || '';
}

export function entityField(e, field) {
  const card = e?.vcardArray?.[1] || [];
  const x = card.find((v) => v[0] === field);
  if (!x) return '';
  if (field === 'adr') return (x[1]?.label || (Array.isArray(x[3]) ? x[3].flat().filter(Boolean).join(', ') : '')).replace(/\n/g, ', ');
  return Array.isArray(x[3]) ? x[3].join(' ') : x[3];
}

// Every entity in an RDAP object, nested ones included, with its roles.
export function allEntities(obj) {
  const out = [];
  const walk = (list) => (list || []).forEach((e) => { out.push(e); walk(e.entities); });
  walk(obj?.entities);
  return out;
}

export const rdapEvent = (obj, action) => obj?.events?.find((e) => e.eventAction === action)?.eventDate || '';

// The visitor's own public IP, from this site's Worker.
export async function myIp() {
  const r = await fetch('/api/ip', { cache: 'no-store' });
  if (!r.ok) throw new Error('Could not read your IP address.');
  return r.json();
}

// "example.com" → "https://example.com/"; null if it is not a web address.
export function toUrl(input) {
  let s = String(input || '').trim();
  if (!s) return null;
  if (!/^[a-z]+:\/\//i.test(s)) s = `https://${s}`;
  try {
    const u = new URL(s);
    return ['http:', 'https:'].includes(u.protocol) && u.hostname.includes('.') ? u.toString() : null;
  } catch { return null; }
}

// Fetch a public page through the Worker. Returns { status, headers, body, finalUrl, redirects, ms, truncated }.
export async function fetchPage(url) {
  const r = await fetch(`/api/page?url=${encodeURIComponent(url)}`);
  const j = await r.json().catch(() => ({}));
  if (!r.ok || j.error) throw new Error(j.error || `The check failed (HTTP ${r.status}).`);
  return j;
}

export const fmtDate = (iso) => {
  if (!iso) return '—';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

// Full 8-group form of an IPv6 address: "2001:db8::1" →
// ["2001","0db8","0000","0000","0000","0000","0000","0001"].
export function expandIPv6(s) {
  const norm = new URL(`http://[${s}]/`).hostname.slice(1, -1); // browser-normalized, IPv4 tail turned to hex
  const [head, tail] = norm.includes('::') ? norm.split('::') : [norm, null];
  const h = head ? head.split(':') : [];
  const t = tail === null ? [] : (tail ? tail.split(':') : []);
  const groups = tail === null ? h : [...h, ...Array(8 - h.length - t.length).fill('0'), ...t];
  return groups.map((g) => g.padStart(4, '0'));
}
