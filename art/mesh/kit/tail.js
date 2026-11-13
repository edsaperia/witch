// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. The shapes start from a red fox's, measured; a species bends them to its own animal.
import { bib } from "./bib.js";

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
