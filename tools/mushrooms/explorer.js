import { defaultStyle, witchSprite, witchColours, bake } from '../../art/generator.js';
import { MUSHROOM_TYPES, BIOME_MUSHROOMS, MUSHROOM_RANGES, mushroomRanges, bakeMushroom } from '../../art/mushrooms.js';
import { shade } from '../../art/lighting.js';

const root = document.getElementById('mushroom-explorer'), grid = root.querySelector('[data-grid]');
const seed = root.querySelector('[data-seed]'), pixel = root.querySelector('[data-pixel]'), light = root.querySelector('[data-light]');
const mk = (w, h) => Object.assign(document.createElement('canvas'), { width: w, height: h });
const fields = {}, witchCache = new Map();
const preferredRanges = { height: [.5, 1], pointiness: [.5, .6], width: [.8, 1.6], cap: [.5, .65], bend: [-.04, .04], twist: [-.05, .05], lean: [-.1, .1], curl: [0, .25], stem: [.22, .35], spotCount: [5, 7], spotRadius: [.09, .1], spotVariation: [.45, .6], bigSpots: [.5, .5] };
let ranges = mushroomRanges(preferredRanges), pending = 0;
for (const [key, d] of Object.entries(MUSHROOM_RANGES)) {
  const row = document.createElement('div'), label = document.createElement('span');
  row.className = 'range-row'; label.textContent = d.label + (d.percent ? ' (%)' : ''); row.append(label);
  fields[key] = [0, 1].map(side => {
    const input = document.createElement('input'), factor = d.percent ? 100 : 1;
    input.type = 'number'; input.className = 'form-control'; input.min = d.limits[0] * factor; input.max = d.limits[1] * factor;
    input.step = d.percent ? '0.1' : '1'; input.setAttribute('aria-label', `${d.label} ${side ? 'maximum' : 'minimum'}`);
    input.dataset.range = key; input.dataset.side = side;
    input.addEventListener('change', () => {
      if (!input.value || !Number.isFinite(input.valueAsNumber)) { sync(); return; }
      const pair = ranges[key].slice(); pair[side] = input.valueAsNumber / factor;
      // Moving one endpoint past the other carries the other endpoint with it.
      if (side === 0 && pair[0] > pair[1]) pair[1] = pair[0];
      if (side === 1 && pair[1] < pair[0]) pair[0] = pair[1];
      ranges = mushroomRanges({ ...ranges, [key]: pair }); sync(); schedule();
    }); row.append(input); return input;
  });
  root.querySelector(key === 'height' || key === 'pointiness' ? '[data-main-ranges]' : '[data-extra-ranges]').append(row);
}
function sync() {
  for (const [key, inputs] of Object.entries(fields)) inputs.forEach((input, i) => {
    input.value = +(ranges[key][i] * (MUSHROOM_RANGES[key].percent ? 100 : 1)).toFixed(1);
  });
}
function restore(s) {
  const p = s?.privateContent || s; if (!p) return;
  seed.value = Number.isFinite(p.seed) ? p.seed : 64;
  pixel.value = [3, 4, 5].includes(p.pixel) ? p.pixel : 3;
  light.value = p.light === 'studio' ? 'studio' : 'night';
  try { ranges = mushroomRanges({ ...preferredRanges, ...p.ranges }); } catch { ranges = mushroomRanges(preferredRanges); }
  sync();
}
restore(window.openai?.widgetState); sync();

function litSprite(s, lighting) {
  const lit = mk(s.w, s.h), emission = mk(s.w, s.h);
  shade({ a: s.A.getContext('2d'), n: s.N.getContext('2d'), w: s.w, h: s.h }, lit, lighting, [], [0, 0, s.w, s.h]);
  const lc = lit.getContext('2d'), data = lc.getImageData(0, 0, s.w, s.h), mask = s.A.getContext('2d').getImageData(0, 0, s.w, s.h).data;
  const ec = emission.getContext('2d'), glow = ec.createImageData(s.w, s.h);
  for (let p = 0; p < data.data.length; p += 4) {
    data.data[p + 3] = mask[p + 3] ? 255 : 0;
    if (mask[p + 3] === 254) { glow.data.set(mask.slice(p, p + 3), p); glow.data[p + 3] = 255; }
  }
  lc.putImageData(data, 0, 0); ec.putImageData(glow, 0, 0);
  return { lit, emission };
}
function draw(save = false) {
  const value = Number(seed.value); seed.value = Number.isFinite(value) ? Math.trunc(value) : -5;
  const st = { ...defaultStyle(), pixel: +pixel.value }, night = light.value === 'night';
  if (!witchCache.has(st.pixel)) witchCache.set(st.pixel, bake(witchSprite(st, { pose: 'idle' }), witchColours(st), st, st.cOutline));
  const witch = witchCache.get(st.pixel), lighting = { ...st, ambient: night ? .20 : .65, ambientHue: .13, moon: night ? .48 : .8, moonHue: night ? .62 : .13, shafts: 0 };
  const groups = Object.keys(MUSHROOM_TYPES).map(type => ({ type, sprites: [witch, ...[0, 1, 2].map(i => bakeMushroom(st, { type, seed: +seed.value + i, ranges }))] }));
  // Trim empty horizontal bake padding in the layout, retaining one common art-pixel scale.
  for (const s of groups.flatMap(g => g.sprites)) {
    const a = s.A.getContext('2d').getImageData(0, 0, s.w, s.h).data;
    let left = s.w, right = 0;
    for (let y = 0; y < s.h; y++) for (let x = 0; x < s.w; x++) if (a[(y * s.w + x) * 4 + 3]) { left = Math.min(left, x); right = Math.max(right, x); }
    if (left === s.w) { left = 0; right = s.w - 1; }
    s.previewLeft = Math.max(0, left - 3); s.previewWidth = Math.min(s.w - s.previewLeft, right - s.previewLeft + 4);
  }
  const cell = Math.max(...groups.flatMap(g => g.sprites.map(s => s.previewWidth))) + 8;
  const height = Math.max(...groups.flatMap(g => g.sprites.map(s => s.h))) + 16;
  grid.replaceChildren(); let fitted = 0, requested = 0;
  for (const { type, sprites } of groups) {
    const box = document.createElement('div'), label = document.createElement('div'), canvas = mk(cell * 4 * 2, height * 2), c = canvas.getContext('2d');
    box.className = 'specimen'; label.className = 'text-small'; label.textContent = type + ' · ' + Object.entries(BIOME_MUSHROOMS).find(([, v]) => v === type)[0];
    canvas.setAttribute('role', 'img'); canvas.setAttribute('aria-label', `${type} mushrooms, seeds ${seed.value} to ${+seed.value + 2}, beside the witch at the same scale`);
    c.fillStyle = '#000'; c.fillRect(0, 0, canvas.width, canvas.height); c.imageSmoothingEnabled = false;
    sprites.forEach((s, i) => {
      const { lit, emission } = litSprite(s, lighting), x = Math.round(i * cell + (cell - s.previewWidth) / 2) * 2, y = (height - 8 - s.h) * 2;
      const paint = image => c.drawImage(image, s.previewLeft, 0, s.previewWidth, s.h, x, y, s.previewWidth * 2, s.h * 2);
      paint(lit);
      // Smooth light only: the physical spots stay crisp and separate on the native grid.
      if (i) {
        c.save(); c.globalCompositeOperation = 'screen';
        for (const [blur, alpha] of [[5, .85], [2, .75]]) { c.filter = `blur(${blur}px)`; c.globalAlpha = alpha; paint(emission); }
        c.restore(); fitted += s.spots.length; requested += s.genome.spotCount;
      }
    }); box.append(canvas, label); grid.append(box);
  }
  root.querySelector('[data-status]').textContent = `Seeds ${seed.value}, ${+seed.value + 1}, ${+seed.value + 2} · ${fitted}/${requested} spots fit with clear gaps · Witch at the same scale`;
  window.mushroomReady = true;
  if (save && window.openai?.setWidgetState) {
    const state = { seed: +seed.value, pixel: +pixel.value, light: light.value, ranges };
    window.openai.setWidgetState({ modelContent: state, privateContent: state }).catch(() => {});
  }
}
function schedule() { cancelAnimationFrame(pending); pending = requestAnimationFrame(() => draw(true)); }
root.querySelector('[data-copy]').addEventListener('click', async () => {
  const output = root.querySelector('[data-settings]'), status = root.querySelector('[data-copy-status]');
  output.value = JSON.stringify({ generator: 'witch-game-mushrooms', version: 3,
    seed: +seed.value, pixel: +pixel.value, light: light.value, background: 'black',
    rangeUnits: 'percent except spotCount',
    ranges: Object.fromEntries(Object.entries(ranges).map(([key, pair]) => [key,
      pair.map(n => +(n * (MUSHROOM_RANGES[key].percent ? 100 : 1)).toFixed(4))])) }, null, 2);
  root.querySelector('[data-export]').hidden = false;
  output.focus(); output.select();
  try {
    await navigator.clipboard.writeText(output.value);
    status.textContent = 'Copied — paste these settings into the chat.';
  } catch {
    status.textContent = 'Settings selected — press Ctrl+C (or Command+C) to copy.';
  }
});
seed.addEventListener('change', schedule); pixel.addEventListener('change', schedule); light.addEventListener('change', schedule);
root.querySelector('[data-next]').addEventListener('click', () => { seed.value = +seed.value + 3; schedule(); });
window.addEventListener('openai:set_globals', e => { if (e.detail?.globals?.widgetState) { restore(e.detail.globals.widgetState); draw(); } });
draw();
