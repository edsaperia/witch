// The character creator's controls come from the witch generator's axes (art/witchGenome.js): each
// must land on a field of her genome, so a new axis the art builders add works without code here.
import { describe, expect, it } from "vitest";
import * as Art from "../../art/generator.js";
import { BOXES, boxOf, fromPicker, slot, STEPS, toPicker, upgrade } from "./creator";
import { clear, newWalker, spotAt, type RoomFloor } from "./roomWalk";

describe("the character creator", () => {
  it("maps every axis of the witch generator onto her genome", () => {
    const g = Art.WITCH_GENOME as unknown as Record<string, unknown>;
    for (const axis of Object.keys(Art.WITCH_AXES)) {
      const [part, key] = slot(axis), v = part ? (g[part] as Record<string, unknown>)[key] : g[key];
      expect(v, axis).not.toBeUndefined();
    }
  });
  it("keeps every randomised witch a witch (a pointed hat with its band, a broom)", () => {
    for (let s = 1; s < 40; s++) expect((Art.witchGenomeProblems as (g: unknown) => string[])((Art.witchGenome as (s: number) => unknown)(s))).toEqual([]);
  });
  it("loads a save from before round 2, filling the new fields with hers", () => {
    const old = { hat: { shape: "crooked", height: 1.4, brim: .9, tilt: .1, band: 2 }, hair: "bob", top: "mesh", cloak: "long", broom: { kind: "fan", length: 1.1, bend: .2, bristles: 1.2 }, accessories: { phones: false, shades: true, glowsticks: false, scarf: true, satchel: false, pendant: false, earrings: true }, palette: null };
    const g = upgrade(JSON.parse(JSON.stringify(old)));
    expect((Art.witchGenomeProblems as (g: unknown) => string[])(g)).toEqual([]);
    expect(g.hat.shape).toBe("crooked");
    expect([g.scarfLength, g.bagSize, g.backpackSize]).toEqual([1, 1, 0]);
    expect(upgrade({}).hat.shape).toBe("classic");
  });
  it("offers no hat first, and the wide sliders' ends are still a valid witch", () => {
    const A = Art.WITCH_AXES as unknown as Record<string, unknown[]>;
    expect(A.hatShape[0]).toBe("none");
    for (const end of [0, 1]) {
      const g = upgrade({}) as unknown as Record<string, unknown>;
      for (const [axis, lim] of Object.entries(A)) { const [part, key] = slot(axis), v = typeof lim[0] === "number" ? lim[end] : lim[end ? lim.length - 1 : 0]; if (part) (g[part] as Record<string, unknown>)[key] = v; else g[key] = v; }
      expect((Art.witchGenomeProblems as (g: unknown) => string[])(g)).toEqual([]);
    }
  });
  it("picks colours in 256 steps that come back to the same steps", () => {
    for (let i = 0; i < STEPS; i += 17) for (const [sh, gr] of [[0, 0], [80, 0], [153, 0], [200, 0], [255, 0], [100, 128], [60, 255]]) {
      const c = fromPicker(i, sh, gr);
      expect(c.every(v => v >= 0 && v <= 1)).toBe(true);
      const [h, s2, g2] = toPicker(c);
      expect(h).toBe(i);
      if (c[2] < .995) { expect(Math.abs(s2 - sh)).toBeLessThanOrEqual(1); expect(Math.abs(g2 - gr)).toBeLessThanOrEqual(1); }
    }
  });
  it("draws her bedroom at every art pixel: every glow, the banner's letters, its anchors inside, the floor clear round her", () => {
    const M = Art.M as Record<string, number>;
    for (const pixel of [3, 4, 5]) {
      const sp = (Art.bedroomSprite as unknown as (st: object) => { w: number; h: number; m: Uint8Array; anchors: Record<string, unknown> })({ pixel }), a = sp.anchors;
      for (const mat of ["RUNE", "GLINT", "WOKEN", "GLOW", "MAGIC", "MAGIC2", "COLLAR"]) expect(sp.m.includes(M[mat]), `${mat} at px ${pixel}`).toBe(true);
      const inside = (p: unknown) => Array.isArray(p) && p[0] >= 0 && p[1] >= 0 && p[0] < sp.w && p[1] < sp.h;
      for (const k of ["stand", "screen", "lantern", "potions", "decks"]) expect(inside(a[k]), k).toBe(true);
      expect((a.runes as unknown[]).length).toBeGreaterThanOrEqual(2);
      expect((a.letters as [string][]).map(l => l[0]).join("")).toBe("PARTYTONIGHT");
    }
  });
  it("puts every item of hers in its own box: every axis, accessory and colour part in exactly one, each box's parts its own", () => {
    const ids = BOXES.map(b => b.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const axis of Object.keys(Art.WITCH_AXES)) expect(ids, axis).toContain(boxOf("axes", axis));
    for (const kind of ["axes", "wear", "parts"] as const) { const all = BOXES.flatMap(b => b[kind]); expect(new Set(all).size, kind).toBe(all.length); }
    for (const id of ["hat", "hair", "outfit", "shoes", "broom", "scarf", "bag", "backpack"]) expect(ids).toContain(id);
    expect(boxOf("parts", "plume")).toBe("hat");
    expect(boxOf("axes", "someNewAxis")).toBe(BOXES[BOXES.length - 1].id); // (a new one shows up in the last box)
  });
  it("has a place in her room by each of her things she can walk up to, its box a real one", () => {
    const f = (Art.bedroomSprite as unknown as (st: object) => { walk: RoomFloor })({ pixel: 4 }).walk, ids = BOXES.map(b => b.id);
    expect(Object.keys(f.spots ?? {}).length).toBeGreaterThanOrEqual(6);
    for (const [id, [x, z]] of Object.entries(f.spots!)) {
      expect(ids, id).toContain(id);
      expect(clear(f, x, z), `${id}: she can stand there`).toBe(true);
      const w = newWalker(f); w.x = x; w.z = z;
      expect(spotAt(f, w)).toBe(id);
    }
  });
});
