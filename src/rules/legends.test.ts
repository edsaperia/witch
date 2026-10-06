import { describe, expect, it } from "vitest";
import type { Creature, Level } from "./creatures";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { TUNING } from "./tuning";
import { LEGEND_BUFFS } from "./buffs";
import { LEGENDS, canopyOver, relicGlints } from "./legends";
import { cellKey } from "./party";
import { setupQuestDemo } from "./quest";
import { inLegendClearing } from "./map";
import { stateOf } from "./creatureStates";

// Legends, redesigned (Ed, 2026-10-05; issue #87).
const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const run = (g: Game, secs: number, first: Controls = idle, each?: () => void) => { for (let i = 0; i < Math.round(secs / STEP); i++) { stepGame(g, i === 0 ? first : idle, STEP); each?.(); } };
/** The witch on the ground beside a sleeping legend (one with a buff), everything else round it gone but one of its kind. */
function beside(kin = true): { g: Game; L: Creature; mate: Creature | null } {
  const g = newGame(123, TUNING);
  g.clock.paused = false; g.party.paused = true;
  const L = g.creatures.find(c => c.boss && c.legendState === "asleep" && LEGEND_BUFFS.species[c.species] && !LEGENDS.charge.species.includes(c.species))!; // (one that lobs or beams: chargers below)
  const site = g.map.siteOf(L.cell[0], L.cell[1]), d = Math.hypot(site.x - L.x, site.z - L.z) || 1;
  g.witch = { ...g.witch, seated: false, x: L.x + ((site.x - L.x) / d) * 4, z: L.z + ((site.z - L.z) / d) * 4, mode: "ground", lift: 0 };
  for (const c of g.creatures) if (!c.boss && cellKey(c.cell) === cellKey(L.cell)) c.gone = true;
  for (const c of g.creatures) if (!c.boss && Math.hypot(c.x - L.x, c.z - L.z) < 120) c.gone = true;
  for (const c of g.creatures) if (c.boss && c !== L && Math.hypot(c.x - L.x, c.z - L.z) < 700) c.gone = true; // (no neighbouring legend turning angry too, and charging in)
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

  // Ed (2026-10-06): "Quest sigils and relics need to be placed in the circle to have their effect."
  it("take a relic only inside their clearing: put down outside it, nothing happens but a cue (the circle flashes)", () => {
    const { g, L } = beside(), lc = g.map.legendClearing(L.cell[0], L.cell[1])!;
    expect(lc).not.toBeNull();
    const r = g.relics[0];
    g.witch = { ...g.witch, x: r.x + 1, z: r.z };
    run(g, 0.2, { ...idle, sigil: true });
    expect(g.leash.relics).toEqual([r.id]);
    // just outside the ring, on its open (south) side
    g.witch = { ...g.witch, x: lc.x, z: lc.z + lc.r + 3 };
    let cued = false;
    run(g, 0.2, { ...idle, sigil: true }, () => { cued ||= g.leashEvents.some(e => e.kind === "outsideCircle" && e.id === L.id); });
    expect(L.legendState).not.toBe("happy");
    expect(g.leash.relics).toEqual([r.id]);
    expect(cued).toBe(true);
    // inside it
    g.witch = { ...g.witch, x: lc.x, z: lc.z + lc.r * 0.5 };
    run(g, 0.2, { ...idle, sigil: true });
    expect(L.legendState).toBe("happy");
    expect(r.state).toBe("used");
  }, 60000);

  it("take a quest sigil only inside their clearing: the right creature put down elsewhere in its area does nothing but cue", () => {
    for (const inside of [false, true]) {
      const g = newGame(123, TUNING);
      g.clock.paused = false; g.party.paused = true;
      const L = setupQuestDemo(g, (x, z) => { g.witch = { ...g.witch, x, z, mode: "ground", lift: 0, seated: false }; })!;
      g.witches[0].health.hp = 1e6;
      const lc = g.map.legendClearing(L.cell[0], L.cell[1])!;
      if (!inside) {
        // a spot in its area, out of its circle
        let spot: [number, number] | null = null;
        for (let d = lc.r + 4; d < lc.r + 60 && !spot; d += 4) for (let k = 0; k < 16 && !spot; k++) { const a = (k / 16) * Math.PI * 2, x = lc.x + Math.cos(a) * d, z = lc.z + Math.sin(a) * d, c = g.map.cellSafe(x, z).cell; if (c[0] === L.cell[0] && c[1] === L.cell[1]) spot = [x, z]; }
        expect(spot).not.toBeNull();
        g.witch = { ...g.witch, x: spot![0], z: spot![1] };
        expect(inLegendClearing(g.map, L.cell, g.witch.x, g.witch.z, L, LEGENDS.placeRadius)).toBe(false);
      } else expect(inLegendClearing(g.map, L.cell, g.witch.x, g.witch.z, L, LEGENDS.placeRadius)).toBe(true);
      let cued = false;
      run(g, 0.1);
      run(g, 0.2, { ...idle, sigil: true }, () => { cued ||= g.leashEvents.some(e => e.kind === "outsideCircle" && e.id === L.id); });
      expect(L.quest!.done !== undefined).toBe(inside);
      expect(cued).toBe(!inside);
    }
  }, 60000);

  it("when happy, shoot the enraged from afar; worn down by them, sleep again, her buff kept", () => {
    const { g, L } = beside();
    run(g, 0.2, { ...idle, happyNearest: true });
    expect(L.legendState).toBe("happy");
    g.witch = { ...g.witch, mode: "treetop", lift: 1 };
    // (120 m off toward the map's middle, wherever in its clearing the legend lies)
    const dx = g.map.dancefloor.x - L.x, dz = g.map.dancefloor.z - L.z, dd = Math.hypot(dx, dz) || 1;
    const far = put(g, L.species === "boar" ? "wolf" : "boar", 1, L.x + (dx / dd) * 120, L.z + (dz / dd) * 120); far.enraged = true; far.state = "enraged"; far.siege = "home";
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

  it("glint only through a gap in the canopy from the treetops, always on the ground; lie out in the woods, some under gaps, some under closed canopy (Ed, 2026-10-05)", () => {
    for (const seed of [123, 7, 4242]) {
      const g = newGame(seed, TUNING), covered = g.relics.map(r => canopyOver(g.forest, g.map, r.x, r.z));
      expect(covered.some(c => c), `seed ${seed}: one under closed canopy`).toBe(true);
      expect(covered.some(c => !c), `seed ${seed}: one under a gap`).toBe(true);
      for (const r of g.relics) {
        expect(g.map.hardClear(r.x, r.z)).toBe(false); // (not in a clearing)
        expect(relicGlints(g.forest, g.map, r, false)).toBe(true);
        expect(relicGlints(g.forest, g.map, r, true)).toBe(!canopyOver(g.forest, g.map, r.x, r.z));
      }
      // The same relic moved under a crown (a tree's crown hangs crownReach north of its trunk): hidden from above.
      const r = { ...g.relics[0] }, tree = g.forest.treesNear(r.x, r.z, 60)[0];
      Object.assign(r, { x: tree.x, z: tree.z - TUNING.crownHeight / Math.sin((TUNING.camera.treetop.angleIn * Math.PI) / 180) });
      expect(relicGlints(g.forest, g.map, r, true)).toBe(false);
    }
  }, 60000);
});

describe("charging legends' long charge (Ed, 2026-10-05; legends.json charge)", () => {
  /** An angry boar legend, its target (one of her posse) charge.far metres east, things in its lane. */
  function angryBoar(far = 90) {
    const { g, L, mate } = beside();
    L.species = "boar"; mate!.gone = true;
    g.witch = { ...g.witch, mode: "treetop", lift: 1 }; // (out of its sights, at first)
    withAngryAfter(0.3, () => run(g, 0.8));
    expect(L.legendState).toBe("angry");
    const other = L.species === "wolf" ? "fox" : "wolf";
    const target = put(g, other, 2, L.x + far, L.z); target.leashed = true; g.leash.placed.push({ id: target.id, x: target.x, z: target.z, at: 0 });
    const inLane = [put(g, "beetle", 1, L.x + 30, L.z + 1), put(g, "otter", 2, L.x + 50, L.z - 1.5)];
    // (wild ones: it charges only her and her posse, but tramples whatever's in its way)
    return { g, L, target, inLane };
  }
  it("tramples everything in its lane once each (her, the wild alike), knocking them aside, through scenery", () => {
    const { g, L, target, inLane } = angryBoar();
    g.witch = { ...g.witch, mode: "ground", lift: 0, x: L.x + 60, z: L.z }; // (its target: nearer than her posse's wolf)
    const pins = inLane.map(c => [c, c.x] as const);
    const hits = new Map<number, number>(); let witchHits = 0, x0 = 0, z0 = 0, ran = false, done = false;
    run(g, 30, idle, () => {
      if (L.run?.phase === "home" && !done) { done = true; witchHits = L.run.hit.filter(h => h === -1).length; } // (its first charge over; her as -1 in whom it hit)
      for (const [c, x] of pins) if (!hits.has(c.id)) Object.assign(c, { x, z: c.anchorZ, fight: undefined }); // (they stand in its lane, not fighting it, till they're hit)
      if (!done) for (const e of g.combat.events) if (e.at === g.clock.time) {
        if (e.kind === "hit" && e.id !== undefined) hits.set(e.id, (hits.get(e.id) ?? 0) + 1);
        if (e.kind === "witchHit" && L.run?.hit.includes(-1) && !x0) { x0 = g.witch.x; z0 = g.witch.z; }
      }
      if (L.run?.phase === "run") ran = true;
      if (L.run?.phase === "windup") g.witch = { ...g.witch, x: L.x + 60, z: L.z }; // (she stands in its lane till it sets off)
    });
    expect(ran).toBe(true);
    for (const c of inLane) expect(hits.get(c.id), c.species).toBe(1);
    expect(hits.get(target.id) ?? 0).toBeLessThanOrEqual(1);
    expect(witchHits).toBe(1);
    expect(Math.abs(g.witch.z - z0)).toBeGreaterThan(LEGENDS.charge.knockback * 0.3); // (knocked aside, off its lane)
  }, 120000);
  it("curves toward its target, brakes in a wide arc past it, walks home, and charges again only once it's back", () => {
    const { g, L, target } = angryBoar(70);
    const lair = { x: L.x, z: L.z };
    target.z += 12; target.anchorZ = target.z; // (a little off its first lane: it curves)
    let windups = 0, maxAway = 0, bentBy = 0, a0: number | null = null, braking = false, home = false;
    run(g, 60, idle, () => {
      const r = L.run;
      if (r?.phase === "windup") { if (g.clock.time - r.at < 1e-6) { windups++; expect(Math.hypot(L.x - L.lairX!, L.z - L.lairZ!)).toBeLessThan(3); } a0 = r.angle; }
      if (r && a0 !== null && r.phase !== "windup") bentBy = Math.max(bentBy, Math.abs(Math.atan2(Math.sin(r.angle - a0), Math.cos(r.angle - a0))));
      if (r?.phase === "brake") braking = true;
      if (r?.phase === "home") home = true;
      maxAway = Math.max(maxAway, Math.hypot(L.x - lair.x, L.z - lair.z));
    });
    expect(windups).toBeGreaterThanOrEqual(1);
    expect(braking && home).toBe(true);
    expect(maxAway).toBeGreaterThan(70); // (on past its target, braking)
    expect(bentBy).toBeGreaterThan(0.1); // (it curved, then turned in its arc)
    // Home again: in its own area, where it lay.
    run(g, 40);
    expect(L.run === undefined || L.run.phase === "windup").toBe(true);
    expect(Math.hypot(L.x - L.lairX!, L.z - L.lairZ!)).toBeLessThan(3);
    expect(cellKey(g.map.cellSafe(L.x, L.z).cell)).toBe(cellKey(L.cell));
  }, 120000);
});

describe("a wave on a legend's area (#87, found by the overnight playthrough)", () => {
  it("enrages its wild creatures into a siege, but leaves its legend asleep, neither enraged nor besieging", () => {
    const g = newGame(123, TUNING);
    g.clock.paused = false;
    const before = new Set(g.party.areas.keys());
    run(g, 0.1, { ...idle, nextWave: true });
    const woke = [...g.party.areas.keys()].filter(k => !before.has(k));
    expect(woke.length).toBeGreaterThan(0);
    let legends = 0, besiegers = 0;
    for (const c of g.creatures) {
      if (c.gone || !woke.includes(cellKey(c.cell))) continue;
      if (c.boss) { legends++; expect(c.legendState).toBe("asleep"); expect(c.enraged).toBeFalsy(); expect(c.siege).toBeUndefined(); expect(stateOf(c)).not.toBe("enraged"); }
      else if (c.siege) besiegers++;
    }
    expect(legends).toBeGreaterThan(0);
    expect(besiegers).toBeGreaterThan(0);
  });
});


describe("an awake legend with nothing in reach (balance, 2026-10-06)", () => {
  it("looks again every attack.recheck seconds, not every step", async () => {
    const { cheer } = await import("./legends");
    const g = newGame(1000, TUNING);
    g.clock.paused = false; g.witch = { ...g.witch, seated: false, mode: "treetop", lift: 1 };
    const L = g.creatures.find(c => c.boss)!;
    cheer(L, 0); // (happy: it shoots the enraged, and there are none)
    run(g, LEGENDS.attack.interval);
    const at = L.fight!.readyAt;
    expect(at).toBeGreaterThan(g.clock.time); // (its next look is ahead of it, not this step)
    expect(at - g.clock.time).toBeLessThanOrEqual(LEGENDS.attack.recheck + 1e-9);
  }, 30000);
});
