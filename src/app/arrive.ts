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
  /** The last moment the island isn't seen: the still about to fade, or a skip straight to her decks (main.ts revealArt). */
  onReveal: () => void = () => {};

  /** `frameAt`: where the rise frames before the last shot (rules/arrive.ts arrivePlan): the new opening's bedroom (app/opening.ts). */
  constructor(readonly rec: Arrival, private readonly A: ArriveTuning, private readonly still: HTMLImageElement | null, private readonly frameAt?: { x: number; z: number }) {
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
    this.plan = arrivePlan(this.rec, g.map, this.A, groundHeight, this.end(g), this.frameAt);
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
    this.onReveal();
    performance.mark("witch:landed"); // (the still going: the wait over)
    const img = this.still;
    if (!img) return;
    img.style.transition = `opacity ${this.A.fade}s linear`;
    img.style.opacity = "0";
    document.getElementById("arrive-landing")?.remove();
    setTimeout(() => img.remove(), this.A.fade * 1000 + 100);
  }

  private land(v?: View): void {
    if (this.done) return;
    this.onReveal(); // (skipped before the still faded: now, still unseen)
    performance.mark("game:arrived");
    this.done = true;
    if (v) v.fly = null;
    this.still?.remove();
    document.getElementById("arrive-landing")?.remove();
  }
}

/** index.html's still, as its own script makes it for a sail that loads the page (its look and the push-in's and the "landing…"'s
 *  CSS there by id). */
const STILL_CSS = "display:none;position:fixed;inset:0;width:100%;height:100%;object-fit:cover;z-index:40;background:#05060e;image-rendering:pixelated;transform-origin:50% 55%;pointer-events:none";

/** A sail in place (app/sail.ts): the chart's last frame and "landing…" put up over the game as index.html's script puts them up
 *  for a sail that loads the page, made afresh each time (the last ones went as their flight landed); the night's ArrivalFlight
 *  (app/night.ts) takes the still by its id. */
export function showStill(rec: { still?: string }): void {
  document.getElementById("arrive-still")?.remove();
  document.getElementById("arrive-landing")?.remove();
  const img = document.createElement("img");
  img.id = "arrive-still"; img.alt = ""; img.style.cssText = STILL_CSS;
  if (rec.still) img.src = rec.still;
  img.style.display = "block";
  const landing = document.createElement("div");
  landing.id = "arrive-landing"; landing.textContent = "landing…"; landing.style.display = "block";
  document.body.append(img, landing);
}

/** The HUD hidden through an arrival's flight and fading in as she settles at her decks (Ed, 2026-10-12): its rule, once a page
 *  (body.arriving holds it hidden). */
export function hudFade(ids: readonly string[]): void {
  if (document.getElementById("arrive-hud")) return;
  const st = document.createElement("style");
  st.id = "arrive-hud";
  st.textContent = `${ids.map(i => `#${i}`).join(",")} { transition: opacity 1.2s ease-out; } ${ids.map(i => `body.arriving #${i}`).join(",")} { opacity: 0 !important; pointer-events: none !important; }`;
  document.head.append(st);
}
