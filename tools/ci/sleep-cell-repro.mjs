// Diagnose logical ownership at spawn and both sleep stages; retain raw physical legend-cell differences as evidence.
// node tools/ci/sleep-cell-repro.mjs [largest|four-area|radius|all] (exit 1 means a real ownership mismatch; no browser).
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
import {generateMap} from './src/rules/map';
import {spawnCreatures} from './src/rules/creatures';
import {sleepCellAudit} from './src/test/sleepCells';
const output=console.log.bind(console);console.log=console.info=(...args)=>console.error(...args);
const fixture=largestShippedWorld(), requested=${JSON.stringify(process.argv[2] ?? "largest")};
if(!['largest','four-area','radius','all'].includes(requested))throw Error('Expected largest, four-area, radius or all');
const idle={moveX:0,moveZ:0,toggleMode:false,zoom:0};
const run=g=>{for(let i=0;i<Math.round(.5/STEP);i++)stepGame(g,idle,STEP)};
const cases=[];
for(const name of requested==='all'?['largest','four-area','radius']:[requested]){
const tuning=name==='largest'?largestWorldTuning(TUNING):{...TUNING,map:{...TUNING.map,island:'',islandAreas:name==='four-area'?4:0,radius:5.6,found:[]}};
const record=(phase,map,creatures)=>{const audit=sleepCellAudit(map,creatures);cases.push({fixture:name,phase,cells:map.cells.length,rawCount:audit.rawDifferences.length,mismatchCount:audit.mismatches.length,...audit});};
const map=generateMap(fixture.seed,tuning);record('spawnCreatures',map,spawnCreatures(map));
const fresh=newGame(fixture.seed,tuning);record('newGame',fresh.map,fresh.creatures);
for(const phase of ['before-party','lost']){
 const g=newGame(fixture.seed,tuning);g.clock.paused=false;fillTrunk(g,{});
 if(phase==='before-party')g.party.spellAt=null;
 else{endParty(g);g.witch={...g.witch,x:g.map.bounds.minX+5,z:g.map.bounds.minZ+5,vx:0,vz:0,seated:false,perch:undefined,mode:'ground',lift:0};}
 run(g);
 record(phase,g.map,g.creatures);
}
}
output(JSON.stringify({fixture,cases},null,2));
process.exitCode=cases.some(c=>c.mismatches.length)?1:0;
` }, bundle: true, platform: "node", format: "cjs", outfile: file, logLevel: "warning" });
  try { process.stdout.write(execFileSync(process.execPath, [file], { encoding: "utf8", maxBuffer: 4e6 })); }
  catch (error) { if (error.stdout) process.stdout.write(error.stdout); process.exitCode = error.status ?? 1; }
} finally { if (fs.existsSync(file)) fs.unlinkSync(file); fs.rmdirSync(dir); }
