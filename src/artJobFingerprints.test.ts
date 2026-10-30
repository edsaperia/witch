import { describe, expect, it } from "vitest";
import { affectedArtJobs, artJobFingerprints } from "../tools/artJobFingerprints";
import { diskTree, type SourceTree } from "../tools/artDependencies";
import ts from "typescript";

const dispatcher = 'import {house} from "./house"; import {creature} from "./creature"; export type ArtJob = {kind:"house"}|{kind:"creature"}; export function runJob(job:ArtJob) { if(job.kind === "house") return house(); if(job.kind === "creature") return creature(); }';
const fixture = (sources: Record<string, string>): SourceTree => ({ exists: f => f in sources, read: f => { if (!(f in sources)) throw Error(f); return Buffer.from(sources[f]); } });
const sources = () => ({ "dispatch.ts": dispatcher, "house.ts": 'import {shared} from "./shared"; export function house(){return shared+1;}', "creature.ts": 'import {shared} from "./shared"; export function creature(){return shared+2;}', "shared.ts": "export const shared=1;" });

describe("art job dispatcher roots and initialization safety", () => {
  it("derives all kinds and isolates inert creature functions while retaining shared sources", () => {
    const s = sources(), before = artJobFingerprints(fixture(s), {}, "dispatch.ts");
    expect(Object.keys(before.fingerprints)).toEqual(["creature", "house"]);
    expect(before.drawInputs.house).not.toContain("creature.ts");
    s["creature.ts"] += "\n// creature-only edit";
    const creature = artJobFingerprints(fixture(s), {}, "dispatch.ts");
    expect(creature.fingerprints.house).toBe(before.fingerprints.house);
    expect(creature.fingerprints.creature).not.toBe(before.fingerprints.creature);
    s["shared.ts"] += "\n// shared edit";
    const shared = artJobFingerprints(fixture(s), {}, "dispatch.ts");
    expect(shared.fingerprints.house).not.toBe(creature.fingerprints.house);
    expect(shared.fingerprints.creature).not.toBe(creature.fingerprints.creature);
  });
  it("retains initializer calls from unselected branches and transitive callees", () => {
    const s: Record<string, string> = sources();
    s["creature.ts"] += '\nimport {initialize} from "./init"; const registered=initialize();';
    s["init.ts"] = 'import {set} from "./state"; export function initialize(){set();return 1;}';
    s["state.ts"] = "export function set(){globalThis.artChanged=1;}";
    const before = artJobFingerprints(fixture(s), {}, "dispatch.ts");
    expect(before.initialization).toContain("state.ts");
    s["state.ts"] = "export function set(){globalThis.artChanged=2;}";
    const after = artJobFingerprints(fixture(s), {}, "dispatch.ts");
    expect(after.fingerprints.house).not.toBe(before.fingerprints.house);
  });
  it("resolves namespace reexports and conservatively retains unknown guards", () => {
    const s: Record<string, string> = sources();
    s["dispatch.ts"] = dispatcher.replace('import {house} from "./house";', 'import * as Art from "./barrel";').replace("return house()", "return Art.house()");
    s["barrel.ts"] = 'export {house} from "./house"; export {creature} from "./creature";';
    const before = artJobFingerprints(fixture(s), {}, "dispatch.ts");
    expect(before.dependencies.jobs.house).toContain("house.ts");
    s["dispatch.ts"] = s["dispatch.ts"].replace('job.kind === "house"', 'Math.random()>0.5');
    const broad = artJobFingerprints(fixture(s), {}, "dispatch.ts");
    expect(broad.conservative.some(x => x.includes("unknown dispatcher guard"))).toBe(true);
    expect(broad.dependencies.jobs.house).toContain("creature.ts");
  });
  it("does not mistake computed object member names for inert definitions", () => {
    const s: Record<string, string> = sources();
    s["creature.ts"] += '\nimport {initialize} from "./init"; const object={ [initialize()](){} };';
    s["init.ts"] = "export function initialize(){globalThis.artChanged=1;return 'x';}";
    expect(artJobFingerprints(fixture(s), {}, "dispatch.ts").initialization).toContain("init.ts");
  });
  it("does not broaden an inert metadata read to unrelated functions in that file", () => {
    const s: Record<string, string> = sources();
    s["creature.ts"] = 'import {GAIT, model} from "./model"; const gait=GAIT.frames; export function creature(){return model()+gait;}';
    s["model.ts"] = 'export const GAIT={frames:2}; export function model(){return 1;}';
    const before = artJobFingerprints(fixture(s), {}, "dispatch.ts");
    s["model.ts"] = 'export const GAIT={frames:2}; export function model(){return 2;}';
    const model = artJobFingerprints(fixture(s), {}, "dispatch.ts");
    expect(model.fingerprints.house).toBe(before.fingerprints.house);
    expect(model.fingerprints.creature).not.toBe(before.fingerprints.creature);
    s["model.ts"] = 'export const GAIT={frames:3}; export function model(){return 2;}';
    expect(artJobFingerprints(fixture(s), {}, "dispatch.ts").fingerprints.house).not.toBe(model.fingerprints.house);
  });
  it("binds initializer order and refuses shadowed built-in purity assumptions", () => {
    const s: Record<string, string> = sources();
    s["creature.ts"] += '\nvar x=1; const registered=initialize(); function initialize(){return x;}';
    const before = artJobFingerprints(fixture(s), {}, "dispatch.ts");
    s["creature.ts"] = s["creature.ts"].replace('var x=1; const registered=initialize();', 'const registered=initialize(); var x=1;');
    expect(artJobFingerprints(fixture(s), {}, "dispatch.ts").fingerprints.house).not.toBe(before.fingerprints.house);
    s["creature.ts"] += '\nimport {Map} from "./custom"; const cache=new Map();';
    s["custom.ts"] = 'export class Map {constructor(){globalThis.changed=1;}}';
    expect(artJobFingerprints(fixture(s), {}, "dispatch.ts").initialization).toContain("custom.ts");
  });
  it("does not execute ordinary class methods at module load, but retains static effects", () => {
    const s: Record<string, string> = sources();
    s["creature.ts"] += '\nexport class Unused { method(){return 1;} }';
    const before = artJobFingerprints(fixture(s), {}, "dispatch.ts");
    s["creature.ts"] = s["creature.ts"].replace('method(){return 1;}', 'method(){return 2;}');
    expect(artJobFingerprints(fixture(s), {}, "dispatch.ts").fingerprints.house).toBe(before.fingerprints.house);
    s["creature.ts"] += '\nimport {initialize} from "./init"; class Registered { static value=initialize(); }';
    s["init.ts"] = "export function initialize(){globalThis.changed=1;}";
    expect(artJobFingerprints(fixture(s), {}, "dispatch.ts").initialization).toContain("init.ts");
  });
  it("normalizes JSON initialization inputs and conservative full-module parts", () => {
    const s: Record<string, string> = sources();
    s["shared.ts"] = 'import * as Data from "./barrel";\nexport const shared=Object.keys(Data).length;\n';
    s["barrel.ts"] = 'export {default as data} from "./data.json";\n';
    s["data.json"] = '{\n"value":1\n}\n';
    const before = artJobFingerprints(fixture(s), {}, "dispatch.ts");
    const crlf = Object.fromEntries(Object.entries(s).map(([f, text]) => [f, text.replaceAll("\n", "\r\n")]));
    expect(artJobFingerprints(fixture(crlf), {}, "dispatch.ts").fingerprints).toEqual(before.fingerprints);
  });
  it("isolates a real creature drawing-file edit from house and retains shared packing edits", () => {
    const tree = diskTree("."), options = { virtual: { "virtual:art-overrides": [] } };
    const before = artJobFingerprints(tree, options);
    const edited = (target: string): SourceTree => ({ exists: tree.exists, read: f => {
      if (f !== target) return tree.read(f);
      const text = Buffer.from(tree.read(f)).toString("utf8");
      if (target === "art/creatures3d.js") {
        const ast = ts.createSourceFile(f, text, ts.ScriptTarget.Latest, true);
        const fn = ast.statements.find(n => ts.isFunctionDeclaration(n) && n.name?.text === "quad3d");
        if (!fn || !ts.isFunctionDeclaration(fn) || !fn.body) throw Error("real drawing fixture missing");
        const at = fn.body.getStart(ast) + 1;
        // This virtual tree is analyzed only; the changed drawing code is never executed.
        return Buffer.from(text.slice(0, at) + '\nthrow new Error("changed model fixture");\n' + text.slice(at));
      }
      return Buffer.from(text + "\n// shared packing-source edit\n");
    } });
    const creature = artJobFingerprints(edited("art/creatures3d.js"), options);
    expect(creature.fingerprints.housePiece).toBe(before.fingerprints.housePiece);
    expect(creature.fingerprints.creature).not.toBe(before.fingerprints.creature);
    expect(affectedArtJobs(before, creature)).not.toContain("housePiece");
    const shared = artJobFingerprints(edited("src/render/artPacking.ts"), options);
    expect(affectedArtJobs(before, shared)).toEqual(Object.keys(before.fingerprints).sort());
    expect(Object.keys(before.fingerprints)).toHaveLength(34);
  });
});
