// A carried relic's sigil sits in her stack like the creatures' (Ed's playtest, 2026-10-08, via the coordinator: "The flask sigil
// appears to the side of the leashed sigil stack instead of within it. Flasks should behave like other sigils in this regard; sit
// in the stack, and cycle when it cycles"): picked up, at the bottom; cycled with the rest; the bottom sigil is the active one,
// so the place button gives the flask to a sleeping legend only from the bottom, and puts a creature's down when that's there.
import { describe, expect, it } from "vitest";
import type { Creature } from "./creatures";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { carryRelic, cycleStack, dropRelic, inviteCreature, newLeash, stackBottom, stackOrder, toBottom } from "./leash";
import { LEGEND_BUFFS } from "./buffs";
import { LEGENDS } from "./legends";
import { cellKey } from "./party";
import { TUNING } from "./tuning";

const NO_SLOW = { ...TUNING, legendCircle: { slow: { ...TUNING.legendCircle!.slow, on: false } } };
const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const run = (g: Game, secs: number, first: Controls = idle) => { for (let i = 0; i < Math.round(secs / STEP); i++) stepGame(g, i === 0 ? first : idle, STEP); };
const names = (s: ReturnType<typeof newLeash>) => stackOrder(s).map(it => `${it.kind[0]}${it.id}`);

describe("a relic's sigil in her stack", () => {
  it("goes on at the bottom, a creature leashed after it goes under it, and it cycles with the rest", () => {
    const s = newLeash();
    s.stack.push(1, 2, 3);
    carryRelic(s, 0);
    expect(names(s)).toEqual(["c1", "c2", "c3", "r0"]);
    expect(stackBottom(s)).toEqual({ kind: "relic", id: 0 });
    expect(cycleStack(s)).toEqual({ kind: "relic", id: 0 });
    expect(names(s)).toEqual(["r0", "c1", "c2", "c3"]);
    expect(stackBottom(s)).toEqual({ kind: "creature", id: 3 });
    cycleStack(s);
    expect(names(s)).toEqual(["c3", "r0", "c1", "c2"]);
    cycleStack(s); cycleStack(s);
    expect(names(s)).toEqual(["c1", "c2", "c3", "r0"]); // (round again)
    // a creature leashed now goes on at the bottom, under the flask
    s.stack.push(4);
    expect(names(s)).toEqual(["c1", "c2", "c3", "r0", "c4"]);
    // two relics keep their own places; a creature cycled past them goes over both
    carryRelic(s, 5);
    expect(names(s)).toEqual(["c1", "c2", "c3", "r0", "c4", "r5"]);
    toBottom(s, 2);
    expect(names(s)).toEqual(["c1", "c3", "r0", "c4", "r5", "c2"]);
    dropRelic(s, 0);
    expect(names(s)).toEqual(["c1", "c3", "c4", "r5", "c2"]);
    // creatures let go from anywhere (a knockout, a party legend) leave the relics in order, none past the end
    s.stack.splice(0, s.stack.length);
    expect(names(s)).toEqual(["r5"]);
    expect(stackBottom(s)).toEqual({ kind: "relic", id: 5 });
  });

  it("a relic alone, or a creature alone, doesn't cycle; the two together do", () => {
    const s = newLeash();
    carryRelic(s, 3);
    expect(cycleStack(s)).toBeNull();
    s.stack.push(7);
    expect(names(s)).toEqual(["r3", "c7"]);
    expect(cycleStack(s)).toEqual({ kind: "creature", id: 7 });
    expect(names(s)).toEqual(["c7", "r3"]);
  });
});

/** The witch on the ground in a sleeping legend's clearing, with two of hers following and the flask picked up. */
function setup(): { g: Game; L: Creature; mine: Creature[]; relic: number; ring: { x: number; z: number; r: number } } {
  const g = newGame(123, NO_SLOW);
  g.clock.paused = false; g.party.paused = true; g.clearedAt = Infinity;
  const L = g.creatures.find(c => c.boss && c.legendState === "asleep" && LEGEND_BUFFS.species[c.species] && !LEGENDS.charge.species.includes(c.species))!;
  for (const c of g.creatures) if (!c.boss && (cellKey(c.cell) === cellKey(L.cell) || Math.hypot(c.x - L.x, c.z - L.z) < 120)) c.gone = true;
  for (const c of g.creatures) if (c.boss && c !== L && Math.hypot(c.x - L.x, c.z - L.z) < 700) c.gone = true;
  const ring = g.map.legendClearing(L.cell[0], L.cell[1])!;
  g.witch = { ...g.witch, seated: false, mode: "ground", lift: 0, x: ring.x, z: ring.z + ring.r * 0.5 };
  // one of its kind in its area (so it sleeps on), and two of hers, of another kind (no quest done by them)
  const far = g.creatures.filter(c => !c.gone && !c.leashed && !c.boss && Math.hypot(c.x - L.x, c.z - L.z) > 300);
  Object.assign(far[0], { species: L.species, level: 1, x: ring.x + 30, z: ring.z, tx: ring.x + 30, tz: ring.z, cell: [L.cell[0], L.cell[1]], circle: undefined, hp: undefined, siege: undefined, enraged: false });
  const other = L.quest?.species === "wolf" || L.species === "wolf" ? "boar" : "wolf";
  const mine = [far[1], far[2]].map(c => { Object.assign(c, { species: other, level: 2, circle: undefined, hp: undefined, siege: undefined, enraged: false, x: g.witch.x + 2, z: g.witch.z, tx: g.witch.x + 2, tz: g.witch.z }); inviteCreature(g.leash, c, c.x, c.z, g.clock.time); return c; });
  g.byArea = null; g.witches[0].health.hp = 1e6;
  const r = g.relics[0];
  carryRelic(g.leash, r.id); r.state = "carried";
  return { g, L, mine, relic: r.id, ring };
}

describe("the flask in her stack, in play", () => {
  it("the place button gives it to a sleeping legend only from the bottom; with a creature's sigil there, that goes down", () => {
    const { g, L, mine, relic, ring } = setup();
    // a creature invited after the flask goes under it: E puts that creature's sigil down, in the circle too, and the flask stays
    const late = g.creatures.find(c => !c.gone && !c.leashed && !c.boss && !mine.includes(c) && c.species !== L.species && Math.hypot(c.x - L.x, c.z - L.z) > 300)!;
    Object.assign(late, { species: mine[0].species, level: 1, circle: undefined, hp: undefined, x: g.witch.x - 2, z: g.witch.z, tx: g.witch.x - 2, tz: g.witch.z });
    inviteCreature(g.leash, late, late.x, late.z, g.clock.time);
    expect(stackOrder(g.leash).map(it => it.kind)).toEqual(["creature", "creature", "relic", "creature"]);
    run(g, 0.2, { ...idle, place: true });
    expect(g.leash.placed.map(p => p.id)).toEqual([late.id]);
    expect(g.leash.relics).toEqual([relic]);
    expect(L.legendState).toBe("asleep");
    // the flask at the bottom now: E gives it, and the legend wakes happy
    expect(stackBottom(g.leash)).toEqual({ kind: "relic", id: relic });
    g.witch = { ...g.witch, x: ring.x - ring.r * 0.4, z: ring.z + ring.r * 0.3 }; // (off the sigil just put down)
    run(g, 0.2, { ...idle, place: true });
    expect(g.leash.relics).toEqual([]);
    expect(L.legendState).toBe("happy");
    expect(g.leash.stack).toEqual(mine.map(c => c.id)); // (hers as they were)
  }, 60000);

  it("cycles with the stack (Q), the cycled event naming it a relic; at the bottom away from any legend, E leaves it be", () => {
    const { g, mine, relic } = setup();
    g.witch = { ...g.witch, x: g.witch.x + 400, z: g.witch.z }; // (well away from the legend)
    for (const c of mine) Object.assign(c, { x: g.witch.x + 2, z: g.witch.z, tx: g.witch.x + 2, tz: g.witch.z });
    expect(stackBottom(g.leash)?.kind).toBe("relic");
    run(g, 0.2, { ...idle, place: true });
    expect(g.leash.placed).toEqual([]);
    expect(g.leash.relics).toEqual([relic]);
    let ev = null as null | { id: number; relic?: boolean };
    stepGame(g, { ...idle, cycle: true }, STEP);
    ev = g.leashEvents.find(e => e.kind === "cycled") ?? null;
    expect(ev).toMatchObject({ id: relic, relic: true });
    expect(stackOrder(g.leash)[0]).toEqual({ kind: "relic", id: relic });
    expect(stackBottom(g.leash)).toEqual({ kind: "creature", id: mine[1].id });
    run(g, 0.2, { ...idle, place: true });
    expect(g.leash.placed.map(p => p.id)).toEqual([mine[1].id]);
  }, 60000);
});
