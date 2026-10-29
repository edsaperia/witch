// A creature won over celebrates (Ed, 2026-10-29: when a wild one turns happy, or a stunned one is converted, it celebrates for
// about a second in a way that suits its body): the rules hold it out of every fight for invites.cheer.secs (rules/affection.ts,
// Creature.cheerUntil) and the view moves it by its body (art/genome/species.js `template`, as the conga reads it):
//   hop    (the hoppers: the toad, the hare, the penguin): a happy jump with a spin;
//   roll   (the four-legged): a roll-over, onto its back and up again;
//   loop   (the flyers, bats and moths and the birds that fly): a loop, up and over, upside down at its top;
//   wiggle (the rest: the squat, the insects, the snakes): a wiggle-dance.
// With it its ring bursts into hearts (render/invites.ts), the happy sting plays (platform/audio/sfxCues.ts), and its sigil in its
// stone's stack flips to the friends' colour with a pop (render/leash/stones.ts). A function of its clock alone: nothing kept.
import { congaBody } from "./conga";

export type CheerKind = "hop" | "roll" | "loop" | "wiggle";
const HOPPERS = new Set(["toad", "hare", "penguin"]);

/** How a species celebrates. */
export function cheerKind(species: string): CheerKind {
  if (HOPPERS.has(species)) return "hop";
  const b = congaBody(species);
  return b === "quadruped" ? "roll" : b === "flyer" || b === "avian" ? "loop" : "wiggle";
}

export interface CheerPose {
  /** Lifted, in body heights. */ y: number;
  /** Across the screen, in body heights (a loop's swing, a wiggle's sway). */ x: number;
  /** Squash and stretch about its feet. */ sx: number; sy: number;
  /** Drawn mirrored (a spin's turns) or over on its back (a roll, a loop's top). */ flip: boolean;
}

/** Its celebration `k` of the way through (0..1), into `out`: the identity outside it. */
export function cheerPose(kind: CheerKind, k: number, out: CheerPose): CheerPose {
  out.y = 0; out.x = 0; out.sx = 1; out.sy = 1; out.flip = false;
  if (!(k > 0 && k < 1)) return out;
  const s = Math.sin(k * Math.PI);
  if (kind === "hop") {
    // crouch, spring up a body height turning round twice, land with a squash
    if (k < 0.15) { const c = k / 0.15; out.sy = 1 - 0.18 * c; out.sx = 1 + 0.12 * c; }
    else if (k < 0.85) { const a = (k - 0.15) / 0.7; out.y = Math.sin(a * Math.PI) * 1.1; out.sy = 1.08; out.sx = 0.94; out.flip = Math.floor(a * 4) % 2 === 1; }
    else { const l = (k - 0.85) / 0.15; out.sy = 1 - 0.2 * Math.sin(l * Math.PI); out.sx = 1 + 0.15 * Math.sin(l * Math.PI); }
  } else if (kind === "roll") {
    // down, over onto its back (flattened, a little off the ground), and back up with a shake
    out.y = 0.15 * s;
    out.flip = k > 0.3 && k < 0.7;
    out.sy = 1 - 0.3 * s; out.sx = 1 + 0.15 * s;
    out.x = 0.25 * Math.sin(k * Math.PI * 2);
  } else if (kind === "loop") {
    // a vertical loop: up and round, upside down at the top
    const a = k * Math.PI * 2;
    out.y = (1 - Math.cos(a)) * 0.9; out.x = Math.sin(a) * 0.6;
    out.flip = k > 0.35 && k < 0.65;
  } else {
    // a wiggle-dance: side to side four times, squashing on each beat, a little bounce
    const w = Math.sin(k * Math.PI * 8);
    out.x = 0.18 * w * s; out.y = 0.12 * Math.abs(Math.sin(k * Math.PI * 4)) * s;
    out.sx = 1 + 0.1 * Math.abs(w) * s; out.sy = 1 - 0.1 * Math.abs(w) * s;
  }
  return out;
}
