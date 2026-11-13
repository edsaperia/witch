// The dancefloor ring's stones, before her party turns them into speakers (Ed, 2026-11-13: "Dancefloor stones (before they become
// speakers) look too similar to speakers. They should be more knee height like in this reference image."; his reference a modern
// stone circle on a lawn). Its traits, not the photo: low (knee to thigh height on her), as wide as tall or wider, rounded egg and
// dome boulders, smooth and weathered, pale grey to buff, a little lichen-mottled, no two alike (upright eggs, squat domes, a
// couple low and flat), each sat in a little worn ground. They keep the old ring stones' three glowing dots (Ed, 2026-10-08:
// "three glowing dots in a vertical stack, hinting at the speaker that will replace it"), a pixel each, up the side we see.
// The stones as they were (an area's rune stone at half its width, as tall as a speaker): art/areas.js runeStone, the link's
// ?dancestones=old.
import { M, rng, hash2, bake, defaultCanvas } from "./core.js";
import { Model, render } from "./model3d.js";
import { witchHeight } from "./witch.js";

/** How many different stones (the ring's twelve: one each). */
export const DANCE_STONE_FORMS = 12;
// Each kind's height and half-width, as shares of her drawn height (her knee is about a quarter of it, her hip about a half), and
// how deep it is for its width. Round the ring: mostly eggs and domes, two low flat ones, two lumpy boulders.
const KINDS = {
  egg: { h: [.25, .3], w: [.1, .115], d: .9, sink: .42 },      // upright: taller than wide, its widest a little below its middle
  dome: { h: [.19, .23], w: [.13, .155], d: .85, sink: .12 },  // squat: wider than tall
  flat: { h: [.12, .14], w: [.15, .175], d: .8, sink: .05 },   // low and flat: shin height
  lump: { h: [.21, .25], w: [.12, .14], d: .9, sink: .3 },     // a boulder with a shoulder
};
const ORDER = ["egg", "dome", "lump", "flat", "egg", "dome", "egg", "flat", "dome", "lump", "dome", "egg"];
const GREY = [166, 166, 162], BUFF = [180, 167, 138];
const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));

/** One stone's shape and colours, by its place in the ring (seeded: the same every time). */
export function danceStoneForm(i) {
  const n = ((i % DANCE_STONE_FORMS) + DANCE_STONE_FORMS) % DANCE_STONE_FORMS, kind = ORDER[n], K = KINDS[kind], r = rng(4177 + n * 6271), u = (a, b) => a + r() * (b - a);
  return { n, kind, h: u(...K.h), w: u(...K.w), d: K.d * u(.9, 1.1), sink: K.sink, lean: u(-.03, .03), yaw: u(-.5, .5), buff: r(), lichen: u(.1, .26), moss: u(.2, .6), side: r() < .5 ? -1 : 1, grass: 2 + Math.floor(r() * 4) };
}

function danceStoneModel(F, px) { // px: a pixel in the model's units (her height: 1)
  const m = new Model({ blend: .03 }), { h, w, sink } = F, d = w * F.d;
  m.clipY = 0; // (sat in the ground: its underside cut away)
  // its main body: an ellipsoid whose middle is `sink` of its height up, so a dome's is near the ground and an egg's near its waist
  const cy = h * sink, ry = h - cy, C = [F.lean * .5, cy, 0];
  // the dots' middles: three heights up it, each on its surface on the side we see
  const fwd = [Math.sin(F.yaw), 0, Math.cos(F.yaw)];
  const dots = [.34, .58, .82].map(t => { const y = h * t, q = Math.sqrt(Math.max(0, 1 - ((y - cy) / ry) ** 2)); return [C[0] + fwd[0] * w * q, y, fwd[2] * d * q]; });
  const stone = p => {
    if (p[1] < h * .16 && hash2(Math.floor(p[0] / px), Math.floor(p[2] / px) * 5 + Math.floor(p[1] / px), 11 + F.n) < F.moss) return M.MOSS; // moss at its foot
    const a = hash2(Math.floor(p[0] / (px * 2)), Math.floor(p[1] / (px * 2)) * 7 + Math.floor(p[2] / (px * 2)), 23 + F.n);
    if (a < F.lichen) return M.BODY2;       // pale lichen, in blotches
    if (a > .93) return M.STONED;           // weathered pits
    return undefined;
  };
  m.ell(C, [w, ry, d], M.STONE, { group: 1, rough: px * .35, paint: stone });
  if (F.kind === "egg") m.ell([C[0] + F.lean, h * .68, 0], [w * .74, h * .32, d * .74], M.STONE, { group: 1, paint: stone }); // its narrower top
  if (F.kind === "lump") m.ell([F.side * w * .55, h * .22, d * .15], [w * .7, h * .42, d * .75], M.STONE, { group: 1, rough: px * .35, paint: stone }); // its shoulder
  if (F.kind === "flat") m.ell([-F.side * w * .35, h * .3, 0], [w * .6, h * .62, d * .7], M.STONE, { group: 1, paint: stone }); // a low hump off its middle
  // the worn ground it sits in, and a few blades of grass at its edge
  m.ell([0, 0, d * .15], [w * 1.45, px * 1.6, d * 1.5], M.BARK2, { group: 2, extra: true });
  for (let k = 0; k < F.grass; k++) {
    const s = k % 2 ? 1 : -1, x = s * w * (1.05 + hash2(k, F.n, 31) * .4), z = d * (hash2(k, F.n, 32) * 1.4 - .3), g = px * (2.2 + hash2(k, F.n, 33) * 2.2);
    m.seg([x, 0, z], [x + s * px * .6, g, z], px * .5, px * .25, k % 3 ? M.LEAF : M.LEAF2, { group: 10 + k, extra: true });
  }
  return { m, dots };
}

/** A ring stone, baked: `form` its place in the ring. With its ground point under its middle (`origin`) and its dots' middles
 *  (`dots`), in art pixels from its top-left, as art/areas.js runeStone's turned stones have. Drawn at her scale (docs/STYLE.md §1). */
export function danceStone(st, { form = 0, makeCanvas = defaultCanvas } = {}) {
  const F = danceStoneForm(form), s = witchHeight(st), { m, dots } = danceStoneModel(F, 1 / s);
  const R = render(m, { scale: s, yaw: 0 }), sp = R.sp, at = p => (([x, y]) => ({ x: +x.toFixed(1), y: +y.toFixed(1) }))(R.project(p));
  // its dots: a pixel each, stamped where they land (on the stone's own pixel nearest, never two in a row touching)
  const lit = [], isStone = (x, y) => [M.STONE, M.STONED, M.BODY2, M.MOSS].includes(sp.get(x, y));
  for (const q of dots.map(at)) {
    let x = Math.floor(q.x), y = Math.floor(q.y);
    while (lit.length && y >= lit[lit.length - 1].y - 1.5) y--;
    for (let k = 0; k < 4 && !isStone(x, y); k++) y--;
    if (!isStone(x, y)) continue;
    sp.recolour(x, y, M.RUNE); lit.push({ x: x + .5, y: y + .5 });
  }
  const stone = mix(GREY, BUFF, F.buff);
  const colours = { [M.STONE]: stone, [M.STONED]: stone.map(c => Math.round(c * .78)), [M.BODY2]: mix(stone, [196, 200, 168], .6), [M.MOSS]: [96, 124, 70], [M.BARK2]: [84, 72, 52], [M.LEAF]: [80, 125, 60], [M.LEAF2]: [130, 160, 80], [M.RUNE]: [80, 230, 255] };
  return { ...bake(sp, colours, st, "none", makeCanvas), origin: at([0, 0, 0]), dots: lit, height: F.h * s, sp };
}
