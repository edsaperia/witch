// The first-run controls text (index.html, the start card's keys) against the bindings (platform/input.ts) and the rules it
// describes (coordinator, 2026-10-19, for Ed: stale lines in it misled new players).
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { bindings, padName } from "./platform/bindings";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const raw = html.slice(html.indexOf('<div class="keys">'), html.indexOf("</div>", html.indexOf('<div class="keys">')));
const keys = raw.replace(/<[^>]+>/g, ""); // (as read: the spans the bindings fill, ui/controlsText.ts, hold the defaults)

describe("the controls text", () => {
  it("names the keys and buttons as the bindings have them (platform/bindings.ts), each a span the bindings fill", () => {
    expect(bindings.keys("game.autoTalk")).toEqual(["KeyT"]);
    expect(keys).toContain("T turns auto-talk on or off (off, she talks while Shift is held)");
    expect(bindings.keys("game.talk")).toContain("ShiftLeft");
    expect([bindings.keys("game.use"), bindings.keys("game.cycleNext"), bindings.keys("game.boost"), bindings.keys("game.rise")]).toEqual([["KeyE"], ["KeyQ"], ["KeyR"], ["Space"]]);
    // The pad (Ed's layout, 2026-10-28): each span's default text is what the bindings fill it with.
    for (const m of raw.matchAll(/<span data-pad="([^"]+)">([^<]*)<\/span>/g)) expect(m[2], m[1]).toBe(padName(m[1] as never));
    expect(keys).toContain("□ rises or lands, and nothing else");
    expect(keys).toContain("✕ uses what's here");
    expect(keys).toContain("△ puts her hat down or picks it up · R1 and L1 cycle the stack");
  });
  it("covers the treehouse: the map's sea chart, the stations, the bed held", () => {
    for (const s of ["E at the map", "sea chart", "walking up to the mirror", "the bay fits her broom's parts", "E at the bestiary's book opens the zoo", "hold E at the bed"]) expect(keys).toContain(s);
  });
  it("keeps nothing stale: no Player pick, no Esc back to the start, no dodge diamond, no old pad layout", () => {
    for (const s of ['"Player:"', "Esc back here", "diamond", "triangle cycles", "circle broom spell", "broom stand", "circle cycles the stack", "cross rises", "shoulder buttons zoom"]) expect(keys).not.toContain(s);
  });
});

describe("the sea chart's words for finding islands", () => {
  it("say a legend's quest in a won night finds its island, not waking legends", () => {
    const chart = readFileSync(new URL("./app/chartView.ts", import.meta.url), "utf8");
    expect(chart).not.toMatch(/wake (legends|its legend)/);
    expect(chart).toContain("do a legend's quest and win the night to find its island");
  });
});
