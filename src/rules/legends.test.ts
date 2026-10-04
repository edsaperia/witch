import { describe, expect, it } from "vitest";
import { maxHp } from "./combat";
import { LEGEND } from "./creatures";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { MOVEMENT } from "./movement";
import { TUNING } from "./tuning";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
/** A woken wild legend `dx` metres from the witch, who stands still and can't be knocked out. */
function legendNear(dx: number): { g: Game; c: Game["creatures"][number] } {
  const g = newGame(77, TUNING);
  g.clock.paused = false; g.party.paused = true;
  const d = g.map.dancefloor;
  g.witch = { ...g.witch, seated: false, x: d.x, z: d.z + 20, mode: "ground", lift: 0 };
  for (const c of g.creatures) if (Math.hypot(c.x - g.witch.x, c.z - g.witch.z) < 80) c.gone = true;
  g.witches[0].health.hp = 1e6;
  const c = g.creatures.find(k => !k.gone && !k.leashed && Math.hypot(k.x - g.witch.x, k.z - g.witch.z) > 150)!;
  const x = g.witch.x + dx, z = g.witch.z;
  Object.assign(c, { species: "bear", level: LEGEND, x, z, tx: x, tz: z, homeX: x, homeZ: z, anchorX: x, anchorZ: z, safeR: undefined, seen: 0, hp: undefined, boss: false, siege: undefined, rest: 0, speed: TUNING.legendSpeed });
  c.cell = g.map.cellSafe(g.witch.x, g.witch.z).cell as [number, number];
  g.byArea = null;
  return { g, c };
}
const run = (g: Game, secs: number, each?: () => void) => { for (let i = 0; i < Math.round(secs / STEP); i++) { stepGame(g, idle, STEP); each?.(); } };

describe("wild legends' move sets (Stage 5)", () => {
  it("works through its pattern: slam, nova, slam, charge, each wound up long", () => {
    const { g, c } = legendNear(3), W = g.witches[0], hp0 = W.health.hp, moves: string[] = [];
    let windups = 0;
    run(g, 30, () => { for (const e of g.combat.events) if (e.id === c.id && e.at === g.clock.time) { if (["quake", "nova", "rush"].includes(e.kind)) moves.push(e.kind); if (e.kind === "windup") windups++; } });
    expect(moves.slice(0, 3)).toEqual(["quake", "nova", "quake"]);
    expect(moves).toContain("rush");
    expect(windups).toBeGreaterThanOrEqual(moves.length);
    expect(W.health.hp).toBeLessThan(hp0);
    expect(MOVEMENT.legends.pattern[0]).toBe("legendSlam");
  }, 60000);

  it("roars into its second phase at half health, and spins its beam", () => {
    const { g, c } = legendNear(3);
    run(g, 1);
    c.hp = maxHp(LEGEND) * 0.45;
    let roared = false, spun = false;
    run(g, 25, () => { if (g.combat.events.some(e => e.id === c.id && e.kind === "phase")) roared = true; if (g.combat.beams.some(b => b.from === c.id && b.spin)) spun = true; });
    expect(roared).toBe(true);
    expect(c.legend?.phase).toBe(2);
    expect(spun).toBe(true);
  }, 60000);
});
