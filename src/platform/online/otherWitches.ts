import type { View } from "../../render/view";
import type { Game } from "../../rules/game";
import { deckOf, onTerrace } from "../../rules/treehouse";
import { onRoomFloor } from "../../rules/houseRooms";
import { groundHeight } from "../../render/height";
import { alongRay } from "../../render/view/home";
import { witchHeight } from "../../rules/witch";

/** First prototype: uses the existing witch atlas, with no new generated art. */
export function otherWitches(view: View, source: Game, player: number) {
  const batch = view.makeWitchBatch();
  return (time: number, onTreehouse: (x: number, y: number) => { x: number; y: number; z: number }) => {
    if (batch.atlas !== view.assets.witch) batch.setAtlas(view.assets.witch);
    const deck = deckOf(source.map, source.tuning), tree = view.assets.treehouse;
    batch.set(source.witches.filter(w => w.id !== player).map(W => {
      const b = W.body, ht = W.time ?? source.herTime, foot = !!b.perch && b.mode === "ground", side = b.away ? "away" : "towards";
      const frames = foot ? view.assets.witchFoot.idle[side] : null;
      const index = frames ? frames[Math.floor(ht * view.assets.witchFoot.idle.fps) % frames.length] : (b.away ? 3 : 0) + Math.floor(ht * 4) % 3;
      let x = b.x, z = b.z, y = witchHeight(b, source.tuning), scale = 1;
      if (b.perch && deck && tree.ent) {
        const dz = b.z - deck.z, ky = (tree.seat.y - tree.ent.deck.y) / Math.max(0.1, deck.seat.z - deck.z);
        const p = onTreehouse(tree.ent.deck.x + (b.x - deck.x) / view.mpp, tree.ent.deck.y + dz * ky + view.houseShift);
        const inRoom = !!deck.house?.rooms && !onTerrace(deck, b.x, b.z) && onRoomFloor(deck.house.rooms, b.x, b.z);
        const q = alongRay(view, { x: p.x, y: p.y + groundHeight(deck.x, deck.z), z: p.z }, inRoom ? 0 : dz);
        x = q.x; y = q.y; z = q.z; scale = q.scale;
      } else y += groundHeight(x, z);
      return { x, y, z, frame: batch.atlas.frames[index], flip: b.facing < 0, scale };
    }));
    // Share the player's room pass so both witches can be seen together in the prototype bedroom.
    batch.mesh.renderOrder = view.witchBatch.mesh.renderOrder;
    const material = batch.mesh.material as { depthTest: boolean; transparent: boolean; needsUpdate: boolean };
    const original = view.witchBatch.mesh.material as { depthTest: boolean; transparent: boolean };
    material.depthTest = original.depthTest;
    if (material.transparent !== original.transparent) { material.transparent = original.transparent; material.needsUpdate = true; }
    void time;
  };
}
