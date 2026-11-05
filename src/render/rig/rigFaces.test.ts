// The rig's expression heads behind tuning looks.expressions (Ed, 2026-11-05: "Scrap animal expressions for now."): off, a page
// bakes none (a sleeping legend's asleep head stays, its sleeping look); on, the faces as before (art/genome/parts.js rigFaces).
import { describe, expect, it } from "vitest";
import { rigParts } from "../../../art/genome/parts.js";
import { defaultStyle } from "../../../art/generator.js";

const faces = (level: number, on?: boolean) => Object.keys((rigParts as (...a: unknown[]) => { faces: Record<string, unknown> } | null)("fox", level, defaultStyle(), null, ...(on === undefined ? [] : [on]))!.faces).sort();

describe("rig expression heads", () => {
  it("bakes none with the faces off, but a legend's asleep head", () => {
    expect(faces(2, false)).toEqual([]);
    expect(faces(3, false)).toEqual(["asleep"]);
  });
  it("bakes every face with them on (the art's tools' default)", () => {
    expect(faces(2)).toEqual(["angry", "bite", "dazed", "happy", "yawn"]);
  });
});
