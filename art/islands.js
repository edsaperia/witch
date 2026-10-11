// An island's picture (the wave 2 finale: a woken legend's dream of its home island; the sea chart's islands): its coastline,
// as rules/islandShape.ts gives it (radii round from the west, the map's angles (atan2(z, x)), each a share of the biggest island's), drawn as a dark island in
// a rim of sand with its kind's sigil on it in the kind's neon. As whole pixels for a dream bubble's symbol (islandPixels), or
// as a path in a unit box for the sea chart (islandPath). North is up, as on the map.
import { islandSigil, sigilArrival, sigilColour } from "./sigils.js";

export const ISLAND_LOOK = { land: [34, 58, 56], land2: [46, 76, 68], sand: [222, 202, 146], coast: [24, 30, 52] };

// The coast's radius at an angle (radians, atan2(z, x): the samples run from -PI), eased between samples.
const radiusAt = (radii, a) => {
  const n = radii.length, t = ((a + Math.PI) / (Math.PI * 2)) * n, i = Math.floor(t), f = t - i;
  return radii[((i % n) + n) % n] * (1 - f) + radii[(((i + 1) % n) + n) % n] * f;
};

/** The island as RGBA pixels, `n` across (a dream bubble's symbol: 30): its land (a darker shade toward its middle), a sand rim
 *  a pixel wide, a dark coastline a pixel wide outside it, and its kind's sigil (islandSigil) in its neon over the middle, about
 *  `sigilShare` of its width (never under 11 pixels, so it reads). `scale`: the radius 1 fills the box (sizes by phase show as
 *  smaller islands, but never under `minScale` of the box). Returns { w, h, rgba } (alpha 0 or 255 only). */
export function islandPixels(kind, radii, { n = 30, sigil = islandSigil(kind), colour = sigilColour(sigil), sigilShare = .45, minScale = .62 } = {}) {
  const max = Math.max(...radii), scale = Math.max(minScale, Math.min(1, max)) / max, R = (n / 2 - 1.5) * scale, c = n / 2;
  const inside = (x, y) => { const dx = x + .5 - c, dy = y + .5 - c, d = Math.hypot(dx, dy); return d <= R * radiusAt(radii, Math.atan2(dy, dx)); };
  const rgba = new Uint8ClampedArray(n * n * 4), set = (i, col) => { rgba[i * 4] = col[0]; rgba[i * 4 + 1] = col[1]; rgba[i * 4 + 2] = col[2]; rgba[i * 4 + 3] = 255; };
  const land = new Uint8Array(n * n);
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) land[y * n + x] = inside(x, y) ? 1 : 0;
  const at = (x, y) => x >= 0 && y >= 0 && x < n && y < n && land[y * n + x] === 1, edge = (x, y) => !at(x - 1, y) || !at(x + 1, y) || !at(x, y - 1) || !at(x, y + 1);
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    const i = y * n + x;
    if (at(x, y)) set(i, edge(x, y) ? ISLAND_LOOK.sand : Math.hypot(x + .5 - c, y + .5 - c) < R * .55 ? ISLAND_LOOK.land : ISLAND_LOOK.land2);
    else if (at(x - 1, y) || at(x + 1, y) || at(x, y - 1) || at(x, y + 1)) set(i, ISLAND_LOOK.coast);
  }
  // the sigil, centred on the island, its pixels in the neon (its own glyph: whole pixels)
  const s = Math.max(11, Math.round(n * sigilShare * Math.min(1, scale * Math.max(...radii) + .2))), o = Math.round((n - s) / 2), arr = sigilArrival(sigil, s);
  for (let y = 0; y < s; y++) for (let x = 0; x < s; x++) if (arr[y * s + x] < Infinity && land[(y + o) * n + x + o]) set((y + o) * n + x + o, colour);
  return { w: n, h: n, rgba };
}

/** The coastline as points in a unit box (its middle .5, .5; the radius 1 reaching .48, or the furthest point if it's further):
 *  [[x, y], ...], north up (y down), sizes by phase kept. The sea chart's outline (islandPath) and its 3D landmass both read it. */
export function islandPoints(radii, { steps = radii.length } = {}) {
  const pts = [], k0 = .48 / Math.max(1, ...radii); // (the biggest, home past its round radius, still inside the box)
  for (let k = 0; k < steps; k++) { const a = -Math.PI + (k / steps) * Math.PI * 2, r = k0 * radiusAt(radii, a); pts.push([.5 + r * Math.cos(a), .5 + r * Math.sin(a)]); }
  return pts;
}

/** The coastline as a closed path in a unit box (islandPoints), as SVG path data, for the sea chart: north up, sizes by phase kept. */
export function islandPath(radii, opts = {}) {
  return `M${islandPoints(radii, opts).map(([x, y]) => `${x.toFixed(4)},${y.toFixed(4)}`).join("L")}Z`;
}
