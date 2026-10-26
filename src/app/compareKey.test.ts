// The comparability key (app/compareKey.ts): what a run was, where, on what and with what.
import { describe, expect, it } from "vitest";
import { compareKey, sceneMode } from "./compareKey";
import type { Game } from "../rules/game";

const game = (o: { shape?: string; island?: string; perch?: boolean; mode?: string; wave?: number } = {}) => ({
  seed: 42, party: { wave: o.wave ?? 3 }, tuning: { pixelSize: 2, map: { shape: o.shape ?? "circle", island: o.island, world: 5 } },
  witches: [{ body: { mode: o.mode ?? "ground", perch: o.perch } }],
}) as unknown as Game;

describe("the comparability key", () => {
  it("says her scene: the zoo, the treehouse, the treetops or the ground", () => {
    expect(sceneMode(game({ shape: "zoo" }))).toBe("zoo");
    expect(sceneMode(game({ perch: true }))).toBe("house");
    expect(sceneMode(game({ mode: "treetop" }))).toBe("treetops");
    expect(sceneMode(game())).toBe("ground");
  });
  it("holds the build, the world, the island, the scene, the canvas, the renderer, the machine and the knobs", () => {
    const k = compareKey({ build: "v4871 eaf1bb8", game: game({ island: "fox" }), canvas: { width: 258, height: 149 }, window: { width: 774, height: 448 }, renderer: "ANGLE (Apple M1)", changed: [["occlusion.edge", 4]], params: new URLSearchParams("seed=42&world=5&at=10,20&quick=1&set=a=1"), dpr: 2, nav: { userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/141.0 Safari/537.36", hardwareConcurrency: 8 } });
    expect(k).toEqual({ build: "v4871 eaf1bb8", seed: 42, world: 5, island: "fox", scene: "wave 3 · ground", spot: "play", viewport: "774x448", pixelScale: "2 @2 (canvas 258x149)", renderer: "ANGLE (Apple M1)", machine: "Chrome 141 macOS · 8 cores", knobs: { "occlusion.edge": 4, "?quick": "1" } });
    expect(compareKey({ build: "b", game: game(), canvas: { width: 1, height: 1 }, renderer: "r", changed: [], params: new URLSearchParams(), spot: "bench scenes" })).toMatchObject({ island: "home", spot: "bench scenes", machine: "?" });
  });
});
