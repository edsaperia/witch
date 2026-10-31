// Shared curved mandible part. Geometry controls are data, not species cases.
import { v3 } from "../model3d.js";

export function mandiblePart(head, side, nominalLength, options, facing) {
  const length = options.length ?? 1, width = options.width ?? 1, curve = options.curve ?? .5, lift = options.awayTipLift ?? .16;
  if (![length, width, curve, lift].every(Number.isFinite) || length <= 0 || width <= 0 || curve < 0 || curve > 1 || lift < 0) throw new Error("Invalid mandible dimensions");
  const L = nominalLength * length, root = v3.add(head, [.08, .02, side * .1]);
  const middle = v3.add(root, [L * .62, L * .5, side * L * .22]);
  const tip = [root[0] + L * .95, root[1] + L * (.2 + (facing === "away" ? lift : 0)), side * Math.max(.012, .1 - L * curve * .3)];
  const radius = Math.min(.045 * width, L * .22), points = [];
  for (let k = 0; k <= 7; k++) {
    const t = k / 7, a = v3.lerp(root, middle, t), b = v3.lerp(middle, tip, t);
    points.push([...v3.lerp(a, b, t), radius * (1 - .78 * t)]);
  }
  const count = options.teeth ?? 1, teeth = [];
  if (!Number.isInteger(count) || count < 1 || count > 2) throw new Error("Mandibles require one or two teeth");
  for (let k = 0; k < count; k++) {
    const p = points[count === 1 ? 3 : 2 + k * 2].slice(0, 3);
    teeth.push({ start: p, end: v3.add(p, [L * .02, L * .07, -side * L * .12]), radius: Math.min(.018 * width, L * .04) });
  }
  return { points, teeth, tip };
}
