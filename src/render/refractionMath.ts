/** Drawing-only contracts for the shared scene refraction path (Ed, 2026-10-31). */
export const REFRACTION_LIMIT = 4;
export const REFRACTION_MAX_PIXELS = 2;
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
