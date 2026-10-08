// Her expressions, as data (Ed, 2026-10-08: "many expressions and gestures cheaply"): each a named set of the rig's face
// parameters (rig.ts Params) over neutral, and optionally a gesture it plays when it's put on. A new one is a line here.

import type { Params } from "./rig";

export interface Expression { face: Partial<Params>; gesture?: string }
export const EXPRESSIONS: Record<string, Expression> = {
  neutral: { face: {} },
  grin: { face: { mouth: "grin", eyeOpen: 0.9, browY: 0.6, blush: 0.4 } },
  determined: { face: { browAng: 0.5, browY: -0.6, eyeOpen: 0.75, mouth: "M" } },
  surprised: { face: { eyeShape: "wide", browY: 2.2, mouth: "gasp" } },
  /** at a sleeping legend */
  awed: { face: { eyeOpen: 1.08, sparkle: 1, browY: 1.6, browAng: -0.25, mouth: "O", lookY: -0.7, blush: 0.4 } },
  worried: { face: { browAng: -0.55, browY: 1, mouth: "wavy", lookX: -0.4, sweat: 1 } },
  hurt: { face: { eyeShape: "wince", browAng: -0.45, mouth: "A", tears: 1 } },
  smug: { face: { eyeOpen: 0.55, browAng: 0.12, browY: 0.6, mouth: "smirk", lookX: 0.5, blush: 0.35 } },
  eww: { face: { eyeOpen: 0.6, browAng: -0.4, browY: -0.4, mouth: "eww", lookX: -0.7 } },
  aww: { face: { eyeOpen: 1.06, sparkle: 1, browAng: -0.3, browY: 1, mouth: "cat", blush: 1 } },
  sleepy: { face: { eyeShape: "sleepy", mouth: "rest", browY: -0.5, browAng: -0.1, lookY: 0.4 } },
  cheering: { face: { eyeShape: "happy", mouth: "laugh", blush: 0.7, browY: 1.5 }, gesture: "fistPump" },
};

/** Which mouth a letter of what she's saying shows (the viseme set); undefined: hold the last one. */
export function viseme(ch: string): Params["mouth"] | "close" | undefined {
  const c = ch.toLowerCase();
  if ("ah".includes(c)) return "A";
  if ("eiy".includes(c)) return "E";
  if (c === "o") return "O";
  if ("uwq".includes(c)) return "U";
  if ("mbp".includes(c)) return "M";
  if ("fv".includes(c)) return "F";
  if (/[a-z0-9]/.test(c)) return undefined;
  return "close"; // (spaces and punctuation: the mouth closes)
}
