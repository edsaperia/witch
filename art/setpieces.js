// Set pieces for the areas that had none (Ed: "I really want each forest to feel quite different
// and unique ... Make set pieces for the other areas too"). Each is its area's landmark, built in
// 3D (model3d.js) at the witch's own scale and about 6 to 12 m across or tall, turned towards the
// viewer. Most are unlit; a few have one magical touch (fairy-stone runes, will-o'-wisps, glowworms,
// a charcoal mound's embers). The flowering areas (meadow, heath, berry thicket) have none.
import { M, Sprite, hsv2rgb, cropKeepBottom } from "./core.js";
import { Model, render, v3 } from "./model3d.js";
import { witchPixelsPerUnit } from "./witch.js";
import { SET_PROP_GENOMES, genSetPiece } from "./props/sets.js";

const spHash = (a, b = 0) => { const x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return x - Math.floor(x); };
const spBark = p => { const n = spHash(Math.floor(p[0] * 14) + Math.floor(p[2] * 14) * 13, Math.floor(p[1] * 6)); return n < .14 ? M.BARKD : n > .88 ? M.BARKL : undefined; };
const spLeafy = c => p => { const n = spHash(Math.floor(p[0] * 10), Math.floor(p[1] * 10) + Math.floor(p[2] * 10) * 7); return p[1] < c[1] - .2 || n < .2 ? M.LEAF3 : n > .8 ? M.LEAF2 : undefined; };
// the kit
const spRockAt = (m, c, r, g, moss = true) => m.ell(c, r, M.STONE, { group: g, rough: .025, paint: p => p[1] > c[1] + r[1] * .45 && moss ? M.MOSS : Math.abs(Math.sin(p[0] * 13 + p[2] * 7)) < .06 ? M.STONED : undefined });
const spCrown = (m, c, r, g) => m.ell(c, r, M.LEAF, { group: g, rough: .04, paint: spLeafy(c) });
const spLimb = (m, pts, g) => m.chain(pts, M.TRUNK, { group: g, rough: .012, paint: spBark });
const spTufts = (m, n, R, g, seed, h = .3, mat = M.LEAF2) => { for (let i = 0; i < n; i++) { const a = spHash(seed, i) * 6.283, d = R * Math.sqrt(spHash(i, seed)), x = Math.cos(a) * d, z = Math.sin(a) * d * .7; m.ell([x, h * .3, z], [.07, h * (.35 + spHash(i, 4) * .3), .07], mat, { group: g + (i % 3), paint: p => p[1] > h * .45 ? M.LEAF : undefined }); } }; // grass spTufts
const spWater = (m, c, r, g) => m.ell(c, [r[0], .015, r[1]], M.WATER, { group: g });

// Each builder fills a model; the ground is y = 0, x right, z towards the viewer.
const spSETS = {
  // moor: the sleeping giant, a long mound of moss shaped like a figure lying on its back
  "sleeping-giant"(m) {
    const moss = c => p => { const n = spHash(Math.floor(p[0] * 8), Math.floor(p[2] * 8) + Math.floor(p[1] * 8) * 5); return n < .15 ? M.LEAF3 : n > .86 ? M.LEAF2 : undefined; };
    for (const [c, r] of [[[.85, .42, 0], [.7, .5, .66]], [[0, .3, 0], [.62, .36, .6]], [[-.8, .3, 0], [.56, .36, .62]], [[1.85, .5, .02], [.5, .5, .48]], // chest, belly, hips, head
      [[-1.55, .72, .3], [.38, .5, .3]], [[-1.55, .72, -.3], [.38, .5, .3]], [[-2.2, .3, .32], [.42, .3, .26]], [[-2.2, .3, -.32], [.42, .3, .26]], // knees drawn up, shins and feet
      [[.6, .2, .78], [.75, .2, .2]], [[.6, .2, -.78], [.75, .2, .2]]]) // arms at its sides
      m.ell(c, r, M.MOSS, { group: 1, rough: .03, paint: moss(c) });
    spRockAt(m, [2.25, .75, .12], [.13, .15, .11], 2, false); // the nose
    for (const z of [-.12, .22]) m.ell([2.12, .88, z], [.08, .04, .07], M.STONED, { group: 3 }); // shut eyes
    spRockAt(m, [-.2, .16, .95], [.2, .15, .18], 4); spRockAt(m, [-.2, .16, -.95], [.18, .14, .16], 5); // hands
    m.ell([2.0, .95, .02], [.42, .14, .4], M.LEAF3, { group: 6, rough: .03 }); // shaggy hair
    spTufts(m, 26, 2.8, 10, 3, .3);
  },
  // fern forest: a ring of giant tree ferns round a stone basin of still water
  "fern-grotto"(m) {
    m.ell([0, .16, 0], [.78, .2, .72], M.STONE, { group: 1, rough: .015, paint: p => p[1] > .3 ? M.MOSS : undefined }); spWater(m, [0, .345, 0], [.55, .5], 2);
    for (let i = 0; i < 6; i++) {
      const a = i / 6 * Math.PI * 2 + .4, R = 1.5 + spHash(i) * .3, b = [Math.cos(a) * R, 0, Math.sin(a) * R * .8], h = 1.1 + spHash(i, 2) * .7, t = v3.add(b, [0, h, 0]);
      m.seg(b, t, .12, .09, M.TRUNK, { group: 3 + i, rough: .02, paint: spBark });
      for (let k = 0; k < 7; k++) { const fa = k / 7 * Math.PI * 2 + i, d = [Math.cos(fa), 0, Math.sin(fa)]; m.chain([[...t, .05], [...v3.add(t, v3.add(v3.mul(d, .45), [0, .18, 0])), .04], [...v3.add(t, v3.add(v3.mul(d, .9), [0, -.15, 0])), .015]], k % 2 ? M.LEAF : M.LEAF2, { group: 10 + i }); }
    }
    for (let i = 0; i < 5; i++) { const a = i * 1.3; spRockAt(m, [Math.cos(a) * .95, .08, Math.sin(a) * .95], [.16, .12, .14], 20 + i); }
  },
  // muddy forest: an old rowing boat sunk in the mud, a puddle round it, an oar
  "sunken-boat"(m) {
    spWater(m, [.3, .01, .15], [1.9, 1.15], 1);
    const c = [0, .12, 0], d = v3.norm([1, .28, .12]);
    m.ell(c, [1.3, .45, .55], M.WOOD, { dir: d, group: 2, paint: p => (v3.dot(v3.sub(p, c), [0, 1, 0]) * 9 + 9) % 1 < .14 ? M.BARKD : p[1] > .35 && spHash(Math.floor(p[0] * 9)) < .4 ? M.MOSS : undefined });
    m.ell(v3.add(c, [0, .14, 0]), [1.2, .4, .47], M.BARKD, { dir: d, group: 2, cut: true });
    for (let i = -2; i <= 2; i++) m.seg(v3.add(c, v3.add(v3.mul(d, i * .4), [0, .1, -.42])), v3.add(c, v3.add(v3.mul(d, i * .4), [0, .1, .42])), .04, .04, M.WOOD, { group: 3 }); // its seats and ribs
    m.seg([-.9, .05, .7], [.3, 1.0, .55], .03, .03, M.WOOD, { group: 4 }); m.box([-.98, .06, .72], [.2, .02, .07], M.WOOD, { dir: [1.2, -.8, -.15], group: 4 }); // an oar leaning on it
    spTufts(m, 18, 2.2, 10, 5, .45);
  },
  // tangly forest: an old wagon, a wheel off, wrapped in brambles
  "bramble-wagon"(m) {
    const tilt = v3.norm([1, -.12, 0]);
    m.box([0, .62, 0], [1.1, .22, .52], M.WOOD, { dir: tilt, round: .04, group: 1, paint: p => ((p[0] + 3) * 4) % 1 < .08 ? M.BARKD : undefined });
    m.box([0, .72, 0], [1.0, .2, .43], M.BARKD, { dir: tilt, group: 1, cut: true });
    for (const [x, z, y, r] of [[-.72, .55, .4, .4], [-.72, -.55, .4, .4], [.72, -.55, .32, .37]]) m.ell([x, y, z], [r, r, .06], M.WOOD, { group: 2 + (x > 0 ? 1 : 0) + (z > 0 ? 2 : 0), paint: p => { const dx = p[0] - x, dy = p[1] - y, rr = Math.hypot(dx, dy), a = Math.atan2(dy, dx); return rr > r * .82 ? M.BARKD : rr < r * .18 ? M.BARKD : Math.abs(Math.sin(a * 4)) < .2 ? M.WOOD : M.NOSE; } }); // spoked wheels
    m.ell([.95, .1, .75], [.37, .06, .37], M.WOOD, { group: 7, paint: p => Math.hypot(p[0] - .95, p[2] - .75) > .3 ? M.BARKD : undefined }); // the fallen wheel
    for (const z of [-.3, .3]) m.seg([1.05, .55, z], [1.9, .05, z * 1.4], .04, .035, M.WOOD, { group: 8 }); // the shafts
    for (let i = 0; i < 14; i++) { // brambles wrapping it
      const a = spHash(i, 1) * 6.283, x0 = Math.cos(a) * 1.5, z0 = Math.sin(a) * .9, pts = [[x0, 0, z0, .03]];
      for (let k = 1; k < 4; k++) pts.push([x0 * (1 - k * .28) + (spHash(i, k) - .5) * .5, .25 + k * .25 + spHash(k, i) * .2, z0 * (1 - k * .3) + (spHash(k, i * 3) - .5) * .4, .025 - k * .004]);
      m.chain(pts, M.BARKD, { group: 10 + (i % 3) });
      if (i % 2 === 0) { const t = pts[3]; m.ell([t[0], t[1], t[2]], [.18, .13, .16], M.LEAF, { group: 14, rough: .03, paint: p => spHash(Math.floor(p[0] * 30), Math.floor(p[1] * 30)) < .1 ? M.ACCENT : undefined }); }
    }
  },
  // wispy forest: a many-trunked tree with a great wild honeycomb, bees glowing round it
  "beehive-tree"(m) {
    for (const [x, z, lean] of [[-.2, 0, -.25], [.15, -.1, .2], [0, .15, .05]]) spLimb(m, [[x, 0, z, .22], [x + lean * .8, 1.4, z, .16], [x + lean * 2, 2.8, z - .1, .08]], 1);
    for (const [c, r] of [[[-.6, 2.9, -.2], [.9, .6, .7]], [[.6, 3.0, -.2], [.85, .6, .7]], [[0, 3.4, -.3], [.9, .55, .7]]]) spCrown(m, c, r, 3);
    spLimb(m, [[.2, 1.9, -.05, .08], [.75, 2.05, .15, .05]], 2);
    const hc = [.72, 1.6, .2]; m.ell(hc, [.24, .42, .22], M.STRAW, { group: 4, paint: p => { const u = Math.floor((p[1] - hc[1]) * 14), v = Math.floor(Math.atan2(p[2] - hc[2], p[0] - hc[0]) * 3 + (u % 2) * .5); return spHash(u, v) < .3 ? M.BARK2 : undefined; } });
    m.seg([.75, 2.02, .15], [.72, 1.9, .2], .05, .1, M.STRAW, { group: 4 });
    for (let i = 0; i < 6; i++) { const a = i * 1.9; m.ell([hc[0] + Math.cos(a) * .45, hc[1] + Math.sin(i * 2.3) * .35, hc[2] + Math.sin(a) * .35], [.03, .025, .03], M.MAGIC, { group: 20 + i, extra: true }); } // bees, glowing
  },
  // hazel forest: a ring of fairy stones and toadstools, one stone carved with a glowing rune
  "fairy-ring"(m) {
    // No dark disc of grass under it: in the game it read as a hard dark oval on the forest floor.
    for (let i = 0; i < 9; i++) {
      const a = i / 9 * Math.PI * 2, c = [Math.cos(a) * 1.6, 0, Math.sin(a) * 1.25], h = .35 + spHash(i) * .35;
      m.box(v3.add(c, [0, h / 2, 0]), [.13, h / 2, .1], M.STONE, { dir: [-Math.sin(a), 0, Math.cos(a)], round: .05, rough: .015, group: 1 + i, paint: p => i === 2 && Math.abs(p[1] - h * .55) < h * .22 && Math.abs(p[0] - c[0] - .0) < .05 ? M.RUNE : p[1] > h * .85 ? M.MOSS : undefined });
      const t = v3.add(c, [Math.cos(a + .35) * .25, 0, Math.sin(a + .35) * .2]); m.seg(t, v3.add(t, [0, .16, 0]), .035, .03, M.CLOTH, { group: 12 }); m.ell(v3.add(t, [0, .18, 0]), [.1, .06, .1], M.ACCENT, { group: 13, paint: p => spHash(Math.floor(p[0] * 60), Math.floor(p[2] * 60)) < .15 ? M.BELLY : undefined }); // toadstools
    }
  },
  // twiggy forest: a charcoal burner's hut of sticks, its mound smouldering beside it
  "charcoal-hut"(m) {
    const top = [0, 2.0, 0];
    for (let i = 0; i < 20; i++) { const a = i / 20 * Math.PI * 2; if (Math.abs(a - 1.2) < .35) continue; m.seg([Math.cos(a) * .95, 0, Math.sin(a) * .8], v3.add(top, [Math.cos(a) * .08, .1 + spHash(i) * .25, Math.sin(a) * .08]), .05, .03, i % 3 ? M.TRUNK : M.BARKD, { group: 1 + (i % 2) }); }
    m.ell([0, .6, 0], [.85, .6, .7], M.BARKD, { group: 3 }); // the dark inside
    const mc = [1.7, 0, .3]; m.ell(mc, [.85, .42, .7], M.BARKD, { group: 4, rough: .03, paint: p => spHash(Math.floor(p[0] * 14), Math.floor(p[2] * 14) + Math.floor(p[1] * 14)) < .07 ? M.GLOW : p[1] > .3 ? M.SHADES : undefined }); // the charcoal mound, embers glowing through
    for (let i = 0; i < 4; i++) m.seg([-1.4, .1 + i * .14, -.5 + (i % 2) * .05], [-1.4, .1 + i * .14, .5], .07, .07, M.TRUNK, { group: 5 + (i % 2), paint: p => Math.abs(p[2]) > .46 ? M.BARKL : undefined }); // a woodpile
  },
  // ancient: a great arch of roots over mossy stones
  "root-arch"(m) {
    spLimb(m, [[-1.8, 0, .1, .4], [-1.4, 1.2, 0, .34], [-.4, 2.3, -.1, .3], [.6, 2.4, 0, .28], [1.5, 1.4, .1, .32], [1.9, 0, .15, .38]], 1);
    spLimb(m, [[-1.4, 0, -.6, .28], [-.6, 1.6, -.5, .22], [.5, 1.9, -.45, .2], [1.3, .9, -.4, .22], [1.5, 0, -.35, .26]], 2);
    spLimb(m, [[-1.8, .2, .1, .3], [-2.4, .05, .5, .12]], 1); spLimb(m, [[1.9, .2, .15, .3], [2.5, .05, .55, .12]], 1);
    for (const [c, r] of [[[-.2, 2.6, -.2], [.7, .35, .5]], [[.8, 2.5, -.25], [.55, .3, .45]]]) spCrown(m, c, r, 4);
    for (let i = 0; i < 4; i++) spRockAt(m, [-.7 + i * .45, .12, (spHash(i) - .5) * .5], [.22, .18, .2], 6 + i);
    m.box([0, .35, -.2], [.16, .35, .08], M.STONE, { round: .05, rough: .01, group: 11, paint: p => Math.abs(p[1] - .4) < .14 && Math.abs(p[0]) < .05 ? M.MAGIC : p[1] > .62 ? M.MOSS : undefined }); // a rune stone under the arch
  },
  // Norway: a little log cabin with a turf roof, abandoned
  "turf-hut"(m) {
    m.box([0, .55, 0], [1.0, .55, .7], M.WOOD, { round: .04, group: 1, paint: p => (p[1] * 7) % 1 < .18 ? M.BARKD : p[2] > .66 && Math.abs(p[0] + .2) < .2 && p[1] < .85 ? M.NOSE : p[2] > .66 && Math.abs(p[0] - .5) < .14 && Math.abs(p[1] - .7) < .12 ? M.SHADES : undefined }); // log walls, a door, a dark window
    // the turf roof: two panels meeting at a ridge along x, resting on the wall tops (1.1) and overhanging the eaves; the
    // turf drooping a little over them; plank gables at both ends; the chimney rising through the ridge
    const eave = 1.1, ridge = 1.68, run = .86, slope = Math.hypot(run, ridge - eave), nz = run / slope, ny = (ridge - eave) / slope;
    for (const s of [-1, 1]) {
      m.box([0, (eave + ridge) / 2 + .03, s * run / 2], [1.12, .06, slope / 2 + .05], M.MOSS, { dir: [1, 0, 0], up: [0, nz, s * ny], round: .03, group: 2, paint: p => spHash(Math.floor(p[0] * 12), Math.floor(p[2] * 12)) < .25 ? M.LEAF2 : undefined });
      for (let i = 0; i < 7; i++) m.ell([-.95 + i * .317, eave - .02, s * (run + .02)], [.16, .07, .06], M.MOSS, { group: 2, paint: p => p[1] < eave - .05 ? M.LEAF2 : undefined }); // the turf's lip over the eaves
    }
    m.box([0, ridge + .04, 0], [1.1, .05, .06], M.MOSS, { group: 2 }); // the ridge
    for (const x of [-1.0, 1.0]) m.flat([x, (eave + ridge) / 2, 0], [0, 0, 1], [0, 1, 0], run, (ridge - eave) / 2, (u, v) => Math.abs(u) <= (1 - v) / 2 + .02 ? (((v + 1) * 4) % 1 < .14 ? M.BARKD : M.WOOD) : null, { group: 1, bend: 0 }); // plank gables
    m.seg([.6, .9, 0], [.6, ridge + .45, 0], .15, .13, M.STONE, { group: 3, rough: .015 }); // a stone chimney through the ridge
    for (let i = 0; i < 5; i++) spRockAt(m, [-1.4 + i * .7, .12, .9 + spHash(i) * .3], [.2, .15, .18], 4 + i);
    spTufts(m, 16, 1.8, 10, 9, .25);
  },
  // alder forest: a tall slanted alder holding herons' stick nests, a heron on one
  "heron-rookery"(m) {
    spLimb(m, [[0, 0, 0, .25], [.4, 1.4, 0, .18], [.9, 2.8, -.1, .12], [1.3, 3.8, -.2, .06]], 1);
    const nests = [[[.6, 2.0, -.05], [-.3, 2.0, -.1]], [[1.0, 3.0, -.1], [1.8, 2.9, .0]], [[1.25, 3.6, -.2], [.6, 3.7, -.3]]];
    nests.forEach(([from, at], i) => { spLimb(m, [[...from, .07], [...at, .04]], 2); m.ell(v3.add(at, [0, .08, 0]), [.34, .13, .3], M.BARK2, { group: 3 + i, rough: .025, paint: p => Math.abs(Math.sin(p[0] * 30 + p[2] * 20)) < .25 ? M.STRAW : p[1] < at[1] + .02 ? M.BARKD : undefined }); });
    for (const [c, r] of [[[1.2, 4.0, -.4], [.6, .4, .45]], [[.3, 3.1, -.5], [.45, .3, .35]], [[1.9, 3.3, -.4], [.4, .3, .35]]]) spCrown(m, c, r, 7);
    const h = v3.add(nests[1][1], [0, .42, .05]), k = 1.6; // a heron standing on its nest
    m.ell(h, [.18 * k, .1 * k, .09 * k], M.BELLY, { dir: [1, .3, 0], group: 10, paint: p => p[1] > h[1] + .06 ? M.STONE : undefined }); m.chain([[...v3.add(h, [.12 * k, .06 * k, 0]), .035 * k], [...v3.add(h, [.2 * k, .22 * k, 0]), .03 * k], [...v3.add(h, [.16 * k, .32 * k, 0]), .04 * k]], M.BELLY, { group: 10 });
    m.seg(v3.add(h, [.18 * k, .33 * k, 0]), v3.add(h, [.36 * k, .3 * k, 0]), .015 * k, .005 * k, M.BODY2, { group: 11 });
    for (const z of [-.04, .04]) m.seg(v3.add(h, [0, -.06 * k, z]), v3.add(h, [.02, -.42, z]), .012, .012, M.BARKD, { group: 12 });
  },
  // meadow: a moonlit sundial on a stone dais in a ring of flowers (unlit: a flowering area)
  "sundial"(m) {
    m.ell([0, .07, 0], [1.05, .09, 1.0], M.STONE, { group: 1, rough: .01 }); m.ell([0, .2, 0], [.72, .09, .68], M.STONE, { group: 2, rough: .01, paint: p => p[1] > .26 && spHash(Math.floor(p[0] * 8), Math.floor(p[2] * 8)) < .3 ? M.MOSS : undefined });
    m.seg([0, .28, 0], [0, .95, 0], .16, .13, M.STONE, { group: 3, paint: p => Math.abs(Math.sin(p[1] * 30)) < .15 ? M.STONED : undefined });
    m.ell([0, 1.0, 0], [.38, .04, .38], M.FRAME, { group: 4, paint: p => { const a = Math.atan2(p[2], p[0]); return Math.abs(Math.sin(a * 6)) < .12 && Math.hypot(p[0], p[2]) > .26 ? M.BARKD : undefined; } }); // the dial, its hour marks
    m.box([0, 1.12, 0], [.2, .1, .01], M.FRAME, { dir: [1, -.5, 0], round: .005, group: 5 }); // the gnomon
    for (let i = 0; i < 22; i++) { const a = i / 22 * Math.PI * 2, R = 1.25 + spHash(i) * .2, c = [Math.cos(a) * R, 0, Math.sin(a) * R * .85]; m.seg(c, v3.add(c, [0, .18, 0]), .015, .012, M.LEAF2, { group: 6 }); m.ell(v3.add(c, [0, .2, 0]), [.05, .04, .05], [M.FLOWER, M.BELLY, M.ACCENT][i % 3], { group: 7 }); }
  },
  // berry thicket: a bear's den, a great bramble mound with a dark way in, berries, a clawed stump
  "bear-den"(m) {
    const c = [0, .3, -.2]; m.ell(c, [1.7, 1.15, 1.25], M.LEAF, { group: 1, rough: .05, paint: p => { const n = spHash(Math.floor(p[0] * 16), Math.floor(p[1] * 16) + Math.floor(p[2] * 16) * 3); return n < .06 ? M.ACCENT : n < .2 ? M.BARKD : p[1] < .4 ? M.LEAF3 : n > .85 ? M.LEAF2 : undefined; } });
    m.ell([.35, .35, .95], [.5, .55, .4], M.NOSE, { group: 1, cut: true }); // the way in
    m.seg([2.0, 0, .5], [2.0, .65, .5], .3, .27, M.TRUNK, { group: 3, paint: p => p[1] > .6 ? M.BARKL : Math.abs(Math.sin(Math.atan2(p[2] - .5, p[0] - 2) * 3)) < .12 && p[1] > .2 ? M.BARKD : undefined }); // a stump, raked by claws
  },
  // wetland: a fisher's hut on stilts over a pool, reed-thatched, a ladder down to the water
  "stilt-hut"(m) {
    spWater(m, [0, .01, .1], [2.1, 1.3], 1);
    for (const [x, z] of [[-.75, -.55], [.75, -.55], [-.75, .55], [.75, .55]]) m.seg([x, 0, z], [x, 1.05, z], .07, .06, M.WOOD, { group: 2, paint: p => p[1] < .15 ? M.MOSS : undefined });
    m.box([0, 1.1, 0], [1.05, .05, .8], M.WOOD, { round: .02, group: 3, paint: p => ((p[0] + 3) * 6) % 1 < .12 ? M.BARKD : undefined });
    m.box([-.1, 1.6, -.1], [.7, .45, .55], M.WOOD, { round: .03, group: 4, paint: p => p[2] > .4 && Math.abs(p[0] - .1) < .18 && p[1] < 1.85 ? M.NOSE : undefined });
    for (const [y, r] of [[2.1, .92], [2.35, .72], [2.58, .48], [2.76, .24]]) m.ell([-.1, y, -.1], [r, .16, r * .85], M.STRAW, { group: 5, paint: p => Math.abs(Math.sin(Math.atan2(p[2] + .1, p[0] + .1) * 18)) < .25 ? M.BARK2 : undefined }); // the reed thatch
    for (const z of [.72, .95]) m.seg([.9, 1.1, z], [1.15, 0, z], .02, .02, M.WOOD, { group: 6 });
    for (let i = 0; i < 4; i++) m.seg([.92 + i * .06, 1.0 - i * .26, .72], [.92 + i * .06, 1.0 - i * .26, .95], .02, .02, M.WOOD, { group: 6 });
    for (let i = 0; i < 26; i++) { const a = spHash(i, 7) * 6.283, d = 1.5 + spHash(i, 8) * .7, c = [Math.cos(a) * d, 0, Math.sin(a) * d * .7], h = .5 + spHash(i, 9) * .5; m.seg(c, v3.add(c, [0, h, 0]), .028, .02, M.LEAF2, { group: 10 + (i % 3) }); if (i % 3 === 0) m.ell(v3.add(c, [0, h - .05, 0]), [.025, .07, .025], M.BARKD, { group: 13 }); } // reeds and bulrushes
  },
  // bog: a carved post shrine to the bog, offerings at its foot, will-o'-wisps over the pool
  "bog-shrine"(m) {
    spWater(m, [.6, .01, .4], [1.4, .9], 1);
    m.seg([0, 0, 0], [0, 1.9, 0], .2, .17, M.TRUNK, { group: 2, rough: .01, paint: p => { const y = p[1]; return p[2] > .12 && ((Math.abs(y - 1.6) < .05 && Math.abs(Math.abs(p[0]) - .08) < .05) || (Math.abs(y - 1.38) < .04 && Math.abs(p[0]) < .1)) ? M.BARKD : (y * 5) % 1 < .07 ? M.BARKD : p[1] > 1.85 ? M.MOSS : undefined; } }); // the carved face
    m.ell([0, 1.95, 0], [.24, .1, .24], M.MOSS, { group: 3 });
    for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; m.seg([Math.cos(a) * 1.0, 0, Math.sin(a) * .8], [Math.cos(a) * 1.0, .35 + spHash(i) * .25, Math.sin(a) * .8], .05, .04, M.TRUNK, { group: 4 }); } // a ring of little posts
    m.ell([-.25, .06, .3], [.14, .07, .13], M.EAR, { group: 5 }); spRockAt(m, [.3, .07, .3], [.09, .07, .08], 6, false); spRockAt(m, [.15, .05, .42], [.06, .05, .06], 7, false); // offerings: a bowl, pebbles
    for (const [x, y, z] of [[.9, .9, .5], [1.4, 1.2, .1], [.4, 1.4, .8]]) m.ell([x, y, z], [.06, .07, .06], M.MAGIC, { group: 20 + x * 10, extra: true, paint: p => Math.hypot(p[0] - x, p[1] - y) < .03 ? M.MAGIC2 : undefined }); // will-o'-wisps
    spTufts(m, 20, 2.0, 10, 11, .3, M.WEB);
  },
  // deadwood: a dead tree where the ravens gather, an old iron cage hanging from it
  "raven-tree"(m) {
    spLimb(m, [[0, 0, 0, .3], [.1, 1.3, 0, .22], [-.1, 2.5, -.1, .16], [.1, 3.6, -.15, .07]], 1);
    const branches = [[[.1, 1.6, 0], [1.3, 2.3, .1], [1.8, 2.2, .1]], [[-.05, 2.1, -.05], [-1.2, 2.8, -.1], [-1.6, 3.2, -.1]], [[0, 2.9, -.1], [.8, 3.5, -.2]]];
    branches.forEach((b, i) => spLimb(m, b.map((p, k) => [...p, .12 - k * .04]), 2 + i));
    spLimb(m, [[-.1, .5, 0, .22], [-1.1, .1, .5, .08]], 5); spLimb(m, [[.1, .4, 0, .2], [.9, .05, -.4, .08]], 5);
    const raven = (p, g) => { m.ell(p, [.12, .07, .06], M.SHADES, { dir: [1, .2, 0], group: g }); m.ell(v3.add(p, [.11, .07, 0]), [.05, .05, .045], M.SHADES, { group: g }); m.seg(v3.add(p, [.15, .07, 0]), v3.add(p, [.22, .05, 0]), .015, .004, M.BODY2, { group: g }); m.seg(v3.add(p, [-.1, 0, 0]), v3.add(p, [-.22, -.04, 0]), .04, .015, M.SHADES, { group: g }); };
    raven([1.3, 2.42, .1], 10); raven([-1.2, 2.92, -.1], 11); raven([.8, 3.62, -.2], 12); raven([-.05, 3.72, -.15], 13);
    const cg = [1.55, 1.45, .1]; m.seg([1.55, 2.25, .1], v3.add(cg, [0, .3, 0]), .01, .01, M.FRAME, { group: 14 });
    for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; m.seg(v3.add(cg, [Math.cos(a) * .2, -.25, Math.sin(a) * .2]), v3.add(cg, [Math.cos(a) * .12, .3, Math.sin(a) * .12]), .012, .012, M.FRAME, { group: 14 }); }
    m.seg(v3.add(cg, [0, -.27, 0]), v3.add(cg, [0, -.25, 0]), .22, .22, M.FRAME, { group: 14 });
  },
  // grassland: a barrow, a long grassy burial mound with a stone doorway
  "barrow"(m) {
    m.ell([0, 0, -.2], [2.3, .95, 1.3], M.LEAF2, { group: 1, rough: .03, paint: p => spHash(Math.floor(p[0] * 10), Math.floor(p[2] * 10) + Math.floor(p[1] * 10)) < .25 ? M.LEAF : undefined });
    for (const x of [-.35, .35]) m.box([x, .45, .95], [.12, .45, .12], M.STONE, { round: .03, rough: .01, group: 2 });
    m.box([0, .95, .95], [.55, .1, .14], M.STONE, { round: .03, rough: .01, group: 3, paint: p => p[1] > 1.02 ? M.MOSS : undefined });
    m.box([0, .4, .9], [.23, .4, .3], M.NOSE, { group: 1, cut: true }); // the dark doorway
    for (const [x, z, h] of [[-1.6, 1.0, .7], [1.7, .9, .55]]) m.box([x, h / 2, z], [.12, h / 2, .09], M.STONE, { round: .04, rough: .01, group: 4 }); // standing stones flanking it
  },
  // heath: a tall cairn on the ridge, an old iron beacon basket on top, cold (a flowering area: unlit)
  "cairn"(m) {
    let y = 0; for (let ring = 0; ring < 6; ring++) { const R = .9 - ring * .14, n = Math.max(3, 9 - ring); for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2 + ring; spRockAt(m, [Math.cos(a) * R * .8, y + .14, Math.sin(a) * R * .7], [.24 - ring * .02, .15, .2 - ring * .02], 1 + ((ring + i) % 4), ring < 2); } y += .26; }
    const b = [0, y + .1, 0]; for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; m.seg(v3.add(b, [Math.cos(a) * .12, 0, Math.sin(a) * .12]), v3.add(b, [Math.cos(a) * .3, .35, Math.sin(a) * .3]), .02, .02, M.FRAME, { group: 6 }); }
    m.seg(v3.add(b, [0, -.3, 0]), b, .05, .05, M.FRAME, { group: 6 }); m.ell(v3.add(b, [0, .14, 0]), [.2, .07, .2], M.SHADES, { group: 7 }); // cold ashes
  },
  // old pinewood: a woodcutter's stump throne, an axe left in a log, stacked logs
  "stump-throne"(m) {
    m.ell([0, .28, 0], [.92, .34, .86], M.TRUNK, { group: 1, rough: .015, paint: spBark }); m.ell([0, .58, 0], [.84, .06, .78], M.BARKL, { group: 1, paint: p => Math.abs(Math.sin(Math.hypot(p[0], p[2]) * 30)) < .3 ? M.BARK2 : undefined }); // the cut top, its rings
    m.box([-.55, 1.15, 0], [.18, .62, .62], M.TRUNK, { round: .1, rough: .01, group: 2, paint: spBark }); // the throne's back, cut from the trunk
    for (const z of [-.6, .6]) m.box([-.1, .72, z], [.45, .14, .12], M.TRUNK, { round: .06, group: 3, paint: spBark }); // arms
    for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2 + .3; spLimb(m, [[Math.cos(a) * .8, .25, Math.sin(a) * .8, .18], [Math.cos(a) * 1.4, .02, Math.sin(a) * 1.3, .06]], 4); }
    m.seg([1.5, .18, .8], [1.5, .18, .2], .18, .18, M.TRUNK, { group: 5, paint: p => p[2] > .78 || p[2] < .22 ? M.BARKL : spBark(p) }); m.seg([1.5, .3, .5], [1.6, .75, .5], .025, .025, M.WOOD, { group: 6 }); m.box([1.5, .36, .5], [.1, .06, .015], M.FRAME, { group: 6 }); // an axe in a log
    for (let i = 0; i < 6; i++) { const row = i < 3 ? 0 : 1, k = i % 3; m.seg([-1.7 + k * .3 + row * .15, .15 + row * .26, -.7], [-1.7 + k * .3 + row * .15, .15 + row * .26, .2], .14, .14, M.TRUNK, { group: 7 + (i % 2), paint: p => p[2] > .16 || p[2] < -.66 ? M.BARKL : undefined }); }
  },
  // bluebell glade: a great beech with a rope swing, glowworms in the dark under it
  "swing-beech"(m) {
    spLimb(m, [[0, 0, -.3, .45], [0, 1.6, -.3, .36], [-.1, 2.8, -.4, .26]], 1);
    spLimb(m, [[0, 2.2, -.3, .2], [1.0, 2.6, -.2, .14], [1.9, 2.75, -.1, .08]], 2); spLimb(m, [[-.05, 2.5, -.35, .18], [-1.2, 3.0, -.4, .1]], 3);
    for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2; spLimb(m, [[Math.cos(a) * .35, .3, -.3 + Math.sin(a) * .3, .2], [Math.cos(a) * .9, .02, -.3 + Math.sin(a) * .8, .07]], 4); }
    for (const [c, r] of [[[0, 3.4, -.6], [1.4, .8, 1.0]], [[1.4, 3.1, -.4], [.9, .55, .7]], [[-1.3, 3.2, -.6], [.9, .6, .7]]]) spCrown(m, c, r, 5);
    for (const z of [-.12, .12]) m.seg([1.3, 2.65, z], [1.3, .55, z], .012, .012, M.STRAW, { group: 6 });
    m.box([1.3, .53, 0], [.08, .025, .18], M.WOOD, { round: .01, group: 6 }); // the swing's seat
    for (let i = 0; i < 9; i++) m.ell([(spHash(i, 1) - .5) * 3, .05 + spHash(i, 2) * .5, (spHash(i, 3) - .3) * 1.6], [.022, .022, .022], M.MAGIC, { group: 20 + i, extra: true }); // glowworms
  },
  // honeysuckle tangle: a bower, an arched trellis tunnel smothered in honeysuckle, a bench inside
  "bower"(m) {
    for (const x of [-.9, 0, .9]) for (const z of [-.6, .6]) m.seg([x, 0, z], [x, 1.2, z], .04, .04, M.WOOD, { group: 1 });
    for (const x of [-.9, 0, .9]) m.chain([[x, 1.2, -.6, .04], [x, 1.62, -.3, .04], [x, 1.72, 0, .04], [x, 1.62, .3, .04], [x, 1.2, .6, .04]], M.WOOD, { group: 2 });
    for (const z of [-.6, .6]) for (const y of [.5, 1.0]) m.seg([-.9, y, z], [.9, y, z], .025, .025, M.WOOD, { group: 3 });
    const bloom = p => { const n = spHash(Math.floor(p[0] * 26), Math.floor(p[1] * 26) + Math.floor(p[2] * 26) * 3); return n < .12 ? M.BELLY : n < .2 ? M.STRAW : n > .85 ? M.LEAF2 : undefined; };
    for (const [c, r] of [[[-.6, 1.6, 0], [.6, .3, .75]], [[.5, 1.65, 0], [.65, .3, .75]], [[-.95, .9, -.55], [.25, .65, .25]], [[.95, .8, -.6], [.25, .55, .25]], [[-.9, .7, .62], [.22, .5, .2]], [[.2, 1.3, -.65], [.5, .4, .2]]]) m.ell(c, r, M.LEAF, { group: 4, rough: .04, paint: bloom });
    m.box([0, .4, -.35], [.6, .04, .15], M.WOOD, { round: .02, group: 5 }); for (const x of [-.5, .5]) m.seg([x, 0, -.35], [x, .38, -.35], .03, .03, M.WOOD, { group: 5 }); // a bench
  },
};
// The area each new set piece belongs to, its name, and how big it is drawn (a factor on the witch's scale); a generated kind
// (art/props/sets.js) may add a fourth item, its seed and any numbers to fix.
export const NEW_SET_PIECES = {
  "moor": ["sleeping-giant", "the sleeping giant, a moss mound like a figure lying on its back", 1],
  "fern-forest": ["fern-grotto", "a ring of giant tree ferns round a stone basin", 1],
  "muddy-forest": ["sunken-boat", "an old rowing boat sunk in the mud", 1.15],
  "tangly-forest": ["bramble-wagon", "an old wagon wrapped in brambles", 1.1],
  "wispy-forest": ["beehive-tree", "a many-trunked tree with a great wild honeycomb", 1],
  "hazel-forest": ["fairy-ring", "a ring of fairy stones and toadstools", 1.1],
  "twiggy-forest": ["charcoal-hut", "a charcoal burner's hut of sticks, its mound smouldering", 1],
  "ancient": ["root-arch", "a great arch of roots over mossy stones", 1.1],
  "norway": ["turf-hut", "a log cabin with a turf roof", 1.15],
  "alder-forest": ["heron-rookery", "an alder holding herons' stick nests", 1],
  "meadow": ["sundial", "a moonlit sundial on a stone dais in a ring of flowers", 1.2],
  "berry-thicket": ["bear-den", "a bear's den in a bramble mound", 1.1],
  "wetland": ["stilt-hut", "a fisher's hut on stilts over a pool", 1.1],
  "bog": ["bog-shrine", "a carved post shrine to the bog, will-o'-wisps over the pool", 1.1],
  "deadwood": ["raven-tree", "a dead tree where the ravens gather", 1],
  "grassland": ["barrow", "a barrow with a stone doorway", 1],
  "heath": ["cairn", "a tall cairn with an old beacon basket", 1.4],
  "old-pinewood": ["stump-throne", "a woodcutter's stump throne", 1.1],
  "bluebell-glade": ["swing-beech", "a great beech with a rope swing, glowworms beneath", 1],
  "honeysuckle-tangle": ["bower", "a honeysuckle bower with a bench", 1.2],
};
export const SET_PIECE_KINDS = Object.keys(spSETS);
// A sprite cropped to its drawn pixels (it already stands on its bottom row), and where the crop began.

export function setPieceColours(def, st) {
  const leaf = def.leaf, trunk = st.trunkHue ?? .07;
  return {
    [M.TRUNK]: hsv2rgb(trunk, .45, .36), [M.BARKD]: hsv2rgb(trunk + .03, .5, .17), [M.BARKL]: hsv2rgb(trunk, .35, .55), [M.BARK2]: hsv2rgb(trunk + .02, .45, .26),
    [M.LEAF]: hsv2rgb(leaf, .55, .45), [M.LEAF2]: hsv2rgb(leaf - .03, .5, .62), [M.LEAF3]: hsv2rgb(leaf + .03, .6, .26),
    [M.STONE]: [122, 120, 128], [M.STONED]: [62, 60, 70], [M.MOSS]: hsv2rgb(.26, .45, .45),
    [M.WOOD]: [128, 92, 58], [M.STRAW]: [190, 162, 104], [M.CLOTH]: [228, 220, 200], [M.EAR]: [168, 96, 66], [M.FRAME]: [150, 128, 84], [M.SHADES]: [30, 28, 36],
    [M.ACCENT]: [196, 40, 52], [M.BELLY]: [232, 228, 214], [M.BODY2]: [210, 170, 60], [M.FLOWER]: [180, 140, 230], [M.WEB]: [228, 228, 234],
    [M.WATER]: [52, 78, 104], [M.NOSE]: [16, 14, 20],
    [M.GLOW]: [255, 120, 40], [M.MAGIC]: hsv2rgb(st.magicHue ?? .45, .6, 1), [M.MAGIC2]: hsv2rgb(st.magicHue ?? .45, .2, 1), [M.RUNE]: [120, 230, 255],
    [M.LINE]: [24, 22, 30],
  };
}
// One area's new set piece: { sp, colours, metres: { width, height } }, drawn at the witch's scale.
// A kind from the set-piece generator (art/props/sets.js: punt, jetty, ring, heap) is built from its genome, seeded by the area
// unless its entry's fourth item ({ seed, ...numbers }) says otherwise.
export function setPiece3d(kind, def, st, ppm = 16) {
  if (SET_PROP_GENOMES[kind]) { const [, , size = 1, o = {}] = NEW_SET_PIECES[def?.id] || []; return genSetPiece(kind, { seed: [...(def?.id ?? "")].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 9973, 7), ...o }, def, st, size, ppm); }
  const m = new Model({ blend: .05 }); spSETS[kind](m);
  m.ell([0, .004, 0], [.01, .004, .01], M.NOSE, { group: 0 }); // so every piece stands on the same ground line
  const size = (Object.values(NEW_SET_PIECES).find(([k]) => k === kind) || [, , 1])[2];
  const r = render(m, { scale: witchPixelsPerUnit(st) * size * (st.setPieceScale || 1) }), { sp, x0, y0 } = cropKeepBottom(r.sp); // (st.setPieceScale: baked at the size the game draws it) // cropped to what is drawn (a part's bounding sphere leaves empty rows above it)
  const [ox, oy] = r.project([0, 0, 0]); // origin: where its middle on the ground lands, in the cropped sprite
  return { sp, colours: setPieceColours(def, st), origin: { x: +(ox - x0).toFixed(1), y: +(oy - y0).toFixed(1) }, metres: { width: +(sp.w / ppm).toFixed(1), height: +(sp.h / ppm).toFixed(1) } };
}
