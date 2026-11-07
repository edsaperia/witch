// Shared preset vocabulary. No species identifiers, selection or renderer changes.
import {M,hash2} from "../core.js";
import {v3} from "../model3d.js";

export const HEAD_FAMILIES=Object.freeze({
  ursine:{skull:[1,1,.95],muzzle:[.65,.45,.65],jaw:.38,brow:.12},
  canid:{skull:[1.1,.95,.85],muzzle:[1,.36,.48],jaw:.22,brow:.08},
  cervid:{skull:[1,.95,.72],muzzle:[1.15,.32,.4],jaw:.2,brow:.04},
  feline:{skull:[.9,1,1],muzzle:[.48,.4,.7],jaw:.3,brow:.1},
  rodent:{skull:[1,1,.85],muzzle:[.5,.35,.5],jaw:.25,brow:.02},
  bat:{skull:[.9,1,.9],muzzle:[.45,.3,.45],jaw:.18,brow:.04},
  pug:{skull:[.8,1,1],muzzle:[.28,.4,.65],jaw:.3,brow:.1},
  reptile:{skull:[1.2,.7,.8],muzzle:[1.2,.3,.5],jaw:.22,brow:.15},
  beak:{skull:[.9,1,.8],muzzle:[1,.32,.4],jaw:.12,brow:.05},
  insect:{skull:[.8,.8,1.1],muzzle:[.3,.25,.55],jaw:.12,brow:0},
});
const familyPositive=(v,name)=>{if(!Number.isFinite(v)||v<=0)throw Error(`Graph preset ${name} must be positive`);return v;};
export function headParameters(spec={}){
  const base=HEAD_FAMILIES[spec.family??"canid"];if(!base)throw Error("Unknown graph head family");
  const skull=(spec.skull??base.skull).map(v=>familyPositive(v,"skull"));
  const muzzle=(spec.muzzle??base.muzzle).map(v=>familyPositive(v,"muzzle"));
  if(skull.length!==3||muzzle.length!==3)throw Error("Head dimensions need three axes");
  return {...base,...spec,family:spec.family??"canid",skull,muzzle};
}

/** Regional size scales envelope radii; softness is axial Gaussian falloff.
 * All stations still share the existing skin SDF blend, without creased shells. */
export function shapeEnvelope(graph,spec={}){
  const layers=spec.volumes??[];if(layers.length>12)throw Error("At most twelve tissue layers");
  for(const layer of layers){familyPositive(layer.size,"volume size");familyPositive(layer.softness,"volume softness");}
  graph.spine.forEach((s,i)=>{
    const t=i/(graph.spine.length-1),fur=spec.furShell?.thickness??0;
    if(!Number.isFinite(fur)||fur<0)throw Error("Invalid fur thickness");
    s.r[1]+=fur;s.r[2]+=fur;
    for(const layer of layers){
      const w=Math.exp(-.5*((t-layer.at)/layer.softness)**2)*layer.size;
      s.r[1]+=w*(layer.depth??1);s.r[2]+=w*(layer.width??1);
      s.at[1]+=w*(layer.lift??0);
    }
    // A fine surface amplitude changes the fur shell's softness, not its bulk.
    if(fur>0)s.rough=fur*(spec.furShell.softness??.15);
  });
  return graph;
}

export function tailPoints(spec,defaultLength,defaultWidth,frame){
  const kind=spec?.kind??"whip",length=familyPositive(spec?.length??defaultLength,"tail length"),width=familyPositive(spec?.thickness??defaultWidth,"tail thickness");
  const profiles={stub:[1,.8,.2],bushy:[.8,1,.15],whip:[1,.4,.06],fluffy:[.9,1.25,.3]};
  const profile=profiles[kind];if(!profile)throw Error("Unknown tail family");
  const drop=spec?.drop??.14;
  return [[0,0,0,width*profile[0]],[-length*.5,-drop*.6,.015,width*profile[1]],[-length,-drop,frame?.06:-.03,Math.min(width*profile[2],length*.2)]];
}

export function buildFamilyHead(m,at,r,spec={},legacy={}){
  const h=headParameters(spec),group=spec.group??1,o={part:"head",group},mu=h.muzzle;
  const length=(legacy.muzzle??r)*mu[0],sn=v3.add(at,[r*h.skull[0]*.65+length*.5,-r*.18,0]);
  const tip=v3.add(sn,[length*.85,r*(h.muzzleSlope??0),0]);
  if(h.muzzleTaper){
    const base=v3.add(at,[r*h.skull[0]*.35,-r*.15,0]);
    const radius=r*Math.max(mu[1],mu[2]);
    m.seg(base,tip,radius,radius*h.muzzleTaper,M.BODY,o);
  }else m.ell(sn,[length,r*mu[1],r*mu[2]],h.family==="beak"?M.ACCENT:M.BODY,o);
  const jaw=h.jaw??.2;
  if(jaw>0)m.ell(v3.add(sn,[-length*.1,-r*(mu[1]+jaw*.25),0]),[length*.8,r*jaw,r*mu[2]*.85],M.BODY,o);
  if(h.mouth)m.seg(v3.add(sn,[length*.1,-r*mu[1]*.6,-r*mu[2]]),v3.add(sn,[length*.85,-r*mu[1]*.6,r*mu[2]]),r*.025,r*.025,M.MOUTH,o);
  if(h.family==="reptile"||h.family==="insect")for(const side of [-1,1])m.ell(v3.add(sn,[length*.75,r*.15,side*r*mu[2]*.6]),[r*.05,r*.035,r*.04],M.NOSE,o);
  else if(h.family!=="beak")m.ell(h.muzzleTaper?v3.add(tip,[r*mu[2]*h.muzzleTaper*.7,0,0]):tip,[r*.16,r*.13,r*mu[2]*.5],M.NOSE,{...o,group:group+1});
  const ear={kind:legacy.ears??"point",size:1,angle:0,position:[-.25,.87,.65],...h.ears};
  const eye={size:.09,position:[.55,.2,.73],...h.eyes};
  for(const side of [-1,1]){
    const feature={...o,group:group+(side>0?4:2)};
    const eyeAt=v3.add(at,eye.position.map((v,i)=>r*v*(i===2?side:1)));
    m.ell(eyeAt,[r*eye.size,r*eye.size,r*eye.size],M.EYE,feature);
    if(eye.glint>0){const ray=v3.norm([eye.position[0],eye.position[1],side*eye.position[2]]);m.ell(v3.add(eyeAt,v3.mul(ray,r*eye.size*.95)),[r*eye.glint,r*eye.glint,r*eye.glint],M.GLINT,feature);}
    if(h.brow>0)m.ell(v3.add(at,[r*.48,r*.35,side*r*.6]),[r*.45,r*h.brow,r*.3],M.BODY,{...feature,group:feature.group+1});
    if(ear.kind==="none")continue;
    const c=v3.add(at,ear.position.map((v,i)=>r*v*(i===2?side:1))),size=r*ear.size;
    const tip=v3.add(c,[Math.sin(ear.angle)*size,size*(ear.kind==="bigbat"?1.8:.6),side*size*.12]);
    const earOptions={...o,group:group+(side>0?7:6)};
    if(ear.kind==="round")m.ell(c,[size*.25,size*.27,size*.14],M.BODY,earOptions);
    else if(ear.kind==="leaf"||ear.kind==="bigbat")m.ell(v3.lerp(c,tip,.5),[size*.17,size*(ear.kind==="bigbat"?.9:.4),size*.09],M.BODY,{...earOptions,dir:[1,0,0],up:v3.sub(tip,c)});
    else if(ear.kind==="point"){
      const middle=v3.add(v3.lerp(c,tip,.5),[size*(ear.curl??0),0,0]);
      m.chain([[...c,size*.22],...(ear.curl?[[...middle,size*.12]]:[]),[...tip,size*.015]],M.BODY,earOptions);
    }
    else throw Error("Unknown ear family");
  }
  return {sn};
}

export function familyAntlers(m,at,r,spec,age){
  if(!spec||age===0)return;
  const count=Math.min(12,Math.max(0,Math.round(spec.branches??age+1))),spread=spec.spread??.2,curve=spec.curve??-.1,length=spec.length??(.4+age*.1),tine=spec.tineLength??.16;
  for(const side of [-1,1]){
    const a=v3.add(at,[-r*.3,r*.8,side*r*.5]),b=v3.add(a,[curve*.4,length*.55,side*spread*.55]),c=v3.add(a,[curve,length,side*spread]);
    const mat=age===3&&spec.glow?M.MAGIC2:M.ACCENT;
    m.chain([[...a,.04],[...b,.027],[...c,.008]],mat,{part:"head",extra:true});
    for(let i=0;i<count;i++){const q=v3.lerp(a,c,(i+1)/(count+1));m.seg(q,v3.add(q,[tine,length*.15,side*tine*.5]),.02,.004,mat,{part:"head",extra:true});}
  }
}

/** Stable model-space stipple approximates a soft pigment edge without a slab. */
export function familyMarking(spec,point){
  const p=point.map((v,i)=>(v-(spec.centre?.[i]??0))/(spec.radius?.[i]??1));
  const softness=Math.max(.0001,spec.softness??.05);let d;
  if(spec.kind==="spots"){const scale=spec.scale??8;d=Math.hypot(...p.map(v=>{const q=v*scale;return q-Math.round(q);} ))-(spec.spotRadius??.2);}
  else if(spec.kind==="bands")d=Math.abs(Math.sin(p[0]*(spec.frequency??12)))-(spec.width??.4);
  else d=Math.hypot(...p)-1;
  const coverage=Math.max(0,Math.min(1,.5-d/(2*softness)));
  const threshold=hash2(Math.floor(point[0]*173)+Math.floor(point[2]*173)*31,Math.floor(point[1]*173),37);
  return coverage>threshold?(M[spec.mat??"BODY3"]??M.BODY3):undefined;
}

export function familyFeet(m,legs,spec={}){
  for(const leg of legs){const q=leg.end,w=spec.width??.07,length=spec.length??.12,kind=spec.kind??"paw";
    if(spec.pads&&kind!=="hoof")m.ell(v3.add(q,[length*.1,-.025,0]),[length*.6,.025,w*.65],M.NOSE,{part:leg.id});
    if(kind==="clawed"||kind==="paw")for(const side of [-1,0,1])if(spec.claws)m.seg(v3.add(q,[length*1.2,0,side*w*.6]),v3.add(q,[length*1.65,-.01,side*w*.6]),.012,.003,M.ACCENT,{part:leg.id});
    if(kind==="webbed")m.ell(v3.add(q,[length*.3,0,0]),[length,.035,w*1.5],M.BODY2,{part:leg.id});
    if(!["paw","hoof","clawed","webbed"].includes(kind))throw Error("Unknown foot family");
  }
}

export function familyCollars(m,graph,sockets,spec={}){
  if(!(spec.size>0))return;
  for(const s of graph.sockets)if(s.kind==="neck"&&s.id.startsWith("neck-")){
    const root=graph.spine.find(q=>q.id===s.station)?.at;if(!root)continue;
    const c=v3.lerp(root,sockets[s.id],spec.at??.7),r=spec.size;
    for(let i=0;i<12;i++){const a=i/12*Math.PI*2,b=(i+1)/12*Math.PI*2;m.seg(v3.add(c,[0,Math.cos(a)*r,Math.sin(a)*r]),v3.add(c,[0,Math.cos(b)*r,Math.sin(b)*r]),spec.thickness??.008,spec.thickness??.008,M.WOOD,{part:"head",extra:true});}
  }
}
