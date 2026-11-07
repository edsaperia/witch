// Shared diagnostic flight poses. No game state, selector or species dispatch.
import {M} from "../core.js";
import {v3} from "../model3d.js";

export const FLIGHT_STATES=Object.freeze(["flap","glide","grounded","perched","hanging","takeoff","landing"]);
export const WING_KINDS=Object.freeze(["membrane","feathered","glassy","scaled","dragon"]);
export const FLAP_FRAMES=8;
const flightMix=(a,b,t)=>a+(b-a)*t;
export function flightPose({state="flap",phase=0,progress=0,pathAngle=0,legs="trailing"}={}){
  if(!FLIGHT_STATES.includes(state)||![phase,progress,pathAngle].every(Number.isFinite)||phase<0||phase>1||progress<0||progress>1||Math.abs(pathAngle)>Math.PI/3||!["trailing","tucked"].includes(legs))throw Error("Invalid flight pose");
  const smooth=progress*progress*(3-2*progress),airborne=state==="takeoff"?smooth:state==="landing"?1-smooth:["flap","glide"].includes(state)?1:0;
  return {state,phase,progress,legs,airborne,spread:flightMix(.12,1,airborne),
    stroke:(state==="glide"?0:Math.cos(phase*Math.PI*2)*.62)*airborne,
    sweep:(state==="glide"?0:Math.sin(phase*Math.PI*2)*.08)*airborne,
    pitch:state==="hanging"?-Math.PI/2:flightMix(.55,pathAngle,airborne),
    lift:flightMix(.24,.58,airborne),pathAngle};
}

/** Local x forward / y up / z across. Shoulder-elbow-wrist and distal rays
 * remain separate. Folded distal fingers lie back beside the body. */
export function flightWings(graph,shape,span,pose){
  const kind=shape.kind??"membrane";if(!WING_KINDS.includes(kind)||!(span>0)||!Number.isFinite(span))throw Error("Invalid wing kind/span");
  const root=graph.spine[10],arm=shape.arm??.025,finger=shape.finger??.012;
  if(![arm,finger].every(n=>Number.isFinite(n)&&n>0))throw Error("Positive finite wing bone radii required");
  const add=(id,kind,origin,data)=>graph.sockets.push({id,kind,station:root.id,offset:v3.sub(origin,root.at),part:"body",...data});
  const triangle=(id,origin,b,c,mat)=>add(id,"membrane",origin,{vertices:[[0,0,0],v3.sub(b,origin),v3.sub(c,origin)],mat});
  const chain=(id,points,r,mat=M.BODY)=>add(id,"tail",points[0],{points:points.map((p,i)=>[...v3.sub(p,points[0]),r*(1-i*.22)]),mat});
  const marks=[];
  for(const side of [-1,1]){
    const shoulder=[.13,.4,side*.12],fold=1-pose.airborne;
    const wingPoint=(x,z)=>{
      const spreadZ=z*pose.spread,dy=Math.sin(pose.stroke)*spreadZ;
      return [flightMix(x+pose.sweep*z/span,-.26-Math.abs(z)*.12,fold),.4+dy,side*(.12+Math.cos(pose.stroke)*spreadZ)];
    };
    const elbow=wingPoint(-.03,span*.45),wrist=wingPoint(.22,span*.83);
    chain(`arm-${side}`,[shoulder,elbow,wrist],arm);
    const tips=[wingPoint(.2,span),wingPoint(-.12,span*.96),wingPoint(-.4,span*.72),wingPoint(-.44,span*.22)];
    if(kind==="membrane"||kind==="dragon"){
      for(let i=0;i<3;i++){
        triangle(`membrane-${side}-${i}`,shoulder,tips[i],tips[i+1],M[shape.membraneMat??"BODY3"]);
        chain(`finger-${side}-${i}`,[wrist,tips[i+1]],finger,M.BODY2);
      }
    }else if(kind==="feathered"){
      triangle(`coverts-${side}`,shoulder,wrist,tips[3],M.BODY);
      for(let i=0;i<8;i++){
        const t=i/7,base=v3.lerp(elbow,wrist,t),tip=wingPoint(.18-t*.72,span*(.84+.18*Math.sin(t*Math.PI)));
        triangle(`primary-${side}-${i}`,base,tip,v3.add(tip,[-.08,0,-side*.035]),i%2?M.BODY2:M.BODY3);
      }
    }else if(kind==="glassy"){
      // Fore/hind pair on each side, separate roots and narrow clear panels.
      for(let pair=0;pair<2;pair++){
        const origin=[.14-pair*.25,.4,side*.1],tip=wingPoint(.32-pair*.65,span*(pair?.88:1));
        triangle(`glass-${side}-${pair}`,origin,v3.add(tip,[.09,0,0]),v3.add(tip,[-.09,0,0]),M.WEB);
        chain(`vein-${side}-${pair}`,[origin,tip],finger*.45,M.BODY2);
      }
    }else {
      triangle(`scaled-fore-${side}`,shoulder,tips[0],tips[2],M.BODY2);
      triangle(`scaled-hind-${side}`,shoulder,tips[2],tips[3],M.ACCENT);
      for(let i=0;i<3;i++)chain(`scale-vein-${side}-${i}`,[shoulder,tips[i]],finger*.5,M.BODY3);
    }
    marks.push({side,shoulder,elbow,wrist,tips});
  }
  graph.flight={...pose,wingKind:kind,marks};
}

/** Rigidly pose the complete finished model, including head/flat axes and
 * attachment landmarks. Paint is evaluated in its original local frame. */
export function poseFlightModel(model,pose){
  const c=Math.cos(pose.pitch),s=Math.sin(pose.pitch),pivot=.38;
  const direction=p=>[p[0]*c-p[1]*s,p[0]*s+p[1]*c,p[2]];
  const point=p=>v3.add(direction(v3.sub(p,[0,pivot,0])),[0,pose.lift,0]);
  const inverse=p=>{const q=v3.sub(p,[0,pose.lift,0]);return [q[0]*c+q[1]*s,-q[0]*s+q[1]*c+pivot,q[2]];};
  for(const part of model.parts){
    if(part.type==="cone"){part.a=point(part.a);part.b=point(part.b);}else{part.c=point(part.c);part.axes=part.axes.map(direction);}
    if(part.paint){const paint=part.paint;part.paint=p=>paint(inverse(p));}
  }
  for(const flat of model.flats){flat.c=point(flat.c);flat.u=direction(flat.u);flat.v=direction(flat.v);}
  for(const anchor of Object.values(model.anchors)){
    const all=Array.isArray(anchor)?anchor:[anchor];
    for(const a of all){if(a.c)a.c=point(a.c);if(a.dir)a.dir=direction(a.dir);if(a.pts)a.pts=a.pts.map(point);}
  }
  model.flightPose={...pose};return model;
}
