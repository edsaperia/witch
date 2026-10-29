// The bindings (platform/bindings.ts, config/bindings.json; Ed, 2026-10-28: "make it easy to manage and remap keys"): the defaults
// are his pad layout and the keyboard as it was; a player's own go over them, are saved and read back, reset, and their conflicts
// are reported.
import { describe, expect, it } from "vitest";
import { Bindings, DEFAULTS, inputValue, PAD_BUTTONS } from "./bindings";
import { padControls } from "./input";

/** A storage of our own (localStorage's shape). */
function memory(): Storage & { data: Map<string, string> } {
  const data = new Map<string, string>();
  return { data, getItem: k => data.get(k) ?? null, setItem: (k, v) => void data.set(k, v), removeItem: k => void data.delete(k), clear: () => data.clear(), key: () => null, length: 0 } as Storage & { data: Map<string, string> };
}

describe("the default bindings", () => {
  const B = new Bindings(null);
  it("are Ed's pad layout (2026-10-28, with his swap of cross and square)", () => {
    const pad = (id: Parameters<Bindings["pad"]>[0]) => B.pad(id);
    expect(pad("game.rise")).toEqual(["square"]);
    expect(pad("game.use")).toEqual(["cross"]);
    expect(pad("game.dodge")).toEqual(["L2", "circle"]); // (Ed, 2026-10-29: "Left trigger needs to be dodge")
    expect(pad("game.invite")).toEqual(["R2"]);
    expect([pad("game.cycleNext"), pad("game.cyclePrev")]).toEqual([["R1"], ["L1"]]);
    expect(pad("game.hat")).toEqual(["triangle"]);
    expect(pad("game.boost")).toEqual(["L3"]);
    expect([pad("game.zoomIn"), pad("game.zoomOut")]).toEqual([["down"], ["up"]]); // (Ed, 2026-10-29: "d-pad up/down should be zoom out/zoom in")
    expect(pad("global.pause")).toEqual(["options"]);
    expect([pad("game.moveUp"), pad("game.aimUp")]).toEqual([["lsUp"], ["rsUp"]]);
    expect([pad("menu.choose"), pad("menu.back"), pad("menu.tabPrev"), pad("menu.tabNext")]).toEqual([["cross"], ["circle"], ["L1"], ["R1"]]);
    expect(pad("menu.up")).toEqual(["up", "lsUp"]);
  });
  it("cross never rises and square never uses (opens a station, puts down a sigil) or chooses, in any context", () => {
    for (const a of DEFAULTS) {
      if (a.pad.includes("cross")) expect(["game.use", "menu.choose"], a.id).toContain(a.id);
      if (a.pad.includes("square")) expect(a.id).toBe("game.rise");
    }
    // and as read
    const b = Array(17).fill(false); b[PAD_BUTTONS.cross] = true;
    expect(padControls(b, [0, 0, 0, 0], [], false, false, [], B).toggleMode).toBe(false);
    const q = Array(17).fill(false); q[PAD_BUTTONS.square] = true;
    expect(padControls(q, [0, 0, 0, 0], [], false, false, [], B).sigil).toBe(false);
  });
  it("leave the keyboard and mouse as they were", () => {
    expect(B.keys("game.rise")).toEqual(["Space"]);
    expect(B.keys("game.use")).toEqual(["KeyE"]);
    expect(B.keys("game.cycleNext")).toEqual(["KeyQ"]);
    expect(B.keys("game.boost")).toEqual(["KeyR"]);
    expect(B.keys("game.moveUp")).toEqual(["KeyW", "ArrowUp"]);
    expect([B.mouse("game.invite"), B.mouse("game.dodge")]).toEqual([["left"], ["right"]]);
    expect(B.keys("menu.choose")).toEqual(["Space", "Enter", "NumpadEnter"]);
    expect(B.keys("menu.back")).toEqual(["KeyE"]);
  });
  it("have no conflicts, and each a name and words", () => {
    expect(B.conflicts()).toEqual([]);
    for (const a of DEFAULTS) { expect(a.name.length, a.id).toBeGreaterThan(2); expect(a.about.length, a.id).toBeGreaterThan(5); }
  });
});

describe("a player's own bindings", () => {
  it("override what the action reads, are saved, and come back on the next page", () => {
    const s = memory(), B = new Bindings(s);
    let told = 0; B.onChange(() => told++);
    expect(B.set("game.rise", { keys: ["KeyF"] })).toEqual([]);
    expect(B.keys("game.rise")).toEqual(["KeyF"]);
    expect(B.pad("game.rise")).toEqual(["square"]); // (what wasn't set kept)
    expect(told).toBe(1);
    expect(JSON.parse(s.data.get("witch.bindings")!)).toEqual({ "game.rise": { keys: ["KeyF"] } }); // (only what differs)
    expect(new Bindings(s).keys("game.rise")).toEqual(["KeyF"]);
    expect(B.list().find(a => a.id === "game.rise")).toMatchObject({ keys: ["KeyF"], isDefault: false, name: "Rise / land" });
  });
  it("move what the pad does: rise on cross reads as rise", () => {
    const B = new Bindings(null);
    B.set("game.rise", { pad: ["triangle"] });
    const b = Array(17).fill(false); b[PAD_BUTTONS.triangle] = true;
    expect(padControls(b, [0, 0, 0, 0], [], false, false, [], B).toggleMode).toBe(true);
  });
  it("reset: one, or all, back to the defaults (and out of storage)", () => {
    const s = memory(), B = new Bindings(s);
    B.set("game.rise", { keys: ["KeyF"] }); B.set("game.dodge", { pad: ["R3"] });
    B.reset("game.rise");
    expect(B.keys("game.rise")).toEqual(["Space"]);
    expect(B.pad("game.dodge")).toEqual(["R3"]);
    B.resetAll();
    expect(B.pad("game.dodge")).toEqual(["L2", "circle"]);
    expect(s.data.has("witch.bindings")).toBe(false);
    expect(B.list().every(a => a.isDefault)).toBe(true);
  });
  it("setting one back to its default is the default (nothing kept)", () => {
    const s = memory(), B = new Bindings(s);
    B.set("game.rise", { keys: ["KeyF"] }); B.set("game.rise", { keys: ["Space"] });
    expect(s.data.has("witch.bindings")).toBe(false);
  });
  it("report conflicts: two actions on one input in one context (global counts in both); a game and a menu action may share", () => {
    const B = new Bindings(null);
    expect(B.set("game.dodge", { pad: ["cross"] })).toEqual([{ context: "game", input: "pad:cross", actions: ["game.use", "game.dodge"] }]);
    B.resetAll();
    expect(B.set("menu.back", { keys: ["Escape"] })).toEqual([{ context: "menu", input: "key:Escape", actions: ["global.pause", "menu.back"] }]);
    B.resetAll();
    expect(B.set("game.rise", { mouse: ["right"] })).toEqual([{ context: "game", input: "mouse:right", actions: ["game.rise", "game.dodge"] }]);
    B.resetAll();
    expect(B.set("menu.choose", { pad: ["cross"] })).toEqual([]); // (cross: use in play, choose in a menu)
  });
  it("refuse unknown actions and inputs; a spoilt store reads as the defaults", () => {
    const B = new Bindings(null);
    expect(() => B.set("game.fly" as never, { keys: ["KeyF"] })).toThrow();
    expect(() => B.set("game.rise", { pad: ["X"] })).toThrow();
    expect(() => B.set("game.rise", { mouse: ["thumb"] })).toThrow();
    const s = memory(); s.setItem("witch.bindings", "{ not json");
    expect(new Bindings(s).keys("game.rise")).toEqual(["Space"]);
    const t = memory(); t.setItem("witch.bindings", JSON.stringify({ "game.rise": { pad: ["X", "triangle"] }, "game.gone": { keys: ["KeyQ"] } }));
    expect(new Bindings(t).pad("game.rise")).toEqual(["triangle"]);
    const thrower = { getItem: () => { throw new Error("blocked"); }, setItem: () => { throw new Error("blocked"); }, removeItem: () => { throw new Error("blocked"); } };
    const u = new Bindings(thrower);
    expect(u.keys("game.rise")).toEqual(["Space"]);
    expect(() => u.set("game.rise", { keys: ["KeyF"] })).not.toThrow();
    expect(u.keys("game.rise")).toEqual(["KeyF"]);
  });
});

describe("a stick's direction", () => {
  it("reads past its dead zone, scaled, along the whole stick", () => {
    expect(inputValue("lsRight", [], [0.1, 0, 0, 0])).toBe(0);
    expect(inputValue("lsRight", [], [1, 0, 0, 0])).toBeCloseTo(1);
    expect(inputValue("lsLeft", [], [1, 0, 0, 0])).toBe(0);
    expect(inputValue("rsDown", [], [0, 0, 0, 1])).toBeCloseTo(1);
    expect(inputValue("cross", [true], [])).toBe(1);
  });
});

describe("the bindings file's schema (config/schema/bindings.schema.json, rules/configSchemas.ts)", () => {
  it("names the inputs bindings.ts reads, no more, no fewer", async () => {
    const { PAD_INPUTS, MOUSE_INPUT_NAMES } = await import("../rules/configSchemas");
    const { PAD_STICKS, MOUSE_INPUTS } = await import("./bindings");
    expect([...PAD_INPUTS].sort()).toEqual([...Object.keys(PAD_BUTTONS), ...Object.keys(PAD_STICKS)].sort());
    expect([...MOUSE_INPUT_NAMES]).toEqual([...MOUSE_INPUTS]);
  });
});
