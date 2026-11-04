// Original L3/L5 samples; outcome references are informational, not release gates.
import fs from "node:fs";
import path from "node:path";
import {it} from "vitest";
import {metric} from "./results.mjs";
import {LEGEND_SIZES,radiusToFit,overflow} from "../../src/rules/legendFit";
import {TUNING as gameTuning} from "../../src/rules/tuning";
import {largestWorldTuning} from "../../src/test/worlds";
it("reports current old-cap overflow identities without selecting a new size policy",()=>{
  const metrics:ReturnType<typeof metric>[]=[],samples:Record<string,unknown>={};

  const LC=largestWorldTuning(gameTuning).legendClearing,historical=["crocodile","elephant","elk","frostwyrm","griffin","jaguar","lion","sphinx","stegosaurus","tiger","unicorn"],giants=Object.keys(LEGEND_SIZES).filter(sp=>radiusToFit(sp,LC)>LC.fit!.max).sort();
  const footprints=Object.keys(LEGEND_SIZES).sort().map(species=>({species,required:radiusToFit(species,LC),overflowAtCap:overflow(species,LC.fit!.max,LC)}));
  metrics.push(metric("old-cap giant identity list matches historical eleven",+(JSON.stringify(giants)===JSON.stringify(historical)),"boolean",{operator:">=",value:1}));
  samples.fit={cap:LC.fit!.max,margin:LC.fit!.margin,top:LC.top,historical,giants,footprints};
  const output=process.env.BEHAVIOUR_OUTPUT_DIR;if(!output)throw Error("Run via node tools/behaviour/run.mjs to preserve report artifacts");
  fs.writeFileSync(path.join(output,"legends-fit.json"),JSON.stringify({system:"legends-fit",group:"L3/L5",sourceDeclarations:1,samples,metrics,notes:["Current legends exceeding the old "+LC.fit!.max+" m cap: "+giants.join(", ")+". This comparison does not choose a new circle size or art scale."]},null,2)+"\n");
});
