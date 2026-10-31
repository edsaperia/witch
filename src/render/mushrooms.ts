import * as THREE from 'three';
import { packAtlas } from './atlas';
import { SpriteBatch, type SpriteInstance } from './sprites';
import { mushroomArt } from './mushroomArt';
import type { View } from './view';
import { MushroomGlow, type MushroomHalo } from './mushroomGlow';

function puffArt() {
  const A = document.createElement('canvas'), N = document.createElement('canvas'); A.width = N.width = 9; A.height = N.height = 9;
  const a = A.getContext('2d')!, n = N.getContext('2d')!;
  for (let y = 0; y < 9; y++) for (let x = 0; x < 9; x++) {
    const d = Math.hypot(x - 4, y - 4);
    if (d > 4 || ((x + y) % 3 === 0 && d > 2.5)) continue;
    a.fillStyle = d < 2.5 ? '#e5d9c2' : '#a4968e'; a.fillRect(x, y, 1, 1);
    n.fillStyle = '#8080ff'; n.fillRect(x, y, 1, 1);
  }
  return { A, N, w: 9, h: 9 };
}

/** One seeded sprite per patch, sharing the game's normal maps, terrain bend and emissive bloom. */
export class MushroomView {
  private batch: SpriteBatch | null = null;
  private key = '';
  private readonly halo = new MushroomGlow();
  update(v: View): void {
    const state = v.game.mushrooms;
    if (!state) return;
    if (!this.halo.mesh.parent) v.scene.add(this.halo.mesh);
    const key = `${v.mpp}:${v.assets.style.pixel}:` + state.patches.map(p => `${p.id}/${p.type}/${p.seed}`).join(',');
    if (key !== this.key) {
      if (this.batch) { v.scene.remove(...this.batch.meshes); this.batch.dispose(); }
      this.key = key;
      const images = state.patches.map(p => mushroomArt(v.assets.style, p.type, p.seed));
      images.push(puffArt());
      this.batch = new SpriteBatch(packAtlas(images, 1024), v.mpp, { solid: true, glowGain: { value: 2.4 } }).name('mushrooms');
      v.scene.add(...this.batch.meshes);
    }
    const b = this.batch!, items: SpriteInstance[] = [], halos: MushroomHalo[] = [], w = v.game.witch;
    for (const [index, p] of state.patches.entries()) if (!p.picked && Math.hypot(p.x - w.x, p.z - w.z) < 150) {
      const frame = b.atlas.frames[index];
      if (frame) {
        items.push({ x: p.x, z: p.z, y: 0, frame, flip: false, glow: .5 });
        halos.push({ x: p.x, z: p.z, h: frame.h * v.mpp * .65, radius: Math.max(2, frame.h * v.mpp * 1.05), type: p.type });
      }
    }
    // A cloud of pale spore puffs expands and shrinks away at the pickup point.
    for (const p of state.puffs) {
      const age = v.game.herTime - p.at;
      if (age < 0 || age > .65) continue;
      const frame = b.atlas.frames[state.patches.length];
      for (let k = 0; k < 7; k++) {
        const a = k * Math.PI * 2 / 7;
        items.push({ x: p.x + Math.cos(a) * age * 2, z: p.z + Math.sin(a) * age * 2, y: .3 + age * 1.5,
          frame, flip: false, scale: .65 * (1 - age / .65), glow: .25 });
      }
    }
    b.set(items);
    this.halo.set(halos);
  }
  dispose(scene: THREE.Scene): void {
    if (this.batch) { scene.remove(...this.batch.meshes); this.batch.dispose(); this.batch = null; }
    this.key = '';
    scene.remove(this.halo.mesh); this.halo.dispose();
  }
}
