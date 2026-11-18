// Test honesty (Ed's go, 2026-11-18: "do it", on borrowing three ideas from interfere-inc/landmines; docs/notes/guardrails.md):
// three things in a test file that hide a flaky or slow test may go down but not up, counted per file and compared with the
// change's merge base (no allowance file to clash on; the base is the allowance, and it tightens itself as counts fall):
//   raised   a time limit above the default (60 s: vite.config.ts testTimeout/hookTimeout) on a test, hook or suite, as its last
//            argument or `{ timeout }`; a `retry` option; a vi.setConfig that raises a time limit or sets retry;
//   mocks    vi.mock( and vi.doMock( (a module replaced; vi.fn spies and vi.stubGlobal are not counted);
//   sleeps   a fixed real-time wait: `new Promise(r => setTimeout(r, ms))`, timers/promises' setTimeout, scheduler.wait.
// It also fails, whatever the base, if the global limits are raised or retries turned on (vite.config.ts, the test scripts).
// A rare, reviewed exception: a commit trailer `Tests-ok: <test file> <why>`. --list prints today's counts.
//   node tools/checks/testHonesty.mjs [--base <ref>] [--list]
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { ROOT, baseOf, filesAt, filesNow, renamesSince, trailers } from "./git-base.mjs";

export const DEFAULT_MS = 60_000;
export const KINDS = ["raised", "mocks", "sleeps"];
export const isTest = p => /\.test\.(ts|tsx|mts|cts|js|mjs|cjs)$/.test(p) && !p.split("/").includes("node_modules");
/** Where a global limit or retry could be set: the Vitest config, and the scripts and runner that start the tests. */
export const GLOBAL_FILES = ["vite.config.ts", "vitest.config.ts", "vitest.workspace.ts", "package.json", "server/package.json", "tools/ci/run-unit.mjs"];

const RUNNERS = new Set(["it", "test", "describe", "suite", "bench", "beforeAll", "beforeEach", "afterAll", "afterEach", "before", "after"]);
const LIMIT_KEYS = new Set(["testTimeout", "hookTimeout", "teardownTimeout"]);
const MOCKERS = new Set(["vi", "vitest", "jest"]);

const parse = (text, file) => ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, /\.tsx$/.test(file) ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
const unwrap = e => { while (e && (ts.isParenthesizedExpression(e) || ts.isAsExpression(e) || ts.isSatisfiesExpression(e) || ts.isNonNullExpression(e))) e = e.expression; return e; };
const isFn = e => !!e && (ts.isArrowFunction(e) || ts.isFunctionExpression(e));
const keyOf = p => (p.name && (ts.isIdentifier(p.name) || ts.isStringLiteral(p.name)) ? p.name.text : null);
/** The identifier a callee starts from: `it` for it(...), it.each(rows)(...), it.skip(...). */
const rootOf = e => { for (;;) { e = unwrap(e); if (ts.isCallExpression(e) || ts.isPropertyAccessExpression(e)) e = e.expression; else if (ts.isTaggedTemplateExpression(e)) e = e.tag; else return ts.isIdentifier(e) ? e.text : null; } };
const isMember = (e, object, property) => ts.isPropertyAccessExpression(e) && ts.isIdentifier(e.expression) && object.has(e.expression.text) && property.has(e.name.text);

/** A number from an expression (literals, + - * /, the file's top-level consts), or null when it can't be read. */
function numberOf(e, consts, depth = 0) {
  e = unwrap(e);
  if (!e || depth > 8) return null;
  if (ts.isNumericLiteral(e)) return Number(e.text);
  if (ts.isPrefixUnaryExpression(e) && e.operator === ts.SyntaxKind.MinusToken) { const v = numberOf(e.operand, consts, depth + 1); return v == null ? null : -v; }
  if (ts.isIdentifier(e)) return e.text === "Infinity" ? Infinity : consts.has(e.text) ? numberOf(consts.get(e.text), consts, depth + 1) : null;
  if (ts.isBinaryExpression(e)) {
    const a = numberOf(e.left, consts, depth + 1), b = numberOf(e.right, consts, depth + 1);
    if (a == null || b == null) return null;
    switch (e.operatorToken.kind) {
      case ts.SyntaxKind.PlusToken: return a + b;
      case ts.SyntaxKind.MinusToken: return a - b;
      case ts.SyntaxKind.AsteriskToken: return a * b;
      case ts.SyntaxKind.SlashToken: return a / b;
      default: return null;
    }
  }
  return null;
}
/** A limit counts as raised when it is over the default, or 0 (no limit at all), or can't be read (so can't be shown to be under). */
const raisedLimit = (e, consts) => { const v = numberOf(e, consts); return v == null || v > DEFAULT_MS || v === 0; };
const retries = (e, consts) => numberOf(e, consts) !== 0;

/** `new Promise(r => setTimeout(r, ms))`, or one whose timer's callback only calls r. */
function sleepPromise(node) {
  if (!ts.isNewExpression(node) || !ts.isIdentifier(node.expression) || node.expression.text !== "Promise") return false;
  const exec = unwrap(node.arguments?.[0]);
  if (!isFn(exec) || !exec.parameters[0] || !ts.isIdentifier(exec.parameters[0].name)) return false;
  const resolve = exec.parameters[0].name.text;
  let call = exec.body;
  if (ts.isBlock(call)) call = call.statements.length === 1 && ts.isExpressionStatement(call.statements[0]) ? call.statements[0].expression : null;
  call = unwrap(call);
  if (!call || !ts.isCallExpression(call)) return false;
  const callee = unwrap(call.expression);
  const timer = (ts.isIdentifier(callee) && callee.text === "setTimeout") || isMember(callee, new Set(["globalThis", "window", "self"]), new Set(["setTimeout"]));
  if (!timer) return false;
  const handler = unwrap(call.arguments[0]);
  if (!handler) return false;
  if (ts.isIdentifier(handler)) return handler.text === resolve;
  if (!isFn(handler)) return false;
  let body = handler.body;
  if (ts.isBlock(body)) body = body.statements.length === 1 && ts.isExpressionStatement(body.statements[0]) ? body.statements[0].expression : null;
  body = unwrap(body);
  return !!body && ts.isCallExpression(body) && ts.isIdentifier(body.expression) && body.expression.text === resolve && body.arguments.length === 0;
}

/** One test file's counts: { raised, mocks, sleeps, at: { kind: [line, ...] } }. */
export function countsOf(text, file = "x.test.ts") {
  const sf = parse(text, file), at = { raised: [], mocks: [], sleeps: [] };
  const mark = (kind, node) => at[kind].push(sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1);
  const consts = new Map(), waits = new Set();
  for (const st of sf.statements) {
    if (ts.isVariableStatement(st)) for (const d of st.declarationList.declarations) if (ts.isIdentifier(d.name) && d.initializer) consts.set(d.name.text, d.initializer);
    // (the promise form of setTimeout, under whatever name it is imported)
    if (ts.isImportDeclaration(st) && ts.isStringLiteral(st.moduleSpecifier) && /^(node:)?timers\/promises$/.test(st.moduleSpecifier.text) && st.importClause?.namedBindings && ts.isNamedImports(st.importClause.namedBindings)) {
      for (const el of st.importClause.namedBindings.elements) if ((el.propertyName ?? el.name).text === "setTimeout") waits.add(el.name.text);
    }
  }
  const options = (obj, limits) => {
    for (const p of obj.properties) {
      if (!ts.isPropertyAssignment(p) && !ts.isShorthandPropertyAssignment(p)) continue;
      const key = keyOf(p), value = ts.isPropertyAssignment(p) ? p.initializer : p.name;
      if (limits.has(key) && raisedLimit(value, consts)) mark("raised", p);
      else if (key === "retry" && retries(value, consts)) mark("raised", p);
    }
  };
  const visit = node => {
    if (ts.isCallExpression(node)) {
      const callee = unwrap(node.expression), root = rootOf(callee);
      if (isMember(callee, MOCKERS, new Set(["mock", "doMock"]))) mark("mocks", node);
      else if (isMember(callee, MOCKERS, new Set(["setConfig"]))) { const o = unwrap(node.arguments[0]); if (o && ts.isObjectLiteralExpression(o)) options(o, LIMIT_KEYS); }
      else if (root && RUNNERS.has(root) && node.arguments.some(isFn)) {
        // (a test, hook or suite: its body among the arguments; an it.each(rows) call has none, and isn't one)
        node.arguments.forEach((raw, i) => {
          const a = unwrap(raw);
          if (ts.isObjectLiteralExpression(a)) options(a, new Set(["timeout"]));
          else if (i > 0 && i === node.arguments.length - 1 && !isFn(a) && !ts.isStringLiteralLike(a) && !ts.isTemplateExpression(a) && raisedLimit(a, consts)) mark("raised", a);
        });
      } else if ((ts.isIdentifier(callee) && waits.has(callee.text)) || isMember(callee, new Set(["scheduler"]), new Set(["wait"]))) mark("sleeps", node);
    } else if (sleepPromise(node)) mark("sleeps", node);
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return { raised: at.raised.length, mocks: at.mocks.length, sleeps: at.sleeps.length, at };
}

/** Counts that went up from base to head: [{ file, kind, was, now, lines, excused }]. Renamed files keep their counts. */
export function risen(baseFiles, headFiles, renames = new Map(), excused = []) {
  const back = new Map([...renames].map(([from, to]) => [to, from])), out = [];
  for (const [file, text] of Object.entries(headFiles)) {
    const now = countsOf(text, file), old = baseFiles[back.get(file) ?? file], was = old == null ? null : countsOf(old, file);
    for (const kind of KINDS) if (now[kind] > (was?.[kind] ?? 0)) out.push({ file, kind, was: was?.[kind] ?? 0, now: now[kind], lines: now.at[kind], excused: excused.includes(file) });
  }
  return out;
}

/** Global limits raised or retries turned on, in the config and the scripts that start the tests: [{ file, line, what }]. */
export function globalRaises(files) {
  const out = [];
  for (const [file, text] of Object.entries(files)) {
    if (/\.(json|mjs|cjs|js)$/.test(file)) {
      // (a flag on a command line: vitest's --retry/--testTimeout, node --test's --test-timeout)
      text.split("\n").forEach((line, i) => { const m = /--(retry|testTimeout|hookTimeout|teardownTimeout|test-timeout|hook-timeout)\b/.exec(line); if (m) out.push({ file, line: i + 1, what: `the flag ${m[0]}` }); });
      continue;
    }
    const sf = parse(text, file), consts = new Map();
    for (const st of sf.statements) if (ts.isVariableStatement(st)) for (const d of st.declarationList.declarations) if (ts.isIdentifier(d.name) && d.initializer) consts.set(d.name.text, d.initializer);
    const visit = node => {
      if (ts.isPropertyAssignment(node) || ts.isShorthandPropertyAssignment(node)) {
        const key = keyOf(node), value = ts.isPropertyAssignment(node) ? node.initializer : node.name, line = sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1;
        if (LIMIT_KEYS.has(key) && raisedLimit(value, consts)) out.push({ file, line, what: `${key} is ${numberOf(value, consts) ?? "not a plain number"} (the limit is ${DEFAULT_MS} ms)` });
        else if (key === "retry" && retries(value, consts)) out.push({ file, line, what: "retry is on (a retried test hides its flake)" });
      }
      ts.forEachChild(node, visit);
    };
    visit(sf);
  }
  return out;
}

const FIX = {
  raised: "make the test faster or smaller (a prepared game from src/test/, fewer steps, one case a test) so it fits the 60 s default; never add retry: find why it fails sometimes.",
  mocks: "run the real module; hand the code a stand-in through its own arguments or options (as the stores and Views here take theirs); or split the pure part out and test that.",
  sleeps: "await the operation itself, or a promise or event it gives; `await vi.waitFor(() => expect(...))` for something that lands soon; vi.useFakeTimers() and vi.advanceTimersByTimeAsync(ms) when the code under test runs on a timer.",
};
const NAMES = { raised: "raised time limits or retries", mocks: "module mocks (vi.mock, vi.doMock)", sleeps: "fixed sleeps" };

if (process.argv[1] && path.resolve(process.argv[1]) === new URL(import.meta.url).pathname) {
  const argv = process.argv.slice(2);
  const head = await filesNow(["."], isTest);
  if (argv.includes("--list")) {
    const rows = Object.entries(head).map(([file, text]) => ({ file, ...countsOf(text, file) })).filter(r => r.raised + r.mocks + r.sleeps > 0);
    for (const kind of KINDS) {
      const of = rows.filter(r => r[kind]).sort((a, b) => b[kind] - a[kind] || a.file.localeCompare(b.file));
      console.log(`${NAMES[kind]}: ${of.reduce((n, r) => n + r[kind], 0)} in ${of.length} files`);
      for (const r of of) console.log(`${String(r[kind]).padStart(5)}  ${r.file}`);
    }
    process.exit(0);
  }
  const globals = globalRaises(Object.fromEntries(GLOBAL_FILES.filter(f => fs.existsSync(path.join(ROOT, f))).map(f => [f, fs.readFileSync(path.join(ROOT, f), "utf8")])));
  const base = baseOf(argv);
  const excused = trailers(base.sha, "Tests-ok").map(v => v.split(/\s+/)[0]);
  const found = risen(filesAt(base.sha, ["."], isTest), head, renamesSince(base.sha), excused);
  for (const o of found.filter(o => o.excused)) console.log(`tests: excused by a Tests-ok trailer: ${o.file} ${NAMES[o.kind]} ${o.was} -> ${o.now}`);
  const bad = found.filter(o => !o.excused);
  if (!bad.length && !globals.length) {
    console.log(`tests: no test file has more raised time limits or retries, module mocks or fixed sleeps than at ${base.ref}; the global limits are ${DEFAULT_MS} ms, no retries.`);
    process.exit(0);
  }
  if (globals.length) {
    console.error(`tests: the global test limits may not be raised, nor retries turned on:\n`);
    for (const g of globals) console.error(`  ${g.file}:${g.line}: ${g.what}`);
    console.error(`\nFix: leave testTimeout and hookTimeout at ${DEFAULT_MS} ms and retries off; make the slow or flaky test honest instead.\n`);
  }
  if (bad.length) {
    console.error(`tests: ${bad.length} count${bad.length === 1 ? "" : "s"} went up since ${base.ref} (merge base ${base.sha.slice(0, 9)}); each may fall but not rise:\n`);
    for (const o of bad) console.error(`  ${o.file}: ${NAMES[o.kind]} ${o.was} -> ${o.now}${o.was ? "" : " (none before)"}  (now at line${o.lines.length === 1 ? "" : "s"} ${o.lines.join(", ")})`);
    console.error("");
    for (const kind of KINDS) if (bad.some(o => o.kind === kind)) console.error(`Fix, ${NAMES[kind]}: ${FIX[kind]}`);
    console.error(`A rare, reviewed exception (say, a test that measures real time): a commit trailer \`Tests-ok: <test file> <why>\`. (docs/notes/guardrails.md)`);
  }
  process.exit(1);
}
