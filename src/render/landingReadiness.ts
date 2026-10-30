export type HomeArtKind = 'treehouse' | 'props' | 'soundsystems';
/** Only a late landing arms these fades; normal/warm arrivals remain fully opaque. */
export class LandingArtFade {
  private starts: Partial<Record<HomeArtKind, number>> = {};
  private elapsed: Partial<Record<HomeArtKind, number>> = {};
  private last: Partial<Record<HomeArtKind, number>> = {};
  arm(ready: Record<HomeArtKind, boolean>): void {
    this.starts = Object.fromEntries(Object.entries(ready).map(([kind, value]) => [kind, value ? -Infinity : Infinity]));
  }
  share(kind: HomeArtKind, ready: boolean, now: number): number {
    if (this.starts[kind] === undefined) return 1;
    if (!ready) return 0;
    if (this.starts[kind] === -Infinity) return 1;
    if (this.starts[kind] === Infinity) { this.starts[kind] = now; this.last[kind] = now; this.elapsed[kind] = 0; }
    // An upload/driver stall must not consume the entire visible fade between two rendered frames.
    this.elapsed[kind] = (this.elapsed[kind] ?? 0) + Math.min(50, Math.max(0, now - (this.last[kind] ?? now)));
    this.last[kind] = now;
    const k = Math.min(1, this.elapsed[kind]! / 800);
    return k * k * (3 - 2 * k);
  }
  reset(): void { this.starts = {}; this.elapsed = {}; this.last = {}; }
}

/** Never substitute a preview/placeholder witch, or submit her unfinished GPU program. */
export const lateLandingReady = (expired: boolean, fullWitch: boolean, witchPrograms: boolean): boolean => expired && fullWitch && witchPrograms;

/** A temporary floor covers every walkable room/corridor bound, plus the terrace. Rules still decide where she may walk. */
export function loadingFloorBounds(rects: readonly { x0: number; x1: number; z0: number; z1: number }[], radius: number) {
  return rects.reduce((b, r) => ({ x0: Math.min(b.x0, r.x0 - 1), x1: Math.max(b.x1, r.x1 + 1), z0: Math.min(b.z0, r.z0 - 1), z1: Math.max(b.z1, r.z1 + 1) }), { x0: -radius, x1: radius, z0: -radius, z1: radius });
}
