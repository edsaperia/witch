// The opening storyboard (mock): screenshots each frame of index.html into <out dir>, 1600×900, and a contact sheet.
//   node tmp-opening/opening.mjs <out dir> [ids]
import { mkdirSync } from "node:fs";
import { openBrowser } from "../art/headless.mjs";
const [out = "opening-mock", only] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const b = await openBrowser();
await b.page.setViewportSize({ width: 1600, height: 900 });
await b.page.goto(`${b.base}/tmp-opening/index.html#01-chart`);
await b.page.waitForFunction(() => window.done, null, { timeout: 120000 });
const ids = only ? only.split(",") : await b.page.evaluate(() => window.FRAMES);
for (const id of ids) {
  await b.page.goto(`${b.base}/tmp-opening/index.html#${id}`); await b.page.reload();
  await b.page.waitForFunction(() => window.done, null, { timeout: 120000 });
  await b.page.screenshot({ path: `${out}/${id}.png` });
  console.log("shot", id);
}
if (b.errors.length) console.error(b.errors.join("\n"));
await b.close();
