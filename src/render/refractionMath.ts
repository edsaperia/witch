/** Drawing-only contracts for the shared scene refraction path (Ed, 2026-10-31). */
export const REFRACTION_LIMIT = 4;
export const REFRACTION_MAX_PIXELS = 2;
/** One art-texel silhouette halo; scene sampling/upscale must not borrow across a foreground edge. */
export const REFRACTION_GUARD_RADIUS = 1;
/** The existing scene is DEPTH24_STENCIL8: conservatively cover two representable depth steps. */
export const REFRACTION_DEPTH_EPSILON = 2 / (2 ** 24 - 1);
export const PRESSURE_SECONDS = 0.65;

/** A nearer surface is never borrowed into a distortion behind it. Depth is the scene's 0..1 device depth. */
export function refractable(depth: number, effectDepth: number): boolean {
  return Number.isFinite(depth) && Number.isFinite(effectDepth) && depth >= effectDepth && depth <= 1 && effectDepth >= 0;
}

/** Clamp to texel centres, quantising displacement rather than resampling/smoothing the pixel artwork. */
export function refractedPixel(x: number, y: number, dx: number, dy: number, width: number, height: number): [number, number] {
  const bound = (v: number) => Math.round(Math.max(-REFRACTION_MAX_PIXELS, Math.min(REFRACTION_MAX_PIXELS, Number.isFinite(v) ? v : 0)));
  return [Math.max(0, Math.min(width - 1, x + bound(dx))), Math.max(0, Math.min(height - 1, y + bound(dy)))];
}

/** Compact support: no contribution outside a plume's ellipse or after a pressure wave expires. */
export function plumeMask(x: number, y: number): number { return Math.max(0, 1 - x * x - y * y) ** 2; }
export function pressureMask(distance: number, age: number): number {
  if (age < 0 || age >= PRESSURE_SECONDS || distance < 0) return 0;
  const phase = age / PRESSURE_SECONDS;
  const band = Math.max(0, 1 - Math.abs(distance - phase) / 0.12);
  return band * band * (1 - phase);
}

/** Read exact clamped depth texels, dilating the protected foreground by one art pixel. */
export function refractionDepth(p: readonly [number, number], low: readonly [number, number], depthAt: (p: readonly [number, number]) => number): number {
  const x = Math.floor(p[0] * low[0]), y = Math.floor(p[1] * low[1]);
  const uv = (cell: number, n: number) => (Math.max(0, Math.min(n - 1, cell)) + 0.5) / n;
  let depth = depthAt([uv(x, low[0]), uv(y, low[1])]);
  for (let dy = -REFRACTION_GUARD_RADIUS; dy <= REFRACTION_GUARD_RADIUS; dy++) for (let dx = -REFRACTION_GUARD_RADIUS; dx <= REFRACTION_GUARD_RADIUS; dx++) {
    if (dx || dy) depth = Math.min(depth, depthAt([uv(x + dx, low[0]), uv(y + dy, low[1])]));
  }
  return depth;
}

/** CPU reference for capture diagnostics/tests, using the same projected uniforms as the composite.
 * The supplied coordinate is the base quantized UV BEFORE potion wobble; OFF returns it exactly without reading depth. */
export function refractionCoordinate(p: readonly [number, number], low: readonly [number, number], shapes: readonly (readonly number[])[], states: readonly (readonly number[])[], count: number, depthAt: (p: readonly [number, number]) => number): readonly [number, number] {
  if (count === 0) return p;
  let depth = -1, dx = 0, dy = 0, guard = 0;
  for (let i = 0; i < Math.min(count, REFRACTION_LIMIT); i++) {
    const s = shapes[i], t = states[i];
    const x = (p[0] - s[0]) / Math.max(s[2], 1e-6), y = (p[1] - s[1]) / Math.max(s[3], 1e-6), r = Math.hypot(x, y);
    const mask = t[1] < 0.5 ? plumeMask(x, y) : pressureMask(r, t[2] * PRESSURE_SECONDS);
    if (mask <= 0) continue;
    if (depth < 0) depth = refractionDepth(p, low, depthAt);
    if (!refractable(depth, t[0]) || depth < t[0] + REFRACTION_DEPTH_EPSILON) continue;
    guard = Math.max(guard, t[0]);
    const vx = t[1] < 0.5 ? Math.sin(y * 11 - t[2] * 3) : r > 1e-5 ? x / r : 0;
    const vy = t[1] < 0.5 ? 0.25 * Math.sin(x * 9 + y * 6 - t[2] * 2) : r > 1e-5 ? y / r : 0;
    dx += vx * mask * t[3]; dy += vy * mask * t[3];
  }
  const capped = (v: number) => Math.floor(Math.max(-REFRACTION_MAX_PIXELS, Math.min(REFRACTION_MAX_PIXELS, v)) + 0.5);
  dx = capped(dx); dy = capped(dy);
  if (dx === 0 && dy === 0) return p;
  const pixel = refractedPixel(Math.floor(p[0] * low[0]), Math.floor(p[1] * low[1]), dx, dy, low[0], low[1]);
  const at: [number, number] = [(pixel[0] + 0.5) / low[0], (pixel[1] + 0.5) / low[1]];
  if (Math.abs(at[0] - p[0]) * low[0] > REFRACTION_MAX_PIXELS + 0.0001 || Math.abs(at[1] - p[1]) * low[1] > REFRACTION_MAX_PIXELS + 0.0001) return p;
  return refractionDepth(at, low, depthAt) < guard + REFRACTION_DEPTH_EPSILON ? p : at;
}

/** Consume each event object once per island, even when its queue is held through several paused frames. */
export class RefractionEvents {
  private seen = new WeakSet<object>();
  private world: object | null = null;
  private at = -Infinity;
  begin(world: object, time: number): boolean {
    const reset = world !== this.world || time < this.at;
    if (reset) this.seen = new WeakSet();
    this.world = world; this.at = time;
    return reset;
  }
  take(event: object): boolean {
    if (this.seen.has(event)) return false;
    this.seen.add(event); return true;
  }
}
