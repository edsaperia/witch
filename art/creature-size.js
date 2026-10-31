import {witchSprite} from "./witch.js";
import {render} from "./model3d.js";
import {sizeTargetPixels,SIZE_CLASSES,SIZE_CLASS_BY_ID} from "./genome/size-ranks.js";
import {rng,uni} from "./core.js";
import {candidateSizePixels} from "./genome/size-candidate.js";
export function sizePixelRange(id,level,witch,candidate=false){
 if(candidate){const target=candidateSizePixels(id,level,witch);return [target-1,target+1];}
 const target=sizeTargetPixels(id,level,witch);
 if(level===3)return [target,target+1]; // protects 1.75x even when the adult reaches its upper bound
 const band=[[.75,1.2],[1.1,1.5],[1.8,3]][level],rank=SIZE_CLASS_BY_ID[id];
 const lowerClass=rank>=2?sizeTargetPixels(SIZE_CLASSES[rank-2][0],level,witch)+1:0;
 return [Math.max(target-1,Math.round(witch*band[0]),lowerClass),Math.min(target,Math.round(witch*band[1]))];
}

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

// One final-size model for every creature builder. Projected support supplies
// an initial scale; the raster fit below targets occupied pixels, including
// decorative extras, rather than blank padding. Pins cannot exceed the band.
export function creatureSizeOptions(model, options, S, level, st) {
  const target=(st.creatureSizeCandidate===1?candidateSizePixels:sizeTargetPixels)(S.id,level,standingWitchHeight(st));
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
export function fitOccupiedCreature(model,options,S,level,st,decorate,measureOnly=false) {
  const stats={rasters:0,probes:0};
  const draw=(model,opts)=>{stats[opts.occupiedOnly?"probes":"rasters"]++;return render(model,opts);};
  const key=JSON.stringify([S,level,st,model.parts,model.flats,options.facing]);
  const cached=fittedScales.get(key);
  if(cached!=null)return {options:{...options,...cached},stats:{...stats,bodyHeight:cached.bodyHeight}};
  const atScale=model.atScale,parts=model.parts.slice(),flats=model.flats.slice(),partState=parts.map(p=>({...p})),part=model.part;
  const reset=()=>{model.parts=parts.slice();model.flats=flats.slice();model.part=part;for(let i=0;i<parts.length;i++)Object.assign(parts[i],partState[i]);model.atScale=atScale;};
  if(!(S.id==='snowleopard'&&S.sizes.motes?.[level])){
    const range=sizePixelRange(S.id,level,standingWitchHeight(st),st.creatureSizeCandidate===1);let scale=options.scale,lo=null,hi=null,best=null;
    const probePixels=(W,H)=>{
      const r=rng(S.plan==='owl'?31:S.id.length*(S.q?7919:131)),points=[];
      for(let i=0;i<(S.sizes.motes?.[level]??0);i++){
        const x=Math.floor(uni(r,2,W-2)),y=Math.floor(uni(r,2,H*.6));
        for(const[dx,dy]of[[0,0],[1,0],[-1,0],[0,1],[0,-1]])points.push([x+dx,y+dy]);
      }
      return points;
    };
    const probe=opts=>{const result=draw(model,{...opts,occupiedOnly:true,probePixels});decorate(result.sp);return occupiedHeight(result.sp);};
    for(let attempt=0;attempt<8;attempt++){
      reset();const height=probe({...options,scale}),error=Math.max(range[0]-height,height-range[1],0);
      if(!best||error<best.error)best={scale,height,error,samplePhaseY:0};if(!error)break;
      if(height<range[0])lo=scale;else hi=scale;
      scale=lo!=null&&hi!=null?(lo+hi)/2:scale*options.sizeTarget/Math.max(1,height);
    }
    if(best.error)for(const phase of[.125,.25,.375,.5,.625,.75,.875]){
      reset();const height=probe({...options,scale:best.scale,samplePhaseY:phase}),error=Math.max(range[0]-height,height-range[1],0);
      if(error<best.error)best={scale:best.scale,height,error,samplePhaseY:phase};if(!error)break;
    }
    if(best.error)for(const multiplier of[.99,1.01,.98,1.02]){
      reset();const candidate=best.scale*multiplier,height=probe({...options,scale:candidate,samplePhaseY:0}),error=Math.max(range[0]-height,height-range[1],0);
      if(error<best.error)best={scale:candidate,height,error,samplePhaseY:0};if(!error)break;
    }
    // Rig capture consumes scale/joints, never this whole-body sprite. The
    // same sparse fit already measured height; avoid a discarded native raster.
    if(measureOnly){reset();return {options:{...options,scale:best.scale,samplePhaseY:best.samplePhaseY},stats:{...stats,bodyHeight:best.height}};}
    reset();const sp=draw(model,{...options,scale:best.scale,samplePhaseY:best.samplePhaseY}).sp;decorate(sp);
    return {options:{...options,scale:best.scale,samplePhaseY:best.samplePhaseY},sprite:sp,stats};
  }
  const range=sizePixelRange(S.id,level,standingWitchHeight(st),st.creatureSizeCandidate===1),observations=[];
  let scale=options.scale,best=null,samplePhaseY=0;
  for(let attempt=0;attempt<3;attempt++){
    reset();
    const sp=draw(model,{...options,scale,samplePhaseY}).sp;decorate(sp);
    const height=occupiedHeight(sp),error=Math.max(range[0]-height,height-range[1],0);
    if(!best||error<best.error)best={scale,height,error,samplePhaseY,sp};
    observations.push({scale,height});
    if(!error)break;
    if(attempt===0)scale*= (options.sizeTarget-.5)/Math.max(1,height);
    else {
      const a=observations[0],b=observations[1],slope=(b.height-a.height)/(b.scale-a.scale);
      const candidate=Number.isFinite(slope)&&slope>0?scale+(options.sizeTarget-.5-height)/slope:scale*options.sizeTarget/Math.max(1,height);
      const damped=Math.abs(options.sizeTarget-height)<=2?scale+(candidate-scale)*.5:candidate;
      scale=Math.max(scale*.85,Math.min(scale*1.15,damped));samplePhaseY=range[0]===range[1]?.125:0;
    }
  }
  if(fittedScales.size>=128)fittedScales.delete(fittedScales.keys().next().value);
  fittedScales.set(key,{scale:best.scale,samplePhaseY:best.samplePhaseY,bodyHeight:best.height});
  reset();if(atScale){model.atScale=null;atScale(best.scale);}
  return {options:{...options,scale:best.scale,samplePhaseY:best.samplePhaseY},sprite:best.sp,stats};
}
