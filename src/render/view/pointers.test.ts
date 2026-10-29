import { describe, expect, it } from "vitest";
import { TUNING } from "../../rules/tuning";
import { rankColour } from "../leash/ranks";
import { legendPointers, partyPointer, POINTER_SIGIL, stragglerPointer } from "./pointers";

const c = (id: number, more: Record<string, unknown> = {}) => ({ id, x: id * 10, z: 5, species: "fox", level: 2, gone: false, ...more });
const game = (creatures: ReturnType<typeof c>[], win?: Record<string, unknown>) => ({ tuning: TUNING, creatures, win, clock: { time: 0 } }) as never;

describe("the edge pointers (Ed's pointer pass, 2026-10-28)", () => {
  it("the straggler's: its sigil in the enemy palette at its rank's size, only while the stragglers phase has one", () => {
    const g = game([c(0), c(1, { level: 1, enraged: true })], { phase: "stragglers", target: 1 });
    const S = stragglerPointer(g)!;
    expect(S.id).toBe(1);
    expect(S.colour).toEqual(rankColour(TUNING, 1, false));
    expect(S.sigilSize).toBeCloseTo(POINTER_SIGIL * 0.9);
    expect(stragglerPointer(game([c(1)], { phase: "lap", target: 1, lap: [] }))).toBeNull();
    expect(stragglerPointer(game([c(1)]))).toBeNull();
  });
  it("one per awake legend, in its stack colour at a legend's size, till the party's won", () => {
    const L = (id: number, legendState: string, more = {}) => c(id, { boss: true, level: 3, legendState, ...more });
    const g = game([L(0, "asleep"), L(1, "restless"), L(2, "angry"), L(3, "happy"), L(4, "angry", { gone: true }), c(5)]);
    const P = legendPointers(g, new Map([[3, 9]]));
    expect(P.map(p => p.id)).toEqual([1, 2, 3]);
    expect(P[0].colour).toEqual(rankColour(TUNING, 3, false)); // (hostile: the enemy's yellow)
    expect(P[2].colour).toEqual(rankColour(TUNING, 3, true)); // (happy: the friend's)
    expect(P[2].top).toBe(9);
    expect(P[0].sigilSize).toBeCloseTo(POINTER_SIGIL * 1.35); expect(P.every(p => p.shine)).toBe(true); // (shiny, a legend's)
    expect(legendPointers(game([L(1, "angry")], { phase: "won" }))).toEqual([]);
    expect(legendPointers(game([L(1, "angry")], { phase: "lap", lap: [] })).length).toBe(1); // (till won: through the lap)
  });
  it("the party's: none before the lap; the disco ball over the dancefloor once won, till she's reached the party (settled)", () => {
    expect(partyPointer(game([c(1)], { phase: "stragglers", target: 1 }))).toBeNull();
    expect(partyPointer(game([]))).toBeNull();
    const at = (win: Record<string, unknown>) => partyPointer({ tuning: TUNING, creatures: [], win, clock: { time: 0 }, map: { dancefloor: { x: 3, z: 4, radius: 20 } } } as never);
    const P = at({ phase: "won", settled: false })!;
    expect([P.x, P.z]).toEqual([3, 4]);
    expect(P.top).toBeGreaterThan(TUNING.dancefloor.discoHeight); // (over the ball)
    expect(at({ phase: "won", settled: true })).toBeNull(); // (she's there: the pins take over)
  });
});
