import Link from 'next/link';

export const metadata = {
  title: '404 — Page Not Found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="max-w-3xl mx-auto px-5 py-24 text-center">
      <h1 className="font-display text-6xl font-extrabold text-electric-400">404</h1>
      <p className="text-xl text-slate-300 mt-4">Page not found.</p>
      <Link href="/" className="btn-primary inline-flex mt-8">Back to home</Link>
    </main>
  );
}
