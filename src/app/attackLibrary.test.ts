import { describe, expect, it } from "vitest";
import { AttackLibrary, LIBRARY_KEY } from "./attackLibrary";

const memory = () => { const m = new Map<string, string>(); return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => { m.set(k, v); }, m }; };

describe("the Fight Arena's attack library", () => {
  it("saves, lists favourites first then the newest, keeps across pages, replaces by name, removes", () => {
    const store = memory(), lib = new AttackLibrary(store);
    lib.save({ name: "frost fan", attack: { body: { kind: "bolt" } }, seed: 42, pack: "wolf*3@2", at: 1 });
    lib.save({ name: "slow lob", attack: { body: { kind: "lob" } }, at: 2 });
    lib.save({ name: "rain", attack: { area: { rain: { n: 6 } } }, at: 3 });
    expect(lib.list().map(s => s.name)).toEqual(["rain", "slow lob", "frost fan"]);
    expect(lib.toggleFav("frost fan")).toBe(true);
    expect(lib.list().map(s => s.name)).toEqual(["frost fan", "rain", "slow lob"]);
    // another page, the same browser
    const again = new AttackLibrary(store);
    expect(again.list().map(s => [s.name, !!s.fav])).toEqual([["frost fan", true], ["rain", false], ["slow lob", false]]);
    expect(again.get("frost fan")).toMatchObject({ seed: 42, pack: "wolf*3@2", attack: { body: { kind: "bolt" } } });
    // saved again under its name: replaced, its star kept
    again.save({ name: "frost fan", attack: { body: { kind: "bolt", radius: 1 } }, at: 9 });
    expect(again.list().length).toBe(3);
    expect(again.get("frost fan")).toMatchObject({ fav: true, attack: { body: { radius: 1 } } });
    again.remove("rain");
    expect(new AttackLibrary(store).list().map(s => s.name)).toEqual(["frost fan", "slow lob"]);
    expect(again.freeName()).toBe("attack 1");
  });

  it("works with no storage, storage that throws, or a broken entry, without throwing", () => {
    const none = new AttackLibrary(null);
    none.save({ name: "a", attack: {} });
    expect(none.list().length).toBe(1);
    const throwing = { getItem: () => { throw new Error("SecurityError"); }, setItem: () => { throw new Error("QuotaExceeded"); } };
    const t = new AttackLibrary(throwing);
    t.save({ name: "b", attack: {} });
    expect(t.toggleFav("b")).toBe(true);
    expect(t.list().map(s => s.name)).toEqual(["b"]);
    const store = memory();
    store.setItem(LIBRARY_KEY, "not json");
    expect(new AttackLibrary(store).list()).toEqual([]);
    store.setItem(LIBRARY_KEY, JSON.stringify([{ name: "ok", attack: {}, at: 1 }, { nope: 1 }, { name: "", attack: {} }]));
    expect(new AttackLibrary(store).list().map(s => s.name)).toEqual(["ok"]);
  });

  it("copies out and pastes in: one, a library, or a bare attack (named afresh, with the fight it came into)", () => {
    const a = new AttackLibrary(memory());
    a.save({ name: "frost fan", attack: { body: { kind: "bolt" } }, fav: true, at: 1 });
    a.save({ name: "slow lob", attack: { body: { kind: "lob" } }, at: 2 });
    const b = new AttackLibrary(memory());
    expect(b.importJson(a.exportJson())).toEqual(["frost fan", "slow lob"]);
    expect(b.get("frost fan")?.fav).toBe(true);
    expect(b.importJson(a.exportJson("slow lob"))).toEqual(["slow lob"]);
    expect(b.importJson('{ "body": { "kind": "mine" } }', { seed: 7, pack: "bat*4@1" })).toEqual(["pasted 1"]);
    expect(b.get("pasted 1")).toMatchObject({ attack: { body: { kind: "mine" } }, seed: 7, pack: "bat*4@1" });
    expect(() => b.importJson("{ broken")).toThrow();
    expect(() => b.importJson("3")).toThrow(/not an attack/);
  });
});
