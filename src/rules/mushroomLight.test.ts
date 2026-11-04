import {describe, expect, it} from 'vitest';
import raw from '../../config/tuning.json';
import schema from '../../config/schema/tuning.schema.json';
import decisions from '../../config/decisions/1643-mushroom-light.json';
import capture from '../../config/playtest-render.json';
import {MUSHROOM_LIGHT_DEFAULTS} from './mushroomLight';
import {validate, type Schema} from './schema';

describe('canonical mushroom light knobs', () => {
  it('keeps all decision defaults canonical: Ed\'s chosen light (2026-11-02), the historical capture left as it was', () => {
    expect(MUSHROOM_LIGHT_DEFAULTS).toEqual(raw.mushroomLight);
    expect(raw.mushroomLight).toEqual({haloStrength: 0.3, poolStrength: 0.1, capGlow: 4.7, radius: 2.35, height: 1.2, complement: 0.1, testRow: false});
    expect([capture.mushroomHaloStrength, capture.mushroomPoolStrength, capture.mushroomSpotGain]).toEqual([0.8, 0.45, 4.8]);
    for (const d of decisions.decisions) expect(raw.mushroomLight[d.apply.knob.split('.')[1] as keyof typeof raw.mushroomLight], d.id).toBe(d.default);
  });
  it('accepts every slider endpoint and rejects values beyond the owned ranges', () => {
    const owned = schema.properties.mushroomLight as Schema;
    for (const d of decisions.decisions) {
      const key = d.apply.knob.split('.')[1];
      if (d.control.type !== 'slider') continue;
      for (const value of [d.control.min!, d.control.max!]) expect(validate({...raw.mushroomLight, [key]: value}, owned), d.id).toEqual([]);
      expect(validate({...raw.mushroomLight, [key]: d.control.max! + 1}, owned), d.id).not.toEqual([]);
      expect(validate({...raw.mushroomLight, [key]: d.control.min! - 1}, owned), d.id).not.toEqual([]);
    }
  });
});
