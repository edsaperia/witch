import {createHash} from "node:crypto";
import {describe,expect,it} from "vitest";
import {critter,withView} from "../art/creatures.js";
import {defaultStyle} from "../art/generator.js";
import {GENOME_BY_ID} from "../art/genome/index.js";
import {catCaptureGenome} from "../tools/body-graph/cat-fixtures.js";
import {connectivityRegression} from "../art/genome/connectivity.js";
import gameStyle from "../config/style.json";
import tuning from "../config/tuning.json";
import type {Style} from "./render/style";

const current={...defaultStyle(),...gameStyle,artStyle:"bold",pixel:tuning.pixelSize} as unknown as Style;
function context(minPx=1.5){const record=catCaptureGenome(GENOME_BY_ID.snowleopard);record.levels[2].head.whiskerMinPx=minPx;return {...current,creatureModels:"snowleopard:graph",creatureVariants:{snowleopard:{graph:record}}} as unknown as Style;}
function draw(style:Style,frame:number,facing:string){const build=()=>critter("snowleopard",2,frame,style,facing==="top"?"towards":facing);return facing==="top"?withView({yaw:.6,pitch:Math.PI/2},build):build();}
describe("snow leopard subpixel whisker attachment",()=>{
  it("pins projected-fit Current material and normal bytes with the control absent",()=>{
    const hash=createHash("sha256");for(const facing of ["towards","away","top"]){const sp=draw(current,0,facing);hash.update(JSON.stringify([sp.w,sp.h]));for(const bytes of [sp.m,sp.n])hash.update(Buffer.from(bytes.buffer,bytes.byteOffset,bytes.byteLength));}
    // Projected-fit baseline (6519883775), rather than the superseded sphere-fit grid.
    expect(hash.digest("hex")).toBe("44c8b0080d589fdc63692869654307f569528dbea10d226c5f99f251fb5ecd2c");
  });
  it("keeps top-view attachment non-worsening with the pixel floor on the projected grid",()=>{
    const baseline=draw(current,0,"top"),before=connectivityRegression(baseline,draw(context(0),0,"top")),after=connectivityRegression(baseline,draw(context(),0,"top"));
    expect(after.good).toBe(true);
    expect(after.candidate.components.length).toBeLessThanOrEqual(before.candidate.components.length);
    expect(after.candidate.detachedPixels).toBeLessThanOrEqual(before.candidate.detachedPixels);
  });
  it.each([0,1])("passes the unchanged paired guard in all adult facings for frame %s",frame=>{
    const selected=context();for(const facing of ["towards","away","top"]){const comparison=connectivityRegression(draw(current,frame,facing),draw(selected,frame,facing));expect(comparison.good,`${facing}: ${JSON.stringify(comparison)}`).toBe(true);}
  },20000);
  it("rejects invalid pixel floors",()=>{expect(()=>draw(context(-1),0,"towards")).toThrow(/whiskerMinPx/);});
});
