import { describe, expect, it } from "vitest";
import { addNew, dropNew, GUIDE_KEY, loadGuide, storeGuide } from "./guideSave";

const store = () => { const m = new Map<string, string>(); return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v), m }; };

describe("guidance's save", () => {
  it("keeps the new things (one an item, newest last) and the islands seen; drops a thing gone, and anything unreadable", () => {
    const s = store(), g = loadGuide(s);
    expect(g).toEqual({ unseen: [], chartSeen: [] });
    addNew(g, { kind: "hat", id: "a", at: "hats" }); addNew(g, { kind: "part", id: "b", at: "broomBay" }); addNew(g, { kind: "hat", id: "a", at: "hats" });
    g.chartSeen = ["lion"];
    storeGuide(g, s);
    expect(loadGuide(s)).toEqual({ unseen: [{ kind: "part", id: "b", at: "broomBay" }, { kind: "hat", id: "a", at: "hats" }], chartSeen: ["lion"] });
    dropNew(g, "a");
    expect(g.unseen.map(n => n.id)).toEqual(["b"]);
    s.m.set(GUIDE_KEY, "{oops"); expect(loadGuide(s)).toEqual({ unseen: [], chartSeen: [] });
    s.m.set(GUIDE_KEY, JSON.stringify({ unseen: [{ kind: "boat", id: "x", at: "y" }, 3], chartSeen: [1, "elk"] })); expect(loadGuide(s)).toEqual({ unseen: [], chartSeen: ["elk"] });
  });
});
