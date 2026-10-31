// Record the seed-123 wild stump's art, shader gate, instance counts and visible pixels in the allocated capture session.
//   node tools/shot/playtest-render.cjs <served-url> <expected-sha> <output-dir> stumps
const fs = require('node:fs'), path = require('node:path');

exports.capture = async function capture(page, out) {
  await page.evaluate(() => {
    const w = window.witch, g = w.game;
    w.manual = true;
    w.view.render(g.clock.time,true);
    const marker = w.view.markerCache.list.find(m => m.key !== g.map.centreCell.join(',') &&
      g.map.playable(...m.cell) && !g.party.areas.has(m.key) && !g.party.ruined?.has(m.key));
    if (!marker) throw Error('Seed 123 has no wild stump in the marker list');
    window.stumpFixture = marker;
    g.tuning.groundCover.budgetMs = Infinity;
    const at = w.shot('at:' + marker.x + ',' + (marker.z + 7));
    if (!at.ok) throw Error(at.say);
  });
  const records = [];
  async function frame(label) {
    const record = await page.evaluate(() => {
      const {game:g,view:v} = window.witch, m = window.stumpFixture;
      v.render(g.clock.time,true); v.renderer.getContext().finish();
      const descriptor = v.markerArt.stump(m.cell);
      const spec = descriptor?.spec;
      const id = spec && [spec.species,spec.area ?? '',spec.seed,spec.yaw.toFixed(3),spec.biome ?? ''].join(':') +
        (spec.irregular ? ':i'+spec.irregular : '');
      const batch = v.island.stumpBatches.get(id);
      return { cell:m.key, distance:Math.hypot(g.witch.x-m.x,g.witch.z-m.z), pos:[m.x,m.z],
        screen:v.screenOf(m.x,0,m.z), enabled:g.tuning.runeMarkers.stump?.on, specId:id,
        artArrived:v.assets.stumps.has(id), pendingAssets:v.assets.pending,
        batchCount:v.island.stumpBatches.size, targetInstances:batch?.count ?? 0,
        meshes:batch?.meshes.map(mesh=>({name:mesh.name,visible:mesh.visible,layers:mesh.layers.mask})) ?? [],
        shaderGate:{active:v.shaderDrawStatus.active, skipped:v.shaderDrawStatus.skipped,
          submitted:v.shaderDrawStatus.submitted, fallback:v.shaderDrawStatus.fallback} };
    });
    records.push({label,...record});
    fs.writeFileSync(path.join(out,'stump-trace.json'),JSON.stringify(records,null,2));
    await page.screenshot({path:path.join(out,label+'.png'),timeout:20000});
  }
  await frame('stump-arrival');
  await page.evaluate(() => window.witch.view.assets.whenIdle());
  await frame('stump-settled');
  // Identical pose with only the stump meshes suppressed; compare this against the settled image.
  await page.evaluate(() => {
    const v=window.witch.view;
    window.stumpLayers=[];
    for (const batch of v.island.stumpBatches.values()) for(const mesh of batch.meshes) {
      window.stumpLayers.push([mesh,mesh.layers.mask]); mesh.layers.disableAll();
    }
  });
  await frame('stump-hidden-control');
  await page.evaluate(() => { for(const [mesh,mask] of window.stumpLayers) mesh.layers.mask=mask; });
  await frame('stump-restored');
  // Clear the fixture by inviting its fighters, then view it on the cut and beyond the column range.
  await page.evaluate(() => {
    const g=window.witch.game, m=window.stumpFixture;
    for(const c of g.creatures) if(c.cell.join(',')===m.key && !c.boss && c.level>0) {
      c.state='happy'; c.friendly=true; c.enraged=false;
    }
  });
  for(const [label,distance] of [['stump-clear-near',0],['stump-clear-far',105]]) {
    await page.evaluate(d=>{
      const w=window.witch, m=window.stumpFixture;
      const result=w.shot('at:'+m.x+','+(m.z+d)+(d?',treetop':''));
      if(!result.ok) throw Error(result.say);
    },distance);
    await frame(label);
  }
};
