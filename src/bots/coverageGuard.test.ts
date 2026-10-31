import {expect,test} from "vitest";import {newCoverageGuard} from "./coverageGuard";import {newCoverage} from "./coverage";import type {Observation} from "./observe";
const frame=(t=0):Observation=>({playerTime:t,worldTime:t,view:{halfWidth:40,halfDepth:40},self:{x:0,z:0,hp:4,mode:"ground",ko:false,seated:false,perched:false,grounded:false},range:30,pickRadius:4,spacing:4,castRadius:5,castBlocked:false,waiting:false,home:{x:0,z:0},carried:[],creatures:[],stones:[],loose:[],placed:[],next:null,straggler:null,victoryPointer:false,legends:[],alarms:[],windups:[],quests:[],find:null,relics:[]});
const enemy=()=>({id:1,species:"cheetah",level:1,boss:false,friendly:false,angry:false,stunned:false,area:"0,0",rune:null,x:30,z:0});
test("full health is required and any damage aborts even when HP remains above four",()=>{
  const guard=newCoverageGuard(),o=frame();o.self.hp=3;expect(guard.update(o,false)).toBe(false);
  o.self.hp=5;expect(guard.update(o,false)).toBe(true);o.self.hp=4;expect(guard.update(o,false)).toBe(false);expect(guard.snapshot().reason).toBe("damage");
});
test("KO, healing, alarm and every audible windup block optional coverage",()=>{
  const guard=newCoverageGuard();for(const kind of ["KO","healing","alarm","windup"]){const o=frame();if(kind==="KO")o.self.ko=true;if(kind==="alarm")o.alarms=[{x:100,z:0}];if(kind==="windup")o.windups=[{x:25,z:0}];expect(guard.update(o,kind==="healing"),kind).toBe(false);}
});
test("visible unangered adults at thirty metres block; sleeping legends and friendly adults do not",()=>{
  const guard=newCoverageGuard(),o=frame();o.creatures=[enemy()];expect(guard.update(o,false)).toBe(false);
  o.creatures=[{...enemy(),rune:{x:30,z:0}}];expect(guard.update(o,false)).toBe(false);
  o.creatures=[{...enemy(),x:30.001}];expect(guard.update(o,false)).toBe(true);
  o.creatures=[{...enemy(),boss:true,level:3}];expect(guard.update(o,false)).toBe(true);
  o.creatures[0].angry=true;expect(guard.update(o,false)).toBe(false);
  o.creatures=[{...enemy(),friendly:true}];expect(guard.update(o,false)).toBe(true);
});
test("an unsafe job consumes its slot and cannot resume after the cue clears",()=>{
  const coverage=newCoverage(),guard=newCoverageGuard(),o=frame();coverage.observe(o);expect(coverage.waypoint(o)).not.toBeNull();
  o.playerTime=.5;o.creatures=[enemy()];expect(guard.update(o,false)).toBe(false);coverage.cancelUnsafe(o);expect(coverage.snapshot().job).toBeNull();
  o.playerTime=1;o.creatures=[];expect(guard.update(o,false)).toBe(true);expect(coverage.waypoint(o)).toBeNull();
  o.playerTime=30;expect(coverage.waypoint(o)).not.toBeNull();
});
test("the HP3 episode before the recorded KO is rejected before a close cheetah pass",()=>{
  const guard=newCoverageGuard(),o=frame(30.133333);o.self.hp=3;expect(guard.update(o,false)).toBe(false);
  o.self.hp=4;o.playerTime=32.533333;o.creatures=[{...enemy(),x:24.108059}];expect(guard.update(o,false)).toBe(false);
  // Cue rejection is not a counterfactual assertion that the later KO is prevented.
});
