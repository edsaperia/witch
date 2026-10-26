// The lights (from render/view.ts, issue #122): campfires and magic stones lit each frame, and the
// shader's light budget filled with the nearest.
import { writeOn } from "../leash/glyphs";
import { areaCellAt } from "../../rules/map";
import * as THREE from "three";
import { partyOff } from "../partyOver";
import { LIGHT_UNIFORMS, MAX_LIGHTS } from "../lighting";
import type { SpriteInstance } from "../sprites";
import { cellKey } from "../../rules/party";
import { groundHeight } from "../height";
import { hash2 } from "../../rules/random";
import type { ForestLight, View } from "../view";
import { inView } from "./culling";
import { mark } from "./pops";
import * as Art from "../../../art/generator.js";
import { LEGENDS } from "../../rules/legends";
import { beachFires } from "../beach";
import { findLight } from "./finds";
import { relicsOut } from "../../rules/partyOver";

const SOURCE_ITEMS: SpriteInstance[] = []; // (the sources' sprites: one list, emptied each frame)

export function updateSources(v: View, time: number): void {
  const f = v.assets.props.frames, items = SOURCE_ITEMS, lights = v.forestLights, g = v.game;
  items.length = 0; lights.length = 0; v.fireSparks.length = 0; v.worldFires.length = 0; // (the lists kept: read only within the frame)
  for (const src of v.sources) {
    if (src.kind === "pond") continue;
    const k = hash2(Math.round(src.x * 10), Math.round(src.z * 10), 7);
    if (src.kind === "campfire") {
      // Campfires are party objects (Ed, 2026-10-04): none in the dormant forest; in a partified
      // area they light up with a whoosh of sparks as the party arrives (late in its transition).
      let key = v.sourceCell.get(src);
      if (key === undefined) v.sourceCell.set(src, (key = cellKey(areaCellAt(g.map, src.x, src.z)))); // it never moves: ask once (a legend area's as its pair's: they partify together)
      const a = g.party.areas.get(key);
      if (!a) continue;
      const since = time - (a.at + g.tuning.party.transition * 0.7 + k * 1.5);
      if (since < 0) continue;
      const out = partyOff(v.over, src.x, src.z); // (the party's over: it dies down as the lights go out)
      if (out >= 0.999) continue;
      const grow = Math.min(1, since / 0.5) * (1 - out), whoosh = Math.max(0, 1 - since / 1.2) * (1 - out);
      const flick = 0.8 + 0.12 * Math.sin(time * 11 + k * 40) + 0.08 * Math.sin(time * 23.7 + k * 13);
      lights.push({ x: src.x + Math.sin(time * 9 + k) * 0.08, y: 1.2, z: src.z, reach: g.tuning.lights.campfire.reach * src.size, rgb: v.fire, strength: g.tuning.lights.campfire.strength * (flick * grow + whoosh * 2) });
      if (whoosh > 0) for (let i = 0; i < 10; i++) {
        const ang = i * 2.4 + k * 9, r = (1 - whoosh) * (0.4 + (i % 3) * 0.5);
        v.fireSparks.push({ x: src.x + Math.cos(ang) * r, y: 0.5 + (1 - whoosh) * (2 + (i % 4) * 1.2), z: src.z + Math.sin(ang) * r, colour: v.fire, alpha: whoosh });
      }
      // Drawn as the party's small campfire (partyObjects.ts) once its art is in: its frames share one
      // box and scale, where these old ones changed scale every frame and jittered (Ed).
      if (v.partyObjects.ready) { v.worldFires.push({ x: src.x, z: src.z, scale: grow, flip: k < 0.5 }); continue; }
      const fr = f[Math.floor(time * 8 + k * 10) % 3];
      if (inView(v, src.x, src.z, fr.w * v.mpp, fr.h * v.mpp, 4)) items.push({ x: src.x, y: 0, z: src.z, frame: fr, flip: k < 0.5, ...(grow < 1 ? { sx: grow, sy: grow } : {}), fresh: mark(v, "prop", src.x, src.z, 2) });
    } else {
      const kind = k < 0.33 ? 1 : k < 0.66 ? 0 : 2, pulse = 0.7 + 0.3 * Math.sin(time * 0.9 + k * 20), fr = f[3 + kind];
      lights.push({ x: src.x, y: 2, z: src.z, reach: v.game.tuning.lights.stone.reach * src.size, rgb: [v.runeCyan, v.runeViolet, v.runeGreen][kind], strength: v.game.tuning.lights.stone.strength * pulse });
      if (inView(v, src.x, src.z, fr.w * v.mpp, fr.h * v.mpp, 4)) items.push({ x: src.x, y: 0, z: src.z, frame: fr, flip: k < 0.5, fresh: mark(v, "prop", src.x, src.z, 2.6) });
    }
  }
  // The beach witches' campfires (render/beach.ts), while the beach is showing: lit as ever, whatever the party's doing.
  if (v.beachView.on) for (const c of beachFires(g)) {
    const k = hash2(Math.round(c.x * 10), Math.round(c.z * 10), 7), flick = 0.8 + 0.12 * Math.sin(time * 11 + k * 40) + 0.08 * Math.sin(time * 23.7 + k * 13);
    lights.push({ x: c.x + Math.sin(time * 9 + k) * 0.08, y: 1.2, z: c.z, reach: g.tuning.lights.campfire.reach, rgb: v.fire, strength: g.tuning.lights.campfire.strength * flick });
    if (v.partyObjects.ready) { v.worldFires.push({ x: c.x, z: c.z, scale: 1, flip: c.flip }); continue; }
    const fr = f[Math.floor(time * 8 + k * 10) % 3];
    if (inView(v, c.x, c.z, fr.w * v.mpp, fr.h * v.mpp, 4)) items.push({ x: c.x, y: 0, z: c.z, frame: fr, flip: c.flip, fresh: mark(v, "prop", c.x, c.z, 2) });
  }
  { const L = findLight(v, time); if (L) lights.push(L); } // (tonight's find, until it's taken: render/view/finds.ts)
  v.propBatch.set(items);
}

/** Shade with only the nearest lights (the light budget), fading out those at the budget's
 *  edge so none pops on or off. */
const NEAR_L: ForestLight[] = [], NEAR_D: number[] = []; // (the nearest lights, kept sorted as they come: no record a light a frame)
export function setLights(v: View, all: ForestLight[], x: number, z: number): void {
  const budget = Math.min(MAX_LIGHTS, v.game.tuning.lightBudget), keep = budget + 1;
  // The nearest keep of them by distance less reach, in the order a stable sort would give (an equal distance after the earlier).
  NEAR_L.length = 0; NEAR_D.length = 0;
  for (let i = 0; i < all.length; i++) {
    const l = all[i], d = Math.hypot(l.x - x, l.z - z) - l.reach, n0 = NEAR_D.length;
    if (n0 >= keep && d >= NEAR_D[n0 - 1]) continue; // (past the last kept: an equal one would come after it)
    let k = n0; while (k > 0 && NEAR_D[k - 1] > d) k--;
    for (let m = Math.min(n0, keep - 1); m > k; m--) { NEAR_L[m] = NEAR_L[m - 1]; NEAR_D[m] = NEAR_D[m - 1]; }
    NEAR_L[k] = l; NEAR_D[k] = d;
  }
  // The light just outside the budget sets the fade: the last ones in fade as it nears them.
  const edge = NEAR_D.length > budget ? NEAR_D[budget] : Infinity, used = Math.min(budget, NEAR_D.length);
  const U = LIGHT_UNIFORMS;
  let n = 0;
  for (let i = 0; i < used; i++) {
    const l = NEAR_L[i], d = NEAR_D[i];
    const fade = Math.min(1, Math.max(0, (edge - d) / 15));
    U.uLightPos.value[n].set(l.x, l.y + groundHeight(l.x, l.z), l.z, l.reach); // its height above the rolling ground
    U.uLightCol.value[n].set(l.rgb.x, l.rgb.y, l.rgb.z, l.strength * fade);
    n++;
  }
  U.uLightCount.value = n;
  v.stats.lights = n;
  const L = v.game.tuning.lights; // (the light's soft knee: render/lighting.ts softKnee; read each frame, so the pause page's sliders show at once)
  U.uLightKnee.value.set(L.knee ?? 0, L.ceiling ?? 0);
}

/** The sigils' neon spilling onto the world (overnight phase 3: tuning sigilSpill): each placed sigil a small light in its
 *  creature's neon over the rune, eased in as it's written and breathing with its pulse, and the bottom of her stack a
 *  fainter one above her hat, so the ground, the grass and whoever stands by them take its colour. */
export function sigilLights(v: View, time: number, hatY: number): ForestLight[] {
  const S = v.game.tuning.sigilSpill, g = v.game, out: ForestLight[] = [];
  if (!S || S.strength <= 0) return out;
  const neon = (species: string): THREE.Vector3 | null => {
    let c = spillRgb.get(species);
    if (!c) { const col = v.leashView.colours.get(species); if (!col) return null; c = new THREE.Vector3(col.r, col.g, col.b); spillRgb.set(species, c); }
    return c;
  };
  for (const p of g.leash.placed) {
    const c = g.creatures[p.id], rgb = c && neon(c.species);
    if (!rgb) continue;
    const pulse = 1.05 + 0.25 * Math.sin(time * 2 + p.id); // (the rune's own pulse: leash.ts; its fade-in on her clock, as its stamp is, never below 0: Bravo's dark-circle diagnosis, 2026-10-12)
    out.push({ x: p.x, y: S.height, z: p.z, reach: S.reach * (1 + c.level * 0.15), rgb, strength: S.strength * writeOn(g.herTime, p.at) * pulse });
  }
  const s = g.leash.stack, w = g.witch;
  if (S.stack > 0 && s.length) {
    const c = g.creatures[s[s.length - 1]], rgb = c && neon(c.species);
    if (rgb) out.push({ x: w.x, y: hatY, z: w.z, reach: S.stackReach, rgb, strength: S.stack });
  }
  return out;
}
const spillRgb = new Map<string, THREE.Vector3>();

/** The party relic bottle a quest relic's kind draws as (art/partyRelics.js): its own if it names one, else the bottle at its
 *  place in legends.json relics.kinds (wine, partyHat, discoBall, gramophone, present, mask: the kinds' names from before the
 *  bottles; the rules seed their order by name, so they stay). */
export function relicBottle(kind: string): string {
  kind = kind.split("~")[0].replace(/Flip$/, ""); // (a mirrored kind draws its own bottle, flipped: relicFlipped; its colour: relicGlass)
  const ids = Art.PARTY_RELIC_IDS as string[];
  if (ids.includes(kind)) return kind;
  const i = LEGENDS.relics.kinds.indexOf(kind);
  return ids[(i >= 0 ? i : 0) % ids.length];
}

/** Whether a relic kind is one of the six mirror images (Ed, 2026-10-11: "flip the current kinds so there are now 12 kinds";
 *  legends.json relics.kinds, `<kind>Flip`): its bottle drawn mirrored. */
export const relicFlipped = (kind: string): boolean => kind.split("~")[0].endsWith("Flip");

/** A relic kind's colour (Ed, 2026-10-11: recoloured bottles, `<kind>~<glass>`; legends.json relics.colours), or undefined: its own. */
export const relicGlass = (kind: string): string | undefined => kind.split("~")[1];

/** Its sprite's id in the relic atlas (render/artBuild.ts): the bottle, in another glass if recoloured. */
export const relicArtId = (kind: string): string => { const g = relicGlass(kind); return `party:${relicBottle(kind)}${g ? "~" + g : ""}`; };

/** The quest relics' bottles lying in the world (render/view/scenery.ts): each lights the ground round it in its liquid's own
 *  colour (art/partyRelics.js partyRelicLight: its reach and height, a slow pulse), as bright as a magic stone, so a found bottle
 *  reads as magic and not scenery. Only those near her. */
export function relicLights(v: View, time: number): ForestLight[] {
  const g = v.game, w = g.witch, out: ForestLight[] = [], S = g.tuning.lights.stone;
  for (const r of relicsOut(g)) {
    if (r.state !== "lying" || Math.abs(r.x - w.x) > 160 || Math.abs(r.z - w.z) > 160) continue;
    const id = relicBottle(r.kind), glass = relicGlass(r.kind), L = (Art.partyRelicLight as (id: string, glass?: string) => { rgb: number[]; radius: number; height: number; pulse: number })(id, glass), key = relicArtId(r.kind);
    let rgb = relicRgb.get(key);
    if (!rgb) relicRgb.set(key, (rgb = new THREE.Vector3(L.rgb[0] / 255, L.rgb[1] / 255, L.rgb[2] / 255)));
    const pulse = 0.85 + 0.15 * Math.sin((time / L.pulse) * Math.PI * 2 + r.id);
    out.push({ x: r.x, y: L.height, z: r.z, reach: L.radius * 1.6, rgb, strength: S.strength * pulse });
  }
  return out;
}
const relicRgb = new Map<string, THREE.Vector3>();

/** A legend that carries a lit lantern (its genome's `lantern` feature: the heron's elder, Ed 2026-10-13): a small warm light
 *  where it stands, awake only (asleep, the lantern's out, as every sleeping legend is unlit), flickering like the party's. */
const LANTERN_RGB = new THREE.Vector3(255 / 255, 186 / 255, 96 / 255);
export function lanternLights(v: View, time: number): ForestLight[] {
  const out: ForestLight[] = [];
  for (const c of v.game.creatures) {
    if (c.level < 3 || c.asleep || c.legendState === "asleep" || c.legendState === "restless") continue;
    if (!(Art.SPECIES_BY_ID[c.species]?.legend ?? []).includes("lantern") || !inView(v, c.x, c.z, 4, 6, 4)) continue;
    const flick = 0.85 + 0.1 * Math.sin(time * 11 + c.x) + 0.05 * Math.sin(time * 23 + c.z);
    out.push({ x: c.x, y: 2.2, z: c.z, reach: 4.5, rgb: LANTERN_RGB.clone(), strength: 1.4 * flick });
  }
  return out;
}
