// Legend circles slow time (rules/slowTime.ts; Ed, 2026-10-06): on the ground in a sleeping or restless legend's circle the
// world runs at a tenth of its speed while she keeps hers; enraged creatures stay out of such a circle; a 💌 leaving it vanishes.
import { describe, expect, it } from "vitest";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { TUNING } from "./tuning";
import { legendRings, slowTarget, type Ring } from "./slowTime";
import { newInvites, stepInvites, type Affection } from "./invites";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const run = (g: Game, secs: number, c: Controls = idle) => { for (let i = 0; i < Math.round(secs / STEP); i++) stepGame(g, c, STEP); };
const S = TUNING.legendCircle!.slow;

/** A game under way (the party spell cast), the witch on the ground in the middle of a sleeping legend's circle. */
function inCircle(): { g: Game; ring: Ring } {
  const g = newGame(123, TUNING);
  g.clock.paused = false; g.party.spellAt = -100;
  const ring = legendRings(g).find(r => g.creatures[r.id].legendState === "asleep")!;
  for (const c of g.creatures) if (!c.boss && Math.hypot(c.x - ring.x, c.z - ring.z) < 150) c.gone = true; // (just her and the legend)
  g.byArea = null;
  g.witches[0].body = { ...g.witch, seated: false, mode: "ground", lift: 0, x: ring.x, z: ring.z };
  g.witches[0].health.hp = 1e6;
  return { g, ring };
}

describe("legend circles slow time", () => {
  it("slows the world to slow.scale on the ground in a sleeping legend's circle, eased over slow.ease, while she keeps her speed", () => {
    const { g } = inCircle();
    expect(slowTarget(g)).toBe(S.scale);
    run(g, S.ease * 0.5);
    expect(g.timeScale).toBeGreaterThan(S.scale); // (easing down)
    expect(g.timeScale).toBeLessThan(1);
    run(g, S.ease);
    expect(g.timeScale).toBeCloseTo(S.scale, 6);
    // a second of hers is a tenth of the world's: the clock, the waves' countdown, the beat
    const w0 = g.clock.time, h0 = g.herTime, left0 = g.party.nextAt - g.clock.time;
    run(g, 1);
    expect(g.herTime - h0).toBeCloseTo(1, 6);
    expect(g.clock.time - w0).toBeCloseTo(S.scale, 6);
    expect(left0 - (g.party.nextAt - g.clock.time)).toBeCloseTo(S.scale, 6);
    // she walks at full speed (within the circle)
    const x0 = g.witch.x;
    run(g, 0.3, { ...idle, moveX: 1 });
    expect(g.witch.x - x0).toBeGreaterThan(TUNING.groundSpeed * 0.3 * 0.6);
  }, 60_000);

  it("eases back to full speed when she leaves, rises to the treetops, or the legend turns angry; and not at all with slow off", () => {
    const a = inCircle();
    run(a.g, 1);
    a.g.witches[0].body = { ...a.g.witch, x: a.ring.x + a.ring.r + 5 };
    run(a.g, S.ease * 1.1);
    expect(a.g.timeScale).toBe(1);
    const b = inCircle();
    b.g.witches[0].body = { ...b.g.witch, mode: "treetop", lift: 1 };
    expect(slowTarget(b.g)).toBe(1);
    const c = inCircle();
    run(c.g, 1);
    c.g.creatures[c.ring.id].legendState = "angry";
    run(c.g, S.ease * 1.1);
    expect(c.g.timeScale).toBe(1);
    const d = inCircle();
    (d.g as { tuning: typeof TUNING }).tuning = { ...d.g.tuning, legendCircle: { slow: { ...S, on: false } } };
    run(d.g, 1);
    expect(d.g.timeScale).toBe(1);
    expect(d.g.herTime).toBeCloseTo(d.g.clock.time, 6);
  }, 60_000);

  it("slows creatures outside the circle to a tenth of their pace", () => {
    const walked = (on: boolean) => {
      const { g } = inCircle();
      if (!on) (g as { tuning: typeof TUNING }).tuning = { ...g.tuning, legendCircle: { slow: { ...S, on: false } } };
      run(g, 1);
      const far = g.creatures.find(c => !c.boss && !c.gone && Math.hypot(c.x - g.witch.x, c.z - g.witch.z) > 160 && Math.hypot(c.x - g.witch.x, c.z - g.witch.z) < 250)!;
      const x0 = far.x, z0 = far.z;
      for (let i = 0; i < 60; i++) { Object.assign(far, { tx: far.x + 50, tz: far.z, rest: 0 }); run(g, STEP); } // (heading east the whole second)
      return { d: Math.hypot(far.x - x0, far.z - z0), speed: far.speed };
    };
    const slow = walked(true), full = walked(false);
    expect(full.d).toBeGreaterThan(full.speed * 0.5);
    expect(slow.d).toBeLessThan(full.d * S.scale * 2);
  }, 60_000);

  it("keeps enraged creatures out of a sleeping legend's circle, whether she's there or not; not an angry one's", () => {
    const { g, ring } = inCircle();
    g.witches[0].body = { ...g.witch, mode: "treetop", lift: 1, x: ring.x + 500 }; // (she's away)
    const c = g.creatures.find(k => !k.boss && !k.gone && k.level >= 1)!;
    Object.assign(c, { x: ring.x + 1, z: ring.z, tx: ring.x, tz: ring.z, enraged: true, state: "enraged" });
    run(g, STEP);
    expect(Math.hypot(c.x - ring.x, c.z - ring.z)).toBeGreaterThanOrEqual(ring.r);
    g.creatures[ring.id].legendState = "angry";
    Object.assign(c, { x: ring.x + 1, z: ring.z });
    run(g, STEP);
    expect(Math.hypot(c.x - ring.x, c.z - ring.z)).toBeLessThan(ring.r);
  }, 60_000);
});

describe("💌s and the circle's edge", () => {
  const none: Affection = { invitable: () => false, blocksLetters: () => false, hit: () => {}, affection: () => 0 };
  const leaves = (r: Ring) => (x0: number, z0: number, x1: number, z1: number) => Math.hypot(x0 - r.x, z0 - r.z) < r.r && Math.hypot(x1 - r.x, z1 - r.z) >= r.r;
  const fly = (fromX: number, vx: number, edge: ReturnType<typeof leaves>) => {
    const s = newInvites();
    s.letters.push({ n: 1, x: fromX, z: 0, vx, vz: 0, flown: 0, at: 0, hit: [] } as unknown as (typeof s.letters)[number]);
    const events: string[] = [];
    for (let i = 0; i < 60 && s.letters.length; i++) { stepInvites(s, {}, { x: 0, z: 0, facing: 1 }, false, [], none, i * STEP, STEP, TUNING, undefined, undefined, edge); events.push(...s.events.map(e => e.kind)); }
    return { s, events };
  };
  const ring: Ring = { id: 0, x: 0, z: 0, r: 10 };

  it("vanishes, in a sparkle, crossing out of the circle from inside", () => {
    const { s, events } = fly(5, 20, leaves(ring));
    expect(events).toContain("vanished");
    expect(s.letters.length).toBe(0);
  });
  it("flies on inside it, and in from outside", () => {
    expect(fly(-5, 2, leaves(ring)).events).not.toContain("vanished"); // (inside all the way)
    expect(fly(-15, 20, leaves(ring)).events).not.toContain("vanished"); // (from outside, in)
  });
});
