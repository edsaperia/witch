// The challenge area (Ed, 2026-11-03; rules/challenge.ts, rules/findSets.ts): the find's area become a stone circle with the island's
// pack in it, cleared by the music spell once they're all invited or run off, its find the reward (a flask once she owns the island's
// set), only before the final wave, never toward the win.
import { describe, expect, it } from "vitest";
import { stepGame, type Controls, type Game } from "./game";
import { TUNING, withTuning, type Tuning } from "./tuning";
import { siteRules, AREA_TYPES, generateMap, hydrateMap, prepOf, type ForestMap } from "./map";
import { cellKey, clearArea } from "./party";
import { befriend, hasRune, stateOf } from "./creatureStates";
import { castReachOf, challengeCastAt, challengeColumns, challengeReady, challengeSite, columnKinds, columnSpots, FIND_DESCENT, packKinds, packLeft, rewardFall, spawnPack } from "./challenge";
import { challengeCircle } from "./challengeCircle";
import { hostileSigil } from "./stoneStacks";
import { fillTrunk, FIND_KINDS, nightPick, type FindKindId, type Found } from "./finds";
import { FIND_SETS, allFinds, bandOf, biomeOf, islandSet, setPick } from "./findSets";
import { flaskUnder } from "./legends";
import { routeOf } from "./party";
import { lineGap, placeChallenge, PLACE } from "./challengePlace";
import { drawnOverChallenge, overChallenge, overChallengeCount, untangle, type P2 } from "./leyroute";
import { KINDS_TABLE } from "./kinds";
import { knownKinds } from "./rosters";
import { restoreGame, snapshotGame } from "./nightSnapshot";
import { startPartyOver } from "./partyOver";
import { Forest } from "./forest";
import { preppedGame, sharedMap } from "../test/preppedGame"; // (games on a map made once a file from its prep)

const islandOf = (kind: string, t: Tuning = TUNING): Tuning => ({ ...t, map: { ...t.map!, island: kind, islandAreas: 10 } });
/** The late-campaign home: every kind known (home's 10 first), an area each (rules/rosters.ts homeIsland). */
const lateHome = (n: number, t: Tuning = TUNING): Tuning => { const all = knownKinds(Object.keys(KINDS_TABLE)).slice(0, n); return { ...t, map: { ...t.map!, island: "home", islandAreas: all.length, found: all } }; };
const still: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const run = (g: Game, secs: number, c: Controls = still) => { for (let i = 0; i < Math.round(secs * 60); i++) stepGame(g, c, 1 / 60); };
const key = (c: readonly [number, number]) => `${c[0]},${c[1]}`;

/** A night under way on an island (the party on, no waves unless a test brings one), her high over home, hard to knock out. */
function game(kind = "hare", seed = 1, t: Tuning = TUNING): Game {
  const g = preppedGame(seed, islandOf(kind, t));
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
    for (const [kind, seed] of [["hare", 1], ["hare", 5], ["fox", 2], ["tiger", 1]] as const) {
      const m = sharedMap(seed, islandOf(kind)), sites = m.specialSites.filter(s => s.kind === "challenge"), sp = challengeSite(m)!;
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
      expect(AREA_TYPES[m.typeOf(sp.cell[0], sp.cell[1])].creature, kind).toBe(kind);
    }
  }, 120000);

  it("keeps its whole circle clear, the woods right up to a narrow margin past its edge (Ed, on #1725)", () => {
    const t = islandOf("fox"), m = sharedMap(2, t), sp = challengeSite(m)!, f = new Forest(m), C = TUNING.challenge!;
    expect(sp.r).toBeCloseTo(C.radius + C.margin, 6);
    const near = f.treesNear(sp.x, sp.z, sp.r + 10).map(q => Math.hypot(q.x - sp.x, q.z - sp.z));
    expect(near.filter(d => d < sp.r)).toEqual([]); // (none in it, whichever area a tree's in)
    expect(near.filter(d => d >= sp.r && d < sp.r + 10).length).toBeGreaterThan(5); // (the woods close round it)
  }, 60000);

  it("holds tonight's find at its middle", () => {
    const g = game("fox", 2), ch = g.challenge!;
    expect(g.trunk).toBeTruthy();
    expect([g.trunk!.x, g.trunk!.z, key(g.trunk!.cell)]).toEqual([ch.x, ch.z, ch.key]);
  }, 60000);

  it("stands its columns evenly round its edge, as many as asked, the first due north and on clockwise", () => {
    const at = { x: 100, z: 50, radius: 10 }, cols = columnSpots(at, 7);
    expect(cols.length).toBe(7);
    for (const c of cols) expect(Math.hypot(c.x - at.x, c.z - at.z)).toBeCloseTo(10, 6);
    for (let i = 1; i < 7; i++) expect(Math.hypot(cols[i].x - cols[i - 1].x, cols[i].z - cols[i - 1].z)).toBeCloseTo(2 * 10 * Math.sin(Math.PI / 7), 6);
    expect([cols[0].x, cols[0].z]).toEqual([100, 40]); // (due north: north is -z)
    expect(cols[1].x).toBeGreaterThan(100); // (then east of it: clockwise seen from above, north up)
  });

  it("is off with the challenge off: the find's area as before, nothing to clear", () => {
    const t = withTuning({ challenge: { ...TUNING.challenge!, on: false } }), m = generateMap(1, islandOf("hare", t));
    expect(m.specialSites.map(s => s.kind)).toEqual(["find"]);
    expect(spawnPack(m, 0)).toEqual([]);
  }, 60000);
});

describe("where it goes (Ed, 2026-11-04: \"The route should avoid going through the challenge area\"; \"ideally it should be on the edge, and far from the home area\")", () => {
  it("asks each candidate: on the edge? clear of the route? in the island's outer half? those answering yes to more first, the night's order kept among equals", () => {
    // (a strip of areas 5 by 3, 100 m apart, home at its west end's middle, touching each other side to side; round it the buffer)
    const playable = new Set<string>(), nb = new Map<string, Set<string>>(), link = (a: string, b: string) => { for (const [p, q] of [[a, b], [b, a]]) (nb.get(p) ?? nb.set(p, new Set()).get(p)!).add(q); };
    for (let x = 0; x < 5; x++) for (let y = 0; y < 3; y++) playable.add(`${x},${y}`);
    for (let x = -1; x <= 5; x++) for (let y = -1; y <= 3; y++) { link(`${x},${y}`, `${x + 1},${y}`); link(`${x},${y}`, `${x},${y + 1}`); }
    const ask = (lakes: string[], legends: string[] = []) => ({ home: "0,1", playable, neighbours: nb, lakes: new Set(lakes), legends: new Set(legends), site: (k: string) => { const [x, y] = k.split(",").map(Number); return { x: x * 100, z: y * 100 }; }, clear: 39 });
    const cands = ["4,1", "2,0", "1,2", "4,0", "3,1", "4,2", "2,2"]; // (the night's seeded order; home's neighbours never among them)
    const placed = placeChallenge(cands, ask(["5,1"])), of = (k: string) => placed.find(q => q.key === k)!;
    // (the far corners: on the rim, the line between their two neighbours 71 m off, the farthest from home)
    expect(of("4,0")).toEqual({ key: "4,0", edge: true, clear: true, far: true, steps: 5 });
    // (the rim's middle: the line between its neighbours along the rim runs over it)
    expect(of("2,0")).toMatchObject({ edge: true, clear: false, far: true, steps: 3 });
    expect(of("1,2")).toMatchObject({ edge: true, clear: false, far: false, steps: 2 }); // (under halfway out: 2 of 5)
    expect(of("3,1")).toMatchObject({ edge: false, clear: false, far: true }); // (inland)
    expect(of("4,1").edge).toBe(false); // (its only area past the island's a lake: not the rim)
    expect(placed.map(q => q.key)).toEqual(["4,0", "4,2", "2,0", "2,2", "1,2", "4,1", "3,1"]);
    expect(placeChallenge(cands, ask([])).map(q => q.key)).toEqual(["4,0", "4,2", "4,1", "2,0", "2,2", "1,2", "3,1"]); // (by the sea: the rim)
    // (a legend area isn't the edge: 4,2 with only legend areas past it is inland)
    expect(placeChallenge(["4,2"], ask([], ["4,3", "5,2"]))[0]).toMatchObject({ edge: false, clear: true, far: true });
    expect(PLACE.far).toBe(0.5);
  });

  /** On map m: its challenge area on the island's edge (touching an area past the playable ones that isn't a lake), in its outer half
   *  (areas crossed from home), and no link of the ley route over its circle and margin, straight or as drawn. */
  const placedWell = (m: ForestMap, what: string, far = true) => {
    const sp = challengeSite(m)!, k = key(sp.cell), home = key(m.centreCell), cells = new Set([...m.cells.map(key), k]);
    const edge = [...(m.neighbours.get(k) ?? [])].some(q => { const [x, y] = q.split(",").map(Number); return !cells.has(q) && !m.isLake(x, y); });
    const steps = new Map([[home, 0]]), todo = [home];
    for (let i = 0; i < todo.length; i++) for (const q of m.neighbours.get(todo[i]) ?? []) if (cells.has(q) && !steps.has(q)) { steps.set(q, steps.get(todo[i])! + 1); todo.push(q); }
    const r = routeOf(m), p: P2 = [sp.x, sp.z];
    let gap = Infinity;
    for (const l of [...r.links, ...(r.straight ?? [])]) for (let i = 0; i + 1 < l.length; i++) gap = Math.min(gap, lineGap(p, l[i], l[i + 1]));
    expect({ edge, far: steps.get(k)! >= PLACE.far * Math.max(...steps.values()), clear: gap >= sp.r }, `${what}: ${k}, ${steps.get(k)} of ${Math.max(...steps.values())} areas out, the route ${gap.toFixed(0)} m from its middle`).toEqual({ edge: true, far, clear: true });
  };
  it("on 10-area islands: on the edge, in the outer half, the route clear of its circle", () => {
    for (const [kind, seed] of [["hare", 1], ["hare", 5], ["fox", 2], ["fox", 3]] as const) placedWell(sharedMap(seed, islandOf(kind)), `${kind} ${seed}`);
  }, 120000);
  it("on 31 and 51-area islands and the late home of 64", () => {
    // (the owl's island: since the circle went to 50 m, #1827, with every two sites 50 m apart, #1807, no area in its outer half holds
    // the claim (logged "not far from home"): seeds 1 and 2 at 17,17, 2 of 5 out, still on the edge and clear of the route; with the
    // 36 m circle 5 of 5; Ed, 2026-11-05: "it's okay")
    for (const [kind, seed] of [["owl", 1], ["owl", 2], ["griffin", 1], ["griffin", 2]] as const) placedWell(sharedMap(seed, islandOf(kind)), `${kind} ${seed}`, kind !== "owl");
    placedWell(sharedMap(1, lateHome(64)), "home 64");
  }, 300000);
  it("the backstop holds for the line as drawn: no curved link inside its clearing where its straight line kept clear (elephant seed 2, #1827)", () => {
    // (elephant seed 2 on the 50 m circle: a link's straight line 82 m from its middle, PLACE.swing past its clearing, but its curve
    // swinging 34 m off it, 48 m from its middle: inside. leyRoute plans afresh with that link counted over it: drawnOverChallenge)
    const m = sharedMap(2, islandOf("elephant"));
    expect(drawnOverChallenge(m, routeOf(m))).toEqual([]);
    // (and, the circle 50 m with every two sites 50 m apart, no area in its outer half holds its claim: 3 of 9 out, logged "not far from
    // home"; on the edge and clear of the route still; with the 36 m circle 8 of 9; Ed, 2026-11-05: "it's okay")
    placedWell(m, "elephant 2", false);
  }, 300000);
  it("still moves night to night: more than one area over a few nights of a 51-area island", () => {
    const at = new Set([1, 2, 3, 4, 5].map(seed => key(challengeSite(seed <= 2 ? sharedMap(seed, islandOf("griffin")) : generateMap(seed, islandOf("griffin")))!.cell)));
    expect(at.size).toBeGreaterThan(1);
  }, 300000);
  it("is the same for a seed every time, and so is the route", () => {
    const a = generateMap(3, islandOf("owl")), b = generateMap(3, islandOf("owl"));
    expect(challengeSite(b)).toEqual(challengeSite(a));
    expect(routeOf(b).order).toEqual(routeOf(a).order);
  }, 120000);
  it("the backstop: an order that would run a link over its circle is untangled round it", () => {
    // (the shortest line between two of the route's stones that crosses the circle, those two taken one after the other; on the
    // first of these maps with one: where the map puts it, most have none)
    let m: ForestMap | null = null, r: ReturnType<typeof routeOf> | null = null, best: [number, number] | null = null, len = Infinity;
    for (const map of [[1, lateHome(64)], [1, islandOf("owl")], [2, islandOf("owl")], [1, islandOf("hare")], ...[1, 2, 3, 4].flatMap(s => ["wolf", "lion", "hydra", "fox"].map(k => [s, islandOf(k)] as const))].map(([s, i]) => sharedMap(s as number, i as Parameters<typeof sharedMap>[1]))) { // (more candidates since the bigger, sparser areas of #1807/#1818: fewer maps have such a pair)
      const q = routeOf(map);
      for (let i = 1; i < q.stones.length; i++) for (let j = 1; j < q.stones.length; j++) if (i !== j && overChallenge(map, q.stones[i], q.stones[j])) { const d = Math.hypot(q.stones[i][0] - q.stones[j][0], q.stones[i][1] - q.stones[j][1]); if (d < len) { len = d; best = [i, j]; } }
      if (best) { m = map; r = q; break; }
    }
    expect(best).not.toBeNull();
    m = m!; r = r!;
    const [i, j] = best!, order = r.order.filter((_, k) => k !== j);
    order.splice(order.indexOf(r.order[i]) + 1, 0, r.order[j]);
    const straight = (o: string[]): P2[][] => o.slice(1).map((q, k) => [o[k], q].map(c => { const [x, y] = c.split(",").map(Number), s = m.soundsystemSpot(x, y); return [s.x, s.z] as P2; }));
    expect(overChallengeCount(m, [[], ...straight(order)])).toBeGreaterThan(0);
    const u = untangle(m, order)!;
    expect(overChallengeCount(m, u.links)).toBe(0);
    expect([...u.order].sort()).toEqual([...order].sort());
    expect(u.order[0]).toBe(order[0]); // (the first kept first: the departure leads to it)
  }, 120000);
});

describe("its pack (Ed: \"one adult and one youth of every creature kind on the island\")", () => {
  it("is an adult and a youth of every kind on the island's roster, wild creatures of its area", () => {
    for (const [kind, seed] of [["hare", 1], ["fox", 2]] as const) {
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
    const m = generateMap(1, islandOf("hare", withTuning({ challenge: { ...TUNING.challenge!, adults: 2, youths: 0 } }))), P = spawnPack(m, 0);
    expect(P.length).toBe(packKinds(m).length * 2);
    expect(P.every(c => c.level === 2)).toBe(true);
  }, 60000);

  it("stands stone till she comes down on its floor, then wakes over its bars and attacks, no wild watch (Ed, 2026-11-04; rules/challengeStatues.test.ts has the rest)", () => {
    const g = game("hare", 1), ch = g.challenge!;
    g.witch = { ...g.witch, x: ch.x, z: ch.z, mode: "ground", lift: 0, seated: false, perch: undefined };
    run(g, 0.2);
    expect(g.wildEntry.get(ch.key)).toBeUndefined();
    expect(ch.statues!.phase).toBe("waking");
    run(g, (TUNING.challenge!.statues!.bars + 1) * 4 * 60 / TUNING.beat.bpm + 1);
    expect(ch.statues!.phase).toBe("awake");
    expect(pack(g).some(c => c.hunting === 0)).toBe(true);
  }, 60000);
});

describe("its columns, its sigil stack (Ed, 2026-11-03: \"the same number of columns as creature types, and the sigils are on top of the columns, one type per column\")", () => {
  it("has a column for every kind on the island's roster, in the roster's order", () => {
    for (const [kind, seed] of [["hare", 1], ["fox", 2]] as const) {
      const g = game(kind, seed), cols = challengeColumns(g), roster = [...new Set(g.map.island!.roster.map(r => r.kind))];
      expect(cols.length, kind).toBe(roster.length);
      expect(cols.map(c => c.kind)).toEqual(packKinds(g.map));
      expect(columnKinds(g)).toEqual(packKinds(g.map));
      const spots = columnSpots(g.challenge!, roster.length);
      expect(cols.map(c => [c.x, c.z])).toEqual(spots.map(s => [s.x, s.z])); // (round its edge, clockwise from north)
    }
  }, 120000);

  it("shows only its kind's wild fighters still standing, adult below and youth above; one invited or run off leaves it", () => {
    const g = game("fox", 2), cols = challengeColumns(g);
    for (const col of cols) {
      expect(col.sigils.map(e => g.creatures[e.id].species)).toEqual([col.kind, col.kind]);
      expect(col.sigils.map(e => e.level)).toEqual([2, 1]); // (bottom first: the adult, then the youth)
      expect(col.sigils.every(hostileSigil)).toBe(true); // (the rune stones' rule: wild fighters, rules/stoneStacks.ts)
    }
    const [a, b] = cols, adult = g.creatures[a.sigils[0].id], youth = g.creatures[b.sigils[1].id];
    befriend(adult, g.clock.time); // (invited)
    youth.fleeUntil = Infinity; // (run off for good)
    const after = challengeColumns(g);
    expect(after[0].sigils.map(e => e.level)).toEqual([1]);
    expect(after[1].sigils.map(e => e.level)).toEqual([2]);
    expect(after.slice(2).every(c => c.sigils.length === 2)).toBe(true);
  }, 60000);

  it("empties a column once its kind's all won over: that column lit, the rest still waiting", () => {
    const g = game("fox", 2), cols = challengeColumns(g), first = cols[0];
    for (const e of first.sigils) befriend(g.creatures[e.id], g.clock.time);
    const after = challengeColumns(g);
    expect(after[0].sigils).toEqual([]);
    expect(after.slice(1).every(c => c.sigils.length > 0)).toBe(true);
    expect(challengeReady(g)).toBe(false);
  }, 60000);

  it("is ready to cast exactly when every column is lit", () => {
    const g = game("fox", 2), cols = challengeColumns(g);
    for (const col of cols.slice(0, -1)) for (const e of col.sigils) befriend(g.creatures[e.id], g.clock.time);
    expect(challengeColumns(g).filter(c => c.sigils.length).length).toBe(1);
    expect(challengeReady(g)).toBe(false);
    const last = cols[cols.length - 1];
    befriend(g.creatures[last.sigils[0].id], g.clock.time);
    g.creatures[last.sigils[1].id].fleeUntil = Infinity;
    expect(challengeColumns(g).every(c => c.sigils.length === 0)).toBe(true);
    expect(challengeReady(g)).toBe(true);
  }, 60000);
});

describe("its circle grows with the roster (Ed, 2026-11-03: \"128 animal pack is the ultimate challenge ... the area will have to be big to fit a huge circle\")", () => {
  it("keeps its columns about spacing apart: radius the larger of the knob's and kinds x spacing / 2 pi", () => {
    const C = TUNING.challenge!, at = (n: number) => challengeCircle(n, TUNING);
    expect(C.spacing).toBe(7.5);
    expect(at(6).radius).toBe(C.radius); // (a 10-area island: few columns, Ed: "few is ok")
    expect(at(26).radius).toBe(C.radius); // (a 50-area island: 26 x 7.5 / 2 pi is 31 m)
    expect(at(64).radius).toBeCloseTo((64 * 7.5) / (2 * Math.PI), 6); // (the late home: about 76 m)
    expect(at(64).radius).toBeCloseTo(76.4, 1);
    const n = 64, R = at(n).radius;
    expect(2 * R * Math.sin(Math.PI / n)).toBeCloseTo(7.5, 1); // (neighbouring columns 7.5 m apart)
    // (its margin and the spell's reach grow with it)
    expect(at(64).margin).toBeCloseTo(C.margin * R / C.radius, 6);
    expect(at(64).castReach).toBeCloseTo(C.castReach * R / C.radius, 6);
    expect(at(6).castReach).toBe(C.castReach);
  });

  it("sizes the night's circle by its island's kinds: the knob's on a 10-area island, about 76 m on the late home of 64", () => {
    const g = game("fox", 2);
    expect(g.challenge!.radius).toBe(TUNING.challenge!.radius);
    expect(castReachOf(g.challenge!, TUNING)).toBe(TUNING.challenge!.castReach);
    const m = sharedMap(1, lateHome(64)), sp = challengeSite(m)!;
    expect(packKinds(m).length).toBe(64);
    expect(sp.radius).toBeCloseTo(76.4, 1);
    expect(sp.r).toBeCloseTo(challengeCircle(64, TUNING).radius + challengeCircle(64, TUNING).margin, 6);
  }, 120000);

  it("on the late home, casts from further out (its reach grown with it) and fills it with 128 animals", () => {
    const g = preppedGame(1, lateHome(64)), ch = g.challenge!;
    expect(ch.pack.length).toBe(128);
    expect(challengeColumns(g).length).toBe(64);
    expect(challengeColumns(g).every(c => c.sigils.length === 2)).toBe(true);
    for (const id of ch.pack) befriend(g.creatures[id], g.clock.time);
    g.clock.paused = false; g.party.spellAt = undefined;
    const reach = castReachOf(ch, g.tuning);
    expect(reach).toBeCloseTo(TUNING.challenge!.castReach * ch.radius / TUNING.challenge!.radius, 6); // (grown by the share its circle has: 76 m over the 50 m knob, Ed on #1827)
    expect(reach).toBeGreaterThan(TUNING.challenge!.castReach * 1.3);
    const W = g.witches[0];
    W.body = { ...W.body, x: ch.x + reach - 0.5, z: ch.z, mode: "ground", seated: false, perch: undefined };
    expect(challengeCastAt(g, W)).toBeTruthy();
    W.body = { ...W.body, x: ch.x + reach + 0.5 };
    expect(challengeCastAt(g, W)).toBeNull();
  }, 120000);
});

describe("its area holds its whole circle (Ed, 2026-11-03: \"the area will have to be big to fit a huge circle\")", () => {
  /** Every promise the map makes of the challenge area and its paths (#1713, #1725), on map m (another night of its island: m2). */
  const holds = (m: ForestMap, m2: ForestMap, what: string) => {
    const sp = challengeSite(m)!, k = key(sp.cell), home = key(m.centreCell), bad: string[] = [];
    expect(sp.claimed, what).toBe(true);
    // (the circle and its margin all its own ground, whichever way)
    for (let r = 0; r <= sp.r; r += 2) for (let a = 0; a < 96; a++) { const x = sp.x + Math.cos((a / 96) * Math.PI * 2) * r, z = sp.z + Math.sin((a / 96) * Math.PI * 2) * r; if (key(m.areaAt(x, z).cell) !== k) bad.push(`${what}: ${x.toFixed(0)},${z.toFixed(0)} not its own`); }
    // (not home, not touching it, not a legend area's pair, not playable)
    if (k === home || m.neighbours.get(home)?.has(k)) bad.push(`${what}: touches home`);
    if ([...m.legendAreas.values()].includes(k)) bad.push(`${what}: a legend pair`);
    expect(m.playable(sp.cell[0], sp.cell[1])).toBe(false);
    // (the island one piece without it)
    const cells = new Set(m.cells.map(key)), seen = new Set([home]), todo = [home];
    while (todo.length) for (const q of m.neighbours.get(todo.pop()!) ?? []) if (cells.has(q) && !seen.has(q)) { seen.add(q); todo.push(q); }
    if (seen.size !== cells.size) bad.push(`${what}: the island cut in two`);
    // (every two touching sited areas joined by a path, or their clearings meeting, or (a lake between) every site still reached)
    const sited = new Set([...cells, k]), joined = new Set<string>(), adj = new Map<string, string[]>();
    const add = (a: string, b: string) => { joined.add(a < b ? `${a}|${b}` : `${b}|${a}`); for (const [p, q] of [[a, b], [b, a]]) (adj.get(p) ?? adj.set(p, []).get(p)!).push(q); };
    for (const l of m.paths.lines) if (l.link) add(l.link[0], l.link[1]);
    for (const p of m.paths.meet) { const [a, b] = p.split("|"); add(a, b); }
    for (const a of sited) for (const b of m.neighbours.get(a) ?? []) if (sited.has(b) && a < b && !joined.has(`${a}|${b}`) && !m.paths.unlinked.includes(`${a}|${b}`)) bad.push(`${what}: ${a}|${b} unjoined`);
    const reach = new Set([home]), go = [home];
    while (go.length) for (const q of adj.get(go.pop()!) ?? []) if (!reach.has(q)) { reach.add(q); go.push(q); }
    if (!reach.has(k)) bad.push(`${what}: no path to it`);
    // (no path over its floor: the network's end at its edge, the rest cut short of it)
    for (const l of m.paths.lines) for (const p of l.pts) if (Math.hypot(p[0] - sp.x, p[1] - sp.z) < sp.r - 0.01) { bad.push(`${what}: a ${l.kind} over its floor`); break; }
    // (every stone in its own area, its clearing siteGap from every other's and from the circle's claim: siteRules, Ed 2026-11-04)
    const R = siteRules(m.tuning), stones = m.cells.filter(c => key(c) !== home).map(c => ({ cell: key(c), ...m.soundsystemSpot(c[0], c[1]) }));
    for (const s of stones) {
      if (key(m.areaAt(s.x, s.z).cell) !== s.cell) bad.push(`${what}: ${s.cell}'s stone off its ground`);
      if (Math.hypot(s.x - sp.x, s.z - sp.z) - sp.r - (sp.claimed ? 4 : 0) - R.stoneClear < R.siteGap - 0.01) bad.push(`${what}: ${s.cell}'s stone ${(Math.hypot(s.x - sp.x, s.z - sp.z) - sp.r).toFixed(0)} m from its edge`);
    }
    for (let i = 0; i < stones.length; i++) for (let j = i + 1; j < stones.length; j++) if (Math.hypot(stones[i].x - stones[j].x, stones[i].z - stones[j].z) < R.stoneSpacing - 0.01) bad.push(`${what}: ${stones[i].cell} and ${stones[j].cell} stones close`);
    // (the coast the same every night, whichever area holds it)
    expect(m2.bounds.land!.box, what).toEqual(m.bounds.land!.box);
    expect([...m2.bounds.land!.dist.slice(0, 4000)]).toEqual([...m.bounds.land!.dist.slice(0, 4000)]);
    expect(bad).toEqual([]);
  };
  it("on a 10-area island", () => { holds(sharedMap(1, islandOf("hare")), sharedMap(2, islandOf("hare")), "hare"); holds(sharedMap(2, islandOf("fox")), sharedMap(3, islandOf("fox")), "fox"); }, 300000);
  it("on a 50-area island", () => holds(sharedMap(1, islandOf("griffin")), sharedMap(2, islandOf("griffin")), "griffin"), 300000);
  it("on the late home of 64 kinds, its circle about 76 m round", () => {
    const m = sharedMap(1, lateHome(64));
    expect(challengeSite(m)!.radius).toBeCloseTo(76.4, 1);
    holds(m, sharedMap(2, lateHome(64)), "home 64");
  }, 300000);
  it("comes out the same from its prep (another page's worker: the island grown from the partition as cut)", () => {
    const t = lateHome(64), m = generateMap(3, t), again = hydrateMap(3, t, prepOf(m)), sp = challengeSite(m)!;
    expect(challengeSite(again)).toEqual(sp);
    expect([...again.neighbours].map(([q, v]) => [q, [...v]])).toEqual([...m.neighbours].map(([q, v]) => [q, [...v]]));
    expect(again.paths.lines.map(l => l.pts.length)).toEqual(m.paths.lines.map(l => l.pts.length));
  }, 300000);
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

  it("cast on, lights up: the pack happy, partying on it, never to be leashed; its find comes down from the sky, hers with E once landed", () => {
    const g = game("fox", 2), ch = g.challenge!;
    fillTrunk(g, {});
    const item = g.trunk!.item!;
    expect({ kind: g.trunk!.kind, item }).toEqual(nightPick(g.map.seed, {})); // (the night's one draw over everything, Ed 2026-11-03: "for now just make it one find selected at random")
    winAll(g); atCircle(g);
    expect(rewardFall(g, g.trunk)!.hidden).toBe(true); // (not shown at the circle before it's cleared)
    let done = false;
    for (let i = 0; i < 60 * (TUNING.cast!.time + 1) && !done; i++) {
      stepGame(g, { ...still, sigilHeld: true }, 1 / 60);
      done = g.leashEvents.some(e => e.kind === "castDone");
      expect(g.leashEvents.some(e => e.kind === "found")).toBe(false); // (not at the cast: it comes down first)
    }
    expect(done).toBe(true);
    expect(ch.clearedAt).not.toBeNull();
    expect(ch.reward).toBe("find");
    expect(ch.landsAt).toBeCloseTo(ch.clearedAt! + FIND_DESCENT, 6);
    expect([g.trunk!.x, g.trunk!.z]).toEqual([ch.x, ch.z]); // (onto the middle of its dancefloor)
    // Coming down: shown, falling, not to be taken; E pressed there does nothing yet.
    const mid = rewardFall(g, g.trunk)!;
    expect(mid.hidden).toBe(false);
    expect(mid.y).toBeGreaterThan(0);
    for (let i = 0; i < 20; i++) stepGame(g, { ...still, place: i % 2 === 0 }, 1 / 60);
    expect(g.trunk!.found).toBe(false);
    run(g, FIND_DESCENT);
    expect(rewardFall(g, g.trunk)).toBeNull(); // (landed)
    let found: string | undefined;
    for (let i = 0; i < 10 && !found; i++) { stepGame(g, { ...still, place: i % 2 === 0 }, 1 / 60); found = g.leashEvents.find(e => e.kind === "found")?.obj; }
    expect(found).toBe(item);
    expect(g.trunk!.found).toBe(true);
    for (const c of pack(g)) {
      expect(stateOf(c)).toBe("happy");
      expect(c.dancing).toBe(true);
      expect(Math.hypot(c.anchorX - ch.x, c.anchorZ - ch.z)).toBeLessThan(0.01);
      expect(Math.hypot(c.tx - ch.x, c.tz - ch.z)).toBeLessThan(ch.radius); // (on its dancefloor: Ed on #1725, "they dance on it")
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

/** Everything of a list of finds, as found. */
const owning = (finds: readonly { kind: FindKindId; item: string }[]): Found => { const o: Found = {}; for (const f of finds) o[f.kind] = new Set([...(o[f.kind] ?? []), f.item]); return o; };
const everything = () => owning(FIND_KINDS.flatMap(k => k.items.map(item => ({ kind: k.id, item }))));

describe("the reward (Ed: \"when you clear it you get the find ... when you have them all you get a flask instead\")", () => {
  it("is a flask once she has found everything: its sigil at the circle, drunk with E", () => {
    const g = game("fox", 2), ch = g.challenge!;
    fillTrunk(g, everything());
    expect(g.trunk).toBeNull(); // (nothing left to find: no find tonight)
    const before = g.relics.length;
    winAll(g); atCircle(g);
    run(g, TUNING.cast!.time + 0.5, { ...still, sigilHeld: true });
    expect(ch.clearedAt).not.toBeNull();
    expect(ch.reward).toBe("flask");
    expect(g.relics.length).toBe(before); // (coming down: not there yet)
    run(g, FIND_DESCENT + 0.1);
    expect(g.relics.length).toBe(before + 1);
    const f = g.relics[before];
    expect(f.id).toBe(before);
    expect(f.state).toBe("dropped");
    expect(flaskUnder(g.relics, f.sx, f.sz, TUNING.leash.runeRadius)).toBe(f);
  }, 60000);

  it("with the find sets on (findSets), draws from the island's own set, and gives a flask once that set's hers", () => {
    const t = withTuning({ challenge: { ...TUNING.challenge!, findSets: true } }), g = game("fox", 2, t), set = islandSet(g.map.island)!;
    fillTrunk(g, {});
    expect(set.finds).toContainEqual({ kind: g.trunk!.kind, item: g.trunk!.item });
    const g2 = game("fox", 2, t);
    fillTrunk(g2, owning(set.finds));
    expect(g2.trunk).toBeNull();
    // (off, the default: the set owned is no matter while anything else is left)
    const g3 = game("fox", 2);
    fillTrunk(g3, owning(set.finds));
    expect(g3.trunk?.item).toBeTruthy();
  }, 120000);

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

describe("timing and the win (Ed, 2026-11-03, on #1725: closed only once the night is won or lost; optional)", () => {
  it("stays open at last call (the final wave's countdown)", () => {
    const g = game("fox", 2), ch = g.challenge!;
    fillTrunk(g, {});
    winAll(g);
    g.party.next = [g.map.cells[1]]; g.party.afterNext = []; // (the next wave's stone the route's last)
    run(g, 0.1);
    expect(ch.closedAt).toBeNull();
    expect(challengeReady(g)).toBe(true);
    expect(g.trunk?.item).toBeTruthy();
  }, 60000);

  it("closes once the night is lost: its pack calm, its find gone, no casting", () => {
    const g = game("fox", 2), ch = g.challenge!;
    fillTrunk(g, {});
    winAll(g);
    startPartyOver(g, g.clock.time);
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

describe("saved nights", () => {
  it("keeps the challenge through a save, and restores a night saved before the challenge area with none", () => {
    const g = game("fox", 2), ch = g.challenge!;
    const back = restoreGame(JSON.parse(JSON.stringify(snapshotGame(g))));
    expect(back.challenge).toEqual(ch);
    delete (g as unknown as { challenge?: unknown }).challenge;
    const old = restoreGame(JSON.parse(JSON.stringify(snapshotGame(g))));
    expect(old.challenge).toBeNull();
  }, 60000);
});
