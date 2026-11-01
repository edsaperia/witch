import * as THREE from "three";
import { PRESSURE_SECONDS, REFRACTION_LIMIT } from "./refractionMath";

export interface RefractionFire { x: number; z: number; scale: number }
export interface RefractionCast { at: number; x: number; y: number; z: number; baseY?: number }
type Ring = RefractionCast;

/** One fire plus a bounded pressure pool. All positions stay world-anchored, never accumulated screen feedback. */
export class Refraction {
  readonly shapes = Array.from({ length: REFRACTION_LIMIT }, () => new THREE.Vector4());
  readonly states = Array.from({ length: REFRACTION_LIMIT }, () => new THREE.Vector4());
  count = 0;
  private world: object | null = null;
  private time = -Infinity;
  private castAt: number | null = null;
  private rings: Ring[] = [];
  private readonly point = new THREE.Vector3();
  private readonly edge = new THREE.Vector3();
  private readonly right = new THREE.Vector3();

  reset(): void { this.count = 0; this.rings.length = 0; this.castAt = null; this.time = -Infinity; this.world = null; }

  /** Called even when quality/comfort switches it off, so an expired event cannot replay on re-enable.
   * Cast age uses its original simulation timestamp, not the first frame that happened to draw it. */
  update(world: object, time: number, enabled: boolean, fires: readonly RefractionFire[], cast: RefractionCast | null, camera: THREE.PerspectiveCamera | THREE.OrthographicCamera, place: (p: THREE.Vector3) => THREE.Vector3, near: { x: number; z: number }): void {
    if (world !== this.world || time < this.time) this.reset();
    this.world = world; this.time = time; this.count = 0;
    if (cast && cast.at <= time && cast.at !== this.castAt && Number.isFinite(cast.at)) {
      this.castAt = cast.at;
      if (time >= cast.at && time - cast.at < PRESSURE_SECONDS) {
        if (this.rings.length >= REFRACTION_LIMIT - 1) this.rings.shift();
        this.rings.push({ ...cast });
      }
    }
    let live = 0;
    for (const r of this.rings) if (time >= r.at && time - r.at < PRESSURE_SECONDS) this.rings[live++] = r;
    this.rings.length = live;
    if (!enabled) return;
    let distance = 80 * 80;
    for (const f of fires) {
      const d = (f.x - near.x) ** 2 + (f.z - near.z) ** 2;
      if (f.scale > 0.1 && d < distance) {
        const previous = this.count; this.count = 0;
        this.project(f.x, 2.3, f.z, 1.1, 2.2, 0, time % 120, Math.min(1, f.scale) * 1.5, 0, camera, place);
        if (this.count) distance = d; else this.count = previous;
      }
    }
    for (const r of this.rings) this.project(r.x, r.y, r.z, 8, 8, 1, (time - r.at) / PRESSURE_SECONDS, 2, r.baseY ?? 0, camera, place);
  }

  private project(x: number, y: number, z: number, rx: number, ry: number, kind: number, phase: number, strength: number, baseY: number, camera: THREE.PerspectiveCamera | THREE.OrthographicCamera, place: (p: THREE.Vector3) => THREE.Vector3): void {
    if (this.count >= REFRACTION_LIMIT) return;
    const p = place(this.point.set(x, y, z));
    // Behind-camera centres must not reappear reflected onto the screen.
    this.edge.copy(p).applyMatrix4(camera.matrixWorldInverse);
    if (this.edge.z >= -camera.near) return;
    p.project(camera);
    if (p.z < -1 || p.z > 1) return;
    const cx = p.x * 0.5 + 0.5, cy = p.y * 0.5 + 0.5;
    // Camera-facing ellipse widths; its vertical anchor follows the same bent-world placement as scenery.
    const right = this.right.setFromMatrixColumn(camera.matrixWorld, 0).multiplyScalar(rx);
    place(this.edge.set(x, y, z)).add(right).project(camera);
    const width = Math.abs(this.edge.x * 0.5 + 0.5 - cx);
    place(this.edge.set(x, y + ry, z)).project(camera);
    if (this.edge.z < -1 || this.edge.z > 1) return;
    const height = Math.abs(this.edge.y * 0.5 + 0.5 - cy);
    // Protect the emitter's support plane, not the nearer plume tip: rising heat behind a character cannot warp her body.
    place(this.edge.set(x, baseY, z)).project(camera);
    const depth = Math.max(p.z, this.edge.z) * 0.5 + 0.5;
    if (!(width > 0 && height > 0) || cx + width < 0 || cx - width > 1 || cy + height < 0 || cy - height > 1) return;
    this.shapes[this.count].set(cx, cy, width, height);
    this.states[this.count++].set(depth, kind, phase, strength);
  }
}
