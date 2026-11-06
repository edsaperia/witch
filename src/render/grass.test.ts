// The grass under a sail's dive (Ed, 2026-11-06: "Make sure things load and render before the mist disappears"): an island in another
// biome has its tufts drawn under the dive, not before the hand-off (render/view.ts bakeTufts; on the bear they were most of the
// wait), a type at a time, nearest the dive's track first; till they're in, that island's tufts are held back (none drawn: no other
// biome's tufts on it, nothing popping in outside the mist), then all written from the new art at once.
// (Headless: the art's tuft drawing a stand-in, one pixel a tuft, so the packing and the grass's own buffers run as they do.)
import { describe, expect, it, vi } from "vitest";
import { runSync } from "./slices";
import { newGame } from "../rules/game";
import { TUNING } from "../rules/tuning";
import { LOOKS } from "../rules/map";

const baked: string[] = [];
const canvas = () => ({ getContext: () => ({ getImageData: () => ({ data: new Uint8ClampedArray([200, 200, 200, 255]) }) }) });
vi.mock("../../art/generator.js", async orig => ({ ...(await orig<Record<string, unknown>>()), bakeTufts: (id: string) => { baked.push(id); return [{ kind: "grass", weight: 1, A: canvas(), N: canvas(), S: canvas(), w: 1, h: 1 }]; } }));
const { GrassView } = await import("./grass");

/** How many tufts the grass would draw now (a size over 0). */
const drawn = (g: InstanceType<typeof GrassView>): number => { const T = (g as unknown as { tuft: { array: Float32Array } }).tuft.array; let n = 0; for (let i = 2; i < T.length; i += 4) if (T[i] > 0) n++; return n; };

describe("the grass under the dive", () => {
  it("draws the types' tufts nearest the dive's track first, the rest after, and packs them the same whatever the order", () => {
    const style = { grassTest: 1 }; // (a style of its own: nothing kept from another test)
    baked.length = 0;
    const order = [7, 3, 12], made = runSync(GrassView.tufts({ ...style, biome: "north" }, new Set(order), order));
    expect(baked.slice(0, 3)).toEqual(order.map(t => LOOKS[t].id));
    expect(baked.length).toBe(LOOKS.length); // (every type's, once)
    baked.length = 0;
    const again = runSync(GrassView.tufts({ ...style, biome: "north" }, new Set(order)));
    expect(baked).toEqual([]); // (kept: drawn once a biome)
    expect(again.kinds).toEqual(made.kinds); expect(again.pixels.frames).toEqual(made.pixels.frames);
  });

  it("holds back the held types' tufts (none drawn) till their art is in, then writes them all at once", () => {
    const g = newGame(123, TUNING), made = runSync(GrassView.tufts({ grassTest: 2 }));
    const grass = new GrassView(g.map, g.tuning, 0.05, { grassTest: 2 }, g.forest, undefined, made), h = g.map.treehouse;
    const at = (x: number, z: number) => { for (let i = 0; i < 40; i++) grass.update(x, z, 1, [], Infinity); return drawn(grass); };
    const before = at(h.x + 30, h.z + 30);
    expect(before).toBeGreaterThan(0);
    const all = new Set(LOOKS.map((_, t) => t));
    grass.hold(all); // (a sail into another biome: setGame)
    expect(grass.holds(0)).toBe(true);
    expect(at(h.x + 30, h.z + 30)).toBe(0); // (nothing of the island's drawn, not the last biome's)
    expect(at(h.x + 60, h.z + 30)).toBe(0); // (nor as she moves)
    grass.setArt(runSync(GrassView.tufts({ grassTest: 2, biome: "north" }, all))); // (the dive's bake in: render/view.ts bakeTufts)
    expect(grass.holds(0)).toBe(false);
    expect(at(h.x + 60, h.z + 30)).toBeGreaterThan(0);
    expect(at(h.x + 30, h.z + 30)).toBe(before); // (the same tufts where she was, all of them)
  });
});
