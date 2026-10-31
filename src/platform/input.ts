// Gathers the player's input from keyboard, mouse, gamepad and touch into one set of controls per frame.
// The bindings are platform/bindings.ts's (config/bindings.json, with the player's own over it: Ed, 2026-10-28, "make it easy to
// manage and remap keys"); Ed's pad layout, 2026-10-28, is there. Touch: the joystick and buttons in ui/touch.ts write into
// `touch`. The 💌 (issue #87) is aimed twin-stick: the cursor (a click fires) or the right stick (a trigger fires); 1 fires toward
// the cursor; on touch, its button fires the way she's going.
import type { Controls } from "../rules/game";
import { bindings, type ActionId, type Bindings } from "./bindings";

/** The keys the game takes from the page (no scrolling, no browser shortcut): every game action's (Esc is the pause's, platform/freeze.ts). */
let gameKeys = new Set<string>(), gameKeysAt = -1;
function isGameKey(code: string): boolean {
  if (gameKeysAt !== bindings.version) { gameKeysAt = bindings.version; gameKeys = new Set(bindings.list().filter(a => a.context === "game").flatMap(a => a.keys)); }
  return gameKeys.has(code);
}
const MOUSE_NAMES = ["left", "middle", "right"] as const;

export interface TouchInput { x: number; y: number; toggle: boolean; zoom: number; debug: boolean; nextWave?: boolean; pauseWaves?: boolean; sigil?: boolean; spell?: boolean; dash?: boolean; /** The action bar's auto-talk slot was clicked. */ autoTalk?: boolean; /** The 💌 button is down. */ invite?: boolean; /** The sigil button is down (held: her hat, rules/hat.ts putHat). */ sigilHeld?: boolean }

export class Input {
  private keys = new Set<string>();
  private pressed = new Set<string>();
  private padPrev: boolean[] = [];
  private padPrevAxes: number[] = [];
  readonly touch: TouchInput = { x: 0, y: 0, toggle: false, zoom: 0, debug: false };
  /** Any key, click, touch or button: used by the start screen, which returns true when the
   *  press started the game, so that press does nothing else. */
  onAny: (() => boolean) | null = null;
  /** The 💌's aim from the cursor: the world direction from her to the ground under (clientX, clientY). */
  aimFrom: ((clientX: number, clientY: number) => { x: number; z: number } | null) | null = null;
  private pointer: { x: number; y: number } | null = null;
  /** At a dressing station: the d-pad moves through its panel (ui/stationPanel.ts), not her; the left stick still walks her. */
  dpadMenu = false;
  /** What she last played with: the keyboard (or mouse), a gamepad or a touch screen; the use prompts show its button (as bound: E, ✕ or a
   *  tap: render/houseRooms.ts). A coarse-pointer-only screen starts on touch. */
  device: "keys" | "pad" | "touch" = typeof matchMedia === "function" && matchMedia("(pointer: coarse)").matches && !matchMedia("(any-pointer: fine)").matches ? "touch" : "keys";
  /** Where the mouse is (client pixels), or null before it has moved: for the aim reticle. */
  get cursor(): { x: number; y: number } | null { return this.pointer; }
  /** The ground under the cursor from her at the last read (metres), or null. */
  lastAim: { x: number; z: number } | null = null;
  private mouseHeld = new Set<string>();
  /** The last pointer identifies touch's compatibility mouse events, which aren't mouse input. */
  private mousePointer = true;
  /** Mouse buttons pressed over the game since the last read, even if released before that read. */
  private mousePressed = new Set<string>();
  /** The mouse wheel over the game since the last read, in pixels (down: zoom out). */
  private wheel = 0;
  /** Talk held (as ever) or toggled, a press to start and another to stop (the Settings page: app/playerSettings.ts talk). */
  talkMode: "hold" | "toggle" = "hold";
  private talkOn = false;

  constructor(target: Window = window) {
    target.addEventListener("keydown", e => {
      if (e.repeat) { if (isGameKey(e.code)) e.preventDefault(); return; }
      this.device = "keys";
      this.keys.add(e.code);
      if (isGameKey(e.code)) e.preventDefault();
      if (!this.onAny?.()) this.pressed.add(e.code);
    });
    // (let go seen first, in the capture phase: a panel taking the keys while it's open, the Studio's instruments, app/studio.ts, stops
    // the key-up after this; else a key held as it opened and let go inside it stays held for her after, as Ed's playtest of v4515
    // found walking into the Studio's mic: "it is as if the down key is permanently held". Input is made before the panels.)
    target.addEventListener("keyup", e => this.keys.delete(e.code), { capture: true });
    target.addEventListener("blur", () => this.release());
    if (typeof document !== "undefined") document.addEventListener("visibilitychange", () => { if (document.hidden) this.release(); });
    // Mouse buttons use mousedown/up: a chorded press/release doesn't always emit pointerdown/up.
    // Pointer events still distinguish real mouse input from a touch's compatibility mouse events.
    target.addEventListener("pointermove", e => { if (e.pointerType === "mouse") { this.pointer = { x: e.clientX, y: e.clientY }; this.device = "keys"; } });
    target.addEventListener("pointerdown", e => {
      this.device = e.pointerType === "touch" ? "touch" : "keys";
      this.mousePointer = e.pointerType === "mouse";
    });
    const onCanvas = (e: Event) => (e.target as HTMLElement | null)?.tagName === "CANVAS";
    target.addEventListener("mousedown", e => {
      if (!this.mousePointer || !MOUSE_NAMES[e.button] || !onCanvas(e)) return;
      e.preventDefault();
      this.pointer = { x: e.clientX, y: e.clientY };
      if (this.onAny?.()) return;
      this.mouseHeld.add(MOUSE_NAMES[e.button]);
      this.mousePressed.add(MOUSE_NAMES[e.button]);
    });
    // Capture releases even over a panel that takes the event, so no held action sticks afterwards.
    target.addEventListener("mouseup", e => { this.mouseHeld.delete(MOUSE_NAMES[e.button]); }, { capture: true });
    target.addEventListener("pointercancel", e => { if (e.pointerType === "mouse") this.release(); });
    target.addEventListener("contextmenu", e => { if (onCanvas(e)) e.preventDefault(); });
    // The wheel zooms (Ed, 2026-10-06), over the game only (not the creator's sliders or the panels),
    // without scrolling the page: a step a notch (about 100 px), a trackpad's small deltas adding up.
    target.addEventListener("wheel", e => {
      if (!onCanvas(e)) return;
      this.device = "keys";
      e.preventDefault();
      this.wheel += e.deltaY * (e.deltaMode === 1 ? 33 : e.deltaMode === 2 ? 400 : 1);
    }, { passive: false });
  }

  /** Forget presses not yet read (the press that started the game is not also a move). */
  clearPresses(): void {
    this.pressed.clear();
    this.mousePressed.clear(); this.wheel = 0;
    const t = this.touch;
    t.toggle = false; t.zoom = 0; t.debug = false;
  }

  /** Let go of everything held and not yet read (a menu or overlay that takes the keys opening or closing, the page losing focus or
   *  hidden): a key-up it took, or one lost behind a frame, can't leave her walking. A key still down presses again. */
  release(): void {
    this.keys.clear(); this.mouseHeld.clear();
    this.clearPresses();
  }

  /** This frame's controls; button presses are reported once. */
  read(): Controls & { debug: boolean; toggleAutoTalk: boolean } {
    const B = bindings;
    // the mouse: each button held or pressed since the last read, the wheel's notches (a step a notch, about
    // 100 px, at most one a frame, a trackpad's small deltas adding up; the camera eases between steps)
    let notch = "";
    if (Math.abs(this.wheel) >= 90) { notch = this.wheel > 0 ? "wheelDown" : "wheelUp"; this.wheel -= Math.sign(this.wheel) * 100; if (Math.abs(this.wheel) > 200) this.wheel = Math.sign(this.wheel) * 200; }
    const k = (id: ActionId) => (B.keys(id).some(c => this.keys.has(c)) || B.mouse(id).some(m => this.mouseHeld.has(m)) ? 1 : 0);
    const p = (id: ActionId) => B.keys(id).some(c => this.pressed.has(c)) || B.mouse(id).some(m => this.mousePressed.has(m) || m === notch);
    let nextWave = p("game.nextWave") || this.touch.nextWave, pauseWaves = p("game.pauseWaves") || this.touch.pauseWaves, cycleSpeakers = p("game.cycleSpeakers");
    this.touch.nextWave = false; this.touch.pauseWaves = false;
    let moveX = k("game.moveRight") - k("game.moveLeft");
    let moveZ = k("game.moveDown") - k("game.moveUp");
    let toggleMode = p("game.rise");
    let zoom = (p("game.zoomOut") ? 1 : 0) - (p("game.zoomIn") ? 1 : 0);
    let debug = p("game.debug");
    let sigil = false, spell = p("game.boost"), dash = p("game.dodge");
    const place = p("game.use"); let cycle = p("game.cycleNext"), cycleBack = p("game.cyclePrev"), hat = p("game.hat");
    // Use held: a run (rules/leash.ts), and, with nothing to do, her hat (rules/hat.ts putHat); the pad's use only the run (its hat is its own button).
    let hatHold = k("game.use") > 0, sigilHeld = hatHold;
    let inviteNearest = p("game.inviteNearest"), feedNearest = p("game.feedNearest"), happyNearest = p("game.happyNearest");
    // The 💌: fire with the mouse button or 1 (held, or a click since the last read); aim at the cursor.
    let fire = k("game.invite") > 0 || p("game.invite");
    const cursorAim = this.pointer && this.aimFrom ? this.aimFrom(this.pointer.x, this.pointer.y) : null;
    this.lastAim = cursorAim;
    let aimX = cursorAim?.x ?? 0, aimZ = cursorAim?.z ?? 0;
    let talkPressed = p("game.talk"), talkDown = k("game.talk") > 0, toggleAutoTalk = p("game.autoTalk") || this.touch.autoTalk === true;

    // Gamepads: the first one connected with any input.
    const pads = typeof navigator !== "undefined" && navigator.getGamepads ? navigator.getGamepads() : [];
    for (const pad of pads) {
      if (!pad) continue;
      const buttons = pad.buttons.map(b => b.pressed);
      const fresh = buttons.some((b, i) => b && !this.padPrev[i]);
      if (fresh || pad.axes.some(a => Math.abs(a) > 0.5)) this.device = "pad";
      const consumed = fresh && !!this.onAny?.();
      const P = padControls(buttons, pad.axes, this.padPrev, consumed, this.dpadMenu, this.padPrevAxes);
      moveX += P.moveX; moveZ += P.moveZ; zoom += P.zoom;
      if (P.toggleMode) toggleMode = true;
      if (P.debug) debug = true;
      if (P.sigil) sigil = true;
      if (P.sigilHeld) sigilHeld = true;
      if (P.hat) hat = true;
      if (P.spell) spell = true;
      if (P.cycle) cycle = true;
      if (P.cycleBack) cycleBack = true;
      if (P.dash) dash = true;
      if (P.aim) { aimX = P.aim.x; aimZ = P.aim.z; }
      if (P.fire) fire = true;
      talkPressed ||= P.talkPressed; talkDown ||= P.talkHeld; toggleAutoTalk ||= P.toggleAutoTalk;
      nextWave ||= P.nextWave; pauseWaves ||= P.pauseWaves; cycleSpeakers ||= P.cycleSpeakers;
      inviteNearest ||= P.inviteNearest; feedNearest ||= P.feedNearest; happyNearest ||= P.happyNearest;
      this.padPrev = pad.buttons.map(b => b.pressed); this.padPrevAxes = [...pad.axes];
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
    if (this.talkMode === "toggle" && talkPressed) this.talkOn = !this.talkOn; else if (this.talkMode === "hold") this.talkOn = false;
    const talkHeld = this.talkMode === "toggle" ? this.talkOn : talkDown;
    // Every action must read the same edges before any are consumed (including Talk and Auto-talk).
    this.pressed.clear(); this.mousePressed.clear();
    this.touch.autoTalk = false;
    return { moveX, moveZ, toggleMode, zoom: Math.sign(zoom), place, cycle, cycleBack, debug, nextWave, pauseWaves, cycleSpeakers, sigil, sigilHeld, hatHold, hat, inviteNearest, happyNearest, spell, feedNearest, dash, toggleAutoTalk, talkHeld, fire, aimX, aimZ };
  }
}

/** One gamepad's part of a frame's controls (Input.read): its buttons and sticks, the buttons held last frame, whether a fresh press
 *  was taken by something else (Input.onAny), whether a menu owns the pad (`menu`, Input.dpadMenu: a station's panel, the telescope),
 *  and the sticks last frame; the bindings platform/bindings.ts's (Ed's layout, 2026-10-28). While a menu is open (Ed's playtest,
 *  2026-10-23: the bottom face button, meaning to choose, flew her off from the bedroom) only its back (`sigil`: main.ts closes it),
 *  and its zoom (the telescope's) reach the game; choosing and moving the highlight (the d-pad, the left stick) are the menu's own
 *  (ui/stationLines.ts panelPad, the telescope's look), she standing still (main.ts stillControls). */
export function padControls(buttons: readonly boolean[], axes: readonly number[], prev: readonly boolean[], consumed: boolean, menu: boolean, prevAxes: readonly number[] = [], B: Bindings = bindings) {
  const pressed = (id: ActionId) => !consumed && B.padPressed(id, buttons, axes, prev, prevAxes), v = (id: ActionId) => B.padValue(id, buttons, axes);
  const out = { moveX: 0, moveZ: 0, zoom: 0, toggleMode: false, debug: false, sigil: false, sigilHeld: false, hat: false, spell: false, cycle: false, cycleBack: false, dash: false, fire: false, aim: null as { x: number; z: number } | null,
    talkHeld: false, talkPressed: false, toggleAutoTalk: false, nextWave: false, pauseWaves: false, cycleSpeakers: false, inviteNearest: false, feedNearest: false, happyNearest: false };
  if (menu) {
    out.sigil = pressed("menu.back");
    out.zoom = (pressed("menu.zoomOut") ? 1 : 0) - (pressed("menu.zoomIn") ? 1 : 0);
    return out;
  }
  out.moveX = v("game.moveRight") - v("game.moveLeft"); out.moveZ = v("game.moveDown") - v("game.moveUp");
  out.toggleMode = pressed("game.rise");
  out.zoom = (pressed("game.zoomOut") ? 1 : 0) - (pressed("game.zoomIn") ? 1 : 0);
  out.debug = pressed("game.debug");
  out.sigil = pressed("game.use");
  out.sigilHeld = B.padHeld("game.use", buttons, axes);
  out.hat = pressed("game.hat"); out.spell = pressed("game.boost"); out.cycle = pressed("game.cycleNext"); out.cycleBack = pressed("game.cyclePrev"); out.dash = pressed("game.dodge");
  // Twin-stick: the aim stick aims (screen right is east, down is south), the invite's buttons fire.
  const rx = v("game.aimRight") - v("game.aimLeft"), rz = v("game.aimDown") - v("game.aimUp"), l = Math.hypot(rx, rz);
  if (l > 0.15) { const s = Math.min(1, l) / l; out.aim = { x: rx * s * 20, z: rz * s * 20 }; } // (as a point 20 m out that way: the dash reads a cursor's ground point)
  out.fire = B.padHeld("game.invite", buttons, axes);
  out.talkHeld = B.padHeld("game.talk", buttons, axes); out.talkPressed = pressed("game.talk"); out.toggleAutoTalk = pressed("game.autoTalk");
  out.nextWave = pressed("game.nextWave"); out.pauseWaves = pressed("game.pauseWaves"); out.cycleSpeakers = pressed("game.cycleSpeakers");
  out.inviteNearest = pressed("game.inviteNearest"); out.feedNearest = pressed("game.feedNearest"); out.happyNearest = pressed("game.happyNearest");
  return out;
}
