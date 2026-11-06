// Original JS implementation of the architecture described in the Infinigen paper.
// Provenance/licence and verified-vs-inferred choices: docs/plans/body-graph-part-tree.md.
import {v3} from "../model3d.js";
import {M,hash2} from "../core.js";

// Same convention as Model's existing polynomial union: B is BAND, bulge B/4.
export const BLEND_CONVENTION="classic-quadratic-band-width";
export function sminBand(a,b,band){
  if(!(band>0))return Math.min(a,b);
  const h=Math.max(band-Math.abs(a-b),0)/band;
  return Math.min(a,b)-h*h*band*.25;
}

// Authored starting profiles, not imported animal data or Infinigen source/tables.
// Three bean masses: rear, ribcage, shoulders; [axial radius, depth, width].
export const PART_FAMILIES=Object.freeze({
  ursid:{profile:[[.36,.9,1],[.4,1,1],[.35,1.2,1.05]],curve:[0,-.02,.06]},
  canid:{profile:[[.33,.8,.85],[.37,.9,.8],[.32,1.16,.95]],curve:[.02,-.03,0]},
  cervid:{profile:[[.32,1,1],[.36,.95,.9],[.31,1.08,1]],curve:[.02,0,.04]},
  chiropteran:{profile:[[.35,.8,.8],[.4,1,1],[.32,.9,.9]],curve:[0,0,.02]},
  strigiform:{profile:[[.38,1,1],[.42,1.1,1],[.35,.95,.9]],curve:[-.03,0,.04]},
  gastropod:{profile:[[.35,.7,.8],[.42,1,1],[.34,.8,.75]],curve:[0,0,.01]},
  arachnid:{profile:[[.4,1.1,1.2],[.38,1,1],[.3,.8,.8]],curve:[.01,0,0]},
  serpent:{profile:[[.32,.9,.9],[.38,1,1],[.33,1.05,1]],curve:[0,.01,0]},
});

export function blendProfilePriors(family,priors=[{kind:"reference",weight:1}]){
  const source=PART_FAMILIES[family];if(!source)throw Error("Unknown part-tree family");
  const shapes={reference:[1,1,1],broad:[1,1.08,1.12],compact:[.92,1.04,1.04],lean:[1.04,.92,.88]};
  let total=0;const result=source.profile.map(p=>p.map(()=>0));
  for(const prior of priors){if(!(prior.weight>=0)||!Number.isFinite(prior.weight)||!shapes[prior.kind])throw Error("Invalid reference-profile prior");
    total+=prior.weight;
    source.profile.forEach((p,i)=>p.forEach((r,j)=>{result[i][j]+=r*shapes[prior.kind][j]*prior.weight;}));
  }
  if(!(total>0))throw Error("Profile prior weights must have a positive sum");
  return result.map(p=>p.map(r=>r/total));
}

export function familyBean(spine,spec={}){
  const family=spec.template??"canid",template=PART_FAMILIES[family],profile=blendProfilePriors(family,spec.priors);
  const length=spine.at(-1).at[0]-spine[0].at[0];
  const amplitude=spec.profileVariation??0;if(!(amplitude>=0&&amplitude<=.08))throw Error("Profile variation must be0..0.08");
  const masses=[0,.5,1].map((u,i)=>{
    const station=spine[Math.round(u*(spine.length-1))],variation=j=>1+amplitude*(hash2(i,j,spec.seed??0)*2-1);
    const region=i===1?spec.ribcage:i===0?spec.flank:null;
    const depth=region?.depth??1,width=region?.width??1;
    if(!(depth>0&&width>0)||!Number.isFinite(depth+width))throw Error("Invalid ribcage/flank profile");
    return {at:[station.at[0]*.65,station.at[1]+template.curve[i],station.at[2]],r:[length*profile[i][0]*variation(0),station.r[1]*profile[i][1]*variation(1)*depth,station.r[2]*profile[i][2]*variation(2)*width],rough:station.rough};
  });
  return {masses,family,profile,convention:BLEND_CONVENTION};
}

const sampleGuide=(points,u)=>{
  const t=Math.max(0,Math.min(1,u))*(points.length-1),i=Math.min(points.length-2,Math.floor(t)),f=t-i;
  const delta=v3.sub(points[i+1].at,points[i].at),tangent=Math.hypot(...delta)>1e-9?v3.norm(delta):[1,0,0];
  return {at:v3.lerp(points[i].at,points[i+1].at,f),r:v3.lerp(points[i].r,points[i+1].r,f),tangent};
};

/** Mount depth r interpolates skeleton->analytic cross-section, NEVER an inward
 * ellipsoid-SDF offset. v is turns around the parent centre line, u along it. */
export function uvrMount(parent,u,v,r){
  if(![u,v,r].every(Number.isFinite)||u<0||u>1||r<0||r>1)throw Error("Invalid uvr mount");
  const point=sampleGuide(parent,u),angle=v*Math.PI*2;
  const hint=Math.abs(point.tangent[1])<.95?[0,1,0]:[1,0,0];
  const up=v3.norm(v3.sub(hint,v3.mul(point.tangent,v3.dot(hint,point.tangent)))),side=v3.norm(v3.cross(point.tangent,up));
  return v3.add(point.at,v3.add(v3.mul(up,Math.cos(angle)*point.r[1]*r),v3.mul(side,Math.sin(angle)*point.r[2]*r)));
}

export function acceptancePartTree(graph,spec={}){
  const body=familyBean(graph.spine,spec);graph.bodyMasses=body.masses;
  const curve=PART_FAMILIES[body.family].curve;
  graph.spine.forEach((station,i)=>{
    const t=i/(graph.spine.length-1)*2,k=Math.min(1,Math.floor(t)),f=t-k;
    station.at[1]+=curve[k]*(1-f)+curve[k+1]*f;
    station.r[1]*=body.profile[k][1]*(1-f)+body.profile[k+1][1]*f;
    station.r[2]*=body.profile[k][2]*(1-f)+body.profile[k+1][2]*f;
  });
  graph.blendPolicy="parent-tree";graph.blendConvention=BLEND_CONVENTION;graph.blend=spec.blendBand??.035;
  graph.partTree=[{id:"body",parent:null,family:body.family,profile:body.profile}];
  for(const socket of graph.sockets){
    if(socket.parent){socket.attach={parent:socket.parent,u:1,v:0,r:0};}
    else {
      const index=graph.spine.findIndex(s=>s.id===socket.station),offset=socket.offset;
      socket.attach={parent:"body",u:index/(graph.spine.length-1),v:Math.atan2(offset[2],offset[1])/(Math.PI*2),r:socket.kind==="leg"?.6:0};
      // Preserve authored head/arm lift; side mounts derive from the cross section.
      socket.offset=socket.kind==="leg"?[offset[0],0,0]:offset.slice();
    }
    graph.partTree.push({id:socket.id,parent:socket.attach.parent,kind:socket.kind,mount:{...socket.attach}});
  }
  return graph;
}

/** Cap total primitives per group, stronger than just an overlap-point bound.
 * Torso first, then each parent part and its features; siblings have unique groups. */
export function boundTreeBlendGroups(model,limit=3){
  if(!Number.isInteger(limit)||limit<1||limit>4)throw Error("Blend-group limit must be1..4");
  const counts=new Map(),chunks=new Map();let next=Math.max(1,...model.parts.map(p=>p.group),...model.flats.map(p=>p.group))+1;
  for(const part of model.parts){
    const original=part.group,chunk=chunks.get(original)??original,n=counts.get(chunk)??0;
    if(n>=limit){const group=next++;chunks.set(original,group);part.group=group;counts.set(group,1);}
    else {part.group=chunk;counts.set(chunk,n+1);}
  }
  // The sprite's group channel is eight-bit. Compact IDs preserve boundaries
  // after splitting instead of silently wrapping distant feature IDs.
  const compact=new Map();let id=1;
  for(const part of [...model.parts,...model.flats]){
    if(part.group===0)continue;
    if(!compact.has(part.group))compact.set(part.group,id++);
    part.group=compact.get(part.group);
  }
  if(id>256)throw Error("Part tree exceeds eight-bit group budget");
  for(const anchor of model.anchors.feet)if(compact.has(anchor.group))anchor.group=compact.get(anchor.group);
  model.blendAudit={convention:BLEND_CONVENTION,band:model.blend,maxParts:Math.max(0,...counts.values()),limit};
  return model;
}

export function partMuscles(model,graph,spec=[]){
  for(const muscle of spec){
    const a=uvrMount(graph.spine,muscle.from,muscle.angle??0,muscle.depth??.65),b=uvrMount(graph.spine,muscle.to,muscle.angle??0,muscle.depth??.65);
    if(!(muscle.radius>0))throw Error("Muscle tube radius must be positive");
    model.seg(a,b,muscle.radius,muscle.radius*.75,M.BODY,{part:"body",group:3000+model.parts.length});
  }
}
