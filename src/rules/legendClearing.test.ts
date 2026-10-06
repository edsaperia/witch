import { describe, expect, it } from "vitest";
import { generateMap } from "./map";
import { Forest, legendGrove } from "./forest";
import { keepsToCircle, pointInArea, spawnCreatures, stepCreature } from "./creatures";
import { rng } from "./random";
import { soundsystemFor } from "./party";
import { TUNING } from "./tuning";
import { joinParty, loseSoundsystem, newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { befriend } from "./creatureStates";
import { inviteCreature } from "./leash";

// Each area's sleeping legend lies in a small circular clearing of its own (Ed, 2026-10-06), near its top.
describe("legend clearings", () => {
  for (const seed of [1, 123, 4242, 90210]) {
    it(`every area but home has one, inside its own area, clear of trees, bushes, decor and the soundsystem, its legend near the top (seed ${seed})`, () => {
      const map = generateMap(seed, TUNING), forest = new Forest(map), creatures = spawnCreatures(map);
      // every area with room for one has one: 4000 m² or more of its ground where she can fly (the rest: slivers at the map's edge, or absorbed by their neighbours)
      const B = map.bounds, ground = new Map<string, number>();
      for (let x = B.minX + 15; x < B.maxX - 15; x += 8) for (let z = B.minZ + 15; z < B.maxZ - 15; z += 8) { const k = map.areaAt(x, z).cell.join(","); ground.set(k, (ground.get(k) ?? 0) + 64); }
      for (let y = 0; y < map.n; y++) for (let x = 0; x < map.n; x++)
        if (!(x === map.centreCell[0] && y === map.centreCell[1]) && (ground.get(`${x},${y}`) ?? 0) >= 4000) expect(map.legendClearing(x, y), `area ${x},${y}`).not.toBeNull();
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
    // pushed out: back in within 20 s (a baby walks slowly)
    B.x = k.x + k.r + 6; B.z = k.z; B.tx = B.x; B.tz = B.z;
    for (let i = 0; i < 60 * 20; i++) stepCreature(B, 1 / 60, map);
    expect(Math.hypot(B.x - k.x, B.z - k.z)).toBeLessThan(k.r);
    // leashed: no longer kept to it
    B.leashed = true;
    expect(keepsToCircle(B)).toBe(false);
    const r = rng(5), far = Array.from({ length: 40 }, () => pointInArea(map, B, r)).some(([x, z]) => Math.hypot(x - k.x, z - k.z) > k.r);
    expect(far).toBe(true);
  });

  // Ed (2026-10-06): "if it is invited and becomes happy, it continues to stay in the circle as before";
  // "happy creatures don't follow you - only leashed creatures do".
  it("its baby, invited, stays in the circle when she leaves, until its area's soundsystem calls it to dance; leashed it follows her, and let go it goes home to its circle", () => {
    const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
    const run = (g: Game, secs: number, each?: () => void) => { for (let i = 0; i < Math.round(secs / STEP); i++) { stepGame(g, idle, STEP); each?.(); } };
    const g = newGame(123, TUNING);
    g.clock.paused = false;
    g.witches[0].health.hp = 1e6;
    const B = g.creatures.find(o => o.circle)!, k = B.circle!, dist = () => Math.hypot(B.x - k.x, B.z - k.z);
    // invited (happy), not leashed (Ed, 2026-10-06: "happy creatures don't follow you - only leashed creatures do")
    befriend(B, g.clock.time);
    expect(B.leashed).toBe(false);
    // she flies off over the treetops, still near enough that it's stepped: it keeps to its circle
    g.witch = { ...g.witch, seated: false, x: k.x + k.r + 30, z: k.z, mode: "treetop", lift: 1 };
    run(g, 60, () => expect(dist()).toBeLessThan(k.r + 0.5));
    // its area's party calls it to dance (Ed, 2026-10-06: babies "join the dancing"): no longer kept to the circle
    joinParty(g, B, { x: k.x + 60, z: k.z }, B.cell);
    expect(B.dancing).toBe(true);
    expect(keepsToCircle(B)).toBe(false);
    B.dancing = false; B.anchorX = B.homeX; B.anchorZ = B.homeZ;
    // leashed, it follows her out of its circle
    inviteCreature(g.leash, B, B.x, B.z, g.clock.time);
    g.witch = { ...g.witch, x: k.x + k.r + 40, z: k.z, mode: "ground", lift: 0 };
    run(g, 25);
    expect(dist()).toBeGreaterThan(k.r + 10);
    // let go (DECISION FOR ED: the game has no unleash yet; this is the rule if one comes), it goes home to its circle
    g.leash.stack = g.leash.stack.filter(id => id !== B.id); g.leash.placed = g.leash.placed.filter(p => p.id !== B.id);
    B.leashed = false; B.state = "happy";
    run(g, 40);
    expect(dist()).toBeLessThan(k.r);
  });

  // Ed (2026-10-06): a soundsystem turns its area's wild babies happy (they join the dancing); when it's destroyed its happy
  // babies run off home for good (leashed ones stay hers); "After a siege, the angry adults move onto the next area, which will
  // waken the legend": "legends get angry when their area has no animals from its species".
  it("a fallen soundsystem's babies run off home and its besiegers march on: its legend, left without kin, grows restless, then angry", () => {
    const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
    const g = newGame(123, TUNING);
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
    inviteCreature(g.leash, leashed, leashed.x, leashed.z, g.clock.time);
    // the wave brings its soundsystem: its wild babies turn happy and go to dance, its adults are enraged and besiege it
    stepGame(g, { ...idle, nextWave: true }, STEP);
    for (let i = 0; i < 20; i++) stepGame(g, idle, STEP);
    expect(g.party.areas.get(key)?.soundsystem).toBeTruthy();
    for (const b of [B, baby2]) { expect(b.state).toBe("happy"); expect(b.dancing).toBe(true); }
    for (const a of [a1, a2]) { expect(a.enraged).toBe(true); expect(a.siege).toBe(key); }
    expect(L.legendState).toBe("asleep");
    // the siege brings it down: its happy babies run off home, its besiegers march on to the next soundsystem
    const ss = g.party.areas.get(key)!.soundsystem!;
    g.combat.sounds.get(key)!.hp = 0; // (worn down, as combat's siege leaves it)
    loseSoundsystem(g, key, ss.x, ss.z);
    for (const b of [B, baby2]) expect(b.fleeUntil).toBe(Infinity);
    expect(leashed.leashed).toBe(true); expect(leashed.fleeUntil).toBeFalsy(); // (leashed babies stay hers)
    for (const a of [a1, a2]) { expect(a.siege).toBeTruthy(); expect(a.siege).not.toBe(key); }
    // none of its kind left there: restless, then angry
    let restlessAt = -1, angryAt = -1;
    for (let i = 0; i < Math.round(150 / STEP) && angryAt < 0; i++) {
      stepGame(g, idle, STEP);
      if (restlessAt < 0 && L.legendState === "restless") restlessAt = g.clock.time;
      if (angryAt < 0 && L.legendState === "angry") angryAt = g.clock.time;
    }
    expect(restlessAt).toBeGreaterThan(0);
    expect(angryAt).toBeGreaterThan(restlessAt);
    expect(leashed.leashed).toBe(true);
  });

  // Ed (2026-10-06): "I think there should be an area of the tallest trees around each legend circle"; "It should blend back
  // smoothly into the rest of the forest around this area, so it doesn't stand out too much".
  it("each swells the forest round it, strongest at its edge and easing smoothly out into the area's own, open toward the camera", () => {
    const map = generateMap(123, TUNING), forest = new Forest(map), G = TUNING.legendClearing.grove, bins = 6, w = G.reach / bins;
    const sum = new Array(bins + 1).fill(0), n = new Array(bins + 1).fill(0);
    for (const lc of map.legendClearings) {
      for (const p of forest.treesNear(lc.x, lc.z, lc.r + 1.5 + G.reach + w)) {
        const d = Math.hypot(p.x - lc.x, p.z - lc.z), out = d - lc.r - 1.5, s = p.grove ?? 0, g0 = legendGrove(map, p.x, p.z);
        if (out < 0) continue;
        // each tree's strength is the grove's here, jittered by at most G.jitter either way
        expect(s).toBeLessThanOrEqual(Math.min(1, g0 * (1 + G.jitter)) + 0.011);
        if (g0 * (1 - G.jitter) > 0.03) expect(s).toBeGreaterThanOrEqual(g0 * (1 - G.jitter) - 0.011);
        if ((p.z - lc.z) / d > Math.cos((G.gap * Math.PI) / 180)) continue;
        const k = Math.min(bins, Math.floor(out / w));
        sum[k] += s; n[k]++;
      }
    }
    const mean = sum.map((v, k) => v / Math.max(1, n[k]));
    // strong at the edge, gone past its reach (but for another clearing's near by), and easing down step by step between (no wall, no cliff)
    expect(mean[0]).toBeGreaterThan(0.6);
    expect(mean[bins]).toBeLessThan(0.08);
    for (let k = 1; k <= bins; k++) { expect(mean[k]).toBeLessThan(mean[k - 1]); expect(mean[k - 1] - mean[k]).toBeLessThan(0.4); }
    // and thicker near it than out where the area's own forest stands (per metre of ring)
    const perArea = (k: number) => n[k] / (k + 0.5);
    expect(perArea(0)).toBeGreaterThan(perArea(bins) * 0.9);
  });

  // Art builder 3's rim kit (#262) round each: on its ring, never its floor, leaving the way in and paths clear.
  it("each is edged by the rim kit: small pieces just past its floor, the way in (south) left open", () => {
    const map = generateMap(123, TUNING), forest = new Forest(map), R = TUNING.legendClearing.rim;
    let edged = 0;
    for (const lc of map.legendClearings) {
      const mine = forest.rimNear(lc.x, lc.z, lc.r + R.out + R.spread + 1).filter(p => Math.abs(Math.hypot(p.x - lc.x, p.z - lc.z) - lc.r - R.out - R.spread / 2) <= R.spread / 2 + 1e-6);
      for (const p of mine) {
        const d = Math.hypot(p.x - lc.x, p.z - lc.z);
        expect(d).toBeGreaterThanOrEqual(lc.r + R.out - 1e-6);
        expect((p.z - lc.z) / d).toBeLessThan(Math.cos((R.gap * Math.PI) / 180) + 1e-6);
        expect(map.paths.at(p.x, p.z, 1.5)).toBeFalsy();
        expect(p.type).toBe(map.typeOf(lc.cell[0], lc.cell[1]));
      }
      if (mine.length >= Math.round((2 * Math.PI * lc.r) / R.spacing) * R.chance * 0.5) edged++;
    }
    expect(edged).toBeGreaterThan(map.legendClearings.length * 0.8);
  });
});
