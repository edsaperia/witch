// Fixed picture time needs a separate monotonically stepped probe-easing clock in capture only.
// This scopes/restores the existing update method; never forces a visibility answer or opacity.
async function withProbeClock(probes,startTime,run){
 const own=Object.prototype.hasOwnProperty.call(probes,'update'),original=probes.update;
 const ownTime=Object.prototype.hasOwnProperty.call(probes,'lastTime'),lastTime=probes.lastTime;
 const clock={time:startTime,steps:0};
 probes.update=function(){clock.steps++;clock.time=startTime+clock.steps/60;return original.call(this,clock.time);};
 try{return await run(clock);}finally{
  if(own)probes.update=original;else delete probes.update;
  if(typeof lastTime==='number'){if(ownTime)probes.lastTime=lastTime;else delete probes.lastTime;}
 }
}
module.exports={withProbeClock};
