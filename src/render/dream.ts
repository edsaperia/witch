// Her dream of tonight's loan (Ed, 2026-10-24, previews/ed/finds-on-loan: "when she's asleep (after going to bed, or after starting
// a sail), we can communicate through her dreams - this would be a good time to tell her whether she has unlocked something or not"):
// asleep after a night with a find on loan (app/loan.ts), a dream cloud rises over her in the dark, in the legends' dream family
// (render/thoughtCloud.ts: the same cloud and puffs, the amber ink and dark fill, on the game's pixel grid), and in it the find's
// constellation, lit (rules/constellations.ts). The night won, its stars gather and fade into the place in the treehouse where
// the find will live (Ed: "the hats' floor for a hat, the pegboard or broom bay for a broom part, the wardrobe, shoe rack or cloak
// pegs for clothes, the bags for a bag"), drawn by the house's own furniture art (render/houseFurniture.ts), the find lying there
// in its own find art, sparkling, "The Sentry hat is yours" under it. Not won, the stars drift apart out of the cloud and fade, the
// find fading with them: "The Sentry hat went back to the stars". It runs on its own clock (the night's frames stand still while
// the next island's made) and ends by itself or on any key, click or touch; main.ts then rings her alarm (rules/wakeUp.ts endDream).
import * as Art from "../../art/generator.js";
import { furnitureSprite } from "../../art/furniture.js";
import { thoughtShape, type ThoughtShape } from "./thoughtCloud";
import { litCanvas, standing, type Drawn } from "./houseFurniture";
import { OUTLINES } from "../rules/constellations";
import { HOUSE_ROOMS } from "../rules/houseRooms";
import type { Style } from "./style";

/** What the dream shows: the find (its kind and id, its name as said, its find art's piece id), the verdict, and its home's house object. */
export interface DreamOf { item: string; name: string; piece: string; won: boolean; home: string }

/** How long each dream runs (s): won, a little longer, to see where it went. */
export const DREAM_SECONDS = { won: 8, lost: 5.5 };
/** The legends' dream ink and fill (render/leash/bubbles.ts DREAM_INK, DREAM_FILL), the fill a touch denser over the dark. */
const INK = "rgba(232,180,106,0.8)", FILL = "rgba(20,14,34,0.82)";
const ease = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t));
const hash = (a: number, b: number) => { const v = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return v - Math.floor(v); };

/** The pictures a dream draws: its home's furniture and the find, each lit in the house's light (null: not drawn, its words only). */
export interface DreamArt { home: HTMLCanvasElement | null; find: HTMLCanvasElement | null }

/** Its home's furniture and the find's own art, baked and lit now (a piece is tens of milliseconds: once, as she falls asleep). */
export function dreamArt(d: Pick<DreamOf, "home" | "piece">, st: Style): DreamArt {
  let home: HTMLCanvasElement | null = null;
  const find = findCanvas(d.piece, st);
  try {
    const o = HOUSE_ROOMS.objects.find(q => q.id === d.home);
    if (o) { const { foot } = standing(o); home = litCanvas(furnitureSprite(o.id, foot, st, { ppm: 22, pitch: 0.62, yaw: 0, curve: 0 }) as Drawn, o.room, st, 1, o.id); }
  } catch { home = null; }
  return { home, find };
}

/** A find's own art (art/country.js's find pieces, rules/finds.ts findPiece), baked and lit in the house's light, or null. */
export function findCanvas(piece: string, st: Style): HTMLCanvasElement | null {
  try {
    const p = (Art.scenePiece as (id: string, st: Style) => { sprite: { whole: Drawn["sp"]; origin: { x: number; y: number } }; colours: Record<string, number[]> })(piece, st);
    return litCanvas({ sp: p.sprite.whole, origin: p.sprite.origin, lights: [] }, "bedroom", st, 1, "", p.colours);
  } catch { return null; }
}

/** The dream over the page: its own canvas over the sleep's dark (render/wakeUp.ts's veil), under its card. */
export class DreamView {
  readonly canvas: HTMLCanvasElement;
  private x: CanvasRenderingContext2D;
  private t0 = 0;
  private raf = 0;
  private endAt = Infinity;
  /** Over: it ran to its end, or a key ended it (it fades out quickly, then is gone). */
  over = false;
  /** Called once as it's over (main.ts: the alarm). */
  onOver: (() => void) | null = null;
  private keys = (): void => this.end();

  /** `veil`: its own dark under it, as the sleep's (render/wakeUp.ts), for a dream shown over a night that isn't asleep (?dream=). */
  constructor(private d: DreamOf, private art: DreamArt, private veil = false, private now: () => number = () => performance.now() / 1000) {
    this.canvas = document.createElement("canvas");
    this.canvas.id = "dream";
    this.canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;z-index:9;pointer-events:none;image-rendering:pixelated";
    this.x = this.canvas.getContext("2d")!;
  }

  /** In and playing, from now (`manual`: drawn only by draw(), for the shot tools). */
  play(manual = false): this {
    document.body.append(this.canvas);
    this.t0 = this.now();
    for (const e of ["keydown", "pointerdown", "touchstart"]) addEventListener(e, this.keys, { capture: true });
    if (!manual) { const loop = () => { this.raf = requestAnimationFrame(loop); this.draw(); }; loop(); }
    return this;
  }

  /** Ended now (a key, or the rules' wake-up having moved on): a quick fade, then gone. */
  end(): void {
    if (this.over) return;
    this.over = true;
    this.endAt = this.now();
    this.onOver?.();
  }

  /** Gone at once (a new night, the page leaving). */
  dispose(): void {
    cancelAnimationFrame(this.raf);
    for (const e of ["keydown", "pointerdown", "touchstart"]) removeEventListener(e, this.keys, { capture: true });
    this.canvas.remove();
  }

  /** A frame at its own time (or `at`, seconds in: the shot tools). */
  draw(at?: number): void {
    const t = at ?? this.now() - this.t0, D = this.d, total = D.won ? DREAM_SECONDS.won : DREAM_SECONDS.lost;
    if (!this.over && t >= total) this.end();
    const out = this.over ? Math.min(1, (this.now() - this.endAt) / 0.5) : 0;
    if (out >= 1 && at === undefined) { this.dispose(); return; }
    const W = innerWidth, H = innerHeight, c = this.canvas;
    if (c.width !== W || c.height !== H) { c.width = W; c.height = H; }
    const x = this.x;
    x.clearRect(0, 0, W, H);
    x.imageSmoothingEnabled = false;
    if (this.veil) { const g = x.createRadialGradient(W / 2, H * 0.55, 0, W / 2, H * 0.55, Math.hypot(W, H) * 0.6); g.addColorStop(0, `rgba(4,4,14,${0.55 * (1 - out)})`); g.addColorStop(1, `rgba(2,2,8,${0.92 * (1 - out)})`); x.fillStyle = g; x.fillRect(0, 0, W, H); }
    // the cloud: on the game's grid at this size, its foot over her (the middle of the screen, a little low: the camera's on her)
    const P = Math.max(2, Math.round(Math.min(W, H) / 240)), S = thoughtShape(70, 3), fade = (1 - out) * (1 - ease((t - (total - 0.8)) / 0.8));
    const fx = Math.round(W / 2), fy = Math.round(Math.min(H * 0.66, H - 120));
    const L = fx - S.foot.x * P, T = Math.max(4, fy - S.foot.y * P), grow = ease(t / 0.8);
    this.cloud(S, L, T, P, grow, fade);
    if (grow < 0.9 || fade <= 0) return;
    const bx = L + S.box.x * P, by = T + S.box.y * P, n = S.box.n * P, cx = bx + n / 2, cy = by + n * 0.42;
    const O = OUTLINES[D.item], deg = n / 26;
    const stars = O ? O.stars.map(([sx, sy]) => [cx + sx * deg, cy - sy * deg] as [number, number]) : [];
    x.globalAlpha = fade;
    if (D.won) this.won(t, stars, O?.lines ?? [], { bx, by, n, cx, cy, P }, L + S.w * P);
    else this.lost(t, stars, O?.lines ?? [], { cx, cy, n, P }, L + S.w * P, by);
    x.globalAlpha = 1;
  }

  private cloud(S: ThoughtShape, L: number, T: number, P: number, grow: number, fade: number): void {
    const x = this.x;
    for (let i = 0; i < S.px.length; i++) {
      const v = S.px[i];
      if (!v) continue;
      const qx = i % S.w, qy = (i / S.w) | 0;
      if ((S.foot.y - qy) / S.foot.y > grow * 1.05) continue; // (it rises from her: the puffs first, then the cloud)
      x.globalAlpha = fade;
      x.fillStyle = v === 1 ? INK : FILL;
      x.fillRect(L + qx * P, T + qy * P, P, P);
    }
    x.globalAlpha = 1;
  }

  /** The night won: lit, then its stars gather and fade into its home, the find there, sparkling, and its words. */
  private won(t: number, stars: [number, number][], lines: [number, number][], B: { bx: number; by: number; n: number; cx: number; cy: number; P: number }, right: number): void {
    const x = this.x, into = ease((t - 2.2) / 1.4), home = ease((t - 2.6) / 1.2);
    // its home and the find, coming in as the stars go
    if (home > 0) {
      const box = B.n * 0.92, a = this.art;
      x.save(); x.globalAlpha *= home;
      let floorY = B.by + B.n * 0.86;
      if (a.home) {
        const k = Math.max(1, Math.floor(Math.min(box / a.home.width, (box * 0.8) / a.home.height)));
        const w = a.home.width * k, h = a.home.height * k, hx = Math.round(B.cx - w / 2), hy = Math.round(B.by + B.n * 0.9 - h);
        x.drawImage(a.home, hx, hy, w, h);
        floorY = hy + h;
      }
      if (a.find) {
        const k = Math.max(B.P, Math.floor((B.n * 0.3) / Math.max(a.find.width, a.find.height)));
        const w = a.find.width * k, h = a.find.height * k, fx = Math.round(B.cx - w / 2), fy = Math.round(floorY - h - B.P * 2);
        const g = x.createRadialGradient(B.cx, fy + h / 2, 0, B.cx, fy + h / 2, w);
        g.addColorStop(0, "rgba(255,236,190,0.35)"); g.addColorStop(1, "rgba(255,236,190,0)");
        x.fillStyle = g; x.fillRect(B.cx - w, fy - h / 2, w * 2, h * 2);
        x.drawImage(a.find, fx, fy, w, h);
        for (let i = 0; i < 6; i++) glint(x, B.cx + Math.cos(i * 1.05 + t) * w * 0.8, fy + h / 2 + Math.sin(i * 1.05 + t) * h * 0.7, Math.max(0, Math.sin(t * 3 + i * 1.7)), B.P);
      }
      x.restore();
    }
    // the constellation: lit and twinkling, then gathering into the find's place and fading
    const gx = B.cx, gy = B.by + B.n * 0.62;
    const P2 = stars.map(([sx, sy]) => [sx + (gx - sx) * into, sy + (gy - sy) * into] as [number, number]);
    for (const [i, j] of lines) line(x, P2[i], P2[j], 0.6 * (1 - into));
    P2.forEach((p, i) => star(x, p[0], p[1], (1 - into * into) * (0.85 + 0.15 * Math.sin(t * 3 + i)), B.P));
    if (t > 3.4) words(x, `${cap(this.d.name)} is yours`, right + B.P * 4, B.cy, ease((t - 3.4) / 0.6), "#e8b46a");
  }

  /** Not won: the find faint in the middle, the lines going first, the stars drifting apart out of the cloud, fading, and its words. */
  private lost(t: number, stars: [number, number][], lines: [number, number][], B: { cx: number; cy: number; n: number; P: number }, right: number, by: number): void {
    const x = this.x, d = ease((t - 1.4) / 2.6), f = this.art.find;
    if (f) {
      const k = Math.max(B.P, Math.floor((B.n * 0.26) / Math.max(f.width, f.height))), w = f.width * k, h = f.height * k;
      x.save(); x.globalAlpha *= 0.6 * (1 - ease((t - 1.6) / 1.8)); x.drawImage(f, Math.round(B.cx - w / 2), Math.round(B.cy - h / 2), w, h); x.restore();
    }
    const P2 = stars.map(([sx, sy], i) => { const a = Math.atan2(sy - B.cy, sx - B.cx) + (hash(i, 1) - 0.5) * 0.9, r = d * B.n * (0.6 + 0.6 * hash(i, 2)); return [sx + Math.cos(a) * r, sy + Math.sin(a) * r - d * B.n * 0.12 * hash(i, 4)] as [number, number]; });
    for (const [i, j] of lines) line(x, P2[i], P2[j], 0.6 * Math.max(0, 1 - d * 3));
    P2.forEach((p, i) => star(x, p[0], p[1], Math.max(0, 1 - d * d * 1.1) * (0.85 + 0.15 * Math.sin(t * 3.4 + i)), B.P));
    if (t > 2.2) words(x, `${cap(this.d.name)} went back to the stars`, right + B.P * 4, by + B.n * 0.5, ease((t - 2.2) / 0.6), "#c9b8e8");
  }
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** A star on the grid: its core a grid pixel, a soft halo, a cross when bright. */
function star(x: CanvasRenderingContext2D, px: number, py: number, b: number, P: number): void {
  if (b <= 0.02) return;
  const g = x.createRadialGradient(px, py, 0, px, py, P * 4);
  g.addColorStop(0, `rgba(255,246,220,${0.5 * b})`); g.addColorStop(1, "rgba(255,246,220,0)");
  x.fillStyle = g; x.fillRect(px - P * 4, py - P * 4, P * 8, P * 8);
  const s = Math.max(2, Math.round(P * 0.7)), X = Math.round(px - s / 2), Y = Math.round(py - s / 2);
  x.fillStyle = `rgba(255,246,220,${Math.min(1, b)})`; x.fillRect(X, Y, s, s);
  if (b > 0.7) { x.fillStyle = `rgba(255,246,220,${b - 0.6})`; x.fillRect(X - s, Y, s * 3, s); x.fillRect(X, Y - s, s, s * 3); }
}
function line(x: CanvasRenderingContext2D, a: [number, number], b: [number, number], alpha: number): void {
  if (alpha <= 0 || !a || !b) return;
  x.strokeStyle = `rgba(200,214,255,${alpha})`; x.lineWidth = 1; x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); x.stroke();
}
/** A loan's glint (the same four-point pixel star as the treehouse's sparkle: render/loanSparkle.ts). */
export function glint(x: CanvasRenderingContext2D, px: number, py: number, b: number, P: number): void {
  if (b <= 0.05) return;
  const k = Math.max(2, Math.round(P * 0.7)), X = Math.round(px / k) * k, Y = Math.round(py / k) * k, arm = b > 0.6 ? 2 : 1;
  x.fillStyle = `rgba(255,244,214,${b})`; x.fillRect(X, Y, k, k);
  x.fillStyle = `rgba(255,226,160,${b * 0.75})`;
  for (let i = 1; i <= arm; i++) { x.fillRect(X + i * k, Y, k, k); x.fillRect(X - i * k, Y, k, k); x.fillRect(X, Y + i * k, k, k); x.fillRect(X, Y - i * k, k, k); }
}
function words(x: CanvasRenderingContext2D, text: string, px: number, py: number, a: number, col: string): void {
  if (a <= 0) return;
  x.save(); x.globalAlpha *= a;
  x.font = "600 15px ui-monospace, Menlo, Consolas, monospace"; x.textBaseline = "middle"; x.textAlign = "left";
  // (beside the cloud; past the screen's edge, under it instead)
  const w = x.measureText(text).width, W = x.canvas.width, X = px + w < W - 12 ? px : Math.max(12, (W - w) / 2), Y = px + w < W - 12 ? py : Math.min(x.canvas.height - 150, py + 160);
  x.fillStyle = "rgba(0,0,0,0.6)"; x.fillText(text, X + 1, Y + 1);
  x.fillStyle = col; x.fillText(text, X, Y);
  x.restore();
}
