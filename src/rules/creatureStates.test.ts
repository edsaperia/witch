import { partySpots } from "./partyGuests";
import { describe, expect, it } from "vitest";
import type { Creature, Level } from "./creatures";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { TUNING } from "./tuning";
import { foes, stateOf, STATES, type State } from "./creatureStates";
import { affection, blocksLetters, hit, hold, invitable } from "./affection";
import { inviteCreature, newLeash } from "./leash";
import { startSiege } from "./combat";
import { cellKey } from "./party";

// Creature states (Ed, 2026-10-05; issue #87).
const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const run = (g: Game, secs: number, each?: () => void) => { for (let i = 0; i < Math.round(secs / STEP); i++) { stepGame(g, idle, STEP); each?.(); } };
function quiet(): Game {
  const g = newGame(77, TUNING);
  g.clock.paused = false;
  const d = g.map.dancefloor;
  g.witch = { ...g.witch, seated: false, x: d.x, z: d.z + 20, mode: "treetop", lift: 1 }; // (out of every fight herself)
  for (const c of g.creatures) if (Math.hypot(c.x - g.witch.x, c.z - g.witch.z) < 80) c.gone = true;
  g.witches[0].health.hp = 1e6;
  g.byArea = null;
  return g;
}
function place(g: Game, species: string, level: Level, dx: number, dz: number, state: State = "wild"): Creature {
  const w = g.witch, x = w.x + dx, z = w.z + dz;
  const c = g.creatures.find(k => !k.gone && !k.leashed && !k.boss && !(k as unknown as { used?: boolean }).used && Math.hypot(k.x - w.x, k.z - w.z) > 200)!;
  (c as unknown as { used: boolean }).used = true;
  Object.assign(c, { circle: undefined, species, level, x, z, tx: x, tz: z, homeX: x, homeZ: z, anchorX: x, anchorZ: z, safeR: undefined, seen: g.clock.time, hp: undefined, boss: false, siege: undefined, rest: 0, fight: undefined, enraged: false, state: undefined });
  c.cell = g.map.cellSafe(x, z).cell as [number, number];
  if (state === "happy") c.state = "happy";
  if (state === "enraged") { c.enraged = true; c.state = "enraged"; }
  if (state === "leashed") { inviteCreature(g.leash, c, x, z, g.clock.time); g.leash.stack = g.leash.stack.filter(i => i !== c.id); g.leash.placed.push({ id: c.id, x, z, at: g.clock.time }); }
  g.byArea = null;
  return c;
}
const targets = (a: Creature, b: Creature) => a.fight?.target?.kind === "creature" && a.fight.target.id === b.id;

describe("creature states (#87)", () => {
  it("has one table of who fights whom: leashed against wild and enraged, enraged against happy; wild ignores happy and enraged", () => {
    const S: State[] = ["wild", "happy", "leashed", "enraged"];
    const want = new Set(["leashed|wild", "enraged|leashed", "enraged|happy"]);
    for (const a of S) for (const b of S) expect(foes(a, b), `${a} ${b}`).toBe(want.has([a, b].sort().join("|")));
  });

  it("has wild and happy ignore each other, and wild and enraged too", () => {
    for (const other of ["happy", "enraged"] as const) {
      const g = quiet(), a = place(g, "wolf", 2, 0, 0), b = place(g, "boar", 2, 4, 0, other);
      let fought = false;
      run(g, 6, () => { if (targets(a, b) || targets(b, a)) fought = true; });
      expect(fought, other).toBe(false);
    }
  }, 60000);

  it("has the enraged attack the happy, the happy fight back, and leashed animals take on the wild", () => {
    let g = quiet(), e = place(g, "wolf", 2, 0, 0, "enraged"), h = place(g, "boar", 2, 5, 0, "happy");
    let ev = false, hv = false;
    run(g, 8, () => { if (targets(e, h)) ev = true; if (targets(h, e)) hv = true; });
    expect(ev).toBe(true);
    expect(hv).toBe(true);
    g = quiet(); const l = place(g, "wolf", 2, 0, 0, "leashed"), w = place(g, "boar", 2, 5, 0);
    let lw = false;
    run(g, 8, () => { if (targets(l, w) || targets(w, l)) lw = true; });
    expect(lw).toBe(true);
  }, 60000);

  it("never has a creature attack its own kind, whatever their states; enraged kin with no foe still besiege", () => {
    const g = quiet(), e = place(g, "wolf", 2, 0, 0, "enraged"), h = place(g, "wolf", 2, 4, 0, "happy"), l = place(g, "wolf", 2, -4, 0, "leashed");
    const key = cellKey(e.cell), at = { x: e.x + 20, z: e.z };
    g.combat.sounds.set(key, { hp: 100, max: 100, x: at.x, z: at.z, radius: 2 });
    e.siege = key;
    let kin = false;
    let sieged = false; run(g, 12, () => { for (const [a, b] of [[e, h], [e, l], [h, e], [l, e]]) if (targets(a, b)) kin = true; if (g.combat.events.some(v => v.kind === "soundHit")) sieged = true; });
    expect(kin).toBe(false);
    expect(sieged).toBe(true); // (not stuck: it went on with its siege, on the nearest soundsystem)
  }, 60000);

  it("dazes a knocked-down wild creature (nothing attacks it, it can still be invited), then it runs off", () => {
    const g = quiet(), w = place(g, "boar", 1, 4, 0), l = place(g, "wolf", 2, 0, 0, "leashed");
    w.hp = 0.5;
    let dazedAt = -1;
    run(g, 20, () => { if (dazedAt < 0 && w.dazed) dazedAt = g.clock.time; });
    expect(dazedAt).toBeGreaterThan(0);
    expect(w.fleeUntil).toBeTruthy(); // ran off once its daze was over
    // While dazed: untouched, and invitable.
    const g2 = quiet(), w2 = place(g2, "boar", 1, 4, 0), l2 = place(g2, "wolf", 2, 0, 0, "leashed");
    w2.hp = 0.5;
    for (let i = 0; i < 20 / STEP && !w2.dazed; i++) stepGame(g2, idle, STEP);
    expect(w2.dazed).toBe(true);
    const hp = w2.hp;
    run(g2, STATES.daze * 0.5, () => { expect(targets(l2, w2)).toBe(false); });
    expect(w2.hp).toBe(hp);
    expect(invitable(w2)).toBe(true);
    const world = { time: g2.clock.time, leash: (c: Creature) => inviteCreature(g2.leash, c, c.x, c.z, g2.clock.time) };
    for (let i = 0; i < 20 && stateOf(w2) === "wild"; i++) hit(world, w2, 1, g2.clock.time + i);
    expect(stateOf(w2)).toBe("happy");
    run(g2, STATES.daze);
    expect(w2.fleeUntil).toBeFalsy(); // happy now: it doesn't run off
    void l; void l2;
  }, 60000);

  it("has happy, leashed and enraged ones simply run off when knocked down", () => {
    const g = quiet(), e = place(g, "wolf", 2, 0, 0, "enraged"), h = place(g, "boar", 2, 5, 0, "happy");
    e.hp = 0.5;
    let dazed = false;
    run(g, 10, () => { if (e.dazed) dazed = true; });
    expect(e.fleeUntil).toBeTruthy();
    expect(dazed).toBe(false);
    void h;
  }, 60000);

  it("enrages an area's wild creatures when a wave puts a soundsystem there (their meters lost), never the happy ones, the leashed or babies", () => {
    const g = quiet(), w = place(g, "fox", 2, 0, 0), h = place(g, "fox", 2, 3, 0, "happy"), b = place(g, "fox", 0, -3, 0);
    w.affection = 0.5; w.affectionAt = g.clock.time;
    startSiege(g.combat, cellKey(w.cell), { x: w.x + 10, z: w.z }, w.cell, [w, h, b], TUNING);
    expect(stateOf(w)).toBe("enraged");
    expect(w.affection).toBeUndefined();
    expect(stateOf(h)).toBe("happy");
    expect(stateOf(b)).toBe("wild");
    expect(invitable(w)).toBe(false);
    expect(blocksLetters(w)).toBe(true);
  });

  it("fills the 💌 meter: more hits at higher levels, one counted per creature every gap, draining slowly; full, it's happy, and full again (states.leash 'again') it's leashed", () => {
    const g = quiet(), leash = newLeash();
    for (const level of [0, 1, 2] as const) {
      const c = place(g, "hare", level, level * 5, 0), world = { time: 0, leash: (k: Creature) => inviteCreature(leash, k, k.x, k.z, 0) };
      const need = STATES.affection.hits[level];
      let t = 100;
      for (let i = 0; i < need - 1; i++, t += STATES.affection.gap) expect(hit(world, c, 1, t)).toBe(true);
      expect(stateOf(c)).toBe("wild");
      expect(hit(world, c, 1, t - STATES.affection.gap * 0.5)).toBe(false); // too soon after the last
      expect(affection({ time: t }, c)).toBeCloseTo((need - 1) / need, 5);
      expect(affection({ time: t + STATES.affection.drainDelay + 2 }, c)!).toBeLessThan((need - 1) / need); // draining
      hit(world, c, 1, t);
      expect(stateOf(c)).toBe("happy");
      for (let i = 0; i < need; i++) hit(world, c, 1, t + 1 + i * STATES.affection.gap);
      expect(c.leashed).toBe(true);
      expect(leash.stack).toContain(c.id);
    }
  });

  it("leashes a happy one held on for holdTime (states.leash 'hold'), starting over if let go", () => {
    const g = quiet(), leash = newLeash(), c = place(g, "hare", 1, 0, 0, "happy"), saved = STATES.leash, world = { time: 0, leash: (k: Creature) => inviteCreature(leash, k, k.x, k.z, 0) };
    STATES.leash = "hold";
    try {
      let t = 0;
      for (; t < STATES.holdTime * 0.6; t += 0.1) expect(hold(world, c, 0.1, t)).toBe(false);
      t += 1; // let go a while
      let n = 0;
      while (!hold(world, c, 0.1, t) && n < 100) { t += 0.1; n++; }
      expect((n + 1) * 0.1).toBeGreaterThanOrEqual(STATES.holdTime - 0.11); // it started over
      expect(c.leashed).toBe(true);
    } finally { STATES.leash = saved; }
  });

  it("has legends and enraged ones stop 💌s, and never be invited", () => {
    const g = quiet(), L = g.creatures.find(c => c.boss)!, e = place(g, "wolf", 2, 0, 0, "enraged");
    expect(blocksLetters(L)).toBe(true);
    expect(invitable(L)).toBe(false);
    expect(blocksLetters(e)).toBe(true);
    expect(hit({ time: 0, leash: () => {} }, e, 5, 0)).toBe(false);
  });

  it("has happy ones dance round their area's new soundsystem or at its party places (rules/partyGuests.ts)", () => {
    const g = quiet(), h = place(g, "fox", 2, 0, 0, "happy"), key = cellKey(h.cell), site = g.map.soundsystemSpot(h.cell[0], h.cell[1]);
    g.party.areas.set(key, { cell: h.cell, soundsystem: site, at: g.clock.time } as never);
    run(g, 0.2);
    expect(h.dancing).toBe(true);
    // by the soundsystem, or at one of the party places, in a slot round it (partyGuests.ts guestSlot)
    const places = [site, ...partySpots(g.map, h.cell, g.tuning)];
    expect(Math.min(...places.map(p => Math.hypot(h.anchorX - p.x, h.anchorZ - p.z)))).toBeLessThan(h.range < 1 ? 7 : 0.01);
  }, 60000);
});
