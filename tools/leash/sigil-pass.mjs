// Review-only sheets: no browser and no changes to the live glyph set.
// node tools/leash/sigil-pass.mjs [out-dir]
// Windows/System.Drawing. 16/18/20/27 are nominal glyph widths, not guaranteed
// screen measurements (camera zoom and projection change those). Pointer is the
// actual direct 17px raster; stack references shrink the 24px atlas glyph.
// Crown rows test negative space; they do not reproduce the complete 32px atlas.
// The last column is a 44px monoline mask reference: the Art Lab bestiary uses
// sigilSVG(size:44), with a near-white core and glow not simulated here.
// Review CSV scores: 1 weak, 2 usable with context, 3 clear. Subjective art review,
// not recognition-test measurements. Ed's 2026-10-29 direction: distinctive parts,
// unicorn horn only and paw prints. All options remain isolated from game imports.
import { BOLD, boldGlyph, crownGlyph, sigilGlyph } from '../../art/sigils.js';
import { mkdirSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { candidates } from './sigil-pass-candidates.mjs';

const out = resolve(process.argv[2] ?? 'previews/sigil-pass');
mkdirSync(out, { recursive: true });
const ids = Object.keys(BOLD);
function cell(id, label = id) {
  const row = [];
  for (const n of [16, 18, 20, 27, 17, 24, 44]) {
    const b = boldGlyph(id, 24), m = [];
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++)
      m.push(b.m[Math.floor((y + .5) * 24 / n) * 24 + Math.floor((x + .5) * 24 / n)]);
    const direct = n === 17 ? boldGlyph(id,n) : null;
    const c = crownGlyph(Math.round(n*2/3));
    row.push({ ...(direct ? { ...direct, m: [...direct.m] } : { w: n, h: n, m }), crown: { ...c, m: [...c.m] } });
  }
  const thin = sigilGlyph(id,44);
  row.push({ ...thin, h: thin.w, m: [...thin.m], crown: null });
  return { id: label, row };
}
const sheets = [];
for (let i = 0; i < ids.length; i += 16) sheets.push({ name: `review-${1+i/16}`, cells: ids.slice(i,i+16).map(id => cell(id)) });
const options = [];
for (const [id, strokes] of Object.entries(candidates)) {
  options.push(cell(id, `${id} LIVE`));
  const live = BOLD[id];
  BOLD[id] = strokes;
  options.push(cell(id, `${id} OPTION`));
  BOLD[id] = live;
}
for (let i = 0; i < options.length; i += 10) sheets.push({ name: `options-${1+i/10}`, cells: options.slice(i,i+10) });
writeFileSync(resolve(out, 'masks.json'), JSON.stringify({ sheets, crown: { ...crownGlyph(), m: [...crownGlyph().m] } }));
// System.Drawing only paints the already-rasterised masks, never resamples them.
execFileSync('powershell.exe', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', resolve('tools/leash/sigil-pass.ps1'), out], { stdio: 'inherit' });
