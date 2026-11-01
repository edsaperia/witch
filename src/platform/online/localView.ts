import { newCamera, stepCamera } from "../../rules/camera";
import type { Game } from "../../rules/game";
import { witchHeight } from "../../rules/witch";
import { wakeOf } from "../../rules/wakeUp";

/** Presentation facade only. Never pass this object to stepGame or persistence. */
export function localView(source: Game, player: number) {
  const local = source.witches[player];
  if (!local) throw new Error("Missing local witch");
  let camera = player === 0 ? structuredClone(source.camera) : newCamera(source.tuning, local.body.x, witchHeight(local.body, source.tuning), local.body.z);
  const game = { ...source } as Game;
  function update(dt: number, zoom = 0): Game {
    const W = source.witches[player]; if (!W) throw new Error("Local witch left");
    const b = W.body;
    const introFocus = game.introFocus;
    camera = stepCamera(camera, zoom, { x: b.x, y: witchHeight(b, source.tuning), z: b.z }, { x: b.vx, z: b.vz }, b.lift, Math.max(0, Math.min(0.1, dt)), source.tuning, !!b.seated, introFocus, null, null, !!b.perch);
    Object.assign(game, source, {
      witches: [W, ...source.witches.filter(w => w !== W)],
      witch: b, leash: W.leash, spells: W.spells, wake: wakeOf(source, W),
      herTime: W.time ?? source.herTime, camera, introFocus,
    });
    return game;
  }
  update(0);
  return { game, update };
}
