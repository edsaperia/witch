// Arriving on an island from the sea chart (?arrive=1; rules/arrive.ts has the record and the path): the chart's last frame
// (put up on the first paint by index.html's little script) pushes in slowly while the night builds; once the start's art is
// ready the game's camera takes over at the chart's own camera, the still cross-fades away, and the flight goes on north over
// the sea and the forest, up to frame the dancefloor and the Ent's spot, and down to the opening shot at her decks. Any key or
// tap skips to the end. main.ts starts the night (her clock, the party spell's cast) when it lands.
import type { Game } from "../rules/game";
import { poseOf } from "../rules/game";
import { arrivePlan, planLength, shotAt, type ArrivePlan, type ArriveRecord, type ArriveTuning, type Shot } from "../rules/arrive";
import { groundHeight } from "../render/height";
import type { View } from "../render/view";

export class Arrival {
  private plan: ArrivePlan | null = null;
  private t0 = 0;
  private skipped = false;
  /** Landed: the flight over (or skipped), the game's camera its own again. */
  done = false;

  constructor(readonly rec: ArriveRecord, private readonly A: ArriveTuning, private readonly still: HTMLImageElement | null) {
    const img = still;
    if (!img) return;
    if (!img.src) img.src = rec.still;
    img.style.display = "block";
    // the push-in while the night builds (a slow ease, never past A.push)
    img.style.transition = `transform ${A.pushTime}s cubic-bezier(.2,.6,.3,1)`;
    requestAnimationFrame(() => requestAnimationFrame(() => { img.style.transform = `scale(${1 + A.push})`; }));
  }

  /** The opening shot at her decks as a flight's shot (the game's camera now: its aim in the world's heights). */
  private end(g: Game): Shot {
    const p = poseOf(g);
    return { tx: p.tx, ty: p.ty + groundHeight(p.tx, p.tz), tz: p.tz, angle: p.angle, distance: p.distance, fov: g.tuning.camera.fov };
  }

  /** The start's art is ready: the camera takes over at the chart's (from the next frame), and the still fades away. */
  begin(g: Game): void {
    if (this.plan || this.done) return;
    this.plan = arrivePlan(this.rec, g.map, this.A, groundHeight, this.end(g));
    this.t0 = -1; // (the first frame's time: the flight runs on the frames' own clock)
    const img = this.still;
    if (img) {
      img.style.transition = `opacity ${this.A.fade}s linear`;
      img.style.opacity = "0";
      setTimeout(() => img.remove(), this.A.fade * 1000 + 100);
    }
    if (this.skipped) this.land();
  }

  /** Any key or tap: straight to her decks (once the art is ready, if it isn't yet). */
  skip(): void { this.skipped = true; if (this.plan) this.land(); }

  /** A frame (`now`, ms): the flight's shot put on the view, or, landed, the view's own camera back. True once landed. */
  frame(v: View, g: Game, now: number): boolean {
    if (this.done) { v.fly = null; return true; }
    if (!this.plan) return false;
    this.plan.keys[this.plan.keys.length - 1] = this.end(g); // (the opening shot as the game's camera has it now)
    if (this.t0 < 0) this.t0 = now;
    const s = (now - this.t0) / 1000;
    if (s >= planLength(this.plan) || this.skipped) { this.land(v); return true; }
    v.fly = shotAt(this.plan, s);
    return false;
  }

  private land(v?: View): void {
    if (this.done) return;
    this.done = true;
    if (v) v.fly = null;
    this.still?.remove();
  }
}
