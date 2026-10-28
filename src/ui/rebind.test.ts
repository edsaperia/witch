// The Controls tab's rebinding (ui/rebind.ts) on a fresh set of bindings (platform/bindings.ts), saved to a stand-in storage.
import { describe, expect, it } from "vitest";
import { Bindings } from "../platform/bindings";
import { assign, clashes, inputName, inputsOf, padIdle, padPress, withSlot } from "./rebind";

const store = () => { const m = new Map<string, string>(); return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v), removeItem: (k: string) => void m.delete(k), m }; };

describe("slots", () => {
  it("shows the mouse then the keys, or the pad", () => {
    const B = new Bindings(null);
    expect(inputsOf(B.get("game.invite"), "keys")).toEqual(["mouse:left", "key:Digit1"]);
    expect(inputsOf(B.get("game.invite"), "pad")).toEqual(["pad:R2", "pad:L2"]);
  });
  it("sets a slot, fills an empty one, empties one, and swaps with its own other slot", () => {
    const B = new Bindings(null), up = B.get("game.moveUp"); // W, ↑
    expect(withSlot(up, "keys", 1, "key:KeyI")).toEqual({ keys: ["KeyW", "KeyI"], mouse: [] });
    expect(withSlot(B.get("game.boost"), "keys", 1, "key:KeyF")).toEqual({ keys: ["KeyR", "KeyF"], mouse: [] });
    expect(withSlot(up, "keys", 0, null)).toEqual({ keys: ["ArrowUp"], mouse: [] });
    expect(withSlot(up, "keys", 0, "key:ArrowUp")).toEqual({ keys: ["ArrowUp", "KeyW"], mouse: [] });
    expect(withSlot(B.get("game.dodge"), "keys", 1, "key:KeyC")).toEqual({ keys: ["KeyC"], mouse: ["right"] });
    expect(withSlot(B.get("game.use"), "pad", 0, "pad:L3")).toEqual({ pad: ["L3"] });
  });
});

describe("clashes", () => {
  it("finds what has the input where the action works, not across play and menus", () => {
    const B = new Bindings(null);
    expect(clashes(B, "game.boost", "key:KeyE")).toEqual(["game.use"]);
    expect(clashes(B, "game.boost", "key:KeyY")).toEqual([]);
    expect(clashes(B, "game.boost", "key:Escape")).toEqual(["global.pause"]); // (global: both)
    expect(clashes(B, "menu.back", "key:Space")).toEqual(["menu.choose"]); // (not Rise, a game action)
    expect(clashes(B, "game.hat", "pad:cross")).toEqual(["game.use"]);
  });
  it("swap: each other action takes the old input in its place; use both: they share; saved", () => {
    const s = store(), B = new Bindings(s);
    assign(B, "game.boost", "keys", 0, "key:KeyE", "swap"); // R's slot takes E; Use takes R
    expect(B.get("game.boost").keys).toEqual(["KeyE"]);
    expect(B.get("game.use").keys).toEqual(["KeyR"]);
    expect(B.conflicts()).toEqual([]);
    assign(B, "game.hat", "pad", 0, "pad:cross", "both"); // Hat's △ becomes ✕, Use keeps ✕ too
    expect(B.get("game.hat").pad).toEqual(["cross"]);
    expect(B.get("game.use").pad).toEqual(["cross"]);
    expect(B.conflicts().map(c => c.input)).toEqual(["pad:cross"]);
    expect(JSON.parse(s.m.get("witch.bindings")!)).toMatchObject({ "game.boost": { keys: ["KeyE"] }, "game.use": { keys: ["KeyR"] }, "game.hat": { pad: ["cross"] } });
    expect(new Bindings(s).get("game.use").keys).toEqual(["KeyR"]); // (read back)
  });
  it("swap into an empty slot: the other loses the input", () => {
    const B = new Bindings(null);
    assign(B, "game.dodge", "keys", 1, "key:KeyQ", "swap"); // Dodge: right click, and now Q; Next sigil had Q alone
    expect(B.get("game.dodge")).toMatchObject({ keys: ["KeyQ"], mouse: ["right"] });
    expect(B.get("game.cycleNext").keys).toEqual([]);
  });
});

describe("the pad, listening", () => {
  const btn = (i: number) => Array.from({ length: 17 }, (_, k) => k === i);
  it("takes a fresh button or a stick pushed one way, waiting for everything let go first", () => {
    expect(padPress(btn(3), [0, 0, 0, 0], btn(-1), [0, 0, 0, 0])).toBe("pad:triangle");
    expect(padPress(btn(3), [0, 0, 0, 0], btn(3), [0, 0, 0, 0])).toBe(null);
    expect(padPress(btn(-1), [0, 0, -0.9, 0], btn(-1), [0, 0, 0, 0])).toBe("pad:rsLeft");
    expect(padIdle(btn(0), [0, 0, 0, 0])).toBe(false);
    expect(padIdle(btn(-1), [0.1, 0, 0, 0])).toBe(true);
  });
  it("names inputs: keys, the mouse, PlayStation's or Xbox's", () => {
    expect([inputName("key:KeyE"), inputName("mouse:right"), inputName("pad:cross"), inputName("pad:cross", true), inputName("pad:R2", true), inputName("pad:lsUp")]).toEqual(["E", "Right click", "✕", "A", "RT", "L stick ↑"]);
  });
});
