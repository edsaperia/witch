// Shared graph anatomy used by opt-in quadruped records. No species dispatch.
import { v3 } from "../model3d.js";
import { hash2 } from "../core.js";

// Preserve the current profile envelope as stations, allowing a flexible spine
// without changing the head/leg family's own part code. Profile keys are the
// existing genome stations, not a new set of species-specific proportions.
export function quadrupedTorsoGraph(loaves, len, profile, flex = 0, frame = 0) {
  const normalisedDepths = loaves.filter(([, r]) => r[1] <= 0).length;
  // Some legacy baby ratios invert a loaf's vertical radius. The graph cannot
  // contain negative radii: retain its centre, use the magnitude and flag it
  // for the family review rather than dropping the entire torso.
  const volumes = loaves.map(([c, r]) => [c, [r[0], Math.max(.04, Math.abs(r[1])), r[2]]]);
  const positions = [-.5, -.25, 0, .25, .48], keys = ["hip", "loin", "waist", "ribcage", "shoulder"];
  const at = u => {
    if (!profile) return { w: 1, d: 1 };
    if (u <= positions[0]) return profile.hip;
    if (u >= positions[4]) return profile.shoulder;
    const i = positions.findIndex((x, i) => i < 4 && u <= positions[i + 1]);
    const t = (u - positions[i]) / (positions[i + 1] - positions[i]), a = profile[keys[i]], b = profile[keys[i + 1]];
    return { w: a.w + (b.w - a.w) * t, d: a.d + (b.d - a.d) * t };
  };
  const spine = [];
  for (let index = 0; index < 19; index++) {
    const u = -.82 + index * .09, x = u * len;
    let width = 0, top = -Infinity, bottom = Infinity;
    for (const [c, r] of volumes) {
      const t = (x - c[0]) / r[0];
      if (Math.abs(t) >= 1) continue;
      const k = Math.sqrt(1 - t * t);
      width = Math.max(width, r[2] * k); top = Math.max(top, c[1] + r[1] * k); bottom = Math.min(bottom, c[1] - r[1] * k);
    }
    const p = at(u), depth = (top - bottom) * p.d;
    if (width <= 0 || depth <= 0) continue;
    const bend = flex * Math.sin(index / 18 * Math.PI) * (frame ? 1 : -1);
    const next = { id: `torso-${index}`, at: [x, top - depth / 2 + bend, 0], r: [len * .2, depth / 2, width * p.w] };
    const previous = spine.at(-1);
    if (previous) {
      const smallest = Math.min(...previous.r, ...next.r), gap = Math.hypot(...v3.sub(next.at, previous.at));
      const steps = Math.max(1, Math.ceil(gap / (smallest * 1.5)));
      for (let step = 1; step < steps; step++) spine.push({ id: `torso-${index}-join-${step}`, at: v3.lerp(previous.at, next.at, step / steps), r: previous.r.map((v, i) => v + (next.r[i] - v) * step / steps) });
    }
    spine.push(next);
  }
  return { blend: .07, spine, sockets: [], diagnostics: { normalisedDepths } };
}

// Root offsets are in head radii; angle is [pitch, outward splay] in radians.
// Mirroring is geometric, so a low ear remains low on both sides of the head.
export function quadrupedEarSocket(head, radius, side, direction, root = [0, 0, 0], angle = [0, 0]) {
  const base = [head[0] + radius * (-.15 + root[0]), head[1] + radius * (.7 + root[1]), side * radius * (.5 + root[2])];
  const [pitch, splay] = angle, [x, y, z] = direction, c = Math.cos(pitch), s = Math.sin(pitch);
  const a = [x * c - y * s, x * s + y * c, z], cs = Math.cos(splay), sn = Math.sin(splay) * side;
  return { base, direction: v3.norm([a[0], a[1] * cs - a[2] * sn, a[1] * sn + a[2] * cs]) };
}

// Ring cells follow the elliptical torso around the back and BOTH flanks.
// A whole number of circumferential cells gives the same pattern at the seam.
export function wrappedRosette(p, options, { centreY, depth, width, bellyY }) {
  if (p[1] < bellyY) return false;
  const k = options.k ?? 6, around = Math.max(6, Math.round(Math.PI * (depth + width) * k));
  const theta = Math.atan2(p[2] / width, (p[1] - centreY) / depth);
  const u = p[0] * k, v = (theta + Math.PI) / (Math.PI * 2) * around;
  const i = Math.floor(u), j = Math.floor(v), seam = ((j % around) + around) % around;
  if (hash2(i, seam, 11) > (options.density ?? .75)) return false;
  const cx = i + .3 + hash2(i, seam, 12) * .4, cy = j + .3 + hash2(seam, i, 13) * .4;
  const d = Math.hypot(u - cx, v - cy), a = Math.atan2(v - cy, u - cx);
  return d > (options.inner ?? .18) && d < (options.outer ?? .4) && Math.sin(a * 3 + i) > -.65;
}
