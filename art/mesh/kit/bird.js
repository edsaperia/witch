// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. Added with the winged kinds (docs/plans/creature-mesh-rollout.md, batch F).
import { birdlegs, twoLegs } from "./birdleg.js";
import { featherwing, turnOf } from "./featherwing.js";

const T = Math.PI * 2;

/** A whole bird as a plan: a body carried at a slope (`tilt`: a raven's leans, an owl's and a penguin's stand up) on two legs
 *  (kit/birdleg.js), a neck (two bones if it has an S in it, `neck.s`: a heron's), a head with a beak and eyes, a fan of tail
 *  feathers, and two wings shut along its sides (kit/featherwing.js; `wings` hands it other ones, a penguin's flippers).
 *  How it goes: on the ground it walks or hops on feet that plant (`walk`: a pace's numbers over the ones here, its `type`
 *  "walk" or "bound"); going fast it takes off (`fly`: the fast pace has no legs, so art/mesh/shape.js flies it, `aloft` higher
 *  than it stands: its body levelled, its neck out, its legs trailed, its wings opened and beating) or, with `run`, keeps
 *  to its feet (a penguin). Its gait's own `legs` is empty, as the paces differ: each pace says its own.
 *  Asleep it roosts (gait.sleep "roost", its own pose: Ed, 2026-11-12, asks a curl of the kinds that can; a bird can't): down
 *  on its folded legs, its head turned back and its bill laid in the feathers of its back (`roost` changes it).
 *  o: hip (how high its hips are: its legs' length), len (its body's), fat, seat (where along its body its hips are, -0.5 its
 *  rump to 0.5 its breast), C { back, belly, head, wing, flight, wingTip, under, tail }, white (how far up its sides its belly's
 *  colour comes, -1..1), neck { rise (radians from level), len, r, s }, head { r, wide, tall, nod, colour, face }, beak { len,
 *  wide, deep, droop, colour, tip, bulge, hook }, eye { r, at, look, colour, glow, ring }, tail { n, len, wide, pitch, fan,
 *  colour, tip, lit }, wing (featherwing's), leg (birdleg's, and out: how far apart), more: ({ B, Hp, f, hr, rings, wings,
 *  legs }) => { lofts, cones, armour } (what else it wears: B a point in its body's own measure, Hp in its head's). */
export function bird(name, o) {
  const { hip = 0.3, tilt = 0.5, len = 0.6, fat = 1, seat = -0.1, C, white = -0.2, neck: N = {}, head: Hd = {}, beak: Bk = {}, eye: Ey = {}, tail: Tl = {}, wing: Wg = {}, leg: Lg = {}, fly: Fl = {}, walk: Wk = {}, roost: Rs = {}, lively = 1 } = o;
  const ct = Math.cos(tilt), st = Math.sin(tilt), f = 0.3 * len * fat, B = (x, y, z) => [x, hip + y * ct + z * st, -y * st + z * ct], Z = z => (z - seat) * len, dorsal = [0, ct, -st];
  const coat = lo => (C.belly ? cy => (cy < lo ? C.belly : C.back) : C.back);
  const rings = [[-0.52, 0.1, 0.14, 0.14, "pelvis", C.back], [-0.34, 0.03, 0.62, 0.6, "pelvis", coat(white - 0.45)], [-0.08, -0.02, 0.95, 0.98, "pelvis", coat(white)], [0.16, 0, 1, 1.02, "chest", coat(white + 0.1)], [0.36, 0.06, 0.76, 0.78, "chest", coat(white + 0.2)]]
    .map(([z, y, rx, ry, bone, colour]) => ({ at: B(0, y * f, Z(z)), rx: rx * f, ry: ry * f, bone, colour, up: dorsal }));
  // the neck: from the top of its breast, up at `rise`; with an S in it, its lower half leant back and its upper forward
  const rise = N.rise ?? tilt + 0.5, nl = N.len ?? 0.22 * len, nr = N.r ?? 0.42 * f, two = !!N.s, nd = a => [0, Math.sin(a), Math.cos(a)], nu = a => [0, Math.cos(a), -Math.sin(a)], step = (p, a, l) => p.map((v, i) => v + nd(a)[i] * l);
  const P0 = B(0, 0.2 * f, Z(0.46)), P1 = step(P0, rise + (N.s ?? 0), nl / 2), P2 = step(P1, rise - (N.s ?? 0), nl / 2), throat = N.colour ?? coat(white + 0.25);
  rings.push({ at: P0, rx: nr * 1.3, ry: nr * 1.35, bone: "neck", colour: throat, up: nu(rise + (N.s ?? 0)) }, { at: P1, rx: nr * 1.05, ry: nr * 1.05, bone: two ? "neck2" : "neck", colour: throat, up: nu(rise) }, { at: P2, rx: nr, ry: nr, bone: two ? "neck2" : "neck", colour: throat, up: nu(rise - (N.s ?? 0)) });
  // the head, on the neck's top: its rings forward from there, a beak, two eyes
  const hr = Hd.r ?? 0.6 * f, wide = Hd.wide ?? 1, nod = Hd.nod ?? 0.1, fw = [0, -Math.sin(nod), Math.cos(nod)], uh = [0, Math.cos(nod), Math.sin(nod)], Hp = (x, y, z) => [x * hr, P2[1] + (y * uh[1] + z * fw[1]) * hr, P2[2] + (y * uh[2] + z * fw[2]) * hr];
  const hc = Hd.colour ?? C.head ?? coat(white + 0.3);
  rings.push(...[[0.3, -0.4, 0.72, 0.72, hc], [0.38, 0.2, wide, Hd.tall ?? 1, hc], [0.3, 0.82, 0.74 * wide, 0.72, Hd.face ?? hc], [0.12, 1.18, 0.3, 0.3, Hd.face ?? hc]].map(([y, z, rx, ry, colour]) => ({ at: Hp(0, y, z), rx: rx * hr, ry: ry * hr, bone: "head", colour, up: uh })));
  const cones = [], lofts = [], bl = (Bk.len ?? 1) * hr;
  cones.push({ at: Hp(0, 0.1, 1.1), rx: (Bk.wide ?? 0.28) * hr, ry: (Bk.deep ?? 0.26) * hr, tip: Hp(0, 0.1 - (Bk.droop ?? 0.15) * bl / hr, 1.1 + bl / hr), bone: "head", colour: Bk.colour ?? "#2a2420", tipColour: Bk.tip ?? Bk.colour ?? "#2a2420", split: Bk.split ?? 0.5, ...(Bk.bulge ? { bulge: Bk.bulge } : {}), ...(Bk.hook ? { bend: [0, Bk.hook * bl, 0] } : {}), glow: Bk.glow ?? false, up: uh, sides: 5 });
  const er = (Ey.r ?? 0.2) * hr, ea = Ey.at ?? [0.82 * wide, 0.45, 0.5], look = Ey.look ?? [1, 0.1, 0.25];
  for (const s of [1, -1]) { const at = Hp(s * ea[0], ea[1], ea[2]), out = k => at.map((v, i) => v + [s * look[0], look[1], look[2]][i] * er * k);
    if (Ey.ring) cones.push({ at, rx: er * 1.55, ry: er * 1.55, tip: out(0.3), bone: "head", colour: Ey.ring, split: 0.5, up: uh, sides: 6 });
    cones.push({ at: out(0.12), rx: er, ry: er, tip: out(0.7), bone: "head", colour: Ey.colours?.[s > 0 ? 0 : 1] ?? Ey.colour ?? "#0c0a09", glow: !!Ey.glow, tag: "eye", split: 0.5, up: uh, sides: 5 }); }
  // the tail: a fan of feathers off its rump, along its body's own line
  const Tb = B(0, 0.08 * f, Z(-0.5)), tn = Tl.n ?? 5, tl = Tl.len ?? 0.32 * len, tw = Tl.wide ?? 0.07 * len, tp = Tl.pitch ?? 0;
  for (let j = 0; j < tn; j++) { const a = (Tl.fan ?? 0.45) * (tn > 1 ? j / (tn - 1) * 2 - 1 : 0), dy = Math.sin(tp) * Math.cos(a), dz = -Math.cos(a) * Math.cos(tp), d = [Math.sin(a), dy * ct + dz * st, -dy * st + dz * ct], L = tl * (1 - 0.18 * Math.abs(a));
    cones.push({ at: [Tb[0] + Math.sin(a) * tw * 0.6, Tb[1] + (j % 2 ? 0.004 : 0), Tb[2]], rx: tw * 0.55, ry: 0.006, tip: Tb.map((v, i) => v + d[i] * L), bone: "tail1", colour: Tl.colour ?? C.tail ?? C.back, tipColour: Tl.tip ?? Tl.colour ?? C.tail ?? C.back, glow: Tl.lit ? "tip" : false, split: 0.62, bulge: 0.92, up: dorsal, sides: 4 }); }
  const bones = [["root", [0, 0, 0], null], ["pelvis", [0, hip, 0], "root"], ["chest", B(0, 0, Z(0.2)), "pelvis"], ["neck", P0, "chest"], ...(two ? [["neck2", P1, "neck"]] : []), ["head", P2, two ? "neck2" : "neck"], ["tail1", Tb, "pelvis"]];
  const legs = birdlegs({ len: hip, colours: { thigh: C.thigh ?? C.belly ?? C.back, shank: C.shank ?? "#2a2420", toe: C.toe, claw: C.claw }, ...Lg }, Lg.out ?? 0.45 * f, Lg.z ?? 0);
  const wings = o.wings?.({ B, Z, f }) ?? [[1, "L"], [-1, "R"]].map(([s, tag]) => featherwing(tag, s, B(s * (Wg.out ?? 0.9) * f, (Wg.up ?? 0.12) * f, Z(Wg.z ?? 0.3)), { span: 1.2 * len, chord: 0.42 * len, tilt, colours: { coat: C.wing ?? C.back, flight: C.flight ?? C.wing ?? C.back, tip: C.wingTip, under: C.under }, ...Wg }));
  const parts = [...legs, ...wings], more = o.more?.({ B, Z, Hp, f, hr, rings, wings, legs, tall: P2[1] + hr }) ?? {};
  // ---- how it goes
  const body = { bob: 0.03, pitch: 0.02, roll: 0.03, sway: 0.03, yaw: 0.05, head: 0.9, tail: 0.5, lag: 0.09, wag: 0.04 }, hops = Wk.type === "bound";
  const pace = (P, base) => ({ ...base, ...P, body: { ...body, ...base.body, ...P.body } });
  const walk = pace(Wk, hops ? { type: "bound", seconds: 0.6, duty: 0.5, reach: 0.6, step: 0.2, leap: 0.25, legs: twoLegs(0, 0.06), heel: [-0.2, 0.4, 0.3], toe: 0.5, body: { bob: 0.04, pitch: 0.05, roll: 0, sway: 0, yaw: 0.01 } }
    // (a walking bird's head: thrust forward and held, twice a cycle)
    : { type: "walk", seconds: 0.9, duty: 0.62, reach: 0.5, step: 0.2, legs: twoLegs(0, 0.5), heel: [-0.2, 0.4, 0.3], toe: 0.5, extra: [{ bone: "head", pos: u => [0, 0, (Wk.thrust ?? 0.12) * hr * Math.sin(2 * T * u + 0.5)] }] });
  let run;
  if (o.run) run = pace(o.run, walk);
  else { const level = tilt - (Fl.tilt ?? 0.1), K = turnOf(level, 0, 0), trail = Fl.trail ?? 1.3 - level;
    run = { type: "fly", seconds: Fl.seconds ?? 0.55, legs: [], hips: undefined, chest: undefined, neck: undefined, head: undefined, tails: [], bob: Fl.bob ?? 0.012, bobs: 1, aloft: Fl.aloft ?? Math.max(f * 1.05 + 0.02, 0.26 * (Wg.span ?? 1.2 * len)) + (0.02 + (Fl.rise ?? 0)) * len - hip, stride: Fl.stride ?? 1.7 * len, extra: [
      { bone: "pelvis", rot: () => [level, 0, 0] }, { bone: "neck", rot: () => Fl.neck ?? [-level * 0.35, 0, 0] }, ...(two ? [{ bone: "neck2", rot: () => Fl.neck2 ?? [0, 0, 0] }] : []), { bone: "head", rot: u => { const h = Fl.head ?? [-level * 0.65, 0, 0]; return [h[0] + 0.03 * Math.sin(T * u), h[1], h[2]]; } },
      ...legs.flatMap(l => [{ bone: l.names[0], rot: () => [trail, 0, 0] }, { bone: l.names[1], rot: () => [Fl.knee ?? -0.4, 0, 0] }, { bone: l.names[2], rot: () => [Fl.hock ?? 0.5, 0, 0] }]),
      ...wings.flatMap(w => w.fly?.({ K, ...Fl.beat }) ?? []), { bone: "tail1", rot: u => [(Fl.tail ?? 0) + 0.06 * Math.sin(T * u + 1), 0, 0] }, ...(Fl.extra ?? [])] }; }
  const nap = ({ rots, poss }) => { rots.pelvis = [Rs.lean ?? tilt * 0.3, 0, 0]; const [a, b, c] = Rs.legs ?? [-1.1, 2.2, -1.2];
    for (const l of legs) { rots[l.names[0]] = [a, 0, 0]; rots[l.names[1]] = [b, 0, 0]; rots[l.names[2]] = [c, 0, 0]; }
    rots.neck = Rs.neck ?? [0.2, 0, 0]; if (two) rots.neck2 = Rs.neck2 ?? [0, 0, 0]; rots.head = Rs.head ?? [0.3, 2.4, 0.3]; rots.tail1 = Rs.tail ?? [0, 0, 0]; Rs.more?.(rots, poss); };
  return { name, bones: [...bones, ...parts.flatMap(p => p.bones), ...(more.bones ?? [])], lofts: [{ sides: 8, up: [0, 1, 0], rings }, ...lofts, ...parts.flatMap(p => p.lofts), ...(more.lofts ?? [])], cones: [...cones, ...parts.flatMap(p => p.cones), ...(more.cones ?? [])], armour: more.armour ?? [],
    gait: { type: walk.type, seconds: walk.seconds, root: "pelvis", hips: "pelvis", chest: "chest", neck: "neck", head: "head", legs: [], tails: [["tail1"]], lively, sleep: "roost", nap, paces: { walk, run } },
    anchors: { neck: 5, skull: 8 } };
}
