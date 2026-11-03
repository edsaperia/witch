// Paths and railways (Ed: "various varieties of pathways"; "Railways would be great. Paths should
// go in a few directions and not just be straight lines").
// Every path kind is a ground texture in GROUND space (seen from straight above, 16 px per metre;
// the prototype lays it on the ground as it does the floor):
//   strip   u across the path (its width), v along it; tiles along v, so the prototype can sweep it
//           along any spline (curves of any radius);
//   end     where a path peters out (v from the open end, 0, to where the strip joins, its length);
//   y, t    junction patches, laid where three paths meet (Y: arms at 120 degrees; T: a straight
//           through and one arm off it); each arm ends square, a path's width wide, where a strip joins.
// Plus 3D pieces at the game's view: edge props (verge posts, cat's-eyes, stepping stones, boardwalk
// posts, glowing mushrooms), stone stairs, a root bridge, a footbridge and a rope bridge; and for the
// railway: points (two tracks parting), a broken end, a level-crossing patch, and landmarks (a
// tipped goods wagon, an overgrown carriage, a station platform, a level crossing, a signal gantry).
// Night-readable and mostly unlit; the magic trail is the one glowing kind (and the carriage's
// windows). No text or liveries.
// Looks: every footpath kind has five named variants (each kind's `variants`; Ed, 2026-11-03: "several more variations of
// each kind of footpath so they look less repetitive"), dealt a line each by src/rules/pathGeometry.ts; strips repeat every 8 m
// (dirt 10). Bump maps: each surface pixel has a height, made into a stepped normal map (pathNormals) the game lights.
import { M, Sprite, hsv2rgb, sinHash, glowBall, defaultCanvas } from "./core.js";
import { BRIDGE_GENOMES, buildBridge } from "./props/bridges.js";
import { Model, render, v3 } from "./model3d.js";
import { witchPixelsPerUnit } from "./witch.js";

export const PATH_PPM = 16; // ground pixels per metre
const UP = [0, -.42, .9]; // a ground pixel's normal (as the floor's)
// value noise on the ground, periodic along v with period P (metres), so strips tile
const pkNoise = (x, y, k, P = 0) => { if (P) k = Math.max(1, Math.round(P * k)) / P; /* a whole number of cells per period, so it repeats */ const X = x * k, Y = y * k, ix = Math.floor(X), iy = Math.floor(Y), fx = X - ix, fy = Y - iy, n = P ? Math.round(P * k) : 0, w = j => n ? ((j % n) + n) % n : j, h = (a, b) => sinHash(a, w(b)), s = t => t * t * (3 - 2 * t); return (h(ix, iy) * (1 - s(fx)) + h(ix + 1, iy) * s(fx)) * (1 - s(fy)) + (h(ix, iy + 1) * (1 - s(fx)) + h(ix + 1, iy + 1) * s(fx)) * s(fy); };
// cells (for flagstones and cobbles): the nearest jittered point (d: how far, in cells), how much nearer it is than the second (edge), its id
function pkCells(x, y, k, P) { k = Math.max(1, Math.round(P * k)) / P; const X = x * k, Y = y * k, ix = Math.floor(X), iy = Math.floor(Y), n = Math.round(P * k); let d1 = 9, d2 = 9, id = 0; for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) { const cx = ix + i, cy = iy + j, wy = ((cy % n) + n) % n, px = cx + sinHash(cx, wy * 3 + 1), py = cy + sinHash(cx * 7 + 2, wy), d = Math.hypot(px - X, py - Y); if (d < d1) { d2 = d1; d1 = d; id = sinHash(cx, wy); } else if (d < d2) d2 = d; } return { edge: d2 - d1, id, d: d1 }; }
const vmod = (v, P) => ((v % P) + P) % P;
const kh = (k, n, s) => sinHash(((k % n) + n) % n + s * 37.3, s * 5.7 + 1.3); // a hash for the k-th of n things a period (so it repeats)
const grain = (u, v, w, s) => sinHash(Math.floor((u + 1) * w * 8) + s * 101, Math.floor(v * PATH_PPM)); // one value a ground pixel (w: the path's width)
// Slabs laid in rows (flagstones, setts): `rows` rows a period P, each split across into m slabs (m one of ms), staggered row to row.
// x: metres across from the left edge (of wid), v: metres along. { id, row, eu, ev, xl, vl }: the slab's id, its row (0 to rows - 1),
// how far to its nearest side across and along (m), and where in it (0 to 1 each way).
function pkSlabs(x, v, P, rows, wid, ms, s) {
  const f = v / P * rows, b = k => k + (kh(k, rows, s) - .5) * .3;
  let k = Math.floor(f); if (f < b(k)) k--; else if (f >= b(k + 1)) k++;
  const v0 = b(k), v1 = b(k + 1), row = ((k % rows) + rows) % rows, m = ms[Math.floor(kh(k, rows, s + 1) * ms.length)], xs = x / wid * m + kh(k, rows, s + 2), i = Math.floor(xs), fx = xs - i;
  return { id: sinHash(row * 13 + i, s + 3), row, eu: Math.min(fx, 1 - fx) * wid / m, ev: Math.min(f - v0, v1 - f) * P / rows, xl: fx, vl: (f - v0) / (v1 - v0) };
}

// Each kind: width (m), period (the strip's tile length, m), moods (areas it suits), variants (named: the footpaths' are dealt one a
// line by src/rules/pathGeometry.ts, so neighbouring paths of a kind differ; Ed, 2026-11-03: "generate several more variations of each
// kind of footpath so they look less repetitive"), and surface(u, v, core, variant): u in [-1, 1] across (0 the middle), v metres
// along; core: inside a junction's middle (no markings). Returns [material, tilt, height] or 0 (nothing: the ground shows through).
// tilt: the bake's shading jitter; height: the pixel's relief in steps of about 3 cm (stones, planks and roots raised and rounded,
// joints, gaps and ruts sunk, puddles flat), made into the strip's normal map (pathNormals) that the game lights (Ed, 2026-11-03:
// "Can you give them bump maps to make them less flat?").
const rag = (u, v, P, amt = .14, s = 0) => Math.abs(u) > 1 - amt * pkNoise((u > 0 ? 3 : 7) + s * 11, v, 1.4, P) * 1.6; // a ragged edge
export const PATH_KINDS = {
  dirt: { width: 3, period: 10, variants: ["worn", "rutted", "leafy", "stony", "overgrown"], desc: "a dirt track: bare earth, grass at its edges; worn pale down the middle, or rutted with puddles, under leaf litter, stony, or half grown over", moods: ["muddy-forest", "hazel-forest", "twiggy-forest", "alder-forest", "meadow", "grassland", "beaver-pond", "wispy-forest"],
    surface(u, v, core, va = 0) {
      const P = 10, s = va * 5 + 1, au = Math.abs(u); v = vmod(v, P);
      if (rag(u, v, P, [.26, .16, .3, .2, .4][va], s)) return 0;
      const n = pkNoise(u * 3 + s * 9, v, 2.2, P), n2 = pkNoise(u * 6 + s * 9, v, 5, P), g = grain(u, v, 3, s);
      if (au > .8 - n * .18) return [n2 > .55 ? M.LEAF2 : M.LEAF, .1, 1]; // grass at its edges, a little proud of it
      const earth = () => [g > .95 ? M.SKIN : n2 < .3 ? M.BODY3 : n2 > .8 ? M.BODYL : M.BODY, .05, g > .95 ? 1 : 0];
      if (va === 1) { // rutted: two deep ruts, long puddles in them, a grassy ridge between
        const r = Math.abs(au - .45);
        if (r < .13 + n * .04) { const deep = r < .07 + n * .03; return deep && pkNoise(u * 1.5 + s * 9, v, .45, P) > .56 ? [M.WATER, 0, -2] : [deep ? M.BROW : M.BODY3, .1, deep ? -2 : -1]; }
        if (au < .24 && n2 > .32) return [n > .5 ? M.LEAF : M.LEAF3, .15, 1];
        return earth();
      }
      if (va === 2) { // leafy: drifts of fallen leaves, a narrow worn line through them
        const lf = pkNoise(u * 7 + s * 9, v, 7, P), drift = pkNoise(u * 2 + s * 5, v, 1.1, P);
        if (lf > .66 - drift * .3) { const lc = pkNoise(u * 9 + s * 3, v, 8, P); return [lc > .58 ? M.HAIR : lc > .3 ? M.EAR : M.BARKD, .1, lf > .72 ? 1 : 0]; }
        return au < .14 + n * .1 ? [M.BODYL, .1, 0] : earth();
      }
      if (va === 3) { // stony: pebbles and stones worked up through it
        const c = pkCells(u * 1.8 + s * 9, v, 2, P), r = .26 + c.id * .2;
        if (c.id < .4 && c.d < r) return [c.d > r - .06 ? M.STONED : c.id < .2 ? M.STONE : M.IRIS, .05, c.d < r * .55 ? 2 : 1];
        if (g > .88) return [M.SKIN, .05, 1];
        return au < .2 + n * .1 ? [M.BODYL, .1, 0] : earth();
      }
      if (va === 4) { // overgrown: islands of grass in a darker, narrower track
        if (pkNoise(u * 2 + s * 9, v, 1.6, P) > .76 - au * .25) return [n2 > .62 ? M.LEAF2 : n2 < .3 ? M.LEAF3 : M.LEAF, .15, 1];
        return [g > .94 ? M.SKIN : n < .45 ? M.BODY3 : M.BODY, .1, g > .94 ? 1 : 0];
      }
      // worn: pale down the middle where feet go, two shallow ruts with a puddle now and then
      if (Math.abs(au - .5) < .08 + n * .04) return pkNoise(u * 2 + s * 9, v, .7, P) > .72 ? [M.WATER, 0, -1] : [n2 < .5 ? M.BODY3 : M.BROW, .1, -1];
      if (au < .12 + n * .16 && n2 > .3) return [g > .92 ? M.SKIN : M.BODYL, .1, g > .92 ? 1 : 0];
      return earth();
    } },
  animal: { width: 1.2, period: 8, variants: ["trodden", "patchy", "hoofprints", "leafy", "mossy"], desc: "an animal track: a faint, narrow trail wandering through the undergrowth: a line of trodden earth with the plants pressed flat each side; broken in patches, printed with hooves, through leaf litter, or a line of moss", moods: ["berry-thicket", "tangly-forest", "thorn-scrub", "jungle-understory", "fern-forest", "honeysuckle-tangle", "ancient", "tundra-bog"],
    surface(u, v, core, va = 0) {
      const P = 8, s = va * 5 + 2; v = vmod(v, P);
      const c = (pkNoise(5 + s * 9, v, .4, P) - .5) * .7, d = Math.abs(u - c), n = pkNoise(u * 2 + s * 9, v, 3, P), g = grain(u, v, 1.2, s), cw = .26 + n * .14; // the line wanders; cw: its half-width
      if (Math.abs(u) > .98 || d > cw + .3) return 0;
      if (d > cw) { // its margins: the undergrowth pressed flat, paler than the ground round it (or leaf litter kicked aside)
        const m = pkNoise(u * 4 + s * 3, v, 4, P);
        if (va === 3) return m > .45 ? [g > .5 ? M.HAIR : M.EAR, .25, 0] : 0;
        return m > [.42, .6, .5, 0, .5][va] ? [va === 4 ? M.MOSS : M.LEAF2, .1, 0] : 0;
      }
      if (va === 1 && pkNoise(u + s * 7, v, 1.1, P) < .42) return n > .5 ? [M.LEAF2, .1, 0] : 0; // patchy: the earth showing in patches
      if (va === 2) { // hoofprints: paired slots pressed into the mud, a puddle here and there
        const k = Math.floor(v / .4), t = v - k * .4 - .2, du = u - c - (k % 2 ? .18 : -.18);
        if (Math.abs(t) < .09 && (Math.abs(du - .09) < .07 || Math.abs(du + .09) < .07)) return [M.SHOE, 0, -2];
        if (pkNoise(u * 3 + s, v, 1.3, P) > .74) return [M.WATER, 0, -1];
        return [n > .55 ? M.BROW : M.BODY3, .1, -1];
      }
      if (va === 4) return [g > .9 || n < .3 ? M.BODY3 : n > .6 ? M.MOSS : M.LEAF2, .1, n < .3 ? -1 : 0]; // mossy: a line of moss, earth between
      return [n < .32 ? M.BODY3 : n > .62 || g > .93 ? M.BODYL : M.BODY, .05, -1];
    } },
  flagstones: { width: 2.5, period: 8, variants: ["laid", "sunken", "crazy", "single-file", "mossy"], desc: "flagstones: an old stone path, moss in the joints; laid in rows, sunken and tilted with some lost, crazy paving, a single file of slabs in the grass, or deep in moss", moods: ["stone-shrine", "ancient", "bluebell-glade", "old-oaks"],
    surface(u, v, core, va = 0) {
      const P = 8, s = va * 5 + 3, x = (u + 1) * 1.25; v = vmod(v, P);
      if (va !== 3 && rag(u, v, P, .08, s)) return 0;
      const n = pkNoise(u * 4 + s * 9, v, 4, P), g = grain(u, v, 2.5, s), tone = id => id < .18 ? M.STONED : id < .42 ? M.IRIS : id > .82 ? M.SOLE : M.STONE;
      if (va === 2) { // crazy paving: irregular pieces, pale, grass in the wider joints
        const c = pkCells(u * 1.8 + s * 9, v, 2, P);
        if (c.edge < .08) return c.edge < .04 && n > .55 ? 0 : [M.MOSS, .1, 0];
        return [c.id < .3 ? M.STONE : c.id > .8 ? M.IRIS : M.SOLE, .06, c.edge < .14 ? 1 : 2];
      }
      if (va === 3) { // single file: big slabs one after another down the middle, grass between
        const S = pkSlabs(x, v, P, 9, 2.5, [1], s), L = P / 9, lw = .5 + kh(S.row, 9, s + 4) * .3;
        if (Math.abs(u) > lw - n * .08 || S.vl < .12 + n * .06 || S.vl > .9 - n * .05) return 0;
        const e = Math.min((lw - Math.abs(u)) * 1.25, (S.vl - .12) * L, (.9 - S.vl) * L);
        return [n < .2 ? M.MOSS : tone(S.id), .1, e < .1 ? 1 : 2];
      }
      const S = pkSlabs(x, v, P, va === 1 ? 9 : 11, 2.5, va === 1 ? [1, 2, 2] : [2, 2, 3], s);
      if (S.eu < .05 || S.ev < .05) return va === 1 && n > .5 ? 0 : [va === 4 ? M.LEAF : M.MOSS, .1, -1]; // the joints
      const edge = S.eu < .11 || S.ev < .11;
      if (va === 1) { // sunken: some lost to the grass, each tilted its own way, grass creeping over their edges
        if (S.id < .14) return n > .45 ? [M.LEAF, .1, 0] : 0;
        if (S.eu < .16 && n > .6) return [M.LEAF2, .1, 1];
        const tilt = (kh(S.row * 3 + Math.floor(S.id * 7), 27, s + 5) - .5) * 3;
        return [n < .15 ? M.MOSS : tone(S.id), .12, (edge ? 1 : 2) + tilt * (S.xl - .5) - (S.id < .4 ? 1 : 0)];
      }
      if (va === 4) { // mossy: damp dark stone deep in moss, lichen spots
        if (pkNoise(u * 3 + s * 7, v, 2.5, P) > .48) return [n > .7 ? M.LEAF : M.MOSS, .15, edge ? 1 : 2];
        return [g > .97 ? M.FLOWER : S.id < .5 ? M.STONED : M.STONE, .06, edge ? 1 : 2];
      }
      return [n < .16 ? M.MOSS : tone(S.id), .06, edge ? 1 : 2]; // laid: rows of slabs, a moss patch here and there
    } },
  cobbles: { width: 4, period: 8, variants: ["setts", "river", "mossy", "patched", "kerbed"], desc: "cobbles: a stretch of old village lane; square setts in rows, rounded river cobbles, mossy, patched with gravel and puddles, or with a kerb each side and a gutter down the middle", moods: ["old-oaks", "meadow", "stone-shrine"],
    surface(u, v, core, va = 0) {
      const P = 8, s = va * 5 + 4, au = Math.abs(u), x = (u + 1) * 2; v = vmod(v, P);
      if (rag(u, v, P, .07, s)) return 0;
      const n = pkNoise(u * 3 + s * 9, v, 3, P), g = grain(u, v, 4, s), tone = id => id < .14 ? M.STONED : id < .48 ? M.STONE : id < .74 ? M.IRIS : M.SOLE;
      if (va === 4 && au > .86) { const S = pkSlabs(x, v, P, 9, 4, [1], s + 7); return S.ev < .05 ? [M.SHOE, 0, -1] : [M.SOLE, .08, S.ev < .1 || au > .96 || au < .89 ? 2 : 3]; } // a kerb of long stones each side
      if (va === 4 && au < .04) return [M.SHOE, .05, -2]; // the gutter down the middle
      if (va === 3) { const p = pkNoise(u * 1.2 + s * 9, v, .7, P); if (p > .63) return p > .73 && au < .5 ? [M.WATER, 0, -1] : [g > .7 ? M.SKIN : M.BODY, .2, g > .7 ? 0 : -1]; } // patched: gravel and a puddle where cobbles were lost
      if (va === 0 || va === 3) { // setts: squared stones in rows
        const S = pkSlabs(x, v, P, 32, 4, [15, 16], s);
        if (S.eu < .04 || S.ev < .04) return [n < .25 ? M.MOSS : M.STONED, 0, 0];
        return [tone(S.id), .04, S.eu < .08 || S.ev < .08 ? 1 : 2];
      }
      const c = pkCells(u * 2.2 + s * 9, v, 2.4, P); // river, mossy, kerbed: round cobbles
      if (c.edge < (va === 2 ? .14 : .09)) return va === 2 ? [n > .5 ? M.LEAF : M.MOSS, .1, 0] : [M.STONED, 0, 0];
      if (va === 2 && c.id < .1) return [M.MOSS, .1, 0]; // (one lost, moss in its place)
      return [va === 2 && n > .72 ? M.MOSS : tone(c.id), .04, c.edge < .2 ? 1 : 2];
    } },
  stepping: { width: 2, period: 8, variants: ["slabs", "boulders", "bog", "pairs", "logs"], desc: "stepping stones across water or bog (each also a 3D prop), a dark wet ring round each so they read on grass: flat slabs, round boulders, mossy stones in bog pools, stones in pairs, or log rounds", moods: ["mangrove-channel", "wetland", "tundra-bog", "ravine", "beaver-pond"],
    surface(u, v, core, va = 0) {
      const P = 8, s = va * 5 + 5, n = [8, 10, 8, 8, 8][va], sp = P / n; v = vmod(v, P);
      const kc = Math.floor(v / sp), wob = va === 4 ? 0 : (pkNoise(u * 5 + s * 9, v, 5, P) - .5) * .2; let d = 9, id = 0;
      for (let k = kc - 1; k <= kc + 1; k++) for (const j of va === 3 ? [-1, 1] : [0]) {
        const h1 = kh(k, n, s), h2 = kh(k, n, s + 1), h3 = kh(k, n, s + 2);
        if (va === 3 && j > 0 && h3 < .3) continue; // (a lone stone now and then)
        const cv = (k + .5 + (h1 - .5) * .3) * sp, cu = va === 3 ? j * .36 + (h2 - .5) * .12 : (((k % 2) + 2) % 2 ? .22 : -.22) + (h2 - .5) * .3;
        const r = [.36, .32, .34, .22, .3][va] * (.85 + h3 * .3), dk = Math.hypot((u - cu) / r, (v - cv) / (va === 0 ? r * .78 : r)) - wob;
        if (dk < d) { d = dk; id = h3; }
      }
      if (d > 1) { // the dark wet ring round each stone; pools between them in a bog
        if (d < 1.22) return [va === 2 ? M.WATER : M.SHOE, 0, -1];
        return va === 2 && Math.abs(u) < .85 && pkNoise(u * 1.5 + s * 9, v, 1, P) > .55 ? [M.WATER, 0, -1] : 0;
      }
      if (va === 4) return d > .8 ? [M.BARKD, .1, 1] : [Math.floor(d * 5) % 2 ? M.BARKL : M.TRUNK, .05, 2]; // log rounds: bark, then the rings
      const h = va === 0 ? (d > .78 ? 1 : 2) : d < .4 ? 3 : d < .74 ? 2 : 1;
      if (va === 2 && pkNoise(u * 4 + s, v, 3, P) > .48) return [M.MOSS, .1, h];
      return [d > .78 ? M.STONE : id > .7 ? M.IRIS : M.SOLE, .08, h];
    } },
  boardwalk: { width: 2.5, period: 8, variants: ["sound", "gappy", "silvered", "mossy", "lengthwise"], desc: "a boardwalk: planks on posts over bog or pools, nailed to its beams (posts are 3D props); sound, missing and broken planks, silvered with age, mossy and askew, or boards laid lengthwise", moods: ["tundra-bog", "wetland", "moor", "beaver-pond"],
    surface(u, v, core, va = 0) {
      const P = 8, s = va * 5 + 6, au = Math.abs(u); v = vmod(v, P);
      if (au > .97) return 0;
      if (au > .9) return [M.BARKD, .1, 2]; // the edge beams
      const n = pkNoise(u * 3 + s * 9, v, 3, P), g = grain(u, v, 2.5, s), woods = va === 2 ? [M.HAT2, M.HAT2, M.STRAW] : va === 3 ? [M.WOOD, M.BARK2, M.POM] : [M.WOOD, M.BARK2, M.WOOD, M.STRAW];
      if (va === 4) { // boards laid lengthwise, five across, butted end to end
        const bx = (u + .9) / 1.8 * 5, bi = Math.floor(bx), bu = bx - bi, m = 3 + (bi % 2), fb = v / (P / m) + kh(bi, 5, s), bk = Math.floor(fb), f = fb - bk;
        if (bu < .14) return [M.SHOE, 0, -2];
        if (f < .03) return [M.SHOE, 0, -1];
        if ((f < .07 || f > .95) && Math.abs(bu - .55) < .2) return [M.SHADES, 0, 1]; // nails at its ends
        return [pkNoise(bi * 7 + Math.floor(bu * 6), v, 2, P) > .72 ? M.BARKD : woods[Math.floor(sinHash(bi, ((bk % m) + m) % m + s) * woods.length)], .08, bu < .26 || bu > .92 ? 1 : 2];
      }
      const N = 27, pitch = P / N, k = Math.floor(v / pitch), f = v / pitch - k + (va === 3 ? (kh(k, N, s + 3) - .5) * .3 * u : 0), hk = kh(k, N, s);
      if (f < .2 || f >= 1) return [va === 1 ? M.WATER : M.SHOE, 0, -2]; // the gaps between planks: dark water under
      if (va === 1 && (hk < .16 || (hk < .28 && u > (kh(k, N, s + 1) - .5) * 1.2))) return Math.abs(au - .55) < .07 ? [M.BARKD, .1, -1] : [M.WATER, 0, -3]; // a plank gone (the beam under it), or broken off
      if (Math.abs(au - .58) < .04 && (Math.abs(f - .45) < .1 || Math.abs(f - .8) < .1)) return [M.SHADES, 0, 1]; // nails, over the beams
      if (va === 3 && pkNoise(u * 2 + s * 7, v, 1.5, P) > .52) return [n > .6 ? M.LEAF3 : M.MOSS, .1, 2];
      if (va === 2 && g > .94) return [M.FLOWER, .1, 2];
      const grainLine = Math.abs(Math.sin(u * 37 + k * 3.1)) < .1 && n > .3;
      return [grainLine ? M.BARKD : woods[Math.floor(kh(k, N, s + 2) * woods.length)], .08, f < .32 || f > .9 ? 1 : 2];
    } },
  tarmac: { width: 10, period: 8, desc: "an overgrown tarmac road: cracked, faded centre lines, verge posts and a cat's-eye or two (3D props)", moods: ["grassland", "deadwood", "heath", "muddy-forest", "moor"],
    surface(u, v, core) { const P = 8; if (rag(u, v, P, .06)) return 0; const n = pkNoise(u * 4, v, 1.1, P), crack = Math.abs(pkNoise(u * 6, v, .7, P) - .5) < .02 || Math.abs(pkNoise(u * 3 + 9, v, 1.6, P) - .5) < .012; if (crack) return [pkNoise(u, v, 6, P) < .5 ? M.LEAF2 : M.STONED, 0, -1]; if (Math.abs(u) > .9) return [n < .5 ? M.LEAF2 : M.LEAF, .1, 1]; if (!core && Math.abs(u) < .025 && (v % 4) < 2.2 && n > .3) return [M.CLOTH, .05]; if (!core && Math.abs(Math.abs(u) - .84) < .015 && n > .35) return [M.BELLY, .05]; return [n < .2 ? M.MOSS : n > .85 ? M.STONED : M.STONE, .05]; } },
  railway: { width: 4, period: 4, desc: "an old railway line: rusty rails, sleepers half-buried in grass", moods: ["grassland", "heath", "deadwood", "moor", "rocky-slope", "snowy-taiga"], variants: ["plain", "half-buried", "overgrown"],
    surface(u, v, core, variant = 0) { const P = 4, n = pkNoise(u * 3, v, 2.5, P), grass = [0, .35, .6][variant]; if (rag(u, v, P, .2)) return 0; const ru = Math.abs(Math.abs(u) - .3); if (ru < .05) return [pkNoise(u, v, 8, P) < grass * .5 ? M.LEAF2 : ru < .018 ? M.FRAME : M.SHADES, .3, ru < .03 ? 3 : 2]; /* the rails: dark, a rusty shine along their tops */ const k = Math.floor(v * 6 / P), f = v * 6 / P - k; if (Math.abs(u) < .55 && f < .38 && pkNoise(u, v, 6, P) > grass * .8) return [sinHash(k % 6, 2) < .25 ? M.BARKD : f < .06 || f > .32 ? M.BARKD : M.BARK2, .2, 1]; if (n < grass) return [n < grass * .5 ? M.LEAF : M.LEAF2, .1, 1]; return [n > .7 ? M.STONED : M.STONE, .3]; } },
  roots: { width: 2.5, period: 8, variants: ["gnarled", "dense", "sparse", "steps", "mossy"], desc: "a root path: gnarled roots crossing it at all angles, raised and rounded, bare earth between; a mat of them, a few, worn into steps, or mossy", moods: ["ancient", "old-oaks", "old-pinewood", "log-pile", "fern-forest"],
    surface(u, v, core, va = 0) {
      const P = 8, s = va * 5 + 7; v = vmod(v, P);
      if (rag(u, v, P, .22, s)) return 0;
      const x = u * 1.25, nr = [7, 12, 4, 9, 7][va], sp = P / nr, kc = Math.floor(v / sp), reach = Math.ceil(1.6 / sp) + 1;
      let r = 9, tread = false;
      for (let k = kc - reach; k <= kc + reach; k++) { // each root: a wavy line across (or part way across) at its own angle
        const a = (kh(k, nr, s) - .5) * (va === 3 ? .4 : 1.2), amp = .06 + kh(k, nr, s + 1) * .16, fq = 2 + kh(k, nr, s + 2) * 3, ph = kh(k, nr, s + 3) * 6.28;
        const t = (va === 1 ? .08 : .11) + kh(k, nr, s + 4) * (va === 2 ? .14 : .09);
        const xa = kh(k, nr, s + 5) < .35 ? -1.3 + kh(k, nr, s + 6) * 1.4 : -1.4, xb = kh(k, nr, s + 7) < .35 ? 1.3 - kh(k, nr, s + 8) * 1.4 : 1.4;
        if (x < xa || x > xb) continue;
        const cv = (k + .5 + (kh(k, nr, s + 9) - .5) * .5) * sp + a * x + amp * Math.sin(x * fq + ph), d = (v - cv) / Math.hypot(1, a + amp * fq * Math.cos(x * fq + ph)), te = t * Math.min(1, (x - xa) / .35, (xb - x) / .35);
        if (te > 0) r = Math.min(r, Math.abs(d) / te);
        if (va === 3 && d > te && d < te + .32) tread = true; // the step worn behind it
      }
      const n = pkNoise(u * 3 + s * 9, v, 3, P), g = grain(u, v, 2.5, s);
      if (r < 1) {
        if (va === 4 && r < .8 && pkNoise(u * 4 + s, v, 3, P) > .55) return [M.MOSS, .2, r < .45 ? 3 : 2];
        return [r < .3 ? M.BARKL : r > .78 ? M.BARKD : M.BARK2, .1, r < .45 ? 3 : r < .78 ? 2 : 1]; // (paler than the earth, so they read)
      }
      if (tread) return [g > .9 ? M.SKIN : M.BODYL, .1, 0];
      if (g > .9) return [g > .95 ? M.HAIR : M.EAR, .3, 0]; // leaf litter
      return [n < .3 ? M.BODY3 : M.BODY, .06, va === 3 ? -1 : 0];
    } },
  magic: { width: 2, period: 8, variants: ["mushrooms", "runestones", "sparse", "rings", "glowmoss"], glow: true, desc: "a magic trail: a mossy line marked out by softly glowing mushrooms and fairy stones (the one glowing kind; use rarely, leading to a set piece): clusters of caps each side, rune stones, lone big caps, fairy rings, or glowing moss", moods: ["bluebell-glade", "hazel-forest", "stone-shrine", "wispy-forest", "ancient"],
    surface(u, v, core, va = 0) {
      const P = 8, s = va * 5 + 8; v = vmod(v, P);
      const n = pkNoise(u * 3 + s * 9, v, 3, P), g = grain(u, v, 2, s), c = (pkNoise(3 + s * 9, v, .5, P) - .5) * .4;
      const cap = (cu, cv, r) => { const d = Math.hypot(u - cu, v - cv) / r; return d < 1 ? [d < .45 ? M.MAGIC2 : M.MAGIC, 0, d < .5 ? 3 : 2] : null; }; // a glowing cap
      const stone = (cu, cv, rune) => { const du = u - cu, dv = v - cv; if (Math.hypot(du / .26, dv / .2) > 1) return null; return rune && ((Math.abs(du) < .05 && Math.abs(dv) < .13) || (Math.abs(dv) < .05 && Math.abs(du) < .14)) ? [M.RUNE, 0, 1] : [M.SOLE, .1, 2]; }; // a pale fairy stone, a glowing rune cut in it
      let hit = null;
      if (va === 0) { // clusters of caps each metre, side to side, a rune stone every 2 m
        const k = Math.floor(v), side = k % 2 ? 1 : -1;
        for (let i = 0; i < 3 && !hit; i++) hit = cap(side * (.68 + (kh(k, 8, s + i) - .5) * .16) + (i - 1) * .13, k + .5 + (kh(k, 8, s + 3 + i) - .5) * .4, .08 + kh(k, 8, s + 6 + i) * .06);
        if (!hit) { const k2 = Math.floor((v + .5) / 2); hit = stone(c, k2 * 2 + .5, true); }
      } else if (va === 1) { // rune stones, side to side every 1.33 m, a tiny cap here and there
        const k = Math.floor(v / (P / 6)); hit = stone(c + (k % 2 ? .4 : -.4), (k + .5) * P / 6, true);
        if (!hit && Math.abs(u - c) < .3 && g > .985) hit = [M.MAGIC2, 0, 1];
      } else if (va === 2) { // sparse: a lone big cap every 2 m, a small one by it
        const k = Math.floor(v / 2), side = k % 2 ? 1 : -1;
        hit = cap(side * .6, k * 2 + 1, .17) || cap(side * .6 + side * .25, k * 2 + 1.25, .07);
      } else if (va === 3) { // fairy rings every 4 m, a cap or two between
        const k = Math.floor(v / 4), cv = k * 4 + 2;
        for (let i = 0; i < 9 && !hit; i++) { const a = i / 9 * 6.283 + k; hit = cap(c + Math.cos(a) * .55, cv + Math.sin(a) * .5, .07 + kh(i + k * 9, 18, s) * .03); }
        if (!hit) hit = cap(-c * 2 + .5, k * 4 + .2, .06);
      } else { // glowing moss down the middle, pale stones edging it
        if (Math.abs(u - c) < .26 && pkNoise(u * 8 + s, v, 8, P) > .66) hit = [g > .6 ? M.MAGIC2 : M.MAGIC, 0, 1];
        if (!hit) { const k = Math.floor(v / .8); hit = stone((k % 2 ? 1 : -1) * .78, (k + .5) * .8, false); }
      }
      if (hit) return hit;
      if (Math.abs(u - c) < .32 && n > .32) return [n > .6 ? M.LEAF2 : M.MOSS, .06, 0]; // the mossy line it follows, paler than the ground
      return 0;
    } },
};
// (heights to a sixteenth of a step, so a strip's relief repeats exactly along it)
for (const K of Object.values(PATH_KINDS)) { const f = K.surface; K.surface = (u, v, core, va = 0) => { const r = f(u, v, core, va); if (r && r[2]) r[2] = Math.round(r[2] * 16) / 16; return r; }; }

export const PATH_IDS = Object.keys(PATH_KINDS);

// ---------------- the ground textures ----------------
// (each drawn pixel's height, a surface's third value, kept in sp.hgt for pathNormals)
function ground(w, h, fn) { const sp = new Sprite(w, h); sp.hgt = new Float32Array(w * h); for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const r = fn(x + .5, y + .5); if (r) sp.hgt[y * w + x] = r[2] || 0; if (r) sp.px(x, y, r[0], UP[0] + (r[1] ? (sinHash(x, y) - .5) * r[1] : 0), UP[1] + (r[1] ? (sinHash(y, x) - .5) * r[1] * .5 : 0), UP[2]); } return sp; }
// One kind's textures: { strip, end, y, t } (Sprites in ground space; x across, y along; 16 px per metre).
export function pathTextures(id, { variant = 0 } = {}) {
  const K = PATH_KINDS[id], W = Math.round(K.width * PATH_PPM), L = Math.round(K.period * PATH_PPM), half = K.width / 2, S = (x, y, core) => K.surface(x, y, core, variant);
  const strip = ground(W, L, (x, y) => S((x / W) * 2 - 1, y / PATH_PPM));
  const E = Math.round(Math.max(1.5, K.width * .8) * PATH_PPM); // the end: the path narrows and frays towards v = 0
  const end = ground(W, E, (x, y) => { const t = y / E, u = ((x / W) * 2 - 1) / Math.max(.05, Math.sqrt(t)); return Math.abs(u) > 1 || pkNoise(x / PATH_PPM, y / PATH_PPM, 2) > .25 + t ? 0 : S(u, y / PATH_PPM); });
  // junctions: a square patch; each arm ends square at its edge, the path's width wide, centred on that edge's middle
  const J = Math.round(K.width * 2.4 * PATH_PPM), c = J / 2;
  const junction = arms => ground(J, J, (x, y) => {
    let best = null;
    for (const a of arms) { const dx = Math.cos(a), dy = Math.sin(a), along = (x - c) * dx + (y - c) * dy, across = -(x - c) * dy + (y - c) * dx; if (along < -K.width * PATH_PPM * .5) continue; const u = across / (W / 2); if (Math.abs(u) <= 1 && (!best || Math.abs(u) < Math.abs(best.u))) best = { u, v: (c - along) / PATH_PPM }; }
    if (!best) return 0; return S(best.u, ((best.v % K.period) + K.period) % K.period, Math.hypot(x - c, y - c) < W * .6);
  });
  return { strip, end, y: junction([-Math.PI / 2, Math.PI / 6, Math.PI * 5 / 6]), t: junction([Math.PI, 0, Math.PI / 2]), width: K.width, period: K.period };
}
// A kind's strip alone (what the game lays: no end or junction patches to bake), its heights in sp.hgt.
export function pathStrip(id, { variant = 0 } = {}) {
  const K = PATH_KINDS[id], W = Math.round(K.width * PATH_PPM), L = Math.round(K.period * PATH_PPM);
  return ground(W, L, (x, y) => K.surface((x / W) * 2 - 1, y / PATH_PPM, false, variant));
}
// The bump map (Ed, 2026-11-03: "Can you give them bump maps to make them less flat?"): a ground-space normal per pixel from the
// heights pathTextures and sweepPath keep (sp.hgt), as rgba bytes: r across (+x), g along (+y), b up, each -1..1 as 1..255 (b 0..255).
// The slopes are stepped (quarters), so a stone's bevel is a band of one or two pixels lit one way, as pixel art shades it, not a
// smooth ramp. A pixel next to nothing (the ground) takes its own height there, so a path's outline isn't bevelled. wrap: the strip
// repeats along y (its normals wrap round).
export const PATH_BUMP_SLOPE = .7; // how steep a one-step edge reads
export function pathNormals(sp, { wrap = false } = {}) {
  const { w, h } = sp, H = sp.hgt, out = new Uint8ClampedArray(w * h * 4);
  const at = (x, y, h0) => { if (x < 0 || x >= w) return h0; if (y < 0 || y >= h) { if (!wrap) return h0; y = (y + h) % h; } const i = y * w + x; return sp.m[i] ? H[i] : h0; };
  const q = t => Math.max(-1, Math.min(1, Math.round(t * 4) / 4));
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = y * w + x; if (!sp.m[i]) continue;
    const h0 = H ? H[i] : 0, nx = H ? -q((at(x + 1, y, h0) - at(x - 1, y, h0)) * .5 * PATH_BUMP_SLOPE) : 0, ny = H ? -q((at(x, y + 1, h0) - at(x, y - 1, h0)) * .5 * PATH_BUMP_SLOPE) : 0, l = Math.hypot(nx, ny, 1);
    out.set([128 + Math.round(nx / l * 127), 128 + Math.round(ny / l * 127), Math.round(255 / l), 255], i * 4);
  }
  return out;
}
// The bump map on a canvas (for the game's texture).
export function pathNormalCanvas(sp, { wrap = false } = {}, makeCanvas = defaultCanvas) {
  const c = makeCanvas(sp.w, sp.h), g = c.getContext("2d"), d = g.createImageData(sp.w, sp.h); d.data.set(pathNormals(sp, { wrap })); g.putImageData(d, 0, 0); return c;
}
// Sweeps a kind's strip along a polyline (ground metres) into a ground-space sprite: the reference for how
// the prototype lays paths along splines (u across from the line, v the distance along it).
// pts: one polyline [[x, y], ...] or several (a branch meeting another makes a junction where they overlap).
export function sweepPath(id, pts, { variant = 0, pad = 2 } = {}) {
  const K = PATH_KINDS[id], half = K.width / 2, lines = Array.isArray(pts[0][0]) ? pts : [pts], all = lines.flat();
  const xs = all.map(p => p[0]), ys = all.map(p => p[1]), x0 = Math.min(...xs) - half - pad, y0 = Math.min(...ys) - half - pad, W = Math.ceil((Math.max(...xs) + half + pad - x0) * PATH_PPM), H = Math.ceil((Math.max(...ys) + half + pad - y0) * PATH_PPM);
  const segs = []; for (const line of lines) { let acc = 0; for (let i = 0; i + 1 < line.length; i++) { const a = line[i], b = line[i + 1], l = Math.hypot(b[0] - a[0], b[1] - a[1]); segs.push({ a, b, l, s: acc, first: i === 0, last: i + 2 === line.length }); acc += l; } for (const g of segs) g.len ??= acc; }
  const sp = new Sprite(W, H); sp.hgt = new Float32Array(W * H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const px = x0 + (x + .5) / PATH_PPM, py = y0 + (y + .5) / PATH_PPM; let best = null;
    for (const g of segs) { const dx = g.b[0] - g.a[0], dy = g.b[1] - g.a[1], t0 = ((px - g.a[0]) * dx + (py - g.a[1]) * dy) / (g.l * g.l); if ((t0 < 0 && g.first) || (t0 > 1 && g.last)) continue; /* a line's ends are cut square (use the end texture there) */ const t = Math.max(0, Math.min(1, t0)), qx = g.a[0] + dx * t, qy = g.a[1] + dy * t, d = Math.hypot(px - qx, py - qy); if (d <= half && (!best || d < best.d)) best = { d, u: ((px - qx) * -dy + (py - qy) * dx) / g.l / half, v: g.s + t * g.l, vr: g.s + t0 * g.l, len: g.len }; }
    if (!best || best.vr < 0 || best.vr > best.len) continue; /* (no round cap past a line's end) */ const r = K.surface(best.u, ((best.v % K.period) + K.period) % K.period, false, variant); if (r) { sp.px(x, y, r[0], UP[0], UP[1], UP[2]); sp.hgt[y * W + x] = r[2] || 0; }
  }
  return { sp, origin: [-x0 * PATH_PPM, -y0 * PATH_PPM] };
}
// Railway points: two tracks parting, one straight and one curving away (ground space).
export function railPoints({ variant = 0, length = 16, radius = 30 } = {}) {
  const straight = [[0, 0], [length, 0]], curve = []; for (let i = 0; i <= 12; i++) { const a = i / 12 * (length / radius); curve.push([Math.sin(a) * radius, (1 - Math.cos(a)) * radius]); }
  const A = sweepPath("railway", straight, { variant, pad: 0 }), B = sweepPath("railway", curve, { variant, pad: 0 });
  const W = Math.max(A.sp.w, B.sp.w + Math.round(B.origin[0] - A.origin[0])), oy = Math.max(A.origin[1], B.origin[1]), H = Math.max(A.sp.h - A.origin[1], B.sp.h - B.origin[1]) + oy, sp = new Sprite(W, Math.ceil(H));
  for (const P of [B, A]) for (let y = 0; y < P.sp.h; y++) for (let x = 0; x < P.sp.w; x++) { const m = P.sp.m[y * P.sp.w + x]; if (!m) continue; const X = x + Math.round(A.origin[0] - P.origin[0]), Y = y + Math.round(oy - P.origin[1]); if (sp.inb(X, Y) && !(sp.m[Y * W + X] === M.FRAME && m !== M.FRAME)) sp.px(X, Y, m, UP[0], UP[1], UP[2]); }
  return sp;
}
// The broken end of a line: the rails lifted and bent, sleepers scattered (ground space).
export function railBrokenEnd({ variant = 1 } = {}) {
  const K = PATH_KINDS.railway, W = Math.round(K.width * PATH_PPM), L = Math.round(6 * PATH_PPM);
  return ground(W, L, (x, y) => { const u = (x / W) * 2 - 1, v = y / PATH_PPM, t = y / L; if (t < .35) { const k = Math.floor(v / .67); if (sinHash(k, 4) < .5 && Math.abs(u + (sinHash(k, 5) - .5) * .5) < .5 && (v / .67 - k) < .35) return [M.WOOD, .3]; return pkNoise(u, v, 2) > .55 ? [M.LEAF2, .1] : 0; } return K.surface(u, v % K.period, false, variant); });
}
// A level crossing's road surface: tarmac over the rails (ground space, a square the road's width).
export function railCrossing() {
  const R = PATH_KINDS.tarmac, W = Math.round(R.width * PATH_PPM);
  return ground(W, W, (x, y) => { const u = (x / W) * 2 - 1, v = (y / W) * 2 - 1; if (Math.abs(Math.abs(v) - .12) < .02 && Math.abs(u) < .95) return [M.FRAME, .3]; return R.surface(u, (y / PATH_PPM) % R.period, true); });
}

// ---------------- 3D pieces at the game's view ----------------
const pkCell = (p, k, s = 0) => sinHash(Math.floor(p[0] * k) + Math.floor(p[2] * k) * 57 + s, Math.floor(p[1] * k));
const pkWorn = (rust = .25, moss = .15) => p => { const r = pkCell(p, 16, 3), n = pkCell(p, 6, 5); return n < moss && p[1] > .1 ? M.MOSS : r > 1 - rust * .7 ? M.BODY2 : undefined; };
const pkBar = (m, a, b, g, r = .025, mat = M.FRAME) => m.seg(a, b, r, r, mat, { group: g, paint: pkWorn(.4, .05) });
const pkStone = (m, c, r, g) => m.ell(c, r, M.STONE, { group: g, rough: .025, paint: p => p[1] > c[1] + r[1] * .5 && pkCell(p, 5, g) < .6 ? M.MOSS : pkCell(p, 14) > .9 ? M.STONED : undefined });
const pkTufts = (m, n, R, g, seed) => { for (let i = 0; i < n; i++) { const a = sinHash(seed, i) * 6.283, d = R * Math.sqrt(sinHash(i, seed)); m.ell([Math.cos(a) * d, .07, Math.sin(a) * d * .7], [.07, .1 + sinHash(i, 4) * .08, .07], M.LEAF2, { group: g + (i % 3), paint: p => p[1] > .13 ? M.LEAF : undefined }); } };
const pkCrown = (m, c, r, g) => m.ell(c, r, M.LEAF, { group: g, rough: .04, paint: p => { const n = pkCell(p, 10, 2); return p[1] < c[1] - .15 || n < .2 ? M.LEAF3 : n > .8 ? M.LEAF2 : undefined; } });
const pkIvy = (m, from, to, g, seed) => { const pts = []; for (let k = 0; k <= 4; k++) pts.push([...v3.add(v3.lerp(from, to, k / 4), [(sinHash(seed, k) - .5) * .12, 0, .02]), .03]); m.chain(pts, M.LEAF, { group: g, paint: p => pkCell(p, 30) < .3 ? M.LEAF2 : undefined }); };
function pkPlace(m, from, { pitch = 0, roll = 0, at = [0, 0, 0] } = {}) {
  const R = (v, a, i, j) => { const c = Math.cos(a), s = Math.sin(a), o = [...v]; o[i] = v[i] * c - v[j] * s; o[j] = v[i] * s + v[j] * c; return o; };
  const rot = v => R(R(v, roll, 1, 2), pitch, 0, 1), inv = v => R(R(v, -pitch, 0, 1), -roll, 1, 2), fwd = p => v3.add(rot(p), at), back = p => inv(v3.sub(p, at));
  for (const q of m.parts.slice(from)) { if (q.type === "cone") { q.a = fwd(q.a); q.b = fwd(q.b); } else { q.c = fwd(q.c); q.axes = q.axes.map(rot); } if (q.paint) { const f = q.paint; q.paint = (p, part) => f(back(p), part); } }
}
const PIECES = {
  // edge props
  "verge-post": { family: "prop", path: "tarmac", desc: "a road's verge post, leaning, its band faded", build(m) { const n = m.parts.length; m.box([0, .4, 0], [.06, .4, .06], M.BELLY, { round: .02, group: 1, paint: p => Math.abs(p[1] - .62) < .06 ? M.SHADES : pkWorn(.1, .2)(p) }); pkPlace(m, n, { roll: .15, pitch: .1 }); pkTufts(m, 4, .25, 3, 1); } },
  "cats-eye": { family: "prop", path: "tarmac", desc: "a cat's-eye stud in the road (unlit)", build(m) { m.box([0, .02, 0], [.09, .02, .05], M.SHADES, { round: .01, group: 1 }); for (const x of [-.04, .04]) m.ell([x, .04, .03], [.025, .015, .015], M.FRAME, { group: 2 }); } },
  "stepping-stone": { family: "prop", path: "stepping", desc: "a stepping stone, flat-topped and mossy", build(m) { pkStone(m, [0, .08, 0], [.38, .12, .3], 1); } },
  "boardwalk-post": { family: "prop", path: "boardwalk", desc: "a boardwalk's post, standing in the water", build(m) { m.seg([0, 0, 0], [0, .55, 0], .06, .055, M.WOOD, { group: 1, paint: p => p[1] < .12 ? M.MOSS : p[1] > .5 ? M.BARK2 : undefined }); } },
  "sleeper-sapling": { family: "prop", path: "railway", desc: "a sapling grown up between the sleepers", build(m) { m.seg([0, 0, 0], [0, .9, 0], .025, .015, M.TRUNK, { group: 1 }); pkCrown(m, [0, .95, 0], [.22, .18, .2], 2); pkTufts(m, 4, .2, 3, 2); } },
  "glow-mushrooms": { family: "prop", path: "magic", glow: true, desc: "a cluster of softly glowing mushrooms", build(m) { for (let i = 0; i < 4; i++) { const c = [(sinHash(i) - .5) * .3, 0, (sinHash(i, 2) - .5) * .2], h = .08 + sinHash(i, 3) * .1; m.seg(c, v3.add(c, [0, h, 0]), .015, .012, M.CLOTH, { group: 1 }); m.ell(v3.add(c, [0, h + .02, 0]), [.05, .03, .05], M.MAGIC, { group: 2 + i, paint: p => p[1] > c[1] + h + .035 ? M.MAGIC2 : undefined }); } } },
  "fairy-stone": { family: "prop", path: "magic", glow: true, desc: "a small fairy stone with a glowing rune", build(m) { m.box([0, .18, 0], [.09, .18, .06], M.STONE, { round: .04, group: 1, paint: p => p[2] > .04 && Math.abs(p[1] - .2) < .07 && Math.abs(p[0]) < .025 ? M.RUNE : p[1] > .32 ? M.MOSS : undefined }); } },
  "signal-post": { family: "prop", path: "railway", desc: "a rusty old signal post, its arm dropped (unlit)", build(m) { pkBar(m, [0, 0, 0], [0, 2.2, 0], 1, .04); m.box([.25, 2.0, 0], [.25, .05, .02], M.ACCENT, { dir: [1, -.6, 0], group: 2, paint: p => p[0] > .38 ? M.BELLY : pkWorn(.4, 0)(p) }); m.ell([0, 2.05, .05], [.06, .06, .03], M.SHADES, { group: 3 }); pkIvy(m, [0, 0, .04], [.02, 1.4, .04], 4, 3); } },
  // crossings and steps
  "stairs": { family: "piece", path: "stairs", desc: "a short flight of mossy stone stairs, for ruins and hollows", build(m) { for (let k = 0; k < 5; k++) m.box([0, .1 + k * .2, -k * .3], [.6, .1 + k * .2, .15], M.STONE, { round: .03, rough: .01, group: 1 + (k % 2), paint: p => p[1] > .16 + k * .4 && pkCell(p, 6, k) < .35 ? M.MOSS : pkCell(p, 14) > .9 ? M.STONED : undefined }); for (const x of [-.7, .7]) pkStone(m, [x, .3, -.6], [.15, .35, .7], 5); } },
  "stairs-turn": { family: "piece", path: "stairs", desc: "stone stairs turning on a landing", build(m) { for (let k = 0; k < 3; k++) m.box([0, .1 + k * .2, -k * .3], [.5, .1 + k * .2, .15], M.STONE, { round: .03, rough: .01, group: 1 + (k % 2), paint: p => pkCell(p, 6, k) < .3 && p[1] > .2 + k * .4 ? M.MOSS : undefined }); m.box([0, .35, -1.1], [.55, .35, .5], M.STONE, { round: .03, group: 3, paint: p => pkCell(p, 6) < .3 && p[1] > .6 ? M.MOSS : undefined }); for (let k = 0; k < 3; k++) m.box([.65 + k * .3, .8 + k * .2, -1.1], [.15, .1 + k * .1, .5], M.STONE, { round: .03, group: 4 + (k % 2) }); } },
  "root-bridge": { family: "piece", path: "roots", desc: "a bridge of gnarled roots over a stream", build(m) { m.ell([0, .01, 0], [1.4, .015, .6], M.WATER, { group: 1 }); for (let i = 0; i < 4; i++) m.chain([[-1.8, 0, -.4 + i * .27, .14], [-.8, .45, -.35 + i * .25, .1], [.6, .5, -.3 + i * .22, .1], [1.8, 0, -.25 + i * .2, .13]], M.TRUNK, { group: 2 + (i % 2), rough: .015, paint: p => pkCell(p, 12) < .12 ? M.BARKD : p[1] > .55 && pkCell(p, 5) < .3 ? M.MOSS : undefined }); pkCrown(m, [-1.7, .25, -.5], [.3, .2, .25], 5); } },
  "footbridge": { family: "piece", path: "bridges", desc: "a little wooden footbridge over a stream", build(m) { m.ell([0, .01, 0], [1.2, .015, .7], M.WATER, { group: 1 }); for (let k = -6; k <= 6; k++) { const x = k * .2, y = .35 - (x * x) * .1; m.box([x, y, 0], [.09, .03, .5], M.WOOD, { round: .01, group: 2 + (k & 1), paint: p => pkCell(p, 10) < .15 ? M.MOSS : undefined }); } for (const z of [-.5, .5]) { for (const x of [-1.1, 0, 1.1]) m.seg([x, .3 - x * x * .1, z], [x, .85 - x * x * .1, z], .03, .03, M.WOOD, { group: 4 }); m.chain([[-1.1, .85 - .121, z, .025], [0, .85, z, .025], [1.1, .85 - .121, z, .025]], M.WOOD, { group: 4 }); } } },
  "rope-bridge": { family: "piece", path: "bridges", desc: "a rope bridge over a stream, planks sagging, one missing", build(m) { m.ell([0, .01, 0], [1.3, .015, .7], M.WATER, { group: 1 }); for (const x of [-1.6, 1.6]) for (const z of [-.45, .45]) m.seg([x, 0, z], [x, 1.1, z], .05, .045, M.WOOD, { group: 2 }); for (let k = -7; k <= 7; k++) { if (k === 3) continue; const x = k * .2, y = .55 - (1 - (x / 1.6) ** 2) * .3; m.box([x, y, 0], [.08, .02, .38], M.WOOD, { round: .01, group: 3 + (k & 1) }); } for (const z of [-.45, .45]) for (const top of [0, 1]) { const pts = []; for (let k = 0; k <= 8; k++) { const x = -1.6 + k * .4, y = (top ? 1.05 : .55) - (1 - (x / 1.6) ** 2) * (top ? .25 : .3); pts.push([x, y, z, .015]); } m.chain(pts, M.STRAW, { group: 5 }); } } },
  // railway landmarks
  "goods-wagon": { family: "landmark", path: "railway", desc: "an abandoned goods wagon tipped on its side (no livery)", build(m) { const n = m.parts.length; m.box([0, .75, 0], [1.6, .65, .6], M.BODY2, { round: .05, group: 1, paint: p => ((p[0] + 9) * 4) % 1 < .08 ? M.SHADES : pkWorn(.6, .2)(p) }); for (const x of [-1.1, 1.1]) for (const z of [-.55, .55]) m.ell([x, .22, z], [.22, .22, .06], M.SHADES, { group: 2, paint: p => Math.hypot(p[0] - x, p[1] - .22) < .08 ? M.FRAME : undefined }); pkPlace(m, n, { roll: 1.4, at: [0, .3, .3] }); pkTufts(m, 14, 2.2, 4, 5); pkIvy(m, [-1.2, 0, 1.0], [-.6, 1.0, 1.1], 7, 6); } },
  "carriage": { family: "landmark", path: "railway", glow: true, desc: "an old passenger carriage, mossy roof, a tree grown through it, its windows glowing", build(m) { m.box([0, .95, 0], [2.4, .65, .62], M.HAT1, { round: .08, group: 1, paint: p => { if (Math.abs(p[2]) > .58 && p[1] > 1.0 && p[1] < 1.35 && ((p[0] + 9) * 1.6) % 1 > .25) return pkCell(p, 9) < .2 ? M.SHADES : M.GLOW; return pkWorn(.4, .15)(p); } }); m.ell([0, 1.62, 0], [2.4, .14, .62], M.MOSS, { group: 2, paint: p => pkCell(p, 6) < .3 ? M.LEAF2 : undefined }); for (const x of [-1.8, 1.8]) for (const z of [-.5, .5]) m.ell([x, .25, z], [.24, .24, .06], M.SHADES, { group: 3 }); m.chain([[.6, 0, 0, .2], [.6, 1.8, 0, .16], [.7, 2.9, -.1, .09]], M.TRUNK, { group: 4, rough: .015 }); pkCrown(m, [.7, 3.1, -.1], [1.0, .6, .8], 5); pkTufts(m, 16, 2.8, 6, 7); } },
  "platform": { family: "landmark", path: "railway", desc: "a little station platform, a bench and a lamp post (no name board)", build(m) { m.box([0, .35, 0], [2.4, .35, .7], M.STONE, { round: .02, rough: .008, group: 1, paint: p => p[2] > .62 && p[1] > .6 ? M.BELLY : p[1] > .66 && pkCell(p, 5) < .25 ? M.MOSS : ((p[0] + 9) * 2.5) % 1 < .06 ? M.STONED : undefined }); m.box([-.6, .95, -.3], [.6, .04, .16], M.WOOD, { group: 2 }); m.box([-.6, 1.2, -.44], [.6, .18, .03], M.WOOD, { group: 2 }); for (const x of [-1.1, -.1]) m.box([x, .82, -.3], [.04, .12, .14], M.FRAME, { group: 2 }); pkBar(m, [1.4, .7, -.4], [1.4, 2.4, -.4], 3, .035); m.box([1.4, 2.5, -.4], [.12, .12, .12], M.FRAME, { round: .03, group: 4, paint: p => Math.abs(p[1] - 2.5) < .07 ? M.SHADES : undefined }); pkIvy(m, [1.4, .7, -.36], [1.42, 2.2, -.36], 5, 8); pkTufts(m, 10, 2.4, 6, 9); } },
  "level-crossing": { family: "landmark", path: "railway", desc: "a level crossing's barrier post, its boom broken off and lying in the grass", build(m) { m.box([0, .55, 0], [.15, .55, .15], M.BELLY, { round: .03, group: 1, paint: pkWorn(.3, .15) }); m.box([.6, 1.05, 0], [.6, .05, .04], M.BELLY, { group: 2, paint: p => ((p[0] + 9) * 2.5) % 1 < .5 ? M.ACCENT : pkWorn(.3, 0)(p) }); m.box([1.6, .05, .4], [.7, .05, .04], M.BELLY, { dir: [1, 0, .5], group: 3, paint: p => ((p[0] + 9) * 2.5) % 1 < .5 ? M.ACCENT : pkWorn(.3, .15)(p) }); pkBar(m, [-.5, 0, 0], [-.5, 1.6, 0], 4, .03); for (const s of [-1, 1]) m.box([-.5, 1.6, 0], [.35, .04, .015], M.BELLY, { dir: [1, s, 0], group: 5 }); pkTufts(m, 10, 1.6, 6, 10); } },
  "buffer-stop": { family: "landmark", path: "railway", desc: "a buffer stop at the end of the line: a timber beam on rusty posts, its buffers worn, grass round its short stub of track", build(m) { for (const z of [-.45, .45]) { pkBar(m, [-.2, 0, z], [0, .75, z], 1, .05); pkBar(m, [.35, 0, z], [0, .7, z], 1, .04); m.seg([0, .62, z], [.22, .62, z], .07, .07, M.FRAME, { group: 2, paint: pkWorn(.5, 0) }); m.ell([.25, .62, z], [.03, .1, .1], M.SHADES, { group: 2 }); } m.box([0, .7, 0], [.08, .1, .75], M.ACCENT, { round: .02, group: 3, paint: p => ((p[2] + 9) * 4) % 1 < .5 ? M.BELLY : pkWorn(.4, .1)(p) }); for (const z of [-.3, .3]) m.seg([.2, .03, z], [2.0, .03, z], .03, .03, M.SHADES, { group: 4, paint: p => p[1] > .05 ? M.FRAME : undefined }); for (let i = 0; i < 4; i++) m.box([.5 + i * .45, .02, 0], [.07, .02, .45], M.WOOD, { group: 5, paint: p => pkCell(p, 9) < .3 ? M.MOSS : undefined }); pkTufts(m, 12, 1.4, 6, 12); } },
  "signal-gantry": { family: "landmark", path: "railway", desc: "a rusty signal gantry spanning the line, its signals dark", build(m) { for (const x of [-2.0, 2.0]) for (const z of [-.15, .15]) pkBar(m, [x, 0, z], [x, 3.0, z], 1, .04); for (let i = 0; i < 8; i++) { const x = -2.0 + i * .5; pkBar(m, [x, 2.8, 0], [x + .5, 3.1, 0], 2, .02); pkBar(m, [x, 3.1, 0], [x + .5, 2.8, 0], 2, .02); } for (const y of [2.8, 3.1]) pkBar(m, [-2.0, y, 0], [2.0, y, 0], 3, .035); for (const x of [-.8, .8]) { pkBar(m, [x, 2.8, .05], [x, 2.3, .05], 4, .02); m.box([x, 2.2, .08], [.12, .2, .05], M.SHADES, { round: .03, group: 5, paint: p => Math.hypot(p[0] - x, p[1] - 2.27) < .05 || Math.hypot(p[0] - x, p[1] - 2.13) < .05 ? M.FRAME : undefined }); } pkIvy(m, [-2.0, 0, .2], [-1.95, 2.4, .2], 6, 11); } },
};
export const PATH_PIECES = Object.entries(PIECES).map(([id, d]) => ({ id, ...d }));
export const PATH_PIECE_BY_ID = Object.fromEntries(PATH_PIECES.map(d => [d.id, d]));
export function pathColours(st = {}) {
  const leaf = st.leafHue ?? .3, trunk = st.trunkHue ?? .07;
  return {
    [M.STONE]: [118, 116, 124], [M.STONED]: [58, 56, 66], [M.MOSS]: hsv2rgb(.26, .45, .45), [M.BELLY]: [220, 216, 204], [M.CLOTH]: [208, 204, 188],
    [M.BARK2]: [104, 80, 56], [M.BARKD]: hsv2rgb(trunk + .03, .5, .17), [M.BODY2]: [128, 98, 70], [M.BARKL]: hsv2rgb(trunk, .35, .55), [M.TRUNK]: hsv2rgb(trunk, .45, .36),
    [M.LEAF]: hsv2rgb(leaf, .55, .45), [M.LEAF2]: hsv2rgb(leaf - .03, .5, .6), [M.LEAF3]: hsv2rgb(leaf + .03, .6, .28),
    [M.WOOD]: [128, 94, 60], [M.STRAW]: [180, 156, 104], [M.FRAME]: [168, 120, 92], [M.SHADES]: [26, 26, 32], [M.ACCENT]: [176, 52, 46], [M.HAT1]: [66, 92, 74], [M.WATER]: [44, 70, 96], [M.NOSE]: [14, 12, 18],
    // the footpaths' own (no 3D piece uses these): earth (base, dark, worn pale, wet mud), leaf litter, gravel, warm and pale stone,
    // the dark of a joint or a gap, silvered wood, lichen
    [M.BODY]: hsv2rgb(trunk + .01, .42, .38), [M.BODY3]: hsv2rgb(trunk, .45, .26), [M.BODYL]: hsv2rgb(trunk + .025, .36, .48), [M.BROW]: hsv2rgb(trunk - .01, .45, .19),
    [M.HAIR]: hsv2rgb(.05, .55, .4), [M.EAR]: hsv2rgb(.12, .5, .44), [M.SKIN]: [126, 121, 112], [M.IRIS]: [128, 117, 102], [M.SOLE]: [158, 155, 150],
    [M.SHOE]: [30, 28, 34], [M.HAT2]: [118, 113, 104], [M.POM]: [72, 54, 40], [M.FLOWER]: [150, 158, 122],
    [M.GLOW]: [255, 196, 110], [M.MAGIC]: hsv2rgb(st.magicHue ?? .5, .55, 1), [M.MAGIC2]: hsv2rgb(st.magicHue ?? .5, .15, 1), [M.RUNE]: [150, 240, 255], [M.LINE]: [24, 22, 30],
  };
}
// One 3D piece at the game's view, cropped to what is drawn: { sp, origin, metres }.
// "<bridge>~<k>": the bridge's generated variant k (art/props/bridges.js, under ?props=gen).
export function pathPieceSprite(id, st = {}, ppm = 16) {
  const [base, k] = id.split("~"), d = PATH_PIECE_BY_ID[base]; if (k !== undefined ? !BRIDGE_GENOMES[base] : !d) throw new Error(`no path piece "${id}"`); // (the fingerpost has only generated variants)
  const m = new Model({ blend: .04 }); if (k !== undefined) buildBridge(m, base, +k); else d.build(m); m.ell([0, .004, 0], [.01, .004, .01], M.NOSE, { group: 0 });
  const s = witchPixelsPerUnit(st) * 1.1, r = render(m, { scale: s }), full = r.sp;
  let x0 = full.w, x1 = -1, y0 = full.h; for (let y = 0; y < full.h; y++) for (let x = 0; x < full.w; x++) if (full.m[y * full.w + x]) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); }
  const sp = new Sprite(x1 - x0 + 1, full.h - y0); for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) { const i = (y + y0) * full.w + x + x0; if (full.m[i]) sp.put(x, y, full.m[i], full.n[i * 3], full.n[i * 3 + 1], full.n[i * 3 + 2]); }
  const [ox, oy] = r.project([0, 0, 0]);
  return { sp, origin: { x: +(ox - x0).toFixed(1), y: +(oy - y0).toFixed(1) }, metres: { width: +(sp.w / ppm).toFixed(1), height: +(sp.h / ppm).toFixed(1) } };
}
// The areas each path kind suits, turned round: { areaId: [kinds] }, for an area's layout to name its preferred paths; with each
// area's own extra kinds (areas: art/areas.js AREAS, an area's `pathKinds`: stairs on the steep ones, bridges over the stream).
export function pathKindsByArea(areas = []) { const out = {}; for (const [k, K] of Object.entries(PATH_KINDS)) for (const a of K.moods) (out[a] = out[a] || []).push(k); for (const A of areas) for (const k of A.pathKinds || []) (out[A.id] = out[A.id] || []).push(k); return out; }
