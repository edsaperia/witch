const {test}=require('node:test'),assert=require('node:assert/strict');
const {decodeDepthBits,neighbourhood,inspectDepthPoints}=require('./depth-readback.cjs');
test('keeps adjacent sampled float32 depths distinct instead of re-quantizing to DEPTH24',()=>{
 const bits=[0x3f7dc3ce,0x3f7dc3cf,0x3f7dc3d0],bytes=Buffer.alloc(12);bits.forEach((n,i)=>bytes.writeUInt32BE(n,i*4));
 const decoded=decodeDepthBits(bytes);assert.deepEqual(decoded.bits,bits);assert.equal(new Set(decoded.values).size,3);
 const padded=Buffer.concat([Buffer.from([0,0,0]),bytes]);assert.deepEqual(decodeDepthBits(padded.subarray(3)).bits,bits);
 assert.throws(()=>decodeDepthBits(Buffer.from([0xff,0xff,0xff,0xff])),/Invalid/);
});
test('maps screenshot samples through the actual canvas offset rather than assuming origin0',()=>{
 const f={width:2,height:2,canvasRect:{left:10,top:20,width:6,height:6},values:[.1,.2,.3,.4],bits:[1,2,3,4],sourceCells:[[0,0],[1,0],[0,1],[1,1]],states:[[.99,0,1,1.5]]};
 const p=inspectDepthPoints(f,[{x:10,y:20}])[0];assert.deepEqual(p.destination.cell,[0,1]);assert.deepEqual(p.displacement,[0,0]);assert.equal(p.destination.neighbours.length,9);
 assert.throws(()=>inspectDepthPoints(f,[{x:0,y:0}]),/outside/);
});
test('reports the complete clamped square including diagonals and original bit identity',()=>{
 const frame={width:3,height:3,values:Array.from({length:9},(_,i)=>i/10),bits:Array.from({length:9},(_,i)=>i)};
 assert.deepEqual(neighbourhood(frame,1,1).map(x=>x.bits),[0,1,2,3,4,5,6,7,8]);
 assert.equal(neighbourhood(frame,0,0).filter(x=>x.x===0&&x.y===0).length,4);
});
