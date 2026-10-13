// The audio output's buffer (platform/audio/buffer.ts; Ed's v3167 playtest: "music is still cutting out", 474 device under-runs
// on a 10 ms buffer).
import { describe, expect, it } from "vitest";
import { BUMP_AT, MAX_BUFFER, bufferHint, nextBuffer } from "./buffer";
import { TUNING } from "../../rules/tuning";

describe("the audio output's buffer", () => {
  it("asks for the tuning's buffer in seconds, more if this browser learnt it needs it, a category or seconds by ?latency=", () => {
    expect(TUNING.music.buffer).toBeGreaterThanOrEqual(0.05); // (not "balanced", which Chrome treats as interactive's 10 ms)
    expect(bufferHint(0.06, "balanced", null, null)).toBe(0.06);
    expect(bufferHint(0.06, "balanced", null, 0.12)).toBe(0.12);
    expect(bufferHint(0.06, "balanced", null, 0.03)).toBe(0.06);
    expect(bufferHint(0, "playback", null, null)).toBe("playback");
    expect(bufferHint(0.06, "balanced", "interactive", 0.12)).toBe("interactive");
    expect(bufferHint(0.06, "balanced", "0.1", null)).toBe(0.1);
    expect(bufferHint(0.06, "balanced", "9", null)).toBe(MAX_BUFFER);
  });
  it("after enough under-runs in a load, asks for twice the buffer next time, at least 60 ms, never more than the most", () => {
    expect(nextBuffer(null, 0.01, null)).toBeNull();
    expect(nextBuffer(BUMP_AT - 1, 0.01, null)).toBeNull();
    expect(nextBuffer(BUMP_AT, 0.01, null)).toBe(0.06);
    expect(nextBuffer(474, 0.06, null)).toBe(0.12);
    expect(nextBuffer(474, 0.2, null)).toBe(MAX_BUFFER);
    expect(nextBuffer(474, 0.06, 0.12)).toBeNull(); // (already learnt)
  });
});
