// Shared by the tool and the page, so the page's tables use the same numbers.

// Every unit in bits.
export const UNITS = [
  ['bit', 'Bit (b)', 1],
  ['B', 'Byte (B)', 8],
  ['kb', 'Kilobit (kb)', 1e3],
  ['Mb', 'Megabit (Mb)', 1e6],
  ['Gb', 'Gigabit (Gb)', 1e9],
  ['Tb', 'Terabit (Tb)', 1e12],
  ['KB', 'Kilobyte (KB)', 8e3],
  ['MB', 'Megabyte (MB)', 8e6],
  ['GB', 'Gigabyte (GB)', 8e9],
  ['TB', 'Terabyte (TB)', 8e12],
  ['PB', 'Petabyte (PB)', 8e15],
  ['KiB', 'Kibibyte (KiB)', 8 * 1024],
  ['MiB', 'Mebibyte (MiB)', 8 * 1024 ** 2],
  ['GiB', 'Gibibyte (GiB)', 8 * 1024 ** 3],
  ['TiB', 'Tebibyte (TiB)', 8 * 1024 ** 4],
];
export const BITS = Object.fromEntries(UNITS.map(([k, , v]) => [k, v]));

export function fmtNum(n) {
  if (n === 0) return '0';
  const a = Math.abs(n);
  if (a >= 1e15 || a < 1e-6) return n.toExponential(4).replace(/\.?0+e/, 'e');
  return n.toLocaleString('en-US', { maximumFractionDigits: a >= 100 ? 2 : a >= 1 ? 4 : 8 });
}

export function duration(seconds) {
  if (!Number.isFinite(seconds)) return '—';
  if (seconds < 1) return `${(seconds * 1000).toFixed(0)} ms`;
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.round(seconds % 60);
  return [d && `${d} d`, h && `${h} h`, m && `${m} min`, (s || (!d && !h && !m)) && `${s} s`].filter(Boolean).join(' ');
}
