// The pad with commands on (?commands=1; Ed, 2026-11-17: "For the controller, we can have square as command, and circle as
// pickup/place"): a layer over the defaults, never saved, under the player's own bindings; off, the pad as it was.
import { describe, expect, it } from "vitest";
import { Bindings, commandControls } from "./bindings";

describe("command pad layer", () => {
  it("off: square uses, circle dodges, nothing commands", () => {
    const B = new Bindings(null);
    expect(B.pad("game.use")).toEqual(["square"]);
    expect(B.pad("game.dodge")).toContain("circle");
    expect(B.pad("game.command")).toEqual([]);
    expect(B.keys("game.command")).toEqual(["KeyF"]);
  });
  it("on: square commands, circle uses, L2 alone dodges; a player's own binding still wins; off again restores it", () => {
    const B = new Bindings(null);
    commandControls(true, B);
    expect(B.pad("game.command")).toEqual(["square"]);
    expect(B.pad("game.use")).toEqual(["circle"]);
    expect(B.pad("game.dodge")).toEqual(["L2"]);
    B.set("game.use", { pad: ["R3"] });
    expect(B.pad("game.use")).toEqual(["R3"]);
    B.reset("game.use");
    commandControls(false, B);
    expect(B.pad("game.use")).toEqual(["square"]);
    expect(B.pad("game.dodge")).toContain("circle");
  });
});
