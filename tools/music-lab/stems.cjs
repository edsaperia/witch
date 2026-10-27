// The music drawn a bar at a time as stems against the same music drawn whole (tools/music-lab/stems.ts, bundled here), in
// headless Chromium, a line of JSON a section:
//   node tools/music-lab/stems.cjs [sections: drop,build,breakdown,forest] [bars: 4]
//     each section as stems through the bus against whole: apart sample by sample (dB under the music, and bar by bar), by
//     ear (the level in 50 ms windows), the seams at the bar lines, and the cost a bar (queued on the page's thread, rendered off it)
//   node tools/music-lab/stems.cjs parts [sections] [bars: 2]     the same, each part alone
//   node tools/music-lab/stems.cjs shift [sections] [bars: 1]     the live engine's own music drawn 2 s later against at 0, each
//     part alone: how near sample by sample the stems can come after their first bar
//   OLD=<a checkout> node tools/music-lab/stems.cjs ab [sections] [bars: 4]   the live engine before a change (that checkout's)
//     against after it, drawn whole: apart by no more than Chromium's own rounding (after against after)
const fs = require("fs"), path = require("path"), os = require("os");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const ROOT = path.resolve(__dirname, "../..");
const MODES = { parts: "byPart", shift: "shiftTest", ab: "ab" }, args = process.argv.slice(2), mode = MODES[args[0]] ? args.shift() : "stems";
const sections = (args[0] || "drop,build,breakdown,forest").split(","), bars = Number(args[1] || (mode === "parts" ? 2 : mode === "shift" ? 1 : 4));
(async () => {
  const { build } = await import(path.join(ROOT, "node_modules/esbuild/lib/main.js"));
  let entry = path.join(__dirname, "stems.ts"), tmp = null;
  if (mode === "ab") {
    if (!process.env.OLD) throw new Error("ab: OLD=<a checkout of the engine before the change>");
    tmp = path.join(__dirname, `.stems-ab-${process.pid}.ts`);
    fs.writeFileSync(tmp, `import { MusicEngine as Old } from ${JSON.stringify(path.resolve(process.env.OLD, "src/platform/audio/musicEngine"))};\n(window as unknown as { OldEngine: unknown }).OldEngine = Old;\nimport "./stems";\n`);
    entry = tmp;
  }
  try {
    const r = await build({ entryPoints: [entry], bundle: true, format: "iife", target: "es2022", write: false, logLevel: "warning", absWorkingDir: ROOT, nodePaths: [path.join(ROOT, "node_modules")] });
    const file = path.join(os.tmpdir(), `witch-stems-${process.pid}.html`);
    fs.writeFileSync(file, `<!doctype html><meta charset="utf-8"><body><script>${r.outputFiles[0].text.replace(/<\/script/gi, "<\\/script")}</script>`);
    const browser = await playwright.chromium.launch();
    try {
      const page = await browser.newPage();
      page.on("pageerror", e => console.log("pageerror", e.message));
      await page.goto("file://" + file);
      for (const s of sections) console.log(JSON.stringify(await page.evaluate(([fn, s, b]) => window[fn](s, b), [MODES[mode] ?? "stems", s, bars])));
    } finally { await browser.close(); fs.unlinkSync(file); }
  } finally { if (tmp) fs.unlinkSync(tmp); }
})().catch(e => { console.error(e); process.exit(1); });
