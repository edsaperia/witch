// U1 observations: original bag-preview loops and three chart worlds; thresholds are informational only.
import fs from "node:fs";
import path from "node:path";
import {it} from "vitest";
import {metric} from "./results.mjs";
import {BagSim,SCENE} from "../../src/ui/bagSim";
import {BAGS,bagTuning} from "../../src/rules/bags";
import {TUNING} from "../../src/rules/tuning";
import {islandAt} from "../../src/app/chartLayout";
import {bearingOf,KIND_NAMES,KINDS,worldOf} from "../../src/rules/rosters";

function loop(bag:string){
  const s=new BagSim(bag);let thrown=0,landed=0,far=0;
  for(let t=0;t<SCENE.loop-0.05;t+=SCENE.step){
    const next=s.inv.next,hits=s.dummies.map(d=>d.hitAt);s.step(SCENE.step);
    thrown+=s.inv.next-next;landed+=s.dummies.filter((d,i)=>d.hitAt!==hits[i]).length;
    for(const letter of s.inv.letters)far=Math.max(far,letter.flown);
  }
  return {thrown,landed,far};
}

it("reports three U1 bag-preview and chart distribution declarations",()=>{
  const metrics:ReturnType<typeof metric>[]=[],samples:Record<string,unknown>={};
  const add=(id:string,value:number,operator:">"|"<"|">="|"<=",reference:number,unit="count")=>metrics.push(metric(id,value,unit,{operator,value:reference}));
  const bags=Object.fromEntries(BAGS.map(b=>[b.id,loop(b.id)]));
  add("preview bumbag throws versus satchel",bags.bumbag.thrown,">",bags.satchel.thrown);
  add("preview satchel throws versus purse",bags.satchel.thrown,">",bags.purse.thrown);
  for(const b of BAGS){
    const every=bagTuning(TUNING,b.id).invites.cooldown;
    add(`preview ${b.id} minimum loop throws`,bags[b.id].thrown,">=",3*Math.floor((SCENE.loop/3-SCENE.wait)/every));
    add(`preview ${b.id} landed loop letters`,bags[b.id].landed,">",0);
  }
  const farHits:Record<string,boolean>={};
  for(const bag of ["bumbag","satchel","purse"]){
    const s=new BagSim(bag);let hit=false;
    for(let t=0;t<SCENE.loop-0.05;t+=SCENE.step){const before=s.dummies[2].hitAt;s.step(SCENE.step);if(s.dummies[2].hitAt!==before)hit=true;}
    farHits[bag]=hit;add(`preview ${bag} far-dummy hit`,Number(hit),bag==="purse"?">=":"<=",bag==="purse"?1:0,"boolean (0/1)");
  }
  samples.bags={scene:SCENE,stopBefore:SCENE.loop-0.05,dt:SCENE.step,bags,farHits,rateAndLandedShareIdenticalDeterministicLoop:true};

  const charts=[];
  for(const world of [0,1,2]){
    const drift:number[]=[],sum=[0,0,0,0,0,0],count=[0,0,0,0,0,0];
    for(const k of KIND_NAMES){
      const at=islandAt(k,world)!,distance=Math.hypot(at.x,at.y),phase=KINDS[k].phase+1,drawn=Math.atan2(at.x,-at.y)*180/Math.PI;
      drift.push(Math.abs(((drawn-bearingOf(k,world))%360+540)%360-180));sum[phase]+=distance;count[phase]++;
    }
    drift.sort((a,b)=>a-b);
    add(`chart world${world} median bearing drift`,drift[drift.length>>1],"<",12,"degrees");
    add(`chart world${world} maximum bearing drift`,drift[drift.length-1],"<",60,"degrees");
    for(let phase=3;phase<=5;phase++)add(`chart world${world} phase${phase} radius growth`,sum[phase]/count[phase]-sum[phase-2]/count[phase-2],">",0.05,"disc radius");
    const quadrants=[];
    for(let q=0;q<4;q++){
      const n=KIND_NAMES.filter(k=>{const at=islandAt(k,world)!,a=Math.atan2(at.y,at.x);return Math.floor(((a/(Math.PI/2))%4+4)%4)===q;}).length;
      quadrants.push(n);add(`chart world${world} quadrant${q} lower`,n,">",KIND_NAMES.length/6);add(`chart world${world} quadrant${q} upper`,n,"<",KIND_NAMES.length*0.375);
    }
    charts.push({world,islands:worldOf(world).islands.size,kinds:KIND_NAMES,drift,sum,count,quadrants});
  }
  samples.charts=charts;
  const output=process.env.BEHAVIOUR_OUTPUT_DIR;if(!output)throw Error("Run via node tools/behaviour/run.mjs to preserve report artifacts");
  fs.writeFileSync(path.join(output,"ui-preview.json"),JSON.stringify({system:"ui-preview",group:"U1",sourceDeclarations:3,samples,metrics},null,2)+"\n");
},120_000);
