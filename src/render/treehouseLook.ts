import type { MeshBasicMaterial } from "three";
/** Flight previews use world depth; indoor floors retain their original overlay pass. Called only on transitions. */
export function setApproachDepth(material: MeshBasicMaterial, preview: boolean, textured: boolean): void {
  material.transparent = !preview; material.depthTest = preview; material.depthWrite = preview;
  if (textured) material.alphaTest = preview ? 0.5 : 0;
  material.needsUpdate = true;
}
