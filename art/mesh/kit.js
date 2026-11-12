// Parts a four-legged plan is put together from (tools/creature-mesh/quadruped.js builds the plan): a torso, legs, a head, tails
// and bands, each from a few proportions, so a species' levels can differ in build and not only in size. The shapes they start
// from are a red fox's, measured in metres; a species' file bends them to its own animal. Each part returns { bones, lofts,
// cones, rings } pieces; `plan` joins them.

/** A ring's colour, one above and another below: cy is 1 at the ring's top, -1 at its bottom. */
export const bib = (above, below, at = -0.25) => cy => (cy < at ? below : above);

/** The torso and neck: bones root, pelvis, loin, chest, neck, and the skin's rings from rump to neck top (the head's rings go
 *  on after them). o: back (the spine's height: about 0.38 x the legs' length), len (1: a fox's), girth, deep (the chest's depth),
 *  tuck (the loin's: under 1 tucked up), neck [up, forward] from the shoulders to the skull's base, neckThick, colours
 *  { coat, belly, back (a stripe along the spine, if any) }, white (how far up the flank the belly's colour comes, 0 to 1), hump (the
 *  withers raised: an old animal's high shoulders), arch (the back bowed up between hips and shoulders: a stoat's, a hare's), drop
 *  (the shoulders that much lower than the hips, for hind legs longer than the fore), rump (the haunches' size). */
export const stance = (hind, fore = hind) => ({ back: 0.37 * hind + 0.01, drop: 0.37 * hind - 0.03 - 0.34 * fore }); // the back's height and drop for legs of those lengths
export function torso(o) {
  const { back = 0.38, len = 1, girth = 1, deep = 1, tuck = 1, neck = [0.17, 0.15], neckThick = 1, white = 0.5, hump = 0, arch = 0, drop = 0, rump = 1, colours } = o, g = girth, C = colours;
  const coat = lo => (C.back ? cy => (cy > 0.75 ? C.back : cy < lo ? C.belly : C.coat) : bib(C.coat, C.belly, lo));
  const z = v => v * len, at = white * 0.9 - 1.05; // (white 0: none; 1: the lower half)
  // (how far along the back, 0 at the hips to 1 at the shoulders: the spine arched up between them by `arch`, its front `drop` lower)
  const fr = v => Math.min(1.1, Math.max(-0.2, (v + 0.275) / 0.46)), yo = v => arch * 0.07 * Math.sin(Math.PI * Math.min(1, Math.max(0, fr(v)))) - drop * fr(v);
  const sh = [0, back - 0.005 + yo(0.185), z(0.185)], pivot = [0, sh[1] + neck[0], sh[2] + neck[1]];
  return {
    pivot,
    bones: [["root", [0, 0, 0], null], ["pelvis", [0, back + 0.01 + yo(-0.26), z(-0.26)], "root"], ["loin", [0, back + 0.02 + yo(-0.1), z(-0.10)], "pelvis"], ["chest", [0, back + 0.005 + yo(0.08), z(0.08)], "loin"], ["neck", [0, sh[1] + neck[0] * 0.35, sh[2] + neck[1] * 0.45], "chest"]],
    rings: [
      { at: [0, back + 0.005 + yo(-0.365) - (rump - 1) * 0.02, z(-0.365)], rx: 0.03 * g * rump, ry: 0.035 * g * rump, bone: "pelvis", colour: C.coat },
      { at: [0, back - 0.005 + yo(-0.275), z(-0.275)], rx: 0.088 * g * rump, ry: 0.1 * g * rump, bone: "pelvis", colour: coat(at - 0.55) },
      { at: [0, back + 0.01 + (1 - tuck) * 0.03 + yo(-0.12), z(-0.12)], rx: 0.082 * g * (0.6 + 0.4 * tuck), ry: 0.088 * g * tuck, bone: "loin", colour: coat(at - 0.3) },
      { at: [0, back - 0.01 - (deep - 1) * 0.04 + hump * 0.025 + yo(0.05), z(0.05)], rx: 0.096 * g, ry: (0.122 * deep + hump * 0.03) * g, bone: "chest", colour: coat(at - 0.1) },
      { at: [0, sh[1] - (deep - 1) * 0.04 + hump * 0.05, sh[2]], rx: 0.094 * g, ry: (0.125 * deep + hump * 0.055) * g, bone: "chest", colour: coat(at + 0.15) },
      { at: [0, sh[1] + neck[0] * 0.35, sh[2] + neck[1] * 0.5], rx: 0.068 * g * neckThick, ry: 0.09 * g * neckThick, bone: "neck", colour: bib(C.coat, C.belly, at + 0.3), up: [0, 0.8, -0.6] },
      { at: [0, sh[1] + neck[0] * 0.82, sh[2] + neck[1] * 0.92], rx: 0.06 * g * neckThick, ry: 0.07 * g * neckThick, bone: "neck", colour: bib(C.coat, C.belly, at + 0.3), up: [0, 0.75, -0.65] },
    ],
    hip: s => [0.065 * g * rump * s, back - 0.01, z(-0.25)], shoulder: s => [0.06 * g * s, back - 0.04 - drop, z(0.175)],
  };
}

/** A leg from its top joint: "hind" (hip, knee, hock, paw: the hock high and back) or "fore" (shoulder, elbow, wrist, paw).
 *  len 1 reaches the ground from a fox's hip (0.37 up) or shoulder (0.34 up); thick fattens it. colours { upper, mid, sock }.
 *  band: { colour, at: 0..1 down the lowest long bone, r } puts a ring of beads there; knob swells the joints (an old animal's);
 *  claws: { colour, len, thick, wide } three long claws a paw; foot the toes' length (a hare's long hind foot); paw its width (a
 *  mole's spade). */
export function leg(kind, tag, s, top, o) {
  const { len = 1, thick = 1, parent, colours: C, band, knob = 1, claws, foot = 1, paw = 1 } = o, k = len, t = thick * len;
  const P = (dx, dy, dz) => [top[0] + dx * k * s, top[1] + dy * k, top[2] + dz * k];
  const hind = kind === "hind", n = hind ? ["hip", "knee", "hock", "hpaw"] : ["shoulder", "elbow", "wrist", "fpaw"], b = n.map(x => x + tag);
  const J = hind ? [[0, 0, 0], [0.01, -0.145, 0.065], [0.01, -0.245, -0.065], [0.01, -0.348, -0.035]] : [[0, 0, 0], [0.005, -0.125, -0.035], [0.005, -0.255, -0.02], [0.005, -0.318, -0.015]];
  const R = hind
    ? [[-0.005, 0.02, -0.005, 0.056, 0.111, 0, "upper"], [0.005, -0.07, 0.035, 0.059, 0.098, 0, "upper"], [0.01, -0.145, 0.065, 0.039, 0.052, 0, "mid"], [0.01, -0.245, -0.065, 0.024, 0.029, 1, "sock"], [0.01, -0.34, -0.038, 0.022, 0.023, 2, "sock"], [0.01, -0.358, -0.012, 0.031, 0.016, 3, "sock", 1], [0.01, -0.36, 0.035, 0.028, 0.013, 3, "sock", 1]]
    : [[-0.002, 0.03, 0.01, 0.049, 0.085, 0, "upper"], [0.003, -0.05, -0.015, 0.05, 0.075, 0, "upper"], [0.005, -0.125, -0.035, 0.034, 0.042, 0, "mid"], [0.005, -0.255, -0.02, 0.022, 0.025, 1, "sock"], [0.005, -0.312, -0.017, 0.022, 0.022, 2, "sock"], [0.005, -0.328, 0.01, 0.031, 0.016, 3, "sock", 1], [0.005, -0.33, 0.05, 0.028, 0.013, 3, "sock", 1]];
  const out = { bones: J.map((j, i) => [b[i], P(...j), i ? b[i - 1] : parent]), lofts: [{ sides: 5, up: [0, 0, 1], rings: R.map(([dx, dy, dz, rx, ry, bone, c, flat], i) => ({ at: P(dx, dy, i === 6 ? R[5][2] + (dz - R[5][2]) * foot : dz), rx: rx * t * (i === 2 || i === 3 ? knob : 1) * (flat ? paw : 1), ry: ry * t * (i === 2 || i === 3 ? knob : 1), bone: b[bone], colour: C[c], ...(flat ? { up: [0, 1, 0] } : {}) })) }], cones: [], names: b };
  if (claws) { const toe = [R[6][0], R[6][1], R[5][2] + (R[6][2] - R[5][2]) * foot], cw = (claws.wide ?? 1) * paw; for (const dx of [-0.02, 0, 0.02]) out.cones.push({ at: P(toe[0] + dx * cw, toe[1] + 0.004, toe[2] - 0.005), rx: 0.008 * t * (claws.thick ?? 1), ry: 0.008 * t * (claws.thick ?? 1), tip: P(toe[0] + dx * 1.3 * cw, toe[1] - 0.008, toe[2] + 0.03 * (claws.len ?? 1)), bone: b[3], colour: claws.colour, up: [0, 1, 0], sides: 3 }); }
  if (band) { // beads round the cannon bone, riding it
    const a = P(...J[2]), e = P(...J[3]), m = f => a.map((v, i) => v + (e[i] - v) * f), r = (band.r ?? 0.034) * t, w = 0.035;
    out.lofts.push({ sides: 6, up: [0, 0, 1], rings: [[-w, 0.6], [-w / 2, 1], [w / 2, 1], [w, 0.6]].map(([d, f]) => ({ at: m(band.at + d), rx: r * f, ry: r * f, bone: b[2], colour: band.colour })) });
  }
  return out;
}

/** The head on the skull's base `pivot`: its rings (to follow the torso's), ears, cheek tufts and eyes. size scales it all;
 *  muzzle its length, muzzleWide and muzzleDeep its section, wide the skull's width, dome its height, nose the nose's size;
 *  ear { shape: "point" | "round" | "long", tall, wide, at: [out, up, forward] (moved from a fox's), lean (a long ear laid back),
 *  splay (tipped outward), back, tip, inner, torn: -1|1 (that side's ear bitten short and split) }; cheek the tufts' reach (0:
 *  none); eye its size, eyeAt [out, up, forward] moving it; stripe (cy, sx) => a colour or nothing, painted over the skull and
 *  brow (a badger's bands: sx is -1..1 across the head); colours { coat, belly, nose, muzzle (the muzzle's own, if grizzled), mask
 *  (the face's, brow to nose, if it wears one), eye, eyes: [left, right] (each { colour, glow }) }. */
export function head(pivot, o) {
  const { size = 1, muzzle = 1, ear = {}, cheek = 1, eye = 1, colours: C, white = 0.5, wide = 1, dome = 1, muzzleWide = 1, muzzleDeep = 1, nose = 1, stripe, eyeAt = [0, 0, 0] } = o, k = size, m = muzzle;
  const P = (x, y, z) => [x * k, pivot[1] + y * k, pivot[2] + z * k], at = white * 0.7 - 0.85, mz = C.muzzle ?? C.mask ?? C.coat;
  const face = (base, lo) => (stripe ? (cy, sx) => stripe(cy, sx) ?? bib(base, C.belly, lo)(cy) : bib(base, C.belly, lo));
  const rings = [
    { at: P(0, 0.03, 0.04), rx: 0.09 * k * wide, ry: 0.074 * k * dome, bone: "head", colour: face(C.coat, at) },
    { at: P(0, 0.025, 0.11), rx: 0.08 * k * wide, ry: 0.066 * k * dome, bone: "head", colour: face(C.mask ?? C.coat, at + 0.2) },
    { at: P(0, 0, 0.16), rx: 0.044 * k * muzzleWide, ry: 0.044 * k * muzzleDeep, bone: "head", colour: face(mz, at + 0.4) },
    { at: P(0, -0.013, 0.16 + 0.065 * m), rx: 0.03 * k * muzzleWide, ry: 0.03 * k * muzzleDeep, bone: "head", colour: bib(mz, C.belly, at + 0.55) },
    { at: P(0, -0.013, 0.16 + 0.087 * m), rx: 0.02 * k * nose, ry: 0.02 * k * nose, bone: "head", colour: C.nose },
    { at: P(0, -0.013, 0.16 + 0.101 * m), rx: 0.009 * k * nose, ry: 0.009 * k * nose, bone: "head", colour: C.nose },
  ];
  const tall = ear.tall ?? 1, ew = ear.wide ?? 1, cones = [], lofts = [], bones = [["head", pivot, "neck"]], [ex = 0, ey = 0, ez = 0] = ear.at ?? [], shape = ear.shape ?? "point";
  for (const s of [1, -1]) {
    const name = s > 0 ? "earL" : "earR", bx = 0.048 * wide + ex, base = P(bx * s, 0.07 * dome + ey, 0.025 + ez), torn = ear.torn === s, h = torn ? 0.6 : 1;
    bones.push([name, base, "head"]);
    if (shape === "point") {
      const tip = (dx, f) => P((bx + (0.026 + (ear.splay ?? 0) * 0.1) * tall * f + dx) * s, 0.07 * dome + ey + 0.16 * tall * f, 0.025 + ez - 0.015 * f);
      cones.push({ at: base, rx: 0.042 * k * ew, ry: 0.034 * k * ew, tip: tip(0, h), bone: name, colour: cy => (cy < 0 ? (ear.back ?? C.coat) : C.coat), tipColour: ear.tip ?? ear.back ?? C.coat, split: torn ? 0.75 : 0.62, up: [0, 0, 1] });
      if (torn) cones.push({ at: P(0.03 * s, 0.1, 0.02), rx: 0.016 * k, ry: 0.014 * k, tip: tip(-0.03, 0.72), bone: name, colour: ear.back ?? C.coat, up: [0, 0, 1] }); // (what's left of its inner edge)
    } else {
      // a round ear is a low paddle; a long one a hare's: narrow at the root, widest a third up, thin all the way, its tip dark
      const long = shape === "long", H = (long ? 0.16 : 0.075) * tall * h, lean = ear.lean ?? (long ? 0.25 : 0), sp = (ear.splay ?? (long ? 0.12 : 0.35));
      const prof = long ? [[0, 0.5], [0.3, 1], [0.62, 0.92], [0.86, 0.6], [1, 0.12]] : [[0, 0.8], [0.45, 1], [0.8, 0.75], [1, 0.3]];
      const up = [0, Math.sin(lean), Math.cos(lean)];
      lofts.push({ sides: 6, up, rings: prof.map(([t, f], i) => ({ at: P((bx + sp * H * t) * s, 0.07 * dome + ey + H * t * Math.cos(lean), 0.025 + ez - H * t * Math.sin(lean)), rx: 0.04 * k * ew * f, ry: (long ? 0.012 : 0.016) * k * ew * (0.6 + 0.4 * f), bone: name, up,
        colour: t > (long ? 0.78 : 2) ? (ear.tip ?? ear.back ?? C.coat) : cy => (cy > 0 ? (ear.inner ?? C.coat) : (ear.back ?? C.coat)) })) });
      if (torn) cones.push({ at: P((bx + sp * H) * s, 0.07 * dome + ey + H * 0.9, 0.025 + ez - H * Math.sin(lean)), rx: 0.012 * k, ry: 0.008 * k, tip: P((bx + sp * H * 1.3 + 0.02) * s, 0.07 * dome + ey + H * 1.25, 0.025 + ez - H * Math.sin(lean) * 1.2), bone: name, colour: ear.back ?? C.coat, up });
    }
    if (cheek) cones.push({ at: P(0.06 * wide * s, -0.005, 0.065), rx: 0.04 * k, ry: 0.03 * k, tip: P((0.06 * wide + 0.075 * cheek) * s, -0.005 - 0.035 * cheek, 0.065 - 0.065 * cheek), bone: "head", colour: C.cheek ?? C.belly, split: 0.5, up: [0, 1, 0] });
    const E = C.eyes?.[s > 0 ? 0 : 1], ew2 = 0.058 * wide + eyeAt[0];
    cones.push({ at: P(ew2 * s, 0.055 * dome + eyeAt[1], 0.117 + eyeAt[2]), rx: 0.019 * k * eye, ry: 0.016 * k * eye, tip: P((ew2 + 0.016 * eye) * s, 0.063 * dome + eyeAt[1], 0.125 + eyeAt[2]), bone: "head", colour: E?.colour ?? C.eye ?? C.nose, glow: !!E?.glow, tag: "eye", split: 0.5, up: [0, 1, 0], sides: 4 });
  }
  return { bones, rings, cones, lofts, P, ears: ["earL", "earR"] };
}

/** Fur, spines or plates standing off a ring of the skin: n a side round it from angle a0 to a1 (0 the top, going down its
 *  flank; mirrored), each `long`, swept back by `sweep` and hanging by `droop`, growing down the flank by `grow`. colour(i, s)
 *  and tip(i, s) pick each one's; r its root's size; sides its facets; glow lights it (true: all of it; "tip": its outer half; or
 *  (i, s) => either, to light some and not others); lock makes each a full curved lock of fur where it would be a spike. */
export function tufts(ring, bone, o) {
  const out = [], { n = 6, a0 = 0.2, a1 = 2.6, long = 0.2, sweep = 0.6, r = 0.045, colour, tip, grow = 0, droop = 0.15, sides = 4, glow = false, flat = 0.8, jitter = 0.3, lock = false } = o;
  for (const s of [1, -1]) for (let i = 0; i < n; i++) {
    const a = a0 + (a1 - a0) * (n === 1 ? 0 : i / (n - 1)), cx = Math.sin(a) * s, cy = Math.cos(a), L = long * (1 + grow * (i / Math.max(1, n - 1))) * (1 - jitter / 2 + jitter * ((i * 7 + (s > 0 ? 0 : 3)) % 5) / 4);
    const at = [ring.at[0] + cx * ring.rx * 0.8, ring.at[1] + cy * ring.ry * 0.8, ring.at[2]];
    out.push({ at, rx: r, ry: r * flat, tip: [at[0] + cx * L * (1 - sweep) * 0.8, at[1] + cy * L * (1 - sweep) * 0.8 - L * droop, at[2] - L * sweep], bone, colour: colour(i, s), tipColour: tip?.(i, s) ?? colour(i, s), split: lock ? 0.45 : 0.5, up: [0, 0, 1], sides: lock ? 5 : sides, glow: typeof glow === "function" ? glow(i, s) : glow, ...(lock ? { bulge: 0.9, bend: [cx * L * 0.12, cy * L * 0.12 + L * 0.06, 0] } : {}) });
  }
  return out;
}

/** A raised boss (a turtle's keel; a legend's armour is not this but `armour`, plate raised from its own skin: see `plan`): a
 *  faceted boss of `r` standing `high` off `at` the way `out` points, on `bone`; gem: { colour } a lit stone
 *  set in its middle; rim a second colour for its edge. */
export function plate(bone, at, out, o) {
  const { r = 0.08, high = 0.04, colour, rim, gem, sides = 6, up = [0, 1, 0], ry = r } = o, l = Math.hypot(...out) || 1, d = out.map(v => v / l), top = at.map((v, i) => v + d[i] * high);
  const cones = [{ at, rx: r, ry, tip: top, bone, colour: rim ?? colour, tipColour: colour, split: 0.35, up, sides }];
  if (gem) cones.push({ at: top.map((v, i) => v - d[i] * high * 0.35), rx: r * 0.28, ry: r * 0.28, tip: top.map((v, i) => v + d[i] * high * 0.5), bone, colour: gem.colour, glow: true, up, sides: 4 });
  return { bones: [], lofts: [], cones };
}

/** A tail from `root` on `parent`, along a path that starts at yaw (radians: to its left +) and pitch (up +) and turns as it
 *  goes: curl (pitch gained over its length), twist (yaw gained), wave and waves (a sway in pitch, radians and how many), phase.
 *  len, r (its fullest), colours { coat, under, tip }, tip (the share of its length in the tip's colour), blunt (how round its
 *  end: 0.05 a point), sides, bones (4; more for a long one). fire: { colour, size } a flame of that colour standing off its tip,
 *  glowing; ring: { colour, at } a band round it; spikes: { n, colour, len, glow } tufts of fur standing off its upper edge
 *  (glow "tip" lights their points); plume: slender from the root and full near its end, a flame's shape. */
export function tail(name, parent, root, o) {
  const { len = 0.5, r = 0.094, yaw = 0, pitch = -0.33, curl = 0, twist = 0, wave = 0, waves = 1, phase = 0, colours: C, tip = 0.2, sides = 7, blunt = 0.05, bones: nb = 4, fire, ring, spikes, plume = false } = o;
  const N = 24, pts = [[...root]], dirs = [];
  for (let i = 0; i < N; i++) { const t = (i + 0.5) / N, p = pitch + curl * t + wave * Math.sin(Math.PI * 2 * waves * t + phase), y = yaw + twist * t, d = [Math.sin(y) * Math.cos(p), Math.sin(p), -Math.cos(y) * Math.cos(p)]; dirs.push(d); pts.push(pts[i].map((v, k) => v + d[k] * len / N)); }
  const at = t => { const f = Math.min(N - 1e-6, Math.max(0, t * N)), i = Math.floor(f), u = f - i; return pts[i].map((v, k) => v + (pts[i + 1][k] - v) * u); }, dir = t => dirs[Math.min(N - 1, Math.max(0, Math.floor(t * N)))];
  // (a ring's "up": the world's, laid square to the path there, or the path's own side where it climbs straight up)
  const upAt = t => { const d = dir(t), w = Math.abs(d[1]) > 0.9 ? [0, 0, 1] : [0, 1, 0], k = w[0] * d[0] + w[1] * d[1] + w[2] * d[2], u = w.map((v, i) => v - d[i] * k), l = Math.hypot(...u) || 1; return u.map(v => v / l); };
  const bt = Array.from({ length: nb }, (_, i) => 0.04 + (i / nb) * 0.95), bones = bt.map((t, i) => [`${name}${i + 1}`, at(t), i ? `${name}${i}` : parent]);
  const bone = t => { let b = parent; for (let i = 0; i < nb; i++) if (t >= bt[i] + 0.5 * (0.95 / nb)) b = `${name}${i + 1}`; return b; }, last = `${name}${nb}`;
  const prof = plume ? [[0, 0.3], [0.12, 0.34], [0.28, 0.48], [0.44, 0.72], [0.58, 0.94], [0.7, 1], [0.8, 0.86], [0.9, 0.52], [1, 0.04]] // (slender from the root, full near the end, a flame's point)
    : [[0, 0.28], [0.1, 0.5], [0.22, 0.8], [0.38, 0.96], [0.54, 1], [0.7, 0.9 + blunt * 0.2], [0.82, 0.74 + blunt * 0.4], [0.92, 0.5 + blunt * 0.6], [1, blunt]];
  const out = { bones, cones: [], chain: bones.map(b => b[0]), lofts: [{ sides, up: [0, 1, 0], rings: prof.map(([t, f]) => ({ at: at(t), rx: r * f, ry: r * f * 1.03, bone: bone(t), up: upAt(t), colour: t >= 1 - tip ? C.tip : t > 0.45 ? bib(C.coat, C.under ?? C.coat, -0.3) : C.coat })) }] };
  const along = (t, off) => { const p = at(t), u = upAt(t); return p.map((v, i) => v + u[i] * off); }, end = at(1), d1 = dir(1);
  if (fire) { const s = fire.size ?? 1, base = end.map((v, i) => v + d1[i] * 0.03 * s); out.cones.push({ at: base, rx: 0.045 * s, ry: 0.045 * s, tip: base.map((v, i) => v + d1[i] * 0.06 * s + (i === 1 ? 0.14 * s : 0)), bone: last, colour: fire.colour, tipColour: fire.tip ?? fire.colour, glow: true, split: 0.55, up: upAt(1), sides: 5 }, { at: base, rx: 0.045 * s, ry: 0.045 * s, tip: base.map((v, i) => v - d1[i] * 0.05 * s - (i === 1 ? 0.03 * s : 0)), bone: last, colour: fire.colour, glow: true, up: upAt(1), sides: 5 }); }
  // (the tail's own thickness there, so a band sits on it whatever its shape)
  const fat = t => { let i = 0; while (i + 2 < prof.length && prof[i + 1][0] < t) i++; const [t0, f0] = prof[i], [t1, f1] = prof[i + 1]; return f0 + (f1 - f0) * Math.min(1, Math.max(0, (t - t0) / (t1 - t0))); };
  if (ring) out.lofts.push({ sides, up: [0, 1, 0], rings: [[-0.018, 0.95], [-0.008, 1.14], [0.008, 1.14], [0.018, 0.95]].map(([dt, f]) => { const t = ring.at + dt, k = fat(t); return { at: at(t), rx: r * k * f, ry: r * k * f, bone: bone(t), up: upAt(t), colour: ring.colour }; }) });
  if (spikes) for (let i = 0; i < spikes.n; i++) { const t = 0.2 + (i / spikes.n) * 0.62, k = 0.85 + 0.15 * Math.sin(i * 2.3), back = dir(t).map(v => -v * 0.03); out.cones.push({ at: along(t, r * 0.75), rx: 0.03, ry: 0.022, tip: along(t - 0.05, r * 0.9 + 0.07 * (spikes.len ?? 1) * k).map((v, j) => v + back[j]), bone: bone(t), colour: C.coat, tipColour: spikes.colour ?? C.coat, split: 0.5, up: dir(t), sides: 4, glow: spikes.glow }); }
  return out;
}

/** A band round a bone's line from a to b (a collar, a rope): colour, r, how far along (0..1), wide. */
export function band(bone, a, b, o) {
  const { at = 0.5, r = 0.08, wide = 0.03, colour, up = [0, 0.8, -0.6], sides = 8, ry = r } = o, L = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]) || 1;
  const m = f => a.map((v, i) => v + (b[i] - v) * f), w = wide / L;
  return { bones: [], cones: [], lofts: [{ sides, up, rings: [[-w, 0.82], [-w / 2, 1], [w / 2, 1], [w, 0.82]].map(([d, f]) => ({ at: m(at + d), rx: r * f, ry: ry * f, bone, colour, up })) }] };
}

/** A plan from its parts: the torso's rings and the head's joined into one skin, every part's bones, lofts and cones, the gait.
 *  extra: { cones, armour }: armour is a list of plates laid on the skin (quadruped.js `armour`: from and to count the skin's
 *  rings, 0 rump tip, 1 hips, 2 loin, 3 ribs, 4 shoulders, 5 neck, 6 throat; round [a0, a1] the angle from the spine they cover). */
export function plan(name, body, skull, parts, gait, extra = {}) {
  return { name,
    bones: [...body.bones, ...skull.bones, ...parts.flatMap(p => p.bones)],
    lofts: [{ sides: 8, up: [0, 1, 0], rings: [...body.rings, ...skull.rings] }, ...(skull.lofts ?? []), ...parts.flatMap(p => p.lofts)],
    cones: [...skull.cones, ...parts.flatMap(p => p.cones), ...(extra.cones ?? [])], armour: extra.armour ?? [],
    gait: { root: "pelvis", hips: "pelvis", chest: "chest", neck: "neck", head: "head", ears: skull.ears, ...gait } };
}

/** The four legs on a torso: hind and fore each { len, thick, ... } (leg's own options), the hips and shoulders set at the
 *  heights those lengths reach from (make the torso with `stance(hind.len, fore.len)`). */
export function fourLegs(body, hind, fore = hind) {
  const out = [];
  for (const [s, tag] of [[1, "L"], [-1, "R"]]) {
    const hip = body.hip(s), sh = body.shoulder(s);
    out.push(leg("hind", tag, s, [hip[0] * (hind.spread ?? 1), 0.37 * hind.len, hip[2]], { ...hind, parent: "pelvis" }), leg("fore", tag, s, [sh[0] * (fore.spread ?? 1), 0.34 * fore.len, sh[2]], { ...fore, parent: "chest" }));
  }
  return out;
}

/** Leg timings for a gait's `legs`: a walk (left hind, left fore, right hind, right fore, a quarter apart) and a bound (the hind
 *  pair together, then the fore pair: a stoat's, a hare's, a squirrel's). k scales how far the joints swing and fold. */
const stride = (k, phases) => [["hip", "knee", "hock", 0.33, [0.5, -0.65], -0.06], ["shoulder", "elbow", "wrist", 0.34, [-0.5, 1.0], -0.16]].flatMap(([a, b, c, swing, fold, lift], n) =>
  ["L", "R"].map((tag, side) => ({ bones: [a + tag, b + tag, c + tag], phase: phases[n][side], swing: swing * k, fold: fold.map(f => f * k), lift: lift * k })));
export const walk = (k = 1) => stride(k, [[0, 0.5], [0.75, 0.25]]);
export const bound = (k = 1) => stride(k, [[0, 0.06], [0.5, 0.56]]);

/** A four-legged build in one go: o.body (the torso's options, its stance worked out from the legs), o.head, o.hind and o.fore
 *  (the legs'; fore defaults to hind), o.C its colours. Returns { body, skull, legs, root (where a tail starts), R (the skin's
 *  rings: 0 rump tip, 1 hips, 2 loin, 3 ribs, 4 shoulders, 5 neck, 6 throat), P (a point on the head) }. */
export function quad(o) {
  const hind = { colours: o.C, ...o.hind }, fore = { colours: o.C, ...(o.fore ?? o.hind) };
  const body = torso({ ...stance(hind.len, fore.len), ...o.body, colours: o.C }), skull = head(body.pivot, { ...o.head, colours: o.C });
  return { body, skull, legs: fourLegs(body, hind, fore), root: [0, body.rings[1].at[1] + 0.01, body.rings[0].at[2] + 0.03], R: body.rings, P: skull.P };
}

/** A ball on `bone` at `c`: r, colour, glow (a lit stone, a moon, a berry). */
export function ball(bone, c, o) {
  const { r = 0.04, colour, glow = false, sides = 7, squash = 1 } = o;
  return { bones: [], cones: [], lofts: [{ sides, up: [0, 0, 1], rings: [[-1, 0.12], [-0.62, 0.78], [0, 1], [0.62, 0.78], [1, 0.12]].map(([y, f]) => ({ at: [c[0], c[1] + y * r * squash, c[2]], rx: r * f, ry: r * f, bone, colour, glow, up: [0, 0, 1] })) }] };
}

/** A dome on `bone`, its rim at `c`: rx across, rz along the animal, high; a turtle's shell. colour(row, cz, sx) each facet's (row
 *  0 at the rim; cz 1 at its front, sx -1..1 across); rim: { colour, r } a lip round its edge; seams: { colour, glow, n } thin
 *  lines up it from the rim to the crown and one round it, lit if glow (the joins between its plates); glow: the whole of it lit
 *  (the light under plates laid on it as armour: its loft is named `name`, "dome"). Returns its pieces and
 *  `on(up, round)`: the point on it `up` (0 rim .. 1 crown) and `round` (radians, 0 its front), with the way out from there. */
export function dome(bone, c, o) {
  const { rx = 0.16, rz = 0.2, high = 0.12, colour, rim, seams, sides = 10, rows = 5 } = o, lat = i => (i / rows) * (Math.PI / 2) * 0.97;
  const on = (up, round) => { const f = up * (Math.PI / 2) * 0.97, x = Math.sin(round) * Math.cos(f), z = Math.cos(round) * Math.cos(f), y = Math.sin(f), n = [x / rx, y / high, z / rz], l = Math.hypot(...n) || 1; return { at: [c[0] + x * rx, c[1] + y * high, c[2] + z * rz], out: n.map(v => v / l) }; };
  const rings = Array.from({ length: rows + 1 }, (_, i) => ({ at: [c[0], c[1] + Math.sin(lat(i)) * high, c[2]], rx: rx * Math.cos(lat(i)), ry: rz * Math.cos(lat(i)), bone, up: [0, 0, 1], glow: !!o.glow, colour: (cz, sx) => colour(i, cz, sx) }));
  const lofts = [{ name: o.name ?? "dome", sides, up: [0, 0, 1], rings: [{ ...rings[0], at: [c[0], c[1] - 0.012, c[2]], rx: rx * 0.9, ry: rz * 0.9 }, ...rings] }];
  if (rim) lofts.push({ sides, up: [0, 0, 1], rings: [[-0.02, 0.96], [-0.006, 1.06], [0.01, 1.06], [0.022, 0.98]].map(([dy, f]) => ({ at: [c[0], c[1] + dy, c[2]], rx: rx * f + (rim.r ?? 0), ry: rz * f + (rim.r ?? 0), bone, up: [0, 0, 1], colour: rim.colour })) });
  if (seams) {
    const w = seams.w ?? 0.007, line = pts => ({ sides: 3, up: [0, 1, 0], rings: pts.map(p => ({ at: p.at.map((v, j) => v + p.out[j] * w * 0.6), rx: w, ry: w, bone, colour: seams.colour, glow: !!seams.glow, up: p.out })) });
    for (let k = 0; k < (seams.n ?? 6); k++) { const a = (k + 0.5) / (seams.n ?? 6) * Math.PI * 2; lofts.push(line([0.02, 0.25, 0.5, 0.72].map(u => on(u, a + (u > 0.4 ? 0.12 : 0))))); }
    lofts.push(line(Array.from({ length: 13 }, (_, i) => on(0.72, (i / 12) * Math.PI * 2)))), lofts.push(line(Array.from({ length: 13 }, (_, i) => on(0.36, (i / 12) * Math.PI * 2 + 0.26))));
  }
  return { bones: [], cones: [], lofts, on };
}
