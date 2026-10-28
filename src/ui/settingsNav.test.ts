// The Settings page's navigation (ui/settingsNav.ts): the pad, the keyboard and the mouse's shared moves.
import { describe, expect, it } from "vitest";
import { PadNav, firstRow, keyInput, navigate, stepChoice, stepSlider, type NavRow } from "./settingsNav";

const TABS: NavRow[][] = [
  [{ id: "master", kind: "slider" }, { id: "hidden", kind: "toggle", hidden: true }, { id: "mute", kind: "toggle" }],
  [{ id: "quality", kind: "choice", options: ["auto", "high"] }, { id: "full", kind: "button" }],
];

describe("moving", () => {
  it("moves the focus down and up, skipping hidden rows and wrapping", () => {
    let s = { tab: 0, row: 0 };
    s = navigate(s, TABS, "down").state; expect(s.row).toBe(2);
    s = navigate(s, TABS, "down").state; expect(s.row).toBe(0);
    s = navigate(s, TABS, "up").state; expect(s.row).toBe(2);
  });
  it("steps the tabs both ways, wrapping, the focus on the new tab's first row", () => {
    let s = navigate({ tab: 0, row: 2 }, TABS, "tabNext").state; expect(s).toEqual({ tab: 1, row: 0 });
    s = navigate(s, TABS, "tabNext").state; expect(s).toEqual({ tab: 0, row: 0 });
    s = navigate(s, TABS, "tabPrev").state; expect(s).toEqual({ tab: 1, row: 0 });
  });
  it("left and right change the row; choose flips, steps on or presses; back closes; reset resets", () => {
    expect(navigate({ tab: 0, row: 0 }, TABS, "left").action).toEqual({ kind: "step", id: "master", dir: -1 });
    expect(navigate({ tab: 0, row: 2 }, TABS, "choose").action).toEqual({ kind: "step", id: "mute", dir: 1 });
    expect(navigate({ tab: 1, row: 1 }, TABS, "choose").action).toEqual({ kind: "press", id: "full" });
    expect(navigate({ tab: 1, row: 1 }, TABS, "right").action).toEqual({ kind: "none" });
    expect(navigate({ tab: 0, row: 0 }, TABS, "back").action).toEqual({ kind: "close" });
    expect(navigate({ tab: 0, row: 0 }, TABS, "reset").action).toEqual({ kind: "reset", id: "master" });
    expect(firstRow([{ id: "a", kind: "toggle", hidden: true }, { id: "b", kind: "toggle" }])).toBe(1);
  });
  it("steps choices round and sliders in twentieths, held to 0..1", () => {
    expect(stepChoice(["a", "b", "c"], "c", 1)).toBe("a");
    expect(stepChoice(["a", "b", "c"], "a", -1)).toBe("c");
    expect(stepSlider(0.5, 1)).toBeCloseTo(0.55);
    expect(stepSlider(0.98, 1)).toBe(1);
    expect(stepSlider(0.02, -1)).toBe(0);
  });
});

describe("the keyboard", () => {
  it("maps arrows and WASD, Enter and Space, Esc, Q/E and Tab, Delete", () => {
    expect(["ArrowUp", "KeyS", "KeyA", "ArrowRight", "Enter", "Space", "Escape", "Backspace", "KeyQ", "KeyE", "Delete"].map(c => keyInput(c))).toEqual(["up", "down", "left", "right", "choose", "choose", "back", "back", "tabPrev", "tabNext", "reset"]);
    expect([keyInput("Tab"), keyInput("Tab", true), keyInput("KeyZ")]).toEqual(["tabNext", "tabPrev", null]);
  });
});

describe("the pad", () => {
  const press = (i: number) => Array.from({ length: 17 }, (_, k) => k === i);
  it("✕ chooses, ○ goes back, L1/R1 the tabs, △ resets: once a press, not again while held", () => {
    const p = new PadNav();
    expect(p.read(press(0), 0, 0, 0)).toEqual(["choose"]);
    expect(p.read(press(0), 0, 0, 1)).toEqual([]);
    expect(p.read(press(1), 0, 0, 1.1)).toEqual(["back"]);
    expect(p.read(press(4), 0, 0, 1.2)).toEqual(["tabPrev"]);
    expect(p.read(press(5), 0, 0, 1.3)).toEqual(["tabNext"]);
    expect(p.read(press(3), 0, 0, 1.4)).toEqual(["reset"]);
  });
  it("the d-pad and the stick move, repeating while held", () => {
    const p = new PadNav(0.4, 0.1);
    expect(p.read(press(13), 0, 0, 0)).toEqual(["down"]);
    expect(p.read(press(13), 0, 0, 0.3)).toEqual([]);
    expect(p.read(press(13), 0, 0, 0.41)).toEqual(["down"]);
    expect(p.read(press(13), 0, 0, 0.52)).toEqual(["down"]);
    expect(p.read(press(-1), 0.9, 0, 0.6)).toEqual(["right"]); // (the stick)
    expect(p.read(press(-1), 0, 0, 0.7)).toEqual([]);
  });
});
