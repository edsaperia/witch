/** Mirror Floor only: the first authorised slice (Ed, 2026-10-30). No world-rule modifiers. */
export interface CauldronTrip {
  kind: "mirrorFloor";
  elapsed: number;
  duration: number;
  fade: number;
}

/** Backlog: fade in over a few seconds, last about 1–2 minutes. */
export function newMirrorFloorTrip(): CauldronTrip {
  return { kind: "mirrorFloor", elapsed: 0, duration: 90, fade: 3 };
}

export function tripStrength(trip: CauldronTrip | null | undefined): number {
  if (!trip || trip.elapsed >= trip.duration) return 0;
  const edge = Math.min(1, trip.elapsed / trip.fade, (trip.duration - trip.elapsed) / trip.fade);
  return edge * edge * (3 - 2 * edge);
}

export function stepTrip(trip: CauldronTrip | undefined, dt: number): CauldronTrip | undefined {
  if (!trip) return undefined;
  trip.elapsed += dt;
  return trip.elapsed >= trip.duration - 1e-9 ? undefined : trip;
}
