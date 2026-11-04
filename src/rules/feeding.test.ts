// Feeding on command (Ed, 2026-11-03): no animal eats on its own; only the bottom of her sigil stack, when she taps the sigil button
// with a berry within berries.feed.reach of her, a berry a tap (rules/sigilButton.ts, rules/berries.ts). Holding the button
// berries.feed.hold seconds puts the sigil down instead. And at a knockdown her carried sigils fall where she went down, parked there
// (rules/knockout.ts), their queues cancelled.
import { describe, expect, it } from "vitest";
import type { Creature, Level } from "./creatures";
import { speedFactor, wanderRange } from "./creatures";
import { hitWitch, stepGame, STEP, type Controls, type Game, type Witch } from "./game";
import { queuedFor, toEvolve } from "./berries";
import { pipCount, pipFuel } from "./buffs";
import { hexCell, stackBottom } from "./leash";
import { feedOffer } from "./sigilButton";
import { TUNING, withTuning } from "./tuning";
import { TRAVEL } from "./travel";
import { FIGHT } from "./movement";
import { replayGuest, replayStart } from "../platform/online/replay";
import { preppedGame } from "../test/preppedGame"; // (games on a map made once a file from its prep)

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const T = withTuning({ witchHealth: { ...TUNING.witchHealth, hits: 1e6 }, invites: { ...TUNING.invites, on: false } });
const F = T.berries.feed!;
const run = (g: Game, secs: number, c: Controls = idle, each?: () => void) => { for (let i = 0; i < Math.round(secs / STEP); i++) { stepGame(g, c, STEP); each?.(); } };
const tap = (g: Game) => stepGame(g, { ...idle, place: true }, STEP); // (a press with nothing holding it: a tap)

/** She stands on the ground in a quiet wild area two out from home, hers following (on her stack in this order, the last the bottom),
 *  `berries` un-taken berries round her at 3 to 5 m and every other berry within 200 m taken. */
function scene(levels: Level[], berries = 4, seed = 123, players = 1): { g: Game; W: Witch; mine: Creature[]; site: { x: number; z: number } } {
  const g = preppedGame(seed, T, players), W = g.witches[0];
  g.clock.paused = false; g.party.paused = true; g.party.spellAt = -100; // (the party on: the world awake)
  const [hx, hy] = g.map.centreCell, cell: [number, number] = [hx + 2, hy], site = g.map.siteOf(cell[0], cell[1]);
  W.body = { ...W.body, seated: false, perch: false, mode: "ground", lift: 0, x: site.x, z: site.z };
  for (const c of g.creatures) if (Math.hypot(c.x - site.x, c.z - site.z) < 250) c.gone = true;
  const spare = g.creatures.filter(c => !c.gone && !c.leashed && !c.boss && Math.hypot(c.x - site.x, c.z - site.z) > 300);
  const mine = levels.map((level, i) => {
    const c = spare[i], x = site.x - 3 + i, z = site.z + 2, sp = "fox";
    Object.assign(c, { species: sp, level, x, z, tx: x, tz: z, cell, homeX: x, homeZ: z, anchorX: x, anchorZ: z, range: wanderRange(g.map), speed: T.creatureSpeed * speedFactor(sp, level, T), gone: false, hp: undefined, drops: undefined, siege: undefined, enraged: false, fight: undefined, circle: undefined, leashed: true, state: "leashed" as Creature["state"], rest: 0 });
    W.leash.stack.push(c.id);
    return c;
  });
  const B = g.berries;
  B.berries.forEach(b => { const p = B.bushes[b.bush]; if (Math.hypot(p.x - site.x, p.z - site.z) < 200) b.claimedBy = -1; });
  B.berries.filter(b => b.claimedBy === null && !b.gone).slice(0, berries).forEach((b, i) => Object.assign(B.bushes[b.bush], { x: site.x + Math.cos(i * 1.7) * (3 + i * 0.5), z: site.z - 4 + Math.sin(i * 1.7) * (3 + i * 0.5) }));
  g.byArea = null;
  return { g, W, mine, site };
}
const fed = (g: Game, c: Creature) => (g.berries.fed.get(c.id) ?? 0);

describe("feeding on command (Ed, 2026-11-03)", () => {
  it("only the bottom animal eats, and only when she presses: none eats on its own beside ripe berries", () => {
    const { g, W, mine } = scene([1, 1]), [top, bottom] = mine;
    run(g, 8);
    expect(g.berries.feeding.size, "nothing eats on its own").toBe(0);
    expect(fed(g, top) + fed(g, bottom)).toBe(0);
    expect(stackBottom(W.leash)).toEqual({ kind: "creature", id: bottom.id });
    expect(feedOffer(g, W)?.id).toBe(bottom.id);
    tap(g);
    expect(g.berries.feeding.has(bottom.id)).toBe(true);
    expect(g.berries.feeding.has(top.id)).toBe(false);
    expect(W.leash.placed.length, "a tap feeds, it doesn't put down").toBe(0);
    run(g, 6);
    expect(fed(g, bottom)).toBe(1);
    expect(fed(g, top)).toBe(0);
  }, 60000);

  it("each press queues one more, capped by the berries in reach and the animal's room; no hold-to-repeat", () => {
    const { g, W, mine } = scene([1], 3), [y] = mine;
    const S = { ...idle, place: false, sigilHeld: true };
    stepGame(g, { ...idle, place: true, sigilHeld: true }, STEP); // pressed, held: waits for tap or hold
    stepGame(g, idle, STEP); // let go: a tap
    for (let i = 0; i < 5; i++) stepGame(g, S, STEP); // (held on without a fresh press: nothing more)
    stepGame(g, idle, STEP);
    expect(queuedFor(g.berries, y.id)).toBe(1);
    for (let i = 0; i < 5; i++) tap(g);
    expect(queuedFor(g.berries, y.id), "three berries in reach, three queued").toBe(3);
    // room: a youth a berry from adult takes one
    const s2 = scene([1], 5), [y2] = s2.mine;
    s2.g.berries.fed.set(y2.id, toEvolve(1, T, y2.species) - 1);
    for (let i = 0; i < 4; i++) tap(s2.g);
    expect(queuedFor(s2.g.berries, y2.id)).toBe(1);
    expect(feedOffer(s2.g, s2.W), "full: no feed on offer").toBeNull();
    // a tap now puts it down, as ever
    tap(s2.g);
    expect(s2.W.leash.placed.map(p => p.id)).toEqual([y2.id]);
    void W;
  }, 60000);

  it("holding the button berries.feed.hold seconds puts the bottom sigil down instead (the prompt says which); held on, a run goes on as ever", () => {
    const { g, W, mine } = scene([1, 1], 4);
    const held = { ...idle, sigilHeld: true };
    stepGame(g, { ...held, place: true }, STEP);
    expect(W.leash.feedHold).toBeDefined();
    for (let i = 0; i < Math.ceil((F.hold * 0.5) / STEP); i++) stepGame(g, held, STEP);
    expect(W.leash.placed.length, "not yet").toBe(0);
    for (let i = 0; i < Math.ceil((F.hold * 0.6) / STEP) + 1; i++) stepGame(g, held, STEP);
    expect(W.leash.placed.map(p => p.id), "held: put down").toEqual([mine[1].id]);
    expect(g.berries.feeding.size, "and nothing fed").toBe(0);
    expect(W.leash.run?.kind, "a run of putting down begun").toBe("place");
    // walking on, still held: the next goes down in the next empty hex (rules/leash.ts runs)
    const H = T.leash.hex!.size, cell0 = hexCell(W.body.x, W.body.z, H);
    for (let i = 0; i < 4 / STEP && W.leash.placed.length < 2; i++) stepGame(g, { ...held, moveX: 1 }, STEP);
    expect(W.leash.placed.length).toBe(2);
    expect(hexCell(W.leash.placed[1].x, W.leash.placed[1].z, H)).not.toEqual(cell0);
  }, 60000);

  it("a tap shorter than the hold feeds; standing on her own sigil the press picks it up, not feeds", () => {
    const { g, W, mine } = scene([1, 1], 4), [top, bottom] = mine;
    stepGame(g, { ...idle, place: true, sigilHeld: true }, STEP);
    stepGame(g, { ...idle, sigilHeld: true }, STEP);
    stepGame(g, idle, STEP); // let go inside the hold: a tap
    expect(g.berries.feeding.has(bottom.id)).toBe(true);
    expect(W.leash.placed.length).toBe(0);
    // her top one parked on the cell she stands in: the press picks it up
    W.leash.stack = W.leash.stack.filter(id => id !== top.id);
    W.leash.placed.push({ id: top.id, x: W.body.x, z: W.body.z, at: g.clock.time });
    expect(feedOffer(g, W)).toBeNull();
    tap(g);
    expect(W.leash.stack).toContain(top.id);
    expect(W.leash.placed.length).toBe(0);
  }, 60000);

  it("with nothing to feed and nothing on her stack, holding the button still puts her hat down (leash.hatHold)", () => {
    const { g, W } = scene([], 4);
    stepGame(g, { ...idle, place: true, sigilHeld: true, hatHold: true }, STEP);
    for (let i = 0; i < ((T.leash.hatHold ?? 0.5) + 0.2) / STEP && !W.hat.down; i++) stepGame(g, { ...idle, sigilHeld: true, hatHold: true }, STEP);
    expect(W.hat.down).not.toBeNull();
  }, 60000);

  it("queue, then park: it eats what was queued, then goes to its parked spot and is parked", () => {
    const { g, W, mine } = scene([1], 4), [y] = mine;
    tap(g); tap(g);
    expect(queuedFor(g.berries, y.id)).toBe(2);
    // she walks a few metres off and parks it (a hold)
    run(g, 0.6, { ...idle, moveX: 1 });
    stepGame(g, { ...idle, place: true, sigilHeld: true }, STEP);
    run(g, F.hold + 0.1, { ...idle, sigilHeld: true });
    run(g, 0.1);
    const p = W.leash.placed.find(q => q.id === y.id)!;
    expect(p, "parked").toBeDefined();
    expect(g.berries.feeding.has(y.id), "still off to eat").toBe(true);
    run(g, 12);
    expect(fed(g, y)).toBe(2);
    expect(queuedFor(g.berries, y.id)).toBe(0);
    expect(Math.hypot(y.x - p.x, y.z - p.z), "back by its sigil").toBeLessThan(T.leash.length + 1);
    expect(W.leash.placed.some(q => q.id === y.id)).toBe(true);
  }, 60000);

  it("goes to its berry at its own pace times berries.feed.speed, not faster", () => {
    const { g, mine } = scene([1], 1), [y] = mine, b = g.berries.berries.find(q => q.claimedBy === null)!, p = g.berries.bushes[b.bush];
    Object.assign(p, { x: g.witch.x + 12, z: g.witch.z });
    Object.assign(y, { x: g.witch.x - 2, z: g.witch.z + 0.6, tx: g.witch.x - 2, tz: g.witch.z + 0.6 });
    tap(g);
    const at = { x: y.x, z: y.z };
    run(g, 1);
    const v = Math.hypot(y.x - at.x, y.z - at.z);
    const pace = Math.max(y.speed, T.leash.runSpeed * speedFactor(y.species, y.level, T)) * F.speed;
    expect(v).toBeLessThan(pace * 1.05);
    expect(v).toBeGreaterThan(pace * 0.8);
  }, 60000);

  it("a youth's growth completes and it grows on the bar line; the selection stays on it (no cycling)", () => {
    const { g, W, mine } = scene([1, 1], 3), [, y] = mine;
    g.berries.fed.set(y.id, toEvolve(1, T, y.species) - 1);
    tap(g);
    let evolving = false;
    run(g, 6, idle, () => { evolving ||= g.berries.evolving.has(y.id); });
    expect(evolving).toBe(true);
    run(g, 6);
    expect(y.level).toBe(2);
    expect(stackBottom(W.leash), "still the selected one").toEqual({ kind: "creature", id: y.id });
  }, 60000);

  it("a baby's one berry makes it a youth, by command only", () => {
    const { g, mine } = scene([0], 3), [b] = mine;
    run(g, 4);
    expect(g.berries.feeding.has(b.id)).toBe(false);
    tap(g);
    expect(queuedFor(g.berries, b.id)).toBe(1);
    tap(g);
    expect(queuedFor(g.berries, b.id), "a baby has room for one").toBe(1);
    run(g, 10);
    expect(b.level).toBe(1);
  }, 60000);

  it("an adult's pips come by command: it waits by the berries; each tap a pip, up to the most", () => {
    const { g, W, mine } = scene([2], 6), [a] = mine, max = T.buffs!.pips.max;
    const pips = () => pipCount(pipFuel(g.berries, a.id, T), T);
    run(g, 4);
    expect(pips(), "its first, uneaten to").toBe(1);
    for (let i = 0; i < 8 && feedOffer(g, W); i++) tap(g);
    expect(queuedFor(g.berries, a.id)).toBe(max - 1);
    expect(W.leash.stack, "fed to its most, still on her stack").toContain(a.id);
    run(g, 15);
    expect(pips()).toBe(max);
    // hurt, it can eat again: the berry heals, no pip
    a.drops = 0.5;
    expect(feedOffer(g, W)?.id).toBe(a.id);
    tap(g);
    run(g, 8);
    expect(a.drops).toBeUndefined();
    expect(pips()).toBeLessThanOrEqual(max);
  }, 60000);
});

describe("fed before fighting (Ed, 2026-11-03: \"if you have given the instruction to a creature to eat a berry, it should priotise that over fighting\")", () => {
  it("a queued creature with a wild foe in range walks to its berries and eats them, fighting no one meanwhile; then it fights again", () => {
    const { g, mine, site } = scene([1], 3), [y] = mine;
    // a wild boar a few metres off, going for her (and in reach of hers), enraged
    const boar = g.creatures.find(c => !c.gone && !c.leashed && !c.boss && c.level > 0 && Math.hypot(c.x - site.x, c.z - site.z) > 300)!;
    const bx = site.x + 10, bz = site.z + 4;
    Object.assign(boar, { species: "boar", level: 1, x: bx, z: bz, tx: bx, tz: bz, anchorX: bx, anchorZ: bz, homeX: bx, homeZ: bz, cell: g.map.cellSafe(bx, bz).cell, enraged: true, state: "enraged", fight: undefined, rest: 0, friendly: false, siege: undefined, hunting: 0 });
    g.byArea = null;
    tap(g); tap(g);
    expect(queuedFor(g.berries, y.id)).toBe(2);
    let fought = false;
    run(g, 12, idle, () => { if (queuedFor(g.berries, y.id) > 0 && y.fight?.target) fought = true; });
    expect(fought, "no fight while it has berries queued").toBe(false);
    expect(fed(g, y), "it ate them both").toBe(2);
    expect(queuedFor(g.berries, y.id)).toBe(0);
    // its queue eaten, it goes back to fighting as ever
    let back = false;
    if (!boar.gone && boar.enraged) run(g, 6, idle, () => { back ||= y.fight?.target?.kind === "creature" && y.fight.target.id === boar.id; });
    expect(back || boar.gone || !boar.enraged, "fighting again (or the boar's done for)").toBe(true);
  }, 60000);

  // Travellers ate no berries from 2026-10-05, when animals ate on their own (rules/travel.ts). Since feeding became a command (3 Nov),
  // a press feeds the bottom of her stack even if it's travelling (Ed, 2026-11-04: allow it): it walks to the berry quietly and back.
  it("feeds the bottom one even while it's travelling: it walks to its berry quietly, eats, and is hers still", () => {
    const { g, W, mine } = scene([1], 1), [y] = mine, far = TRAVEL.posse * TRAVEL.leave * FIGHT.scale + 20; // (past where it leaves her posse)
    Object.assign(y, { x: W.body.x - far, z: W.body.z, tx: W.body.x - far, tz: W.body.z });
    run(g, 0.2);
    expect(y.travelling, "far behind her: travelling").toBe(true);
    expect(feedOffer(g, W)?.id).toBe(y.id);
    tap(g);
    expect(g.berries.feeding.has(y.id), "the press feeds it").toBe(true);
    let fought = false;
    run(g, 60, idle, () => { if (y.fight?.target) fought = true; });
    expect(fed(g, y), "it walked in and ate").toBe(1);
    expect(fought, "quiet: no fight on the way").toBe(false);
    expect(W.leash.stack).toContain(y.id);
    expect(y.leashed).toBe(true);
  }, 60000);
});

describe("knocked down (Ed, 2026-11-03: \"If you're knocked down, animals' sigils fall and stay where you were knocked down\")", () => {
  const knock = (g: Game, W: Witch) => { W.health.hp = 1; hitWitch(g, W.id, g.clock.time, g.tuning); expect(W.ko).not.toBeNull(); };

  it("drops every carried sigil, a baby's too, round her spot on the hex grid, each its own cell, the animals parked there", () => {
    const { g, W, mine, site } = scene([0, 1, 2], 0);
    const at = { x: W.body.x, z: W.body.z };
    knock(g, W);
    run(g, 6);
    expect(W.leash.stack).toEqual([]);
    expect(W.leash.placed.map(p => p.id).sort()).toEqual(mine.map(c => c.id).sort());
    const H = T.leash.hex!.size, cells = new Set(W.leash.placed.map(p => { const h = hexCell(p.x, p.z, H); return `${h.q},${h.r}`; }));
    expect(cells.size).toBe(3);
    for (const p of W.leash.placed) expect(Math.hypot(p.x - at.x, p.z - at.z)).toBeLessThan(H * 2.1);
    for (const c of mine) { expect(c.leashed, "still hers").toBe(true); expect(c.state).not.toBe("happy"); expect(c.dropped).toBeUndefined(); }
    void site;
  }, 60000);

  it("cancels the queued berries at a knockdown", () => {
    const { g, W, mine } = scene([1], 4), [y] = mine;
    tap(g); tap(g);
    expect(queuedFor(g.berries, y.id)).toBe(2);
    knock(g, W);
    expect(queuedFor(g.berries, y.id)).toBe(0);
    expect(g.berries.berries.some(b => b.claimedBy === y.id)).toBe(false);
  }, 60000);

  it("those parked at her knockdown guard there: a wild one going for her by the spot is taken on", () => {
    const { g, W, mine } = scene([1, 1], 0);
    const at = { x: W.body.x, z: W.body.z };
    knock(g, W);
    run(g, 3); // (the sigils down; she's gone home)
    // a wild boar comes at the spot (she's back there, say): within guard.radius of their sigils
    const boar = g.creatures.find(c => !c.gone && !c.leashed && !c.boss && c.level > 0 && Math.hypot(c.x - at.x, c.z - at.z) > 300)!;
    Object.assign(boar, { species: "boar", level: 1, x: at.x + 14, z: at.z, tx: at.x + 14, tz: at.z, anchorX: at.x + 14, anchorZ: at.z, homeX: at.x + 14, homeZ: at.z, cell: g.map.cellSafe(at.x, at.z).cell, enraged: true, state: "enraged", fight: undefined, rest: 0, friendly: false, siege: undefined });
    g.byArea = null;
    let taken = false;
    run(g, 4, idle, () => { taken ||= mine.some(c => c.fight?.target?.kind === "creature" && c.fight.target.id === boar.id); });
    expect(taken).toBe(true);
  }, 60000);
});

describe("feeding online (lockstep)", () => {
  it("the guest's queue lives in the game state: her taps feed her bottom one, and a snapshot carries the queue and a held press", () => {
    const { g } = scene([], 6, 123, 2), G = g.witches[1];
    const site = { x: g.witches[0].body.x, z: g.witches[0].body.z };
    G.body = { ...G.body, seated: false, perch: false, mode: "ground", lift: 0, x: site.x + 1, z: site.z };
    const y = g.creatures.find(c => !c.gone && !c.leashed && !c.boss && c.level === 1 && Math.hypot(c.x - site.x, c.z - site.z) > 300)!;
    Object.assign(y, { x: site.x + 1, z: site.z + 2, tx: site.x + 1, tz: site.z + 2, leashed: true, state: "leashed", rest: 0 });
    G.leash.stack.push(y.id);
    if (G.house?.slept) G.house.slept = false;
    stepGame(g, [idle, { ...idle, place: true }], STEP);
    expect(queuedFor(g.berries, y.id)).toBe(1);
    stepGame(g, [idle, { ...idle, place: true, sigilHeld: true }], STEP);
    expect(G.leash.feedHold).toBeDefined();
    const copy = replayGuest(replayStart(g, "test", 1), "test").game; // (the guest's copy, as an online night hands it over)
    expect(queuedFor(copy.berries, y.id)).toBe(queuedFor(g.berries, y.id));
    expect(copy.witches[1].leash.feedHold).toBe(G.leash.feedHold);
    // the same inputs on both give the same queue (deterministic)
    for (const h of [g, copy]) stepGame(h, [idle, idle], STEP);
    expect(queuedFor(copy.berries, y.id)).toBe(queuedFor(g.berries, y.id));
    expect(queuedFor(g.berries, y.id)).toBe(2);
  }, 60000);
});
