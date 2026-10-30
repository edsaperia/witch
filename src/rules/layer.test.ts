import { expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { sources, violations } from "../../tools/robustness/rules-layer.mjs";

it("keeps every production rules module independent of drawing, UI, app, platform and DOM", () => {
  expect(sources("src/rules").flatMap((f: string) => violations(readFileSync(f, "utf8"), f))).toEqual([]);
});
it("catches type-only and dynamic dependencies and actual DOM globals", () => {
  for (const text of ['import type { X } from "../render/x";', 'type X = import("../ui/x").X;', 'export * from "../app/x";', 'import("../platform/x")', 'import * as T from "three";', 'document.body', 'globalThis["document"]', 'let c: HTMLCanvasElement;']) expect(violations(text).length, text).toBeGreaterThan(0);
  expect(violations('// document and window are words here\nconst a = "document"; const b = { window: 1 }; performance.now();')).toEqual([]);
  expect(violations('type Node = { top: number }; function f(window: Node) { const top = window.top; return top; }')).toEqual([]);
});
