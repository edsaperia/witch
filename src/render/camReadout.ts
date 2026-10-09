// ?debug=cam (coordinator, 2026-10-09: "so Ed can tell us exactly where he is"): a small readout in the top right corner of
// where the witch and the camera are this frame, to quote with a screenshot: the seed, her place, area, mode and height, the
// camera's lift, zoom, pitch and distance, the window and the layers turned off (render/layers.ts). Drawing only.
import * as THREE from "three";
import type { View } from "./view";
import { witchHeight } from "../rules/witch";
import { layersOff } from "./layers";
import { AREA_TYPES } from "../rules/map";

const dir = new THREE.Vector3(), at = new THREE.Vector3();

export function camReadoutText(v: View): string {
  const g = v.game, w = g.witch, c = g.camera, cam = v.camera as THREE.PerspectiveCamera;
  cam.getWorldDirection(dir);
  at.set(w.x, witchHeight(w, g.tuning), w.z);
  const pitch = (-Math.asin(Math.max(-1, Math.min(1, dir.y))) * 180) / Math.PI, dist = cam.position.distanceTo(at);
  const area = AREA_TYPES[g.map.areaAt(w.x, w.z).type]?.id ?? "?";
  const off = [...layersOff()];
  return [
    `seed ${g.seed}  at ${w.x.toFixed(0)}, ${w.z.toFixed(0)}  area ${area}`,
    `mode ${w.mode}  lift ${w.lift.toFixed(2)}  height ${witchHeight(w, g.tuning).toFixed(1)} m`,
    `camera lift ${(c?.lift ?? 0).toFixed(2)}  zoom ${c?.zoomStep ?? "?"} (${(c?.zoom ?? 0).toFixed(2)})  pitch ${pitch.toFixed(1)}°  distance ${dist.toFixed(0)} m  fov ${cam.fov?.toFixed?.(1) ?? "?"}°`,
    `window ${innerWidth}×${innerHeight} @${devicePixelRatio}  scene ${v.width}×${v.height}`,
    `layers off: ${off.length ? off.join(", ") : "none"}`,
  ].join("\n");
}

let el: HTMLDivElement | null = null;
export function drawCamReadout(v: View): void {
  if (!el) {
    el = document.createElement("div"); el.className = "cam-readout";
    Object.assign(el.style, { position: "fixed", right: "8px", top: "8px", zIndex: "50", whiteSpace: "pre", font: "11px/1.35 monospace", color: "#dfe", background: "rgba(10,12,20,.7)", padding: "4px 6px", borderRadius: "4px", pointerEvents: "none" });
    document.body.append(el);
  }
  el.textContent = camReadoutText(v);
}
