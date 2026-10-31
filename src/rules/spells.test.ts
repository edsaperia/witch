// Hats and brooms with spells (Ed, 2026-10-11; rules/spells.ts, docs/backlog/unlocks.md): the loadout, the broom's parts in
// play (the Workshop, Ed 2026-10-23: the old passive brooms' jobs), the Helmet (an extra hit, knocked off) and the Healing ring (placed).
import { describe, expect, it } from "vitest";
import { TUNING, type Tuning } from "./tuning";
import { hitWitch, newGame as fullGame, stepGame, type Game } from "./game";
import { smallWorld } from "../test/worlds";
const newGame = smallWorld(fullGame, "Loadout, dodge, helmet and healing tests use one witch's local state, independent of area diversity.");
import { wearing } from "./hat";
import { BROOM_SPELLS, HAT_SPELLS, broomOf, castable, hatOf, newSpells, setLoadout, setParts } from "./spells";
import { fittedKey, fittedOf } from "./broomParts";

const C = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
const loadout = (hat: string, parts = ""): Tuning => ({ ...TUNING, spells: { ...TUNING.spells, hat, parts } });
function game(t: Tuning): Game {
  const g = newGame(123, t);
  g.clock.paused = false;
  g.party.spellAt = undefined;
  g.witch = { ...g.witch, seated: false, perch: false, mode: "ground", lift: 0 };
  return g;
}
const step = (g: Game, secs: number, c = C) => { for (let i = 0; i < Math.round(secs * 60); i++) stepGame(g, c, 1 / 60); };

describe("the loadout", () => {
  it("is a hat and a broom, none of either by default; unknown or unbuilt spells are none", () => {
    const s = newSpells(TUNING);
    expect([s.hat, s.broom]).toEqual(["none", "none"]);
    expect(fittedKey(s.parts)).toBe("-,-,-"); // (a bare broom: no parts)
    expect(hatOf("helmet")).toBe("helmet");
    expect(hatOf("tophat")).toBe("none");
    expect(broomOf("speed")).toBe("speed");
    expect(broomOf("long")).toBe("none"); // (the passive brooms are parts now: rules/broomParts.ts)
    for (const x of [...HAT_SPELLS, ...BROOM_SPELLS].filter(x => !x.built)) expect(x.id in { none: 1 } ? "none" : hatOf(x.id) === "none" && broomOf(x.id) === "none").toBe(true);
    setLoadout(s, "healing");
    expect([s.hat, s.broom]).toEqual(["healing", "none"]);
    expect(castable(s)).toBe(false); // (only a broom with an active spell has anything to cast)
    // her broom's spell is never picked (the stand's Power row and ?broom= are gone): it's the set her parts complete
    setParts(s, fittedOf("missile,fairing,nozzles"));
    expect(s.broom).toBe("speed");
    expect(castable(s)).toBe(true);
    setLoadout(s, "helmet"); // (a hat changes nothing of her broom)
    expect([s.broom, fittedKey(s.parts)]).toEqual(["speed", "missile,fairing,nozzles"]);
  });
});

describe("broom parts in the game (the Workshop, Ed 2026-10-23)", () => {
  const parts = (p: string): Tuning => ({ ...TUNING, spells: { ...TUNING.spells, parts: p } });
  it("the Curled tip's blinks go half as far again", () => {
    const far = (t: Tuning) => { const g = game(t); g.witch = { ...g.witch, x: g.map.dancefloor.x, z: g.map.dancefloor.z }; stepGame(g, { ...C, moveX: 1, dash: true }, 1 / 60); const D = g.witches[0].dash; return Math.hypot(D.toX - D.fromX, D.toZ - D.fromZ); };
    expect(far(parts("curl"))).toBeGreaterThan(far(TUNING) + 4);
    expect(far(parts("oar"))).toBeLessThan(far(TUNING) - 2); // (the Oar blade's shorter)
  });
  it("the Twig bristles give one more blink before the cooldown (the Double blink broom's old job)", () => {
    const blinks = (t: Tuning) => {
      const g = game(t);
      g.witch = { ...g.witch, x: g.map.dancefloor.x, z: g.map.dancefloor.z };
      step(g, (t.dash.cooldown ?? 1) * 4); // (all charges back)
      let n = 0;
      for (let i = 0; i < 8; i++) { const at = g.witches[0].dash.at; stepGame(g, { ...C, moveX: i % 2 ? 1 : -1, dash: true }, 1 / 60); step(g, 0.25); if (g.witches[0].dash.at !== at) n++; }
      return n;
    };
    expect(blinks(parts("twigs"))).toBe(blinks(TUNING) + 1);
  });
  it("the Jet-bike fairing runs faster on foot, the Ladder slower", () => {
    const run = (t: Tuning) => { const g = game(t), x0 = g.witch.x; step(g, 1.5, { ...C, moveX: 1 }); return g.witch.x - x0; };
    const bare = run(TUNING);
    expect(run(parts("fairing"))).toBeGreaterThan(bare * 1.08);
    expect(run(parts("ladder"))).toBeLessThan(bare * 0.95);
  });
  it("the Missile nose flies faster in the treetops", () => {
    const fly = (t: Tuning) => { const g = game(t); g.witch = { ...g.witch, mode: "treetop", lift: 1 }; const x0 = g.witch.x; step(g, 1, { ...C, moveX: 1 }); return g.witch.x - x0; };
    expect(fly(parts("missile"))).toBeGreaterThan(fly(TUNING) * 1.05);
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
