import type { RigGear } from "./rig/rigBuild";

/** Identity is the pixels' inputs, not the creature that selected this outfit. */
export const partySheetKey = (species: string, level: number, gear: RigGear): string =>
  "party-v1:" + JSON.stringify([species, level, gear.collar ?? null, gear.hat ?? null, gear.glasses ?? null, gear.shoes ?? null, !!gear.woken]);

/** One walk cycle per facing, without three unused ages. */
export const partySheetFrame = (frame: number, away = false, n = 2): number =>
  (away ? n : 0) + (((frame % n) + n) % n);
