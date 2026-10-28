// Which creatures' bubbles she sees (Ed, 2026-10-28: "Animal speech bubbles / thought bubbles should fade into view when the witch
// gets close. I shouldn't see them on the ground when I'm at the treetops. I shouldn't see them on the ground when I'm in the
// treehouse."): every creature's bubble (the 💌 replies, the talk, the dreams, the island dreams, the sleepers' 😴s) shows only to
// a witch on the ground (not rising, not up in the treehouse: the creatures are always on the ground, her followers too while she's
// up there, rules/houseGuard.ts), whole within its range less the fade and gone at its range; and eases in and out over
// `bubbles.ease` seconds, so rising, landing and going indoors fade it rather than cut it. The 💌 replies, the talk and the 😴s by
// `bubbles.near` (about the letters' reach, invites.range: any creature she can throw at answers where she can read it); a
// legend's dream and the night won's island dreams by their own range (dreams.range), as they're there to be found from further.
// Pure: no DOM.

/** What of her decides it: her mode, how far she's risen, and whether she's up in the treehouse. */
export interface Sighter { x: number; z: number; mode: string; lift: number; perch?: boolean }

/** The knobs (the tuning's `bubbles`): `near` metres (whole within near less fade), `fade` metres, `ease` seconds. */
export interface SightTuning { near: number; fade: number; ease: number }

/** Whether she sees bubbles on the ground at all: on foot or on her broom low, not rising, not in the treehouse. */
export const seesGround = (w: Sighter): boolean => w.mode === "ground" && w.lift <= 0.5 && !w.perch;

/** A bubble's share at d metres, for a range: whole up to range less fade, nothing from range on, a straight ramp between. */
export function sightAt(d: number, range: number, fade: number): number {
  if (!(d < range)) return 0;
  const f = Math.max(0, Math.min(fade, range));
  return d <= range - f ? 1 : (range - d) / f;
}

/** The share it should show now for a creature at (x, z): nothing unless she sees the ground, else by distance. */
export const sightOf = (w: Sighter, x: number, z: number, range: number, fade: number): number =>
  seesGround(w) ? sightAt(Math.hypot(x - w.x, z - w.z), range, fade) : 0;

/** A bubble not drawn for longer than this (s) starts again from nothing: gone, then back, it fades in afresh. */
const FORGET = 0.5;

/** Each bubble's shown share, eased toward its target over `ease` seconds (a whole fade in that time), by key, each on its own
 *  clock (the screen's seconds), so any drawing code can step its own without a frame's dt. */
export class BubbleFader {
  private shown = new Map<string, { k: number; at: number }>();

  /** Step one bubble toward `target` at `now` (s); returns its share now. A new one, or one not drawn a while, starts from nothing. */
  step(key: string, target: number, now: number, ease: number): number {
    const was = this.shown.get(key), dt = was && now - was.at <= FORGET ? Math.max(0, now - was.at) : 0, k0 = was && now - was.at <= FORGET ? was.k : 0;
    const d = ease > 0 ? dt / ease : 1, k = k0 < target ? Math.min(target, k0 + d) : Math.max(target, k0 - d);
    this.shown.set(key, { k, at: now });
    if (this.shown.size > 2000) for (const [q, v] of this.shown) if (now - v.at > FORGET) this.shown.delete(q); // (the long gone let go)
    return k;
  }
}
