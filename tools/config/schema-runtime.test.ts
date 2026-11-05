import { expect, it } from 'vitest';
import { readFileSync, cpSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { schemaRuntime } from './schema-runtime.mjs';
import { configData } from '../../src/rules/configData';
import { CONFIGS } from '../../src/rules/configSchemas';
import { validate, inferSchema } from '../../src/rules/schema';

it('loads identical assembled game config and validators without Vite SSR', () => {
  const runtime = schemaRuntime();
  expect(runtime.CONFIGS).toEqual(CONFIGS);
  for (const c of CONFIGS) expect(runtime.configData(c.name, c.file)).toEqual(configData(c.name, c.file));
  const schema = { type: 'object', properties: { speed: { type: 'number', minimum: 0 } }, required: ['speed'] } as const;
  for (const value of [{ speed: 2 }, { speed: -1 }, { speed: 'fast' }, {}]) {
    expect(runtime.validate(value, schema, 'fixture')).toEqual(validate(value, schema, 'fixture'));
    expect(runtime.inferSchema(value)).toEqual(inferSchema(value));
  }
  const source = readFileSync('tools/config/schema-runtime.mjs', 'utf8');
  expect(source).not.toMatch(/from ['"]vite['"]|createServer|ssrLoadModule|fetchModule/);
});

it('keeps the real read-only CLI strict for invalid config and stale knob docs', () => {
  const fixture = mkdtempSync(join(tmpdir(), 'witch-schema-gate-'));
  const command = resolve('tools/config/schema.mjs');
  const run = () => spawnSync(process.execPath, [command, '--check'], { cwd: fixture, encoding: 'utf8', timeout: 15000 });
  try {
    cpSync('config', join(fixture, 'config'), { recursive: true });
    const valid = run();
    expect(valid.status, valid.stderr).toBe(0);
    const file = join(fixture, 'config/tuning.json'), original = readFileSync(file, 'utf8');
    const value = JSON.parse(original); value.pixelSize = 'invalid';
    const invalid = JSON.stringify(value); writeFileSync(file, invalid);
    const bad = run();
    expect(bad.status).toBe(1); expect(bad.stdout).toContain('pixelSize');
    expect(readFileSync(file, 'utf8')).toBe(invalid);
    writeFileSync(file, original);
    const doc = join(fixture, 'config/KNOBS.md'); writeFileSync(doc, 'stale fixture');
    const stale = run();
    expect(stale.status).toBe(1); expect(stale.stderr).toContain('Generated knob docs are stale');
    expect(readFileSync(doc, 'utf8')).toBe('stale fixture');
  } finally {
    if (dirname(resolve(fixture)) !== resolve(tmpdir()) || !basename(fixture).startsWith('witch-schema-gate-')) throw Error('Unexpected schema fixture path');
    rmSync(fixture, { recursive: true, force: true });
  }
});
