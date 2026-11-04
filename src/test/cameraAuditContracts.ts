// U7 shared test-only contracts: pure camera poses/tracking and a controlled real-game input step.
import {expect} from "vitest";
import {cameraPose,newCamera,stepCamera} from "../rules/camera";
import {STEP,stepGame,type Game} from "../rules/game";
import type {Tuning} from "../rules/tuning";

export function assertIntroCameraContract(t:Tuning):void {
  const I=t.camera.intro,seat={x:10,y:6,z:20};let c=newCamera(t,0,0,0);
  for(let i=0;i<120;i++)c=stepCamera(c,0,{x:0,y:0,z:0},{x:0,z:0},0,1/60,t,true,seat);
  const p0=cameraPose(c,0,t);
  expect(p0.distance).toBeCloseTo(I.distance,1);expect(p0.distance).toBeLessThan(t.camera.ground.distanceIn);
  expect(Math.hypot(p0.tx-seat.x,p0.ty-seat.y,p0.tz-seat.z)).toBeLessThan(0.5);
  const half=Math.round(I.ease/2*60);
  for(let i=0;i<half;i++)c=stepCamera(c,0,{x:0,y:0,z:0},{x:0,z:0},0,1/60,t);
  const mid=cameraPose(c,0,t).distance;expect(mid).toBeGreaterThan(I.distance);
  for(let i=0;i<60*I.ease;i++)c=stepCamera(c,0,{x:0,y:0,z:0},{x:0,z:0},0,1/60,t);
  expect(c.intro).toBe(0);expect(cameraPose(c,0,t).distance).toBeGreaterThan(mid);
}

export function assertFollowingCameraContract(t:Tuning):void {
  let c=newCamera(t,0,0,0);const speed=t.treetopSpeed,dt=1/60;
  for(let i=0;i<600;i++){
    const x=i<300?speed*i*dt:speed*300*dt;
    c=stepCamera(c,0,{x,y:0,z:0},{x:i<300?speed:0,z:0},1,dt,t);
    expect(c.tx).toBeLessThanOrEqual(speed*300*dt+t.camera.lookAheadMax+1e-6);
  }
  expect(Math.abs(c.tx-speed*300*dt)).toBeLessThan(0.5);
  expect(Math.abs(c.ax)).toBeLessThanOrEqual(t.camera.lookAheadMax);
}

export function assertGameCameraCoupling(g:Game):void {
  const floor=g.map.dancefloor,x=floor.x,z=floor.z+floor.radius+20;
  g.clock.paused=false;g.party.paused=true;g.wake=undefined;
  g.witch={...g.witch,x,z,vx:0,vz:0,mode:"ground",lift:0,seated:false,perch:false,falling:undefined};
  g.camera={...newCamera(g.tuning,x,0,z),intro:0};
  const player=g.witches[0].id;
  stepGame(g,{moveX:1,moveZ:0,toggleMode:false,zoom:0,autoTalk:false},STEP);
  expect(g.witches[0].id).toBe(player);expect(g.witch.vx).toBeGreaterThan(0);expect(g.witch.x).toBeGreaterThan(x);
  expect(g.camera.tx).toBeGreaterThan(x);expect(g.camera.tx).toBeLessThanOrEqual(g.witch.x+g.tuning.camera.lookAheadMax+1e-6);
  const pose=cameraPose(g.camera,0,g.tuning);
  for(const key of ["x","y","z","tx","ty","tz","angle","distance"] as const)expect(Number.isFinite(pose[key])).toBe(true);
}
