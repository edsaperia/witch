// The pop check (from render/view.ts, issue #122): what is drawn each frame, by kind and place, so
// anything appearing or vanishing in clear view is caught; and ?debug=cull's red frames where it vanished.
import * as THREE from "three";
import { SPRITE_UNIFORMS } from "../sprites";
import { bendPoint, groundHeight } from "../height";
import type { View } from "../view";
import { inInnerView } from "./culling";

/** Note that an object is drawn this frame; returns whether it has just appeared. */
export function mark(v: View, kind: string, x: number, z: number, h: number, id: number = 0): boolean {
  if (!v.trackPops && !v.debugCull) return false; // only the smoke check and ?debug=cull look
  // Placed things are known by where they stand; moving ones (creatures) by their id. Keys are
  // numbers (a hash of kind and place, 52 bits), not strings: a rebuild marks thousands.
  const tr = kind === "creature" || kind === "prop" ? v.tracks.moving : v.tracks.placed;
  let ki = v.kindIds.get(kind);
  if (ki === undefined) { ki = v.kindNames.length; v.kindIds.set(kind, ki); v.kindNames.push(kind); }
  let k: number;
  if (kind === "creature") k = ki * 2 ** 40 + id;
  else {
    const xi = Math.round(x * 10), zi = Math.round(z * 10), hi = Math.round(h * 10);
    const a = Math.imul(xi, 0x9e3779b1) ^ Math.imul(zi, 0x85ebca77) ^ Math.imul(hi, 0xc2b2ae3d) ^ Math.imul(ki + 1, 0x27d4eb2f);
    const b = Math.imul(xi ^ 0x5bd1e995, 0x165667b1) ^ Math.imul(zi + 0x3c6ef372, 0xd3a2646c) ^ Math.imul(hi, 0xfd7046c5) ^ Math.imul(ki + 7, 0xb55a4f09);
    k = (a >>> 6) * 67108864 + (b >>> 6);
  }
  if (!tr.now.has(k)) { tr.now.set(k, tr.nowAt.length); tr.nowAt.push(x, z, h, ki); }
  return !tr.before.has(k);
}

/** Compare what was drawn with last time: anything appearing or vanishing in clear view is a pop. */
export function checkPops(v: View, which: "placed" | "moving", record = true): void {
  const tr = v.tracks[which], live = record && v.assets.pending === 0 && tr.before.size > 0;
  if (v.debugCull) for (const [k, i] of tr.before) if (!tr.now.has(k)) {
    const A = tr.beforeAt;
    v.ghosts.push({ x: A[i], z: A[i + 1], h: Math.max(1, A[i + 2]), until: v.now + 1 });
  }
  if (live) {
    const at = (A: number[], i: number, what: string) => {
      const x = A[i], z = A[i + 1], h = A[i + 2], kind = v.kindNames[A[i + 3]];
      // Scenery in or past the budget's fade has faded out: its coming and going isn't seen.
      const w = v.game.witch, faded = which === "placed" && Math.hypot(x - w.x, z - w.z) > v.budget.radius - v.game.tuning.scenery.fade;
      if (!faded && inInnerView(v, x, z, h)) v.pops.push(`${what} ${kind} ${x.toFixed(0)},${z.toFixed(0)}`);
    };
    // (Scenery appearing while a just-drawn set fades in is that fade, not a pop.)
    if (which !== "placed" || !v.appearing.size) for (const [k, i] of tr.now) if (!tr.before.has(k)) at(tr.nowAt, i, "appeared");
    for (const [k, i] of tr.before) if (!tr.now.has(k)) at(tr.beforeAt, i, "vanished");
  }
  // Swap, reusing last time's map and list for next time.
  const oldMap = tr.before, oldAt = tr.beforeAt;
  tr.before = tr.now; tr.beforeAt = tr.nowAt;
  oldMap.clear(); oldAt.length = 0;
  tr.now = oldMap; tr.nowAt = oldAt;
}

/** ?debug=cull: a red frame, for a second, where something drawn before is no longer drawn. */
export function drawGhosts(v: View, time: number): void {
  v.now = time;
  v.ghosts = v.ghosts.filter(g => g.until > time);
  if (!v.ghostLines) {
    v.ghostLines = new THREE.LineSegments(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: 0xff2020, depthTest: false }));
    v.ghostLines.frustumCulled = false;
    v.ghostLines.renderOrder = 20;
    v.scene.add(v.ghostLines);
  }
  const R = SPRITE_UNIFORMS.uRight.value, U = SPRITE_UNIFORMS.uUp.value, pts: number[] = [];
  for (const g of v.ghosts) {
    const w = g.h * 0.4, gh = groundHeight(g.x, g.z), c = (sx: number, sy: number) => { const p = bendPoint({ x: g.x + R.x * sx * w + U.x * sy * g.h, y: gh + R.y * sx * w + U.y * sy * g.h, z: g.z + R.z * sx * w + U.z * sy * g.h }); return [p.x, p.y, p.z]; };
    const a = c(-1, 0), b = c(1, 0), d = c(1, 1), e = c(-1, 1);
    pts.push(...a, ...b, ...b, ...d, ...d, ...e, ...e, ...a, ...a, ...d);
  }
  const geo = v.ghostLines.geometry;
  geo.dispose(); // its buffer is replaced every frame
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
  geo.setDrawRange(0, pts.length / 3);
  v.ghostLines.visible = pts.length > 0;
}
