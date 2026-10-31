import { expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
// @ts-expect-error Plain tool module.
import { formatted } from './format.mjs';

it('preserves every tuning value and key order, with byte-stable output', () => {
  const before = readFileSync('config/tuning.json', 'utf8');
  const after = formatted(JSON.stringify(JSON.parse(before)));
  expect(JSON.parse(after)).toStrictEqual(JSON.parse(before));
  expect(formatted(after)).toBe(after);
  expect(after, 'fix: node tools/config/format.mjs --write').toBe(before.replace(/\r\n/g, '\n'));
});

it('expands object arrays and leaves short numeric vectors inline', () => {
  expect(formatted('{"z":[1,2],"a":[{"x":1,"y":2}],"text":["a","b"]}')).toBe(
    '{\n  "z": [1, 2],\n  "a": [\n    {\n      "x": 1,\n      "y": 2\n    }\n  ],\n  "text": [\n    "a",\n    "b"\n  ]\n}\n');
});
