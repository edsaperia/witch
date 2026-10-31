// Bounded offline witch-only sprite bake; no canvas, browser or GPU. The caller imposes a 15s process limit.
import fs from 'node:fs';
import {witchSprite,witchColours} from '../../art/witch.js';
import {bake} from '../../art/core.js';
import {genomeLook} from '../../art/witchGenome.js';
import {defaultStyle} from '../../art/generator.js';
const input=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const raw=JSON.parse(fs.readFileSync(new URL('../../config/style.json',import.meta.url),'utf8')),style={...defaultStyle(),...(raw.style??raw)};
style.artStyle='bold';
const {look,outfit}=genomeLook(input.look),colours=witchColours(style,outfit,{styleHues:false}),mpp=1/(input.artPixelsPerMetre*(2/input.pixelSize));
const makeCanvas=(w,h)=>{const canvas={width:w,height:h,data:new Uint8ClampedArray(w*h*4),getContext:()=>({createImageData:(w,h)=>({data:new Uint8ClampedArray(w*h*4)}),getImageData:()=>({data:canvas.data}),putImageData:image=>{canvas.data=image.data;}})};return canvas;};
const started=performance.now(),frames=[];
for(const frame of [0,1]){
 const sprite=witchSprite(style,{pose:'stargaze',frame,look}),ground=sprite.anchors?.ground;
 if(!ground)throw Error('Baked ground anchor missing');
 const pixels=bake(sprite,colours,style,style.cOutline,makeCanvas).A.data;
 let lowest=-1;for(let y=0;y<sprite.h;y++)for(let x=0;x<sprite.w;x++)if(pixels[(y*sprite.w+x)*4+3])lowest=Math.max(lowest,y);
 const contacts=[];for(let x=0;x<sprite.w;x++)if(pixels[(lowest*sprite.w+x)*4+3])contacts.push({x:x+.5,y:lowest+.5,dxArtMetres:(x+.5-ground[0])*mpp,upArtMetres:(ground[1]-lowest-.5)*mpp});
 frames.push({frame,width:sprite.w,height:sprite.h,scale:sprite.scale,ground,shadow:sprite.anchors.shadow,mpp,lowestOpaqueRow:lowest,contacts});
}
console.log(JSON.stringify({source:'actual offline witchSprite plus bold palette/outline bake using byte-array canvas adapter; no atlas/GPU',elapsedMs:performance.now()-started,frames},null,2));
