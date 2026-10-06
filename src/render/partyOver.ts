// The party's over (Ed, 2026-10-06: "when the soundsystems and speakers are all destroyed, the dance music stops, the
// dancefloor switches off, lights switch off, the upset animals that ran away go home, all the animals go to sleep and make
// little 😴 speech bubbles, and you can walk the map safely."): the look, eased with the rules' state. The lights go out in a
// ripple outward from home across the map: a front leaving the dancefloor and sweeping out past the farthest party, every
// party light, glow and mote behind it switched off (partyOff, 0 on as ever to 1 off), on the CPU and, through
// LIGHT_UNIFORMS.uPartyOver, in the shaders (LIGHT_GLSL's partyOff). The forest's own moonlight and grade are all that's
// left; her own glow and trail stay (she's still magic).
//
// The state is the rules' g.partyOver (the prototype builder's); until it lands, nothing here switches anything off, and
// ?partyover=<seconds> (debug) eases it in on its own from that game time.
import type { Game } from "../rules/game";
import { LIGHT_UNIFORMS } from "./lighting";

/** Metres the front of the switch-off is wide (a light fades out as the front passes it). */
const WIDTH = 30;

export interface PartyOverLook {
  /** The rules' ease, 0 (playing) to 1 (all out). */
  ease: number;
  /** The front's distance from home (m), and its width. */
  front: number;
  width: number;
  hx: number;
  hz: number;
  /** The farthest partified site from home (m), where the front ends. */
  reach: number;
}

export const newPartyOverLook = (): PartyOverLook => ({ ease: 0, front: 0, width: WIDTH, hx: 0, hz: 0, reach: 0 });

/** The rules' ease (0 to 1) if the party's over, else 0: g.partyOver's own `ease` (or, with only a start time, eased in here
 *  over `secs`), or the debug start from ?partyover=. */
export function partyOverEase(g: Game, debugAt: number | null = null, secs = 12): number {
  const P = (g as { partyOver?: { ease?: number; at?: number } | null }).partyOver;
  if (P && typeof P.ease === "number") return Math.max(0, Math.min(1, P.ease));
  const at = P && typeof P.at === "number" ? P.at : debugAt;
  if (at === null || at === undefined) return 0;
  return Math.max(0, Math.min(1, (g.clock.time - at) / secs));
}

/** Updates the look from the ease, and the shaders' uniform (x, z home; front; width). */
export function updatePartyOver(g: Game, ease: number, out: PartyOverLook): PartyOverLook {
  const d = g.map.dancefloor;
  out.ease = ease; out.hx = d.x; out.hz = d.z;
  if (ease > 0 && out.reach === 0) {
    // (where the front ends: the farthest partified area's middle, and a little past it)
    let far = 0;
    for (const a of g.party.areas.values()) if (a.soundsystem) far = Math.max(far, Math.hypot(a.soundsystem.x - d.x, a.soundsystem.z - d.z));
    out.reach = Math.max(120, far + g.map.areaSize * 0.75);
  }
  out.front = ease <= 0 ? 0 : ease * (out.reach + out.width);
  LIGHT_UNIFORMS.uPartyOver.value.set(out.hx, out.hz, out.front, out.width);
  return out;
}

/** How far switched off a party light at (x, z) is: 0 on, 1 off (the front has passed it). */
export function partyOff(o: PartyOverLook, x: number, z: number): number {
  if (o.front <= 0) return 0;
  const k = Math.max(0, Math.min(1, (o.front - Math.hypot(x - o.hx, z - o.hz)) / o.width));
  return k * k * (3 - 2 * k);
}
