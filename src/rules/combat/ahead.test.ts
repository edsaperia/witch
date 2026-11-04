// Roles decided in advance (Ed, 2026-11-03, on #1782: "can we decide the roles in advance and have them move in sooner, in time for
// their attack?"): a team past teamRounds.reference keeps its next rounds' attackers picked (rules/combat/teams.ts), and those picked
// leave the waiting ring in time to be at their ready distance as their round's window opens (rules/combat.ts movingGoal).
import { describe, expect, it } from "vitest";
import { newGame, stepGame, STEP, type Controls, type Game } from "../game";
import { TUNING, type Tuning } from "../tuning";
import { knownKinds } from "../rosters";
import { KINDS_TABLE } from "../kinds";
import { actionReach } from "./actions";
import { PACKS } from "./packs";
import { FIGHT } from "../movement";
import { outcome } from "../../test/outcome";

const lateHome = (n: number, t: Tuning): Tuning => { const all = knownKinds(Object.keys(KINDS_TABLE)).slice(0, n); return { ...t, home: { ...t.home, challengeAt: 0 }, map: { ...t.map!, island: "home", islandAreas: all.length, found: all }, challenge: { ...t.challenge!, statues: { ...t.challenge!.statues!, on: false } } }; }; // (its statues off, rules/challengeStatues.ts: the pack wild from the start, the fight measured as before)
// (the seeds the tests were written on, 4 for 128 and 1 for 64. When the challenge area went to the island's edge (Ed, 2026-11-04)
// the pack's circle moved and they were swapped to 1 and 3 to stay over the old lines; on the new circles seeds 1 to 4 at 128
// strike 23.8, 25.8, 17.9 and 17.9 a minute, and seeds 1 to 3 at 64 come 3.5, 30.0 and 13.9 m nearer picked ahead. Those numbers
// are outcome statistics, reported and never failing (Ed, 2026-11-04: "Report only"; src/test/outcome.ts), so the seeds are back.)
const SEED_128 = 4, SEED_64 = 1;
/** The reported numbers as last measured (these seeds, 2026-11-04: on the restored seeds the 64-pack comes 3.55 m nearer picked
 *  ahead, under the old line of 8, and the 128-pack strikes 17.85 a minute, under the old 18). */
const WAS = { pastAhead: 11.64, pastBefore: 15.19, nearer: 3.55, strikesAhead: 9, strikesBefore: 7, perMinute: 17.85, nearPicks: 0 };
const withAhead = (ahead: number): Tuning => ({ ...TUNING, teamRounds: { ...TUNING.teamRounds!, ahead } });

/** The challenge's pack of `kinds` kinds (an adult and a youth each) hunting her as she walks slow circles in its middle (the pack
 *  bench's set-up), her health held. At each window's opening (its team entering its combo), how far each of that round's attackers is
 *  past the distance its action engages from (its reach and limits.engage), and the strikes begun. */
function fight(kinds: number, t: Tuning, secs: number, seed = 1) {
  const g: Game = newGame(seed, lateHome(kinds, t)), ch = g.challenge!;
  g.clock.paused = false; g.party.spellAt = undefined; g.party.paused = true;
  for (const c of g.creatures) if (!ch.pack.includes(c.id) && Math.hypot(c.x - ch.x, c.z - ch.z) < 300) c.gone = true;
  g.byArea = null;
  g.witch = { ...g.witch, x: ch.x, z: ch.z + 2, mode: "ground", lift: 0, seated: false, perch: undefined, vx: 0, vz: 0 };
  const over: number[] = [], seen = new Set<string>(), ids = new Set(ch.pack), watch = (t.wildWatch?.time ?? 4) + 0.5;
  let strikes = 0, last = "";
  for (let i = 0; i < Math.round(secs / STEP); i++) {
    const a = (i / 240) * Math.PI * 2, c: Controls = { moveX: Math.cos(a) * 0.5, moveZ: Math.sin(a) * 0.5, toggleMode: false, zoom: 0 };
    g.witches[0].health.hp = 1e9;
    stepGame(g, c, STEP);
    for (const e of g.combat.events) if (e.kind === "windup" && ids.has(e.id) && !seen.has(`${e.id}@${e.at}`) && e.at >= watch) { seen.add(`${e.id}@${e.at}`); strikes++; }
    const team = [...g.combat.waitingTeams?.values() ?? []].sort((x, y) => y.members.length - x.members.length)[0];
    if (team?.phase === "combo" && last !== "combo") for (const id of team.members) {
      const act = team.actions[id], o = g.creatures[id];
      if (act && team.roles[id] !== "hurt") over.push(Math.hypot(o.x - g.witch.x, o.z - g.witch.z) - actionReach(o, act, PACKS) - PACKS.limits.engage * FIGHT.scale);
    }
    last = team?.phase ?? "";
  }
  const median = [...over].sort((x, y) => x - y)[Math.floor(over.length / 2)];
  return { g, over, median, strikes, perMinute: strikes / ((secs - watch) / 60), positions: ch.pack.map(id => [id, g.creatures[id].x, g.creatures[id].z]) };
}

describe("roles decided in advance (Ed, 2026-11-03: 'have them move in sooner, in time for their attack')", () => {
  it("a 64-animal pack's attackers are in place as their window opens, not starting their run then", ctx => {
    const before = fight(32, withAhead(0), 30, SEED_64), after = fight(32, TUNING, 30, SEED_64);
    // (the rule: rounds open with picked attackers, both ways, and they strike)
    expect(after.over.length, "attackers measured at their windows' openings, picked ahead").toBeGreaterThan(0);
    expect(before.over.length, "the same, picked as the round began").toBeGreaterThan(0);
    expect(after.strikes, "strikes begun, picked ahead").toBeGreaterThan(0);
    // (reported: the middle attacker at its window's opening, how far past where its action engages from, and how much nearer than
    // when they were picked only as their round began; seed 1 on the old circle 9 and 24 m)
    outcome(ctx, "64-pack: median metres past its engage distance as its window opens, picked ahead", after.median, { unit: "m", was: WAS.pastAhead, near: 4, line: "< 12" });
    outcome(ctx, "64-pack: the same, picked as the round began", before.median, { unit: "m", was: WAS.pastBefore, near: 6 });
    outcome(ctx, "64-pack: metres nearer picked ahead", before.median - after.median, { unit: "m", was: WAS.nearer, near: 6, line: "> 8" });
    outcome(ctx, "64-pack: strikes begun in 30 s, picked ahead", after.strikes, { unit: "strikes", was: WAS.strikesAhead, near: 5, line: ">= picked as the round began" });
    outcome(ctx, "64-pack: strikes begun in 30 s, picked as the round began", before.strikes, { unit: "strikes", was: WAS.strikesBefore, near: 5 });
  }, 240000);

  it("a 128-animal pack waits in rings of 20 and strikes at about a 20-pack's rate", ctx => {
    // (Ed, 2026-11-04: "Resolve the attack rate limit for 128". The probe over 180 s and 4 seeds: about 20 a minute, the 20-pack's
    // 19.4; here one seed over a minute, reported: its rate is an outcome statistic. The rings are the rule.)
    const big = fight(64, TUNING, 65, SEED_128);
    const team = [...big.g.combat.waitingTeams!.values()].sort((x, y) => y.members.length - x.members.length)[0], cap = TUNING.teamRounds!.ring!;
    expect(team.order).toHaveLength(team.members.length);
    const inner = team.order!.slice(0, cap);
    expect(inner.length).toBeLessThanOrEqual(cap);
    for (const id of team.members) if (team.actions[id] && !team.used.includes(id)) expect(inner).toContain(id);
    expect(big.strikes, "strikes begun at her").toBeGreaterThan(0);
    outcome(ctx, "128-pack: strikes begun at her a minute", big.perMinute, { unit: "a minute", was: WAS.perMinute, near: 3, line: ">= 18" });
  }, 600000);

  it("is the same on every run (lockstep)", () => {
    expect(fight(32, TUNING, 12, 2).positions).toEqual(fight(32, TUNING, 12, 2).positions);
  }, 240000);

  it("leaves a 20-animal pack exactly as it was", () => {
    const a = fight(10, withAhead(0), 15, 3), b = fight(10, TUNING, 15, 3);
    expect(b.positions).toEqual(a.positions);
    expect(b.strikes).toBe(a.strikes);
  }, 240000);

  it("she rises: the picks wait in the ring like the rest, nothing struck, and the round's picks hold for her landing", ctx => {
    const { g } = fight(32, TUNING, 10);
    g.witch = { ...g.witch, mode: "treetop", lift: 1, vx: 0, vz: 0 };
    const team = () => [...g.combat.waitingTeams!.values()].sort((x, y) => y.members.length - x.members.length)[0];
    const ids = new Set(g.challenge!.pack);
    let strikes = 0;
    for (let i = 0; i < 300; i++) { stepGame(g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, STEP); g.witches[0].health.hp = 1e9; for (const e of g.combat.events) if (e.kind === "windup" && ids.has(e.id)) strikes++; }
    expect(strikes).toBe(0);
    expect(team().phase).toBe("lull");
    // (none of the picks stands at its ready spot under her: up there it waits in the ring; how many come within 12 m is reported)
    const picks = (team().next ?? []).flatMap(n => Object.entries(n.actions).filter(([, a]) => a).map(([id]) => g.creatures[+id]));
    expect(picks.length).toBeGreaterThan(0);
    const near = picks.filter(c => Math.hypot(c.x - g.witch.x, c.z - g.witch.z) < 12).length;
    outcome(ctx, "64-pack aloft: picks within 12 m of the point under her after 5 s", near, { unit: "picks", was: WAS.nearPicks, near: 1, line: "<= 1" });
  }, 240000);
});
