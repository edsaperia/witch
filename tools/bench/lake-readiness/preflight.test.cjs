const {test}=require('node:test'),assert=require('node:assert/strict');
const c=require('./contract.cjs');
test('classifies actual ground #defines without treating inactive library branches as enabled',()=>{
  const base='uniform sampler2D uLand;\n#ifdef GROUND_LAKES\n#endif\n';
  assert.equal(c.classifyGround('void main(){}'),null);
  assert.deepEqual(c.classifyGround(base),{family:'no-lakes',beach:false,defines:[]});
  assert.deepEqual(c.classifyGround('#define GROUND_LAKES\n#define GROUND_BEACH\n#define GROUND_LAKE_WATER\n'+base),{family:'lakes',beach:true,defines:['GROUND_BEACH','GROUND_LAKES','GROUND_LAKE_WATER']});
});
test('rejects stale quiet, absent FREE, a newer live build or changed candidate head',()=>{
  const now=Date.now(),head='a'.repeat(40),a={pr:1855,prepHead:head,targetSha:c.TARGET.sha,targetVersion:c.TARGET.version,slot:'root-slot',priorFree:'https://github.com/edsaperia/witch/issues/1476#issuecomment-1',allocatedAt:new Date(now).toISOString(),expiresAt:new Date(now+300000).toISOString(),quiet:{at:new Date(now).toISOString(),idleMs:60000,edInUse:false}};
  c.allocation(a,head,now);
  for(const bad of [{...a,targetVersion:'v7527'},{...a,prepHead:'b'.repeat(40)},{...a,priorFree:''},{...a,quiet:{...a.quiet,at:new Date(now-16000).toISOString()}},{...a,quiet:{...a.quiet,edInUse:true}},{...a,expiresAt:new Date(now+100000).toISOString()}])assert.throws(()=>c.allocation(bad,head,now));
});
test('importing prepared driver and launcher does not launch a browser or a kernel job',()=>{
  assert.equal(typeof require('./driver.cjs').metadata,'function');
  assert.equal(typeof require('./run.cjs').main,'function');
  assert.equal(typeof require('./legacy-probe.cjs').bootProbe,'function');
});
test('reviewed runner pins include the kernel controller and all three dependencies',()=>{
  assert.equal(Object.keys(c.WATCHDOG).length,4);
  assert.equal(c.WATCHDOG['owned-run-watchdog.cjs'].slice(0,8),'ab76356e');
  assert.ok(c.WATCHDOG['owned-job-controller.ps1']);
});
test('metadata observer delegates submitted source/compile/link calls without changing them',()=>{
  const saved=[global.window,global.WebGLRenderingContext,global.WebGL2RenderingContext];
  const calls=[];
  function context(){return class {
    shaderSource(shader,text){calls.push(['source',shader,text]);return 'source-result';}
    attachShader(program,shader){calls.push(['attach',program,shader]);return 'attach-result';}
    compileShader(shader){calls.push(['compile',shader]);return 'compile-result';}
    linkProgram(program){calls.push(['link',program]);window.__intel.links.push({object:program});return 'link-result';}
  };}
  try {
    global.window={__intel:{links:[]}};global.WebGLRenderingContext=context();global.WebGL2RenderingContext=context();
    require('./driver.cjs').metadata(c.classifyGround);
    const gl=new WebGL2RenderingContext(),shader={},program={},source='#define GROUND_LAKES\nuniform sampler2D uLand;';
    assert.equal(gl.shaderSource(shader,source),'source-result');assert.equal(gl.compileShader(shader),'compile-result');
    assert.equal(gl.attachShader(program,shader),'attach-result');assert.equal(gl.linkProgram(program),'link-result');
    assert.deepEqual(calls.map(x=>x[0]),['source','compile','attach','link']);
    assert.equal(window.__intel.links[0].fragment,source);assert.equal(window.__intel.links[0].ground.family,'lakes');
    assert.ok(window.__intel.links[0].fragmentCompile.callMs>=0);
  } finally {[global.window,global.WebGLRenderingContext,global.WebGL2RenderingContext]=saved;}
});
test('validated allocation reaches the watchdog parent gate and driver, restoring parent values on success/failure',async()=>{
  const {runAllocated}=require('./run.cjs'),now=Date.now(),head='a'.repeat(40);
  const a={pr:1855,prepHead:head,targetSha:c.TARGET.sha,targetVersion:c.TARGET.version,slot:'authorized-slot',priorFree:'https://github.com/edsaperia/witch/issues/1476#issuecomment-1',allocatedAt:new Date(now).toISOString(),expiresAt:new Date(now+300000).toISOString(),quiet:{at:new Date(now).toISOString(),idleMs:60000,edInUse:false}};
  const keys=['INTEL_SLOT','PRECEDING_RELEASE'],original=keys.map(key=>process.env[key]);
  try {
    process.env.INTEL_SLOT='existing-slot';process.env.PRECEDING_RELEASE='existing-release';
    for(const fail of [false,true]) {
      const watchdog=async spec=>{
        assert.equal(process.env.INTEL_SLOT,a.slot);assert.equal(process.env.PRECEDING_RELEASE,a.priorFree);
        assert.deepEqual(spec.env,{OTHER:'retained',INTEL_SLOT:a.slot,PRECEDING_RELEASE:a.priorFree});
        await Promise.resolve();if(fail)throw Error('watchdog refused');return 'receipt';
      };
      if(fail)await assert.rejects(runAllocated(watchdog,{env:{OTHER:'retained'}},a,head,now),/watchdog refused/);
      else assert.equal(await runAllocated(watchdog,{env:{OTHER:'retained'}},a,head,now),'receipt');
      assert.equal(process.env.INTEL_SLOT,'existing-slot');assert.equal(process.env.PRECEDING_RELEASE,'existing-release');
    }
    let invoked=false;
    await assert.rejects(runAllocated(()=>{invoked=true;},{},{...a,targetVersion:'wrong'},head,now));
    assert.equal(invoked,false);assert.equal(process.env.INTEL_SLOT,'existing-slot');
  } finally {keys.forEach((key,i)=>{if(original[i]===undefined)delete process.env[key];else process.env[key]=original[i];});}
});
test('only an absent optional favicon gets the harness empty response; real icons and other misses are untouched',()=>{
  const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),{absentFavicon}=require('./driver.cjs');
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'lake-preflight-')),icon=path.join(root,'favicon.ico');
  try {
    assert.equal(absentFavicon(root,'/favicon.ico'),true);assert.equal(absentFavicon(root,'/missing.js'),false);
    fs.writeFileSync(icon,'fixture');assert.equal(absentFavicon(root,'/favicon.ico'),false);
  } finally {if(fs.existsSync(icon))fs.unlinkSync(icon);fs.rmdirSync(root);}
});
