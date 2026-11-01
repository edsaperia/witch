import { expect, it } from "vitest";
import { buildSync } from "esbuild";
import vm from "node:vm";
import { createRequire } from "node:module";
import proposal from "../../docs/evidence/treehouse-layout-ed-2026-10-31.v2-proposal.json";
import identities from "../../config/house/layouts/editor-v2-identities.json";
import original from "../../docs/evidence/treehouse-layout-ed-2026-10-31.v1.json";
import legacy from "../../config/house/layouts/editor-v1-baseline.json";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { FURNITURE_IDS } from "../../art/furniture.js";

const require = createRequire(import.meta.url);
const source = buildSync({ stdin: { contents: 'export * from "./src/editor/houseLayout"; export {publishedLayout} from "./src/editor/publishedLayout";', resolveDir: process.cwd(), loader: "ts" }, bundle: true, platform: "node", format: "cjs", write: false, logLevel: "silent" }).outputFiles[0].text;
function startup(perturb: boolean) {
  const math = Object.create(Math) as Math;
  math.sin = x => {
    const value = Math.sin(x); if (!perturb || !value || !Number.isFinite(value)) return value;
    const bytes = new ArrayBuffer(8), floats = new Float64Array(bytes), bits = new BigUint64Array(bytes);
    floats[0] = value; bits[0] += value > 0 ? 1n : -1n; return floats[0];
  };
  const module = { exports: {} as typeof import("./houseLayout") & typeof import("./publishedLayout") };
  vm.runInNewContext(source, { require, module, exports: module.exports, Math: math, structuredClone }, { timeout: 1500 });
  const x = module.exports, items = x.layoutItems(), key = x.floorplanKey(x.EDITOR_HOUSE, items);
  return { x, items, key, selected: x.publishedLayout(items, key, new URLSearchParams()) };
}
it("starts with every authored pose under either one-ulp sine result, with the same source identity", () => {
  const a = startup(false), b = startup(true);
  expect(a.key).toBe(identities.canonical); expect(b.key).toBe(a.key);
  expect(JSON.stringify(b.selected)).toBe(JSON.stringify(a.selected));
  expect(a.selected.objects).toHaveLength(proposal.objects.length);
  for (const p of a.selected.objects) {
    const old = proposal.objects.find(o => o.id === p.id)!;
    expect(p).toEqual({ id: old.id, x: old.x, z: old.z, rotation: a.x.normalAngle(old.rotation) });
  }
  a.x.physicalRoom({ x: 0, z: 0 }, a.x.EDITOR_HOUSE); // Cached shape lookup cannot change identity.
  expect(a.x.floorplanKey(a.x.EDITOR_HOUSE, a.items)).toBe(a.key);
});
it("keeps source changes and unknown legacy IDs incompatible, rather than bypassing validation", () => {
  const { x, items, key } = startup(false), changed = structuredClone(x.EDITOR_HOUSE);
  changed.wall += .01;
  const other = x.floorplanKey(changed, items); expect(other).not.toBe(key);
  expect(() => x.parseLayout(proposal, items, other)).toThrow(/does not match/);
  expect(() => x.parseLayout({ ...proposal, floorplan: "oak-unknown" }, items, key)).toThrow(/does not match/);
  expect(() => x.parseLayout({ ...proposal, objects: proposal.objects.slice(1) }, items, key)).toThrow(/does not match/);
  const invalid = structuredClone(proposal); invalid.objects[0].id = "unknown-object";
  expect(() => x.parseLayout(invalid, items, key)).toThrow(/known ID/);
});
it("keeps the original v1 bytes and its camera-preserving import under both math variants", () => {
  const a = startup(false), b = startup(true);
  const left = a.x.parseLayout(original, a.items, a.key), right = b.x.parseLayout(original, b.items, b.key);
  expect(JSON.stringify(right)).toBe(JSON.stringify(left));
  expect(left.migration?.cameraPreserved).toBe(true);
  expect(left.migration?.held.map(p => p.id)).toContain("cauldron");
  for (const old of original.objects.filter(p => p.id !== "cauldron")) {
    const recorded = legacy.items.find(p => p.id === old.id)!;
    const p = left.objects.find(p => p.id === old.id)!;
    expect(p.x).toBe(old.x); expect(p.z).toBe(old.z);
    const yaw = FURNITURE_IDS.includes(old.id) ? recorded.facing.yaw - old.rotation * Math.PI / 180 : old.rotation * Math.PI / 180;
    expect(Math.sin(a.x.cameraYaw(p))).toBeCloseTo(Math.sin(yaw), 12);
    expect(Math.cos(a.x.cameraYaw(p))).toBeCloseTo(Math.cos(yaw), 12);
  }
  expect(createHash("sha256").update(readFileSync("docs/evidence/treehouse-layout-ed-2026-10-31.v1.json")).digest("hex")).toBe("7a939d05aa6b12e3973c3be0097e9b0376ccc00b38779b9c195fb01637ef4cd9");
});
