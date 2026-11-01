const {test}=require('node:test'),assert=require('node:assert/strict');
const {depthCoverage}=require('./depth-coverage.cjs');
const fixture=require('./fixtures/depth-coverage-c680-crossing1.json');
const value=bits=>{const b=Buffer.alloc(4);b.writeUInt32LE(bits);return b.readFloatLE();};
function frames(){const a={width:fixture.width,height:fixture.height,canvasRect:fixture.canvasRect,devicePixelRatio:fixture.devicePixelRatio,bits:Array(320*180).fill(0x3f800000)},b={...a,bits:[...a.bits]};for(const c of fixture.cells){a.bits[c.y*320+c.x]=c.offBits;b.bits[c.y*320+c.x]=c.absentBits;}a.values=a.bits.map(value);b.values=b.bits.map(value);return[a,b];}
test('real c680 depth bits exclude all9 color-contrast halo pixels without changing contrast24',()=>{
 const [a,b]=frames(),{base,mask}=depthCoverage(a,b,960,540);
 for(let y=254;y<=256;y++)for(let x=495;x<=497;x++)assert.equal(mask[y*960+x],0);
 assert.equal(Math.max(...fixture.offRGBA.map((v,c)=>Math.abs(v-fixture.absentRGBA[c]))),25);
 assert.equal(base[256*960+489],1); // actual front-depth cell163,94
 assert.equal(mask[256*960+492],1); // one screen pixel beyond its3px raster footprint
 assert.equal(mask[256*960+493],0); // never dilate by one low-res cell (three screenshot pixels)
});
test('equal or farther depth does not create actor front coverage; malformed map rejected',()=>{
 const [a,b]=frames();for(const c of fixture.cells)a.bits[c.y*320+c.x]=b.bits[c.y*320+c.x];a.values=a.bits.map(value);
 assert.equal(depthCoverage(a,b,960,540).mask.some(Boolean),false);
 assert.throws(()=>depthCoverage({...a,width:1},b,960,540),/Incompatible/);
});
