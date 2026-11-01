// Canonical-allocated cloud only, two serial private contexts; no existing browser/profile/window touched.
//   WITCH_CLOUD_CPU=1 BASE_URL=<preview> EXPECTED_SHA=<full tested head> node tools/combat-spacing/capture.cjs <output>
const fs = require('node:fs/promises'), path = require('node:path');
const { captureFight } = require('./capture-fight.cjs');
let playwright;
try { playwright = require('playwright'); } catch { playwright = require('/opt/node22/lib/node_modules/playwright'); }

async function main() {
  if (process.platform === 'win32' || !(process.env.GITHUB_ACTIONS === 'true' || process.env.WITCH_CLOUD_CPU === '1')) throw Error('Canonical-allocated cloud capture only');
  const expectedSha = process.env.EXPECTED_SHA, baseUrl = process.env.BASE_URL;
  if (!/^[a-f0-9]{40}$/.test(expectedSha ?? '') || !baseUrl) throw Error('Require BASE_URL and full EXPECTED_SHA');
  const output = path.resolve(process.argv[2] ?? 'previews/combat-spacing-captures');
  await fs.mkdir(output, { recursive: true });
  const browser = await playwright.chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const results = [];
  try {
    for (const on of [false, true]) {
      const context = await browser.newContext({ viewport: { width: 960, height: 540 }, deviceScaleFactor: 1 });
      try {
        const page = await context.newPage();
        results.push(await captureFight(page, { baseUrl, expectedSha, output: path.join(output, on ? 'on' : 'off'), on }));
      } finally { await context.close(); }
    }
    if (JSON.stringify(results[0].source.initial) !== JSON.stringify(results[1].source.initial)) throw Error('Off/on arena starting bodies differ');
    if (JSON.stringify(results[0].source.version) !== JSON.stringify(results[1].source.version)) throw Error('Build changed between captures');
    await fs.writeFile(path.join(output, 'pair.json'), JSON.stringify({ expectedSha, matchedStart: true, results }, null, 2) + '\n');
  } catch (error) {
    await fs.writeFile(path.join(output, 'failure.json'), JSON.stringify({ expectedSha, completed: results.length, error: String(error) }, null, 2) + '\n');
    throw error;
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
