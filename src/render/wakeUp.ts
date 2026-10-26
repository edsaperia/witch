// The wake-up on the page (the new opening, rules/wakeUp.ts; Ed, 2026-10-20, previews/ed/opening-mock/ beats 3a–5a): the bedroom
// dark while she's in bed, lit as she gets up; a card at the foot of the screen while she dreams and stretches (in bed with her
// alarm ringing, its keys stand beside the bed instead: render/houseRooms.ts), and her phone ringing (platform/audio/chimes.ts alarm).
// Her own poses in bed are render/view/witch.ts's. Once she's up, no card (Ed, 2026-10-26, of the line sending her to her decks and
// to last night's clothes: "Please remove this tip").
import type { Game } from "../rules/game";
import type { WakeState } from "../rules/wakeUp";


export class WakeCard {
  private veil: HTMLDivElement;
  private card: HTMLDivElement;
  private html = "";
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

  /** A frame: `ht` her clock, `dt` the frame's seconds; `ring` plays her phone's ring. */
  update(g: Game, ht: number, dt: number, ring: () => void): void {
    const w = g.wake;
    if (!w || (w.open && this.dark < 0.01)) { this.hide(); return; }
    // the dark: in bed, then lit as she stretches and gets up
    const want = w.open ? 0 : w.beat === "dream" || w.beat === "alarm" || w.beat === "snooze" ? 1 : w.beat === "stretch" ? 1 - Math.min(1, (ht - w.at) / 1.5) * 0.75 : 0.25;
    this.dark += (want - this.dark) * Math.min(1, dt * 3);
    this.veil.style.display = "block";
    this.veil.style.opacity = this.dark.toFixed(3);
    if (w.beat === "alarm") ring();
    const html = w.open ? "" : this.text(w);
    if (html !== this.html) { this.html = html; this.card.innerHTML = html; }
    this.card.style.display = html ? "block" : "none";
  }

  private text(w: WakeState): string {
    switch (w.beat) {
      case "dream": return "💤 … zzz …"; // (still asleep, dreaming: render/dream.ts; the alarm when it ends)
      // (in bed with her alarm ringing, or snoozed: no card; its keys stand beside the bed, render/houseRooms.ts. Ed, 2026-10-26:
      // "This should just be WASD in keycaps to the left of the bed and 'E snooooze' to the right")
      case "alarm": case "snooze": return "";
      case "stretch": return "*yaaawn* … *stretch*";
      case "up": return ""; // (up is open: no card)
    }
  }
}
