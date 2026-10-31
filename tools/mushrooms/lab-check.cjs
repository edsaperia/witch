// Lightweight UI check: real generated mushroom art and pause routing, no game scene or shader validation.
const { chromium } = require('playwright');
const { build } = require('esbuild');
const assert = require('node:assert/strict');
(async () => {
  const bundle = await build({ stdin: { contents: `
    import { PotionLab } from './src/ui/potionLab';
    import { Freeze } from './src/platform/freeze';
    import { loadStyle } from './src/render/style';
    const game = {seed:64,clock:{time:100,paused:false},witches:[{id:0}],mushrooms:{trips:{},affected:{}}};
    const freeze = new Freeze(game,64,'lab-check'); freeze.quiet=true; freeze.toggle();
    const lab = new PotionLab(()=>game,loadStyle(),'lab-check',()=>freeze.toggle());
    freeze.ownsEsc=()=>!lab.on;
    Object.assign(window,{lab,freeze,game}); lab.show();
  `, resolveDir: process.cwd(), loader: 'ts' }, bundle: true, write: false, format: 'iife', logLevel: 'silent' });
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1100, height: 850 } });
    const errors = []; page.on('pageerror', e => errors.push(String(e)));
    await page.setContent('<!doctype html><html><head></head><body></body></html>');
    await page.evaluate(() => {
      window.padDown = false;
      Object.defineProperty(navigator,'getGamepads',{configurable:true,value:()=>[{buttons:Array.from({length:18},(_,i)=>({pressed:i===9&&window.padDown})),axes:[0,0,0,0]}]});
      Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>{window.copied=text;}}});
    });
    await page.addScriptTag({ content: bundle.outputFiles[0].text });
    assert.equal(await page.locator('#potion-lab tbody tr').count(),165);
    assert.equal(await page.locator('#potion-lab tbody img').count(),495);
    assert.equal(await page.locator('#potion-lab img').first().evaluate(img=>img.complete&&img.naturalWidth>0),true);
    await page.getByRole('button',{name:'Effect',exact:true}).click();
    const first = await page.locator('tbody tr').first().innerText();
    await page.getByRole('button',{name:'Effect ↑',exact:true}).click();
    assert.notEqual(await page.locator('tbody tr').first().innerText(),first);
    assert.equal(await page.evaluate(()=>document.activeElement.closest('th')!==null),true);
    await page.keyboard.press('Escape');
    assert.equal(await page.evaluate(()=>!lab.on&&freeze.frozen),true);
    await page.evaluate(()=>lab.show());
    await page.locator('#potion-lab input[type=number]').first().fill('0.5');
    await page.keyboard.press('Period');
    assert.equal(await page.evaluate(()=>game.clock.time),100);
    await page.locator('#potion-lab input[type=range]').first().evaluate(input=>{input.value='1';input.dispatchEvent(new Event('input',{bubbles:true}));});
    await page.getByRole('button',{name:'Copy all settings'}).click();
    const snapshot = JSON.parse(await page.evaluate(()=>window.copied));
    assert.equal(snapshot.seed,64); assert.ok(snapshot.recipe.id>0); assert.ok(snapshot.settings.effects['trip-indicator']);
    assert.equal(Object.values(snapshot.settings.effects[snapshot.recipe.effect])[0],1);
    await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw new Error('denied');}}}));
    await page.getByRole('button',{name:'Copy all settings'}).click();
    assert.equal(JSON.parse(await page.getByRole('textbox',{name:'Settings to copy'}).inputValue()).recipe.id,snapshot.recipe.id);
    await page.evaluate(()=>{window.padDown=true;freeze.pollPad();});
    assert.equal(await page.evaluate(()=>!lab.on&&freeze.frozen),true);
    await page.evaluate(()=>{window.padDown=false;freeze.pollPad();lab.show();});
    await page.getByRole('button',{name:'Try effect',exact:true}).click();
    assert.equal(await page.evaluate(()=>!lab.on&&!freeze.frozen&&game.mushrooms.trips[0].until===700),true);
    await page.evaluate(()=>{freeze.toggle();lab.show();});
    await page.getByRole('button',{name:'Stop current potion',exact:true}).click();
    assert.equal(await page.evaluate(()=>freeze.frozen&&!game.mushrooms.trips[0]),true);
    await page.locator('tbody tr').filter({has:page.getByRole('cell',{name:'Coming soon',exact:true})}).first().getByRole('button').click();
    assert.equal(await page.getByRole('button',{name:'Try effect',exact:true}).count(),0);
    assert.equal(await page.locator('#potion-lab input[type=range]').count(),4);
    await page.keyboard.press('Escape');
    assert.equal(await page.evaluate(()=>!lab.on&&freeze.frozen),true);
    assert.deepEqual(errors,[]);
    console.log('Potion lab: 165 rows, 495 mushroom sprites, sorting/focus, copy, pause keys, gamepad, try and stop passed.');
  } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exitCode=1;});
