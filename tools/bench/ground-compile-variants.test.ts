import { expect, it } from 'vitest';
// @ts-expect-error CommonJS diagnostic helper
import { waterOnlyDiagnosticSource, groundCompileCases } from './ground-compile-variants.cjs';

it('enumerates four baseline and six proposed families without impossible no-lake/water-only defines', () => {
  const rows = groundCompileCases();
  expect(rows.filter((x: { version: string }) => x.version === 'baseline')).toHaveLength(4);
  expect(rows.filter((x: { version: string }) => x.version === 'candidate')).toHaveLength(6);
  for (const x of rows) if ('GROUND_WATER_ONLY' in x.defines) expect('GROUND_LAKES' in x.defines).toBe(true);
});

it('guards only the biome helpers and special branch, preserving ordinary water and full-path text', () => {
  const library = 'float lakeLookAt(vec2 p) { return 1.0; }';
  const branch = '      float LK = lakeLookAt(p);\n      if (LK > 0.5) { special(); } else ';
  const original = `${library}\n${branch}if (ld > -2.6) { ordinary(); }`;
  const changed = waterOnlyDiagnosticSource(original, library);
  expect(changed).toContain(library); expect(changed).toContain(branch);
  expect(changed).toContain('#endif\nif (ld > -2.6) { ordinary(); }');
  expect(waterOnlyDiagnosticSource(changed, library)).toBe(changed);
  expect(() => waterOnlyDiagnosticSource(original + library, library)).toThrow('source shape');
});
