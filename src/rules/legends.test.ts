import { describe, expect, it } from "vitest";
import type { Creature, Level } from "./creatures";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { TUNING } from "./tuning";
import { LEGEND_BUFFS } from "./buffs";
import { LEGENDS } from "./legends";
import { cellKey } from "./party";
import { setupQuestDemo } from "./quest";
import { stateOf } from "./states";

// Legends, redesigned (Ed, 2026-10-05; issue #87).
const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const run = (g: Game, secs: number, first: Controls = idle, each?: () => void) => { for (let i = 0; i < Math.round(secs / STEP); i++) { stepGame(g, i === 0 ? first : idle, STEP); each?.(); } };
/** The witch on the ground beside a sleeping legend (one with a buff), everything else round it gone but one of its kind. */
function beside(kin = true): { g: Game; L: Creature; mate: Creature | null } {
  const g = newGame(123, TUNING);
  g.clock.paused = false; g.party.paused = true;
  const L = g.creatures.find(c => c.boss && c.legendState === "asleep" && LEGEND_BUFFS.species[c.species])!;
  const site = g.map.siteOf(L.cell[0], L.cell[1]), d = Math.hypot(site.x - L.x, site.z - L.z) || 1;
  g.witch = { ...g.witch, seated: false, x: L.x + ((site.x - L.x) / d) * 4, z: L.z + ((site.z - L.z) / d) * 4, mode: "ground", lift: 0 };
  for (const c of g.creatures) if (!c.boss && cellKey(c.cell) === cellKey(L.cell)) c.gone = true;
  for (const c of g.creatures) if (!c.boss && Math.hypot(c.x - L.x, c.z - L.z) < 120) c.gone = true;
  let mate: Creature | null = null;
  if (kin) mate = put(g, L.species, 1, site.x, site.z, L.cell);
  g.byArea = null;
  g.witches[0].health.hp = 1e6;
  return { g, L, mate };
}
const used = new Set<number>();
function put(g: Game, species: string, level: Level, x: number, z: number, cell = g.map.cellSafe(x, z).cell as [number, number]): Creature {
  const c = g.creatures.find(k => !k.gone && !k.leashed && !k.boss && !used.has(k.id) && Math.hypot(k.x - x, k.z - z) > 300)!;
  used.add(c.id);
  Object.assign(c, { species, level, x, z, tx: x, tz: z, homeX: x, homeZ: z, anchorX: x, anchorZ: z, cell: [cell[0], cell[1]], safeR: undefined, seen: g.clock.time, hp: undefined, siege: undefined, enraged: false, state: undefined, fight: undefined, rest: 0 });
  g.byArea = null;
  return c;
}
const withAngryAfter = <T,>(s: number, f: () => T): T => { const was = LEGENDS.angryAfter; LEGENDS.angryAfter = s; try { return f(); } finally { LEGENDS.angryAfter = was; } };

describe("legends, redesigned (Ed, 2026-10-05; #87)", () => {
  it("sleep on when their area's soundsystem comes (soundsystems no longer wake them)", () => {
    const { g, L } = beside();
    g.party.areas.set(cellKey(L.cell), { cell: L.cell, wave: 1, at: g.clock.time, from: null, soundsystem: null });
    run(g, 6);
    expect(L.legendState).toBe("asleep");
  }, 60000);

  it("grow restless (0 to 1) with none of their kind in their area, calm as soon as one's back, and turn angry once it's run its course", () => withAngryAfter(4, () => {
    const { g, L, mate } = beside();
    run(g, 1);
    expect(L.legendState).toBe("asleep");
    mate!.gone = true;
    run(g, 1.5);
    expect(L.legendState).toBe("restless");
    expect(L.restlessness!).toBeGreaterThan(0.2);
    expect(L.restlessness!).toBeLessThan(1);
    mate!.gone = false; // one of its kind back
    run(g, 1);
    expect(L.legendState).toBe("asleep");
    expect(L.restlessness).toBe(0);
    mate!.gone = true;
    run(g, 5);
    expect(L.legendState).toBe("angry");
    expect(L.restlessness).toBe(1);
    expect(stateOf(L)).toBe("enraged");
  }), 60000);

  it("counts one of its kind parked there at her sigil as kin", () => withAngryAfter(2, () => {
    const { g, L, mate } = beside();
    mate!.leashed = true; g.leash.placed.push({ id: mate!.id, x: mate!.x, z: mate!.z, at: 0 });
    run(g, 4);
    expect(L.legendState).toBe("asleep");
  }), 60000);

  it("when angry, shoot her from afar (into neighbouring areas), slowly; never soundsystems, never happy creatures; and stay in their area", () => withAngryAfter(0.5, () => {
    const { g, L, mate } = beside();
    mate!.gone = true;
    run(g, 1.2);
    expect(L.legendState).toBe("angry");
    const W = g.witches[0], hp0 = W.health.hp, out = { x: L.x + 160, z: L.z }; // well out of its area
    g.witch = { ...g.witch, x: out.x, z: out.z };
    const happy = put(g, L.species === "wolf" ? "boar" : "wolf", 2, out.x + 2, out.z, g.map.cellSafe(out.x, out.z).cell as [number, number]); happy.state = "happy";
    g.combat.sounds.set("test", { hp: 50, max: 50, x: out.x - 2, z: out.z, radius: 2 });
    let shots = 0;
    run(g, LEGENDS.attack.interval * 2 + LEGENDS.attack.windup + LEGENDS.attack.lobFlight + 1, idle, () => { for (const e of g.combat.events) if (e.id === L.id && e.at === g.clock.time && (e.kind === "shot" || e.kind === "beam")) shots++; });
    expect(cellKey(g.map.cellSafe(g.witch.x, g.witch.z).cell)).not.toBe(cellKey(L.cell));
    expect(shots).toBeGreaterThanOrEqual(1);
    expect(shots).toBeLessThanOrEqual(3); // slow
    expect(W.health.hp).toBeLessThan(hp0);
    expect(g.combat.sounds.get("test")!.hp).toBe(50);
    expect(happy.hp).toBeUndefined();
    expect(cellKey(g.map.cellSafe(L.x, L.z).cell)).toBe(cellKey(L.cell));
  }), 60000);

  it("fire each volley at up to attack.targets of the nearest (balance builder's values: 10 a hit, every 15 s)", () => withAngryAfter(0.5, () => {
    const { g, L, mate } = beside();
    mate!.gone = true;
    run(g, 1.2);
    expect(L.legendState).toBe("angry");
    g.witch = { ...g.witch, mode: "treetop", lift: 1 }; // (her posse only)
    const posse = [0, 1, 2, 3, 4].map(i => { const k = put(g, L.species === "wolf" ? "boar" : "wolf", 2, L.x + 60 + i * 12, L.z + 30); k.leashed = true; g.leash.placed.push({ id: k.id, x: k.x, z: k.z, at: 0 }); return k; });
    let volley = 0;
    run(g, LEGENDS.attack.interval + LEGENDS.attack.windup + 1, idle, () => { if (!volley && g.combat.events.some(e => e.id === L.id && e.at === g.clock.time && (e.kind === "shot" || e.kind === "beam"))) volley = g.combat.shots.filter(q => q.from === L.id).length + g.combat.beams.filter(q => q.from === L.id).length; });
    expect(volley).toBeGreaterThanOrEqual(2);
    expect(volley).toBeLessThanOrEqual(LEGENDS.attack.targets);
    void posse;
  }), 60000);

  it("worn down, go back to sleep (angry or happy), keeping a buff she has from them", () => withAngryAfter(0.5, () => {
    const { g, L, mate } = beside();
    mate!.gone = true;
    run(g, 1.2);
    expect(L.legendState).toBe("angry");
    L.hp = 1;
    const wolf = put(g, L.species === "wolf" ? "boar" : "wolf", 2, L.x + 2, L.z);
    wolf.leashed = true; g.leash.placed.push({ id: wolf.id, x: wolf.x, z: wolf.z, at: g.clock.time });
    let slept = false;
    run(g, 10, idle, () => { if (L.legendState === "asleep") slept = true; }); // (with none of its kind there it grows restless again: angryAfter is short here)
    expect(slept).toBe(true);
    expect(L.gone).toBeFalsy();
    expect(L.fleeUntil).toBeUndefined();
  }), 60000);

  it("lie relics about the map, far from home and apart; she picks one up with the sigil button and puts it down by a sleeping legend: happy, and its buff hers for good", () => {
    const { g, L } = beside();
    expect(g.relics.length).toBe(LEGENDS.relics.count);
    for (const r of g.relics) expect(g.map.remoteness(r.cell[0], r.cell[1])).toBeGreaterThanOrEqual(LEGENDS.relics.minRemoteness);
    const r = g.relics[0], back = { x: g.witch.x, z: g.witch.z };
    g.witch = { ...g.witch, x: r.x + 1, z: r.z };
    run(g, 0.2, { ...idle, sigil: true });
    expect(r.state).toBe("carried");
    expect(g.leash.relics).toEqual([r.id]);
    g.witch = { ...g.witch, x: back.x, z: back.z };
    run(g, 0.2, { ...idle, sigil: true });
    expect(L.legendState).toBe("happy");
    expect(L.buffed).toBe(true);
    expect(r.state).toBe("used");
    expect(g.leash.relics).toEqual([]);
    expect(g.buffs.active.map(b => b.id)).toContain(L.id);
  }, 60000);

  it("when happy, shoot the enraged from afar; worn down by them, sleep again, her buff kept", () => {
    const { g, L } = beside();
    run(g, 0.2, { ...idle, happyNearest: true });
    expect(L.legendState).toBe("happy");
    g.witch = { ...g.witch, mode: "treetop", lift: 1 };
    const far = put(g, L.species === "boar" ? "wolf" : "boar", 1, L.x + 120, L.z); far.enraged = true; far.state = "enraged"; far.siege = "home";
    let hitFar = false;
    run(g, LEGENDS.attack.interval + LEGENDS.attack.windup + LEGENDS.attack.lobFlight + 2, idle, () => { if (far.hp !== undefined) hitFar = true; });
    expect(hitFar).toBe(true);
    // Worn down by an enraged one beside it.
    L.hp = 0.5;
    const near = put(g, L.species === "boar" ? "wolf" : "boar", 2, L.x + 1.5, L.z, L.cell); near.enraged = true; near.state = "enraged";
    run(g, 10);
    expect(L.legendState).toBe("asleep");
    expect(L.buffed).toBe(true);
    expect(g.buffs.active.map(b => b.id)).toContain(L.id);
  }, 60000);

  it("has the dream quest give her its buff (it sleeps on, the creature stays hers), and close once its area's soundsystem is on", () => {
    const g = newGame(123, TUNING);
    g.clock.paused = false; g.party.paused = true;
    const L = setupQuestDemo(g, (x, z) => { g.witch = { ...g.witch, x, z, mode: "ground", lift: 0, seated: false }; })!;
    g.witches[0].health.hp = 1e6;
    const gift = g.creatures[g.leash.stack[g.leash.stack.length - 1]];
    run(g, 0.1);
    expect(L.questOpen).toBe(true);
    run(g, 0.2, { ...idle, sigil: true });
    expect(L.quest!.done).toBeDefined();
    expect(L.legendState).not.toBe("happy");
    expect(L.buffed).toBe(true);
    expect(L.questOpen).toBe(false);
    expect(gift.leashed).toBe(true); // hers, parked there
    expect(g.leash.placed.map(p => p.id)).toContain(gift.id);
    expect(g.buffs.active.map(b => b.id)).toContain(L.id);
    // Another legend: once its area's soundsystem is on, its quest is closed.
    const M = g.creatures.find(c => c.boss && c !== L && c.legendState === "asleep" && c.quest)!;
    g.party.areas.set(cellKey(M.cell), { cell: M.cell, wave: 1, at: g.clock.time, from: null, soundsystem: null });
    run(g, 0.2);
    expect(M.questOpen).toBe(false);
  }, 60000);
});
