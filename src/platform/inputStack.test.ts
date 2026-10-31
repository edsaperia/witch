import { describe, expect, it, vi } from "vitest";
import { InputStack, type InputLayer } from "./inputStack";

const key = (code: string, type = "keydown", repeat = false) => ({ code, type, repeat } as KeyboardEvent);
const layer = (id: string): InputLayer => ({ id, acceptsKey: () => false, key: vi.fn(() => false) });

describe("overlay input ownership", () => {
  it("gives input to the game only with an empty stack, and to the exact top registration otherwise", () => {
    const s = new InputStack(), chart = layer("chart"), pause = layer("pause");
    expect(s.owns(null)).toBe(true);
    s.push(chart); s.push(pause);
    expect([s.owns(null), s.owns(chart), s.owns(pause)]).toEqual([false, false, true]);
    expect(s.key(key("KeyE"))).toBe(true);
    expect(chart.key).not.toHaveBeenCalled();
    expect(pause.key).toHaveBeenCalledOnce();
    s.remove(pause);
    expect(s.owns(chart)).toBe(true);
    s.remove(chart);
    expect(s.owns(null)).toBe(true);
  });

  it("lets native controls receive keys only through the top layer's target predicate", () => {
    const s = new InputStack(), chart = layer("chart"), pause = layer("pause");
    chart.acceptsKey = () => true;
    s.push(chart); s.push(pause);
    expect(s.key(key("Enter"))).toBe(true);
    pause.acceptsKey = () => true;
    expect(s.key(key("ArrowDown"))).toBe(false);
  });

  it("consumes a close event once, without sending it to the exposed panel", () => {
    const s = new InputStack(), chart = layer("chart"), pause = layer("pause");
    pause.key = () => { s.remove(pause); return true; };
    s.push(chart); s.push(pause);
    expect(s.key(key("Escape"))).toBe(true);
    expect(chart.key).not.toHaveBeenCalled();
    expect(s.key(key("Escape", "keydown", true))).toBe(true);
    expect(s.key(key("Escape", "keyup"))).toBe(true);
    expect(chart.key).not.toHaveBeenCalled();
    s.key(key("Escape"));
    expect(chart.key).toHaveBeenCalledOnce();
  });

  it("quarantines keys held before opening, and keys pressed inside until released after closing", () => {
    const s = new InputStack(), pause = layer("pause");
    expect(s.key(key("KeyW"))).toBe(false);
    s.push(pause);
    expect(s.key(key("KeyW", "keydown", true))).toBe(true);
    expect(pause.key).not.toHaveBeenCalled();
    s.key(key("KeyE"));
    s.remove(pause);
    expect(s.key(key("KeyE", "keydown", true))).toBe(true);
    expect(s.key(key("KeyE", "keyup"))).toBe(true);
    expect(s.key(key("KeyE"))).toBe(false);
  });

  it("does not reorder duplicate pushes or disturb ownership when a lower layer closes", () => {
    const s = new InputStack(), chart = layer("chart"), pause = layer("pause");
    s.push(chart); s.push(pause); s.push(chart);
    expect(s.top).toBe(pause);
    s.remove(chart); s.remove(chart);
    expect(s.top).toBe(pause);
  });

  it("clears physical key quarantine on blur, where a keyup can be lost", () => {
    const s = new InputStack(), pause = layer("pause");
    s.key(key("KeyW")); s.push(pause); s.remove(pause);
    s.release();
    expect(s.key(key("KeyW"))).toBe(false);
  });
});
