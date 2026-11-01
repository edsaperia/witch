// Observe existing view build signals across three distinct rendered samples before pausing.
// Self-contained callback: Playwright serializes it into the page; no game hook or mutation.
function worldSettled() {
  const { view, game } = window.witch, grass = view.grass, art = view.assets.sets();
  const snapshot = {
    artVersion: view.assets.version, artPending: art.pending, artQueued: art.queued,
    pendingFloors: view.ground.pendingFloors.length, pendingGround: view.stats.pendingGround,
    forestMissing: view.stats.forestMissing, heightsReady: view.heightsReady,
    forestChunks: ['trees', 'bushes', 'lights', 'decor', 'relics'].map(key => game.forest[key].size),
    grassCells: grass.cells.size, grassHeld: [...grass.held.entries()], grassTop: grass.top,
    grassInstances: grass.geo.instanceCount, grassTufts: grass.stats.tufts,
    grassVersions: [grass.tuft, grass.uvA, grass.pxA, grass.open].map(attribute => attribute.version),
    grassPendingRanges: [grass.tuft, grass.uvA, grass.pxA, grass.open].map(attribute => attribute.updateRanges.length),
    grassBuildMs: grass.stats.buildMs,
  };
  const idle = art.pending === 0 && art.queued === 0 && snapshot.pendingFloors === 0 &&
    snapshot.pendingGround === 0 && snapshot.forestMissing === 0 && snapshot.heightsReady === true &&
    snapshot.grassBuildMs === 0 && snapshot.grassPendingRanges.every(count => count === 0);
  const frame = window.pauseProbe.draws, signature = JSON.stringify(snapshot), old = window.pauseWorldSettle;
  const consecutive = idle ? old?.signature === signature
    ? old.consecutive + (frame !== old.frame ? 1 : 0) : 1 : 0;
  window.pauseWorldSettle = { frame, signature, consecutive, snapshot };
  return consecutive >= 3 ? snapshot : false;
}
module.exports = { worldSettled };
