// Other player witches remain visible to a sober observer; the blackout belongs only to its participant.
import type { View } from './view';
import { SpriteBatch, SPRITE_UNIFORMS } from './sprites';
import { groundOf } from './atlas';
import { groundHeight } from './height';
import { deckOf } from '../rules/treehouse';
import { potionFall } from './potionChoreography';
import { alongRay } from './view/home';

export class PotionObserversView {
  private readonly batches = new Map<number, SpriteBatch>();
  dispose(v: View): void {
    for (const batch of this.batches.values()) { v.scene.remove(...batch.meshes); batch.release(); }
    this.batches.clear();
  }
  update(v: View, onTreehouse: (x: number, y: number) => { x: number; y: number; z: number }): void {
    const g = v.game, time = g.herTime, d = deckOf(g.map, g.tuning), T = v.assets.treehouse;
    for (const batch of this.batches.values()) batch.set([]);
    for (const W of g.witches.slice(1)) {
      const exposure = g.mushrooms?.affected[W.id];
      if (!exposure && !W.body.stargazing) continue;
      const art = v.assets.partyWitchArt(W.id % 12);
      if (!art) continue;
      let batch = this.batches.get(W.id);
      if (batch?.atlas !== art.atlas) {
        if (batch) { v.scene.remove(...batch.meshes); batch.release(); }
        batch = new SpriteBatch(art.atlas, v.mpp, { solid: true, absolute: true });
        this.batches.set(W.id, batch); v.scene.add(...batch.meshes);
      }
      const spin = !!exposure && time < exposure.fallAt, fall = exposure ? potionFall(exposure, time) : 1;
      const pose = spin ? 'spin' : exposure && time < exposure.landAt ? 'sit' : 'stargaze';
      const frames = art.poses[pose] ?? art.poses.stand, fi = frames[Math.floor(time * (art.fps[pose] ?? 4)) % frames.length], frame = art.atlas.frames[fi];
      const start = exposure?.from ?? W.body, end = exposure?.to ?? W.body;
      let a = { x: start.x, y: groundHeight(start.x, start.z) + (d?.h ?? 0), z: start.z };
      const inHouse = !!g.witch.perch && !!T.ent && !!d && spin;
      if (g.witch.perch && T.ent && d && exposure) {
        const ky = (T.seat.y - T.ent.deck.y) / Math.max(.1, d.seat.z - d.z);
        const p = onTreehouse(T.ent.deck.x + (start.x - d.x) / v.mpp, T.ent.deck.y + (start.z - d.z) * ky + v.houseShift);
        a = alongRay(v, { x: p.x, y: p.y + groundHeight(d.x, d.z), z: p.z }, 0);
      }
      const x = a.x + (end.x - a.x) * fall, z = a.z + (end.z - a.z) * fall;
      const y = a.y + (groundHeight(end.x, end.z) - a.y) * fall;
      const anchor = groundOf(art.anchors[fi]), sink = anchor ? (frame.h - anchor.y) * v.mpp : 0, U = SPRITE_UNIFORMS.uUp.value;
      for (const mesh of batch!.meshes) { mesh.renderOrder = inHouse ? 19.95 : 10; (mesh.material as { depthTest: boolean }).depthTest = !inHouse; }
      batch!.set([{ x: x - U.x * sink, y: y - U.y * sink, z: z - U.z * sink, frame, flip: spin ? Math.sin(time * 12) < 0 : W.body.facing < 0 }]);
    }
  }
}
