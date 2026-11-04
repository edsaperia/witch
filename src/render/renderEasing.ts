/** Render relaxation uses her interpolated clock: a held/pause frame must not advance camera or canopy. */
export function renderDelta(previous: number, now: number): number {
  if (!Number.isFinite(now)) return 0;
  return Number.isFinite(previous) ? Math.max(0, now - previous) : 1 / 60;
}

/** Same coefficient at 60fps, with equal-total-time behavior for any partition and a constant target. */
export function easeAt60(current: number, target: number, coefficient: number, dt: number): number {
  if (!(dt > 0) || !Number.isFinite(dt)) return current;
  return target + (current - target) * Math.exp(Math.log1p(-coefficient) * 60 * dt);
}

export function easeCameraLift(current: number, need: number, dt: number): number {
  const target = Math.max(0, need);
  return easeAt60(current, target, target > current ? 0.35 : 0.06, dt);
}

export function easeCanopyReach(current: number, target: number, dt: number): number {
  if (!(dt > 0)) return current;
  const next = easeAt60(current, target, 0.08, dt);
  // Absorbing terminal snap, after elapsed-time relaxation, preserves partition behavior and clears the last metre.
  return Math.abs(next - target) < 1 ? target : next;
}
