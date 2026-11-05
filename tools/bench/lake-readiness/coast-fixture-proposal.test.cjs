const {test}=require('node:test'),assert=require('node:assert/strict');
const {requestCoast}=require('./coast-fixture-proposal.cjs');
const {classifyGround}=require('./contract.cjs');
test('proposal requests an exact coast through existing shot/frame hooks, with zero simulated time',()=>{
  const calls=[],w={ready:true,coastFacing:b=>(calls.push(['bearing',b]),{x:42,z:19}),shot:s=>(calls.push(['shot',s]),{ok:true}),
    view:{ground:{coastReadiness:{requested:false}}},frame:(c,dt,draw)=>{calls.push(['frame',c,dt,draw]);w.view.ground.coastReadiness.requested=true;}};
  assert.deepEqual(requestCoast(w),{bearing:0,x:42,z:19,requested:true});
  assert.equal(calls[1][1],'at:42,19');assert.equal(calls[2][2],0);assert.equal(calls[2][3],true);
});
test('proposal stops on unavailable coast, startup, placement or natural demand; never chooses another fixture',()=>{
  assert.throws(()=>requestCoast({ready:false}),/startup/);
  assert.throws(()=>requestCoast({ready:true,coastFacing:()=>null}),/substitution/);
  assert.throws(()=>requestCoast({ready:true,coastFacing:()=>({x:1,z:2}),shot:()=>({ok:false})}),/refused/);
  assert.throws(()=>requestCoast({ready:true,coastFacing:()=>({x:1,z:2}),shot:()=>({ok:true}),frame:()=>{},view:{ground:{coastReadiness:{requested:false}}}}),/demand absent/);
});
test('existing classifier recognizes beach fragment after the pinned source main-function transformation',()=>{
  const kinds=['WATER','ICE','LAVA','OASIS','SINKHOLE','TARN','TAR','RUST','LILY'];
  const source=['#define GROUND_LAKES','#define GROUND_BEACH',...kinds.map(k=>'#define GROUND_LAKE_'+k),'uniform sampler2D uLand;','void main() { }'].join('\n');
  const beach=source.replaceAll('void main() {','uniform float uCoastAppear;\nvoid main() {\n if (uCoastAppear < 0.999) discard;');
  const result=classifyGround(beach);assert.equal(result.family,'lakes');assert.equal(result.beach,true);
  assert.ok(kinds.every(k=>result.defines.includes('GROUND_LAKE_'+k)));
});
