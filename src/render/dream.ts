// Her dream of tonight's loan (Ed, 2026-10-24, previews/ed/finds-on-loan: "when she's asleep (after going to bed, or after starting
// a sail), we can communicate through her dreams - this would be a good time to tell her whether she has unlocked something or not"):
// asleep after a night with a find on loan (app/loan.ts), a dream cloud rises from her head and away from her in the dark (so she's
// still seen: Ed, 2026-10-24), a soft scalloped cloud rimmed in the dreams' amber with three puffs trailing down to her, and in it the find's
// constellation, lit (rules/constellations.ts). The night won, its stars gather and fade into the place in the treehouse where
// the find will live (Ed: "the hats' floor for a hat, the pegboard or broom bay for a broom part, the wardrobe, shoe rack or cloak
// pegs for clothes, the bags for a bag"), drawn by the house's own furniture art (render/houseFurniture.ts), the find lying there
// in its own find art, sparkling, "The Sentry hat is yours" under it. Not won, the stars drift apart out of the cloud and fade, the
// find fading with them: "The Sentry hat went back to the stars". It runs on its own clock (the night's frames stand still while
// the next island's made) and ends by itself or on any key, click or touch; main.ts then rings her alarm (rules/wakeUp.ts endDream).
import * as Art from "../../art/generator.js";
import { furnitureSprite } from "../../art/furniture.js";
import { litCanvas, standing, type Drawn } from "./houseFurniture";
import { OUTLINES } from "../rules/constellations";
import { HOUSE_ROOMS } from "../rules/houseRooms";
import type { Style } from "./style";

/** What the dream shows: the find (its kind and id, its name as said, its find art's piece id), the verdict, and its home's house object. */
export interface DreamOf { item: string; name: string; piece: string; won: boolean; home: string }

/** How long each dream runs (s): won, a little longer, to see where it went. */
export const DREAM_SECONDS = { won: 8, lost: 5.5 };
const ease = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t));
const hash = (a: number, b: number) => { const v = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return v - Math.floor(v); };

/** The pictures a dream draws: its home's furniture and the find, each lit in the house's light (null: not drawn, its words only). */
export interface DreamArt { home: HTMLCanvasElement | null; find: HTMLCanvasElement | null }

/** Its home's furniture and the find's own art, baked and lit now (a piece is tens of milliseconds: once, as she falls asleep). */
export function dreamArt(d: Pick<DreamOf, "home" | "piece">, st: Style): DreamArt {
  let home: HTMLCanvasElement | null = null;
  const find = findCanvas(d.piece, st, 4);
  try {
    const o = HOUSE_ROOMS.objects.find(q => q.id === d.home);
    if (o) { const { foot } = standing(o); home = litCanvas(furnitureSprite(o.id, foot, st, { ppm: 44, pitch: 0.62, yaw: 0, curve: 0 }) as Drawn, o.room, st, 1, o.id); }
  } catch { home = null; }
  return { home, find };
}

/** A find's own art (art/country.js's find pieces, rules/finds.ts findPiece), baked and lit in the house's light, or null; `fine`
 *  times finer than the game draws it (at the witch's own scale a find is a few pixels), for the dream's close look. */
const FINE = new WeakMap<Style, Map<number, Style>>();
export function findCanvas(piece: string, st: Style, fine = 1): HTMLCanvasElement | null {
  try {
    let m = FINE.get(st);
    if (!m) FINE.set(st, (m = new Map()));
    if (!m.has(fine)) m.set(fine, fine === 1 ? st : ({ ...st, pixel: ((st as Style & { pixel?: number }).pixel ?? 3) / fine } as Style)); // (one style a fineness: the art's caches are keyed by it)
    const sf = m.get(fine)!;
    const p = (Art.scenePiece as (id: string, st: Style) => { sprite: { whole: Drawn["sp"]; origin: { x: number; y: number } }; colours: Record<string, number[]> })(piece, sf);
    return litCanvas({ sp: p.sprite.whole, origin: p.sprite.origin, lights: [] }, "bedroom", sf, 1, "", p.colours);
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
  /** A layer a shape's drawn on whole before it's laid on faded (blob). */
  private layer: HTMLCanvasElement | null = null;

  /** `veil`: its own dark under it, as the sleep's (render/wakeUp.ts), for a dream shown over a night that isn't asleep (?dream=). */
  /** `head`: her head's top on the page (CSS px), or null: the cloud's smallest puff just above it, the cloud rising up and away
   *  from her so she stays in view (Ed, 2026-10-24); without one, over the middle of the screen. */
  constructor(private d: DreamOf, private art: DreamArt, private veil = false, private head: () => { x: number; y: number } | null = () => null, private now: () => number = () => performance.now() / 1000) {
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
    // the cloud: its puffs trailing from just above her head, the cloud up and to the side of her, so she stays in view (Ed,
    // 2026-10-24); kept on the screen. With no head to rise from (her not drawn), over the middle of the screen.
    const P = Math.max(2, Math.round(Math.min(W, H) / 240)), n = 70 * P, fade = (1 - out) * (1 - ease((t - (total - 0.8)) / 0.8));
    const hd = this.head(), fx = hd ? hd.x + P * 2 : W / 2 - n * 0.6, fy = hd ? hd.y - P * 3 : H * 0.72;
    const rx = n * 0.74, ry = n * 0.6, side = hd && hd.x + n * 1.5 > W ? -1 : 1; // (to her right, or her left near the screen's right edge)
    // (above her and to the side; with no room above her, beside her, its near edge well clear of her)
    const roomAbove = fy - ry * 2 - n * 0.35 > 8, cy0 = roomAbove ? fy - ry - n * 0.35 : Math.max(ry + 8, Math.min(H - ry - 60, fy - n * 0.15));
    const cx = Math.max(rx + n * 0.3, Math.min(W - rx - n * 0.3, fx + side * (roomAbove ? n * 0.62 : rx + n * 0.5))), cy = cy0;
    const C = { cx, cy, rx, ry, fx, fy, n, P, side };
    this.cloud(C, t, fade);
    if (ease((t - 0.35) / 0.65) < 0.9 || fade <= 0) return;
    const bx = cx - n / 2, by = cy - n * 0.5, ccx = cx, ccy = by + n * 0.42;
    const O = OUTLINES[D.item], deg = n / 26;
    const stars = O ? O.stars.map(([sx, sy]) => [ccx + sx * deg, ccy - sy * deg] as [number, number]) : [];
    // (the words beside the cloud, on the side away from her)
    const wordsAt = side > 0 ? cx + rx + n * 0.25 : cx - rx - n * 0.25, align: CanvasTextAlign = side > 0 ? "left" : "right";
    x.save();
    x.beginPath(); this.outline(C, t, 0.97); x.clip(); // (what's in the dream stays in its cloud)
    x.globalAlpha = fade;
    if (D.won) this.won(t, stars, O?.lines ?? [], { bx, by, n, cx: ccx, cy: ccy, P });
    else this.lost(t, stars, O?.lines ?? [], { cx: ccx, cy: ccy, n, P });
    x.restore();
    x.globalAlpha = fade;
    if (D.won && t > 3.4) words(x, `${cap(this.d.name)} is yours`, wordsAt, cy, ease((t - 3.4) / 0.6), "#f0c47a", align);
    if (!D.won && t > 2.2) words(x, `${cap(this.d.name)}|went back to the stars`, wordsAt, cy, ease((t - 2.2) / 0.6), "#cdbdf0", align);
    x.globalAlpha = 1;
  }

  /** The cloud's lumps (x, y, r): round bumps all about an oval, bigger over its top, each breathing a little out of step. */
  private lumps(C: { cx: number; cy: number; rx: number; ry: number; n: number }, t: number, k = 1): [number, number, number][] {
    const out: [number, number, number][] = [], N = 11;
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2 + 0.25, up = Math.max(0, -Math.sin(a)), r = C.n * (0.2 + 0.12 * up + 0.03 * hash(i, 9)) * (1 + 0.025 * Math.sin(t * 1.3 + i * 1.9));
      out.push([C.cx + Math.cos(a) * C.rx * 0.86, C.cy + Math.sin(a) * C.ry * 0.82, r * k]);
    }
    return out;
  }
  /** The cloud's outline as one path (its oval and its lumps), scaled by k about its middle. */
  private outline(C: { cx: number; cy: number; rx: number; ry: number; n: number }, t: number, k = 1, x: CanvasRenderingContext2D = this.x): void {
    x.ellipse(C.cx, C.cy, C.rx * k, C.ry * k, 0, 0, Math.PI * 2);
    for (const [lx, ly, r] of this.lumps(C, t, k)) { x.moveTo(C.cx + (lx - C.cx) * k + r, C.cy + (ly - C.cy) * k); x.arc(C.cx + (lx - C.cx) * k, C.cy + (ly - C.cy) * k, r, 0, Math.PI * 2); }
  }

  /** The dream cloud (Ed, 2026-10-24: a nicer shape and border): one soft scalloped cloud, its rim a single clean line of the dream's
   *  amber with a soft glow outside it, its inside a deep night shaded toward a lighter middle and a faint inner rim; three round
   *  puffs trailing down to her, coming first, then the cloud swelling up out of the last. */
  private cloud(C: { cx: number; cy: number; rx: number; ry: number; fx: number; fy: number; n: number; P: number; side: number }, t: number, fade: number): void {
    const lw = Math.max(2, C.P * 0.8);
    // the puffs: from her head toward the cloud's lower edge, growing
    const da = Math.atan2(C.fy - C.cy, C.fx - C.cx), ex = C.cx + Math.cos(da) * C.rx * 0.95, ey = C.cy + Math.sin(da) * C.ry * 0.95; // (the cloud's edge toward her)
    for (let i = 0; i < 3; i++) {
      const k = (i + 1) / 4, a = ease((t - i * 0.12) / 0.25) * fade;
      if (a <= 0) continue;
      const px = C.fx + (ex - C.fx) * k, py = C.fy + (ey - C.fy) * k, r = C.n * (0.035 + i * 0.03);
      this.blob(y => { y.moveTo(px + r, py); y.arc(px, py, r, 0, Math.PI * 2); }, a, lw, { x: px, y: py, r });
    }
    const g = ease((t - 0.35) / 0.65), k = 0.55 + 0.45 * g;
    if (g <= 0) return;
    this.blob(y => this.outline(C, t, k, y), g * fade, lw, { x: C.cx, y: C.cy, r: Math.max(C.rx, C.ry) * k });
  }
  /** A shape filled and rimmed, drawn whole on its own layer and laid on at `a` (so its rim never shows through its fill as it
   *  fades): a soft glow, its rim (stroked under the fill at twice the width, so only its outer half shows: one clean line round
   *  the union of its parts), and its fill, a deep night lighter toward the middle. */
  private blob(path: (y: CanvasRenderingContext2D) => void, a: number, lw: number, c: { x: number; y: number; r: number }): void {
    const L = (this.layer ??= document.createElement("canvas")), W = this.canvas.width, H = this.canvas.height;
    if (L.width !== W || L.height !== H) { L.width = W; L.height = H; }
    const y = L.getContext("2d")!;
    y.clearRect(0, 0, W, H);
    y.save();
    const x = this.x;
    y.beginPath(); path(y);
    y.shadowColor = "rgba(240,196,122,0.6)"; y.shadowBlur = lw * 6; y.strokeStyle = "rgb(240,196,122)"; y.lineWidth = lw * 2; y.lineJoin = "round"; y.stroke();
    y.shadowBlur = 0;
    const f = y.createRadialGradient(c.x, c.y - c.r * 0.25, c.r * 0.1, c.x, c.y, c.r * 1.15);
    f.addColorStop(0, "rgb(52,40,88)"); f.addColorStop(0.7, "rgb(28,20,52)"); f.addColorStop(1, "rgb(17,12,32)");
    y.fillStyle = f; y.fill();
    y.restore();
    x.save(); x.globalAlpha = a * 0.96; x.drawImage(L, 0, 0); x.restore();
  }


  /** The night won: lit, then its stars gather and fade into its home, the find there, sparkling, and its words. */
  private won(t: number, stars: [number, number][], lines: [number, number][], B: { bx: number; by: number; n: number; cx: number; cy: number; P: number }): void {
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
        x.filter = "brightness(1.4)"; x.drawImage(a.find, fx, fy, w, h); x.filter = "none";
        for (let i = 0; i < 6; i++) glint(x, B.cx + Math.cos(i * 1.05 + t) * w * 0.8, fy + h / 2 + Math.sin(i * 1.05 + t) * h * 0.7, Math.max(0, Math.sin(t * 3 + i * 1.7)), B.P);
      }
      x.restore();
    }
    // the constellation: lit and twinkling, then gathering into the find's place and fading
    const gx = B.cx, gy = B.by + B.n * 0.62;
    const P2 = stars.map(([sx, sy]) => [sx + (gx - sx) * into, sy + (gy - sy) * into] as [number, number]);
    for (const [i, j] of lines) line(x, P2[i], P2[j], 0.6 * (1 - into));
    P2.forEach((p, i) => star(x, p[0], p[1], (1 - into * into) * (0.85 + 0.15 * Math.sin(t * 3 + i)), B.P));
  }

  /** Not won: the find faint in the middle, the lines going first, the stars drifting apart out of the cloud, fading, and its words. */
  private lost(t: number, stars: [number, number][], lines: [number, number][], B: { cx: number; cy: number; n: number; P: number }): void {
    const x = this.x, d = ease((t - 1.4) / 2.6), f = this.art.find;
    if (f) {
      const k = Math.max(B.P, Math.floor((B.n * 0.26) / Math.max(f.width, f.height))), w = f.width * k, h = f.height * k;
      x.save(); x.globalAlpha *= 0.7 * (1 - ease((t - 1.6) / 1.8)); x.filter = "brightness(1.4)"; x.drawImage(f, Math.round(B.cx - w / 2), Math.round(B.cy - h / 2), w, h); x.restore();
    }
    const P2 = stars.map(([sx, sy], i) => { const a = Math.atan2(sy - B.cy, sx - B.cx) + (hash(i, 1) - 0.5) * 0.9, r = d * B.n * (0.6 + 0.6 * hash(i, 2)); return [sx + Math.cos(a) * r, sy + Math.sin(a) * r - d * B.n * 0.12 * hash(i, 4)] as [number, number]; });
    for (const [i, j] of lines) line(x, P2[i], P2[j], 0.6 * Math.max(0, 1 - d * 3));
    P2.forEach((p, i) => star(x, p[0], p[1], Math.max(0, 1 - d * d * 1.1) * (0.85 + 0.15 * Math.sin(t * 3.4 + i)), B.P));
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
/** A loan's glint (the same four-point pixel star as the treehouse's sparkle: render/loanSparkle.ts); `rim`, a dark rim round it, so
 *  it reads on a bright floor too. */
export function glint(x: CanvasRenderingContext2D, px: number, py: number, b: number, P: number, rim = false): void {
  if (b <= 0.05) return;
  const k = Math.max(2, Math.round(P * 0.7)), X = Math.round(px / k) * k, Y = Math.round(py / k) * k, arm = b > 0.6 ? 2 : 1;
  const plus = (c: string, grow: number) => { x.fillStyle = c; x.fillRect(X - grow, Y - arm * k - grow, k + grow * 2, (arm * 2 + 1) * k + grow * 2); x.fillRect(X - arm * k - grow, Y - grow, (arm * 2 + 1) * k + grow * 2, k + grow * 2); };
  if (rim) plus(`rgba(24,14,36,${0.7 * b})`, Math.max(1, Math.round(k / 2)));
  plus(`rgba(255,226,160,${b * 0.85})`, 0);
  x.fillStyle = `rgba(255,252,236,${b})`; x.fillRect(X, Y, k, k);
}
function words(x: CanvasRenderingContext2D, text: string, px: number, py: number, a: number, col: string, align: CanvasTextAlign = "left"): void {
  if (a <= 0) return;
  x.save(); x.globalAlpha *= a;
  x.font = "600 15px ui-monospace, Menlo, Consolas, monospace"; x.textBaseline = "middle"; x.textAlign = align;
  // (beside the cloud, a line under another; kept on the screen)
  const lines = text.split("|"), w = Math.max(...lines.map(l => x.measureText(l).width)), W = x.canvas.width;
  const X = align === "left" ? Math.min(px, W - 12 - w) : Math.max(px, 12 + w), Y = py - (lines.length - 1) * 10;
  lines.forEach((l, i) => { x.fillStyle = "rgba(0,0,0,0.6)"; x.fillText(l, X + 1, Y + i * 20 + 1); x.fillStyle = col; x.fillText(l, X, Y + i * 20); });
  x.restore();
}
