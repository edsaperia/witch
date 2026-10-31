// The brooms (Ed, 2026-10-11/12; rules/brooms.ts, rules/spells.ts): Battering's blink stuns what's in her path, Ley jump puts
// her at the pulse, the Canoe hull lightens her sigils' pull, Ground pound rises or lands at once with a shockwave (the landing stuns),
// and Stealth keeps her unseen unless she's inviting or putting down or picking up.
import { describe, expect, it } from "vitest";
import { TUNING, type Tuning } from "./tuning";
import { leashLoad, newGame, stepGame, type Controls, type Game } from "./game";
import { castSpell, stealthed } from "./spells";
import { leyJumpTarget } from "./brooms";
import { SETS, fittedOf, partsPull } from "./broomParts";
import { inviteCreature } from "./leash";
import { cellKey } from "./party";
import type { Creature } from "./creatures";
import { smallWorldTuning } from "../test/worlds";

const C: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
/** Riding the set that gives `spell` (its parts fitted: the Workshop's bay). */
const riding = (spell: string): Tuning => ({ ...TUNING, spells: { ...TUNING.spells, parts: SETS.find(s => s.spell === spell)!.pieces.join(",") } });
function game(t: Tuning, local = false): Game {
  // Ley jump follows the seeded area's pulse; stealth searches for a wild area over 150 m from home.
  const g = newGame(123, local ? smallWorldTuning(t, "Blink, pull and pound use explicitly placed creatures near one point.") : t);
  g.clock.paused = false; g.party.paused = true;
  g.party.spellAt = undefined;
  g.witch = { ...g.witch, seated: false, mode: "ground", lift: 0, vx: 0, vz: 0 };
  return g;
}
const at = (g: Game, x: number, z: number, mode: "ground" | "treetop" = "ground") => { g.witch = { ...g.witch, x, z, vx: 0, vz: 0, seated: false, mode, lift: mode === "ground" ? 0 : 1 }; };
const step = (g: Game, secs: number, c = C) => { for (let i = 0; i < Math.round(secs * 60); i++) stepGame(g, c, 1 / 60); };
/** A wild one put at (x, z), resting there; `level` 0 a baby (never attacks), 1 a young one. */
function wild(g: Game, x: number, z: number, level = 0): Creature {
  const used = ((g as unknown as { _used?: Set<number> })._used ??= new Set<number>());
  const c = g.creatures.find(k => !k.gone && !k.leashed && !k.boss && !k.enraged && !k.circle && k.level < 3 && !used.has(k.id))!;
  used.add(c.id);
  Object.assign(c, { level, x, z, tx: x, tz: z, anchorX: x, anchorZ: z, homeX: x, homeZ: z, rest: 99, fight: undefined, hp: undefined });
  c.cell = g.map.cellSafe(x, z).cell as [number, number];
  g.byArea = null;
  return c;
}
const spot = (g: Game) => ({ x: g.map.dancefloor.x + 40, z: g.map.dancefloor.z + 40 });

describe("Battering (Ed, 2026-10-12: 'blinks stun creatures in her path')", () => {
  it("a blink stuns the creatures on its line, not those off it", () => {
    const g = game(riding("battering"), true), p = spot(g);
    at(g, p.x, p.z);
    step(g, 1.1); // (its first blink charged)
    at(g, p.x, p.z);
    const on = wild(g, p.x + 4, p.z), off = wild(g, p.x + 4, p.z + 8);
    stepGame(g, { ...C, moveX: 1, dash: true }, 1 / 60);
    const W = g.witches[0];
    expect(Math.hypot(W.dash.toX - W.dash.fromX, W.dash.toZ - W.dash.fromZ)).toBeGreaterThan(5);
    expect(on.stunUntil ?? 0).toBeGreaterThan(g.clock.time);
    expect(off.stunUntil ?? 0).toBeLessThan(g.clock.time);
  });
});

describe("Ley jump", () => {
  it("cast, it puts her at the ley line's pulse; not while home boots up; then it recharges", () => {
    const g = game(riding("leyjump")), W = g.witches[0];
    // while booting: no pulse, nothing spent
    g.party.bootUntil = g.clock.time + 100;
    expect(leyJumpTarget(g)).toBeNull();
    stepGame(g, { ...C, spell: true }, 1 / 60);
    expect(W.spells.castAt).toBe(-Infinity);
    // booted: the pulse is somewhere; she's there
    g.party.bootUntil = g.clock.time;
    stepGame(g, C, 1 / 60);
    const p = leyJumpTarget(g)!;
    expect(p).not.toBeNull();
    stepGame(g, { ...C, spell: true }, 1 / 60);
    expect(Math.hypot(g.witch.x - p.x, g.witch.z - p.z)).toBeLessThan(15);
    expect(W.spells.readyAt).toBeGreaterThan(g.herTime + TUNING.spells.leyjump!.cooldown - 1);
    expect(castSpell(W.spells, g.herTime, TUNING, true)).toBe(false); // (recharging)
  });
});

describe("the Canoe hull (Haul's old job, a part since the Workshop: Ed, 2026-10-23)", () => {
  it("her sigils pull on her less: times its pull", () => {
    const pulled = (t: Tuning) => {
      const g = game(t, true), p = spot(g), W = g.witches[0];
      at(g, p.x, p.z);
      for (const k of [0, 1, 2]) { const c = wild(g, p.x + 30 + k, p.z, 2); inviteCreature(W.leash, c, c.x, c.z, g.clock.time); }
      return leashLoad(g).total;
    };
    const plain = pulled(TUNING), hauled = pulled({ ...TUNING, spells: { ...TUNING.spells, parts: "canoe" } });
    expect(plain).toBeGreaterThan(0);
    expect(hauled).toBeCloseTo(plain * partsPull(fittedOf("canoe")), 5);
    expect(partsPull(fittedOf("canoe"))).toBeCloseTo(0.65);
  });
});

describe("Ground pound (Ed, 2026-10-12: the Updraft renamed; 'its landing should also briefly stun')", () => {
  it("on the ground, up at once, knocking creatures back; in the treetops, down at once, knocking them back and stunning them", () => {
    const g = game(riding("pound"), true), p = spot(g), W = g.witches[0], P = TUNING.spells.pound!;
    at(g, p.x, p.z);
    const c = wild(g, p.x + 3, p.z);
    stepGame(g, { ...C, spell: true }, 1 / 60);
    expect(g.witch.mode).toBe("treetop");
    expect(g.witch.lift).toBe(1);
    expect(c.kx ?? 0).toBeGreaterThan(0); // (pushed away, east)
    expect(c.stunUntil ?? 0).toBeLessThan(g.clock.time); // (rising: no stun)
    // after its recharge, from the treetops: down at once, and the landing stuns
    step(g, P.cooldown + 0.1);
    at(g, p.x, p.z, "treetop");
    const d = wild(g, p.x - 3, p.z);
    stepGame(g, { ...C, spell: true }, 1 / 60);
    expect(g.witch.mode).toBe("ground");
    expect(g.witch.lift).toBe(0);
    expect(d.kx ?? 0).toBeLessThan(0); // (pushed away, west)
    expect(d.stunUntil ?? 0).toBeGreaterThan(g.clock.time);
    expect(W.landedAt).toBeDefined();
  });
});

describe("Stealth (Ed, 2026-10-12: 'creatures don't see you unless you're inviting or placing/pickup')", () => {
  /** Her down in a wild area well away from home, with one of its young (a fighter) close by. */
  function wildArea(t: Tuning) {
    const g = game(t), home = cellKey(g.map.centreCell);
    const cell = g.map.cells.find(([cx, cy]) => cellKey([cx, cy]) !== home && g.map.playable(cx, cy) && !g.party.areas.has(cellKey([cx, cy])) && Math.hypot(g.map.siteOf(cx, cy).x - g.map.dancefloor.x, g.map.siteOf(cx, cy).z - g.map.dancefloor.z) > 150)!;
    const s = g.map.siteOf(cell[0], cell[1]);
    at(g, s.x, s.z);
    g.witches[0].health.hp = 1e6;
    const c = wild(g, s.x + 6, s.z, 1);
    return { g, c, key: cellKey(cell) };
  }
  const seenBy = (g: Game, c: Creature, secs: number) => {
    let seen = false;
    for (let i = 0; i < Math.round(secs * 60); i++) { stepGame(g, C, 1 / 60); seen ||= c.fight?.target?.kind === "witch" || c.hunting !== undefined; }
    return seen;
  };

  it("without it the area watches and then goes for her; with it, nothing notices her", () => {
    const secs = (TUNING.wildWatch?.time ?? 4) + 3;
    const plain = wildArea(TUNING);
    expect(seenBy(plain.g, plain.c, secs)).toBe(true);
    const sneaky = wildArea(riding("stealth"));
    expect(stealthed(sneaky.g.witches[0].spells, sneaky.g.herTime)).toBe(true);
    expect(seenBy(sneaky.g, sneaky.c, secs)).toBe(false);
    expect(sneaky.g.wildEntry.has(sneaky.key)).toBe(false);
  });

  it("throwing a 💌 gives her away; what went for her loses her once she's out of range", () => {
    const { g, c } = wildArea(riding("stealth")), W = g.witches[0], R = TUNING.spells.stealth!.range;
    // a 💌 thrown (away from it): seen
    stepGame(g, { ...C, fire: true, aimX: -1, aimZ: 0 }, 1 / 60);
    expect(stealthed(W.spells, g.herTime)).toBe(false);
    expect(seenBy(g, c, (TUNING.wildWatch?.time ?? 4) + 3)).toBe(true);
    // hidden again, and well out of its range: it's lost her
    step(g, TUNING.spells.stealth!.reveal + 0.1);
    expect(stealthed(W.spells, g.herTime)).toBe(true);
    at(g, c.x - R - 15, c.z);
    step(g, 0.5);
    expect(c.hunting).toBeUndefined();
    expect(c.fight?.target?.kind === "witch").toBe(false);
  });
});
