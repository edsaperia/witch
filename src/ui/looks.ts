// The character creator's looks (the overnight polish: "a randomise that gives pleasing combinations (palettes that go
// together), a few preset looks, and sensible defaults for a first-time player"). No DOM: the creator (ui/creator.ts) shows them.
//   - harmonyPalette: a palette from one base hue by a colour scheme (analogous, complementary, a triad, a split
//     complement), each part in its role: the hat dark so its glowing band shows, the cloak the hat's family, the jacket the
//     accent, the top a light near-neutral, the jeans a muted dark, the bags and broom natural leather and wood, a natural
//     or (now and then) a fantasy hair colour.
//   - pleasingWitch: the creator's Randomise. (Its named preset looks went with the creator's Looks box, Ed 2026-10-08.)
import * as Art from "../../art/generator.js";

type HSV = [number, number, number];
export type Genome = { hat: Record<string, number | string>; hair: string; top: string; cloak: string; broom: Record<string, number | string>; accessories: Record<string, boolean | string>; palette: Record<string, number[]> | null; [k: string]: unknown };

const wrap = (h: number) => ((h % 1) + 1) % 1;
const SKINS: HSV[] = [[.07, .25, .96], [.07, .32, .9], [.07, .42, .78], [.06, .5, .62], [.05, .55, .47], [.05, .5, .34]];
const NATURAL_HAIR: HSV[] = [[.07, .4, .14], [.07, .6, .33], [.04, .7, .5], [.11, .45, .88], [.02, .75, .7], [.6, .04, .86]]; // black, brown, auburn, blonde, red, silver
export const SCHEMES = ["analogous", "complementary", "triad", "split"] as const;

/** A palette that holds together: from base hue h0 by `scheme`, r a random number source in [0, 1). */
export function harmonyPalette(r: () => number, scheme: (typeof SCHEMES)[number] = SCHEMES[Math.floor(r() * SCHEMES.length)], h0 = r()): Record<string, HSV> {
  const between = (a: number, b: number) => a + (b - a) * r();
  const accent = scheme === "analogous" ? wrap(h0 + (r() < .5 ? -1 : 1) * between(.06, .12)) : scheme === "complementary" ? wrap(h0 + .5) : scheme === "triad" ? wrap(h0 + 1 / 3) : wrap(h0 + .42);
  const second = scheme === "triad" ? wrap(h0 + 2 / 3) : scheme === "split" ? wrap(h0 + .58) : wrap(accent + between(-.04, .04));
  const fantasy = r() < .3;
  return {
    hat: [h0, between(.45, .7), between(.28, .42)],                  // dark: the glowing band shows on it
    cloak: [wrap(h0 + between(-.03, .03)), between(.45, .65), between(.36, .52)],
    jacket: [accent, between(.55, .8), between(.68, .88)],
    top: [h0, between(.06, .18), between(.88, .97)],
    jeans: [second, between(.3, .5), between(.32, .5)],
    sneakers: r() < .5 ? [second, between(.55, .75), between(.8, .95)] : [0, 0, .95],
    headphones: [second, between(.55, .75), between(.8, .95)],
    scarf: [accent, between(.5, .75), between(.8, .95)],
    plume: [second, between(.6, .8), between(.85, 1)],
    satchel: [between(.05, .09), between(.45, .6), between(.38, .52)],
    backpack: [between(.05, .09), between(.4, .55), between(.42, .55)],
    hair: fantasy ? [wrap(accent + between(-.05, .05)), between(.45, .6), between(.75, .9)] : NATURAL_HAIR[Math.floor(r() * NATURAL_HAIR.length)],
    skin: SKINS[Math.floor(r() * SKINS.length)],
    broom: [between(.05, .1), between(.4, .6), between(.38, .55)],
    bristles: [between(.1, .14), between(.45, .6), between(.78, .92)],
  };
}

/** A pleasing random witch: the generator's witch (a witch's hat mostly, everything within its middling limits) in a harmonious palette. */
export function pleasingWitch(seed: number): Genome {
  const g = (Art.upgradeGenome as (g: unknown) => Genome)((Art.witchGenome as (s: number) => unknown)(seed));
  let a = (seed * 2654435761) >>> 0;
  const r = () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  g.palette = harmonyPalette(r);
  return g;
}
