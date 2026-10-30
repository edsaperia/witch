// Coarse memory of actually observed rectangles, not a terrain or island map.
import type { Observation, Point } from "./observe";
const CELL = 20, PERIOD = 30, WINDOW = 5, GUARD = .25;
const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.z - b.z);
export function newCoverage() {
  const seen = new Set<string>(), cooldown = new Map<number, number>();
  let epochUsed = -1;
  let job: (Point & { from: Point; at: number; until: number; heading: number }) | null = null;
  function cells(p: Point, view: Observation["view"]) {
    const keys: string[] = [];
    // Only whole cells inside the actual delayed rectangle count as seen.
    for (let x = Math.ceil((p.x - view.halfWidth) / CELL); x < Math.floor((p.x + view.halfWidth) / CELL); x++)
      for (let z = Math.ceil((p.z - view.halfDepth) / CELL); z < Math.floor((p.z + view.halfDepth) / CELL); z++) keys.push(`${x},${z}`);
    return keys;
  }
  return {
    observe(o: Observation) {
      for (const key of cells(o.self, o.view)) seen.add(key);
      if (job && (o.playerTime >= job.until || distance(o.self, job) < 10)) job = null;
      if (job && o.playerTime - job.at >= 1 && distance(o.self, job.from) < 2) {
        cooldown.set(job.heading, o.playerTime + PERIOD); job = null;
      }
    },
    waypoint(o: Observation): Point | null {
      const epoch = Math.floor(o.playerTime / PERIOD);
      if (!job && epoch !== epochUsed) {
        const until = Math.min(o.playerTime + WINDOW - GUARD, (epoch + 1) * PERIOD - GUARD);
        if (until <= o.playerTime) return null;
        const candidates = Array.from({ length: 8 }, (_, heading) => {
          const angle = heading * Math.PI / 4;
          const p = { x: o.self.x + Math.cos(angle) * 100, z: o.self.z + Math.sin(angle) * 100 };
          const footprint = cells(p, o.view);
          return { ...p, heading, seenFraction: footprint.filter(k => seen.has(k)).length / Math.max(1, footprint.length) };
        }).filter(p => (cooldown.get(p.heading) ?? 0) <= o.playerTime)
          .sort((a, b) => a.seenFraction - b.seenFraction || a.heading - b.heading);
        if (!candidates.length) return null;
        const p = candidates[0];
        job = { x: p.x, z: p.z, heading: p.heading, from: { x: o.self.x, z: o.self.z }, at: o.playerTime, until };
        epochUsed = epoch;
      }
      return job ? { x: job.x, z: job.z } : null;
    },
    cancelUnsafe(o: Observation) { job = null; epochUsed = Math.floor(o.playerTime / PERIOD); },
    snapshot() { return { cellMetres: CELL, fullySeenCells: seen.size, fullySeenSquareMetres: seen.size * CELL * CELL, epochUsed,
      job: job ? { x: job.x, z: job.z, until: job.until, heading: job.heading } : null }; },
  };
}
