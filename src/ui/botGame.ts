// The bot game's tag (Ed, 2026-10-06: "start the game and watch the skilled bot play"): a small corner tag while a bot
// plays (rules/bot.ts), saying which bot and what she's doing now in a few words, with the speed (1×, 2×, 4×) and the way
// back to the start screen. The player's flying, aiming and buttons don't steer her; the camera's zoom still works.
import type { BotKind } from "../rules/bot";

export const BOT_SPEEDS = [1, 2, 4] as const;

export class BotTag {
  readonly el: HTMLDivElement;
  /** How fast the game runs (1, 2 or 4 times). */
  speed = 1;
  private doingEl: HTMLDivElement;
  private speedBtns: HTMLButtonElement[];
  private shown = "";

  constructor(kind: BotKind, private onExit: () => void) {
    const el = (this.el = document.createElement("div"));
    el.id = "bot-tag";
    Object.assign(el.style, { position: "fixed", left: "10px", top: "10px", zIndex: "4", padding: "6px 9px", borderRadius: "8px", background: "rgba(14,11,28,.72)", border: "1px solid rgba(255,190,110,.55)", color: "#f4ead8", font: "12px ui-monospace, Menlo, Consolas, monospace", pointerEvents: "auto", maxWidth: "min(320px, calc(100vw - 20px))" });
    const head = document.createElement("div");
    head.innerHTML = `<b style="color:#ffbe6e;letter-spacing:.08em">🤖 BOT GAME</b> <span style="opacity:.7">${kind}</span>`;
    this.doingEl = document.createElement("div");
    Object.assign(this.doingEl.style, { margin: "3px 0 5px", minHeight: "1.2em" });
    const row = document.createElement("div");
    Object.assign(row.style, { display: "flex", gap: "4px", alignItems: "center", flexWrap: "wrap" });
    const btn = (label: string, title: string, on: () => void) => {
      const b = document.createElement("button");
      b.type = "button"; b.textContent = label; b.title = title;
      Object.assign(b.style, { font: "inherit", padding: "1px 7px", borderRadius: "5px", border: "1px solid rgba(232,226,244,.4)", background: "rgba(255,255,255,.06)", color: "inherit", cursor: "pointer" });
      for (const ev of ["pointerdown", "pointerup", "touchstart", "mousedown"]) b.addEventListener(ev, e => e.stopPropagation()); // (not the game's input)
      b.addEventListener("click", e => { e.stopPropagation(); on(); });
      row.append(b);
      return b;
    };
    this.speedBtns = BOT_SPEEDS.map(s => btn(`${s}×`, `run at ${s}× (the ${s} key)`, () => this.setSpeed(s)));
    btn("✕ Esc", "back to the start screen (Esc)", () => this.onExit());
    el.append(head, this.doingEl, row);
    document.body.append(el);
    this.setSpeed(1);
    // Its keys: 1, 2, 4 the speed; Esc back to the start (before the freeze's own Esc).
    window.addEventListener("keydown", e => {
      if (e.code === "Escape") { e.preventDefault(); e.stopImmediatePropagation(); this.onExit(); return; }
      const s = { Digit1: 1, Digit2: 2, Digit4: 4, Numpad1: 1, Numpad2: 2, Numpad4: 4 }[e.code];
      if (s) { e.preventDefault(); this.setSpeed(s); }
    }, true);
  }

  setSpeed(s: number): void {
    this.speed = s;
    this.speedBtns.forEach((b, i) => { const on = BOT_SPEEDS[i] === s; b.style.background = on ? "rgba(255,190,110,.35)" : "rgba(255,255,255,.06)"; b.style.borderColor = on ? "#ffbe6e" : "rgba(232,226,244,.4)"; });
  }

  /** What she's doing now (rules/bot.ts Bot.doing); a new text only when it changes. */
  update(doing: string): void {
    if (doing === this.shown) return;
    this.shown = doing;
    this.doingEl.textContent = doing;
  }
}
