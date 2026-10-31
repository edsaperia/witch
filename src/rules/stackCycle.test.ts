// Cycling her stack (Ed's playtest of v5399, 2026-10-29: "sometimes when I was cycling animals in my stack, one of them seemed pinned
// to the bottom of the stack; didn't move from the bottom when I cycled them. An adult I think"): every creature's sigil, an adult's
// too, comes round to the bottom as she cycles, in the game's own steps; the one sigil drawn at the bottom that never cycles is a
// sleeping legend's she carries (rules/stoneStacks.ts tether), and the playtest log now says which it was (platform/playtestLog.ts).
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { newGame as fullGame, stepGame, STEP } from "./game";
import { smallWorld } from "../test/worlds";
const newGame = smallWorld(fullGame, "Stack cycling uses three nearby creatures and one tethered legend, independent of distant areas.");
import { stackBottom } from "./leash";
import { stackShown } from "../platform/playtestLog";

const C = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
function leashed(n: number) {
  const g = newGame(123, TUNING);
  g.clock.paused = false; g.party.spellAt = undefined;
  g.witch = { ...g.witch, seated: false, perch: false, mode: "ground" };
  const cs = g.creatures.filter(c => !c.boss && !c.gone && c.level > 0).slice(0, n);
  cs[0].level = 2; // (an adult among them)
  for (const c of cs) { c.leashed = true; c.state = "leashed"; g.leash.stack.push(c.id); c.x = g.witch.x + 2; c.z = g.witch.z; }
  g.byArea = null;
  return { g, cs };
}
const cycle = (g: ReturnType<typeof leashed>["g"]) => { stepGame(g, { ...C, cycle: true } as never, STEP); for (let i = 0; i < 20; i++) stepGame(g, C, STEP); };

describe("cycling her stack", () => {
  it("brings every sigil to the bottom in turn, the adult's too", () => {
    const { g, cs } = leashed(3), bottoms = new Set<number>();
    for (let k = 0; k < 6; k++) { cycle(g); bottoms.add(stackBottom(g.leash)!.id); }
    expect([...bottoms].sort()).toEqual(cs.map(c => c.id).sort());
  });
  it("a sleeping legend's sigil she carries is drawn last and stays there (it never cycles): the log names it", () => {
    const { g } = leashed(2), L = g.creatures.find(c => c.boss)!;
    g.leash.tether = { id: L.id, length: 30 };
    for (let k = 0; k < 3; k++) {
      cycle(g);
      const shown = stackShown(g);
      expect(shown).toHaveLength(3);
      expect(shown[2]).toBe(`tether #${L.id} ${L.species}`);
    }
  });
});
