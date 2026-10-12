import { describe, expect, it } from "vitest";
import { wonText } from "./wonCard";

describe("the Night won card's words (app/wonCard.ts)", () => {
  it("lists the islands found, and those an angry legend kept", () => {
    expect(wonText({ found: ["elk", "heron"], lost: [] })).toBe("Islands found: the Elk's and the Heron's.");
    expect(wonText({ found: ["elk"], lost: ["ram"] })).toBe("Island found: the Elk's. The Ram's stayed hidden: its legend was still angry.");
    expect(wonText({ found: [], lost: ["ram", "owl"] })).toBe("No new islands this time. The Ram's and the Owl's stayed hidden: their legends were still angry.");
  });
});
