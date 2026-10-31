import { expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';

it('generates the same readable inventory from CRLF and LF and detects drift', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'witch-inventory-'));
  const tool = path.resolve('tools/inventory.mjs');
  const run = (...args: string[]) => spawnSync(process.execPath, [tool, ...args], { cwd: root, encoding: 'utf8' });
  try {
    fs.mkdirSync(path.join(root, 'tools/demo'), { recursive: true });
    fs.writeFileSync(path.join(root, 'tools/inventory-notes.json'), '{}');
    fs.writeFileSync(path.join(root, 'tools/demo/effects-scene.test.ts'), '');
    fs.writeFileSync(path.join(root, 'tools/demo/PLAN.md'), '');
    const script = path.join(root, 'tools/demo/example.mjs');
    const text = '// Describes a useful example tool.\n//   node tools/demo/example.mjs\nexport {};\n';
    fs.writeFileSync(script, text.replace(/\n/g, '\r\n'));
    expect(run().status).toBe(0);
    const output = path.join(root, 'tools/demo/README.md');
    const have = fs.readFileSync(output, 'utf8');
    expect(have).toContain('Describes a useful example tool.');
    expect(have).toContain('# tools/demo');
    expect(have).toContain('- `PLAN.md`\n- `effects-scene.test.ts`');
    fs.writeFileSync(script, text);
    fs.writeFileSync(output, have.replace(/\n/g, '\r\n'));
    expect(run('--check').status).toBe(0);
    fs.writeFileSync(script, text.replace('useful', 'changed'));
    const stale = run('--check');
    expect(stale.status).toBe(1);
    expect(stale.stderr).toContain('fix: node tools/inventory.mjs');
  } finally {
    if (path.dirname(path.resolve(root)) !== path.resolve(os.tmpdir()) || !path.basename(root).startsWith('witch-inventory-')) throw Error('Unexpected temporary fixture path');
    fs.rmSync(root, { recursive: true, force: true });
  }
});
