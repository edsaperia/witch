import { describe, expect, it } from "vitest";
import { newGame } from "../../rules/game";
import { cellKey } from "../../rules/party";
import { TUNING } from "../../rules/tuning";
import type { Sfx } from "./sfx";
import { SfxCues } from "./sfxCues";

/** A stand-in for the sound effects: every call does nothing, the warning's calls are logged. */
function fakeSfx() {
  const calls: (number | null)[] = [];
  const sfx = new Proxy({}, { get: (_, k) => k === "aggro" ? (v: number | null) => calls.push(v) : () => {} }) as unknown as Sfx;
  return { sfx, calls };
}

/** Her on the ground in her cell, its watch running from `at` to `until`. */
function watched(at: number, until: number) {
  const g = newGame(123, TUNING), w = g.witches[0];
  w.body.mode = "ground";
  const key = cellKey(g.map.cellSafe(w.body.x, w.body.z).cell);
  g.wildEntry.set(key, { at, until, last: at, danger: 0.7 });
  return g;
}

describe("the wild watch's warning (aggroOf)", () => {
  it("rises with the watch and hits as they attack", () => {
    const g = watched(10, 15.5), { sfx, calls } = fakeSfx(), cues = new SfxCues(sfx);
    for (let t = 10; t < 17; t += 1 / 60) { g.clock.time = t; cues.update(g, t); }
    const ks = calls.filter((c): c is number => c !== null);
    expect(ks[0]).toBeLessThan(0.05);
    expect(ks.slice(0, -1).every((k, i, a) => i === 0 || k >= a[i - 1])).toBe(true); // rising
    expect(ks[ks.length - 1]).toBe(1); // the hit
    expect(calls[calls.length - 1]).toBeNull(); // then over
  });

  it("falls away without a hit when she rises before they decide", () => {
    const g = watched(10, 15.5), { sfx, calls } = fakeSfx(), cues = new SfxCues(sfx);
    for (let t = 10; t < 13; t += 1 / 60) { g.clock.time = t; cues.update(g, t); }
    g.witches[0].body.mode = "treetop";
    for (let t = 13; t < 17; t += 1 / 60) { g.clock.time = t; cues.update(g, t); }
    expect(calls).not.toContain(1);
    expect(calls[calls.length - 1]).toBeNull();
    expect(calls.filter(c => c === null)).toHaveLength(1); // told once
  });
});
