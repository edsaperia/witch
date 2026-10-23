// MOCK ONLY: stamps MOCK and a caption on a game screenshot.  node label.cjs <in.png> <out.png> <caption>
const fs = require("fs");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [inp, out, caption] = process.argv.slice(2);
(async () => {
  const b = await playwright.chromium.launch(), p = await b.newPage({ viewport: { width: 1280, height: 720 } });
  const src = "data:image/png;base64," + fs.readFileSync(inp).toString("base64");
  await p.setContent(`<body style="margin:0"><img src="${src}" style="display:block"><div style="position:fixed;right:14px;top:12px;font:bold 13px ui-monospace,monospace;color:#1a1430;background:#e8b46a;padding:3px 9px;border-radius:4px;letter-spacing:1px">MOCK</div><div style="position:fixed;left:50%;transform:translateX(-50%);bottom:30px;max-width:900px;font:13px/1.4 ui-monospace,monospace;color:#e8e2f4;text-shadow:0 1px 2px #000,0 0 6px #000;text-align:center">${caption}</div></body>`);
  await p.waitForTimeout(200); await p.screenshot({ path: out }); await b.close();
})();
