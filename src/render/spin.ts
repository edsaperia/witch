// Her twirl at a dressing station (Ed, 2026-10-26: "To get more time to redraw clothes, she could spin in her current clothes each time
// you select something that makes her change"): a step that changes her look sets her spinning on the spot in the clothes she has on,
// through the facings already drawn (her idle's front, side and back), for at least a beat and on till the new look's frames are in
// (render/assets.ts lookReady), never past a cap; she comes out of it facing us, at the end of a turn. Another step mid-spin only
// carries it on towards the newest look. Pure: render/view/witch.ts draws it, main.ts starts it.

export const SPIN = {
  /** One whole turn (s). */
  turn: 0.5,
  /** The least she spins after a step (s). */
  min: 0.5,
  /** The most she spins, from its start (s): on a slow machine she stops in what she has on, and changes when the look lands. */
  cap: 3,
  /** Her lift off the floor at a turn's middle (m). */
  lift: 0.14,
};

/** A spin under way: started `from`, its last step `last`, its end (a turn's end) once it's due. */
export interface Spin { from: number; last: number; end?: number }

/** A step that changed her look, at time `t`: a spin started, or the one under way carried on. */
export function spinStep(s: Spin | null, t: number): Spin {
  return s && s.end === undefined ? { ...s, last: t } : { from: t, last: t };
}

/** The spin at time `t`, the new look's frames in or not: carried on, ending at its turn's end once due, or over (null). */
export function spinAt(s: Spin, t: number, ready: boolean): Spin | null {
  if (s.end !== undefined) return t >= s.end ? null : s;
  if ((ready && t - s.last >= SPIN.min) || t - s.from >= SPIN.cap) return { ...s, end: s.from + Math.max(1, Math.ceil((t - s.from) / SPIN.turn - 1e-6)) * SPIN.turn };
  return s;
}

/** Her facing `dt` into a spin, six to a turn: front, front-side, back-side, back, then the other side's back-side and
 *  front-side (her idle's frames: `heading` up or down, else side-on `towards` or `away`, flipped for the other side). */
export function spinFacing(dt: number): { heading: "up" | "down" | null; side: "towards" | "away"; flip: boolean } {
  const k = Math.floor((((dt / SPIN.turn) % 1) + 1) % 1 * 6) % 6;
  return [
    { heading: "down", side: "towards", flip: false },
    { heading: null, side: "towards", flip: false },
    { heading: null, side: "away", flip: false },
    { heading: "up", side: "away", flip: false },
    { heading: null, side: "away", flip: true },
    { heading: null, side: "towards", flip: true },
  ][k] as { heading: "up" | "down" | null; side: "towards" | "away"; flip: boolean };
}

/** Her lift `dt` into a spin (m): a little hop each turn. */
export function spinLift(dt: number): number {
  return SPIN.lift * Math.sin(Math.PI * ((((dt / SPIN.turn) % 1) + 1) % 1));
}
