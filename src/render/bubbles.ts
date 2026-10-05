// One speech-bubble style for every speaker (Ed, 2026-10-05): the outline-only pixel bubble of
// index.html's .bubble, its emoji a pixel sprite, sized by who speaks: the witch at 1, a creature
// by its level (tuning bubbles.levelScale, babies smallest, legends largest). The 💌 replies use it
// (render/invites.ts); the legends' dream and nightmare bubbles are meant to as well.
import type { Tuning } from "../rules/tuning";

/** A bubble's size factor: the witch's (level undefined) 1, a creature's by its level. */
export function bubbleScale(t: Tuning, level?: number): number {
  if (level === undefined) return 1;
  const L = t.bubbles.levelScale ?? [1];
  return L[Math.max(0, Math.min(L.length - 1, level))];
}

/** Size a .bubble element and its emoji image for a speaker: the outline (--px) and the emoji's
 *  pixels scale together, so a legend's bubble is the same bubble, bigger. */
export function sizeBubble(el: HTMLElement, img: HTMLElement, t: Tuning, level?: number): void {
  const k = bubbleScale(t, level), px = t.pixelSize * t.bubbles.scale * k, n = t.bubbles.emojiPixels;
  el.style.setProperty("--px", `${Math.max(1, Math.round(3 * k))}px`);
  img.style.width = img.style.height = `${Math.round(n * px)}px`;
}
