import { describe, expect, it } from "vitest";
import { SIZE_CLASSES } from "../art/genome/size-ranks.js";
import { candidateSizePixels } from "../art/genome/size-candidate.js";
import {critter,defaultStyle} from "../art/generator.js";
import {styleFromLink} from "./app/viewParams";
import {withTuning} from "./rules/tuning";

describe("Ed's opt-in body size candidate", () => {
  it("enables revised sizes by default after Ed's adoption",()=>expect(defaultStyle().creatureSizeCandidate).toBe(1));
  it("lets Ed compare old sizes from the game link",()=>{
    expect(styleFromLink(new URLSearchParams(),withTuning({})).creatureSizeCandidate).toBe(1);
    expect(styleFromLink(new URLSearchParams("creatureSizeCandidate=0"),withTuning({})).creatureSizeCandidate).toBe(0);
  });
  it("fits anatomical bodies only when opted in and isolates the sprite cache", () => {
    const st={...defaultStyle(),creatureSizeCandidate:0}, before=critter("dormouse",2,0,st);
    for(const id of ["dormouse","wolf","elephant"])for(const level of [0,1,2,3]){
      const sp=critter(id,level,0,{...st,creatureSizeCandidate:1});
      expect(sp.sizeFit.bodyTarget).toBe(candidateSizePixels(id,level));
      expect(Math.abs(sp.sizeFit.bodyHeight-sp.sizeFit.bodyTarget)).toBeLessThanOrEqual(1);
    }
    expect(critter("dormouse",2,0,st)).toBe(before);
    expect(before.sizeFit.bodyTarget).toBeUndefined();
  });
  it("keeps readable small adults and the medium anchor with a broader adult range", () => {
    expect(candidateSizePixels("woodlouse", 2)).toBe(65);
    expect(candidateSizePixels("wolf", 2)).toBe(120);
    expect(candidateSizePixels("elephant", 2)).toBe(200);
    expect(candidateSizePixels("woodlouse", 3)).toBe(candidateSizePixels("elephant", 2));
    expect(candidateSizePixels("elephant", 3)).toBe(280);
  });
  it("separates each age and keeps every mass class ordered at native size", () => {
    for (const ids of SIZE_CLASSES) for (const id of ids) {
      const ages = [0, 1, 2, 3].map(age => candidateSizePixels(id, age));
      for (let age = 1; age < ages.length; age++) expect(ages[age] - ages[age - 1]).toBeGreaterThanOrEqual(15);
    }
    for (let rank = 1; rank < SIZE_CLASSES.length; rank++) for (let age = 0; age < 4; age++) {
      expect(candidateSizePixels(SIZE_CLASSES[rank][0], age)).toBeGreaterThan(candidateSizePixels(SIZE_CLASSES[rank - 1][0], age));
    }
  });
  it("scales all bodies with the same witch reference and rejects invalid inputs", () => {
    expect(candidateSizePixels("wolf", 2, 86)).toBe(240);
    expect(() => candidateSizePixels("unknown", 2)).toThrow();
    expect(() => candidateSizePixels("wolf", 4)).toThrow();
    expect(() => candidateSizePixels("wolf", 2, 0)).toThrow();
  });
});
