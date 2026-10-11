// Hats and brooms with spells (Ed, 2026-10-11; rules/spells.ts, docs/backlog/unlocks.md): the loadout, the plain broom's
// shorter rise cooldown, the Long broom's blink, the Helmet (an extra hit, knocked off) and the Healing ring (placed).
import { describe, expect, it } from "vitest";
import { TUNING, type Tuning } from "./tuning";
import { hitWitch, newGame, stepGame, type Game } from "./game";
import { wearing } from "./hat";
import { BROOM_SPELLS, HAT_SPELLS, blinkDistance, extraBlinks, broomOf, castable, hatOf, newSpells, riseCooldownOf, setLoadout } from "./spells";

const C = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
const loadout = (hat: string, broom = "none"): Tuning => ({ ...TUNING, spells: { ...TUNING.spells, hat, broom } });
function game(t: Tuning): Game {
  const g = newGame(123, t);
  g.clock.paused = false;
  g.party.spellAt = undefined;
  g.witch = { ...g.witch, seated: false, mode: "ground", lift: 0 };
  return g;
}
const step = (g: Game, secs: number, c = C) => { for (let i = 0; i < Math.round(secs * 60); i++) stepGame(g, c, 1 / 60); };

describe("the loadout", () => {
  it("is a hat and a broom, none of either by default; unknown or unbuilt spells are none", () => {
    const s = newSpells(TUNING);
    expect([s.hat, s.broom]).toEqual(["none", "none"]);
    expect(hatOf("helmet")).toBe("helmet");
    expect(hatOf("tophat")).toBe("none");
    expect(broomOf("speed")).toBe("speed");
    for (const x of [...HAT_SPELLS, ...BROOM_SPELLS].filter(x => !x.built)) expect(x.id in { none: 1 } ? "none" : hatOf(x.id) === "none" && broomOf(x.id) === "none").toBe(true);
    setLoadout(s, "healing", "long");
    expect([s.hat, s.broom]).toEqual(["healing", "long"]);
    // only a broom with an active spell has anything to cast
    expect(castable(s)).toBe(false);
    setLoadout(s, "none", "speed");
    expect(castable(s)).toBe(true);
  });
});

describe("brooms", () => {
  it("the plain broom lets her rise again sooner after landing (Ed: 'default broom reduces treetop cooldown')", () => {
    const plain = newSpells(TUNING), speed = newSpells(loadout("none", "speed"));
    expect(riseCooldownOf(plain, TUNING)).toBeCloseTo((TUNING.riseCooldown ?? 0) * TUNING.spells.plain!.riseCooldown);
    expect(riseCooldownOf(speed, TUNING)).toBe(TUNING.riseCooldown ?? 0);
    expect(riseCooldownOf(plain, TUNING)).toBeLessThan(riseCooldownOf(speed, TUNING));
  });

  it("the Long broom's blinks go twice as far", () => {
    expect(blinkDistance(newSpells(loadout("none", "long")), TUNING)).toBe(TUNING.dash.distance * 2);
    expect(blinkDistance(newSpells(TUNING), TUNING)).toBe(TUNING.dash.distance);
    // in the game: the blink's target as far as the clear ground lets it, never shorter than the plain one's
    const far = (t: Tuning) => { const g = game(t); g.witch = { ...g.witch, x: g.map.dancefloor.x, z: g.map.dancefloor.z }; stepGame(g, { ...C, moveX: 1, dash: true }, 1 / 60); const D = g.witches[0].dash; return Math.hypot(D.toX - D.fromX, D.toZ - D.fromZ); };
    expect(far(loadout("none", "long"))).toBeGreaterThan(far(TUNING) + 5);
  });
});

describe("the Double blink broom (Ed, 2026-10-11: 'a broom that gives you an extra blink')", () => {
  it("gives one more blink before the cooldown", () => {
    expect(extraBlinks(newSpells(loadout("none", "double")), TUNING)).toBe(1);
    expect(extraBlinks(newSpells(TUNING), TUNING)).toBe(0);
    // in the game: blink after blink, one more goes before she has to wait
    const blinks = (t: Tuning) => {
      const g = game(t);
      g.witch = { ...g.witch, x: g.map.dancefloor.x, z: g.map.dancefloor.z };
      step(g, (t.dash.cooldown ?? 1) * 4); // (all charges back)
      let n = 0;
      for (let i = 0; i < 8; i++) { const at = g.witches[0].dash.at; stepGame(g, { ...C, moveX: i % 2 ? 1 : -1, dash: true }, 1 / 60); step(g, 0.25); if (g.witches[0].dash.at !== at) n++; }
      return n;
    };
    expect(blinks(loadout("none", "double"))).toBe(blinks(TUNING) + 1);
  });
});

describe("hats", () => {
  it("the Helmet takes the first blow, knocked off beside her; picked up and worn again, it takes the next", () => {
    const g = game(loadout("helmet")), W = g.witches[0], hits = W.health.hp;
    expect(wearing(W.hat)).toBe(true);
    hitWitch(g, 0, g.clock.time);
    expect(W.health.hp).toBe(hits); // (soaked)
    expect(wearing(W.hat)).toBe(false);
    expect(Math.hypot(W.hat.down!.x - g.witch.x, W.hat.down!.z - g.witch.z)).toBeLessThan(2);
    expect(g.koEvents.some(e => e.kind === "helmetOff")).toBe(true);
    // off, the next blow costs a hit
    step(g, TUNING.witchHealth.grace + 0.1);
    hitWitch(g, 0, g.clock.time);
    expect(W.health.hp).toBe(hits - 1);
    // put back on (the sigil button over it), it takes the next one again
    g.witch = { ...g.witch, x: W.hat.down!.x, z: W.hat.down!.z };
    stepGame(g, { ...C, place: true }, 1 / 60); stepGame(g, C, 1 / 60);
    expect(wearing(W.hat)).toBe(true);
    step(g, TUNING.witchHealth.grace + 0.1);
    hitWitch(g, 0, g.clock.time);
    expect(W.health.hp).toBe(hits - 1);
    expect(wearing(W.hat)).toBe(false);
  });

  it("a plain hat takes nothing", () => {
    const g = game(TUNING), W = g.witches[0], hits = W.health.hp;
    hitWitch(g, 0, g.clock.time);
    expect(W.health.hp).toBe(hits - 1);
    expect(wearing(W.hat)).toBe(true);
  });

  it("the Healing ring, put down, heals her a hit every few seconds while she stands by it, and not away from it", () => {
    const H = TUNING.spells.healing!, g = game(loadout("healing")), W = g.witches[0];
    W.health.hp = 2; W.health.repairAt = Infinity; // (out of the fight's own slow repair)
    W.hat.down = { x: g.witch.x, z: g.witch.z, at: g.clock.time };
    let healed = false;
    for (let i = 0; i < Math.round((H.every + 0.2) * 60); i++) { stepGame(g, C, 1 / 60); healed ||= g.koEvents.some(e => e.kind === "healed"); }
    expect(W.health.hp).toBe(3);
    expect(healed).toBe(true);
    // walked away: no more
    g.witch = { ...g.witch, x: g.witch.x + H.radius + 5 };
    W.health.repairAt = Infinity;
    step(g, H.every * 1.5);
    expect(W.health.hp).toBe(3);
    // worn (not down): nothing
    W.hat.down = null; g.witch = { ...g.witch };
    step(g, H.every * 1.5);
    expect(W.health.hp).toBe(3);
  });
});
