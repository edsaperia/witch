// Executed in the page: require a complete forest and a nonblank drawn canvas, not elapsed wall time.
function effectsScene(mode) {
  const w = window.witch, v = w?.view, s = v?.stats;
  if (!w?.ready || w.game.clock.paused || w.game.witch.mode !== mode || !v.islandDrawn()
    || v.assets.pending !== 0 || s.forestMissing !== 0 || s.pendingGround !== 0
    || s.trees <= 20 || s.batches < 1 || s.drawCalls <= 15) return false;
  const canvas = document.querySelector('canvas#game');
  if (!canvas?.width || !canvas.height) return false;
  const sample = document.createElement('canvas'); sample.width = 64; sample.height = 36;
  const ctx = sample.getContext('2d'); ctx.drawImage(canvas, 0, 0, 64, 36);
  const pixels = ctx.getImageData(0, 0, 64, 36).data, colours = new Set();
  // Same six-bit colour measure as quick.cjs: dark forest retains detail; a black frame has one colour.
  for (let i = 0; i < pixels.length; i += 4) colours.add((pixels[i] >> 2) * 4096 + (pixels[i + 1] >> 2) * 64 + (pixels[i + 2] >> 2));
  if (colours.size <= 40) return false;
  // Latch in this page task, before another RAF can replace the frame we just proved.
  w.manual = true;
  return { mode, colours: colours.size, trees: s.trees, batches: s.batches, drawCalls: s.drawCalls };
}
module.exports = { effectsScene };
