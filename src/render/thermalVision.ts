import type { Creature } from '../rules/creatures';

/** Zero is scenery; every creature carries a positive semantic heat, independent of its painted colour or lighting. */
export function creatureHeat(c: Pick<Creature, 'leashed' | 'friendly' | 'enraged' | 'asleep' | 'state' | 'charge' | 'leap'>, attacking = false): number {
  if (c.asleep) return .18;
  if (c.leashed || c.friendly || c.state === 'happy') return .28;
  if (attacking || c.charge || c.leap) return 1;
  return c.enraged || c.state === 'enraged' ? .8 : .42;
}

export const THERMAL_UNIFORMS = {
  uThermalStrength: { value: 0 },
  uThermalColdBrightness: { value: .35 },
  uThermalDangerGain: { value: 1 },
};

export const THERMAL_GLSL = /* glsl */ `
uniform float uThermalStrength, uThermalColdBrightness, uThermalDangerGain;
vec3 thermalCold(vec3 colour) {
  float detail = clamp(dot(colour, vec3(.2126,.7152,.0722)), 0.0, 1.0);
  return mix(vec3(.008,.014,.055), vec3(.06,.34,.8), sqrt(detail)) * uThermalColdBrightness;
}
vec3 thermalCreature(vec3 paint, vec3 normal, float heat) {
  float detail = clamp(dot(paint, vec3(.2126,.7152,.0722)) * .7 + (normal.z * .5 + .5) * .3, 0.0, 1.0);
  float danger = clamp(.42 + (heat - .42) * uThermalDangerGain, 0.0, 1.0);
  float localHeat = clamp(.2 + danger * .65 + (detail - .5) * .4, 0.0, 1.0);
  vec3 warm = localHeat < .35 ? mix(vec3(.15,.85,.06), vec3(1.0,.88,.025), localHeat / .35)
    : localHeat < .65 ? mix(vec3(1.0,.88,.025), vec3(1.0,.32,.015), (localHeat-.35)/.3)
    : mix(vec3(1.0,.32,.015), vec3(1.0,.025,.008), (localHeat-.65)/.35);
  // Fur markings and relief change temperature bands, not just brightness, even in an unlit forest.
  return warm * (.65 + .35 * sqrt(detail));
}
`;
