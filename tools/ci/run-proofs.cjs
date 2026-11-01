// One foreground runner; servers close in finally, including assertion failures.
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { spawn } = require('node:child_process');
const proofs = require('./proofs.json');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.ogg': 'audio/ogg', '.wasm': 'application/wasm' };
function resolveFile(root, url) {
  const file = path.resolve(root, '.' + decodeURIComponent(new URL(url, 'http://localhost').pathname));
  if (file !== root && !file.startsWith(root + path.sep)) throw Error('Path outside build');
  return file;
}
async function serve(directory) {
  const root = path.resolve(directory);
  const server = http.createServer((req, res) => {
    let file;
    try { file = resolveFile(root, req.url); }
    catch { res.writeHead(403).end(); return; }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file)) { res.writeHead(404).end(); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).on('error', () => res.destroy()).pipe(res);
  });
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
  return { url: `http://127.0.0.1:${server.address().port}/`, close: () => new Promise(resolve => server.close(resolve)) };
}
async function main() {
  const started = Date.now(), out = path.resolve('proof-results');
  fs.mkdirSync(out, { recursive: true });
  const baselineSha = process.env.PROOF_BASE_SHA, candidateSha = process.env.PROOF_HEAD_SHA;
  if (!/^[a-f0-9]{40}$/.test(baselineSha || '') || !/^[a-f0-9]{40}$/.test(candidateSha || '')) throw Error('Require immutable baseline and candidate SHAs');
  const servers = [], results = [];
  try {
    const base = await serve('proof-baseline/dist'); servers.push(base);
    const candidate = await serve('dist'); servers.push(candidate);
    for (const proof of proofs.filter(p => p.ciSafe === true)) {
      const dir = path.join(out, proof.id); fs.mkdirSync(dir, { recursive: true });
      const log = fs.createWriteStream(path.join(dir, 'log.txt')), start = Date.now();
      const code = await new Promise((resolve, reject) => {
        const child = spawn(process.execPath, [proof.script, base.url, baselineSha, candidate.url, candidateSha], {
          env: { ...process.env, PAUSE_PROOF_OUT: dir, PAUSE_TRACE_PIXELS: '1', PAUSE_BASELINE_RESULT: path.resolve(`proof-cache/${proof.id}.json`) },
          stdio: ['ignore', 'pipe', 'pipe'],
        });
        child.stdout.on('data', data => { process.stdout.write(data); log.write(data); });
        child.stderr.on('data', data => { process.stderr.write(data); log.write(data); });
        child.on('error', reject); child.on('close', resolve);
      });
      await new Promise(resolve => log.end(resolve));
      results.push({ proof: proof.id, status: code === 0 ? 'passed' : 'failed', seconds: (Date.now() - start) / 1000, exitCode: code });
    }
  } finally {
    await Promise.all(servers.map(s => s.close()));
    const summary = { baselineSha, candidateSha, wallSeconds: (Date.now() - started) / 1000, results };
    fs.writeFileSync(path.join(out, 'summary.json'), JSON.stringify(summary, null, 2));
    const text = ['## Proofs', `Baseline: ${baselineSha}; candidate: ${candidateSha}`, ...results.map(r => `- ${r.proof}: **${r.status}**, ${r.seconds.toFixed(1)} s${r.seconds > 240 ? ' (SLOW: over four minutes)' : ''}`), `Runner wall time: ${(summary.wallSeconds / 60).toFixed(2)} minutes. Job setup is additional; use the Actions job duration for total added wall minutes.`, 'Failure evidence: proof-results artifact (logs, repaint PNGs, diff and pixel-submissions JSON when a mismatch is found).'].join('\n') + '\n';
    fs.writeFileSync(path.join(out, 'summary.md'), text);
    if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, text);
  }
  if (!results.length || results.some(r => r.status !== 'passed')) process.exitCode = 1;
}
if (require.main === module) main().catch(error => { console.error(error); process.exitCode = 1; });
module.exports = { resolveFile };
