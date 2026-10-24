// The wake-up on the page (the new opening, rules/wakeUp.ts; Ed, 2026-10-20, previews/ed/opening-mock/ beats 3a–5a): the bedroom
// dark while she's in bed, lit as she gets up; a card at the foot of the screen saying what each beat takes (her phone's alarm and
// E to snooze it, the snoozes counted and the next ring, WASD to get up and walk and dress while the island's made; the curtains open by themselves once it's ready), the curtains' "not yet"
// (with how far the island's build has got) and her phone ringing (platform/audio/chimes.ts alarm). Her own poses in bed are
// render/view/witch.ts's. Once the curtains open, a last line sends her out to her decks; gone once the party starts there.
import type { Game } from "../rules/game";
import type { WakeState } from "../rules/wakeUp";
import { dressed } from "../rules/clothesPile";

const KEY = "display:inline-block;min-width:1.4em;padding:0 5px;margin:0 2px;border:1px solid rgba(255,214,140,.7);border-radius:4px;background:rgba(255,214,140,.14);font-weight:700;text-align:center";
const k = (s: string) => `<span style="${KEY}">${s}</span>`;
/** How long the "not yet" stays up (s). */
const NOT_YET_FOR = 3;

export class WakeCard {
  private veil: HTMLDivElement;
  private card: HTMLDivElement;
  private html = "";
  private notYetAt = -Infinity;
  private dressFirstAt = -Infinity;
  private dark = 0;

  constructor() {
    this.veil = document.createElement("div");
    this.veil.id = "wake-veil";
    this.veil.style.cssText = "position:fixed;inset:0;z-index:8;pointer-events:none;background:radial-gradient(ellipse at 50% 55%, rgba(4,4,14,.55), rgba(2,2,8,.92));opacity:0;display:none";
    this.card = document.createElement("div");
    this.card.id = "wake-card";
    this.card.style.cssText = "position:fixed;left:50%;bottom:64px;transform:translateX(-50%);z-index:31;pointer-events:none;font:600 15px/1.5 ui-monospace,monospace;color:#f3e8ff;background:rgba(20,14,32,.86);border:1px solid rgba(255,214,140,.55);border-radius:10px;padding:8px 16px;text-align:center;white-space:nowrap;display:none";
    document.body.append(this.veil, this.card);
  }

  /** Asleep (after the bed, while the next island's made): the room dark, her snoring on the card, till the next night's wake-up. */
  sleep(): void {
    this.dark = 1; this.veil.style.display = "block"; this.veil.style.opacity = "1";
    this.html = "💤 … zzz …"; this.card.innerHTML = this.html; this.card.style.display = "block";
  }
  /** Off (no wake-up tonight, or it's over). */
  hide(): void { this.veil.style.display = "none"; this.card.style.display = "none"; }

  /** A frame: `ht` her clock, `dt` the frame's seconds; `build` the island's art so far; `ring` plays her phone's ring. */
  update(g: Game, ht: number, dt: number, build: { done: number; total: number }, ring: () => void): void {
    const w = g.wake;
    const toDecks = !!w?.open && g.party.spellAt === null; // (the curtains open, out to her decks: E there starts the party)
    if (!w || (w.open && this.dark < 0.01 && !toDecks)) { this.hide(); return; }
    if (w.events.includes("notYet")) this.notYetAt = ht;
    if (w.events.includes("dressFirst")) this.dressFirstAt = ht;
    // the dark: in bed, then lit as she stretches; the curtains opening let the night in
    const want = w.open ? 0 : w.beat === "dream" || w.beat === "alarm" || w.beat === "snooze" ? 1 : w.beat === "stretch" ? 1 - Math.min(1, (ht - w.at) / 1.5) * 0.75 : 0.25;
    this.dark += (want - this.dark) * Math.min(1, dt * 3);
    this.veil.style.display = "block";
    this.veil.style.opacity = this.dark.toFixed(3);
    if (w.beat === "alarm") ring();
    // (in her nightie still: the door waits for her to dress, last night's clothes in their pile by the bed: rules/clothesPile.ts)
    const pile = `${k("E")} at last night's clothes by your bed`;
    const html = toDecks && !dressed(w) ? (ht - this.dressFirstAt < NOT_YET_FOR ? `🚪 Get dressed first: ${pile}` : `👗 Get dressed: ${pile}, then out through the house to your decks`)
      : toDecks ? `Out through the house to your decks: ${k("E")} behind them starts the party` : w.open ? "" : this.text(w, ht, build, g.tuning.opening?.wake?.snooze ?? 5);
    if (html !== this.html) { this.html = html; this.card.innerHTML = html; }
    this.card.style.display = html ? "block" : "none";
  }

  private text(w: WakeState, ht: number, build: { done: number; total: number }, snooze: number): string {
    if (ht - this.notYetAt < NOT_YET_FOR) return `🪟 Not yet: the island's still being made${build.total ? ` (${build.done} of ${build.total})` : ""}…`;
    switch (w.beat) {
      case "dream": return "💤 … zzz …"; // (still asleep, dreaming: render/dream.ts; the alarm when it ends)
      case "alarm": return w.short ? `📱 ♪ ♫ ♪ your phone's alarm ♪ ♫ ♪<br>any key: up` : `📱 ♪ ♫ ♪ your phone's alarm ♪ ♫ ♪<br>${k("E")} snooze · ${k("W")}${k("A")}${k("S")}${k("D")} get up`;
      case "snooze": return `💤 five more minutes…${w.snoozes > 1 ? ` (snoozed ×${w.snoozes})` : ""} · rings again in ${Math.max(1, Math.ceil(snooze - (ht - w.at)))} s<br>${k("W")}${k("A")}${k("S")}${k("D")} get up`;
      case "stretch": return "*yaaawn* … *stretch*";
      case "up": return `${k("W")}${k("A")}${k("S")}${k("D")} walk · ${dressed(w) ? "dressed" : `get dressed: ${k("E")} at last night's clothes`} · the curtains open when the island's ready${build.total ? ` (${build.done} of ${build.total})` : ""}`;
    }
  }
}
