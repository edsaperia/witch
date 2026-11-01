import type { View } from "../../render/view";
import type { Game } from "../../rules/game";
import { deckOf, onTerrace } from "../../rules/treehouse";
import { onRoomFloor } from "../../rules/houseRooms";
import { groundHeight } from "../../render/height";
import { alongRay } from "../../render/view/home";
import { witchHeight } from "../../rules/witch";
import { SPRITE_UNIFORMS } from "../../render/sprites";
import type { WitchLookLease } from "../../render/witchLookLease";
import { remoteRoomPass, remoteWitchFrame } from "../../render/remoteWitch";
import { hatMarkers } from "../../rules/hat";
import { hatFlight } from "../../render/hatFlight";
import { remoteEquipment } from "../../render/remoteEquipment";

const mounted = new WeakMap<View, () => void>();

/** First prototype: uses the existing witch atlas, with no new generated art. */
export function otherWitches(view: View, source: Game, player: number, looks?: ReadonlyMap<number, WitchLookLease>, profiles?: ReadonlyMap<number, Record<string, unknown>>) {
  mounted.get(view)?.();
  const batch = view.makeWitchBatch();
  let released = false;
  const phases = new Map<number, { time: number; walk: number; foot: boolean }>();
  let hats: ReturnType<View["makeWitchBatch"]> | null = null;
  let gear: ReturnType<typeof remoteEquipment> | null = null;
  const draw = (time: number, onTreehouse: (x: number, y: number) => { x: number; y: number; z: number }) => {
    gear?.hide(); hats?.set([]);
    const remote = source.witches.find(w => w.id !== player), look = remote ? looks?.get(remote.id) : undefined;
    if (looks && !look) { batch.set([]); return; } // Ordinary callers must supply approved art, never clone the local witch.
    const atlas = look?.atlas ?? view.assets.witch;
    if (batch.atlas !== atlas) batch.setAtlas(atlas);
    const deck = deckOf(source.map, source.tuning), tree = view.assets.treehouse;
    batch.set(source.witches.filter(w => w.id !== player).flatMap(W => {
      const b = W.body, ht = W.time ?? source.herTime, foot = !!b.perch && b.mode === "ground", side = b.away ? "away" : "towards";
      const pose = foot ? look?.idle.idle ?? view.assets.witchFoot.idle : look?.flight.hover;
      const frames = pose?.[side];
      let index = frames ? frames[Math.floor(ht * pose!.fps) % frames.length] : (b.away ? 3 : 0) + Math.floor(ht * 4) % 3;
      if (look) { let phase = phases.get(W.id); if (!phase) { phase = { time: ht, walk: 0, foot }; phases.set(W.id, phase); } const selected = remoteWitchFrame(source, W, look.art, phase); if (selected.hidden) return []; index = selected.index; }
      let x = b.x, z = b.z, y = witchHeight(b, source.tuning), scale = 1;
      if (b.perch && deck && tree.ent) {
        const dz = b.z - deck.z, ky = (tree.seat.y - tree.ent.deck.y) / Math.max(0.1, deck.seat.z - deck.z);
        const p = onTreehouse(tree.ent.deck.x + (b.x - deck.x) / view.mpp, tree.ent.deck.y + dz * ky + view.houseShift);
        const inRoom = remoteRoomPass(source, W);
        const q = alongRay(view, { x: p.x, y: p.y + groundHeight(deck.x, deck.z), z: p.z }, inRoom ? 0 : dz);
        x = q.x; y = q.y; z = q.z; scale = q.scale;
      } else y += groundHeight(x, z);
      if (profiles?.has(W.id)) { gear ??= remoteEquipment(view); gear.update(W, profiles.get(W.id), { x, y, z, scale }, !W.ko && (!b.perch || !!deck && onTerrace(deck, b.x, b.z)), error => console.error("[remote broom]", error)); }
      return batch.atlas.frames[index] ? [{ x, y, z, frame: batch.atlas.frames[index], flip: b.facing < 0, scale }] : [];
    }));
    // Each witch owns her room/depth pass; a local bedroom must not pull a distant friend over the forest.
    const remoteRoom = remoteRoomPass(source, remote);
    batch.mesh.renderOrder = remoteRoom ? 19.95 : 10;
    const material = batch.mesh.material as { depthTest: boolean; transparent: boolean; needsUpdate: boolean };
    material.depthTest = !remoteRoom;
    if (material.transparent !== remoteRoom) { material.transparent = remoteRoom; material.needsUpdate = true; }
    const W = remote, approved = W && profiles?.get(W.id), markers = W ? hatMarkers(W.hat) : [];
    if (W && approved && markers.length) {
      const atlas = view.assets.hatArt(approved), frame = atlas?.frames[0];
      if (atlas && frame) {
        hats ??= view.makeWitchBatch(); if (hats.atlas !== atlas) hats.setAtlas(atlas);
        hats.set(markers.map(marker => {
          const ko = W.ko, ht = W.time ?? source.herTime, current = W.hat.down?.at === marker.at;
          const k = current && ko && ko.floatUntil > ko.at ? Math.max(0, Math.min(1, (ht - ko.at) / (ko.floatUntil - ko.at))) : 1;
          const h = hatFlight(marker.x, marker.z, k, 2.5, .2); let { x, z } = h, y = h.y + groundHeight(x, z);
          if (deck?.house?.rooms && onRoomFloor(deck.house.rooms, x, z) && tree.ent) { const p = onTreehouse(tree.ent.deck.x + (x - deck.x) / view.mpp, tree.ent.deck.y + (z - deck.z) * (tree.seat.y - tree.ent.deck.y) / Math.max(.1, deck.seat.z - deck.z) + view.houseShift); const q = alongRay(view, { x: p.x, y: p.y + groundHeight(deck.x, deck.z), z: p.z }, 0); x = q.x; y += q.y; z = q.z; }
          return { x, y, z, frame, flip: h.flip };
        }));
      }
    } else hats?.set([]);
    void time;
  };
  // Online-only adapter: decorate this instance's player-batch update, after its camera is placed.
  // The ordinary View module and its output bytes remain unchanged.
  const originalSet = view.witchBatch.set, setPlayer = originalSet.bind(view.witchBatch);
  const update: typeof view.witchBatch.set = items => {
    setPlayer(items);
    if (released) return;
    const T = view.assets.treehouse, f = T.atlas.frames[0], d = deckOf(source.map, source.tuning);
    const right = SPRITE_UNIFORMS.uRight.value, up = SPRITE_UNIFORMS.uUp.value;
    const ox = T.ent ? (T.ent.deck.x - f.w / 2) * view.mpp : 0;
    const oy = T.ent ? (f.h - T.ent.deck.y) * view.mpp : 0;
    const at = { x: (d?.x ?? source.map.treehouse.x) - right.x * ox - up.x * oy, y: (d?.h ?? 0) - right.y * ox - up.y * oy, z: (d?.z ?? source.map.treehouse.z) - right.z * ox - up.z * oy };
    draw(source.clock.time, (px, py) => {
      const dx = (px - f.w / 2) * view.mpp, dy = (f.h - py) * view.mpp;
      return { x: at.x + right.x * dx + up.x * dy, y: at.y + right.y * dx + up.y * dy, z: at.z + right.z * dx + up.z * dy };
    });
  };
  view.witchBatch.set = update;
  const release = () => {
    if (released) return; released = true;
    if (view.witchBatch.set === update) view.witchBatch.set = originalSet;
    view.scene.remove(...batch.meshes); batch.release(); // Atlas lease belongs to caller; never dispose shared/local textures here.
    if (hats) { view.scene.remove(...hats.meshes); hats.release(); hats = null; }
    gear?.release(); gear = null;
    if (mounted.get(view) === release) mounted.delete(view);
  };
  mounted.set(view, release);
  return release;
}
