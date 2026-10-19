// Pack combat (rules/combat/packs.ts; docs/backlog/combat.md build step 1): roles by position, the combo's order, the lull, the
// pressure, her own pack, and each home kind's special, in the real rules (the debug arena's pack presets, the switch on).
import { describe, expect, it } from "vitest";
import { setupArena } from "../arena";
import { type Creature } from "../creatures";
import { newGame, stepGame, STEP, type Controls, type Game } from "../game";
import { TUNING, withTuning } from "../tuning";
import { PACKS, assignRoles, lullOf, packAttack, packKindOf, retreatSlot } from "./packs";
import { COMBAT } from "./data";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const ON = withTuning({ combat: { ...TUNING.combat, packs: { on: true } } });

/** A pack of the kind against her (or hers against wild wolves), the switch on, her health held; then `secs` of play, `each` step. */
function arena(spec: string, secs: number, each?: (g: Game) => void, t = ON): Game {
  const g = newGame(5, t);
  g.clock.paused = false; g.party.paused = true;
  setupArena(g, spec);
  for (let i = 0; i < secs / STEP; i++) { g.witches[0].health.hp = 1e6; stepGame(g, idle, STEP); each?.(g); }
  return g;
}
const wildPack = (g: Game) => [...(g.combat.packs?.values() ?? [])].find(s => !s.hers);
const fresh = (g: Game) => g.combat.events.filter(e => e.at === g.clock.time);

describe("pack combat's roles by position (Ed: 2b)", () => {
  const at = (id: number, x: number, z: number, hp?: number): Creature => ({ id, species: "fox", level: 2, x, z, hp }) as Creature;
  it("the nearest lunges, the one behind her throws the special, the rest fire; the hurt keep away; past the combo's size they hold", () => {
    const her = { x: 0, z: 0 }, heading = { x: 0, z: -1 }; // (she's going north: her back is south, +z)
    const m = [at(1, 3, 0), at(2, 0, 12), at(3, -10, 0), at(4, 9, -9), at(5, 1, 1, 1)];
    const r = assignRoles(m, her, heading);
    expect(r.get(1)).toBe("lunger");
    expect(r.get(2)).toBe("special"); // (behind her)
    expect([r.get(3), r.get(4)]).toEqual(["shooter", "shooter"]);
    expect(r.get(5)).toBe("hurt"); // (nearest of all, but hurt: out of the combo)
    // Standing still, the special is the furthest; past limits.combo the furthest hold.
    const many = Array.from({ length: 10 }, (_, i) => at(10 + i, 2 + i * 3, 0));
    const r2 = assignRoles(many, her, null);
    expect(r2.get(10)).toBe("lunger");
    expect(r2.get(10 + PACKS.limits.combo - 1)).toBe("special");
    expect([r2.get(18), r2.get(19)]).toEqual(["hold", "hold"]);
  });

  it("the lull is longer for a bigger pack and a young one (Ed: 8c), and each kind's retreat goes its own way", () => {
    const K = packKindOf("fox")!;
    expect(lullOf(K, 8, false)).toBeGreaterThan(lullOf(K, 2, false));
    expect(lullOf(K, 2, true)).toBeGreaterThan(lullOf(K, 2, false));
    const c = { id: 1, species: "fox", level: 2, x: 5, z: 0 } as Creature, st = { seed: 0.25, at: 0 };
    const out = (pattern: string, i: number) => { const q = retreatSlot(pattern, st, PACKS.retreats[pattern], c, i, 4, { x: 0, z: 0 }, 0.5, 1); return Math.hypot(q.x, q.z); };
    for (const p of ["rollApart", "zigzagApart", "circle", "splitBack", "freeze"]) expect(out(p, 1)).toBeGreaterThan(10); // (out of reach)
    expect(retreatSlot("hold", st, PACKS.retreats.hold, c, 0, 4, { x: 0, z: 0 }, 0.5, 1)).toEqual({ x: 5, z: 0 }); // (the badger holds)
  });

  it("keeps three moves on the level's budget: a move's damage a second is its level's, however many shots it splits into", () => {
    for (const k of Object.keys(PACKS.kinds)) for (const level of [1, 2] as const) for (const mv of ["melee", "ranged"] as const) {
      const a = packAttack(k, level, mv);
      if (!a) continue;
      expect((a.damage * a.shots) / a.attack.cooldown).toBeCloseTo(COMBAT.levels.dps[level] * (COMBAT.strength?.species[k] ?? 1) * (a.attack.factor ?? 1), 6);
    }
    expect(packAttack("snail", 2, "ranged")).toBeNull(); // (the table's none)
    expect(packAttack("fox", 1, "ranged")!.attack.windup).toBeGreaterThan(packAttack("fox", 2, "ranged")!.attack.windup); // (young: slower)
    expect(packAttack("fox", 1, "ranged")!.shots).toBeLessThan(packAttack("fox", 2, "ranged")!.shots); // (an adult's a volley)
  });
});

describe("pack combat in play (the switch on)", () => {
  it("off by default: no pack forms and fights go as before", () => {
    expect(TUNING.combat.packs?.on).toBe(false);
    const g = arena("pack-fox", 8, undefined, TUNING);
    expect(g.combat.packs?.size ?? 0).toBe(0);
  }, 60000);

  it("runs tell, combo, lull, again; in a combo the lunger goes first, the shots as it commits, the special last", () => {
    const order: string[][] = [];
    let combo = -1, lullFar = 0, lullStart = 0, windupsInLull = 0;
    const dist = (g: Game) => { const st = wildPack(g)!, w = g.witches[0].body; return st.members.reduce((a, id) => a + Math.hypot(g.creatures[id].x - w.x, g.creatures[id].z - w.z), 0) / st.members.length; };
    arena("pack-marten", 30, g => {
      const st = wildPack(g);
      if (!st) return;
      if (st.phase === "combo" && st.combo !== combo) { combo = st.combo; order.push([]); }
      for (const e of fresh(g)) {
        if (st.phase === "lull" && e.kind === "windup") windupsInLull++;
        if (st.phase !== "combo" || !order.length) continue;
        if (e.kind === "windup") order[order.length - 1].push(g.creatures[e.id!].fight?.packMove ?? "?");
        if (e.kind === "packSpecial") order[order.length - 1].push("special");
      }
      if (st.phase === "lull" && st.at === g.clock.time) lullStart = dist(g);
      if (st.phase === "lull" && g.clock.time - st.at > 1 && g.clock.time - st.at < 1 + STEP) lullFar = Math.max(lullFar, dist(g) - lullStart);
    });
    console.log("ORDERS", JSON.stringify(order));
    expect(order.length).toBeGreaterThanOrEqual(3);
    for (const o of order.slice(0, 3)) {
      expect(o[0]).toBe("melee"); // (the lunger first)
      const sp = o.indexOf("special"); // (when its special's ready: it has a cooldown)
      if (sp >= 0) expect(o.indexOf("ranged")).toBeLessThan(sp); // (the shots before the special)
    }
    expect(order.some(o => o.includes("special"))).toBe(true);
    expect(lullFar).toBeGreaterThan(3); // (it falls back in the lull)
    expect(windupsInLull).toBe(0); // (and strikes nothing then)
  }, 60000);

  it("never has more of a pack winding up or striking at her than its pressure, and never more than one lane at once", () => {
    for (const k of ["fox", "badger"]) {
      const K = packKindOf(k)!;
      let most = 0, lanes = 0;
      arena(`pack-${k}`, 25, g => {
        const st = wildPack(g);
        if (!st || (st.callUntil !== undefined && g.clock.time < st.callUntil)) return;
        const at = st.members.map(id => g.creatures[id]).filter(c => c.fight?.target?.kind === "witch" && (c.fight.windupUntil > 0 || c.fight.lunge));
        most = Math.max(most, at.length); lanes = Math.max(lanes, at.filter(c => c.fight!.packMove === "melee").length);
      });
      expect(most, k).toBeLessThanOrEqual(K.pressure);
      expect(lanes, k).toBeLessThanOrEqual(PACKS.limits.lanes);
    }
  }, 60000);

  it("her own pack combos the same way but never retreats: between combos it holds where it is", () => {
    let combos = 0, slotted = 0;
    arena("hers-fox", 30, g => {
      const st = [...(g.combat.packs?.values() ?? [])].find(s => s.hers);
      if (st && st.phase === "combo" && st.at === g.clock.time) combos++;
      for (const id of st?.members ?? []) if (g.creatures[id].packHide) slotted++;
    });
    expect(combos).toBeGreaterThanOrEqual(2);
    expect(slotted).toBe(0);
  }, 60000);

  // Each home kind's special does its thing (combat.md's table), and nothing goes NaN.
  const SIGNS: Record<string, (g: Game) => boolean> = {
    hedgehog: g => g.creatures.some(c => !!c.charge?.curl),
    squirrel: g => g.creatures.some(c => !!c.packHide),
    hare: g => !!wildPack(g)?.callUntil,
    marten: g => !!wildPack(g)?.callUntil,
    fox: g => wildPack(g)?.feintBy !== undefined,
    stoat: g => !!g.witches[0].confused,
    mole: g => (g.combat.clouds?.length ?? 0) > 0,
    snail: g => g.combat.trails.length > 2,
    dormouse: g => fresh(g).some(e => e.kind === "packSpecial"),
    badger: g => g.creatures.some(c => c.dug !== undefined && c.dug > g.clock.time),
  };
  for (const k of Object.keys(PACKS.kinds)) it(`${k}: combos, its special, its lull, nothing NaN`, () => {
    let seen = false, combos = 0, lulls = 0;
    const g = arena(`pack-${k}`, 30, g => {
      seen ||= SIGNS[k]?.(g) ?? true;
      const st = wildPack(g);
      if (st && st.at === g.clock.time) { if (st.phase === "combo") combos++; if (st.phase === "lull") lulls++; }
    });
    expect(seen, `${k}'s special`).toBe(true);
    expect(combos).toBeGreaterThanOrEqual(2);
    expect(lulls).toBeGreaterThanOrEqual(2);
    expect(g.creatures.every(c => Number.isFinite(c.x) && Number.isFinite(c.z))).toBe(true);
  }, 60000);
});
