// The debug overlay's repro link (app/repro.ts): what changed is listed, ?set= puts it back, and the link rebuilds the game as it was.
import { describe, expect, it } from "vitest";
import { applyRepro, applySet, browserOs, debugText, reproLine, reproQuery, reproState, setText, tuningDiff } from "./repro";
import { newGame as fullGame } from "../rules/game";
import { smallWorld } from "../test/worlds";
const newGame = smallWorld(fullGame, "Repro links restore local coordinates, wave state and settings; nine cells cover the tested three waves.");
import { TUNING } from "../rules/tuning";

const clone = <T>(o: T): T => JSON.parse(JSON.stringify(o));

describe("the settings changed", () => {
  it("lists every leaf that differs, by its path, and none of the notes or what the load sets elsewhere", () => {
    const t = clone(TUNING) as typeof TUNING & Record<string, unknown>;
    t.pixelSize = 5; t.camera.curve.treetop = 0.002; (t as Record<string, unknown>)._note = "x"; t.paths = { ...t.paths, fingerposts: !TUNING.paths?.fingerposts };
    expect(new Map(tuningDiff(t, TUNING))).toEqual(new Map<string, unknown>([["pixelSize", 5], ["camera.curve.treetop", 0.002]]));
    expect(tuningDiff(clone(TUNING), TUNING)).toEqual([]);
  });
  it("?set= puts them back", () => {
    const t = clone(TUNING);
    t.pixelSize = 5; t.camera.curve.treetop = 0.002;
    const back = clone(TUNING);
    applySet(back, setText(tuningDiff(t, TUNING)));
    expect(tuningDiff(back, TUNING)).toEqual(tuningDiff(t, TUNING));
    applySet(back, "no.such.path=1;=2;pixelSize"); // (nothing it can't place)
    expect(back.pixelSize).toBe(5);
  });
});

describe("the repro link", () => {
  it("rebuilds the waves, the areas cleared early, her place, mode and zoom", () => {
    const seed = 4242, g = newGame(seed, clone(TUNING));
    const p = new URLSearchParams("wave=3&at=120,-80&mode=treetop&zoom=5&creator=0");
    applyRepro(g, p);
    expect(g.party.wave).toBe(3);
    expect(g.party.areas.size).toBeGreaterThan(3);
    expect(g.party.bootUntil).toBeLessThanOrEqual(g.clock.time);
    expect([g.witch.x, g.witch.z, g.witch.mode, g.witch.lift, !!g.witch.seated]).toEqual([120, -80, "treetop", 1, false]);
    expect(g.camera.zoomStep).toBe(5);
    // and its own link, opened again, makes the same
    const q = reproQuery(reproState(g, []), new URLSearchParams("seed=1&island=home&debug"));
    expect(q).toContain("seed=4242"); expect(q).toContain("wave=3"); expect(q).toMatch(/[?&]at=120,-80/); expect(q).toContain("mode=treetop"); expect(q).toContain("island=home");
    const g2 = newGame(seed, clone(TUNING));
    applyRepro(g2, new URLSearchParams(q.slice(1)));
    expect([...g2.party.areas.keys()].sort()).toEqual([...g.party.areas.keys()].sort());
    expect([g2.witch.x, g2.witch.z, g2.witch.mode, g2.camera.zoomStep]).toEqual([g.witch.x, g.witch.z, g.witch.mode, g.camera.zoomStep]);
  });
  it("leaves her at her decks when she's there, and says so by leaving her place out", () => {
    const g = newGame(7, clone(TUNING)), q = reproQuery(reproState(g, []), new URLSearchParams());
    expect(q).not.toMatch(/[?&]at=/); expect(q).toContain("found="); expect(q).toContain("hat="); expect(q).toContain("creator=0");
  });
});

describe("the overlay's text", () => {
  it("is one short line in the overlay, the rest in the copied text, and names the browser and OS", () => {
    const g = newGame(7, clone(TUNING)), line = reproLine(reproState(g, []), 2);
    expect(line.startsWith("repro  wave 0")).toBe(true); expect(line).toContain("2 settings changed"); expect(line.length).toBeLessThan(120);
    expect(debugText("Witch", [["Link", ["?seed=7"]], ["Machine", ["gpu x", "gl y"]]])).toBe("Witch\n\nLink:\n?seed=7\n\nMachine:\ngpu x\ngl y");
    expect(browserOs("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36")).toBe("Chrome 141 Windows");
    expect(browserOs("Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15")).toBe("Safari 18 macOS");
  });
});
