import { afterEach, describe, expect, it, vi } from "vitest";
import * as art from "../../../art/generator.js";
import { LeashView } from "../leash";
import { SLOT } from "./glyphs";

// Exercise the real atlas method without constructing the scene or a browser canvas.
function atlas() {
  const image = () => ({ data: new Uint8ClampedArray(SLOT * SLOT * 4), width: SLOT, height: SLOT });
  const painted: Uint8ClampedArray[] = [];
  const context = { clearRect: vi.fn(), createImageData: image, putImageData: vi.fn((img: ImageData) => painted.push(img.data.slice())) };
  const view = Object.assign(Object.create(LeashView.prototype), {
    game: { tuning: { leash: { ranks: { bold: true } } } },
    slots: new Map(), nextSlot: 1, canvas: { getContext: () => context },
    extent: new Map(), shades: new Map(), glyphPts: new Map(), colours: new Map(), tex: { needsUpdate: false },
  }) as LeashView;
  return { view, context, painted };
}

afterEach(() => vi.restoreAllMocks());

describe("bare sigil atlas cache", () => {
  for (const species of ["beaver", "polarbear", "squirrel", "unicorn", "wolf"]) {
    it(`${species}: rasterizes each plain/crowned glyph once, with unchanged ink`, () => {
      const raster = vi.spyOn(art, "boldGlyph"), { view, context, painted } = atlas();
      for (const crown of [false, true]) {
        const slot = view.bareSlot(species, crown), first = painted.at(-2)!;
        const glyph = raster.mock.results.at(-1)!.value as NonNullable<ReturnType<typeof art.boldGlyph>>;
        const offsetX = (SLOT - art.BOLD_GRID) >> 1, offsetY = crown ? SLOT - art.BOLD_GRID : offsetX;
        for (let y = 0; y < art.BOLD_GRID; y++) for (let x = 0; x < art.BOLD_GRID; x++) {
          expect(first[((y + offsetY) * SLOT + x + offsetX) * 4 + 3]).toBe(glyph.m[y * art.BOLD_GRID + x] ? 255 : 0);
        }
        const calls = raster.mock.calls.length, paints = context.putImageData.mock.calls.length;
        view.tex.needsUpdate = false;
        expect(view.bareSlot(species, crown)).toBe(slot);
        expect(raster).toHaveBeenCalledTimes(calls);
        expect(context.putImageData).toHaveBeenCalledTimes(paints);
        expect(view.tex.needsUpdate).toBe(false);
      }
      expect(raster).toHaveBeenCalledTimes(2);
    });
  }

  it("keeps cached plain, bold and crowned slots distinct when bold is toggled", () => {
    const raster = vi.spyOn(art, "boldGlyph"), { view } = atlas();
    view.slots.set("wolf:bare", 3); view.slots.set("wolf:bare:bold", 5); view.slots.set("wolf:bare:bold:crown", 7);
    expect(view.bareSlot("wolf")).toBe(5);
    expect(view.bareSlot("wolf", true)).toBe(7);
    view.game.tuning.leash.ranks!.bold = false;
    expect(view.bareSlot("wolf")).toBe(3);
    view.game.tuning.leash.ranks!.bold = true;
    view.slots.set("relic:bare", 9);
    expect(view.bareSlot("relic")).toBe(9);
    expect(raster).not.toHaveBeenCalled();
  });
});
