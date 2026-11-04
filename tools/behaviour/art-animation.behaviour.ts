// Original AR1/AR2/AR4 numerical observations; references are informational, never release gates.
import fs from "node:fs";
import path from "node:path";
import {it} from "vitest";
import {metric} from "./results.mjs";
import {characterOf,quirkAt} from "../../src/render/character";
import {sleepyFace} from "../../src/render/sleepyFace";
import {dreamSymbol} from "../../src/render/thoughtCloud";
const Z = { face: "😴", weight: 0.8, every: 3.5, faces: ["🥱", "😑", "😌", "🫠", "😮‍💨", "😔", "😪", "☺️"] };
const C = { hold: 1.8, fade: 0.3, flask: 0.25 };
it("reports original quirk, sleeping-face and400-turn dream-symbol samples",()=>{
  const metrics:ReturnType<typeof metric>[]=[],samples:Record<string,unknown>={};
{
{
    const c = characterOf("wolf"), on = (id: number) => { let n = 0; for (let t = 0; t < 120; t += 0.05) if (quirkAt(id, c, t) >= 0) n++; return n * 0.05; };
    const a = on(1), b = on(2);
    void [a,c.for * 120 / c.every[1] * 0.8]; void [a,c.for * 120 / c.every[0] * 1.2 + c.for];
    let differ = 0; for (let t = 0; t < 60; t += 0.1) if ((quirkAt(1, c, t) >= 0) !== (quirkAt(2, c, t) >= 0)) differ++;
    void [differ,10]; // (not in step)
    void [b,0];
      metrics.push(metric("wolf quirk active seconds lower",a,"seconds",{operator:">",value:c.for*120/c.every[1]*0.8}),metric("wolf quirk active seconds upper",a,"seconds",{operator:"<",value:c.for*120/c.every[0]*1.2+c.for}),metric("quirk between-ID differing samples",differ,"samples",{operator:">",value:10}),metric("second wolf quirk active seconds",b,"seconds",{operator:">",value:0}));
    samples.quirks={species:"wolf",ids:[1,2],activeSeconds:120,dt:0.05,dephasingSeconds:60,dephasingDt:0.1,a,b,differ,config:c};
}
}
{
{
    const seen = new Map<string, number>();
    for (let id = 0; id < 40; id++) for (let t = 0; t < 400; t += 3.5) { const f = sleepyFace(id, t, Z); seen.set(f, (seen.get(f) ?? 0) + 1); }
    const all = [...seen.values()].reduce((a, b) => a + b, 0);
    void [seen.get("😴")! / all,0.74]; void [seen.get("😴")! / all,0.86];
    for (const f of Z.faces) void [seen.get(f) ?? 0,0];
      const share=(seen.get(Z.face)??0)/all;
    metrics.push(metric("sleeping default-face share lower",share,"share",{operator:">",value:0.74}),metric("sleeping default-face share upper",share,"share",{operator:"<",value:0.86}),...Z.faces.map(face=>metric("sleeping alternative "+face,seen.get(face)??0,"samples",{operator:">",value:0})));
    samples.faces={ids:{first:0,last:39},seconds:400,dt:3.5,config:Z,seen:Object.fromEntries(seen),all};
}
}
{
{
    void [sleepyFace(3, 10.1, Z),sleepyFace(3, 10.2, Z)];
    let differ = 0;
    for (let t = 0; t < 200; t += 1) if ((sleepyFace(1, t, Z) === "😴") !== (sleepyFace(2, t, Z) === "😴")) differ++;
    void [differ,10];
      metrics.push(metric("sleeping between-ID differing samples",differ,"samples",{operator:">",value:10}));
    samples.faceTurns={holdId:3,holdTimes:[10.1,10.2],ids:[1,2],seconds:200,dt:1,differ};
}
}
{
{
    const kinds: string[] = [];
    for (let k = 0; k < 400; k++) kinds.push(dreamSymbol(k * C.hold + 0.9 - (5 % 11) * C.hold * 0.29, 5, C).kind);
    for (let k = 0; k < kinds.length; k++) void [kinds[k] === "emoji",k % 2 === 0];
    const flasks = kinds.filter(k => k === "flask").length / 200;
    void [flasks,0.12]; void [flasks,0.4];
    void [kinds,"sigil"];
      metrics.push(metric("dream flask share lower",flasks,"odd-turn share",{operator:">",value:0.12}),metric("dream flask share upper",flasks,"odd-turn share",{operator:"<",value:0.4}),metric("dream sigil observed",+kinds.includes("sigil"),"boolean",{operator:">=",value:1}));
    samples.dreams={id:5,turns:400,config:C,kinds,flasks};
}
}
  const output=process.env.BEHAVIOUR_OUTPUT_DIR;if(!output)throw Error("Run via node tools/behaviour/run.mjs to preserve report artifacts");
  fs.writeFileSync(path.join(output,"art-animation.json"),JSON.stringify({system:"art-animation",group:"AR1/AR2/AR4",sourceDeclarations:4,samples,metrics},null,2)+"\n");
},180000);
