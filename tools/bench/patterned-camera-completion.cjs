// Complete camera easing at full numeric precision before the existing fingerprint window.
async function completeCamera(step, snapshot, limits = {}) {
  const max = limits.max ?? 2048, k = limits.k ?? 8;
  let previous, previousState, count = 0, lastDifference;
  for (let renders = 1; renders <= max; renders++) {
    await step();
    const state = snapshot(), serial = JSON.stringify(state);
    if(previousState){const index=state.findIndex((n,i)=>!Object.is(n,previousState[i]));if(index>=0)lastDifference={index,before:previousState,after:state};}
    if (state.some(n => !Number.isFinite(n))) throw Error('Non-finite camera completion state');
    count = serial === previous ? count + 1 : 1; previous = serial;previousState=state;
    if (count >= k) return { renders, consecutive: count, state, precision: 'raw-number-exact' };
  }
  const error=Error('Camera easing did not complete at full precision within' + max + ' renders');error.cameraDifference=lastDifference;throw error;
}
module.exports = { completeCamera };
