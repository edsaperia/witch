// Her hat (Ed, 2026-10-06: "when you are killed, you drop your hat, and there's a direction marker for it,
// so you can go back and find it. You pick it up like a sigil, at which point it gets put back on (you
// can't put it down, it doesn't appear in the sigil stack). If it's on top of a sigil, you pick the hat
// up first. The purpose of this is to help you not lose fights that you might be in."): knocked out, she
// drops it where she went down and wears none until she stands on it and presses the sigil button. It
// never enters the stack. Knocked out again while it's still down, the old one stays where it lies and
// nothing new drops (DECISION FOR ED). A witch with no hat (the character creator's "none": Ed, "If she
// chooses no hat in character creation, then she simply doesn't have this mechanic") drops nothing.
// The rules don't know her look: main.ts says whether she has one (`has`).
// Her other hats (Ed, 2026-10-12: "if her hat is placed in the world, she can go back to her room to pick up a new one and the
// previous one(s) stay in the world. if she tries to pick up a hat while she's wearing one, she cannot"): a hat lying somewhere
// when she takes a new one in her room stays where it lies, keeping its spell (`left`); any number can lie about at once. She
// picks one up only bare-headed, and it goes on, its spell hers (her own lying hat, if any, then one of the left ones).

export interface HatState {
  /** She has a hat at all (the character creator's look; false: none, and none of this). */
  has: boolean;
  /** Where it lies, and since when (null: on her head). */
  down: { x: number; z: number; at: number } | null;
  /** When a press of the sigil button that did nothing began, while it's still held (putHat); absent when none. */
  hold?: number;
  /** Her other hats lying in the world, each with its spell (rules/spells.ts), left there when she took a new one in her room. */
  left: LeftHat[];
}

/** A hat of hers left lying in the world, and its spell. */
export interface LeftHat { x: number; z: number; at: number; spell: string }

export const newHat = (has = true): HatState => ({ has, down: null, left: [] });

/** Is she wearing it now? (No hat at all: no.) */
export const wearing = (h: HatState | undefined): boolean => !!h && h.has && !h.down;

/** Knocked out at (x, z): she drops it there, if she has one on. True if it dropped. */
export function dropHat(h: HatState, x: number, z: number, at: number, on = true): boolean {
  if (!on || !h.has || h.down) return false;
  h.down = { x, z, at };
  return true;
}

/** She takes a new hat (in her room): the one lying somewhere stays there with its spell (`spell`), and she wears the new. */
export function leaveHat(h: HatState, spell: string): void {
  if (h.down) h.left.push({ ...h.down, spell });
  h.down = null; delete h.hold;
}

/** The sigil button at (x, z), wearing a hat of spell `spell`: standing within `radius` of a hat of hers, bare-headed, she picks
 *  it up and it goes straight on: her own first, else the nearest left one (her own, lying elsewhere, left in its place with
 *  `spell`). Wearing one, she can't. Returns the spell she wears now if she picked one up (the press is spent: nothing else
 *  under it is picked up), else null. */
export function hatButton(h: HatState, x: number, z: number, radius: number, spell = ""): string | null {
  const d = h.down;
  if (d && Math.hypot(d.x - x, d.z - z) <= radius) { h.down = null; return spell; }
  if (!h.has || !d) return null; // (wearing one: Ed, "she cannot")
  let best = -1, bd = radius;
  h.left.forEach((q, i) => { const e = Math.hypot(q.x - x, q.z - z); if (e <= bd) { bd = e; best = i; } });
  if (best < 0) return null;
  const [q] = h.left.splice(best, 1);
  h.left.push({ ...d, spell });
  h.down = null;
  return q.spell;
}

/** Where the marker points (her hat on the ground), or null when there's nothing to find. */
export const hatMarker = (h: HatState | undefined): { x: number; z: number } | null => (h?.has && h.down ? { x: h.down.x, z: h.down.z } : null);

/** Putting it down (Ed, 2026-10-09: "If you are in ground mode and hold down the 'drop / pick up sigil' button and there are
 *  no sigils to pick up, you put down your hat"; just a marker, nothing in the rules reads it): a press of the sigil button
 *  that did nothing (`idle`: nothing picked up or put down) starts the hold; held `hold` seconds on, wearing it, she puts it
 *  down at her feet. Let go (or not on the ground: `held` false) and the hold's over. A press over it picks it up (hatButton).
 *  True on the step it goes down. */
export function putHat(h: HatState, idle: boolean, held: boolean, x: number, z: number, at: number, hold: number | undefined): boolean {
  if (!held || hold === undefined) { if (h.hold !== undefined) delete h.hold; return false; }
  if (idle) h.hold = at;
  if (h.hold === undefined || at - h.hold < hold || !wearing(h)) return false;
  delete h.hold;
  h.down = { x, z, at };
  return true;
}
