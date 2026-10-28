// Pack combat (rules/combat/packs.ts; docs/backlog/combat.md build step 1): roles by position, the combo's order, the lull, the
// pressure, her own pack, and each home kind's special, in the real rules (the debug arena's pack presets, the switch on).
import { describe, expect, it } from "vitest";
import { setupArena } from "../arena";
import { type Creature } from "../creatures";
import { mirageDecoys, newGame, stepGame, STEP, type Controls, type Game } from "../game";
import { TUNING, withTuning } from "../tuning";
import { PACKS, assignRoles, lullOf, packAttack, packKindOf, retreatSlot, strikingNow } from "./packs";
import { FIGHT, profileOf } from "../movement";
import { COMBAT } from "./data";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const ON = withTuning({ combat: { ...TUNING.combat, packs: { on: true } } });
/** With the old attacks (?attacks=old): for the tests that pin a kind's old one (the hares' lunge, the bats' screech). */
const ON_OLD = withTuning({ combat: { ...TUNING.combat, packs: { on: true } }, attacks: { reactionFloor: 0.45, species: false } });

/** A pack of the kind against her (or hers against wild wolves), the switch on, her health held; then `secs` of play, `each` step. */
function arena(spec: string, secs: number, each?: (g: Game) => void, t = ON, seed = 5): Game {
  const g = newGame(seed, t);
  g.clock.paused = false; g.party.paused = true;
  setupArena(g, spec);
  for (let i = 0; i < secs / STEP; i++) { g.witches[0].health.hp = 1e6; stepGame(g, idle, STEP); each?.(g); }
  return g;
}
const wildPack = (g: Game) => [...(g.combat.packs?.values() ?? [])].find(s => !s.hers);
const fresh = (g: Game) => g.combat.events.filter(e => e.at === g.clock.time);

describe("pack combat's roles by position (Ed: 2b)", () => {
  const at = (id: number, x: number, z: number, hp?: number): Creature => ({ id, species: "fox", level: 2, x, z, ...(hp !== undefined ? { affection: 0.99 } : {}) }) as Creature; // (hurt: its slots nearly full, rules/orbit.ts)
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
    // (the lunger first; with creature momentum, 2026-10-27, a lunger coming round from afar may not get in within two gaps, and then
    // its shots go first, the combo's own fallback: so most combos, not every one)
    expect(order.slice(0, 4).filter(o => o[0] === "melee").length).toBeGreaterThanOrEqual(3);
    for (const o of order.slice(0, 3)) {
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
  // The rest (step 1's data-only kinds, 2026-10-23): their special's own sign, by its kind.
  const BY_SPECIAL: Record<string, (g: Game, k: string) => boolean> = {
    stampede: g => g.creatures.some(c => !!c.charge),
    call: g => !!wildPack(g)?.callUntil,
    feint: g => wildPack(g)?.feintBy !== undefined,
    confusion: (g, k) => !!g.witches[0].confused && !!g.witches[0].confused.move === !!packKindOf(k)!.specialWith?.move,
    cloud: g => (g.combat.clouds?.length ?? 0) > 0,
    wall: g => g.combat.trails.length > 2,
    rally: g => fresh(g).some(e => e.kind === "packSpecial"),
    cover: g => g.creatures.some(c => c.dug !== undefined && c.dug > g.clock.time),
    mirage: g => (g.combat.mirages?.length ?? 0) > 0,
    sync: g => wildPack(g)?.syncUntil !== undefined,
    scatter: g => g.creatures.some(c => !!c.packHide),
  };
  for (const k of Object.keys(PACKS.kinds)) it(`${k}: combos, its special, its lull, nothing NaN`, () => {
    let seen = false, combos = 0, lulls = 0;
    const g = arena(`pack-${k}`, 30, g => {
      seen ||= SIGNS[k]?.(g) ?? BY_SPECIAL[packKindOf(k)!.special]?.(g, k) ?? true;
      const st = wildPack(g);
      if (st && st.at === g.clock.time) { if (st.phase === "combo") combos++; if (st.phase === "lull") lulls++; }
    });
    expect(seen, `${k}'s special`).toBe(true);
    expect(combos).toBeGreaterThanOrEqual(2);
    expect(lulls).toBeGreaterThanOrEqual(2);
    expect(g.creatures.every(c => Number.isFinite(c.x) && Number.isFinite(c.z))).toBe(true);
  }, 60000);
});

// Phase 1's new pieces (Echo, 2026-10-19): the heron's sync, the raven's mirage, the toad's spores, the bat's screech turning her
// movement. (The flyers fought on the ground in a pack till Ed, 2026-10-20: now they keep their dive, below.)
describe("pack combat, step 2's specials (2026-10-23: knockback, pull, decoy)", () => {
  it("each of the seven strikes and throws its special: the ambushers (spider, crocodile) don't lie in wait once their pack engages", () => {
    const bad: string[] = [];
    for (const k of ["ram", "ibex", "rhino", "spider", "crocodile", "griffin", "raccoon"]) {
      let struck = 0, specials = 0;
      arena(`pack-${k}`, 40, g => { for (const e of fresh(g)) { if (e.kind === "windup" || e.kind === "charged" || e.kind === "shot") struck++; if (e.kind === "packSpecial") specials++; } });
      if (!struck || !specials) bad.push(`${k}: ${struck} strikes, ${specials} specials`);
    }
    expect(bad).toEqual([]);
  }, 300000);

  it("knockback: the ram's special is its charge, and that blow throws her its throw, exactly", () => {
    const want = (PACKS.specials.knockback.throw ?? 10) * FIGHT.scale, thrown: number[] = [];
    let rams = 0;
    const armed = new Set<number>();
    let lastAt = -Infinity;
    arena("pack-ram", 60, g => {
      const W = g.witches[0];
      for (const e of fresh(g)) if (e.kind === "packSpecial" && g.creatures[e.id!]?.charge) rams++;
      for (const c of g.creatures) if (c?.packThrow) armed.add(c.id);
      // (only a knock new this step, and from one blow: a throw spent inside her hit's grace throws nothing, and the knock on her is
      // another blow's, an older one or another ram's charge landing the same step)
      const blows = fresh(g).filter(e => e.kind === "witchHit").length;
      const fresh1 = blows === 1 && !!W.knock && W.knock.at !== lastAt && W.knock.at >= g.herTime - STEP * 1.5;
      for (const id of [...armed]) if (!g.creatures[id].packThrow) { armed.delete(id); if (fresh1) thrown.push(Math.hypot(W.knock!.kx, W.knock!.kz) / g.tuning.witch.knock.ease); }
      lastAt = W.knock?.at ?? -Infinity;
    });
    expect(rams).toBeGreaterThan(0);
    expect(thrown.length).toBeGreaterThan(0);
    for (const m of thrown) { expect(m).toBeGreaterThan(want * 0.6); expect(m).toBeLessThanOrEqual(want * 1.01); } // (adults' throw; a young pack's a little less)
  }, 120000);

  it("pull: the spider's web line drags her toward it, no hurt", () => {
    const drags: number[] = [];
    let at = -1, from = 0, by = -1;
    arena("pack-spider", 60, g => {
      const W = g.witches[0].body;
      for (const e of fresh(g)) if (e.kind === "packPull") { at = g.clock.time; by = e.id!; from = Math.hypot(W.x - g.creatures[by].x, W.z - g.creatures[by].z); }
      if (at >= 0 && g.clock.time >= at + 0.8) { const c = g.creatures[by]; drags.push(from - Math.hypot(W.x - c.x, W.z - c.z)); at = -1; }
    });
    expect(drags.length).toBeGreaterThan(0);
    expect(Math.max(...drags)).toBeGreaterThan(3); // (6 m an adult's, a young one's 0.7 of it, the spider moving meanwhile)
  }, 120000);

  it("decoy: a 💌 the waving raccoon catches is wasted, its meter untouched (Ed, 2026-10-23: \"otherwise it's not a decoy\")", () => {
    // (one of the pack across the arena waving, she throwing straight at it: before it's on her and she's staggered)
    const g = newGame(5, ON); g.clock.paused = false; g.party.paused = true;
    setupArena(g, "pack-raccoon");
    const W = g.witches[0], c = g.creatures.filter(k => k?.species === "raccoon" && !k.leashed && k.level === 2).sort((p, q) => Math.hypot(p.x - W.body.x, p.z - W.body.z) - Math.hypot(q.x - W.body.x, q.z - W.body.z))[0];
    let caught = 0, landed = 0;
    const seen = new Set<object>(); // (her 💌s' events, each once: they run on her clock)
    for (let i = 0; i < 2 / STEP; i++) {
      g.combat.decoys = [{ id: c.id, until: g.clock.time + 1, r: (PACKS.specials.decoy.radius ?? 3) * FIGHT.scale, side: "wild" }];
      W.health.hp = 1e6; stepGame(g, { ...idle, fire: true, aimX: c.x - W.body.x, aimZ: c.z - W.body.z }, STEP);
      for (const e of W.invites.events) if (!seen.has(e)) { seen.add(e); if (e.kind === "fizzled") caught++; if (e.kind === "hit" && e.id === c.id) landed++; }
    }
    expect(caught).toBeGreaterThan(0);
    expect(landed).toBe(0);
  }, 120000);

  it("decoy: the raccoon waving catches her 💌s for its time", () => {
    let seen = 0, lasted = 0;
    arena("pack-raccoon", 60, g => {
      const d = g.combat.decoys ?? [];
      if (d.length) {
        seen++;
        for (const q of d) { expect(g.creatures[q.id].species).toBe("raccoon"); expect(q.r).toBeGreaterThan(1); lasted = Math.max(lasted, q.until - g.clock.time); }
        // (what her 💌s meet: the one waving, where it stands now, as wide as its radius)
        const c = g.creatures[d[0].id];
        expect(mirageDecoys(g, g.clock.time).some(x => x.x === c.x && x.z === c.z && x.r === d[0].r)).toBe(true);
      }
    });
    expect(seen).toBeGreaterThan(0);
    expect(lasted).toBeLessThanOrEqual((PACKS.specials.decoy.time ?? 3) + 1e-6);
  }, 120000);
});

describe("pack combat, the fantastic kinds (step 3, 2026-10-23)", () => {
  it("the sphinx's riddle turns her aim; the feathered serpent's plumes are mirages that take her 💌s", () => {
    let riddled = false, plumes = 0;
    arena("pack-sphinx", 60, g => { if (g.witches[0].confused && g.clock.time < g.witches[0].confused.until && !g.witches[0].confused.move) riddled = true; });
    arena("pack-featheredserpent", 60, g => { plumes = Math.max(plumes, (g.combat.mirages ?? []).filter(m => m.species === "featheredserpent").length); });
    expect(riddled).toBe(true);
    expect(plumes).toBeGreaterThan(0);
  }, 120000);
});

describe("pack combat, mind control (the owl, the unicorn; 2026-10-23)", () => {
  it("a wild adult unicorn's glow turns one of her animals on her for its time, and then it's hers again", () => {
    const T = PACKS.specials.mind.time ?? 3;
    let turned = -1, at = 0, onHer = 0, back = false;
    arena("fox*3@1,unicorn*3@2", 60, g => {
      for (const e of fresh(g)) if (e.kind === "packMind" && turned < 0) { turned = e.id!; at = g.clock.time; }
      if (turned < 0) return;
      const c = g.creatures[turned];
      if (c.mind && c.fight?.target?.kind === "witch") onHer++;
      if (g.clock.time > at + T + 0.5 && !c.mind) back = true;
    });
    expect(turned).toBeGreaterThanOrEqual(0);
    expect(onHer).toBeGreaterThan(0);
    expect(back).toBe(true);
  }, 120000);
  it("with none of hers near, its glow turns her aim instead", () => {
    let riddled = false;
    arena("pack-unicorn", 90, g => { const v = g.witches[0]; if (v.confused && g.clock.time < v.confused.until) riddled = true; }); // (90 s: with creature momentum, 2026-10-27, the first glow at her comes at about 63 s)
    expect(riddled).toBe(true);
  }, 120000);
});

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

  it("the toad's spores leave a slowing patch", () => {
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
    const g = newGame(123, withTuning({ combat: { ...TUNING.combat, packs: { on: packs } }, attacks: { reactionFloor: 0.45, species: false } })); // (the hares' lunges, as they were)
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
describe("the lull is a retreat, not a halt (Ed's playtests, 2026-10-23: \"lulls between pack attacks seem to have the animals stand still instead of retreat\")", () => {
  // Every kind whose retreat isn't meant to stand (the snail's shell, the badger's hold) backs off from her in its lull and keeps moving
  // till it comes again, a freeze (combat.md "into the trees and freeze, hard to see") after holding the lull's first part (Ed,
  // 2026-10-23); one out of sight (in the trees, underground, under water) isn't counted.
  const standing = (k: string) => !!PACKS.retreats[PACKS.kinds[k].retreat].still;
  it("every moving kind's members back off from her and keep moving through the lull", () => {
    const bad: string[] = [];
    for (const k of Object.keys(PACKS.kinds)) {
      if (standing(k)) continue;
      let steps = 0, still = 0, starts = 0, backed = 0, last = "";
      const mv = profileOf(k)?.move, out = mv?.kind === "swoop" ? mv.radius ?? 0 : PACKS.retreats[PACKS.kinds[k].retreat].out; // (a wild flyer circles aloft at its swoop's own radius)
      const away = out * FIGHT.scale * 0.8 * (PACKS.kinds[k].retreat === "leapfrog" ? 0.5 : 1); // (the leapfrog's near half falls back half as far)
      const off = (d0: number, most = 0) => most > d0 + 1 || d0 >= away; // (backed off, or out there already: a shooter at range, a flyer aloft)
      const startD = new Map<number, number>(), most = new Map<number, number>();
      // (a freeze over two arenas: how long one holds its place depends on where the fight takes it, and one arena's share swings
      // either side of the 3% line with anything near it, as much as 4.2 to 2.3% on seed 5 for the creatures keeping off sigils, 2026-10-28)
      for (const seed of PACKS.kinds[k].retreat === "freeze" ? [5, 6] : [5]) arena(`pack-${k}`, 30, g => {
        const st = wildPack(g), W = g.witches[0].body;
        if (!st) return;
        if (st.phase === "lull" && last !== "lull") { for (const [id, d0] of startD) { starts++; if (off(d0, most.get(id))) backed++; } startD.clear(); most.clear(); }
        last = st.phase;
        if (st.phase !== "lull") return;
        for (const id of st.members) {
          const c = g.creatures[id]; if (!c || c.packHide || c.burrow || c.leap || c.charge) continue;
          const d = Math.hypot(c.x - W.x, c.z - W.z);
          if (!startD.has(id)) startD.set(id, d); most.set(id, Math.max(most.get(id) ?? 0, d));
          steps++; if (!c.moving) still++;
        }
      }, ON, seed);
      for (const [id, d0] of startD) { starts++; if (off(d0, most.get(id))) backed++; }
      if (!steps) { bad.push(`${k}: no lull`); continue; }
      if (still / steps > (PACKS.kinds[k].retreat === "freeze" ? PACKS.prowl.freeze + 0.1 : 0.1)) bad.push(`${k}: standing ${(100 * still / steps).toFixed(0)}% of its lull`);
      if (backed < starts * 0.6) bad.push(`${k}: ${backed} of ${starts} backed off`);
      if (PACKS.kinds[k].retreat === "freeze" && still / steps < 0.03) bad.push(`${k}: no freeze (still ${(100 * still / steps).toFixed(0)}%)`);
    }
    expect(bad).toEqual([]);
  }, 300000);
});

describe("pack combat's fixes (Ed, 2026-10-20)", () => {
  const at = (id: number, x: number, z: number, hp?: number): Creature => ({ id, species: "boar", level: 1, x, z, ...(hp !== undefined ? { affection: 0.99 } : {}) }) as Creature; // (hurt: its slots nearly full, rules/orbit.ts)

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
    boar.affection = 0.99; boar.affectionAt = g.clock.time; // (its slots nearly full: rules/orbit.ts)
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

// Kinds keep their own moves (config/movement.json) inside a pack (Ed, 2026-10-20: "Kinds keep their movement.json moves within pack
// combat: charges, dives, burrowing, screeches, slime and the wolves surrounding her"). A pack of each, her standing, 30 s: each of
// these would have caught the loss (in a pack only the boar's stampede charged, and the toad's cloud leapt).
describe("kinds keep their own moves in a pack (Ed, 2026-10-20)", () => {
  /** The wild members of a kind's pack in the arena (hers a baby, gone), and `each` step with them. */
  function wild(kind: string, spec: string, secs: number, each: (g: Game, them: Creature[]) => void): Game {
    let ids: number[] | null = null;
    return arena(spec, secs, g => {
      ids ??= g.arena!.ids.filter(id => g.creatures[id].species === kind && !g.creatures[id].leashed);
      each(g, ids.map(id => g.creatures[id]));
    });
  }
  /** At most this many of them striking at her at once (winding up, lunging, charging, leaping, diving): the dodge's tokens. */
  const cap = Math.max(TUNING.dodge!.a.tokens, TUNING.dodge!.a.swarmTokens);
  const atHer = (them: Creature[]) => them.filter(c => c.fight?.target?.kind === "witch" && strikingNow(c)).length;

  it("charges: a boar's strike is its charge, on its turn (before the special), and the toad's its leap; one at a time at her", () => {
    let early = 0, leaps = 0, most = 0;
    const was = new Map<number, boolean>();
    wild("boar", "boar*1@0,boar*2@1,boar*2@2", 30, (g, them) => {
      const st = wildPack(g);
      for (const c of them) { if (c.charge && !was.get(c.id) && st?.phase === "combo" && st.step < 2) early++; was.set(c.id, !!c.charge); }
      most = Math.max(most, atHer(them));
    });
    wild("toad", "toad*1@0,toad*2@1,toad*2@2", 30, (_g, them) => {
      for (const c of them) { if (c.leap && !c.leap.cloud && !was.get(c.id)) leaps++; was.set(c.id, !!c.leap); }
      most = Math.max(most, atHer(them));
    });
    expect(early).toBeGreaterThanOrEqual(2); // (its lunger's charge; before, only the stampede's, the combo's last step)
    expect(leaps).toBeGreaterThanOrEqual(2); // (its own leap and slam; before, only its cloud's)
    expect(most).toBeLessThanOrEqual(cap); // (the stampede too: one after another)
  }, 60000);

  it("dives: wild bats and ravens circle aloft and dive at her on their pack's turn, one at a time", () => {
    for (const k of ["bat", "raven"]) {
      let dives = 0, most = 0;
      wild(k, `${k}*1@0,${k}*2@1,${k}*2@2`, 30, (g, them) => {
        const ids = new Set(them.map(c => c.id));
        dives += fresh(g).filter(e => e.kind === "swooped" && ids.has(e.id!)).length;
        most = Math.max(most, them.filter(c => c.fight?.target?.kind === "witch" && strikingNow(c)).length);
      });
      expect(dives, k).toBeGreaterThanOrEqual(2);
      expect(most, k).toBeLessThanOrEqual(cap);
    }
  }, 60000);

  it("burrowing: a mole pack's lunger goes under to her and comes up striking", () => {
    let under = 0, up = 0;
    wild("mole", "mole*1@0,mole*2@1,mole*2@2", 30, (g, them) => {
      const ids = new Set(them.map(c => c.id));
      for (const e of fresh(g)) if (ids.has(e.id!)) { if (e.kind === "burrowed") under++; if (e.kind === "surfaced") up++; }
    });
    expect(under).toBeGreaterThanOrEqual(2);
    expect(up).toBeGreaterThanOrEqual(1);
  }, 60000);

  it("screeches: her bats in a pack strike with their screech, a pulse all round them", () => {
    let pulses = 0;
    arena("hers-bat", 30, g => { pulses += fresh(g).filter(e => e.kind === "pulse" && g.creatures[e.id!]?.species === "bat").length; }, ON_OLD);
    expect(pulses).toBeGreaterThanOrEqual(2);
  }, 60000);

  it("slime: a snail pack leaves its slime trail as it goes, besides its wall", () => {
    const r = (profileOf("snail")!.move!.radius ?? 2.5) * TUNING.fight.scale, slime = new Set<object>();
    wild("snail", "snail*1@0,snail*2@1,snail*2@2", 20, (g, them) => { const ids = new Set(them.map(c => c.id)); for (const tr of g.combat.trails) if (ids.has(tr.from) && Math.abs(tr.r - r) < 1e-6) slime.add(tr); });
    expect(slime.size).toBeGreaterThan(10);
  }, 60000);

  it("the wolves surround her: waiting their turns (its approach and its tell) they go round her to their places, not straight in", () => {
    let turn = 0, t = 0;
    const last = new Map<number, number>();
    wild("wolf", "wolf*1@0,wolf*6@2", 30, (g, them) => {
      const st = wildPack(g), w = g.witches[0].body;
      for (const c of them) {
        const a = Math.atan2(c.z - w.z, c.x - w.x), was = last.get(c.id);
        last.set(c.id, a);
        if ((st?.phase !== "approach" && st?.phase !== "tell") || was === undefined || c.gone) continue;
        turn += Math.abs(((a - was + Math.PI * 3) % (Math.PI * 2)) - Math.PI); t += STEP;
      }
    });
    expect(t).toBeGreaterThan(5);
    expect((turn / t) * (180 / Math.PI)).toBeGreaterThan(25); // (degrees a second round her: about 45 to 55, 12 to 22 before, straight in from where they came; about 30 with creature momentum, 2026-10-27: they can't whip round her at a run)
  }, 60000);
});
