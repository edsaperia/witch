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
 *  withers raised: an old animal's high shoulders). */
export function torso(o) {
  const { back = 0.38, len = 1, girth = 1, deep = 1, tuck = 1, neck = [0.17, 0.15], neckThick = 1, white = 0.5, hump = 0, colours } = o, g = girth, C = colours;
  const coat = lo => (C.back ? cy => (cy > 0.75 ? C.back : cy < lo ? C.belly : C.coat) : bib(C.coat, C.belly, lo));
  const z = v => v * len, at = white * 0.9 - 1.05; // (white 0: none; 1: the lower half)
  const sh = [0, back - 0.005, z(0.185)], pivot = [0, sh[1] + neck[0], sh[2] + neck[1]];
  return {
    pivot,
    bones: [["root", [0, 0, 0], null], ["pelvis", [0, back + 0.01, z(-0.26)], "root"], ["loin", [0, back + 0.02, z(-0.10)], "pelvis"], ["chest", [0, back + 0.005, z(0.08)], "loin"], ["neck", [0, sh[1] + neck[0] * 0.35, sh[2] + neck[1] * 0.45], "chest"]],
    rings: [
      { at: [0, back + 0.005, z(-0.365)], rx: 0.03 * g, ry: 0.035 * g, bone: "pelvis", colour: C.coat },
      { at: [0, back - 0.005, z(-0.275)], rx: 0.088 * g, ry: 0.1 * g, bone: "pelvis", colour: C.coat },
      { at: [0, back + 0.01 + (1 - tuck) * 0.03, z(-0.12)], rx: 0.082 * g * (0.6 + 0.4 * tuck), ry: 0.088 * g * tuck, bone: "loin", colour: coat(at - 0.3) },
      { at: [0, back - 0.01 - (deep - 1) * 0.04 + hump * 0.025, z(0.05)], rx: 0.096 * g, ry: (0.122 * deep + hump * 0.03) * g, bone: "chest", colour: coat(at - 0.1) },
      { at: [0, sh[1] - (deep - 1) * 0.04 + hump * 0.05, sh[2]], rx: 0.094 * g, ry: (0.125 * deep + hump * 0.055) * g, bone: "chest", colour: coat(at + 0.15) },
      { at: [0, sh[1] + neck[0] * 0.35, sh[2] + neck[1] * 0.5], rx: 0.068 * g * neckThick, ry: 0.09 * g * neckThick, bone: "neck", colour: bib(C.coat, C.belly, at + 0.3), up: [0, 0.8, -0.6] },
      { at: [0, sh[1] + neck[0] * 0.82, sh[2] + neck[1] * 0.92], rx: 0.06 * g * neckThick, ry: 0.07 * g * neckThick, bone: "neck", colour: bib(C.coat, C.belly, at + 0.3), up: [0, 0.75, -0.65] },
    ],
    hip: s => [0.065 * g * s, back - 0.01, z(-0.25)], shoulder: s => [0.06 * g * s, back - 0.04, z(0.175)],
  };
}

/** A leg from its top joint: "hind" (hip, knee, hock, paw: the hock high and back) or "fore" (shoulder, elbow, wrist, paw).
 *  len 1 reaches the ground from a fox's hip (0.37 up) or shoulder (0.34 up); thick fattens it. colours { upper, mid, sock }.
 *  band: { colour, at: 0..1 down the lowest long bone, r } puts a ring of beads there; knob swells the joints (an old animal's);
 *  claws: { colour, len } three long claws a paw. */
export function leg(kind, tag, s, top, o) {
  const { len = 1, thick = 1, parent, colours: C, band, knob = 1, claws } = o, k = len, t = thick * len;
  const P = (dx, dy, dz) => [top[0] + dx * k * s, top[1] + dy * k, top[2] + dz * k];
  const hind = kind === "hind", n = hind ? ["hip", "knee", "hock", "hpaw"] : ["shoulder", "elbow", "wrist", "fpaw"], b = n.map(x => x + tag);
  const J = hind ? [[0, 0, 0], [0.01, -0.145, 0.065], [0.01, -0.245, -0.065], [0.01, -0.348, -0.035]] : [[0, 0, 0], [0.005, -0.125, -0.035], [0.005, -0.255, -0.02], [0.005, -0.318, -0.015]];
  const R = hind
    ? [[-0.005, 0.02, -0.005, 0.056, 0.111, 0, "upper"], [0.005, -0.07, 0.035, 0.059, 0.098, 0, "upper"], [0.01, -0.145, 0.065, 0.039, 0.052, 0, "mid"], [0.01, -0.245, -0.065, 0.024, 0.029, 1, "sock"], [0.01, -0.34, -0.038, 0.022, 0.023, 2, "sock"], [0.01, -0.358, -0.012, 0.031, 0.016, 3, "sock", 1], [0.01, -0.36, 0.035, 0.028, 0.013, 3, "sock", 1]]
    : [[-0.002, 0.03, 0.01, 0.049, 0.085, 0, "upper"], [0.003, -0.05, -0.015, 0.05, 0.075, 0, "upper"], [0.005, -0.125, -0.035, 0.034, 0.042, 0, "mid"], [0.005, -0.255, -0.02, 0.022, 0.025, 1, "sock"], [0.005, -0.312, -0.017, 0.022, 0.022, 2, "sock"], [0.005, -0.328, 0.01, 0.031, 0.016, 3, "sock", 1], [0.005, -0.33, 0.05, 0.028, 0.013, 3, "sock", 1]];
  const out = { bones: J.map((j, i) => [b[i], P(...j), i ? b[i - 1] : parent]), lofts: [{ sides: 5, up: [0, 0, 1], rings: R.map(([dx, dy, dz, rx, ry, bone, c, flat], i) => ({ at: P(dx, dy, dz), rx: rx * t * (i === 2 || i === 3 ? knob : 1), ry: ry * t * (i === 2 || i === 3 ? knob : 1), bone: b[bone], colour: C[c], ...(flat ? { up: [0, 1, 0] } : {}) })) }], cones: [], names: b };
  if (claws) { const toe = R[6]; for (const dx of [-0.02, 0, 0.02]) out.cones.push({ at: P(toe[0] + dx, toe[1] + 0.004, toe[2] - 0.005), rx: 0.008 * t, ry: 0.008 * t, tip: P(toe[0] + dx * 1.3, toe[1] - 0.008, toe[2] + 0.03 * (claws.len ?? 1)), bone: b[3], colour: claws.colour, up: [0, 1, 0], sides: 3 }); }
  if (band) { // beads round the cannon bone, riding it
    const a = P(...J[2]), e = P(...J[3]), m = f => a.map((v, i) => v + (e[i] - v) * f), r = (band.r ?? 0.034) * t, w = 0.035;
    out.lofts.push({ sides: 6, up: [0, 0, 1], rings: [[-w, 0.6], [-w / 2, 1], [w / 2, 1], [w, 0.6]].map(([d, f]) => ({ at: m(band.at + d), rx: r * f, ry: r * f, bone: b[2], colour: band.colour })) });
  }
  return out;
}

/** The head on the skull's base `pivot`: its rings (to follow the torso's), ears, cheek tufts and eyes. size scales it all;
 *  muzzle its length; ear { tall, wide, back, tip, torn: -1|1 (that side's ear bitten short and split) }; cheek the tufts' reach
 *  (0: none); eye its size; colours { coat, belly, nose, muzzle (the muzzle's own, if grizzled), mask (the face's, brow to nose, if
 *  it wears one), eye, eyes: [left, right] (each { colour, glow }) }. */
export function head(pivot, o) {
  const { size = 1, muzzle = 1, ear = {}, cheek = 1, eye = 1, colours: C, white = 0.5 } = o, k = size, m = muzzle;
  const P = (x, y, z) => [x * k, pivot[1] + y * k, pivot[2] + z * k], at = white * 0.7 - 0.85, mz = C.muzzle ?? C.mask ?? C.coat;
  const rings = [
    { at: P(0, 0.03, 0.04), rx: 0.09 * k, ry: 0.074 * k, bone: "head", colour: bib(C.coat, C.belly, at) },
    { at: P(0, 0.025, 0.11), rx: 0.08 * k, ry: 0.066 * k, bone: "head", colour: bib(C.mask ?? C.coat, C.belly, at + 0.2) },
    { at: P(0, 0, 0.16), rx: 0.044 * k, ry: 0.044 * k, bone: "head", colour: bib(mz, C.belly, at + 0.4) },
    { at: P(0, -0.013, 0.16 + 0.065 * m), rx: 0.03 * k, ry: 0.03 * k, bone: "head", colour: bib(mz, C.belly, at + 0.55) },
    { at: P(0, -0.013, 0.16 + 0.087 * m), rx: 0.02 * k, ry: 0.02 * k, bone: "head", colour: C.nose },
    { at: P(0, -0.013, 0.16 + 0.101 * m), rx: 0.009 * k, ry: 0.009 * k, bone: "head", colour: C.nose },
  ];
  const tall = ear.tall ?? 1, wide = ear.wide ?? 1, cones = [], bones = [["head", pivot, "neck"]];
  for (const s of [1, -1]) {
    const name = s > 0 ? "earL" : "earR", base = P(0.048 * s, 0.07, 0.025), torn = ear.torn === s, h = torn ? 0.6 : 1;
    bones.push([name, base, "head"]);
    const tip = (dx, f) => P((0.048 + 0.026 * tall * f + dx) * s, 0.07 + 0.16 * tall * f, 0.025 - 0.015 * f);
    cones.push({ at: base, rx: 0.042 * k * wide, ry: 0.034 * k * wide, tip: tip(0, h), bone: name, colour: cy => (cy < 0 ? (ear.back ?? C.coat) : C.coat), tipColour: ear.tip ?? ear.back ?? C.coat, split: torn ? 0.75 : 0.62, up: [0, 0, 1] });
    if (torn) cones.push({ at: P(0.03 * s, 0.1, 0.02), rx: 0.016 * k, ry: 0.014 * k, tip: tip(-0.03, 0.72), bone: name, colour: ear.back ?? C.coat, up: [0, 0, 1] }); // (what's left of its inner edge)
    if (cheek) cones.push({ at: P(0.06 * s, -0.005, 0.065), rx: 0.04 * k, ry: 0.03 * k, tip: P((0.06 + 0.075 * cheek) * s, -0.005 - 0.035 * cheek, 0.065 - 0.065 * cheek), bone: "head", colour: C.belly, split: 0.5, up: [0, 1, 0] });
    cones.push({ at: P(0.058 * s, 0.055, 0.117), rx: 0.019 * k * eye, ry: 0.016 * k * eye, tip: P((0.058 + 0.016 * eye) * s, 0.063, 0.125), bone: "head", colour: (C.eyes?.[s > 0 ? 0 : 1]?.colour) ?? C.eye ?? C.nose, glow: !!C.eyes?.[s > 0 ? 0 : 1]?.glow, split: 0.5, up: [0, 1, 0], sides: 4 });
  }
  return { bones, rings, cones, P, ears: ["earL", "earR"] };
}

/** A tail from `root` on `parent`, along a path that starts at yaw (radians: to its left +) and pitch (up +) and turns as it
 *  goes: curl (pitch gained over its length), twist (yaw gained), wave and waves (a sway in pitch, radians and how many), phase.
 *  len, r (its fullest), colours { coat, under, tip }, tip (the share of its length in the tip's colour), blunt (how round its
 *  end: 0.05 a point), sides, bones (4; more for a long one). fire: { colour, size } a flame of that colour standing off its tip,
 *  glowing; orb: { colour, size } a ball there instead; ring: { colour, at } a band round it; spikes: { n, colour, len } tufts of
 *  fur standing off its upper edge; plume: slender from the root and full near its end, a flame's shape. */
export function tail(name, parent, root, o) {
  const { len = 0.5, r = 0.094, yaw = 0, pitch = -0.33, curl = 0, twist = 0, wave = 0, waves = 1, phase = 0, colours: C, tip = 0.2, sides = 7, blunt = 0.05, bones: nb = 4, fire, orb, ring, spikes, plume = false } = o;
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
  if (orb) { const s = orb.size ?? 1, c = end.map((v, i) => v + d1[i] * 0.05 * s); out.lofts.push({ sides: 7, up: upAt(1), rings: [[-1, 0.15], [-0.6, 0.8], [0, 1], [0.6, 0.8], [1, 0.15]].map(([z, f]) => ({ at: c.map((v, i) => v + d1[i] * z * 0.06 * s), rx: 0.06 * s * f, ry: 0.06 * s * f, bone: last, colour: orb.colour, glow: true, up: upAt(1) })) }); }
  if (ring) out.lofts.push({ sides, up: [0, 1, 0], rings: [[-0.018, 0.9], [-0.008, 1.12], [0.008, 1.12], [0.018, 0.9]].map(([dt, f]) => { const t = ring.at + dt, k = t < 0.1 ? 0.5 : t < 0.22 ? 0.8 : 0.96; return { at: at(t), rx: r * k * f, ry: r * k * f, bone: bone(t), up: upAt(t), colour: ring.colour }; }) });
  if (spikes) for (let i = 0; i < spikes.n; i++) { const t = 0.2 + (i / spikes.n) * 0.62, k = 0.85 + 0.15 * Math.sin(i * 2.3), back = dir(t).map(v => -v * 0.03); out.cones.push({ at: along(t, r * 0.75), rx: 0.03, ry: 0.022, tip: along(t - 0.05, r * 0.9 + 0.07 * (spikes.len ?? 1) * k).map((v, j) => v + back[j]), bone: bone(t), colour: C.coat, tipColour: spikes.colour ?? C.coat, split: 0.5, up: dir(t), sides: 4 }); }
  return out;
}

/** A band round a bone's line from a to b (a collar, a rope): colour, r, how far along (0..1), wide. */
export function band(bone, a, b, o) {
  const { at = 0.5, r = 0.08, wide = 0.03, colour, up = [0, 0.8, -0.6], sides = 8, ry = r } = o, L = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]) || 1;
  const m = f => a.map((v, i) => v + (b[i] - v) * f), w = wide / L;
  return { bones: [], cones: [], lofts: [{ sides, up, rings: [[-w, 0.82], [-w / 2, 1], [w / 2, 1], [w, 0.82]].map(([d, f]) => ({ at: m(at + d), rx: r * f, ry: ry * f, bone, colour, up })) }] };
}

/** A plan from its parts: the torso's rings and the head's joined into one skin, every part's bones, lofts and cones, the gait. */
export function plan(name, body, skull, parts, gait, extra = {}) {
  return { name,
    bones: [...body.bones, ...skull.bones, ...parts.flatMap(p => p.bones)],
    lofts: [{ sides: 8, up: [0, 1, 0], rings: [...body.rings, ...skull.rings] }, ...parts.flatMap(p => p.lofts)],
    cones: [...skull.cones, ...parts.flatMap(p => p.cones), ...(extra.cones ?? [])],
    gait: { root: "pelvis", hips: "pelvis", chest: "chest", neck: "neck", head: "head", ears: skull.ears, ...gait } };
}
