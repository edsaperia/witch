// Driver-only blink readiness boundary: preserve the actual post-blink clocks and spell phase.
async function settleBlinkFixture(blink, settle, snapshot) {
  const blinkState=await blink(),before=await snapshot();
  const readiness=await settle(),after=await snapshot();
  const phases=before.geometry?.ringPhases;
  if(JSON.stringify(before.clocks)!==JSON.stringify(after.clocks)||before.blinkAt!==after.blinkAt||
    (phases?.length&&JSON.stringify(phases)!==JSON.stringify(after.geometry?.ringPhases)))
    throw Error('Post-blink settle changed clocks or spell phase');
  return {blinkState,postBlink:{clocks:after.clocks,blinkAt:after.blinkAt,readiness,geometry:after.geometry}};
}
module.exports={settleBlinkFixture};
