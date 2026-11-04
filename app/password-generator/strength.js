// Shared by the tool and the page, so the page's strength table matches the meter.

export const SETS = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  digits: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{};:,.?/~',
};

// Rough offline cracking time at 100 billion guesses a second (a well-funded attacker against a fast hash).
export function crackTime(bits) {
  const seconds = 2 ** bits / 2 / 1e11;
  const units = [['century', 3.15e9], ['year', 3.15e7], ['day', 86400], ['hour', 3600], ['minute', 60], ['second', 1]];
  if (seconds < 1) return 'instantly';
  for (const [u, s] of units) {
    if (seconds >= s) {
      const n = seconds / s;
      if (u === 'century' && n > 1.38e8) return 'longer than the age of the universe'; // 13.8 billion years
      return `about ${n >= 100 ? Math.round(n).toLocaleString() : n.toFixed(n < 10 ? 1 : 0)} ${u === 'century' ? (n >= 2 ? 'centuries' : 'century') : `${u}${n >= 2 ? 's' : ''}`}`;
    }
  }
  return 'instantly';
}
