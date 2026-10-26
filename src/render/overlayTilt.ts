// The tilt-shift for the overlays (Ed's playtest of round 14: "Invitations are not affected by the tilt shift"). The
// world's pixel pictures that are DOM elements over the canvas (the 💌s flying, orbiting and resting, the hearts, the
// sleepers' 😴 dreams, the chat and reply bubbles) are placed by the bend (render/height.ts `placed`) but drawn after
// the post pass, so its blur (render/post.ts TILT) never touches them. This gives each the same blur by its height on
// screen: the shader's radius (in low-res pixels, a Gaussian over ±r, so about r/2 its deviation), as a CSS blur.
// Not the HUD (her claw slashes, cues, panels): those stay sharp, as the action bar does.
import type { PostTuning } from "./post";

type Tilt = PostTuning["tiltShift"];

/** The tilt-shift's blur radius (low-res pixels) at screen height `yDown` (0 the top, 1 the bottom), as TILT works it out:
 *  0 in the sharp band round `centre`, growing to `strength` toward the top and bottom (blended to the treetops' by lift). */
export function tiltRadius(T: Tilt, lift: number, yDown: number, share = 1): number {
  if (!T.on || T.strength <= 0 || share <= 0) return 0;
  const k = Math.max(0, Math.min(1, lift)), k2 = k * k * (3 - 2 * k);
  const strength = (T.strength + (T.treetop.strength - T.strength) * k2) * share, band = T.band + (T.treetop.band - T.band) * k2;
  const d = Math.max(0, Math.abs(yDown - T.centre) - band * 0.5) / Math.max(0.05, 0.5 - band * 0.5);
  const s = Math.max(0, Math.min(1, d)), r = strength * s * s * (3 - 2 * s);
  return r < 0.35 ? 0 : r;
}

/** The tilt-shift's share stepped toward `want` (0 or 1) by `dt` seconds over `ease` seconds (View.houseTilt: off in the treehouse). */
export const stepTiltShare = (k: number, want: number, dt: number, ease: number): number =>
  want > k ? Math.min(want, k + dt / Math.max(1e-3, ease)) : Math.max(want, k - dt / Math.max(1e-3, ease));
/** Its share as drawn: eased in and out. */
export const tiltShareShown = (k: number): number => k * k * (3 - 2 * k);

let tilt: Tilt | null = null, lifted = 0, cssPerLow = 1, cssHeight = 1, shared = 1;

/** Each frame, before the overlays are placed: the tuning's tilt-shift, her lift, and the canvas's height in CSS pixels
 *  and in low-res pixels (one low-res pixel is cssH / lowH CSS pixels, however the blur is applied, before or after the upscale);
 *  `share`, how much of the blur is on (render/post.ts Post.tilt: none in the treehouse). */
export function setOverlayTilt(T: Tilt, lift: number, cssH: number, lowH: number, share = 1): void {
  tilt = T; lifted = lift; cssHeight = Math.max(1, cssH); cssPerLow = cssHeight / Math.max(1, lowH); shared = share;
}

/** The CSS blur (its deviation, in CSS pixels, in quarter steps) for an overlay at `y` CSS pixels down the canvas. */
export function overlayBlur(y: number): number {
  if (!tilt) return 0;
  const r = tiltRadius(tilt, lifted, y / cssHeight, shared) * 0.5 * cssPerLow;
  return Math.round(r * 4) / 4;
}

/** Each element's own filter (a glow or shadow it was given), kept under the blur. */
const own = new WeakMap<HTMLElement, string>();

/** Blur element `el`, standing at `y` CSS pixels down the canvas, as the tilt-shift blurs the world there. */
export function tiltFilter(el: HTMLElement, y: number): void {
  let base = own.get(el);
  if (base === undefined) { base = el.style.filter.includes("blur(") ? "" : el.style.filter; own.set(el, base); }
  const s = overlayBlur(y), f = s > 0 ? `${base} blur(${s}px)`.trim() : base;
  if (el.style.filter !== f) el.style.filter = f;
}
