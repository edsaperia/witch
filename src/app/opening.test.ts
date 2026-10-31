// The opening's first load (app/opening.ts; Ed, 2026-10-23: "the first screen should be the witch waking up in her bedroom on the
// home island instead of the map"): which loads wake in her bedroom, and that a first game's chart has only home to sail to.
import { describe, expect, it } from "vitest";
import { openingWay, opensDirectly, opensInBedroom, opensWithCreator, sailLandsInBed } from "./opening";
import { emptySave, recordNight, unlocked } from "./chartSave";
import { TUNING } from "../rules/tuning";

const on = { opening: { bedroom: true } }, off = { opening: { bedroom: false } };
const link = (q: string) => new URLSearchParams(q);

describe("the first load waking in her bedroom", () => {
  it("starts resumed, creator=0 and ready bot nights directly, retaining bedroom/arrival and pending-bot gates", () => {
    const state = { bedroom: false, arriving: false, resuming: false, bot: "off" as const };
    expect(opensDirectly(link(""), { ...state, resuming: true })).toBe(true);
    expect(opensDirectly(link("creator=0"), state)).toBe(true);
    expect(opensDirectly(link("bot=skilled"), { ...state, bot: "ready" })).toBe(true);
    expect(opensDirectly(link("creator=0&bot=skilled"), { ...state, bot: "loading" })).toBe(false);
    expect(opensDirectly(link("creator=0"), { ...state, arriving: true })).toBe(false);
    expect(opensDirectly(link(""), { ...state, bedroom: true })).toBe(false);
    expect(opensDirectly(link("opening=old"), state)).toBe(false);
  });
  it("resumes directly into play instead of opening the creator that prevents start from unpausing", () => {
    for (const query of ["", "opening=old", "opening=bedroom", "creator=0"]) {
      const params = link(query);
      expect(opensWithCreator(params, { bedroom: false, arriving: false, resuming: true }), query).toBe(false);
    }
    expect(opensWithCreator(link("opening=old"), { bedroom: false, arriving: false, resuming: false })).toBe(true);
    expect(opensWithCreator(link(""), { bedroom: true, arriving: false, resuming: false })).toBe(false);
    expect(opensWithCreator(link("arrive=1"), { bedroom: false, arriving: true, resuming: false })).toBe(false);
  });
  it("is the tuning's way, or the link's ?opening=bedroom|old for one load", () => {
    expect(openingWay(link(""), off)).toBe("old");
    expect(openingWay(link(""), on)).toBe("bedroom");
    expect(openingWay(link("opening=bedroom"), off)).toBe("bedroom");
    expect(openingWay(link("opening=chart"), off)).toBe("bedroom"); // (its old name)
    expect(openingWay(link("opening=old"), on)).toBe("old");
    expect(openingWay(link(""), {})).toBe("old");
  });

  it("is on by default: a plain first load wakes in her bedroom, ?opening=old and the tools' links keep their own start", () => {
    expect(TUNING.opening?.bedroom).toBe(true);
    expect(opensInBedroom(link(""), TUNING)).toBe(true);
    expect(opensInBedroom(link("quick=1"), TUNING)).toBe(true);
    expect(opensInBedroom(link("opening=old"), TUNING)).toBe(false);
    for (const q of ["creator=0", "arrive=1", "bot=skilled", "zoo"]) expect(opensInBedroom(link(q), TUNING)).toBe(false);
  });

  it("wakes her in her bedroom on a link naming its night too (Ed, 2026-10-25, on ?seed=497831: \"it should be loading straight to her bedroom in the treehouse, not the character creation screen\")", () => {
    for (const q of ["seed=497831", "island=home", "island=fox&seed=4242", "seed=123&quick=1"]) expect(opensInBedroom(link(q), TUNING), q).toBe(true);
    expect(opensInBedroom(link("seed=123&opening=old"), TUNING)).toBe(false);
  });

  it("wakes in her bedroom for any start of a night she plays", () => {
    expect(opensInBedroom(link(""), on)).toBe(true);
    expect(opensInBedroom(link("opening=bedroom&timing=1"), off)).toBe(true);
    expect(opensInBedroom(link(""), off)).toBe(false);
    // arriving from the chart (the sail's own landing), a bot game, the room skipped or the zoo: its own start
    for (const q of ["island=marten&seed=4&arrive=1", "bot=skilled", "creator=0", "zoo=1"]) expect(opensInBedroom(link(q), on), q).toBe(false);
  });

  it("a sail lands her asleep in her bed (Ed, 2026-10-25, his 2a), in place or by the island's link (&arrive=1); only ?opening=old at her decks", () => {
    expect(sailLandsInBed(link(""), TUNING)).toBe(true);
    expect(sailLandsInBed(link("island=fox&seed=4242&arrive=1"), TUNING)).toBe(true);
    expect(sailLandsInBed(link("island=fox&seed=4242&arrive=1&creator=0&quick=1"), TUNING)).toBe(true); // (the tools' and smoke runs' links too)
    expect(sailLandsInBed(link("island=fox&arrive=1&opening=old"), TUNING)).toBe(false);
    expect(sailLandsInBed(link("arrive=1"), off)).toBe(false);
  });

  it("a first game's chart has only home to sail to; what she finds opens more", () => {
    expect(unlocked(emptySave())).toEqual(["home"]);
    const after = recordNight(emptySave(), "home", { won: true, found: ["marten"] });
    expect(unlocked(after)).toEqual(["home", "marten"]);
  });
});
