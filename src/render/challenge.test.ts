// The challenge circle's look (render/challenge.ts; Ed, 2026-11-03: "the glowing sigil of the island carved into it"; on #1725, the
// cleared circle's dancefloor "should fill the circle, like the one at home does ... replacing the previous floor"): its stone floor's
// carving glows while it waits; cleared, home's dancefloor fills it in place of the stone, coming in from the middle, its tiles lit
// on the beat; closed uncleared, dark stone; no beam of light over it in any state (Ed, 2026-11-03: "remove the beam").
import { describe, expect, it } from "vitest";
import { newGame, stepGame, type Controls, type Game } from "../rules/game";
import { TUNING, type Tuning } from "../rules/tuning";
import { befriend } from "../rules/creatureStates";
import { islandSigilOf } from "../rules/dancefloor";
import { startPartyOver } from "../rules/partyOver";
import { challengeCarving, challengeFloor, challengeRing, challengeShot, columnTop } from "./challenge";
import { challengeColumns, challengeReady } from "../rules/challenge";
import { rankColour } from "./leash/ranks";
import { NO_CARVING } from "./legendCarving";
import { columnKinds, columnSpots } from "../rules/challenge";
import { withTuning } from "../rules/tuning";
import { readFileSync } from "node:fs";

const still: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const T: Tuning = { ...TUNING, map: { ...TUNING.map!, island: "fox", islandAreas: 10 } };

function game(): Game {
  const g = newGame(2, T);
  g.clock.paused = false; g.party.spellAt = undefined; g.party.paused = true;
  g.witches[0].health.hp = 1e6;
  return g;
}

describe("the challenge circle's light", () => {
  it("glows while it waits; cleared, home's dancefloor fills the circle in place of its stone floor, lit on the beat", () => {
    const g = game(), ch = g.challenge!;
    const at = () => challengeRing(g, ch.x, ch.z)!;
    // (its sigil carved into its floor by the ground's own pass, Ed on #1725: "it should look like it's carved into the circle": the
    // legend slot carves nothing, the carving the island's sigil, its grooves glowing softly)
    expect(at().species).toBe(NO_CARVING);
    const carved = challengeCarving(g, ch.x, ch.z)!;
    expect(carved.species).toBe(islandSigilOf(g.map));
    expect([carved.x, carved.z, carved.r]).toEqual([ch.x, ch.z, ch.radius]);
    expect(carved.glow).toBeGreaterThan(0);
    g.witch = { ...g.witch, x: ch.x + 3, z: ch.z, mode: "ground", lift: 0, seated: false, perch: undefined };
    expect(challengeCarving(g, ch.x, ch.z)!.glow).toBeGreaterThan(carved.glow); // (brighter with her in it)
    expect(at().r).toBe(T.challenge!.radius);
    expect(challengeFloor(g, ch.x, ch.z)).toBeNull(); // (no dancefloor before it's cleared)
    // cleared: the spell cast on it
    for (const id of ch.pack) befriend(g.creatures[id], g.clock.time);
    for (const c of g.creatures) if (!ch.pack.includes(c.id) && Math.hypot(c.x - ch.x, c.z - ch.z) < 250) c.gone = true;
    g.witch = { ...g.witch, x: ch.x, z: ch.z, mode: "ground", lift: 0, seated: false, perch: undefined };
    for (let i = 0; i < 60 * (T.cast!.time + 0.5) && ch.clearedAt === null; i++) stepGame(g, { ...still, sigilHeld: true }, 1 / 60);
    expect(ch.clearedAt).not.toBeNull();
    expect(challengeRing(g, ch.x, ch.z)).toBeNull(); // (its stone floor and carving gone: the dancefloor in their place)
    const first = challengeFloor(g, ch.x, ch.z)!;
    expect([first.x, first.z, first.r]).toEqual([ch.x, ch.z, ch.radius]); // (filling the circle)
    expect(first.k).toBeLessThan(1); // (coming in from the middle)
    const lit: number[] = [], k: number[] = [];
    for (let i = 0; i < 180; i++) {
      stepGame(g, still, 1 / 60);
      const f = challengeFloor(g, ch.x, ch.z)!;
      k.push(f.k); let sum = 0; for (let n = 3; n < f.rgbi.length; n += 4) sum += f.rgbi[n]; lit.push(sum);
    }
    expect(k[k.length - 1]).toBe(1); // (all the way out within its rise)
    expect(Math.min(...lit)).toBeGreaterThan(0); // (tiles lit always)
    expect(Math.max(...lit) - Math.min(...lit)).toBeGreaterThan(50); // (brighter on the beat, a different few each beat)
    for (const id of ch.pack) { const c = g.creatures[id]; if (!c.gone) expect(Math.hypot(c.anchorX - ch.x, c.anchorZ - ch.z) + c.range).toBeLessThanOrEqual(ch.radius); } // (the pack dance on it)
  }, 60000);

  it("lights a column's top steadily warm once its kind's all won over, the rest faint and cold; all lit, ready to cast (Ed, 2026-11-03)", () => {
    const g = game(), ch = g.challenge!;
    expect(challengeColumns(g).every(c => !columnTop(c, T).lit)).toBe(true); // (every kind still wild)
    const [first] = challengeColumns(g);
    for (const e of first.sigils) befriend(g.creatures[e.id], g.clock.time);
    const cols = challengeColumns(g), top = columnTop(cols[0], T), cold = columnTop(cols[1], T);
    expect(top.lit).toBe(true);
    expect(top.rgb).toEqual(rankColour(T, 2, true)); // (the party's warm colour)
    expect(top.alpha).toBeGreaterThan(cold.alpha);
    expect(cold.lit).toBe(false);
    expect(challengeReady(g)).toBe(false);
    for (const id of ch.pack) befriend(g.creatures[id], g.clock.time);
    expect(challengeColumns(g).every(c => columnTop(c, T).lit)).toBe(true);
    expect(challengeReady(g)).toBe(true); // (every column lit: the spell's notes at its middle)
  }, 60000);

  it("puts no beam of light over it, waiting, cleared or closed (Ed: \"remove the beam\")", () => {
    // (its only light is its own floor's, columns' and dancefloor's: nothing of it among the markers' beacons and lasers)
    const src = readFileSync("src/render/challenge.ts", "utf8"), home = readFileSync("src/render/view/home.ts", "utf8");
    expect(src).not.toMatch(/beacons\.push|lasers\.push|Beacon\b/);
    expect(src).not.toMatch(/slotOf\(|LEGEND_LEVEL/); // (and no glyph sprite laid over its floor: its sigil is carved, challengeCarving)
    expect(home).not.toMatch(/challenge/i);
  });

  it("is dark once closed", () => {
    const g = game(), ch = g.challenge!;
    startPartyOver(g, g.clock.time); // (the night lost: Ed, on #1725, only then or once it's won)
    stepGame(g, still, 1 / 60);
    expect(ch.closedAt).not.toBeNull();
    expect(challengeCarving(g, ch.x, ch.z)!.glow).toBe(0); // (dark: no glow in its grooves)
    expect(challengeFloor(g, ch.x, ch.z)).toBeNull(); // (dark stone: no dancefloor)
  }, 60000);

  it("fires a firework from one column each bar once cleared, the next clockwise each bar; none before clearing or after closing (Ed, 2026-11-03)", () => {
    const g = game(), ch = g.challenge!, n = columnSpots(ch, columnKinds(g).length).length;
    expect(n).toBe(new Set(g.map.island!.roster.map(r => r.kind)).size); // (a column a roster kind)
    expect(challengeShot(g)).toBeNull(); // (not cleared: nothing)
    for (const id of ch.pack) befriend(g.creatures[id], g.clock.time);
    for (const c of g.creatures) if (!ch.pack.includes(c.id) && Math.hypot(c.x - ch.x, c.z - ch.z) < 250) c.gone = true;
    g.witch = { ...g.witch, x: ch.x, z: ch.z, mode: "ground", lift: 0, seated: false, perch: undefined };
    for (let i = 0; i < 60 * (T.cast!.time + 0.5) && ch.clearedAt === null; i++) stepGame(g, { ...still, sigilHeld: true }, 1 / 60);
    expect(ch.clearedAt).not.toBeNull();
    // Bar by bar for a while: each new bar the next column round, its downbeat in that bar, never before the clearing.
    const seen: { bar: number; column: number; at: number }[] = [];
    for (let i = 0; i < 60 * 12; i++) { stepGame(g, still, 1 / 60); const s = challengeShot(g); if (s && seen[seen.length - 1]?.bar !== s.bar) seen.push(s); }
    expect(seen.length).toBeGreaterThan(3);
    for (let i = 1; i < seen.length; i++) {
      expect(seen[i].bar).toBe(seen[i - 1].bar + 1);
      expect(seen[i].column).toBe((seen[i - 1].column + 1) % n); // (clockwise: the columns run clockwise from north, rules/challenge.ts columnSpots)
    }
    expect(seen[0].at).toBeGreaterThanOrEqual(ch.clearedAt! - 1e-6);
    // the same column order for every player: a function of the map's seed and the beat clock alone
    const again = challengeShot(g, seen[1].bar)!;
    expect(again.column).toBe(seen[1].column);
    // (clockwise from above, north up: from the first column due north the second lies east of it)
    const [a, b] = columnSpots(ch, n);
    expect(a.z).toBeLessThan(ch.z); expect(b.x).toBeGreaterThan(a.x);
    // off with its knob
    expect(challengeShot({ ...g, tuning: withTuning({ challenge: { ...T.challenge!, fireworks: { ...T.challenge!.fireworks!, on: false } } }) } as Game)).toBeNull();
  }, 90000);

  it("fires nothing once closed uncleared", () => {
    const g = game(), ch = g.challenge!;
    startPartyOver(g, g.clock.time);
    for (let i = 0; i < 60 * 4; i++) stepGame(g, still, 1 / 60);
    expect(ch.closedAt).not.toBeNull();
    expect(challengeShot(g)).toBeNull();
  }, 60000);
});
