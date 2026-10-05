// Gathers the player's input from keyboard, gamepad and touch into one set of controls per frame.
// The bindings are all in KEYS and PAD below (Ed, 2026-10-04: MOBA style, movement on the arrow
// keys and actions on 1 2 3 4 Q W E R). Touch: the joystick and buttons in ui/touch.ts write into
// `touch`. (No Talk button: she talks to creatures in range by herself, Ed v244.)
import type { Controls } from "../rules/game";

/** Keyboard bindings: each action and the keys (KeyboardEvent.code) that do it. */
export const KEYS = {
  left: ["ArrowLeft"], right: ["ArrowRight"], up: ["ArrowUp"], down: ["ArrowDown"],
  rise: ["Space"],
  spell: ["KeyQ"], dash: ["KeyW"], sigil: ["KeyE"],
  // Auto-talk on or off (Ed's playtest, 2026-10-04); with it off, she talks while Talk is held.
  autoTalk: ["KeyT", "Digit1"], talk: ["ShiftLeft", "ShiftRight"],
  slot1: ["Digit1"], slot2: ["Digit2"], slot3: ["Digit3"], slot4: ["Digit4"],
  zoomIn: ["KeyZ", "Equal", "NumpadAdd"], zoomOut: ["KeyX", "Minus", "NumpadSubtract"],
  debug: ["Backquote"],
  // Playtest and debug keys.
  nextWave: ["KeyN"], pauseWaves: ["KeyP"], cycleSpeakers: ["KeyK"], inviteNearest: ["KeyI"], feedNearest: ["KeyB"], happyNearest: ["KeyO"],
} as const;

/** The action bar's eight slots, in order, and what each holds (null: empty, for later spells,
 *  items and totems). */
export const ACTION_BAR: { key: string; code: string; action: "spell" | "dash" | "sigil" | "autoTalk" | null }[] = [
  { key: "1", code: "Digit1", action: "autoTalk" }, { key: "2", code: "Digit2", action: null }, { key: "3", code: "Digit3", action: null }, { key: "4", code: "Digit4", action: null },
  { key: "Q", code: "KeyQ", action: "spell" }, { key: "W", code: "KeyW", action: "dash" }, { key: "E", code: "KeyE", action: "sigil" }, { key: "R", code: "KeyR", action: null },
];

/** Gamepad bindings (standard mapping button numbers): left stick or d-pad moves. */
export const PAD = { rise: [3], dash: [0], spell: [1], sigil: [2], zoomOut: [4, 6], zoomIn: [5, 7], debug: [8] } as const;

const GAME_KEYS = new Set<string>(Object.values(KEYS).flat());

export interface TouchInput { x: number; y: number; toggle: boolean; zoom: number; debug: boolean; nextWave?: boolean; pauseWaves?: boolean; sigil?: boolean; spell?: boolean; dash?: boolean; /** The action bar's auto-talk slot was clicked. */ autoTalk?: boolean }

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

  private isGameKey(code: string): boolean { return GAME_KEYS.has(code); }

  /** Forget presses not yet read (the press that started the game is not also a move). */
  clearPresses(): void {
    this.pressed.clear();
    const t = this.touch;
    t.toggle = false; t.zoom = 0; t.debug = false;
  }

  /** This frame's controls; button presses are reported once. */
  read(): Controls & { debug: boolean; toggleAutoTalk: boolean } {
    const k = (a: readonly string[]) => (a.some(c => this.keys.has(c)) ? 1 : 0), p = (a: readonly string[]) => a.some(c => this.pressed.has(c));
    const nextWave = p(KEYS.nextWave) || this.touch.nextWave, pauseWaves = p(KEYS.pauseWaves) || this.touch.pauseWaves, cycleSpeakers = p(KEYS.cycleSpeakers);
    this.touch.nextWave = false; this.touch.pauseWaves = false;
    let moveX = k(KEYS.right) - k(KEYS.left);
    let moveZ = k(KEYS.down) - k(KEYS.up);
    let toggleMode = p(KEYS.rise);
    let zoom = (p(KEYS.zoomOut) ? 1 : 0) - (p(KEYS.zoomIn) ? 1 : 0);
    let debug = p(KEYS.debug);
    let sigil = p(KEYS.sigil), spell = p(KEYS.spell), dash = p(KEYS.dash);
    const inviteNearest = p(KEYS.inviteNearest), feedNearest = p(KEYS.feedNearest), happyNearest = p(KEYS.happyNearest);
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
      const any = (a: readonly number[]) => a.some(edge);
      if (any(PAD.rise)) toggleMode = true;
      if (any(PAD.zoomOut)) zoom += 1;
      if (any(PAD.zoomIn)) zoom -= 1;
      if (any(PAD.debug)) debug = true;
      if (any(PAD.sigil)) sigil = true;
      if (any(PAD.spell)) spell = true;
      if (any(PAD.dash)) dash = true;
      this.padPrev = pad.buttons.map(b => b.pressed);
      break;
    }

    const t = this.touch;
    moveX += t.x; moveZ += t.y;
    if (t.toggle) toggleMode = true;
    zoom += t.zoom;
    if (t.debug) debug = true;
    if (t.sigil) sigil = true;
    if (t.spell) spell = true;
    if (t.dash) dash = true;
    t.toggle = false; t.zoom = 0; t.debug = false; t.sigil = false; t.spell = false; t.dash = false;

    const len = Math.hypot(moveX, moveZ);
    if (len > 1) { moveX /= len; moveZ /= len; }
    const toggleAutoTalk = p(KEYS.autoTalk) || this.touch.autoTalk === true, talkHeld = k(KEYS.talk) > 0;
    this.touch.autoTalk = false;
    return { moveX, moveZ, toggleMode, zoom: Math.sign(zoom), debug, nextWave, pauseWaves, cycleSpeakers, sigil, inviteNearest, happyNearest, spell, feedNearest, dash, toggleAutoTalk, talkHeld };
  }
}
