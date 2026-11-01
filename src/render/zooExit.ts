// The zoo's little treehouse (the coordinator on Ed's zoo, 2026-10-26: "Just north of the Ent circle ... a miniature of the
// treehouse oak, about twice her height ... a usable object ... the keycap prompt, plus the word 'exit' next to the keycap"; rules/
// zoo.ts zooExitSpot, atZooExit): the treehouse's own art (the old treehouse, art/treehouse.js: the zoo has no deck) shrunk to
// twice her height as drawn (miniTall), its trunk's foot on the spot; lit, breathing, while E there leaves (the house's objects' gold: render/useGlow.ts),
// and over it the keycap (the use button as bound: E, the pad's ✕, a tap) with "exit" beside it (render/houseRooms.ts's wake-up words). Drawing only.
import type { SpriteInstance } from "./sprites";
import { SPRITE_UNIFORMS } from "./sprites";
import { keycapCanvas } from "../ui/keyHint";
import { useGlyph } from "./houseRooms";
import { atZooExit, zooExitSpot } from "../rules/zoo";
import type { View } from "./view";

/** How tall the little treehouse stands (m): twice her as she's drawn (render/view/witch.ts witchTall), else 4.2. */
export const miniTall = (v: View): number => 2 * (v.witchTall || 2.1);

/** The little treehouse's sprites (its base and its crown, both always: it's no taller than a bush), or none outside the zoo. */
export function miniTreehouse(v: View, angle: number): SpriteInstance[] {
  const s = zooExitSpot(v.game.map);
  if (!s) return [];
  const T = v.assets.treehouse, f = T.atlas.frames, mpp = v.mpp, U = SPRITE_UNIFORMS.uUp.value, R = SPRITE_UNIFORMS.uRight.value;
  const pad = f[0].pad ?? 0, k = miniTall(v) / Math.max(1, (f[0].h - 2 * pad) * mpp), pitch = (angle * Math.PI) / 180;
  const upOnScreen = U.dot(v.v3.set(0, Math.cos(pitch), -Math.sin(pitch))), below = Math.max(0, f[0].h - pad - T.base.y) * mpp * k;
  const ox = (T.base.x - f[0].w / 2) * mpp * k, d = pad * mpp * k;
  // (as placeTreehouse stands the big one: its roots below the foot lie on the ground nearer the camera)
  const x = s.x - R.x * ox - U.x * d, z = s.z + (below * upOnScreen) / Math.max(0.2, Math.sin(pitch)) - R.z * ox - U.z * d;
  const lit = atZooExit(v.game.map, v.game.witch) ? 0.18 + 0.12 * Math.cos((2 * Math.PI * v.game.clock.time) / 1.4) : 0;
  return [f[0], f[1]].filter(Boolean).map(frame => ({ x, y: -U.y * d, z, frame, flip: false, scale: k, glow: lit }));
}

/** Its prompt over it: the keycap and "exit", while she's there on the ground. */
export class ZooExitTag {
  private readonly el = document.createElement("div");
  private key = "";
  private tap: ((down: boolean) => void) | null = null;
  constructor() {
    this.el.id = "zoo-exit-tag";
    this.el.style.cssText = "position:fixed;z-index:11;pointer-events:none;display:none;transform:translate(-50%,-100%);align-items:center;gap:8px;font:700 15px/1 ui-monospace,monospace;color:#f3e8ff;text-shadow:0 1px 0 #1a1022,0 0 4px #1a1022;filter:drop-shadow(0 0 3px rgba(255,214,140,.55))";
    // (on a touch screen the prompt is the button, as the house's are)
    this.el.addEventListener("pointerdown", e => { if (this.tap) { e.preventDefault(); this.tap(true); } });
    for (const ev of ["pointerup", "pointerleave", "pointercancel"]) this.el.addEventListener(ev, () => this.tap?.(false));
    document.body.append(this.el);
  }
  update(v: View): void {
    const g = v.game, s = zooExitSpot(g.map);
    if (!s || !atZooExit(g.map, g.witch) || g.zooExit !== undefined) { this.el.style.display = "none"; this.tap = null; return; }
    const cv = v.canvas.getBoundingClientRect(), px = Math.max(2, Math.round(cv.width / Math.max(1, v.width))), glyph = useGlyph(v.useDevice), key = `${glyph}|${px}`;
    if (key !== this.key) {
      this.key = key;
      const word = document.createElement("span"); word.textContent = "exit";
      this.el.replaceChildren(keycapCanvas(glyph, px), word);
    }
    this.tap = v.useDevice === "touch" ? v.onUse : null;
    this.el.style.pointerEvents = this.tap ? "auto" : "none";
    const q = v.v3.set(s.x, miniTall(v) + 0.6, s.z).project(v.camera);
    this.el.style.display = "flex";
    this.el.style.left = `${cv.left + ((q.x + 1) / 2) * cv.width}px`;
    this.el.style.top = `${cv.top + ((1 - q.y) / 2) * cv.height}px`;
  }
  dispose(): void { this.el.remove(); }
}
