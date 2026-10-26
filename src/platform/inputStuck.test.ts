// A key let go while a menu has the keys doesn't stay held for her after (Ed's playtest of v4515, 2026-10-26: "When I walked into the
// microphone in the studio, when I leave the singing menu it is as if the down key is permanently held"): the Studio's instruments
// take every key, its key-up too (app/studio.ts), so the game's input (platform/input.ts) sees each key-up first, in the capture
// phase, and lets go of everything held whenever a menu that takes the keys opens or closes (main.ts: input.release()).
import { afterEach, describe, expect, it, vi } from "vitest";
import { Input } from "./input";
import { StudioPlayer } from "../app/studio";
import type { StudioPanel } from "../ui/studioPanel";
import type { MusicStyle } from "../rules/musicScore";
import styleJson from "../../config/music-style.json";

/** A window as the browser's dispatches to it: the capture listeners in the order they were added, then the rest, a listener's
 *  stopImmediatePropagation stopping those after it. */
function fakeWindow() {
  const on: Record<string, { f: (e: unknown) => void; capture: boolean }[]> = {};
  const addEventListener = (t: string, f: (e: unknown) => void, o?: boolean | AddEventListenerOptions) => (on[t] ??= []).push({ f, capture: o === true || (typeof o === "object" && !!o.capture) });
  const send = (t: string, code: string) => {
    let stopped = false;
    const e = { code, repeat: false, metaKey: false, ctrlKey: false, shiftKey: false, preventDefault() {}, stopPropagation() {}, stopImmediatePropagation() { stopped = true; } };
    const all = on[t] ?? [];
    for (const l of [...all.filter(l => l.capture), ...all.filter(l => !l.capture)]) { if (stopped) break; l.f(e); }
  };
  return { w: { addEventListener } as unknown as Window, addEventListener, down: (code: string) => send("keydown", code), up: (code: string) => send("keyup", code) };
}
const panel = { onPress: () => {}, onControl: () => {}, show() {}, flash() {}, flashNote() {}, live() {} } as unknown as StudioPanel;
afterEach(() => vi.unstubAllGlobals());

/** The game's input, then the Studio's player on the same window (as main.ts makes them: the input first). */
function page() {
  const k = fakeWindow();
  vi.stubGlobal("addEventListener", k.addEventListener); // (the Studio listens on the page's own window)
  const input = new Input(k.w), studio = new StudioPlayer(styleJson as unknown as MusicStyle, () => null, () => 1, panel);
  const at = (on: "mic" | null) => { studio.state.players[0].at = on; };
  return { ...k, input, studio, at };
}

describe("a key let go inside the Studio's singing menu (Ed's playtest of v4515)", () => {
  for (const key of ["KeyS", "ArrowDown", "KeyW", "KeyA", "KeyD", "ArrowUp", "ArrowLeft", "ArrowRight"]) it(`${key}: held walking into the mic, let go at it, isn't held after`, () => {
    const p = page();
    p.down(key);
    const r0 = p.input.read();
    expect(Math.hypot(r0.moveX, r0.moveZ)).toBeGreaterThan(0.5); // (walking)
    p.at("mic"); // (at the mic: the singing menu in, the keys the Studio's)
    p.up(key); // (let go there: the Studio takes it)
    p.down("ArrowDown"); p.up("ArrowDown"); p.down("KeyS"); // (singing: the arrows a vowel, a key a note, one still down as she leaves)
    p.at(null); p.up("KeyS"); // (left)
    const r = p.input.read();
    expect(r.moveX).toBe(0); expect(r.moveZ).toBe(0);
  });

  it("a key pressed inside the menu doesn't walk her after it closes", () => {
    const p = page();
    p.at("mic");
    p.down("ArrowDown"); // (held while the menu goes: the Studio's press, never the game's)
    p.at(null);
    expect(p.input.read().moveZ).toBe(0);
  });

  it("whatever's held is let go when a menu that takes the keys opens or closes (input.release): a key-up lost behind a frame, the zoo's or the chart's, too", () => {
    const p = page();
    p.down("KeyS");
    expect(p.input.read().moveZ).toBeGreaterThan(0.5);
    p.input.release(); // (main.ts, as the zoo opens over the game: its key-up goes to its own frame)
    expect(p.input.read().moveZ).toBe(0);
    p.down("KeyS"); // (pressed again: walking again)
    expect(p.input.read().moveZ).toBeGreaterThan(0.5);
  });
});
