// Witch creatures asleep (Ed, 2026-10-06: "I guess we will need sleeping artwork for all the creatures"):
// when the party's over every creature walks home, lies down and sleeps. Each species at each level
// drawn from its own model, lying where it is: its body down on the ground (legs folded under it,
// cut away below its ground line), its head down, eyes shut (the "asleep" expression,
// genome/expressions.js), in 2 frames of a slow breath. Unlike a sleeping legend (legends.js) it is
// itself: no moss, no mound, its own colours, nothing sunk. By species (NAP_POSES):
//   lie:   the hoofed and the heavy (elk, stag, boar, bear, badger, ram, beaver, hare, otter, newt...):
//          belly down, head laid forward on the ground;
//   curl:  the foxes, cats and the like (fox, wolf, lynx, marten, stoat, squirrel, dormouse): the body
//          bent round into a C seen from above, head and tail meeting at the near side;
//   tuck:  birds (owl, raven, heron): settled on their feet, head sunk into the shoulders
//          (the heron folds its neck back, its builder's fold);
//   coil:  the snake, round on itself;
//   flat:  bugs and the low (beetle, woodlouse, spider, moth, glow-worm, snail, toad, mole, hedgehog):
//          pressed to the ground, legs hidden; the bat and the moth wrap their wings round themselves.
// napForm(S) is a form for withForm (creatures3d.js): critter(..., { nap: true }) draws a creature with it.
import { M } from "./core.js";
import { render, v3 } from "./model3d.js";

// ground: the ground line as a share of the body's height from its lowest point (or, for the
// four-legged, sink: a share from belly to back; 0 on its belly). droop: how far its head comes down
// to the ground. curl: how far round its body bends (radians across its length). tuck: its head sunk
// back into its body (a share of its head's size). drop: groups not drawn asleep (spread wings, spirit
// parts). cloak: wings wrapped round it ({ c: centre, r: radii } in model units, as legends.js).
export const NAP_POSES = {
  // lie
  elk: { kind: "lie", sink: .06, droop: .5 }, stag: { kind: "lie", sink: .06, droop: .5 }, boar: { kind: "lie", sink: .05, droop: .8 },
  bear: { kind: "lie", sink: .05, droop: 1 }, badger: { kind: "lie", sink: .04, droop: 1 }, ram: { kind: "lie", sink: .06, droop: .6 },
  beaver: { kind: "lie", sink: .04, droop: 1 }, hare: { kind: "lie", sink: .05, droop: .6 }, otter: { kind: "lie", sink: .03, droop: 1, curl: .7 },
  newt: { kind: "lie", sink: .02, droop: 1, curl: .5 }, salamander: { kind: "lie", sink: .02, droop: 1, curl: .5 },
  // curl
  fox: { kind: "curl", sink: .04, droop: 1, curl: 3.6, tailDown: .25 }, wolf: { kind: "curl", sink: .04, droop: 1, curl: 3, tailDown: .25 }, lynx: { kind: "curl", sink: .04, droop: 1, curl: 3.4, tailDown: .25 },
  marten: { kind: "curl", sink: .03, droop: 1, curl: 3.8, tailDown: .25 }, stoat: { kind: "curl", sink: .03, droop: 1, curl: 4, tailDown: .25 },
  squirrel: { kind: "curl", sink: .04, droop: 1, curl: 3.2, tailDown: .5 }, dormouse: { kind: "curl", sink: .03, droop: 1, curl: 3.8, tailDown: .3 },
  // tuck
  owl: { kind: "tuck", ground: .14, tuck: .35, drop: [40, 50, 95, 96, 97, 98, 99, 100, 101] },
  raven: { kind: "tuck", ground: .26, tuck: .45, drop: [40, 50, 95, 96, 97, 98, 99, 100] },
  heron: { kind: "tuck", ground: .56, fold: 1, drop: [95, 96, 97, 98, 99, 100, 101] },
  // coil
  snake: { kind: "coil", ground: 0, droop: .6, curl: 5.5, drop: [40, 50] },
  // flat
  beetle: { kind: "flat", ground: .32, droop: .4 }, woodlouse: { kind: "flat", ground: .14, drop: [9] }, spider: { kind: "flat", ground: .26, droop: .5, drop: [95, 96, 97, 98, 99] },
  moth: { kind: "flat", ground: .12, drop: [0, 10, 11, 12, 13], cloak: { c: [-.1, .3, 0], r: [.55, .24, .4] } },
  bat: { kind: "flat", ground: .2, drop: [0, 10, 11], cloak: { c: [-.05, .38, 0], r: [.42, .46, .38] } },
  glowworm: { kind: "flat", ground: .05, curl: 1.2 }, snail: { kind: "flat", ground: .04, droop: 1, drop: [5] },
  toad: { kind: "flat", ground: .2, droop: .5 }, mole: { kind: "flat", ground: .22, droop: .4 }, hedgehog: { kind: "flat", ground: .1, droop: .6, curl: 1 },
};
const DEFAULT = { kind: "lie", sink: .05, droop: 1 };
export const napPose = id => NAP_POSES[id] ?? DEFAULT;
/** The breath's lift on the second frame (model units, as legends.js). */
const BREATH = .02;

// The body's bounds (its solid parts).
function bounds(m) {
  const b = { x0: Infinity, x1: -Infinity, y0: Infinity, y1: -Infinity, z0: Infinity, z1: -Infinity };
  for (const q of m.parts) {
    if (q.extra || q.cut) continue;
    const pts = q.type === "cone" ? [[q.a, q.r1], [q.b, q.r2]] : [[q.c, Math.max(...(q.r || q.h))]];
    for (const [c, rr] of pts) { b.x0 = Math.min(b.x0, c[0] - rr); b.x1 = Math.max(b.x1, c[0] + rr); b.y0 = Math.min(b.y0, c[1] - rr); b.y1 = Math.max(b.y1, c[1] + rr); b.z0 = Math.min(b.z0, c[2] - rr); b.z1 = Math.max(b.z1, c[2] + rr); }
  }
  return b;
}
// Moves every part by f(point, part) (each centre or end on its own; a flat by its centre).
function move(m, f) {
  for (const q of m.parts) { if (q.type === "cone") { q.a = f(q.a, q); q.b = f(q.b, q); } else q.c = f(q.c, q); }
  for (const fl of m.flats) fl.c = f(fl.c, fl);
  forAnchors(m, p => f(p, null));
}
// Every anchor point (a centre, the eyes' points, a top): the face is drawn at them once the scale is known, so they move with the body.
function forAnchors(m, f) {
  for (const a of Object.values(m.anchors || {})) for (const one of Array.isArray(a) ? a : [a]) {
    if (!one || typeof one !== "object") continue;
    if (Array.isArray(one.c)) one.c = f(one.c);
    if (Array.isArray(one.top)) one.top = f(one.top);
    if (Array.isArray(one.pts)) one.pts = one.pts.map(f);
  }
}

// The body bent round in the ground plane: its length laid along an arc of `curl` radians about a
// centre on its near side (+z), so head and tail come round toward each other (and the camera).
// Each part's own axes turn with it.
function curlBody(m, curl, cx, half) {
  if (!(curl > 0) || half <= 0) return;
  const rho = half / (curl / 2), turn = (v, t) => [v[0] * Math.cos(t) + v[2] * Math.sin(t), v[1], -v[0] * Math.sin(t) + v[2] * Math.cos(t)];
  const at = p => { const t = (p[0] - cx) / rho; return [cx + (rho - p[2]) * Math.sin(t), p[1], rho - (rho - p[2]) * Math.cos(t)]; };
  for (const q of m.parts) {
    if (q.type === "cone") { q.a = at(q.a); q.b = at(q.b); continue; }
    const t = (q.c[0] - cx) / rho;
    q.c = at(q.c);
    if (q.axes) q.axes = q.axes.map(a => turn(a, -t)); // (turned as the arc turns there: about y)
  }
  for (const f of m.flats) { const t = (f.c[0] - cx) / rho; f.c = at(f.c); if (f.u) f.u = turn(f.u, -t); if (f.v) f.v = turn(f.v, -t); }
  forAnchors(m, at);
}

/** The form that lays species S down asleep (frame: 0 or 1, the breath). For withForm. */
export function napForm(S, { frame = 0 } = {}) {
  const pose = napPose(S.id);
  const form = (m, o) => {
    const s = render(m, { ...o, measure: true }).s; // its scale standing: lying down it keeps its size (render would fit the lower shape to the height)
    if (pose.drop?.length) { m.parts = m.parts.filter(q => !pose.drop.includes(q.group)); m.flats = m.flats.filter(f => !pose.drop.includes(f.group)); }
    const b0 = bounds(m);
    // the ground line it lies on: the four-legged on their bellies (their torso first), the rest by their height
    const torso = m.parts[0], four = S.q && torso?.type === "ell";
    const G = four ? (torso.c[1] - torso.r[1]) + (b0.y1 - (torso.c[1] - torso.r[1])) * (pose.sink ?? 0) : b0.y0 + (b0.y1 - b0.y0) * (pose.ground ?? 0);
    // head down to the ground (or, a bird, sunk back into its shoulders)
    const H = m.anchors.head?.c;
    if (H && (pose.droop ?? 0) > 0) {
      const nk = m.anchors.neck?.c || H, x0 = Math.min(H[0] - .05, H[0] - (H[0] - nk[0]) * 2.2), hr = m.anchors.head.r?.[1] ?? .08, dy = (G + hr * .6 - H[1]) * pose.droop;
      if (dy < 0) move(m, (p, q) => { const t = q && [11, 12, 13].includes(q.group) ? 1 : Math.max(0, Math.min(1, (p[0] - x0) / Math.max(.05, H[0] - x0))); return [p[0], p[1] + dy * t * t * (3 - 2 * t), p[2]]; });
    }
    if (H && pose.tuck) {
      const hr = m.anchors.head.r?.[1] ?? .08, dy = -hr * pose.tuck * 1.6, dx = -hr * pose.tuck;
      move(m, p => { const t = Math.max(0, Math.min(1, 1 - Math.hypot(p[0] - H[0], p[1] - H[1]) / (hr * 2.2))); return [p[0] + dx * t, p[1] + dy * t, p[2]]; });
    }
    // its tail laid along the ground (curled up, it wraps round the body)
    if (pose.tailDown) { const tl = m.parts.filter(q => q.part === "tail"); let top = -Infinity; for (const q of tl) top = Math.max(top, q.type === "cone" ? Math.max(q.a[1], q.b[1]) : q.c[1]); if (top > G) { const base = Math.min(...tl.map(q => q.type === "cone" ? Math.min(q.a[1], q.b[1]) : q.c[1])); const sq = p => [p[0], G + .02 + (p[1] - base) * pose.tailDown, p[2]]; for (const q of tl) { if (q.type === "cone") { q.a = sq(q.a); q.b = sq(q.b); } else q.c = sq(q.c); } } }
    // round on itself (curled, coiled)
    if (pose.curl) { const b = bounds(m); curlBody(m, pose.curl, (b.x0 + b.x1) / 2, (b.x1 - b.x0) / 2); }
    // wings wrapped round it
    if (pose.cloak) { const c = pose.cloak.c; m.ell([c[0], G + (c[1] - .3) + pose.cloak.r[1] * .9, c[2]], pose.cloak.r, M.BODY2, { group: 1, paint: p => Math.abs(Math.sin(Math.atan2(p[2], p[0] - c[0]) * 5)) > .85 ? M.BODY3 : undefined }); }
    if (frame % 2) { const top = bounds(m).y1, k = Math.max(BREATH, 1.8 / s) / Math.max(.05, top - G); move(m, p => [p[0], G + (p[1] - G) * (1 + k), p[2]]); } // its breath: in (swelling up from the ground, its top a pixel or more higher, so the small ones breathe too)
    const b = bounds(m), cx = (b.x0 + b.x1) / 2, cz = (b.z0 + b.z1) / 2; // (curled, its middle has moved toward the near side)
    m.clipY = G;
    const res = render(m, { scale: s, facing: o.facing });
    res.sp.origin = res.project([cx, G, cz]); // the ground under its middle, on the sprite
    res.sp.groundLine = G;
    return crop(res.sp);
  };
  form.motes = false;
  form.fold = pose.fold ?? 0;
  return form;
}

// Cropped to what is drawn (what was cut under the ground leaves empty room), its origin moved with it.
function crop(sp) {
  let x0 = sp.w, x1 = -1, y0 = sp.h, y1 = -1;
  for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) if (sp.m[y * sp.w + x]) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
  if (x1 < 0) return sp;
  const W = x1 - x0 + 1, H = y1 - y0 + 1, c = new sp.constructor(W, H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const i = (y + y0) * sp.w + x + x0, j = y * W + x; c.m[j] = sp.m[i]; c.g[j] = sp.g[i]; for (let k = 0; k < 3; k++) c.n[j * 3 + k] = sp.n[i * 3 + k]; }
  for (const k of Object.keys(sp)) if (!(k in c) && !["m", "g", "n", "w", "h"].includes(k)) c[k] = sp[k];
  if (sp.origin) c.origin = [+(sp.origin[0] - x0).toFixed(1), +(sp.origin[1] - y0).toFixed(1)];
  return c;
}
