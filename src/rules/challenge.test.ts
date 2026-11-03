// The challenge area (Ed, 2026-11-03; rules/challenge.ts, rules/findSets.ts): the find's area become a stone circle with the island's
// pack in it, cleared by the music spell once they're all invited or run off, its find the reward (a flask once she owns the island's
// set), only before the final wave, never toward the win.
import { describe, expect, it } from "vitest";
import { newGame, stepGame, type Controls, type Game } from "./game";
import { TUNING, withTuning, type Tuning } from "./tuning";
import { AREA_TYPES, generateMap } from "./map";
import { cellKey, clearArea } from "./party";
import { befriend, hasRune, stateOf } from "./creatureStates";
import { challengeReady, challengeSite, columnSpots, packKinds, packLeft, spawnPack } from "./challenge";
import { fillTrunk, FIND_KINDS, type Found } from "./finds";
import { FIND_SETS, allFinds, bandOf, biomeOf, islandSet, setPick } from "./findSets";
import { flaskUnder } from "./legends";
import { routeOf } from "./party";
import { KINDS_TABLE } from "./kinds";

const islandOf = (kind: string, t: Tuning = TUNING): Tuning => ({ ...t, map: { ...t.map!, island: kind, islandAreas: 10 } });
const still: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const run = (g: Game, secs: number, c: Controls = still) => { for (let i = 0; i < Math.round(secs * 60); i++) stepGame(g, c, 1 / 60); };
const key = (c: readonly [number, number]) => `${c[0]},${c[1]}`;

/** A night under way on an island (the party on, no waves unless a test brings one), her high over home, hard to knock out. */
function game(kind = "home", seed = 1, t: Tuning = TUNING): Game {
  const g = newGame(seed, islandOf(kind, t));
  g.clock.paused = false; g.party.spellAt = undefined; g.party.paused = true;
  g.witch = { ...g.witch, seated: false, mode: "treetop", lift: 1 };
  g.witches[0].health.hp = 1e6;
  run(g, 0.1);
  return g;
}
const pack = (g: Game) => g.challenge!.pack.map(id => g.creatures[id]);
/** Her on foot at the circle's middle; every other creature near it gone (nothing to hit her). */
function atCircle(g: Game): void {
  const ch = g.challenge!;
  for (const c of g.creatures) if (cellKey(c.cell) !== ch.key && Math.hypot(c.x - ch.x, c.z - ch.z) < 250) c.gone = true;
  g.byArea = null;
  g.witch = { ...g.witch, x: ch.x + 0.5, z: ch.z + 0.5, mode: "ground", lift: 0, seated: false, perch: undefined, vx: 0, vz: 0 };
}
const winAll = (g: Game) => { for (const c of pack(g)) befriend(c, g.clock.time); };

describe("where it is (Ed, 2026-11-03: \"The challenge area shouldn't be adjacent to the home area\")", () => {
  it("is the find's own area, one a map: not home, not touching it, off the route, at its site, themed on the island's animal", () => {
    for (const [kind, seed] of [["home", 1], ["home", 5], ["fox", 2], ["tiger", 1]] as const) {
      const m = generateMap(seed, islandOf(kind)), sites = m.specialSites.filter(s => s.kind === "challenge"), sp = challengeSite(m)!;
      expect(sites.length, `${kind} ${seed}`).toBe(1);
      expect(m.specialSites.filter(s => s.kind === "find")).toEqual([]); // (the find's area is the challenge area)
      const home = key(m.centreCell);
      expect(key(sp.cell)).not.toBe(home);
      expect(m.neighbours.get(home)?.has(key(sp.cell))).toBeFalsy();
      expect(m.playable(sp.cell[0], sp.cell[1])).toBe(false);
      expect(routeOf(m).order).not.toContain(key(sp.cell));
      expect(key(m.areaAt(sp.x, sp.z).cell)).toBe(key(sp.cell));
      expect(sp.r).toBeGreaterThanOrEqual(TUNING.challenge!.radius); // (its clearing holds the circle and its columns)
      // (Ed: "Its type is themed of the island's animal (e.g. the squirrel map's challenge areas have squirrel area trees)")
      if (kind !== "home") expect(AREA_TYPES[m.typeOf(sp.cell[0], sp.cell[1])].creature, kind).toBe(kind);
    }
  }, 120000);

  it("holds tonight's find at its middle", () => {
    const g = game("fox", 2), ch = g.challenge!;
    expect(g.trunk).toBeTruthy();
    expect([g.trunk!.x, g.trunk!.z, key(g.trunk!.cell)]).toEqual([ch.x, ch.z, ch.key]);
  }, 60000);

  it("stands its columns round its edge, as many as the knob says", () => {
    const t = withTuning({ challenge: { ...TUNING.challenge!, columns: 7, radius: 10 } }), at = { x: 100, z: 50 }, cols = columnSpots(at, t);
    expect(cols.length).toBe(7);
    for (const c of cols) expect(Math.hypot(c.x - at.x, c.z - at.z)).toBeCloseTo(10, 6);
  });

  it("is off with the challenge off: the find's area as before, nothing to clear", () => {
    const t = withTuning({ challenge: { ...TUNING.challenge!, on: false } }), m = generateMap(1, islandOf("home", t));
    expect(m.specialSites.map(s => s.kind)).toEqual(["find"]);
    expect(spawnPack(m, 0)).toEqual([]);
  }, 60000);
});

describe("its pack (Ed: \"one adult and one youth of every creature kind on the island\")", () => {
  it("is an adult and a youth of every kind on the island's roster, wild creatures of its area", () => {
    for (const [kind, seed] of [["home", 1], ["fox", 2]] as const) {
      const g = game(kind, seed), P = pack(g), roster = g.map.island!.roster.map(r => r.kind);
      expect(new Set(packKinds(g.map))).toEqual(new Set(roster));
      expect(P.length, kind).toBe(roster.length * 2);
      for (const k of roster) {
        expect(P.filter(c => c.species === k && c.level === 2).length, `${kind}: ${k} adult`).toBe(1);
        expect(P.filter(c => c.species === k && c.level === 1).length, `${kind}: ${k} youth`).toBe(1);
      }
      for (const c of P) { expect(key(c.cell)).toBe(g.challenge!.key); expect(stateOf(c)).toBe("wild"); }
      // (only they live there)
      expect(g.creatures.filter(c => key(c.cell) === g.challenge!.key).length).toBe(P.length);
    }
  }, 120000);

  it("takes its size from the knobs", () => {
    const m = generateMap(1, islandOf("home", withTuning({ challenge: { ...TUNING.challenge!, adults: 2, youths: 0 } }))), P = spawnPack(m, 0);
    expect(P.length).toBe(packKinds(m).length * 2);
    expect(P.every(c => c.level === 2)).toBe(true);
  }, 60000);

  it("watches her come down among them and attacks after the wild watch's warning", () => {
    const g = game("home", 1), ch = g.challenge!;
    g.witch = { ...g.witch, x: ch.x, z: ch.z, mode: "ground", lift: 0, seated: false, perch: undefined };
    run(g, 0.2);
    const e = g.wildEntry.get(ch.key);
    expect(e).toBeTruthy();
    expect(e!.until - e!.at).toBeCloseTo(TUNING.wildWatch!.time, 6);
    // (awake by then: napping ones roused by her coming down in their area)
    run(g, TUNING.wildWatch!.time + 1);
    expect(pack(g).some(c => c.hunting === 0)).toBe(true);
  }, 60000);
});

describe("clearing it (Ed: \"When they're all invited or have run off, you can go to the special place and cast the music spell\")", () => {
  it("is ready only once every one of its pack is invited or run off", () => {
    const g = game("fox", 2), P = pack(g);
    expect(challengeReady(g)).toBe(false);
    P.slice(0, -1).forEach(c => befriend(c, g.clock.time));
    expect(packLeft(g).length).toBe(1);
    expect(challengeReady(g)).toBe(false);
    P[P.length - 1].fleeUntil = Infinity; // (run off for good)
    expect(packLeft(g)).toEqual([]);
    expect(challengeReady(g)).toBe(true);
  }, 60000);

  it("can't be cast on before then: held at its middle, nothing happens", () => {
    const g = game("fox", 2);
    for (const c of pack(g)) c.asleep = true; // (no fight: just the spell)
    atCircle(g);
    run(g, TUNING.cast!.time + 1, { ...still, sigilHeld: true });
    expect(g.challenge!.clearedAt).toBeNull();
  }, 60000);

  it("cast on, lights up: the pack happy, partying round it, never to be leashed; its find hers", () => {
    const g = game("fox", 2), ch = g.challenge!;
    fillTrunk(g, {});
    const item = g.trunk!.item!, set = islandSet(g.map.island)!;
    expect(set.finds.some(f => f.item === item && f.kind === g.trunk!.kind)).toBe(true); // (from the island's own set)
    winAll(g); atCircle(g);
    let done = false, found: string | undefined;
    for (let i = 0; i < 60 * (TUNING.cast!.time + 1) && !done; i++) {
      stepGame(g, { ...still, sigilHeld: true }, 1 / 60);
      done = g.leashEvents.some(e => e.kind === "castDone");
      found ??= g.leashEvents.find(e => e.kind === "found")?.obj;
    }
    expect(done).toBe(true);
    expect(ch.clearedAt).not.toBeNull();
    expect(ch.reward).toBe("find");
    expect(found).toBe(item);
    expect(g.trunk!.found).toBe(true);
    for (const c of pack(g)) {
      expect(stateOf(c)).toBe("happy");
      expect(c.dancing).toBe(true);
      expect(Math.hypot(c.anchorX - ch.x, c.anchorZ - ch.z)).toBeLessThan(0.01);
      expect(hasRune(c)).toBe(false); // (no rune: nothing to pick up)
    }
    // She stands at one and presses the sigil button: it stays where it is, unleashed.
    const c = pack(g)[0];
    g.witch = { ...g.witch, x: c.x, z: c.z + 1 };
    for (let i = 0; i < 30; i++) stepGame(g, { ...still, place: i % 2 === 0 }, 1 / 60);
    expect(pack(g).some(k => k.leashed)).toBe(false);
    expect(g.witches[0].leash.stack.filter(id => ch.pack.includes(id))).toEqual([]);
    // (no wild watch, no hunt there now)
    expect(g.friendly.has(ch.key)).toBe(true);
  }, 60000);

  it("keeps an invited one from being leashed before the cast too (no rune at its feet)", () => {
    const g = game("fox", 2), c = pack(g)[0];
    befriend(c, g.clock.time);
    run(g, 0.1);
    expect(stateOf(c)).toBe("happy");
    expect(c.atStone).toBe(true);
    expect(hasRune(c)).toBe(false);
  }, 60000);

  it("won't give its find to E before it's cleared", () => {
    const g = game("fox", 2);
    fillTrunk(g, {});
    for (const c of pack(g)) c.asleep = true;
    atCircle(g);
    for (let i = 0; i < 20; i++) stepGame(g, { ...still, place: i % 2 === 0 }, 1 / 60);
    expect(g.trunk!.found).toBe(false);
  }, 60000);
});

describe("the reward (Ed: \"when you clear it you get the find ... when you have them all you get a flask instead\")", () => {
  it("is a flask once she owns the island's whole set: its sigil at the circle, drunk with E", () => {
    const g = game("fox", 2), ch = g.challenge!, set = islandSet(g.map.island)!;
    const found: Found = {};
    for (const f of set.finds) found[f.kind] = new Set([...(found[f.kind] ?? []), f.item]);
    fillTrunk(g, found);
    expect(g.trunk).toBeNull(); // (nothing of the set left: no find tonight)
    const before = g.relics.length;
    winAll(g); atCircle(g);
    run(g, TUNING.cast!.time + 0.5, { ...still, sigilHeld: true });
    expect(ch.clearedAt).not.toBeNull();
    expect(ch.reward).toBe("flask");
    expect(g.relics.length).toBe(before + 1);
    const f = g.relics[before];
    expect(f.id).toBe(before);
    expect(f.state).toBe("dropped");
    expect(flaskUnder(g.relics, f.sx, f.sz, TUNING.leash.runeRadius)).toBe(f);
  }, 60000);

  it("draws only from the island's set, the same night the same find", () => {
    const set = islandSet({ kind: "fox", phase: 1 })!;
    for (let seed = 1; seed < 40; seed++) { const p = setPick(seed, {}, set)!; expect(set.finds).toContainEqual(p); expect(setPick(seed, {}, set)).toEqual(p); }
    const all: Found = {};
    for (const f of set.finds) all[f.kind] = new Set([...(all[f.kind] ?? []), f.item]);
    expect(setPick(1, all, set)).toBeNull();
  });
});

describe("the find sets (by island stage and biome)", () => {
  it("puts every find in exactly one set, one set for each biome at each stage", () => {
    const seen = new Map<string, number>();
    for (const s of FIND_SETS) for (const f of s.finds) seen.set(`${f.kind}:${f.item}`, (seen.get(`${f.kind}:${f.item}`) ?? 0) + 1);
    const every = allFinds();
    expect(every.filter(f => seen.get(f) !== 1)).toEqual([]);
    expect([...seen.keys()].filter(f => !every.includes(f))).toEqual([]); // (no find the game doesn't have)
    const biomes = new Set(["temperate", ...Object.values(KINDS_TABLE).filter(k => !k.placeholder).map(k => k.biome ?? "temperate")]);
    for (const b of biomes) for (const band of ["early", "mid", "late"]) expect(FIND_SETS.filter(s => s.biome === b && s.band === band).length, `${b} ${band}`).toBe(1);
    expect(FIND_KINDS.length).toBeGreaterThan(0);
  });

  it("reads an island's stage from its phase among its biome's islands", () => {
    expect([biomeOf("home"), bandOf("temperate", 0)]).toEqual(["temperate", "early"]);
    expect(islandSet({ kind: "fox", phase: 1 })).toMatchObject({ biome: "temperate", band: "mid" });
    expect(islandSet({ kind: "moth", phase: 2 })).toMatchObject({ biome: "temperate", band: "late" });
    expect(islandSet({ kind: "meerkat", phase: 3 })).toMatchObject({ biome: "badlands", band: "early" });
    expect(islandSet({ kind: "rattlesnake", phase: 4 })).toMatchObject({ biome: "badlands", band: "mid" });
    expect(islandSet({ kind: "griffin", phase: 5 })).toMatchObject({ biome: "badlands", band: "late" });
  });
});

describe("timing and the win (Ed: only before the final wave; optional)", () => {
  it("closes at last call (the final wave's countdown): its pack calm, its find gone, no casting", () => {
    const g = game("fox", 2), ch = g.challenge!;
    fillTrunk(g, {});
    winAll(g);
    g.party.next = [g.map.cells[1]]; g.party.afterNext = []; // (the next wave's stone the route's last)
    run(g, 0.1);
    expect(ch.closedAt).not.toBeNull();
    expect(g.trunk).toBeNull();
    expect(challengeReady(g)).toBe(false);
    atCircle(g);
    run(g, TUNING.cast!.time + 1, { ...still, sigilHeld: true });
    expect(ch.clearedAt).toBeNull();
    expect(g.leashEvents.some(e => e.kind === "castDone")).toBe(false);
    expect(g.friendly.has(ch.key)).toBe(true);
  }, 60000);

  it("never counts toward winning the island: the route's areas all partied, the night's won with its pack still wild", () => {
    const g = game("fox", 2), ch = g.challenge!;
    g.party.paused = false;
    for (const [cx, cy] of g.map.cells) if (cx !== g.map.centreCell[0] || cy !== g.map.centreCell[1]) clearArea(g.party, g.map, [cx, cy], g.clock.time);
    g.party.wave = Math.max(1, g.party.wave);
    for (let i = 0; i < 60 * 3 && !g.win; i++) stepGame(g, still, 1 / 60);
    expect(g.win).toBeTruthy();
    expect(g.party.areas.has(ch.key)).toBe(false);
    expect(packLeft(g).length).toBeGreaterThan(0); // (still wild, and it didn't matter)
    expect(ch.clearedAt).toBeNull();
  }, 60000);
});
