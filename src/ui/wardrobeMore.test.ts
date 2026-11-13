// The wardrobe's and the shoe rack's new options (Ed, 2026-11-13: "give options for no jacket and no top"; "give some more options
// for trousers (none, jeans, breeches, shorts, miniskirt, long skirt)"; "more options for shoes (none, high heels, boots)"; "show
// bags previews without the strap"): the items are there and hers from the start, an older save keeps its outfit, a kind this build
// doesn't know falls back to hers, each is drawn on her in every kind of frame, and the bags' cards have no strap.
import { describe, expect, it } from "vitest";
import * as Art from "../../art/generator.js";
import { upgradeGenome, witchGenomeProblems, genomeLook, WITCH_GENOME } from "../../art/witchGenome.js";
import { loadStyle } from "../render/style";
import { SHELVES, STARTING_SET, wear, wears, type WardrobeItem } from "../rules/wardrobe";
import { appearance } from "../platform/online/appearance";
import { readStationLook, stationLook } from "../platform/online/stationAppearance";
import { sharedCatalogue } from "../platform/online/sharedCatalogue";

const st = loadStyle();
type Sp = { m: Uint8Array };
type Part = { group: number; strap?: boolean; mat: number };
const M = Art.M as Record<string, number>;
const lookOf = (g: unknown) => (genomeLook as (g: unknown) => { look: Record<string, unknown> })(g).look;
const sprite = (g: unknown, o: object) => (Art.witchSprite as (st: unknown, o: object) => Sp)(st, { ...o, look: lookOf(g) });
const names = (shelf: string) => SHELVES[shelf].items.map(i => i.name);
const worn = (g: Record<string, unknown>, shelf: string) => SHELVES[shelf].items.filter(i => wears(g, i)).map(i => i.id);
const FRAMES = [{ pose: "walk", frame: 1 }, { pose: "walk", frame: 1, facing: "away" }, { pose: "run", frame: 1 }, { pose: "sit" }, { pose: "inBed" }, { pose: "stargaze" }, { pose: "twoStep" }, { frame: 0 }, { pose: "lean", frame: 1 }, { pose: "fast" }];

describe("the wardrobe's none options, more trousers and shoes", () => {
  it("the shelves hold what Ed asked for, each hers from the start (but the found chunky trainers)", () => {
    expect(names("jacket")).toContain("None");
    expect(names("top")).toContain("None"); expect(names("top").length).toBeGreaterThan(2);
    expect(names("trousers")).toEqual(["None", "Jeans", "Breeches", "Shorts", "Miniskirt", "Long skirt"]);
    expect(names("shoes")).toEqual(["None", "Trainers", "Chunky trainers", "High heels", "Boots"]);
    for (const shelf of ["top", "trousers", "shoes"]) for (const i of SHELVES[shelf].items) expect(STARTING_SET.includes(i.id), i.id).toBe(i.id !== "shoes-chunky");
    expect(STARTING_SET).toContain("top-none");
  });

  it("a save from before them keeps its outfit: her jacket, a T-shirt, jeans and the trainers it had", () => {
    const { shirt: _s, trousers: _t, shoes: _h, ...old } = structuredClone(WITCH_GENOME) as Record<string, unknown>;
    const g = upgradeGenome(old) as Record<string, unknown>;
    expect([g.top, g.shirt, g.trousers, g.shoes]).toEqual(["jacket", "tee", "jeans", "trainers"]);
    expect([worn(g, "jacket"), worn(g, "top"), worn(g, "trousers"), worn(g, "shoes")]).toEqual([["top-jacket"], ["shirt-tee"], ["trousers-jeans"], ["shoes-trainers"]]);
    const chunky = upgradeGenome({ ...old, accessories: { ...(old.accessories as object), chunky: true } }) as Record<string, unknown>;
    expect(worn(chunky, "shoes")).toEqual(["shoes-chunky"]);
    expect(Buffer.from(sprite(g, { pose: "walk", frame: 1 }).m).equals(Buffer.from(sprite(WITCH_GENOME, { pose: "walk", frame: 1 }).m))).toBe(true);
  });

  it("a kind this build doesn't know falls back to hers, and draws", () => {
    const g = upgradeGenome({ ...structuredClone(WITCH_GENOME), shirt: "corset", trousers: "kilt", shoes: "clogs" }) as Record<string, unknown>;
    expect([g.shirt, g.trousers, g.shoes]).toEqual(["tee", "jeans", "trainers"]);
    expect(witchGenomeProblems(g)).toEqual([]);
    expect(witchGenomeProblems({ ...g, trousers: "kilt" })).toEqual(["trousers kilt"]);
    const odd = { ...lookOf(WITCH_GENOME), shirt: "corset", trousers: "kilt", shoes: "clogs" }; // (a look that reaches the art all the same: as hers)
    const a = (Art.witchSprite as (st: unknown, o: object) => Sp)(st, { pose: "stand", look: odd }), b = sprite(WITCH_GENOME, { pose: "stand" });
    expect(Buffer.from(a.m).equals(Buffer.from(b.m))).toBe(true);
  });

  it("exactly one item of each shelf is worn whatever she puts on, and every one changes her in every kind of frame", () => {
    const base = structuredClone(WITCH_GENOME) as Record<string, unknown>, bare = { ...base, top: "none" }; // (her top's own shape shows with her jacket off)
    for (const shelf of ["jacket", "top", "trousers", "shoes"]) for (const it of SHELVES[shelf].items) {
      const g = wear(base, it);
      expect(worn(g, shelf), it.id).toEqual([it.id]);
      expect(witchGenomeProblems(g), it.id).toEqual([]);
      if (wears(base, it) || (shelf === "jacket" && it.id !== "top-none")) continue; // (the jackets from before are as they were)
      const from = shelf === "top" ? bare : base, to = wear(from, it);
      // (in bed her legs are under the covers)
      for (const o of FRAMES.filter(f => f.pose !== "inBed" || shelf === "top")) expect(Buffer.from(sprite(to, o).m).equals(Buffer.from(sprite(from, o).m)), `${it.id} ${JSON.stringify(o)}`).toBe(false);
    }
  });

  it("with no jacket, no top and no trousers she's still dressed: a white bandeau and briefs, nothing of her jacket or jeans", () => {
    const g = { ...structuredClone(WITCH_GENOME), top: "none", shirt: "none", trousers: "none", shoes: "none" };
    for (const o of FRAMES) {
      const m = new Set(sprite(g, o).m);
      expect(m.has(M.BELLY), JSON.stringify(o)).toBe(true);
      for (const not of [M.JACKET, M.TOP, M.JEANS, M.SHOES]) expect(m.has(not), `${JSON.stringify(o)} ${not}`).toBe(false);
    }
  });

  it("the new looks cross the wire: a full look, a station's choice and the shared catalogue", () => {
    const g = { ...structuredClone(WITCH_GENOME), top: "none", shirt: "crop", trousers: "longskirt", shoes: "boots" };
    expect(appearance(g)).toMatchObject({ top: "none", shirt: "crop", trousers: "longskirt", shoes: "boots" });
    expect(appearance({ ...g, trousers: "kilt" })).toMatchObject({ trousers: "jeans" });
    const sent = stationLook("shoeRack", g, "trousers")!;
    expect(sent.changes).toMatchObject({ trousers: "longskirt", shoes: "boots" });
    expect(readStationLook(JSON.parse(JSON.stringify(sent)))).toEqual(sent);
    expect(stationLook("wardrobe", g, "top")!.changes).toMatchObject({ top: "none", shirt: "crop" });
    const ids = ["top-none", "shirt-none", "trousers-miniskirt", "shoes-heels"];
    expect(sharedCatalogue({ wardrobe: ids, parts: [], hats: [], records: [] })?.wardrobe).toEqual([...ids].sort());
  });
});

describe("the bag station's cards without the strap", () => {
  const model = (it: WardrobeItem) => (Art.witchModel as (o: object) => { parts: Part[] })({ pose: "stand", look: { ...lookOf(wear(structuredClone(WITCH_GENOME) as Record<string, unknown>, it)), broomless: true } });
  const pick = (Art.WITCH_CARD_ITEMS as { bag: { pick: (q: Part) => boolean } }).bag.pick;
  it("every bag with a strap on her has it left off its card, the bag itself kept", () => {
    let strapped = 0;
    for (const it of SHELVES.bag.items) {
      const bag = model(it).parts.filter(q => [16, 22, 23, 24].includes(q.group)), straps = bag.filter(q => q.strap);
      if (straps.length) strapped++;
      expect(bag.filter(pick).length, it.id).toBe(bag.length - straps.length);
      expect(bag.filter(pick).length, it.id).toBeGreaterThan(0);
      for (const q of straps) expect(pick(q), it.id).toBe(false);
    }
    expect(strapped).toBeGreaterThanOrEqual(7); // satchel, bumbag, purse, tote, duffel, messenger, backpack (the briefcase and the clutch have none)
  });
});
