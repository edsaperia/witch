// Screen shake when she's hit (Ed, 2026-10-05; render/shake.ts), laid on the canvas as a transform with the camera's sub-pixel
// glide. For comfort it can be turned off: ?shake=0, or the start screen's toggle (remembered here).
import { Shake } from "../render/shake";
import type { View } from "../render/view";
import type { Game } from "../rules/game";
import type { Tuning } from "../rules/tuning";

export class ScreenShake {
  readonly shake: Shake;
  /** The start screen's on/off toggle (null when the page has none). */
  readonly option: HTMLElement | null;
  private shaken = false;

  constructor(private game: Game, private tuning: Tuning, private view: View, private canvas: HTMLCanvasElement, params: URLSearchParams) {
    let shakeOn = params.get("shake") !== "0";
    try { if (params.get("shake") === null && localStorage.getItem("witch.shake") === "0") shakeOn = false; } catch { /* fine */ }
    this.shake = new Shake(tuning.camera.shake, shakeOn);
    this.option = document.getElementById("shake-opt");
    this.showOption();
    this.option?.addEventListener("pointerdown", e => {
      e.stopPropagation();
      const b = (e.target as HTMLElement).closest("button");
      if (!b) return;
      this.shake.on = b.dataset.v === "1";
      try { localStorage.setItem("witch.shake", this.shake.on ? "1" : "0"); } catch { /* fine */ }
      this.showOption();
    });
  }

  /** A new night on the same page (app/night.ts): its game and tuning from here on (the shake's own feel kept), still, its clock new. */
  retarget(game: Game, tuning: Tuning): void { this.game = game; this.tuning = tuning; this.shake.reset(); }

  private showOption(): void {
    const on = this.shake.on;
    if (this.option) this.option.innerHTML = `screen shake <button type="button" data-v="1" class="${on ? "on" : ""}">on</button><button type="button" data-v="0" class="${on ? "" : "on"}">off</button>`;
  }

  /** The camera's sub-pixel glide (view.subpixel): the snap it took off, given back in whole screen pixels. */
  glide(): { gx: number; gy: number } {
    // (in whole device pixels: a css pixel at a DPR of 1.25 is 1.25 of them, and the canvas moved by part of one is resampled, blurred)
    const p = this.view.cssPixel, s = this.view.subpixel, d = typeof devicePixelRatio === "number" && devicePixelRatio > 0 ? devicePixelRatio : 1;
    return { gx: Math.round(s.x * p * d) / d, gy: Math.round(s.y * p * d) / d };
  }

  apply(): void {
    const game = this.game, canvas = this.canvas, W = game.witches[0];
    // (on her clock, as her hits are: the world's runs at a tenth in a sleeping legend's circle and on the deck, render/shake.ts)
    this.shake.watch(W.health, !!W.ko, this.tuning.witchHealth.hits, game.herTime);
    const o = this.shake.offset(game.herTime, this.view.cssPixel);
    const { gx, gy } = this.glide();
    if (o.amount <= 0) {
      if (gx || gy) { canvas.style.transform = `translate(${gx}px, ${gy}px)`; this.shaken = true; }
      else if (this.shaken) { canvas.style.transform = ""; this.shaken = false; }
      return;
    }
    // Zoomed in just enough that no edge shows while it's off centre and turned.
    const w = window.innerWidth, h = window.innerHeight, turn = Math.abs((o.rot * Math.PI) / 180) * 0.5 * Math.hypot(w, h);
    const zoom = 1 + (2 * (Math.max(Math.abs(o.x), Math.abs(o.y)) + turn)) / Math.min(w, h);
    canvas.style.transform = `translate(${o.x + gx}px, ${o.y + gy}px) rotate(${o.rot.toFixed(3)}deg) scale(${zoom.toFixed(4)})`;
    this.shaken = true;
  }
}
