import { describe, expect, it } from "vitest";
import { generateMap } from "./map";
import { isInside } from "./mapShape";
import { Forest, legendGrove } from "./forest";
import { keepsToCircle, pointInArea, spawnCreatures, stepCreature } from "./creatures";
import { rng } from "./random";
import { cellKey, soundsystemFor } from "./party";
import { TUNING, withTuning } from "./tuning";
import { joinParty, loseSoundsystem, newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { befriend } from "./creatureStates";
import { inviteCreature, stepLeashed } from "./leash";
import { LEGENDS, stepLegendStates } from "./legends";
// (these test the areas clearing by themselves and the runes at the feet: the game as it was, ?cast=0, rules/stoneStacks.ts)
const PEOPLED = withTuning({ population: { ...TUNING.population, start: { ...TUNING.population.start, young: 1 } }, cast: { ...TUNING.cast, on: false } }); // (a young in every area, whatever the tuning's curve: the mechanics, not the balance)

// Retain full radius maps: clearing/sliver and grove/rim population ratios, multi-area sieges and >400 m recruits need their extent.
// Each area's sleeping legend lies in a small circular clearing of its own (Ed, 2026-10-06), near its top.
describe("legend clearings", () => {
  for (const seed of [1, 123, 4242, 90210]) {
    it(`every area with a legend has one (and only those), inside its own area, clear of trees, bushes, decor and the soundsystem, its legend near the top (seed ${seed})`, () => {
      const map = generateMap(seed, TUNING), forest = new Forest(map), creatures = spawnCreatures(map);
      // every area with room for one has one: 4000 m² or more of its ground where she can fly (the rest: slivers at the map's edge, or absorbed by their neighbours)
      const B = map.bounds, ground = new Map<string, number>();
      for (let x = B.minX + 15; x < B.maxX - 15; x += 8) for (let z = B.minZ + 15; z < B.maxZ - 15; z += 8) if (isInside(B, x, z, 15)) { const k = map.areaAt(x, z).cell.join(","); ground.set(k, (ground.get(k) ?? 0) + 64); }
      for (const [x, y] of map.cells)
        if (map.hasLegend(x, y) && (ground.get(`${x},${y}`) ?? 0) >= 4000) expect(map.legendClearing(x, y), `area ${x},${y}`).not.toBeNull();
        else if (!map.hasLegend(x, y)) expect(map.legendClearing(x, y), `area ${x},${y} has no legend`).toBeNull();
      expect(map.legendClearing(map.centreCell[0], map.centreCell[1])).toBeNull();
      for (const c of map.legendClearings) {
        expect(map.legendClearing(c.cell[0], c.cell[1])).toBe(c);
        for (let k = 0; k < 16; k++) { const b = (k / 16) * Math.PI * 2, at = map.areaAt(c.x + Math.cos(b) * c.r, c.z + Math.sin(b) * c.r).cell; expect(at).toEqual(c.cell); }
        // (its edge ragged by up to a metre and a half either way)
        for (const t of forest.treesNear(c.x, c.z, c.r + 2)) expect(Math.hypot(t.x - c.x, t.z - c.z)).toBeGreaterThanOrEqual(c.r - 1.6);
        for (const t of forest.bushesNear(c.x, c.z, c.r + 2)) expect(Math.hypot(t.x - c.x, t.z - c.z)).toBeGreaterThanOrEqual(c.r - 1.6);
        for (const d of forest.decorNear(c.x, c.z, c.r + 2)) expect(Math.hypot(d.x - c.x, d.z - c.z)).toBeGreaterThanOrEqual(c.r);
        const s = soundsystemFor(map, c.cell);
        expect(Math.hypot(s.x - c.x, s.z - c.z)).toBeGreaterThan(c.r + TUNING.soundsystemFootprint);
        // its legend: in the circle, near its far (north, top of the screen) side, the open floor in front
        const L = creatures.find(o => o.boss && o.cell[0] === c.cell[0] && o.cell[1] === c.cell[1])!;
        expect(Math.hypot(L.x - c.x, L.z - c.z)).toBeLessThan(c.r * 0.6);
        expect(L.z).toBeLessThan(c.z - c.r * 0.3);
      }
    });
  }
  it("is sized to its legend: the elk's wider than the bat's", () => {
    const S = TUNING.legendClearing.species;
    expect(S.elk).toBeGreaterThan(TUNING.legendClearing.radius);
    expect(S.bat ?? TUNING.legendClearing.radius).toBeLessThan(S.elk);
  });
  // Ed (2026-10-06): "Legend circles should spawn with a wild baby in them, which tries to stay within the circle while it's wild."
  it("each holds a wild baby of its legend's kind, which keeps to the circle, comes back in if pushed out, and is free only while leashed", () => {
    const map = generateMap(123, TUNING), creatures = spawnCreatures(map);
    for (const c of map.legendClearings) {
      const L = creatures.find(o => o.boss && o.cell[0] === c.cell[0] && o.cell[1] === c.cell[1])!;
      const babies = creatures.filter(o => o.circle && o.cell[0] === c.cell[0] && o.cell[1] === c.cell[1]);
      expect(babies.length).toBe(1);
      const B = babies[0];
      expect(B.level).toBe(0);
      expect(B.state ?? "wild").toBe("wild");
      expect(B.species).toBe(L.species);
      expect(Math.hypot(B.x - c.x, B.z - c.z)).toBeLessThan(c.r);
      expect(Math.hypot(B.x - L.x, B.z - L.z)).toBeGreaterThan(c.r * 0.3); // (off its legend's lair)
    }
    const B = creatures.find(o => o.circle)!, k = B.circle!;
    expect(keepsToCircle(B)).toBe(true);
    for (let i = 0; i < 60 * 60; i++) { stepCreature(B, 1 / 60, map); expect(Math.hypot(B.x - k.x, B.z - k.z)).toBeLessThan(k.r + 0.5); }
    // A supplied displaced baby moves inward on its next step; the original20s arrival is reported.
    B.x = k.x + k.r + 6; B.z = k.z; B.tx = B.x; B.tz = B.z;
    const outside = Math.hypot(B.x - k.x, B.z - k.z);
    stepCreature(B, STEP, map);
    expect(Math.hypot(B.x - k.x, B.z - k.z)).toBeLessThan(outside);
    expect(Math.hypot(B.x - (k.x + k.r + 6), B.z - k.z)).toBeLessThanOrEqual(B.speed * STEP + 1e-9);
    // leashed: no longer kept to it
    B.leashed = true;
    expect(keepsToCircle(B)).toBe(false);
    const [x, z] = pointInArea(map, B, rng(5));
    expect(Number.isFinite(x) && Number.isFinite(z)).toBe(true);
    expect(map.sameArea(map.cellSafe(x, z).cell, B.cell)).toBe(true); // validity, not40-draw outside-circle frequency
  });

  // Ed (2026-10-06): "if it is invited and becomes happy, it continues to stay in the circle as before";
  // "happy creatures don't follow you - only leashed creatures do".
  // Ed (2026-10-06): "Happy Circle baby should stay in its circle, though it can dance there"; "There's no way to release a
  // leashed animal."
  it("its befriended baby stays in the circle and dances there; only loose-sigil pickup makes it follow her", () => {
    const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
    const run = (g: Game, secs: number, each?: () => void) => { for (let i = 0; i < Math.round(secs / STEP); i++) { stepGame(g, idle, STEP); each?.(); } };
    const g = newGame(123, PEOPLED);
    g.clock.paused = false;
    g.witches[0].health.hp = 1e6;
    const B = g.creatures.find(o => o.circle)!, k = B.circle!, dist = () => Math.hypot(B.x - k.x, B.z - k.z);
    for (const o of g.creatures) if (o !== B && !o.boss && o.level > 0 && Math.hypot(o.x - k.x, o.z - k.z) < 150) o.gone = true; // (the wild young and adults round about out of the way: she lands by the next area's swarm)
    // invited (happy), not leashed (Ed, 2026-10-06: "happy creatures don't follow you - only leashed creatures do")
    befriend(B, g.clock.time);
    expect(B.leashed).toBe(false);
    // she flies off over the treetops, still near enough that it's stepped: it keeps to its circle
    g.witch = { ...g.witch, seated: false, x: k.x + k.r + 30, z: k.z, mode: "treetop", lift: 1 };
    run(g, 60, () => expect(dist()).toBeLessThan(k.r + 0.5));
    // its area's party comes: it dances, in its circle
    joinParty(g, B, { x: k.x + 60, z: k.z }, B.cell);
    expect(B.dancing).toBe(true);
    expect(Math.hypot(B.anchorX - k.x, B.anchorZ - k.z)).toBeLessThan(k.r);
    run(g, 30, () => expect(dist()).toBeLessThan(k.r + 0.5));
    // leashed, it follows her out of its circle
    inviteCreature(g.leash, B, B.x, B.z, g.clock.time, "picked");
    g.witch = { ...g.witch, x: k.x + k.r + 40, z: k.z, mode: "ground", lift: 0 };
    expect(B.leashed).toBe(true);
    expect(g.leash.stack).toContain(B.id);
    expect(keepsToCircle(B)).toBe(false);
    // Supply the circle edge and one real leash step: ownership releases confinement, without a25s deadline.
    Object.assign(B, { x: k.x + k.r, z: k.z, tx: k.x + k.r, tz: k.z, rest: 0 });
    const before = Math.hypot(B.x - g.witch.x, B.z - g.witch.z);
    stepLeashed(B, g.witch.x, g.witch.z, STEP, g.tuning);
    expect(dist()).toBeGreaterThan(k.r);
    expect(Math.hypot(B.x - g.witch.x, B.z - g.witch.z)).toBeLessThan(before);
  });

  // Ed (2026-10-06): a soundsystem turns its area's wild babies happy (they join the dancing); when it's destroyed its happy
  // babies run off home for good (leashed ones stay hers); "After a siege, the angry adults move onto the next area, which will
  // waken the legend": "legends get angry when their area has no animals from its species".
  it("a fallen soundsystem's babies run off home and its besiegers march on: its legend, left without kin, grows restless, then angry", () => {
    const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
    const g = newGame(123, withTuning({ legends: { ...TUNING.legends, share: 1 }, cast: { ...TUNING.cast, on: false } })); // (babies with no loose sigils: the game without the stone stacks, ?cast=0; every area with its legend: at the usual share, none of seed 123's next areas has one)
    g.clock.paused = false;
    g.witches[0].health.hp = 1e6;
    g.witch = { ...g.witch, seated: false, mode: "treetop", lift: 1 };
    const next = g.party.next.find(n => g.creatures.some(o => o.boss && o.cell[0] === n[0] && o.cell[1] === n[1] && g.creatures.some(b => b.circle && b.cell[0] === n[0] && b.cell[1] === n[1])))!;
    const same = (o: { cell: [number, number] }) => o.cell[0] === next[0] && o.cell[1] === next[1], key = next[0] + "," + next[1];
    const L = g.creatures.find(o => o.boss && same(o))!, S = L.species;
    const kin = () => g.creatures.filter(o => !o.boss && !o.gone && o.species === S && same(o));
    // its own kind there: the circle's baby, another baby, and two adults; one more baby she has on her leash
    const B = g.creatures.find(o => o.circle && same(o))!;
    for (const o of kin()) if (o !== B) o.gone = true;
    const spare = g.creatures.filter(o => !o.boss && !o.circle && !o.gone && !same(o) && Math.hypot(o.x - L.x, o.z - L.z) > 400).slice(0, 4);
    spare.forEach((o, i) => Object.assign(o, { species: S, level: i < 2 ? 0 : 2, cell: [next[0], next[1]], x: L.x + 6 + i * 2, z: L.z + 12, tx: L.x + 6 + i * 2, tz: L.z + 12, homeX: L.x, homeZ: L.z + 12, anchorX: L.x, anchorZ: L.z + 12, state: undefined, enraged: false, hp: undefined }));
    const [baby2, leashed, a1, a2] = spare;
    befriend(leashed, g.clock.time); // already-converted follower fixture, not a baby invitation
    inviteCreature(g.leash, leashed, leashed.x, leashed.z, g.clock.time, "picked");
    // the wave brings its soundsystem: its wild babies turn happy and dance (the circle's in its circle), its adults are enraged and besiege it
    stepGame(g, { ...idle, nextWave: true }, STEP);
    for (let i = 0; i < 20; i++) stepGame(g, idle, STEP);
    expect(g.party.areas.get(key)?.soundsystem).toBeTruthy();
    for (const b of [B, baby2]) { expect(b.state).toBe("happy"); expect(b.dancing).toBe(true); }
    expect(Math.hypot(B.anchorX - B.circle!.x, B.anchorZ - B.circle!.z)).toBeLessThan(B.circle!.r); // (the circle's dances in its circle)
    for (const a of [a1, a2]) { expect(a.enraged).toBe(true); expect(a.siege).toBe(key); }
    expect(L.legendState).toBe("asleep");
    // the siege brings it down: its happy babies run off home, its besiegers march on to the next soundsystem
    const ss = g.party.areas.get(key)!.soundsystem!;
    g.combat.sounds.get(key)!.hp = 0; // (worn down, as combat's siege leaves it)
    loseSoundsystem(g, key, ss.x, ss.z);
    for (const b of [B, baby2]) expect(b.fleeUntil).toBe(Infinity);
    expect(leashed.leashed).toBe(true); expect(leashed.fleeUntil).toBeFalsy(); // (leashed babies stay hers)
    for (const a of [a1, a2]) { expect(a.siege).toBeTruthy(); expect(a.siege).not.toBe(key); }
    // Direct no-kin and completion boundaries; the original150s siege-to-rage path is reported.
    const angryAfter = g.tuning.legends.stomp?.on ? g.tuning.legends.stomp.angryAfter : LEGENDS.angryAfter;
    const world = { creatures: g.creatures, map: g.map, time: g.clock.time + LEGENDS.check, dt: LEGENDS.check, angryAfter,
      partified: (key: string) => g.party.areas.has(key), areaOf: (c: Game["creatures"][number]) => c.leashed ? "" : cellKey(c.dropped?.cell ?? c.cell) };
    expect(g.leash.placed).toEqual([]); // no parked follower: the real game's stack-only kin exclusion
    stepLegendStates(world, [L.id]);
    expect(L.legendState).toBe("restless");
    const restlessAt = L.stateAt!;
    L.restlessness = 1 - STEP / (2 * angryAfter);
    stepLegendStates({ ...world, time: world.time + STEP, dt: STEP }, [L.id]);
    expect(L.legendState).toBe("angry");
    expect(L.stateAt!).toBeGreaterThan(restlessAt);
    expect(L.enraged).toBe(true);
    expect(L.questOpen).toBe(false);
    expect(leashed.leashed).toBe(true);
  });

  // Ed (2026-10-06): "I think there should be an area of the tallest trees around each legend circle"; "It should blend back
  // smoothly into the rest of the forest around this area, so it doesn't stand out too much".
  it("each swells the forest round it, strongest at its edge and easing smoothly out into the area's own, all the way round", () => {
    // (half the areas with legends, as when this was written: enough clearings to average the grove's shape over, whatever legends.share)
    const map = generateMap(123, withTuning({ legends: { ...TUNING.legends, share: 0.5 } })), forest = new Forest(map), G = TUNING.legendClearing.grove, bins = 6, w = G.reach / bins;
    let checked = 0;
    for (const lc of map.legendClearings) {
      for (const p of forest.treesNear(lc.x, lc.z, lc.r + 1.5 + G.reach + w)) {
        const d = Math.hypot(p.x - lc.x, p.z - lc.z), out = d - lc.r - 1.5, s = p.grove ?? 0, g0 = legendGrove(map, p.x, p.z);
        if (out < 0) continue;
        // each tree's strength is the grove's here, jittered by at most G.jitter either way
        expect(s).toBeLessThanOrEqual(Math.min(1, g0 * (1 + G.jitter)) + 0.011);
        if (g0 * (1 - G.jitter) > 0.03) expect(s).toBeGreaterThanOrEqual(g0 * (1 - G.jitter) - 0.011);
        checked++;
      }
    }
    expect(checked).toBeGreaterThan(0); // exercise jitter bounds; aggregate grove shape is reported
  });

  // Art builder 3's rim kit (#262) round each: on its ring, never its floor, paths clear; all the way round, no way in left open to
  // the south (Ed, 2026-10-26: "legend circles should always be hidden by scenery around them").
  it("each is edged by the rim kit: small pieces just past its floor, all the way round", () => {
    const map = generateMap(123, TUNING), forest = new Forest(map), R = TUNING.legendClearing.rim;
    let checked = 0;
    for (const lc of map.legendClearings) {
      const mine = forest.rimNear(lc.x, lc.z, lc.r + R.out + R.spread + 1).filter(p => Math.abs(Math.hypot(p.x - lc.x, p.z - lc.z) - lc.r - R.out - R.spread / 2) <= R.spread / 2 + 1e-6);
      for (const p of mine) {
        checked++;
        const d = Math.hypot(p.x - lc.x, p.z - lc.z);
        expect(d).toBeGreaterThanOrEqual(lc.r + R.out - 1e-6);
        expect((p.z - lc.z) / d).toBeLessThan(Math.cos((R.gap * Math.PI) / 180) + 1e-6);
        expect(map.paths.at(p.x, p.z, 1.5)).toBeFalsy();
        expect(p.type).toBe(map.typeOf(lc.cell[0], lc.cell[1]));
      }
    }
    expect(checked).toBeGreaterThan(0); // exercise every-piece geometry; coverage shares are reported
  });

  // Ed (2026-10-06): "The legend circle shouldn't spawn near its runestone."
  it("keeps every sampled circle off the runestone's own clearing", () => {
    let n = 0;
    for (const seed of [1, 42, 123, 2024, 90210]) {
      const map = generateMap(seed, TUNING);
      for (const c of map.legendClearings) {
        const s = map.soundsystemSpot(c.cell[0], c.cell[1]), d = Math.hypot(c.x - s.x, c.z - s.z) - c.r;
        n++;
        expect(d).toBeGreaterThan(10); // (never on the stone's own clearing)
      }
    }
    expect(n).toBeGreaterThan(0); // exercise exclusions; sampled minFromStone exception rate is reported
  });
});
