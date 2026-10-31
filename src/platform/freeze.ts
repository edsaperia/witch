// The freeze (Ed, 2026-10-05: "a pause control … to help me take screenshots" for debugging):
// Escape or gamepad Start stops (the ❚❚ button went: Ed, 2026-10-10) the game dead, music and all, as a true still;
// while frozen, . steps one fixed step (Shift+. ten), and a stamp says exactly what is on screen
// (version, seed, game time, where she is, the area, the camera) with a link to copy. P stays the
// waves' own pause; this one stops everything.
//
// The pause page over everything (Ed's playtest, 2026-10-23: "pause menu should go on top of e.g. map screen and other things
// like that"), in this one place rather than overlay by overlay: while frozen a clear shield covers the screen above every overlay
// (the map table's and the sea chart, the station panels, the Workshop's, the telescope, the finds dev panel, the zoo...), the
// pause page's own pieces (PAUSE_UI) above it, so only they take the mouse; every key not aimed at them stops here, before any
// overlay's listener (this one is made before theirs), Esc included, so Esc pauses instead of also shutting what's open (at a
// Studio instrument Esc is still hers first: Ed, 2026-10-23, "Esc steps her away, the next Esc pauses", main.ts freeze.started); and the gamepad reads as none to all but the freeze (navigator.getGamepads wrapped), so
// an overlay's own pad loop doesn't move under the pause. Thawed, everything is as it was: the overlay open as it was left.
import { areaUnderWitch, STEP, stepGame, type Controls, type Game } from "../rules/game";
import { bindings } from "./bindings";
import { textEntry } from "./inputTarget";
import { inputStack, type InputLayer } from "./inputStack";

/** Start always reaches pause, even after its configurable binding is changed or cleared. */
export const padPauseHeld = (buttons: readonly boolean[], axes: readonly number[]): boolean => !!buttons[9] || bindings.padHeld("global.pause", buttons, axes);

const STILL: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
/** The pause page's own pieces: above the shield while frozen, and the only things keys and the mouse reach then (its test
 *  sliders, its Controls / What's new / Options buttons and their panel, the Music Lab, the new-build notice, the freeze's stamp). */
export const PAUSE_UI = ["#settings-page", "#potion-lab", "#pause-sliders", "#pause-btns", ".corner-panel", "#music-lab", "#new-build", "#freeze-marker", "#freeze-stamp"];
/** Over every overlay (the highest is the corner panel's 62). */
const PAUSE_Z = 1000;
const LAYER_CSS = `#pause-shield { position: fixed; inset: 0; z-index: ${PAUSE_Z}; display: none; }
body.paused #pause-shield { display: block; }
body.paused :is(${PAUSE_UI.join(", ")}) { z-index: ${PAUSE_Z + 1} !important; }`;

/** The browser's own gamepads (the freeze reads them; everyone else through the wrapper, none while frozen). */
const realPads = typeof navigator !== "undefined" && navigator.getGamepads ? navigator.getGamepads.bind(navigator) : null;

export class Freeze {
  mutate: (label: string, action: () => void) => void = (_label, action) => action();
  advance: (game: Game, controls: Controls, dt: number) => void = stepGame;
  frozen = false;
  private readonly layer: InputLayer = {
    id: "pause",
    // Native pause controls keep browser defaults (typing, slider arrows, Enter clicks) without propagating to game/panels.
    // Settings retains its window key handler until its separately released migration.
    acceptsKey: e => !!(e.target as Element | null)?.closest?.("#settings-page, #potion-lab") || e.code === 'Escape' && !!document.querySelector('#potion-lab.open'),
    key: e => e.type === "keydown" && this.shortcut(e),
  };
  /** Whether the game was already paused (the start screen, the end) when it froze. */
  private wasPaused = false;
  private padPrev = false;
  /** The pad's buttons held as the pause ended, hidden from every reader until let go: the press that resumed (the pause page's
   *  Back, ui/menuFocus.ts) is the resume and nothing else, not a fresh press to the chart or a station under it (pause-on-top). */
  private heldAtThaw = new Set<number>();
  /** The pad's buttons held as the pause began, for the pause page's first frame (ui/menuFocus.ts primes on these, not on what's
   *  held by then): a slow frame can come seconds after Esc, and a B pressed in between is a press, not the one that opened the
   *  page (the pause-on-top B flake, 2026-10-30: the first paused frame 3 s after Esc, B already down, swallowed). Taken once. */
  private openPad: boolean[] | null = null;
  private readonly marker = document.createElement("div");
  private readonly stamp = document.createElement("pre");
  private readonly copy = document.createElement("button");
  /** Whether the game has started (Escape on the start screen starts it, like any key). */
  started = () => true;
  /** Whether Esc is the pause's (false: someone else's, e.g. the bot game's way back to the start screen). */
  ownsEsc = () => true;
  /** Told on every freeze and thaw (the music's audio stops dead; the pause page's sliders slide in). */
  onToggle: (frozen: boolean) => void = () => {};
  /** Quiet (Ed, 2026-10-12: "the pause page shouldn't put any other overlay on the game"): no card or stamp of its own; the
   *  stamp's text goes to onStamp instead (the pause page's sliders show it at their foot: ui/decide.ts PauseSliders). */
  quiet = false;
  onStamp: (text: string) => void = () => {};
  /** More lines for the stamp (main.ts: what the GPU holds, render/view/gpuBudget.ts gpuLine). */
  extra: () => string[] = () => [];

  constructor(private game: Game, private seed: number, private readonly build: string) {
    const panel = { position: "fixed", zIndex: "6", background: "rgba(14,11,28,.72)", color: "#e8e2f4", font: "12px ui-monospace, Menlo, Consolas, monospace", borderRadius: "6px", pointerEvents: "none" };
    Object.assign(this.marker.style, panel, { top: "10px", left: "50%", transform: "translateX(-50%)", padding: "4px 12px", fontSize: "16px", display: "none" });
    this.marker.textContent = "❚❚ paused · Esc resumes · . steps (Shift+. ten)";
    Object.assign(this.stamp.style, panel, { left: "10px", bottom: "64px", margin: "0", padding: "6px 8px", whiteSpace: "pre", display: "none" });
    Object.assign(this.copy.style, { marginTop: "6px", font: "inherit", pointerEvents: "auto", cursor: "pointer" });
    this.copy.textContent = "copy link";
    this.copy.addEventListener("click", () => this.copyLink());
    this.marker.id = "freeze-marker"; this.stamp.id = "freeze-stamp";
    const style = document.createElement("style"), shield = document.createElement("div");
    style.textContent = LAYER_CSS; shield.id = "pause-shield";
    document.head.append(style);
    document.body.append(this.marker, this.stamp, shield);
    // Before the game's own input and every overlay's (capture, and made first), so a press while frozen never starts, flies or
    // chooses anything: Esc is the pause's alone; frozen, only the pause page's own pieces have keys.
    const key = (e: KeyboardEvent) => {
      // Track the opening press before push(), so its repeats cannot close the new owner.
      if (inputStack.key(e) || !inputStack.top && e.type === "keydown" && this.shortcut(e)) {
        // Stopping listeners does not stop Enter/Space activating a focused native control behind pause.
        if (this.frozen && inputStack.top === this.layer && ["Enter", "NumpadEnter", "Space"].includes(e.code)
          && !(e.target as Element | null)?.closest?.(PAUSE_UI.join(","))) e.preventDefault();
        e.stopImmediatePropagation();
      }
    };
    window.addEventListener("keydown", key, { capture: true });
    window.addEventListener("keyup", key, { capture: true });
    window.addEventListener("blur", () => inputStack.release());
    document.addEventListener("visibilitychange", () => { if (document.hidden) inputStack.release(); });
    // The gamepad, while frozen, the freeze's alone (pollPad's Start): every other reader of it sees none.
    if (realPads) Object.defineProperty(navigator, "getGamepads", { configurable: true, writable: true, value: () => (inputStack.owns(null) ? this.thawed(realPads()) : []) });
  }

  /** Pause shortcuts belong to this layer; Settings and Studio retain their existing exceptions. */
  private shortcut(e: KeyboardEvent): boolean {
    if (this.frozen && textEntry(e.target) && e.code !== "Escape") return false;
    if (bindings.keys("global.pause").includes(e.code) && this.ownsEsc() && (this.frozen || this.started())) {
      e.preventDefault();
      if (!e.repeat) this.toggle();
      return true;
    }
    if (e.code === "Period" && this.frozen && !textEntry(e.target) && !document.querySelector('#potion-lab.open')) {
      e.preventDefault(); this.step(e.shiftKey ? 10 : 1); return true;
    }
    return false;
  }

  /** A new night on the same page (app/night.ts): its game and seed from here on. */
  retarget(game: Game, seed: number): void { this.game = game; this.seed = seed; }

  toggle(): void {
    this.mutate("pause page", () => this.toggleNow());
  }
  private toggleNow(): void {
    if (!this.frozen && !this.started()) return;
    this.frozen = !this.frozen;
    const g = this.game;
    if (this.frozen) { this.wasPaused = g.clock.paused; g.clock.paused = true; this.openPad = this.pad()?.buttons.map(b => b.pressed) ?? []; }
    else { this.openPad = null; g.clock.paused = this.wasPaused; this.heldAtThaw = new Set([...(realPads?.() ?? [])].find(p => p)?.buttons.flatMap((b, i) => (b.pressed ? [i] : [])) ?? []); }
    if (this.frozen) inputStack.push(this.layer); else inputStack.remove(this.layer);
    document.body.classList.toggle("paused", this.frozen);
    const focused = document.activeElement;
    if (this.frozen && focused && focused instanceof HTMLElement && !focused.closest(PAUSE_UI.join(","))) focused.blur();
    // (thawed, a pause-page control the pad or mouse focused lets go: it kept every key from her after, E opening nothing; pause-on-top)
    if (!this.frozen && document.activeElement instanceof HTMLElement && document.activeElement.closest(PAUSE_UI.join(","))) document.activeElement.blur();
    this.onToggle(this.frozen);
    // onToggle mounts/shows these controls. Start keyboard navigation here instead of an underlying panel or BODY.
    if (this.frozen && !(document.activeElement as Element | null)?.closest?.(PAUSE_UI.join(","))) {
      const first = document.querySelector<HTMLButtonElement>("#pause-btns button:not(:disabled)");
      if (first?.getClientRects().length) first.focus();
    }
    this.marker.style.display = this.stamp.style.display = this.frozen && !this.quiet ? "block" : "none";
  }

  /** The pads as every other reader sees them: the buttons held at the thaw read as up until they're let go. */
  private thawed(pads: (Gamepad | null)[]): (Gamepad | null)[] {
    if (!this.heldAtThaw.size) return pads;
    const pad = [...pads].find(p => p);
    if (!pad) { this.heldAtThaw.clear(); return pads; }
    for (const i of [...this.heldAtThaw]) if (!pad.buttons[i]?.pressed) this.heldAtThaw.delete(i);
    if (!this.heldAtThaw.size) return pads;
    const up = { pressed: false, touched: false, value: 0 } as GamepadButton;
    const masked = { connected: pad.connected, id: pad.id, index: pad.index, mapping: pad.mapping, timestamp: pad.timestamp, axes: pad.axes, vibrationActuator: pad.vibrationActuator, buttons: pad.buttons.map((b, i) => (this.heldAtThaw.has(i) ? up : b)) } as unknown as Gamepad;
    return [...pads].map(p => (p === pad ? masked : p));
  }

  /** Advance exactly n fixed steps, with no controls held. */
  step(n: number): void {
    const g = this.game;
    for (let i = 0; i < n; i++) {
      this.mutate("single step: resume", () => { g.clock.paused = false; });
      this.advance(g, STILL, STEP);
      this.mutate("single step: pause", () => { g.clock.paused = true; });
    }
  }

  /** Pause and its legacy Settings child read the real pad only while this layer owns it (or before opening). */
  pad(): Gamepad | null {
    if (!inputStack.owns(null) && !inputStack.owns(this.layer)) return null;
    return [...(realPads?.() ?? [])].find(p => p) ?? null;
  }

  /** The buttons held as the pause began, once (the pause page's first frame), then undefined. */
  takeOpenPad(): boolean[] | undefined { const o = this.openPad ?? undefined; this.openPad = null; return o; }

  /** The pad's pause (Options, standard button 9: platform/bindings.ts global.pause) toggles, read once a frame. */
  pollPad(): void {
    const pad = [...(realPads?.() ?? [])].find(p => p), down = !!pad && padPauseHeld(pad.buttons.map(b => b.pressed), pad.axes);
    if (down && !this.padPrev) {
      if (document.querySelector('#potion-lab.open')) document.querySelector('#potion-lab.open')!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', bubbles: true }));
      else this.toggle();
    }
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
      ...this.extra(),
    ].join("\n");
    if (this.quiet) { this.onStamp(lines); return; }
    if (this.stamp.firstChild?.nodeValue !== lines) { this.stamp.textContent = lines + "\n"; this.stamp.append(this.copy); }
  }

  private copyLink(): void {
    const u = new URL(location.href);
    u.searchParams.set("seed", String(this.seed));
    void navigator.clipboard?.writeText(u.toString()).then(() => { this.copy.textContent = "copied"; setTimeout(() => (this.copy.textContent = "copy link"), 1200); }, () => {});
  }
}
