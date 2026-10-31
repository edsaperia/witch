import { readFileSync, writeFileSync } from 'node:fs';
import { build } from 'esbuild';
const fragment = readFileSync('tools/mushrooms/explorer.fragment.html', 'utf8');
const standaloneStyle = '<style>:root{--font-size-base:14px;--foreground:#eee}body{background:#161a1d;color:#eee;font:14px system-ui;margin:20px}.viz-controls{display:flex;flex-wrap:wrap;gap:12px;align-items:end}.form-label{display:flex;flex-direction:column;gap:4px}.form-control,.form-select,.btn{font:inherit;box-sizing:border-box;padding:6px;max-width:100%}.form-control{width:100%}.text-small{font-size:12px}</style>';
writeFileSync('tools/mushrooms/index.html', '<!doctype html><meta charset="utf-8"><title>Mushroom generator</title>' + standaloneStyle + fragment + '<script type="module" src="./explorer.js"></script>');
if (process.argv[2]) {
  const result = await build({ entryPoints: ['tools/mushrooms/explorer.js'], bundle: true, minify: true, format: 'iife', write: false, logLevel: 'silent' });
  const output = fragment + '<script>' + result.outputFiles[0].text.replace(/<\/script/gi, '<\\/script') + '</script>';
  if (Buffer.byteLength(output) > 1_000_000) throw new Error('Preview exceeds inline size budget');
  writeFileSync(process.argv[2], output); console.log(`Inline preview: ${Buffer.byteLength(output)} bytes`);
}
