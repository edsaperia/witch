// Fixed PR1558#6547506171 acceptance for a future allocated three-arm smoke-veil run.
// Pure analysis only; importing this module starts no browser or measurement.
const SOURCE='1558#6547506171';
const PROBE_LIMITS={p99:2,max:5}; // Additional canonical1558#6556205901, never raised by a run.
function percentile(values,p){const a=[...values].sort((a,b)=>a-b);return a[Math.ceil(a.length*p)-1];}
function analyse(arms){
  const reasons=[],raw={};let measuredUnderLoad=false;let fixture;
  for(const mode of ['default','three','off']){
    const arm=arms.find(a=>a.mode===mode);
    if(!arm||!arm.frames?.length){reasons.push(mode+': missing frames');continue;}
    if(arm.frames.length!==600)reasons.push(mode+': expected exactly600 frames');
    if(arms.filter(a=>a.mode===mode).length!==1)reasons.push(mode+': duplicate arm');
    if(!arm.fixtureKey||fixture&&arm.fixtureKey!==fixture)reasons.push(mode+': fixture/seed/route mismatch');
    fixture??=arm.fixtureKey;
    if(!arm.cpu?.length||arm.cpu.some(n=>!Number.isFinite(n)||n<0||n>100))reasons.push(mode+': missing/invalid CPU record');
    if(!arm.quietProofs?.length||arm.quietProofs.some(p=>!p.at||!Number.isFinite(p.idleMs)||p.idleMs<0||p.method!=='input-only-record'))reasons.push(mode+': missing input observation');if(arm.cpu?.some(n=>n>=70)||arm.quietProofs?.some(p=>p.inputChanged))measuredUnderLoad=true;
    if(arm.frames.some(f=>!Number.isFinite(f.intervalMs)||f.intervalMs<=0||!Number.isFinite(f.probeMs)||f.probeMs<0)){reasons.push(mode+': invalid frame telemetry');continue;}
    const total=arm.frames.reduce((n,f)=>n+f.intervalMs,0),covered=arm.frames.reduce((n,f)=>n+(f.activeProbe&&f.smokeDrawn?f.intervalMs:0),0);
    const intervals=arm.frames.map(f=>f.intervalMs);
    const probe=arm.frames.map(f=>f.probeMs);
    raw[mode]={p95:percentile(intervals,.95),worst:Math.max(...intervals),over50:intervals.filter(n=>n>50).length,probeStalls:arm.frames.filter(f=>f.intervalMs>50&&f.probeMs>=30).length,probeP99:percentile(probe,.99),probeMax:Math.max(...probe),probeBlocks20:probe.filter(n=>n>=20).length,smokeProbeWindowShare:covered/total,frames:intervals.length};
    const parts=['contextMs','getSyncParameterMs','getParameterMs','bindBufferMs','unbindBufferMs','getBufferSubDataMs','deleteSyncMs','applyMs'];
    if(arm.frames.some(f=>!f.probeDetail||typeof f.probeDetail.fenceSignalled!=='boolean'||typeof f.probeDetail.copied!=='boolean'||parts.some(k=>!Number.isFinite(f.probeDetail[k])||f.probeDetail[k]<0)))reasons.push(mode+': missing per-call probe telemetry');
    else raw[mode].probeParts=Object.fromEntries(parts.map(k=>{const a=arm.frames.map(f=>f.probeDetail[k]);return [k,{p99:percentile(a,.99),max:Math.max(...a)}];}));
    if(covered/total<.8)reasons.push(mode+': active probe and smoke below80% of measured window');
  }
  if(reasons.length)return {source:SOURCE,measuredUnderLoad,status:'INCONCLUSIVE',reasons,raw};
  const d=raw.default,t=raw.three,o=raw.off;
  if(t.probeStalls<3&&t.p95<d.p95+10)return {source:SOURCE,measuredUnderLoad,status:'INCONCLUSIVE',reasons:['stall not reproduced'],raw};
  const limits={p95:o.p95+Math.max(2,.05*o.p95),worst:o.worst+16.7,over50:o.over50+1};
  const checks={p95:d.p95<=limits.p95,worst:d.worst<=limits.worst,over50:d.over50<=limits.over50,probeP99:d.probeP99<=PROBE_LIMITS.p99,probeMax:d.probeMax<=PROBE_LIMITS.max,no20msProbeBlock:d.probeBlocks20===0};
  return {source:SOURCE,measuredUnderLoad,status:Object.values(checks).every(Boolean)?'PASS':'FAIL',raw,limits,probeLimits:PROBE_LIMITS,checks};
}
module.exports={analyse,PROBE_LIMITS};
