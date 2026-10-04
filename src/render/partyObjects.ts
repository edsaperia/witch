// Drawing the party objects (rules/partyDressing.ts; art/party.js, #38) in every partified area
// near the witch: the clusters as laid out, the loose pieces, the set dressing, and an escaped
// balloon caught up in a tree. They appear as the party arrives (late in the area's transition,
// each popping up in turn), balloons bob in the breeze (the art's bob hints), campfires flicker
// through their frames, and campfires and lanterns light their surroundings (a few an area).
// Decals (confetti, streamers, glitter) lie flat under everything.
import * as THREE from "three";
import type { Game } from "../rules/game";
import { dressingOf, isLit, lightOf, partyDef, type Dressing } from "../rules/partyDressing";
import { hash2 } from "../rules/random";
import type { AssetLibrary } from "./assets";
import type { ForestLight } from "./view";
import { SPRITE_UNIFORMS, SpriteBatch, type SpriteInstance } from "./sprites";

export class PartyObjectsView {
  private upright: SpriteBatch | null = null;
  private flat: SpriteBatch | null = null;
  private dressings = new Map<string, Dressing>();
  /** Instances drawn this frame (for the debug overlay). */
  count = 0;

  constructor(private scene: THREE.Scene, private assets: AssetLibrary, private mpp: number) {}

  update(g: Game, time: number, camera: THREE.Camera, visible: (x: number, z: number, w: number, h: number) => boolean): ForestLight[] {
    const lights: ForestLight[] = [], t = g.tuning;
    this.count = 0;
    if (!t.partyObjects.on) { this.upright?.set([]); this.flat?.set([]); return lights; }
    const art = this.assets.partyObjectArt();
    if (!art) return lights;
    if (!this.upright) {
      this.upright = new SpriteBatch(art.atlas, this.mpp, { scenery: true, fade: true });
      this.flat = new SpriteBatch(art.atlas, this.mpp, { scenery: true, flat: true });
      for (const m of this.flat.meshes) { m.renderOrder = -0.5; (m.material as THREE.Material).depthWrite = false; } // right after the ground, under everything standing
      this.scene.add(...this.upright.meshes, ...this.flat.meshes);
    }
    const mpp = this.mpp, U = SPRITE_UNIFORMS.uUp.value, R = SPRITE_UNIFORMS.uRight.value, w = g.witch;
    const fwd = camera.getWorldDirection(new THREE.Vector3()), up = new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion), rise = U.dot(up) / Math.max(0.2, -fwd.y);
    const upright: SpriteInstance[] = [], flat: SpriteInstance[] = [], reach = t.haze.far + g.map.areaSize;
    for (const [key, area] of g.party.areas) {
      if (!area.soundsystem) continue; // home has the dancefloor
      const site = g.map.siteOf(area.cell[0], area.cell[1]);
      if (Math.abs(site.x - w.x) > reach || Math.abs(site.z - w.z) > reach) continue;
      let d = this.dressings.get(key);
      if (!d) this.dressings.set(key, (d = dressingOf(g.map, area.cell, t)));
      const from = area.at + t.party.transition * 0.7;
      if (time < from) continue;
      let lit = d.lights.length;
      const put = (ref: string, gx: number, gz: number, flip: boolean, i: number, hang = 0) => {
        const a = art.pieces[ref], def = partyDef(ref);
        if (!a || !def) return;
        // Each pops up in turn as the party arrives.
        const since = time - from - hash2(i, Math.round(gx * 3), 77) * 2.5;
        if (since < 0) return;
        const grow = Math.min(1, since / 0.35), k = grow * grow * (3 - 2 * grow) * (1 + 0.25 * Math.sin(Math.min(1, since / 0.5) * Math.PI));
        const fi = a.frames[a.frames.length > 1 ? Math.floor(time * 8 + i) % a.frames.length : 0], frame = art.atlas.frames[fi];
        const pad = a.decal ? 0 : frame.pad ?? 0, dx = (a.originX - frame.w / 2) * mpp * (flip ? -1 : 1), toward = Math.max(0, frame.h - pad - a.originY) * mpp * rise;
        const bob = def.bob ? def.bob.amplitude * Math.sin(((time / def.bob.period) + def.bob.phase + i * 0.17) * Math.PI * 2) : 0;
        const x = gx - R.x * dx, z = gz - R.z * dx + toward;
        if (!visible(x, z, frame.w * mpp, frame.h * mpp + hang)) return;
        const d0 = pad * mpp, inst: SpriteInstance = a.decal ? { x, y: 0, z, frame, flip, scale: k } : { x: x - U.x * d0, y: -U.y * d0 + hang + bob, z: z - U.z * d0, frame, flip, scale: k, sway: def.bob ? 1 : 0 };
        (a.decal ? flat : upright).push(inst);
        this.count++;
      };
      d.clusters.forEach((c, ci) => {
        const lay = art.layouts[c.id];
        if (!lay) return;
        (c.mirror ? lay.mirror : lay.plain).forEach((p, pi) => {
          put(p.ref, c.x + p.dx, c.z + p.dz, p.left, ci * 16 + pi);
          // The clusters' campfires and lanterns light up too, while the area has lights to spare.
          if (lit < t.partyObjects.lightsPerArea && isLit(p.ref)) { lit++; const L = lightOf(p.ref, t)!; lights.push(light(c.x + p.dx, c.z + p.dz, L, time, since(time, from))); }
        });
      });
      d.loose.forEach((p, i) => put(p.ref, p.x, p.z, p.flip, 200 + i));
      for (const p of d.lights) lights.push(light(p.x, p.z, lightOf(p.ref, t)!, time, since(time, from)));
      if (d.caught) {
        // Caught up in the nearest tree's crown, hanging from its tie.
        const tree = g.forest.treesNear(d.caught.x, d.caught.z, 10).sort((a, b) => Math.hypot(a.x - d!.caught!.x, a.z - d!.caught!.z) - Math.hypot(b.x - d!.caught!.x, b.z - d!.caught!.z))[0];
        if (tree) put(d.caught.ref, tree.x + 0.6, tree.z + 0.4, d.caught.flip, 400, 3.5 + hash2(Math.round(tree.x), Math.round(tree.z), 5) * 2);
      }
    }
    this.upright.set(upright);
    this.flat!.set(flat);
    return lights;
  }
}

const since = (time: number, from: number) => time - from;

/** A real light: campfires flicker; everything fades up as it appears. */
function light(x: number, z: number, L: { rgb: number[]; radius: number; height: number }, time: number, age: number): ForestLight {
  const flick = 0.85 + 0.1 * Math.sin(time * 11 + x) + 0.05 * Math.sin(time * 23 + z);
  return { x, y: L.height + 0.4, z, reach: L.radius, rgb: new THREE.Vector3(L.rgb[0] / 255, L.rgb[1] / 255, L.rgb[2] / 255), strength: 1.6 * flick * Math.min(1, Math.max(0, age) / 1.5) };
}
