// The dancefloor's speakers (Ed, v160): a ring of stone speaker columns round the floor, in place
// of the old standing stones: dancefloor.speakers.count of them, evenly spaced from start degrees,
// radiusFactor times the floor's radius out. Gameplay (always drawn, never see-through), each with
// a state so they can be broken later as soundsystems can; for now they play (a debug key cycles).
// Ring angles are measured round the floor from the side nearest the camera: a speaker at ring
// angle a stands at centre + R (sin a, cos a), x to the right and z towards the camera, as the art
// (dancefloorSpeakerFacing) expects.
import type { Tuning } from "./tuning";

export type SpeakerState = "playing" | "damaged" | "destroyed";
export const SPEAKER_STATES: SpeakerState[] = ["playing", "damaged", "destroyed"];
export interface Speaker { x: number; z: number; /** degrees round the floor from the camera side */ ring: number }

/** How far the speakers stand from the floor's centre (metres). */
export const speakerRadius = (t: Tuning) => t.dancefloor.radius * t.dancefloor.speakers.radiusFactor;
/** The dancefloor's whole clearing: out past the speakers' feet by dancefloor.clearing metres. */
export const floorClearing = (t: Tuning) => speakerRadius(t) + t.dancefloor.speakers.footprint + t.dancefloor.clearing;

export function speakerRing(centre: { x: number; z: number }, t: Tuning): Speaker[] {
  const S = t.dancefloor.speakers, R = speakerRadius(t), out: Speaker[] = [];
  for (let i = 0; i < S.count; i++) {
    const ring = S.start + (360 / S.count) * i, a = (ring * Math.PI) / 180;
    out.push({ x: centre.x + Math.sin(a) * R, z: centre.z + Math.cos(a) * R, ring });
  }
  return out;
}

/** The next state round (debug): playing, damaged, destroyed, playing... */
export const nextSpeakerState = (s: SpeakerState): SpeakerState => SPEAKER_STATES[(SPEAKER_STATES.indexOf(s) + 1) % SPEAKER_STATES.length];
