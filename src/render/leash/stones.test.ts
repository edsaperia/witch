import { describe, expect, it } from "vitest";
import { barLevel, columnOf, stumpNoteSize } from "./stones";
import renderKnobs from "../../../config/playtest-render.json";
import { CHAIN_FLOOR, layChain, LINK_ANGLES, linkAngle, rattleChain, stepChain, type Chain, type ChainMotion } from "./chain";
import { CHAIN_DEFAULT } from "./ranks";

describe("rune stones' sigils", () => {
  it("keeps nearby notes at their authored size and distant notes at the minimum screen width", () => {
    expect(stumpNoteSize(3, 20)).toBe(3);
    expect(stumpNoteSize(3, .4)! * .4).toBeCloseTo(renderKnobs.stumpIconMinPixels);
    expect(stumpNoteSize(3, 0)).toBeUndefined();
  });
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

describe("chains (lying on the ground at full length: the chain rework, Ed 2026-11-03)", () => {
  const M: ChainMotion = CHAIN_DEFAULT;
  const run = (ch: Chain, n: number, seg: number, a: number[], b: number[], s = 2) => { for (let f = 0; f < s * 60; f++) stepChain(ch, n, seg, a[0], a[1], a[2], b[0], b[1], b[2], 1 / 60, M); };
  const len = (ch: Chain) => ch.links.reduce((l, p, i) => i ? l + Math.hypot(p.x - ch.links[i - 1].x, p.y - ch.links[i - 1].y, p.z - ch.links[i - 1].z) : 0, 0);
  it("no arc spring: a slack chain lies on the ground its full length, both ends pinned, never under it", () => {
    expect("arcPull" in M).toBe(false);
    const ch: Chain = { links: [] };
    run(ch, 40, 2, [0, 3, 0], [20, 0.5, 0]);
    const P = ch.links;
    expect([P[0].x, P[0].y, P[0].z]).toEqual([0, 3, 0]);
    expect([P[40].x, P[40].y, P[40].z]).toEqual([20, 0.5, 0]);
    expect(len(ch)).toBeGreaterThan(80 * 0.88); // (its whole length, in curves: 80 m over a 20 m span)
    expect(Math.min(...P.map(p => p.y))).toBeGreaterThanOrEqual(CHAIN_FLOOR);
    const lying = P.slice(3, -3).filter(p => p.y <= CHAIN_FLOOR + 0.05).length;
    expect(lying).toBeGreaterThanOrEqual(P.length - 8); // (all but near the pins down on the floor: nothing holds it up)
    for (const p of P) expect(Number.isFinite(p.x + p.y + p.z)).toBe(true);
  });
  it("pulled taut (its ends as far apart as it's long), it runs straight", () => {
    const ch: Chain = { links: [] };
    run(ch, 40, 2, [0, 0.5, 0], [80, 0.5, 0], 3);
    for (const p of ch.links) expect(Math.abs(p.z)).toBeLessThan(0.5);
  });
  it("dragged, it stays where it was dragged (friction on the ground), and settles; laid afresh on a jump", () => {
    const ch: Chain = { links: [] };
    run(ch, 20, 2, [0, 3, 0], [10, 0.5, 0]);
    const mid = { ...ch.links[10] };
    run(ch, 20, 2, [0.5, 3, 0], [10, 0.5, 0], 1); // (her end a little on: the chain on the ground mostly stays)
    expect(Math.hypot(ch.links[10].x - mid.x, ch.links[10].z - mid.z)).toBeLessThan(1);
    const v = Math.max(...ch.links.map(p => Math.hypot(p.x - p.px, p.y - p.py, p.z - p.pz)));
    expect(v).toBeLessThan(0.01);
    stepChain(ch, 20, 2, 60, 3, 0, 65, 0.5, 0, 1 / 60, M); // (a blink: 60 m)
    expect(ch.links[3].x).toBeGreaterThan(55);
  });
  it("a rattle jolts it from her end, less down its length", () => {
    const ch: Chain = { links: [] };
    layChain(ch, 20, 2, 0, 3, 0, 10, 0.5, 0);
    rattleChain(ch, 1, 7);
    const kick = (i: number) => Math.hypot(ch.links[i].x - ch.links[i].px, ch.links[i].y - ch.links[i].py, ch.links[i].z - ch.links[i].pz);
    expect(kick(1)).toBeGreaterThan(0.3);
    expect(kick(18)).toBeLessThan(kick(1) * 0.1);
  });
});

describe("chain links turned along their span on screen", () => {
  it("picks the nearest of the angles, a link the same turned round", () => {
    expect(linkAngle(1, 0)).toBe(0); // (across the screen)
    expect(linkAngle(0, 1)).toBe(LINK_ANGLES / 2); // (up the screen: north-south)
    expect(linkAngle(0, -1)).toBe(LINK_ANGLES / 2); // (the same, the other way)
    expect(linkAngle(-1, 0)).toBe(0);
    expect(linkAngle(1, 1)).toBe(LINK_ANGLES / 4);
  });
});
