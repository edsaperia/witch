import { Vector4 } from "three";
import { LANDSCAPE_POTIONS } from "../rules/landscapePotions";

export const landscapeUniform = { value: new Vector4() };
// Shared by vertex and fragment includes, including shaders using both.
export const LANDSCAPE_GLSL = `
#ifndef WITCH_LANDSCAPE_TRIP
#define WITCH_LANDSCAPE_TRIP
uniform vec4 uLandscapeTrip; // stable effect ID, envelope, lab value, game time or wave progress
${Object.entries(LANDSCAPE_POTIONS).map(([name, p]) => `#define TRIP_${name.replaceAll("-", "_").toUpperCase()} ${p.id}.0`).join("\n")}
#endif
`;
