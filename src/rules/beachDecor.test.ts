// The beach's decorations (Ed, 2026-10-06; rules/beachDecor.ts): sparse, seeded, on the sand clear of the woods' edge, rocks on
// the rocky stretches, and trails of footprints that stay on the sand and fade out.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { generateMap } from "./map";
import { beachOf } from "./mapShape";
import { BeachDecor } from "./beachDecor";

// Keep seed 123's full coastline: density, rocky stretches, footprint diversity and the inland 120 m exclusion share that geometry.
const K = TUNING.beach!.decor!;

describe("the beach's decorations", () => {
  const map = generateMap(123, TUNING), b = beachOf(map.bounds, TUNING)!;
  const all = (d: BeachDecor) => d.sectorKeys().map(k => d.sector(k)).flat();

  it("lie on the sand, clear of the woods' edge and out of the sea, sparsely, the same for the same seed", () => {
    const d = new BeachDecor(b, 123, K), list = all(d);
    for (const it of list) {
      expect(b.intoSand(it.x, it.z)).toBeGreaterThan(it.print ? K.clear - 0.5 : K.clear);
      expect(b.intoSea(it.x, it.z)).toBeLessThan(0);
    }
    const finds = list.filter(i => !i.print).length, coast = b.land.loops.reduce((t, l) => t + l.length, 0);
    expect(finds / (coast / 1000)).toBeGreaterThan(5);   // (some)
    expect(finds / (coast / 1000)).toBeLessThan(120);    // (sparse: a few every hundred metres at most)
    expect(all(new BeachDecor(b, 123, K))).toEqual(list);
    expect(all(new BeachDecor(b, 124, K))).not.toEqual(list);
  });

  it("are only nature: shells, starfish, a conch, seaweed, pebbles, rocks, and prints of feet, paws, hooves and birds", () => {
    const ids = new Set(all(new BeachDecor(b, 123, K)).map(i => i.id.split("~")[0]));
    for (const id of ids) expect(["shell-cockle", "shell-scallop", "shell-whelk", "starfish", "starfish-violet", "conch", "seaweed", "pebbles", "rock", "rocks", "print-foot", "print-paw", "print-hoof", "print-bird"]).toContain(id);
    for (const id of ["shell-cockle", "starfish", "conch", "print-foot", "print-paw"]) expect(ids.has(id)).toBe(true);
  });

  it("put rocks on the rocky stretches, and trails of footprints that wander on and fade out", () => {
    const d = new BeachDecor(b, 123, K), list = all(d);
    const rocks = list.filter(i => i.id === "rock" || i.id === "rocks");
    expect(rocks.length).toBeGreaterThan(0);
    for (const r of rocks) { const s = b.land.shore(r.x, r.z); expect(b.rockyAlong(s.loop, s.s)).toBeGreaterThan(0.3); }
    // A trail: its prints in steps, the last ones smaller (fading out).
    const prints = list.filter(i => i.print);
    expect(prints.length).toBeGreaterThan(50);
    expect(prints.some(p => p.scale < 0.9)).toBe(true);
  });

  it("are found only near her, and only near the beach", () => {
    const d = new BeachDecor(b, 123, K), L = b.land, sea = L.loops.findIndex(l => l.sea), p = L.along(sea, L.loops[sea].length * 0.3), x = p.x - p.nx * 20, z = p.z - p.nz * 20;
    expect(d.near(x, z, 120).length).toBeGreaterThan(0);
    for (const it of d.near(x, z, 120)) { expect(Math.abs(it.x - x)).toBeLessThan(120); expect(Math.abs(it.z - z)).toBeLessThan(120); }
    expect(d.near(map.dancefloor.x, map.dancefloor.z, 120)).toEqual([]);
  });
});
