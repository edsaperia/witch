import { describe, expect, it } from "vitest";
import { entTreehouseSprites, witchSprites } from "./homeArt";
import { createHash } from "node:crypto";
import { loadStyle } from "./style";
import type { MakeCanvas } from "./artBuild";
import { PILE_SLOTS, wornGenome } from "../rules/clothesPile";
import { defaultGenome } from "../app/defaultLook";

// A canvas enough for the baker: its image data kept as put.
const mk: MakeCanvas = (w, h) => {
  let img: ImageData | null = null;
  const ctx = { createImageData: (cw: number, ch: number) => ({ width: cw, height: ch, data: new Uint8ClampedArray(cw * ch * 4) }), putImageData: (d: ImageData) => { img = d; }, getImageData: () => img, drawImage: () => {} };
  return { width: w, height: h, getContext: () => ctx, get img() { return img; } } as never;
};
const pixels = (b: unknown) => { const a = (b as { A: { img: ImageData | null } }).A.img; expect(a).toBeTruthy(); return Buffer.from(a!.data).toString("base64"); };

it("carrier-free Ent and oak baseline", () => {
  for (const house of [false, true]) {
    const { sprites, treehouse } = entTreehouseSprites(loadStyle(), mk, 30, 20, house);
    const hash = createHash("sha256").update(JSON.stringify({ treehouse, pixels: sprites.map(pixels) })).digest("hex");
    expect(sprites).toHaveLength(40);
    expect(hash).toBe(house ? "ca5e07fb1c37e0cb369b5b22eecf9596655a878156a5f1e18ea7fe97a1afc55a" : "66267cf763b22e0bf91f7f322145e286ad7d01f5c1446d5dd237297c6bc82ce6");
  }
});

describe("her preview (witchSprites quick: worn till her whole set is in)", () => {
  // Ed's v5249 report (2026-10-28): out of bed, or off a dressing station, she slid about on her standing frame: her frames were the
  // preview's, every walk frame the one standing frame, till her whole set landed (minutes behind the island's art on a slow machine).
  for (const bare of [false, true]) it(`steps as she walks${bare ? " (her hat off: the first morning's frames)" : ""}`, () => {
    const { sprites, witch } = witchSprites(loadStyle(), null, bare, mk, false, true);
    for (const list of [witch.foot.walk.towards, witch.foot.walk.away, witch.foot.walkBroom.towards, witch.heading.down.walk, witch.heading.up.walk]) {
      expect(list).toHaveLength(6);
      expect(new Set(list.map(i => pixels(sprites[i]))).size).toBeGreaterThan(1);
    }
    // standing, still the one frame a facing (the preview's point: a tenth of the drawing)
    expect(new Set(witch.foot.idle.towards.map(i => sprites[i])).size).toBe(1);
  });
});

describe("the first morning's hat lying on the floor (rules/wakeUp.ts hatOnFloor)", () => {
  // Ed's playtest of v7061, a fresh game: "hat has not appeared in first hat spawn point". Her hat still to put on (in the pile), she
  // was drawn by a look with no hat at all, so her hat-off frames had no hat to lie on the floor (render/view/witch.ts hatFrame).
  it("her worn look keeps its hat's shape while it lies there, so her hat-off frames have it lying", () => {
    const look = defaultGenome(), pile = [...PILE_SLOTS];
    expect((wornGenome(look, pile) as { hat: { shape: string } }).hat.shape).toBe("none"); // (in the pile, nowhere: bare-headed)
    const lying = wornGenome(look, pile, true) as { hat: { shape: string }; accessories: Record<string, unknown> };
    expect(lying.hat.shape).toBe((look as { hat: { shape: string } }).hat.shape);
    expect(lying.accessories.nightie).toBe(true); // (the rest still in the pile)
    expect(witchSprites(loadStyle(), lying, true, mk).witch.hat).toBeGreaterThanOrEqual(0);
  }, 120000);
});
