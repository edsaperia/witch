// The challenge circle's statues' look and its spell's analyser (render/statues.ts, render/challenge.ts; Ed, 2026-11-04: "grey
// statues, all facing the centre of the circle"; "all the animals glow red, the sigils start glowing"; the music spell "should be
// larger, the audio analyser filling the whole stone circle").
import { describe, expect, it } from "vitest";
import { TUNING, withTuning, type Tuning } from "../rules/tuning";
import { newBeatClock, timeAt } from "../rules/beat";
import type { ChallengeState } from "../rules/challenge";
import { STATUE_TINT, setStatueTint, statueLook, statueSigilColour } from "./statues";
import { challengeAnalyser } from "./challenge";

const S = TUNING.challenge!.statues!;
/** Enough of a game for the look: its challenge's statues in `phase` (waking from beat 8), the clock at beat `beat`. */
function at(phase: "stone" | "waking" | "awake", beat: number, t: Tuning = TUNING) {
  const clock = newBeatClock(t.beat.bpm);
  return { tuning: t, beat: clock, clock: { time: timeAt(clock, beat) } as never, challenge: { statues: { phase, wake: phase === "waking" ? 8 : null } } as ChallengeState };
}
const WILD: [number, number, number] = [1, 0.2, 0.1];

describe("the statues' look", () => {
  it("tints the stone batches toward the stone colour, as far as the knob says", () => {
    setStatueTint(TUNING);
    expect([...STATUE_TINT.value.toArray()]).toEqual([S.grey[0], S.grey[1], S.grey[2], S.tint].map(v => expect.closeTo(v, 6)));
    setStatueTint(withTuning({ challenge: { ...TUNING.challenge!, statues: { ...S, grey: [0.3, 0.4, 0.5], tint: 0.5 } } }));
    expect(STATUE_TINT.value.w).toBeCloseTo(0.5, 6); expect(STATUE_TINT.value.x).toBeCloseTo(0.3, 6);
    setStatueTint(TUNING);
  });

  it("draws stone ones in the stone batch, those walking back as themselves; none red till they wake, then rising to `red`", () => {
    expect(statueLook(at("stone", 3), {})).toBeNull();
    expect(statueLook(at("stone", 3), { statue: "stone" })).toEqual({ stone: true, red: 0 });
    expect(statueLook(at("stone", 3), { statue: "back" })).toEqual({ stone: false, red: 0 });
    expect(statueLook(at("waking", 7), { statue: "stone" })!.red).toBe(0); // (before its bar line)
    expect(statueLook(at("waking", 8 + 8), { statue: "stone" })!.red).toBeCloseTo(0.5 * S.red, 6); // (half way through its 4 bars)
    expect(statueLook(at("waking", 8 + 15.9), { statue: "stone" })!.red).toBeGreaterThan(0.95 * S.red);
  });

  it("greys their sigils on the columns while stone, glows them toward their wild colours as they wake, wild once awake", () => {
    const grey = S.grey.map(v => v * 0.8);
    expect(statueSigilColour(at("stone", 3), WILD)).toEqual(grey.map(v => expect.closeTo(v, 6)));
    expect(statueSigilColour(at("awake", 30), WILD)).toEqual(WILD);
    const mid = statueSigilColour(at("waking", 8 + 8.5), WILD); // (between beats: grey half way to its wild colour)
    for (let i = 0; i < 3; i++) expect(Math.min(grey[i], WILD[i]) - 1e-9 <= mid[i] && mid[i] <= Math.max(grey[i], WILD[i]) + 1e-9).toBe(true);
    expect(mid[0]).toBeGreaterThan(grey[0]);
    // (no statues, a night from before them: wild as ever)
    expect(statueSigilColour({ ...at("stone", 3), challenge: {} as ChallengeState }, WILD)).toEqual(WILD);
  });
});

describe("the music spell's analyser at the circle (Ed, 2026-11-04: \"the audio analyser filling the whole stone circle\")", () => {
  const dots = (radius: number, k: number, level = 1, t: Tuning = TUNING) => {
    const out: { r: number; f: number; tip: boolean; size: number }[] = [];
    challengeAnalyser({ x: 100, z: -50, radius }, t, k, 1, () => level, (x, z, size, f, tip) => out.push({ r: Math.hypot(x - 100, z + 50), f, tip, size }));
    return out;
  };
  it("reaches out to fill the circle at the music's loudest, however big the circle's grown", () => {
    const A = TUNING.challenge!.analyser!;
    for (const radius of [36, 76]) {
      const D = dots(radius, 1), far = Math.max(...D.map(d => d.r));
      expect(far, `${radius}`).toBeCloseTo(radius * A.fill, 6);
      expect(far).toBeLessThan(radius); // (inside its stone floor)
      expect(new Set(D.map(d => d.f)).size).toBe(A.bars);
      expect(D.filter(d => d.tip).length).toBe(A.bars);
      expect(D.length).toBe(A.bars * A.steps);
    }
    // (its dots grown with it: the same count a bar on the bigger circle)
    expect(dots(76, 1)[0].size / dots(36, 1)[0].size).toBeCloseTo(76 / 36, 6);
  });

  it("lights as much of it as the cast has filled, each bar as far out as the music's level", () => {
    const A = TUNING.challenge!.analyser!;
    expect(new Set(dots(36, 0.5).map(d => d.f)).size).toBe(A.bars / 2);
    expect(dots(36, 0)).toEqual([]);
    const quiet = Math.max(...dots(36, 1, 0.5).map(d => d.r)), loud = Math.max(...dots(36, 1, 1).map(d => d.r));
    expect(quiet).toBeLessThan(loud * 0.6);
  });
});
