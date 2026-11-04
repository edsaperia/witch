import type { TelephoneState } from "./telephone";
/** Presentation only; never owns input or rules. DOM exists only during a call. */
export class TelephonePresence {
  private root: HTMLDivElement | null = null;
  private fade: HTMLDivElement | null = null;
  private key = "";
  constructor(private face: (number: string) => Node | null, private hangUp: () => void) {}
  refresh(): void { this.key = ""; }
  update(state: Readonly<TelephoneState>, active: boolean, visitor: boolean, anchor: readonly number[] | null, now = 0): void {
    if (active && state.status === "joining" && !this.fade) { this.fade = document.createElement("div"); this.fade.style.cssText = "position:fixed;inset:0;background:#100e1c;z-index:50;pointer-events:none;transition:opacity .25s"; document.body.append(this.fade); }
    if (this.fade) { this.fade.style.opacity = active && state.status === "joining" ? "1" : "0"; if (!active) { this.fade.remove(); this.fade = null; } }
    const visible = !visitor && !!state.peer && !!anchor && (active || state.status === "ringing");
    if (!visible) { this.root?.remove(); this.root = null; this.key = ""; return; }
    if (!this.root) { this.root = document.createElement("div"); this.root.style.cssText = "position:fixed;z-index:33;transform:translate(-50%,-100%);border:2px solid #ded0ff;border-radius:50%;padding:8px;background:#392d55cc;box-shadow:0 0 14px #bda0ff;pointer-events:auto"; document.body.append(this.root); }
    const key = `${state.peer}:${active}:${state.status}`;
    if (this.key !== key) { this.key = key; this.root.replaceChildren(); const face = this.face(state.peer!); if (face) this.root.append(face); if (active) { const kick = document.createElement("button"); kick.type = "button"; kick.textContent = "×"; kick.setAttribute("aria-label", "Hang up"); kick.style.cssText = "position:absolute;right:-6px;bottom:-6px;border-radius:50%;cursor:pointer"; kick.onclick = this.hangUp; this.root.append(kick); } }
    this.root.style.left = `${anchor![0]}px`; this.root.style.top = `${anchor![1] - 20}px`; this.root.style.opacity = state.status === "ringing" ? String(.4 + .6 * Math.abs(Math.sin(now / 200))) : "1";
  }
}
