// "Open now" for the common OpenStreetMap opening_hours patterns, such as
// "Mo-Fr 08:30-18:00; Sa 09:00-13:00; Su off", "24/7" or
// "Mo-Sa 09:00-12:30,14:00-19:00". Anything else (holidays, months, weeks,
// sunrise, comments) returns null, meaning unknown, never a guess.
// Times are compared with the visitor's own clock, which is right for a
// place near them.

const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const mins = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };

function days(spec) {
  const out = new Set();
  for (const part of spec.split(',')) {
    const [a, b] = part.split('-');
    const i = DAYS.indexOf(a), j = b ? DAYS.indexOf(b) : i;
    if (i < 0 || j < 0) return null;
    for (let d = i; ; d = (d + 1) % 7) { out.add(d); if (d === j) break; }
  }
  return out;
}

// Returns true (open), false (closed) or null (cannot tell).
export function isOpen(value, now = new Date()) {
  if (!value) return null;
  const v = value.trim();
  if (v === '24/7') return true;
  const today = (now.getDay() + 6) % 7; // Monday = 0
  const t = now.getHours() * 60 + now.getMinutes();
  // Ranges that apply now, from today's rules and from yesterday's that run past midnight.
  const ranges = [];
  const rules = v.split(';').map((r) => r.trim()).filter(Boolean);
  const seen = new Array(7).fill(false);
  for (const rule of rules) {
    if (/^PH\b/.test(rule)) continue; // public holidays: ignored
    const m = /^((?:Mo|Tu|We|Th|Fr|Sa|Su)(?:[-,](?:Mo|Tu|We|Th|Fr|Sa|Su))*)?\s*(.*)$/.exec(rule);
    if (!m) return null;
    const set = m[1] ? days(m[1]) : new Set([0, 1, 2, 3, 4, 5, 6]);
    if (!set) return null;
    const body = m[2].trim();
    // A later rule for the same day replaces an earlier one.
    const spans = [];
    if (body === 'off' || body === 'closed') {
      // closed all day
    } else {
      for (const r of body.split(',')) {
        const mm = /^(\d{1,2}:\d{2})-(\d{1,2}:\d{2})\+?$/.exec(r.trim());
        if (!mm) return null;
        spans.push([mins(mm[1]), mins(mm[2])]);
      }
    }
    for (const d of set) {
      seen[d] = true;
      ranges[d] = spans;
    }
  }
  const yesterday = (today + 6) % 7;
  for (const [a, b] of ranges[today] || []) {
    if (b > a ? t >= a && t < b : t >= a) return true;
  }
  for (const [a, b] of ranges[yesterday] || []) {
    if (b <= a && t < b) return true; // overnight from yesterday
  }
  if (!seen[today]) return rules.some((r) => /^(?:Mo|Tu|We|Th|Fr|Sa|Su)/.test(r)) ? false : null;
  return false;
}
