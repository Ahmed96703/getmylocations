// The site's author as a schema.org Person, shared by every page's structured
// data so the same entity (same @id, same profiles) is described everywhere.
// Add further public profiles (e.g. LinkedIn) to AUTHOR_PROFILES only once
// they are confirmed to be the author's own and to match the About page.
export const AUTHOR_PROFILES = ['https://github.com/Ahmed96703'];

export const AUTHOR = {
  '@type': 'Person',
  '@id': 'https://getmylocations.com/about#ahmed-anwar',
  name: 'Ahmed Anwar',
  url: 'https://getmylocations.com/about',
  sameAs: AUTHOR_PROFILES,
};
