import { describe, expect, it } from "vitest";
import { barLevel, columnOf } from "./stones";
import { bowOf, layChain, stepChain, type Chain, type ChainMotion } from "./chain";
import { CHAIN_DEFAULT } from "./ranks";

describe("rune stones' sigils", () => {
  it("the column climbs from just over the stone, each sigil its size, none overlapping", () => {
    const P = columnOf([{ level: 3 }, { level: 0 }, { level: 2 }], l => [0.81, 0.9, 1, 1.1][l] * 2.8);
    expect(P[0].y - P[0].size / 2).toBeCloseTo(0.6);
    for (let i = 1; i < P.length; i++) expect(P[i].y - P[i].size / 2).toBeGreaterThan(P[i - 1].y + P[i - 1].size / 2);
    expect(P.map(p => p.size)).toEqual([1.1 * 2.8, 0.81 * 2.8, 2.8]);
  });
  it("the analyser's bars follow the music: the bass at the ring's front, mirrored left and right, silent with silence", () => {
    const bins = Uint8Array.from({ length: 64 }, (_, i) => (i < 4 ? 255 : 20));
    expect(barLevel(bins, 0, 36)).toBe(1); // (the front: the bass)
    expect(barLevel(bins, 18, 36)).toBeLessThan(0.2); // (the back: the treble)
    for (let i = 1; i < 18; i++) expect(barLevel(bins, i, 36)).toBe(barLevel(bins, 36 - i, 36));
    expect(barLevel(new Uint8Array(64), 5, 36)).toBe(0);
  });
});

describe("chains", () => {
  const M: ChainMotion = CHAIN_DEFAULT;
  const run = (ch: Chain, n: number, a: number[], b: number[], h: number, s = 2) => { for (let f = 0; f < s * 60; f++) stepChain(ch, n, 1, a[0], a[1], a[2], b[0], b[1], b[2], h, 1 / 60, M); };
  it("both ends pinned, its links their length, held up off the ground toward its bow, never under it", () => {
    const ch: Chain = { links: [] };
    run(ch, 14, [0, 3, 0], [12, 0.5, 0], 1.5);
    const P = ch.links;
    expect([P[0].x, P[0].y, P[0].z]).toEqual([0, 3, 0]);
    expect([P[14].x, P[14].y, P[14].z]).toEqual([12, 0.5, 0]);
    for (let i = 0; i < 14; i++) expect(Math.hypot(P[i + 1].x - P[i].x, P[i + 1].y - P[i].y, P[i + 1].z - P[i].z)).toBeCloseTo(1, 1);
    expect(Math.min(...P.map(p => p.y))).toBeGreaterThanOrEqual(0.15);
    expect(P[7].y).toBeGreaterThan(1.2); // (up off the ground in the middle, as the bow)
    for (const p of P) expect(Number.isFinite(p.x + p.y + p.z)).toBe(true);
  });
  it("gains and loses links at the creature's end; laid afresh on a jump; settles (no runaway)", () => {
    const ch: Chain = { links: [] };
    run(ch, 10, [0, 3, 0], [9, 0.5, 0], 1);
    const near = { ...ch.links[1] };
    run(ch, 14, [0, 3, 0], [13, 0.5, 0], 1, 0.05);
    expect(ch.links.length).toBe(15);
    expect(ch.links[1].x).toBeCloseTo(near.x, 0); // (her end's links stay where they were)
    run(ch, 6, [0, 3, 0], [5, 0.5, 0], 1, 0.05);
    expect(ch.links.length).toBe(7);
    stepChain(ch, 6, 1, 40, 3, 0, 45, 0.5, 0, 1, 1 / 60, M); // (a blink: 40 m)
    expect(ch.links[3].x).toBeGreaterThan(40);
    run(ch, 6, [40, 3, 0], [45, 0.5, 0], 1, 3);
    const v = Math.max(...ch.links.map(p => Math.hypot(p.x - p.px, p.y - p.py, p.z - p.pz)));
    expect(v).toBeLessThan(0.01);
  });
  it("a tether's held length bows up as she comes closer", () => {
    expect(bowOf(20, 20, 0)).toBe(0);
    expect(bowOf(10, 20, 0)).toBeGreaterThan(4);
    const ch: Chain = { links: [] };
    layChain(ch, 16, 0, 2, 0, 10, 0.5, 0, bowOf(10, 16 * 1.3, 0.3));
    expect(Math.max(...ch.links.map(l => l.y))).toBeGreaterThan(3);
  });
});
