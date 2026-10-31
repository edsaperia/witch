import { describe, expect, it } from "vitest";
import { ik2, followChain, footCycle, dutyFactor, rigDirection, rigWorld, RigBody, RigOut, stiltLift, STILT_MAX_LEGS, STILT_MAX_BONE_STEPS } from "./rig";
import type { RigMeta } from "./rigBuild";

// A four-legged body in model units: torso at the origin, legs 0.6 long, a disc of every radius.
const piece = (frame: number) => ({ frame, px: 0, py: 0 }), five = (f: number) => [0, 1, 2, 3, 4].map(i => piece(f + i));
const leg = (name: string, fore: boolean, side: number) => ({ name, fore, side, hip: [fore ? 0.4 : -0.4, 0, side * 0.15], knee: [fore ? 0.42 : -0.35, -0.3, side * 0.15], foot: [fore ? 0.4 : -0.4, -0.6, side * 0.15], r: [0.08, 0.06, 0.05], fl: 0.06, mat: 1, hoof: false }) as RigMeta["legs"][number];
const META: RigMeta = { template: "quadruped", s: 40, torso: five(0), head: five(10), tail: five(20), faces: {}, discs: { 1: Object.fromEntries([1, 2, 3, 4].map(r => [r, piece(30 + r)])) }, legs: [leg("legFN", true, 1), leg("legFF", true, -1), leg("legHN", false, 1), leg("legHF", false, -1)], neck: [0.55, 0.15, 0], headAt: [0.6, 0.2, 0], tailAt: [-0.5, 0.05, 0], top: 0.4, len: 0.5, spine: [] };
const lay = (sleep: number, droop = sleep) => { const b = new RigBody(), out = new RigOut(); b.update(0, 0, 0, 1, 0); b.quadruped(META, 1, 1 / 60, { crouch: 0, charging: false, air: 0, sleep, droop }, out); return out.items.slice(0, out.n).map(it => ({ f: it.piece.frame, y: it.y })); };
/** Walks a body at `speed` m/s along `dir` (radians) for `secs`, at `fps`, u2m metres per unit: how far its planted feet slid, as a share of the way it went. */
function slide(speed: number, dir = 0, secs = 4, fps = 60, u2m = 1, stiltLength = 1): number {
  const b = new RigBody(), out = new RigOut(), dt = 1 / fps, prev = new Float32Array(12);
  let x = 0, z = 0, slid = 0, went = 0;
  b.update(x, z, 0);
  for (let f = 0; f < secs * fps; f++) {
    x += Math.cos(dir) * speed * dt; z += Math.sin(dir) * speed * dt; went += speed * dt;
    b.update(x, z, dt); out.reset(); b.quadruped(META, u2m, dt, { crouch: 0, charging: false, air: 0, stiltLength }, out);
    if (f > fps) for (let k = 0; k < 4; k++) if (b.feet[k * 3 + 2] && prev[k * 3 + 2]) slid += Math.hypot(b.feet[k * 3] - prev[k * 3], b.feet[k * 3 + 1] - prev[k * 3 + 1]) / 4;
    prev.set(b.feet);
  }
  return slid / (went * (secs * fps - fps) / (secs * fps));
}

describe("the live rig (#79 stage 5)", () => {
  const stiltPose = (length?: number, tip = .08, meta = META, strength?: number) => {
    const body = new RigBody(), out = new RigOut(); body.update(0,0,0);
    body.quadruped(meta, 1, 1/60, { crouch:0,charging:false,air:0,stiltLength:length,stiltTip:tip,stiltStrength:strength }, out);
    return { body, items:out.items.slice(0,out.n) };
  };
  it('leaves the ordinary rig exactly unchanged at zero or unit stilt length', () => {
    expect(stiltPose(0).items).toEqual(stiltPose().items);
    expect(stiltPose(1,.02).items).toEqual(stiltPose().items);
    expect(stiltPose(12,.02,META,0).items).toEqual(stiltPose().items);
    expect(stiltLift(META,0)).toBe(0);
  });
  it('lifts normal-sized torso/head/tail on tapered legs while feet keep their ground targets', () => {
    const base = stiltPose(1), tall = stiltPose(6), lift = stiltLift(META,6);
    for (let i=0;i<3;i++) {
      expect(tall.items[i].piece).toBe(base.items[i].piece);
      expect(tall.items[i].scale).toBe(1);
      expect(tall.items[i].x).toBe(base.items[i].x); expect(tall.items[i].z).toBe(base.items[i].z);
      expect(tall.items[i].y-base.items[i].y).toBeCloseTo(lift,9);
    }
    expect(Math.min(...tall.items.map(i=>i.y))).toBeCloseTo(-.6,6);
    expect(tall.body.feet).toEqual(base.body.feet);
    expect(slide(1.2,.4,4,60,1,6)).toBeLessThan(.03);
  });
  it('keeps tapered leg strokes overlapping, with a hard geometry bound even at the longest thinnest setting', () => {
    const counts: number[] = [];
    for (const [length,tip] of [[6,.08],[12,.02]]) {
      const { items } = stiltPose(length,tip,{...META,shoe:five(50)});
      counts.push(items.length);
      let prev: typeof items[number] | null = null;
      for (const item of items) {
        if (item.piece.frame < 30 || item.piece.frame >= 50) { prev=null; continue; }
        if (prev) {
          const radius = (item.piece.frame-30)/META.s*(item.scale??1), previous = (prev.piece.frame-30)/META.s*(prev.scale??1);
          expect(Math.hypot(item.x-prev.x,item.y-prev.y,item.z-prev.z)).toBeLessThanOrEqual(radius+previous+1e-6);
        }
        prev=item;
      }
      expect(items.length).toBeLessThanOrEqual(3+4*(3*(STILT_MAX_BONE_STEPS+1)+1));
      for(const foot of items.filter(i=>i.piece.frame>=50))expect(foot.scale).toBeCloseTo(tip,12);
    }
    console.log('Stilt fixture instances: ordinary, length6/tip.08, length12/tip.02',[stiltPose().items.length,...counts]);
  });
  it('tracks more than four real legs and bounds malformed huge leg lists', () => {
    const legs=Array.from({length:14},(_,i)=>leg(`insect${i}`,i<7,i%2?1:-1));
    const pose=stiltPose(6,.08,{...META,legs});
    expect(pose.body.feet.length).toBe(42);
    const walker=new RigBody(), out=new RigOut();walker.update(0,0,0);walker.speed=1;walker.phase=.2;
    walker.quadruped({...META,legs},1,1/60,{crouch:0,charging:false,air:0,stiltLength:6},out);
    for(let i=0;i<14;i++)expect(walker.feet[i*3+2]).toBe(i%2?0:1);
    const huge=stiltPose(1e6,.02,{...META,legs:Array(100).fill(legs[0])});
    expect(huge.body.feet.length).toBe(STILT_MAX_LEGS*3);
    expect(huge.items.length).toBeLessThanOrEqual(3+STILT_MAX_LEGS*(3*(STILT_MAX_BONE_STEPS+1)+1));
    expect(stiltLift({...META,legs:[]},6)).toBe(0);
  });
  it('gives tucked legs visible body-proportioned extension without moving their feet or resizing the body', () => {
    const legs: RigMeta['legs']=META.legs.map(l=>({...l,hip:[l.hip[0],0,l.hip[2]],knee:[l.hip[0]+.001,-.01,l.hip[2]],foot:[l.foot[0],-.02,l.foot[2]]}));
    const meta={...META,top:1.2,legs,shoe:five(50)}, base=stiltPose(1,.08,meta), tall=stiltPose(6,.08,meta);
    expect(stiltLift(meta,6)).toBeGreaterThan(2);
    expect(tall.items[0].y-base.items[0].y).toBeCloseTo(stiltLift(meta,6),10);
    expect(tall.items.slice(0,3).every(i=>i.scale===1)).toBe(true);
    for(const foot of tall.items.filter(i=>i.piece.frame>=50))expect(foot.y).toBeCloseTo(-.02,8);
    expect(tall.body.feet).toEqual(base.body.feet);
    expect(stiltPose(12,.08,meta,0).items).toEqual(base.items);
  });
  it('resets a pooled disc scale before it becomes a normal body piece', () => {
    const out=new RigOut(); out.push(piece(0),0,0,0,false,0,.08); out.reset();out.push(piece(1),0,0,0,false,0);
    expect(out.items[0].scale).toBe(1);
  });
  it('restores knee and foot thickness continuously as the trip expires', () => {
    const meta={...META,shoe:five(50)};
    for(const strength of [.1,.01,.001]) {
      const {items}=stiltPose(1+5*strength,.08,meta,strength);
      const firstFoot=items.findIndex(i=>i.piece.frame>=50), foot=items[firstFoot], tipDisc=items[firstFoot-1];
      expect(foot.scale).toBeCloseTo(1-.92*strength,12);
      const tipRadius=(tipDisc.piece.frame-30)/meta.s*(tipDisc.scale??1);
      const expected=meta.legs[0].r[2]+(meta.legs[0].r[0]*1.1*.08-meta.legs[0].r[2])*strength;
      expect(tipRadius).toBeCloseTo(expected,10);
      expect(Math.abs(tipRadius-meta.legs[0].r[2])).toBeLessThan(.05*strength);
      const kneeIndex=items.findIndex((item,i)=>i>3&&i<firstFoot&&Math.hypot(item.x-items[i-1].x,item.y-items[i-1].y,item.z-items[i-1].z)<1e-12);
      expect(kneeIndex).toBeGreaterThan(3);
      const knee=items[kneeIndex], kneeRadius=(knee.piece.frame-30)/meta.s*(knee.scale??1);
      expect(kneeRadius).toBeCloseTo(meta.legs[0].r[1]+(meta.legs[0].r[0]*1.1*(.35+.08*.65)-meta.legs[0].r[1])*strength,10);
      expect(Math.abs(foot.x-(meta.legs[0].foot[0]+meta.legs[0].fl*.5))).toBeLessThan(.04*strength+.001);
    }
  });
  it('does not invent legs or stretch a serpent', () => {
    const meta: RigMeta={...META,template:'serpent',legs:[],spine:Array.from({length:20},(_,i)=>[-i*.05,0,0,.1])};
    const draw=(stiltLength?:number)=>{const body=new RigBody(),out=new RigOut();body.update(0,0,0);body.serpent(meta,1,1/60,{crouch:0,charging:false,air:0,stiltLength,stiltTip:.02},out);return out.items.slice(0,out.n);};
    expect(draw(12)).toEqual(draw());
  });
  it("solves a two-bone leg exactly: the bones keep their lengths and the foot reaches its target", () => {
    for (const [fx, fy] of [[0.1, -0.8], [0.4, -0.5], [-0.3, -0.6], [0, -0.3]]) {
      const [kx, ky, ex, ey] = ik2(0, 0, fx, fy, 0.5, 0.45, 1);
      expect(Math.hypot(kx, ky)).toBeCloseTo(0.5, 6);
      expect(Math.hypot(ex - kx, ey - ky)).toBeCloseTo(0.45, 6);
      expect(ex).toBeCloseTo(fx, 6); expect(ey).toBeCloseTo(fy, 6);
    }
  });
  it("pulls an unreachable foot in rather than breaking the leg, and bends the knee the way it's told", () => {
    const [kx, ky, ex, ey] = ik2(0, 0, 0, -3, 0.5, 0.45, 1);
    expect(Math.hypot(kx, ky)).toBeCloseTo(0.5, 6);
    expect(Math.hypot(ex, ey)).toBeLessThanOrEqual(0.95);
    expect(Math.sign(ik2(0, 0, 0, -0.6, 0.5, 0.45, 1)[0])).toBe(-Math.sign(ik2(0, 0, 0, -0.6, 0.5, 0.45, -1)[0]));
  });
  it("keeps a chain's links at their length as its head moves (follow the leader)", () => {
    const n = 8, nodes = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) nodes[i * 3] = -i * 0.5;
    for (let f = 0; f < 50; f++) { nodes[0] += 0.1; nodes[2] = Math.sin(f * 0.3); followChain(nodes, n, 0.5); }
    for (let i = 1; i < n; i++) expect(Math.hypot(nodes[i * 3] - nodes[i * 3 - 3], nodes[i * 3 + 1] - nodes[i * 3 - 2], nodes[i * 3 + 2] - nodes[i * 3 - 1])).toBeCloseTo(0.5, 4);
  });
  it("steps each foot on its phase: down for the duty factor, sliding back, then lifted forward", () => {
    expect(footCycle(0, 0.6)).toEqual([0.5, 0]);
    expect(footCycle(0.3, 0.6)[1]).toBe(0);
    expect(footCycle(0.8, 0.6)[1]).toBeGreaterThan(0.9);
    expect(dutyFactor(0)).toBeGreaterThan(0.5); // a walk
    expect(dutyFactor(5)).toBeLessThan(0.5); // a run
  });
  it("picks the nearest of the eight headings, the left ones the right ones mirrored", () => {
    expect(rigDirection(0)).toMatchObject({ i: 2, flip: false });
    expect(rigDirection(Math.PI)).toMatchObject({ i: 2, flip: true });
    expect(rigDirection(Math.PI / 2)).toMatchObject({ i: 4, flip: false });
    expect(rigDirection(-Math.PI / 2)).toMatchObject({ i: 0, flip: false });
    expect(rigDirection((3 * Math.PI) / 4)).toMatchObject({ i: 3, flip: true });
    // a mirrored heading puts a model point where the baked heading's sprite, flipped, shows it
    const p = [0.5, 0.2, 0.3], a = rigWorld(p, Math.PI / 4, false, 1), b = rigWorld(p, Math.PI / 4, true, 1);
    expect(b[0]).toBeCloseTo(-a[0], 9); expect(b[2]).toBeCloseTo(a[2], 9);
  });
  it("turns its body toward where it goes and feels its acceleration", () => {
    const r = new RigBody();
    r.update(0, 0, 0, 0, 1);
    let x = 0;
    for (let i = 0; i < 60; i++) { x += 0.05; r.update(x, 0, 1 / 60, 3, 0); }
    expect(Math.abs(r.heading)).toBeLessThan(0.05);
    expect(r.speed).toBeGreaterThan(2.5);
  });
  it("turns to look at her while it watches (rules/wildWatch.ts), standing or backing off, and keeps its face to her", () => {
    const r = new RigBody();
    r.update(0, 0, 0, 1, 0);
    for (let i = 0; i < 60; i++) r.update(0, 0, 1 / 60, undefined, undefined, { x: 0, z: 10 });
    expect(r.heading).toBeCloseTo(Math.PI / 2, 1);
    let z = 0;
    for (let i = 0; i < 30; i++) { z -= 0.03; r.update(0, z, 1 / 60, undefined, undefined, { x: 0, z: 10 }); }
    expect(r.heading, "backing away, not turning tail").toBeCloseTo(Math.PI / 2, 1);
  });
  it("lies a sleeping legend down: its body on the ground, its head down, its feet where they were", () => {
    const up = lay(0), down = lay(1);
    const y = (items: { f: number; y: number }[], lo: number) => items.find(i => i.f >= lo && i.f < lo + 5)!.y;
    expect(y(down, 0)).toBeLessThan(y(up, 0) - 0.3); // the torso, most of a leg lower
    expect(y(down, 10) - y(down, 0)).toBeLessThan(y(up, 10) - y(up, 0)); // the head down, by its body
    const low = (items: { f: number; y: number }[]) => Math.min(...items.filter(i => i.f >= 30).map(i => i.y));
    expect(low(down)).toBeCloseTo(low(up), 1); // feet still on the ground
  });
  it("plants its feet: a foot on the ground stays where it is while the body walks on, at any speed and heading", () => {
    const all = [0.3, 0.8, 1.5, 3].flatMap(speed => [0, 0.4, Math.PI / 2, 2.6].map(dir => [speed, dir, slide(speed, dir)])), worst = Math.max(...all.map(r => r[2]));
    if (worst >= 0.03) console.log(all.map(r => r.map(v => v.toFixed(2)).join(" ")).join("\n"));
    expect(worst).toBeLessThan(0.03);
    expect(slide(1.2, 0.4, 4, 15)).toBeLessThan(0.03); // at a choppy 15 frames a second too
  });
  it("stops stepping when it stops", () => {
    const b = new RigBody(), out = new RigOut();
    let x = 0; b.update(0, 0, 0);
    for (let f = 0; f < 120; f++) { x += 0.02; b.update(x, 0, 1 / 60); out.reset(); b.quadruped(META, 1, 1 / 60, { crouch: 0, charging: false, air: 0 }, out); }
    for (let f = 0; f < 60; f++) { b.update(x, 0, 1 / 60); out.reset(); b.quadruped(META, 1, 1 / 60, { crouch: 0, charging: false, air: 0 }, out); }
    const p = b.phase;
    for (let f = 0; f < 60; f++) { b.update(x, 0, 1 / 60); out.reset(); b.quadruped(META, 1, 1 / 60, { crouch: 0, charging: false, air: 0 }, out); }
    expect(b.phase).toBe(p);
  });
});
