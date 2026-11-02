// The forest behind the treehouse as the island loads (render/view.ts behindHouse draws it, render/post.ts Post.behind; the
// tuning's treehouse.house.dark). Ed, 2026-10-26: "When the forest has loaded, fade it in gradually behind the whole treehouse",
// "Fade in time: 20 seconds". Ed, 2026-11-02: after waking the forest was black and then all there at once, and through the telescope
// a dark forest under the rolling mist was suddenly lit. One reveal now, on one clock: the island's own, from the first frame it's
// ready (g.islandReady), over `reveal` seconds of her clock; the house and the telescope both show the forest as far as that reveal
// has got, so looking through the telescope (or putting it down) mid-reveal neither snaps it nor starts it again. Before then the
// house and the telescope show no forest (the loading mist still rolls over the dark, drawn in the effects layer). Lifting off
// before the island's ready is the one exception, as before: she needs to see where she flies, so it comes back from where she
// left over `fade` seconds.

/** The tuning's treehouse.house.dark: `fade` the seconds the dark closes in (or, lifting off before the island's ready, opens);
 *  `reveal` the island's own reveal (s). */
export interface ForestDarkTuning { on: boolean; fade: number; reveal?: number }

/** Where she sees it from this frame: on foot in the house (any room or the Terrace), through its telescope, or out of it (lifting
 *  off, flying, or no house's rooms). */
export type RevealPlace = "house" | "scope" | "out";

export interface ForestReveal {
  /** The forest's share drawn: 0 the house alone over black, 1 the whole picture (linear: forestShown eases it). */
  k: number;
  /** The island's own reveal, 0 to 1: 0 till it's ready, then rising over `reveal` seconds of her clock. The one clock the house and
   *  the telescope share. */
  island: number;
  /** Her clock at the last step (NaN: none yet). */
  at: number;
  /** She lifted off before the island was ready: the forest coming back over `fade` from where she left. */
  out: boolean;
}

export const newForestReveal = (): ForestReveal => ({ k: 1, island: 0, at: NaN, out: false });

/** The longest step of her clock one drawn frame counts (s): a stall, or frames not drawn, don't skip the reveal on. */
export const REVEAL_STEP_MAX = 0.1;

/** A drawn frame at `ht` (her clock): the island's reveal on, and the forest's share for where she is. A first step, or her clock
 *  gone back (a new night's game, its clock from 0), takes no time: the dark at once in the house before the island's ready. */
export function stepForestReveal(s: ForestReveal, place: RevealPlace, ready: boolean, ht: number, T: ForestDarkTuning | undefined): void {
  const first = !Number.isFinite(s.at) || ht < s.at;
  const dt = first ? 0 : Math.min(REVEAL_STEP_MAX, Math.max(0, ht - s.at));
  s.at = ht;
  const reveal = Math.max(1e-3, T?.reveal ?? T?.fade ?? 0.6), fade = Math.max(1e-3, T?.fade ?? 0.6);
  s.island = ready ? Math.min(1, s.island + dt / reveal) : 0;
  if (place !== "out") s.out = false;
  else if (!ready) s.out = true;
  if (!T?.on) s.k = 1;
  else if (s.out) s.k = first ? 1 : Math.min(1, s.k + dt / fade); // (lifted off before it was ready: back from where she left)
  else if (ready) s.k = Math.max(s.k, s.island); // (never darker once it's ready: out before, it may be ahead of the island's reveal)
  else s.k = first ? 0 : Math.max(0, s.k - dt / fade); // (in the house or at its telescope, not ready: the dark closes in)
}

/** The forest's share as the post pass draws it: eased in and out. */
export const forestShown = (k: number): number => (k >= 1 ? 1 : k <= 0 ? 0 : k * k * (3 - 2 * k));
