// The character creator's looks (the overnight polish: "a randomise that gives pleasing combinations (palettes that go
// together), a few preset looks, and sensible defaults for a first-time player"). No DOM: the creator (ui/creator.ts) shows them.
//   - harmonyPalette: a palette from one base hue by a colour scheme (analogous, complementary, a triad, a split
//     complement), each part in its role: the hat dark so its glowing band shows, the cloak the hat's family, the jacket the
//     accent, the top a light near-neutral, the jeans a muted dark, the bags and broom natural leather and wood, a natural
//     or (now and then) a fantasy hair colour.
//   - LOOKS: named looks, each a patch over her classic genome (and a palette), for a first-time player to start from.
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

/** Her looks to start from: each a name, a line, and a patch over her classic genome. */
export const LOOKS: { id: string; name: string; note: string; patch: (g: Genome) => void }[] = [
  { id: "classic", name: "✨ Classic", note: "her own look", patch: () => {} },
  { id: "raver", name: "🪩 Raver", note: "mesh, glow sticks, shades, a party hat", patch: g => {
    g.hat = { ...g.hat, shape: "party", height: 1.2, band: 2 }; g.top = "mesh"; g.hair = "buns"; Object.assign(g.accessories, { phones: true, shades: true, glowsticks: true, earrings: true });
    g.palette = { hat: [.85, .7, .4], jacket: [.52, .8, .9], top: [.85, .1, .95], jeans: [.75, .5, .35], sneakers: [.52, .7, .95], hair: [.85, .55, .9], headphones: [.15, .8, .95], plume: [.33, .8, .95] };
  } },
  { id: "forest", name: "🌿 Forest witch", note: "a floppy hat, a long cloak, a twig broom", patch: g => {
    g.hat = { ...g.hat, shape: "floppy", height: 1.1, brim: 1.4 }; g.cloak = "long"; g.cloakLength = 1.6; g.top = "poncho"; g.hair = "long"; g.broom = { ...g.broom, kind: "twig", length: 1.15, bristles: 1.3 };
    Object.assign(g.accessories, { phones: false, satchel: true, pendant: true, familiar: "toad" });
    g.palette = { hat: [.3, .55, .32], cloak: [.33, .5, .4], jacket: [.12, .6, .75], top: [.15, .12, .92], jeans: [.08, .45, .4], sneakers: [.07, .5, .5], hair: [.04, .7, .5], satchel: [.07, .55, .45] };
  } },
  { id: "owl", name: "🦉 Night owl", note: "a hood, a crow, deep purples", patch: g => {
    g.hat = { ...g.hat, shape: "crooked", height: 1.5 }; g.cloak = "hooded"; g.cloakLength = 1.8; g.hair = "bob"; g.broom = { ...g.broom, kind: "round" };
    Object.assign(g.accessories, { phones: false, scarf: true, pendant: true, familiar: "crow" });
    g.palette = { hat: [.75, .6, .3], cloak: [.72, .55, .32], jacket: [.68, .5, .55], top: [.7, .1, .85], jeans: [.7, .35, .3], sneakers: [.75, .3, .4], hair: [.6, .04, .86], scarf: [.9, .55, .85] };
  } },
  { id: "disco", name: "💃 Disco", note: "sequins, a top hat, gold and pink", patch: g => {
    g.hat = { ...g.hat, shape: "top", height: 1.3 }; g.top = "sequins"; g.hair = "long"; Object.assign(g.accessories, { phones: false, shades: true, earrings: true, scarf: true });
    g.palette = { hat: [.92, .6, .35], jacket: [.12, .75, .95], top: [.92, .45, .95], jeans: [.92, .5, .45], sneakers: [.12, .7, .95], hair: [.11, .45, .88], scarf: [.92, .6, .9] };
  } },
  { id: "cowgirl", name: "🤠 Rodeo", note: "a cowboy hat, a poncho, a fan broom", patch: g => {
    g.hat = { ...g.hat, shape: "cowboy", brim: 1.3 }; g.top = "poncho"; g.hair = "bob"; g.broom = { ...g.broom, kind: "fan" };
    Object.assign(g.accessories, { phones: false, scarf: true, satchel: true, familiar: "cat" }); g.scarfLength = 1.4;
    g.palette = { hat: [.07, .55, .4], jacket: [.02, .65, .78], top: [.12, .15, .95], jeans: [.6, .45, .5], sneakers: [.07, .55, .5], hair: [.11, .45, .88], scarf: [.0, .7, .8] };
  } },
  { id: "dj", name: "🎧 DJ", note: "big headphones, a cap of a beanie, a backpack", patch: g => {
    g.hat = { ...g.hat, shape: "beanie" }; g.top = "jacket"; g.hair = "mohawk"; g.backpackSize = 1.2; Object.assign(g.accessories, { phones: true, shades: true, glowsticks: true });
    g.palette = { hat: [.55, .6, .35], jacket: [.55, .7, .85], top: [.0, .0, .95], jeans: [.0, .0, .2], sneakers: [.33, .8, .9], hair: [.33, .7, .8], headphones: [.92, .7, .95], backpack: [.0, .0, .25] };
  } },
];

/** A look by id, over her classic genome (keeping only fields the generator knows). */
export function lookGenome(id: string): Genome {
  const g = (Art.upgradeGenome as (g: unknown) => Genome)(JSON.parse(JSON.stringify(Art.WITCH_GENOME)));
  LOOKS.find(l => l.id === id)?.patch(g);
  return g;
}
