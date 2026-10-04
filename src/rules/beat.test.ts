import { describe, expect, it } from "vitest";
import { beatAt, beatTime, blockLineAfter, bpmAt, newBeatClock, rampTo, timeAt, waveArrived, waveTempo } from "./beat";
import { TUNING, type Tuning } from "./tuning";

const tuning = (tempos: number[]): Tuning => ({ ...TUNING, beat: { bpm: 120, tempos, blockBars: 4, rampBars: 8 } });

describe("beat clock", () => {
  it("runs at its tempo, and turns beats back into times", () => {
    const c = newBeatClock(120);
    expect(beatAt(c, 30)).toBeCloseTo(60);
    expect(timeAt(c, 60)).toBeCloseTo(30);
    expect(beatTime(c, 30)).toBeCloseTo(30);
  });

  it("eases to a new tempo without a skip: the beat is continuous and only ever goes forward", () => {
    const c = newBeatClock(120);
    rampTo(c, 64, 140, 32);
    const t0 = timeAt(c, 64);
    expect(t0).toBeCloseTo(32);
    expect(beatAt(c, t0 - 1e-6)).toBeCloseTo(beatAt(c, t0 + 1e-6), 4);
    expect(bpmAt(c, t0 - 0.01)).toBeCloseTo(120);
    expect(bpmAt(c, timeAt(c, 64 + 32) + 0.01)).toBeCloseTo(140);
    // the bpm moves smoothly (never more than a frame's worth at a time), the beat climbs, and times and beats invert
    let last = -Infinity, lastBpm = 120;
    for (let t = 0; t < 90; t += 1 / 60) {
      const b = beatAt(c, t), bpm = bpmAt(c, t);
      expect(b).toBeGreaterThan(last);
      expect(Math.abs(bpm - lastBpm)).toBeLessThan(0.1);
      expect(timeAt(c, b)).toBeCloseTo(t, 6);
      last = b; lastBpm = bpm;
    }
    expect(beatAt(c, 90)).toBeCloseTo(96 + ((90 - timeAt(c, 96)) * 140) / 60, 6);
  });

  it("can change course mid-ramp and stay continuous", () => {
    const c = newBeatClock(120);
    rampTo(c, 16, 140, 32);
    const mid = timeAt(c, 32), before = beatAt(c, mid + 3);
    rampTo(c, 32, 100, 16);
    expect(beatAt(c, mid)).toBeCloseTo(32, 6);
    expect(beatAt(c, mid - 1e-6)).toBeCloseTo(beatAt(c, mid + 1e-6), 4);
    expect(bpmAt(c, mid - 1e-3)).toBeCloseTo(bpmAt(c, mid + 1e-3), 1);
    expect(beatAt(c, mid + 3)).toBeLessThan(before); // slowing now
    expect(bpmAt(c, timeAt(c, 48) + 1)).toBeCloseTo(100);
  });

  it("brings each wave's tempo in from the block line its music lands on, over rampBars", () => {
    const t = tuning([120, 125, 130]), c = newBeatClock(120);
    waveArrived(c, t, 1, 100.3); // beat 200.6: the next 4-bar line is beat 208
    expect(blockLineAfter(200.6, 4)).toBe(208);
    expect(bpmAt(c, timeAt(c, 207.9))).toBeCloseTo(120);
    expect(bpmAt(c, timeAt(c, 208 + 32) + 0.01)).toBeCloseTo(125);
    waveArrived(c, t, 1, 120); // the same wave: nothing changes
    expect(c.segs.length).toBe(2);
    waveArrived(c, t, 7, 200); // past the arc's end: its last tempo
    expect(bpmAt(c, 400)).toBeCloseTo(130);
    expect(waveTempo(TUNING, 5)).toBe(TUNING.beat.bpm);
  });

  it("lands a wave a moment after a line on that line, like the music", () => {
    expect(blockLineAfter(208.5, 4)).toBe(208);
    expect(blockLineAfter(209.5, 4)).toBe(224);
  });
});
