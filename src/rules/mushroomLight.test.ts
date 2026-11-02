import {describe, expect, it} from 'vitest';
import raw from '../../config/tuning.json';
import schema from '../../config/schema/tuning.schema.json';
import decisions from '../../config/decisions/1643-mushroom-light.json';
import capture from '../../config/playtest-render.json';
import {MUSHROOM_LIGHT_DEFAULTS} from './mushroomLight';
import {validate, type Schema} from './schema';

describe('canonical mushroom light knobs', () => {
  it('keeps all decision defaults canonical and the historical lighting values unchanged', () => {
    expect(MUSHROOM_LIGHT_DEFAULTS).toEqual(raw.mushroomLight);
    expect(raw.mushroomLight.haloStrength).toBe(capture.mushroomHaloStrength);
    expect(raw.mushroomLight.poolStrength).toBe(capture.mushroomPoolStrength);
    expect(raw.mushroomLight.capGlow).toBe(capture.mushroomSpotGain);
    expect(raw.mushroomLight.testRow).toBe(false);
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
