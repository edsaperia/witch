// Original AR1/AR2/AR4 numerical observations; references are informational, never release gates.
import fs from "node:fs";
import path from "node:path";
import {it} from "vitest";
import {metric} from "./results.mjs";
import {newPartyWitches,stepPartyWitches,type PartyWitch} from "../../src/rules/partyWitches";
import {TUNING} from "../../src/rules/tuning";
import {SwoopTrails} from "../../src/render/swoopTrails";
import {Ride} from "../../src/render/ride";
const floor = { x: 0, z: 0, radius: 15 };
const areas = (n: number) => Array.from({ length: n }, (_, i) => ({ key: `a${i}`, x: Math.cos(i) * 150, z: Math.sin(i) * 150 }));
const up = [{ x: 0, z: 60, onFoot: false, moving: true, treetop: true }];

function run(tr: SwoopTrails, n: number, secs: number, each: (time: number, list: readonly PartyWitch[]) => void) {
  const s = newPartyWitches(41), as = areas(n);
  for (let i = 0, time = 0; i < secs * 20; i++) { time += 0.05; stepPartyWitches(s, as, floor, up, time, 0.05, TUNING); tr.update(s.list, time); each(time, s.list); }
}
const verts = (tr: SwoopTrails) => {
  const g = tr.mesh.geometry, idx = g.getIndex()!.array as Uint16Array, pos = g.getAttribute("position").array as Float32Array;
  const a = g.getAttribute("aA").array as Float32Array, hue = g.getAttribute("aHue").array as Float32Array, used = new Set<number>();
  for (let i = 0; i < g.drawRange.count; i++) used.add(idx[i]);
  return [...used].map(v => ({ x: pos[v * 3], y: pos[v * 3 + 1], z: pos[v * 3 + 2], a: a[v], hue: hue[v] }));
};

const T = { heightSmooth: 0.2, heightLookAhead: 0.4, heightClearance: 0.3 };
// Rolling ground as steep as the hills get (slopes to about 0.5), read as the game reads it: from
// samples 2 m apart, linearly between them, so its slope kinks at every sample (the jolts).
const hill = (x: number) => 9 * Math.sin(x / 120 * Math.PI * 2) + 0.6 * Math.sin(x / 13);
const ground = (x: number) => { const i = Math.floor(x / 2), f = x / 2 - i, at = (k: number) => hill(k * 2) + 0.15 * Math.sin(k * 12.9898); return at(i) * (1 - f) + at(i + 1) * f; };

it("reports original120s trail activity,60s hues and two600-frame ride samples",()=>{
  const metrics:ReturnType<typeof metric>[]=[],samples:Record<string,unknown>={};
{
{
    const tr = new SwoopTrails();
    let top = 0, most = 0, frames = 0;
    run(tr, 40, 120, (time, list) => {
      const swooping = list.filter(w => w.activity === "swoop" && w.y > 0.05).length;
      if (!swooping) return;
      frames++;
      void [tr.drawn,swooping + 12]; // the swoopers, and a few trailing out
      for (const v of verts(tr)) { void [Number.isFinite(v.x + v.y + v.z + v.a),true]; top = Math.max(top, v.y); }
      most = Math.max(most, tr.drawn);
      void time;
    });
    void [frames,100];
    void [top,TUNING.partyWitches.swoopHeight];
    void [most,2];
      metrics.push(metric("swooping active frames",frames,"frames",{operator:">",value:100}),metric("swoop maximum vertex height",top,"m",{operator:">",value:TUNING.partyWitches.swoopHeight}),metric("swoop peak drawn trails",most,"trails",{operator:">",value:2}));
    samples.trail={seed:41,areas:40,seconds:120,dt:0.05,frames,top,most};
}
}
{
{
    const tr = new SwoopTrails(), hues = new Set<number>();
    run(tr, 40, 60, () => { for (const v of verts(tr)) hues.add(Math.round(v.hue * 20)); });
    void [hues.size,10];
      metrics.push(metric("swoop60s quantized hue variety",hues.size,"hues",{operator:">",value:10}));
    samples.hues={seed:41,areas:40,seconds:60,dt:0.05,quantization:20,hues:[...hues]};
}
}
for(const [v,lift] of [[19,1],[42,20]]){
{
    const r = new Ride(), dt = 1 / 60;
    let x = 0, accRide = 0, accGround = 0;
    const hs: number[] = [], gs: number[] = [];
    for (let i = 0; i < 600; i++) {
      r.update(dt, x, 0, v, 0, v, gx => ground(gx), T, lift);
      hs.push(r.h); gs.push(ground(x));
      void [r.h + lift,ground(x) + T.heightClearance - 1e-6];
      x += v * dt;
    }
    for (let i = 61; i < hs.length - 1; i++) { // (after the first second)
      accRide += ((hs[i + 1] - 2 * hs[i] + hs[i - 1]) / (dt * dt)) ** 2;
      accGround += ((gs[i + 1] - 2 * gs[i] + gs[i - 1]) / (dt * dt)) ** 2;
    }
    // Its up-and-down acceleration, typically, well under the ground's: the bumps and kinks gone
    // (the hill itself, which the treetops follow too, she still rides over).
    void [Math.sqrt(accRide),Math.sqrt(accGround) * 0.7];
      metrics.push(metric("ride acceleration norm at"+v+"m/s lift"+lift,Math.sqrt(accRide),"original unnormalized acceleration norm",{operator:"<",value:Math.sqrt(accGround)*0.7}));
    samples["ride"+v]={v,lift,frames:600,dt,startAccelerationIndex:61,endAccelerationIndex:hs.length-2,rideHeights:hs,groundHeights:gs,accRide,accGround,tuning:T};
}
}
  const output=process.env.BEHAVIOUR_OUTPUT_DIR;if(!output)throw Error("Run via node tools/behaviour/run.mjs to preserve report artifacts");
  fs.writeFileSync(path.join(output,"art-motion.json"),JSON.stringify({system:"art-motion",group:"AR1/AR2/AR4",sourceDeclarations:3,samples,metrics},null,2)+"\n");
},180000);
