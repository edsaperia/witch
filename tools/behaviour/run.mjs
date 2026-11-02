// Run nonblocking behaviour surveys and save exact-source JSON, readable summary and full logs.
//   node tools/behaviour/run.mjs [output-directory]
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync,execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {summary} from './results.mjs';

const out=path.resolve(process.argv[2]??'out/behaviour'),started=performance.now();
const registered=['music','world'];
fs.mkdirSync(out,{recursive:true});
// Fixed explicit filenames prevent a previous survey result from masquerading as this attempt.
for(const name of [...registered.map(id=>`${id}.json`),'report.json','summary.md','run.log'])fs.rmSync(path.join(out,name),{force:true});
const sha=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
const dirty=execFileSync('git',['status','--porcelain','--untracked-files=no'],{encoding:'utf8'}).trim()!=='';
const vitest=path.join(path.dirname(fileURLToPath(import.meta.resolve('vitest/package.json'))),'vitest.mjs');
const run=spawnSync(process.execPath,[vitest,'run','--config','tools/behaviour/config.mjs'],{encoding:'utf8',env:{...process.env,BEHAVIOUR_OUTPUT_DIR:out},timeout:10*60_000,maxBuffer:16*1024*1024});
const log=(run.stdout??'')+(run.stderr??'');fs.writeFileSync(path.join(out,'run.log'),log);process.stdout.write(log);
const systems=[];let error=run.error?.message??(run.status!==0?`Survey process exited ${run.status}`:null);
for(const id of registered)try{systems.push(JSON.parse(fs.readFileSync(path.join(out,`${id}.json`),'utf8')));}catch(e){error??=`${id} survey missing or unreadable: ${e.message}`;}
const report={schema:1,sha,dirty,createdAt:new Date().toISOString(),seconds:(performance.now()-started)/1000,status:error?'execution error':'complete',error,systems};
fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2)+'\n');
const markdown=summary(report);fs.writeFileSync(path.join(out,'summary.md'),markdown);
if(process.env.GITHUB_STEP_SUMMARY)fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,markdown);
process.stdout.write(markdown);
// Out-of-reference metrics never affect this exit status; only execution failure does.
if(error)process.exitCode=1;
