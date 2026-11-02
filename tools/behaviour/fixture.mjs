// Run the T6 replay integrity check and collect informational fixture observations for the nightly report.
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

export function fixtureSystem(raw,sha) {
  if(raw?.schema!==1||raw.source!==sha||!Array.isArray(raw.predicates)||raw.predicates.length!==4)throw Error('Invalid fixture report schema, source or row count');
  const expected=[['first-run-censored','string','censored'],['fox-stunned','boolean',true],['fox-hits-positive','number','> 0'],['boar-retaliation-positive','number','> 0']];
  const metrics=expected.map(([id,type,reference],i)=>{
    const row=raw.predicates[i];
    if(row?.id!==id||typeof row.observed!==type||row.reference!==reference||(type==='number'&&!Number.isFinite(row.observed)))throw Error(`Invalid fixture observation ${id}`);
    const withinReference=type==='number'?row.observed>0:row.observed===reference;
    if(row.matchesReference!==withinReference)throw Error(`Inconsistent fixture observation ${id}`);
    return {id:`T6 ${id}`,value:row.observed,unit:type==='number'?'count':'',reference:{operator:type==='number'?'>':'=',value:type==='number'?0:reference},withinReference};
  });
  return {id:'report-fixture-sanity',metrics,fixture:raw};
}

export function runFixtureChecks(out,sha,execute=spawnSync) {
  const started=performance.now(),errors=[],logs=[];
  const file=path.join(out,'report-fixture-sanity.json');
  fs.rmSync(file,{force:true});
  const commands=[['T6 replay integrity',['--test','--test-concurrency=1','tools/balance/report.test.mjs']],['T6 fixture observations',['tools/balance/report-fixture-sanity.mjs',`--out=${file}`]]];
  for(const [label,args]of commands) {
    const run=execute(process.execPath,args,{encoding:'utf8',timeout:120_000,maxBuffer:16*1024*1024});
    logs.push(`\n## ${label}\n${run.stdout??''}${run.stderr??''}`);
    if(run.error||run.status!==0)errors.push(`${label}: ${run.error?.message??`process exited ${run.status}${run.signal?` (${run.signal})`:''}`}`);
  }
  let system;
  try { system=fixtureSystem(JSON.parse(fs.readFileSync(file,'utf8')),sha); }
  catch(e) { errors.push(`T6 fixture result: ${e.message}`); }
  return {system,error:errors.length?errors.join('; '):null,log:logs.join(''),seconds:(performance.now()-started)/1000};
}
