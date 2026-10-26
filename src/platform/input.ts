// Gathers the player's input from keyboard, gamepad and touch into one set of controls per frame.
// The bindings are all in KEYS and PAD below (Ed, 2026-10-05: WASD and the mouse, right click
// dodges; 2026-10-06: "space for rise/land, E for place, Q for cycle. Mousewheel for zoom"; the
// arrow keys move too). Touch: the joystick and buttons in ui/touch.ts write into
// `touch`. The 💌 (issue #87) is aimed twin-stick: the cursor (a click fires) or the right stick (a
// trigger fires); 1 fires toward the cursor; on touch, its button fires the way she's going.
import type { Controls } from "../rules/game";

/** Keyboard bindings: each action and the keys (KeyboardEvent.code) that do it. */
export const KEYS = {
  left: ["KeyA", "ArrowLeft"], right: ["KeyD", "ArrowRight"], up: ["KeyW", "ArrowUp"], down: ["KeyS", "ArrowDown"],
  rise: ["Space"],
  // The dash is the right mouse button (no key: Space rises).
  spell: ["KeyR"], dash: [] as string[], place: ["KeyE"], cycle: ["KeyQ"],
  // Auto-talk on or off (Ed's playtest, 2026-10-04); with it off, she talks while Talk is held.
  autoTalk: ["KeyT"], talk: ["ShiftLeft", "ShiftRight"],
  invite: ["Digit1"],
  slot1: ["Digit1"], slot2: ["Digit2"], slot3: ["Digit3"], slot4: ["Digit4"],
  zoomIn: ["KeyZ", "Equal", "NumpadAdd"], zoomOut: ["KeyX", "Minus", "NumpadSubtract"],
  debug: ["Backquote"],
  // Playtest and debug keys.
  nextWave: ["KeyN"], pauseWaves: ["KeyP"], cycleSpeakers: ["KeyK"], inviteNearest: ["KeyI"], feedNearest: ["KeyB"], happyNearest: ["KeyO"],
} as const;

/** Gamepad bindings (standard mapping button numbers; PlayStation names): left stick or d-pad moves. Ed, 2026-10-10:
 *  cross (0) rises or lands, square (2) picks up and puts down (held on: a run, rules/leash.ts), the right trigger (7)
 *  invites, the left trigger (6) blinks. Ed, 2026-10-15: triangle (3) puts her hat down and picks it up (it was holding
 *  square), circle (1) cycles the stack (it was triangle); the broom's spell (the boost) moves off circle to L3 (10, the left
 *  stick pressed, where games put sprint). */
export const PAD = { rise: [0], dash: [6], spell: [10], sigil: [2], hat: [3], cycle: [1], zoomOut: [4], zoomIn: [5], invite: [7], debug: [8] } as const;

const GAME_KEYS = new Set<string>(Object.values(KEYS).flat() as string[]);

export interface TouchInput { x: number; y: number; toggle: boolean; zoom: number; debug: boolean; nextWave?: boolean; pauseWaves?: boolean; sigil?: boolean; spell?: boolean; dash?: boolean; /** The action bar's auto-talk slot was clicked. */ autoTalk?: boolean; /** The 💌 button is down. */ invite?: boolean; /** The sigil button is down (held: her hat, rules/hat.ts putHat). */ sigilHeld?: boolean }

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
  /** At a dressing station: the d-pad moves through its panel (ui/stationPanel.ts), not her; the left stick still walks her. */
  dpadMenu = false;
  /** What she last played with: the keyboard (or mouse), a gamepad or a touch screen; the use prompts show its button (E, □ or a
   *  tap: render/houseRooms.ts). A coarse-pointer-only screen starts on touch. */
  device: "keys" | "pad" | "touch" = typeof matchMedia === "function" && matchMedia("(pointer: coarse)").matches && !matchMedia("(any-pointer: fine)").matches ? "touch" : "keys";
  /** Where the mouse is (client pixels), or null before it has moved: for the aim reticle. */
  get cursor(): { x: number; y: number } | null { return this.pointer; }
  /** The ground under the cursor from her at the last read (metres), or null. */
  lastAim: { x: number; z: number } | null = null;
  private mouseDown = false;
  private mouseClicked = false;
  private rightClicked = false;
  /** The mouse wheel over the game since the last read, in pixels (down: zoom out). */
  private wheel = 0;

  constructor(target: Window = window) {
    target.addEventListener("keydown", e => {
      if (e.repeat) { if (this.isGameKey(e.code)) e.preventDefault(); return; }
      this.device = "keys";
      this.keys.add(e.code);
      if (this.isGameKey(e.code)) e.preventDefault();
      if (!this.onAny?.()) this.pressed.add(e.code);
    });
    // (let go seen first, in the capture phase: a panel taking the keys while it's open, the Studio's instruments, app/studio.ts, stops
    // the key-up after this; else a key held as it opened and let go inside it stays held for her after, as Ed's playtest of v4515
    // found walking into the Studio's mic: "it is as if the down key is permanently held". Input is made before the panels.)
    target.addEventListener("keyup", e => this.keys.delete(e.code), { capture: true });
    target.addEventListener("blur", () => this.release());
    if (typeof document !== "undefined") document.addEventListener("visibilitychange", () => { if (document.hidden) this.release(); });
    // The mouse: where the cursor is, and the left button over the game (not its panels and buttons).
    target.addEventListener("pointermove", e => { if (e.pointerType === "mouse") this.pointer = { x: e.clientX, y: e.clientY }; });
    target.addEventListener("pointerdown", e => {
      this.device = e.pointerType === "touch" ? "touch" : "keys";
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
    // The wheel zooms (Ed, 2026-10-06), over the game only (not the creator's sliders or the panels),
    // without scrolling the page: a step a notch (about 100 px), a trackpad's small deltas adding up.
    target.addEventListener("wheel", e => {
      if (!onCanvas(e)) return;
      e.preventDefault();
      this.wheel += e.deltaY * (e.deltaMode === 1 ? 33 : e.deltaMode === 2 ? 400 : 1);
    }, { passive: false });
  }

  private isGameKey(code: string): boolean { return GAME_KEYS.has(code); }

  /** Forget presses not yet read (the press that started the game is not also a move). */
  clearPresses(): void {
    this.pressed.clear();
    this.rightClicked = false; this.wheel = 0;
    const t = this.touch;
    t.toggle = false; t.zoom = 0; t.debug = false;
  }

  /** Let go of everything held and not yet read (a menu or overlay that takes the keys opening or closing, the page losing focus or
   *  hidden): a key-up it took, or one lost behind a frame, can't leave her walking. A key still down presses again. */
  release(): void {
    this.keys.clear(); this.mouseDown = false; this.mouseClicked = false;
    this.clearPresses();
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
    // A notch of the wheel a zoom step (the camera eases between steps), at most one a frame.
    if (Math.abs(this.wheel) >= 90) { zoom += Math.sign(this.wheel); this.wheel -= Math.sign(this.wheel) * 100; if (Math.abs(this.wheel) > 200) this.wheel = Math.sign(this.wheel) * 200; }
    let debug = p(KEYS.debug);
    let sigil = false, spell = p(KEYS.spell), dash = p(KEYS.dash) || this.rightClicked;
    const place = p(KEYS.place); let cycle = p(KEYS.cycle);
    // E held: a run (rules/leash.ts), and, with nothing to do, her hat (rules/hat.ts putHat); the pad's square only the run (its hat is triangle).
    let hatHold = k(KEYS.place) > 0, sigilHeld = hatHold, hat = false;
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
      const buttons = pad.buttons.map(b => b.pressed);
      const fresh = buttons.some((b, i) => b && !this.padPrev[i]);
      if (fresh || pad.axes.some(a => Math.abs(a) > 0.5)) this.device = "pad";
      const consumed = fresh && !!this.onAny?.();
      const P = padControls(buttons, pad.axes, this.padPrev, consumed, this.dpadMenu);
      moveX += P.moveX; moveZ += P.moveZ; zoom += P.zoom;
      if (P.toggleMode) toggleMode = true;
      if (P.debug) debug = true;
      if (P.sigil) sigil = true;
      if (P.sigilHeld) sigilHeld = true;
      if (P.hat) hat = true;
      if (P.spell) spell = true;
      if (P.cycle) cycle = true;
      if (P.dash) dash = true;
      if (P.aim) { aimX = P.aim.x; aimZ = P.aim.z; }
      if (P.fire) fire = true;
      this.padPrev = pad.buttons.map(b => b.pressed);
      break;
    }

    const t = this.touch;
    moveX += t.x; moveZ += t.y;
    if (t.toggle) toggleMode = true;
    zoom += t.zoom;
    if (t.debug) debug = true;
    if (t.sigil) sigil = true;
    if (t.sigilHeld) { sigilHeld = true; hatHold = true; }
    if (t.spell) spell = true;
    if (t.dash) dash = true;
    if (t.invite) { fire = true; if (!cursorAim) { aimX = 0; aimZ = 0; } }
    t.toggle = false; t.zoom = 0; t.debug = false; t.sigil = false; t.spell = false; t.dash = false;

    const len = Math.hypot(moveX, moveZ);
    if (len > 1) { moveX /= len; moveZ /= len; }
    const toggleAutoTalk = p(KEYS.autoTalk) || this.touch.autoTalk === true, talkHeld = k(KEYS.talk) > 0;
    this.touch.autoTalk = false;
    return { moveX, moveZ, toggleMode, zoom: Math.sign(zoom), place, cycle, debug, nextWave, pauseWaves, cycleSpeakers, sigil, sigilHeld, hatHold, hat, inviteNearest, happyNearest, spell, feedNearest, dash, toggleAutoTalk, talkHeld, fire, aimX, aimZ };
  }
}

/** One gamepad's part of a frame's controls (Input.read): its buttons and sticks, the buttons held last frame, whether a fresh press
 *  was taken by something else (Input.onAny), and whether a station's panel is open (`menu`, Input.dpadMenu). While it's open the
 *  panel owns the pad (Ed's playtest, 2026-10-23: the bottom face button, meaning to choose, flew her off from the bedroom): its
 *  d-pad, right stick and face buttons are the panel's (ui/stationPanel.ts), and only the left stick reaches the game, walking her. */
export function padControls(buttons: readonly boolean[], axes: readonly number[], prev: readonly boolean[], consumed: boolean, menu: boolean) {
  const btn = (i: number) => !!buttons[i], edge = (i: number) => !consumed && btn(i) && !prev[i], any = (a: readonly number[]) => a.some(edge);
  let sx = axes[0] ?? 0, sy = axes[1] ?? 0;
  const mag = Math.hypot(sx, sy), dead = 0.18;
  if (mag < dead) { sx = 0; sy = 0; } else { const s = (Math.min(1, mag) - dead) / (1 - dead) / mag; sx *= s; sy *= s; }
  const out = { moveX: sx, moveZ: sy, zoom: 0, toggleMode: false, debug: false, sigil: false, sigilHeld: false, hat: false, spell: false, cycle: false, dash: false, fire: false, aim: null as { x: number; z: number } | null };
  if (menu) return out; // (at a station: the left stick walks her, all else is its panel's)
  out.moveX += (btn(15) ? 1 : 0) - (btn(14) ? 1 : 0);
  out.moveZ += (btn(13) ? 1 : 0) - (btn(12) ? 1 : 0);
  out.toggleMode = any(PAD.rise);
  out.zoom = (any(PAD.zoomOut) ? 1 : 0) - (any(PAD.zoomIn) ? 1 : 0);
  out.debug = any(PAD.debug);
  out.sigil = any(PAD.sigil);
  out.sigilHeld = PAD.sigil.some(btn);
  out.hat = any(PAD.hat); out.spell = any(PAD.spell); out.cycle = any(PAD.cycle); out.dash = any(PAD.dash);
  // Twin-stick: the right stick aims (screen right is east, down is south), a trigger fires.
  const rx = axes[2] ?? 0, ry = axes[3] ?? 0;
  if (Math.hypot(rx, ry) > 0.3) out.aim = { x: rx * 20, z: ry * 20 }; // (as a point 20 m out that way: the dash reads a cursor's ground point)
  out.fire = PAD.invite.some(btn);
  return out;
}
