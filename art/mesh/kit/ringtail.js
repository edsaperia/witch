// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. The shapes start from a red fox's, measured; a species bends them to its own animal.

/** A thick tail ringed dark and light along its length (a raccoon's, a red panda's), on the same path as kit/tail.js: from `root`
 *  on `parent`, starting at yaw and pitch and turning by curl, swaying by wave. len, r (its fullest), bands (how many dark rings),
 *  share (how much of each ring's stretch is dark), tip (the share of its length in the tip's colour), blunt (how round its end),
 *  colours { coat, ring, tip }, sides, bones. */
export function ringtail(name, parent, root, o) {
  const { len = 0.5, r = 0.09, yaw = 0, pitch = -0.33, curl = 0, wave = 0, waves = 1, phase = 0, bands = 4, share = 0.45, tip = 0.14, blunt = 0.35, sides = 7, bones: nb = 4, colours: C } = o;
  const N = 24, pts = [[...root]], dirs = [];
  for (let i = 0; i < N; i++) { const t = (i + 0.5) / N, p = pitch + curl * t + wave * Math.sin(Math.PI * 2 * waves * t + phase), d = [Math.sin(yaw) * Math.cos(p), Math.sin(p), -Math.cos(yaw) * Math.cos(p)]; dirs.push(d); pts.push(pts[i].map((v, k) => v + d[k] * len / N)); }
  const at = t => { const f = Math.min(N - 1e-6, Math.max(0, t * N)), i = Math.floor(f), u = f - i; return pts[i].map((v, k) => v + (pts[i + 1][k] - v) * u); }, dir = t => dirs[Math.min(N - 1, Math.max(0, Math.floor(t * N)))];
  const upAt = t => { const d = dir(t), w = Math.abs(d[1]) > 0.9 ? [0, 0, 1] : [0, 1, 0], k = w[0] * d[0] + w[1] * d[1] + w[2] * d[2], u = w.map((v, i) => v - d[i] * k), l = Math.hypot(...u) || 1; return u.map(v => v / l); };
  const bt = Array.from({ length: nb }, (_, i) => 0.04 + (i / nb) * 0.95), bones = bt.map((t, i) => [`${name}${i + 1}`, at(t), i ? `${name}${i}` : parent]);
  const bone = t => { let b = parent; for (let i = 0; i < nb; i++) if (t >= bt[i] + 0.5 * (0.95 / nb)) b = `${name}${i + 1}`; return b; };
  // (how full it is along its length: a tube that fills quickly from the root and ends round)
  const prof = [[0, 0.4], [0.1, 0.7], [0.25, 0.95], [0.5, 1], [0.8, 0.94], [0.92, 0.72], [1, blunt]];
  const fat = t => { let i = 0; while (i + 2 < prof.length && prof[i + 1][0] < t) i++; const [t0, f0] = prof[i], [t1, f1] = prof[i + 1]; return f0 + (f1 - f0) * Math.min(1, Math.max(0, (t - t0) / (t1 - t0))); };
  // (its rings: from a little way down it to where its tip's colour starts, each stretch light then dark)
  const a = 0.1, b = 1 - tip, w = (b - a) / bands, colour = t => (t >= b ? C.tip : t < a ? C.coat : ((t - a) / w) % 1 >= 1 - share ? C.ring : C.coat), e = 0.004;
  const ts = new Set(prof.map(p => p[0])); for (let i = 0; i < bands; i++) for (const x of [a + w * (i + 1 - share), a + w * (i + 1)]) { ts.add(x - e); ts.add(x + e); }
  const rings = [...ts].filter(t => t >= 0 && t <= 1).sort((x, y) => x - y).map(t => ({ at: at(t), rx: r * fat(t), ry: r * fat(t) * 1.03, bone: bone(t), up: upAt(t), colour: colour(t) }));
  return { bones, cones: [], chain: bones.map(x => x[0]), lofts: [{ sides, up: [0, 1, 0], rings }] };
}
