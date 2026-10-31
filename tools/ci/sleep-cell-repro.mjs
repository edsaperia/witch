// Largest shipped world: diagnose the sleep-cell failure across the full roster without editing production rules.
// node tools/ci/sleep-cell-repro.mjs (exit 1 means the recorded invariant is still broken; no browser).
import { buildSync } from "esbuild";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
const dir = fs.mkdtempSync(path.join(os.tmpdir(), "witch-sleep-cell-")), file = path.join(dir, "repro.cjs");
try {
  buildSync({ stdin: { resolveDir: process.cwd(), loader: "ts", contents: `
import {newGame,stepGame,STEP} from './src/rules/game';
import {TUNING} from './src/rules/tuning';
import {largestShippedWorld,largestWorldTuning} from './src/test/worlds';
import {fillTrunk} from './src/rules/finds';
import {endParty} from './src/rules/partyOver';
const output=console.log.bind(console);console.log=console.info=(...args)=>console.error(...args);
const tuning=largestWorldTuning(TUNING), fixture=largestShippedWorld();
const idle={moveX:0,moveZ:0,toggleMode:false,zoom:0};
const run=g=>{for(let i=0;i<Math.round(.5/STEP);i++)stepGame(g,idle,STEP)};
const cases=[];
for(const phase of ['before-party','lost']){
 const g=newGame(fixture.seed,tuning);g.clock.paused=false;fillTrunk(g,{});
 if(phase==='before-party')g.party.spellAt=null;
 else{endParty(g);g.witch={...g.witch,x:g.map.bounds.minX+5,z:g.map.bounds.minZ+5,vx:0,vz:0,seated:false,perch:undefined,mode:'ground',lift:0};}
 run(g);
 const mismatches=g.creatures.filter(c=>!c.gone&&!c.leashed).flatMap(c=>{
  const actual=g.map.cellSafe(c.x,c.z).cell;
  return actual.join(',')===c.cell.join(',')?[]:[{id:c.id,species:c.species,assigned:c.cell,actual,x:c.x,z:c.z,homeX:c.homeX,homeZ:c.homeZ,asleep:c.asleep}];
 });
 cases.push({phase,mismatches});
}
output(JSON.stringify({fixture,cases},null,2));
process.exitCode=cases.some(c=>c.mismatches.length)?1:0;
` }, bundle: true, platform: "node", format: "cjs", outfile: file, logLevel: "warning" });
  try { process.stdout.write(execFileSync(process.execPath, [file], { encoding: "utf8", maxBuffer: 4e6 })); }
  catch (error) { if (error.stdout) process.stdout.write(error.stdout); process.exitCode = error.status ?? 1; }
} finally { if (fs.existsSync(file)) fs.unlinkSync(file); fs.rmdirSync(dir); }
