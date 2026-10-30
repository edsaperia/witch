import test from "node:test";
import assert from "node:assert/strict";
import { spritePixelDiff } from "./pixel-diff.js";
const buffer = (width, height, pixels) => ({ width, height, data: Uint8ClampedArray.from(pixels.flat()) });
test("changed sprite size counts changed opaque pixels instead of null/zero", () => {
  assert.equal(spritePixelDiff(buffer(1, 1, [[1, 2, 3, 255]]), buffer(2, 1, [[1, 2, 3, 255], [4, 5, 6, 255]])), 1);
});
test("transparent padding uses the sheet's bottom alignment", () => {
  assert.equal(spritePixelDiff(buffer(1, 1, [[1, 2, 3, 255]]), buffer(1, 2, [[0, 0, 0, 0], [1, 2, 3, 255]])), 0);
});
