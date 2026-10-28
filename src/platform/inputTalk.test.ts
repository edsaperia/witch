// Talk held or toggled (the Settings page: app/playerSettings.ts talk, set on platform/input.ts talkMode by main.ts).
import { describe, expect, it } from "vitest";
import { Input } from "./input";

function fakeWindow() {
  const on: Record<string, ((e: unknown) => void)[]> = {};
  const addEventListener = (t: string, f: (e: unknown) => void) => (on[t] ??= []).push(f);
  const send = (t: string, code: string) => { const e = { code, repeat: false, metaKey: false, ctrlKey: false, shiftKey: false, preventDefault() {}, stopPropagation() {}, stopImmediatePropagation() {} }; for (const f of on[t] ?? []) f(e); };
  return { w: { addEventListener } as unknown as Window, down: (c: string) => send("keydown", c), up: (c: string) => send("keyup", c) };
}

describe("Talk", () => {
  it("held: she talks while Shift is down", () => {
    const k = fakeWindow(), input = new Input(k.w);
    k.down("ShiftLeft"); expect(input.read().talkHeld).toBe(true);
    k.up("ShiftLeft"); expect(input.read().talkHeld).toBe(false);
  });
  it("toggled: a press starts it and it stays on after letting go; the next press stops it", () => {
    const k = fakeWindow(), input = new Input(k.w);
    input.talkMode = "toggle";
    k.down("ShiftLeft"); expect(input.read().talkHeld).toBe(true);
    k.up("ShiftLeft"); expect(input.read().talkHeld).toBe(true);
    expect(input.read().talkHeld).toBe(true);
    k.down("ShiftLeft"); expect(input.read().talkHeld).toBe(false);
    k.up("ShiftLeft"); expect(input.read().talkHeld).toBe(false);
  });
});
