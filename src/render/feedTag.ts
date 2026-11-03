// The feed prompt (Ed, 2026-11-03: "the nearest un-taken berry in reach gets a small marker with the button prompt, so she knows a press
// will feed, not put down"): while a tap of the sigil button would feed the bottom of her stack (rules/sigilButton.ts feedOffer), the
// use button as bound (E, the pad's square) as a keycap with "feed" just right of that berry on screen, and under it "hold" and the
// keycap again with "put down": a tap feeds, holding it berries.feed.hold seconds puts the sigil down (the one way to park that animal
// while a berry's on offer). While she holds it the "put down" line brightens as the hold fills. The berry's own marker (a pulsing
// halo, a ring of motes) is render/leash.ts drawBerries'. On a touch screen the prompt is the button, as the spell's is
// (render/castTag.ts). Drawing only.
import { keycapCanvas } from "../ui/keyHint";
import { useGlyph } from "./houseRooms";
import { feedOffer } from "../rules/sigilButton";
import { feedKnobs } from "../rules/berries";
import type { View } from "./view";

/** How far the "put down" line is lit (0 to 1): the hold's share filled while a press waits on it, else 0. */
export const holdShare = (feedHold: number | undefined, now: number, hold: number): number =>
  feedHold === undefined ? 0 : hold > 0 ? Math.max(0, Math.min(1, (now - feedHold) / hold)) : 1;

export class FeedTag {
  private readonly el = document.createElement("div");
  private readonly down = document.createElement("div");
  private key = "";
  private tap: ((down: boolean) => void) | null = null;
  constructor() {
    this.el.id = "feed-tag";
    this.el.style.cssText = "position:fixed;z-index:11;pointer-events:none;display:none;transform:translate(0,-50%);flex-direction:column;gap:4px;font:700 15px/1 ui-monospace,monospace;color:#ffe3f3;text-shadow:0 1px 0 #1a1022,0 0 4px #1a1022;filter:drop-shadow(0 0 3px rgba(255,140,200,.55))";
    this.el.addEventListener("pointerdown", e => { if (this.tap) { e.preventDefault(); this.tap(true); } });
    for (const ev of ["pointerup", "pointerleave", "pointercancel"]) this.el.addEventListener(ev, () => this.tap?.(false));
    document.body.append(this.el);
  }
  update(v: View): void {
    const g = v.game, W = g.witches?.[0], offer = W ? feedOffer(g, W) : null, held = W?.leash.feedHold;
    if (!W || (!offer && held === undefined)) { this.el.style.display = "none"; this.tap = null; return; }
    const cv = v.canvas.getBoundingClientRect(), px = Math.max(2, Math.round(cv.width / Math.max(1, v.width))), glyph = useGlyph(v.useDevice), key = `${glyph}|${px}`;
    if (key !== this.key) {
      this.key = key;
      const row = (glyph2: HTMLCanvasElement, words: string, small = false) => {
        const r = document.createElement("div"), w = document.createElement("span");
        r.style.cssText = `display:flex;align-items:center;gap:6px${small ? ";font-size:12px" : ""}`;
        w.textContent = words; r.append(glyph2, w);
        return r;
      };
      const hold = document.createElement("span"); hold.textContent = "hold";
      this.down.replaceChildren(hold, keycapCanvas(glyph, Math.max(1, px - 1)), Object.assign(document.createElement("span"), { textContent: "put down" }));
      this.down.style.cssText = "display:flex;align-items:center;gap:5px;font-size:12px";
      this.el.replaceChildren(row(keycapCanvas(glyph, px), "feed"), this.down);
    }
    this.tap = v.useDevice === "touch" ? v.onUse : null;
    this.el.style.pointerEvents = this.tap ? "auto" : "none";
    const share = holdShare(held, W.time ?? g.herTime, feedKnobs(g.tuning).hold);
    this.down.style.opacity = `${0.6 + 0.4 * share}`;
    this.down.style.color = share > 0 ? "#fff6c8" : "";
    const at = offer ?? { x: W.body.x, z: W.body.z }, [qx, qy] = v.screenOf(at.x + 1.2, 0.8, at.z);
    this.el.style.display = "flex";
    this.el.style.left = `${cv.left + ((qx + 1) / 2) * cv.width}px`;
    this.el.style.top = `${cv.top + ((1 - qy) / 2) * cv.height}px`;
  }
  dispose(): void { this.el.remove(); }
}
