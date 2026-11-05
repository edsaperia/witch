import { expect, it } from 'vitest';
import { DECISION_LIST, applyKnobParams, currentValue, setKnob } from '../ui/decisions';
import { withTuning } from '../rules/tuning';
it('wires the pause slider to live tuning and its reload link',()=>{
  const decision=DECISION_LIST.find(d=>d.id==='patternLightStrength')!;
  expect(decision.apply).toEqual({knob:'patternLight.strength'});
  expect(decision.control).toEqual({type:'slider',min:0,max:4,step:.05});
  expect(decision.default).toBe(3);
  const tuning=withTuning({});
  setKnob(tuning,decision.apply.knob!,2.5);
  expect(currentValue(decision,tuning,new URLSearchParams())).toBe(2.5);
  applyKnobParams(tuning,new URLSearchParams('d_patternLightStrength=0'));
  expect(tuning.patternLight.strength).toBe(0);
});
