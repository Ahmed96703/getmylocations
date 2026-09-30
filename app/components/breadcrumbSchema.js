// BreadcrumbList JSON-LD. Google renders the trail in place of the raw URL in
// search results, so pages that show a visual breadcrumb should emit this too.
//
// Usage: breadcrumbSchema([{ name: 'Blog', path: '/blog' }, ...]) — Home is
// prepended automatically; pass the trail from the first level below it.

const SITE = 'https://getmylocations.com';

export function breadcrumbSchema(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: `${SITE}${crumb.path}`,
    })),
  };
}

export default breadcrumbSchema;
