// The witch's portrait on screen (Ed, 2026-10-08): her bust at the bottom left, drawn at a whole-number scale (one knob:
// portrait.scale) so it stays crisp, and her text box to its right, translucent over the game, the line typing on in the
// game's pixel font (Tiny5) as her mouth flaps. Cheap: the bust is 72 x 88 art pixels, redrawn only when what it shows changes
// (at most `fps` a second), and painted once into a small canvas the browser scales up.

import tiny5 from "../fonts/Tiny5.woff2?url";
import { drawPortrait } from "./draw";
import { portraitPalette, type Colours } from "./palette";
import { Raster } from "./raster";
import { H, W, lookOf, type Look } from "./rig";
import { PortraitState } from "./state";

export interface PortraitOptions { scale: number; fps?: number; cps?: number }
type GenomeLike = Parameters<typeof lookOf>[0] & { palette?: Colours | null };

let fontIn = false;
function font(): void {
  if (fontIn || typeof document === "undefined") return;
  fontIn = true;
  const s = document.createElement("style");
  s.textContent = `@font-face { font-family: "Tiny5"; src: url(${tiny5}) format("woff2"); font-display: block; }`;
  document.head.appendChild(s);
}

export class Portrait {
  readonly el = document.createElement("div");
  readonly state = new PortraitState();
  private canvas = document.createElement("canvas");
  private ctx = this.canvas.getContext("2d")!;
  private img = this.ctx.createImageData(W, H);
  private px = new Uint32Array(this.img.data.buffer);
  private r = new Raster(W, H);
  private box = document.createElement("div");
  private text = document.createElement("div");
  private look: Look = lookOf(null);
  private palette = portraitPalette(null);
  private key = "";
  private drawnAt = -1;
  private shown = "";
  scale = 3;
  fps: number;
  cps: number;

  constructor(o: PortraitOptions) {
    font();
    this.fps = o.fps ?? 24; this.cps = o.cps ?? 30;
    this.canvas.width = W; this.canvas.height = H;
    Object.assign(this.canvas.style, { imageRendering: "pixelated", display: "block", flex: "0 0 auto" });
    Object.assign(this.el.style, { position: "absolute", left: "0", right: "0", bottom: "0", display: "flex", alignItems: "flex-end", pointerEvents: "none" });
    Object.assign(this.box.style, { background: "rgba(14, 9, 22, 0.62)", color: "#f0e8ff", fontFamily: '"Tiny5", ui-monospace, monospace', webkitFontSmoothing: "none", whiteSpace: "pre-wrap", overflowWrap: "break-word", visibility: "hidden" } as Partial<CSSStyleDeclaration>);
    this.box.appendChild(this.text);
    this.el.append(this.canvas, this.box);
    this.setScale(o.scale);
  }
  /** The one size knob: every art pixel this many screen pixels (the text's pixels too). */
  setScale(s: number): void {
    this.scale = Math.max(1, Math.round(s));
    const u = (n: number) => `${n * this.scale}px`;
    Object.assign(this.canvas.style, { width: u(W), height: u(H) });
    Object.assign(this.box.style, { fontSize: u(8), lineHeight: u(10), padding: `${u(4)} ${u(6)}`, marginLeft: u(2), marginBottom: u(6), flex: "0 1 auto", width: u(150), minWidth: "0", minHeight: u(30), boxSizing: "border-box",
      boxShadow: `inset 0 0 0 ${u(1)} rgba(242, 196, 106, 0.55)`,
      clipPath: `polygon(${u(1)} 0, calc(100% - ${u(1)}) 0, 100% ${u(1)}, 100% calc(100% - ${u(1)}), calc(100% - ${u(1)}) 100%, ${u(1)} 100%, 0 calc(100% - ${u(1)}), 0 ${u(1)})` });
    this.key = "";
  }
  /** How see-through the text box is (0 clear to 1 solid). */
  setBoxAlpha(a: number): void { this.box.style.background = `rgba(14, 9, 22, ${Math.min(1, Math.max(0, a))})`; }
  /** Her look and colours from the creator's genome (art/witchGenome.js; null: hers). */
  setGenome(g: GenomeLike | null): void { this.look = lookOf(g); this.palette = portraitPalette(g?.palette ?? null); this.key = ""; }
  say(text: string, t: number): void { this.state.say(text, t, this.cps); }

  /** Called every frame with the time in seconds. */
  update(t: number): void {
    const p = this.state.params(t), rhythm = p.bobAmp || p.nodAmp || p.swayAmp || p.shake;
    const key = JSON.stringify(p) + (rhythm ? Math.floor(t * this.fps) : "");
    if (key !== this.key && t - this.drawnAt >= 1 / this.fps - 1e-3) {
      this.key = key; this.drawnAt = t;
      drawPortrait(this.r, this.look, p, t);
      this.r.paint(this.px, this.palette);
      this.ctx.putImageData(this.img, 0, 0);
    }
    const talk = this.state.talk, shown = talk ? talk.text.slice(0, this.state.typed(t).n) : "";
    if (shown !== this.shown) { this.shown = shown; this.text.textContent = shown; }
    this.box.style.visibility = talk ? "visible" : "hidden";
  }
}
