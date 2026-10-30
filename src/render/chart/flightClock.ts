/** The chart's flight pace and hand-off barrier, independent of WebGL. */
export interface ChartFlightClock {
  t: number; rate: number; wall: number; held?: boolean;
  hold?: () => boolean;
  slow?: { rate: number; ease: number; cap: number };
  landingDue?: () => void; dueNotified?: boolean;
}

/** The slowdown may expire; readiness must still keep the animated chart up instead of handing over to a still. */
export function stepChartFlight(f: ChartFlightClock, dt: number, glide: number, end: number, elapsedWall?: number): void {
  f.wall = elapsedWall ?? f.wall + dt;
  if (!f.dueNotified && f.wall >= end) { f.dueNotified = true; f.landingDue?.(); }
  const S = f.slow, waiting = f.t >= glide && !!f.hold?.();
  const slowing = !!S && waiting && f.wall < S.cap;
  if (S) f.rate += ((slowing ? S.rate * Math.min(1, end - f.t) : 1) - f.rate) * (1 - Math.exp(-dt / Math.max(0.01, S.ease)));
  f.held = waiting;
  f.t = Math.min(end, f.t + dt * f.rate);
}
