// A quest animal standing in its legend's circle finishes the quest (Ed's playtest, 2026-10-07, via the coordinator: "I brought
// a quest animal into the legend circle and I wasn't granted the buff"): following her or parked, wherever its sigil lies; the
// wrong kind or age is named on the circle's panel instead.
import { describe, expect, it } from "vitest";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { broughtLine, creatureWords, legendCircleNear } from "./legendCircle";
import { setupQuestDemo } from "./quest";
import { TUNING } from "./tuning";

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

describe("a quest animal standing in its legend's circle", () => {
  it("finishes the quest following her, with no sigil put down", () => {
    const { g, L, gift } = demo();
    expect(g.leash.stack).toContain(gift.id);
    let joined = -1;
    for (let i = 0; i < 12 && L.quest!.done === undefined; i++) { stepGame(g, idle, STEP); for (const e of g.questEvents) if (e.kind === "done" && e.id === L.id) joined = e.joined; }
    expect(L.quest!.done).toBeDefined();
    expect(L.buffed).toBe(true);
    expect(joined).toBe(gift.id);
    expect(gift.leashed).toBe(true); // (still hers)
  }, 60000);

  it("finishes it parked, its sigil put down outside the circle (as Ed's party was: all parked)", () => {
    const { g, L, gift, ring } = demo();
    g.leash.stack = g.leash.stack.filter(id => id !== gift.id);
    g.leash.placed.push({ id: gift.id, x: ring.x + ring.r + 6, z: ring.z, at: g.clock.time }); // (its rune outside)
    Object.assign(gift, { x: ring.x + ring.r - 2, z: ring.z, tx: ring.x + ring.r - 2, tz: ring.z }); // (it, inside)
    run(g, 0.2);
    expect(L.quest!.done).toBeDefined();
    expect(L.buffed).toBe(true);
  }, 60000);

  it("doesn't for the wrong age or kind, and the circle's panel names both", () => {
    const { g, L, gift } = demo();
    const want = { ...L.quest! };
    gift.level = ((gift.level + 1) % 3) as typeof gift.level;
    run(g, 0.2);
    expect(L.quest!.done).toBeUndefined();
    const near = legendCircleNear(g, g.witch)!;
    expect(near.legend.id).toBe(L.id);
    const line = broughtLine(g, near)!;
    expect(line.text).toContain(`it dreams of ${creatureWords(want.species, want.level)}`);
    expect(line.text).toContain(creatureWords(gift.species, gift.level));
    gift.species = want.species === "elk" ? "stag" : "elk"; gift.level = want.level; // (a look-alike kind at the right age)
    run(g, 0.2);
    expect(L.quest!.done).toBeUndefined();
    expect(broughtLine(g, near)!.text).toContain(creatureWords(gift.species, gift.level));
  }, 60000);

  it("says nothing once the quest is done, or with none of hers in the circle", () => {
    const { g, L } = demo();
    const near = () => ({ ...g.map.legendClearing(L.cell[0], L.cell[1])!, legend: L });
    run(g, 0.2);
    expect(broughtLine(g, near())).toBeNull(); // (done)
    expect(creatureWords("elk", 1)).toBe("a young elk");
    expect(creatureWords("otter", 2)).toBe("an adult otter");
    expect(creatureWords("glowworm", 0)).toBe("a baby glow-worm");
  }, 60000);
});
