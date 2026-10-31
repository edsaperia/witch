import { describe, expect, it } from "vitest";
import { artCacheKey } from "./artCache";
import { applyEdLayout, houseArtLayout } from "../rules/housePlacement";
import { HOUSE_CONFIG } from "../rules/houseConfig";
import type { HouseConfig } from "../rules/houseRooms";
import type { ArtJob } from "./artBuild";
import { Model, render } from "../../art/model3d.js";
import { djTable } from "../../art/treehouse.js";
import { createHash } from "node:crypto";

describe("optional layout artwork input", () => {
  it("leaves default payload and cache-key bytes unchanged, and separates stable opted-in configs", () => {
    const source = HOUSE_CONFIG as HouseConfig, job = { kind: "housePiece", id: "bed|@6:0.4", style: {}, ppm: 6, pitch: .4 } as ArtJob;
    expect(houseArtLayout(source)).toBeUndefined(); expect(job).not.toHaveProperty("layout");
    const fingerprints = { housePiece: "original" };
    expect(artCacheKey(job, "style", fingerprints)).toBe("art-kind-v1|original|style|housePiece:bed|@6:0.4|");
    const layout = houseArtLayout(applyEdLayout(source, true))!, again = houseArtLayout(applyEdLayout(source, true))!;
    expect(layout.identity).toBe(again.identity);
    expect(artCacheKey({ ...job, layout } as ArtJob, "style", fingerprints)).toBe(`art-kind-v1|original|style|housePiece:bed|@6:0.4||layout:${layout.identity}`);
    const changed = applyEdLayout(source, true); changed.objects[0].x += 1;
    expect(houseArtLayout(changed)!.identity).not.toBe(layout.identity);
  });
  it("keeps the original DJ pixel/normal hashes at zero rotation and rotates attachment coordinates rigidly", () => {
    const expected = ["ad68afa19b3f5a005bc6e1d2543db5c2e0fbb709be6550dc54b06fb11e1f329a", "f006daddd46a986f9d285869180890cb99876e54e1d0b4a338c5a8f9b59c7615"];
    [0, 3].forEach((frame, i) => {
      const m = new Model({ blend: .04 }); djTable(m, { frame }); const options = { scale: 16, facing: "towards" }, image = render(m, options);
      expect(createHash("sha256").update(image.sp!.m).update(new Uint8Array(image.sp!.n.buffer)).digest("hex")).toBe(expected[i]);
    });
    const baseOptions = { stand: [0, 0, 0], rotation: 0 }, movedOptions = { stand: [10, 0, 20], rotation: Math.PI / 2 };
    const base = djTable(new Model(), baseOptions), moved = djTable(new Model(), movedOptions);
    const a = base.to([1, 2, 3]), b = moved.to([1, 2, 3]);
    expect(b[0]).toBeCloseTo(10 - a[2]); expect(b[1]).toBeCloseTo(a[1]); expect(b[2]).toBeCloseTo(20 + a[0]);
  });
});
