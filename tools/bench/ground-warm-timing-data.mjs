// Ground timing comparison: retain boundary-crossing wall frames and reject incomplete paired evidence.
export function frameWindow(frames,start,end) {
  if(!Number.isFinite(start)||!Number.isFinite(end)||end<=start)throw Error('Invalid frame window');
  const selected=frames.filter(f=>Number.isFinite(f.start)&&Number.isFinite(f.end)&&f.end>f.start&&f.end>start&&f.start<end);
  if(!selected.length||selected[0].start>start||selected.at(-1).end<end)throw Error('Incomplete frame window');
  for(let i=1;i<selected.length;i++)if(selected[i].start!==selected[i-1].end)throw Error('Frame window has a gap');
  const values=selected.map(f=>f.end-f.start).sort((a,b)=>a-b);
  return {start,end,count:values.length,worstMs:values.at(-1),p95Ms:values[Math.ceil(values.length*.95)-1]};
}
export function timingArm(state) {
  if(state.paused||state.error||!state.sailResolved)throw Error('Paused or failed sail');
  if(!state.draw?.boundProgramConfirmed||state.draw.afterCalls<=state.draw.beforeCalls)throw Error('Missing qualifying arrival draw');
  return {sail:frameWindow(state.frames,state.sailStart,state.draw.at),arrival:frameWindow(state.frames,state.draw.at,state.draw.at+2000)};
}
export function compareTiming(on,off,contaminated=false) {
  const noiseMs=Math.max(2,off.sail.p95Ms*.05);
  const arrivalDeltaMs=on.arrival.worstMs-off.arrival.worstMs,sailP95DeltaMs=on.sail.p95Ms-off.sail.p95Ms;
  return {status:contaminated?'INSUFFICIENT':arrivalDeltaMs<0&&sailP95DeltaMs<=noiseMs?'PASS':'FAIL',noiseMs,arrivalDeltaMs,sailP95DeltaMs,
    note:'Single ON-then-OFF pair; no cold driver-cache or general speed claim.'};
}
// Serialized into each isolated page; samples wall time, including a blocked first-arrival frame.
export function startSailTiming(target) {
  const state={frames:[],sailStart:null,draw:null,paused:false,sailResolved:false,done:false,error:null};
  window.__groundWarmTiming=state;
  let previous=performance.now();
  const tick=()=>{
    const now=performance.now();state.frames.push({start:previous,end:now});previous=now;
    state.paused ||= document.body.classList.contains('paused');
    const draw=window.__groundWarmArrival?.firstDraw;if(draw)state.draw=draw;
    if(state.draw&&now>=state.draw.at+2000){state.done=true;return;}
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(()=>{
    previous=performance.now();state.sailStart=previous;requestAnimationFrame(tick);
    window.witch.sail(target.id,target.seed).then(ok=>{if(!ok)state.error='Sail returned false';state.sailResolved=true;}).catch(e=>{state.error=String(e);state.sailResolved=true;});
  });
}
