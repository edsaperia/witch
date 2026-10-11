// Choosing an island on the sea chart without a pointer (Ed, 2026-10-11: "your view moves around as you select islands"): an
// arrow key, the d-pad or the stick steps to the nearest island that way from the one chosen (north up the screen), as on a
// map; the camera follows (render/chart/seaChart.ts).

export interface NavPoint { id: string; x: number; y: number }

/** The island to step to from `from` in direction (dx, dy) (x east, y south: up the screen is (0, -1)): of those within 60
 *  degrees of that way, the nearest, a sideways one counting as further; null if none lies that way. */
export function stepTo(points: readonly NavPoint[], from: string, dx: number, dy: number): string | null {
  const a = points.find(p => p.id === from), len = Math.hypot(dx, dy);
  if (!a || !len) return null;
  const ux = dx / len, uy = dy / len;
  let best: string | null = null, bs = Infinity;
  for (const p of points) {
    if (p.id === from) continue;
    const vx = p.x - a.x, vy = p.y - a.y, d = Math.hypot(vx, vy); if (!d) continue;
    const cos = (vx * ux + vy * uy) / d; if (cos < 0.5) continue; // (within 60 degrees)
    const score = d * (2 - cos); // (straight ahead preferred)
    if (score < bs) { bs = score; best = p.id; }
  }
  return best;
}
