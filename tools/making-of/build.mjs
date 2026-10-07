#!/usr/bin/env node
// The Making Of site (making-of/ → dist/making-of/, served at /witch/making-of/ beside the game).
// `npm run build` runs it after Vite, so the Pages workflow publishes it with every build.
//
//   node tools/making-of/build.mjs [out dir] [--check]
//
// Sources, all in making-of/:
// - site.json: the title and the chapters in order ({ slug, title, kicker, blurb }), each a page in pages/<slug>.html;
// - pages/*.html: each page's body only, plain HTML, with three helpers:
//     <!--figure media/art/trees.webp-->   one picture, its caption from media/media.json
//     <!--gallery group=trees-->           every picture of that group, in its order
//     <!--gallery chapter=art rest-->      every picture of that chapter not shown yet on the page
//   and {#123} for a link to pull request 123;
// - media/: the pictures and sounds, each listed in media/media.json ({ src, caption, chapter, group?, order?, pr? });
// - builders/<name>.json: a builder's "what I built / what I learned" (see builders/README.md), shown on the builders page;
// - assets/: the stylesheet and the game's two pixel fonts.
// --check builds into a scratch dir and fails on a malformed builder file, a missing picture or link, an unlisted
// picture, or a model's name anywhere in the site.
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const SRC = join(ROOT, "making-of");
const REPO = "https://github.com/edsaperia/witch";
const problems = [];
const fail = msg => problems.push(msg);

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
/** Plain text from a builder's file: escaped, `code` and {#123} (or #123) as links. */
const inline = s => esc(s).replace(/`([^`]+)`/g, "<code>$1</code>").replace(/\{?#(\d{1,4})\}?/g, (_, n) => `<a class="pr" href="${REPO}/pull/${n}">#${n}</a>`);
const prLinks = html => html.replace(/\{#(\d{1,4})\}/g, (_, n) => `<a class="pr" href="${REPO}/pull/${n}">#${n}</a>`);

const readJson = (file, fallback) => {
  if (!existsSync(file)) return fallback;
  try { return JSON.parse(readFileSync(file, "utf8")); } catch (e) { fail(`${relative(ROOT, file)}: ${e.message}`); return fallback; }
};

const site = readJson(join(SRC, "site.json"), { title: "The Making Of", chapters: [] });
const media = readJson(join(SRC, "media/media.json"), []);
const bySrc = new Map(media.map(m => [m.src, m]));

function figure(m) {
  const cap = m.caption ? `<figcaption>${prLinks(esc(m.caption))}${m.pr ? ` <a class="pr" href="${REPO}/pull/${m.pr}">#${m.pr}</a>` : ""}</figcaption>` : "";
  if (/\.(mp3|ogg|wav)$/.test(m.src)) return `<figure class="sound"><audio controls preload="none" src="${esc(m.src)}"></audio>${cap}</figure>`;
  if (/\.(webm|mp4)$/.test(m.src)) return `<figure><video controls muted loop playsinline preload="metadata" src="${esc(m.src)}"></video>${cap}</figure>`;
  return `<figure><a href="${esc(m.src)}"><img loading="lazy" src="${esc(m.src)}" alt="${esc(m.caption || "")}"></a>${cap}</figure>`;
}

/** A page's body with its helpers filled in. */
function expand(body, page) {
  const shown = new Set();
  const order = (a, b) => (a.order ?? 0) - (b.order ?? 0) || a.src.localeCompare(b.src);
  return prLinks(body)
    .replace(/<!--\s*figure\s+(\S+)\s*-->/g, (_, src) => {
      const m = bySrc.get(src);
      if (!m) { fail(`${page}: <!--figure ${src}--> is not in media/media.json`); return ""; }
      shown.add(src);
      return figure(m);
    })
    .replace(/<!--\s*gallery\s+([^>]*?)\s*-->/g, (_, args) => {
      const kv = Object.fromEntries(args.split(/\s+/).map(a => a.split("=")));
      const list = media.filter(m => (!kv.group || m.group === kv.group) && (!kv.chapter || m.chapter === kv.chapter) && !("rest" in kv && shown.has(m.src))).sort(order);
      if (!list.length && !("rest" in kv)) fail(`${page}: <!--gallery ${args}--> matches no media`);
      list.forEach(m => shown.add(m.src));
      return list.length ? `<div class="gallery">${list.map(figure).join("")}</div>` : "";
    });
}

const BUILDER_KEYS = { builder: "string", phase: "string", slice: "string", prs: "array", built: "array", learned: "array", previews: "array" };
function readBuilders() {
  const dir = join(SRC, "builders");
  const files = existsSync(dir) ? readdirSync(dir).filter(f => f.endsWith(".json") && !f.startsWith("_")).sort() : [];
  return files.map(f => {
    const b = readJson(join(dir, f), null);
    if (!b) return null;
    for (const [k, t] of Object.entries(BUILDER_KEYS)) {
      const ok = t === "array" ? Array.isArray(b[k] ?? []) : typeof b[k] === "string" && b[k].trim();
      if (!ok) fail(`builders/${f}: "${k}" should be ${t === "array" ? "a list" : "some text"}`);
    }
    for (const k of Object.keys(b)) if (!(k in BUILDER_KEYS) && k !== "notes") fail(`builders/${f}: unknown field "${k}"`);
    for (const p of b.previews ?? []) {
      if (typeof p?.src !== "string" || typeof p?.caption !== "string") fail(`builders/${f}: each preview needs "src" and "caption"`);
      else if (!/^https:\/\//.test(p.src) && !existsSync(join(SRC, p.src))) fail(`builders/${f}: preview ${p.src} not found in making-of/`);
    }
    for (const n of b.prs ?? []) if (!Number.isInteger(n)) fail(`builders/${f}: "prs" should be pull request numbers`);
    return { ...b, file: f };
  }).filter(Boolean);
}

function buildersPage(list) {
  if (!list.length) return `<p class="dim">No builder notes yet. Each builder adds one file to <code>making-of/builders/</code> as they finish; see its README.</p>`;
  return list.map(b => `<section class="builder" id="${esc(b.file.replace(/\.json$/, ""))}">
  <h2>${esc(b.builder)} <span class="dim">· ${esc(b.phase)}</span></h2>
  <p class="slice">${inline(b.slice)}${(b.prs ?? []).length ? ` <span class="dim">(${b.prs.map(n => inline(`#${n}`)).join(", ")})</span>` : ""}</p>
  ${(b.built ?? []).length ? `<h3>What I built</h3><ul>${b.built.map(s => `<li>${inline(s)}</li>`).join("")}</ul>` : ""}
  ${(b.learned ?? []).length ? `<h3>What I learned</h3><ul>${b.learned.map(s => `<li>${inline(s)}</li>`).join("")}</ul>` : ""}
  ${(b.previews ?? []).length ? `<div class="gallery">${b.previews.map(p => figure({ src: p.src, caption: p.caption })).join("")}</div>` : ""}
</section>`).join("\n");
}

function page({ slug, title, kicker, blurb }, body, prev, next) {
  const nav = site.chapters.map((c, i) => `<a href="${c.slug === "index" ? "./" : `${c.slug}.html`}"${c.slug === slug ? ' aria-current="page"' : ""}>${c.slug === "index" ? "Start" : `${i}. ${esc(c.short || c.title)}`}</a>`).join("");
  const step = (c, rel) => c ? `<a rel="${rel}" href="${c.slug === "index" ? "./" : `${c.slug}.html`}">${rel === "prev" ? "← " : ""}${esc(c.title)}${rel === "next" ? " →" : ""}</a>` : "<span></span>";
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(slug === "index" ? site.title : `${title} · ${site.title}`)}</title>
<meta name="description" content="${esc(blurb || site.blurb || "")}">
<link rel="stylesheet" href="assets/site.css">
</head>
<body>
<header class="top"><a class="brand" href="./">${esc(site.title)}</a><nav>${nav}</nav></header>
<main>
${slug === "index" ? "" : `<p class="kicker">${esc(kicker || "")}</p><h1>${esc(title)}</h1>${blurb ? `<p class="lede">${esc(blurb)}</p>` : ""}`}
${body}
</main>
<footer><div class="steps">${step(prev, "prev")}${step(next, "next")}</div><p class="dim">Coven Rush is a game by Ed Saperia, in progress. <a href="../">Play the latest build</a> · <a href="${REPO}">Source</a></p></footer>
</body>
</html>
`;
}

export function build(out) {
  rmSync(out, { recursive: true, force: true });
  mkdirSync(out, { recursive: true });
  cpSync(join(SRC, "assets"), join(out, "assets"), { recursive: true });
  if (existsSync(join(SRC, "media"))) cpSync(join(SRC, "media"), join(out, "media"), { recursive: true, filter: s => !s.endsWith("media.json") });
  const builders = readBuilders();
  const chapters = site.chapters;
  chapters.forEach((c, i) => {
    const file = join(SRC, "pages", `${c.slug}.html`);
    let body = existsSync(file) ? readFileSync(file, "utf8") : `<p class="dim">This chapter is being written tonight.</p>`;
    body = body.replace(/<!--\s*builders\s*-->/, () => buildersPage(builders));
    body = expand(body, `pages/${c.slug}.html`);
    writeFileSync(join(out, c.slug === "index" ? "index.html" : `${c.slug}.html`), page(c, body, chapters[i - 1], chapters[i + 1]));
  });
  return { chapters: chapters.length, builders: builders.length, media: media.length };
}

/** The checks: every local link and picture there, every picture listed, no model names. */
function check(out) {
  for (const m of media) {
    if (!m.src || !m.caption || !m.chapter) fail(`media.json: ${m.src ?? "an entry"} needs src, caption and chapter`);
    if (m.src && !existsSync(join(SRC, m.src))) fail(`media.json: ${m.src} not found`);
  }
  const walk = d => readdirSync(d).flatMap(f => statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]);
  if (existsSync(join(SRC, "media"))) for (const f of walk(join(SRC, "media"))) {
    const src = relative(SRC, f).split("\\").join("/");
    if (src !== "media/media.json" && !bySrc.has(src)) fail(`${src} is not listed in media/media.json`);
  }
  // Model names stay out of the site (the team's rule). Built from parts so this file doesn't trip its own check.
  const names = new RegExp(["Cla" + "ude", "Op" + "us", "Son" + "net", "Hai" + "ku", "G" + "PT-?\\d", "Gem" + "ini"].map(n => `\\b${n}\\b`).join("|"), "i");
  for (const f of walk(out).filter(f => f.endsWith(".html"))) {
    const html = readFileSync(f, "utf8");
    const hit = html.match(names);
    if (hit) fail(`${relative(out, f)}: mentions "${hit[0]}"`);
    for (const [, url] of html.matchAll(/(?:src|href)="([^"#?]+)[^"]*"/g)) {
      if (/^(https?:|mailto:|\.\.\/)/.test(url) || url === "./") continue;
      if (!existsSync(join(dirname(f), url))) fail(`${relative(out, f)}: broken link ${url}`);
    }
  }
  const css = readFileSync(join(out, "assets/site.css"), "utf8");
  for (const [, url] of css.matchAll(/url\(([^)]+)\)/g)) if (!existsSync(join(out, "assets", url.replace(/["']/g, "")))) fail(`site.css: missing ${url}`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const checking = args.includes("--check");
  const out = resolve(args.find(a => !a.startsWith("--")) ?? (checking ? mkdtempSync(join(tmpdir(), "making-of-")) : join(ROOT, "dist/making-of")));
  const got = build(out);
  if (checking) { check(out); rmSync(out, { recursive: true, force: true }); }
  // A plain build only warns (the game's build never fails for its making-of); --check (npm test) fails.
  if (problems.length) { console.error(`making-of: ${problems.length} problem(s)\n  ${problems.join("\n  ")}`); if (checking) process.exit(1); }
  console.log(`making-of: ${got.chapters} pages, ${got.builders} builder notes, ${got.media} pictures${checking ? " (checked)" : ` → ${relative(ROOT, out) || out}`}`);
}
