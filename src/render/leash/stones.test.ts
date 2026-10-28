import { describe, expect, it } from "vitest";
import { columnOf, stoneStacks, type StackItem } from "./stones";
import { layChain, type Chain } from "./chain";

describe("rune stones' sigils", () => {
  it("a stone's column: enemies at the bottom, legend lowest, then friends, babies on top; hers, gone and travelling left out", () => {
    const c = (id: number, level: number, more = {}) => ({ id, level, cell: [2, 1] as [number, number], leashed: false, state: "wild", ...more });
    const g = { creatures: [c(0, 0), c(1, 3), c(2, 1, { state: "happy" }), c(3, 2), c(4, 0, { state: "happy" }), c(5, 2, { leashed: true }), c(6, 1, { gone: true }), c(7, 1, { travelling: true }), c(8, 3, { state: "happy" })] } as never;
    const col = stoneStacks(g, new Map()).get("2,1")!;
    expect(col.map(i => [i.id, i.friend])).toEqual([[1, false], [3, false], [0, false], [8, true], [2, true], [4, true]]);
  });
  it("the column climbs from just over the stone, each sigil its size, none overlapping", () => {
    const items: StackItem[] = [{ id: 0, level: 3, friend: false }, { id: 1, level: 0, friend: false }, { id: 2, level: 2, friend: true }];
    const P = columnOf(items, l => [0.81, 0.9, 1, 1.1][l] * 2.8);
    expect(P[0].y - P[0].size / 2).toBeCloseTo(0.6);
    for (let i = 1; i < P.length; i++) expect(P[i].y - P[i].size / 2).toBeGreaterThan(P[i - 1].y + P[i - 1].size / 2);
    expect(P.map(p => p.size)).toEqual([1.1 * 2.8, 0.81 * 2.8, 2.8]);
  });
});

describe("chains", () => {
  it("as many links as fit, gained and lost at the creature's end", () => {
    const ch: Chain = { links: [] };
    layChain(ch, 0, 2, 0, 10, 0.5, 0, 1, 0.5);
    const n = ch.links.length, first = { ...ch.links[0] };
    expect(n).toBe(Math.floor(Math.hypot(10, 1.5)));
    layChain(ch, 0, 2, 0, 15, 0.5, 0, 1, 0.5);
    expect(ch.links.length).toBeGreaterThan(n);
    expect(ch.links[0].x).toBeCloseTo(first.x, 0); // (her end's links stay where they were, near enough)
    layChain(ch, 0, 2, 0, 4, 0.5, 0, 1, 0.5);
    expect(ch.links.length).toBe(Math.floor(Math.hypot(4, 1.5)));
  });
  it("a tether keeps its links, bowing up as she comes closer; its last link at the legend; ready for a solver (where it was kept)", () => {
    const ch: Chain = { links: [] };
    layChain(ch, 0, 2, 0, 20, 0.5, 0, 1.3, 0, 16);
    const flat = Math.max(...ch.links.map(l => l.y));
    layChain(ch, 0, 2, 0, 10, 0.5, 0, 1.3, 0, 16);
    expect(ch.links.length).toBe(16);
    expect(Math.max(...ch.links.map(l => l.y))).toBeGreaterThan(flat + 2);
    const last = ch.links[15];
    expect([last.x, last.y, last.z]).toEqual([10, 0.5, 0].map(v => expect.closeTo(v, 5)));
    expect(last.px).toBe(last.x);
  });
});
