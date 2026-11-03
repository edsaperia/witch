import { DoubleSide, type MeshBasicMaterial, type MeshBasicMaterialParameters } from "three";
/** Flight previews use world depth; indoor floors retain their original overlay pass. Called only on transitions. */
export function setApproachDepth(material: MeshBasicMaterial, preview: boolean, textured: boolean): void {
  material.transparent = !preview; material.depthTest = preview; material.depthWrite = preview;
  if (textured) material.alphaTest = preview ? 0.5 : 0;
  material.needsUpdate = true;
}

/** The house's own materials as made (render/houseRooms.ts): the rooms' quads (vertex colours) and the painted floor, both drawn
 *  over the picture indoors (setApproachDepth turns them to the flight preview's), and the Terrace's floor, solid. */
export const ROOMS_MATERIAL: MeshBasicMaterialParameters = { vertexColors: true, side: DoubleSide, transparent: true, depthWrite: false, depthTest: false };
export const FLOOR_MATERIAL: MeshBasicMaterialParameters = { transparent: true, depthWrite: false, depthTest: false, side: DoubleSide };
export const TERRACE_MATERIAL: MeshBasicMaterialParameters = { alphaTest: 0.5, side: DoubleSide };

/** The programs every state of those materials takes, held by twins that are never shown (render/houseRooms.ts programTwins), so the
 *  view compiles and links them with the rest at the start (View.compileAll), not on the frame a state is first drawn. Textured: the
 *  twin takes a texel for a map. The rooms' quads in the flight preview among them (Ed's playtest, 2026-11-03, "long freeze after
 *  leaving the balcony": flown off the house, the floors' preview turned the quads solid, a program never made till then, compiled
 *  and linked on that frame). */
export const PROGRAM_TWINS: { params: MeshBasicMaterialParameters; textured: boolean }[] = [
  { params: FLOOR_MATERIAL, textured: true }, // (the floor's)
  { params: TERRACE_MATERIAL, textured: true }, // (the Terrace's, and the floor's in the flight preview)
  { params: { transparent: true, alphaTest: 0.5, side: DoubleSide, depthWrite: false, depthTest: false }, textured: true }, // (a piece of furniture's)
  { params: { vertexColors: true, side: DoubleSide }, textured: false }, // (the rooms' quads in the flight preview)
];
