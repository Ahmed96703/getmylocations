export default function Logo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" role="img" aria-label="GeoPulse logo">
      <title>GeoPulse</title>
      <defs>
        <linearGradient id="gp-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
      </defs>
      <circle className="logo-pulse-ring" cx="24" cy="24" r="20" stroke="#38bdf8" strokeOpacity=".35" strokeWidth="1.5" fill="none" />
      <path d="M24 6c-7.2 0-13 5.6-13 12.5C11 28 24 42 24 42s13-14 13-23.5C37 11.6 31.2 6 24 6z" fill="url(#gp-grad)" />
      <circle cx="24" cy="19" r="4.2" fill="#0b1224" />
      <circle cx="24" cy="19" r="1.8" fill="#38bdf8" />
    </svg>
  );
}
