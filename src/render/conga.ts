// The conga, drawn (the win's finale, Ed 2026-10-11: when an island is won every party animal forms a giant conga line round
// the dancefloor; the line itself, who follows whom and where each walks, is the rules'). Here only how each animal moves in it:
// a step on the beat for its body (quadrupeds trot three and kick, birds hop with both feet, bats and moths bob in the air,
// the squat ones shuffle and squash, insects skitter in double time, snakes sway), a lean forward onto the back
// of the one ahead ("hands on the back"), easing off as it kicks, and a ripple down the line so the step travels along it. A
// function of the beat alone: no state, nothing allocated (it fills `out`).
import { GENOMES } from "../../art/genome/species.js";

/** The body plans (art/genome/species.js `template`), and the snail's slide and the toad's leap among the squat ones. */
export type CongaBody = "quadruped" | "avian" | "flyer" | "squat" | "insectoid" | "serpent" | "snail" | "toad";
const BODY = new Map<string, CongaBody>((GENOMES as { id: string; template: string }[]).map(g => [g.id, g.id === "snail" ? "snail" : g.id === "toad" ? "toad" : (g.template as CongaBody)]));
export const congaBody = (species: string): CongaBody => BODY.get(species) ?? "quadruped";

export interface CongaPose {
  /** Height off the ground, in body heights. */
  y: number;
  /** Sideways sway (across the line), in body heights. */
  sway: number;
  /** A front foot lifted (the rig's tap): -1 far, 1 near, 0 none. */
  tap: number;
  /** Squash and stretch about its feet. */
  sx: number;
  sy: number;
  /** Forward, onto the back of the one ahead, in body lengths (its sprite's width). */
  lean: number;
}

/** The beat's ripple down the line: each animal this many beats after the one ahead (so a kick travels back along it). */
export const RIPPLE = 0.125;
/** Beats in the conga's bar: three steps and a kick. */
const BAR = 4;

const hump = (k: number) => Math.sin(Math.max(0, Math.min(1, k)) * Math.PI);

/** Where an animal of `body`, `place` animals back from the head of the line, is in its step at beat-time `beats` (beats since
 *  any fixed moment: the beat clock's). */
export function congaPose(body: CongaBody, beats: number, place: number, out: CongaPose): CongaPose {
  const b = beats - place * RIPPLE, n = ((Math.floor(b) % BAR) + BAR) % BAR, k = b - Math.floor(b), kick = n === BAR - 1;
  out.y = 0; out.sway = 0; out.tap = 0; out.sx = 1; out.sy = 1;
  // Leaning in on the steps; on the kick it rocks back a little, then in again.
  out.lean = kick ? 0.12 - 0.1 * hump(k) : 0.12;
  switch (body) {
    case "quadruped":
      // Trot, trot, trot, kick: a little bounce each step, the front feet in turn; on the kick a hop, a front foot flung up.
      out.y = kick ? 0.22 * hump(k) : 0.06 * hump(k);
      out.tap = kick ? (k < 0.7 ? 1 : 0) : (n % 2 ? 1 : -1) * (k < 0.45 ? hump(k / 0.45) : 0);
      out.sy = kick ? 1 + 0.06 * hump(k) : 1;
      out.sx = 2 - out.sy;
      break;
    case "avian":
      // Both feet together, a hop a beat; squashed landing; the kick a big hop, stretched up tall.
      out.y = (kick ? 0.32 : 0.14) * hump(k);
      out.sy = k > 0.88 || k < 0.06 ? 0.9 : kick ? 1 + 0.1 * hump(k) : 1;
      out.sx = 2 - out.sy;
      break;
    case "flyer":
      // Up in the air the whole way, bobbing on the beat; on the kick a dip and a lift.
      out.y = 0.55 + 0.12 * Math.sin((b / 2) * Math.PI * 2) - (kick ? 0.18 * hump(k) : 0);
      out.sway = 0.08 * Math.sin((b / BAR) * Math.PI * 2);
      out.lean = 0.06;
      break;
    case "squat":
      // A shuffle: squashed on every beat and springing back, hardly leaving the ground; the kick a little hop.
      out.y = kick ? 0.12 * hump(k) : 0.02 * hump(k);
      out.sy = k < 0.2 ? 0.88 + 0.6 * k : 1;
      out.sx = 2 - out.sy;
      break;
    case "toad":
      // Squat on the steps; the kick a proper leap.
      out.y = kick ? 0.45 * hump(k) : 0;
      out.sy = kick ? 1 + 0.12 * hump(k) : k < 0.25 ? 0.86 + 0.56 * k : 1;
      out.sx = 2 - out.sy;
      break;
    case "snail":
      // Never leaves the ground: a long slide and a squeeze on each beat, its shell rocking on the kick.
      out.sy = k < 0.3 ? 0.9 + k / 3 : 1;
      out.sx = k < 0.3 ? 1.12 - 0.4 * k : 1;
      out.sway = kick ? 0.06 * Math.sin(k * Math.PI * 2) : 0;
      out.lean = 0.08;
      break;
    case "insectoid":
      // Skittering in double time, a tiny bob twice a beat and a jitter; the kick a hop.
      out.y = kick ? 0.16 * hump(k) : 0.04 * hump((k * 2) % 1);
      out.sway = 0.03 * Math.sin(b * Math.PI * 4);
      break;
    case "serpent":
      // Swaying across the line, a wave a bar, a lift of the head on the kick (a stretch).
      out.sway = 0.22 * Math.sin((b / 2) * Math.PI);
      out.sy = kick ? 1 + 0.08 * hump(k) : 1;
      out.lean = 0.1;
      break;
  }
  return out;
}

export const newCongaPose = (): CongaPose => ({ y: 0, sway: 0, tap: 0, sx: 1, sy: 1, lean: 0 });
