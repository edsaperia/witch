// The crown's clearings (render/crownMask.ts), drawn by the art workers ahead of need, not on the page as she steps into a room.
import { describe, expect, it } from "vitest";
import { clearMask, HOUSE_OUTLINE, maskKeys, MASK } from "./crownMask";

const BOX = [-80, -90, 1 / 180, 1 / 180]; // (a dome round the whole house: its corner, 1 / its width and depth)
const at = (m: Uint8Array, x: number, z: number) => m[Math.floor((z - BOX[1]) * BOX[3] * MASK) * MASK + Math.floor((x - BOX[0]) * BOX[2] * MASK)];

describe("the crown's clearing over each floor", () => {
  it("has a field for every unlocked room and every branch, and none for a locked room", () => {
    const keys = maskKeys();
    for (const r of HOUSE_OUTLINE.rooms) expect(keys.includes(`room:${r.id}`), r.id).toBe(!r.locked);
    for (const b of HOUSE_OUTLINE.branches) expect(keys).toContain(`branch:${b.id}`);
    expect(clearMask("room:nowhere", BOX)).toBeNull();
  });
  it("is clear on its room's own floor and closed far from it", () => {
    for (const r of HOUSE_OUTLINE.rooms.filter(q => !q.locked)) {
      const m = clearMask(`room:${r.id}`, BOX)!;
      expect(m.length).toBe(MASK * MASK);
      expect(at(m, r.x, r.z), r.id).toBe(0);
      const far = HOUSE_OUTLINE.rooms.filter(q => Math.hypot(q.x - r.x, q.z - r.z) > r.r + q.r + 20)[0];
      if (far) expect(at(m, far.x, far.z), `${r.id} at ${far.id}`).toBe(255);
    }
  });
});
