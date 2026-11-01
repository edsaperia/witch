import {beforeAll,expect,it} from "vitest";
import {execFileSync} from "node:child_process";
import {readFileSync} from "node:fs";
import {runInNewContext} from "node:vm";
import {occupiedHeight} from "../art/creature-size.js";

let drawFormSource:string;
beforeAll(()=>{
 execFileSync(process.execPath,["tools/art-lab/build.mjs"],{encoding:"utf8"});
 const page=readFileSync("tools/art-lab/dist/witch-art-lab.html","utf8");
 const start=page.indexOf("const drawForm = "),end=page.indexOf("\nfunction withGear(",start);
 if(start<0||end<start)throw Error("Generated lab drawForm section missing");
 drawFormSource=page.slice(start,end);
});
// Execute the actual flattened function with real provider names, no DOM or
// browser. The inliner drops import aliases; native ESM tests cannot catch it.
it.each([0,1])("generated lab resolves occupied body height with size switch %s",flag=>{
 const sprite=()=>({w:1,h:1,m:new Uint8Array([1])});
 const result=runInNewContext(`${drawFormSource}\ndrawForm(model,{},species,0,style);`,{
  FORM:null,VIEW:null,model:{parts:[],flats:[]},species:{id:"mole",sizes:{}},
  style:{creatureSizeCandidate:flag},occupiedHeight,
  creatureSizeOptions:()=>({sizeTarget:1}),
  fitOccupiedCreature:()=>({options:{},stats:{rasters:1,probes:0},sprite:sprite()}),
  render:()=>({sp:sprite()}),glowMotes:()=>{},
 });
 expect(result.sizeFit.bodyHeight).toBe(flag===1?1:undefined);
});
