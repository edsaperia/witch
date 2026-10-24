// The on-loan icon (Ed, 2026-10-24, previews/ed/finds-on-loan 1-hud-icon: "a small HUD icon of the find in a faint ring of its
// constellation, twinkling until dawn"; top left): while tonight's find is on loan (rules/finds.ts loanFind: taken, not yet slept
// on), its own find art in a dark disc, a faint ring round it and its constellation's stars (rules/constellations.ts OUTLINES)
// twinkling one by one. Gone as she sleeps (main.ts: the loan's settled then), and with no loan.
import { OUTLINES } from "../rules/constellations";

/** Its size on screen (CSS px) and the ring's radius in it. */
const SIZE = 72, R = 30;

export class LoanIcon {
  readonly canvas: HTMLCanvasElement;
  private x: CanvasRenderingContext2D;
  private item: string | null = null;
  private art: HTMLCanvasElement | null = null;
  private shown = false;

  constructor(parent: HTMLElement = document.body) {
    this.canvas = document.createElement("canvas");
    this.canvas.id = "loan-icon";
    this.canvas.width = this.canvas.height = SIZE;
    this.canvas.style.cssText = `position:fixed;left:8px;top:8px;width:${SIZE}px;height:${SIZE}px;z-index:2;pointer-events:none;image-rendering:pixelated;display:none`;
    this.x = this.canvas.getContext("2d")!;
    parent.append(this.canvas);
  }

  /** Tonight's loan (its item and its find art), or null: none, or slept on. */
  set(item: string | null, art: () => HTMLCanvasElement | null): void {
    if (item !== this.item) { this.item = item; this.art = item ? art() : null; }
    const on = !!item;
    if (on !== this.shown) { this.shown = on; this.canvas.style.display = on ? "block" : "none"; }
  }

  /** A frame at real time `t` (s): the stars twinkling. */
  draw(t: number): void {
    if (!this.shown || !this.item) return;
    const x = this.x, c = SIZE / 2, O = OUTLINES[this.item];
    x.clearRect(0, 0, SIZE, SIZE);
    x.imageSmoothingEnabled = false;
    x.fillStyle = "rgba(14,11,28,0.55)"; x.beginPath(); x.arc(c, c, R + 4, 0, Math.PI * 2); x.fill();
    x.strokeStyle = "rgba(200,214,255,0.22)"; x.lineWidth = 1; x.beginPath(); x.arc(c, c, R, 0, Math.PI * 2); x.stroke();
    if (O) {
      // (its outline is about 15° across: scaled to fill the ring)
      const k = (R * 0.95) / 8, P = O.stars.map(([sx, sy]) => [c + sx * k, c - sy * k] as const);
      x.strokeStyle = "rgba(200,214,255,0.18)";
      for (const [i, j] of O.lines) { x.beginPath(); x.moveTo(P[i][0], P[i][1]); x.lineTo(P[j][0], P[j][1]); x.stroke(); }
      P.forEach(([px, py], i) => {
        const b = 0.55 + 0.45 * Math.max(0, Math.sin(t * Math.PI * 2 * 0.5 + i * 1.7));
        const g = x.createRadialGradient(px, py, 0, px, py, 5); g.addColorStop(0, `rgba(255,240,200,${0.5 * b})`); g.addColorStop(1, "rgba(255,240,200,0)");
        x.fillStyle = g; x.fillRect(px - 5, py - 5, 10, 10);
        x.fillStyle = `rgba(255,240,200,${b})`; x.fillRect(Math.round(px - 1), Math.round(py - 1), 2, 2);
      });
    }
    const a = this.art;
    if (a) { const m = Math.max(a.width, a.height), s = m > 34 ? 34 / m : Math.floor(34 / m), w = Math.round(a.width * s), h = Math.round(a.height * s); x.drawImage(a, Math.round(c - w / 2), Math.round(c - h / 2), w, h); }
  }
}
