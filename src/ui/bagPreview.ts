// A bag's little looping "firing" animation for the bags station's list (Ed, 2026-10-29: "The bag menu should also show little
// animations of each bag \"firing\", a vertical list you move down to select"; the list is Lima's, ui/stationPanel.ts). Each draws its
// bag's toy scene (ui/bagSim.ts: the real 💌 rules with the bag's stats) on a small pixel canvas: her on the left, the creatures on
// the right flashing as letters land, her reach a faint line. Cheap until it runs: no canvas work and no rules state till the first
// run(true); stopped, it does nothing and holds its frame. Every running preview shares one requestAnimationFrame at 30 fps.
import { BagSim, VIEW } from "./bagSim";
import type { Tuning } from "../rules/tuning";

/** Art pixels per CSS pixel: drawn at half size, scaled up sharp (the game's pixel look). */
const PX = 2;
/** Frames a second the previews draw at, and the dim of one not in focus (0 none, 1 black). */
const FPS = 30, DIM = 0.35;
const INK = { ground: "#1d1630", reach: "rgba(255,150,210,.28)", her: "#f2c14e", letter: "#ff8fd0", trail: "rgba(255,143,208,.35)", creature: "#7fd6b0", hit: "#fff3a8" };

const running = new Set<BagPreview>();
let rafId = 0, last = 0;
function tick(now: number): void {
  rafId = running.size ? requestAnimationFrame(tick) : 0;
  if (now - last < 1000 / FPS - 2) return;
  const dt = Math.min(0.1, last ? (now - last) / 1000 : 1 / FPS);
  last = now;
  for (const p of running) p.frame(dt);
}

export class BagPreview {
  readonly el: HTMLCanvasElement = document.createElement("canvas");
  private sim: BagSim | null = null;
  private g: CanvasRenderingContext2D | null = null;
  private focused = false;
  private disposed = false;
  private readonly tuning?: Tuning;

  constructor(readonly bag: string, opts: { w: number; h: number; style?: unknown; tuning?: Tuning }) {
    this.tuning = opts.tuning;
    this.el.className = "bag-preview";
    this.resize(opts.w, opts.h);
  }

  /** Its size in CSS pixels (drawn at half that, sharp). */
  resize(w: number, h: number): void {
    this.el.width = Math.max(8, Math.round(w / PX)); this.el.height = Math.max(4, Math.round(h / PX));
    this.el.style.cssText = `width:${w}px;height:${h}px;image-rendering:pixelated;display:block`;
    if (this.sim) this.draw();
  }

  /** Start or stop its loop. Stopped, no frames, no steps; it keeps its last picture (a still first frame before it ever ran). */
  run(on: boolean): void {
    if (this.disposed) return;
    if (on) {
      this.sim ??= new BagSim(this.bag, this.tuning);
      if (!running.has(this)) { running.add(this); if (!rafId) { last = 0; rafId = requestAnimationFrame(tick); } }
      this.draw();
    } else running.delete(this);
  }

  /** The bag in focus: at full brightness; the rest a little dimmed. Same speed either way. */
  focus(on: boolean): void { if (on !== this.focused) { this.focused = on; if (this.sim) this.draw(); } }

  /** Let it go (the panel shut, or the list rebuilt). */
  dispose(): void { this.disposed = true; running.delete(this); this.sim = null; this.g = null; }

  /** A frame of the shared loop: the scene on by dt, then drawn. */
  frame(dt: number): void { if (!this.sim) return; this.sim.step(dt); this.draw(); }

  private draw(): void {
    const s = this.sim; if (!s) return;
    const g = (this.g ??= this.el.getContext("2d")); if (!g) return;
    const W = this.el.width, H = this.el.height, k = W / (VIEW.x1 - VIEW.x0);
    const X = (x: number) => Math.round((x - VIEW.x0) * k), Z = (z: number) => Math.round(H / 2 + z * Math.min(k, H / 2 / VIEW.halfZ));
    g.fillStyle = INK.ground; g.fillRect(0, 0, W, H);
    // her reach: a faint line where her letters give out
    g.fillStyle = INK.reach; g.fillRect(X(s.t.invites.range), 0, 1, H);
    // the creatures, flashing as a letter lands
    for (const d of s.dummies) { g.fillStyle = s.time - d.hitAt < 0.15 ? INK.hit : INK.creature; g.fillRect(X(d.x) - 2, Z(d.z) - 2, 5, 5); }
    // the letters, each with a short trail back along its flight
    for (const L of s.inv.letters) {
      const v = Math.hypot(L.vx, L.vz) || 1;
      g.fillStyle = INK.trail; for (const back of [1.5, 3]) g.fillRect(X(L.x - (L.vx / v) * back), Z(L.z - (L.vz / v) * back), 1, 1);
      g.fillStyle = INK.letter; g.fillRect(X(L.x) - 1, Z(L.z) - 1, 3, 2);
    }
    // her
    g.fillStyle = INK.her; g.fillRect(X(0) - 2, Z(0) - 3, 4, 6);
    if (!this.focused) { g.fillStyle = `rgba(0,0,0,${DIM})`; g.fillRect(0, 0, W, H); }
  }
}
