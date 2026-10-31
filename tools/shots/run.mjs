// Run a small scenario in an explicitly allocated bounded headless slot, using a supplied Playwright runtime; never installs/launches without evidence.
//   node tools/shots/run.mjs <scenario.mjs> <url> <full-sha> <output> <slot.json> [playwright-module] [scenario-options.json]
import fs from 'node:fs/promises';
import { resolve, isAbsolute } from 'node:path';
import { pathToFileURL } from 'node:url';
import { withHeadlessSlot, validateSlotEvidence } from './headless.mjs';
import { loadStill, restorePreparedHold, restoreEnvironment } from './still.mjs';

export async function runScenario({ scenarioPath, url, expectedSha, output, evidencePath, runtime = 'playwright', optionsPath = null }) {
  const evidence = JSON.parse(await fs.readFile(evidencePath, 'utf8'));
  validateSlotEvidence(evidence, expectedSha); // Reject before loading any browser runtime.
  const sdk = await import(isAbsolute(runtime) ? pathToFileURL(runtime).href : runtime), playwright = sdk.default ?? sdk;
  const scenario = await import(pathToFileURL(resolve(scenarioPath)).href);
  if (typeof scenario.run !== 'function') throw Error('Scenario must export run({page,loadStill,url,expectedSha,output,options})');
  const options = optionsPath ? JSON.parse(await fs.readFile(optionsPath, 'utf8')) : {};
  return withHeadlessSlot({ playwright, evidence, expectedSha, output }, async page => {
    try { return await scenario.run({ page, loadStill, url, expectedSha, output, options }); }
    finally {
      await page.evaluate(restorePreparedHold).catch(() => {});
      await page.evaluate(restoreEnvironment).catch(() => {});
    }
  });
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const [scenarioPath, url, expectedSha, output, evidencePath, runtime, optionsPath] = process.argv.slice(2);
  if (!evidencePath) { console.error('Require scenario, URL, full SHA, output and actual slot evidence'); process.exitCode = 2; }
  else runScenario({ scenarioPath, url, expectedSha, output, evidencePath, runtime, optionsPath }).then(result => console.log(JSON.stringify(result)), error => { console.error(error.message); process.exitCode = 1; });
}
