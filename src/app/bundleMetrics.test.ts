import { expect, it } from "vitest";
import { encode } from "@jridgewell/sourcemap-codec";
import { initialFiles, mapContributions } from "../../tools/robustness/bundle-size.mjs";
it("includes transitive static imports and CSS, keeping dynamic screens and workers separate", () => {
  const graph = { main: { file: "main.js", imports: ["shared"], dynamicImports: ["zoo"], css: ["main.css"], assets: ["worker.js"] }, shared: { file: "shared.js", css: ["shared.css"] }, zoo: { file: "zoo.js" } };
  expect(initialFiles(graph, ["main.js"])).toEqual({ js: ["main.js", "shared.js"], css: ["main.css", "shared.css"], assets: ["worker.js"] });
});
it("attributes generated UTF-8 bytes using source-map UTF-16 columns and leaves unmapped spans explicit", () => {
  const result = mapContributions("a🦊bc", { mappings: encode([[[0, 0, 0, 0], [3, 1, 0, 0], [4]]]), sources: ["../../src/a.ts", "../../src/b.ts"], sourcesContent: ["source a", "source b"] });
  expect(result.sources.map(row => [row.source, row.generatedBytes])).toEqual([["src/a.ts", 5], ["src/b.ts", 1]]);
  expect(result.unmappedBytes).toBe(1);
});
