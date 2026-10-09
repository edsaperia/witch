// ?layers=-name,-name (coordinator, 2026-10-09, for the canopy circle Ed kept seeing: "find the layer first, then fix it"):
// turns drawing layers off one at a time, so whatever draws a stray edge can be found by switching them off in turn, on any
// machine, with no rebuild. Drawing only: the rules never read it. Kept in the game for the next stubborn picture bug.
// `?layers=-cutout,-mist` turns those two off; `?layers=?` lists them in the console. The names are LAYERS' keys.

import * as THREE from "three";
import type { View } from "./view";
import type { Tuning } from "../rules/tuning";
import { LIGHT_UNIFORMS } from "./lighting";
import { SPRITE_UNIFORMS } from "./sprites";

/** Every layer that can be turned off, and what it is (the ones with a radius round her first). */
export const LAYERS: Record<string, string> = {
  cutout: "the crown cut-out round her (canopyCutout): crowns stand whole everywhere",
  topfade: "the crowns' fade in and out as she rises (uTopFade): crowns at full",
  trunkfade: "the trunk-top fade where a trunk's crown is cut out (trunkFade)",
  occlude: "the see-through circle where things stand in front of her (uOcc)",
  tufts: "the ground-cover tufts (grass.ts)",
  canopyshadow: "the ground shader's dappled canopy shadow (uCanopy)",
  glow: "her glow pool and its light on everything (uGlowR, glowToCutout)",
  nightlight: "the night light's reach (nightLight: maxReach, treetopReach, gazeReach)",
  dim: "the forest dimmed in the wild and in a clearing (uDim)",
  fog: "the far haze the forest fades into (haze)",
  mist: "the low mist (mist.ts, the smooth effects layer)",
  rings: "the light rings on the crowns (lightRings.ts, the smooth effects layer)",
  tilt: "the tilt-shift blur",
  bloom: "the bloom",
  holograms: "the sigil holograms",
  clearing: "a sleeping legend's clearing light and its dark round it (glades.ts)",
  shadows: "the sprites' ground shadows (shadows.ts)",
  wisps: "the wisps",
  smoke: "the smoke",
  clouds: "the clouds",
};

let off: Set<string> | null = null;

/** The layers turned off by the page's ?layers= (parsed once). */
export function layersOff(search = typeof location === "undefined" ? "" : location.search): Set<string> {
  if (off) return off;
  const raw = new URLSearchParams(search).get("layers") ?? "";
  off = new Set(raw.split(",").map(s => s.trim().replace(/^-/, "")).filter(s => s in LAYERS));
  if (raw.includes("?")) console.log("?layers=-name,-name turns these off:\n" + Object.entries(LAYERS).map(([k, d]) => `  ${k}: ${d}`).join("\n"));
  if (off.size) console.log(`layers off: ${[...off].join(", ")}`);
  return off;
}

/** Parses a ?layers= value afresh (for tests). */
export function parseLayers(search: string): Set<string> { off = null; const s = layersOff(search); off = null; return s; }

export const layerOff = (name: keyof typeof LAYERS | string): boolean => layersOff().has(name);

/** At the start: the layers the tuning switches (render-only knobs, read once when the view is built). */
export function layersAtStart(t: Tuning): void {
  if (layerOff("mist")) t.mist.on = false;
  if (layerOff("rings") && t.lightRings) t.lightRings.on = false;
  if (layerOff("tilt")) t.tiltShift.on = false;
  if (layerOff("bloom")) t.bloom.on = false;
  if (layerOff("wisps") && t.wisps) t.wisps.on = false;
}

/** Each frame, just before it's drawn: undoes what this frame set for the layers turned off. */
export function layersEachFrame(v: View): void {
  const o = layersOff();
  if (!o.size) return;
  const S = SPRITE_UNIFORMS, L = LIGHT_UNIFORMS;
  if (o.has("cutout")) S.uCutout.value.z = -1e6;
  if (o.has("topfade")) S.uTopFade.value = 1;
  if (o.has("trunkfade")) S.uTrunkFade.value.x = 0;
  if (o.has("occlude")) S.uOcc.value.w = 0;
  if (o.has("tufts")) v.grass.mesh.visible = false;
  if (o.has("canopyshadow")) (v.ground.mesh.material as THREE.ShaderMaterial).uniforms.uCanopy.value.x = 0;
  if (o.has("glow")) { L.uGlowPower.value = 0; L.uGlowR.value = 0; }
  if (o.has("dim")) L.uDim.value = 1;
  if (o.has("fog")) L.uHazeRange.value.set(1e5, 2e5);
  if (o.has("holograms")) v.holograms.group.visible = false;
  if (o.has("clearing")) { L.uGladeCount.value = 0; L.uDim.value = 1; L.uSlow.value.w = 0; v.glades.points.visible = false; }
  if (o.has("shadows")) v.shadows.mesh.visible = false;
  if (o.has("smoke")) v.smoke.mesh.visible = false;
  if (o.has("clouds")) { v.clouds.mesh.visible = false; v.clouds.bolt.visible = false; }
}
