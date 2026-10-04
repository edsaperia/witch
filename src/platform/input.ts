// Gathers the player's input from keyboard, gamepad and touch into one set of controls per frame.
// Keyboard: WASD or arrows to fly, space to rise or descend, Z/X or +/- to zoom in/out, ~ for
// debug, hold T, F or Shift to talk (invite), E or R to put down or pick up a sigil, I (debug) to
// invite the nearest creature.
// Gamepad: left stick (or d-pad) to fly, hold A to talk, X for the sigil, Y to rise or descend,
// shoulders or triggers to zoom, Back/Select for debug. Touch: the joystick and buttons in ui/touch.ts write into `touch`.
import type { Controls } from "../rules/game";

export interface TouchInput { x: number; y: number; toggle: boolean; zoom: number; debug: boolean; nextWave?: boolean; pauseWaves?: boolean; talk?: boolean; sigil?: boolean }

export class Input {
  private keys = new Set<string>();
  private pressed = new Set<string>();
  private padPrev: boolean[] = [];
  readonly touch: TouchInput = { x: 0, y: 0, toggle: false, zoom: 0, debug: false };
  /** Any key, click, touch or button: used by the start screen, which returns true when the
   *  press started the game, so that press does nothing else. */
  onAny: (() => boolean) | null = null;

  constructor(target: Window = window) {
    target.addEventListener("keydown", e => {
      if (e.repeat) { if (this.isGameKey(e.code)) e.preventDefault(); return; }
      this.keys.add(e.code);
      if (this.isGameKey(e.code)) e.preventDefault();
      if (!this.onAny?.()) this.pressed.add(e.code);
    });
    target.addEventListener("keyup", e => this.keys.delete(e.code));
    target.addEventListener("blur", () => this.keys.clear());
  }

  private isGameKey(code: string): boolean {
    return /^(Arrow|Space$|Key[WASDZXENPTIFRB]$|Shift|Minus$|Equal$|NumpadAdd$|NumpadSubtract$|Backquote$)/.test(code);
  }

  /** Forget presses not yet read (the press that started the game is not also a move). */
  clearPresses(): void {
    this.pressed.clear();
    const t = this.touch;
    t.toggle = false; t.zoom = 0; t.debug = false;
  }

  /** This frame's controls; button presses are reported once. */
  read(): Controls & { debug: boolean } {
    const nextWave = this.pressed.has("KeyN") || this.touch.nextWave, pauseWaves = this.pressed.has("KeyP") || this.touch.pauseWaves;
    this.touch.nextWave = false; this.touch.pauseWaves = false;
    const k = (c: string) => (this.keys.has(c) ? 1 : 0), p = (c: string) => this.pressed.has(c);
    let moveX = k("KeyD") + k("ArrowRight") - k("KeyA") - k("ArrowLeft");
    let moveZ = k("KeyS") + k("ArrowDown") - k("KeyW") - k("ArrowUp");
    let toggleMode = p("Space");
    let zoom = (p("KeyX") || p("Minus") || p("NumpadSubtract") ? 1 : 0) - (p("KeyZ") || p("Equal") || p("NumpadAdd") ? 1 : 0);
    let debug = p("Backquote");
    let talk = k("KeyT") + k("KeyF") + k("ShiftLeft") + k("ShiftRight") > 0, sigil = p("KeyE") || p("KeyR");
    const inviteNearest = p("KeyI"), feedNearest = p("KeyB");
    this.pressed.clear();

    // Gamepads: the first one connected with any input.
    const pads = typeof navigator !== "undefined" && navigator.getGamepads ? navigator.getGamepads() : [];
    for (const pad of pads) {
      if (!pad) continue;
      const btn = (i: number) => !!pad.buttons[i]?.pressed;
      const fresh = pad.buttons.some((b, i) => b.pressed && !this.padPrev[i]);
      const consumed = fresh && !!this.onAny?.();
      const edge = (i: number) => !consumed && btn(i) && !this.padPrev[i];
      let sx = pad.axes[0] ?? 0, sy = pad.axes[1] ?? 0;
      const mag = Math.hypot(sx, sy), dead = 0.18;
      if (mag < dead) { sx = 0; sy = 0; } else { const s = (Math.min(1, mag) - dead) / (1 - dead) / mag; sx *= s; sy *= s; }
      sx += (btn(15) ? 1 : 0) - (btn(14) ? 1 : 0);
      sy += (btn(13) ? 1 : 0) - (btn(12) ? 1 : 0);
      moveX += sx; moveZ += sy;
      if (edge(3)) toggleMode = true;
      if (edge(4) || edge(6)) zoom += 1;
      if (edge(5) || edge(7)) zoom -= 1;
      if (edge(8)) debug = true;
      if (btn(0)) talk = true;
      if (edge(2)) sigil = true;
      this.padPrev = pad.buttons.map(b => b.pressed);
      break;
    }

    const t = this.touch;
    moveX += t.x; moveZ += t.y;
    if (t.toggle) toggleMode = true;
    zoom += t.zoom;
    if (t.debug) debug = true;
    if (t.talk) talk = true;
    if (t.sigil) sigil = true;
    t.toggle = false; t.zoom = 0; t.debug = false; t.sigil = false;

    const len = Math.hypot(moveX, moveZ);
    if (len > 1) { moveX /= len; moveZ /= len; }
    return { moveX, moveZ, toggleMode, zoom: Math.sign(zoom), debug, nextWave, pauseWaves, talk, sigil, inviteNearest, feedNearest };
  }
}
