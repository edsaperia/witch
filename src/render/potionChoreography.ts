/** Participant-only blackout. Observers keep seeing the spin, fall and recovery. */
export interface PotionTimes { at: number; fallAt: number; landAt: number; wakeAt: number; freeAt: number }
export function potionBlackout(p: PotionTimes | undefined, time: number): number {
  if (!p || time < p.at || time >= p.freeAt) return 0;
  if (time < p.wakeAt) return Math.max(0, Math.min(1, (time - p.at) / Math.min(1.5, Math.max(.1, p.fallAt - p.at))));
  return Math.max(0, 1 - (time - p.wakeAt) / 1.2);
}
export function potionFall(p: PotionTimes | undefined, time: number): number {
  if (!p || time < p.fallAt) return 0;
  const t = Math.min(1, (time - p.fallAt) / Math.max(.01, p.landAt - p.fallAt));
  return t * t;
}
