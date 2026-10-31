import { button, h } from "./dom";
import { SlideIn } from "./slideIn";
import { inputStack, type InputLayer } from "../platform/inputStack";
import { bindings } from "../platform/bindings";
import { textEntry } from "../platform/inputTarget";
import { MenuFocus } from "./menuFocus";
import { telephoneNumber } from "../app/telephoneBook";

export type TelephoneStatus = "connecting" | "available" | "dialling" | "ringing" | "confirming" | "joining" | "connected" | "unavailable" | "busy" | "ended" | "error";
export interface TelephoneState { own: string; status: TelephoneStatus; peer?: string; recent: readonly string[]; saved: boolean; detail?: string }
export interface TelephoneActions {
  dial(number: string): void; answer(): void; decline(): void; hangUp(): void; close(): void;
  retry?(): void;
  confirmIdentity?(): void;
  digit?(digit: string): void;
  /** The normal game's witch renderer supplies faces; never load a caller-provided image URL. */
  face?(number: string): Node | null;
}
const words: Record<TelephoneStatus, string> = { connecting: "Connecting the telephone…", available: "The line is ready.", dialling: "Calling…", ringing: "The telephone is ringing.", confirming: "This is a new number. Connect and remember this friend?", joining: "Joining your friend's night…", connected: "The line is connected.", unavailable: "That number isn't at the telephone.", busy: "That line is engaged.", ended: "The line has gone quiet.", error: "The call couldn't connect." };

/** Ed, 2026-10-31: slides FROM THE LEFT like the other stations; never a second game entry page. */
export class TelephonePanel {
  readonly root = h("section", { id: "telephone-panel", attrs: { "aria-label": "Telephone" } });
  private slide: SlideIn;
  private nav = new MenuFocus();
  private own = h("p", { class: "own-number" });
  private status = h("p", { attrs: { role: "status", "aria-live": "polite" } });
  private digits = h("input", { attrs: { "aria-label": "Number to call", inputmode: "numeric", maxlength: "7", autocomplete: "off" } });
  private book = h("div", { class: "address-book", attrs: { "aria-label": "Address book" } });
  private call: HTMLButtonElement;
  private answer: HTMLButtonElement;
  private decline: HTMLButtonElement;
  private hangup: HTMLButtonElement;
  private retry: HTMLButtonElement;
  private confirm: HTMLButtonElement;
  private openNow = false;
  private state: TelephoneState | null = null;
  private layer: InputLayer = {
    id: "telephone",
    acceptsKey: e => this.root.contains(e.target as Node | null),
    key: e => {
      if (e.type !== "keydown" || textEntry(e.target) || !bindings.keys("menu.back").includes(e.code)) return false;
      e.preventDefault(); if (!e.repeat) this.actions.close(); return true;
    },
  };
  constructor(private actions: TelephoneActions) {
    const style = h("style", { text: `#telephone-panel{position:fixed;left:0;top:0;bottom:0;z-index:32;width:min(340px,90vw);box-sizing:border-box;overflow:auto;padding:20px;background:rgba(14,11,28,.94);color:#e8e2f4;font:14px ui-monospace,monospace;border-right:1px solid #847291;display:flex;flex-direction:column;gap:14px}#telephone-panel button,#telephone-panel input{font:inherit;color:inherit;background:#30253e;border:1px solid #847291;border-radius:5px;padding:9px;cursor:pointer}#telephone-panel button:disabled{opacity:.45;cursor:default}#telephone-panel .own-number{background:#efdf91;color:#30232d;align-self:flex-start;padding:15px;transform:rotate(-3deg);white-space:pre-line}#telephone-panel input{width:100%;box-sizing:border-box;font-size:26px;letter-spacing:.25em;text-align:center}#telephone-panel .rotary-dial{position:relative;width:230px;height:230px;align-self:center;border:16px solid #802e3b;border-radius:50%;box-sizing:border-box;background:#392e39}#telephone-panel .rotary-dial button{position:absolute;width:38px;height:38px;border-radius:50%;padding:0}#telephone-panel .rotary-dial:after{content:'☎';position:absolute;inset:65px;display:grid;place-items:center;font-size:40px;pointer-events:none}#telephone-panel .address-book{display:flex;flex-wrap:wrap;gap:8px}#telephone-panel .address-book button{display:flex;align-items:center;gap:6px}#telephone-panel .address-book canvas{width:30px;height:40px;object-fit:contain;image-rendering:pixelated}` });
    document.head.append(style);
    this.call = button("Call", () => { if (telephoneNumber(this.digits.value) && !this.call.disabled) actions.dial(this.digits.value); });
    this.answer = button("Answer", () => actions.answer()); this.decline = button("Not now", () => actions.decline());
    this.hangup = button("Hang up", () => actions.hangUp());
    this.retry = button("Reconnect", () => actions.retry?.());
    this.confirm = button("Connect to this new number", () => actions.confirmIdentity?.());
    const dial = h("div", { class: "rotary-dial", attrs: { "aria-label": "Rotary dial" } });
    [..."1234567890"].forEach((digit, i) => {
      const angle = (-130 + i * 28) * Math.PI / 180;
      dial.append(button(digit, () => { if (this.digits.value.length < 7) { this.digits.value += digit; actions.digit?.(digit); this.paintCall(); } }, { attrs: { "aria-label": `Dial ${digit}` }, style: { left: `${83 + 78 * Math.cos(angle)}px`, top: `${83 + 78 * Math.sin(angle)}px` } }));
    });
    this.digits.addEventListener("input", () => { this.digits.value = this.digits.value.replace(/\D/g, "").slice(0, 7); this.paintCall(); });
    this.root.append(h("h2", { text: "Telephone" }), this.own, this.status, this.digits, dial,
      h("div", {}, button("Erase", () => { this.digits.value = this.digits.value.slice(0, -1); this.paintCall(); }), this.call),
      this.answer, this.decline, this.confirm, this.hangup, this.retry, h("h3", { text: "Address book" }), this.book, button("Step away", () => actions.close()));
    document.body.append(this.root); this.slide = new SlideIn(this.root, "left", "flex");
  }
  get open() { return this.openNow; }
  show(on: boolean): void {
    if (this.openNow === on) return;
    this.openNow = on;
    if (on) { inputStack.push(this.layer); this.slide.in(); }
    else { inputStack.remove(this.layer); if (this.root.contains(document.activeElement)) (document.activeElement as HTMLElement).blur(); this.slide.out(); }
  }
  render(state: TelephoneState): void {
    this.state = state;
    this.own.textContent = `Your number\n${state.own || "Connecting…"}${state.saved ? "" : "\nThis browser couldn't remember it."}`;
    this.status.textContent = `${words[state.status]}${state.peer ? ` ${state.peer}` : ""}${state.detail ? ` ${state.detail}` : ""}`;
    this.answer.hidden = this.decline.hidden = state.status !== "ringing";
    this.hangup.hidden = !["dialling", "confirming", "joining", "connected"].includes(state.status);
    this.confirm.hidden = state.status !== "confirming";
    this.retry.hidden = !["error", "ended"].includes(state.status);
    this.book.replaceChildren(...state.recent.map(number => {
      const b = button(number, () => { this.digits.value = number; this.paintCall(); });
      const face = this.actions.face?.(number); if (face) b.prepend(face); return b;
    }));
    this.paintCall();
  }
  /** The page provides the currently-owned pad; pause suppresses this path through inputStack. */
  pollPad(pad: Gamepad | null, now: number): void {
    if (this.openNow && inputStack.owns(this.layer)) this.nav.update([this.root], pad, now, () => this.actions.close());
  }
  redial(number: string): void { if (telephoneNumber(number)) { this.digits.value = number; this.paintCall(); } }
  private paintCall() { this.call.disabled = !this.state || !["available", "unavailable", "busy"].includes(this.state.status) || !telephoneNumber(this.digits.value) || this.digits.value === this.state.own; }
}
