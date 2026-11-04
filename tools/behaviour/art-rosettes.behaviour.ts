// Original AR1/AR2/AR4 numerical observations; references are informational, never release gates.
import fs from "node:fs";
import path from "node:path";
import {it} from "vitest";
import {metric} from "./results.mjs";
import {createHash} from "node:crypto";
import {regionMarking,wrappedRosette,rosetteCellVariation} from "../../art/body-graph/quadruped.js";
import {M} from "../../art/core.js";
function painterBytes(extra = {}) {
  const values: number[] = [];
  for (const scale of [null, 12, 40, 90]) for (let x = -100; x <= 100; x++) for (let a = 0; a < 96; a++) {
    const angle = a / 96 * Math.PI * 2, p = [x / 70, .7 + Math.cos(angle) * .3, Math.sin(angle) * .25];
    const bounds = { centreY: .7, depth: .3, width: .25, bellyY: .45, len: 1, pixelsPerUnit: scale };
    values.push(regionMarking(p, { kind: "rosettes", outerPx: 7, gap: .4, density: .55, centreMat: "BODYL", ...extra }, bounds) ?? 255,
      Number(wrappedRosette(p, { k: 6, density: .75 }, bounds)));
  }
  return Uint8Array.from(values);
}
const digest = (bytes: Uint8Array) => createHash("sha256").update(bytes).digest("hex");

it("reports original2000-cell rosette fill, closed-ring and variation observations",()=>{
  const metrics:ReturnType<typeof metric>[]=[],samples:Record<string,unknown>={};
{
{
    let filled=0;
    for(let i=-50;i<50;i++)for(let j=0;j<20;j++)filled+=Number(rosetteCellVariation({filledFraction:.3},i,j).filled);
    void [filled/2000,.25];void [filled/2000,.35];
    void [rosetteCellVariation({filledFraction:0},0,0).filled,false];
    void [rosetteCellVariation({filledFraction:1},0,0).filled,true];
    const solid=painterBytes({filledFraction:1}), normal=painterBytes();
    // Even entries are regional materials; odd entries are the legacy boolean.
    void [solid.filter((v,i)=>i%2===0&&v===M.BODYL),0];
    void [normal.filter((v,i)=>i%2===0&&v===M.BODYL).length,0];
    void [solid.filter((v,i)=>i%2===0&&v===M.BODY3).length,normal.filter((v,i)=>i%2===0&&v===M.BODY3).length];
    metrics.push(metric("rosette filled share lower",filled/2000,"share",{operator:">",value:0.25}),metric("rosette filled share upper",filled/2000,"share",{operator:"<",value:0.35}));
    samples.filled={options:{filledFraction:0.3},i:{from:-50,toExclusive:50},j:{from:0,toExclusive:20},filled,cells:2000};
}
}
{
{
    const options = { sizeVariation: .15, closedFraction: .25, gapRange: [0, .65] }, scales = new Set(), gaps = new Set();
    let closed = 0;
    for (let i = -50; i < 50; i++) for (let j = 0; j < 20; j++) {
      const v = rosetteCellVariation(options, i, j);
      void [v,rosetteCellVariation(options, i, j)];
      void [v.scale,.85]; void [v.scale,1.15];
      void [v.gap,0]; void [v.gap,.65];
      scales.add(v.scale); gaps.add(v.gap); closed += Number(v.closed);
    }
    void [scales.size,100]; void [gaps.size,100];
    void [closed / 2000,.2]; void [closed / 2000,.3];
    void [rosetteCellVariation({ closedFraction: 0 }, 0, 0).closed,false];
    void [rosetteCellVariation({ closedFraction: 1 }, 0, 0).closed,true];
    const bytes = painterBytes(options);
    void [digest(bytes),digest(painterBytes(options))];
    void [digest(bytes),digest(painterBytes())];
    // Closed rings add rim pixels without relocating cells or pale centres.
    const open = painterBytes({ gapRange: [.65, .65] }), shut = painterBytes({ closedFraction: 1 });
    void [shut.filter(v => v !== 255).length,open.filter(v => v !== 255).length];
      metrics.push(metric("rosette scale variety",scales.size,"scales",{operator:">",value:100}),metric("rosette gap variety",gaps.size,"gaps",{operator:">",value:100}),metric("rosette closed share lower",closed/2000,"share",{operator:">",value:0.2}),metric("rosette closed share upper",closed/2000,"share",{operator:"<",value:0.3}));
    samples.closed={options,i:{from:-50,toExclusive:50},j:{from:0,toExclusive:20},scales:scales.size,gaps:gaps.size,closed,cells:2000,painterGrid:{scales:[null,12,40,90],x:{from:-100,toInclusive:100},angles:96}};
}
}
  const output=process.env.BEHAVIOUR_OUTPUT_DIR;if(!output)throw Error("Run via node tools/behaviour/run.mjs to preserve report artifacts");
  fs.writeFileSync(path.join(output,"art-rosettes.json"),JSON.stringify({system:"art-rosettes",group:"AR1/AR2/AR4",sourceDeclarations:2,samples,metrics},null,2)+"\n");
},180000);
