// The tuning file, config/tuning.json, typed. Ed edits the JSON; nothing here holds a number.
import raw from "../../config/tuning.json";

export interface CameraModeTuning { angleIn: number; angleOut: number; distanceIn: number; distanceOut: number }

export interface Tuning {
  mapAreas: number;
  areaSize: number;
  borderLayers: number;
  treeDensity: number;
  clearingSize: number;
  bushDensity: number;
  treeSpacingX: number;
  treeSpacingZ: number;
  bushSpacing: number;
  groundSpeed: number;
  treetopSpeed: number;
  acceleration: number;
  riseTime: number;
  descendTime: number;
  groundHeight: number;
  treetopHeight: number;
  camera: { fov: number; ground: CameraModeTuning; treetop: CameraModeTuning; zoomSteps: number; startZoom: number; follow: number };
  pixelSize: number;
  glowReach: number;
  glowHeight: number;
  spriteTilt: number;
  artPixelsPerMetre: number;
  drawRadius: number;
  creaturesPerClearing: number;
  legendChance: number;
  creatureSpeed: number;
  legendSpeed: number;
}

export const TUNING: Tuning = raw as Tuning;

/** The tuning file with some values replaced, for tests and experiments. */
export function withTuning(over: Partial<Tuning>): Tuning {
  return { ...TUNING, ...over, camera: { ...TUNING.camera, ...(over.camera ?? {}) } };
}
