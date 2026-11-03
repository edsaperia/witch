// The tests' map (Ed, 2026-10-11: the game now plays an island, map.islandAreas, 10 areas): most of the rules' tests were written
// for the ~100-area radius map (ley routes over many stones, quests, relics, placement), so each test file starts from it
// (islandAreas 0). The islands' own tests make their tuning with islandAreas set (src/rules/island.test.ts).
import { TUNING } from "../rules/tuning";

if (TUNING.map) TUNING.map = { ...TUNING.map, islandAreas: 0 };

// (The test files share workers unisolated, vitest.config isolate false: the fight's knobs, FIGHT, set from a game's tuning at each
// combat step, the difficulty's among them, start each file as a fresh page's do, not as the last file's game left them.)
import { resetFight } from "../rules/movement";
resetFight();
