import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { openBrowser } from "../../art/headless.mjs";
const out = process.argv[2] || "previews/mushrooms/generated-sheet.png";
const b = await openBrowser();
try {
  await b.page.goto(b.base + "/tools/mushrooms/index.html");
  await b.page.waitForFunction(() => window.mushroomReady === true);
  if (b.errors.length) throw new Error(b.errors.join("\n"));
  mkdirSync(dirname(out), { recursive: true });
  await b.page.setViewportSize({ width: 1440, height: 1000 });
  await b.page.locator('[data-grid]').screenshot({ path: out });
  console.log(out);
} finally { await b.close(); }
