// Stable tuning JSON: one leaf setting per line, small numeric vectors inline, original key order.
//   node tools/config/format.mjs --check
//   node tools/config/format.mjs --write
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { isDeepStrictEqual } from 'node:util';

export function formatJson(value, depth = 0) {
  const pad = '  '.repeat(depth), next = pad + '  ';
  if (Array.isArray(value)) {
    if (!value.length) return '[]';
    if (value.length <= 4 && value.every(v => typeof v === 'number')) return `[${value.join(', ')}]`;
    return `[\n${value.map(v => next + formatJson(v, depth + 1)).join(',\n')}\n${pad}]`;
  }
  if (value !== null && typeof value === 'object') {
    const entries = Object.entries(value);
    if (!entries.length) return '{}';
    return `{\n${entries.map(([key, v]) => next + JSON.stringify(key) + ': ' + formatJson(v, depth + 1)).join(',\n')}\n${pad}}`;
  }
  return JSON.stringify(value);
}

export function formatted(text) {
  const before = JSON.parse(text), output = formatJson(before) + '\n';
  if (!isDeepStrictEqual(before, JSON.parse(output))) throw Error('Formatter changed JSON values');
  return output;
}

export function main(args = process.argv.slice(2)) {
  if (args.length !== 1 || !['--check', '--write'].includes(args[0])) throw Error('Use --check or --write');
  const file = 'config/tuning.json', have = readFileSync(file, 'utf8'), want = formatted(have);
  if (have.replace(/\r\n/g, '\n') === want) return;
  if (args[0] === '--write') writeFileSync(file, want);
  else { console.error(`${file}: formatting differs; fix: node tools/config/format.mjs --write`); process.exitCode = 1; }
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
