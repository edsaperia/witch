// Shared test/report listener: real coast geometry and SfxCues, with no browser or audio device.
import { newGame } from "../rules/game";
import { TUNING } from "../rules/tuning";
import { beachOf } from "../rules/mapShape";
import { SfxCues } from "../platform/audio/sfxCues";
import type { Sfx } from "../platform/audio/sfx";
import { facing } from "./coast";

export function seaLifeListener() {
  // Coast extent and the original point 600 m inland remain part of range coverage.
  const game = newGame(123, TUNING), beach = beachOf(game.map.bounds, game.tuning)!;
  const place = (at: "east" | "west" | "inland") => {
    const p = facing(beach.land, at === "west" ? Math.PI : 0), d = at === "inland" ? 600 : 5;
    game.witch = { ...game.witch, x: p.x - p.nx * d, z: p.z - p.nz * d, seated: false, mode: "ground", lift: 0, stargazing: true };
  };
  const listen = (times: Iterable<number>) => {
    const n = { splash: 0, groan: 0, pour: 0 };
    const sfx = new Proxy({}, { get: (_, k: string) => k === "splash" ? () => n.splash++ : k === "krakenGroan" ? () => n.groan++ : k === "krakenPour" ? () => n.pour++ : () => {} }) as unknown as Sfx;
    const cues = new SfxCues(sfx);
    for (const time of times) { game.clock.time = time; cues.update(game, time); }
    return n;
  };
  return { game, beach, place, listen };
}

/** The original M4 sampling windows and 0.1-second cadence, now informational only. */
export function sampleSeaLife(at: "east" | "west", seconds: number) {
  const listener = seaLifeListener();
  listener.place(at);
  function* times() { for (let t = 0; t < seconds; t += 0.1) yield t; }
  return listener.listen(times());
}
