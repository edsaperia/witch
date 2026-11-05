// Disconnected proposal only: not imported by driver.cjs or run.cjs. No execution on import.
// After exact served/GPU gates and witch.ready, evaluate this once on fox/424242/lakelook=water.
function requestCoast(w) {
  if (!w?.ready) throw Error('Fixture requires completed startup');
  const c=w.coastFacing(0);
  if (!c || ![c.x,c.z].every(Number.isFinite)) throw Error('No exact east-facing coast; stop without substitution');
  const shot=w.shot(`at:${c.x},${c.z}`);
  if (!shot?.ok) throw Error('Coast placement refused');
  w.frame({moveX:0,moveZ:0,toggleMode:false,zoom:0},0,true);
  if (w.view.ground.coastReadiness.requested!==true) throw Error('Natural coast demand absent');
  return {bearing:0,x:c.x,z:c.z,requested:true};
}
module.exports={requestCoast};
