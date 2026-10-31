import {describe,expect,it} from "vitest";
import {critter} from "../art/creatures.js";
import {defaultStyle} from "../art/generator.js";
import {GENOME_BY_ID,speciesOf} from "../art/genome/index.js";
import {catCaptureGenome} from "../tools/body-graph/cat-fixtures.js";
import {connectivityRegression} from "../art/genome/connectivity.js";
import gameStyle from "../config/style.json";
import tuning from "../config/tuning.json";
import type {Style} from "./render/style";

describe("cheetah legend flame attachment regression",()=>{
  it.each([0,1])("keeps the graph active without detaching new effect pixels in frame %s",frame=>{
    const record=catCaptureGenome(GENOME_BY_ID.cheetah),current=Object.assign(defaultStyle(),gameStyle,{artStyle:"bold",pixel:tuning.pixelSize}) as unknown as Style;
    const selected={...current,creatureModels:"cheetah:graph",creatureVariants:{cheetah:{graph:record}}} as unknown as Style;
    expect(Reflect.get(speciesOf(record),"levelQ")[3].graph.family).toBe("feline");
    for(const facing of ["towards"]){
      const a=critter("cheetah",3,frame,current,facing),b=critter("cheetah",3,frame,selected,facing);
      const result=connectivityRegression(a,b);
      expect(result.good,`${facing}: ${JSON.stringify(result)}`).toBe(true);
      // Compare the required attachment evidence rather than ask the test
      // runner to format hundreds of thousands of material bytes on failure.
      expect(result.candidate.components.length).toBeLessThanOrEqual(result.current.components.length);
      expect(result.candidate.detachedPixels).toBeLessThanOrEqual(result.current.detachedPixels+3);
    }
  },30000);
});
