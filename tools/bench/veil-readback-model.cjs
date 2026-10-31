// Fixed PR1558#6547506171 acceptance for a future allocated three-arm smoke-veil run.
// Pure analysis only; importing this module starts no browser or measurement.
const SOURCE='1558#6547506171';
function percentile(values,p){const a=[...values].sort((a,b)=>a-b);return a[Math.ceil(a.length*p)-1];}
function analyse(arms){
  const reasons=[],raw={};let fixture;
  for(const mode of ['default','three','off']){
    const arm=arms.find(a=>a.mode===mode);
    if(!arm||!arm.frames?.length){reasons.push(mode+': missing frames');continue;}
    if(arms.filter(a=>a.mode===mode).length!==1)reasons.push(mode+': duplicate arm');
    if(!arm.fixtureKey||fixture&&arm.fixtureKey!==fixture)reasons.push(mode+': fixture/seed/route mismatch');
    fixture??=arm.fixtureKey;
    if(!arm.cpu?.length||arm.cpu.some(n=>!Number.isFinite(n)||n<0||n>=70))reasons.push(mode+': missing/contaminated CPU');
    if(!arm.quietProofs?.length||arm.quietProofs.some(p=>!p.at||!Number.isFinite(p.idleMs)||p.idleMs<300000||p.externalBrowserCount!==0||p.method!=='complete-process-inventory/no-external-browser'))reasons.push(mode+': missing idle/no-game-tab proof');
    if(arm.frames.some(f=>!Number.isFinite(f.intervalMs)||f.intervalMs<=0||!Number.isFinite(f.probeMs)||f.probeMs<0)){reasons.push(mode+': invalid frame telemetry');continue;}
    const total=arm.frames.reduce((n,f)=>n+f.intervalMs,0),covered=arm.frames.reduce((n,f)=>n+(f.activeProbe&&f.smokeDrawn?f.intervalMs:0),0);
    const intervals=arm.frames.map(f=>f.intervalMs);
    raw[mode]={p95:percentile(intervals,.95),worst:Math.max(...intervals),over50:intervals.filter(n=>n>50).length,probeStalls:arm.frames.filter(f=>f.intervalMs>50&&f.probeMs>=30).length,smokeProbeWindowShare:covered/total,frames:intervals.length};
    if(covered/total<.8)reasons.push(mode+': active probe and smoke below80% of measured window');
  }
  if(reasons.length)return {source:SOURCE,status:'INCONCLUSIVE',reasons,raw};
  const d=raw.default,t=raw.three,o=raw.off;
  if(t.probeStalls<3&&t.p95<d.p95+10)return {source:SOURCE,status:'INCONCLUSIVE',reasons:['stall not reproduced'],raw};
  const limits={p95:o.p95+Math.max(2,.05*o.p95),worst:o.worst+16.7,over50:o.over50+1};
  const checks={p95:d.p95<=limits.p95,worst:d.worst<=limits.worst,over50:d.over50<=limits.over50};
  return {source:SOURCE,status:Object.values(checks).every(Boolean)?'PASS':'FAIL',raw,limits,checks};
}
module.exports={analyse};
