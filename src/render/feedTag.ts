// The feed prompt (Ed, 2026-11-03: "just "[E]" (or equivalent controller) key above the berry with a little down arrow, and the berry
// glows brighter"): while a tap of the sigil button would feed the bottom of her stack (rules/sigilButton.ts feedOffer), and only then,
// the use button as bound (E; on a pad its button, as the stations' prompts show it, ui/keyHint.ts glyphOf; on touch the tap's) as a
// keycap above that berry, a small down arrow under it pointing at the berry. No words (Ed: no on-screen text he hasn't asked for).
// The berry's brighter glow is render/leash.ts drawBerries' (berries.feed.glow). On a touch screen the keycap is the button, as the
// spell's is (render/castTag.ts). Drawing only.
import { keycapCanvas } from "../ui/keyHint";
import { useGlyph } from "./houseRooms";
import { feedOffer } from "../rules/sigilButton";
import type { View } from "./view";

/** How high above the berry (m) the arrow's tip points from: just over its glow. */
export const ARROW_TIP = 1.5;

/** The little down arrow under the keycap, `px` page pixels an art pixel: a pixel-art chevron, 5 art pixels wide and 3 tall, in the
 *  keycaps' light ink with a dark edge, pointing down at the berry. */
export function arrowSvg(px: number): string {
  const s = Math.max(1, Math.round(px)), w = 7 * s, h = 5 * s, cells: string[] = [];
  const ink = [[1, 1, 5], [2, 2, 3], [3, 3, 1]] as const; // (row, first column, width): the arrow, the dark round it drawn first
  for (const [r, c, n] of ink) cells.push(`<rect x="${(c - 1) * s}" y="${(r - 1) * s}" width="${(n + 2) * s}" height="${3 * s}" fill="#1a1022"/>`);
  for (const [r, c, n] of ink) cells.push(`<rect x="${c * s}" y="${r * s}" width="${n * s}" height="${s}" fill="#ffe3f3"/>`);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges">${cells.join("")}</svg>`;
}

/** The offered berry's glow (Ed, 2026-11-03: "the berry glows brighter"), by berries.feed.glow (`gain`; 1: the pulsing halo it had,
 *  without the ring of motes) and its pulse (0.75 to 1): its wide halo's size (m) and colour gain, and a bright core over the berry's
 *  own, its size and gain. Any gain over 1 is a step up on every part. */
export function offerGlow(gain: number, pulse: number): { haloSize: number; haloGain: number; coreSize: number; coreGain: number } {
  const k = Math.max(1, gain);
  return { haloSize: 4.6 * (1 + 0.25 * (k - 1)), haloGain: k * pulse, coreSize: 1.1 * (1 + 0.2 * (k - 1)), coreGain: k };
}

export class FeedTag {
  private readonly el = document.createElement("div");
  private key = "";
  private tap: ((down: boolean) => void) | null = null;
  constructor() {
    this.el.id = "feed-tag";
    this.el.style.cssText = "position:fixed;z-index:11;pointer-events:none;display:none;transform:translate(-50%,-100%);flex-direction:column;align-items:center;gap:2px;filter:drop-shadow(0 0 3px rgba(255,140,200,.55))";
    this.el.addEventListener("pointerdown", e => { if (this.tap) { e.preventDefault(); this.tap(true); } });
    for (const ev of ["pointerup", "pointerleave", "pointercancel"]) this.el.addEventListener(ev, () => this.tap?.(false));
    document.body.append(this.el);
  }
  update(v: View): void {
    const g = v.game, W = g.witches?.[0], offer = W ? feedOffer(g, W) : null;
    if (!offer) { this.el.style.display = "none"; this.tap = null; return; }
    const cv = v.canvas.getBoundingClientRect(), px = Math.max(2, Math.round(cv.width / Math.max(1, v.width))), glyph = useGlyph(v.useDevice), key = `${glyph}|${px}`;
    if (key !== this.key) {
      this.key = key;
      const arrow = document.createElement("div");
      arrow.innerHTML = arrowSvg(px);
      arrow.style.cssText = "display:block;line-height:0";
      this.el.replaceChildren(keycapCanvas(glyph, px), arrow);
    }
    this.tap = v.useDevice === "touch" ? v.onUse : null;
    this.el.style.pointerEvents = this.tap ? "auto" : "none";
    const [qx, qy] = v.screenOf(offer.x, ARROW_TIP, offer.z);
    this.el.style.display = "flex";
    this.el.style.left = `${cv.left + ((qx + 1) / 2) * cv.width}px`;
    this.el.style.top = `${cv.top + ((1 - qy) / 2) * cv.height}px`;
  }
  dispose(): void { this.el.remove(); }
}
