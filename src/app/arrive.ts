// Arriving on an island from the sea chart (?arrive=1; app/arrival.ts reads the chart's hand-off, rules/arrive.ts has the path
// and the flight's clock): the chart's last frame (put up on the first paint by index.html's little script, pushing in by a CSS
// animation even while the page is busy) holds while the night builds; once the start's art is ready the game's camera takes
// over at the chart's own camera behind it and waits there, the still still up, until the first heavy frames at that new spot
// have passed (stepFlightClock's warm-up); then the still cross-fades away and the flight goes on north over the forest, up to
// frame the dancefloor and the Ent, and down to the opening shot at her decks, on the frames' own time (a stall holds it, never
// skips it). Any key or tap skips to the end. main.ts starts the night (her clock, the party spell's cast) when it lands.
import type { Game } from "../rules/game";
import { poseOf } from "../rules/game";
import { arrivePlan, newFlightClock, planLength, shotAt, stepFlightClock, type ArrivePlan, type ArriveTuning, type FlightClock, type Shot } from "../rules/arrive";
import type { Arrival } from "./arrival";
import { groundHeight } from "../render/height";
import type { View } from "../render/view";

export class ArrivalFlight {
  private plan: ArrivePlan | null = null;
  private clock: FlightClock = newFlightClock();
  private skipped = false;
  /** Landed: the flight over (or skipped), the game's camera its own again. */
  done = false;

  constructor(readonly rec: Arrival, private readonly A: ArriveTuning, private readonly still: HTMLImageElement | null) {
    const img = still;
    if (!img) return;
    if (!img.src && rec.still) img.src = rec.still; // (no still, too big for the storage: a plain dark screen instead)
    img.style.display = "block";
  }

  /** The opening shot at her decks as a flight's shot (the game's camera now: its aim in the world's heights). */
  private end(g: Game): Shot {
    const p = poseOf(g);
    return { tx: p.tx, ty: p.ty + groundHeight(p.tx, p.tz), tz: p.tz, angle: p.angle, distance: p.distance, fov: g.tuning.camera.fov };
  }

  /** The start's art is ready: the camera takes over at the chart's behind the still (from the next frame). */
  begin(g: Game): void {
    if (this.plan || this.done) return;
    this.plan = arrivePlan(this.rec, g.map, this.A, groundHeight, this.end(g));
    if (this.skipped) this.land();
  }

  /** Any key or tap: straight to her decks (once the art is ready, if it isn't yet). */
  skip(): void { this.skipped = true; if (this.plan) this.land(); }

  /** A frame (`now`, ms): the flight's shot put on the view, or, landed, the view's own camera back. True once landed. */
  frame(v: View, g: Game, now: number): boolean {
    if (this.done) { v.fly = null; return true; }
    if (!this.plan) return false;
    this.plan.keys[this.plan.keys.length - 1] = this.end(g); // (the opening shot as the game's camera has it now)
    if (this.skipped) { this.land(v); return true; }
    if (stepFlightClock(this.clock, now, this.A).faded) this.fadeStill();
    if (this.clock.s >= planLength(this.plan)) { this.land(v); return true; }
    v.fly = shotAt(this.plan, this.clock.s); // (warming up: the hand-off's own shot, behind the still)
    return false;
  }

  /** Still warming up behind the chart's last frame (the camera there, waiting for the frames to come calm). */
  get warming(): boolean { return !this.done && (!this.plan || this.clock.phase === "warm"); }

  private fadeStill(): void {
    const img = this.still;
    if (!img) return;
    img.style.transition = `opacity ${this.A.fade}s linear`;
    img.style.opacity = "0";
    document.getElementById("arrive-landing")?.remove();
    setTimeout(() => img.remove(), this.A.fade * 1000 + 100);
  }

  private land(v?: View): void {
    if (this.done) return;
    this.done = true;
    if (v) v.fly = null;
    this.still?.remove();
    document.getElementById("arrive-landing")?.remove();
  }
}
