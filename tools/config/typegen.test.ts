import { expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
// @ts-expect-error Plain tool module.
import { declaration, schemaType } from './typegen.mjs';
import schema from '../../config/schema/tuning.schema.json';

it('keeps the schema-derived tuning declaration fresh', () => {
  expect(readFileSync('src/rules/tuning.generated.d.ts', 'utf8').replace(/\r\n/g, '\n'),
    'fix: node tools/config/typegen.mjs --write').toBe(declaration(schema));
});
it('preserves enums, records, nullable values and optional keys without adding constraints', () => {
  expect(schemaType({ type: 'object', properties: { choice: { enum: ['a', 'b'] }, values: { type: 'array', items: { type: 'number', nullable: true } } }, required: ['choice'] }))
    .toBe('{\n  "choice": "a" | "b";\n  "values"?: Array<(number) | null>;\n}');
  expect(schemaType({ type: 'object', additionalProperties: { type: 'boolean' } })).toBe('{\n  [key: string]: boolean;\n}');
});
