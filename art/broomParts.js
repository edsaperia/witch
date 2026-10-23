// The Workshop's nine broom parts, each its own piece (Ed, 2026-10-23: the art pass on the Workshop; his picks: "mismatched salvage",
// each part keeping its own origin's character, the missile chrome and riveted, the oar old wood, the twigs a wild bundle; glowing only
// where a real light would; on the bay's cards side on, big and bold; on the pegboard hung on pegs, tilted). Drawn in 3D in the house's
// way (art/furniture.js: model3d parts, its materials and the workshop's colours), in real metres along x, the nose toward +x:
//   a tip from its socket at x 0 forward (+x), an exhaust from its socket at x 0 back (-x), a chassis about x 0 between its `front`
//   and `back` sockets (and its `seat`, where she'd sit).
// Paint in her broom's colours: BROOM (its body) and STRAW (its trim); the rest is what each was salvaged from: FRAME steel and chrome,
// FLOWER brass, STONED soot and old iron, ACCENT rust and red paint, WOOD and BARKD wood, HAIR leather and rope, BELLY bone and canvas,
// CRYSTAL glass, LEAF a sprouting leaf, LINE an eye; MAGIC and MAGIC2 the nozzles' pilot flame, WOKEN the fairing's headlamp.
// `drawBroom` assembles her broom from its three parts (the bare broom: a plain handle and her own straw bristles); `partSprite` and
// `restingBroomSprite` (art/workshop.js) draw them.
import { M } from "./core.js";
import { v3 } from "./model3d.js";

const HANDLE = .022; // (a broom handle's radius, m)
const light = (m, c, rgb, R, power) => { (m.lights ??= []).push({ c, rgb, R, power }); };
/** Rivets round a ring at x, radius r: n little brass or steel heads. */
const rivets = (m, x, r, n, mat, g, from = 0, to = Math.PI * 2) => { for (let i = 0; i < n; i++) { const a = from + (to - from) * (i + .5) / n; m.ell([x, Math.cos(a) * r, Math.sin(a) * r], [.008, .008, .008], mat, { group: g }); } };
/** A collar where a part meets the handle: a short steel sleeve and its bolts. */
const collar = (m, x0, x1, g = 9) => { m.seg([x0, 0, 0], [x1, 0, 0], .032, .032, M.FRAME, { group: g }); rivets(m, (x0 + x1) / 2, .033, 4, M.STONED, g + 1, -Math.PI / 2, Math.PI / 2); };
/** A sprig of two or three leaves at c (the house sprouting: a salvaged bit taking root). */
const leaves = (m, c, n, s, g) => { for (let i = 0; i < n; i++) { const a = i * 2.2 + .6; m.ell([c[0] + Math.cos(a) * s * .8, c[1] + s * .5 + (i % 2) * s * .4, c[2] + Math.sin(a) * s * .6], [s, s * .45, s * .7], i % 2 ? M.LEAF2 : M.LEAF, { group: g, dir: [Math.cos(a), .6, Math.sin(a)] }); } };

/** Each part: its slot, its length along x (m), what it draws; a chassis also its sockets (x) and seat. */
export const PART_ART = {
  // ---- tips: from the socket (x 0) forward ----
  // the missile's nose: a fat riveted cone in her paint, a red stencilled band, its point scorched and dented, bolted on a steel collar
  missile: { slot: "tip", len: .5, draw(m) {
    collar(m, -.01, .05);
    m.seg([.05, 0, 0], [.12, 0, 0], .045, .07, M.FRAME, { group: 10 }); // (the flare out to the body)
    m.seg([.12, 0, 0], [.3, 0, 0], .07, .068, M.BROOM, { group: 11, paint: p => (Math.abs(p[0] - .25) < .018 ? M.ACCENT : Math.abs(p[0] - .19) < .006 ? M.STRAW : undefined) });
    m.seg([.3, 0, 0], [.47, 0, 0], .068, .012, M.BROOM, { group: 12, paint: p => (p[0] > .42 ? M.STONED : p[0] > .39 && (Math.floor(p[2] * 60) % 2) ? M.STONED : undefined) });
    m.ell([.36, .045, .03], [.02, .012, .02], M.STONED, { group: 13 }); // a dent
    for (const x of [.125, .3]) rivets(m, x, .071, 7, M.FRAME, 14, -Math.PI * .6, Math.PI * .6);
    for (const s of [-1, 1]) m.box([.17, 0, s * .085], [.05, .03, .006], M.FRAME, { group: 15, round: .004 }); // stubby canards
  } },
  // the curled tip: a hazel crook carved and rolled up into a curl, a brass ferrule, her paint worn to the wood, a leaf sprouting
  curl: { slot: "tip", len: .36, draw(m) {
    m.seg([-.01, 0, 0], [.06, 0, 0], .03, .03, M.FLOWER, { group: 10 });
    rivets(m, .025, .031, 3, M.STONED, 11, -1, 1);
    // the crook: straight on, then rolled up and back over itself one and a half turns, thinning
    const pts = [[.06, 0, 0, .026], [.16, 0, 0, .025]];
    for (let i = 1; i <= 22; i++) { const th = i * .42, R = .085 * Math.pow(.955, i); pts.push([.16 + Math.sin(th) * R, R - Math.cos(th) * R + (.085 - R) * .9, 0, .025 * (1 - i / 30)]); }
    m.chain(pts, M.BROOM, { group: 12, paint: p => (p[1] > .13 ? M.WOOD : undefined) }); // (worn to the wood on its top)
    m.seg([.08, -.02, 0], [.12, -.025, 0], .01, .006, M.BARKD, { group: 13 }); // a knot
    leaves(m, [.11, .03, .02], 3, .025, 14);
  } },
  // the hobby horse's head: carved and painted in her colours, a yarn mane down its neck, button eyes, flared nostrils, a leather
  // bridle with brass rings, felt ears
  horse: { slot: "tip", len: .42, draw(m) {
    m.seg([-.01, 0, 0], [.05, 0, 0], .03, .03, M.FRAME, { group: 10 });
    const neck = [[.04, 0, 0, .034], [.11, .05, 0, .04], [.15, .14, 0, .042], [.17, .2, 0, .04]];
    m.chain(neck, M.BROOM, { group: 11 });
    const head = [.25, .21, 0], dir = v3.norm([1, -.55, 0]);
    m.ell(head, [.1, .05, .042], M.BROOM, { dir, up: [.5, 1, 0], group: 12 });
    m.ell([.33, .17, 0], [.04, .036, .036], M.STRAW, { group: 13 }); // the muzzle, in her trim
    for (const s of [-1, 1]) {
      m.ell([.345, .175, s * .028], [.009, .009, .006], M.LINE, { group: 14 }); // nostril
      m.ell([.22, .245, s * .04], [.015, .015, .008], M.LINE, { group: 14 }); // a button eye
      m.ell([.218, .25, s * .046], [.005, .005, .003], M.BELLY, { group: 15 });
      m.seg([.18, .26, s * .022], [.17, .33, s * .028], .02, .004, M.BROOM, { group: 16 }); // a felt ear
      m.seg([.19, .265, s * .022], [.18, .31, s * .026], .01, .002, M.ACCENT, { group: 17 });
    }
    // the bridle: a noseband and a cheek strap, brass rings at the corners of its mouth, a short rein looped back
    m.seg([.29, .21, -.046], [.29, .21, .046], .009, .009, M.HAIR, { group: 18 });
    for (const s of [-1, 1]) { m.seg([.2, .27, s * .042], [.29, .2, s * .045], .007, .007, M.HAIR, { group: 18 }); m.ell([.315, .16, s * .044], [.014, .014, .006], M.FLOWER, { group: 19 }); }
    m.chain([[.31, .16, .05, .006], [.22, .08, .06, .006], [.12, .05, .05, .006]], M.ACCENT, { group: 20 });
    // the mane: yarn locks down its neck, each its own
    for (let i = 0; i < 7; i++) { const t = i / 6, b = v3.lerp([.06, .045, 0], [.19, .25, 0], t); m.chain([[...b, .016], [b[0] - .045, b[1] + .015 - t * .01, (i % 2 - .5) * .03, .013], [b[0] - .07, b[1] - .02, (i % 2 - .5) * .04, .008]], i % 3 === 1 ? M.ACCENT : M.STRAW, { group: 21 + (i % 2) }); }
  } },
  // ---- chassis: about x 0, between its sockets ----
  // the jet bike's fairing: a fat painted shell round the handle, a tinted windscreen, twin racing stripes, a patch riveted over a hole,
  // a headlamp at its nose (a real light, lit)
  fairing: { slot: "chassis", len: .9, front: .4, back: -.42, seat: [-.12, .09, 0], draw(m) {
    m.seg([-.45, 0, 0], [.45, 0, 0], HANDLE, HANDLE, M.BARKD, { group: 9 });
    m.ell([0, -.04, 0], [.4, .085, .1], M.BROOM, { group: 10, paint: p => (Math.abs(Math.abs(p[2]) - .045) < .012 && p[1] > -.02 ? M.STRAW : undefined) });
    m.ell([-.28, -.03, 0], [.13, .07, .085], M.STONED, { group: 11 }); // (its tail's soot)
    m.ell([.22, .045, 0], [.09, .055, .07], M.CRYSTAL, { dir: v3.norm([1, .7, 0]), group: 12 }); // the windscreen
    m.seg([.16, .02, -.06], [.16, .02, .06], .008, .008, M.FRAME, { group: 13 });
    m.box([-.05, -.04, .1], [.06, .035, .006], M.FRAME, { group: 14, round: .005 }); // a patch over a hole
    for (const [x, y] of [[-.1, -.015], [0, -.015], [-.1, -.065], [0, -.065]]) m.ell([x, y, .107], [.006, .006, .004], M.STONED, { group: 15 });
    m.seg([.37, -.03, 0], [.42, -.03, 0], .03, .028, M.FRAME, { group: 16 }); // the headlamp's barrel
    m.ell([.43, -.03, 0], [.012, .024, .024], M.WOKEN, { group: 117, extra: true }); light(m, [.44, -.03, 0], [255, 214, 150], 6, .3);
    m.seg([-.2, -.12, .05], [-.2, -.17, .05], .01, .01, M.FRAME, { group: 17 }); m.seg([-.2, -.12, -.05], [-.2, -.17, -.05], .01, .01, M.FRAME, { group: 17 }); // a footrest
    m.seg([-.24, -.17, -.07], [-.16, -.17, .07], .008, .008, M.FRAME, { group: 17 });
  } },
  // the ladder: two old wooden rails and rungs in alternating paint, one rung a steel pipe, rope lashings, a paint drip, a hook at its end
  ladder: { slot: "chassis", len: 1, front: .48, back: -.5, seat: [-.1, .03, 0], draw(m) {
    for (const s of [-.075, .075]) m.seg([-.5, 0, s], [.48, 0, s], .017, .017, M.WOOD, { group: 10, paint: p => (Math.abs(p[0] - .2) < .01 && p[1] < 0 ? M.BROOM : undefined) });
    const n = 8;
    for (let i = 0; i <= n; i++) { const x = -.46 + .9 * i / n; m.seg([x, 0, -.075], [x, 0, .075], .012, .012, i === 5 ? M.FRAME : i % 2 ? M.STRAW : M.BROOM, { group: 11 }); }
    m.seg([.2, -.015, .075], [.2, -.06, .075], .006, .003, M.BROOM, { group: 12 }); // a drip
    for (const x of [-.31, .29]) for (const s of [-.075, .075]) m.seg([x - .015, 0, s], [x + .015, 0, s], .022, .022, M.HAIR, { group: 13 }); // rope lashings
    m.chain([[.48, 0, .075, .009], [.53, .03, .075, .008], [.55, 0, .075, .007], [.53, -.025, .075, .006]], M.FRAME, { group: 14 }); // a hook
  } },
  // the canoe's hull: birch-bark in her paint, its inside in her trim, thwarts, lashed gunwales, a tarred patch and an eye at its bow
  canoe: { slot: "chassis", len: 1, front: .5, back: -.5, seat: [-.05, .05, 0], draw(m) {
    m.ell([0, -.05, 0], [.5, .09, .14], M.BROOM, { group: 10, paint: p => (p[1] < -.09 && Math.abs(((p[0] * 9) % 1 + 1) % 1 - .5) < .05 ? M.BARKD : undefined) });
    m.ell([0, -.005, 0], [.47, .09, .118], M.STRAW, { group: 10, cut: true });
    for (const x of [-.48, .48]) m.seg([x * .9, -.03, 0], [x * 1.04, .06, 0], .022, .012, M.BROOM, { group: 11 }); // its ends sweeping up
    for (const x of [-.22, .02, .24]) m.seg([x, .02, -.11], [x, .02, .11], .011, .011, M.WOOD, { group: 12 }); // thwarts
    for (const s of [-1, 1]) m.seg([-.42, .03, s * .11], [.42, .03, s * .11], .009, .009, M.WOOD, { group: 13 }); // gunwales
    m.ell([-.15, -.08, .125], [.05, .035, .012], M.STONED, { group: 14 }); // a tarred patch
    m.ell([.38, -.01, .088], [.018, .014, .008], M.BELLY, { group: 15 }); m.ell([.385, -.01, .094], [.008, .008, .004], M.LINE, { group: 16 }); // an eye at its bow
  } },
  // ---- exhausts: from the socket (x 0) back ----
  // the jet nozzles: twin steel nozzles off a manifold, cooling fins, heat-blued and rusted rings, their pilot flames burning low inside
  nozzles: { slot: "exhaust", len: .4, draw(m) {
    collar(m, .01, -.05);
    m.box([-.075, -.01, 0], [.035, .085, .04], M.FRAME, { group: 10, round: .02 }); // the manifold, a steel block
    rivets(m, -.075, .0, 0, M.STONED, 10);
    for (const [y, k] of [[.045, 1], [-.065, .85]]) { // (one over the other, the lower shorter: both show side on)
      const x0 = -.1, x1 = x0 - .25 * k, r = .03;
      m.seg([x0, y, 0], [x1 + .04, y, 0], r * .8, r, M.FRAME, { group: 11, paint: p => (Math.abs(p[0] - (x0 + x1) / 2) < .01 ? M.FLOWER : undefined) }); // a cone of steel, a brass band
      m.seg([x0 - .04, y, 0], [x0 - .046, y, 0], r * 1.2, r * 1.2, M.STONED, { group: 12 }); // a fin
      m.seg([x1 + .04, y, 0], [x1, y, 0], r * 1.05, r * 1.4, M.ACCENT, { group: 13, paint: p => (p[0] < x1 + .012 ? M.STONED : undefined) }); // the heat-rusted bell, its lip sooty
      m.ell([x1 - .035, y, 0], [.04, r * .55, r * .55], M.MAGIC, { group: 115, extra: true }); // the pilot flame, a short tongue out of it
      m.ell([x1 - .015, y, 0], [.02, r * .32, r * .32], M.MAGIC2, { group: 116, extra: true });
      light(m, [x1 - .03, y, 0], [170, 120, 255], 5, .2);
    }
  } },
  // the twig bristles: a long wild bundle of dark twigs, thicker than her straw, bound with wire twice and a red cord, stray twigs
  // splaying out, buds on a few
  twigs: { slot: "exhaust", len: .62, draw(m) {
    m.seg([.01, 0, 0], [-.07, 0, 0], HANDLE, HANDLE, M.BARKD, { group: 9 });
    m.ell([-.24, 0, 0], [.17, .045, .05], M.BARKD, { group: 10 });
    for (const x of [-.07, -.12]) m.seg([x + .012, 0, 0], [x - .012, 0, 0], .05, .05, x === -.07 ? M.FRAME : M.ACCENT, { group: 11 });
    for (let i = 0; i < 15; i++) {
      const a = i * 2.39, sp = .55 + (i % 4) * .22, end = [-.52 - (i % 3) * .06, Math.cos(a) * .12 * sp, Math.sin(a) * .12 * sp];
      const mid = [-.32, Math.cos(a) * .05 * sp, Math.sin(a) * .06 * sp], kink = [-.42, Math.cos(a + .7) * .07 * sp, Math.sin(a + .7) * .08 * sp];
      m.chain([[-.1, 0, 0, .013], [...mid, .012], [...kink, .009], [...end, .006]], i % 3 ? M.BARKD : M.WOOD, { group: 12 + (i % 3), paint: p => (p[0] < -.48 ? M.WOOD : undefined) });
      if (i % 4 === 0) { const f = v3.add(kink, [-.03, Math.cos(a) * .05, Math.sin(a) * .05]); m.seg(kink, f, .006, .003, M.BARKD, { group: 16 }); m.ell(f, [.014, .008, .01], M.LEAF, { group: 17 }); } // a fork with a bud
    }
  } },
  // the oar's blade: old wood, its tip painted in her colours with a trim band, a brass tip plate, the throat whipped with cord, a chip
  // out of its edge
  oar: { slot: "exhaust", len: .58, draw(m) {
    m.seg([.01, 0, 0], [-.14, 0, 0], HANDLE, .026, M.WOOD, { group: 9 });
    m.seg([-.06, 0, 0], [-.13, 0, 0], .03, .03, M.HAIR, { group: 10, paint: p => (((p[0] * 140) % 1 + 1) % 1 < .3 ? M.BARKD : undefined) }); // whipping
    m.ell([-.36, 0, 0], [.22, .085, .018], M.WOOD, { group: 11, paint: p => (p[0] < -.45 ? M.BROOM : p[0] < -.42 ? M.STRAW : Math.abs(p[1]) < .006 ? M.BARKD : undefined) });
    m.ell([-.575, 0, 0], [.012, .05, .02], M.FLOWER, { group: 12 }); // the tip plate
    m.ell([-.3, -.085, 0], [.03, .02, .03], M.NOSE, { group: 13, cut: true }); // a chip out of its edge
  } },
};

/** Her own straw bristles (the bare broom's: art/witch.js's classic bundle), from x0 back. */
function strawTail(m, x0) {
  m.ell([x0 - .2, 0, 0], [.22, .085, .095], M.STRAW, { group: 30, paint: p => (((p[1] * 90 + p[2] * 40) % 4 + 4) % 4 < .7 ? M.BROOM : undefined) });
  m.seg([x0 - .02, 0, 0], [x0 - .05, 0, 0], .045, .045, M.BROOM, { group: 31 });
}
/** One part drawn alone, its socket at x 0 (a tip's, an exhaust's) or its middle (a chassis's). */
export function drawPart(m, id) { const P = PART_ART[id]; if (!P) throw new Error(`no part "${id}"`); P.draw(m); }

/** Her broom from its three parts (ids, or null for an empty slot): its chassis (else a plain handle), its tip on the chassis's front
 *  socket (else a rounded end), its exhaust on the back one (else her straw bristles). Along x, its nose +x, about its seat. */
export function drawBroom(m, { tip = null, chassis = null, exhaust = null } = {}) {
  const C = chassis ? PART_ART[chassis] : null, front = C ? C.front : .5, back = C ? C.back : -.5;
  if (C) C.draw(m); else { m.seg([back, 0, 0], [front, 0, 0], HANDLE, HANDLE * .85, M.BROOM, { group: 9 }); m.ell([front, 0, 0], [.02, .02, .02], M.BROOM, { group: 9 }); }
  const at = (x, draw) => { const n = m.parts.length, l = (m.lights ??= []).length; draw(); for (const q of m.parts.slice(n)) shift(q, x); for (const L of m.lights.slice(l)) L.c = [L.c[0] + x, L.c[1], L.c[2]]; };
  if (tip) at(front, () => PART_ART[tip].draw(m));
  if (exhaust) at(back, () => PART_ART[exhaust].draw(m)); else strawTail(m, back);
}
/** A part moved dx along x (its paint with it). */
function shift(q, dx) {
  const mv = c => [c[0] + dx, c[1], c[2]];
  if (q.type === "cone") { q.a = mv(q.a); q.b = mv(q.b); } else q.c = mv(q.c);
  if (q.paint) { const f = q.paint; q.paint = (p, part) => f([p[0] - dx, p[1], p[2]], part); }
}

/** Everything drawn since part `from` shortened along x by k (0 to 1) about x 0, as thick as it was: a part made stubbier, so it
 *  reads at a pegboard cell's few pixels (its paint and lights with it). */
export function stubby(m, from, k) {
  const sx = c => [c[0] * k, c[1], c[2]];
  for (const q of m.parts.slice(from)) {
    if (q.type === "cone") { q.a = sx(q.a); q.b = sx(q.b); }
    else { q.c = sx(q.c); const key = q.type === "ell" ? "r" : "h", i = q.axes.findIndex(a => Math.abs(a[0]) > .7); if (i >= 0) q[key] = q[key].map((v, j) => (j === i ? v * k : v)); }
    if (q.paint) { const f = q.paint; q.paint = (p, part) => f([p[0] / k, p[1], p[2]], part); }
  }
  for (const L of m.lights ?? []) L.c = sx(L.c);
}
