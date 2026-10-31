// No creature jumps (Ed's playtest, 2026-10-29: "some animals seem to teleport. I saw it with the Ibex on the ibex island. I think after
// they do a lunge"): in a pack fight, step to step, nothing moves further than its fastest way of moving would take it in a step. A lunge
// tops out at 60 m/s (times FIGHT.speed: rules/combat.ts), a leap flies its arc at its own pace; so a step's move stays within the
// faster of those, never the tens of metres a hidden pack member came back down with when it was put round her at once (the ibex's
// "trees" retreat, the squirrels' scatter), or a leap caught up all at once after a stun.
import { describe, expect, it } from "vitest";
import { setupArena } from "../arena";
import { newGame, stepGame, STEP, type Controls } from "../game";
import { TUNING } from "../tuning";
import { FIGHT } from "../movement";
import { PACKS } from "./packs";

// Keep seed 5's arena landscape: terrain-dependent hides/retreats during the moving 30-second pack fight are the regression under test.
// The kinds that hide in a lull (trees, burrow, water, branches), scatter, or leap; the ibex Ed saw; and a plain lunger.
const KINDS = ["ibex", "squirrel", "roe", "cat", "mole", "otter", "owl", "toad", "wolf"];

describe("no creature jumps in a fight (Ed's playtest, 2026-10-29)", () => {
  it("a step's move is never more than its fastest move (a lunge, a leap's arc) takes in a step", () => {
    const bad: string[] = [];
    for (const k of KINDS) {
      const g = newGame(5, TUNING);
      g.clock.paused = false; g.party.paused = true;
      setupArena(g, `pack-${k}`);
      const ids = g.arena!.ids, prev = new Map<number, { x: number; z: number; leap: number }>();
      let worst = 0;
      for (let i = 0; i < 30 / STEP; i++) {
        // (she walks a wide circle, so the fight runs through its lunges, lulls, hides and specials, and some miss her)
        const a = i * STEP * 0.6, c: Controls = { moveX: Math.cos(a), moveZ: Math.sin(a), toggleMode: false, zoom: 0, autoTalk: false };
        g.witches[0].health.hp = 1e6;
        stepGame(g, c, STEP);
        for (const id of ids) {
          const o = g.creatures[id], p = prev.get(id);
          const L = o.leap, leap = L ? Math.hypot(L.tx - L.fx, L.tz - L.fz) / Math.max(0.01, L.lands - L.at) : 0;
          if (p && !o.gone) {
            const d = Math.hypot(o.x - p.x, o.z - p.z), most = Math.max(60 * FIGHT.speed, leap, p.leap) * STEP * 1.05 + 0.01;
            worst = Math.max(worst, d / most);
            if (d > most && bad.length < 12) bad.push(`${k}#${id} moved ${d.toFixed(2)} m in a step at ${g.clock.time.toFixed(2)} s (at most ${most.toFixed(2)})`);
          }
          prev.set(id, { x: o.x, z: o.z, leap });
        }
      }
      expect(worst, `${k}: no steps at all`).toBeGreaterThan(0);
    }
    expect(bad).toEqual([]);
  }, 600000);

  it("the ibex bounds back in its lull, in sight (the coordinator, 2026-10-29: \"backs off uphill\", not into the trees)", () => {
    const R = PACKS.kinds.ibex.retreat;
    expect(R).toBe("leapfrog");
    expect(PACKS.retreats[R].hide).toBeFalsy();
  });
});
