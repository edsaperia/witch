// The cursor over the game (the controls' feel, 2026-10-06): a small reticle in place of the
// arrow, where the mouse aims her 💌s. On the ground it says whether the ground under it is within
// a 💌's range (bright and whole inside, dim and broken beyond; just a dot in the treetops or
// sitting, where she can't throw), and while her dodge recharges a thin arc fills round it, so the
// eye on the aim sees both; under it, a pip for each blink she has (two, Ed 2026-10-08), lit while ready. (The diamond marking where a dodge would land is gone: Ed, 2026-10-08.)
// DOM only, laid over the canvas; nothing in the rules.
import type { Game } from "../rules/game";
import { nextCharge } from "../rules/dash";

const NS = "http://www.w3.org/2000/svg";
const SIZE = 36, C = SIZE / 2, RING = 7, ARC = 12;
const ARC_LEN = 2 * Math.PI * ARC;

export class AimHud {
  private root: HTMLDivElement;
  private ring: SVGCircleElement;
  private dot: SVGCircleElement;
  private arc: SVGCircleElement;
  private pips: SVGRectElement[] = [];
  private svg: SVGSVGElement;
  private over = false;
  private flashUntil = 0;
  private wasCharging = false;

  constructor(private canvas: HTMLCanvasElement, parent: HTMLElement = document.body) {
    this.root = document.createElement("div");
    this.root.id = "aim";
    Object.assign(this.root.style, { position: "fixed", left: "0", top: "0", width: `${SIZE}px`, height: `${SIZE}px`, pointerEvents: "none", zIndex: "2", display: "none", filter: "drop-shadow(0 0 2px rgba(0,0,0,.9))" });
    const svg = (this.svg = document.createElementNS(NS, "svg"));
    svg.setAttribute("width", `${SIZE}`); svg.setAttribute("height", `${SIZE}`); svg.setAttribute("viewBox", `0 0 ${SIZE} ${SIZE}`);
    const circle = (r: number) => { const el = document.createElementNS(NS, "circle"); el.setAttribute("cx", `${C}`); el.setAttribute("cy", `${C}`); el.setAttribute("r", `${r}`); el.setAttribute("fill", "none"); svg.append(el); return el; };
    this.arc = circle(ARC);
    this.arc.setAttribute("stroke-width", "2"); this.arc.setAttribute("stroke-linecap", "round");
    this.arc.setAttribute("transform", `rotate(-90 ${C} ${C})`); // fills clockwise from the top
    this.ring = circle(RING);
    this.ring.setAttribute("stroke-width", "1.5");
    this.dot = circle(1.4);
    this.root.append(svg);
    parent.append(this.root);
    canvas.addEventListener("pointerenter", e => { if (e.pointerType === "mouse") this.over = true; });
    canvas.addEventListener("pointerleave", () => { this.over = false; });
  }

  /** `pointer`: the mouse in client pixels (null: no mouse yet); `aim`: the ground under it from her
   *  (metres, null off the ground plane); `on`: the game is being played (not the start screen). */
  update(g: Game, time: number, pointer: { x: number; y: number } | null, aim: { x: number; z: number } | null, on: boolean): void {
    const show = on && this.over && !!pointer;
    this.canvas.style.cursor = on ? "none" : "";
    if (!show) { this.root.style.display = "none"; return; }
    this.root.style.display = "block";
    this.root.style.transform = `translate(${Math.round(pointer.x - C)}px, ${Math.round(pointer.y - C)}px)`;
    const W = g.witches[0], b = W.body, t = g.buffs.tuning;
    const canThrow = b.mode === "ground" && !b.seated && !W.ko && t.invites.on;
    const inRange = canThrow && !!aim && Math.hypot(aim.x, aim.z) <= t.invites.range;
    const ink = inRange ? "rgba(255,150,210,.95)" : canThrow ? "rgba(232,226,244,.55)" : "rgba(232,226,244,.8)";
    this.ring.setAttribute("stroke", ink);
    this.ring.setAttribute("stroke-dasharray", inRange ? "" : "2.5 3");
    this.ring.style.opacity = canThrow ? "1" : "0";
    this.dot.setAttribute("fill", ink);
    this.dot.setAttribute("r", canThrow ? "1.4" : "2.2"); // (alone in the treetops: a little bigger, so the mouse isn't lost)
    // The dodge's recharge: an arc filling round the ring as the next blink comes back, a short flash as it does; a pip for each.
    const max = (t.dash.charges ?? 1) + g.buffs.mods.charges, ground = b.mode === "ground" && !b.seated;
    const charge = nextCharge(W.dash, time, max, t.dash.cooldown), charging = charge < 1 && ground;
    this.showPips(max, ground ? W.dash.charges : 0, ground && max > 1);
    if (this.wasCharging && !charging) this.flashUntil = performance.now() + 180;
    this.wasCharging = charging;
    const flash = performance.now() < this.flashUntil;
    if (charging || flash) {
      this.arc.style.opacity = "1";
      this.arc.setAttribute("stroke", flash ? "rgba(111,230,255,.95)" : "rgba(111,230,255,.7)");
      const fill = flash ? 1 : charge;
      this.arc.setAttribute("stroke-dasharray", `${(fill * ARC_LEN).toFixed(1)} ${ARC_LEN.toFixed(1)}`);
    } else this.arc.style.opacity = "0";
  }

  /** A pip for each blink (2 px squares on whole pixels, under the arc), lit while it's ready. */
  private showPips(max: number, ready: number, show: boolean): void {
    while (this.pips.length < max) {
      const r = document.createElementNS(NS, "rect");
      r.setAttribute("width", "3"); r.setAttribute("height", "3"); r.setAttribute("y", `${SIZE - 4}`);
      this.svg.append(r); this.pips.push(r);
    }
    this.pips.forEach((r, i) => {
      if (!show || i >= max) { r.style.display = "none"; return; }
      r.style.display = "";
      r.setAttribute("x", `${Math.round(C - (max * 5 - 2) / 2 + i * 5)}`);
      r.setAttribute("fill", i < ready ? "rgba(111,230,255,.95)" : "rgba(232,226,244,.25)");
    });
  }
}
