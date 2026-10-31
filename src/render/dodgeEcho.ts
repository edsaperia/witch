import * as THREE from "three";
import type { Atlas } from "./atlas";
import { SpriteBatch, type SpriteInstance } from "./sprites";
import { DodgeEchoHistory, ECHO_LIMIT, type EchoDash, type EchoPose } from "./dodgeEchoModel";

export interface DodgePose {
  sprite: SpriteInstance;
  lean: [number, number, number, number];
  sink: number;
}
const copyPose = (p: DodgePose): DodgePose => ({
  sprite: { ...p.sprite, frame: { ...p.sprite.frame, uv: [...p.sprite.frame.uv], ...(p.sprite.frame.head ? { head: [...p.sprite.frame.head] as [number, number] } : {}) }, ...(p.sprite.jitter ? { jitter: [...p.sprite.jitter] as [number, number] } : {}) },
  lean: [...p.lean], sink: p.sink,
});

/** Borrows the current witch atlas; owns only three tiny sprite buffers/materials, allocated on the first live echo. */
export class DodgeEchoView {
  enabled = new URLSearchParams(globalThis.location?.search ?? "").get("dodgeEchoes") === "1";
  /** Capture-only visibility: survives SpriteBatch.set without clearing or replaying history. */
  private captureShown = true;
  get captureVisible(): boolean { return this.captureShown; }
  set captureVisible(shown: boolean) {
    this.captureShown = shown;
    for (const batch of this.batches) for (const mesh of batch.meshes) mesh.visible = shown && batch.items.length > 0;
  }
  readonly history = new DodgeEchoHistory<DodgePose>(copyPose);
  private atlas: Atlas | null = null;
  private batches: SpriteBatch[] = [];
  private world: object | null = null;
  private clock = -Infinity;
  private lastFoot: EchoPose<DodgePose> | null = null;

  constructor(private scene: THREE.Scene, private mpp: number) {}

  update(world: object, atlas: Atlas, time: number, dash: EchoDash, pose: DodgePose | null, up: THREE.Vector3, allowed: boolean, groundHeight: (x: number, z: number) => number = () => 0): void {
    if (world !== this.world || atlas !== this.atlas || time < this.clock) { this.releaseBatches(); this.lastFoot = null; }
    this.world = world; this.clock = time; this.atlas = atlas;
    // Recover the actual historical foot anchor from the sprite's camera-facing box base.
    const foot = pose ? { x: pose.sprite.x + up.x * pose.sink, y: pose.sprite.y + up.y * pose.sink, z: pose.sprite.z + up.z * pose.sink, pose } : null;
    const previous = this.lastFoot;
    // Keep an actual sampled frame/flip, but anchor each blink-start snapshot at its authoritative source.
    // This also works when a second blink starts before an arrival frame was ever visible.
    const departure = previous && Number.isFinite(dash.fromX) && Number.isFinite(dash.fromZ) ? {
      x: dash.fromX!, z: dash.fromZ!, y: previous.y - groundHeight(previous.x, previous.z) + groundHeight(dash.fromX!, dash.fromZ!), pose: previous.pose,
    } : null;
    const echoes = this.history.update(world, atlas, time, dash, foot, this.enabled && allowed, departure);
    if (foot) this.lastFoot = { ...foot, pose: copyPose(foot.pose) };
    if (echoes.length && !this.batches.length) {
      for (let i = 0; i < ECHO_LIMIT; i++) {
        const batch = new SpriteBatch(atlas, this.mpp, { absolute: true, unlit: true }).name(`dodge echo ${i + 1}`);
        const material = batch.mesh.material as THREE.ShaderMaterial;
        material.transparent = true; material.depthWrite = false; material.depthTest = true;
        batch.mesh.renderOrder = 9.9; this.scene.add(...batch.meshes); this.batches.push(batch);
      }
    }
    for (let i = 0; i < this.batches.length; i++) {
      const batch = this.batches[i], echo = echoes[i];
      if (!echo) { batch.set([]); continue; }
      const p = echo.pose;
      // Re-billboard around the stored world foot with this camera, never around a captured screen position.
      batch.leanU.value.fromArray(p.lean);
      (batch.mesh.material as THREE.ShaderMaterial).uniforms.uSilhouette.value.set(0.4, 0.4, 0.85, echo.alpha);
      batch.set([{ ...p.sprite, x: echo.x - up.x * p.sink, y: echo.y - up.y * p.sink, z: echo.z - up.z * p.sink }]);
      if (!this.captureVisible) for (const mesh of batch.meshes) mesh.visible = false;
    }
  }

  reset(): void { this.history.reset(); this.releaseBatches(); this.atlas = null; this.world = null; this.clock = -Infinity; this.lastFoot = null; }

  private releaseBatches(): void {
    for (const b of this.batches) { this.scene.remove(...b.meshes); b.release(); } // Never dispose the borrowed atlas.
    this.batches.length = 0;
  }
}
