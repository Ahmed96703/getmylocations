// Blog images are pre-converted to WebP at 800/1200/1600 px next to the
// original JPEG (public/blog-images/<name>-<width>.webp). The site is a static
// export with images.unoptimized, so next/image can't resize at request time;
// <picture> lets phones fetch the 800 px WebP instead of the 1600 px JPEG,
// and browsers without WebP fall back to the JPEG.
const WIDTHS = [800, 1200, 1600];

export default function BlogImage({ src, ...imgProps }) {
  const base = src.replace(/\.jpe?g$/i, '');
  const srcSet = WIDTHS.map((w) => `${base}-${w}.webp ${w}w`).join(', ');
  return (
    <picture>
      <source type="image/webp" srcSet={srcSet} sizes="(max-width: 768px) 100vw, 768px" />
      <img src={src} {...imgProps} />
    </picture>
  );
}
