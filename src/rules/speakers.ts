// The dancefloor's speakers (Ed, v160): a ring of stone speaker columns round the floor, in place
// of the old standing stones: dancefloor.speakers.count of them, evenly spaced from start degrees,
// radiusFactor times the floor's radius out. Gameplay (always drawn, never see-through): home is these speakers (Ed,
// 2026-10-08: "home as 12 speakers at 500 hp each"), each its own soundsystem in the fight (combat.sounds' `home:<i>`, its
// health combat.speakerHealth), the besiegers going for the nearest standing one; home falls when all of them have. Each
// shows its state (playing, damaged at half its health, destroyed); a debug key cycles an unhurt one's.
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

/** Home's speakers in the fight: speaker i's soundsystem key, and whether a key is one of them ("home" itself, the whole
 *  ring, too). */
export const speakerKey = (i: number): string => `home:${i}`;
export const isHomeKey = (key: string): boolean => key === "home" || key.startsWith("home:");
/** Which speaker a key is (-1 if none). */
export const speakerIndex = (key: string): number => (key.startsWith("home:") ? Number(key.slice(5)) : -1);
/** A speaker's state by its health: destroyed at none, damaged at half or less. */
export const speakerStateOf = (hp: number, max: number): SpeakerState => (hp <= 0 ? "destroyed" : hp <= max / 2 ? "damaged" : "playing");

/** The balance simulators' home, one soundsystem at the floor's centre: the ring's health together, reached at its speakers. */
export const homeHealth = (t: Tuning): number => t.dancefloor.speakers.count * t.combat.speakerHealth;
export const homeReach = (t: Tuning): number => speakerRadius(t) + t.combat.speakerRadius;

/** The next state round (debug): playing, damaged, destroyed, playing... */
export const nextSpeakerState = (s: SpeakerState): SpeakerState => SPEAKER_STATES[(SPEAKER_STATES.indexOf(s) + 1) % SPEAKER_STATES.length];
