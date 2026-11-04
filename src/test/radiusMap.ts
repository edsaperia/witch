// The tests' map (Ed, 2026-10-11: the game now plays an island, map.islandAreas, 10 areas): most of the rules' tests were written
// for the ~100-area radius map (ley routes over many stones, quests, relics, placement), so each test file starts from it
// (islandAreas 0). The islands' own tests make their tuning with islandAreas set (src/rules/island.test.ts).
import { TUNING } from "../rules/tuning";

if (TUNING.map) TUNING.map = { ...TUNING.map, islandAreas: 0 };

// (The test files share workers unisolated, vitest.config isolate false: the fight's knobs, FIGHT, set from a game's tuning at each
// combat step, the difficulty's among them, start each file as a fresh page's do, not as the last file's game left them.)
import { resetFight } from "../rules/movement";
resetFight();

// (and none leaves the tuning changed for the next file (test health, 2026-11-04): each file's tuning is compared after its last test
// with how it began, and a file that changed it fails, naming what changed, rather than some later file in its worker failing by
// order. creatureSizeCandidate.test.ts once left partyObjects.generated set through withTuning({}), which shares TUNING's parts.)
import { afterAll } from "vitest";
const began = JSON.stringify(TUNING);
afterAll(() => {
  const now = JSON.stringify(TUNING);
  if (now === began) return;
  const was = JSON.parse(began), is = JSON.parse(now);
  const changed = (a: unknown, b: unknown, at: string): string[] => JSON.stringify(a) === JSON.stringify(b) ? [] : a && b && typeof a === "object" && typeof b === "object"
    ? [...new Set([...Object.keys(a), ...Object.keys(b)])].flatMap(k => changed((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k], `${at}.${k}`)) : [at];
  throw Error(`this test file left TUNING changed (${changed(was, is, "TUNING").slice(0, 8).join(", ")}): copy the tuning (structuredClone, withTuning with its own parts) or put it back in afterEach`);
});
