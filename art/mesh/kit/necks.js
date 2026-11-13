// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. Added with the wonders (docs/plans/creature-mesh-rollout.md, batch H).

const TAU = Math.PI * 2, ease = v => { const k = Math.min(1, Math.max(0, v)); return k * k * (3 - 2 * k); };
// (a serpent's skull as kit/serpent.js draws it: how far along, how wide, how deep, each ring)
const SKULL = [[0.2, 0.86, 0.95], [0.42, 1, 1], [0.62, 0.9, 0.86], [0.84, 0.62, 0.6], [1, 0.3, 0.3]];

/** What a hydra's head wears (Ed, 2026-10-13, from the mock: "crested"): a crest of spines down the top of its head and a
 *  frill of three flat blades at each side behind its eyes. P is a point on the head in head lengths across, up and along
 *  (kit/serpent.js's S.P, or a neck's own); wide and deep the head's half-sizes in the same lengths, size its length in metres.
 *  o: spines (how many), high, colour, tip, frill: { colour, tip, long } or null, glow. */
export function crest(P, bone, { wide, deep, size }, o = {}) {
  const { spines = 4, high = 0.3, colour, tip = colour, frill = { colour, tip }, up = [0, 0, 1] } = o, cones = [];
  for (let i = 0; i < spines; i++) { const z = 0.72 - 0.6 * i / Math.max(1, spines - 1), k = 0.65 + 0.35 * Math.sin(Math.PI * (i + 0.6) / (spines + 0.2));
    cones.push({ at: P(0, deep * 0.8, z), rx: 0.05 * size, ry: 0.09 * size, tip: P(0, deep + high * k, z - 0.16 * k), bone, colour, tipColour: tip, split: 0.5, up, sides: 3 }); }
  if (frill) for (const s of [1, -1]) for (let j = 0; j < 3; j++) { const a = -0.5 + 0.55 * j, L = (frill.long ?? 0.42) * (j === 1 ? 1 : 0.8);
    cones.push({ at: P(s * wide * 0.85, deep * 0.1, 0.3), rx: 0.035 * size, ry: 0.1 * size, tip: P(s * (wide + L * Math.cos(a) * 0.75), deep * 0.1 + L * Math.sin(a), 0.3 - L * 0.55), bone, colour: frill.colour, tipColour: frill.tip ?? frill.colour, split: 0.55, bulge: 0.9, up, sides: 3 }); }
  return cones;
}

/** One more neck with a head on it (the hydra's: "several heads on several necks"), standing from `from` on `parent`: a tube on
 *  a chain of its own bones (neck<tag>1 up, then head<tag>), rising at rise[0] (radians above level) and bending over to
 *  rise[1] at its head, leaning out sideways by `yaw` at its root and turning back to face forward by its head (yaw + to its
 *  left), a serpent's skull on its end with two eyes.
 *  o: len, r (its root's thickness), taper (its top's, as a share), bones, n (rings), skin(t, i) a ring's colour (it may be a
 *  ring's (cy) => colour), head: { len, wide, deep (of r), nod, eye, colour, eyes: { colour, glow } }, crest (crest's options, or
 *  none), spines: { n, high, colour, tip } down the back of the neck, ring: { colour, at } a band round it (a legend's bronze),
 *  stump: true for one cut short (no head: a scarred end, `scar` its colour).
 *  Returns the part and: chain (its neck bones), head (its head's bone), mouth (where its mouth is, metres),
 *  sways(phase, amp) (turns for a gait's `extra`: it sways as it goes), pose(kind, lean) (each bone's turn for a still pose:
 *  "rear" drawn back to strike, its neck an S; "snap" struck forward; "watch" leaning `lean` radians to its left, looking on). */
export function neck(tag, parent, from, o = {}) {
  const { len = 0.5, r = 0.05, yaw = 0, rise = [1.45, 0.3], bones: nb = 4, n = 9, taper = 0.7, skin, head: H = {}, ring, spines, stump = false, scar = "#7a3b3b" } = o;
  const M = 48, pitch = t => rise[0] + (rise[1] - rise[0]) * ease(t * 1.15 - 0.15), yawAt = t => yaw * (1 - 0.75 * ease(t));
  const dir = t => { const p = pitch(t), y = yawAt(t); return [Math.sin(y) * Math.cos(p), Math.sin(p), Math.cos(y) * Math.cos(p)]; }, dorsal = t => { const p = pitch(t), y = yawAt(t); return [-Math.sin(y) * Math.sin(p), Math.cos(p), -Math.cos(y) * Math.sin(p)]; };
  const pts = [[...from]]; for (let i = 0; i < M; i++) { const d = dir((i + 0.5) / M); pts.push(pts[i].map((v, k) => v + d[k] * len / M)); }
  const at = t => { const f = Math.min(M - 1e-6, Math.max(0, t * M)), i = Math.floor(f), u = f - i; return pts[i].map((v, k) => v + (pts[i + 1][k] - v) * u); };
  const chain = Array.from({ length: nb }, (_, i) => `neck${tag}${i + 1}`), headBone = stump ? chain[nb - 1] : `head${tag}`, boneOf = t => chain[Math.min(nb - 1, Math.floor(t * nb + 1e-6))];
  const bones = chain.map((name, i) => [name, at(i / nb), i ? chain[i - 1] : parent]), fat = t => r * (1 - (1 - taper) * t);
  const rings = Array.from({ length: n }, (_, i) => { const t = i / (n - 1); return { at: at(t), rx: fat(t) * 1.05, ry: fat(t), bone: boneOf(t), colour: skin(t, i), up: dorsal(t) }; }), lofts = [], cones = [];
  let mouth = at(1);
  if (stump) rings.push({ at: at(1).map((v, k) => v + dir(1)[k] * r * 0.25), rx: fat(1) * 0.55, ry: fat(1) * 0.5, bone: headBone, colour: scar, up: dorsal(1) });
  else {
    const nod = H.nod ?? 0.1, p1 = pitch(1) - nod, y1 = yawAt(1), f = [Math.sin(y1) * Math.cos(p1), Math.sin(p1), Math.cos(y1) * Math.cos(p1)], uh = [-Math.sin(y1) * Math.sin(p1), Math.cos(p1), -Math.cos(y1) * Math.sin(p1)], sd = [Math.cos(y1), 0, -Math.sin(y1)];
    const hl = (H.len ?? 3.3) * r * taper, hw = (H.wide ?? 1.4) * r * taper, hd = (H.deep ?? 0.9) * r * taper, base = at(1), P = (x, y, z) => base.map((v, k) => v + (sd[k] * x + uh[k] * y + f[k] * z) * hl), hc = H.colour ?? skin(1, n);
    bones.push([headBone, base, chain[nb - 1]]);
    rings.push(...SKULL.map(([z, w, d]) => ({ at: P(0, 0, z), rx: hw * w, ry: hd * d, bone: headBone, colour: hc, up: uh })));
    const eyes = H.eyes ?? {}, es = (H.eye ?? 1) * hw * 0.2;
    for (const s of [1, -1]) { const e = P(s * hw * 0.82 / hl, hd * 0.5 / hl, 0.56);
      cones.push({ at: e, rx: es, ry: es * 0.85, tip: e.map((v, k) => v + (sd[k] * s * 0.8 + uh[k] * 0.4 + f[k] * 0.3) * es), bone: headBone, colour: eyes.colour ?? "#17120f", glow: !!eyes.glow, tag: "eye", split: 0.5, up: uh, sides: 4 }); }
    if (o.crest) cones.push(...crest(P, headBone, { wide: hw / hl, deep: hd / hl, size: hl }, { ...o.crest, up: sd }));
    mouth = P(0, -0.05, 1);
  }
  lofts.push({ sides: 8, up: [0, 0, -1], rings });
  if (spines) for (let i = 0; i < spines.n; i++) { const t = 0.12 + 0.76 * i / Math.max(1, spines.n - 1), p = at(t), u = dorsal(t), d = dir(t), h = (spines.high ?? 0.6) * fat(t);
    cones.push({ at: p.map((v, k) => v + u[k] * fat(t) * 0.8), rx: fat(t) * 0.22, ry: fat(t) * 0.4, tip: p.map((v, k) => v + u[k] * (fat(t) + h) - d[k] * h * 0.5), bone: boneOf(t), colour: spines.colour, tipColour: spines.tip ?? spines.colour, split: 0.5, up: d, sides: 3 }); }
  if (ring) lofts.push({ sides: 8, up: [0, 0, -1], rings: [[-0.035, 0.96], [-0.015, 1.2], [0.015, 1.2], [0.035, 0.96]].map(([dt, k]) => { const t = ring.at + dt; return { at: at(t), rx: fat(t) * 1.05 * k, ry: fat(t) * k, bone: boneOf(ring.at), colour: ring.colour, up: dorsal(t), plain: true }; }) });
  const all = stump ? chain : [...chain, headBone];
  const sways = (phase = 0, amp = 0.05) => all.map((bone, i) => ({ bone, rot: u => [amp * Math.sin(TAU * u + phase - 0.6 * i) * (i === all.length - 1 ? -1.5 : 1), amp * 0.9 * Math.sin(TAU * u + phase + 1.4 - 0.6 * i), 0] }));
  const SHAPES = { rear: [-0.62, -0.3, 0.42, 0.5, 0.12], snap: [0.6, 0.3, -0.2, -0.28, -0.22] };
  const pose = (kind, lean = 0) => Object.fromEntries(all.map((bone, i) => { const k = i === all.length - 1 && !stump ? 4 : Math.min(3, Math.round(i * 3 / Math.max(1, nb - 1)));
    return [bone, kind === "watch" ? [i ? 0 : 0.06, i === all.length - 1 ? lean * 1.2 : 0, i < 2 ? -lean : 0] : [SHAPES[kind][k] * (kind === "snap" && i === 0 ? 1 : 1), i ? 0 : -yaw * (kind === "snap" ? 0.5 : 0.15), 0]]; }));
  return { bones, lofts, cones, chain, head: headBone, mouth, sways, pose };
}
