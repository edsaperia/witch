// MOCKUP (Ed, 2026-10-12: "it might make sense for ground-placed sigils to be off the pixel grid ... They're really UI elements,
// so need to be easy to distinguish"): every sigil the leash glyph atlas draws (placed sigils, happy creatures' runes, the ghost of
// the next, a dropped flask, the treetop projection, the stack over her hat, a knocked-out one's grey sigil walking home) drawn at
// the screen's own resolution from the sigils' vector strokes (art/sigils.js sigilMark), instead of as art-pixel glyphs in the
// game's low-resolution picture. Still under the tilt-shift (Ed: "this *should* affect sigils"): each is blurred by its height on
// screen exactly as the world there (render/overlayTilt.ts, as the 💌s and bubbles are), so near ones are crisp, far ones soft.
// ?runes=grid (today's), smooth (off the grid: crisp lines, the glow soft as the light effects') or ui (smooth, thinner lines, and a ring by state: parked solid, ready to pick up dashed and bright, happy dashed and faint).
// Not for merging as is.
import * as THREE from "three";
import { placed } from "./height";
import { overlayBlur } from "./overlayTilt";
import { sigilMark } from "../../art/sigils.js";
import { SLOT } from "./leash/glyphs";

export type RuneMode = "grid" | "smooth" | "ui";
export const RUNE_MODE: RuneMode = (() => {
  try { const m = new URLSearchParams(location.search).get("runes"); return m === "smooth" || m === "ui" ? m : "grid"; } catch { return "grid"; }
})();
export type RuneState = "parked" | "happy" | "ready" | "other";

/** A sigil to draw this frame, as the atlas instance it replaces: where (m), its quad's size (m), flat on the ground or upright
 *  (facing the screen), its creature, its colour (0..1, may pass 1), how bright, how far written on, and its state. */
export interface Rune { x: number; y: number; z: number; size: number; upright: boolean; species: string; level: number; legendary: boolean; r: number; g: number; b: number; a: number; draw: number; state: RuneState }
type Mark = { strokes: { dot?: boolean; pts: number[][]; w: number; r?: number; part: string; start?: number; end?: number }[] };

export class RuneOverlay {
  readonly canvas = document.createElement("canvas");
  private ctx = this.canvas.getContext("2d")!;
  private runes: Rune[] = [];
  private v = new THREE.Vector3();
  private right = new THREE.Vector3();
  private scratch = document.createElement("canvas");
  private sctx = this.scratch.getContext("2d")!;
  constructor(private readonly game: HTMLCanvasElement) {
    this.canvas.style.cssText = "position:fixed;pointer-events:none;z-index:2";
    (game.parentElement ?? document.body).appendChild(this.canvas);
  }
  add(r: Rune): void { this.runes.push(r); }
  /** A new frame's sigils (a frame the view doesn't draw leaves its own behind otherwise). */
  clear(): void { this.runes.length = 0; }

  /** Draw this frame's sigils over the game, then forget them. */
  draw(camera: THREE.Camera): void {
    const rect = this.game.getBoundingClientRect(), dpr = window.devicePixelRatio || 1, W = Math.round(rect.width * dpr), H = Math.round(rect.height * dpr);
    if (this.canvas.width !== W || this.canvas.height !== H) { this.canvas.width = W; this.canvas.height = H; }
    Object.assign(this.canvas.style, { left: `${rect.left}px`, top: `${rect.top}px`, width: `${rect.width}px`, height: `${rect.height}px` });
    const main = this.ctx;
    main.setTransform(1, 0, 0, 1, 0, 0); main.clearRect(0, 0, W, H);
    const ctx = this.sctx;
    const scr = (x: number, y: number, z: number) => { placed(this.v.set(x, y, z)).project(camera); return [(this.v.x + 1) / 2 * W, (1 - this.v.y) / 2 * H, this.v.z] as const; };
    this.right.setFromMatrixColumn(camera.matrixWorld, 0);
    // the flat ones first (on the ground), then the upright (over it); within each, the further first
    const list = this.runes.sort((a, b) => (+a.upright - +b.upright) || (a.z - b.z));
    const ui = RUNE_MODE === "ui";
    for (const R of list) {
      const c = scr(R.x, R.y, R.z); if (c[2] > 1 || c[0] < -200 || c[0] > W + 200 || c[1] < -200 || c[1] > H + 200) continue;
      const box = R.size * (SLOT - 2) / SLOT; // (the glyph's unit box within its atlas quad)
      let ax: number[], az: number[];
      if (R.upright) { const e = scr(R.x + this.right.x * box / 2, R.y + this.right.y * box / 2, R.z + this.right.z * box / 2), h = Math.hypot(e[0] - c[0], e[1] - c[1]); ax = [h, 0]; az = [0, h]; }
      else { const ex = scr(R.x + box / 2, R.y, R.z), ez = scr(R.x, R.y, R.z + box / 2); ax = [ex[0] - c[0], ex[1] - c[1]]; az = [ez[0] - c[0], ez[1] - c[1]]; }
      const px = Math.hypot(ax[0], ax[1]) * 2; // (its unit box across, in screen pixels)
      if (px < 2) continue;
      // drawn into a scratch box round it, then put down in one go (blurred once, by the tilt-shift)
      const half = Math.ceil((Math.abs(ax[0]) + Math.abs(az[0]) + Math.abs(ax[1]) + Math.abs(az[1])) * 0.75 + px * 0.3 + 8 * dpr), S = half * 2;
      if (this.scratch.width < S || this.scratch.height < S) { this.scratch.width = Math.max(this.scratch.width, S); this.scratch.height = Math.max(this.scratch.height, S); }
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, S, S);
      const o0 = [half, half];
      const at = (u: number, v: number) => [o0[0] + ax[0] * (u - 0.5) * 2 + az[0] * (v - 0.5) * 2, o0[1] + ax[1] * (u - 0.5) * 2 + az[1] * (v - 0.5) * 2];
      const M = sigilMark(R.species, R.level, R.legendary) as Mark;
      const col = (k: number, a: number) => `rgba(${Math.round(Math.min(1, R.r * k) * 255)},${Math.round(Math.min(1, R.g * k) * 255)},${Math.round(Math.min(1, R.b * k) * 255)},${a})`;
      const alpha = Math.max(0, Math.min(1, R.a)), drawn = Math.max(0, Math.min(1, R.draw)); if (alpha <= 0.01 || drawn <= 0) continue;
      const ring = ui && R.state !== "other";
      const path = (widen: number) => {
        for (const s of M.strokes) {
          if (ring && s.part !== "sigil") continue; // (ui: the state's own ring below, in place of the level's frame)
          if (s.start !== undefined && s.start >= drawn) continue;
          ctx.beginPath();
          if (s.dot || s.pts.length === 1) { const p = at(s.pts[0][0], s.pts[0][1]); ctx.arc(p[0], p[1], Math.max(0.8 * dpr, (s.r ?? s.w) * px * (ui ? 0.8 : 1) + widen / 2), 0, Math.PI * 2); ctx.fill(); continue; }
          s.pts.forEach((q, i) => { const p = at(q[0], q[1]); if (i) ctx.lineTo(p[0], p[1]); else ctx.moveTo(p[0], p[1]); });
          ctx.lineWidth = Math.max(1.1 * dpr, s.w * px * (ui ? 0.75 : 1)) + widen; ctx.stroke();
        }
      };
      const ellipse = (rk: number) => { ctx.beginPath(); ctx.ellipse(o0[0], o0[1], Math.hypot(ax[0], ax[1]) * rk, Math.hypot(az[0], az[1]) * rk, Math.atan2(ax[1], ax[0]), 0, Math.PI * 2); };
      // the tilt-shift: as the world is blurred at this height on screen (a Gaussian's deviation, CSS px)
      const blur = overlayBlur(c[1] / dpr) * dpr;
      ctx.lineCap = "round"; ctx.lineJoin = "round";
      if (ring) {
        // the state's ring: parked, a solid ring in its colour; ready to pick up, a bright dashed one; happy, a faint dashed one
        const rk = 0.96, dash = R.state === "parked" ? [] : [px * 0.07, px * 0.06], lw = Math.max(1.2 * dpr, px * 0.03);
        ctx.setLineDash(dash);
        ctx.shadowColor = col(1, 1); ctx.shadowBlur = px * 0.18; ctx.strokeStyle = R.state === "happy" ? col(1.1, 0.55 * alpha) : col(1.25, alpha); ctx.lineWidth = lw; ellipse(rk); ctx.stroke();
        ctx.setLineDash([]); ctx.shadowBlur = 0;
      }
      // the glow: soft, as the game's light is (a blur at screen resolution, added)
      ctx.globalCompositeOperation = "lighter"; ctx.shadowColor = col(1, 1); ctx.shadowBlur = Math.max(2 * dpr, px * 0.16);
      ctx.strokeStyle = ctx.fillStyle = col(1, 0.5 * alpha); path(ui ? px * 0.01 : px * 0.03);
      ctx.shadowBlur = 0;
      // the line: crisp, its colour toward white at the core
      ctx.globalCompositeOperation = ui ? "source-over" : "lighter";
      ctx.strokeStyle = ctx.fillStyle = col(ui ? 1.45 : 1.25, (ui ? 1 : 0.9) * alpha); path(0);
      ctx.globalCompositeOperation = "source-over";
      main.filter = blur > 0.2 ? `blur(${blur.toFixed(2)}px)` : "none";
      main.drawImage(this.scratch, 0, 0, S, S, Math.round(c[0] - half), Math.round(c[1] - half), S, S);
      main.filter = "none";
    }
    this.runes = [];
  }
}
