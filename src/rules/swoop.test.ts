// The wild flyers' swoop (hotel's phase-3 flyer table, built 2026-10-09; rules/movement.ts stepSwoop): circling out of reach,
// telegraphing, diving along a line at where she'll be (lead at release) and climbing back; hittable and invitable only in the
// dive and at its bottom.
import { describe, expect, it } from "vitest";
import { setupArena } from "./arena";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { TUNING } from "./tuning";
import { targetable } from "./combat";
import { invitableNow } from "./creatureStates";
import { MOVEMENT, stepSwoop, swoopHeight, swoopStriking } from "./movement";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };

/** Her against one wild flyer (or a few) in the arena, nothing of hers there. */
function arena(spec: string): { g: Game; ids: number[] } {
  const g = newGame(5, TUNING);
  g.clock.paused = false; g.party.paused = true;
  setupArena(g, `hare*1@1,${spec}`);
  const [hare, ...ids] = g.arena!.ids;
  g.creatures[hare].gone = true; g.leash.placed = [];
  g.witches[0].health.hp = 1e6;
  return { g, ids };
}
/** Steps until `until` (at most `secs`), calling `each` every step. */
function run(g: Game, secs: number, c: Controls = idle, until?: () => boolean, each?: () => void): void {
  for (let i = 0; i < secs / STEP && !until?.(); i++) { stepGame(g, c, STEP); each?.(); }
}

describe("wild flyers swoop (owl, bat, raven)", () => {
  it("the owl rises out of reach, telegraphs, dives at her and climbs back: hittable and invitable only in the dive and at its bottom", () => {
    const { g, ids } = arena("owl*1@2"), o = g.creatures[ids[0]], mv = MOVEMENT.profiles.owl.move!;
    run(g, 10, idle, () => !!o.swoop?.up && o.swoop.phase === "circle" && swoopHeight(o.swoop, g.clock.time) > mv.height! * 0.9);
    expect(o.swoop?.up).toBe(true);
    expect(targetable(o)).toBe(false); expect(invitableNow(o)).toBe(false);
    const seen = new Set<string>(), reach: { phase: string; up: boolean; target: boolean; invite: boolean }[] = [];
    let hp = g.witches[0].health.hp, hits = 0;
    run(g, 15, idle, () => seen.has("climb") && o.swoop?.phase === "circle", () => {
      const s = o.swoop; if (!s) return;
      seen.add(s.phase); reach.push({ phase: s.phase, up: s.up, target: targetable(o), invite: invitableNow(o) });
      if (g.witches[0].health.hp < hp) { hits++; hp = g.witches[0].health.hp; }
    });
    expect([...seen]).toEqual(expect.arrayContaining(["circle", "tele", "dive", "low", "climb"]));
    for (const r of reach) {
      const open = r.phase === "dive" || r.phase === "low";
      expect(r.up, r.phase).toBe(!open); expect(r.target, r.phase).toBe(open); expect(r.invite, r.phase).toBe(open);
    }
    expect(hits).toBe(1); // (standing still, the dive finds her, once)
  }, 60000);

  it("leads her at release: walking on in a straight line gets caught; turning back or blinking as it lets go, it misses", () => {
    // Walking east the whole time.
    const walk = (turn: boolean | "blink"): number => {
      const { g, ids } = arena("owl*1@2"), o = g.creatures[ids[0]], hp0 = g.witches[0].health.hp;
      run(g, 10, idle, () => o.swoop?.phase === "circle" && !!o.moveReadyAt && g.clock.time >= o.moveReadyAt - 0.05);
      let dir = 1, released = false;
      for (let i = 0; i < 12 / STEP; i++) {
        let blink = false;
        if (o.swoop?.phase === "dive" && !released) { released = true; if (turn === true) dir = -1; blink = turn === "blink"; }
        stepGame(g, blink ? { ...idle, moveZ: 1, dash: true } : { ...idle, moveX: dir }, STEP);
        if (released && o.swoop?.phase === "climb") break;
      }
      expect(released).toBe(true);
      return hp0 - g.witches[0].health.hp;
    };
    expect(walk(false)).toBe(1);
    expect(walk(true)).toBe(0);
    expect(walk("blink")).toBe(0); // (a blink across its line as it lets go, then on east)
  }, 60000);

  it("a bat dives several times a bout, each with its own telegraph", () => {
    const { g, ids } = arena("bat*1@2"), b = g.creatures[ids[0]], dives = MOVEMENT.profiles.bat.move!.dives!;
    let n = 0, last = "";
    run(g, 20, idle, () => n >= dives, () => { const p = b.swoop?.phase ?? ""; if (p === "dive" && last !== "dive") n++; last = p; });
    expect(n).toBe(dives);
    expect(dives).toBeGreaterThan(1);
  }, 60000);

  it("waits to strike while it may not (a cap on strikes at her at once: #587's token), then goes", () => {
    const { g, ids } = arena("bat*1@2"), b = g.creatures[ids[0]], mv = MOVEMENT.profiles.bat.move!, w = g.witch;
    run(g, 10, idle, () => !!b.swoop?.up && b.swoop.phase === "circle");
    let t = g.clock.time;
    for (let i = 0; i < 6 / STEP; i++, t += STEP) expect(stepSwoop(b, mv, w.x, w.z, true, t, STEP, 0, 0, false)).toBe("air");
    expect(swoopStriking(b)).toBe(false);
    let teled = false;
    for (let i = 0; i < 3 / STEP && !teled; i++, t += STEP) teled = stepSwoop(b, mv, w.x, w.z, true, t, STEP, 0, 0, true) === "tele";
    expect(teled).toBe(true); expect(swoopStriking(b)).toBe(true);
  }, 60000);

  it("takes its turn in the dodge's cap on strikes at her (dodge.a: one at a time), each dive its own token", () => {
    const { g, ids } = arena("bat*4@2"), bats = ids.map(i => g.creatures[i]), cap = TUNING.dodge.a.tokens;
    expect(TUNING.dodge.a.on).toBe(true);
    let most = 0, dives = 0, was = new Set<number>();
    run(g, 25, idle, undefined, () => {
      const now = bats.filter(b => swoopStriking(b) && b.fight?.target?.kind === "witch");
      most = Math.max(most, now.length);
      for (const b of bats) if (b.swoop?.phase === "dive" && !was.has(b.id)) dives++;
      was = new Set(bats.filter(b => b.swoop?.phase === "dive").map(b => b.id));
    });
    expect(dives).toBeGreaterThan(3); // (they do strike, in turn)
    expect(most).toBeLessThanOrEqual(cap);
  }, 60000);

  it("hers don't swoop: a leashed owl fights on the ground as before", () => {
    const g = newGame(5, TUNING);
    g.clock.paused = false; g.party.paused = true;
    setupArena(g, "owl*1@2,wolf*2@2");
    const owl = g.creatures[g.arena!.ids[0]];
    expect(owl.leashed).toBe(true);
    run(g, 8, idle, undefined, () => expect(owl.swoop).toBeUndefined());
  }, 60000);

  it("once invited at the bottom of its dive, it glides down and stays on the ground", () => {
    const { g, ids } = arena("owl*1@2"), o = g.creatures[ids[0]];
    run(g, 15, idle, () => o.swoop?.phase === "low");
    expect(o.swoop?.phase).toBe("low");
    o.state = "happy"; o.happyAt = g.clock.time; // (as an invite leaves it: rules/creatureStates.ts befriend)
    run(g, 3);
    expect(o.swoop).toBeUndefined();
  }, 60000);
});
