// The end of the route (Ed, 2026-10-10, 2026-10-11; rules/win.ts): last call, the stragglers, the victory lap, the night won
// (the legends home, enraged ones lulled and their islands lost, every other animal in the conga), the card; and a loss
// before the win still loses. On a 10-area island, every wave brought on at once.
import { describe, expect, it } from "vitest";
import { newGame, stepGame, STEP, type Game } from "./game";
import { TUNING, withTuning } from "./tuning";
import { LEGEND, type Creature } from "./creatures";
import { anger } from "./legends";
import { befriend } from "./creatureStates";
import { isHomeKey } from "./speakers";
import styleJson from "../../config/music-style.json";
import { barAt, musicCue, planBlock } from "./musicPlan";
import type { MusicStyle } from "./musicScore";
import { composeFloor, newFloor } from "./dancefloor";
import { floorInputs } from "./game";
import { congaPlace, finalStone, winFlare, nearestStraggler, routeDone, straggler, WIN_DEFAULT, winPulse, winTarget } from "./win";

const idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const W = { ...WIN_DEFAULT, ...(TUNING.win ?? {}) };
const run = (g: Game, secs: number, each?: () => void) => { for (let i = 0; i < secs / STEP; i++) { stepGame(g, idle, STEP); each?.(); } };

/** A 10-area island, waves held, every wave brought on (the last noted when it's the final stone); she hovers out of it all. */
function toTheEnd(seed = 7): { g: Game; finalSeen: boolean } {
  const g = newGame(seed, withTuning({ map: { ...TUNING.map!, islandAreas: 10 } }));
  g.clock.paused = false; g.party.spellAt = undefined; g.party.paused = true;
  g.witch = { ...g.witch, seated: false, mode: "treetop", lift: 1 };
  stepGame(g, idle, STEP);
  let finalSeen = false;
  for (let k = 0; k < 40 && !routeDone(g); k++) { if (finalStone(g)) finalSeen = true; stepGame(g, { ...idle, nextWave: true }, STEP); }
  for (const [k, h] of g.combat.sounds) if (isHomeKey(k)) h.hp = h.max = 1e9; // (home holds while we look)
  return { g, finalSeen };
}
const isLegend = (c: Creature) => !!c.boss || c.level === LEGEND;
/** Every straggler won over (as if she'd invited them all). */
const calmAll = (g: Game) => { for (const c of g.creatures) if (straggler(c)) befriend(c, g.clock.time); };

describe("the end of the route (rules/win.ts)", () => {
  it("last call: the final stone is flagged before its wave; after it the route is done", () => {
    const { g, finalSeen } = toTheEnd();
    expect(finalSeen).toBe(true);
    expect(routeDone(g)).toBe(true);
    expect(finalStone(g)).toBe(false);
  });

  it("stragglers: the pointer goes to the enraged animal nearest the centre, never an enraged legend, and nothing moves on while any lives", () => {
    const { g } = toTheEnd();
    const L = g.creatures.find(c => c.boss && !c.gone)!;
    anger(L, g.clock.time); // (an enraged legend: it doesn't hold the win up)
    Object.assign(L, { x: g.map.dancefloor.x + 5, z: g.map.dancefloor.z }); // (nearer the centre than anyone)
    run(g, 0.5);
    expect(g.win?.phase).toBe("stragglers");
    const s = winTarget(g)!;
    expect(s).not.toBeNull();
    expect(isLegend(s)).toBe(false);
    expect(s.id).toBe(nearestStraggler(g)!.id);
    run(g, 5);
    expect(g.win?.phase).toBe("stragglers");
  }, 60000);

  it("the lap: none left, the pulse runs home from the last stone, each stone firing once in reverse order; then the win", () => {
    const { g } = toTheEnd(), fired: string[] = [];
    const watch = () => { for (const e of g.waveEvents) if (e.kind === "waveCelebrate" && e.at === g.clock.time && g.win?.phase === "lap") fired.push(e.key); };
    run(g, 0.2); calmAll(g); run(g, 0.2, watch);
    expect(g.win?.phase).toBe("lap");
    const lap = g.win!.lap;
    expect(lap[lap.length - 1].key).toBe("home");
    const waves = [...g.party.waveReached!.entries()].sort((a, b) => b[1].wave - a[1].wave).map(([k]) => k);
    expect(lap.slice(0, -1).map(s => s.key)).toEqual(waves);
    let pulses = 0;
    run(g, (lap[lap.length - 1].at - g.clock.time) + 0.5, () => { watch(); if (winPulse(g)) pulses++; });
    expect(pulses).toBeGreaterThan(0);
    // the music: from the block the lap set off in, the victory section (the music builder's to come; the drop till then)
    const style = styleJson as unknown as MusicStyle, cue = musicCue(g), B = style.blockBars, bar = Math.ceil(barAt(g.beat, g.clock.time) / B) * B;
    expect(cue.victory).toBeDefined();
    expect(planBlock(style, cue, bar).section).toBe(style.victory && style.sections[style.victory] ? style.victory : "drop");
    expect(fired).toEqual(waves);
    expect(g.win?.phase).toBe("won");
  }, 60000);

  it("the win: the dealt legends woken and home (an enraged one lulled, its island lost), everyone else in the conga, her leash let go, nothing fighting; then the card", () => {
    const { g } = toTheEnd();
    const legends = g.creatures.filter(c => c.boss && !c.gone), angry = legends[0];
    // (kept angry till the win: left to itself, a legend whose kin are about calms of its own accord, rules/legends.ts)
    const keepAngry = () => { if (g.win?.phase !== "won" && angry.legendState !== "angry") anger(angry, g.clock.time); };
    anger(angry, g.clock.time);
    run(g, 0.2, keepAngry); calmAll(g);
    for (let i = 0; i < 120 / STEP && g.win?.phase !== "won"; i++) { keepAngry(); stepGame(g, idle, STEP); }
    const w = g.win!;
    expect(w.phase).toBe("won");
    // the island's sigil flares on the dancefloor: drawn on, held, then the party's patterns again
    run(g, 1);
    const f = winFlare(g)!;
    expect(f.sigil).toBe(w.sigil); expect(w.sigil).toBe("worldTree");
    expect(f.drawn).toBeGreaterThan(0); expect(f.drawn).toBeLessThan(1);
    const lit = composeFloor({ ...newFloor(), on: 0 }, floorInputs(g), g.tuning);
    expect([...lit.rgbi].some((v, i) => i % 4 === 3 && v > 0)).toBe(true);
    expect(w.lost).toEqual([angry.species]);
    expect(w.found.sort()).toEqual(legends.filter(c => c !== angry).map(c => c.species).sort());
    expect(angry.legendState).toBe("asleep");
    expect(angry.partyLegend).toBeFalsy();
    for (const c of legends) if (c !== angry) { expect(c.partyLegend).toBe(true); expect(c.finale!).toBeLessThan(0); }
    expect(g.leash.stack).toEqual([]); expect(g.leash.placed).toEqual([]);
    const line = g.creatures.filter(c => !c.gone && !isLegend(c));
    expect(line.length).toBe(w.congaSize);
    for (const c of line) { expect(c.state).toBe("happy"); expect(c.enraged).toBeFalsy(); expect(c.finale).toBeGreaterThanOrEqual(0); }
    expect(new Set(line.map(c => c.finale)).size).toBe(line.length);
    // After a while everyone's in place, each one congaGap behind the one before, the legends on their ring at home.
    run(g, 40);
    const byPlace = [...line].sort((a, b) => a.finale! - b.finale!);
    for (const c of byPlace) { const p = congaPlace(g, c.finale!, w.congaSize, g.clock.time); expect(Math.hypot(p.x - c.x, p.z - c.z)).toBeLessThan(0.6); }
    for (let i = 1; i < byPlace.length; i++) expect(Math.hypot(byPlace[i].x - byPlace[i - 1].x, byPlace[i].z - byPlace[i - 1].z)).toBeCloseTo(W.congaGap, 0);
    const d0 = g.map.dancefloor;
    for (const c of legends) if (c !== angry) expect(Math.abs(Math.hypot(c.x - d0.x, c.z - d0.z) - W.legendRing)).toBeLessThan(4);
    expect(g.creatures.some(c => c.fight?.target)).toBe(false);
    expect(w.card).toBe(true);
    expect(winFlare(g)).toBeNull(); // (held win.flare seconds, then gone)
    expect(g.partyOver).toBeNull();
  }, 120000);

  it("losing comes first: home's speakers down before the win, the party's over and the night is never won", () => {
    const { g } = toTheEnd();
    run(g, 0.2);
    expect(g.win?.phase).toBe("stragglers");
    for (const [k, h] of g.combat.sounds) if (isHomeKey(k)) h.hp = 0;
    run(g, 0.2);
    expect(g.partyOver).not.toBeNull();
    calmAll(g); run(g, 30);
    expect(g.win?.phase).not.toBe("won");
  }, 60000);

  it("is deterministic: the same island won twice is the same, step for step", () => {
    const play = () => { const { g } = toTheEnd(11); run(g, 0.2); calmAll(g); run(g, 30); return JSON.stringify({ w: g.win, xs: g.creatures.map(c => [Math.round(c.x * 100), Math.round(c.z * 100), c.finale ?? null]) }); };
    expect(play()).toBe(play());
  }, 120000);
});

describe("the win and the rosters (rules/rosters.ts)", () => {
  it("the night's legends are the dealt kinds' (map.legendKinds); the island's sigil is its island's kind's, home's the World Tree", async () => {
    const { dealtLegends, islandSigil } = await import("./win");
    const { islandOf } = await import("./dancefloor");
    const g = newGame(7, withTuning({ map: { ...TUNING.map!, islandAreas: 10 } }));
    const K = g.map.legendKinds ?? [];
    for (const c of dealtLegends(g)) if (K.length) expect(K).toContain(c.species);
    const kind = islandOf(g.map);
    expect(typeof kind).toBe("string");
    expect(islandSigil(g)).toBe(kind === "home" ? "worldTree" : kind);
    expect(islandOf({ island: { kind: "wolf" } })).toBe("wolf");
    expect(islandOf({ island: null })).toBe("home");
  });
});
