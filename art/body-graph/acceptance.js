// First acceptance pack only; complete records travel through creatureVariants.
// No implicit selection, mutable global registry, or production-default change.
import {M} from "../core.js";
import {v3} from "../model3d.js";
import {compileGraph,LEG_FAMILIES} from "./graph.js";
import {poseGraph} from "./gait.js";

export const ACCEPTANCE_IDS = Object.freeze(["bear","wolf","stag","bat","snail","hydra"]);
const ACCEPTANCE_PLANS = {
  bear:{family:"quadruped",feet:"plantigrade",width:.33,depth:.31,leg:.53,head:.27,muzzle:.26,ears:"round",tail:.17},
  wolf:{family:"quadruped",feet:"digitigrade",width:.22,depth:.25,leg:.66,head:.22,muzzle:.32,ears:"point",tail:.58},
  stag:{family:"quadruped",feet:"hoof",width:.21,depth:.25,leg:.86,head:.19,muzzle:.29,ears:"point",tail:.18,neck:.37,antlers:true},
  bat:{family:"winged",width:.15,depth:.22,head:.15,muzzle:.17,ears:"round",wing:1.15},
  snail:{family:"gastropod",width:.25,depth:.09,shell:.34},
  hydra:{family:"branching",width:.12,depth:.09,head:.075,fan:1.65},
};
export function acceptanceGraphGenome(base){
  if(!ACCEPTANCE_IDS.includes(base.id))throw Error("Outside body-graph acceptance batch");
  const out=structuredClone(base);
  out.look={...out.look,bodyGraphAcceptance:{version:1,...ACCEPTANCE_PLANS[base.id]}};
  return out;
}
export function createAcceptanceVariants(genomes){
  return Object.fromEntries(genomes.filter(g=>ACCEPTANCE_IDS.includes(g.id)).map(g=>[g.id,{graph:acceptanceGraphGenome(g)}]));
}

function stations(length,y,width,depth,count=15){
  return Array.from({length:count},(_,i)=>{
    const t=i/(count-1),k=.78+.22*Math.sin(t*Math.PI);
    return {id:`spine-${i}`,at:[(t-.5)*length,y,0],r:[length/(count-1)*1.6,depth*k,width*k]};
  });
}
const socket=(id,kind,station,offset,rest)=>({id,kind,station,offset,...rest});
function neck(graph,id,station,offset,tip,r0,r1){
  graph.sockets.push(socket(id,"neck",station,offset,{part:"head",points:[[0,0,0,r0],[tip[0]*.4,tip[1]*.45,tip[2]*.35,(r0+r1)/2],[...tip,r1]]}));
}
function head(graph,id,parent,r,offset=[0,0,0]){
  graph.sockets.push({id,kind:"head",parent,offset,r,part:"head"});
}

/** A complete graph description, without rendering, globals or old builders. */
export function acceptanceGraph(S,age,frame=0){
  const p=S.look?.bodyGraphAcceptance;
  if(p?.version!==1)throw Error("Selected acceptance graph required");
  if(!Number.isInteger(age)||age<0||age>3)throw Error("Graph age must be 0..3");
  const baby=age===0,young=age===1,graph={blend:.07,spine:[],sockets:[]};
  const meta={family:p.family,heads:[],ears:p.ears,headRadius:p.head??.1,age,frame};
  if(p.family==="quadruped"){
    const leg=p.leg*(baby?.65:1),depth=p.depth*(baby?1.08:young?.9:1),length=baby?.75:young?1.04:1.12;
    graph.spine=stations(length,leg+depth,p.width,depth);
    const first=graph.spine[0].id,last=graph.spine.at(-1).id;
    const hr=p.head*(baby?1.18:1),tip=[.15,p.neck??.16,0];
    neck(graph,"neck",last,[0,.04,0],tip,hr*.8,hr*.65);
    head(graph,"head","neck",[hr*1.1,hr,hr*.88]);meta.heads.push({id:"head",r:hr,muzzle:p.muzzle*(baby?.65:1)});
    graph.sockets.push(socket("tail","tail",first,[-.04,0,0],{part:"tail",points:[[0,0,0,p.width*.25],[-p.tail*.5,-.1,.02,p.width*.2],[-p.tail,-.14,frame?.06:-.03,.025]]}));
    for(const fore of [false,true])for(const side of [-1,1]){
      const station=fore?graph.spine.at(-2):graph.spine[1],x=station.at[0],family=p.feet;
      graph.sockets.push(socket(`${fore?"fore":"hind"}-${side}`,"leg",station.id,[0,-depth*.4,side*p.width*.7],{
        family,foot:[x+(fore?0:.06),LEG_FAMILIES[family].foot[1],side*p.width*.9],radius:(baby?.085:.065)*(family==="plantigrade"?1.4:1),
        phase:fore===(side>0)?0:.5,
      }));
    }
    Object.assign(meta,{length,top:leg+depth*2,width:p.width,depth,antlers:p.antlers});
  }else if(p.family==="winged"){
    graph.spine=stations(.45,.38,p.width,p.depth);
    neck(graph,"neck","spine-14",[0,.08,0],[.1,.13,0],.12,.1);
    head(graph,"head","neck",[p.head*1.15,p.head,p.head*.85]);meta.heads.push({id:"head",r:p.head,muzzle:p.muzzle});
    const flap=frame?.18:-.1,span=p.wing*(baby?.7:1);
    for(const side of [-1,1]){
      graph.sockets.push(socket(`hindlimb-${side}`,"tail","spine-1",[0,-.06,side*.1],{part:"body",points:[[0,0,0,.026],[-.12,-.18,side*.09,.018],[-.19,-.23,side*.12,.012]]}));
      const shoulder=[.13,.43,side*.13],elbow=[-.02,.43+flap,side*span*.52],wrist=[.24,.38+flap,side*span];
      const root=graph.spine[10],offset=v3.sub(shoulder,root.at),id=`arm-${side}`;
      graph.sockets.push(socket(id,"tail",root.id,offset,{part:"body",points:[[0,0,0,.025],[...v3.sub(elbow,shoulder),.02],[...v3.sub(wrist,shoulder),.013]]}));
      const tips=[wrist,[-.08,.28+flap,side*span*.95],[-.37,.2+flap,side*span*.72],[-.44,.23,side*.27]];
      for(let i=0;i<tips.length-1;i++){
        graph.sockets.push(socket(`membrane-${side}-${i}`,"membrane",root.id,offset,{part:"body",vertices:[[0,0,0],v3.sub(tips[i],shoulder),v3.sub(tips[i+1],shoulder)],mat:M.BODY3}));
        graph.sockets.push(socket(`finger-${side}-${i}`,"tail",root.id,offset,{part:"body",points:[[0,0,0,.012],[...v3.sub(tips[i],shoulder),.007]],mat:M.BODY2}));
      }
    }
  }else if(p.family==="gastropod"){
    graph.spine=stations(.95,.11,p.width,p.depth);
    graph.sockets.push(socket("shell","shell","spine-6",[0,.28,0],{part:"body",r:[p.shell,p.shell*(baby?.85:1.1),p.shell*.72],mat:M.BODY2}));
    for(const side of [-1,1]){
      const tip=[.2,.3*(baby?1.1:1+age*.15),side*.11];
      neck(graph,`stalk-${side}`,"spine-14",[0,.01,side*.06],tip,.025,.016);
      head(graph,`eye-${side}`,`stalk-${side}`,[.027,.027,.027]);
      graph.sockets.at(-1).mat=age===3?M.MAGIC2:M.EYE;
    }
  }else if(p.family==="branching"){
    graph.spine=stations(.9,.11,p.width,p.depth);
    const heads=[1,3,5,7][age];
    for(let i=0;i<heads;i++){
      const u=heads===1?0:i/(heads-1)-.5;
      const tip=[.2-Math.abs(u)*.2,.42-Math.abs(u)*.12,u*.85*p.fan],id=`neck-${i}`;
      neck(graph,id,"spine-14",[0,.02,0],tip,.042,.029);
      head(graph,`head-${i}`,id,[p.head*1.2,p.head*.8,p.head*.8]);
      meta.heads.push({id:`head-${i}`,r:p.head,muzzle:.11});
    }
  }else throw Error("Unknown acceptance graph family");
  return {graph,meta};
}

// Shared anatomical head/ear/antler families. No expression heads are built.
function attachHead(model,at,r,muzzle,ears,age){
  const sn=v3.add(at,[r+muzzle*.35,-r*.2,0]);
  model.ell(sn,[muzzle,r*.42,r*.5],M.BODY,{part:"head"});
  model.ell(v3.add(sn,[muzzle*.85,0,0]),[r*.17,r*.15,r*.3],M.NOSE,{part:"head"});
  for(const side of [-1,1]){
    model.ell(v3.add(at,[r*.55,r*.2,side*r*.73]),[r*.09,r*.09,r*.09],M.EYE,{part:"head"});
    if(ears==="round")model.ell(v3.add(at,[-r*.25,r*.87,side*r*.65]),[r*.3,r*.34,r*.18],M.BODY,{part:"head"});
    if(ears==="point")model.chain([[at[0]-r*.2,at[1]+r*.5,at[2]+side*r*.65,r*.23],[at[0]-r*.3,at[1]+r*(age===0?1.15:1.7),at[2]+side*r*.8,r*.015]],M.BODY,{part:"head"});
  }
  return {sn};
}

/** Produces model/landmarks through the same graph compiler and gait clock. */
export function buildAcceptanceModel(S,age,frame=0){
  const {graph,meta}=acceptanceGraph(S,age,frame);
  const compiled=meta.family==="quadruped"?poseGraph(graph,frame*.16,{stride:.16,duty:.65,lift:.075}):compileGraph(graph);
  const m=compiled.model,heads=[];
  for(const h of meta.heads){const at=compiled.sockets[h.id];attachHead(m,at,h.r,h.muzzle,meta.ears,age);heads.push({c:at,r:[h.r,h.r,h.r]});}
  if(heads.length){m.anchors.head=heads[0];m.anchors.neck={c:heads[0].c,r:heads[0].r[0]*.8,dir:[1,.2,0]};}
  if(meta.antlers&&age>0){const H=heads[0].c,r=heads[0].r[0];
    for(const side of [-1,1]){const a=v3.add(H,[-r*.3,r*.8,side*r*.5]),b=v3.add(a,[-.1,.4+age*.1,side*.2]);
      m.seg(a,b,.04,.015,M.ACCENT,{part:"head",extra:true});
      for(let i=0;i<age+1;i++){const at=v3.lerp(a,b,(i+1)/(age+2));m.seg(at,v3.add(at,[.16,.1,side*.08]),.022,.005,M.ACCENT,{part:"head",extra:true});}
    }
  }
  if(meta.family==="gastropod"){
    const at=graph.spine.at(-1).at;
    m.anchors.head={c:at.slice(),r:[.12,.09,.12]};
    m.anchors.neck={c:at.slice(),r:.09,dir:[1,0,0]};
    const centre=compiled.sockets.shell,r=S.look.bodyGraphAcceptance.shell;
    // Raised spiral along both shell flanks; an actual whorl, not stacked rings.
    for(const side of [-1,1]){const pts=[];for(let i=0;i<=72;i++){const t=i/72,a=t*Math.PI*2*(1.2+age*.7),R=r*(.08+.8*t);pts.push([centre[0]+Math.cos(a)*R,centre[1]+Math.sin(a)*R,side*r*.73,.014]);}m.chain(pts,age===3?M.GLINT:M.ACCENT,{part:"body"});}
  }
  if(meta.family==="quadruped"){
    const H=heads[0].c,hr=heads[0].r[0],nb=compiled.sockets.neck;
    // Match existing rig attachment surface while keeping graph construction separate.
    m.rig={head:{nb,H,hr},tail:compiled.sockets.tail,top:meta.top,len:meta.length/2,bw:meta.width,
      legs:compiled.legs.map(l=>({name:l.id,fore:l.id.startsWith("fore"),side:l.root[2]>0?1:-1,hip:l.root,knee:l.knee,foot:l.end,r:l.radii,mat:M.BODY,fl:LEG_FAMILIES[l.family].foot[0],hoof:l.family==="hoof"}))};
    for(const p of m.parts)if(compiled.legs.some(l=>p.part===l.id))p.part="legs";
  }
  m.bodyGraph=graph;
  return {model:m,meta};
}
