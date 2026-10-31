// Stream a check unchanged, annotating named failures or its crash reason only when it exits unsuccessfully.
//   node tools/ci/report-command.cjs --kind art -- node art/check.mjs --times
const { spawn } = require('node:child_process');
const { createSink } = require('./annotations.cjs');
function failureLine(kind, line) {
  const text = line.replace(/\x1b\[[0-9;]*m/g, '').trim();
  if (kind === 'config') return text && !/(?:^|: )valid$|up to date$|every table up to date$/.test(text) ? text : null;
  return /^(?:\[\d+ s\]\s*)?FAIL\s+/.test(text) ? text.replace(/^(?:\[\d+ s\]\s*)?FAIL\s+/, '') : null;
}
async function runCommand({ command, args, kind, source, sink = createSink() }) {
  const child = spawn(command, args, { stdio: ['inherit', 'pipe', 'pipe'] });
  const failures = new Set(), tail = [];
  function stream(input, output) {
    let pending = '';
    const line = s => { if (!s.trim()) return; tail.push(s); if (tail.length > 12) tail.shift(); const failure = failureLine(kind, s); if (failure) failures.add(failure); };
    input.on('data', bytes => { output.write(bytes); pending += bytes.toString(); let i; while ((i = pending.indexOf('\n')) >= 0) { line(pending.slice(0, i)); pending = pending.slice(i + 1); } });
    input.on('end', () => { if (pending) line(pending); });
  }
  stream(child.stdout, process.stdout); stream(child.stderr, process.stderr);
  const result = await new Promise(resolve => { let error; child.on('error', e => { error = e; }); child.on('close', (status, signal) => resolve({ status, signal, error })); });
  if (result.status !== 0) {
    if (!failures.size) failures.add(result.error?.message ?? (tail.filter(s => /error|failed|timeout|exception/i.test(s)).join('\n') || tail.join('\n') || `${command} exited ${result.status ?? result.signal}`));
    for (const message of failures) {
      const file = kind === 'config' ? message.match(/(?:^|\s)([\w./\\-]+\.(?:json|md|[cm]?js|ts))(?=[:\s]|$)/)?.[1] ?? source : source;
      sink.error(kind, message, { file });
    }
  }
  return result;
}
module.exports = { failureLine, runCommand };
if (require.main === module) {
  const argv = process.argv.slice(2), split = argv.indexOf('--'), ki = argv.indexOf('--kind');
  if (split < 0 || ki < 0 || !argv[split + 1]) throw Error('Use --kind <tool> -- <command> [args]');
  runCommand({ kind: argv[ki + 1], command: argv[split + 1], args: argv.slice(split + 2), source: argv.slice(split + 2).find(a => /\.[cm]?js$/.test(a)) }).then(r => {
    if (r.signal) process.kill(process.pid, r.signal); else process.exitCode = r.status ?? 1;
  }).catch(error => { createSink().error(argv[ki + 1], String(error)); console.error(error); process.exitCode = 1; });
}
