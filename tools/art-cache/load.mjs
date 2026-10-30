// Existing esbuild/TypeScript dependencies only. The temporary module is removed
// on completion; no renderer, browser, worker pool or historical code is executed.
import { build } from 'esbuild';
import { randomUUID } from 'node:crypto';
import { unlinkSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

export async function loadAnalyzer(root = process.cwd()) {
  const file = join(root, `.art-cache-runtime-${randomUUID()}.mjs`);
  try {
    await build({ stdin: { contents: `export {artJobFingerprints,affectedArtJobs} from './tools/artJobFingerprints'; export {diskTree,contentFingerprint} from './tools/artDependencies'; export {artFingerprintMap,artHash} from './tools/artHash';`, resolveDir: root, loader: 'ts' }, bundle: true, platform: 'node', format: 'esm', external: ['typescript'], outfile: file, logLevel: 'error' });
    const api = await import(pathToFileURL(file));
    return { api, close: () => unlinkSync(file) };
  } catch (error) { try { unlinkSync(file); } catch {} throw error; }
}
