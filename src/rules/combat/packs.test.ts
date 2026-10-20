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
  it("on by default (Ed, 2026-10-20); switched off, no pack forms and fights go as before", () => {
    expect(TUNING.combat.packs?.on).toBe(true);
    expect(arena("pack-fox", 8, undefined, TUNING).combat.packs?.size ?? 0).toBeGreaterThan(0);
    const g = arena("pack-fox", 8, undefined, withTuning({ combat: { ...TUNING.combat, packs: { on: false } } }));
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
    // Phase 1's (Echo, 2026-10-19).
    wolf: g => !!wildPack(g)?.callUntil,
    boar: g => g.creatures.some(c => !!c.charge),
    bat: g => !!g.witches[0].confused?.move,
    raven: g => (g.combat.mirages?.length ?? 0) > 0,
    newt: g => g.combat.trails.length > 2,
    moth: g => (g.combat.clouds ?? []).some(k => k.flash !== undefined),
    heron: g => wildPack(g)?.syncUntil !== undefined,
    beetle: g => g.creatures.filter(c => c.dug !== undefined && c.dug > g.clock.time).length >= 2,
    woodlouse: g => g.creatures.some(c => !!c.charge?.curl),
    otter: g => fresh(g).some(e => e.kind === "packSpecial"),
    toad: g => (g.combat.clouds?.length ?? 0) > 0,
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

// Phase 1's new pieces (Echo, 2026-10-19): the heron's sync, the raven's mirage, the flyers on the ground, the toad's spores, the
// bat's screech turning her movement.
describe("pack combat, Phase 1's pieces", () => {
  it("the heron's sync: a blink of hers while it lasts brings one of the pack blinking in beside where it put her, striking", () => {
    let synced = 0, blinkAt = -1, near = Infinity;
    arena("pack-heron", 40, g => {
      for (const e of fresh(g)) if (e.kind === "packSync") {
        synced++;
        const w = g.witches[0].body; near = Math.min(near, Math.hypot(g.creatures[e.id!].x - w.x, g.creatures[e.id!].z - w.z));
      }
      const st = wildPack(g);
      // (while it lasts she blinks east, pressing till it goes: a blow's stagger holds a blink back)
      if (st?.syncUntil !== undefined && g.clock.time < st.syncUntil && !(g.witches[0].dash.at > (st.syncFrom ?? Infinity))) { blinkAt = g.clock.time; stepGame(g, { ...idle, moveX: 1, dash: true }, STEP); }
    });
    expect(blinkAt).toBeGreaterThan(0);
    expect(synced).toBeGreaterThanOrEqual(2); // (out of where it was, into where she went)
    expect(near).toBeLessThan(8);
  }, 60000);

  it("the raven's mirage: a 💌 flying through an image bursts it and goes no further", () => {
    let burst = false, aimed = false;
    arena("pack-raven", 30, g => {
      burst ||= fresh(g).some(e => e.kind === "mirageBurst");
      const m = g.combat.mirages?.[0], w = g.witches[0].body;
      if (m && !aimed) aimed = true;
      if (m && !burst) { stepGame(g, { ...idle, fire: true, aimX: m.x - w.x, aimZ: m.z - w.z }, STEP); burst ||= fresh(g).some(e => e.kind === "mirageBurst"); }
    });
    expect(aimed).toBe(true);
    expect(burst).toBe(true);
  }, 60000);

  it("the flyers fight on the ground in a pack (no swoop till the flyers' step), and the toad's spores leave a slowing patch", () => {
    for (const k of ["bat", "raven"]) {
      let up = 0;
      arena(`pack-${k}`, 20, g => { up += g.creatures.filter(c => c.species === k && !!c.swoop).length; });
      expect(up, k).toBe(0);
    }
    let patch = false;
    arena("pack-toad", 30, g => { patch ||= g.combat.trails.some(tr => g.creatures[tr.from]?.species === "toad"); });
    expect(patch).toBe(true);
  }, 60000);

  it("the bat's screech turns her movement, not her aim", () => {
    const g = newGame(5, ON);
    g.clock.paused = false; g.party.paused = true;
    setupArena(g, "pack-bat");
    for (let i = 0; i < 20; i++) stepGame(g, idle, STEP);
    const W = g.witches[0];
    W.confused = { until: g.clock.time + 5, drift: Math.PI / 3, move: true };
    const x0 = W.body.x, z0 = W.body.z;
    for (let i = 0; i < 30; i++) { W.health.hp = 1e6; stepGame(g, { ...idle, moveX: 1 }, STEP); }
    const dx = W.body.x - x0, dz = W.body.z - z0;
    expect(Math.hypot(dx, dz)).toBeGreaterThan(0.5);
    expect(Math.abs(dz) / Math.hypot(dx, dz)).toBeGreaterThan(0.05); // (steering east, she drifts off north or south)
  }, 60000);
});

// Ed's playtest, v3893 (2026-10-19): "Pouncing/melee animals seem to fall short again and so are easy to evade ... they miss me",
// hares, pack combat on. Its shooters aimed half a blink ahead of her whatever their bolt's flight, so walking away she was 10 m on
// when they arrived; and only the nearest of a pack round her lunged a combo. A hare pack in its own area, her walking away at her
// speed, turning now and then: its lunges land, its bolts hit, and it hurts her about as often as the plain fight does.
describe("a pack against her walking away (Ed's playtest, v3893)", () => {
  function chase(packs: boolean) {
    const g = newGame(123, withTuning({ combat: { ...TUNING.combat, packs: { on: packs } } }));
    g.clock.paused = false; g.party.paused = true;
    const h = g.creatures.filter(c => c.species === "hare" && c.level > 0 && !c.gone)[0];
    g.witch = { ...g.witch, seated: false, mode: "ground", lift: 0, x: h.x + 6, z: h.z };
    let lunges = 0, landed = 0, hits = 0, fired = 0, shotHits = 0;
    const lunging = new Map<number, boolean>(), mine = new Set<number>();
    for (let i = 0; i < 40 / STEP; i++) {
      g.witches[0].health.hp = 99;
      const T = i * STEP, a = Math.floor(T / 4) * 2.1, c: Controls = { ...idle, moveX: T < 2 ? 0 : Math.cos(a), moveZ: T < 2 ? 0 : Math.sin(a) };
      const before = new Map(g.combat.shots.filter(s => !s.lob).map(s => [s.id, s]));
      stepGame(g, c, STEP);
      const w = g.witch, now = new Set(g.combat.shots.map(s => s.id)), hit = g.combat.events.some(e => e.kind === "witchHit" && e.at === g.clock.time);
      if (hit) hits++;
      for (const s of g.combat.shots) if (!mine.has(s.id) && g.creatures[s.from]?.species === "hare") { mine.add(s.id); fired++; }
      for (const [id, s] of before) if (mine.has(id) && !now.has(id) && g.clock.time < s.until - 1e-6 && Math.hypot(w.x - s.x, w.z - s.z) < 3) shotHits++;
      for (const k of g.creatures) {
        if (k.species !== "hare" || k.leashed) continue;
        const on = !!k.fight?.lunge;
        if (lunging.get(k.id) && !on && k.fight?.target?.kind === "witch") { lunges++; if (hit) landed++; }
        lunging.set(k.id, on);
      }
    }
    return { lunges, landed, hits, fired, shotHits };
  }
  it("lands its lunges and bolts, and hits her about as often as without packs", () => {
    const plain = chase(false), packs = chase(true);
    expect(packs.lunges).toBeGreaterThanOrEqual(5);
    expect(packs.landed / packs.lunges).toBeGreaterThanOrEqual(0.7); // (a lunge that starts reaches her)
    expect(packs.shotHits / Math.max(1, packs.fired)).toBeGreaterThanOrEqual(0.35); // (13 to 26% before: aimed behind her)
    expect(packs.hits).toBeGreaterThanOrEqual(plain.hits * 0.5); // (9 to 17 of plain's 24 to 30 before; and since Ed, 2026-10-20, a pack's strikes at her take the dodge's tokens, one at a time as the plain fight's do, with its lulls besides)
  }, 60000);
});

// Ed, 2026-10-20 (pack combat on by default; its tests run with it on): three things the switch showed.
describe("pack combat's fixes (Ed, 2026-10-20)", () => {
  const at = (id: number, x: number, z: number, hp?: number): Creature => ({ id, species: "boar", level: 1, x, z, hp }) as Creature;

  it("a pack all hurt, or a lone hurt one, fights on (so a fight ends); one hurt beside a healthy packmate still keeps away", () => {
    const her = { x: 0, z: 0 };
    expect(assignRoles([at(1, 4, 0, 1)], her, null).get(1)).toBe("lunger"); // (alone at 1 hp: it fights on)
    const both = assignRoles([at(1, 4, 0, 1), at(2, 9, 0, 1)], her, null);
    expect([both.get(1), both.get(2)]).toEqual(["lunger", "special"]);
    const one = assignRoles([at(1, 4, 0, 1), at(2, 9, 0)], her, null);
    expect([one.get(1), one.get(2)]).toEqual(["hurt", "lunger"]);
  });

  it("a wild boar at 1 hp facing her parked wolf is knocked down (it kept off it for good)", () => {
    const g = newGame(77, ON), d = g.map.dancefloor;
    g.clock.paused = false; g.party.paused = true;
    g.witch = { ...g.witch, seated: false, x: d.x, z: d.z + 20, mode: "treetop", lift: 1 };
    for (const c of g.creatures) if (Math.hypot(c.x - g.witch.x, c.z - g.witch.z) < 60) c.gone = true;
    const spare = g.creatures.filter(c => !c.gone && !c.leashed && !c.boss && Math.hypot(c.x - g.witch.x, c.z - g.witch.z) > 80);
    const put = (c: Creature, species: string, level: 1 | 2, dx: number) => { const x = g.witch.x + dx, z = g.witch.z; Object.assign(c, { circle: undefined, species, level, x, z, tx: x, tz: z, homeX: x, homeZ: z, anchorX: x, anchorZ: z, safeR: undefined, seen: g.clock.time, hp: undefined, boss: false, siege: undefined, rest: 0 }); c.cell = g.map.cellSafe(x, z).cell as [number, number]; return c; };
    const boar = put(spare[0], "boar", 1, 4), wolf = put(spare[1], "wolf", 2, 2);
    boar.hp = 1;
    wolf.leashed = true; g.leash.placed.push({ id: wolf.id, x: wolf.x, z: wolf.z, at: g.clock.time });
    g.byArea = null;
    let downAt = -1;
    for (let i = 0; i < 20 / STEP && downAt < 0; i++) { stepGame(g, idle, STEP); if (boar.dazed || boar.fleeUntil) downAt = g.clock.time; }
    expect(downAt).toBeGreaterThan(0);
  }, 60000);

  it("no more of a pack strike at her at once than the dodge's tokens let, its call too (fights between creatures as before)", () => {
    const D = TUNING.dodge!.a, cap = Math.max(D.tokens, D.swarmTokens);
    let most = 0, called = false;
    arena("wolf*1@0,wolf*12@2", 30, g => { // (hers a baby wolf, which no wolf fights)
      const st = wildPack(g);
      if (st?.callUntil !== undefined && g.clock.time < st.callUntil) called = true;
      most = Math.max(most, g.creatures.filter(c => !c.gone && c.fight?.target?.kind === "witch" && (c.fight.windupUntil > 0 || !!c.fight.lunge)).length);
    });
    expect(called).toBe(true); // (the howl came, and still one at a time)
    expect(most).toBeGreaterThan(0);
    expect(most).toBeLessThanOrEqual(cap);
  }, 60000);
});
