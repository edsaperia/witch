import {expect,it} from "vitest";
import {buildCreature,speciesFor} from "../art/creatures.js";
import {withForm,withGear,withTexture} from "../art/creatures3d.js";
import {defaultStyle} from "../art/generator.js";
import {Sprite} from "../art/core.js";

it.each(["wolf","woodlouse","rhino"])("capture-only %s fit keeps exactly the full-raster scale and geometry",id=>{
 const st=defaultStyle(),S=speciesFor(id,st,3);
 const capture=(rig:boolean)=>{
  let got:any;
  const form=Object.assign((m:any,o:any)=>{got={scale:o.scale,parts:m.parts,flats:m.flats,joints:m.rig};return new Sprite(1,1);},{rig,motes:false});
  withTexture({S,level:3,st},()=>withGear({stilt:true,shoes:null,face:null,faceStyle:S.face},()=>withForm(form,()=>buildCreature(S,3,0,st,"towards"))));
  return got;
 };
 const full=capture(false),measured=capture(true);
 expect(measured.scale).toBe(full.scale);
 // Geometry/material records match; independently built paint/mask closures
 // have distinct JS identities and are deliberately excluded by serialization.
 expect(JSON.stringify(measured.parts)).toBe(JSON.stringify(full.parts));
 expect(JSON.stringify(measured.flats)).toBe(JSON.stringify(full.flats));
 expect(measured.joints).toEqual(full.joints);
});
