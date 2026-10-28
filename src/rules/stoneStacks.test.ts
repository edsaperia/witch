// The runestone stacks and the soundsystem spell (Ed, 2026-10-28; rules/stoneStacks.ts): every wild creature's sigil in its stone's
// stack, friends above enemies; no auto-clearing; she converts a stone by holding the sigil button at it (a hit stops it, it drains
// while she's away), or a wave does; either way its friend sigils scatter round it, loose for anyone; a legend's tethers her.
import { describe, expect, it } from "vitest";
import { affectionOf, loseSoundsystem, newGame, stepGame, type Controls, type Game } from "./game";
import { TUNING as BUILT, withTuning } from "./tuning";

/** The tuning with the stacks on (they ship off till their view lands: ?cast=1). */
const TUNING = withTuning({ cast: { ...BUILT.cast, on: true } });
import { cellKey, spreadWave } from "./party";
import { befriend, hasRune, stateOf } from "./creatureStates";
import { castOf, castProgress, castShown, stoneStack } from "./stoneStacks";
import { hexCell } from "./leash";

const still: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const hold: Controls = { ...still, sigilHeld: true };
const run = (g: Game, secs: number, c: Controls = still) => { for (let i = 0; i < Math.round(secs * 60); i++) stepGame(g, c, 1 / 60); };
const C = castOf(TUNING);

/** A game under way, the boot long done, the witch high over home. */
function game(seed = 123, t = TUNING): Game {
  const g = newGame(seed, t);
  g.clock.paused = false; g.party.spellAt = undefined; g.party.paused = true; // (no waves unless a test brings one)
  g.witch = { ...g.witch, seated: false, mode: "treetop", lift: 1 };
  g.witches[0].health.hp = 1e6;
  run(g, 0.1);
  return g;
}
const own = (g: Game, key: string) => g.creatures.filter(c => cellKey(c.cell) === key && !c.gone);
/** The first wild area on the route with a baby, a young one or an adult, and a legend if `legend`. */
function area(g: Game, legend = false): { key: string; cell: [number, number]; stone: { x: number; z: number } } {
  const home = cellKey(g.map.centreCell);
  for (const [cx, cy] of g.map.cells) {
    const key = `${cx},${cy}`, cs = own(g, key);
    if (key === home || g.party.areas.has(key) || !g.map.playable(cx, cy)) continue;
    if (!cs.some(c => c.level === 0 && !c.boss) || !cs.some(c => c.level > 0 && !c.boss) || (legend && !cs.some(c => c.boss))) continue;
    return { key, cell: [cx, cy], stone: g.map.soundsystemSpot(cx, cy) };
  }
  throw new Error("no such area");
}
/** The area the next wave wakes. */
function nextArea(g: Game): { key: string; cell: [number, number]; stone: { x: number; z: number } } {
  const [cx, cy] = g.party.next[0];
  return { key: `${cx},${cy}`, cell: [cx, cy], stone: g.map.soundsystemSpot(cx, cy) };
}
/** Her on foot at a stone; the area's hostiles made friends (so nothing hits her) unless `keep`. */
function at(g: Game, a: { key: string; stone: { x: number; z: number } }, keep = false): void {
  if (!keep) for (const c of own(g, a.key)) if (!c.boss && c.level > 0) befriend(c, g.clock.time);
  for (const c of g.creatures) if (!c.boss && cellKey(c.cell) !== a.key && Math.hypot(c.x - a.stone.x, c.z - a.stone.z) < 250) c.gone = true; // (no visitors to hit her)
  g.byArea = null;
  g.witch = { ...g.witch, x: a.stone.x + 1, z: a.stone.z + 1, mode: "ground", lift: 0, seated: false, perch: undefined, vx: 0, vz: 0 };
}

describe("runestone stacks (Ed, 2026-10-28)", () => {
  it("list an area's own creatures at its stone in draw order, bottom first: enemies (legend, adults, youths, babies), then friends above them in the same order", () => {
    const g = game(), a = area(g, true), cs = own(g, a.key);
    const youth = cs.find(c => c.level > 0 && !c.boss)!;
    befriend(youth, g.clock.time);
    const s = stoneStack(g, a.key);
    expect(s.length).toBe(cs.filter(c => c.fleeUntil !== Infinity && !c.wanderTo).length);
    const friends = s.filter(e => e.friend), enemies = s.filter(e => !e.friend);
    expect(s.slice(s.length - friends.length)).toEqual(friends); // (friends last: above the enemies)
    expect(friends.map(e => e.id)).toContain(youth.id);
    for (const grp of [friends, enemies]) for (let i = 1; i < grp.length; i++) expect(grp[i].level).toBeLessThanOrEqual(grp[i - 1].level);
    expect(s[0].legend).toBe(true); // (the sleeping legend, an enemy's sigil, at the very bottom)
    // one that runs off leaves it
    const baby = cs.find(c => c.level === 0 && !c.boss)!;
    baby.fleeUntil = Infinity;
    expect(stoneStack(g, a.key).map(e => e.id)).not.toContain(baby.id);
    // none at home, nor at a converted stone, nor with the stacks off
    expect(stoneStack(g, cellKey(g.map.centreCell))).toEqual([]);
    expect(stoneStack({ ...g, tuning: withTuning({ cast: { ...TUNING.cast, on: false } }) } as Game, a.key)).toEqual([]);
  });

  it("keep a befriended one's sigil in the stack, friend-coloured: no rune at its feet till its stone converts", () => {
    const g = game(), a = area(g);
    at(g, a, true);
    const y = own(g, a.key).find(c => c.level > 0 && !c.boss)!;
    affectionOf(g).hit(y, 1e3, g.herTime); // (a 💌 that fills its meter)
    expect(stateOf(y)).toBe("happy");
    expect(y.atStone).toBe(true);
    expect(hasRune(y, Infinity)).toBe(false);
  });

  it("no longer clear by themselves: an area with all its wild gone stays wild till it's cast or its wave comes", () => {
    const g = game(), a = area(g);
    for (const c of own(g, a.key)) if (c.level > 0 && !c.boss) c.gone = true;
    g.byArea = null;
    run(g, 1);
    expect(g.party.areas.has(a.key)).toBe(false);
    // ?cast=0: as before, cleared at once
    const h = game(123, withTuning({ cast: { ...TUNING.cast, on: false } })), b = area(h);
    for (const c of own(h, b.key)) if (c.level > 0 && !c.boss) c.gone = true;
    h.byArea = null;
    run(h, 1);
    expect(h.party.areas.has(b.key)).toBe(true);
  });
});

describe("the soundsystem spell (Ed, 2026-10-28)", () => {
  it("held at the stone for cast.time converts it: a soundsystem, its babies friends, every friend sigil scattered loose round it", () => {
    const g = game(), a = area(g), W = g.witches[0];
    at(g, a);
    run(g, 0.2);
    expect(castShown(g, W)?.key).toBe(a.key);
    run(g, C.time - 1, hold);
    expect(W.casting).toBe(a.key);
    expect(castProgress(W, a.key, g.herTime, g.tuning)).toBeGreaterThan(0.75);
    expect(g.party.areas.has(a.key)).toBe(false);
    let converted = false;
    for (let i = 0; i < 72; i++) { stepGame(g, hold, 1 / 60); converted ||= g.leashEvents.some(e => e.kind === "converted" && e.key === a.key); }
    expect(g.party.areas.has(a.key)).toBe(true);
    expect(g.party.areas.get(a.key)?.early).toBe(true); // (ahead of its wave: it only celebrates when that comes)
    expect(castShown(g, W)).toBeNull();
    for (let i = 0; i < 6; i++) { stepGame(g, still, 1 / 60); converted ||= g.leashEvents.some(e => e.kind === "converted" && e.key === a.key); }
    expect(g.combat.sounds.has(a.key)).toBe(true);
    expect(converted).toBe(true); // (the "converted" event, for the view)
    const friends = own(g, a.key).filter(c => !c.boss && stateOf(c) === "happy");
    expect(friends.some(c => c.level === 0)).toBe(true); // (its babies turned friendly)
    for (const c of friends) expect(c.loose, `${c.id}`).toBe(true);
    const loose = g.loose.filter(p => friends.some(c => c.id === p.id));
    expect(loose.length).toBe(friends.length);
    for (const p of loose) expect(p.from && Math.abs(p.from.x - a.stone.x) < 1e-6 && p.from.y >= 0).toBe(true); // (the arc's start: its stone, its slot)
    const H = TUNING.leash.hex!, cells = new Set(loose.map(p => { const h = hexCell(p.x, p.z, H.size); return `${h.q},${h.r}`; }));
    expect(cells.size).toBe(loose.length); // (one a cell)
    for (const p of loose) { const d = Math.hypot(p.x - a.stone.x, p.z - a.stone.z); expect(d).toBeGreaterThanOrEqual(C.scatter.min - 1e-6); expect(d).toBeLessThanOrEqual(C.scatter.reach + 1e-6); expect(p.z < a.stone.z && a.stone.z - p.z < C.scatter.hide.depth && Math.abs(p.x - a.stone.x) < C.scatter.hide.width, "not hidden behind the soundsystem").toBe(false); }
    expect(castShown(g, W)).toBeNull(); // (the stone's converted: nothing to cast)
  });

  it("drains while she's away, and resumes from where it has drained to", () => {
    const g = game(), a = area(g), W = g.witches[0];
    at(g, a);
    run(g, 3, hold);
    const p0 = castProgress(W, a.key, g.herTime, g.tuning);
    expect(p0).toBeCloseTo(3 / C.time, 1);
    run(g, 2); // (let go)
    expect(W.casting).toBeNull();
    const p1 = castProgress(W, a.key, g.herTime, g.tuning);
    expect(p1).toBeCloseTo(p0 - 2 * C.drain, 1);
    run(g, 0.5, hold);
    expect(castProgress(W, a.key, g.herTime, g.tuning)).toBeCloseTo(p1 + 0.5 / C.time, 1);
  });

  it("stops at a hit, and won't go on till she lets go and holds again", () => {
    const g = game(), a = area(g), W = g.witches[0];
    at(g, a);
    run(g, 2, hold);
    W.health.hurtAt = g.herTime; // (a blow landed)
    run(g, 1 / 60, hold);
    expect(W.casting).toBeNull();
    expect(W.leash.events.some(e => e.kind === "castBroken") || g.leashEvents.some(e => e.kind === "castBroken")).toBe(true);
    expect(castShown(g, W)?.lostFrom).toBeCloseTo(2 / C.time, 1); // (the view draws the drain in red from there)
    const p = castProgress(W, a.key, g.herTime, g.tuning);
    run(g, 1, hold); // (still holding: nothing)
    expect(castProgress(W, a.key, g.herTime, g.tuning)).toBeLessThan(p);
    run(g, 1 / 60); run(g, 1, hold); // (let go, then hold again)
    expect(W.casting).toBe(a.key);
  });

  it("at the stone, the sigil button casts rather than putting a sigil down or the hat", () => {
    const g = game(), a = area(g), W = g.witches[0];
    at(g, a);
    const pet = own(g, a.key).find(c => c.level > 0 && !c.boss)!;
    pet.leashed = true; W.leash.stack.push(pet.id);
    stepGame(g, { ...still, place: true, sigilHeld: true }, 1 / 60);
    run(g, 1, hold);
    expect(W.leash.stack).toContain(pet.id);
    expect(W.leash.placed.length).toBe(0);
    expect(W.hat.down).toBeNull();
  });
});

describe("a stone's conversion by its wave (Ed, 2026-10-28: the same rule as the spell)", () => {
  it("scatters its friend sigils, sets its wild young and adults on it, and keeps loose sigils loose when it falls", () => {
    const g = game(), a = nextArea(g);
    const cs = own(g, a.key), friend = cs.find(c => c.level > 0 && !c.boss)!;
    befriend(friend, g.clock.time); friend.atStone = true;
    // the wave reaches it
    spreadWave(g.party, g.map, g.clock.time);
    expect(g.party.areas.has(a.key)).toBe(true);
    run(g, 0.1);
    expect(friend.loose).toBe(true);
    expect(friend.atStone).toBeUndefined();
    expect(g.loose.some(p => p.id === friend.id)).toBe(true);
    const wild = own(g, a.key).filter(c => c.level > 0 && !c.boss && c !== friend && !c.leashed);
    if (wild.length) expect(wild.some(c => c.enraged)).toBe(true);
    // it falls: the loose babies don't run off
    const baby = own(g, a.key).find(c => c.level === 0 && !c.boss && c.loose)!;
    const s = g.combat.sounds.get(a.key)!;
    loseSoundsystem(g, a.key, s.x, s.z);
    expect(baby.fleeUntil).toBeUndefined();
    expect(g.loose.some(p => p.id === baby.id)).toBe(true);
  });

  it("in a friendly area turns every creature friendly and starts no siege", () => {
    const g = game(), a = nextArea(g);
    g.friendly.add(a.key);
    spreadWave(g.party, g.map, g.clock.time);
    run(g, 0.1);
    const cs = own(g, a.key).filter(c => !c.boss && c.fleeUntil !== Infinity && !c.wanderTo);
    expect(cs.some(c => c.enraged)).toBe(false);
    for (const c of cs) expect(c.loose, `${c.species} ${c.level}`).toBe(true);
  });
});

describe("loose sigils (Ed, 2026-10-28)", () => {
  it("are picked up like any sigil, leashing the creature; a legend's tethers her at the distance it lay, till she puts it down", () => {
    const g = game(), a = area(g, true), W = g.witches[0];
    at(g, a);
    run(g, C.time + 0.5, hold);
    run(g, 0.2);
    expect(g.party.areas.has(a.key)).toBe(true);
    // a friend's
    const p = g.loose.find(q => !q.legend)!;
    g.witch = { ...g.witch, x: p.x, z: p.z };
    stepGame(g, { ...still, place: true }, 1 / 60);
    expect(W.leash.stack).toContain(p.id);
    expect(g.creatures[p.id].leashed).toBe(true);
    expect(g.loose.some(q => q.id === p.id)).toBe(false);
    run(g, 0.3);
    // the legend's
    const L = g.loose.find(q => q.legend);
    if (!L) return; // (an angry legend keeps its sigil)
    const legend = g.creatures[L.id], len = Math.hypot(L.x - legend.x, L.z - legend.z);
    g.witch = { ...g.witch, x: L.x, z: L.z };
    stepGame(g, { ...still, place: true }, 1 / 60);
    expect(W.leash.tether).toEqual({ id: L.id, length: len });
    expect(legend.leashed).toBeFalsy(); // (it sleeps on)
    expect(W.leash.stack).not.toContain(L.id);
    run(g, 3, { ...still, moveX: 1 }); // (she walks away: held at its length)
    expect(Math.hypot(g.witch.x - legend.x, g.witch.z - legend.z)).toBeLessThanOrEqual(len + 0.05);
    stepGame(g, { ...still, place: true }, 1 / 60);
    expect(W.leash.tether).toBeNull();
    expect(g.loose.some(q => q.id === L.id && q.legend)).toBe(true);
  });
});

describe("the bots and the spell", () => {
  it("the skilled bot converts a stone by casting it, then gathers its loose sigils (seed 11, the 10-area home)", async () => {
    const { newBot } = await import("./bot");
    const g = newGame(11, withTuning({ cast: { ...BUILT.cast, on: true }, map: { ...BUILT.map!, islandAreas: 10 } }));
    g.clock.paused = false; g.witch = { ...g.witch, seated: false, perch: false };
    const bot = newBot("skilled");
    let cast = false, gathered = false;
    for (let i = 0; i < 60 * 90 && !(cast && gathered); i++) {
      stepGame(g, bot.decide(g), 1 / 60);
      cast ||= g.leashEvents.some(e => e.kind === "castDone");
      gathered ||= cast && g.witches[0].leash.stack.length > 0;
    }
    expect(cast).toBe(true);
    expect(gathered).toBe(true);
  }, 120000);
});
