// Internal links as plain <a>, so every click is a full page load.
// next/link swaps pages in the browser without reloading, and Mediavine runs
// its ad auction once per page load ("url_change_reload": false in its
// config): every page after the first kept the old page's ads or none, and
// pages reached by internal links (blog posts, converters) showed 0
// impressions. It also stops next/link prefetching every visible link's data
// at page load, which competed with the ad requests for bandwidth.
export default function Link({ href, prefetch, replace, scroll, ...rest }) {
  return <a href={href} {...rest} />;
}
