/** Live, local development controls. Never stored in game saves or shared simulation tuning. */
export interface PotionParameter { key: string; label: string; min: number; max: number; step: number; default: number }
const p = (key: string, label: string, value: number, min: number, max: number, step = .05): PotionParameter => ({ key, label, default: value, min, max, step });
export const POTION_PARAMETERS: Record<string, readonly PotionParameter[]> = {
  'trip-audio': [p('mix', 'Trip sound treatment', 1, 0, 1), p('cutoff', 'Sound brightness (Hz)', 2600, 200, 12000, 100), p('motion', 'Sound brightness motion (octaves)', .6, 0, 2, .05), p('speed', 'Sound motion speed (Hz)', .18, .02, 2, .02), p('flutter', 'Sound flutter', .18, 0, .7, .01)],
  'miniature': [p('blur', 'Toy-world blur', 7, 0, 16, .1), p('band', 'Sharp strip width', .12, .02, 1, .01), p('centre', 'Focus position from top', .55, 0, 1, .01)],
  'trip-indicator': [p('strength', 'Edge wobble (art pixels)', 1.5, 0, 30, .1), p('speed', 'Wobble speed', 1.2, 0, 12, .1), p('waveSize', 'Wave size (screen fraction)', .3, .02, 2, .01), p('reach', 'Reach from screen edges', .2, 0, 1, .01)],
  'ravine': [p('bendMultiplier', 'Upward bend × treetop bend', 2, 0, 30, .1), p('minimumBend', 'Minimum upward bend', .001, 0, .03, .0001)],
  'little-planet': [p('bendMultiplier', 'Extra bend × treetop bend', 6, 0, 50, .1), p('minimumBend', 'Minimum extra bend', .002, 0, .05, .0001)],
  'glow-up': [p('thresholdScale', 'Bloom threshold × normal', 0, 0, 2), p('minimumBoost', 'Minimum bloom boost', 1.5, 0, 12, .1), p('strengthMultiplier', 'Extra bloom × normal strength', 3, 0, 20, .1)],
  'big-moon': [p('size', 'Moon size × normal', 10, .1, 40, .1), p('glow', 'Moon glow × normal', 6, 0, 30, .1)],
  'thick-canopy': [p('closure', 'Canopy closure', 1, 0, 1), p('saturation', 'Colour saturation', 1.9, 0, 5, .1), p('blackFloor', 'Black point', .16, 0, .8, .01), p('gamma', 'Lighting contrast × normal', 1.2, .2, 4)],
  'vertigo': [p('angle', 'Camera angle (degrees)', 72, 10, 85, 1), p('angleMix', 'Camera angle influence', .7, 0, 1), p('distance', 'Camera distance × normal', 1.8, .5, 5, .1), p('fov', 'Wide field of view (degrees)', 80, 30, 120, 1), p('blur', 'Extra distance blur', 5, 0, 20, .1), p('band', 'Sharp band × normal', .3, .05, 2)],
  'aurora-outlines': [p('strength', 'Outline effect strength', 1, 0, 1), p('edgeLow', 'Edge threshold', .025, 0, 1, .005), p('edgeHigh', 'Edge softness upper threshold', .3, .005, 2, .005), p('background', 'Original surface brightness', .035, 0, 1, .005)],
  'skylight': [p('ground', 'Ground disappearance', 1, 0, 1), p('foliage', 'Small foliage disappearance', 1, 0, 1)],
};
const values: Record<string, Record<string, number>> = Object.fromEntries(Object.entries(POTION_PARAMETERS).map(([effect, parameters]) => [effect, Object.fromEntries(parameters.map(parameter => [parameter.key, parameter.default]))]));
export const potionSettings = (effect: string): Readonly<Record<string, number>> => values[effect] ?? {};
export function setPotionSetting(effect: string, key: string, value: number): void {
  const definition = POTION_PARAMETERS[effect]?.find(parameter => parameter.key === key);
  if (!definition || !Number.isFinite(value)) return;
  values[effect][key] = Math.max(definition.min, Math.min(definition.max, value));
}
export function resetPotionSettings(effect?: string): void {
  for (const [id, parameters] of Object.entries(POTION_PARAMETERS)) if (!effect || effect === id) {
    for (const parameter of parameters) values[id][parameter.key] = parameter.default;
  }
}
export const potionSettingsSnapshot = () => ({ version: 1, effects: Object.fromEntries(Object.entries(values).map(([id, settings]) => [id, { ...settings }])) });
