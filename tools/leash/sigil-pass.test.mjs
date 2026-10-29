import { test } from 'node:test';
import assert from 'node:assert/strict';
import { BOLD, boldGlyph, crownGlyph } from '../../art/sigils.js';
import { readFileSync } from 'node:fs';
import { candidates } from './sigil-pass-candidates.mjs';

test('review candidates remain within the live grid ink and stroke limits', () => {
  for (const [id, strokes] of Object.entries(candidates)) {
    const live = BOLD[id];
    try {
      BOLD[id] = strokes;
      const { m, w: n } = boldGlyph(id,24);
      let ink=0, thin=0, x0=n, y0=n, x1=-1, y1=-1;
      const on=(x,y)=>x>=0&&y>=0&&x<n&&y<n&&m[y*n+x];
      for(let y=0;y<n;y++) for(let x=0;x<n;x++) if(on(x,y)) {
        ink++; x0=Math.min(x0,x); x1=Math.max(x1,x); y0=Math.min(y0,y); y1=Math.max(y1,y);
        if(!(on(x-1,y)||on(x+1,y))||!(on(x,y-1)||on(x,y+1))) thin++;
      }
      assert.ok(x1-x0+1>=16&&y1-y0+1>=16,`${id}: extent`);
      assert.ok(ink/576>.1&&ink/576<.5,`${id}: ink ${ink}`);
      assert.ok(thin/ink<.08,`${id}: thin ${thin/ink}`);
      for(const size of [16,17,18,20,27,44]) assert.equal(boldGlyph(id,size).m.length,size*size);
    } finally { BOLD[id]=live; }
  }
});

const difference=(a,b)=>{
  let both=0,either=0;
  for(let i=0;i<a.length;i++){both+=!!(a[i]&&b[i]);either+=!!(a[i]||b[i]);}
  return 1-both/either;
};
const shrink=(g,n)=>Uint8Array.from({length:n*n},(_,i)=>g.m[Math.floor((Math.floor(i/n)+.5)*g.w/n)*g.w+Math.floor((i%n+.5)*g.w/n)]);
test('approved squirrel stays apart from snail at each nominal rank and pointer size',()=>{
  for(const n of [16,18,20,27,14,15,17,23]){
    const atlas=difference(shrink(boldGlyph('squirrel'),n),shrink(boldGlyph('snail'),n));
    const direct=difference(boldGlyph('squirrel',n).m,boldGlyph('snail',n).m);
    console.log(`squirrel/snail ${n}px: atlas=${atlas.toFixed(6)} direct=${direct.toFixed(6)}`);
    assert.ok(atlas>1/3&&direct>1/3,`${n}px squirrel/snail`);
  }
});
test('approved horn differs from the actual dropped-hat pointer mask',()=>{
  // Read HAT rather than copying it: the test follows the pointer's current data.
  const source=readFileSync(new URL('../../src/render/indicator.ts',import.meta.url),'utf8');
  const rows=[...source.match(/export const HAT = \[([\s\S]*?)\];/)[1].matchAll(/"([.#+]+)"/g)].map(m=>m[1]);
  for(const n of [14,15,17,23]){
    const h=Math.round(n*rows.length/rows[0].length), y0=Math.floor((n-h)/2);
    const hat=Uint8Array.from({length:n*n},(_,i)=>{
      const y=Math.floor(i/n)-y0,x=i%n;
      return y>=0&&y<h&&rows[Math.floor((y+.5)*rows.length/h)][Math.floor((x+.5)*rows[0].length/n)]!=='.'?1:0;
    });
    const d=difference(boldGlyph('unicorn',n).m,hat);
    console.log(`horn/hat ${n}px: difference=${d.toFixed(6)}`);
    assert.ok(d>1/3,`${n}px horn/hat`);
  }
});
test('approved five keep the 24px glyph below the shared crown in its 32px atlas slot',()=>{
  const crown=crownGlyph();
  assert.ok(crown.h<8&&crown.w<=32);
  for(const id of ['polarbear','unicorn','beaver','wolf','squirrel']){
    const g=boldGlyph(id);
    assert.equal(g.w,24);
    assert.ok(8+g.h<=32,id);
    assert.deepEqual(BOLD[id],candidates[id],`${id}: exactly the approved option`);
  }
});
