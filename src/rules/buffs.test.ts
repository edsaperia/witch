import { describe, expect, it } from "vitest";
import { LEGEND_BUFFS, MOD_KINDS, buffedTuning, modsOf, newBuffs, noMods, stepBuffs, type BuffDef, type BuffMods } from "./buffs";
import { LEGEND, spawnCreatures, type Creature } from "./creatures";
import { AREA_TYPES, generateMap } from "./map";
import { newGame, stepGame, STEP, type Controls } from "./game";
import { TUNING } from "./tuning";
import { newInvites, stepInvites, type Affection } from "./invites";
import { dashing, newDash, refundDash, startDash } from "./dash";
import { newWitch } from "./witch";

const t = TUNING, B = LEGEND_BUFFS, H = B.how;
const defs = (...sp: string[]): BuffDef[] => sp.map(s => B.species[s]);
const mods = (...sp: string[]): BuffMods => modsOf(defs(...sp));

// 💌s on a small field: her at the origin, creatures where put; an affection that counts hits.
const her = { x: 0, z: 0, facing: 1 };
const critter = (id: number, x: number, z: number, more: Partial<Creature> = {}) => ({ id, species: "wolf", level: 1, x, z, leashed: false, gone: false, ...more }) as Creature;
function counting(): Affection & { hits: Map<number, number> } {
  const hits = new Map<number, number>();
  return { hits, invitable: c => !c.leashed && !c.enraged && !c.boss, blocksLetters: c => !!c.enraged || !!c.boss, hit: c => hits.set(c.id, (hits.get(c.id) ?? 0) + 1), affection: () => null };
}
/** Fire (held for `hold` seconds, or one press) toward aim with these buffs for `seconds`; what happened. */
function shoot(sp: string[], creatures: Creature[], seconds: number, o: { aim?: [number, number]; hold?: number; at?: { x: number; z: number; facing: number } } = {}) {
  const M = mods(...sp), tt = buffedTuning(t, defs(...sp)), A = counting(), s = newInvites(), ev: { kind: string; id?: number; spent?: boolean }[] = [];
  let most = 0, shots = 0;
  const aim = o.aim ?? [1, 0];
  for (let i = 0, time = 0; i < seconds / STEP; i++, time += STEP) {
    s.events = [];
    stepInvites(s, { fire: o.hold !== undefined ? time < o.hold : i === 0, aimX: aim[0], aimZ: aim[1] }, o.at ?? her, true, creatures, A, time, STEP, tt, M);
    ev.push(...s.events);
    shots += s.events.filter(e => e.kind === "shot").length;
    most = Math.max(most, s.letters.filter(L => !L.kind).length);
  }
  const hitIds = new Set(ev.filter(e => e.kind === "hit").map(e => e.id));
  return { s, ev, A, most, shots, hitIds };
}

describe("legend buffs, redesigned (Ed, 2026-10-05; #87)", () => {
  it("every species has a buff, all different, each only 💌s or her movement, inside the limits", () => {
    const species = new Set(AREA_TYPES.map(a => a.creature));
    expect(species.size).toBe(AREA_TYPES.filter(t => !t.sharesCreature).length);
    const seen = new Set<string>();
    for (const s of species) {
      const d = B.species[s];
      expect(d, s).toBeTruthy();
      expect(["shot", "move"]).toContain(d.kind);
      expect(d.label.length).toBeGreaterThan(0);
      const what = JSON.stringify([d.scale, d.add, d.mods]);
      expect(seen.has(what), `${s} duplicates another`).toBe(false);
      seen.add(what);
      // Only the 💌s, her blink, and her own movement.
      for (const p of [...Object.keys(d.scale ?? {}), ...Object.keys(d.add ?? {})]) expect(p).toMatch(/^(invites\.|dash\.|groundSpeed|groundAcceleration|treetopSpeed|treetop\.turnRate|riseTime|descendTime)/);
      for (const k of Object.keys(d.mods ?? {})) expect(MOD_KINDS).toContain(k);
      // Never a stronger 💌: nothing touches its affection.
      expect(Object.keys({ ...d.scale, ...d.add })).not.toContain("invites.amount");
      expect(Object.keys({ ...d.scale, ...d.add })).not.toContain("invites.perAnimalHitGap");
    }
    expect(Object.keys(B.species).every(s => species.has(s))).toBe(true);
    expect(B.species.owl.name).toBe("Echo");
  });

  it("stack: scales multiply, adds and mods add, each held inside its limits; the tuning changes only where buffed", () => {
    expect(buffedTuning(t, [])).toBe(t);
    const b = buffedTuning(t, defs("snake", "snake", "moth", "hedgehog"));
    expect(b.invites.speed).toBeCloseTo(t.invites.speed * B.species.snake.scale!["invites.speed"] ** 2);
    expect(b.invites.burst).toBe(t.invites.burst + 1);
    expect(b.dash.gone).toBeCloseTo(t.dash.gone + 0.35);
    expect(b.invites.amount).toBe(t.invites.amount);
    expect(b.groundSpeed).toBe(t.groundSpeed);
    expect({ ...b, invites: t.invites, dash: t.dash }).toEqual(t);
    expect(buffedTuning(t, defs(...Array(20).fill("snake"))).invites.speed).toBe(B.limits["invites.speed"][1]);
    expect(mods("stag", "stag").pierce).toBe(2);
    expect(mods(...Array(9).fill("stag")).pierce).toBe(B.limits["mods.pierce"][1]);
    expect(mods()).toEqual(noMods());
  });

  it("is on while a legend gives it (happy, its quest done, or in the party), gained and lost; ?buffs= forces some on", () => {
    const map = generateMap(123, t), cs = spawnCreatures(map), s = newBuffs(t), [a, b, wild] = cs;
    Object.assign(a, { leashed: false, level: LEGEND, legendState: "happy", species: "snake" }); Object.assign(b, { leashed: true, level: 2 }); Object.assign(wild, { leashed: false, level: LEGEND, legendState: "asleep" });
    stepBuffs(s, cs, [a.id, b.id, wild.id], t);
    expect(s.active.map(x => x.id)).toEqual([a.id]);
    expect(s.events).toEqual([{ kind: "gained", id: a.id, species: "snake", label: B.species.snake.label }]);
    expect(s.tuning.invites.speed).toBeGreaterThan(t.invites.speed);
    wild.buffed = true; // (its quest done)
    stepBuffs(s, cs, [a.id, wild.id], t);
    expect(s.active.map(x => x.id)).toEqual([a.id, wild.id]);
    a.legendState = "asleep";
    stepBuffs(s, cs, [a.id, wild.id], t);
    expect(s.events.map(e => e.kind)).toEqual(["lost"]);
    const f = newBuffs(t, ["fox", "toad", "stag"]);
    stepBuffs(f, cs, [], t);
    expect(f.active.map(x => x.species)).toEqual(["fox", "toad", "stag"]);
    expect(f.mods.charm + f.mods.split + f.mods.pierce).toBe(3);
  });

  // The 💌 shots.
  it("Flutter (moth): one more volley a burst", () => {
    expect(shoot(["moth"], [], 0.9).shots).toBe(shoot([], [], 0.9).shots + 1);
  });
  it("Fan (beetle): each shot a 3-way spread", () => {
    expect(shoot(["beetle"], [], 0.05).most).toBe(3);
  });
  it("Rear guard (woodlouse): a 💌 behind her each burst", () => {
    const back = critter(1, -8, 0), { A } = shoot(["woodlouse"], [back], 1);
    expect(A.hits.get(1)).toBe(1);
    expect(shoot([], [critter(1, -8, 0)], 1).A.hits.get(1)).toBeUndefined();
  });
  it("Howl (wolf): every 5th burst a ring of 💌s round her", () => {
    const ring = H.ring.letters, a = shoot(["wolf"], [], 5, { hold: 5 }), b = shoot([], [], 5, { hold: 5 });
    expect(a.most).toBeGreaterThanOrEqual(ring);
    expect(b.most).toBeLessThan(ring);
  });
  it("Wind-up (bear): held, it charges; let go, a big volley", () => {
    const { s, most } = shoot(["bear"], [], 2.2, { hold: 1.8 });
    expect(most).toBeGreaterThanOrEqual(H.charge.letters * 0.8);
    expect(s.chargeFrom).toBeNull();
  });
  it("Echo (owl): each burst fires again half a second later", () => {
    const a = shoot(["owl"], [], 0.9), b = shoot([], [], 0.9);
    expect(a.shots).toBe(b.shots * 2);
  });
  it("Quick fire (salamander), Strike (snake), Long thread (spider), Big heart (badger): numbers", () => {
    const q = buffedTuning(t, defs("salamander", "snake", "spider", "badger"));
    expect(q.invites.cooldown).toBeLessThan(t.invites.cooldown);
    expect(q.invites.speed).toBeGreaterThan(t.invites.speed);
    expect(q.invites.range).toBeGreaterThan(t.invites.range);
    expect(q.invites.radius).toBeGreaterThan(t.invites.radius);
    // Long thread: one beyond the plain range is reached.
    const far = t.invites.range + 6;
    expect(shoot(["spider"], [critter(1, far, 0)], 2).A.hits.get(1)).toBe(1);
    expect(shoot([], [critter(1, far, 0)], 2).A.hits.get(1)).toBeUndefined();
    // Big heart: one off its line is landed on.
    expect(shoot(["badger"], [critter(1, 10, 1.4)], 1, { aim: [1, 0] }).A.hits.get(1) ?? 0).toBeGreaterThanOrEqual(shoot([], [critter(1, 10, 1.4)], 1).A.hits.get(1) ?? 0);
  });
  it("Charm (fox): 💌s home in on an animal well off their line", () => {
    const off = () => [critter(1, 6, 7)];
    expect(shoot(["fox"], off(), 1.5).A.hits.get(1)).toBe(1);
    expect(shoot([], off(), 1.5).A.hits.get(1)).toBeUndefined();
  });
  it("Pierce (stag): on through the first animal to the one behind", () => {
    const line = () => [critter(1, 6, 0), critter(2, 12, 0)];
    const a = shoot(["stag"], line(), 1.5, { aim: [1, 0] }), b = shoot([], line(), 1.5, { aim: [1, 0] });
    expect(a.hitIds.has(2)).toBe(true);
    expect(b.hitIds.has(2)).toBe(false);
  });
  it("Skimming stone (otter): bounces on to another animal", () => {
    const two = () => [critter(1, 8, 0), critter(2, 8, 9)];
    expect(shoot(["otter"], two(), 1.5).hitIds.has(2)).toBe(true);
    expect(shoot([], two(), 1.5).hitIds.has(2)).toBe(false);
  });
  it("Spawn (toad): one that lands splits into 3 small ones", () => {
    const fan = () => [critter(1, 6, 0), critter(2, 10, 2.6), critter(3, 10, -2.6)];
    const a = shoot(["toad"], fan(), 1.5), b = shoot([], fan(), 1.5);
    expect(a.hitIds.size).toBeGreaterThan(b.hitIds.size);
  });
  it("Spiral (snail): 💌s come back to her, landing on the way", () => {
    // It steps onto their path once they've gone out past it: only ones coming back meet it.
    const run = (sp: string[]) => {
      const M = mods(...sp), A = counting(), s = newInvites(), c = critter(1, 6, 30);
      for (let i = 0, time = 0; i < 3 / STEP; i++, time += STEP) {
        s.events = [];
        if (time > 0.55) Object.assign(c, { x: 6, z: 0.2 });
        stepInvites(s, { fire: i === 0, aimX: 1, aimZ: 0 }, her, true, [c], A, time, STEP, t, M);
      }
      return { A, s };
    };
    const { A, s } = run(["snail"]);
    expect(A.hits.get(1)).toBe(1);
    expect(s.letters.length).toBe(0); // (all caught, or landed)
    expect(run([]).A.hits.get(1)).toBeUndefined();
  });
  it("Slip past (elk): 💌s slip through the enraged (not legends)", () => {
    const wall = () => [critter(2, 5, 0, { enraged: true }), critter(1, 10, 0)];
    expect(shoot(["elk"], wall(), 1).A.hits.get(1)).toBe(1);
    expect(shoot([], wall(), 1).A.hits.get(1)).toBeUndefined();
    expect(shoot(["elk"], [critter(2, 5, 0, { boss: true, level: 3 }), critter(1, 10, 0)], 1).A.hits.get(1)).toBeUndefined();
  });
  it("Lanterns (glow-worm): a glowing trail that lands on an animal walking into it", () => {
    const M = mods("glowworm"), A = counting(), s = newInvites(), c = critter(1, 6, 20);
    for (let i = 0, time = 0; i < 0.5 / STEP; i++, time += STEP) {
      s.events = [];
      if (time > 0.3) Object.assign(c, { x: 6, z: 0.2 }); // (it steps onto the path after the letters have passed)
      stepInvites(s, { fire: i === 0, aimX: 1, aimZ: 0 }, her, true, [c], A, time, STEP, t, M);
    }
    expect(A.hits.get(1)).toBe(1);
  });
  it("Cache (squirrel): a 💌 waits on the ground and flies at an animal that comes near", () => {
    const M = mods("squirrel"), A = counting(), s = newInvites(), c = critter(1, 60, 0);
    for (let i = 0, time = 0; i < 4 / STEP; i++, time += STEP) {
      s.events = [];
      if (time > 2) Object.assign(c, { x: 4, z: -3 });
      stepInvites(s, { fire: i === 0, aimX: 0, aimZ: 1 }, her, true, [c], A, time, STEP, t, M);
      if (time < 1.9) expect(s.letters.filter(L => L.kind === "cache").length).toBeLessThanOrEqual(1);
    }
    expect(A.hits.get(1)).toBe(1);
  });
  it("Lullaby orbit (dormouse): two 💌s circle her and fly at an animal close by", () => {
    const M = mods("dormouse"), A = counting(), s = newInvites(), c = critter(1, 50, 0);
    let circling = 0;
    for (let i = 0, time = 0; i < 3 / STEP; i++, time += STEP) {
      s.events = [];
      if (time > 1) Object.assign(c, { x: 7, z: 0 });
      stepInvites(s, {}, her, true, [c], A, time, STEP, t, M);
      if (time < 1) circling = s.letters.filter(L => L.kind === "orbit").length;
    }
    expect(circling).toBe(H.orbit.letters);
    expect(A.hits.get(1)).toBeGreaterThanOrEqual(1);
  });
  it("stacked shots still give any one animal at most one 💌 every perAnimalHitGap", () => {
    const { A, ev } = shoot(["beetle", "beetle", "owl", "moth", "stag", "otter", "toad", "fox"], [critter(1, 8, 0)], 0.45, { aim: [1, 0] });
    expect(ev.filter(e => e.kind === "hit" && e.id === 1).length).toBeGreaterThan(3);
    expect(A.hits.get(1)).toBe(1);
  });

  // Movement.
  const W = () => ({ ...newWitch(0, 0), mode: "ground" as const });
  const bounds = { minX: -1e4, maxX: 1e4, minZ: -1e4, maxZ: 1e4 };
  it("Dash bursts (hare): 3 blinks, recharging one at a time; Frenzy (stoat) gives one back", () => {
    const d = newDash(), tt = buffedTuning(t, defs("hare")), max = 1 + mods("hare").charges;
    d.charges = max; // (full)
    let n = 0;
    for (let time = 0; time < 0.9; time += 0.25) if (startDash(d, W(), 1, 0, time, tt, bounds, undefined, max, H.charges.chain)) n++;
    expect(n).toBe(3);
    expect(startDash(d, W(), 1, 0, 0.95, tt, bounds, undefined, max, H.charges.chain)).toBe(false);
    expect(startDash(d, W(), 1, 0, tt.dash.cooldown + 0.05, tt, bounds, undefined, max, H.charges.chain)).toBe(true); // one back
    expect(startDash(d, W(), 1, 0, tt.dash.cooldown + 0.3, tt, bounds, undefined, max, H.charges.chain)).toBe(false);
    refundDash(d, tt.dash.cooldown + 0.31, max);
    expect(startDash(d, W(), 1, 0, tt.dash.cooldown + 0.32, tt, bounds, undefined, max, H.charges.chain)).toBe(true);
    // Unbuffed: one, then the cooldown.
    const e = newDash();
    expect(startDash(e, W(), 1, 0, 0, t, bounds)).toBe(true);
    expect(startDash(e, W(), 1, 0, 0.5, t, bounds)).toBe(false);
    expect(startDash(e, W(), 1, 0, t.dash.cooldown + 0.01, t, bounds)).toBe(true);
  });
  it("Flit (bat) blinks further; Curl (hedgehog) is untouchable longer", () => {
    const d = newDash(), tt = buffedTuning(t, defs("bat", "hedgehog"));
    startDash(d, W(), 1, 0, 0, tt, bounds);
    expect(d.toX).toBeCloseTo(t.dash.distance * 1.5);
    expect(dashing(d, t.dash.gone + 0.2)).toBe(true);
  });

  const ctl = (more: Partial<Controls> = {}): Controls => ({ moveX: 1, moveZ: 0, toggleMode: false, zoom: 0, ...more });
  /** How far she goes on the ground in `secs` with these buffs (and controls each step). */
  function walk(sp: string[], secs: number, each: (i: number) => Partial<Controls> = () => ({})): number {
    const g = newGame(7, t);
    g.clock.paused = false; g.party.paused = true; g.buffs.forced = sp;
    g.witch = { ...g.witch, seated: false, mode: "ground", lift: 0 };
    g.witches[0].health.hp = 1e6;
    const x0 = g.witch.x;
    for (let i = 0; i < secs / STEP; i++) stepGame(g, ctl(each(i)), STEP);
    return g.witch.x - x0;
  }
  it("Scamper (marten): faster on the ground; Momentum (boar): faster after a blink; Steady (ram): no slowing while firing", () => {
    expect(walk(["marten"], 1) / walk([], 1)).toBeGreaterThan(1.12);
    const blink = (i: number) => ({ dash: i === 0 });
    expect(walk(["boar"], 1.5, blink) - walk([], 1.5, blink)).toBeGreaterThan(3);
    const fire = () => ({ fire: true, aimX: 0, aimZ: 1 });
    expect(walk([], 1, fire)).toBeLessThan(walk([], 1) * 0.9);
    expect(walk(["ram"], 1, fire)).toBeCloseTo(walk([], 1), 0);
  }, 60000);
  it("Decoy (beaver): blinking leaves a waiting 💌 where she was", () => {
    const g = newGame(7, t);
    g.clock.paused = false; g.party.paused = true; g.buffs.forced = ["beaver"];
    g.witch = { ...g.witch, seated: false, mode: "ground", lift: 0 };
    const x0 = g.witch.x;
    stepGame(g, ctl({ dash: true }), STEP);
    const cache = g.witches[0].invites.letters.find(L => L.kind === "cache");
    expect(cache).toBeDefined();
    expect(Math.abs(cache!.x - x0)).toBeLessThan(1);
  }, 60000);
  it("Poise (lynx): quicker starts; Wings (raven): faster in the treetops; Burrow (mole): rise and land faster", () => {
    expect(walk(["lynx"], 0.1) / walk([], 0.1)).toBeGreaterThan(1.1);
    const b = buffedTuning(t, defs("raven", "mole"));
    expect(b.treetopSpeed).toBeGreaterThan(t.treetopSpeed);
    expect(b.riseTime).toBeLessThan(t.riseTime);
    expect(b.descendTime).toBeLessThan(t.descendTime);
  }, 60000);
});

describe("buff strength (legends.buffPower; Ed, 2026-10-06, on quests: \"Bigger buffs\")", () => {
  const S = LEGEND_BUFFS.species;
  it("leaves every buff as written at 1, and strengthens scales, adds and counts by it, inside their limits", () => {
    expect(TUNING.legends.buffPower).toBeGreaterThanOrEqual(1);
    const one = buffedTuning(TUNING, [S.snake], LEGEND_BUFFS, 1), two = buffedTuning(TUNING, [S.snake], LEGEND_BUFFS, 2);
    expect(one.invites.speed).toBeCloseTo(TUNING.invites.speed * S.snake.scale!["invites.speed"], 6);
    expect(two.invites.speed).toBeCloseTo(Math.min(LEGEND_BUFFS.limits["invites.speed"][1], TUNING.invites.speed * (1 + (S.snake.scale!["invites.speed"] - 1) * 2)), 6);
    const fast = buffedTuning(TUNING, [S.salamander], LEGEND_BUFFS, 2); // (a scale below 1: a shorter cooldown, held at its floor)
    expect(fast.invites.cooldown).toBeLessThan(buffedTuning(TUNING, [S.salamander], LEGEND_BUFFS, 1).invites.cooldown);
    expect(fast.invites.cooldown).toBeGreaterThanOrEqual(LEGEND_BUFFS.limits["invites.cooldown"][0]);
    expect(buffedTuning(TUNING, [S.moth], LEGEND_BUFFS, 2).invites.burst).toBe(TUNING.invites.burst + 2 * S.moth.add!["invites.burst"]);
    expect(modsOf([S.beetle], LEGEND_BUFFS, 1).fan).toBe(1);
    expect(modsOf([S.beetle], LEGEND_BUFFS, 2).fan).toBe(2);
    expect(modsOf([S.fox], LEGEND_BUFFS, 3).charm).toBe(1); // (a one-off behaviour stays one)
  });
});
