// Her sprite's tint while an effect is on her (render/herEffects.ts; Ed, 2026-11-13: "Mark + tint + sound"): the attacker's
// element's colour and how far toward it (the tuning's effectMarks.tint), set each frame by render/leash/combat.ts and read by her
// sprite batches (render/sprites.ts uTint: toward the tint by each pixel's own lightness, so her shading and shape still read).
import * as THREE from "three";

export const HER_TINT = { value: new THREE.Vector4(0, 0, 0, 0) };
