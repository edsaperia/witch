import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { arrowSvg, offerGlow } from "./feedTag";

// The feed prompt (Ed, 2026-11-03: "just "[E]" (or equivalent controller) key above the berry with a little down arrow, and the berry
// glows brighter"): the key and an arrow, no words; the berry brighter by berries.feed.glow.
describe("the feed prompt", () => {
  it("is the use key and a little down arrow, no words (Ed: no on-screen text he hasn't asked for)", () => {
    const src = readFileSync(new URL("./feedTag.ts", import.meta.url), "utf8"), code = src.replace(/\/\/.*$|\/\*[\s\S]*?\*\//gm, "");
    expect(code).toMatch(/keycapCanvas\(glyph, px\), arrow/); // (the keycap, then the arrow under it)
    expect(code).toMatch(/useGlyph\(v\.useDevice\)/); // (E, or the pad's button as the stations show it, or the tap)
    expect(code).not.toMatch(/textContent|innerText|createTextNode/); // (no words at all)
    expect(code).not.toMatch(/["'](feed|hold|put down)["']/);
  });
  it("shows only when a press would feed (rules/sigilButton.ts feedOffer)", () => {
    const code = readFileSync(new URL("./feedTag.ts", import.meta.url), "utf8");
    expect(code).toMatch(/if \(!offer\) \{ this\.el\.style\.display = "none"/);
  });
  it("its arrow points down: rows narrowing to one pixel at the bottom, at the page's pixel size", () => {
    const svg = arrowSvg(3), lit = [...svg.matchAll(/<rect x="(\d+)" y="(\d+)" width="(\d+)" height="(\d+)" fill="#ffe3f3"/g)].map(m => m.slice(1).map(Number));
    expect(lit.map(r => r[2])).toEqual([15, 9, 3]); // (5, 3, 1 art pixels wide, top to bottom)
    expect(lit.map(r => r[1])).toEqual([3, 6, 9]);
    for (const r of lit) expect(r[0] + r[2] / 2).toBe(10.5); // (centred under the keycap)
    expect(svg).toMatch(/width="21" height="15"/);
  });
  it("the berry glows brighter by berries.feed.glow: every part a step up over 1, and 1 the halo it had", () => {
    const one = offerGlow(1, 1), up = offerGlow(2.5, 1);
    expect(one).toEqual({ haloSize: 4.6, haloGain: 1, coreSize: 1.1, coreGain: 1 });
    expect(up.haloSize).toBeGreaterThan(one.haloSize); expect(up.haloGain).toBeGreaterThan(one.haloGain);
    expect(up.coreSize).toBeGreaterThan(one.coreSize); expect(up.coreGain).toBeGreaterThan(one.coreGain);
    expect(offerGlow(2.5, 0.75).haloGain).toBeCloseTo(2.5 * 0.75, 9); // (it still pulses)
  });
});
