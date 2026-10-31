// WebGL proof of the real subtractive halo shader, over lit grass and dark forest colour fields.
import { build } from 'esbuild';
import { mkdir } from 'node:fs/promises';
import { openBrowser } from '../../art/headless.mjs';
const result = await build({ stdin: { resolveDir: process.cwd(), loader: 'ts', contents: `
import * as THREE from 'three';
import { MushroomGlow } from './src/render/mushroomGlow';
import { SPRITE_UNIFORMS } from './src/render/sprites';
import { mushroomArt } from './src/render/mushroomArt';
import { defaultStyle } from './art/generator';
SPRITE_UNIFORMS.uRight.value.set(1,0,0);SPRITE_UNIFORMS.uUp.value.set(0,1,0);
window.checks=[];
for(const [name,base] of [['Grass','#63894b'],['Dark forest','#273e37']])for(const on of [false,true]){
 const scene=new THREE.Scene(),camera=new THREE.OrthographicCamera(-6,6,6,-4,.1,20);camera.position.set(0,1,10);camera.lookAt(0,1,0);
 const renderer=new THREE.WebGLRenderer({antialias:false,preserveDrawingBuffer:true});renderer.setSize(320,260);renderer.setClearColor(base);renderer.outputColorSpace=THREE.LinearSRGBColorSpace;
 const art=mushroomArt(defaultStyle(),'red',64), tex=new THREE.CanvasTexture(art.A);tex.magFilter=tex.minFilter=THREE.NearestFilter;
 const mushroom=new THREE.Mesh(new THREE.PlaneGeometry(art.w*.125,art.h*.125),new THREE.MeshBasicMaterial({map:tex,transparent:true,alphaTest:.5}));mushroom.position.set(0,art.h*.125/2,0.05);scene.add(mushroom);
 const halo=new MushroomGlow();halo.set([{x:0,z:0,h:art.h*.125*.65,radius:art.h*.125*1.05,type:'red'}]);halo.mesh.visible=on;scene.add(halo.mesh);
 renderer.render(scene,camera);const card=document.createElement('div');card.append(document.createTextNode(name+(on?' — subtractive':' — no halo')),renderer.domElement);document.body.append(card);
 const gl=renderer.getContext(),pixel=new Uint8Array(4);gl.readPixels(100,150,1,1,gl.RGBA,gl.UNSIGNED_BYTE,pixel);window.checks.push([...pixel]);
}
` }, bundle: true, format: 'iife', write: false, logLevel: 'silent', plugins: [{ name: 'art-overrides', setup(b) { b.onResolve({filter:/^virtual:art-overrides$/},()=>({path:'overrides',namespace:'empty'})); b.onLoad({filter:/.*/,namespace:'empty'},()=>({contents:'export default {}',loader:'js'})); } }] });
await mkdir('previews/mushrooms', { recursive: true });
const b = await openBrowser();
try {
  await b.page.setContent('<body><style>body{background:#17191c;color:#eee;font:14px system-ui;display:flex;gap:10px}canvas{display:block;image-rendering:pixelated}</style><script>'+result.outputFiles[0].text.replace(/<\/script/gi,'<\\/script')+'</script>');
  await b.page.setViewportSize({width:1340,height:300});
  if(b.errors.length)throw new Error(b.errors.join('\n'));
  const checks=await b.page.evaluate(()=>window.checks);
  for(let i=0;i<4;i+=2) {
    if(checks[i+1][0]>checks[i][0]||checks[i+1][1]>=checks[i][1]||checks[i+1][2]>=checks[i][2])throw new Error('Halo must subtract complementary colour: '+JSON.stringify(checks));
  }
  await b.page.screenshot({path:'previews/mushrooms/subtractive-glow.png'});
  console.log('WebGL halo removes complementary green/blue over grass and dark forest without adding red.');
}finally{await b.close();}
