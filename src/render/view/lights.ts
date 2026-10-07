// The lights (from render/view.ts, issue #122): campfires and magic stones lit each frame, and the
// shader's light budget filled with the nearest.
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

export function updateSources(v: View, time: number): void {
  const f = v.assets.props.frames, items: SpriteInstance[] = [], lights: ForestLight[] = [], g = v.game;
  v.fireSparks = []; v.worldFires = [];
  for (const src of v.sources) {
    if (src.kind === "pond") continue;
    const k = hash2(Math.round(src.x * 10), Math.round(src.z * 10), 7);
    if (src.kind === "campfire") {
      // Campfires are party objects (Ed, 2026-10-04): none in the dormant forest; in a partified
      // area they light up with a whoosh of sparks as the party arrives (late in its transition).
      let key = v.sourceCell.get(src);
      if (key === undefined) v.sourceCell.set(src, (key = cellKey(g.map.cellSafe(src.x, src.z).cell))); // it never moves: ask once
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
      if (inView(v, src.x, src.z, fr.w * v.mpp, fr.h * v.mpp, 4)) items.push({ x: src.x, y: 0, z: src.z, frame: fr, flip: k < 0.5, scale: grow, fresh: mark(v, "prop", src.x, src.z, 2) });
    } else {
      const kind = k < 0.33 ? 1 : k < 0.66 ? 0 : 2, pulse = 0.7 + 0.3 * Math.sin(time * 0.9 + k * 20), fr = f[3 + kind];
      lights.push({ x: src.x, y: 2, z: src.z, reach: v.game.tuning.lights.stone.reach * src.size, rgb: [v.runeCyan, v.runeViolet, v.runeGreen][kind], strength: v.game.tuning.lights.stone.strength * pulse });
      if (inView(v, src.x, src.z, fr.w * v.mpp, fr.h * v.mpp, 4)) items.push({ x: src.x, y: 0, z: src.z, frame: fr, flip: k < 0.5, fresh: mark(v, "prop", src.x, src.z, 2.6) });
    }
  }
  v.propBatch.set(items);
  v.forestLights = lights;
}

/** Shade with only the nearest lights (the light budget), fading out those at the budget's
 *  edge so none pops on or off. */
export function setLights(v: View, all: ForestLight[], x: number, z: number): void {
  const budget = Math.min(MAX_LIGHTS, v.game.tuning.lightBudget);
  const near = all.map(l => ({ l, d: Math.hypot(l.x - x, l.z - z) - l.reach })).sort((a, b) => a.d - b.d).slice(0, budget + 1);
  // The light just outside the budget sets the fade: the last ones in fade as it nears them.
  const edge = near.length > budget ? near[budget].d : Infinity;
  const U = LIGHT_UNIFORMS;
  let n = 0;
  for (const { l, d } of near.slice(0, budget)) {
    const fade = Math.min(1, Math.max(0, (edge - d) / 15));
    U.uLightPos.value[n].set(l.x, l.y + groundHeight(l.x, l.z), l.z, l.reach); // its height above the rolling ground
    U.uLightCol.value[n].set(l.rgb.x, l.rgb.y, l.rgb.z, l.strength * fade);
    n++;
  }
  U.uLightCount.value = n;
  v.stats.lights = n;
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
    const pulse = 1.05 + 0.25 * Math.sin(time * 2 + p.id); // (the rune's own pulse: leash.ts)
    out.push({ x: p.x, y: S.height, z: p.z, reach: S.reach * (1 + c.level * 0.15), rgb, strength: S.strength * Math.min(1, (time - p.at) / 0.8) * pulse });
  }
  const s = g.leash.stack, w = g.witch;
  if (S.stack > 0 && s.length) {
    const c = g.creatures[s[s.length - 1]], rgb = c && neon(c.species);
    if (rgb) out.push({ x: w.x, y: hatY, z: w.z, reach: S.stackReach, rgb, strength: S.stack });
  }
  return out;
}
const spillRgb = new Map<string, THREE.Vector3>();
