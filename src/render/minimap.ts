// Debug minimap (M): the map's areas as a grid of cells — home, the areas the party has woken,
// the next to wake, and the picker's other candidates — for watching how the party spreads.
import type { ForestMap } from "../rules/map";
import { pickSet, type PartyState } from "../rules/party";

export class Minimap {
  on = false;
  private canvas = document.createElement("canvas");
  private g: CanvasRenderingContext2D;
  private key = "";

  constructor(parent: HTMLElement, private map: ForestMap) {
    const n = map.n, k = Math.max(4, Math.floor(220 / n));
    this.canvas.width = this.canvas.height = n * k;
    Object.assign(this.canvas.style, { position: "fixed", left: "12px", bottom: "48px", imageRendering: "pixelated", border: "1px solid #3a2f5c", background: "rgba(8,6,18,.85)", zIndex: "3", display: "none", pointerEvents: "none" });
    parent.appendChild(this.canvas);
    this.g = this.canvas.getContext("2d")!;
  }

  update(p: PartyState, wx: number, wz: number): void {
    this.canvas.style.display = this.on ? "block" : "none";
    if (!this.on) return;
    const m = this.map, n = m.n, k = this.canvas.width / n, key = `${p.wave}|${p.areas.size}|${Math.round(wx / 20)},${Math.round(wz / 20)}`;
    if (key === this.key) return;
    this.key = key;
    const cand: [number, number][] = [];
    pickSet(p, m, p.areasPerWave, cand); // the candidates the pick of next chose among (the same state, so the same pick)
    const g = this.g, isCand = new Set(cand.map(c => `${c[0]},${c[1]}`)), nextSet = new Set(p.next.map(c => `${c[0]},${c[1]}`));
    g.clearRect(0, 0, n * k, n * k);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const c = `${x},${y}`, a = p.areas.get(c);
      g.fillStyle = c === `${m.centreCell[0]},${m.centreCell[1]}` ? "#ff6fcf" : a ? `hsl(${300 - Math.min(200, a.wave * 12)},80%,55%)` : nextSet.has(c) ? "#ffe25c" : isCand.has(c) ? "#6a5a20" : "#1d1830";
      g.fillRect(x * k + 0.5, y * k + 0.5, k - 1, k - 1);
    }
    // Where she is.
    const A = m.areaSize;
    g.fillStyle = "#fff";
    g.fillRect(Math.floor((wx / A) * k) - 1, Math.floor((wz / A) * k) - 1, 3, 3);
  }
}
