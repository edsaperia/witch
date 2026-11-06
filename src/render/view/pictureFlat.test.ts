// A flat picture laid nearer the camera (render/view/home.ts alongRayFlat; render/houseRooms.ts pxWorld, the house's furniture and
// its rooms' dressing): what's drawn inside it stays on its own pixels of the floor as the camera moves. Ed, 2026-11-05 (v7569): "Some
// scenery items in the treehouse move around the floor when you walk around": a room's dressing is one picture, and in Ed's layout its
// pieces lie across the house (tens of metres from its anchor); each corner pushed by the anchor's depth along its own ray bent it, and
// the GPU's interpolation inside it put the pieces a few pixels off the floor, by an amount that changed as she walked.
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as THREE from "three";
import { alongRay, alongRayFlat } from "./home";
import { TUNING } from "../../rules/tuning";
import { fromPlan, HOUSE_ROOMS, installEdLayout } from "../../rules/houseRooms";
import { placedDecorPlan, placedDecorRooms } from "../houseDecor";
import type { View } from "../view";

type P3 = { x: number; y: number; z: number };
const [W, H] = [420, 263]; // (Ed's canvas, zoom step 6)

/** Where on the screen (pixels) the GPU draws the picture's texel `uv`, its corners at `corners` (top-left, top-right, bottom-right,
 *  bottom-left, as render/houseRooms.ts lays them: triangles 0 1 2 and 0 2 3): perspective-correct interpolation, solved for `uv`. */
function drawnAt(camera: THREE.Camera, corners: P3[], uv: [number, number]): [number, number] {
  const UV: [number, number][] = [[0, 0], [1, 0], [1, 1], [0, 1]];
  const clip = corners.map(c => new THREE.Vector4(c.x, c.y, c.z, 1).applyMatrix4(camera.matrixWorldInverse).applyMatrix4(camera.projectionMatrix));
  const scr = clip.map(c => [(c.x / c.w + 1) / 2 * W, (1 - c.y / c.w) / 2 * H]);
  // (in a triangle, uv/w and 1/w are affine in screen space: uv at a screen point s is (Σ λ uv/w) / (Σ λ / w); solve for s)
  for (const t of [[0, 1, 2], [0, 2, 3]]) {
    const [a, b, c] = t, iw = t.map(i => 1 / clip[i].w);
    // Seek barycentric (λa, λb, λc) with Σ λ_i iw_i (uv_i - uv) = 0 and Σ λ = 1.
    const A = t.map((i, k) => [iw[k] * (UV[i][0] - uv[0]), iw[k] * (UV[i][1] - uv[1])]);
    // λ = (la, lb, 1 - la - lb): two equations in la, lb
    const m00 = A[0][0] - A[2][0], m01 = A[1][0] - A[2][0], m10 = A[0][1] - A[2][1], m11 = A[1][1] - A[2][1], det = m00 * m11 - m01 * m10;
    if (Math.abs(det) < 1e-12) continue;
    const la = (-A[2][0] * m11 + A[2][1] * m01) / det, lb = (-m00 * A[2][1] + m10 * A[2][0]) / det, lc = 1 - la - lb;
    if (la < -1e-9 || lb < -1e-9 || lc < -1e-9) continue;
    return [la * scr[a][0] + lb * scr[b][0] + lc * scr[c][0], la * scr[a][1] + lb * scr[b][1] + lc * scr[c][1]];
  }
  throw new Error("texel outside the picture");
}
const onScreen = (camera: THREE.Camera, p: P3): [number, number] => { const q = new THREE.Vector3(p.x, p.y, p.z).project(camera); return [(q.x + 1) / 2 * W, (1 - q.y) / 2 * H]; };

describe("a picture laid nearer the camera (the house's furniture and rooms' dressing)", () => {
  // The house's plane as render/houseRooms.ts has it: the Ent's art upright through the deck's middle, facing the camera (north of it),
  // plan x across in its pixels, plan z down it ky pixels a metre; each picture pushed toward the camera by its anchor's plan z.
  const mpp = 0.1, ky = Math.sin(Math.PI / 4) / mpp, deck = { x: 3700, y: 22, z: 3258 };
  const onPlane = (px: number, py: number): P3 => ({ x: deck.x + px * mpp, y: deck.y - py * mpp, z: deck.z });
  const walk = [-12, -6, -2, 0, 3, 9].flatMap(dx => [-5, 0, 6].map(dz => [deck.x - 15 + dx, deck.z - 15 + dz]));
  const cameraAt = (x: number, z: number) => {
    const c = new THREE.PerspectiveCamera(TUNING.camera.fov, W / H, 1, 900);
    c.position.set(x, deck.y + 72, z + 78); c.lookAt(x, deck.y, z); c.updateMatrixWorld(); c.updateProjectionMatrix();
    return c;
  };
  // Every room's dressing in Ed's layout (the game's: put back as it was after), its picture spanning its pieces (each piece's foot
  // on the floor a texel of it).
  let pictures: { id: string; anchor: P3; d: number; box: number[]; feet: [number, number][] }[] = [], had = false;
  beforeAll(() => { had = !!HOUSE_ROOMS.layout; installEdLayout(true); pictures = placedDecorRooms().map(r => {
    const mid = { x: (r.x0 + r.x1) / 2, z: (r.z0 + r.z1) / 2 }, at = fromPlan({ x: 0, z: 0 }, mid.x, mid.z), items = placedDecorPlan(r);
    const feet = items.map(it => { const p = fromPlan({ x: 0, z: 0 }, mid.x + it.x, mid.z + it.z); return [p.x / mpp, p.z * ky] as [number, number]; });
    const x0 = Math.min(...feet.map(f => f[0])) - 40, x1 = Math.max(...feet.map(f => f[0])) + 40, y0 = Math.min(...feet.map(f => f[1])) - 60, y1 = Math.max(...feet.map(f => f[1])) + 10;
    return { id: r.id, anchor: onPlane(at.x / mpp, at.z * ky), d: at.z, box: [x0, y0, x1, y1], feet };
  }); });
  afterAll(() => installEdLayout(had));

  /** The worst a piece's foot is drawn off its own floor pixel over the walk (pixels), and how far it moves relative to the floor. */
  const drift = (lay: (v: View, p: P3, anchor: P3, d: number) => P3) => {
    let off = 0, slide = 0;
    for (const pic of pictures) {
      const [x0, y0, x1, y1] = pic.box, plane = [onPlane(x0, y0), onPlane(x1, y0), onPlane(x1, y1), onPlane(x0, y1)];
      for (const f of pic.feet) {
        const uv: [number, number] = [(f[0] - x0) / (x1 - x0), (f[1] - y0) / (y1 - y0)], seen: [number, number][] = [];
        for (const [cx, cz] of walk) {
          const camera = cameraAt(cx, cz), v = { camera } as unknown as View;
          const drawn = drawnAt(camera, plane.map(p => lay(v, p, pic.anchor, pic.d)), uv), floor = onScreen(camera, onPlane(f[0], f[1]));
          seen.push([drawn[0] - floor[0], drawn[1] - floor[1]]);
          off = Math.max(off, Math.hypot(drawn[0] - floor[0], drawn[1] - floor[1]));
        }
        for (const s of seen) slide = Math.max(slide, Math.hypot(s[0] - seen[0][0], s[1] - seen[0][1]));
      }
    }
    return { off, slide };
  };

  it("keeps every piece of every room's dressing on its own floor pixel as she walks", () => {
    expect(pictures.length).toBeGreaterThan(3);
    const { off, slide } = drift((v, p, a, d) => alongRayFlat(v, p, a, d));
    expect(off).toBeLessThan(0.05);
    expect(slide).toBeLessThan(0.05);
  });

  it("(each corner pushed along its own ray, as v7569 did, slides them pixels over the floor: what this test is here to catch)", () => {
    const { slide } = drift((v, p, _a, d) => alongRay(v, p, d));
    expect(slide).toBeGreaterThan(1);
  });

  it("lands each point on its own pixel, the anchor exactly as far nearer as asked", () => {
    const camera = cameraAt(deck.x, deck.z), v = { camera } as unknown as View, a = onPlane(30, 50);
    for (const d of [-8, 0, 7.5, 20]) {
      const q = alongRayFlat(v, a, a, d), c = camera.position;
      expect(Math.hypot(q.x - c.x, q.y - c.y, q.z - c.z)).toBeCloseTo(Math.hypot(a.x - c.x, a.y - c.y, a.z - c.z) - d, 6);
      for (const p of [onPlane(-400, 0), onPlane(600, 900), a]) {
        const s = onScreen(camera, alongRayFlat(v, p, a, d)), t = onScreen(camera, p);
        expect(Math.hypot(s[0] - t[0], s[1] - t[1])).toBeLessThan(1e-6);
      }
    }
  });
});
