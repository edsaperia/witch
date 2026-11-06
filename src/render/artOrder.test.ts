// The order a sail's island art is asked for under the dive (Ed, 2026-11-06: "Coast (waves, sand) is urgent because we cross it
// first but coast decorations (starfish) are tiny and can wait. Campfires are nice to see, as are stumps."): render/islandNeeds.ts
// ART_ORDER through the real art library's queue (headless: no workers, so the jobs wait in it in the order they'll be drawn), and
// AssetLibrary.diving keeping the small things the view asks for as they come into view from jumping ahead of the trees.
import { describe, expect, it } from "vitest";
import { AssetLibrary } from "./assets";
import { loadStyle } from "./style";
import { ART_ORDER, askIslandArt, islandNeeds, type IslandArtAsks } from "./islandNeeds";
import { newGame } from "../rules/game";
import { tuningFromLink } from "../app/linkParams";
import { diveReach, diveShare } from "../rules/arrive";
import type { ArtJob } from "./artBuild";
import type { StumpSpec } from "../rules/stumps";

type Lib = { queue: (ArtJob & { home?: boolean })[] };
const queueOf = (a: AssetLibrary) => (a as unknown as Lib).queue.filter(j => !j.home); // (the start's own, the house first, ahead of all of it)
const stump = (seed: number): StumpSpec => ({ species: "fox", seed, yaw: 0 } as unknown as StumpSpec);

describe("the island's art under the dive, in Ed's order", () => {
  const g = newGame(123, tuningFromLink(new URLSearchParams({ island: "fox" })).tuning), A = g.tuning.arrive!;
  const reach = diveReach(g.map, A), share = diveShare(g.map, A), near = new Map<number, number>();
  for (const [x, y] of g.map.cells) { const s = g.map.siteOf(x, y), t = g.map.typeOf(x, y), d = reach(s.x, s.z); if (!(near.get(t)! <= d)) near.set(t, d); }
  const byView = new Map([...near].sort((a, b) => (share.get(b[0]) ?? 0) - (share.get(a[0]) ?? 0) || a[1] - b[1]).map(([t], i) => [t, i]));
  const n = islandNeeds(g.map, byView), looks = { legendNap: false, coast: true, beachDecor: true, lakes: true, stumps: [stump(1), stump(2)], dive: true };

  it("asks the palms, then every tree by its share of the dive's view, then the stumps, the creatures' plain looks, the legends, the coast's decorations, the lakes, the other looks, the decorations", () => {
    const asked: string[] = [], rec = new Proxy({}, { get: (_t, k) => (...a: unknown[]) => { asked.push(String(k) + ":" + (typeof a[0] === "object" ? "" : String(a[0]))); } }) as IslandArtAsks;
    askIslandArt(rec, n, looks);
    const step = (a: string): number => {
      const k = a.split(":")[0];
      return ART_ORDER.indexOf(k === "beachEdgeArt" ? "palms" : k === "prefetchType" ? "trees" : k === "stumpArt" ? "stumps" : k === "creatureArt" ? "creatures" : k === "sleepArt" ? "legends"
        : k === "beachArt" || k === "partyWitchArt" ? "coast" : k === "lakeShoreArt" ? "lakes" : k === "decorArt" || k === "pathPieceArt" ? "decor" : "looks");
    };
    const steps = asked.map(step);
    expect(steps.every(s => s >= 0)).toBe(true);
    expect([...steps].sort((a, b) => a - b)).toEqual(steps); // (each step's asks all before the next's)
    expect(new Set(steps).size).toBe(ART_ORDER.length); // (every step asked)
    const trees = asked.filter(a => a.startsWith("prefetchType:")).map(a => Number(a.split(":")[1]));
    expect(trees).toEqual(n.types);
    for (let i = 1; i < trees.length; i++) expect(share.get(trees[i - 1]) ?? 0).toBeGreaterThanOrEqual(share.get(trees[i]) ?? 0); // (the largest share first)
  });

  it("puts them in the art workers' queue in that order, none urgent: nothing jumps ahead of the trees", () => {
    const a = new AssetLibrary(loadStyle(), 11, 4);
    askIslandArt(a, n, looks);
    const kinds = queueOf(a).map(j => j.kind), first = (k: string) => kinds.indexOf(k as ArtJob["kind"]), last = (k: string) => kinds.lastIndexOf(k as ArtJob["kind"]);
    expect(first("beachEdge")).toBe(0);
    expect(last("type")).toBeLessThan(first("stump"));
    expect(last("stump")).toBeLessThan(first("creature"));
    expect(last("creature")).toBeLessThan(first("sleep"));
    expect(last("sleep")).toBeLessThan(first("beach"));
    expect(first("beach")).toBeLessThan(first("lakeShore"));
    expect(last("lakeShore")).toBeLessThan(first("woken"));
    expect(last("rig")).toBeLessThan(first("decor"));
    expect(queueOf(a).filter(j => j.kind === "type").map(j => j.id)).toEqual(n.types);
  });

  it("under the dive, the starfish asked for as the beach comes into view wait their turn; the trees on screen still come first", () => {
    const a = new AssetLibrary(loadStyle(), 11, 4);
    askIslandArt(a, n, { ...looks, beachDecor: false });
    a.diving = true;
    a.beachArt(); a.lakeShoreArt(); a.rigArt("fox", 2); // (as render/beach.ts, render/lakeShore.ts and the creatures ask: urgent)
    const far = n.types[n.types.length - 1];
    a.typeArt(far); // (a tree on screen: urgent still)
    const q = queueOf(a), at = (k: string) => q.findIndex(j => j.kind === k);
    expect(q[0].kind === "type" && q[0].id === far).toBe(true);
    expect(at("beach")).toBeGreaterThan(q.findIndex(j => j.kind === "creature"));
    expect(at("lakeShore")).toBeGreaterThan(q.findIndex(j => j.kind === "creature"));
    // landed, the same asks are urgent again (in play: what she's near now)
    a.diving = false;
    const b = new AssetLibrary(loadStyle(), 11, 4);
    askIslandArt(b, n, { ...looks, beachDecor: false });
    b.beachArt();
    expect(queueOf(b)[0].kind).toBe("beach");
  });
});
