// Exact a0a57eac camera.ts contract: a zero initial hill lift steps to max(0,need)*.35.
// Harness fixture only. Restore the original scalar before any scene transition.
async function snapCameraTarget(view, step) {
  const descriptor=Object.getOwnPropertyDescriptor(view,'camLift'),previous=view.camLift;
  if(!descriptor || !('value' in descriptor) || !descriptor.configurable)throw Error('Unexpected camera scalar contract');
  view.camLift=0;
  try { await step(); } catch(e) { Object.defineProperty(view,'camLift',descriptor);throw e; }
  const first=view.camLift,target=first>0?first/.35:0;
  if(!Number.isFinite(target)||target<0){Object.defineProperty(view,'camLift',descriptor);throw Error('Invalid camera target probe');}
  let lastProposal=target;
  Object.defineProperty(view,'camLift',{configurable:true,enumerable:descriptor.enumerable,get:()=>target,set:n=>{lastProposal=n;}});
  let restored=false;
  return { receipt:{previous,first,target,method:'zero-initial hill-clearance recurrence; positive step divided by0.35'},
    proposed:()=>lastProposal,
    restore(){if(!restored){restored=true;Object.defineProperty(view,'camLift',descriptor);}} };
}
module.exports={snapCameraTarget};
