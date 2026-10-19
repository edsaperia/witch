import { describe, expect, it } from "vitest";
import { wonText } from "./wonCard";

describe("the Night won card's words (app/wonCard.ts)", () => {
  it("lists the islands found tonight by quests, or says none were", () => {
    expect(wonText({ found: ["elk", "heron"] })).toBe("Islands found tonight: the Elk's and the Heron's.");
    expect(wonText({ found: ["elk"] })).toBe("Island found tonight: the Elk's.");
    expect(wonText({ found: [] })).toBe("No islands found tonight: a legend shows you its island when you do its quest.");
  });
});
