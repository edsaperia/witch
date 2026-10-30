// Same live trace/browser: visit the coast after arrival, preserving the original arrival/settle result.
async function checkCoastFirstUse(page, durationMs = 10000) {
  const start = await page.evaluate(() => {
    const witch = window.witch;
    const point = [0, 90, 180, 270].map(deg => witch.coastFacing(deg * Math.PI / 180)).find(Boolean);
    if (!point) throw new Error('coast-first-use: no coast found');
    const at = performance.now();
    const arrival = performance.getEntriesByName('game:arrived').at(-1)?.startTime;
    if (!Number.isFinite(arrival) || at - arrival > 30000) throw new Error('coast-first-use: outside first30s after arrival');
    const shot = witch.shot(`at:${point.x - point.nx * 30},${point.z - point.nz * 30}`);
    if (!shot.ok) throw new Error(shot.say);
    return { at, afterArrivalMs: at - arrival, point, shot };
  });
  await page.waitForTimeout(durationMs);
  return page.evaluate(start => {
    const end = performance.now(), frames = window.__f || [], intervals = [];
    for (let i = 1; i < frames.length; i++) if (frames[i] >= start.at && frames[i - 1] <= end) intervals.push({ at: frames[i], from: frames[i - 1], ms: frames[i] - frames[i - 1] });
    const gaps = intervals.map(f => f.ms);
    const events = (window.__travelProbe?.trace.events || []).filter(e => e.kind === 'beach-shader' && e.at >= start.at);
    const activated = events.find(e => e.phase === 'coast-use');
    const around = activated ? intervals.filter(f => f.at >= activated.at - 500 && f.from <= activated.at + 1000).map(f => f.ms) : [];
    return { ...start, durationMs: end - start.at, longestFrameMs: Math.max(0, ...gaps), framesOver100ms: gaps.filter(x => x > 100),
      activated: !!activated, actualBeachMaterial: 'GROUND_BEACH' in (window.witch.view.ground.mesh.material.defines || {}), events,
      qualityRungs: [...new Set((window.__travelProbe?.trace.quality || []).filter(q => q.at >= start.at).map(q => q.rung))],
      transitionWindowNote: '500ms before to1000ms after coast-use; includes teleport, ground fill, beach art and driver work',
      transitionLongestFrameMs: activated ? Math.max(0, ...around) : null,
      transitionHasFrameOver100ms: activated ? around.some(x => x > 100) : null };
  }, start);
}
module.exports = { checkCoastFirstUse };
