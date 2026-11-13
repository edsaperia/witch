// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Added with the cold-blooded kinds (docs/plans/creature-mesh-rollout.md, batch E: "a
// legless body that slithers"). Metres; y up; its head along +z.

const TAU = Math.PI * 2, ease = v => { const k = Math.min(1, Math.max(0, v)); return k * k * (3 - 2 * k); };

/** A whole plan for a snake: one tube from tail tip to nose, lying on the ground in the curves of its slither, its forepart
 *  reared (and its tail's end raised, if it carries a rattle), each ring of it on a bone of its own.
 *
 *  How it goes (gait.type "glide"): the curves are a wave that stands still on the ground while the snake goes forward through
 *  it. In the clip, where the ground passes back one `stride` a cycle, that is the wave running back along the body one
 *  wavelength a cycle, and its stride is that wavelength: so every part of it follows the part ahead along one track and none of
 *  it slides sideways over the ground (art/mesh/stride.js steps it a whole frame at a time, as it does a walker). Its reared
 *  forepart sways less, its head least.
 *
 *  o: len (tail tip to neck), r (its thickest), n (rings), rear: { share (of its length that is reared), up (how steeply,
 *  radians) }, lift: { share, up } the same for its tail's end, wave: { amp (a share of len), long (a wavelength, a share of
 *  len) }, seconds, skin(t, i) a ring's colour (t 0 at the tail's tip, 1 at the neck; it may be a ring's (cy, sx) => colour),
 *  girth(t) => [wide, deep] more over its section there (a hood), head: { len, wide, deep, nod, eye, colour(k) its rings', eyes:
 *  { colour, glow }, tongue, horns: { colour, len } }, rattle: { n, r, colour, tip }, armour (kit/plan.js's, its from and to
 *  given as t), cones(S) more pieces, S: { at(t): a ring's { at, rx, ry, bone }, P(x, y, z): a point on its head, in head
 *  lengths across, up and along }. */
export function serpent(name, o) {
  const { len = 1.6, r = 0.05, n = 22, rear = {}, lift = null, wave = {}, seconds = 1.5, skin, girth, head: H = {}, rattle, armour = [], cones: more } = o;
  const share = rear.share ?? 0.3, up = rear.up ?? 1.25, t0 = 1 - share, A = (wave.amp ?? 0.06) * len, long = (wave.long ?? 0.5) * len, K = TAU / long, ph = wave.phase ?? 2.7;
  const pitch = t => (t > t0 ? up * Math.sin(Math.PI * (t - t0) / share) : lift && t < lift.share ? -lift.up * (1 - t / lift.share) : 0);
  const fat = t => r * Math.min(1, 0.14 + 0.86 * Math.pow(Math.min(1, t / 0.42), 0.75)) * (1 - 0.28 * ease((t - 0.82) / 0.18));
  const env = t => (t > t0 ? 1 - 0.85 * ease((t - t0) / share) : 1); // (how much of the wave a part of it takes: its reared neck less, its head least)
  // the path, tail tip to neck: walked in small steps so its turns are smooth
  const M = 200, path = [[0, 0]]; for (let i = 0; i < M; i++) { const th = pitch((i + 0.5) / M), p = path[i]; path.push([p[0] + Math.sin(th) * len / M, p[1] + Math.cos(th) * len / M]); }
  const yg = path[Math.round(M * (lift ? lift.share + (t0 - lift.share) / 2 : t0 / 2))][0], zm = (path[0][1] + path[M][1]) / 2;
  const on = t => { const f = Math.min(M - 1e-6, Math.max(0, t * M)), i = Math.floor(f), k = f - i; return [path[i][0] + (path[i + 1][0] - path[i][0]) * k - yg, path[i][1] + (path[i + 1][1] - path[i][1]) * k - zm]; };
  const x0 = (z, a, u = 0) => a * Math.sin(K * z + ph + TAU * u), yaw = (z, a, u = 0) => Math.atan(a * K * Math.cos(K * z + ph + TAU * u));
  const spine = Array.from({ length: n }, (_, i) => { const t = i / (n - 1), [y, z] = on(t), a = A * env(t), [gw, gd] = girth?.(t) ?? [1, 1], f = fat(t); return { bone: `spine${i}`, t, a, z, at: [x0(z, a), y + f * gd, z], rx: f * 1.08 * gw, ry: f * gd, pitch: pitch(t), yaw: yaw(z, a) }; });
  // its head: on from the neck, level and a little nose-down; wide behind the eyes, a blunt snout
  const neck = spine[n - 1], hl = (H.len ?? 3.4) * r, hw = (H.wide ?? 1.3) * r, hd = (H.deep ?? 0.85) * r, nod = H.nod ?? 0.12, ha = A * env(1), hz = neck.z + hl * 0.1, base = [x0(hz, ha), neck.at[1], hz];
  const P = (x, y, z) => [base[0] + x * hl, base[1] + y * hl - Math.sin(nod) * z * hl, base[2] + Math.cos(nod) * z * hl], hc = H.colour ?? (() => skin(1, n));
  const skull = [[0.2, 0.86, 0.95], [0.42, 1, 1], [0.62, 0.9, 0.86], [0.84, 0.62, 0.6], [1, 0.3, 0.3]].map(([z, w, d], k) => ({ at: P(0, 0, z), rx: hw * w, ry: hd * d, bone: "head", colour: hc(k) }));
  const eyes = H.eyes ?? {}, es = (H.eye ?? 1) * hw * 0.2, cones = [];
  for (const s of [1, -1]) {
    const e = P(s * hw * 0.82 / hl, hd * 0.5 / hl, 0.56);
    cones.push({ at: e, rx: es, ry: es * 0.85, tip: [e[0] + s * es * 0.8, e[1] + es * 0.4, e[2] + es * 0.3], bone: "head", colour: eyes.colour ?? "#17120f", glow: !!eyes.glow, tag: "eye", split: 0.5, up: [0, 1, 0], sides: 4 });
    if (H.tongue) cones.push({ at: P(0, -hd * 0.1 / hl, 1), rx: 0.1 * hw, ry: 0.05 * hw, tip: P(s * 0.12, -0.12, 1.42), bone: "head", colour: H.tongue, up: [0, 1, 0], sides: 3 });
    if (H.horns) cones.push({ at: P(s * hw * 0.6 / hl, hd * 0.8 / hl, 0.52), rx: 0.3 * hw, ry: 0.22 * hw, tip: P(s * (hw * 0.9 / hl + 0.12 * (H.horns.len ?? 1)), hd / hl + 0.3 * (H.horns.len ?? 1), 0.3), bone: "head", colour: H.horns.colour, tipColour: H.horns.tip ?? H.horns.colour, split: 0.5, up: [0, 0, 1], sides: 4 });
  }
  const bones = [["root", [0, 0, 0], null], ...spine.map(p => [p.bone, p.at, "root"]), ["head", base, "root"]], lofts = [{ sides: 8, up: [0, 1, 0], rings: [...spine.map((p, i) => ({ at: p.at, rx: p.rx, ry: p.ry, bone: p.bone, colour: skin(p.t, i) })), ...skull] }];
  // what moves: every ring's bone goes across with the wave and turns to face along it; counted from where it lies at rest
  const moved = [...spine.map(p => ({ bone: p.bone, z: p.z, a: p.a, x: p.at[0] })), { bone: "head", z: hz, a: ha, x: base[0] }];
  const extra = moved.flatMap(m => [{ bone: m.bone, pos: u => [x0(m.z, m.a, u) - m.x, 0, 0], rot: u => [0, yaw(m.z, m.a, u) - yaw(m.z, m.a), 0] }]);
  if (rattle) { // beads on the end of its tail, standing on from it the way it points, shaken
    const tip = spine[0].at, d = [0, Math.sin(-pitch(0)), -Math.cos(pitch(0))], rr = rattle.r ?? r * 0.42, bl = rr * 1.25, rings = [];
    for (let j = 0; j < rattle.n; j++) { const k = 1 - 0.45 * j / Math.max(1, rattle.n), c = f => tip.map((v, i) => v + d[i] * bl * (j + f)), colour = j === rattle.n - 1 ? rattle.tip ?? rattle.colour : rattle.colour; rings.push({ at: c(0.12), rx: rr * 0.55 * k, ry: rr * 0.55 * k, bone: "tailrattle", colour }, { at: c(0.5), rx: rr * k, ry: rr * k, bone: "tailrattle", colour }, { at: c(0.88), rx: rr * 0.55 * k, ry: rr * 0.55 * k, bone: "tailrattle", colour }); }
    bones.push(["tailrattle", tip, "spine0"]); lofts.push({ sides: 6, up: [0, 0, 1], rings }); extra.push({ bone: "tailrattle", rot: u => [0.22 * Math.sin(TAU * 3 * u), 0.3 * Math.sin(TAU * 3 * u + 1.2), 0] });
  }
  const S = { at: t => spine[Math.round(Math.min(1, Math.max(0, t)) * (n - 1))], P, spine };
  return { name, bones, lofts, cones: [...cones, ...(more?.(S) ?? [])], armour: armour.map(a => ({ ...a, from: a.from * (n - 1), to: a.to * (n - 1) })), anchors: { neck: n - 2, skull: n },
    gait: { type: "glide", seconds, root: "root", bob: 0, legs: [], head: "head", stride: long, sleep: "coil", nap: coil, extra, serpent: { spine, len, r, head: { bone: "head", at: base, hl } } } };
}

/** Asleep (a gait's `nap`, which art/mesh/gear.js `napping` calls): a snake can't curl nose to tail as a dog does, it coils
 *  (docs/plans/creature-mesh-rollout.md: "a snake coils"): its tail outermost on the ground, each turn inside the last, the
 *  last of it laid over the middle with its head resting on top. Every bone is put on that spiral and turned to face along it. */
export function coil({ plan, rots, poss }) {
  const { spine, len, r, head } = plan.gait.serpent, gap = 1.9 * r, least = 1.5 * r, R0 = Math.sqrt(len * gap / Math.PI + least * least) * 0.88;
  let phi = 0, rho = R0, high = 0, was = 0;
  const put = (bone, at, s, fat, pitch, turned) => { const ds = s - was; was = s;
    for (let k = 0, n = 12; k < n; k++) { const d = ds / n; if (rho > least) { phi += d / rho; rho -= gap * (d / rho) / TAU; } else { phi += d / least; high += 1.6 * r * (d / least) / TAU; } }
    poss[bone] = [rho * Math.cos(phi) - at[0], fat + high - at[1], rho * Math.sin(phi) - at[2]]; rots[bone] = [pitch, -phi - turned, 0]; };
  spine.forEach(p => put(p.bone, p.at, p.t * len, p.ry, p.pitch, p.yaw));
  put(head.bone, head.at, len + head.hl * 0.1, spine[spine.length - 1].ry, 0, 0);
}
