// Her followers while she's in the treehouse (rules/houseGuard.ts; Ed, 2026-10-24): her stack's creatures guard the home area as
// if their sigils were placed there, her stack and leash unchanged, and follow her again once she's off the treehouse.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { type Creature } from "./creatures";
import { deckOf } from "./treehouse";
import { homeArea } from "./homeArea";
import { houseGuards, inHouse } from "./houseGuard";
import { TRAVEL } from "./travel";
import { FIGHT } from "./movement";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };

/** A night under way, her three followers (a wolf, a fox and a baby boar) on her stack at her feet under the treehouse, nothing else
 *  near; she's `where`: up in the treehouse on its floor, or over it in the treetops. */
function night(where: "house" | "treetops"): { g: Game; ids: number[] } {
  // Keep this spatial fixture: guards are recruited over 200 m away and then travel between home and a neighbouring area.
  const g = newGame(77, TUNING), d = deckOf(g.map, g.tuning)!;
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
    const { g, ids } = night("house"), H = homeArea(g.map), C = (id: number) => g.creatures[id];
    expect(inHouse(g.witches[0])).toBe(true);
    const spots = new Map(houseGuards(g.witches[0], g.creatures, g.map, g.tuning).map(p => [p.id, p]));
    expect([...spots.keys()].sort()).toEqual([...ids].sort());
    for (const p of spots.values()) { expect(H.inside(p.x, p.z)).toBe(true); expect(Math.hypot(p.x - g.map.dancefloor.x, p.z - g.map.dancefloor.z)).toBeGreaterThan(g.map.dancefloor.radius); }
    play(g, 40);
    expect(g.leash.stack).toEqual(ids); // (still on her stack, in its order)
    expect(g.leash.placed).toEqual([]); // (no sigil put down)
    for (const id of ids) {
      const c = C(id), s = spots.get(id)!;
      expect(H.inside(c.x, c.z), `${c.species} in the home area`).toBe(true);
      expect(Math.hypot(c.x - s.x, c.z - s.z), `${c.species} by its spot`).toBeLessThan(12);
      expect(Math.hypot(c.x - g.witch.x, c.z - g.witch.z), `${c.species} not at her x/z`).toBeGreaterThan(10);
      expect(c.travelling, `${c.species} there, guarding (not travelling)`).toBe(false);
    }
  }, 120000);

  it("follow her again once she's off the treehouse: travelling to her while she flies, then her posse round her once she lands", () => {
    const { g, ids } = night("house");
    play(g, 40);
    const [cx, cy] = g.map.centreCell, next = [[1, 0], [-1, 0], [0, 1], [0, -1]].map(([i, j]) => [cx + i, cy + j]).find(([x, y]) => g.map.playable(x, y))!, to = g.map.siteOf(next[0], next[1]);
    g.witch = { ...g.witch, perch: false, mode: "treetop", lift: 1, x: to.x, z: to.z, vx: 0, vz: 0 }; // (taken off, over the treetops to the middle of the area next door)
    for (const c of g.creatures) if (!c.leashed && Math.hypot(c.x - to.x, c.z - to.z) < 150) c.gone = true; // (no locals to set on her there)
    g.byArea = null;
    const hold = () => { g.witches[0].health.hp = 1e6; return false; };
    expect(inHouse(g.witches[0])).toBe(false);
    expect(houseGuards(g.witches[0], g.creatures, g.map, g.tuning)).toEqual([]);
    play(g, 1, hold);
    for (const id of ids) expect(g.creatures[id].travelling, `${g.creatures[id].species} travelling to her`).toBe(true);
    play(g, 90, hold);
    g.witch = { ...g.witch, mode: "ground", lift: 0 }; // (she lands)
    play(g, 20, hold);
    const posse = TRAVEL.posse * FIGHT.scale;
    for (const id of ids) {
      const c = g.creatures[id];
      expect(Math.hypot(c.x - g.witch.x, c.z - g.witch.z), `${c.species} back with her`).toBeLessThan(posse);
      expect(c.travelling, `${c.species} in her posse`).toBe(false);
    }
    expect(g.leash.stack).toEqual(ids);
  }, 120000);

  it("a baby at its home spot doesn't eat the berries there (Ed, 2026-10-24), though at a real placed sigil it does", () => {
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
    expect(ate(true)).toBe(true); // (at a real sigil: as ever)
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
