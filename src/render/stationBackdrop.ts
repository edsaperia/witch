// The backdrop behind her at a station (Ed, 2026-10-29: "When the witch opens a station, make the background behind her darker so
// that she stands out more clearly"): while the camera frames her there (camera.station, eased), the whole picture under a dark wash
// (the tuning's camera.station.dim, 0 none to 1 black), then her drawn again over it at full light. The wash is one quad over the
// screen, drawn after everything (no depth); her second drawing shares her batch's geometry and material (her instances, her atlas),
// only drawn later, so it's her as she is this frame, twirl and all. On the house's layer too (render/post.ts draws only that one
// indoors).
import * as THREE from "three";
import { HOUSE_LAYER } from "./post";

const WASH = 1000, HER = 1001;

export class StationBackdrop {
  readonly mesh: THREE.Mesh;
  private readonly alpha = { value: 0 };
  private copies = new Map<THREE.Mesh, { mesh: THREE.Mesh; of: THREE.Material }>();

  constructor(private scene: THREE.Scene) {
    const mat = new THREE.ShaderMaterial({
      uniforms: { uAlpha: this.alpha },
      vertexShader: "void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }",
      fragmentShader: "uniform float uAlpha; void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha); }",
      transparent: true, depthTest: false, depthWrite: false,
    });
    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
    this.mesh.frustumCulled = false; this.mesh.renderOrder = WASH; this.mesh.visible = false;
    this.mesh.layers.enable(HOUSE_LAYER);
    scene.add(this.mesh);
  }

  /** Each frame: `k` how far the camera's in on her at a station (0 to 1, eased), `dim` the wash at its fullest, `her` the meshes
   *  that draw her now (her batch's main mesh, or her hat-off one's: not its silhouette). */
  update(k: number, dim: number, her: readonly THREE.Mesh[]): void {
    const a = Math.max(0, Math.min(1, dim)) * Math.max(0, Math.min(1, k));
    this.alpha.value = a;
    this.mesh.visible = a > 0.002;
    const want = new Set(this.mesh.visible ? her : []);
    for (const [src, c] of this.copies) if (!want.has(src) || c.of !== src.material) { this.scene.remove(c.mesh); (c.mesh.material as THREE.Material).dispose(); this.copies.delete(src); }
    for (const src of want) {
      let c = this.copies.get(src);
      if (!c) {
        // (her material, but in the transparent pass, which three.js draws after every opaque thing, so after the wash; its uniforms
        // the very same object, so her atlas and her light this frame are hers)
        const of = src.material as THREE.ShaderMaterial, m = of.clone();
        m.uniforms = of.uniforms; m.transparent = true; m.depthWrite = false;
        const mesh = new THREE.Mesh(src.geometry, m);
        mesh.frustumCulled = false; mesh.renderOrder = HER;
        this.scene.add(mesh); this.copies.set(src, (c = { mesh, of }));
      }
      const mesh = c.mesh;
      mesh.visible = src.visible; mesh.layers.mask = src.layers.mask;
      mesh.position.copy(src.position); mesh.quaternion.copy(src.quaternion); mesh.scale.copy(src.scale);
    }
  }
}
