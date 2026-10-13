// How far a creature's sigil lies from it on the ground (Ed, 2026-10-13: "the top of the sigil's background should be just below the
// animal's feet", so the whole sigil shows, whatever the animal's size): a happy one's rune south of it (+z, down the screen), and a
// parked one resting the same way north of its placed sigil. Its body's own reach south of its middle (its body radius by kind and level,
// rules/spacing.ts), half the sigil across with its dark backing (leash.sigilBacking.size), and leash.runeGap between them. The render
// draws the sigil at sigilSize; the rules find, pull and pick up the rune by the same offset.
import type { Creature } from "./creatures";
import type { Tuning } from "./tuning";
import { bodyRadius } from "./spacing";

/** A sigil's width on the ground (m) at a level, times its look's scale (a happy creature's rune RUNE_SCALE, a placed one's 1). */
export const sigilSize = (level: number, scale = 1): number => (3 + level * 0.8) * scale;
/** A happy creature's rune is drawn a little smaller than a placed sigil. */
export const RUNE_SCALE = 0.85;

/** Metres from a creature's middle to its sigil's middle, south of it: its body, half the sigil with its backing, and the gap. */
export function runeOffset(c: Pick<Creature, "species" | "level">, t: Tuning, scale = RUNE_SCALE): number {
  const L = t.leash, half = (sigilSize(c.level, scale) * Math.max(1, L.sigilBacking?.size ?? 1)) / 2;
  return bodyRadius(c) + half + (L.runeGap ?? 0.5);
}
