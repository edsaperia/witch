// The new opening's first load (app/opening.ts; Ed, 2026-10-20): which loads open on the sea chart, and that a first game's chart has
// only home to sail to.
import { describe, expect, it } from "vitest";
import { divesHome, openingWay, opensOnChart } from "./opening";
import { emptySave, recordNight, unlocked } from "./chartSave";

const on = { opening: { chart: true } }, off = { opening: { chart: false } };
const link = (q: string) => new URLSearchParams(q);

describe("the first load on the sea chart", () => {
  it("is the tuning's way, or the link's ?opening=chart|old for one load", () => {
    expect(openingWay(link(""), off)).toBe("old");
    expect(openingWay(link(""), on)).toBe("chart");
    expect(openingWay(link("opening=chart"), off)).toBe("chart");
    expect(openingWay(link("opening=old"), on)).toBe("old");
    expect(openingWay(link(""), {})).toBe("old");
  });

  it("opens on the chart only for a plain start of the game", () => {
    expect(opensOnChart(link(""), on)).toBe(true);
    expect(opensOnChart(link("opening=chart&timing=1"), off)).toBe(true);
    expect(opensOnChart(link(""), off)).toBe(false);
    // a link naming its night, arriving from the chart, a bot game, the room skipped or the zoo: today's start
    for (const q of ["seed=123", "island=home", "island=marten&seed=4&arrive=1", "bot=skilled", "creator=0", "zoo=1"]) expect(opensOnChart(link(q), on), q).toBe(false);
  });

  it("a first game's chart has only home to sail to; what she finds opens more", () => {
    expect(unlocked(emptySave())).toEqual(["home"]);
    const after = recordNight(emptySave(), "home", { won: true, found: ["marten"] });
    expect(unlocked(after)).toEqual(["home", "marten"]);
  });
});

describe("choosing home on the first load's chart", () => {
  it("dives into the boot's own night (home's, never played); anything else sails in place", () => {
    const boot = { how: "boot", island: "" };
    expect(divesHome("home", boot, false)).toBe(true);
    expect(divesHome("home", { how: "boot", island: "home" }, false)).toBe(true);
    expect(divesHome("marten", boot, false)).toBe(false); // (another island: a new night)
    expect(divesHome("home", boot, true)).toBe(false); // (the boot's night played already)
    expect(divesHome("home", { how: "boot", island: "marten" }, false)).toBe(false);
    expect(divesHome("home", { how: "sail", island: "" }, false)).toBe(false);
  });
});
