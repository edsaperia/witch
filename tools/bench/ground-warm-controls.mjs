// Escape intentionally pauses OVER the chart. Use its normal Close control instead.
export const closeWarmChart = page => page.locator('#chart-overlay .close').click();
export async function waitWarmFunction(page, predicate, options) {
  // Freeze mirrors its frozen state in body.paused. MAP intentionally pauses the game clock,
  // so clock.paused alone is not a global-pause signal. Check before AND during every poll.
  const source = predicate.toString();
  return page.waitForFunction(({source})=>{
    if(document.body.classList.contains('paused'))throw Error('Ground warm probe entered global pause');
    return (0,eval)(`(${source})`)();
  },{source},options);
}
