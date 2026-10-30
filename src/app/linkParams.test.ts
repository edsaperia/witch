// The world's shape and the fight's knobs come from the link alone (2026-10-07: a 14 x 14 map left in Ed's browser by the
// debug overlay gave every PR build 196 areas, 1,909 creatures and 98 legends, and threw off each playtest's balance).
import { afterEach, describe, expect, it } from "vitest";
import { TUNING } from "../rules/tuning";
import { FORGOTTEN_KEYS, islandFromLink, tuningFromLink, worldFromLink } from "./linkParams";
import { SLOT_INDEX } from "./saveSlots";

/** A browser's localStorage, as Ed's was: the world and the fight remembered from an earlier load. */
function fakeStorage(items: Record<string, string>) {
  const m = new Map(Object.entries(items)), writes: string[] = [];
  return { m, writes, store: { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => { writes.push(k); m.set(k, v); }, removeItem: (k: string) => { m.delete(k); }, clear: () => m.clear(), key: () => null, length: 0 } };
}
const g = globalThis as { localStorage?: unknown };
const before = g.localStorage;
afterEach(() => { g.localStorage = before; });

describe("the link's world (src/app/linkParams.ts)", () => {
  it("takes the island's size from ?island= (Ed, 2026-10-11): areas, home, off; ?mapAreas= the radius map", () => {
    g.localStorage = fakeStorage({}).store;
    expect(islandFromLink(null, 10)).toBeNull();
    expect(islandFromLink("20", 10)).toBe(20);
    expect(islandFromLink("home", 10)).toBe(10);
    expect(islandFromLink("off", 10)).toBe(0);
    expect(islandFromLink("999", 10)).toBe(200);
    expect(islandFromLink("fish", 10)).toBeNull();
    expect(tuningFromLink(new URLSearchParams("island=30")).tuning.map?.islandAreas).toBe(30);
    expect(tuningFromLink(new URLSearchParams("island=off")).tuning.map?.islandAreas).toBe(0);
    expect(tuningFromLink(new URLSearchParams("mapAreas=14")).tuning.map?.islandAreas).toBe(0); // (the radius map's size: no island)
    // a kind's island by name (rules/rosters.ts); home by roster; a number, random areas
    expect(tuningFromLink(new URLSearchParams("island=fox")).tuning.map?.island).toBe("fox");
    expect(tuningFromLink(new URLSearchParams("world=55")).tuning.map?.world).toBe(55); // (the world seed: rules/rosters.ts)
    expect(tuningFromLink(new URLSearchParams("")).tuning.map?.world).toBe(0); // (no save: the first world)
    expect(tuningFromLink(new URLSearchParams("island=unknown-01")).tuning.map?.island).toBe("home"); // (a placeholder's island isn't played)
    expect(tuningFromLink(new URLSearchParams("island=home")).tuning.map?.island).toBe("home");
    expect(tuningFromLink(new URLSearchParams("island=30")).tuning.map?.island).toBe("");
    expect(tuningFromLink(new URLSearchParams("")).tuning.map?.island).toBe("home");
  });

  it("ignores and deletes a remembered world and fight, and writes none back", () => {
    const f = fakeStorage({ "witch.world": JSON.stringify({ areaSize: 300, treetopSpeed: 200, mapAreas: 14 }), "witch.fight": JSON.stringify({ scale: 2, speed: 2, momentum: 2 }), "witch.wave": "30", "witch.volume": "0.4" });
    g.localStorage = f.store;
    const { tuning, world } = tuningFromLink(new URLSearchParams());
    expect(world.mapAreas).toBe(TUNING.mapAreas);
    expect(tuning.mapAreas).toBe(TUNING.mapAreas);
    expect(tuning.map?.radius).toBe(TUNING.map?.radius);
    expect(tuning.areaScale).toBeCloseTo(TUNING.areaScale, 9);
    expect(tuning.treetopSpeed).toBe(TUNING.treetopSpeed);
    for (const k of FORGOTTEN_KEYS) expect(f.m.has(k), k).toBe(false);
    expect(f.writes.filter(key => key !== SLOT_INDEX)).toEqual([]); // Slot metadata is not remembered rule tuning.
    expect(f.m.get("witch.volume")).toBe("0.4"); // (a per-viewer convenience that doesn't change the rules stays)
  });
  it("takes the world from the link alone, for that load only", () => {
    const f = fakeStorage({});
    g.localStorage = f.store;
    const { tuning } = tuningFromLink(new URLSearchParams("mapAreas=14&treetopSpeed=90"));
    expect(tuning.mapAreas).toBe(14);
    expect(tuning.map?.radius).toBeCloseTo(14 / Math.sqrt(Math.PI), 9);
    expect(tuning.treetopSpeed).toBe(90);
    expect(f.writes.filter(key => key !== SLOT_INDEX)).toEqual([]);
    expect(tuningFromLink(new URLSearchParams()).tuning.mapAreas).toBe(TUNING.mapAreas); // (the next load, without it, is the default)
  });
  it("clamps the link's values", () => {
    const w = worldFromLink(new URLSearchParams("mapAreas=99&areaSize=5&treetopSpeed=1"));
    expect(w).toEqual({ mapAreas: 30, areaSize: 56, treetopSpeed: 8 });
  });
  it("forgets the old waves' pace key (Ed, 2026-10-08; the pause page's slider keeps its own now: app/settings.ts)", () => {
    expect(FORGOTTEN_KEYS).toContain("witch.wave");
  });
  it("?dodge= picks which dodge changes are on (Ed, 2026-10-08), all by default", () => {
    g.localStorage = fakeStorage({}).store;
    const on = (q: string) => { const d = tuningFromLink(new URLSearchParams(q)).tuning.dodge!; return `${d.a.on ? "a" : ""}${d.b.on ? "b" : ""}${d.c.on ? "c" : ""}`; };
    expect(on("")).toBe("abc");
    expect(on("dodge=b")).toBe("b");
    expect(on("dodge=a,c")).toBe("ac");
    expect(on("dodge=0")).toBe("");
  });
});

describe("each load's tuning is its own (docs/plans/sail-without-reload.md)", () => {
  it("a whole copy: what one night's knobs change, deep in it, reaches neither the file nor the next night's", () => {
    g.localStorage = fakeStorage({}).store;
    const pulse = TUNING.leyLines.pulseSpeed, vol = TUNING.music.volume;
    const a = tuningFromLink(new URLSearchParams("")).tuning;
    a.leyLines.pulseSpeed = 7; a.music.volume = 0.123; a.partyObjects.generated = !TUNING.partyObjects.generated;
    expect(TUNING.leyLines.pulseSpeed).toBe(pulse); expect(TUNING.music.volume).toBe(vol);
    const b = tuningFromLink(new URLSearchParams("")).tuning;
    expect(b.leyLines.pulseSpeed).toBe(pulse); expect(b.music.volume).toBe(vol); expect(b.partyObjects.generated).toBe(TUNING.partyObjects.generated);
  });
});
