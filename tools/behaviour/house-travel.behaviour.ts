// H4 house observations; historical outcome references are informational, never release gates.
import fs from "node:fs";
import path from "node:path";
import {it} from "vitest";
import {metric} from "./results.mjs";
import {TUNING} from "../../src/rules/tuning";
import {newGame,stepGame,STEP,type Controls,type Game} from "../../src/rules/game";
import {smallWorld} from "../../src/test/worlds";
import {deckOf,onFloor,onTerrace} from "../../src/rules/treehouse";
import {homeArea} from "../../src/rules/homeArea";
import {houseGuards} from "../../src/rules/houseGuard";
import {TRAVEL} from "../../src/rules/travel";
import {FIGHT} from "../../src/rules/movement";
import {HOUSE_ROOMS,fromPlan,objectFront} from "../../src/rules/houseRooms";
const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };

/** A night under way, her three followers (a wolf, a fox and a baby boar) on her stack at her feet under the treehouse, nothing else
 *  near; she's `where`: up in the treehouse on its floor, or over it in the treetops. */
function night(where: "house" | "treetops"): { g: Game; ids: number[] } {
  // Four authored areas retain >200 m recruits and a neighbouring destination; the rest of the island is unrelated work.
  const g = newGame(77, { ...TUNING, map: { ...TUNING.map!, island: "", islandAreas: 4, found: [] } }), d = deckOf(g.map, g.tuning)!;
  g.clock.paused = false; g.party.paused = true;
  g.witch = where === "house" ? { ...g.witch, seated: false, perch: true, mode: "ground", lift: 0, x: d.x, z: d.z, vx: 0, vz: 0 } : { ...g.witch, seated: false, perch: false, mode: "treetop", lift: 1, x: d.x, z: d.z, vx: 0, vz: 0 };
  const H = homeArea(g.map);
  for (const c of g.creatures) if (H.inside(c.x, c.z) || Math.hypot(c.x - d.x, c.z - d.z) < 80) c.gone = true;
  const spare = g.creatures.filter(c => !c.gone && !c.leashed && !c.boss && !c.partyLegend && Math.hypot(c.x - d.x, c.z - d.z) > 200);
  const ids = ([["wolf", 2], ["fox", 2], ["boar", 0]] as const).map(([species, level], i) => {
    const c = spare[i], x = d.x + (i - 1) * 3, z = d.z + 4;
    Object.assign(c, { circle: undefined, species, level, x, z, tx: x, tz: z, homeX: x, homeZ: z, anchorX: x, anchorZ: z, safeR: undefined, seen: g.clock.time, hp: undefined, boss: false, siege: undefined, enraged: false, rest: 0, fight: undefined, fleeUntil: undefined, leashed: true, travelling: false, route: undefined });
    c.cell = g.map.cellSafe(x, z).cell as [number, number];
    g.leash.stack.push(c.id);
    return c.id;
  });
  g.byArea = null;
  return { g, ids };
}
/** Play until the world's clock has run `secs` (up in the treehouse it runs at a tenth of hers). */
const play = (g: Game, secs: number, each?: () => boolean) => { const end = g.clock.time + secs; for (let i = 0; g.clock.time < end && i < 2e5; i++) { stepGame(g, idle, STEP); if (each?.()) return true; } return false; };

const deck = (g: Game) => deckOf(g.map, g.tuning)!;
const obj = (id: string) => HOUSE_ROOMS.objects.find(o => o.id === id)!;
const room = (id: string) => HOUSE_ROOMS.rooms.find(q => q.id === id)!;

/** In the house mid-night: landed, off her decks, at (dx, dz) metres from the Terrace's middle. */
function inHouse(dx: number, dz: number, tuning = TUNING): Game {
  const g = roomGame(123, tuning), W = g.witches[0], d = deck(g);
  g.clock.paused = false; g.party.paused = true;
  for (let i = 0; i < 0.3 / STEP; i++) stepGame(g, { ...idle, moveZ: -1 }, STEP); // (off her seat at the decks)
  W.body = { ...W.body, x: d.x + dx, z: d.z + dz, vx: 0, vz: 0, perch: true, mode: "ground", lift: 0 };
  for (let i = 0; i < 0.5 / STEP; i++) stepGame(g, idle, STEP);
  return g;
}
/** A point on the house's plan as metres from the Terrace's middle in the world. */
const plan = (x: number, z: number) => fromPlan({ x: 0, z: 0 }, x, z);
/** In front of an object (off its side facing into its room), as metres from the Terrace's middle in the world. */
const before = (o: ReturnType<typeof obj>, by = 0.4) => objectFront(o, { x: 0, z: 0 }, by);
/** A limb's middle line on the plan, from `a`'s end to `b`'s (the trunk's run bottom to top, a branch from its trunk room out). */
const limb = (a: string, b: string): [number, number][] => {
  const c = HOUSE_ROOMS.corridors.find(q => q.id === `${a}-${b}`) ?? HOUSE_ROOMS.corridors.find(q => q.id === `${b}-${a}`)!;
  return c.id === `${a}-${b}` ? c.pts! : [...c.pts!].reverse();
};
/** Walks her through the plan's points in turn (each a waypoint, steered at her walk) and gives back the seconds it took and whether
 *  she stayed on the floor the whole way; gives up after `limit` seconds. */
function follow(g: Game, pts: [number, number][], limit = 60): { secs: number; onFloorAll: boolean; got: boolean } {
  const d = deck(g), W = g.witches[0];
  let t = 0, i = 0, all = true;
  while (i < pts.length && t < limit) {
    const p = plan(pts[i][0], pts[i][1]), dx = d.x + p.x - W.body.x, dz = d.z + p.z - W.body.z, L = Math.hypot(dx, dz);
    if (L < (i === pts.length - 1 ? 0.4 : 1.2)) { i++; continue; }
    stepGame(g, { ...idle, moveX: dx / L, moveZ: dz / L }, STEP); t += STEP;
    if (!onFloor(d, W.body.x, W.body.z, 1e-6) || W.body.mode !== "ground") all = false;
  }
  return { secs: t, onFloorAll: all, got: i === pts.length };
}


const roomGame=smallWorld(newGame,"Room walls, furniture, doors and Terrace landings use one house's layout, independent of island extent.");
it("reports original guard journeys and the complete bed-to-Terrace takeoff route",()=>{
  const metrics:ReturnType<typeof metric>[]=[],samples:Record<string,unknown>={};
  {
    const {g,ids}=night("house"),H=homeArea(g.map),spots=new Map(houseGuards(g.witches[0],g.creatures,g.map,g.tuning).map(p=>[p.id,p]));
    play(g,40);
    const arrivals=ids.map(id=>{const c=g.creatures[id],s=spots.get(id)!;return {id,species:c.species,inHome:H.inside(c.x,c.z),spotDistance:Math.hypot(c.x-s.x,c.z-s.z),witchDistance:Math.hypot(c.x-g.witch.x,c.z-g.witch.z),travelling:!!c.travelling};});
    for(const a of arrivals)metrics.push(metric(a.species+" guard in home after40 world seconds",+a.inHome,"boolean",{operator:">=",value:1}),metric(a.species+" guard distance from assigned spot",a.spotDistance,"m",{operator:"<",value:12}),metric(a.species+" guard distance from witch",a.witchDistance,"m",{operator:">",value:10}),metric(a.species+" guard arrived",+!a.travelling,"boolean",{operator:">=",value:1}));
    samples.guard={seed:77,authoredAreas:4,worldSeconds:40,clock:g.clock.time,arrivals,stack:g.leash.stack,placed:g.leash.placed};
  }
  {
    const {g,ids}=night("house");play(g,40);
    const [cx,cy]=g.map.centreCell,next=[[1,0],[-1,0],[0,1],[0,-1]].map(([i,j])=>[cx+i,cy+j]).find(([x,y])=>g.map.playable(x,y))!,to=g.map.siteOf(next[0],next[1]);
    g.witch={...g.witch,perch:false,mode:"treetop",lift:1,x:to.x,z:to.z,vx:0,vz:0};
    for(const c of g.creatures)if(!c.leashed&&Math.hypot(c.x-to.x,c.z-to.z)<150)c.gone=true;
    g.byArea=null;const hold=()=>{g.witches[0].health.hp=1e6;return false;};
    play(g,1,hold);const airborne=ids.map(id=>({id,travelling:!!g.creatures[id].travelling}));
    for(const a of airborne)metrics.push(metric("guard"+a.id+" travelling after takeoff",+a.travelling,"boolean",{operator:">=",value:1}));
    play(g,90,hold);g.witch={...g.witch,mode:"ground",lift:0};play(g,20,hold);
    const posse=TRAVEL.posse*FIGHT.scale,reunion=ids.map(id=>{const c=g.creatures[id];return {id,distance:Math.hypot(c.x-g.witch.x,c.z-g.witch.z),travelling:!!c.travelling};});
    for(const a of reunion)metrics.push(metric("guard"+a.id+" reunion distance",a.distance,"m",{operator:"<",value:posse}),metric("guard"+a.id+" in landed posse",+!a.travelling,"boolean",{operator:">=",value:1}));
    samples.reunion={seed:77,authoredAreas:4,worldSeconds:[40,1,90,20],destination:to,airborne,reunion,stack:g.leash.stack,placed:g.leash.placed};
  }
  {
    const b=before(obj("bed"),0.6),g=inHouse(b.x,b.z),T=room("terrace"),W=g.witches[0],d=deck(g),R=room("bedroom");
    const down:[number,number][]=[[R.x,R.z],...limb("bedroom","boudoir"),...limb("boudoir","parlour"),...limb("parlour","terrace")],walked=follow(g,down),terrace=onTerrace(d,W.body.x,W.body.z);
    const a=40*Math.PI/180,ways:[number,number][]=[[10,4],[T.x+Math.cos(a)*(T.r+5),T.z+Math.sin(a)*(T.r+5)]];let t=walked.secs;
    for(let i=0,w=0;i<20/STEP&&W.body.mode==="ground";i++){
      const p=plan(ways[w][0],ways[w][1]),dx=d.x+p.x-W.body.x,dz=d.z+p.z-W.body.z,L=Math.hypot(dx,dz)||1;
      if(L<1&&w===0)w=1;stepGame(g,{...idle,moveX:dx/L,moveZ:dz/L},STEP);t+=STEP;
    }
    metrics.push(metric("bed-to-Terrace takeoff time",t,"player seconds",{operator:"<",value:26}));
    samples.rooms={seed:123,fixture:"original smallWorld wrapper",down,ways,walked,terrace,finalMode:W.body.mode,totalSeconds:t,walkSpeed:g.tuning.treehouse.house!.walk};
  }
  const output=process.env.BEHAVIOUR_OUTPUT_DIR;if(!output)throw Error("Run via node tools/behaviour/run.mjs to preserve report artifacts");
  fs.writeFileSync(path.join(output,"house-travel.json"),JSON.stringify({system:"house-travel",group:"H4 house",sourceDeclarations:3,samples,metrics},null,2)+"\n");
},300_000);
