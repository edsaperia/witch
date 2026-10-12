// The hat icons and the Dowsing flask (golf's asks, 2026-10-12): whole glyphs in the indicator's format.
import { describe, expect, it } from "vitest";
import { HAT_ICONS } from "./hatIcons";
import { FLASK } from "./indicator";
import { HAT_SPELLS } from "../rules/spells";

const shapeOk = (G: readonly string[], n: number) => {
  expect(G.length).toBeLessThanOrEqual(n);
  for (const r of G) { expect(r.length).toBe(G[0].length); expect(r).toMatch(/^[.#+]+$/); }
  expect(G[0].length).toBeLessThanOrEqual(n);
  expect(G.join("").replace(/\./g, "").length).toBeGreaterThan(G.length * 2); // (something to see)
};

describe("hat icons", () => {
  it("every one 13 by 13, inked, and named after a hat spell", () => {
    const ids = new Set(HAT_SPELLS.map(s => s.id));
    for (const [id, G] of Object.entries(HAT_ICONS)) { expect(ids.has(id as never)).toBe(true); shapeOk(G, 13); expect(G.length).toBe(13); }
    for (const id of ["helmet", "healing", "harvest", "dowsing", "sentry", "slingshot", "gathering"]) expect(HAT_ICONS[id]).toBeDefined();
  });
  it("the Dowsing flask fits the cue's box", () => { shapeOk(FLASK, 17); });
});
