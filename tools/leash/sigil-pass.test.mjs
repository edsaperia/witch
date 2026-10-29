import { test } from 'node:test';
import assert from 'node:assert/strict';
import { BOLD, boldGlyph } from '../../art/sigils.js';
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
