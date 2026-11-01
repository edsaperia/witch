import { M } from "../core.js";
import { v3 } from "../model3d.js";
import { regionMarking } from "./quadruped.js";

const material = value => {
  const mat = typeof value === "string" ? M[value] : value;
  if (!Number.isInteger(mat) || mat <= 0 || mat >= 64) throw new Error("Tail material must name a material or palette index 1..63");
  return mat;
};

// The first contiguous cone chain is the main tail. Tufts and other secondary
// primitives use its coordinates too, without changing any geometry.
export function tailPath(parts) {
  const path = []; let length = 0, previousU = null;
  for (const part of parts) {
    if (part.type !== "cone" || (path.length && Math.hypot(...v3.sub(part.a, path.at(-1).b)) > 1e-6)) break;
    const delta = v3.sub(part.b, part.a), size = Math.hypot(...delta);
    if (size < 1e-8) continue;
    const tangent = v3.mul(delta, 1 / size), seed = Math.abs(tangent[1]) < .9 ? [0, 1, 0] : [1, 0, 0];
    let u = previousU ? v3.sub(previousU, v3.mul(tangent, v3.dot(previousU, tangent))) : v3.cross(tangent, seed);
    if (Math.hypot(...u) < 1e-6) u = v3.cross(tangent, seed);
    u = v3.norm(u); previousU = u;
    path.push({ a: part.a, b: part.b, tangent, u, v: v3.cross(tangent, u), start: length, length: size, r1: part.r1, r2: part.r2 });
    length += size;
  }
  return { segments: path, length };
}

export function tailCoordinates(p, path) {
  let best = null, nearest = Infinity;
  for (const segment of path.segments) {
    const along = Math.max(0, Math.min(segment.length, v3.dot(v3.sub(p, segment.a), segment.tangent)));
    const delta = v3.sub(p, v3.add(segment.a, v3.mul(segment.tangent, along))), distance = v3.dot(delta, delta);
    if (distance >= nearest) continue;
    nearest = distance;
    best = { distance: segment.start + along, t: (segment.start + along) / path.length,
      radius: segment.r1 + (segment.r2 - segment.r1) * along / segment.length,
      y: v3.dot(delta, segment.u), z: v3.dot(delta, segment.v) };
  }
  return best;
}

/** @param {()=>number|null} [pixelsPerUnit] */
export function paintTailParts(parts, definition, pixelsPerUnit = () => null) {
  if (!definition) return null;
  const kind = definition.kind ?? "none", path = tailPath(parts);
  if (!["none", "rings", "spots", "rosettes"].includes(kind)) throw new Error("Tail marking kind must be none/rings/spots/rosettes");
  const count = definition.count ?? 6, width = definition.width ?? .35;
  if (kind === "rings" && (!Number.isInteger(count) || count <= 0 || !Number.isFinite(width) || width < 0 || width > 1)) throw new Error("Tail rings need a positive count and width in [0,1]");
  const ringMat = kind === "rings" ? material(definition.mat ?? "BODY3") : null;
  const tip = definition.tip;
  if (tip && (!Number.isFinite(tip.length) || tip.length < 0 || tip.length > 1)) throw new Error("Tail tip length must be in [0,1]");
  const tipMat = tip ? material(tip.mat ?? "BODY3") : null;
  if (!path.length) throw new Error("Tail markings require a main cone chain");
  const paint = p => {
    const coordinate = tailCoordinates(p, path);
    if (!coordinate) return null;
    if (tip?.length > 0 && coordinate.t >= 1 - tip.length) return tipMat;
    if (kind === "rings") return (coordinate.t * count) % 1 < width ? ringMat : null;
    if (kind === "none") return null;
    const radius = Math.max(.001, coordinate.radius);
    return regionMarking([coordinate.distance, coordinate.y, coordinate.z], definition,
      { centreY: 0, depth: radius, width: radius, bellyY: -Infinity, len: path.length, pixelsPerUnit: pixelsPerUnit() });
  };
  for (const part of parts) part.paint = paint;
  return { path, paint };
}
