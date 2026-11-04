// W8, Ed 2026-11-02: direct supplied fixtures keep coverage without requiring random-world occurrences.
import { describe, expect, it } from "vitest";
import { AREA_TYPES, type ForestMap } from "./map";
import { plantType } from "./forest";
import { PathNetwork } from "./paths";
import { TUNING } from "./tuning";

/** Public PathNetwork input: two deliberately crossing graph edges, not a generated game. */
const network = (fingerposts=false, rails=false, broken=0) => {
  const wet=AREA_TYPES.findIndex(t=>t.wet),dry=AREA_TYPES.findIndex(t=>!t.wet);
  const bounds={minX:-300,maxX:300,minZ:-300,maxZ:300};
  const map={seed:7,shape:"square",bounds,extent:bounds,cells:[],centreCell:[99,99],areaSize:200,
    tuning:{...TUNING,beach:{...TUNING.beach!,on:false},setPieceClear:0,setPieceScale:1,
      paths:{...TUNING.paths,network:false,pieces:true,rails:rails?[1,1]:[0,0],roads:[0,0],streams:[0,0],linkChance:1,deadEndChance:0,fingerposts,railBroken:broken}},
    neighbours:rails?new Map():new Map([["-1,0",["1,0"]],["1,0",["-1,0"]],["0,-1",["0,1"]],["0,1",["0,-1"]]]),
    siteOf:(cx:number,cy:number)=>({x:cx*200,z:cy*200}),typeOf:(cx:number)=>cx===0?wet:dry,
    areaAt:(x:number,z:number)=>({cell:[Math.floor(x/200),Math.floor(z/200)],type:dry,look:dry,openness:1}),
    playable:()=>true,inBuffer:()=>true,hardClear:()=>false,reserved:()=>false
  } as unknown as ForestMap;
  return new PathNetwork(map);
};

describe("W8 direct world contract fixtures",()=>{
  it("uses the displaced nearby look within the blend bound and the exact own look at zero width",()=>{
    const queried:[number,number][]=[];
    const map={seed:123,tuning:{...TUNING,areaEdgeBlend:{...TUNING.areaEdgeBlend,width:80,stray:1,warp:0}},
      areaAt:(x:number,z:number)=>{queried.push([x,z]);return {look:Math.hypot(x,z)<1e-9?0:1};}
    } as unknown as ForestMap;
    expect(plantType(map,0,0,1,2,3)).toBe(1);
    expect(queried).toHaveLength(1);
    expect(Math.hypot(...queried[0])).toBeGreaterThan(0);
    expect(Math.hypot(...queried[0])).toBeLessThanOrEqual(80*Math.SQRT2);
    const exact={...map,tuning:{...map.tuning,areaEdgeBlend:{...map.tuning.areaEdgeBlend,width:0,warp:0}}};
    queried.length=0;
    expect(plantType(exact,0,0,1,2,3)).toBe(0);expect(queried).toEqual([[0,0]]);
  });
  it("places a bridge on the deliberately crossing path and stream, with a real queryable footprint",()=>{
    const p=network();p.placePieces();
    const bridges=p.pieces.filter(p=>p.id.includes("bridge"));
    expect(bridges.length).toBeGreaterThan(0);
    for(const bridge of bridges){expect(p.at(bridge.x,bridge.z)).not.toBeNull();expect(p.pieceAt(bridge.x,bridge.z)).toBe(bridge);}
  });
  it("adds fingerposts only when enabled, preserving every existing piece",()=>{
    const off=network(),on=network(true);off.placePieces();on.placePieces();
    expect(off.pieces.some(p=>p.id==="fingerpost")).toBe(false);
    expect(on.pieces.filter(p=>p.id==="fingerpost").length).toBeGreaterThan(0);
    expect(on.pieces.filter(p=>p.id!=="fingerpost")).toEqual(off.pieces);
  });
  it("clears intact rail but applies only the configured broken-rail exception",()=>{
    const intact=network(false,true,0),broken=network(false,true,1);
    expect(intact.lines.length).toBeGreaterThan(0);
    expect(broken.lines).toEqual(intact.lines);
    const line=intact.lines[0],point=line.pts[Math.floor(line.pts.length/2)];
    expect(intact.at(...point)?.kind).toBe("rail");expect(broken.at(...point)?.kind).toBe("rail");
    expect(intact.clearance(...point)).toEqual({trees:0,bushes:0});
    expect(broken.clearance(...point)).toEqual({trees:TUNING.paths.treesOnBroken,bushes:1});
  });
});
