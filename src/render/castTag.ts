// The spell's key prompt (Ed, 2026-10-29: "a key-press hint near the music sigil when it's shown (i.e. a picture of a button, like with
// the clothes stations)"): while the 🎶 shows on a stump (render/leash/stones.ts StoneView.notes), the use button as bound (E, the pad's
// ✕: the cast is the use button held, rules/sigilButton.ts) as a keycap with "hold" beside it, just right of the 🎶 on screen, faded in
// with it; gone while she casts. On a touch screen the prompt is the button, as the zoo's way out is (render/zooExit.ts). Drawing only.
import { SPRITE_UNIFORMS } from "./sprites";
import { keycapCanvas } from "../ui/keyHint";
import { useGlyph } from "./houseRooms";
import type { View } from "./view";

export class CastTag {
  private readonly el = document.createElement("div");
  private key = "";
  private tap: ((down: boolean) => void) | null = null;
  constructor() {
    this.el.id = "cast-tag";
    this.el.style.cssText = "position:fixed;z-index:11;pointer-events:none;display:none;transform:translate(0,-50%);align-items:center;gap:8px;font:700 15px/1 ui-monospace,monospace;color:#f3e8ff;text-shadow:0 1px 0 #1a1022,0 0 4px #1a1022;filter:drop-shadow(0 0 3px rgba(255,214,140,.55))";
    this.el.addEventListener("pointerdown", e => { if (this.tap) { e.preventDefault(); this.tap(true); } });
    for (const ev of ["pointerup", "pointerleave", "pointercancel"]) this.el.addEventListener(ev, () => this.tap?.(false));
    document.body.append(this.el);
  }
  update(v: View): void {
    const n = v.leashView?.stoneView.notes;
    if (!n || n.casting || n.on < 0.05) { this.el.style.display = "none"; this.tap = null; return; }
    const cv = v.canvas.getBoundingClientRect(), px = Math.max(2, Math.round(cv.width / Math.max(1, v.width))), glyph = useGlyph(v.useDevice), key = `${glyph}|${px}`;
    if (key !== this.key) {
      this.key = key;
      const word = document.createElement("span"); word.textContent = "hold";
      this.el.replaceChildren(keycapCanvas(glyph, px), word);
    }
    this.tap = v.useDevice === "touch" ? v.onUse : null;
    this.el.style.pointerEvents = this.tap ? "auto" : "none";
    // (on the ground just past the 🎶's right edge)
    const R = SPRITE_UNIFORMS.uRight.value, out = n.size * 0.5 + 0.6, [qx, qy] = v.screenOf(n.x + R.x * out, 0.3, n.z + R.z * out);
    this.el.style.display = "flex";
    this.el.style.opacity = `${Math.min(1, n.on)}`;
    this.el.style.left = `${cv.left + ((qx + 1) / 2) * cv.width}px`;
    this.el.style.top = `${cv.top + ((1 - qy) / 2) * cv.height}px`;
  }
  dispose(): void { this.el.remove(); }
}
