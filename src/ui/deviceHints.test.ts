import { afterEach, expect, it } from "vitest";
import { bindings } from "../platform/bindings";
import { chartHint, telescopeHint } from "./deviceHints";

afterEach(() => bindings.resetAll());

it("chart and telescope pad readouts show changed bindings without keyboard instructions", () => {
  bindings.set("menu.back", { pad: ["triangle"] });
  bindings.set("menu.zoomIn", { pad: ["L3"] });
  for (const hint of [chartHint("pad", true, true), telescopeHint("pad")]) {
    expect(hint).toContain("△");
    expect(hint).toContain("L3");
    expect(hint).not.toMatch(/mouse|wheel|Enter|Space/);
  }
});

it("switching to keyboard or touch removes pad glyphs and keeps the chart's hold rule", () => {
  for (const device of ["keys", "touch"] as const) {
    expect(chartHint(device, true, true)).toContain("hold");
    expect(chartHint(device, false, true)).not.toContain("hold");
    for (const hint of [chartHint(device, true, true), telescopeHint(device)]) expect(hint).not.toMatch(/[✕○□△]|stick|L2|R2/);
  }
});
