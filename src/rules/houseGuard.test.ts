// Her followers while she's in the treehouse (rules/houseGuard.ts; Ed, 2026-10-24): her stack's creatures guard the home area as
// if their sigils were placed there, her stack and leash unchanged, and follow her again once she's off the treehouse.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { type Creature } from "./creatures";
import { deckOf } from "./treehouse";
import { homeArea } from "./homeArea";
import { houseGuards, inHouse, leashView } from "./houseGuard";
import { TRAVEL, updateModes } from "./travel";
import { FIGHT } from "./movement";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };

/** A night under way, her three followers (a wolf, a fox and a baby boar) on her stack at her feet under the treehouse, nothing else
 *  near; she's `where`: up in the treehouse on its floor, or over it in the treetops. */
function night(where: "house" | "treetops"): { g: Game; ids: number[] } {
  // Four authored areas retain >200 m recruits and a neighbouring destination; the rest of the island is unrelated work.
  const g = newGame(77, { ...TUNING, map: { ...TUNING.map!, island: "", islandAreas: 4, found: [] } }), d = deckOf(g.map, g.tuning)!;
  g.clock.paused = false; g.party.paused = true;
  g.witch = where === "house" ? { ...g.witch, seated: false, perch: true, mode: "ground", lift: 0, x: d.x, z: d.z, vx: 0, vz: 0 } : { ...g.witch, seated: false, perch: false, mode: "treetop", lift: 1, x: d.x, z: d.z, vx: 0, vz: 0 };
  const H = homeArea(g.map);
  for (const c of g.creatures) if (H.inside(c.x, c.z) || Math.hypot(c.x - d.x, c.z - d.z) < 80) c.gone = true;
  const spare = g.creatures.filter(c => !c.gone && !c.leashed && !c.boss && !c.partyLegend && Math.hypot(c.x - d.x, c.z - d.z) > 200);
  const ids = ([["wolf", 2], ["fox", 2], ["boar", 0]] as const).map(([species, level], i) => {
    const c = spare[i], x = d.x + (i - 1) * 3, z = d.z + 4;
    Object.assign(c, { circle: undefined, species, level, x, z, tx: x, tz: z, homeX: x, homeZ: z, anchorX: x, anchorZ: z, safeR: undefined, seen: g.clock.time, hp: undefined, boss: false, siege: undefined, enraged: false, rest: 0, fight: undefined, fleeUntil: undefined, leashed: true, travelling: false, route: undefined });
    c.cell = g.map.cellSafe(x, z).cell as [number, number];
    g.leash.stack.push(c.id);
    return c.id;
  });
  g.byArea = null;
  return { g, ids };
}
/** Play until the world's clock has run `secs` (up in the treehouse it runs at a tenth of hers). */
const play = (g: Game, secs: number, each?: () => boolean) => { const end = g.clock.time + secs; for (let i = 0; g.clock.time < end && i < 2e5; i++) { stepGame(g, idle, STEP); if (each?.()) return true; } return false; };

describe("her followers while she's in the treehouse", () => {
  it("head into the home area to spots of their own and guard there, not to her: no sigil put down, her stack unchanged", () => {
    const { g, ids } = night("house"), H = homeArea(g.map), W = g.witches[0];
    expect(inHouse(W)).toBe(true);
    const spots = new Map(houseGuards(W, g.creatures, g.map, g.tuning).map(p => [p.id, p]));
    expect([...spots.keys()].sort()).toEqual([...ids].sort());
    for (const p of spots.values()) { expect(H.inside(p.x, p.z)).toBe(true); expect(Math.hypot(p.x - g.map.dancefloor.x, p.z - g.map.dancefloor.z)).toBeGreaterThan(g.map.dancefloor.radius); }
    // Supplied arrivals isolate the guarding contract; the original40-world-second journey is reported in house-travel.
    for (const id of ids) { const c = g.creatures[id], p = spots.get(id)!; Object.assign(c, { x: p.x, z: p.z, travelling: true, fight: undefined, hurtAt: undefined, engagedUntil: undefined }); }
    const view = leashView(W, g.creatures, g.map, g.tuning);
    expect(view.stack).toEqual([]);
    expect(view.placed).toEqual([...spots.values()]);
    updateModes(view.stack, view.placed, g.creatures, W.body, true, g.map, g.clock.time);
    stepGame(g, idle, STEP); // retain the real game's virtual-sigil integration on the supplied arrived state
    expect(g.leash.stack).toEqual(ids);
    expect(g.leash.placed).toEqual([]);
    for (const id of ids) {
      const c = g.creatures[id], p = spots.get(id)!;
      expect(H.inside(c.x, c.z)).toBe(true);
      expect(Math.hypot(c.x - p.x, c.z - p.z)).toBeLessThan(12);
      expect(Math.hypot(c.x - W.body.x, c.z - W.body.z)).toBeGreaterThan(10);
      expect(c.travelling).toBe(false);
    }
  }, 120000);

  it("follow her again once she's off the treehouse: travelling to her while she flies, then her posse round her once she lands", () => {
    const { g, ids } = night("house"), W = g.witches[0];
    const guards = houseGuards(W, g.creatures, g.map, g.tuning);
    for (const p of guards) Object.assign(g.creatures[p.id], { x: p.x, z: p.z, travelling: false, fight: undefined, hurtAt: undefined, engagedUntil: undefined });
    const [cx, cy] = g.map.centreCell, next = [[1, 0], [-1, 0], [0, 1], [0, -1]].map(([i, j]) => [cx + i, cy + j]).find(([x, y]) => g.map.playable(x, y))!, to = g.map.siteOf(next[0], next[1]);
    g.witch = { ...g.witch, perch: false, mode: "treetop", lift: 1, x: to.x, z: to.z, vx: 0, vz: 0 };
    expect(inHouse(W)).toBe(false);
    expect(houseGuards(W, g.creatures, g.map, g.tuning)).toEqual([]);
    const flying = leashView(W, g.creatures, g.map, g.tuning);
    expect(flying.stack).toBe(g.leash.stack);
    expect(flying.placed).toBe(g.leash.placed);
    updateModes(flying.stack, flying.placed, g.creatures, W.body, false, g.map, g.clock.time);
    stepGame(g, idle, STEP);
    for (const id of ids) expect(g.creatures[id].travelling).toBe(true);
    // Supplied reunion tests the mode boundary without asserting a sampled travel deadline.
    g.witch = { ...g.witch, mode: "ground", lift: 0 };
    const posse = TRAVEL.posse * FIGHT.scale;
    ids.forEach((id, i) => Object.assign(g.creatures[id], { x: g.witch.x + (i + 1) * posse / 8, z: g.witch.z }));
    const landed = leashView(W, g.creatures, g.map, g.tuning);
    updateModes(landed.stack, landed.placed, g.creatures, W.body, true, g.map, g.clock.time);
    stepGame(g, idle, STEP);
    for (const id of ids) {
      const c = g.creatures[id];
      expect(Math.hypot(c.x - g.witch.x, c.z - g.witch.z)).toBeLessThan(posse);
      expect(c.travelling).toBe(false);
    }
    expect(g.leash.stack).toEqual(ids);
    expect(g.leash.placed).toEqual([]);
  }, 120000);

  it("a baby at its home spot doesn't eat the berries there (Ed, 2026-10-24), nor at a real placed sigil (Ed, 2026-11-03: nothing eats on its own)", () => {
    const ate = (real: boolean) => {
      const { g, ids } = night("house"), baby = g.creatures[ids[2]];
      play(g, 40); // (at its spot)
      const spot = houseGuards(g.witches[0], g.creatures, g.map, g.tuning).find(p => p.id === baby.id)!;
      if (real) { g.leash.stack = g.leash.stack.filter(id => id !== baby.id); g.leash.placed.push({ id: baby.id, x: spot.x, z: spot.z, at: g.clock.time }); } // (its sigil really put down there)
      const berry = g.berries.berries.find(q => q.claimedBy === null && !q.gone)!;
      Object.assign(g.berries.bushes[berry.bush], { x: baby.x + 3, z: baby.z }); // (a berry within its reach)
      return play(g, 6, () => g.berries.feeding.has(baby.id) || g.berries.evolving.has(baby.id) || baby.level > 0);
    };
    expect(ate(false)).toBe(false); // (at its home spot while she's in the treehouse: no)
    expect(ate(true)).toBe(false); // (at a real sigil: no longer, she feeds them)
  }, 120000);

  it("defend the home area as placed-sigil creatures do: they engage a wild creature in it that they'd pass by while travelling to her", () => {
    const engaged = (where: "house" | "treetops") => {
      const { g, ids } = night(where), H = homeArea(g.map);
      if (where === "house") play(g, 40); // (there first)
      const at = g.creatures[ids[0]], wild = g.creatures.find(c => !c.gone && !c.leashed && !c.boss && !c.partyLegend && !ids.includes(c.id) && Math.hypot(c.x - at.x, c.z - at.z) > 200) as Creature;
      const x = at.x + 6, z = at.z;
      Object.assign(wild, { circle: undefined, species: "stoat", level: 2, x, z, tx: x, tz: z, homeX: x, homeZ: z, anchorX: x, anchorZ: z, safeR: undefined, seen: g.clock.time, hp: undefined, boss: false, siege: undefined, enraged: false, rest: 0, fight: undefined, fleeUntil: undefined, leashed: false, state: undefined, friendly: false, napUntil: undefined, asleep: false, dazed: undefined, hunting: undefined });
      wild.cell = g.map.cellSafe(x, z).cell as [number, number];
      g.byArea = null;
      expect(H.inside(wild.x, wild.z)).toBe(true);
      return play(g, 20, () => ids.some(id => g.creatures[id].fight?.target?.kind === "creature" && g.creatures[id].fight?.target?.id === wild.id));
    };
    expect(engaged("house")).toBe(true); // (her guards at home go for it)
    expect(engaged("treetops")).toBe(false); // (following her over the treetops they travel: quiet, they leave it be)
  }, 180000);
});
