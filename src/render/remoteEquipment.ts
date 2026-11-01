import * as THREE from "three";
import type { View } from "./view";
import type { Witch } from "../rules/game";
import type { Fitted } from "../rules/broomParts";
import { broomColours } from "./workshopArt";
import type { PiecePixels } from "./housePieces";

/** Latest-only assembled-broom picture using the existing Workshop worker job, never the local witch atlas. */
export function remoteEquipment(view: View) {
  let mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> | null = null;
  let current = "", wanted = "", failedKey = "", pending = false, closed = false;
  let picture: PiecePixels | null = null;
  const remove = () => { if (mesh) { view.scene.remove(mesh); mesh.geometry.dispose(); mesh.material.map?.dispose(); mesh.material.dispose(); mesh = null; } picture = null; };
  return {
    hide() { if (mesh) mesh.visible = false; },
    update(W: Witch, genome: unknown, at: { x: number; y: number; z: number; scale: number }, visible: boolean, failed: (error: unknown) => void): void {
      if (closed) return;
      const fitted: Fitted = { ...W.spells.parts }, colours = broomColours(view.assets.style, genome), key = JSON.stringify([fitted, colours]); wanted = key;
      if (!Object.values(fitted).some(Boolean)) { if (mesh) mesh.visible = false; return; }
      if (!pending && key !== current && key !== failedKey) {
        pending = true;
        void view.assets.oneOff({ kind: "workshopPic", id: `remote-broom:${key}`, style: view.assets.style, pic: { what: "broom", fitted, host: "broomBay", ppm: 40, pitch: .45, yaw: .35, colours } }).then(result => {
          if (closed || wanted !== key) return;
          const p = result.housePiece; if (!p) throw new Error("The shared broom picture isn't ready.");
          remove(); picture = p;
          const tex = new THREE.DataTexture(p.px, p.w, p.h, THREE.RGBAFormat); tex.magFilter = tex.minFilter = THREE.NearestFilter; tex.generateMipmaps = false; tex.flipY = false; tex.colorSpace = THREE.NoColorSpace; tex.needsUpdate = true;
          mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: tex, transparent: true, alphaTest: .5, depthWrite: false })); mesh.frustumCulled = false; mesh.visible = false; view.scene.add(mesh); current = key;
        }).catch(error => { if (!closed && wanted === key) { failedKey = key; failed(error); } }).finally(() => { pending = false; });
      }
      if (!mesh || !picture) return;
      mesh.visible = visible && Object.values(fitted).some(Boolean) && current === key;
      mesh.position.set(at.x, at.y + .35 * at.scale, at.z); mesh.quaternion.copy(view.camera.quaternion);
      mesh.scale.set(picture.w * view.mpp * .5 * at.scale * (W.body.facing < 0 ? -1 : 1), picture.h * view.mpp * .5 * at.scale, 1);
      mesh.renderOrder = view.witchBatch.mesh.renderOrder + .001;
    },
    release() { if (closed) return; closed = true; wanted = ""; remove(); },
  };
}
