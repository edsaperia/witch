// Only putting the sigil down finishes a legend's quest (Ed, 2026-10-19: "The reward should be given when the sigil is placed, not
// when the animal enters the circle"): a sigil of the kind it dreams of, any age, put down inside its circle; her animal of that kind
// walking in, following her or parked, does nothing. A wrong sigil put down there is named on the circle's panel.
import { describe, expect, it } from "vitest";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { broughtLine, legendCircleNear, sigilWords } from "./legendCircle";
import { setupQuestDemo } from "./quest";
import { TUNING, withTuning } from "./tuning";

// Keep the radius fixtures: drop-versus-creature separation uses 200 m, and Ed's seed-162218 regression depends on its exact 14-area legend/coordinates.
const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const run = (g: Game, secs: number) => { for (let i = 0; i < Math.round(secs / STEP); i++) stepGame(g, idle, STEP); };
/** Beside the nearest sleeping legend with what it dreams of on her stack, standing in its circle. */
function demo() {
  const g = newGame(123, TUNING);
  g.clock.paused = false; g.party.paused = true;
  const L = setupQuestDemo(g, (x, z) => { g.witch = { ...g.witch, x, z, mode: "ground", lift: 0, seated: false }; })!;
  g.witches[0].health.hp = 1e6;
  const gift = g.creatures[g.leash.stack[g.leash.stack.length - 1]], ring = g.map.legendClearing(L.cell[0], L.cell[1])!;
  return { g, L, gift, ring };
}

describe("a legend's quest is done by the drop alone (Ed, 2026-10-19)", () => {
  it("not by her animal of its kind standing in the circle, following her", () => {
    const { g, L, gift } = demo();
    expect(g.leash.stack).toContain(gift.id);
    run(g, 2);
    expect(L.quest!.done).toBeUndefined();
    expect(L.legendState).not.toBe("happy");
  }, 60000);

  it("not by one parked in it with its sigil outside", () => {
    const { g, L, gift, ring } = demo();
    g.leash.stack = g.leash.stack.filter(id => id !== gift.id);
    g.leash.placed.push({ id: gift.id, x: ring.x + ring.r + 6, z: ring.z, at: g.clock.time }); // (its rune outside)
    Object.assign(gift, { x: ring.x + ring.r - 2, z: ring.z, tx: ring.x + ring.r - 2, tz: ring.z }); // (it, inside)
    run(g, 1);
    expect(L.quest!.done).toBeUndefined();
  }, 60000);

  it("completes on the very step its sigil is put down in the circle, its animal still far away", () => {
    const { g, L, gift, ring } = demo();
    Object.assign(gift, { x: ring.x + 200, z: ring.z, tx: ring.x + 200, tz: ring.z }); // (far off, still on her stack)
    expect(g.leash.stack[g.leash.stack.length - 1]).toBe(gift.id);
    stepGame(g, { ...idle, sigil: true }, STEP);
    expect(L.quest!.done).toBeDefined();
    expect(L.legendState).toBe("happy");
    expect(g.questEvents.some(e => e.kind === "done" && e.id === L.id && e.joined === gift.id)).toBe(true);
    expect(g.leash.placed.map(p => p.id)).toContain(gift.id);
  }, 60000);

  it("any age of the kind will do; a wrong kind's sigil is named on the panel the moment it's down", () => {
    const { g, L, gift, ring } = demo();
    const want = L.quest!.species;
    gift.species = want === "elk" ? "stag" : "elk"; // (a look-alike kind)
    Object.assign(gift, { x: ring.x + 200, z: ring.z, tx: ring.x + 200, tz: ring.z });
    stepGame(g, { ...idle, sigil: true }, STEP);
    expect(L.quest!.done).toBeUndefined();
    const near = legendCircleNear(g, g.witch)!;
    expect(broughtLine(g, near)!.text).toBe(`Not this one: it wants ${sigilWords(want)}, and you put down ${sigilWords(gift.species, true)}.`);
    // (picked up again, made the right kind at another age, and put down: done)
    stepGame(g, { ...idle, sigil: true }, STEP);
    expect(g.leash.stack).toContain(gift.id);
    gift.species = want; gift.level = ((gift.level + 1) % 3) as typeof gift.level;
    run(g, 0.2);
    stepGame(g, { ...idle, sigil: true }, STEP);
    expect(L.quest!.done).toBeDefined();
    expect(broughtLine(g, near)).toBeNull(); // (done: nothing to name)
  }, 60000);

  it("names nothing for a wrong kind merely standing in the circle (only a sigil put down counts)", () => {
    const { g, L, gift } = demo();
    gift.species = L.quest!.species === "elk" ? "stag" : "elk";
    run(g, 0.2);
    expect(broughtLine(g, legendCircleNear(g, g.witch)!)).toBeNull();
    expect(sigilWords("otter")).toBe("an otter's sigil");
    expect(sigilWords("beetle", true)).toBe("a stag beetle's");
  }, 60000);

  it("Ed's case (seed 162218, 14 areas): his parked adults of the dreamt kind standing in the circle no longer finish it", () => {
    // Preserve Ed's historical stoat/coordinates fixture; the default no-cap dream spread is covered in quest.test.ts.
    const T = withTuning({ legends: { ...TUNING.legends, questCap: 6 }, mapAreas: 14, map: { ...TUNING.map, radius: 14 / Math.sqrt(Math.PI) } } as never), g = newGame(162218, T);
    g.clock.paused = false; g.party.paused = true; g.witches[0].health.hp = 1e6;
    const L = g.creatures.filter(c => c.boss).sort((a, b) => Math.hypot(a.x - 2566, a.z - 1923) - Math.hypot(b.x - 2566, b.z - 1923))[0];
    expect(L.quest).toMatchObject({ species: "stoat" });
    const ring = g.map.legendClearing(L.cell[0], L.cell[1])!;
    g.witch = { ...g.witch, x: ring.x, z: ring.z + ring.r * 0.4, mode: "ground", lift: 0, seated: false };
    const spare = g.creatures.filter(c => !c.boss && !c.gone && !c.leashed && Math.hypot(c.x - ring.x, c.z - ring.z) > 300).slice(0, 2);
    spare.forEach((c, i) => {
      Object.assign(c, { species: "stoat", level: 2, circle: undefined, leashed: true, hp: undefined, siege: undefined, enraged: false, fight: undefined, fleeUntil: undefined, wanderTo: undefined, x: ring.x - 3 + i * 3, z: ring.z, tx: ring.x - 3 + i * 3, tz: ring.z });
      g.leash.placed.push({ id: c.id, x: ring.x + ring.r + 5 + i, z: ring.z, at: g.clock.time }); // (their runes just outside)
    });
    g.byArea = null;
    run(g, 1);
    expect(L.quest!.done).toBeUndefined();
  }, 120000);
});
