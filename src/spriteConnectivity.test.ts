import { describe, expect, it } from "vitest";
import { spriteConnectivity } from "../art/genome/connectivity.js";

function mask(rows:string[]) { return { w:rows[0].length,h:rows.length,m:Uint8Array.from(rows.join(""), x=>x==="."?0:1) }; }
describe("sprite attachment guard",()=>{
  it("accepts diagonal contacts but never wraps across row boundaries",()=>{
    expect(spriteConnectivity(mask(["#..",".#.","..#"])).connected).toBe(true);
    expect(spriteConnectivity(mask(["..#","#.."])).components).toEqual([1,1]);
  });
  it("rejects a detached eight-pixel ear with a two-row background gap",()=>{
    const sp=mask([".###..",".###..","..##..","......","......","######","######"]);
    expect(spriteConnectivity(sp)).toEqual({connected:false,components:[12,8],detachedPixels:8});
    // One narrow diagonal bridge is enough; no area threshold hides a defect.
    sp.m[3*sp.w+2]=1;sp.m[4*sp.w+2]=1;
    expect(spriteConnectivity(sp).connected).toBe(true);
  });
  it("fails empty masks and retains isolated single bright pixels",()=>{
    expect(spriteConnectivity(mask(["..."])).connected).toBe(false);
    const sp=mask(["##...","##..#"]);sp.m[9]=255;
    expect(spriteConnectivity(sp).detachedPixels).toBe(1);
  });
});
