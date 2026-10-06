// Her hat (Ed, 2026-10-06: "when you are killed, you drop your hat, and there's a direction marker for it,
// so you can go back and find it. You pick it up like a sigil, at which point it gets put back on (you
// can't put it down, it doesn't appear in the sigil stack). If it's on top of a sigil, you pick the hat
// up first. The purpose of this is to help you not lose fights that you might be in."): knocked out, she
// drops it where she went down and wears none until she stands on it and presses the sigil button. It
// never enters the stack. Knocked out again while it's still down, the old one stays where it lies and
// nothing new drops (DECISION FOR ED). A witch with no hat (the character creator's "none": Ed, "If she
// chooses no hat in character creation, then she simply doesn't have this mechanic") drops nothing.
// The rules don't know her look: main.ts says whether she has one (`has`).

export interface HatState {
  /** She has a hat at all (the character creator's look; false: none, and none of this). */
  has: boolean;
  /** Where it lies, and since when (null: on her head). */
  down: { x: number; z: number; at: number } | null;
}

export const newHat = (has = true): HatState => ({ has, down: null });

/** Is she wearing it now? (No hat at all: no.) */
export const wearing = (h: HatState | undefined): boolean => !!h && h.has && !h.down;

/** Knocked out at (x, z): she drops it there, if she has one on. True if it dropped. */
export function dropHat(h: HatState, x: number, z: number, at: number, on = true): boolean {
  if (!on || !h.has || h.down) return false;
  h.down = { x, z, at };
  return true;
}

/** The sigil button at (x, z): standing within `radius` of her hat, she picks it up and it goes
 *  straight back on. True if it did (the press is spent: nothing else under it is picked up). */
export function hatButton(h: HatState, x: number, z: number, radius: number): boolean {
  const d = h.down;
  if (!d || Math.hypot(d.x - x, d.z - z) > radius) return false;
  h.down = null;
  return true;
}

/** Where the marker points (her hat on the ground), or null when there's nothing to find. */
export const hatMarker = (h: HatState | undefined): { x: number; z: number } | null => (h?.has && h.down ? { x: h.down.x, z: h.down.z } : null);
