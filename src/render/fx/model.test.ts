import { describe, expect, it } from "vitest";
import { ATTACK_LOOK } from "../../rules/attackLook";
import { validate, type Schema } from "../../rules/schema";
import elementSchema from "../../../config/schema/fx-elements.schema.json";
import formSchema from "../../../config/schema/fx-forms.schema.json";
import intensitySchema from "../../../config/schema/fx-intensity.schema.json";
import { elements, forms, settings, ImprintField, intensityOf, lightScore, IMPRINTS } from "./model";
describe("magic language and temporary scenery field",()=>{
  it("covers every existing element and form with distinct ramps and movement",()=>{
    expect(validate(elements,elementSchema as Schema)).toEqual([]);
    expect(validate(forms,formSchema as Schema)).toEqual([]);
    expect(validate(settings,intensitySchema as Schema)).toEqual([]);
    for(const name of Object.keys(ATTACK_LOOK.elements))expect(elements).toHaveProperty(name);
    expect(new Set(Object.values(forms).map(f=>f.id)).size).toBe(Object.keys(forms).length);
    for(const el of Object.values(elements)){
      expect(el.ramp).toHaveLength(4);expect(IMPRINTS).toContain(el.imprint);
      for(const c of [...el.ramp,el.contrast])expect(c).toMatch(/^#[\da-f]{6}$/i);
      expect(el.motion).toBeGreaterThanOrEqual(0);expect(el.motion).toBeLessThan(8);
    }
    expect(new Set(Object.values(elements).map(e=>e.motion)).size).toBe(8);
    expect(settings.lightCap).toBeLessThanOrEqual(6);
  });
  it("has one monotonic intensity ladder",()=>{
    expect([0,1,2,3].map(intensityOf)).toEqual([0.25,0.45,0.65,1]);
    expect(intensityOf(-1)).toBe(0.25);expect(intensityOf(8)).toBe(1);
  });
  it("stamps all six channels independently and fully clears in seconds",()=>{
    const f=new ImprintField(16,16);f.move(0,0);
    for(const kind of IMPRINTS)f.stamp(0.5,0.5,3,kind,1);
    for(const kind of IMPRINTS)expect(f.at(0.5,0.5,kind)).toBe(1);
    f.decay(2.5);expect(f.at(0.5,0.5,"frost")).toBeCloseTo(0.5);
    f.decay(2.5);f.publish();expect(f.data.every(v=>v===0)).toBe(true);
  });
  it("keeps overlapping world cells on scroll, clears newly exposed slots, and never wraps distant stamps",()=>{
    const f=new ImprintField(8,8);f.move(0,0);f.stamp(1.5,0.5,1,"frost",1);f.stamp(-3.5,0.5,1,"scorch",1);
    f.move(2,0);expect(f.at(1.5,0.5,"frost")).toBe(1);expect(f.at(4.5,0.5,"scorch")).toBe(0);
    f.stamp(100,100,2,"wet",1);expect(f.at(4.5,0.5,"wet")).toBe(0);
    f.move(100,100);expect(f.at(100.5,100.5,"frost")).toBe(0);
    f.reset();expect(f.values.every(v=>v===0)).toBe(true);
  });
  it("ranks a stronger nearby light above a remote weak one",()=>{
    expect(lightScore(2,0,1,0,0)).toBeGreaterThan(lightScore(40,0,0.2,0,0));
    expect(lightScore(0,0,0,0,0)).toBe(0);
  });
});
