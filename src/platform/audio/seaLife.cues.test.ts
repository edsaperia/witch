// M4 (Ed, 2026-11-02): report generated occurrence counts, retaining direct range and cue contracts.
import { beforeAll, afterEach, describe, expect, it, vi } from "vitest";
import * as timetable from "../../rules/seaLife";
import { seaLifeListener } from "../../test/seaLifeCues";

let listener: ReturnType<typeof seaLifeListener>;
beforeAll(() => { listener = seaLifeListener(); });
afterEach(() => { vi.restoreAllMocks(); });

describe("the sea life's direct cue and range contracts", () => {
  it("keeps kraken events off the east coast and dolphin events off the west", () => {
    listener.place("east");
    for (const time of [1, 75, 150]) expect(timetable.krakenRising(listener.game, listener.beach, time)).toBeNull();
    listener.place("west");
    for (const time of [1, 8.5, 17]) expect(timetable.dolphinLeaps(listener.game, listener.beach, time)).toEqual([]);
  });
  it("routes one supplied dolphin leap once, without a kraken cue", () => {
    listener.place("east");
    const w = listener.game.witch;
    vi.spyOn(timetable, "dolphinLeaps").mockReturnValue([{ start: 1, dur: 1.4, x: w.x + 8, z: w.z, tx: 0, tz: 1, length: 6, height: 2.2 }]);
    vi.spyOn(timetable, "krakenRising").mockReturnValue(null);
    expect(listener.listen([0, 1, 1, 1.1])).toEqual({ splash: 1, groan: 0, pour: 0 });
  });
  it("routes a supplied kraken's groan and first tentacle pour once, without a dolphin cue", () => {
    listener.place("west");
    const w = listener.game.witch;
    vi.spyOn(timetable, "dolphinLeaps").mockReturnValue([]);
    vi.spyOn(timetable, "krakenRising").mockReturnValue({ tentacles: [{ start: 1, dur: 14, x: w.x - 8, z: w.z, side: 1 }], head: null, tx: 0, tz: 1 });
    expect(listener.listen([0, 1, 1, 1.1])).toEqual({ splash: 0, groan: 1, pour: 1 });
  });
  it("hears neither inland, even with supplied events beside her", () => {
    listener.place("inland");
    const w = listener.game.witch;
    vi.spyOn(timetable, "dolphinLeaps").mockReturnValue([{ start: 1, dur: 1.4, x: w.x, z: w.z, tx: 0, tz: 1, length: 6, height: 2.2 }]);
    vi.spyOn(timetable, "krakenRising").mockReturnValue({ tentacles: [{ start: 1, dur: 14, x: w.x, z: w.z, side: 1 }], head: null, tx: 0, tz: 1 });
    expect(listener.listen([0, 1, 1.1])).toEqual({ splash: 0, groan: 0, pour: 0 });
  });
});
