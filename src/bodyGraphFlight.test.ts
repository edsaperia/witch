import {describe,it,expect} from "vitest";
import {FLIGHT_STATES,WING_KINDS,FLAP_FRAMES,flightPose,poseFlightModel} from "../art/body-graph/flight.js";
import {createAcceptanceVariants,acceptanceGraph,buildAcceptanceModel} from "../art/body-graph/acceptance.js";
import {GENOMES,selectedCreatureGenome} from "../art/genome/index.js";
import {compileGraph,validateGraph} from "../art/body-graph/graph.js";
import {Model} from "../art/model3d.js";
import {M} from "../art/core.js";

describe("shared diagnostic flight poses",()=>{
  const pack=createAcceptanceVariants(GENOMES.map(g=>selectedCreatureGenome(g,{})));
  it("samples a closed readable eight-frame stroke with a phase-independent glide",()=>{
    const frames=Array.from({length:FLAP_FRAMES},(_,i)=>flightPose({phase:i/FLAP_FRAMES}));
    expect(new Set(frames.map(p=>p.stroke.toFixed(5))).size).toBeGreaterThanOrEqual(5);
    expect(new Set(frames.map(p=>[p.stroke,p.sweep].map(n=>n.toFixed(5)).join())).size).toBe(8);
    expect(Math.max(...frames.map(p=>p.stroke))).toBeGreaterThan(.6);
    expect(Math.min(...frames.map(p=>p.stroke))).toBeLessThan(-.6);
    expect(flightPose({phase:0}).stroke).toBeCloseTo(flightPose({phase:1}).stroke);
    expect(flightPose({state:"glide",phase:.2}).stroke).toBe(flightPose({state:"glide",phase:.7}).stroke);
    for(const options of [{state:"oops"},{phase:NaN},{progress:2},{pathAngle:2},{legs:"standing"}])expect(()=>flightPose(options)).toThrow();
  });
  it("transitions exactly between folded ground and airborne states with continuous endpoints",()=>{
    const ground=flightPose({state:"grounded"}),air=flightPose({state:"flap"});
    for(const key of ["spread","pitch","lift","stroke","airborne"] as const){
      expect(flightPose({state:"takeoff",progress:0})[key]).toBeCloseTo(ground[key]);
      expect(flightPose({state:"takeoff",progress:1})[key]).toBeCloseTo(air[key]);
      expect(flightPose({state:"landing",progress:0})[key]).toBeCloseTo(air[key]);
      expect(flightPose({state:"landing",progress:1})[key]).toBeCloseTo(ground[key]);
      expect(Math.abs(flightPose({state:"takeoff",progress:.0001})[key]-ground[key])).toBeLessThan(.00001);
    }
  });
  it("builds each state, age and wing kind as valid bounded geometry",()=>{
    for(const kind of WING_KINDS){
      const record=structuredClone(pack.bat.graph);record.look.bodyGraphAcceptance.wingShape.kind=kind;
      for(let age=0;age<4;age++)for(const state of FLIGHT_STATES){
        const {graph}=acceptanceGraph(record,age,0,{state,progress:.5});
        expect(()=>validateGraph(graph)).not.toThrow();
        const {model}=buildAcceptanceModel(record,age,0,{state,progress:.5});
        expect(model.flats.length).toBeGreaterThan(0);
        expect(model.parts.every(p=>p.group<256)).toBe(true);
        const count=new Map<number,number>();for(const p of model.parts)if(!p.cut)count.set(p.group,(count.get(p.group)??0)+1);
        expect(Math.max(...count.values())).toBeLessThanOrEqual(3);
      }
    }
  });
  it("folds wing span, points the head forward in level flight, and turns the hanging head down",()=>{
    const flight=buildAcceptanceModel(pack.bat.graph,2,0,{state:"glide"}).model;
    const hang=buildAcceptanceModel(pack.bat.graph,2,0,{state:"hanging"}).model;
    const a=acceptanceGraph(pack.bat.graph,2,0,{state:"glide"}).graph;
    const b=acceptanceGraph(pack.bat.graph,2,0,{state:"hanging"}).graph;
    const width=(g:typeof a)=>Math.max(...(g as typeof a&{flight:{marks:{tips:number[][]}[]}}).flight.marks.flatMap(m=>m.tips.map(t=>Math.abs(t[2]))));
    const head=(m:typeof flight)=>(m.anchors as unknown as {head:{c:number[]}}).head.c;
    const front=(a.spine as {at:number[]}[]).at(-1)!.at;
    expect(width(b)).toBeLessThan(width(a)*.25);
    expect(head(flight)[0]).toBeGreaterThan(front[0]+.1);
    expect(head(flight)[1]).toBeLessThan(.75);
    expect(head(hang)[1]).toBeLessThan(0);
    expect(Math.abs(compileGraph(a).sockets.head[1]-front[1])).toBeLessThan(.1);
  });
  it("rigidly transforms surfaces, planes, paint and landmarks together",()=>{
    const m=new Model();m.ell([1,.38,0],[.2,.1,.1],M.BODY,{paint:(p:number[])=>p[0]>.9?M.ACCENT:undefined});
    m.flat([1,.38,0],[1,0,0],[0,0,1],.2,.1,()=>M.WEB);
    const anchor={c:[1,.38,0],r:[.2,.1,.1]};Object.assign(m.anchors,{head:anchor});
    poseFlightModel(m,flightPose({state:"hanging"}));
    expect(m.parts[0].c).toEqual(m.flats[0].c);expect(m.parts[0].c).toEqual(anchor.c);
    expect(m.parts[0].paint!(m.parts[0].c)).toBe(M.ACCENT);
    expect(m.field(m.parts[0].c)).toBeLessThan(0);
  });
  it("does not mutate records or affect other five candidates",()=>{
    const before=JSON.stringify(pack);
    for(const id of ["bear","wolf","stag","snail","hydra"]){
      expect(acceptanceGraph(pack[id].graph,2,0,{state:"hanging"})).toEqual(acceptanceGraph(pack[id].graph,2,0));
    }
    for(let i=0;i<8;i++)buildAcceptanceModel(pack.bat.graph,2,0,{phase:i/8});
    expect(JSON.stringify(pack)).toBe(before);
  });
});
