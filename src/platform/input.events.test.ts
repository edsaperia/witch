import { afterEach, describe, expect, it } from "vitest";
import { Input } from "./input";
import { bindings } from "./bindings";

/** Events through the same listeners as the browser; canvas filtering and releases outside it are exercised too. */
function device() {
  const listeners = new Map<string, ((event: unknown) => void)[]>();
  const target = { addEventListener(type: string, listener: (event: unknown) => void) { listeners.set(type, [...(listeners.get(type) ?? []), listener]); } };
  const input = new Input(target as unknown as Window);
  const emit = (type: string, fields: Record<string, unknown> = {}) => {
    const e = { target: { tagName: "CANVAS" }, pointerType: "mouse", clientX: 20, clientY: 30, repeat: false, preventDefault() {}, ...fields };
    for (const listener of listeners.get(type) ?? []) listener(e);
  };
  const down = (button: number) => { emit("pointerdown", { button }); emit("mousedown", { button }); };
  const up = (button: number) => { emit("pointerup", { button, target: { tagName: "DIV" } }); emit("mouseup", { button, target: { tagName: "DIV" } }); };
  return { input, emit, down, up };
}
afterEach(() => bindings.resetAll());

describe("auto-talk and talk events", () => {
  it("T toggles once per press; Shift remains held independently", () => {
    const { input, emit } = device();
    emit("keydown", { code: "KeyT" });
    expect(input.read().toggleAutoTalk).toBe(true);
    expect(input.read().toggleAutoTalk).toBe(false);
    emit("keydown", { code: "KeyT", repeat: true });
    expect(input.read().toggleAutoTalk).toBe(false);
    emit("keyup", { code: "KeyT" }); emit("keydown", { code: "ShiftLeft" });
    expect(input.read().talkHeld).toBe(true); expect(input.read().talkHeld).toBe(true);
    emit("keyup", { code: "ShiftLeft" }); expect(input.read().talkHeld).toBe(false);
    emit("keydown", { code: "KeyT" }); expect(input.read().toggleAutoTalk).toBe(true);
  });

  it("mouse remaps can toggle Talk and Auto-talk before their edges are consumed", () => {
    bindings.set("game.autoTalk", { keys: [], mouse: ["middle"] });
    bindings.set("game.talk", { keys: [], mouse: ["right"] });
    const { input, down, up } = device(); input.talkMode = "toggle";
    down(1); expect(input.read().toggleAutoTalk).toBe(true); expect(input.read().toggleAutoTalk).toBe(false); up(1);
    down(2); expect(input.read().talkHeld).toBe(true); up(2); expect(input.read().talkHeld).toBe(true);
    down(2); expect(input.read().talkHeld).toBe(false);
  });
});

describe("held mouse bindings", () => {
  for (const [name, button] of [["left", 0], ["middle", 1], ["right", 2]] as const) {
    it(`${name} keeps inviting and using (cast/bed/sigil holds) until released outside the canvas`, () => {
      bindings.set("game.invite", { keys: [], mouse: [name] });
      bindings.set("game.use", { keys: [], mouse: [name] });
      const { input, down, up } = device(); down(button);
      expect(input.read()).toMatchObject({ fire: true, place: true, sigilHeld: true, hatHold: true });
      expect(input.read()).toMatchObject({ fire: true, place: false, sigilHeld: true, hatHold: true });
      up(button);
      expect(input.read()).toMatchObject({ fire: false, place: false, sigilHeld: false, hatHold: false });
    });
  }
  it("tracks a left-button press chorded after right without needing another pointerdown", () => {
    bindings.set("game.use", { keys: [], mouse: ["right"] });
    const { input, down, emit } = device(); down(2); input.read();
    emit("mousedown", { button: 0 }); // Mouse chords don't dispatch a second pointerdown.
    expect(input.read()).toMatchObject({ fire: true, sigilHeld: true });
    emit("mouseup", { button: 2 });
    expect(input.read()).toMatchObject({ fire: true, sigilHeld: false });
    emit("blur"); expect(input.read().fire).toBe(false);
  });
  it("a start-screen click is consumed once and does not fire; touch compatibility mouse events don't fire", () => {
    const { input, emit, down, up } = device(); let starts = 0;
    input.onAny = () => ++starts === 1;
    down(0); expect(starts).toBe(1); expect(input.read().fire).toBe(false); up(0);
    input.onAny = null;
    emit("pointerdown", { pointerType: "touch", button: 0 }); emit("mousedown", { button: 0 });
    expect(input.read().fire).toBe(false);
  });
});
