// The hand-drawn override slot (art/overrides/README.md): the PNG reader, and every file in art/overrides named for a real
// species and pose, readable, and given to the game.
import { describe, expect, it } from "vitest";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { readPng } from "../../tools/overrides/png";
import { SPECIES } from "../../art/creatures.js";
import { OVERRIDES, hasOverride, overrideFor, poseName } from "./overrides";

const FIX = "tools/overrides/fixtures";

describe("the PNG reader", () => {
  const want = [255, 0, 0, 255, 0, 255, 0, 255, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 255, 254, 128, 128, 128, 100];
  for (const f of ["rgba-sub.png", "rgba-up.png"]) it(`reads ${f}`, () => {
    const p = readPng(readFileSync(`${FIX}/${f}`));
    expect([p.w, p.h]).toEqual([3, 2]);
    expect([...p.rgba]).toEqual(want);
  });
  it("reads an indexed PNG with a transparent colour", () => {
    const p = readPng(readFileSync(`${FIX}/indexed.png`));
    expect([...p.rgba]).toEqual([0, 0, 0, 0, 255, 0, 0, 255, 0, 0, 255, 255, 0, 0, 255, 255, 255, 0, 0, 255, 0, 0, 0, 0]);
  });
  it("refuses what isn't a PNG", () => expect(() => readPng(new Uint8Array(16))).toThrow());
});

describe("art/overrides", () => {
  const dir = "art/overrides", ids = new Set(SPECIES.map((s: { id: string }) => s.id));
  const poses = new Set([0, 1, 2, 3].flatMap(l => [0, 1].flatMap(f => [poseName(l, f, false), poseName(l, f, true)])));
  const files = existsSync(dir) ? readdirSync(dir, { withFileTypes: true }).filter(d => d.isDirectory()).flatMap(d => readdirSync(`${dir}/${d.name}`).filter(f => f.endsWith(".png")).map(f => `${d.name}/${f.slice(0, -4)}`)) : [];
  it("names the poses as art/export.mjs does", () => expect(poseName(2, 1, true)).toBe("adult-walk1-away"));
  it("every file is a real species' pose, readable, and in the game", () => {
    for (const k of files) {
      const [species, pose] = k.split("/");
      expect(ids.has(species), `${k}: no species ${species}`).toBe(true);
      expect(poses.has(pose), `${k}: no pose ${pose} (${[...poses].join(", ")})`).toBe(true);
      const o = overrideFor(species, pose)!;
      expect(o, k).toBeTruthy();
      expect(o.w > 0 && o.h > 0 && o.w <= 512 && o.h <= 512, `${k}: ${o.w}×${o.h}`).toBe(true);
      expect(hasOverride(species, ["baby", "young", "adult", "legend"].indexOf(pose.split("-")[0]))).toBe(true);
    }
    expect(OVERRIDES.sort()).toEqual(files.sort());
  });
});
