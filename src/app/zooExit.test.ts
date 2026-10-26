// Leaving the zoo (app/zooExit.ts): in the bestiary book's frame, back to the night; on a ?zoo link, the game's ordinary start.
import { describe, expect, it } from "vitest";
import { zooExitTarget } from "./zooExit";

describe("leaving the zoo (Ed, 2026-10-26)", () => {
  it("in the book's frame over a night, it hands back to the night's page", () => {
    expect(zooExitTarget("https://x.test/witch/?zoo=1", true)).toEqual({ kind: "frame" });
  });
  it("on a ?zoo link, it goes to the same page without the zoo's switches, keeping the rest", () => {
    expect(zooExitTarget("https://x.test/witch/pr-1/?zoo&all&seed=12#a", false)).toEqual({ kind: "go", url: "https://x.test/witch/pr-1/?seed=12" });
    expect(zooExitTarget("https://x.test/witch/?zoo=1&found=wolf,fox", false)).toEqual({ kind: "go", url: "https://x.test/witch/" });
  });
});
