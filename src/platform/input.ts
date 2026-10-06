// Gathers the player's input from keyboard, gamepad and touch into one set of controls per frame.
// The bindings are all in KEYS and PAD below (Ed, 2026-10-05: WASD and the mouse; right click
// dodges, Q goes up or down, E puts down a sigil or cycles them; the arrow keys move too). Touch: the joystick and buttons in ui/touch.ts write into
// `touch`. The 💌 (issue #87) is aimed twin-stick: the cursor (a click fires) or the right stick (a
// trigger fires); 1 fires toward the cursor; on touch, its button fires the way she's going.
import type { Controls } from "../rules/game";

/** Keyboard bindings: each action and the keys (KeyboardEvent.code) that do it. */
export const KEYS = {
  left: ["KeyA", "ArrowLeft"], right: ["KeyD", "ArrowRight"], up: ["KeyW", "ArrowUp"], down: ["KeyS", "ArrowDown"],
  rise: ["KeyQ"],
  // The dash is the right mouse button; Space does it too, for a trackpad.
  spell: ["KeyR"], dash: ["Space"], sigil: ["KeyE"],
  // Auto-talk on or off (Ed's playtest, 2026-10-04); with it off, she talks while Talk is held.
  autoTalk: ["KeyT"], talk: ["ShiftLeft", "ShiftRight"],
  invite: ["Digit1"],
  slot1: ["Digit1"], slot2: ["Digit2"], slot3: ["Digit3"], slot4: ["Digit4"],
  zoomIn: ["KeyZ", "Equal", "NumpadAdd"], zoomOut: ["KeyX", "Minus", "NumpadSubtract"],
  debug: ["Backquote"],
  // Playtest and debug keys.
  nextWave: ["KeyN"], pauseWaves: ["KeyP"], cycleSpeakers: ["KeyK"], inviteNearest: ["KeyI"], feedNearest: ["KeyB"], happyNearest: ["KeyO"],
} as const;

/** The action bar's eight slots, in order, and what each holds (null: empty, for later spells,
 *  items and totems). */
export const ACTION_BAR: { key: string; code: string; action: "spell" | "dash" | "sigil" | "rise" | "autoTalk" | "invite" | null }[] = [
  { key: "1", code: "Digit1", action: "invite" }, { key: "2", code: "Digit2", action: null }, { key: "3", code: "Digit3", action: null }, { key: "4", code: "Digit4", action: null },
  { key: "Q", code: "KeyQ", action: "rise" }, { key: "E", code: "KeyE", action: "sigil" }, { key: "R", code: "KeyR", action: "spell" }, { key: "RMB", code: "Space", action: "dash" },
];

/** Gamepad bindings (standard mapping button numbers): left stick or d-pad moves. */
export const PAD = { rise: [3], dash: [0], spell: [1], sigil: [2], zoomOut: [4], zoomIn: [5], invite: [6, 7], debug: [8] } as const;

const GAME_KEYS = new Set<string>(Object.values(KEYS).flat());

export interface TouchInput { x: number; y: number; toggle: boolean; zoom: number; debug: boolean; nextWave?: boolean; pauseWaves?: boolean; sigil?: boolean; spell?: boolean; dash?: boolean; /** The action bar's auto-talk slot was clicked. */ autoTalk?: boolean; /** The 💌 button is down. */ invite?: boolean }

export class Input {
  private keys = new Set<string>();
  private pressed = new Set<string>();
  private padPrev: boolean[] = [];
  readonly touch: TouchInput = { x: 0, y: 0, toggle: false, zoom: 0, debug: false };
  /** Any key, click, touch or button: used by the start screen, which returns true when the
   *  press started the game, so that press does nothing else. */
  onAny: (() => boolean) | null = null;
  /** The 💌's aim from the cursor: the world direction from her to the ground under (clientX, clientY). */
  aimFrom: ((clientX: number, clientY: number) => { x: number; z: number } | null) | null = null;
  private pointer: { x: number; y: number } | null = null;
  /** Where the mouse is (client pixels), or null before it has moved: for the aim reticle. */
  get cursor(): { x: number; y: number } | null { return this.pointer; }
  /** The ground under the cursor from her at the last read (metres), or null. */
  lastAim: { x: number; z: number } | null = null;
  private mouseDown = false;
  private mouseClicked = false;
  private rightClicked = false;

  constructor(target: Window = window) {
    target.addEventListener("keydown", e => {
      if (e.repeat) { if (this.isGameKey(e.code)) e.preventDefault(); return; }
      this.keys.add(e.code);
      if (this.isGameKey(e.code)) e.preventDefault();
      if (!this.onAny?.()) this.pressed.add(e.code);
    });
    target.addEventListener("keyup", e => this.keys.delete(e.code));
    target.addEventListener("blur", () => { this.keys.clear(); this.mouseDown = false; });
    // The mouse: where the cursor is, and the left button over the game (not its panels and buttons).
    target.addEventListener("pointermove", e => { if (e.pointerType === "mouse") this.pointer = { x: e.clientX, y: e.clientY }; });
    target.addEventListener("pointerdown", e => {
      if (e.pointerType !== "mouse" || e.button !== 0 || (e.target as HTMLElement | null)?.tagName !== "CANVAS") return;
      this.pointer = { x: e.clientX, y: e.clientY };
      if (this.onAny?.()) return;
      this.mouseDown = true; this.mouseClicked = true;
    });
    target.addEventListener("pointerup", e => { if (e.pointerType === "mouse" && e.button === 0) this.mouseDown = false; });
    // The right button dodges (the dash), over the game only, without its menu. A mousedown, not a
    // pointerdown, so it still counts while the left button is held (a chorded press fires no pointerdown).
    const onCanvas = (e: Event) => (e.target as HTMLElement | null)?.tagName === "CANVAS";
    target.addEventListener("mousedown", e => {
      if (e.button !== 2 || !onCanvas(e)) return;
      e.preventDefault();
      if (this.onAny?.()) return;
      this.rightClicked = true;
    });
    target.addEventListener("contextmenu", e => { if (onCanvas(e)) e.preventDefault(); });
  }

  private isGameKey(code: string): boolean { return GAME_KEYS.has(code); }

  /** Forget presses not yet read (the press that started the game is not also a move). */
  clearPresses(): void {
    this.pressed.clear();
    this.rightClicked = false;
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
    let sigil = p(KEYS.sigil), spell = p(KEYS.spell), dash = p(KEYS.dash) || this.rightClicked;
    this.rightClicked = false;
    const inviteNearest = p(KEYS.inviteNearest), feedNearest = p(KEYS.feedNearest), happyNearest = p(KEYS.happyNearest);
    // The 💌: fire with the mouse button or 1 (held, or a click since the last read); aim at the cursor.
    let fire = this.mouseDown || this.mouseClicked || k(KEYS.invite) > 0 || p(KEYS.invite);
    this.mouseClicked = false;
    const cursorAim = this.pointer && this.aimFrom ? this.aimFrom(this.pointer.x, this.pointer.y) : null;
    this.lastAim = cursorAim;
    let aimX = cursorAim?.x ?? 0, aimZ = cursorAim?.z ?? 0;
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
      // Twin-stick: the right stick aims (screen right is east, down is south), a trigger fires.
      const rx = pad.axes[2] ?? 0, ry = pad.axes[3] ?? 0;
      if (Math.hypot(rx, ry) > 0.3) { aimX = rx; aimZ = ry; }
      if (PAD.invite.some(btn)) fire = true;
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
    if (t.invite) { fire = true; if (!cursorAim) { aimX = 0; aimZ = 0; } }
    t.toggle = false; t.zoom = 0; t.debug = false; t.sigil = false; t.spell = false; t.dash = false;

    const len = Math.hypot(moveX, moveZ);
    if (len > 1) { moveX /= len; moveZ /= len; }
    const toggleAutoTalk = p(KEYS.autoTalk) || this.touch.autoTalk === true, talkHeld = k(KEYS.talk) > 0;
    this.touch.autoTalk = false;
    return { moveX, moveZ, toggleMode, zoom: Math.sign(zoom), debug, nextWave, pauseWaves, cycleSpeakers, sigil, inviteNearest, happyNearest, spell, feedNearest, dash, toggleAutoTalk, talkHeld, fire, aimX, aimZ };
  }
}
