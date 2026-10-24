// A thing on loan sparkling in the treehouse (Ed, 2026-10-24: no words, "but they're sparkly somehow, at the stations and on the
// hats' floor"; previews/ed/finds-on-loan 8-sparkle-hats-floor): over the game, round each point it's given (a loaned hat lying on
// the hats' floor: render/houseRooms.ts), a breathing halo of the finds' pale gold-white, eight four-point pixel glints, dark-rimmed, twinkling each
// on its own phase, and a mote or two rising. The stations' cards sparkle the same way in their own CSS (ui/stationPanel.ts).
import { glint } from "./dream";

export class LoanSparkle {
  readonly canvas: HTMLCanvasElement;
  private x: CanvasRenderingContext2D;
  private on = false;

  constructor(parent: HTMLElement = document.body) {
    this.canvas = document.createElement("canvas");
    this.canvas.className = "loan-sparkle";
    this.canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;z-index:1;pointer-events:none;image-rendering:pixelated;display:none";
    this.x = this.canvas.getContext("2d")!;
    parent.append(this.canvas);
  }

  /** This frame's sparkles: screen points (CSS px) and their reach (px), at real time `t` (s), `P` the game's pixel on screen. */
  draw(points: readonly { x: number; y: number; r: number }[], t: number, P: number): void {
    if (!points.length) { if (this.on) { this.on = false; this.canvas.style.display = "none"; } return; }
    if (!this.on) { this.on = true; this.canvas.style.display = "block"; }
    const c = this.canvas, W = innerWidth, H = innerHeight, x = this.x;
    if (c.width !== W || c.height !== H) { c.width = W; c.height = H; }
    x.clearRect(0, 0, W, H);
    c.dataset.at = points.map(p => `${Math.round(p.x)},${Math.round(p.y)}`).join(" "); // (where, for the tools: tools/loan/shots.cjs)
    for (const p of points) {
      const h = 0.1 + 0.05 * Math.sin(t * 2.6), g = x.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 1.4);
      g.addColorStop(0, `rgba(255,236,190,${h})`); g.addColorStop(1, "rgba(255,236,190,0)");
      x.fillStyle = g; x.fillRect(p.x - p.r * 2, p.y - p.r * 2, p.r * 4, p.r * 4);
      for (let i = 0; i < 8; i++) {
        const a = hash(i, 7) * Math.PI * 2, d = p.r * (0.45 + 0.6 * hash(i, 3)), ph = (t * 0.6 + hash(i, 1)) % 1;
        glint(x, p.x + Math.cos(a) * d, p.y + Math.sin(a) * d * 0.7, Math.pow(Math.max(0, Math.sin(ph * Math.PI * 2)), 0.5), P, true); // (bright for longer: seen in a glance)
      }
      for (let i = 0; i < 2; i++) {
        const k = (t * 0.6 + i * 0.5) % 1;
        x.fillStyle = `rgba(255,236,190,${0.8 * Math.sin(k * Math.PI)})`;
        x.fillRect(Math.round(p.x - p.r * 0.3 + i * p.r * 0.6), Math.round(p.y - k * p.r * 1.6), P, P);
      }
    }
  }
}
const hash = (a: number, b: number) => { const v = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return v - Math.floor(v); };
