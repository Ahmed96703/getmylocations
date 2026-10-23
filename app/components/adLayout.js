// Where the side banners fit, shared by SideAd (the rails) and MidAd (the
// 300x250), so both make the same decision: on screens with a wide enough
// right margin the 300x250 sits in the right column under the 160x600
// instead of in the middle of the text. It is never shown in both places,
// because its ad code runs once per page.

export const TOP = 104; // below the sticky header
export const GAP = 16;
const LABEL = 21; // the "Sponsored" line above each banner
export const RIGHT = { key: '72441e3f6e9573bd52d1e4bfff97780f', width: 160, height: 600 };
export const LEFT = { key: '79a6bc4777764a4918e11ff5161036bd', width: 160, height: 300 };
export const MID = { key: '40947b0ac0230ed99d85724b16532294', width: 300, height: 250 };

function mainRect() {
  const main = document.querySelector('main');
  return main ? main.getBoundingClientRect() : null;
}

// True when the right margin has room for the 300x250 column.
export function midDocksRight() {
  const r = mainRect();
  return !!r && window.innerWidth - r.right >= MID.width + 2 * GAP;
}

// Placement of a rail, or null when there is no room for it.
// Right rail: { left, width, fixed, dockMid }.
export function placeRail(side) {
  const r = mainRect();
  if (!r) return null;
  if (side === 'left') {
    const free = r.left;
    if (free < LEFT.width + 2 * GAP || window.innerHeight < TOP + LEFT.height + 40) return null;
    return { left: Math.round((free - LEFT.width) / 2), width: LEFT.width, fixed: true, dockMid: false };
  }
  const free = window.innerWidth - r.right;
  const dockMid = midDocksRight();
  const width = dockMid ? MID.width : RIGHT.width;
  if (free < RIGHT.width + 2 * GAP) return null;
  const height = RIGHT.height + LABEL + (dockMid ? GAP + MID.height + LABEL : 0);
  // Stays in view while scrolling if the whole column fits the screen;
  // otherwise it scrolls with the page so nothing is cut off.
  const fixed = window.innerHeight >= TOP + height + 24;
  if (!dockMid && !fixed) return null; // the single 160x600 rail needs to fit, as before
  return { left: Math.round(r.right + (free - width) / 2), width, fixed, dockMid };
}
