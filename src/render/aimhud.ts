// The cursor over the game (the controls' feel, 2026-10-06): a small reticle in place of the
// arrow, where the mouse aims her 💌s. On the ground it says whether the ground under it is within
// a 💌's range (bright and whole inside, dim and broken beyond; just a dot in the treetops or
// sitting, where she can't throw), and while her dodge recharges a thin arc fills round it, so the
// eye on the aim sees both. Where a dodge would take her (toward the cursor: Ed's playtest,
// 2026-10-06), a small diamond on the ground, bright when it's ready, faint while it recharges.
// DOM only, laid over the canvas; nothing in the rules.
import type { Game } from "../rules/game";
import { dashCharge } from "../rules/dash";

const NS = "http://www.w3.org/2000/svg";
const SIZE = 36, C = SIZE / 2, RING = 7, ARC = 12;
const ARC_LEN = 2 * Math.PI * ARC;

export class AimHud {
  private root: HTMLDivElement;
  private ring: SVGCircleElement;
  private dot: SVGCircleElement;
  private arc: SVGCircleElement;
  private over = false;
  private flashUntil = 0;
  private wasCharging = false;
  private mark: HTMLDivElement;

  constructor(private canvas: HTMLCanvasElement, parent: HTMLElement = document.body) {
    this.root = document.createElement("div");
    this.root.id = "aim";
    Object.assign(this.root.style, { position: "fixed", left: "0", top: "0", width: `${SIZE}px`, height: `${SIZE}px`, pointerEvents: "none", zIndex: "2", display: "none", filter: "drop-shadow(0 0 2px rgba(0,0,0,.9))" });
    const svg = document.createElementNS(NS, "svg");
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
    this.mark = document.createElement("div");
    Object.assign(this.mark.style, { position: "fixed", left: "0", top: "0", width: "8px", height: "8px", marginLeft: "-4px", marginTop: "-4px", border: "1.5px solid rgba(111,230,255,.95)", boxSizing: "border-box", pointerEvents: "none", zIndex: "2", display: "none", filter: "drop-shadow(0 0 2px rgba(0,0,0,.9))" });
    parent.append(this.mark);
    canvas.addEventListener("pointerenter", e => { if (e.pointerType === "mouse") this.over = true; });
    canvas.addEventListener("pointerleave", () => { this.over = false; });
  }

  /** `pointer`: the mouse in client pixels (null: no mouse yet); `aim`: the ground under it from her
   *  (metres, null off the ground plane); `on`: the game is being played (not the start screen);
   *  `landing`: where a dodge would put her, in client pixels (null: none to show). */
  update(g: Game, time: number, pointer: { x: number; y: number } | null, aim: { x: number; z: number } | null, on: boolean, landing: { x: number; y: number } | null = null): void {
    const show = on && this.over && !!pointer;
    this.canvas.style.cursor = on ? "none" : "";
    const Wd = g.witches[0], grounded = Wd.body.mode === "ground" && !Wd.body.seated && !Wd.ko;
    if (show && landing && grounded) {
      this.mark.style.display = "block";
      this.mark.style.transform = `translate(${Math.round(landing.x)}px, ${Math.round(landing.y)}px) rotate(45deg)`;
      this.mark.style.opacity = dashCharge(Wd.dash, time) >= 1 ? "0.9" : "0.3";
    } else this.mark.style.display = "none";
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
    // The dodge's recharge: an arc filling round the ring, a short flash as it comes ready.
    const charge = dashCharge(W.dash, time), charging = charge < 1 && b.mode === "ground" && !b.seated;
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
}
