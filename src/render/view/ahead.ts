// Work done ahead, out of what's left of the frame's budget (moved out of view.ts's render, unchanged): the hills' next strip,
// the forest ahead, the art, the ground's area tiles.
import type { View } from "../view";
import { focusOf, viewRect } from "./culling";
import { FRAME_MS } from "../view";

/** Does this frame's share of the work ahead. */
export function workAhead(v: View): void {
  const g = v.game, t = g.tuning, w = g.witch;
  // Work done ahead, a little each frame, out of what's left of the frame's budget (Ed, v256:
  // boosting over the treetops dropped frames when a rebuild, the hills' window moving and
  // these all fell in one frame). Each gets at least its floor, so all keep up at full boost.
  let spare = FRAME_MS - (performance.now() - v.frameStart) - v.drawEst;
  const give = (most: number, floor: number) => Math.max(floor, Math.min(most, spare));
  const took = (from: number) => { spare -= performance.now() - from; };
  let t0 = performance.now();
  // Where the view's heading (m/s): hers, or a sail's dive's aim (rules/arrive.ts aimVelocity: in bed, she isn't moving, and the
  // work ahead went nowhere while the camera flew in at 110 m/s; Ed's dive plan, 2026-11-06, its step 8).
  const F = v.fly, hx = F ? F.vx ?? 0 : w.vx, hz = F ? F.vz ?? 0 : w.vz;
  // The hills' next strip, in the direction she's flying (the window moves every 16 m).
  // (More while it's behind: at full boost the next strip is due every 8 frames or so.)
  v.heightsReady = v.heights.prepare(hx, hz, give(v.heightsReady ? 2 : 6, 0.5));
  took(t0); v.time("heightsAhead"); t0 = performance.now();
  // The forest ahead, centred where the view will be in two seconds at her speed, so a rebuild
  // finds its chunks already made instead of making a whole strip at once.
  const lv = v.lastView;
  if (lv) v.stats.forestMissing = g.forest.prefetch(lv.x + hx * 2, lv.z + hz * 2, lv.half + 64, give(4, 1));
  v.stats.forestMs = g.forest.buildMs; g.forest.buildMs = 0;
  took(t0); v.time("prefetch"); t0 = performance.now();
  v.assets.work(give(6, 1));
  took(t0); v.time("art");
  // The ground's area tiles: everything the cameras can see, plus a band ahead.
  // (round the view's focus, where the haze is centred: her, or the arrival's flight's aim; render/areaWindow.ts)
  // (and then, flying in, with what's left, the band the view's heading into, two seconds on along the aim's way; what's left of the
  // view's own counted: the sea's loading mist waits for it, render/view/mistReady.ts)
  { const f = focusOf(v), r = viewRect(v, t.haze.far, 40), t1 = performance.now();
    v.stats.pendingGround = v.ground.fill(v.renderer, r, f.x, f.z, give(4, 1));
    if (F && !v.stats.pendingGround) { const ax = hx * 2, az = hz * 2, b = { minX: r.minX + Math.min(0, ax), maxX: r.maxX + Math.max(0, ax), minZ: r.minZ + Math.min(0, az), maxZ: r.maxZ + Math.max(0, az) }; v.ground.fill(v.renderer, b, f.x + ax, f.z + az, give(4, 1) - (performance.now() - t1)); } }
  v.stats.pendingArt = v.assets.pending;
  v.time("groundTiles");
}
