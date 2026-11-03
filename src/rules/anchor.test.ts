// Anchor chains (Ed, 2026-11-03; rules/anchor.ts, leash.anchor.length): an adult following her holds her within its chain's length;
// at full length her motion away is clamped along the chain (never pulled in) and her motion round it kept; the adult catching up
// frees her; parked adults, youths, babies and legends don't anchor; she can't take off with an adult on her leash; each witch by
// her own stack.
import { describe, expect, it } from "vitest";
import { TUNING, withTuning, type Tuning } from "./tuning";
import { anchorLength, anchorWitch, anchorsOf, tautAnchors } from "./anchor";
import { groundedBy } from "./leashWeight";
import { newGame as fullGame, newWitchPlayer, stepGame, STEP, type Controls, type Game } from "./game";
import { newWitch } from "./witch";
import { smallWorld } from "../test/worlds";
import type { Creature } from "./creatures";
const newGame = smallWorld(fullGame, "Anchor chains check one or two witches with a few creatures placed beside them on home's open ground.");

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const crit = (id: number, level: number, x: number, z: number, extra: Partial<Creature> = {}) => ({ id, x, z, level, species: "wolf", gone: false, ...extra }) as unknown as Creature;
const REACH = 30;
/** Adults that stand still (their leash run speed 0), so the clamp is seen alone. */
const still = (t: Tuning = TUNING) => withTuning({ ...t, leash: { ...t.leash, runSpeed: 0 } });

function onGround(t: Tuning = TUNING): Game {
  const g = newGame(7, t), W = g.witches[0];
  g.clock.paused = false; g.party.paused = true;
  W.body = { ...W.body, seated: false, mode: "ground", lift: 0, x: g.map.dancefloor.x + 40, z: g.map.dancefloor.z + 30 };
  for (let i = 0; i < 4 / STEP; i++) stepGame(g, idle, STEP);
  return g;
}
/** A creature of `level`, `dx`, `dz` from her, on her leash (its sigil in her stack) or parked at a sigil where it stands. */
function lead(g: Game, level: number, dx: number, dz: number, how: "stack" | "parked" = "stack", w = 0): Creature {
  const W = g.witches[w], c = g.creatures.find(k => !k.boss && !k.gone && !k.leashed)!;
  c.level = level as Creature["level"]; c.leashed = true; c.state = "leashed"; c.speed = 0;
  c.x = c.tx = W.body.x + dx; c.z = c.tz = W.body.z + dz; c.rest = 0;
  if (how === "stack") W.leash.stack.push(c.id);
  else W.leash.placed.push({ id: c.id, x: c.x, z: c.z, at: g.clock.time });
  return c;
}
const run = (g: Game, s: number, c: Partial<Controls>, each?: () => void) => { for (let i = 0; i < s / STEP; i++) { stepGame(g, { ...idle, ...c }, STEP); each?.(); } };
const dist = (a: { x: number; z: number }, b: { x: number; z: number }) => Math.hypot(a.x - b.x, a.z - b.z);

describe("anchorWitch (the clamp)", () => {
  const body = (x: number, z: number, vx = 0, vz = 0) => ({ ...newWitch(x, z), vx, vz });

  it("inside the chain she moves freely", () => {
    const b = body(10, 0, 5, 0), r = anchorWitch(b, { x: 9, z: 0 }, [0], [crit(0, 2, 0, 0)], REACH);
    expect(r.body).toBe(b);
    expect(r.taut).toEqual([]);
  });

  it("past its end her motion away is clamped along the chain, her outward speed taken off", () => {
    const r = anchorWitch(body(31, 0, 10, 0), { x: 29.9, z: 0 }, [0], [crit(0, 2, 0, 0)], REACH);
    expect(r.body.x).toBeCloseTo(30, 9); expect(r.body.z).toBeCloseTo(0, 9);
    expect(r.body.vx).toBeCloseTo(0, 9);
    expect(r.taut).toEqual([0]);
  });

  it("at the radius her sideways motion stays: she slides round it", () => {
    const r = anchorWitch(body(30, 2, 0, 20), { x: 30, z: 0 }, [0], [crit(0, 2, 0, 0)], REACH);
    expect(dist(r.body, { x: 0, z: 0 })).toBeCloseTo(30, 9);
    expect(r.body.z).toBeGreaterThan(1.9);
    expect(r.body.vz).toBeGreaterThan(19); // (round it: almost all kept)
  });

  it("never pulled in: already further than the chain, she can't go further, but isn't moved back", () => {
    const from = { x: 50, z: 0 };
    const out = anchorWitch(body(51, 0, 10, 0), from, [0], [crit(0, 2, 0, 0)], REACH);
    expect(out.body.x).toBeCloseTo(50, 9);
    const nearer = anchorWitch(body(49, 0, -10, 0), from, [0], [crit(0, 2, 0, 0)], REACH);
    expect(nearer.body.x).toBe(49);
  });

  it("two chains: held by both; she stays where she was if no spot suits both", () => {
    const cs = [crit(0, 2, 0, 0), crit(1, 2, 40, 0)];
    const r = anchorWitch(body(20, 30, 0, 10), { x: 20, z: 22 }, [0, 1], cs, REACH);
    for (const c of cs) expect(dist(r.body, c)).toBeLessThanOrEqual(REACH + 1e-6);
  });

  it("only adults anchor: youths, babies, a party legend and the gone don't; 0 turns it off", () => {
    const cs = [crit(0, 1, 0, 0), crit(1, 0, 0, 0), crit(2, 3, 0, 0, { partyLegend: true }), crit(3, 2, 0, 0, { gone: true }), crit(4, 2, 0, 0)];
    expect(anchorsOf([0, 1, 2, 3, 4], cs).map(c => c.id)).toEqual([4]);
    const b = body(40, 0, 10, 0);
    expect(anchorWitch(b, { x: 39, z: 0 }, [0, 1, 2, 3], cs, REACH).body).toBe(b);
    expect(anchorWitch(b, { x: 39, z: 0 }, [4], cs, 0).body).toBe(b);
    expect(tautAnchors([4], cs, 30, 0, TUNING)).toEqual(new Set([4]));
  });

  it("the chain's length is a knob, 30 m to start", () => {
    expect(anchorLength(TUNING)).toBe(30);
  });
});

describe("anchor chains in play", () => {
  it("walking away, she stops at the chain's end and never past it", () => {
    const g = onGround(still()), W = g.witches[0], a = lead(g, 2, -20, 0), x0 = W.body.x;
    let most = 0;
    run(g, 3, { moveX: 1 }, () => { most = Math.max(most, dist(W.body, a)); });
    expect(most).toBeLessThanOrEqual(REACH + 1e-6);
    expect(dist(W.body, a)).toBeGreaterThan(REACH - 0.5);
    expect(W.body.x - x0).toBeLessThan(10.5); // (free, she'd have gone ~50 m)
  });

  it("at the chain's end she still moves sideways round the radius", () => {
    const g = onGround(still()), W = g.witches[0], a = lead(g, 2, -REACH, 0), z0 = W.body.z;
    let most = 0;
    run(g, 1, { moveZ: 1 }, () => { most = Math.max(most, dist(W.body, a)); });
    expect(most).toBeLessThanOrEqual(REACH + 1e-6);
    expect(Math.abs(W.body.z - z0)).toBeGreaterThan(8);
  });

  it("the adult moving frees her: following, it lets her on at its pace", () => {
    const g = onGround(), W = g.witches[0], a = lead(g, 2, -REACH + 1, 0), x0 = W.body.x, ax0 = a.x;
    run(g, 4, { moveX: 1 });
    expect(a.x - ax0).toBeGreaterThan(5); // (it ran after her)
    expect(W.body.x - x0).toBeGreaterThan(a.x - ax0 - 2); // (and she went as far, give or take the slack)
    expect(dist(W.body, a)).toBeLessThanOrEqual(REACH + 1e-6);
  });

  it("parked at a placed sigil, an adult doesn't anchor her; nor do youths or babies", () => {
    for (const [level, how] of [[2, "parked"], [1, "stack"], [0, "stack"]] as const) {
      const g = onGround(still()), W = g.witches[0], x0 = W.body.x; lead(g, level, -20, 0, how);
      run(g, 3, { moveX: 1 });
      expect(W.body.x - x0, `level ${level} ${how}`).toBeGreaterThan(REACH); // (anchored, she'd have gone 10 m)
    }
  });

  it("each witch is anchored by her own adults", () => {
    const g = onGround(still()), W0 = g.witches[0], W1 = newWitchPlayer(1, W0.body.x, W0.body.z + 60, g.tuning, false);
    W1.body = { ...W1.body, seated: false, mode: "ground", lift: 0, perch: undefined };
    g.witches.push(W1);
    const a = lead(g, 2, -20, 0, "stack", 0);
    const x1 = W1.body.x;
    for (let i = 0; i < 3 / STEP; i++) stepGame(g, [{ ...idle, moveX: 1 }, { ...idle, moveX: 1 }], STEP);
    expect(dist(W0.body, a)).toBeLessThanOrEqual(REACH + 1e-6);
    expect(W1.body.x - x1).toBeGreaterThan(30); // (hers isn't hers)
  });
});

describe("no take-off with an adult on her leash", () => {
  const press = (g: Game) => { stepGame(g, { ...idle, toggleMode: true }, STEP); const e = g.leashEvents.find(k => k.kind === "grounded"); return { up: g.witches[0].body.mode !== "ground", grounded: !!e, adult: groundedBy(g.witches[0].leash.stack, g.creatures, g.tuning).adult }; };

  it("refused, however light the adult, and known as the anchor's (for the hint)", () => {
    const light = withTuning({ leash: { ...TUNING.leash, grounded: { weight: 100 } } }); // (the weight rule alone wouldn't hold her)
    const g = onGround(light); lead(g, 2, 2, 0);
    expect(press(g)).toEqual({ up: false, grounded: true, adult: true });
  });

  it("parked, the adult lets her fly; a youth alone doesn't hold her", () => {
    const p = onGround(); lead(p, 2, 2, 0, "parked");
    expect(press(p).up).toBe(true);
    const y = onGround(); lead(y, 1, 2, 0);
    expect(press(y).up).toBe(true);
  });

  it("0 chain length turns it off (the weight rule still holds)", () => {
    const off = withTuning({ leash: { ...TUNING.leash, anchor: { length: 0 }, grounded: { weight: 100 } } });
    const g = onGround(off); lead(g, 2, 2, 0);
    expect(press(g).up).toBe(true);
    expect(groundedBy([], g.creatures, off).adult).toBe(false);
  });
});
