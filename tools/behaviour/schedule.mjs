// Ed, 2026-11-02: scheduled reports skip a prototype commit over 24 hours old; manual dispatch always runs.
export function shouldRunReport(eventName, committedAt, now=Date.now()) {
  if(eventName!=='schedule')return true;
  const stamp=Date.parse(committedAt);
  // Missing/bad metadata must not silently suppress reporting; let source/execution errors stay visible.
  return !Number.isFinite(stamp)||now-stamp<=24*60*60*1000;
}
