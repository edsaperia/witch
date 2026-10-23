// The first-run controls text (index.html, the start card's keys) against the bindings (platform/input.ts) and the rules it
// describes (coordinator, 2026-10-19, for Ed: stale lines in it misled new players).
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { KEYS, PAD } from "./platform/input";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const keys = html.slice(html.indexOf('<div class="keys">'), html.indexOf("</div>", html.indexOf('<div class="keys">')));

describe("the controls text", () => {
  it("names the keys as input.ts binds them", () => {
    expect(KEYS.autoTalk).toEqual(["KeyT"]);
    expect(keys).toContain("T turns auto-talk on or off (off, she talks while Shift is held)");
    expect(KEYS.talk).toContain("ShiftLeft");
    expect(KEYS.place).toEqual(["KeyE"]); expect(KEYS.cycle).toEqual(["KeyQ"]); expect(KEYS.spell).toEqual(["KeyR"]); expect(KEYS.rise).toEqual(["Space"]);
    // The pad: square the sigil, triangle the hat, circle cycles, the left stick pressed the broom's spell.
    expect([PAD.sigil[0], PAD.hat[0], PAD.cycle[0], PAD.spell[0]]).toEqual([2, 3, 1, 10]);
    expect(keys).toContain("square puts down or picks up");
    expect(keys).toContain("triangle puts her hat down or picks it up · circle cycles the stack · pressing the left stick, her broom's spell");
  });
  it("covers the treehouse: the map's sea chart, the stations, the bed held", () => {
    for (const s of ["E at the map", "sea chart", "walking up to the mirror", "the bay fits her broom's parts", "E at the bestiary's book opens the zoo", "hold E at the bed"]) expect(keys).toContain(s);
  });
  it("keeps nothing stale: no Player pick, no Esc back to the start, no dodge diamond, no old pad layout", () => {
    for (const s of ['"Player:"', "Esc back here", "diamond", "triangle cycles", "circle broom spell", "broom stand"]) expect(keys).not.toContain(s);
  });
});

describe("the sea chart's words for finding islands", () => {
  it("say a legend's quest in a won night finds its island, not waking legends", () => {
    const chart = readFileSync(new URL("./app/chartView.ts", import.meta.url), "utf8");
    expect(chart).not.toMatch(/wake (legends|its legend)/);
    expect(chart).toContain("do a legend's quest and win the night to find its island");
  });
});
