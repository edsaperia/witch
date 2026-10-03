// The game clock: seconds of play, paused while the tab is hidden or the start screen shows.
// A long frame (a hitch, a backgrounded tab) is cut short so nothing jumps.
export interface Clock { time: number; paused: boolean }

export const MAX_STEP = 0.1;

export const newClock = (): Clock => ({ time: 0, paused: true });

/** Advance the clock by a real frame's seconds; returns the game seconds that passed. */
export function tick(c: Clock, realDt: number): number {
  if (c.paused || !(realDt > 0)) return 0;
  const dt = Math.min(MAX_STEP, realDt);
  c.time += dt;
  return dt;
}
