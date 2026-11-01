// Successful-result cache for PRs, releases and shared pushes. Unknown layouts still run full checks.
import ts from 'typescript';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { loadAnalyzer } from '../art-cache/load.mjs';

const DISPATCHER = 'tools/art-check/.task-dispatcher.ts';
export const sha = value => createHash('sha256').update(value).digest('hex');
export function fullCheck(event, branch = '', title = '') {
  return !['pull_request', 'push'].includes(event);
}

/** Reuse the production binding/initialization analyzer on the actual check's
 * registered task callbacks. Unknown layouts throw: callers run the full check. */
export function taskDispatcher(text) {
  const ast = ts.createSourceFile('art/check.mjs', text, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
  let fn;
  for (const s of ast.statements) if (ts.isVariableStatement(s)) for (const d of s.declarationList.declarations)
    if (d.name.getText(ast) === 'SPRITE_CHECKS') fn = d.initializer;
  if (!fn || !ts.isArrowFunction(fn) || !ts.isBlock(fn.body)) throw Error('Unknown sprite check layout');
  const tasks = [], helpers = [];
  for (const s of fn.body.statements) {
    if (ts.isExpressionStatement(s) && ts.isCallExpression(s.expression) && s.expression.expression.getText(ast) === 'task') {
      const [name, callback] = s.expression.arguments;
      if (!name || !ts.isStringLiteral(name) || !callback || !ts.isArrowFunction(callback)) throw Error('Unknown art check task');
      if (tasks.some(t => t.name === name.text)) throw Error('Duplicate art check task');
      tasks.push({ name: name.text, source: callback.getText(ast), start: callback.getStart(ast), end: callback.end, configs: configFetches(callback, ast) });
    } else if (ts.isVariableStatement(s) || ts.isFunctionDeclaration(s)) {
      if (configFetches(s, ast).length) throw Error('Shared check helper fetches config');
      helpers.push(s.getText(ast));
    }
    else if (!(ts.isForOfStatement(s) && s.expression.getText(ast) === 'tasks') && !ts.isReturnStatement(s)) throw Error('Unknown check task scaffolding');
  }
  let registered = 0;
  const count = n => { if (ts.isCallExpression(n) && n.expression.getText(ast) === 'task') registered++; ts.forEachChild(n, count); };
  count(fn.body);
  if (registered !== tasks.length) throw Error('Nested or conditional check registration');
  if (!tasks.length || !helpers[0]?.includes('const G = await import("/art/generator.js")')) throw Error('Unknown check preamble');
  // Same values as the full check (no --only filtering). These are never executed.
  helpers[0] = 'const st = G.defaultStyle(), res = [];';
  const preamble = helpers.join('\n').replace(/only \? G\.SPECIES\.filter\([^;]+? : G\.SPECIES/g, 'G.SPECIES')
    .replace(/only \? G\.AREAS\.filter\([^;]+? : G\.AREAS/g, 'G.AREAS');
  let source = `import * as G from '../../art/generator.js';\nconst only = null;\n${preamble}\nexport type ArtJob = ${tasks.map(t => `{kind:${JSON.stringify(t.name)}}`).join('|')};\nexport function runJob(job:ArtJob){\n${tasks.map(t => `if(job.kind===${JSON.stringify(t.name)})return (${t.source})();`).join('\n')}\n}`
    .replace(/import\((["'])\/(art|src)\//g, 'import($1../../$2/');
  // Callback-local dynamic imports are namespace escapes: bind their complete
  // runtime closure to that task, rather than relying on initializer-only edges.
  const generated = ts.createSourceFile(DISPATCHER, source, ts.ScriptTarget.Latest, true);
  if (generated.parseDiagnostics.length) throw Error('Unparseable check adapter');
  const imports = new Map(), edits = [];
  const dynamic = n => {
    if (ts.isCallExpression(n) && n.expression.kind === ts.SyntaxKind.ImportKeyword) {
      const spec = n.arguments[0];
      if (!spec || !ts.isStringLiteral(spec) || !/^\.\.\/\.\.\/(art|src)\//.test(spec.text)) throw Error('Unknown task dynamic import');
      if (!imports.has(spec.text)) imports.set(spec.text, `_checkImport${imports.size}`);
      edits.push({ start: n.getStart(generated), end: n.end, text: `Promise.resolve(${imports.get(spec.text)})` });
    }
    ts.forEachChild(n, dynamic);
  };
  dynamic(generated);
  for (const e of edits.sort((a, b) => b.start - a.start)) source = source.slice(0, e.start) + e.text + source.slice(e.end);
  source = [...imports].map(([spec, name]) => `import * as ${name} from ${JSON.stringify(spec)};`).join('\n') + '\n' + source;
  // Everything in check.mjs outside the task callbacks (runner, auxiliary checks, scaffolding): any edit there keys every task.
  let scaffold = text;
  for (const t of [...tasks].sort((a, b) => b.start - a.start)) scaffold = scaffold.slice(0, t.start) + '<task>' + scaffold.slice(t.end);
  return { source, names: tasks.map(t => t.name), configs: Object.fromEntries(tasks.map(t => [t.name, t.configs])),
    taskSources: Object.fromEntries(tasks.map(t => [t.name, t.source])), shared: sha(JSON.stringify({ preamble, scaffold })) };
}

/** Files a task fetches at run time (fetch("/config/x.json")) are invisible to the import
 * analyzer, so each binds only to the task that reads it. Any other fetch is unknown: full check. */
function configFetches(node, ast) {
  const out = new Set();
  const walk = n => {
    if (ts.isCallExpression(n) && n.expression.getText(ast) === 'fetch') {
      const spec = n.arguments[0];
      if (!spec || !ts.isStringLiteral(spec) || !/^\/config\/[\w.-]+\.json$/.test(spec.text)) throw Error('Unknown art check fetch');
      out.add(spec.text.slice(1));
    }
    ts.forEachChild(n, walk);
  };
  walk(node);
  return [...out].sort();
}

/** Include untracked additions too; generated images/results and dependencies are
 * excluded. Auxiliary/lab checks conservatively bind every source in these roots. */
export function checkFiles(root) {
  const files = [];
  const walk = dir => { if (!existsSync(join(root, dir))) return; for (const e of readdirSync(join(root, dir), { withFileTypes: true })) {
    const f = dir + '/' + e.name;
    if (e.name.startsWith('.') || ['art/out', 'tools/art-lab/dist'].includes(f)) continue;
    if (e.isDirectory()) walk(f); else files.push(f);
  } };
  for (const d of ['art', 'tools/art-lab', 'tools/art-check', 'tools/art-cache', 'tools/overrides']) walk(d);
  for (const f of ['package.json', 'package-lock.json', 'config/style.json', 'tools/artDependencies.ts', 'tools/artJobFingerprints.ts', 'tools/artHash.ts', '.github/workflows/art-check.yml']) if (existsSync(join(root, f))) files.push(f);
  return [...new Set(files)].sort();
}
/** package.json as the art check sees it: npm scripts never run in it (art/headless.mjs serves files over plain
 * http), so script-only edits keep every result. Dependencies, module type and the lockfile still key everything. */
export function artInputBytes(file, bytes) {
  if (file !== 'package.json') return bytes;
  try { const { scripts, ...rest } = JSON.parse(bytes.toString('utf8')); return Buffer.from(JSON.stringify(rest)); } catch { return bytes; }
}
export function snapshotHash(root, files, read = f => artInputBytes(f, readFileSync(join(root, f)))) {
  const h = createHash('sha256');
  for (const f of files) { const b = read(f); h.update(`${Buffer.byteLength(f)}:${f}${b.length}:`); h.update(b); }
  return h.digest('hex');
}

/** How a selected task is executed (execute() below and art-check.yml's run steps). The planner and workflow files are
 * not task inputs: they only choose what runs. Bump this when a change alters HOW a task runs (arguments, server,
 * browser launch), so every result is re-proven; selection-only planner edits keep every result. */
export const EXECUTION = 'art-check-execution-v1';
export const PLANNER = ['tools/art-check/affected.mjs', 'tools/art-check/scope.mjs', 'tools/art-check/checked-tree.mjs', 'tools/art-check/README.md', '.github/workflows/art-check.yml', 'tools/art-check/shards.mjs', 'tools/art-check/shards.test.mjs', 'tools/art-check/task-times.json'];

/** One-time bridge from results saved by the v1 planner (tools/art-check-legacy/affected-v1.mjs.txt, the exact bytes
 * it was keyed with). Its keys hashed the planner and workflow whole, so changing the planner alone would rerun every
 * task. A v1 result is reused only for a task whose v1 key, recomputed over this tree with those planner bytes, is
 * exactly the saved one: identical check, art and environment. Remove once v2 results cover the shared cache. */
export const LEGACY_PLANNER = 'tools/art-check-legacy/affected-v1.mjs.txt';
function legacyKeys(api, root, disk, dispatcher, environment) {
  if (!existsSync(join(root, LEGACY_PLANNER))) return {};
  const planner = readFileSync(join(root, LEGACY_PLANNER)), own = f => f === 'tools/art-check/affected.mjs' ? planner : readFileSync(join(root, f));
  const tree = { exists: f => f === DISPATCHER || disk.exists(f), read: f => f === DISPATCHER ? Buffer.from(dispatcher.source) : f === 'tools/art-check/affected.mjs' ? planner : disk.read(f) };
  const producers = ['art/check.mjs', 'art/headless.mjs', 'art/headless-blank.html', 'tools/art-check/affected.mjs', 'tools/artDependencies.ts', 'tools/artJobFingerprints.ts', 'tools/art-cache/load.mjs', 'package.json', 'package-lock.json', 'config/style.json', '.github/workflows/art-check.yml', 'config/tuning.json'];
  const map = api.artJobFingerprints(tree, { buildInputs: producers }, DISPATCHER);
  const salt = JSON.stringify({ schema: 'art-check-results-v1', environment });
  const keys = Object.fromEntries(dispatcher.names.map(id => [id, sha(salt + id + map.fingerprints[id])]));
  const files = [...new Set([...checkFiles(root), ...map.scopeSources.filter(f => f !== DISPATCHER)])].sort();
  keys['auxiliary-and-labs'] = sha(salt + snapshotHash(root, files, own));
  return keys;
}
export function resultHit(dir, id, key) {
  try { const r = JSON.parse(readFileSync(join(dir, `${key}.json`), 'utf8')); return r.schema === 1 && r.id === id && r.key === key && r.passed === true; } catch { return false; }
}
export function saveSuccess(dir, id, key) {
  mkdirSync(dir, { recursive: true }); writeFileSync(join(dir, `${key}.json`), JSON.stringify({ schema: 1, id, key, passed: true }) + '\n');
}
export async function plan(root, cacheDir, environment) {
  const { api, close } = await loadAnalyzer(root);
  try {
    const text = readFileSync(join(root, 'art/check.mjs'), 'utf8'), dispatcher = taskDispatcher(text), disk = api.diskTree(root);
    const tree = { exists: f => f === DISPATCHER || disk.exists(f), read: f => f === DISPATCHER ? Buffer.from(dispatcher.source) : disk.read(f) };
    const producers = ['art/check.mjs', 'art/headless.mjs', 'art/headless-blank.html', 'tools/artDependencies.ts', 'tools/artJobFingerprints.ts', 'tools/art-cache/load.mjs', 'package.json', 'package-lock.json', 'config/style.json'];
    const map = api.artJobFingerprints(tree, { buildInputs: producers }, DISPATCHER);
    const auxFiles = [...new Set([...checkFiles(root), ...map.scopeSources.filter(f => f !== DISPATCHER)])].sort();
    // Fetched config files (e.g. tuning.json for the sleeping-size regression) key only the tasks that read them.
    const configs = [...new Set(Object.values(dispatcher.configs).flat())].filter(f => !auxFiles.includes(f));
    for (const f of configs) if (!existsSync(join(root, f))) throw Error(`Fetched art input missing: ${f}`);
    const files = [...auxFiles, ...configs].sort();
    const snapshot = snapshotHash(root, files), salt = JSON.stringify({ schema: 'art-check-results-v2', execution: EXECUTION, environment });
    // A task's key: its own callback text, the shared helpers and check scaffolding, the analyzer's module-initialization
    // parts, and every file its drawing reaches. The generated dispatcher and art/check.mjs are hashed by those parts
    // instead of whole, so editing one task's callback reruns that task alone.
    const initialization = sha(JSON.stringify(Object.entries(map.initializationParts).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0)));
    const tasks = dispatcher.names.map(id => {
      const fetched = dispatcher.configs[id], drawn = map.drawInputs[id].filter(f => f !== DISPATCHER && f !== 'art/check.mjs');
      const key = sha(salt + JSON.stringify({ id, task: dispatcher.taskSources[id], shared: dispatcher.shared, initialization, drawn, files: snapshotHash(root, drawn), fetched: fetched.length ? snapshotHash(root, fetched) : '' }));
      return { id, key, inputs: [...new Set([...map.dependencies.jobs[id].filter(f => f !== DISPATCHER), ...fetched])].sort() };
    });
    // The non-task checks and lab pages have broad, independent coverage. They
    // stay one conservative unit rather than pretending task selection covers them.
    const auxInputs = auxFiles.filter(f => !PLANNER.includes(f) && !f.startsWith('tools/art-check-legacy/'));
    tasks.push({ id: 'auxiliary-and-labs', key: sha(salt + snapshotHash(root, auxInputs)), inputs: auxInputs });
    const legacy = legacyKeys(api, root, disk, dispatcher, environment);
    for (const t of tasks) {
      t.cached = resultHit(cacheDir, t.id, t.key);
      if (!t.cached && legacy[t.id] && resultHit(cacheDir, t.id, legacy[t.id])) { saveSuccess(cacheDir, t.id, t.key); t.cached = true; t.bridged = legacy[t.id]; }
    }
    return { schema: 1, environment, snapshot, files, tasks, fileToTasks: Object.fromEntries(files.map(f => [f, tasks.filter(t => t.inputs.includes(f)).map(t => t.id)])) };
  } finally { close(); }
}
/** @param {(args: string[]) => {status: number | null, error?: Error}} run */
export function execute(plan, root, cacheDir, run = args => spawnSync(process.execPath, ['art/check.mjs', ...args], { cwd: root, stdio: 'inherit' })) {
  if (snapshotHash(root, plan.files) !== plan.snapshot || JSON.stringify(checkFiles(root).filter(f => !plan.files.includes(f))) !== '[]') throw Error('Art inputs changed since plan');
  const pending = plan.tasks.filter(t => !resultHit(cacheDir, t.id, t.key));
  for (const t of plan.tasks.filter(t => !pending.includes(t))) console.log(`cached art check: ${t.id}`);
  const groups = [pending.filter(t => t.id !== 'auxiliary-and-labs'), pending.filter(t => t.id === 'auxiliary-and-labs')].filter(g => g.length);
  for (const group of groups) {
    const ids = group.map(t => t.id).join(',');
    const args = ids === 'auxiliary-and-labs' ? ['--aux-only', '--times'] : ['--tasks', ids, '--sprite-only', '--no-lab', '--times'];
    console.log(`checking art: ${ids}`);
    const r = run(args);
    if (r.error || r.status !== 0) throw Error(`Art check failed: ${ids} (${r.error ?? r.status})`);
    for (const t of group) saveSuccess(cacheDir, t.id, t.key);
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2), root = process.cwd(), path = args[1] ?? 'out/art-check-plan.json', cache = process.env.ART_CHECK_CACHE ?? '.art-check-results';
  const environment = { node: process.version, platform: process.platform, arch: process.arch, browser: process.env.PLAYWRIGHT_VERSION ?? 'unversioned' };
  if (args[0] === '--plan') {
    let p;
    try { p = await plan(root, cache, environment); } catch (error) { p = { schema: 1, full: true, reason: String(error) }; }
    mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, JSON.stringify(p, null, 2) + '\n');
    console.log(p.full ? `full: ${p.reason}` : p.tasks.every(t => t.cached) ? 'skip' : 'affected');
  } else if (args[0] === '--run') {
    const p = JSON.parse(readFileSync(path, 'utf8'));
    if (p.full) { const r = spawnSync(process.execPath, ['art/check.mjs', '--times'], { stdio: 'inherit' }); if (r.status !== 0) process.exit(r.status ?? 1); }
    else { if (JSON.stringify(p.environment) !== JSON.stringify(environment)) throw Error('Art check environment changed'); execute(p, root, cache); }
  } else throw Error('Use --plan <json> or --run <json>');
}
