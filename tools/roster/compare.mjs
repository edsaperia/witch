// Cloud runner only. Matched source-model sheets, not exact in-game screenshots.
// node tools/roster/compare.mjs previews/ed/roster [bear,arcticfox,snowleopard,beetle]
import { mkdirSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { openBrowser } from "../../art/headless.mjs";
import { ROSTER_PRESETS } from "../../art/roster/presets.js";
const [out = "previews/ed/roster", only = "bear,arcticfox,snowleopard,beetle"] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const sha = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
const modelSha = process.env.ROSTER_MODEL_SHA || "";
const poses = (process.env.ROSTER_POSES || "walk").split(",");
if (poses.some(p => !["walk", "idle"].includes(p))) throw Error("ROSTER_POSES supports walk,idle");
if (modelSha && !/^[0-9a-f]{40}$/.test(modelSha)) throw Error("ROSTER_MODEL_SHA must be an exact commit");
for (const id of only.split(",")) if (ROSTER_PRESETS[id]?.modelCommit) {
  try { execFileSync("git", ["merge-base", "--is-ancestor", ROSTER_PRESETS[id].modelCommit, modelSha || sha], { stdio: "pipe" }); }
  catch { throw Error(`${id} requires model ${ROSTER_PRESETS[id].modelCommit} or a descendant; prepare that exact snapshot before capturing`); }
}
const b = await openBrowser();
try {
  await b.page.goto(b.base + "/art/headless-blank.html");
  for (const id of only.split(",")) for (const lightMode of (process.env.ROSTER_LIGHTS || "studio,night").split(",")) {
    if (!["albedo", "studio", "night"].includes(lightMode)) throw Error(`Unknown lighting ${lightMode}`);
    const result = await b.page.evaluate(async ({ id, lightMode, sha, modelSha, poses }) => {
      const root = modelSha ? `/previews/roster-model-${modelSha}` : "";
      const G = await import(`${root}/art/generator.js`), C = await import(`${root}/art/creatures.js`), B = await import(`${root}/art/creatures3d.js`);
      const production = modelSha ? await import("/art/creatures.js") : C;
      const { rosterGenome, createRosterVariants, expectedRosterLegendPalette, ROSTER_PRESETS } = await import("/art/roster/presets.js");
      if (!ROSTER_PRESETS[id]) throw Error(`Unknown proposed species ${id}`);
      const original = G.GENOME_BY_ID[id];
      const sharedSelection = typeof G.selectedCreatureGenome === "function";
      const context = { creatureModels: `${id}:roster`, creatureVariants: createRosterVariants(G.GENOMES) };
      const paletteData = p => { const out = { ...p }; if (!out.over || !Object.keys(out.over).length) delete out.over; return JSON.stringify(out); };
      if (ROSTER_PRESETS[id].modelCommit && (!sharedSelection || !G.M.SHELL || !G.M.THORAX || !G.M.HEAD)) throw Error(`${id} candidate needs model ${ROSTER_PRESETS[id].modelCommit}; prepare snapshot and set ROSTER_MODEL_SHA`);
      if (sharedSelection && ROSTER_PRESETS[id].ordinaryOnly && paletteData(G.selectedCreatureGenome(original, context, 3).palette) !== paletteData(expectedRosterLegendPalette(original))) throw Error("Selected elder palette differs from its declared review target");
      const st = { ...G.defaultStyle(), artStyle: "bold", pixel: 3 };
      const night = lightMode === "night";
      const light = night ? st : { ...st, ambient: .55, ambientHue: .15, moon: .9, moonHue: .15, shafts: 0 };
      const { shade } = await import(`${root}/art/lighting.js`);
      const { spritePixelDiff } = await import("/tools/roster/pixel-diff.js");
      const make = (w, h) => { const c = document.createElement("canvas"); c.width = w; c.height = h; return c; };
      const rows = [], measurements = [], resolvedRecords = [];
      // Direct existing builder avoids critter's id-only cache aliasing current/proposed.
      // Keep actual species id for identical texture seed; prove current matches production.
      for (const pose of poses) for (const facing of ["towards", "away"]) for (const frame of [0, 1]) for (const level of [0, 1, 2, 3]) {
        if (pose === "idle" && !C.IDLE_BUILDERS?.[G.speciesOf(original).idle]) continue;
        const sprites = [0, 1].map(column => {
          // Once released, #1470 owns all selection. Legacy path exists only to
          // render the explicitly-authorised pre-hook isolated data candidates.
          const S = sharedSelection ? G.speciesOf(original, column ? context : {}, level) : G.speciesOf(column ? rosterGenome(original, [id], level) : original);
          if (frame === 0 && facing === "towards") resolvedRecords.push({ level, column: column ? "proposed" : "current", body: { ...S.q, ...S.levelQ?.[level] }, look: S.look || null, paletteHSV: [S.hue, S.sat, S.val] });
          const sprite = B.withTexture({ S, level, st }, () => pose === "idle" ? C.IDLE_BUILDERS[S.idle](S, level, frame, st, facing) : C.buildCreature(S, level, frame, st, facing));
          G.textureSprite(sprite, S, level, st, C.textureSeed(id));
          if (!column) {
            const prod = production.critter(id, level, frame, st, facing, pose === "idle" ? { idle: true } : null);
            if (prod.w !== sprite.w || prod.h !== sprite.h || prod.m.some((v, i) => v !== sprite.m[i]) || prod.n.some((v, i) => v !== sprite.n[i])) throw Error(`Current reference mismatch ${id}/${level}/${frame}/${facing}`);
          }
          const baked = G.bake(sprite, G.speciesColours(S, st), st, st.cOutline), lit = make(baked.w, baked.h);
          if (lightMode === "albedo") return baked.A;
          shade({ a: baked.A.getContext("2d"), n: baked.N.getContext("2d"), w: baked.w, h: baked.h }, lit, light, [], [0, 0, baked.w, baked.h]);
          return lit;
        });
        const pixelDiff = spritePixelDiff(...sprites.map(s => s.getContext("2d").getImageData(0, 0, s.width, s.height)));
        measurements.push({ id, pose, facing, frame, level, pixelDiff, current: [sprites[0].width, sprites[0].height], proposed: [sprites[1].width, sprites[1].height] });
        rows.push({ label: `${pose} ${facing} frame ${frame} level ${level}`, sprites });
      }
      const maxW = Math.max(...rows.flatMap(r => r.sprites.map(s => s.width))), maxH = Math.max(...rows.flatMap(r => r.sprites.map(s => s.height)));
      const cellW = maxW + 16, height = rows.reduce((h, r) => h + Math.max(...r.sprites.map(s => s.height)) + 28, 100);
      const cv = make(220 + 2 * cellW, height), ctx = cv.getContext("2d");
      ctx.fillStyle = night ? "#0c1014" : "#30383c"; ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.fillStyle = "#eee"; ctx.font = "12px monospace";
      ctx.fillText(`${id}: current / proposed — ${lightMode}`, 10, 18);
      ctx.fillText("Native baked art pixels (1x); not perspective screen capture", 10, 36);
      ctx.fillText(sha, 10, 54);
      if (modelSha) ctx.fillText(`Model source: ${modelSha.slice(0, 12)}`, 10, 68);
      ctx.fillText("CURRENT", 220, 80); ctx.fillText("PROPOSED (default off)", 220 + cellW, 80);
      let y = 94;
      for (const row of rows) {
        const h = Math.max(...row.sprites.map(s => s.height));
        ctx.fillStyle = "#eee"; ctx.fillText(row.label, 8, y + 15);
        row.sprites.forEach((s, i) => ctx.drawImage(s, 220 + i * cellW, y + h - s.height));
        y += h + 28;
      }
      const enlarged = make(cv.width * 2, cv.height * 2), ec = enlarged.getContext("2d");
      ec.imageSmoothingEnabled = false; ec.drawImage(cv, 0, 0, enlarged.width, enlarged.height);
      return { native: cv.toDataURL(), enlarged: enlarged.toDataURL(), measurements, resolvedRecords, modelSourceCommit: modelSha || sha, lighting: lightMode, style: st, largestCell: [maxW, maxH], selectionInterface: sharedSelection ? "shared #1470 selector" : "isolated pre-hook genome data" };
    }, { id, lightMode, sha, modelSha, poses });
    const stem = `${out}/${id}-${lightMode}`;
    for (const key of ["native", "enlarged"]) writeFileSync(`${stem}-${key}.png`, Buffer.from(result[key].split(",")[1], "base64"));
    const { native, enlarged, ...metadata } = result;
    writeFileSync(`${stem}.json`, JSON.stringify({ sha, ...metadata }, null, 2) + "\n");
    console.log(`wrote ${stem} (matched production reference)`);
  }
  if (b.errors.length) throw Error(b.errors.join("\n"));
} finally { await b.close(); }
