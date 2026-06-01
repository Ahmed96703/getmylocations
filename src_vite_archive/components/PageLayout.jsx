import { useEffect } from 'react';
import SiteHeader from './SiteHeader.jsx';
import Footer from './Footer.jsx';

export default function PageLayout({ title, children }) {
  useEffect(() => {
    if (title) document.title = `${title} | GetMyLocations`;
  }, [title]);
  return (
    <div className="min-h-full">
      <SiteHeader />
      <main role="main" className="max-w-3xl mx-auto px-5 py-12 prose-invert">
        {children}
      </main>
      <Footer />
    </div>
  );
}
