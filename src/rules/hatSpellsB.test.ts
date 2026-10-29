// Hats B in the game (Ed, 2026-10-11/12; rules/hatSpells.ts): Bramble slows, the Mine stuns, the Lullaby's sleepers wake only
// to a 💌, the Cyclone whirls creatures round, up and out, and Nursing heals hers; none of them touches hers (but Nursing) or
// hurts anyone.
import { describe, expect, it } from "vitest";
import { TUNING, type Tuning } from "./tuning";
import { newGame, stepGame, type Controls, type Game } from "./game";
import { cyclonePose } from "./hatSpells";
import { inviteCreature } from "./leash";
import type { Creature } from "./creatures";

const C: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
const wearingHat = (hat: string): Tuning => ({ ...TUNING, spells: { ...TUNING.spells, hat } });
function game(t: Tuning): Game {
  const g = newGame(123, t);
  g.clock.paused = false; g.party.paused = true;
  g.party.spellAt = undefined;
  g.witch = { ...g.witch, seated: false, mode: "ground", lift: 0, vx: 0, vz: 0 };
  return g;
}
const at = (g: Game, x: number, z: number) => { g.witch = { ...g.witch, x, z, vx: 0, vz: 0, seated: false, mode: "ground", lift: 0 }; };
const step = (g: Game, secs: number, c = C) => { for (let i = 0; i < Math.round(secs * 60); i++) stepGame(g, c, 1 / 60); };
/** Hold the sigil button with nothing to pick up: her hat goes down at her feet. */
function putDown(g: Game): void {
  stepGame(g, { ...C, place: true, sigilHeld: true }, 1 / 60);
  step(g, (TUNING.leash.hatHold ?? 0.5) + 0.1, { ...C, sigilHeld: true });
  stepGame(g, C, 1 / 60);
  expect(g.witches[0].hat.down).not.toBeNull();
}
/** A wild baby (invitable, never attacking) put at (x, z) and kept resting there; a different one each call. */
function WILD_STATE(g: Game, x: number, z: number): Creature {
  const used = ((g as unknown as { _used?: Set<number> })._used ??= new Set<number>());
  const c = g.creatures.find(k => !k.gone && !k.leashed && !k.boss && !k.enraged && !k.circle && k.level < 3 && !used.has(k.id))!;
  used.add(c.id);
  Object.assign(c, { level: 0, x, z, tx: x, tz: z, anchorX: x, anchorZ: z, homeX: x, homeZ: z, rest: 99, fight: undefined });
  c.cell = g.map.cellSafe(x, z).cell as [number, number];
  g.byArea = null;
  return c;
}
/** A clear spot away from home: off the dancefloor's clearing, out of the way. */
const spot = (g: Game) => ({ x: g.map.dancefloor.x + 40, z: g.map.dancefloor.z + 40 });

/** Hers: invited and parked by its sigil where it stands. */
function mine(g: Game, c: Creature): Creature {
  const W = g.witches[0];
  inviteCreature(W.leash, c, c.x, c.z, g.clock.time);
  W.leash.stack = W.leash.stack.filter(k => k !== c.id);
  W.leash.placed.push({ id: c.id, x: c.x, z: c.z, at: g.clock.time });
  return c;
}
/** Off into the treetops, far from it all: only the hat's doing anything. */
const away = (g: Game) => { g.witch = { ...g.witch, x: g.witch.x + 300, mode: "treetop", lift: 1 }; };

describe("the Bramble hat (Ed: 30 m)", () => {
  it("slows wild creatures within its range while it lies there; not one beyond, not hers", () => {
    const g = game(wearingHat("bramble")), p = spot(g), R = TUNING.spells.bramble!.range;
    at(g, p.x, p.z); putDown(g);
    const d = g.witches[0].hat.down!, near = WILD_STATE(g, d.x + R - 5, d.z), far = WILD_STATE(g, d.x + R + 10, d.z), hers = mine(g, WILD_STATE(g, d.x + 5, d.z));
    away(g); step(g, 0.5);
    expect(near.slowUntil ?? 0).toBeGreaterThan(g.clock.time);
    expect(far.slowUntil ?? 0).toBeLessThan(g.clock.time);
    expect(hers.slowUntil ?? 0).toBeLessThan(g.clock.time);
  });
});

describe("the Mine hat (Ed: 15 m)", () => {
  it("put down, it stuns wild creatures within its range, and hurts none", () => {
    const g = game(wearingHat("mine")), p = spot(g), M = TUNING.spells.mine!;
    at(g, p.x, p.z);
    const near = WILD_STATE(g, p.x + M.range - 4, p.z), far = WILD_STATE(g, p.x + M.range + 10, p.z), hp = near.hp;
    putDown(g);
    expect(near.stunUntil ?? 0).toBeGreaterThan(g.clock.time + M.stun - 1);
    expect(far.stunUntil ?? 0).toBeLessThan(g.clock.time);
    expect(near.hp).toBe(hp);
  });
});

describe("the Lullaby hat (Ed, 2026-10-12: 'Wild creatures that are asleep wake up when hit with an invitation')", () => {
  it("put down, wild creatures near it sleep, even with her on the ground beside them, till a 💌 lands on one", () => {
    const g = game(wearingHat("lullaby")), W = g.witches[0], p = spot(g), L = TUNING.spells.lullaby!;
    at(g, p.x, p.z);
    const a = WILD_STATE(g, p.x + 8, p.z), b = WILD_STATE(g, p.x - 8, p.z), far = WILD_STATE(g, p.x + L.range + 10, p.z);
    putDown(g);
    for (const c of [a, b]) { expect(c.asleep).toBe(true); expect(c.lulled).toBe(true); }
    expect(far.asleep).toBeFalsy();
    // she stands about on the ground in their area: they sleep on
    step(g, 3);
    expect(a.asleep).toBe(true); expect(b.asleep).toBe(true);
    // a 💌 at a: it wakes; b, lulled, sleeps on (a 💌 on a neighbour doesn't wake it)
    at(g, a.x - 4, a.z);
    let hit = false;
    for (let i = 0; i < 90 && !hit; i++) { stepGame(g, { ...C, fire: i === 0, aimX: 1, aimZ: 0 }, 1 / 60); hit = W.invites.events.some(e => e.kind === "hit" && e.id === a.id); }
    expect(hit).toBe(true);
    expect(a.asleep).toBeFalsy();
    expect(b.asleep).toBe(true);
    // its nap's end: up
    step(g, L.time);
    expect(b.asleep).toBeFalsy();
  });

  it("leaves the enraged be", () => {
    const g = game(wearingHat("lullaby")), p = spot(g);
    at(g, p.x, p.z);
    const c = WILD_STATE(g, p.x + 6, p.z);
    c.enraged = true;
    putDown(g);
    expect(c.asleep).toBeFalsy();
  });
});

describe("the Cyclone hat (Ed, 2026-10-12: 'pushes creatures around in a circle, lifts them and throws them outwards')", () => {
  it("sweeps wild creatures near it round it, up off the ground, then flings them out and they land stunned; hers stay put", () => {
    const g = game(wearingHat("cyclone")), W = g.witches[0], p = spot(g), Y = TUNING.spells.cyclone!;
    at(g, p.x, p.z);
    const c = WILD_STATE(g, p.x + 6, p.z), hers = mine(g, WILD_STATE(g, p.x - 6, p.z)), hp = c.hp;
    putDown(g);
    away(g);
    const d = W.hat.down!, hx = hers.x, hz = hers.z, r0 = W.spells.cyc!.held.find(h => h.id === c.id)!.r; // (where the whirlwind caught it: a skittish baby edges off her as she puts it down)
    let turned = 0, last = Math.atan2(c.z - d.z, c.x - d.x), high = 0;
    for (let i = 0; i < Math.round(Y.time * 60) - 2; i++) {
      stepGame(g, C, 1 / 60);
      const a = Math.atan2(c.z - d.z, c.x - d.x);
      turned += Math.atan2(Math.sin(a - last), Math.cos(a - last)); last = a;
      expect(Math.hypot(c.x - d.x, c.z - d.z)).toBeLessThanOrEqual(r0 + 0.01);
      high = Math.max(high, cyclonePose(W.spells, c.id, g.clock.time, TUNING)?.y ?? 0);
    }
    expect(Math.abs(turned) / (Math.PI * 2)).toBeGreaterThan(Y.spin * Y.time * 0.8); // (round and round)
    expect(high).toBeGreaterThan(Y.lift * 0.9); // (lifted)
    step(g, Y.flingTime + 0.2);
    expect(Math.hypot(c.x - d.x, c.z - d.z)).toBeGreaterThan(r0 + Y.fling * 0.8); // (flung out)
    expect(c.stunUntil ?? 0).toBeGreaterThan(g.clock.time);
    expect(c.hp).toBe(hp); // (never hurt)
    expect(W.spells.cyc!.held.map(h => h.id)).toEqual([c.id]); // (hers: not caught up in it)
    expect(Math.hypot(hers.x - hx, hers.z - hz)).toBeLessThan(4); // (and not flung: only ambling by its sigil)
  });
});

describe("the Nursing hat", () => {
  it("heals her own creatures near it, and not wild ones", () => {
    const g = game(wearingHat("nursing")), p = spot(g);
    at(g, p.x, p.z); putDown(g);
    const d = g.witches[0].hat.down!, hers = mine(g, WILD_STATE(g, d.x + 4, d.z)), wild = WILD_STATE(g, d.x - 4, d.z);
    hers.drops = 0.7; wild.drops = 0.7; // (70% of their slots 💧s: rules/orbit.ts)
    away(g); step(g, 1 / TUNING.spells.nursing!.rate + 1);
    expect(hers.drops).toBeUndefined(); // (whole again)
    expect(wild.drops).toBeCloseTo(0.7, 5);
  });
});
