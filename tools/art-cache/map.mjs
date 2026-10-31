import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { loadAnalyzer } from './load.mjs';

const output = process.argv[2];
if (!output) throw Error('Usage: node tools/art-cache/map.mjs <output.json>');
const at = performance.now(), { api, close } = await loadAnalyzer();
try {
  const map = api.artFingerprintMap();
  const drawingFiles = {};
  for (const [kind, files] of Object.entries(map.drawInputs)) for (const file of files) (drawingFiles[file] ??= []).push(kind);
  const initializationParts = Object.fromEntries(Object.entries(map.initializationParts).map(([id, p]) => [id, { file: p.file, bytes: Buffer.byteLength(p.source), sha256: createHash('sha256').update(p.source).digest('hex') }]));
  const summary = { kinds: Object.keys(map.fingerprints).length, wholeDrawingFiles: Object.keys(drawingFiles).length, sharedWholeFiles: map.sharedWholeFiles.length, initializationParts: Object.keys(initializationParts).length, initializationBytes: Object.values(initializationParts).reduce((n, p) => n + p.bytes, 0), elapsedMs: performance.now() - at };
  const artifact = {
    schema: 1,
    sourceHead: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(),
    sourceDirty: !!execFileSync('git', ['status', '--porcelain', '-uno'], { encoding: 'utf8' }).trim(),
    meaning: 'Whole drawing-file inputs and conditional shared initialization declarations. A filename-only lookup is an upper bound; compare fingerprints with affectedArtJobs for precise affected-job checks. Runtime style/id/seed/scale salts remain separate.',
    summary, fingerprints: map.fingerprints, sharedHash: map.sharedHash,
    sharedWholeFiles: map.sharedWholeFiles, perKindWholeFiles: map.drawInputs,
    drawingFiles, initializationParts, initializationReasons: map.initializationReasons,
    conservative: map.conservative,
  };
  writeFileSync(output, JSON.stringify(artifact, null, 2) + '\n');
  console.log(JSON.stringify(summary));
} finally { close(); }
