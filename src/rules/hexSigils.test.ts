// Sigils snap to a world-fixed hex grid (Ed, 2026-10-11: "a cluster of placed sigils reads cleanly"; leash.hex): the cell
// nearest her decides, a taken one picking its sigil up (no fizzling), a free one taking the sigil in its middle; cells under
// runestones, soundsystems and home's speakers are skipped. (Parked animals rest north of their sigil by their size: runeOffset.test.ts.)
import { describe, expect, it } from "vitest";
import { hexCell, hexCentre, hexSpot, newLeash, stepLeash, type LeashState } from "./leash";
import { TUNING } from "./tuning";
import { newGame } from "./game";
import { sigilBarred } from "./sigilButton";
import { isHomeKey } from "./speakers";
import type { Creature } from "./creatures";

const H = TUNING.leash.hex!;
/** A leash with `n` creatures in her stack (stand-ins: only their ids and partyLegend are read here). */
function stacked(n: number): { s: LeashState; all: Creature[] } {
  const s = newLeash(), all = Array.from({ length: n }, (_, id) => ({ id, x: 0, z: 0, leashed: true }) as unknown as Creature);
  s.stack = all.map(c => c.id);
  return { s, all };
}
const press = (s: LeashState, all: Creature[], x: number, z: number, barred?: (x: number, z: number) => boolean) =>
  stepLeash(s, all, { sigil: true, talk: false, barred }, { x, z }, true, 1, 1 / 60, TUNING, () => true);

describe("hex sigils (leash.hex)", () => {
  it("are on: 6 m between neighbouring cells with the rank sigils (leash.ranks.hex; 4 before them, ?sigils=old)", () => {
    expect(H.size).toBe(TUNING.leash.ranks?.hex ?? 6);
    expect(H.size).toBeGreaterThanOrEqual(TUNING.leash.spacing);
  });

  it("the grid: every point snaps to the nearest cell's middle, and neighbours are size apart", () => {
    for (let i = 0; i < 500; i++) {
      const x = Math.sin(i * 12.9898) * 300, z = Math.cos(i * 78.233) * 300, h = hexCell(x, z, H.size), c = hexCentre(h.q, h.r, H.size);
      for (const [dq, dr] of [[1, 0], [0, 1], [-1, 1], [-1, 0], [0, -1], [1, -1]]) {
        const n = hexCentre(h.q + dq, h.r + dr, H.size);
        expect(Math.hypot(n.x - c.x, n.z - c.z)).toBeCloseTo(H.size);
        expect(Math.hypot(x - c.x, z - c.z)).toBeLessThanOrEqual(Math.hypot(x - n.x, z - n.z) + 1e-9);
      }
    }
  });

  it("put down, a sigil sits in the middle of the cell nearest her; pressed there again, it's picked up (no fizzling)", () => {
    const { s, all } = stacked(3);
    press(s, all, 101.3, 50.7);
    const h = hexCell(101.3, 50.7, H.size), c = hexCentre(h.q, h.r, H.size);
    expect(s.placed).toHaveLength(1);
    expect(s.placed[0].x).toBeCloseTo(c.x); expect(s.placed[0].z).toBeCloseTo(c.z);
    // Anywhere in that cell, even off to its edge, picks it up.
    press(s, all, c.x + H.size * 0.45, c.z);
    expect(s.placed).toHaveLength(0); expect(s.stack).toEqual([0, 1, 2]);
    expect(s.events.map(e => e.kind)).toEqual(["picked"]);
    // A cluster: down in the cells next to each other, never a fizzle, each H.size from the next.
    for (let k = 0; k < 3; k++) press(s, all, c.x + k * H.size, c.z);
    expect(s.placed).toHaveLength(3);
    expect(s.placed[1].x - s.placed[0].x).toBeCloseTo(H.size);
    // The stack empty, a press on a free cell does nothing at all.
    press(s, all, c.x + 3 * H.size, c.z);
    expect(s.events).toEqual([]);
  });

  it("a baby's sigil (Ed, 2026-10-11: babies follow in single file) snaps to the grid like the rest, and is picked up the same way", () => {
    const { s, all } = stacked(2);
    for (const c of all) Object.assign(c, { level: 0, species: "wolf" });
    press(s, all, 37.2, -12.9);
    const h = hexCell(37.2, -12.9, H.size), c = hexCentre(h.q, h.r, H.size);
    expect(s.placed.map(p => [p.id, +p.x.toFixed(6), +p.z.toFixed(6)])).toEqual([[1, +c.x.toFixed(6), +c.z.toFixed(6)]]);
    press(s, all, c.x - 1, c.z + 1);
    expect(s.placed).toEqual([]); expect(s.stack).toEqual([0, 1]);
  });

  it("skips barred cells (under a stone, a soundsystem, a speaker): down on the nearest free one that isn't, or nothing", () => {
    const { s, all } = stacked(2), h = hexCell(0, 0, H.size), c = hexCentre(h.q, h.r, H.size);
    const stone = (x: number, z: number) => Math.hypot(x - c.x, z - c.z) < 1; // (just the cell she's in)
    press(s, all, c.x, c.z, stone);
    expect(s.placed).toHaveLength(1);
    expect(Math.hypot(s.placed[0].x - c.x, s.placed[0].z - c.z)).toBeCloseTo(H.size); // (a neighbour)
    press(s, all, c.x, c.z, () => true); // (everything near barred)
    expect(s.placed).toHaveLength(1); expect(s.stack).toEqual([0]);
    expect(s.events.filter(e => e.kind === "fizzled" || e.kind === "placed")).toEqual([]);
    expect(hexSpot(s, c.x, c.z, H.size, () => true).at).toBeNull();
  });

  it("in the game, the cells under each runestone, soundsystem and home speaker are barred, and the open ground isn't", () => {
    const g = newGame(123, TUNING), t = g.tuning, bar = (x: number, z: number) => { const h = hexCell(x, z, H.size), c = hexCentre(h.q, h.r, H.size); return sigilBarred(g, c.x, c.z, t); };
    for (const p of g.map.dancefloor.speakers) expect(bar(p.x, p.z)).toBe(true);
    for (const [k, h] of g.combat.sounds) if (isHomeKey(k)) expect(bar(h.x, h.z)).toBe(true);
    let n = 0;
    for (const [cx, cy] of g.map.cells) {
      if (cx === g.map.centreCell[0] && cy === g.map.centreCell[1]) continue;
      const st = g.map.soundsystemSpot(cx, cy);
      expect(bar(st.x, st.z)).toBe(true);
      expect(bar(st.x + 25, st.z)).toBe(false);
      n++;
    }
    expect(n).toBeGreaterThan(10);
  });

});
