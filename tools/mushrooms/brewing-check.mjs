// Render the actual kitchen canvases in four brewing states; no game boot or mock drawing.
import { build } from 'esbuild';
import { mkdir } from 'node:fs/promises';
import { openBrowser } from '../../art/headless.mjs';
const result = await build({ stdin: { resolveDir: process.cwd(), contents: `
import { BrewingView } from './src/render/brewing';
import { kitchenPlan, emptyBaskets } from './src/rules/mushrooms';
import { TUNING } from './src/rules/tuning';
const layout = kitchenPlan();
const body = {x:layout.baskets[4].x,z:layout.baskets[4].z,perch:true,mode:'ground',seated:false};
const state = {patches:[],baskets:emptyBaskets(),carried:{},flights:[],puffs:[],plops:[],ingredients:[],smoke:null,affected:{},trips:{},nextUnload:{},serial:0};
layout.baskets.forEach((b,i)=>state.baskets[b.type]=[0,1,5,6,15,16,30,3,8][i]);
const game = {witch:body,witches:[{id:0,body}],mushrooms:state,herTime:3,map:{treehouse:{x:0,z:0}},tuning:TUNING};
const view = {game,mpp:.125};
window.results=[];
for(const [title,recipe,smoke] of [['Empty',[],false],['One mushroom',['green'],false],['Two mushrooms',['blue','pink'],false],['Potion smoke',['blue','pink','orange'],true]]) {
 state.ingredients=recipe;state.smoke=smoke?{at:0,until:8,recipe}:null;
 const art=new BrewingView(); art.update(view,(x,z,dx,dy)=>({x:x+dx,y:-dy,z}),.6);
 const canvas=document.createElement('canvas');canvas.width=192;canvas.height=200;
 const c=canvas.getContext('2d');c.imageSmoothingEnabled=false;c.fillStyle='#30251f';c.fillRect(0,0,192,200);
 for(const child of art.group.children){
   if(child.material.blending===5){
     const layer=document.createElement('canvas');layer.width=192;layer.height=200;
     const lc=layer.getContext('2d');lc.drawImage(child.material.map.image,0,0,192,200);
     const src=lc.getImageData(0,0,192,200),dst=c.getImageData(0,0,192,200);
     for(let i=0;i<src.data.length;i+=4)for(let j=0;j<3;j++)dst.data[i+j]=Math.max(0,dst.data[i+j]-src.data[i+j]*src.data[i+3]/255);
     c.putImageData(dst,0,0);
   }else c.drawImage(child.material.map.image,0,0,192,200);
 }
 const card=document.createElement('div');card.append(document.createTextNode(title),canvas);document.body.append(card);
 window.results.push(canvas.toDataURL());art.dispose();
}
`, loader: 'ts' }, bundle: true, format: 'iife', write: false, logLevel: 'silent' });
await mkdir('previews/mushrooms', { recursive: true });
const b = await openBrowser();
try {
  await b.page.setContent('<body><style>body{background:#17191c;color:#eee;font:16px system-ui;display:flex;gap:12px}canvas{display:block;width:384px;height:400px;image-rendering:pixelated}</style><script>' + result.outputFiles[0].text.replace(/<\/script/gi, '<\\/script') + '</script>');
  await b.page.setViewportSize({ width: 1600, height: 460 });
  if (b.errors.length) throw new Error(b.errors.join('\n'));
  if (await b.page.evaluate(() => new Set(window.results).size) !== 4) throw new Error('Cauldron states must look different');
  await b.page.screenshot({ path: 'previews/mushrooms/brewing-states.png' });
  console.log('Actual kitchen artwork rendered in four distinct states without errors.');
} finally { await b.close(); }
