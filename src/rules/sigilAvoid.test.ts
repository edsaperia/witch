import { describe, expect, it } from "vitest";
import { generateMap } from "./map";
import { spawnCreatures, stepCreature, type Creature } from "./creatures";
import { danceAt } from "./creatureStates";
import { stepLeashed } from "./leash";
import { floorGrid, gatherFloorSigils, onFloorSigil, setFloorSigils, type FloorSigil } from "./sigilAvoid";
import { TUNING } from "./tuning";
import { newGame } from "./game";

// Ed, 2026-10-28: "When idling or dancing, creatures should try and avoid standing on floor sigils."
describe("creatures keep off the sigils on the floor", () => {
  // A cluster of sigils (3 m across, as a young one's) on a 5 m grid over a disc: about half the ground under them.
  const cluster = (x: number, z: number, r: number): FloorSigil[] => {
    const out: FloorSigil[] = [];
    for (let i = -r; i <= r; i += 5) for (let j = -r; j <= r; j += 5) if (Math.hypot(i, j) <= r) out.push({ x: x + i, z: z + j, r: 1.6 });
    return out;
  };
  // The share of a run's samples (every half second, after the first 10 s) of a creature standing still in which it stands on a sigil
  // (walking from spot to spot it may cross one: only where it stops counts).
  const onShare = (cs: Creature[], step: (c: Creature, dt: number) => void, list: FloorSigil[], avoid: boolean) => {
    const grid = floorGrid(list)!;
    let on = 0, n = 0;
    for (let i = 0; i < 60 * 70; i++) {
      setFloorSigils(avoid ? grid : null);
      try { for (const c of cs) step(c, 1 / 60); } finally { setFloorSigils(null); }
      if (i > 600 && i % 30 === 0) for (const c of cs) if (!c.moving) { n++; if (onFloorSigil(c.x, c.z, c.id, grid)) on++; }
    }
    return on / n;
  };

  it("dancers and idlers near a cluster of placed sigils end up off them", () => {
    for (const avoid of [false, true]) {
      const map = generateMap(1, TUNING), all = spawnCreatures(map), [hx, hy] = map.centreCell;
      const home = map.soundsystemSpot(hx, hy), dancers = all.slice(0, 16);
      for (const c of dancers) { c.cell = [hx, hy]; c.homeX = c.anchorX = home.x; c.homeZ = c.anchorZ = home.z; c.x = c.tx = home.x; c.z = c.tz = home.z; c.state = "happy"; danceAt(c, home, 10); }
      const share = onShare(dancers, (c, dt) => stepCreature(c, dt, map), cluster(home.x, home.z, 12), avoid);
      if (avoid) expect(share, "dancing, keeping off").toBeLessThan(0.03);
      else expect(share, "dancing, as before").toBeGreaterThan(0.15);
      // wild idlers roaming an area of their own, the sigils round their idling spot
      const idlers = all.filter(c => c.level > 0 && c.level < 3 && !c.boss && !c.circle).slice(0, 12);
      for (const c of idlers) { c.range = 12; c.homeX = c.anchorX = c.x; c.homeZ = c.anchorZ = c.z; }
      const idle = onShare(idlers, (c, dt) => stepCreature(c, dt, map), idlers.flatMap(c => cluster(c.homeX, c.homeZ, 10)), avoid);
      if (avoid) expect(idle, "idling, keeping off").toBeLessThan(0.03);
      else expect(idle, "idling, as before").toBeGreaterThan(0.1);
    }
  });

  it("parked ones roaming round their sigil keep off it and its neighbours", () => {
    for (const avoid of [false, true]) {
      const map = generateMap(1, TUNING), cs = spawnCreatures(map).slice(0, 10);
      const px = 0, pz = 0, list = cluster(px, pz, 10);
      for (const c of cs) { c.x = c.tx = px; c.z = c.tz = pz; c.rest = 0; }
      const share = onShare(cs, (c, dt) => stepLeashed(c, px, pz, dt, TUNING), list, avoid);
      if (avoid) expect(share).toBeLessThan(0.03); else expect(share).toBeGreaterThan(0.15);
    }
  });

  it("one resting on a sigil moves on", () => {
    const map = generateMap(1, TUNING), c = spawnCreatures(map).find(k => k.level === 1 && !k.circle)!;
    const x0 = c.x, z0 = c.z; c.tx = c.x; c.tz = c.z; c.rest = 4;
    const grid = floorGrid([{ x: c.x, z: c.z, r: 1.6 }]);
    setFloorSigils(grid);
    try { for (let i = 0; i < 60 * 3; i++) stepCreature(c, 1 / 60, map); } finally { setFloorSigils(null); }
    expect(onFloorSigil(c.tx, c.tz, c.id, grid), "it heads off it").toBe(false);
    expect(Math.hypot(c.x - x0, c.z - z0), "and is on its way").toBeGreaterThan(0.5);
  });

  it("gathers her placed sigils, her hats lying down, the relics' sigils and happy creatures' runes (never one's own)", () => {
    const g = newGame(7, TUNING), W = g.witches[0], c = g.creatures.find(k => k.level === 1 && !k.boss)!;
    W.leash.placed.push({ id: c.id, x: 10, z: 20, at: 0 });
    W.hat.down = { x: -5, z: 3, at: 0 };
    W.hat.left.push({ x: 40, z: 40, at: 0, spell: "healing" });
    const grid = gatherFloorSigils(g)!;
    expect(onFloorSigil(10, 20, undefined, grid)).toBe(true);
    expect(onFloorSigil(10, 20, c.id, grid), "its own placed sigil too").toBe(true);
    expect(onFloorSigil(-5, 3, undefined, grid)).toBe(true);
    expect(onFloorSigil(40, 40, undefined, grid)).toBe(true);
    expect(onFloorSigil(25, 25, undefined, grid)).toBe(false);
    for (const r of g.relics) if (r.state === "lying" || r.state === "dropped") expect(onFloorSigil(r.sx, r.sz, undefined, grid)).toBe(true);
    expect(gatherFloorSigils({ ...g, tuning: { ...g.tuning, sigilAvoid: { on: false, pad: 0.5 } } })).toBeNull();
  });
});
