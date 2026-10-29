// The dressing stations' shelves (config/wardrobe.json, rules/wardrobe.ts; Ed, 2026-10-21, the station menus). (wardrobe.test.ts is the hats and brooms changed mid-night.)
import { describe, expect, it } from "vitest";
import * as Art from "../../art/generator.js";
import { HOUSE_ROOMS } from "./houseRooms";
import { CLOTH_COLS, CLOTH_ROWS, GRID_ROWS, ITEMS, SHELVES, SKIN_COLS, STARTING_SET, bareHeadAt, itemById, itemsToChoose, ownedOf, shelvesAt, skinSwatch, wear, wears } from "./wardrobe";
import { TUNING } from "./tuning";

const CLASSIC = Art.WITCH_GENOME as unknown as Record<string, unknown>;
const AXES = Art.WITCH_AXES as Record<string, unknown[]>;
const OUTFIT = Art.DEFAULT_OUTFIT as Record<string, number[]>;
const STATIONS = HOUSE_ROOMS.objects.filter(o => o.use.kind === "creator");

describe("the wardrobe", () => {
  it("gives every dressing station its shelves, and names no station the house hasn't", () => {
    for (const o of STATIONS) expect(shelvesAt(o.id)?.length, o.id).toBeGreaterThan(0);
    expect(shelvesAt("bed")).toBeNull();
  });

  it("sets only what her genome has, to values the generator draws", () => {
    for (const it of ITEMS) for (const [path, v] of Object.entries(it.set)) {
      const keys = path.split("."), top = keys[0];
      expect(top in CLASSIC, `${it.id}: ${path}`).toBe(true);
      if (path === "broom.kind") expect(AXES.broom, it.id).toContain(v);
      else if (keys.length === 1 && typeof v === "string") expect(AXES[top], it.id).toContain(v);
      if (keys[0] === "accessories") expect(keys[1] in (CLASSIC.accessories as object), it.id).toBe(true);
    }
  });

  it("colours only her palette's parts, and fits only her sliders", () => {
    for (const s of Object.values(SHELVES)) {
      for (const p of s.colour ?? []) expect(p in OUTFIT, `${s.id}: ${p}`).toBe(true);
      for (const a of s.fit ?? []) { expect(Array.isArray(AXES[a]), `${s.id}: ${a}`).toBe(true); expect(typeof AXES[a][0], a).toBe("number"); }
    }
  });

  it("has unique ids, and some still to find", () => {
    expect(new Set(ITEMS.map(i => i.id)).size).toBe(ITEMS.length);
    expect(ITEMS.filter(i => !i.start).length).toBeGreaterThan(5); // (the wearables to find: the brooms are the Workshop's parts now)
  });

  it("puts each item on, and only it of its shelf", () => {
    for (const s of Object.values(SHELVES)) for (const it of s.items) {
      const g = wear(CLASSIC, it);
      expect(wears(g, it), it.id).toBe(true);
      expect(s.items.filter(o => wears(g, o)).map(o => o.id), it.id).toEqual([it.id]);
    }
    expect(CLASSIC.top).toBe("jacket"); // (a copy: hers untouched)
  });

  it("keeps a backpack's size when it's already on, so its fit stays", () => {
    const pack = itemById("backpack")!, g = { ...CLASSIC, backpackSize: 1.8 };
    expect(wear(g, pack).backpackSize).toBe(1.8);
    expect(wear(CLASSIC, pack).backpackSize).toBe(1);
  });

  it("starts her owning what she has on, on every shelf with items but the bags (she starts with none: Ed, 2026-10-29, \"Remove none\")", () => {
    for (const s of Object.values(SHELVES).filter(q => q.items.length && q.id !== "bag")) {
      expect(s.items.some(i => i.start && wears(CLASSIC, i)), s.id).toBe(true);
    }
    expect(SHELVES.bag.items.some(i => wears(CLASSIC, i))).toBe(false);
    expect(SHELVES.bag.items.every(i => i.start)).toBe(true); // (each hers to choose)
    expect(STARTING_SET.length).toBeGreaterThan(10);
  });

  it("owns the starting set, what's kept, and anything she's wearing; never a stranger's id", () => {
    const own = ownedOf(["top-cape", "nonsense"], { ...CLASSIC, top: "sequins" });
    for (const id of STARTING_SET) expect(own.has(id)).toBe(true);
    expect(own.has("top-cape")).toBe(true);
    expect(own.has("top-sequins")).toBe(true);
    expect(own.has("nonsense")).toBe(false);
    expect(ownedOf(null, null).has("top-mesh")).toBe(false);
  });

  it("has colour grids of 5 rows (Ed: \"Colour picker has only 5 rows\"): cloth 13 across, skin 6", () => {
    expect(GRID_ROWS).toBe(5);
    expect(CLOTH_ROWS).toHaveLength(5);
    expect(CLOTH_COLS).toBe(13);
    expect(SKIN_COLS).toBe(6);
    for (let r = 0; r < GRID_ROWS; r++) for (let c = 0; c < SKIN_COLS; c++) { const [h, s, v] = skinSwatch(c, r); for (const x of [h, s, v]) { expect(x).toBeGreaterThanOrEqual(0); expect(x).toBeLessThanOrEqual(1); } }
  });
});

describe("Ed's redo (2026-10-23): nothing with no choice in it, the broom till the Workshop, her hat off for her face", () => {
  it("an item row shows once two of its items are hers", () => {
    const face = SHELVES.face, earrings = SHELVES.earrings;
    expect(itemsToChoose(face, new Set(STARTING_SET))).toBe(false); // (bare only: the sunglasses still to find)
    expect(itemsToChoose(face, new Set([...STARTING_SET, "shades"]))).toBe(true);
    expect(itemsToChoose(earrings, new Set(STARTING_SET))).toBe(true);
  });
  it("the broom stand is gone (the Workshop's bay, lathe and pegboard in its place), and no station offers a broom's power or shape", () => {
    expect(shelvesAt("broomStand")).toBeNull();
    expect(shelvesAt("lathe")!.map(s => s.id)).toEqual(["tip", "chassis", "exhaust", "sets", "broomBody", "broomTrim", "broomFit", "pegboard"]); // (one broom station: Ed, 2026-10-29, "one for colours, the other for components")
    for (const id of ["broomBay", "pegboard"]) expect(shelvesAt(id), id).toBeNull();
    for (const s of Object.values(SHELVES)) { expect((s as unknown as Record<string, unknown>).power, s.id).toBeUndefined(); for (const i of s.items) expect(i.set["broom.kind"], i.id).toBeUndefined(); }
  });
  it("every shelf names the part of her the camera zooms on, one the tuning has", () => {
    const parts = TUNING.camera.station!.parts!;
    for (const s of Object.values(SHELVES)) expect(parts[s.frame!], s.id).toBeTruthy();
  });
  it("her hat comes off at the dressing table, not at the hat's mirror", () => {
    expect(bareHeadAt("dressingTable")).toBe(true);
    expect(bareHeadAt("mirror")).toBe(false);
  });
});

