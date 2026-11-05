// U7 coastal-camera observations: original six-second transition and720-bearing samples; comfort references are informational.
import fs from "node:fs";
import path from "node:path";
import {it} from "vitest";
import {metric} from "./results.mjs";
import {cameraPose,gazeAt,newCamera,stepCamera,type CameraState} from "../../src/rules/camera";
import {TUNING} from "../../src/rules/tuning";

it("reports two original U7 coastal camera comfort samples",()=>{
  const T=TUNING,BC=T.beach!.camera!,STEP=1/60,start:CameraState={...newCamera(T,0,0,0),intro:0};
  let c=start,previous=cameraPose(c,0,T).angle,worstAngle=0;
  const angleChanges:number[]=[];
  for(let k=0;k<6/STEP;k++){
    c=stepCamera(c,0,{x:0,y:0,z:0},{x:0,z:0},0,STEP,T,false,null,{near:1,gazing:k>120});
    const angle=cameraPose(c,0,T).angle,change=Math.abs(angle-previous);angleChanges.push(change);worstAngle=Math.max(worstAngle,change);previous=angle;
  }
  let prev=gazeAt(BC,-0.01),worstBearing=0;
  const changes:{bearing:number;distance:number;angle:number}[]=[];
  for(let k=0;k<=720;k++){
    const bearing=k/720*2*Math.PI,g=gazeAt(BC,bearing),distance=Math.abs(g.distance-prev.distance),angle=Math.abs(g.angle-prev.angle);
    worstBearing=Math.max(worstBearing,distance,angle);changes.push({bearing,distance,angle});prev=g;
  }
  const metrics=[metric("coastal six-second maximum angle change",worstAngle,"degrees",{operator:"<",value:0.5}),
    metric("coastal bearing maximum distance-or-angle change",worstBearing,"m/degrees (original mixed score)",{operator:"<",value:2})];
  const samples={transition:{start,seconds:6,dt:STEP,near:1,gazingAfterFrame:120,comparison:"k > 120",angleChanges,worstAngle},
    bearings:{initial:-0.01,steps:720,inclusiveEnd:true,authored:BC.bearings,changes,worstBearing}};
  const output=process.env.BEHAVIOUR_OUTPUT_DIR;if(!output)throw Error("Run via node tools/behaviour/run.mjs to preserve report artifacts");
  fs.writeFileSync(path.join(output,"camera-comfort.json"),JSON.stringify({system:"camera-comfort",group:"U7 coastal slice",sourceDeclarations:2,samples,metrics},null,2)+"\n");
});
