// Her eyes closing as she goes to sleep (Ed, 2026-11-12: "going to sleep zzz timer should be an eye closing vignette instead of
// a dial"): while E is held at the bed (rules/houseRooms.ts stepBed, its length and rules unchanged), the screen's edges darken
// and two soft, curved eyelids come in from the top and the bottom, shut when the hold is full; let go early and they open again
// smoothly. And waking (Ed, 2026-11-12: "we can also use this animation for waking up (in reverse)"): when her alarm first goes off
// in the morning (rules/wakeUp.ts, the dream over if she had one) her eyes start shut and open (wakeClosure); the wake-up's
// timing and rules unchanged, and the room's own dark (render/wakeUp.ts's veil, lit as she gets up) still under them. During a
// dream they stay open, so she's still seen in the dark under its cloud (Ed, 2026-10-24). Drawn on the page over the game, as the wake-up's veil is (render/wakeUp.ts): a fixed layer of three divs whose
// look never changes, moved only by transform and opacity (the compositor's work, no repaint), from tables of strings made once,
// so a frame allocates nothing. `?sleepdial=1` keeps the old dial, the filling ring over the bed, to compare (render/houseRooms.ts).

/** Whether the link asks for the old dial (`?sleepdial=1`) in place of the eyelids. */
const SLEEP_DIAL = typeof location !== "undefined" && new URLSearchParams(location.search).get("sleepdial") === "1";
export const sleepDial = (): boolean => SLEEP_DIAL;

/** How shut the eyes are (0 open, 1 shut) when the bed's hold is `fill` full (0 to 1): half straight, half eased out, so the
 *  lids droop as soon as the hold begins (heavy eyes) and the last of it shuts them gently. */
export function lidClosure(fill: number): number {
  const f = Math.min(1, Math.max(0, fill));
  return 0.5 * f + 0.5 * Math.sin(f * Math.PI / 2);
}

/** How fast (a second) the eyes open again once the hold is let go: what's left of the closure falls by this share a second. */
export const OPEN_RATE = 8;

/** A frame of the closure shown: up with the hold exactly (the timer as it is), down again (opening) smoothly over `dt` s. */
export function stepLids(shown: number, target: number, dt: number, rate = OPEN_RATE): number {
  if (target >= shown) return target;
  const next = shown + (target - shown) * Math.min(1, Math.max(0, dt) * rate);
  return next - target < 0.002 ? target : next;
}

/** Waking: shut this long (s, her clock) after her alarm first rings, then opening over WAKE_OPEN seconds, eased. */
export const WAKE_SHUT = 0.25, WAKE_OPEN = 1.5;

/** How shut her eyes are as she wakes (0 open, 1 shut): from the first ring of the morning's alarm (beat "alarm", not yet
 *  snoozed), shut WAKE_SHUT s then opening over WAKE_OPEN s; open otherwise (asleep dreaming, snoozing, stretching, up). */
export function wakeClosure(wake: { beat: string; at: number; snoozes: number; open: boolean } | null | undefined, ht: number): number {
  if (!wake || wake.open || wake.beat !== "alarm" || wake.snoozes > 0) return 0;
  const t = Math.min(1, Math.max(0, (ht - wake.at - WAKE_SHUT) / WAKE_OPEN));
  return 1 - t * t * (3 - 2 * t);
}

const STEPS = 256; // (the closure in 1/256ths: each step's transforms made once)
const INK = "rgba(3,2,9,1)";
/** Each lid as tall as the screen; at full closure its edge passes the middle by REACH (a share of the screen's height) so the
 *  curve's centre, which sits that far back from the lid's edge, is covered too. */
const REACH = 0.22;

export class EyeLids {
  private readonly box: HTMLDivElement;
  private readonly top: HTMLDivElement;
  private readonly bottom: HTMLDivElement;
  private readonly vignette: HTMLDivElement;
  private readonly topAt: string[] = [];
  private readonly bottomAt: string[] = [];
  private readonly fade: string[] = [];
  private shown = 0;
  private step = -1;
  private last = 0;

  constructor() {
    this.box = document.createElement("div");
    this.box.id = "sleep-eyelids";
    // (z 8, the wake-up veil's: under her dream's cloud (9) and the house's keycaps (11), so the alarm's keys and the bed's E stay readable)
    this.box.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:8;overflow:hidden;display:none";
    const lid = (edge: "top" | "bottom") =>
      `position:absolute;left:-10vw;width:120vw;height:100vh;${edge}:0;will-change:transform;` +
      // (dark everywhere but a soft half-ellipse at its inner edge: the lid's curve, its corners reaching further in than its middle)
      `background:radial-gradient(ellipse 58% ${REACH * 100}% at 50% ${edge === "top" ? 100 : 0}%, rgba(3,2,9,0) 0%, rgba(3,2,9,0) 40%, rgba(3,2,9,.9) 82%, ${INK} 100%)`;
    this.top = document.createElement("div"); this.top.style.cssText = lid("top");
    this.bottom = document.createElement("div"); this.bottom.style.cssText = lid("bottom");
    this.vignette = document.createElement("div");
    this.vignette.style.cssText = "position:absolute;inset:0;will-change:opacity;opacity:0;background:radial-gradient(ellipse 70% 65% at 50% 50%, rgba(3,2,9,0) 35%, rgba(3,2,9,.55) 75%, rgba(3,2,9,.9) 100%)";
    this.box.append(this.vignette, this.top, this.bottom);
    document.body.append(this.box);
    for (let i = 0; i <= STEPS; i++) {
      const c = i / STEPS, edge = c * (50 + REACH * 100); // (the lid's edge, in hundredths of the screen's height from its side)
      this.topAt.push(`translate3d(0,${(edge - 100).toFixed(2)}%,0)`);
      this.bottomAt.push(`translate3d(0,${(100 - edge).toFixed(2)}%,0)`);
      this.fade.push(Math.min(1, c * 2).toFixed(3));
    }
  }

  /** A frame: `fill` the bed's hold (0 to 1; 0 when she isn't holding it), `waking` her eyes' closure as she wakes (wakeClosure),
   *  `ht` her clock (their opening runs on it, as the hold does: still while paused). */
  update(fill: number, waking: number, ht: number): void {
    const dt = Math.min(0.1, Math.max(0, ht - this.last));
    this.last = ht;
    this.shown = stepLids(this.shown, Math.max(lidClosure(fill), waking), dt);
    const i = Math.round(this.shown * STEPS);
    if (i === this.step) return;
    this.step = i;
    if (i === 0) { this.box.style.display = "none"; return; }
    this.box.style.display = "block";
    this.top.style.transform = this.topAt[i]; this.bottom.style.transform = this.bottomAt[i]; this.vignette.style.opacity = this.fade[i];
  }

  /** How shut the eyes are drawn now (0 open, 1 shut), for the page's state. */
  get closure(): number { return this.shown; }
}
