// The link switches as data (Ed, 2026-10-28: "Let's do all the docs work. Reformat prose into data where you can"): every ?name=value
// the game reads from its link is a record in config/link-switches.json (what it does, its values, its group, since when, Ed's
// decision if any), and docs/LINK-SWITCHES.md is written from it. Where each is read is found by scanning the code (scanLinkSwitches:
// params.get/has/getAll("name") on a URLSearchParams, src/**/*.ts but the tests, and the root's pages), so the record can't drift:
// src/linkSwitches.test.ts fails on a switch read but not registered, one registered but read nowhere, a stale readIn or a stale
// doc.
//   node tools/config/linkSwitches.mjs           refresh each record's readIn from the code, then rewrite docs/LINK-SWITCHES.md
//   node tools/config/linkSwitches.mjs --check   say what's out of step (as the test does), change nothing
// A new switch: add its record (name, values, does, group, since) to config/link-switches.json, then run this.
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
export const REGISTRY = "config/link-switches.json", DOC = "docs/LINK-SWITCHES.md";
export const GROUPS = {
  run: ["The run", "What the night is: its seed, island, world, opening, sail and her kit."],
  view: ["Looks and their costs", "How the world is drawn, to try values live or to measure."],
  debug: ["Debug and tools", "For the builders, the smoke and bench runs, the repro link and the arenas."],
  compare: ["Compare with the old", "Each brings back how something was before a change, to compare against what replaced it."],
};

// a get/has/getAll("name") on something that is a URLSearchParams: a `...params`/`...searchParams`/`link`, or a fresh one
const READ = /([A-Za-z_$][\w$]*|\))\s*\.(?:get|has|getAll)\(\s*(["'])([^"'\s]+)\2\s*\)/g;
const isParams = (recv, before) => /params$/i.test(recv) || recv === "link" || (recv === ")" && /URLSearchParams\((?:[^()]|\([^()]*\))*$/.test(before.slice(-120)));

/** Every switch the code reads, each with the files reading it (relative to the root, sorted). */
export function scanLinkSwitches(root = ROOT) {
  const out = new Map(), files = [];
  const walk = d => { for (const f of readdirSync(d)) { const p = join(d, f); if (statSync(p).isDirectory()) walk(p); else if (/\.ts$/.test(f) && !/\.test\.ts$/.test(f)) files.push(p); } };
  walk(join(root, "src"));
  for (const f of readdirSync(root)) if (/\.html$/.test(f)) files.push(join(root, f));
  for (const f of files) {
    const s = readFileSync(f, "utf8"), rel = relative(root, f).replace(/\\/g, "/");
    for (const m of s.matchAll(READ)) if (isParams(m[1], s.slice(0, m.index))) {
      if (!out.has(m[3])) out.set(m[3], new Set());
      out.get(m[3]).add(rel);
    }
  }
  return new Map([...out].sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => [k, [...v].sort()]));
}

export const loadRegistry = (root = ROOT) => JSON.parse(readFileSync(join(root, REGISTRY), "utf8"));

/** What's out of step between the registry and the code (empty: none). */
export function linkSwitchProblems(reg, scan) {
  const out = [], named = new Set(reg.switches.map(s => s.name));
  for (const [name, files] of scan) if (!named.has(name)) out.push(`${name}: read (${files.join(", ")}) but not in ${REGISTRY}`);
  for (const s of reg.switches) {
    const files = scan.get(s.name);
    if (!files) out.push(`${s.name}: in ${REGISTRY} but nothing reads it (retire it: move it to "retired")`);
    else if (JSON.stringify(files) !== JSON.stringify(s.readIn)) out.push(`${s.name}: readIn is ${JSON.stringify(s.readIn)}, the code reads it in ${JSON.stringify(files)}`);
    if (!GROUPS[s.group]) out.push(`${s.name}: no group ${s.group} (${Object.keys(GROUPS).join(", ")})`);
    for (const k of ["does", "since"]) if (!s[k]) out.push(`${s.name}: no ${k}`);
  }
  return out;
}

const cell = t => String(t).replace(/\|/g, "\\|");
const code = t => `\`${t}\``;
const shown = s => (s.values.length ? s.values.map(v => code(v === "" ? s.name : `${s.name}=${v}`)).join(" / ") : code(s.name));
const short = f => f.replace(/^src\//, "");

/** docs/LINK-SWITCHES.md, written from the registry. */
export function renderLinkSwitches(reg) {
  const L = ["# Link switches", "", `<!-- Written by tools/config/linkSwitches.mjs from ${REGISTRY}: edit that, not this. -->`, "", reg.intro, ""];
  for (const [g, [title, about]] of Object.entries(GROUPS)) {
    const rows = reg.switches.filter(s => s.group === g);
    if (!rows.length) continue;
    L.push(`## ${title}`, "", about, "", "| switch | does | since | read in |", "|---|---|---|---|");
    for (const s of rows) L.push(`| ${cell(shown(s))} | ${cell(s.does + (s.decision ? ` *Decision: ${s.decision}.*` : ""))} | ${cell(s.since)} | ${cell(s.readIn.map(short).join(", "))} |`);
    L.push("");
  }
  if (reg.patterns?.length) {
    L.push("## Families", "", "Switches named by a pattern, read where the name is built (the test can't see these).", "", "| switch | does | read in |", "|---|---|---|");
    for (const p of reg.patterns) L.push(`| ${cell(code(`${p.name}=${p.values.join("|")}`))} | ${cell(p.does)} | ${cell(p.readIn.map(short).join(", "))} |`);
    L.push("");
  }
  if (reg.retired?.length) {
    L.push("## Retired", "", reg.retiredIntro, "", "| switch | brought back | what stays |", "|---|---|---|");
    for (const r of reg.retired) L.push(`| ${cell(r.values.length ? r.values.map(v => code(`${r.name}=${v}`)).join(" / ") : code(r.name))} | ${cell(r.broughtBack)} | ${cell(r.stays)} |`);
    L.push("");
  }
  return L.join("\n");
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const reg = loadRegistry(), scan = loadScan();
  function loadScan() { return scanLinkSwitches(); }
  if (process.argv.includes("--check")) {
    const p = linkSwitchProblems(reg, scan), stale = readFileSync(join(ROOT, DOC), "utf8").replace(/\r\n/g, "\n") !== renderLinkSwitches(reg);
    for (const l of p) console.log(l);
    if (stale) console.log(`${DOC} is stale: run node tools/config/linkSwitches.mjs`);
    process.exitCode = p.length || stale ? 1 : 0;
  } else {
    for (const s of reg.switches) if (scan.has(s.name)) s.readIn = scan.get(s.name);
    writeFileSync(join(ROOT, REGISTRY), JSON.stringify(reg, null, 1) + "\n");
    writeFileSync(join(ROOT, DOC), renderLinkSwitches(reg));
    const p = linkSwitchProblems(reg, scan);
    for (const l of p) console.log(l);
    console.log(`wrote ${DOC} (${reg.switches.length} switches)${p.length ? `; ${p.length} problem(s) above` : ""}`);
    process.exitCode = p.length ? 1 : 0;
  }
}
