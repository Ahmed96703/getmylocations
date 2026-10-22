// Unbiased random integer in [0, n) from the browser's secure generator
// (rejection sampling, so no number is more likely than another).
export function randInt(n) {
  const limit = Math.floor(0x100000000 / n) * n;
  const buf = new Uint32Array(1);
  do crypto.getRandomValues(buf); while (buf[0] >= limit);
  return buf[0] % n;
}
