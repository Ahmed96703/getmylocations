// In Next.js, SiteHeader + Footer are rendered by the root layout (app/layout.jsx),
// so this wrapper just provides the <main> container. Title is handled via the
// `metadata` export in each page.jsx — no useEffect needed.

export default function PageLayout({ children }) {
  return (
    <main role="main" className="max-w-3xl mx-auto px-5 py-12 prose-invert">
      {children}
    </main>
  );
}
