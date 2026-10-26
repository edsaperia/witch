import { describe, expect, it } from "vitest";
import { WORLD_TREE } from "../../art/sigils.js";
import tree from "./loadingTree.json";

// The loading screen draws the World Tree from a copy of its strokes (src/ui/loadingTree.json), so it's up before the art kit
// loads: the copy must be the sigil kit's own (art/sigils.js WORLD_TREE). After changing the sigil, write the copy again:
//   node --input-type=module -e 'import { WORLD_TREE } from "./art/sigils.js"; const r = v => Math.round(v * 1e4) / 1e4; process.stdout.write(JSON.stringify(WORLD_TREE.map(s => s.l.map(([x, y]) => [r(x), r(y)]))))' > src/ui/loadingTree.json
describe("the loading screen's World Tree", () => {
  it("is the sigil kit's own strokes", () => {
    const r = (v: number) => Math.round(v * 1e4) / 1e4;
    expect(tree).toEqual((WORLD_TREE as { l: [number, number][] }[]).map(s => s.l.map(([x, y]) => [r(x), r(y)])));
  });
});
