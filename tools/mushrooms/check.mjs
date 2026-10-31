import assert from "node:assert/strict";
import { mushroomSprite, mushroomGenome, mushroomColours, mushroomRanges, MUSHROOM_RANGES, MUSHROOM_TYPES, BIOME_MUSHROOMS } from "../../art/mushrooms.js";
import { witchHeight } from "../../art/witch.js";
import { M } from "../../art/core.js";
let count = 0;
function checkSpots(s) {
  const owner = new Map();
  s.spots.forEach((spot, index) => spot.pixels.forEach(i => { assert(!owner.has(i), "spots never overlap"); owner.set(i, index); }));
  for (const [i, id] of owner) {
    const x = i % s.w, y = Math.floor(i / s.w);
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const j = (y + dy) * s.w + x + dx;
      assert(s.capMask[j], "one full cap pixel around every spot");
      assert(!owner.has(j) || owner.get(j) === id, "one full pixel between different spots");
    }
  }
  assert(s.spots.length <= s.genome.spotCount, "packing respects requested count");
}
for (const pixel of [3, 4, 5]) for (const type of Object.keys(MUSHROOM_TYPES)) for (let seed = 0; seed < 100; seed++) {
  const st = { pixel }, s = mushroomSprite(st, { type, seed }), ys = [];
  assert.deepEqual(s.m, mushroomSprite(st, { type, seed }).m, "seed repeatability");
  assert.deepEqual(s.genome, mushroomGenome(type, seed));
  checkSpots(s);
  assert(s.m.includes(M.GLOW) || s.m.includes(M.MAGIC2), "visible emissive spots");
  for (let i = 0; i < s.m.length; i++) if (s.m[i]) {
    const x = i % s.w, y = Math.floor(i / s.w); ys.push(y);
    assert(x > 0 && x < s.w - 1 && y > 0 && y < s.h - 1, "no clipped edge pixels");
    const normal = s.n.slice(i * 3, i * 3 + 3);
    assert(normal.every(Number.isFinite), "finite normals");
  }
  const height = Math.max(...ys) - Math.min(...ys) + 1;
  assert(height >= witchHeight(st) * .5 - 1 && height <= witchHeight(st) * 2 / 3 + 1, "witch-relative scale within pixel rounding");
  assert(s.anchors.ground[1] === Math.max(...ys) + 1, "foot anchor at visible base");
  // All material pixels belong to one 8-connected mushroom, no detached glowing flecks.
  const seen = new Set(), queue = [s.m.findIndex(Boolean)];
  while (queue.length) {
    const i = queue.pop(); if (seen.has(i)) continue; seen.add(i);
    const x = i % s.w, y = Math.floor(i / s.w);
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      if (x + dx < 0 || x + dx >= s.w || y + dy < 0 || y + dy >= s.h) continue;
      const j = i + dy * s.w + dx; if (s.m[j] && !seen.has(j)) queue.push(j);
    }
  }
  assert.equal(seen.size, ys.length, "one connected silhouette"); count++;
}
assert.equal(new Set(Object.values(BIOME_MUSHROOMS)).size, 9);
assert.throws(() => mushroomGenome("missing"), RangeError);
assert.throws(() => mushroomRanges({ height: [NaN, 1] }), TypeError);
assert.deepEqual(mushroomRanges({ height: [1, .5] }).height, [.5, 1]);
for (const [key, d] of Object.entries(MUSHROOM_RANGES)) for (const endpoint of d.limits) {
  for (const pixel of [3, 5]) for (let seed = -5; seed < 15; seed++) {
    const ranges = { [key]: [endpoint, endpoint] }, s = mushroomSprite({ pixel }, { seed, ranges });
    assert.equal(s.genome[key], endpoint, "fixed endpoints applied"); checkSpots(s);
    for (let i = 0; i < s.m.length; i++) if (s.m[i]) {
      assert(i % s.w > 0 && i % s.w < s.w - 1 && i >= s.w && i < s.w * (s.h - 1), "range extremes remain inside canvas");
    }
  }
}
for (const type of Object.keys(MUSHROOM_TYPES).filter(t => t !== "white")) {
  const c = mushroomColours(type)[M.GLOW];
  assert(Math.max(...c) === 255 && Math.min(...c) < 100, "bright saturated emission, not white spots");
}
for (let seed = 61; seed < 81; seed++) {
  const s = mushroomSprite({ pixel: 3 }, { seed, ranges: { height: [1, 1], cap: [.65, .65], width: [1.4, 1.4], spotCount: [6, 6], spotRadius: [.1, .1] } });
  checkSpots(s);
  assert(new Set(s.spots.map(p => p.pixels.length)).size > 1, 'spot footprints vary within one cap');
  for (const p of s.spots) {
    const xs = p.pixels.map(i => i % s.w), ys = p.pixels.map(i => Math.floor(i / s.w));
    assert.equal(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys), 'circular footprint has equal width and height');
    if (p.pixels.length > 1) assert(p.pixels.some(i => s.m[i] === M.MAGIC2), 'multi-pixel spots have a highlight');
  }
}
console.log(`${count} default specimens and ${Object.keys(MUSHROOM_RANGES).length * 80} range-endpoint specimens checked; circular varied spots, highlights, edge clearance and separation pass.`);
