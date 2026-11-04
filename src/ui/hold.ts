// Hold to confirm (Ed, 2026-11-02: "probably a 🗑️ next to each save file, hold to delete"; and the pause page's Reset everything):
// a press held `ms` acts, let go sooner and nothing happens, a fill showing how far. With reduced motion (the browser's) or Reduce
// flashing (render/comfort.ts) the fill steps in quarters rather than sweeping. No dialogs: the hold is the confirmation.
import { comfort } from "../render/comfort";
import { h, type Props } from "./dom";

export const reducedMotion = (): boolean => {
  try { return comfort.reduceFlashing || !!globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches; } catch { return comfort.reduceFlashing; }
};
/** The fill shown `progress` (0 to 1) of the way through a hold. */
export const holdFill = (progress: number, reduced: boolean): number => {
  const p = Math.min(1, Math.max(0, progress));
  return reduced ? Math.floor(p * 4) / 4 : p;
};

/** One hold: `start` on the press, `cancel` on the release; `paint` gets the fill each frame, `done` runs once it's held `ms`. */
export class Hold {
  private from: number | null = null;
  private frame = 0;
  constructor(readonly ms: number, private paint: (fill: number) => void, private done: () => void,
    private clock: () => number = () => performance.now(), private reduced: () => boolean = reducedMotion,
    private schedule: (f: () => void) => number = f => requestAnimationFrame(f), private unschedule: (id: number) => void = id => cancelAnimationFrame(id)) {}
  get held(): boolean { return this.from !== null; }
  start(): void { if (this.from !== null) return; this.from = this.clock(); this.paint(0); this.frame = this.schedule(this.loop); }
  cancel(): void { if (this.from === null) return; this.from = null; this.unschedule(this.frame); this.paint(0); }
  /** A frame: the fill, and `done` once held long enough. */
  tick(): void {
    if (this.from === null) return;
    const p = (this.clock() - this.from) / this.ms;
    if (p >= 1) { this.from = null; this.paint(0); this.done(); return; }
    this.paint(holdFill(p, this.reduced()));
  }
  private loop = (): void => { this.tick(); if (this.from !== null) this.frame = this.schedule(this.loop); };
}

/** A button acting only when held: the mouse or a touch held on it, Enter or Space held while it's focused, or the pad's choose
 *  (ui/menuFocus.ts sends `hold:start` and `hold:end` to a `data-hold` control). A click alone does nothing. Its fill is `--hold`. */
export function holdButton(text: string, ms: number, done: () => void, p: Props & { label: string }): HTMLButtonElement {
  const el = h("button", { ...p, type: "button", text, attrs: { ...p.attrs, "aria-label": p.label, "data-hold": "" } });
  const hold = new Hold(ms, f => el.style.setProperty("--hold", String(f)), done);
  const isKey = (e: KeyboardEvent) => e.code === "Enter" || e.code === "Space" || e.code === "NumpadEnter";
  el.addEventListener("pointerdown", e => { if (e.button === 0) hold.start(); });
  for (const ev of ["pointerup", "pointercancel", "pointerleave", "blur", "hold:end"]) el.addEventListener(ev, () => hold.cancel());
  el.addEventListener("hold:start", () => hold.start());
  el.addEventListener("keydown", e => { if (isKey(e)) { e.preventDefault(); if (!e.repeat) hold.start(); } });
  el.addEventListener("keyup", e => { if (isKey(e)) { e.preventDefault(); hold.cancel(); } });
  el.addEventListener("click", e => e.preventDefault());
  el.addEventListener("contextmenu", e => e.preventDefault()); // (a long touch is the hold, not the browser's menu)
  return el;
}
