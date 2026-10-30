// Shared graph anatomy used by opt-in quadruped records. No species dispatch.
import { v3 } from "../model3d.js";
import { hash2, M } from "../core.js";

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

// Straight-sided ear, with a broad base and one pointed tip. Unlike the
// legacy leaf mask this cannot grow a rounded shoulder above its base.
export const triangularEarMask = (mat, inner, tip) => (s, t) => {
  const u = (t + 1) / 2, half = 1 - u;
  if (u < 0 || u > 1 || Math.abs(s) > half) return null;
  if (u > .86) return tip;
  return u > .12 && u < .8 && Math.abs(s) < half * .6 ? inner : mat;
};
// Four straight triangular faces form a pointed cup. Depth prevents a flat
// sheet from collapsing into a one-pixel spike in an edge-on camera view.
export function triangularEarFaces(base, direction, across, width, height, depth) {
  const normal = v3.norm(v3.cross(direction, across)), tip = v3.add(base, v3.mul(direction, height));
  return [[normal, depth / 2, across, width / 2], [v3.mul(normal, -1), depth / 2, across, width / 2],
    [across, width / 2, normal, depth / 2], [v3.mul(across, -1), width / 2, normal, depth / 2]].map(([axis, offset, u, su]) => {
      const edge = v3.add(base, v3.mul(axis, offset)), delta = v3.sub(tip, edge), sv = Math.hypot(...delta) / 2;
      return { c: v3.lerp(edge, tip, .5), u, v: v3.norm(delta), su, sv };
    });
}

// Ring cells follow the elliptical torso around the back and BOTH flanks.
// A whole number of circumferential cells gives the same pattern at the seam.
/** @param {{depth:number,width:number,pixelsPerUnit?:number|null}} bounds */
export function rosetteSizing(options, bounds) {
  const { depth, width } = bounds, pixelsPerUnit = bounds.pixelsPerUnit ?? null;
  if (options.outerPx !== undefined && (!Number.isFinite(options.outerPx) || options.outerPx <= 0)) throw new Error("Rosette outerPx must be positive");
  const native = options.outerPx && pixelsPerUnit > 0;
  const outer = options.outer ?? .4, k = native ? outer * 2 * pixelsPerUnit / options.outerPx : options.k ?? 6;
  return { k, around: Math.max(native ? 1 : 6, Math.round(Math.PI * (depth + width) * k)), nominalOuterPx: pixelsPerUnit > 0 ? outer * 2 / k * pixelsPerUnit : null };
}
function rosetteCell(p, options, bounds) {
  const { centreY, depth, width, bellyY, len } = bounds;
  if (p[1] < bellyY) return null;
  if (options.xRange && len && (p[0] / len < options.xRange[0] || p[0] / len > options.xRange[1])) return null;
  if (options.flankMin && Math.abs(p[2]) / width < options.flankMin) return null;
  const { k, around } = rosetteSizing(options, bounds);
  const theta = Math.atan2(p[2] / width, (p[1] - centreY) / depth);
  const u = p[0] * k, v = (theta + Math.PI) / (Math.PI * 2) * around;
  const i = Math.floor(u), j = Math.floor(v), seam = ((j % around) + around) % around;
  const cx = i + .3 + hash2(i, seam, 12) * .4, cy = j + .3 + hash2(seam, i, 13) * .4;
  let density = options.density ?? .75;
  if (options.densityFalloff !== undefined) {
    const angle = cy / around * Math.PI * 2 - Math.PI;
    density *= rosetteDensityMultiplier(options.densityFalloff, { x: cx / k / (len || 1), y: Math.cos(angle), z: Math.abs(Math.sin(angle)) });
    if (density <= 0) return null;
  }
  if (hash2(i, seam, 11) > density) return null;
  const d = Math.hypot(u - cx, v - cy), a = Math.atan2(v - cy, u - cx);
  return { d, angle: a, phase: i, seam, rotation: hash2(i, seam, 74) * Math.PI * 2 };
}
// Coordinates are evaluated at the seeded cell centre, not each paint sample:
// falloff drops whole rings rather than eroding a ring into partial speckles.
export function rosetteDensityMultiplier(falloff, coordinates) {
  const fields = Array.isArray(falloff) ? falloff : [falloff];
  let multiplier = 1;
  for (const field of fields) {
    if (!field || !["x", "y", "z"].includes(field.axis) || !Number.isFinite(field.from) || !Number.isFinite(field.to) || field.from === field.to || !Number.isFinite(field.min) || field.min < 0 || field.min > 1) throw new Error("Rosette densityFalloff needs axis x/y/z, distinct finite from/to and min in [0,1]");
    const t = Math.max(0, Math.min(1, (coordinates[field.axis] - field.from) / (field.to - field.from)));
    multiplier *= 1 + (field.min - 1) * t;
  }
  return multiplier;
}
// Keep cell position/density/rotation seeds unchanged. Variation changes the
// ring within its cell, never the cell lattice or the neighbouring identities.
export function rosetteCellVariation(options, i, seam) {
  const variation = options.sizeVariation ?? 0, fraction = options.closedFraction ?? 0, range = options.gapRange;
  const filled = options.filledFraction ?? 0;
  if (!Number.isFinite(variation) || variation < 0 || variation >= 1) throw new Error("Rosette sizeVariation must be in [0,1)");
  if (!Number.isFinite(fraction) || fraction < 0 || fraction > 1) throw new Error("Rosette closedFraction must be in [0,1]");
  if (!Number.isFinite(filled) || filled < 0 || filled > 1) throw new Error("Rosette filledFraction must be in [0,1]");
  if (range !== undefined && (!Array.isArray(range) || range.length !== 2 || !range.every(Number.isFinite) || range[0] < 0 || range[1] > Math.PI || range[0] > range[1])) throw new Error("Rosette gapRange must be ordered radians in [0,pi]");
  return {
    scale: 1 + (hash2(i, seam, 75) * 2 - 1) * variation,
    closed: fraction === 1 || hash2(i, seam, 76) < fraction,
    filled: filled === 1 || hash2(i, seam, 78) < filled,
    gap: range ? range[0] + hash2(i, seam, 77) * (range[1] - range[0]) : options.gap ?? .4,
  };
}
export function wrappedRosette(p, options, bounds) {
  const cell = rosetteCell(p, options, bounds);
  return !!cell && cell.d > (options.inner ?? .18) && cell.d < (options.outer ?? .4) && Math.sin(cell.angle * 3 + cell.phase) > -.65;
}

export function rosetteCentreMaterial(d, definition) {
  if (definition.centreDotRadius !== undefined) {
    const fraction = definition.centreDotRadius;
    if (!Number.isFinite(fraction) || fraction < 0 || fraction >= 1) throw new Error("Rosette centreDotRadius must be in [0,1)");
    if (fraction > 0 && d < (definition.inner ?? .18) * fraction) {
      const value = definition.centreDotMat ?? definition.mat ?? "BODY3", mat = typeof value === "string" ? M[value] : value;
      if (!Number.isInteger(mat) || mat <= 0 || mat >= 64) throw new Error("Rosette centreDotMat must name a material or palette index 1..63");
      return mat;
    }
  }
  return definition.centreMat ? M[definition.centreMat] ?? null : null;
}

// Null means the region's base coat. Defining a region replaces its older
// all-body pattern, so torso rings cannot leak onto a head or the lower legs.
/** @param {{centreY:number,depth:number,width:number,bellyY:number,len?:number,pixelsPerUnit?:number|null}|null} [bounds] */
export function regionMarking(p, definition, bounds = null) {
  if (!definition || definition.kind === "none") return null;
  if (definition.kind === "rosettes" && bounds) {
    const cell = rosetteCell(p, definition, bounds);
    if (!cell) return null;
    if (definition.sizeVariation !== undefined || definition.closedFraction !== undefined || definition.gapRange !== undefined || definition.filledFraction !== undefined) {
      const variation = rosetteCellVariation(definition, cell.phase, cell.seam), d = cell.d / variation.scale;
      if (variation.filled) return d < (definition.outer ?? .4) ? M[definition.mat || "BODY3"] ?? M.BODY3 : null;
      if (d <= (definition.inner ?? .18)) return rosetteCentreMaterial(d, definition);
      const outsideGap = variation.closed || Math.cos(cell.angle - cell.rotation) < Math.cos(variation.gap);
      return d < (definition.outer ?? .4) && outsideGap ? M[definition.mat || "BODY3"] ?? M.BODY3 : null;
    }
    if (cell.d <= (definition.inner ?? .18)) return rosetteCentreMaterial(cell.d, definition);
    const outsideGap = Math.cos(cell.angle - cell.rotation) < Math.cos(definition.gap ?? .4);
    return cell.d < (definition.outer ?? .4) && outsideGap ? M[definition.mat || "BODY3"] ?? M.BODY3 : null;
  }
  if (definition.kind === "spots") {
    const k = definition.k ?? 12, coordinates = p.map(v => v * k), cells = coordinates.map(Math.floor);
    if (hash2(cells[0], cells[1] + cells[2] * 31, 71) > (definition.density ?? .6)) return null;
    return Math.hypot(...coordinates.map((v, i) => v - cells[i] - .5)) < (definition.radius ?? .32) ? M[definition.mat || "BODY3"] ?? M.BODY3 : null;
  }
  return null;
}
