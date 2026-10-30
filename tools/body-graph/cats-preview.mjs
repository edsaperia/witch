// CLOUD ONLY, assigned by the coordinator. No local browser run is implied.
// node tools/body-graph/cats-preview.mjs [output-directory]
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve, relative, sep } from "node:path";
import { openBrowser, ROOT } from "../../art/headless.mjs";
import { CAT_CAPTURE_IDS } from "./cat-fixtures.js";

const iteration = process.env.CAT_ITERATION ?? "cats-1";
if (!/^cats-\d+$/.test(iteration)) throw new Error("CAT_ITERATION must be cats-<number>");
const out = resolve(process.argv[2] ?? `previews/body-graph/${iteration}`);
if (!out.startsWith(ROOT + sep)) throw new Error("Output must stay inside this checkout");
const sha = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
execFileSync("git", ["diff", "--quiet"]);
execFileSync("git", ["diff", "--cached", "--quiet"]);
if (process.env.WITCH_SHA && process.env.WITCH_SHA !== sha) throw new Error("Expected checkout SHA differs from HEAD");
mkdirSync(out, { recursive: true });
writeFileSync(resolve(out, "source.json"), JSON.stringify({ sha, fixture: iteration, targetComments: [6513070150, 6513242775, 6513641499] }) + "\n");
const source = "/" + relative(ROOT, resolve(out, "source.json")).split(sep).join("/");
const b = await openBrowser(), measurements = [];
try {
  await b.page.goto(b.base + "/art/headless-blank.html");
  const served = await b.page.evaluate(async url => (await (await fetch(url, { cache: "no-store" })).json()).sha, source);
  if (served !== sha) throw new Error(`Served source mismatch: ${served} != ${sha}`);
  for (const id of CAT_CAPTURE_IDS) {
    const result = await b.page.evaluate(async id => {
      const G = await import("/art/generator.js"), F = await import("/tools/body-graph/cat-fixtures.js");
      const style = await (await fetch("/config/style.json")).json(), tuning = await (await fetch("/config/tuning.json")).json();
      const st = { ...G.defaultStyle(), ...style, artStyle: "bold", pixel: tuning.pixelSize };
      const base = G.GENOME_BY_ID[id], variant = F.catCaptureGenome(base);
      const selected = { ...st, creatureModels: `${id}:graph`, creatureVariants: { [id]: { graph: variant } } };
      const rows = [], timings = [];
      for (const level of [0, 1, 2, 3]) for (const facing of ["towards", "away", "top"]) {
        const pair = [];
        for (const [label, context] of [["Current", st], ["Shared graph diagnostic", selected]]) {
          const start = performance.now();
          const draw = () => G.critter(id, level, 0, context, facing === "top" ? "towards" : facing);
          const sp = facing === "top" ? G.withView({ yaw: .6, pitch: Math.PI / 2 }, draw) : draw();
          const constructionMs = performance.now() - start, bakeStart = performance.now();
          const baked = G.bake(sp, G.speciesColours(id, context, null, level), context, context.cOutline);
          timings.push({ label, level, facing, constructionMs, bakeMs: performance.now() - bakeStart, width: sp.w, height: sp.h, markingMetrics: sp.markingMetrics ?? null, graphDiagnostics: sp.graphDiagnostics ?? null });
          pair.push(baked.A);
        }
        rows.push({ level, facing, pair, height: Math.max(...pair.map(p => p.height)) + 32 });
      }
      const cellWidth = Math.max(180, ...rows.flatMap(r => r.pair.map(p => p.width + 24))), notesWidth = 260;
      const canvas = document.createElement("canvas");
      canvas.width = cellWidth * 2 + notesWidth; canvas.height = 64 + rows.reduce((sum, r) => sum + r.height, 0);
      if (canvas.width > 8192 || canvas.height > 16384) throw new Error(`Sheet exceeds explicit canvas budget: ${id}`);
      const c = canvas.getContext("2d"); c.imageSmoothingEnabled = false;
      c.fillStyle = "#201e29"; c.fillRect(0, 0, canvas.width, canvas.height);
      c.fillStyle = "#eee"; c.font = "12px sans-serif";
      c.fillText(`${base.name}: current game bake vs. graph diagnostic (native art pixels)`, 12, 19);
      c.fillText("Default remains current. This is not an approved roster preset or a likeness score.", 12, 38);
      c.fillText("Current", 12, 57); c.fillText("Shared graph diagnostic", cellWidth + 12, 57);
      c.fillText("Roster targets (notes)", cellWidth * 2 + 12, 57);
      const wrap = (text, x, y) => {
        let line = "";
        for (const word of text.split(" ")) {
          if (c.measureText(line + word).width > notesWidth - 24) { c.fillText(line, x, y); y += 17; line = ""; }
          line += word + " ";
        }
        if (line) c.fillText(line, x, y);
      };
      let y = 64;
      for (const row of rows) {
        c.fillStyle = "#c9c0d8"; c.font = "11px sans-serif";
        for (let col = 0; col < 2; col++) {
          c.fillText(`${G.LEVELS[row.level]} / ${row.facing}`, col * cellWidth + 12, y + 14);
          const image = row.pair[col];
          c.drawImage(image, Math.round(col * cellWidth + (cellWidth - image.width) / 2), y + row.height - image.height - 5);
        }
        wrap(F.CAT_TARGET_NOTES[id], cellWidth * 2 + 12, y + 18);
        y += row.height;
      }
      return { png: canvas.toDataURL("image/png").split(",")[1], timings, pixel: st.pixel, selectedHash: G.genomeHash(base, selected), currentHash: G.genomeHash(base) };
    }, id);
    writeFileSync(resolve(out, `${id}.png`), Buffer.from(result.png, "base64"));
    const { png, ...metadata } = result; measurements.push({ id, ...metadata });
    console.log(`wrote ${id}.png`);
  }
  if (b.errors.length) throw new Error(b.errors.join("\n"));
  writeFileSync(resolve(out, "evidence.json"), JSON.stringify({ sha, servedSha: served, fixture: iteration, defaultOff: true, measurements, costScope: "First unique sprite construction and albedo bake wall time in a fresh page, serial current/graph order; includes JIT/GC effects. Not gameplay frame time or GPU cost.", markingScope: "markingMetrics reports nominal surface diameter before projection; foreshortening/clipping and native visible ring size require image review.", visualAcceptance: "pending independent likeness review", targetComments: [6513070150,6513242775,6513641499] }, null, 2) + "\n");
} finally { await b.close(); }
