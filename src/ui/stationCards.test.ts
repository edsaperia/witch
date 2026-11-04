// The dressing stations' card pictures (Ed, 2026-11-02: "in the preview boxes on the menu, show the clothing item alone instead of a
// portrait of the witch"; ui/stationLines.ts CARD_SHOW, art/witch.js witchCardSprite, drawn by ui/stationPanel.ts wearPicture): each
// shelf of the dressing table, the wardrobe, the cloak pegs, the shoe rack and the bags pictures its items its own way, and each
// way draws what it should of her and nothing else (by the materials in the sprite, before it's baked).
import { describe, expect, it } from "vitest";
import * as Art from "../../art/generator.js";
import { loadStyle } from "../render/style";
import { defaultGenome } from "../app/defaultLook";
import { SHELVES, shelvesAt, wear, type WardrobeItem } from "../rules/wardrobe";
import { CARD_SHOW } from "./stationLines";

const M = Art.M as Record<string, number>;
const st = loadStyle(), g = defaultGenome()!;
type Sp = { m: Uint8Array } | null;
const card = (it: WardrobeItem, show: string): Sp => (Art.witchCardSprite as (st: unknown, o: object) => Sp)(st, { look: (Art.genomeLook as (g: unknown) => { look: object })(wear(g, it)).look, show });
const mats = (sp: Sp) => new Set(sp ? [...sp.m].filter(Boolean) : []);
const none = (it: WardrobeItem) => Object.values(it.set).every(v => v === false || v === 0 || v === "none");
const items = (shelf: string) => SHELVES[shelf].items.filter(it => !none(it)); // (the "none" cards show ∅, no picture)
/** Each station's shelves with items, and how their cards show them (Ed, 2026-11-02). */
const STATIONS: Record<string, Record<string, string>> = {
  dressingTable: { hair: "bust", face: "bust", earrings: "bust" }, // "render her from shoulders to top of her head, without hat"
  wardrobe: { jacket: "jacket" }, // the item alone
  cloakPegs: { cloak: "back", scarf: "back" }, // "cloak should be shown 3/4 from the back, hat removed"
  shoeRack: { shoes: "legs" }, // "shoes should show her legs, thighs down"
  bags: { bag: "bag" }, // "include shoes and bags" (the item alone)
};

describe("station card pictures", () => {
  it("every shelf with items at the dressing stations has its way of showing them", () => {
    for (const [station, want] of Object.entries(STATIONS)) {
      const withItems = shelvesAt(station)!.filter(s => s.items.length).map(s => s.id);
      expect(Object.fromEntries(withItems.map(id => [id, CARD_SHOW[id]])), station).toEqual(want);
    }
  });

  it("her whole sprite has her hat, face, legs and broom (so the checks below mean something)", () => {
    const all = mats((Art.witchSprite as (st: unknown, o: object) => Sp)(st, { look: (Art.genomeLook as (g: unknown) => { look: object })(g).look, pose: "stand", frame: 0, heading: "towards" }));
    for (const m of [M.HAT, M.SKIN, M.JEANS, M.SHOES, M.JACKET, M.BROOM]) expect(all.has(m), `${m}`).toBe(true); // (her hair under her hat, face on)
  });

  it("the wardrobe's tops are drawn alone: no skin, hair, hat, jeans or shoes", () => {
    for (const it of items("jacket")) {
      const m = mats(card(it, "jacket"));
      expect(m.has(M.JACKET), it.id).toBe(true);
      for (const not of [M.SKIN, M.HAIR, M.HAT, M.JEANS, M.SHOES, M.BROOM]) expect(m.has(not), `${it.id} ${not}`).toBe(false);
    }
  });

  it("the bags are drawn alone: none of her clothes, skin or hair", () => {
    for (const it of items("bag")) {
      const m = mats(card(it, "bag"));
      expect(m.size, it.id).toBeGreaterThan(0);
      for (const not of [M.SKIN, M.HAIR, M.HAT, M.JEANS, M.JACKET, M.TOP, M.BROOM]) expect(m.has(not), `${it.id} ${not}`).toBe(false);
    }
  });

  it("the dressing table's are her head and shoulders, hat off", () => {
    for (const shelf of ["hair", "face", "earrings"]) for (const it of SHELVES[shelf].items) {
      const m = mats(card(it, "bust"));
      for (const yes of [M.SKIN, M.HAIR]) expect(m.has(yes), `${it.id} ${yes}`).toBe(true);
      for (const not of [M.HAT, M.JEANS, M.SHOES, M.BROOM]) expect(m.has(not), `${it.id} ${not}`).toBe(false);
    }
  });

  it("the shoe rack's are her legs, thighs down", () => {
    for (const it of items("shoes")) {
      const m = mats(card(it, "legs"));
      for (const yes of [M.SHOES, M.JEANS]) expect(m.has(yes), `${it.id} ${yes}`).toBe(true);
      for (const not of [M.HAT, M.HAIR, M.BROOM]) expect(m.has(not), `${it.id} ${not}`).toBe(false);
    }
  });

  it("the cloak pegs' are all of her from behind, hat off, the cloak on", () => {
    for (const it of items("cloak")) {
      const m = mats(card(it, "back"));
      expect(m.has(M.CLOTH), it.id).toBe(true);
      for (const not of [M.HAT, M.BROOM]) expect(m.has(not), `${it.id} ${not}`).toBe(false);
    }
  });
});
