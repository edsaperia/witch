// H4 house observations; historical outcome references are informational, never release gates.
import fs from "node:fs";
import path from "node:path";
import {it} from "vitest";
import {metric} from "./results.mjs";
import {makeCrown,crownBulbs,polySigned,type HouseOutline} from "../../src/rules/crown";
import {TUNING} from "../../src/rules/tuning";
import OUTLINE from "../../config/house/outline.json";
it("reports the original five crown density and variation samples",()=>{
  const O=OUTLINE as unknown as HouseOutline,input={outline:O,floor:TUNING.treehouse.house!.height,seed:1};
  const c=makeCrown(input),open=makeCrown({...input,open:[{x:40,z:40,r:28}]}),whole=makeCrown({...input,gap:false}),bulbs=crownBulbs(c,0.8);
  const spread=(v:number[])=>Math.max(...v)-Math.min(...v),spans=c.strings.flatMap(s=>s.kind==="swag"||s.kind==="drape"?s.spans:[]),garlands=c.strings.filter(s=>s.kind==="garland");
  const T=O.rooms.find(r=>r.id==="terrace")!,covered=(c:ReturnType<typeof makeCrown>)=>{let n=0,k=0;for(let x=-20;x<=20;x++)for(let z=-20;z<=20;z++)if(polySigned(T.outline,x,z)<0){n++;if(c.lobes.some(l=>Math.hypot(l.x-x,l.z-z)<l.r*0.8))k++;}return {points:n,covered:k,share:k/n};};
  const thin=c.lobes.filter(l=>l.thin>0).length,sagSpread=spread(spans.map(p=>p.sag)),tiltSpread=spread(garlands.map(s=>s.tilt??0)),coverage=covered(whole);
  const metrics=[metric("crown lobe count",c.lobes.length,"lobes",{operator:">=",value:300}),metric("thin lobe share",thin/c.lobes.length,"share",{operator:">",value:0.15}),metric("open-ground crown lobe count",open.lobes.length,"lobes",{operator:">",value:200}),metric("crown bulb count",bulbs.length,"bulbs",{operator:">",value:5000}),metric("string sag spread",sagSpread,"m",{operator:">",value:1.5}),metric("garland tilt spread",tiltSpread,"radians",{operator:">",value:0.15}),metric("whole Terrace coverage",coverage.share,"share",{operator:">",value:0.6}),metric("whole minus gapped lobe count",whole.lobes.length-c.lobes.length,"lobes",{operator:">",value:0})];
  const samples={seed:1,floor:input.floor,open:[{x:40,z:40,r:28}],bulbSpacing:0.8,lobes:c.lobes.length,thin,openLobes:open.lobes.length,bulbs:bulbs.length,sags:spans.map(p=>p.sag),tilts:garlands.map(s=>s.tilt??0),coverage,gappedCoverage:covered(c),wholeLobes:whole.lobes.length};
  const output=process.env.BEHAVIOUR_OUTPUT_DIR;if(!output)throw Error("Run via node tools/behaviour/run.mjs to preserve report artifacts");
  fs.writeFileSync(path.join(output,"house-canopy.json"),JSON.stringify({system:"house-canopy",group:"H4 house",sourceDeclarations:5,samples,metrics},null,2)+"\n");
});
