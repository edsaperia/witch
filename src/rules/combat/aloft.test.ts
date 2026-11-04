// She rises out of a pack's reach (Ed, 2026-11-03, on the challenge's 128-animal pack heaping up under her as she rose: "I suggest
// that they just act how they would when they're waiting to attack"): its hunters keep her as their target and wait round the point
// under her in their moving formation, spaced, never striking; landing, the hunt picks up again (rules/combat/targeting.ts
// aloftHunted, rules/combat.ts, rules/combat/teams.ts). Before, each lost her as a target and stood dead still where it was, so a
// pack that was closing in on her stayed heaped and overlapping till she came down.
import { describe, expect, it } from "vitest";
import { newGame, stepGame, STEP, type Controls, type Game } from "../game";
import { TUNING, type Tuning } from "../tuning";
import { knownKinds } from "../rosters";
import { KINDS_TABLE } from "../kinds";
import { bodyGap } from "../combatSpacing";
import type { Creature } from "../creatures";
import { outcome } from "../../test/outcome";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
const lateHome = (n: number, t: Tuning = TUNING): Tuning => { const all = knownKinds(Object.keys(KINDS_TABLE)).slice(0, n); return { ...t, map: { ...t.map!, island: "home", islandAreas: all.length, found: all }, challenge: { ...t.challenge!, statues: { ...t.challenge!.statues!, on: false } } }; }; // (its statues off, rules/challengeStatues.ts: the pack wild from the start, the fight measured as before)

/** The challenge's pack (an adult and a youth of each of home's ten kinds: twenty, the round's reference size) hunting her in the
 *  middle of its circle, the pack bench's set-up (tools/bench/pack.ts), her health held; `strikes` counts the pack's wind-ups. */
function packHunting(seed: number, t: Tuning = TUNING) {
  const g: Game = newGame(seed, lateHome(10, t)), ch = g.challenge!;
  g.clock.paused = false; g.party.spellAt = undefined; g.party.paused = true;
  for (const c of g.creatures) if (!ch.pack.includes(c.id) && Math.hypot(c.x - ch.x, c.z - ch.z) < 300) c.gone = true;
  g.byArea = null;
  g.witch = { ...g.witch, x: ch.x, z: ch.z + 2, mode: "ground", lift: 0, seated: false, perch: undefined, vx: 0, vz: 0 };
  const ids = new Set(ch.pack), seen = new Set<string>();
  const strikes = { n: 0 };
  const step = (c: Controls = idle) => {
    g.witches[0].health.hp = 1e9;
    stepGame(g, c, STEP);
    for (const e of g.combat.events) if (e.kind === "windup" && ids.has(e.id) && !seen.has(`${e.id}@${e.at}`)) { seen.add(`${e.id}@${e.at}`); strikes.n++; }
  };
  const run = (secs: number, c?: Controls) => { for (let i = 0; i < Math.round(secs / STEP); i++) step(c); };
  const pack = () => ch.pack.map(id => g.creatures[id]).filter(c => !c.gone);
  return { g, run, pack, strikes };
}
const closest = (list: readonly Creature[]) => {
  let worst = Infinity;
  for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) worst = Math.min(worst, Math.hypot(list[i].x - list[j].x, list[i].z - list[j].z) / bodyGap(list[i], list[j], TUNING));
  return worst;
};

/** The reported numbers as last measured (seed 1, 2026-11-04). */
const WAS = { moved: 1, worst: 0.63, nearest: 6.56 };

describe("she rises out of the pack's reach (Ed, 2026-11-03: 'act how they would when they're waiting to attack')", () => {
  // (how far they move, how close they gather and how near the point under her they come are outcome statistics: reported, never
  // failing (Ed, 2026-11-04: "Report only"; src/test/outcome.ts). Keeping her as their target, no strike while she's up, someone
  // moving and the attack again once she's down are the rule, and fail.)
  it("they wait round the point under her, moving and spaced, and never strike; landing, they attack again", ctx => {
    const { g, run, pack, strikes } = packHunting(1);
    run((TUNING.wildWatch?.time ?? 4) + 6); // (the watch, then the hunt under way)
    expect(pack().filter(c => c.hunting === 0).length).toBe(pack().length);
    g.witch = { ...g.witch, mode: "treetop", lift: 1, vx: 0, vz: 0 };
    const was = new Map(pack().map(c => [c.id, { x: c.x, z: c.z }]));
    const before = strikes.n;
    run(1);
    // (every hunter keeps her as its target: waiting, not lost; no strike begun at her up there)
    for (const c of pack()) expect(c.fight?.target, `${c.species}@${c.level}`).toEqual({ kind: "witch", id: 0 });
    let worst = Infinity, nearest = Infinity;
    for (let s = 0; s < 8; s++) {
      run(1);
      const list = pack();
      worst = Math.min(worst, closest(list));
      for (const c of list) nearest = Math.min(nearest, Math.hypot(c.x - g.witch.x, c.z - g.witch.z));
    }
    expect(strikes.n - before, "strikes begun while she's aloft").toBe(0);
    // (moving in their formation, not stood where they were when she rose: before, every one stood dead still)
    const moved = pack().filter(c => Math.hypot(c.x - was.get(c.id)!.x, c.z - was.get(c.id)!.z) > 2).length;
    expect(moved, "hunters that moved over 2 m while she was up").toBeGreaterThan(0);
    outcome(ctx, "share of the 20-pack moved over 2 m while she's up", moved / pack().length, { unit: "share", was: WAS.moved, near: 0.15, line: ">= 0.8" });
    // (no heap: the closest pair over those 8 s keeps most of its bodies' gap, and nobody stands on the point under her)
    outcome(ctx, "closest pair over 8 s aloft, as a share of its body gap", worst, { unit: "share", was: WAS.worst, near: 0.15, line: "> 0.6" });
    outcome(ctx, "nearest to the point under her over 8 s aloft", nearest, { unit: "m", was: WAS.nearest, near: 2, line: "> 3" });
    // Down again: the hunt goes on where it was.
    g.witch = { ...g.witch, mode: "ground", lift: 0 };
    const down = strikes.n;
    run(10);
    expect(strikes.n - down, "strikes begun after she lands").toBeGreaterThan(0);
  }, 240000);

  it("is the same on every run (lockstep): positions after a hover match to the bit", () => {
    const hover = () => {
      const { g, run, pack } = packHunting(2);
      run((TUNING.wildWatch?.time ?? 4) + 2);
      g.witch = { ...g.witch, mode: "treetop", lift: 1, vx: 0, vz: 0 };
      run(3);
      return pack().map(c => [c.id, c.x, c.z]);
    };
    expect(hover()).toEqual(hover());
  }, 240000);
});
