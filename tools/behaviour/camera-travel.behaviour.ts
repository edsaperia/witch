// U7 original intro midpoint, following comfort and two-second game travel observations; references are informational.
import fs from "node:fs";
import path from "node:path";
import {it} from "vitest";
import {metric} from "./results.mjs";
import {cameraPose,newCamera,stepCamera} from "../../src/rules/camera";
import {newGame,stepGame} from "../../src/rules/game";
import {TUNING,type Tuning} from "../../src/rules/tuning";
import {smallWorldTuning} from "../../src/test/worlds";

it("reports three remaining U7 intro, follow and travel declarations",()=>{
  // Exact rules.test.ts opt-in scenery fixture; only its existing LOCAL_TUNING shrinks the game sample.
  const T:Tuning={...TUNING,setPieceChance:0.25,grounds:{...TUNING.grounds,kinds:["playground","tennis","baseball","football","basketball"]},decor:{...TUNING.decor,mix:{ruins:1,rocks:1,freak:1}},paths:{...TUNING.paths,pieces:true},scenes:{...TUNING.scenes,featured:undefined}};
  const metrics:ReturnType<typeof metric>[]=[],I=T.camera.intro,seat={x:10,y:6,z:20},dt=1/60;
  let c=newCamera(T,0,0,0);
  for(let i=0;i<120;i++)c=stepCamera(c,0,{x:0,y:0,z:0},{x:0,z:0},0,dt,T,true,seat);
  const seated=cameraPose(c,0,T),half=Math.round(I.ease/2*60);
  for(let i=0;i<half;i++)c=stepCamera(c,0,{x:0,y:0,z:0},{x:0,z:0},0,dt,T);
  const midpoint=cameraPose(c,0,T).distance;
  for(let i=0;i<60*I.ease;i++)c=stepCamera(c,0,{x:0,y:0,z:0},{x:0,z:0},0,dt,T);
  const final=cameraPose(c,0,T).distance;
  metrics.push(metric("intro midpoint camera distance",midpoint,"m",{operator:">",value:I.distance+5}));

  let follow=newCamera(T,0,0,0),previousV=0,maxJerk=0;const speed=T.treetopSpeed,velocityChanges:number[]=[];
  for(let i=0;i<600;i++){
    const x=i<300?speed*i*dt:speed*300*dt;
    follow=stepCamera(follow,0,{x,y:0,z:0},{x:i<300?speed:0,z:0},1,dt,T);
    const change=Math.abs(follow.vx-previousV)/dt;maxJerk=Math.max(maxJerk,change);velocityChanges.push(change);previousV=follow.vx;
  }
  metrics.push(metric("following maximum velocity-change rate (original maxJerk)",maxJerk,"m/s²",{operator:"<",value:speed*T.camera.follow*1.2}));

  const local=smallWorldTuning(T,"Local controls, home speaker boot and relative treehouse clearances do not require distant areas."),g=newGame(5,local);
  g.clock.paused=false;const x0=g.witch.x;
  for(let i=0;i<120;i++)stepGame(g,{moveX:1,moveZ:0,toggleMode:false,zoom:0},dt);
  const witchTravel=g.witch.x-x0,cameraTravel=g.camera.tx-x0;
  metrics.push(metric("witch rightward displacement after120 frames",witchTravel,"m",{operator:">",value:5}),metric("camera rightward displacement after120 frames",cameraTravel,"m",{operator:">",value:3}));
  const samples={intro:{seat,seatedFrames:120,dt,ease:I.ease,halfFrames:half,finalFrameBound:60*I.ease,seated,midpoint,final,introRemaining:c.intro},
    follow:{frames:600,movingFrames:300,dt,speed,velocityChanges,maxJerk,finalTarget:speed*300*dt,finalCamera:follow.tx,lookAhead:follow.ax},
    travel:{seed:5,fixture:"original rules.test.ts LOCAL_TUNING",frames:120,dt,controls:{moveX:1,moveZ:0,toggleMode:false,zoom:0},originalWitchX:x0,witchX:g.witch.x,cameraX:g.camera.tx,witchTravel,cameraTravel}};
  const output=process.env.BEHAVIOUR_OUTPUT_DIR;if(!output)throw Error("Run via node tools/behaviour/run.mjs to preserve report artifacts");
  fs.writeFileSync(path.join(output,"camera-travel.json"),JSON.stringify({system:"camera-travel",group:"U7 remaining",sourceDeclarations:3,samples,metrics},null,2)+"\n");
});
