// MOCKUP (not for merging): the ground sigils' busy scene for the glow mock (?sigilGlow=, render/leash/inkMock.ts), the same in
// every mode: seed 123, about 110 m south of the treehouse; five parked creatures on their placed sigils near and far, five happy
// ones with their runes, three sigils in her stack (its ghost at her feet) and a dropped relic flask. tools/sigils/glow-shots.cjs
// sets it up through window.witch.sigilScene() and then steps the game at a fixed 1/60 s.
import type { Game } from "../rules/game";
import type { Creature } from "../rules/creatures";
import { inviteCreature } from "../rules/leash";

export function setupSigilScene(g: Game): { x: number; z: number } {
  const T = g.map.treehouse, x = T.x, z = T.z + 110, now = g.clock.time, W = g.witches[0];
  g.witch = { ...g.witch, x, z, vx: 0, vz: 0, mode: "ground", lift: 0, seated: false, perch: undefined };
  const used = new Set<number>(), seen = new Set<string>();
  const pick = (): Creature => {
    const c = g.creatures.find(k => !k.gone && !k.leashed && !k.boss && !k.circle && !k.enraged && k.level > 0 && k.level < 3 && !used.has(k.id) && !seen.has(k.species))
      ?? g.creatures.find(k => !k.gone && !k.leashed && !k.boss && !k.circle && !k.enraged && k.level < 3 && !used.has(k.id))!;
    used.add(c.id); seen.add(c.species);
    return c;
  };
  const put = (c: Creature, px: number, pz: number) => {
    Object.assign(c, { x: px, z: pz, tx: px, tz: pz, anchorX: px, anchorZ: pz, homeX: px, homeZ: pz, rest: 99, fight: undefined, wanderTo: undefined, hunting: undefined });
    c.cell = g.map.cellSafe(px, pz).cell as [number, number];
  };
  // parked on their sigils: near and far
  for (const [dx, dz] of [[-7, 3], [8, -5], [-16, -14], [20, -30], [-30, -48]]) {
    const c = pick(), sx = x + dx, sz = z + dz;
    put(c, sx, sz - 2);
    inviteCreature(W.leash, c, sx, sz, now);
    W.leash.stack = W.leash.stack.filter(k => k !== c.id);
    W.leash.placed.push({ id: c.id, x: sx, z: sz, at: now - 5 });
  }
  // happy, their runes at their feet
  for (const [dx, dz] of [[4, 6], [-3, -9], [14, 4], [-22, -2], [9, -20]]) {
    const c = pick();
    put(c, x + dx, z + dz);
    Object.assign(c, { state: "happy", happyAt: now - 5, affection: undefined, dancing: false });
  }
  // her stack of three (its bottom one's ghost at her feet)
  for (let i = 0; i < 3; i++) { const c = pick(); put(c, x - 2 - i, z + 2); inviteCreature(W.leash, c, c.x, c.z, now); }
  // a relic's flask she put down
  const r = g.relics.find(q => q.state === "lying");
  if (r) Object.assign(r, { state: "dropped", sx: x + 3, sz: z - 3 });
  g.byArea = null;
  return { x, z };
}
