// The hats' spells in the game (Ed, 2026-10-11; rules/hatSpells.ts): Harvest's ring of six berries, Dowsing's pointer to the
// nearest relic, the Sentry's and the Slingshot's 💌s, and Gathering bringing her sigils back.
import { describe, expect, it } from "vitest";
import { TUNING, type Tuning } from "./tuning";
import { newGame, stepGame, type Controls, type Game } from "./game";
import { wearing } from "./hat";
import { dowseMarker } from "./hatSpells";
import { inviteCreature } from "./leash";
import type { Creature } from "./creatures";

// Keep the radius fixture: Sentry is exercised with her 200 m away, Gathering parks beyond its full range and Dowsing chooses among map-wide relics.
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
  expect(wearing(g.witches[0].hat)).toBe(false);
}
const pickUp = (g: Game) => { const d = g.witches[0].hat.down!; at(g, d.x, d.z); stepGame(g, { ...C, place: true }, 1 / 60); stepGame(g, C, 1 / 60); expect(wearing(g.witches[0].hat)).toBe(true); };
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

describe("the Harvest hat (Ed: 'grow a circle of six berries around the hat when placed')", () => {
  it("put down, six berries grow in a ring round it; eaten ones don't grow elsewhere; again too soon, nothing more", () => {
    const g = game(wearingHat("harvest")), B = g.berries, before = B.berries.filter(b => !b.gone).length, H = TUNING.spells.harvest!;
    const p = spot(g); at(g, p.x, p.z);
    putDown(g);
    const d = g.witches[0].hat.down!, ring = B.berries.filter(b => b.once && !b.gone);
    expect(ring.length).toBe(6);
    for (const b of ring) expect(Math.hypot(B.bushes[b.bush].x - d.x, B.bushes[b.bush].z - d.z)).toBeCloseTo(H.radius, 5);
    expect(B.berries.filter(b => !b.gone).length).toBe(before + 6);
    // no bush is drawn under them (rules/berries.ts: harvest spots)
    for (const b of ring) expect(B.bushes[b.bush].harvest).toBe(true);
    // picked up and put down again at once: nothing more grows (harvest.every), and never more than six
    pickUp(g); putDown(g);
    expect(B.berries.filter(b => b.once && !b.gone).length).toBe(6);
    expect(B.berries.filter(b => b.once).length).toBe(6);
  });
});

describe("the Dowsing hat", () => {
  it("put down, it points to the nearest relic still lying, for dowsing.time seconds", () => {
    const g = game(wearingHat("dowsing")), W = g.witches[0], p = spot(g);
    at(g, p.x, p.z);
    putDown(g);
    const m = dowseMarker(g, W.spells, g.herTime)!;
    expect(m).not.toBeNull();
    const d = W.hat.down!, lying = g.relics.filter(r => r.state === "lying").map(r => Math.hypot(r.sx - d.x, r.sz - d.z));
    expect(Math.hypot(m.x - d.x, m.z - d.z)).toBeCloseTo(Math.min(...lying), 5);
    step(g, TUNING.spells.dowsing!.time + 0.5);
    expect(dowseMarker(g, W.spells, g.herTime)).toBeNull();
  });
});

describe("the Sentry hat", () => {
  it("lying there, it throws 💌s at a wild creature within its range, not at one beyond it", () => {
    const g = game(wearingHat("sentry")), W = g.witches[0], p = spot(g), S = TUNING.spells.sentry!;
    at(g, p.x, p.z);
    putDown(g);
    const d = W.hat.down!;
    // walk away into the treetops, so only the hat throws
    g.witch = { ...g.witch, x: d.x + 200, z: d.z, mode: "treetop", lift: 1 };
    const wild = WILD_STATE(g, d.x + S.range - 5, d.z);
    let hits = 0;
    for (let i = 0; i < 4 * 60; i++) { stepGame(g, C, 1 / 60); hits += W.invites.events.filter(e => e.kind === "hit" && e.id === wild.id).length; }
    expect(hits).toBeGreaterThan(0);
    // one beyond its range: none
    wild.x = d.x + S.range + 15; wild.tx = wild.x; wild.z = d.z; wild.tz = wild.z;
    let far = 0;
    step(g, 0.5);
    for (let i = 0; i < 3 * 60; i++) { wild.x = d.x + S.range + 15; wild.z = d.z; stepGame(g, C, 1 / 60); far += W.invites.events.filter(e => e.kind === "shot").length; }
    expect(far).toBe(0);
  });
});

describe("the Slingshot hat", () => {
  it("catches her 💌s flying near it, holds them circling, then flings them at a creature within its range", () => {
    const g = game(wearingHat("slingshot")), W = g.witches[0], p = spot(g), SL = TUNING.spells.slingshot!;
    at(g, p.x, p.z);
    putDown(g);
    const d = W.hat.down!;
    // a creature out past her own 💌s' reach from where she stands, but within the slingshot's
    const wild = WILD_STATE(g, d.x, d.z + SL.fire - 5);
    at(g, d.x - 6, d.z);
    stepGame(g, { ...C, fire: true, aimX: 1, aimZ: 0 }, 1 / 60);
    let caught = 0, hits = 0;
    for (let i = 0; i < 5 * 60; i++) {
      stepGame(g, C, 1 / 60);
      caught = Math.max(caught, W.invites.letters.filter(L => L.kind === "sling").length);
      hits += W.invites.events.filter(e => e.kind === "hit" && e.id === wild.id).length;
    }
    expect(caught).toBeGreaterThan(0);
    expect(hits).toBeGreaterThan(0);
  });
});

describe("the Gathering hat (Ed: 'all sigils in range')", () => {
  it("picked up again, it brings her sigils within its range back to her stack, and leaves the ones beyond", () => {
    const g = game(wearingHat("gathering")), W = g.witches[0], p = spot(g), R = TUNING.spells.gathering!.range;
    at(g, p.x, p.z);
    putDown(g);
    const d = W.hat.down!;
    // three creatures of hers parked by their sigils: two in range, one beyond
    const ids = [WILD_STATE(g, d.x + 20, d.z), WILD_STATE(g, d.x - R + 10, d.z), WILD_STATE(g, d.x + R + 30, d.z)].map(c => c.id);
    for (const [i, id] of ids.entries()) {
      const c = g.creatures[id];
      inviteCreature(W.leash, c, c.x, c.z, g.clock.time);
      W.leash.stack = W.leash.stack.filter(k => k !== id);
      W.leash.placed.push({ id, x: c.x, z: c.z + (i === 0 ? 0 : 0), at: g.clock.time });
    }
    pickUp(g);
    expect(W.leash.stack).toEqual(expect.arrayContaining([ids[0], ids[1]]));
    expect(W.leash.placed.map(q => q.id)).toEqual([ids[2]]);
  });

  it("any other hat brings nothing back", () => {
    const g = game(TUNING), W = g.witches[0], p = spot(g);
    at(g, p.x, p.z);
    putDown(g);
    const d = W.hat.down!, c = WILD_STATE(g, d.x + 10, d.z);
    inviteCreature(W.leash, c, c.x, c.z, g.clock.time);
    W.leash.stack = W.leash.stack.filter(k => k !== c.id);
    W.leash.placed.push({ id: c.id, x: c.x, z: c.z, at: g.clock.time });
    pickUp(g);
    expect(W.leash.placed.map(q => q.id)).toEqual([c.id]);
  });
});
