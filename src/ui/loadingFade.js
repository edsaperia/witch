// The loading screen's end (Ed, 2026-11-03: "can we fade from the loading screen to the bedroom over a few seconds"): once its
// supernova has whited the screen out, the game starts behind it (main.ts wakeFirst: her alarm, in bed), and when the game has
// drawn that behind the white, the whole screen fades out over the tuning's loading.fadeOut seconds, eased out, onto her bedroom.
// The fade is a CSS opacity transition, so the compositor runs it: smooth through the game's first heavy frames, where the screen's
// own frames (the old 1.2 s white clearing, drawn a frame at a time) could jump straight to the end, a cut. Plain JS, for
// src/ui/loadingScreen.js (before main.ts loads).

/** The fade's easing: an ease-out (most of the white gone in its first second, the last of it settling). */
export const EASE_OUT = "cubic-bezier(0.22, 0.61, 0.36, 1)";
/** The fade's seconds at most under prefers-reduced-motion: kept, but short. */
export const REDUCED_FADE = 0.6;
/** The fade's seconds as built (the tuning's loading.fadeOut). */
export const FADE_OUT = 2.5;

/** The fade's seconds: the knob's (loading.fadeOut), at most REDUCED_FADE when `reduced` (prefers-reduced-motion).
 *  @param {unknown} knob @param {boolean} reduced @returns {number} */
export function fadeSeconds(knob, reduced) {
  const s = typeof knob === "number" && Number.isFinite(knob) ? Math.max(0, knob) : FADE_OUT;
  return reduced ? Math.min(s, REDUCED_FADE) : s;
}

/** Whether the page asks for reduced motion. */
export const prefersReducedMotion = () => { try { return !!globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches; } catch { return false; } };

/** The screen (`root`, all of it white now) covering the game: `wake` starts the game behind it (the wake-up), then, two frames
 *  later (`frame`, requestAnimationFrame: the game has drawn her waking behind the white), `root` fades out over `seconds` and is
 *  removed once clear (`later`, setTimeout), `gone` called. Its phase on `root.dataset.phase`: "covered", "fading".
 *  @param {{ style: Record<string, string>, dataset: Record<string, string>, remove(): void, offsetWidth?: number }} root
 *  @param {number} seconds
 *  @param {{ wake?: (() => void) | null, gone?: () => void, frame?: (f: () => void) => unknown, later?: (f: () => void, ms: number) => unknown }} [opts] */
export function revealGame(root, seconds, { wake, gone, frame = f => requestAnimationFrame(f), later = (f, ms) => setTimeout(f, ms) } = {}) {
  root.dataset.phase = "covered";
  try { wake?.(); }
  finally {
    frame(() => frame(() => {
      root.dataset.phase = "fading";
      root.style.willChange = "opacity";
      root.style.transition = seconds > 0 ? `opacity ${seconds}s ${EASE_OUT}` : "none";
      void root.offsetWidth; // (the opacity it fades from settled first)
      root.style.opacity = "0";
      later(() => { root.remove(); gone?.(); }, seconds * 1000 + 50);
    }));
  }
}
