// The freeze (Ed, 2026-10-05: "a pause control … to help me take screenshots" for debugging):
// Escape, gamepad Start or the ❚❚ button stops the game dead, music and all, as a true still;
// while frozen, . steps one fixed step (Shift+. ten), and a stamp says exactly what is on screen
// (version, seed, game time, where she is, the area, the camera) with a link to copy. P stays the
// waves' own pause; this one stops everything.
import { areaUnderWitch, STEP, stepGame, type Controls, type Game } from "../rules/game";

const STILL: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };

export class Freeze {
  frozen = false;
  /** Whether the game was already paused (the start screen, the end) when it froze. */
  private wasPaused = false;
  private padPrev = false;
  private readonly marker = document.createElement("div");
  private readonly stamp = document.createElement("pre");
  private readonly copy = document.createElement("button");
  readonly button = document.createElement("div");
  /** Whether the game has started (Escape on the start screen starts it, like any key). */
  started = () => true;
  /** Told on every freeze and thaw (the music's audio stops dead). */
  onToggle: (frozen: boolean) => void = () => {};

  constructor(private readonly game: Game, private readonly seed: number, private readonly build: string) {
    const panel = { position: "fixed", zIndex: "6", background: "rgba(14,11,28,.72)", color: "#e8e2f4", font: "12px ui-monospace, Menlo, Consolas, monospace", borderRadius: "6px", pointerEvents: "none" };
    Object.assign(this.marker.style, panel, { top: "10px", left: "50%", transform: "translateX(-50%)", padding: "4px 12px", fontSize: "16px", display: "none" });
    this.marker.textContent = "❚❚ paused · Esc resumes · . steps (Shift+. ten)";
    Object.assign(this.stamp.style, panel, { left: "10px", bottom: "64px", margin: "0", padding: "6px 8px", whiteSpace: "pre", display: "none" });
    Object.assign(this.copy.style, { marginTop: "6px", font: "inherit", pointerEvents: "auto", cursor: "pointer" });
    this.copy.textContent = "copy link";
    this.copy.addEventListener("click", () => this.copyLink());
    Object.assign(this.button.style, { position: "fixed", right: "10px", bottom: "44px", zIndex: "3", padding: "2px 8px", borderRadius: "6px", background: "rgba(14,11,28,.55)", color: "#e8e2f4", font: "14px ui-monospace, Menlo, Consolas, monospace", cursor: "pointer", userSelect: "none", pointerEvents: "auto" });
    this.button.id = "freeze";
    this.button.title = "pause (Esc)";
    this.button.textContent = "❚❚";
    this.button.addEventListener("pointerdown", e => { e.preventDefault(); e.stopPropagation(); this.toggle(); });
    document.body.append(this.marker, this.stamp, this.button);
    // Before the game's own input (capture), so a press while frozen never starts or flies anything.
    window.addEventListener("keydown", e => {
      if (e.code === "Escape" && !e.repeat && this.started()) { e.preventDefault(); this.toggle(); }
      else if (e.code === "Period" && this.frozen) { e.preventDefault(); this.step(e.shiftKey ? 10 : 1); }
    }, { capture: true });
  }

  toggle(): void {
    if (!this.frozen && !this.started()) return;
    this.frozen = !this.frozen;
    const g = this.game;
    if (this.frozen) { this.wasPaused = g.clock.paused; g.clock.paused = true; }
    else g.clock.paused = this.wasPaused;
    this.marker.style.display = this.stamp.style.display = this.frozen ? "block" : "none";
    this.button.textContent = this.frozen ? "▶" : "❚❚";
    this.button.title = this.frozen ? "resume (Esc)" : "pause (Esc)";
    this.onToggle(this.frozen);
  }

  /** Advance exactly n fixed steps, with no controls held. */
  step(n: number): void {
    const g = this.game;
    for (let i = 0; i < n; i++) { g.clock.paused = false; stepGame(g, STILL, STEP); g.clock.paused = true; }
  }

  /** Gamepad Start (standard button 9) toggles, read once a frame. */
  pollPad(): void {
    const pads = typeof navigator !== "undefined" && navigator.getGamepads ? navigator.getGamepads() : [];
    const pad = [...pads].find(p => p), down = !!pad?.buttons[9]?.pressed;
    if (down && !this.padPrev) this.toggle();
    this.padPrev = down;
  }

  /** The stamp's text, refreshed each drawn frame while frozen. */
  update(): void {
    if (!this.frozen) return;
    const g = this.game, w = g.witch, a = g.map.areaAt(w.x, w.z);
    const lines = [
      `${this.build}   seed ${this.seed}   wave ${g.party.wave}`,
      `time   ${g.clock.time.toFixed(3)} s (step ${Math.round(g.clock.time / STEP)})`,
      `at     ${w.x.toFixed(1)}, ${w.z.toFixed(1)} m   ${w.mode}`,
      `area   ${areaUnderWitch(g)}   cell ${a.cell[0]},${a.cell[1]}`,
      `camera zoom ${g.camera.zoomStep}`,
    ].join("\n");
    if (this.stamp.firstChild?.nodeValue !== lines) { this.stamp.textContent = lines + "\n"; this.stamp.append(this.copy); }
  }

  private copyLink(): void {
    const u = new URL(location.href);
    u.searchParams.set("seed", String(this.seed));
    void navigator.clipboard?.writeText(u.toString()).then(() => { this.copy.textContent = "copied"; setTimeout(() => (this.copy.textContent = "copy link"), 1200); }, () => {});
  }
}
