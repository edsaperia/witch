// The rainbow wave (Ed, 2026-10-29: "Perhaps this looks like the spectrum analyser running along the line, pointing vertically";
// rules/rainbow.ts): behind each wave's front, a row of upright bars standing on the ley line, an analyser of the music playing (the
// mix's spectrum, read while any wave is on its way: render/leash/stones.ts StoneView.spectrum), each its own colour of a rainbow
// cycling along the row as the soundsystem spell's spot does, the row thinning out behind. The line it passes over shows meanwhile
// (render/leylines.ts setRainbows). Comfort's reduce-flashing slows the colours and calms the bars.
import { rainbow } from "../indicator";
import { comfort } from "../comfort";
import { SPRITE_UNIFORMS } from "../sprites";
import { groundHeight } from "../height";
import { rainbowFronts, rainbowKnobs, rainbowSpeed, routePoint } from "../../rules/rainbow";
import { barLevel } from "./stones";
import type { LeashView } from "../leash";

const levels = new Float32Array(64);

export function drawRainbow(lv: LeashView, time: number, dot: number[]): void {
  const g = lv.game, starts = g.rainbows;
  if (!starts?.length) return;
  const t = g.tuning, K = rainbowKnobs(t), fronts = rainbowFronts(g.party, g.map, starts, g.clock.time);
  if (!fronts.length) return;
  const V = lv.stoneView;
  V.wantsSpectrum = true; // (the mix's spectrum for the bars, from the next frame: main.ts)
  const n = Math.max(4, Math.min(levels.length, Math.round(K.bars ?? 28))), gap = K.spacing ?? 1.4, cell = K.cell ?? 0.6, tall = K.height ?? 9;
  const calm = comfort.reduceFlashing, spec = V.spectrum, dt = Math.min(0.1, lv.frameDt);
  for (let i = 0; i < n; i++) {
    const live = spec ? barLevel(spec, i, n * 2) : 0.3 + 0.25 * Math.abs(Math.sin(time * 1.7 + i * 1.3) * 0.6 + Math.sin(time * 2.6 + i * 0.7) * 0.4);
    levels[i] = Math.max(calm ? levels[i] * 0.9 + live * 0.1 : live, levels[i] - dt * (calm ? 0.8 : 1.8));
  }
  // (upright: up the sprites' own up, leaning back toward the camera, on the ground at the bar's foot: as a stone's column stands)
  const U = SPRITE_UNIFORMS.uUp.value, upZ = (z: number, h: number) => z + h * U.z, upY = (x: number, z: number, h: number) => h * U.y + groundHeight(x, z) - groundHeight(x, upZ(z, h));
  for (const f of fronts) {
    // (at the route's end the row stays a moment and fades as the line behind it does)
    const ended = f.front >= f.total ? Math.max(0, Math.min(1, (f.total - f.tail) / Math.max(0.1, K.linger * rainbowSpeed(t)))) : 1;
    for (let i = 0; i < n; i++) {
      const m = f.front - i * gap;
      if (m < 0) break;
      const p = routePoint(g.party, g.map, m);
      if (!p) break;
      const back = 1 - i / n, h = 1 + Math.round(levels[i] * tall * (0.45 + 0.55 * back));
      const c = rainbow(i / n + time * (calm ? 0.04 : 0.15)), a = Math.min(1, back * 1.4) * ended;
      for (let j = 0; j < h; j++) {
        const y = (j + 0.5) * cell, tip = j === h - 1;
        lv.over.add(p.x, upY(p.x, p.z, y), upZ(p.z, y), cell, dot, c[0], c[1], c[2], a * (tip ? 1 : 0.85));
      }
    }
  }
}
