import { AREA_FOLDER_FLORA } from "../areas/index.js";
// Area flora (stage 8 of issue #79): which trees each area type grows and in what colours. Each wooded area lists 3 to 6 species
// with their shares (the first is its main kind, as its `big` names it in art/areas.js), and a palette: its leaves' hue (the area's
// own `leaf`), and how saturated and how bright its leaves are (sat, val: times the species' own). A species may carry options as
// the area recipes do (bare: dead; dark: shadowed leaves). areaTreeVariants grows an area's ten tree variants from this list, each
// species in its share of them, spread over the height classes. The open areas (moor, stone shrine, log pile, ravine) grow a few
// among their props (their layout's treeShare; Ed, 2026-10-13: "let's see if we can reasonably put trees into areas with no trees").
// The fantasy species (glowcap, crystal-leaf tree, vinewood) are here only where the place suits magic, and only as a minority.

export const AREA_FLORA = {
  ...AREA_FOLDER_FLORA,
};

// An area's ten (or n) tree slots as species, by their shares: each species gets its share of the slots (at least one, largest
// remainders first), dealt out round the list so each kind turns up across the height classes, not bunched in one.
export function floraSlots(id, n) {
  const F = AREA_FLORA[id]; if (!F) return null;
  const sp = F.species, raw = sp.map(([, w]) => w * n), cnt = raw.map(x => Math.max(1, Math.floor(x)));
  let left = n - cnt.reduce((a, b) => a + b, 0);
  const order = raw.map((x, i) => [x - Math.floor(x), i]).sort((a, b) => b[0] - a[0]);
  for (let k = 0; left > 0; k++, left--) cnt[order[k % order.length][1]]++;
  for (let k = cnt.length - 1; left < 0; k = (k + cnt.length - 1) % cnt.length) if (cnt[k] > 1) { cnt[k]--; left++; }
  const out = []; while (out.length < n) for (let i = 0; i < sp.length && out.length < n; i++) if (cnt[i] > 0) { cnt[i]--; out.push({ type: sp[i][0], ...(sp[i][2] || {}) }); }
  return out;
}
