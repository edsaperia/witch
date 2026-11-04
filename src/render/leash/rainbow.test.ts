import { describe, expect, it, vi } from "vitest";
import * as THREE from "three";
import { TUNING } from "../../rules/tuning";
import { COLD_LINE, coldRainbow } from "../colourGrammar";
import type { LeashView } from "../leash";

// The ley line ahead of its spark (Ed, 2026-11-03: "should be less colourful; a cold coloured rainbow, maybe just blue and purple and
// turquoise"): its single dots there run through the cold palette only; the analyser's bars behind the spark keep the whole rainbow.
vi.mock("../height", async importOriginal => ({ ...(await importOriginal<typeof import("../height")>()), groundHeight: () => 0, bendPoint: <V>(v: V) => v, groundSeenAt: () => true }));
const { drawRainbow } = await import("./rainbow");

const hue = ([r, g, b]: readonly number[]) => { const M = Math.max(r, g, b), m = Math.min(r, g, b), d = M - m || 1; const h = M === r ? ((g - b) / d) % 6 : M === g ? (b - r) / d + 2 : (r - g) / d + 4; return (h * 60 + 360) % 360; };
const cold = (c: number[]) => { const h = hue(c); return h >= 160 && h <= 290; };

/** drawRainbow over one line of 120 dots a metre apart (two turns of the rainbow's wheel), its spark half way; each dot's colour, ahead or behind. */
function dots(grammar: "new" | "old", time = 0): { ahead: number[][]; behind: number[][] } {
  const n = 120, links = new Float32Array(n), run = new Float32Array(n);
  for (let i = 0; i < n; i++) { links[i] = i / 4; run[i] = i; }
  const spark = links[n / 2], drawn: { l: number; c: number[] }[] = [];
  let x = 0;
  const line = { bars: { links, run }, from: 0, to: links[n - 1], spark, strength: 1, ringLinks: 0, ringK: 1, hide: [0, 0] as [number, number], place: (l: number) => ((x = l), { x: l, z: 0 }) };
  const game = { tuning: { ...TUNING, colourGrammar: grammar }, rainbows: [], clock: { time }, partyOver: null };
  const lv = {
    game, ley: { dotLines: () => [line] }, stoneView: { spectrum: null, wantsSpectrum: false }, frameDt: 0.016, rainbowQuads: 0,
    over: { add: (_x: number, _y: number, _z: number, _s: number, _d: number[], r: number, g: number, b: number) => { drawn.push({ l: x, c: [r, g, b] }); } },
  } as unknown as LeashView;
  const cam = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
  cam.position.set(15, 60, 40); cam.lookAt(15, 0, 0); cam.updateMatrixWorld(); cam.updateProjectionMatrix();
  drawRainbow(lv, time, [0, 0, 1, 1], cam);
  return { ahead: drawn.filter(d => d.l > spark).map(d => d.c), behind: drawn.filter(d => d.l <= spark).map(d => d.c) };
}

describe("the ley line's colours (Ed, 2026-11-03)", () => {
  it("ahead of the spark, its dots are only blue, purple and turquoise, whenever you look", () => {
    for (const time of [0, 3.3, 41]) {
      const { ahead } = dots("new", time);
      expect(ahead.length).toBeGreaterThan(50);
      expect(ahead.filter(c => !cold(c))).toEqual([]);
      const hues = ahead.map(hue);
      expect(Math.max(...hues) - Math.min(...hues)).toBeGreaterThan(60); // (still a rainbow of its own: turquoise to purple)
    }
  });
  it("behind the spark, the bars keep the whole rainbow", () => {
    const { behind } = dots("new");
    expect(behind.some(c => !cold(c))).toBe(true);
  });
  it("the old colours: the whole rainbow ahead too", () => {
    const { ahead } = dots("old");
    expect(ahead.some(c => !cold(c))).toBe(true);
  });
  it("the cold rainbow runs blue, purple, turquoise and back, never leaving the cold side", () => {
    expect(coldRainbow(0).map(v => Math.round(v * 255))).toEqual([...COLD_LINE[0]]);
    expect(coldRainbow(1 / 3).map(v => Math.round(v * 255))).toEqual([...COLD_LINE[1]]);
    expect(coldRainbow(2 / 3).map(v => Math.round(v * 255))).toEqual([...COLD_LINE[2]]);
    for (let i = -50; i <= 150; i++) expect(cold(coldRainbow(i / 100)), `at ${i / 100}`).toBe(true);
    expect(COLD_LINE.map(c => hue([...c])).map(Math.round)).toEqual([221, 264, 174]); // (blue, purple, turquoise)
  });
});
