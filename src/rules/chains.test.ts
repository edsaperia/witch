// Chains (Ed, 2026-11-03; rules/chains.ts, leash.chain): one length for every leashed creature; at full length, moving away, she
// drags it, slowed by its level (youth 0.3, adult 0.7, legend 1), the heaviest taut chain deciding ("They don't stack"); her motion
// round it kept; the dragged creature pulled along, never faster than its top speed; on the ground and in the air alike; nothing
// pulls her out of the sky; only adults and legends stop her taking off; a refused take-off rattles exactly their chains, once.
import { describe, expect, it } from "vitest";
import { TUNING, withTuning, type Tuning } from "./tuning";
import { beginChains, chainDrag, chainLength, chainShown, chained, dragWitch, takePulled, weighingChains } from "./chains";
import { leashSpeed } from "./leash";
import { newGame as fullGame, newWitchPlayer, stepGame, STEP, type Controls, type Game } from "./game";
import { newWitch } from "./witch";
import { smallWorld } from "../test/worlds";
import type { Creature } from "./creatures";
const newGame = smallWorld(fullGame, "Chains check one or two witches with a few creatures placed beside them on home's open ground.");

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const C = TUNING.leash.chain!, L = C.length;
const crit = (id: number, level: number, x: number, z: number, extra: Partial<Creature> = {}) => ({ id, x, z, level, species: "wolf", gone: false, speed: 0, ...extra }) as unknown as Creature;
const dist = (a: { x: number; z: number }, b: { x: number; z: number }) => Math.hypot(a.x - b.x, a.z - b.z);
const DT = 1 / 60;
/** Her body `step` m out past a chain held at its end (her `from` at L), moving away at v. */
const out = (step: number, v = 20, z = 0) => ({ body: { ...newWitch(L + step, z), vx: v, vz: 0 }, from: { x: L, z: 0 } });
/** Creatures that can't be pulled (top speed 0): the slowdown alone. */
const still = (t: Tuning = TUNING) => withTuning({ ...t, leash: { ...t.leash, runSpeed: 0 } });

describe("one chain length, and the drag by level", () => {
  it("every leashed creature but babies and a party legend is on a chain 80 m long", () => {
    expect(L).toBe(80);
    expect(chainLength(TUNING)).toBe(80);
    expect([0, 1, 2, 3].map(level => chained(crit(0, level, 0, 0)))).toEqual([false, true, true, true]);
    expect(chained(crit(0, 3, 0, 0, { partyLegend: true }))).toBe(false);
    expect([1, 2, 3].map(level => chainDrag(crit(0, level, 0, 0), TUNING))).toEqual([0.3, 0.7, 1]);
  });

  it("inside its length, nothing", () => {
    const { body } = out(-5), r = dragWitch(body, { x: L - 6, z: 0 }, [0], [crit(0, 2, 0, 0)], TUNING, DT);
    expect(r.body).toBe(body);
  });

  it("at full length, moving away, a youth takes 30% of her motion away, an adult 70%, a legend all of it", () => {
    for (const [level, keep] of [[1, 0.7], [2, 0.3], [3, 0]] as const) {
      const { body, from } = out(1), r = dragWitch(body, from, [0], [crit(0, level, 0, 0)], still(), DT);
      // (still creatures can't be pulled: so she's held at the end; with room to pull, she goes keep of the way)
      expect(r.body.x, `level ${level} still`).toBeCloseTo(L, 6);
      beginChains();
      const c = crit(0, level, 0, 0, { speed: 1000 }), q = dragWitch(body, from, [0], [c], TUNING, DT);
      expect(q.body.x - L, `level ${level}`).toBeCloseTo(keep, 6);
      expect(q.body.vx, `level ${level} speed away`).toBeCloseTo(20 * keep, 6);
    }
  });

  it("several taut chains don't stack: the heaviest decides (two youths 30%, a youth and an adult 70%, any legend 100%)", () => {
    const run = (levels: number[]) => { beginChains(); const cs = levels.map((l, i) => crit(i, l, 0, 0, { speed: 1000 })), { body, from } = out(1); return dragWitch(body, from, cs.map(c => c.id), cs, TUNING, DT).body.x - L; };
    expect(run([1, 1])).toBeCloseTo(0.7, 6);
    expect(run([1, 2])).toBeCloseTo(0.3, 6);
    expect(run([1, 2, 3])).toBeCloseTo(0, 6);
  });

  it("at the radius her motion round it stays: she slides round the chain's end", () => {
    const c = crit(0, 3, 0, 0), body = { ...newWitch(L, 2), vx: 0, vz: 30 }, r = dragWitch(body, { x: L, z: 0 }, [0], [c], TUNING, DT);
    expect(dist(r.body, c)).toBeCloseTo(L, 6);
    expect(r.body.z).toBeGreaterThan(1.9);
    expect(r.body.vz).toBeGreaterThan(29);
  });

  it("never pulled in: already further than its length, she just can't go further", () => {
    const c = crit(0, 3, 0, 0), body = { ...newWitch(L + 21, 0), vx: 20, vz: 0 }, r = dragWitch(body, { x: L + 20, z: 0 }, [0], [c], TUNING, DT);
    expect(r.body.x).toBeCloseTo(L + 20, 6);
    const nearer = dragWitch({ ...body, x: L + 19 }, { x: L + 20, z: 0 }, [0], [c], TUNING, DT);
    expect(nearer.body.x).toBe(L + 19);
  });

  it("the dragged creature is pulled along after her, never faster than its top speed, and its own run takes the pull off", () => {
    beginChains();
    const c = crit(0, 1, 0, 0, { speed: 1000 }), { body, from } = out(1), r = dragWitch(body, from, [0], [c], TUNING, DT);
    expect(c.x).toBeCloseTo(0.7, 6); // (pulled as far as she went past its end)
    expect(dist(r.body, c)).toBeCloseTo(L, 6); // (the chain at its length again)
    expect(takePulled(c)).toBeCloseTo(0.7, 6);
    beginChains();
    const slow = crit(1, 1, 0, 0), top = leashSpeed(slow, TUNING) * DT, q = dragWitch(out(1).body, from, [1], [c, slow], TUNING, DT);
    expect(slow.x).toBeCloseTo(top, 6); // (its top speed: no further)
    expect(q.body.x - L).toBeCloseTo(top, 6); // (and she no further than it could come)
  });

  it("the length is a knob; 0 turns chains off", () => {
    const t = withTuning({ leash: { ...TUNING.leash, chain: { ...C, length: 0 } } }), { body, from } = out(1);
    expect(dragWitch(body, from, [0], [crit(0, 3, 0, 0)], t, DT).body).toBe(body);
  });

  it("drawn: none close, whole taut, rising steadily between", () => {
    expect(chainShown(0, TUNING)).toBe(0);
    expect(chainShown(L * C.fadeFrom, TUNING)).toBe(0);
    expect(chainShown(L, TUNING)).toBe(1);
    let was = 0;
    for (let d = L * C.fadeFrom; d <= L; d += 2) { const k = chainShown(d, TUNING); expect(k).toBeGreaterThanOrEqual(was); was = k; }
    expect(chainShown(L * (1 + C.fadeFrom) / 2, TUNING)).toBeCloseTo(0.5, 6);
  });
});

function onGround(t: Tuning = TUNING): Game {
  const g = newGame(7, t), W = g.witches[0];
  g.clock.paused = false; g.party.paused = true;
  W.body = { ...W.body, seated: false, mode: "ground", lift: 0, x: g.map.dancefloor.x + 40, z: g.map.dancefloor.z + 30 };
  for (let i = 0; i < 4 / STEP; i++) stepGame(g, idle, STEP);
  return g;
}
function lead(g: Game, level: number, dx: number, dz: number, how: "stack" | "parked" = "stack", w = 0): Creature {
  const W = g.witches[w], c = g.creatures.find(k => !k.boss && !k.gone && !k.leashed)!;
  c.level = level as Creature["level"]; c.leashed = true; c.state = "leashed";
  c.x = c.tx = W.body.x + dx; c.z = c.tz = W.body.z + dz; c.rest = 0;
  if (how === "stack") W.leash.stack.push(c.id); else W.leash.placed.push({ id: c.id, x: c.x, z: c.z, at: g.clock.time });
  return c;
}
const run = (g: Game, s: number, c: Partial<Controls>, each?: () => void) => { for (let i = 0; i < s / STEP; i++) { stepGame(g, { ...idle, ...c }, STEP); each?.(); } };

describe("chains in play", () => {
  it("walking away from an adult, she's slowed at the chain's end and drags it along, never past its length plus a step", () => {
    const g = onGround(), W = g.witches[0], a = lead(g, 2, -L + 1, 0), ax = a.x, x0 = W.body.x;
    let most = 0;
    run(g, 3, { moveX: 1 }, () => { most = Math.max(most, dist(W.body, a)); });
    expect(most).toBeLessThanOrEqual(L + 0.5);
    expect(a.x - ax).toBeGreaterThan(3); // (dragged after her)
    expect(W.body.x - x0).toBeLessThan(TUNING.groundSpeed * 3 * 0.6); // (slowed: far short of free)
  });

  it("parked creatures, and babies, don't hold her", () => {
    for (const [level, how] of [[2, "parked"], [3, "parked"], [0, "stack"]] as const) {
      const g = onGround(still()), W = g.witches[0], x0 = W.body.x; lead(g, level, -L + 1, 0, how);
      run(g, 2, { moveX: 1 });
      expect(W.body.x - x0, `level ${level} ${how}`).toBeGreaterThan(TUNING.groundSpeed * 2 * 0.8);
    }
  });

  it("in the air too: a youth's chain slows her flying away; and nothing pulls her out of the sky", () => {
    const g = onGround(still()), W = g.witches[0];
    W.body = { ...W.body, mode: "treetop", lift: 1 };
    const y = lead(g, 1, -L + 1, 0);
    let most = 0;
    run(g, 3, { moveX: 1 }, () => { most = Math.max(most, dist(W.body, y)); });
    expect(most).toBeLessThanOrEqual(L + 1e-6); // (still youth: held)
    expect(W.body.mode).toBe("treetop");
    expect(W.body.lift).toBe(1);
    // (stopped with youths aplenty, she stays up)
    for (let i = 0; i < 4; i++) lead(g, 1, 3 + i, 0);
    run(g, 5, {});
    expect(W.body.mode).toBe("treetop");
    expect(W.body.lift).toBe(1);
  });

  it("each witch by her own chains", () => {
    const g = onGround(still()), W0 = g.witches[0], W1 = newWitchPlayer(1, W0.body.x, W0.body.z + 200, g.tuning, false);
    W1.body = { ...W1.body, seated: false, mode: "ground", lift: 0, perch: undefined };
    g.witches.push(W1);
    const a = lead(g, 3, -L + 1, 0, "stack", 0), x1 = W1.body.x;
    for (let i = 0; i < 2 / STEP; i++) stepGame(g, [{ ...idle, moveX: 1 }, { ...idle, moveX: 1 }], STEP);
    expect(dist(W0.body, a)).toBeLessThanOrEqual(L + 1e-6);
    expect(W1.body.x - x1).toBeGreaterThan(20);
  });
});

describe("take-off, and the rattle", () => {
  const press = (g: Game) => { stepGame(g, { ...idle, toggleMode: true }, STEP); return { up: g.witches[0].body.mode !== "ground", grounded: g.leashEvents.some(k => k.kind === "grounded") }; };
  it("only adults and legends hold her down; youths never do", () => {
    const y = onGround(); for (let i = 0; i < 6; i++) lead(y, 1, 2 + i, 0);
    expect(press(y)).toEqual({ up: true, grounded: false });
    const a = onGround(); lead(a, 1, 2, 0); lead(a, 2, 3, 0);
    expect(press(a)).toEqual({ up: false, grounded: true });
    const l = onGround(); lead(l, 3, 2, 0, "stack");
    expect(press(l).up).toBe(false);
  });
  it("the youth rise knob is drawn only: with youths she's up on the rules' clock as without", () => {
    const with_ = onGround(), without = onGround(); lead(with_, 1, 2, 0);
    for (const g of [with_, without]) { press(g); run(g, TUNING.riseTime + 0.1, {}); }
    expect(with_.witches[0].body.mode).toBe(without.witches[0].body.mode);
    expect(with_.witches[0].body.lift).toBe(without.witches[0].body.lift);
    expect(C.youthRise).toBeCloseTo(0.85);
  });
  it("the chains that rattle are exactly the adults' and legends' in her stack", () => {
    const cs = [crit(0, 0, 0, 0), crit(1, 1, 0, 0), crit(2, 2, 0, 0), crit(3, 3, 0, 0, { partyLegend: true }), crit(4, 2, 0, 0, { gone: true })];
    expect(weighingChains([0, 1, 2, 3, 4], cs)).toEqual([2, 3]);
    expect(weighingChains([0, 1], cs)).toEqual([]);
  });
});
