// A sleeping area legend's lying down and getting up (the rig's, render/rig/rig.ts; the baked
// frames' sink and moss): how far asleep it is, 0 up and about to 1 lying asleep, and how far its
// head droops, from its state (rules/legends.ts) and when that last changed, as the view saw it.
// Woken (angry or happy) it gets up drowsily: its head comes up first, sags once, then it heaves
// itself up out of the ground; lulled back to sleep, its head goes down first and it settles.
// No Three.js: pure numbers, one small record per legend kept by the view (no per-frame garbage).

export interface SleepTrack { asleep: boolean; at: number; sleep0: number; droop0: number }
export interface SleepPose { /** lying asleep, 0..1 */ sleep: number; /** its head down, 0..1 */ droop: number }
export interface SleepTiming { wakeSecs?: number; angryWake?: number; settleSecs?: number }

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const smooth = (x: number) => { const t = clamp01(x); return t * t * (3 - 2 * t); };

/** Its pose now (written to `out`): `asleep` its state is asleep or restless, `angry` it woke angry.
 *  A legend first seen is as its state is; a change of state starts from wherever it was. */
export function legendSleep(track: SleepTrack, asleep: boolean, angry: boolean, time: number, T: SleepTiming, out: SleepPose): SleepPose {
  if (track.asleep !== asleep) { pose(track, angry, time, T, out); track.sleep0 = out.sleep; track.droop0 = out.droop; track.asleep = asleep; track.at = time; }
  return pose(track, angry, time, T, out);
}
/** A new legend's record, as it is: asleep or up. */
export const newSleepTrack = (asleep: boolean): SleepTrack => ({ asleep, at: -Infinity, sleep0: asleep ? 1 : 0, droop0: asleep ? 1 : 0 });

function pose(t: SleepTrack, angry: boolean, time: number, T: SleepTiming, out: SleepPose): SleepPose {
  if (t.asleep) { // settling: head first, then the body
    const k = (time - t.at) / Math.max(0.01, T.settleSecs ?? 4);
    out.droop = t.droop0 + (1 - t.droop0) * smooth(k / 0.6);
    out.sleep = t.sleep0 + (1 - t.sleep0) * smooth((k - 0.2) / 0.8);
    return out;
  }
  const k = (time - t.at) / Math.max(0.01, (T.wakeSecs ?? 6) * (angry ? T.angryWake ?? 0.5 : 1));
  const lift = smooth(k / 0.2), sag = k > 0.18 && k < 0.48 ? 0.55 * Math.sin(Math.PI * (k - 0.18) / 0.3) : 0; // the head up, then a drowsy sag
  out.droop = t.droop0 * Math.max(1 - lift, sag);
  out.sleep = t.sleep0 * (1 - smooth((k - 0.4) / 0.6)); // then up out of the ground
  return out;
}
