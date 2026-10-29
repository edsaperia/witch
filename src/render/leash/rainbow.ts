// The rainbow's bars on the ley line, each an upright bar of the music's analyser (the mix's spectrum, read while any is shown:
// render/leash/stones.ts StoneView.spectrum), standing on the line as drawn (render/leylines.ts placeAt):
// - the rainbow wave (Ed, 2026-10-29: "Perhaps this looks like the spectrum analyser running along the line, pointing vertically";
//   rules/rainbow.ts): each run's row of bars, its head first, each bar its own colour of a rainbow cycling along the row as the
//   soundsystem spell's spot does, the row thinning out toward its tail; nothing left behind it;
// - behind the spark (Ed, 2026-10-29: "the post spark route should look like the audio analyser along its whole length"): a bar
//   every `route.spacing` metres from home up to the spark, lower than the wave's, in the line's own rainbow (render/leylines.ts
//   RAINBOW_M), only those in view (the camera's frustum, at the bent world's place: render/height.ts bendPoint).
// Comfort's reduce-flashing slows the colours and calms the bars. lv.rainbowQuads counts what's drawn.
import * as THREE from "three";
import { rainbow } from "../indicator";
import { comfort } from "../comfort";
import { SPRITE_UNIFORMS } from "../sprites";
import { bendPoint, groundHeight } from "../height";
import { rainbowKnobs, rainbowRuns, routePoint } from "../../rules/rainbow";
import { metresToLinks, routeLengths } from "../../rules/leypulse";
import { RAINBOW_M } from "../leylines";
import { barLevel } from "./stones";
import type { LeashView } from "../leash";

/** The analyser's bins behind the spark: its bars take them in turn, mirrored, so the music runs along the whole line. */
const ROUTE_BINS = 24;
const levels = new Float32Array(128), routeLevels = new Float32Array(ROUTE_BINS);
const frustum = new THREE.Frustum(), pv = new THREE.Matrix4(), sphere = new THREE.Sphere(), at = { x: 0, z: 0 };
export const ROUTE_DEFAULT = { on: true, spacing: 2, height: 7, cell: 0.5 };

export function drawRainbow(lv: LeashView, time: number, dot: number[], camera: THREE.Camera): void {
  lv.rainbowQuads = 0;
  const g = lv.game, t = g.tuning, K = rainbowKnobs(t), R = { ...ROUTE_DEFAULT, ...(K.route ?? {}) }, ley = lv.ley;
  const spark = R.on && ley && !g.partyOver ? ley.sparkLinks() : null;
  const runs = K.on && g.rainbows?.length ? rainbowRuns(g.party, g.map, g.rainbows, g.clock.time) : [];
  if (!runs.length && spark === null) return;
  const V = lv.stoneView;
  V.wantsSpectrum = true; // (the mix's spectrum for the bars, from the next frame: main.ts)
  const n = Math.max(4, Math.min(levels.length, Math.round(K.bars ?? 84))), gap = K.spacing ?? 1.4, cell = K.cell ?? 0.6, tall = K.height ?? 9;
  const calm = comfort.reduceFlashing, spec = V.spectrum, dt = Math.min(0.1, lv.frameDt);
  const settle = (L: Float32Array, i: number, live: number) => { L[i] = Math.max(calm ? L[i] * 0.9 + live * 0.1 : live, L[i] - dt * (calm ? 0.8 : 1.8)); };
  const idle = (i: number) => 0.3 + 0.25 * Math.abs(Math.sin(time * 1.7 + i * 1.3) * 0.6 + Math.sin(time * 2.6 + i * 0.7) * 0.4);
  if (runs.length) for (let i = 0; i < n; i++) settle(levels, i, spec ? barLevel(spec, i, n * 2) : idle(i));
  if (spark !== null) for (let i = 0; i < ROUTE_BINS; i++) settle(routeLevels, i, spec ? barLevel(spec, i, ROUTE_BINS * 2) : idle(i));
  pv.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse); frustum.setFromProjectionMatrix(pv);
  // (upright: up the sprites' own up, leaning back toward the camera, on the ground at the bar's foot: as a stone's column stands)
  const U = SPRITE_UNIFORMS.uUp.value, upZ = (z: number, h: number) => z + h * U.z, upY = (x: number, z: number, h: number) => h * U.y + groundHeight(x, z) - groundHeight(x, upZ(z, h));
  const seen = (x: number, z: number, h: number) => { sphere.center.set(x, groundHeight(x, z) + h * 0.5, z); bendPoint(sphere.center); sphere.radius = h * 0.5 + 3; return frustum.intersectsSphere(sphere); };
  const bar = (x: number, z: number, steps: number, size: number, c: readonly number[], a: number) => {
    for (let j = 0; j < steps; j++) {
      const y = (j + 0.5) * size;
      lv.over.add(x, upY(x, z, y), upZ(z, y), size, dot, c[0], c[1], c[2], a * (j === steps - 1 ? 1 : 0.85));
    }
    lv.rainbowQuads += steps;
  };
  const place = (m: number, lens: readonly number[]) => (ley ? ley.placeAt(metresToLinks(lens, m), time, at) : routePoint(g.party, g.map, m));
  // The waves' rows: each bar from its run's head back toward where it set off, only on its stretch (rules/rainbow.ts).
  if (runs.length) {
    const lens = routeLengths(g.party, g.map);
    for (const r of runs) for (let i = 0; i < n; i++) {
      const m = r.head - r.dir * i * gap;
      if (m < r.lo || m > r.hi) continue;
      const p = place(m, lens);
      if (!p) continue;
      const back = 1 - i / n, h = 1 + Math.round(levels[i] * tall * (0.45 + 0.55 * back));
      if (!seen(p.x, p.z, h * cell)) continue;
      bar(p.x, p.z, h, cell, rainbow(i / n + time * (calm ? 0.04 : 0.15)), Math.min(1, back * 1.4));
    }
  }
  // Behind the spark: the analyser the whole way, a bar every R.spacing metres of the line as drawn, in its own rainbow.
  if (spark !== null && ley) {
    const B = ley.barsAlong(R.spacing), fade = 1 - (g.partyOver?.ease ?? 0);
    for (let j = 0; j < B.links.length && B.links[j] <= spark; j++) {
      const p = ley.placeAt(B.links[j], time, at);
      if (!p) break;
      const k = j % (ROUTE_BINS * 2), h = 1 + Math.round(routeLevels[k < ROUTE_BINS ? k : ROUTE_BINS * 2 - 1 - k] * R.height);
      if (!seen(p.x, p.z, h * R.cell)) continue;
      bar(p.x, p.z, h, R.cell, rainbow(B.run[j] / RAINBOW_M - time * (calm ? 0.04 : 0.12)), 0.9 * fade);
    }
  }
}
