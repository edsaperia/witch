import { describe, expect, it } from "vitest";
import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import ts from "typescript";
import { newGame, stepGame, STEP, setWitchPaused, hitWitch, type Controls, type Game } from "./game";
import { TUNING } from "./tuning";
import { snapshotGame, restoreGame } from "./nightSnapshot";
import { legendRings, slowTarget } from "./slowTime";
import { startWake, wakeOf, startParty, WAKE_DEFAULT } from "./wakeUp";
import { HOUSE_ROOMS, objectFront } from "./houseRooms";
import { inviteCreature } from "./leash";
import { sharedNightProgress } from "./sharedNightProgress";
import { spreadWave, cellKey } from "./party";
import { stepCreaturesNear } from "./creatures";
import { rng, rngState } from "./random";
import { newLodCounts } from "./simLod";
import { stepWildWatch, watcher } from "./wildWatch";
import { keepIn } from "./mapShape";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
function fresh(players = 2): Game {
  // Four authored areas retain three occupied wild watches and complete seeded multiplayer replay coverage.
  const t = structuredClone(TUNING); t.map!.island = "home"; t.map!.islandAreas = 4;
  const g = newGame(123, t, players);
  g.clock.paused = false; g.party.spellAt = -100;
  g.witches.forEach((W, i) => {
    W.body = { ...W.body, seated: false, perch: false, x: g.map.dancefloor.x + (i ? 15 : -15), z: g.map.dancefloor.z + 40, mode: "ground", lift: 0 };
  });
  return g;
}
const run = (g: Game, n: number, inputs: Controls[] = [idle, idle]) => { for (let i = 0; i < n; i++) stepGame(g, inputs, STEP); };
const hash = (g: Game) => createHash("sha256").update(JSON.stringify(snapshotGame(g))).digest("hex");

describe("several witches in one deterministic night", () => {
  it("keeps the legacy solo controls call identical to the one-element stream", () => {
    const a = fresh(1), b = fresh(1);
    for (let i = 0; i < 180; i++) {
      const c = { ...idle, moveX: i % 30 < 15 ? 1 : -1, toggleMode: i % 53 === 0, dash: i % 47 === 0 };
      const dt = STEP * (i % 2 ? 1.6 : 0.4);
      stepGame(a, c, dt); stepGame(b, [c], dt);
    }
    expect(hash(a)).toBe(hash(b));
    expect(Object.hasOwn(a.witches[0], "time")).toBe(false);
    expect(Object.hasOwn(a.witches[0], "paused")).toBe(false);
    expect(Object.hasOwn(a.witches[0], "pending")).toBe(false);
  });
  it("moves each witch from her own controls without scaling the population or health", () => {
    const g = fresh(), solo = fresh(1), before = g.witches.map(W => ({ ...W.body }));
    run(g, 12, [{ ...idle, moveX: 1 }, { ...idle, moveZ: 1 }]);
    expect(g.witches[0].body.x).toBeGreaterThan(before[0].x);
    expect(g.witches[0].body.z).toBeCloseTo(before[0].z);
    expect(g.witches[1].body.z).toBeGreaterThan(before[1].z);
    expect(g.witches[1].body.x).toBeCloseTo(before[1].x);
    expect(g.witches.map(W => W.time)).toEqual([g.herTime, g.herTime]);
    expect(g.creatures.length).toBe(solo.creatures.length);
    expect(g.witches.map(W => W.health.hp)).toEqual([solo.witches[0].health.hp, solo.witches[0].health.hp]);
    const guest = { ...g.witches[1].body };
    stepGame(g, idle, STEP); // legacy host-only callers supply neutral guest controls
    expect(g.witches[1].body.x).toBeCloseTo(guest.x);
    expect(() => stepGame(g, [idle], STEP)).toThrow("One input");
  });

  it("queues each player's one-shot independently across a frame without a simulation step", () => {
    const g = fresh();
    stepGame(g, [idle, { ...idle, hat: true }], STEP * 0.4);
    expect(g.witches[1].hat.down).toBeNull();
    stepGame(g, [idle, idle], STEP * 0.6);
    expect(g.witches[0].hat.down).toBeNull();
    expect(g.witches[1].hat.down).toBeDefined();
    const at = g.witches[1].hat.down!.at;
    run(g, 3);
    expect(g.witches[1].hat.down!.at).toBe(at);
  });

  it("keeps dashes, leashes and knockout/recovery on the owning witch", () => {
    const g = fresh(), [a, b] = g.witches;
    const followers = g.creatures.filter(c => !c.boss && c.level > 0).slice(0, 2);
    followers.forEach((c, i) => inviteCreature(g.witches[i].leash, c, c.x, c.z, g.clock.time));
    run(g, 1, [idle, { ...idle, sigil: true }]);
    expect(a.leash.stack).toContain(followers[0].id);
    expect(a.leash.placed).toHaveLength(0);
    expect(b.leash.placed.map(p => p.id)).toContain(followers[1].id);
    run(g, 1, [idle, { ...idle, dash: true, moveX: 1 }]);
    expect(a.dash.at).toBe(-Infinity); expect(b.dash.at).toBeGreaterThan(0);
    // Damage after the dash's immunity has elapsed; no revive or shared health.
    b.dash.at = -Infinity; b.dash.until = -Infinity; b.health.hp = 1;
    hitWitch(g, b.id, g.clock.time);
    expect(b.ko).not.toBeNull(); expect(a.ko).toBeNull();
    const x = a.body.x;
    run(g, 10, [{ ...idle, moveX: 1 }, { ...idle, moveX: 1 }]);
    expect(a.body.x).toBeGreaterThan(x);
    expect(b.ko).not.toBeNull();
  });

  it("only pauses for every player's pause page; station and booth global pauses are ignored", () => {
    const g = fresh();
    setWitchPaused(g, 0, true); g.clock.paused = true; // legacy page panel state
    run(g, 1); expect(g.clock.time).toBeGreaterThan(0);
    setWitchPaused(g, 1, true); const at = g.clock.time;
    run(g, 10); expect(g.clock.time).toBe(at);
    setWitchPaused(g, 0, false); run(g, 1);
    expect(g.clock.time).toBeGreaterThan(at);
    expect(g.witches[1].paused).toBe(true);
  });

  it("slows only when every witch is in the treehouse, including the decks", () => {
    const g = fresh(), scale = g.tuning.legendCircle!.slow.scale;
    const ring = legendRings(g)[0];
    for (const W of g.witches) W.body = { ...W.body, x: ring.x, z: ring.z, perch: false };
    g.creatures[ring.id].legendState = "asleep";
    expect(slowTarget(g)).toBe(1);
    g.witches[0].body.perch = true; expect(slowTarget(g)).toBe(1);
    g.witches[1].body.perch = true; g.witches[1].body.seated = true;
    expect(slowTarget(g)).toBe(scale);
    g.witches[1].body.mode = "treetop"; expect(slowTarget(g)).toBe(1);
  });

  it("gives mornings and dressing their own state and lets a guest start the shared party", () => {
    const g = fresh(); g.party.spellAt = null;
    for (const W of g.witches) startWake(g, 0, {}, W);
    run(g, 30);
    run(g, 1, [idle, { ...idle, sigil: true }]);
    expect(wakeOf(g, g.witches[0])!.beat).toBe("alarm");
    expect(wakeOf(g, g.witches[1])!.beat).toBe("snooze");
    run(g, 1, [idle, { ...idle, moveX: 1 }]);
    run(g, Math.ceil(WAKE_DEFAULT.stretch / STEP) + 1);
    const guest = g.witches[1], wake = wakeOf(g, guest)!;
    expect(wake.open).toBe(true); expect(g.wake!.open).toBe(false);
    const mirror = HOUSE_ROOMS.objects.find(o => o.id === "dressingTable")!, p = objectFront(mirror, g.map.treehouse, 0.6);
    guest.body = { ...guest.body, x: p.x, z: p.z };
    run(g, 1, [idle, { ...idle, sigil: true }]);
    expect(wake.styled).toBe(true); expect(g.wake!.styled).toBeUndefined();
    const seat = g.map.start;
    guest.body = { ...guest.body, x: seat.x, z: seat.z };
    expect(startParty(g, 120, guest)).toBe(true);
    expect(guest.body.seated).toBe(true); expect(g.party.spellAt).not.toBeNull();
  });

  it("does not hold an outdoor witch during another witch's DJ routine", () => {
    const g = fresh(); g.party.spellAt = g.clock.time;
    g.witches[1].body.seated = true;
    const x = g.witch.x;
    run(g, 12, [{ ...idle, moveX: 1 }, idle]);
    expect(g.witch.x).toBeGreaterThan(x);
  });

  it.each([true, false])("lets any witch pick up a placed sigil without duplicating its creature (hex=%s)", hex => {
    const g = fresh(), [a, b] = g.witches, c = g.creatures.find(c => !c.boss)!;
    if (!hex) g.tuning.leash.hex = undefined;
    c.leashed = true;
    a.leash.placed.push({ id: c.id, x: b.body.x, z: b.body.z, at: 0 });
    run(g, 1, [idle, { ...idle, sigil: true }]);
    expect(a.leash.placed).toHaveLength(0);
    expect(b.leash.stack).toContain(c.id);
    expect(g.witches.flatMap(W => [...W.leash.stack, ...W.leash.placed.map(p => p.id)]).filter(id => id === c.id)).toHaveLength(1);
  });

  it("ends the shared night only after every witch finishes the bed hold", () => {
    const g = fresh(), bed = HOUSE_ROOMS.objects.find(o => o.use.kind === "bed")!, p = objectFront(bed, g.map.treehouse, 0.6);
    for (const W of g.witches) W.body = { ...W.body, x: p.x, z: p.z, perch: true };
    run(g, Math.ceil((HOUSE_ROOMS.bed.hold + 0.1) / STEP), [{ ...idle, sigilHeld: true }, idle]);
    expect(g.witches[0].house?.slept).toBe(true);
    expect(g.witches[1].house?.slept).not.toBe(true);
    expect(g.leashEvents.some(e => e.obj === "slept")).toBe(false);
    run(g, 20, [{ ...idle, moveX: 1, fire: true, dash: true, spell: true, sigil: true }, idle]);
    expect(g.witches[0].house?.slept).toBe(false); // Ed: movement gets only this sleeper up while another is awake.
    expect(g.witches[0].invites.letters).toHaveLength(0);
    expect(g.leashEvents.some(e => e.obj === "slept")).toBe(false);
    run(g, Math.ceil(3.2 / STEP), [idle, idle]);
    Object.assign(g.witches[0].body, p);
    run(g, Math.ceil((HOUSE_ROOMS.bed.hold + .1) / STEP), [{ ...idle, sigilHeld: true }, idle]);
    expect(g.witches[0].house?.slept).toBe(true);
    let ended = 0;
    for (let i = 0; i < Math.ceil((HOUSE_ROOMS.bed.hold + 0.1) / STEP); i++) {
      run(g, 1, [idle, { ...idle, sigilHeld: true }]);
      ended += g.leashEvents.filter(e => e.obj === "slept").length;
    }
    expect(ended).toBe(1);
    run(g, 20, [{ ...idle, moveX: 1 }, { ...idle, moveX: -1 }]);
    expect(g.witches.every(w => w.house?.slept)).toBe(true); // All-asleep transition has already begun.
  });

  it("keeps all three occupied wild watches until each area's last witch leaves", () => {
    const g = fresh(3), occupied = new Map<string, typeof g.creatures[number]>(), home = cellKey(g.map.centreCell);
    for (const c of g.creatures) if (watcher(c) && cellKey(c.cell) !== home) occupied.set(cellKey(c.cell), c);
    const areas = [...occupied].slice(0, 3); expect(areas).toHaveLength(3);
    areas.forEach(([, c], i) => { g.witches[i].body = { ...g.witches[i].body, x: c.x, z: c.z }; });
    g.clock.time = 1; stepWildWatch(g, g.tuning);
    const starts = areas.map(([key]) => g.wildEntry.get(key)!.at);
    g.clock.time = 2; stepWildWatch(g, g.tuning);
    expect(areas.map(([key]) => g.wildEntry.get(key)!.at)).toEqual(starts);
    g.witches[0].body.perch = true; stepWildWatch(g, g.tuning);
    expect(g.wildEntry.has(areas[0][0])).toBe(false);
    expect(areas.slice(1).every(([key]) => g.wildEntry.has(key))).toBe(true);
  });

  it("does not let another witch reset an outward push against the zoo edge", () => {
    // Retain the complete zoo layout: the outward boundary and exit are the behavior under test.
    const t = structuredClone(TUNING); t.map = { ...t.map!, shape: "zoo", island: "", islandAreas: 0 }; t.beach!.on = false;
    const g = newGame(7, t, 2), [a, b] = g.witches, L = g.map.zoo!.layout!;
    const edge = keepIn(g.map.bounds, L.home.x, g.map.bounds.minZ);
    a.body = { ...a.body, x: edge.x, z: edge.z, seated: false, perch: false };
    run(g, 45, [{ ...idle, moveZ: -1 }, idle]);
    expect(a.zooPush).toBeGreaterThanOrEqual(0.5);
    expect(b.zooPush).toBe(0);
    expect(g.zooExit).toBeDefined();
  });

  it("simulates creatures near the guest once, even when two witch ranges overlap", () => {
    const g = fresh(), source = g.creatures.find(c => !c.boss)!;
    const a = { ...source, rand: rng(rngState(source.rand)!) }, b = { ...source, rand: rng(rngState(source.rand)!) };
    const watcher = { x: a.homeX, z: a.homeZ, radius: 100, full: Infinity }, counts = newLodCounts();
    stepCreaturesNear([a], 1e6, 1e6, 100, STEP, 1, g.map, undefined, undefined, counts, undefined, undefined, [watcher, watcher]);
    stepCreaturesNear([b], watcher.x, watcher.z, 100, STEP, 1, g.map, undefined, { full: Infinity, band: 0, every: 1 });
    expect(a.seen).toBe(1); expect(counts.full).toBe(1);
    expect({ ...a, rand: rngState(a.rand) }).toEqual({ ...b, rand: rngState(b.rand) });
  });

  it("restores with all players paused and clears each transient input queue", () => {
    const g = fresh(); run(g, 20);
    stepGame(g, [idle, { ...idle, dash: true }], STEP * 0.4);
    const h = restoreGame(JSON.parse(JSON.stringify(snapshotGame(g))));
    expect(h.witches.map(W => W.paused)).toEqual([true, true]);
    expect(h.witches.map(W => W.pending)).toEqual([{}, {}]);
    const at = h.clock.time; run(h, 1); expect(h.clock.time).toBe(at);
    // Both original and restored nights consume the same explicit resume sequence.
    g.acc = 0; g.witches.forEach(W => W.pending = {});
    for (const n of [g, h]) for (const W of n.witches) setWitchPaused(n, W.id, false);
    run(g, 60); run(h, 60);
    expect(hash(h)).toBe(hash(g));
  });

  it("replays two complete seeded nights for three minutes with matching full-state hashes", () => {
    const a = fresh(), b = fresh();
    const inputs = (i: number): Controls[] => [0, 1].map(p => ({ ...idle, moveX: Math.sin((i + p * 600) / 120), moveZ: Math.cos((i + p * 300) / 150), toggleMode: i % (383 + p * 12) === 0, dash: i % (127 + p * 14) === 0, fire: i % 120 < 30, spell: i % 997 === 0, pausePage: i % 2000 >= 1970 + p * 5, sigil: i % (503 + p * 20) === 0 }));
    for (let i = 0; i < 60 * 180; i++) {
      if (i === 1800) { spreadWave(a.party, a.map, a.clock.time); spreadWave(b.party, b.map, b.clock.time); }
      if (i === 2400) {
        for (const g of [a, b]) {
          const W = g.witches[1]; W.health.hp = 1; W.health.hurtAt = -Infinity; W.dash.until = -Infinity;
          hitWitch(g, 1, g.clock.time); expect(W.ko).not.toBeNull();
        }
      }
      const c = inputs(i); stepGame(a, c, STEP); stepGame(b, c, STEP);
      if (i % 1800 === 1799 || i % 2000 === 1980) expect(hash(a)).toBe(hash(b));
    }
    expect(a.witches.map(W => W.id)).toEqual([0, 1]);
    expect(a.creatures.every((c, i) => c.id === i)).toBe(true);
  }, 120_000);

  it("offers the same successful unlocks to both witches, with existing win and settlement gates", () => {
    const g = fresh(); g.islandsTonight = ["wolf"];
    g.trunk = { x: 0, z: 0, cell: [0, 0], kind: "hat", item: "helmet", found: true };
    expect(sharedNightProgress(g, 0)).toEqual({ islands: [], finds: [] });
    g.win = { phase: "won", lastWaveAt: 0, target: null, pickedAt: 0, lap: [], fired: 0, sigil: "tree", found: ["wolf"], lost: [], settled: false, lead: 0, congaSize: 0 };
    expect(sharedNightProgress(g, 1)).toEqual({ islands: [], finds: [{ kind: "hat", id: "helmet" }] });
    g.win.settled = true;
    expect(sharedNightProgress(g, 0)).toEqual(sharedNightProgress(g, 1));
    expect(sharedNightProgress(g, 1).islands).toEqual(["wolf"]);
    g.win.phase = "stragglers";
    expect(sharedNightProgress(g, 1)).toEqual({ islands: [], finds: [] });
    expect(() => sharedNightProgress(g, 99)).toThrow("Unknown witch");
  });

  it("bans unseeded Math.random access in production rules, including computed access", () => {
    const bad: string[] = [], root = join(process.cwd(), "src/rules");
    const scan = (dir: string) => { for (const ent of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, ent.name);
      if (ent.isDirectory()) scan(path);
      else if (ent.name.endsWith(".ts") && !ent.name.endsWith(".test.ts")) {
        const source = ts.createSourceFile(path, readFileSync(path, "utf8"), ts.ScriptTarget.Latest, true);
        const visit = (node: ts.Node) => {
          if ((ts.isPropertyAccessExpression(node) && node.expression.getText(source) === "Math" && node.name.text === "random") || (ts.isElementAccessExpression(node) && node.expression.getText(source) === "Math" && node.argumentExpression && ts.isStringLiteral(node.argumentExpression) && node.argumentExpression.text === "random")) bad.push(path);
          ts.forEachChild(node, visit);
        }; visit(source);
      }
    } }; scan(root); expect(bad).toEqual([]);
  });
});
