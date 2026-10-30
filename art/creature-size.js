import {witchSprite} from "./witch.js";
import {render} from "./model3d.js";
import {sizeTargetPixels} from "./genome/size-ranks.js";

const witchReferences=new Map();
export function standingWitchHeight(st) {
  const key=JSON.stringify([st.size,st.growth,st.pixel]);
  if(!witchReferences.has(key)){
    const sp=witchSprite(st,{pose:"stand"});let top=sp.h,bottom=-1;
    for(let y=0;y<sp.h;y++)for(let x=0;x<sp.w;x++)if(sp.m[y*sp.w+x]){top=Math.min(top,y);bottom=Math.max(bottom,y);}
    witchReferences.set(key,Math.max(1,bottom-top+1));
  }
  return witchReferences.get(key);
}

// One final-size model for every creature builder. Full projected allocation
// includes decorative extras; padding is included in the integer target, as in
// the sprite's on-screen rectangle. Pins cannot push it outside its age band.
export function creatureSizeOptions(model, options, S, level, st) {
  const target=sizeTargetPixels(S.id,level,standingWitchHeight(st));
  const unit=render(model,{...options,scale:1,measure:true,projected:true});
  // measure's integer dimensions would lose subpixel support, so use its span.
  const span=unit.projectedHeight;
  const scale=Math.max(1e-6,(target-2-1e-9)/Math.max(1e-6,span));
  return {...options,scale,sizeTarget:target,projected:true};
}

export function occupiedHeight(sp) {
  let top=sp.h,bottom=-1;
  for(let y=0;y<sp.h;y++)for(let x=0;x<sp.w;x++)if(sp.m[y*sp.w+x]){top=Math.min(top,y);bottom=Math.max(bottom,y);}
  return Math.max(0,bottom-top+1);
}
const fittedScales=new Map();
export function fitOccupiedCreature(model,options,S,level,st,decorate) {
  const key=JSON.stringify([S,level,st,model.parts,model.flats,options.facing]);
  const cached=fittedScales.get(key);
  if(cached!=null)return {options:{...options,scale:cached}};
  const atScale=model.atScale,parts=model.parts.slice(),flats=model.flats.slice(),partState=parts.map(p=>({...p})),part=model.part;
  const reset=()=>{model.parts=parts.slice();model.flats=flats.slice();model.part=part;for(let i=0;i<parts.length;i++)Object.assign(parts[i],partState[i]);model.atScale=atScale;};
  let scale=options.scale,lo=null,hi=null,best=null;
  for(let attempt=0;attempt<8;attempt++){
    reset();
    const sp=render(model,{...options,scale}).sp;decorate(sp);
    const height=occupiedHeight(sp),error=Math.abs(height-options.sizeTarget);
    if(!best||error<best.error)best={sp,scale,height,error};
    if(!error)break;
    if(height<options.sizeTarget)lo=scale;else hi=scale;
    scale=lo!=null&&hi!=null?(lo+hi)/2:scale*options.sizeTarget/Math.max(1,height);
  }
  if(fittedScales.size>=128)fittedScales.delete(fittedScales.keys().next().value);
  fittedScales.set(key,best.scale);
  reset();if(atScale){model.atScale=null;atScale(best.scale);}
  return {options:{...options,scale:best.scale},sp:best.sp};
}
