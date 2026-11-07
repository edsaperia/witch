// q.spine-compatible dorsal height, distinct from the structural station chain.
// Original compatibility semantics: hip-.5,loin-.25,waist0,ribcage.25,shoulder.48.
import {M} from "../core.js";
import {uvrMount} from "./part-tree.js";

export const DORSAL_STATIONS=["hip","loin","waist","ribcage","shoulder"];
export const DORSAL_POSITIONS=[-.5,-.25,0,.25,.48];
export function dorsalHeight(profile,x){
  if(profile==null)return 0;
  const heights=typeof profile==="number"?DORSAL_STATIONS.map(()=>profile):DORSAL_STATIONS.map(k=>profile[k]??0);
  if(!heights.every(Number.isFinite)||!Number.isFinite(x))throw Error("Finite dorsal heights/position required");
  const at=DORSAL_POSITIONS;
  if(x<=at[0]-.35||x>=at[4]+.35)return 0;
  if(x<=at[0])return heights[0]*(1-(at[0]-x)/.35);
  if(x>=at[4])return heights[4]*(1-(x-at[4])/.35);
  for(let i=0;i<4;i++)if(x<=at[i+1])return heights[i]+(heights[i+1]-heights[i])*(x-at[i])/(at[i+1]-at[i]);
  return 0;
}

export function selectedDorsalProfile(S,age,plan={}){
  if(Object.hasOwn(plan,"dorsal"))return plan.dorsal;
  return S.levelQ?.[age]?.spine??S.levels?.[age]?.body?.spine??S.q?.spine??S.body?.spine??null;
}

export function addDorsalProfile(model,graph,profile){
  if(profile==null)return [];
  const first=graph.spine[0].at[0],last=graph.spine.at(-1).at[0],half=(last-first)/2,centre=(last+first)/2;
  const marks=[];
  for(let i=0;i<=12;i++){
    const position=-.85+i*1.7/12,height=dorsalHeight(profile,position);if(!height)continue;
    const x=centre+position*half,u=(x-first)/(last-first),mount=uvrMount(graph.spine,u,0,1);
    // Correct the parametric guide to the torso's analytic dorsal ellipsoid
    // envelope. Never estimate inward depth from its approximate SDF.
    let top=-Infinity;
    for(const mass of graph.bodyMasses){const t=(x-mass.at[0])/mass.r[0],z=(mount[2]-mass.at[2])/mass.r[2],q=1-t*t-z*z;if(q>0)top=Math.max(top,mass.at[1]+mass.r[1]*Math.sqrt(q));}
    if(!Number.isFinite(top))continue;
    const width=half*1.7/12*.75,bodyWidth=graph.spine[Math.round(u*(graph.spine.length-1))].r[2];
    if(height>0)model.ell([x,top+height*.3,mount[2]],[width,height*.8,bodyWidth*.11+height*.15],M.BODY,{part:"body",group:4000+i});
    else model.ell([x,top+height*.15,mount[2]],[width,-height*.85,bodyWidth*.16-height*.3],M.BODY,{part:"body",group:1,cut:true});
    const part=model.parts.at(-1);part.parentPart="body";part.dorsal=true;
    marks.push({position,height,at:[x,top,mount[2]],operation:height>0?"crest":"groove"});
  }
  model.dorsalProfile={source:structuredClone(profile),marks};
  return marks;
}
