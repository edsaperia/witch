// The night's preparation (render/view.ts prepare: what the loading screen waits for, main.ts) makes the house's rooms before it's
// done (Ed, 2026-11-04: "why don't we do this during the loading screen"): asked once the start's own art (the Ent's) is in, waited
// for before the shaders are compiled and the textures uploaded, so prepare (and the loading screen) ends only with the house made.
// (Headless: the View a stand-in round its own prepare, the first frame's own helpers stand-ins.)
import { describe, expect, it, vi } from "vitest";

vi.mock("./view/creatures", async importOriginal => ({ ...(await importOriginal<object>()), drawCreatures: () => {} }));
vi.mock("./view/scenery", async importOriginal => ({ ...(await importOriginal<object>()), refreshSteps: function* () {} }));
vi.mock("./view/culling", async importOriginal => ({ ...(await importOriginal<object>()), viewRect: () => ({ minX: 0, maxX: 1, minZ: 0, maxZ: 1 }) }));

import { View } from "./view";

/** `house`: when the house is made (a promise the test resolves), or a number of ms after it is asked for. */
function standIn(log: string[], house: number | Promise<void>) {
  const v = Object.create(View.prototype) as Record<string, unknown>;
  const own = {
    game: { map: { first: 0, n: 1, centreCell: [0, 0], treehouse: { x: 0, z: 0 }, typeOf: () => 0, siteOf: () => ({ x: 0, z: 0 }), bounds: {}, legendKinds: [], specialSites: [] }, witch: { x: 0, z: 0 }, tuning: { haze: { near: 10 }, wildLegends: {} } },
    makeLoadingMist: () => {}, warmSteps: function* () {}, render: () => {}, askIsland: () => { log.push("island"); },
    ground: { fill: () => 0 },
    assets: { tonight: () => {}, homeArt: async () => { log.push("home art"); }, whenIdle: async () => { log.push("idle"); }, whenAsked: async () => { log.push("island's own asked"); } }, // (render/prepareIsland.test.ts has what it asks)
    compileAll: async () => { log.push("compile"); },
    houseRooms: { preload: () => { log.push("house asked"); return typeof house === "number" ? new Promise<void>(res => setTimeout(() => { log.push("house made"); res(); }, house)) : house.then(() => { log.push("house made"); }); } },
  };
  for (const [k, value] of Object.entries(own)) Object.defineProperty(v, k, { value, writable: true }); // (over the View's getters too: its ground)
  return v as unknown as View;
}

describe("the night's preparation and the house", () => {
  it("asks for the house once the start's art is in, and compiles (uploading its textures) only once it's made", async () => {
    const log: string[] = [];
    await standIn(log, 30).prepare();
    expect(log).toEqual(["home art", "house asked", "island's own asked", "idle", "house made", "compile", "island"]);
  });

  it("ends only once the house is made, however long it takes", async () => {
    const log: string[] = [];
    let done = false;
    // The house is made when the test says so (test honesty, 2026-11-18: this slept a real 60 ms of a 120 ms house): it waits for
    // everything else prepare does first (the art idle), sees prepare still out, then makes the house.
    let make!: () => void;
    const p = standIn(log, new Promise<void>(res => { make = res; })).prepare().then(() => { done = true; });
    await vi.waitFor(() => expect(log).toContain("idle"), { interval: 1 });
    expect(done).toBe(false); expect(log).not.toContain("compile");
    make();
    await p;
    expect(log.indexOf("house made")).toBeLessThan(log.indexOf("compile"));
  });
});
