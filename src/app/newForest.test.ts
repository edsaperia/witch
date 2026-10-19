import { describe, expect, it } from "vitest";
import { newForestHref } from "./newForest";

describe("a new forest (the bed and the afterparty's button)", () => {
  it("gives the link a fresh seed and keeps the rest of it", () => {
    const href = "https://edsaperia.github.io/witch/pr-1/?seed=123&island=fox&world=7#x";
    const u = new URL(newForestHref(href, () => 0.4567891));
    expect(u.searchParams.get("seed")).toBe("456789");
    expect(u.searchParams.get("island")).toBe("fox");
    expect(u.searchParams.get("world")).toBe("7");
    expect(u.pathname).toBe("/witch/pr-1/");
    expect(u.hash).toBe("#x");
  });
  it("adds a seed to a link without one, and the seed changes from night to night", () => {
    expect(new URL(newForestHref("http://localhost/?creator=0", () => 0)).searchParams.get("seed")).toBe("0");
    const seeds = new Set(Array.from({ length: 20 }, () => new URL(newForestHref("http://localhost/?seed=5")).searchParams.get("seed")));
    expect(seeds.size).toBeGreaterThan(1);
  });
});
