// Ed, 31 Oct: an island's own friendly legend defends home, separate from dealt quest legends.
import { describe, expect, it } from "vitest";
import { generateMap } from "./map";
import { spawnCreatures, type Creature } from "./creatures";
import { TUNING, withTuning } from "./tuning";
import { REAL_KINDS, playableIsland } from "./rosters";
import { homeArea } from "./homeArea";
import { dealtLegends, stepWin } from "./win";
import { newGame, stepGame, STEP, type Game } from "./game";
import { levelCounts } from "./power";
import { hasRune, invitableNow, partyEggOpen } from "./creatureStates";
import { hit } from "./affection";
import { inviteCreature, newLeash, talkTarget } from "./leash";
import { legendOf } from "./quest";
import { stepLegendStates } from "./legends";
import { cellKey } from "./party";
import { friendSigils, stoneStack } from "./stoneStacks";

const mapOf = (island: string) => generateMap(11, withTuning({ map: { ...TUNING.map!, island, islandAreas: 10 } }));

describe("the island-kind home guard", () => {
  it("spawns one of every playable island's own kind inside home, happy, with no quest or extra dealt legend", () => {
    // Home-guard kind selection must not depend on the area's creature type. Reuse one actual island's geometry
    // for this table instead of generating every island on the shared laptop.
    const base = mapOf("tiger");
    for (const kind of REAL_KINDS.filter(playableIsland)) {
      const map = { ...base, island: { ...base.island!, kind } }, creatures = spawnCreatures(map), guards = creatures.filter(c => c.homeGuard);
      expect(guards, kind).toHaveLength(kind === "home" ? 0 : 1);
      if (kind === "home") continue;
      const c = guards[0];
      expect(c.species).toBe(kind); expect(c.legendState).toBe("happy"); expect(c.quest).toBeUndefined();
      expect(homeArea(map).inside(c.x, c.z)).toBe(true);
      expect([c.lairX, c.lairZ]).toEqual([c.x, c.z]);
      expect(dealtLegends({ map, creatures } as Game)).not.toContain(c);
      expect(levelCounts(creatures)[3]).toBe(creatures.filter(c => c.boss && !c.homeGuard).length);
    }
  }, 120000);

  it("has none on the home island", () => {
    expect(spawnCreatures(mapOf("home")).some(c => c.homeGuard)).toBe(false);
  });

  it("never scatters a stack sigil or joins the win dance, even though other legends do", () => {
    const g = newGame(11, withTuning({ map: { ...TUNING.map!, island: "tiger", islandAreas: 10 } }));
    const c = g.creatures.find(c => c.homeGuard)!, at = { x: c.x, z: c.z };
    expect(stoneStack(g, cellKey(c.cell))).toEqual([]);
    expect(friendSigils(g, cellKey(c.cell)).some(s => s.c === c)).toBe(false);
    g.win = { phase: "lap", lastWaveAt: 0, target: null, pickedAt: 0, lap: [{ key: "home", x: 0, z: 0, at: 0, links: 0 }], fired: 0, sigil: "tiger", found: [], lost: [], settled: false, lead: 0, congaSize: 0 };
    stepWin(g, STEP);
    expect(g.win.phase).toBe("won"); expect(c.legendState).toBe("happy");
    expect(c.partyLegend).toBeFalsy(); expect(c.finale).toBeUndefined(); expect(c.quest).toBeUndefined();
    expect({ x: c.x, z: c.z }).toEqual(at);
    expect(g.win.lost).not.toContain(c.species);
  });

  it("the final game boundary keeps the guard inside home even after an external displacement", () => {
    const g = newGame(11, withTuning({ map: { ...TUNING.map!, island: "tiger", islandAreas: 10 } }));
    g.clock.paused = false; g.party.spellAt = undefined;
    const c = g.creatures.find(c => c.homeGuard)!;
    c.x = g.map.bounds.maxX + 100; c.z = g.map.bounds.maxZ + 100;
    stepGame(g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false }, STEP);
    expect(homeArea(g.map).inside(c.x, c.z)).toBe(true);
    expect([c.x, c.z]).toEqual([c.lairX, c.lairZ]);
  });

  it("cannot be invited, given letters, become a party egg, expose a rune or answer a quest", () => {
    const map = mapOf("tiger"), creatures = spawnCreatures(map), c = creatures.find(c => c.homeGuard)!;
    expect(invitableNow(c, { affection: { hits: [1], drain: 0, drainDelay: 0, gap: 0 }, leash: "again", pickupDelay: 0, holdTime: 0, partyEgg: true })).toBe(false);
    expect(partyEggOpen(c)).toBe(false); expect(hasRune(c)).toBe(false);
    expect(hit({ time: 0, leash: () => { throw Error("home guard invited"); } }, c, 1000)).toBe(false);
    const s = newLeash(); inviteCreature(s, c, c.x, c.z, 0, "picked"); expect(s.stack).toEqual([]);
    expect(talkTarget([c], c.x, c.z, TUNING)).toBeNull();
    expect(legendOf(creatures, [c.id], cellKey(c.cell))).toBeNull();
  });

  it("stays happy without kin, with no open quest, and never counts as kin for another legend", () => {
    const map = mapOf("tiger"), creatures = spawnCreatures(map), c = creatures.find(c => c.homeGuard)!;
    Object.assign(c, { legendState: "asleep", quest: { species: "fox" } });
    const other = { ...c, id: creatures.length, homeGuard: undefined, legendState: "asleep", quest: undefined, stateAt: 0, restlessness: 0 } as Creature;
    const all = [c, other];
    stepLegendStates({ creatures: all, map, time: 10, dt: 10, partified: () => false, areaOf: () => "same" }, [0, 1]);
    expect(c.legendState).toBe("happy"); expect(c.quest).toBeUndefined(); expect(c.questOpen).toBe(false);
    expect(other.legendState).toBe("restless");
  });
});
