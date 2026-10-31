// Rehearse A4 by named syntax boundaries; --apply writes once, --check verifies hashes and reversible body edits.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import ts from 'typescript';

const argv = process.argv.slice(2);
const apply = argv.includes('--apply'), check = argv.includes('--check'), replay = argv.includes('--replay');
if ([apply, check, replay].filter(Boolean).length !== 1) throw new Error('Choose exactly one of --apply, --replay or --check');
const manifestPath = 'docs/plans/a4-dry-run-manifest.json';
const hash = s => crypto.createHash('sha256').update(s).digest('hex');
const read = f => fs.readFileSync(f, 'utf8').replaceAll('\r\n', '\n');
const started = performance.now();

if (check) {
  const manifest = JSON.parse(read(manifestPath));
  const sourceTexts = new Map();
  for (const [f, digest] of Object.entries(manifest.outputs)) {
    if (hash(read(f)) !== digest) throw new Error(`Generated output changed: ${f}`);
  }
  for (const file of manifest.sources) {
    const source = execFileSync('git', ['show', `${manifest.sourceCommit}:${file.file}`], { encoding: 'utf8', maxBuffer: 8 << 20 });
    if (hash(source) !== file.sha256) throw new Error(`Source identity differs: ${file.file}`);
    sourceTexts.set(file.file, source);
  }
  for (const cut of manifest.cuts) {
    if (hash(sourceTexts.get(cut.source).slice(cut.sourceStart, cut.sourceEnd)) !== cut.originalSha256) throw new Error(`Source boundary differs: ${cut.name}`);
    const body = read(cut.output).slice(cut.outputBodyStart, cut.outputBodyEnd);
    if (hash(body) !== cut.generatedSha256) throw new Error(`Moved body changed: ${cut.name}`);
    let reversed = body;
    for (const e of [...cut.edits].sort((a, b) => b.generatedStart - a.generatedStart)) {
      if (reversed.slice(e.generatedStart, e.generatedStart + e.after.length) !== e.after) throw new Error(`Adapter differs: ${cut.name}`);
      reversed = reversed.slice(0, e.generatedStart) + e.before + reversed.slice(e.generatedStart + e.after.length);
    }
    if (hash(reversed) !== cut.originalSha256) throw new Error(`Non-mechanical body change: ${cut.name}`);
  }
  console.log(`PASS: ${manifest.cuts.length} moved bodies reverse exactly; ${Object.keys(manifest.outputs).length} generated files match; ${(performance.now() - started).toFixed(1)} ms`);
  process.exit(0);
}

const previous = replay ? JSON.parse(read(manifestPath)) : null;
if (previous) for (const [f, digest] of Object.entries(previous.outputs)) {
  if (hash(read(f)) !== digest) throw new Error(`Refusing to overwrite edits: ${f}`);
}
if (!replay && fs.existsSync(manifestPath)) throw new Error('Already applied; use --check (never overwrite a rehearsal)');
const manifest = { schema: 1, sourceCommit: previous?.sourceCommit ?? execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(),
  status: 'mechanical rehearsal; typecheck/unit/bench proof pending canonical slot', sources: [], cuts: [], outputs: {} };
const outputs = new Map();
const importedSymbols = ast => {
  const map = new Map();
  for (const stmt of ast.statements) if (ts.isImportDeclaration(stmt) && stmt.importClause) {
    const c = stmt.importClause;
    if (c.name) map.set(c.name.text, { stmt, node: c.name });
    if (c.namedBindings) {
      if (ts.isNamespaceImport(c.namedBindings)) map.set(c.namedBindings.name.text, { stmt, node: c.namedBindings });
      else for (const n of c.namedBindings.elements) map.set(n.name.text, { stmt, node: n });
    }
  }
  return map;
};

// A syntax-only, no-lib/no-resolution program supplies lexical symbols so shadowed
// locals and property names cannot be accidentally rewritten. No game diagnostics,
// type inference, library graph, tests, bundler, worker or browser is run here.
function parsed(file) {
  const source = previous ? execFileSync('git', ['show', `${previous.sourceCommit}:${file}`], { encoding: 'utf8', maxBuffer: 8 << 20 }) : read(file);
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
  if (ast.parseDiagnostics.length) throw new Error(`Parse failure: ${file}`);
  const opts = { noLib: true, noResolve: true, target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext };
  const host = ts.createCompilerHost(opts);
  host.getSourceFile = f => f === file ? ast : undefined;
  const program = ts.createProgram([file], opts, host), checker = program.getTypeChecker();
  const top = new Map();
  for (const n of ast.statements) {
    if (ts.isImportDeclaration(n)) continue;
    const add = name => { if (ts.isIdentifier(name)) top.set(checker.getSymbolAtLocation(name), name.text); };
    if (ts.isVariableStatement(n)) {
      for (const d of n.declarationList.declarations) {
        if (ts.isObjectBindingPattern(d.name) || ts.isArrayBindingPattern(d.name)) {
          for (const e of d.name.elements) if (ts.isBindingElement(e)) add(e.name);
        } else add(d.name);
      }
    } else if (n.name) add(n.name);
  }
  top.delete(undefined);
  manifest.sources.push({ file, sha256: hash(source), bytes: Buffer.byteLength(source), lines: source.split('\n').length });
  return { file, source, ast, checker, top, imports: importedSymbols(ast) };
}

function editText(source, edits) {
  let result = source;
  let end = Infinity;
  for (const e of [...edits].sort((a, b) => b.start - a.start)) {
    if (e.end > end) throw new Error('Overlapping edits');
    result = result.slice(0, e.start) + e.after + result.slice(e.end);
    end = e.start;
  }
  return result;
}

function rewrite(ctx, node, resolver) {
  const start = node.getStart(ctx.ast), text = ctx.source.slice(start, node.end), edits = [];
  function visit(n) {
    const replacement = resolver(n);
    if (replacement !== undefined) {
      const before = ctx.source.slice(n.getStart(ctx.ast), n.end);
      if (replacement !== before) edits.push({ start: n.getStart(ctx.ast) - start, end: n.end - start, before, after: replacement });
      return;
    }
    ts.forEachChild(n, visit);
  }
  visit(node);
  let offset = 0;
  for (const e of edits.sort((a, b) => a.start - b.start)) {
    e.generatedStart = e.start + offset;
    offset += e.after.length - e.before.length;
  }
  return { text: editText(text, edits), edits, originalSha256: hash(text), sourceStart: start, sourceEnd: node.end };
}

function relocatedLiteral(ctx, n, destination) {
  if (!ts.isStringLiteral(n) || !n.text.startsWith('.')) return;
  if (!((ts.isCallExpression(n.parent) && n.parent.expression.kind === ts.SyntaxKind.ImportKeyword) ||
    (ts.isLiteralTypeNode(n.parent) && ts.isImportTypeNode(n.parent.parent)))) return;
  let relative = path.posix.relative(path.posix.dirname(destination), path.posix.normalize(path.posix.join(path.posix.dirname(ctx.file), n.text)));
  if (!relative.startsWith('.')) relative = './' + relative;
  return JSON.stringify(relative);
}

function pruneUnusedImports(file, source) {
  const a = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
  const opts = { noLib: true, noResolve: true, target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext };
  const host = ts.createCompilerHost(opts); host.getSourceFile = f => f === file ? a : undefined;
  const checker = ts.createProgram([file], opts, host).getTypeChecker(), refs = new Set(), edits = [];
  const visit = n => {
    if (ts.isImportDeclaration(n)) return;
    if (ts.isShorthandPropertyAssignment(n)) refs.add(checker.getShorthandAssignmentValueSymbol(n));
    if (ts.isIdentifier(n)) refs.add(checker.getSymbolAtLocation(n));
    ts.forEachChild(n, visit);
  };
  visit(a);
  for (const stmt of a.statements) if (ts.isImportDeclaration(stmt) && stmt.importClause) {
    const c = stmt.importClause, parts = [], b = c.namedBindings;
    if (c.name && refs.has(checker.getSymbolAtLocation(c.name))) parts.push(c.name.text);
    if (b && ts.isNamespaceImport(b) && refs.has(checker.getSymbolAtLocation(b.name))) parts.push(b.getText(a));
    if (b && ts.isNamedImports(b)) {
      const needed = b.elements.filter(n => refs.has(checker.getSymbolAtLocation(n.name)));
      if (needed.length) parts.push(`{ ${needed.map(n => n.getText(a)).join(', ')} }`);
    }
    edits.push({ start: stmt.getStart(a), end: stmt.end, after: parts.length
      ? `import ${c.isTypeOnly ? 'type ' : ''}${parts.join(', ')} from ${stmt.moduleSpecifier.getText(a)};` : '' });
  }
  return editText(source, edits);
}

function importsFor(ctx, text, destination) {
  const ast = ts.createSourceFile('generated.ts', text, ts.ScriptTarget.Latest, true), names = new Set();
  const scan = n => { if (ts.isIdentifier(n)) names.add(n.text); ts.forEachChild(n, scan); };
  scan(ast);
  const lines = [];
  for (const stmt of ctx.ast.statements) if (ts.isImportDeclaration(stmt) && stmt.importClause) {
    const clause = stmt.importClause, parts = [], bindings = clause.namedBindings;
    if (clause.name && names.has(clause.name.text)) parts.push(clause.name.text);
    if (bindings && ts.isNamespaceImport(bindings) && names.has(bindings.name.text)) parts.push(bindings.getText(ctx.ast));
    if (bindings && ts.isNamedImports(bindings)) {
      const needed = bindings.elements.filter(n => names.has(n.name.text));
      if (needed.length) parts.push(`{ ${needed.map(n => n.getText(ctx.ast)).join(', ')} }`);
    }
    if (!parts.length) continue;
    let spec = stmt.moduleSpecifier.text;
    if (spec.startsWith('.')) {
      spec = path.posix.relative(path.posix.dirname(destination), path.posix.normalize(path.posix.join(path.posix.dirname(ctx.file), spec)));
      if (!spec.startsWith('.')) spec = './' + spec;
    }
    lines.push(`import ${clause.isTypeOnly ? 'type ' : ''}${parts.join(', ')} from ${JSON.stringify(spec)};`);
  }
  return lines.join('\n');
}

function recordCut(ctx, name, output, changed, prefixLength) {
  manifest.cuts.push({ source: ctx.file, name, output, originalSha256: changed.originalSha256,
    sourceStart: changed.sourceStart, sourceEnd: changed.sourceEnd,
    generatedSha256: hash(changed.text), outputBodyStart: prefixLength,
    outputBodyEnd: prefixLength + changed.text.length, edits: changed.edits });
}

function saveModule(ctx, destination, header, chunks) {
  const body = chunks.map(c => c.prefix + c.changed.text + c.suffix).join('\n\n') + '\n';
  const imports = importsFor(ctx, body, destination);
  const prefix = `// A4 mechanical extraction from ${ctx.file}; body identity is checked by tools/refactor/a4-split.mjs.\n${header}\n${imports}\n\n`;
  const generated = pruneUnusedImports(destination, prefix + body);
  let offset = generated.indexOf(body);
  if (offset < 0) throw new Error(`Import pruning touched moved bodies: ${destination}`);
  for (const c of chunks) {
    recordCut(ctx, c.name, destination, c.changed, offset + c.prefix.length);
    offset += c.prefix.length + c.changed.text.length + c.suffix.length + 2;
  }
  outputs.set(destination, generated);
}

const mainGroups = {
  pagePause: ['openPotionLab', 'pauseControls', 'updatePauseMenus'],
  pageStations: ['shutStation'],
  pageNight: ['revealArt', 'bedFirst', 'bedFirstNow', 'arrived', 'arrivedNow', 'wakeArrival', 'wakeArrivalNow', 'start', 'startDirect', 'dressCreator', 'chartOverNight', 'chartWorldArg', 'sailFromChart', 'recordSail', 'departFromChart', 'wakeFirst', 'wakeFirstNow', 'sailInPlace', 'makeSailNight', 'warmAt', 'newNight', 'nightInPlace', 'leaveBot'],
  pageFinds: ['lendFind', 'settleLoan', 'settleLoanNow', 'startDream', 'herHead', 'stepGuide'],
  pageDebug: ['botGame', 'saveComment', 'restoreComment', 'spawnHere', 'spawnHereNow'],
  pageFrame: ['drawFrame', 'frame', 'frameBody', 'overlayHead'],
};
const viewGroups = {
  frame: ['render'],
  houseFrame: ['houseTilt', 'behindHouse', 'occluders', 'ensureCrown', 'buildHome', 'swapHomeArt'],
  markers: ['legendRings', 'pin', 'inviteStart'],
  atmosphere: ['updateMoon', 'updateSteam', 'updateSmoke'],
  readiness: ['readyPrograms', 'landingWakeReady', 'beginLandingShaders', 'armLimitedLanding', 'limitedLandingReady', 'waitForLandingWitch', 'startLandingShaderGrace', 'compileAll', 'gpuCaughtUp', 'warmDraws', 'warmSteps', 'setReadiness'],
  lifecycle: ['build', 'prepare', 'treeExtent', 'askIsland', 'setGameSteps', 'retype'],
  viewport: ['scenePixelSize', 'resize', 'screenOf', 'aimAt'],
};

function splitMain() {
  const ctx = parsed('src/main.ts'), edits = [], used = new Set(), moduleImports = [];
  const chunksByGroup = new Map();
  // Every top-level runtime declaration is reachable through a live getter.
  // Do not expose types or the compiler-injected build declaration.
  const runtime = new Map();
  for (const [symbol, name] of ctx.top) if (name !== '__BUILD__' && symbol.flags & ts.SymbolFlags.Value) runtime.set(symbol, name);
  const writable = new Set();
  for (const stmt of ctx.ast.statements) if (ts.isVariableStatement(stmt) && !(stmt.declarationList.flags & ts.NodeFlags.Const)) {
    for (const d of stmt.declarationList.declarations) if (ts.isIdentifier(d.name)) writable.add(d.name.text);
  }
  const resolve = n => {
    if (ts.isShorthandPropertyAssignment(n)) {
      const name = runtime.get(ctx.checker.getShorthandAssignmentValueSymbol(n));
      if (name) { used.add(name); return `${n.name.text}: pageHost.${name}`; }
    }
    if (ts.isIdentifier(n)) {
      const name = runtime.get(ctx.checker.getSymbolAtLocation(n));
      if (!name) return;
      // Declaration identifiers and member/property names are not references.
      if ((ts.isPropertyAccessExpression(n.parent) && n.parent.name === n) ||
          ((ts.isPropertyAssignment(n.parent) || ts.isBindingElement(n.parent)) && n.parent.name === n)) return;
      used.add(name); return `pageHost.${name}`;
    }
  };
  for (const [group, names] of Object.entries(mainGroups)) {
    const chunks = []; chunksByGroup.set(group, chunks);
    for (const name of names) {
      const nodes = ctx.ast.statements.filter(n => ts.isFunctionDeclaration(n) && n.name?.text === name);
      if (nodes.length !== 1) throw new Error(`Missing or duplicate main function: ${name}`);
      const n = nodes[0], changed = rewrite(ctx, n.body, q => relocatedLiteral(ctx, q, `src/app/${group}.ts`) ?? resolve(q));
      const params = n.parameters.map((p, i) => p.initializer
        ? `${p.name.getText(ctx.ast)}: ${p.type ? p.type.getText(ctx.ast) : `NonNullable<Parameters<PageHost[${JSON.stringify(name)}]>[${i}]>`}`
        : p.getText(ctx.ast));
      const prefix = `export ${n.modifiers?.some(m => m.kind === ts.SyntaxKind.AsyncKeyword) ? 'async ' : ''}function ${name}(pageHost: PageHost${params.length ? ', ' + params.join(', ') : ''}): ${n.type.getText(ctx.ast)} `;
      chunks.push({ name, prefix, changed, suffix: '' });
      // Preserve the single async boundary in the moved implementation, rather than
      // wrap its promise in a second async function. Defaults run in the wrapper once.
      const signature = ctx.source.slice(n.getStart(ctx.ast), n.body.getStart(ctx.ast)).replace(/^async\s+/, '');
      const wrapper = `${signature}{ return a4_${name}(pageHost${n.parameters.length ? ', ' + n.parameters.map(p => p.name.getText(ctx.ast)).join(', ') : ''}); }`;
      edits.push({ start: n.getStart(ctx.ast), end: n.end, after: wrapper });
    }
  }
  // Extract callback installers at their original statement positions. A setup call
  // replaces only the original side effect, never its ordering or its declarations.
  let debugTail = false;
  const serial = new Map();
  for (const n of ctx.ast.statements) {
    if (!ts.isExpressionStatement(n) && !ts.isIfStatement(n) && !ts.isBlock(n)) continue;
    const text = n.getText(ctx.ast);
    if (text.startsWith('installHooks(')) debugTail = true;
    let group;
    if (debugTail) group = 'pageDebug';
    else if (/^(stations\.|booth\.|telescope\.onChange|creator\.(onLoadout|loadout|hats|onGesture|onStart|spellSound|progress))/.test(text)) group = 'pageStations';
    else if (/^freeze\./.test(text) || /^sound\.watch\(/.test(text)) group = 'pagePause';
    else if (/^document\.addEventListener\("visibilitychange"/.test(text)) group = 'pageBuildNotice';
    else if (/^(N\(\)\.playtest\.|observePlaytestErrors\(|document\.getElementById\("(copy-debug|finds-dev-btn)"|view\.on(GpuEvent|ContextRestored))/.test(text)) group = 'pageDebug';
    if (!group) continue;
    const index = (serial.get(group) ?? 0) + 1; serial.set(group, index);
    const name = `install${group.slice(4)}${index}`;
    const changed = rewrite(ctx, n, q => relocatedLiteral(ctx, q, `src/app/${group}.ts`) ?? resolve(q));
    const chunks = chunksByGroup.get(group) ?? []; chunksByGroup.set(group, chunks);
    chunks.push({ name, prefix: `export function ${name}(pageHost: PageHost): void {\n`, changed, suffix: '\n}' });
    edits.push({ start: n.getStart(ctx.ast), end: n.end, after: `a4_${name}(pageHost);` });
  }
  for (const [group, chunks] of chunksByGroup) {
    saveModule(ctx, `src/app/${group}.ts`, 'import type { PageHost } from "../main";', chunks);
    moduleImports.push(`import { ${chunks.map(c => `${c.name} as a4_${c.name}`).join(', ')} } from "./app/${group}";`);
  }
  const getset = [...used].sort().map(name => `  get ${name}(): typeof ${name} { return ${name}; },${writable.has(name) ? ` set ${name}(value: typeof ${name}) { ${name} = value; },` : ''}`).join('\n');
  const insertion = ctx.ast.statements.find(n => !ts.isImportDeclaration(n)).getStart(ctx.ast);
  edits.push({ start: insertion, end: insertion, after: `${moduleImports.join('\n')}\n\nconst pageHost = {\n${getset}\n};\nexport type PageHost = typeof pageHost;\n\n` });
  outputs.set(ctx.file, editText(ctx.source, edits));
}

function splitView() {
  const ctx = parsed('src/render/view.ts'), edits = [], imports = [], usedPrivate = new Set(), usedShared = new Set();
  const cls = ctx.ast.statements.find(n => ts.isClassDeclaration(n) && n.name?.text === 'View');
  const privateMembers = new Map(cls.members.filter(n => n.modifiers?.some(m => m.kind === ts.SyntaxKind.PrivateKeyword)).map(n => [n.name.getText(ctx.ast), n]));
  const runtime = new Map([...ctx.top].filter(([symbol, name]) => name !== 'View' && symbol.flags & ts.SymbolFlags.Value));
  const resolve = n => {
    if (ts.isPropertyAccessExpression(n) && n.expression.kind === ts.SyntaxKind.ThisKeyword) {
      const name = n.name.text;
      if (privateMembers.has(name)) { usedPrivate.add(name); return `internals.${name}`; }
      return `view.${name}`;
    }
    if (n.kind === ts.SyntaxKind.ThisKeyword) return 'view';
    if (ts.isShorthandPropertyAssignment(n)) {
      const name = runtime.get(ctx.checker.getShorthandAssignmentValueSymbol(n));
      if (name) { usedShared.add(name); return `${n.name.text}: shared.${name}`; }
    }
    if (ts.isIdentifier(n)) {
      const name = runtime.get(ctx.checker.getSymbolAtLocation(n));
      if (!name || (ts.isPropertyAccessExpression(n.parent) && n.parent.name === n)) return;
      usedShared.add(name); return `shared.${name}`;
    }
  };
  for (const [group, names] of Object.entries(viewGroups)) {
    const chunks = [];
    for (const name of names) {
      const matches = cls.members.filter(n => ts.isMethodDeclaration(n) && n.name.getText(ctx.ast) === name);
      if (matches.length !== 1) throw new Error(`Missing or duplicate View method: ${name}`);
      const n = matches[0], changed = rewrite(ctx, n.body, q => relocatedLiteral(ctx, q, `src/render/view/${group}.ts`) ?? resolve(q));
      const params = n.parameters.map((p, i) => `${p.name.getText(ctx.ast)}${p.questionToken ? '?' : ''}: ${p.type ? p.type.getText(ctx.ast) : `${p.initializer ? 'NonNullable<' : ''}Parameters<View[${JSON.stringify(name)}]>[${i}]${p.initializer ? '>' : ''}`}`);
      const isAsync = n.modifiers?.some(m => m.kind === ts.SyntaxKind.AsyncKeyword);
      const hosts = [['view', 'View'], ['internals', 'ViewInternals'], ['shared', 'ViewShared']].map(([id, type]) => `${new RegExp(`\\b${id}\\b`).test(changed.text) ? id : '_' + id}: ${type}`).join(', ');
      const prefix = `export ${isAsync ? 'async ' : ''}function${n.asteriskToken ? '*' : ''} ${name}(${hosts}${params.length ? ', ' + params.join(', ') : ''}): ${n.type.getText(ctx.ast)} `;
      chunks.push({ name, prefix, changed, suffix: '' });
      const args = n.parameters.map(p => p.name.getText(ctx.ast));
      const signature = ctx.source.slice(n.getStart(ctx.ast), n.body.getStart(ctx.ast)).replace(/\basync\s+/, '');
      const wrapper = `${signature}{ ${n.asteriskToken ? 'yield*' : 'return'} a4_${name}(this, this.a4Internals, a4Shared${args.length ? ', ' + args.join(', ') : ''}); }`;
      edits.push({ start: n.getStart(ctx.ast), end: n.end, after: wrapper });
    }
    saveModule(ctx, `src/render/view/${group}.ts`, 'import type { View, ViewInternals, ViewShared } from "../view";', chunks);
    imports.push(`import { ${names.map(n => `${n} as a4_${n}`).join(', ')} } from "./view/${group}";`);
  }
  const internalFields = [...usedPrivate].sort().map(name => {
    const n = privateMembers.get(name), getter = ts.isMethodDeclaration(n) ? `owner.${name}.bind(owner)` : `owner.${name}`;
    const writable = ts.isPropertyDeclaration(n) && !n.modifiers?.some(m => m.kind === ts.SyntaxKind.ReadonlyKeyword);
    return `      get ${name}(): View[${JSON.stringify(name)}] { return ${getter}; },${writable ? `\n      set ${name}(value: View[${JSON.stringify(name)}]) { owner.${name} = value; },` : ''}`;
  }).join('\n');
  edits.push({ start: cls.members.pos, end: cls.members.pos, after: `\n  /** A4 module bridge; private fields keep their existing visibility and initialization. */\n  private readonly a4Internals: ViewInternals = (() => { const owner = this; return {\n${internalFields}\n    }; })();\n` });
  const shared = [...usedShared].sort().map(name => `  get ${name}(): typeof ${name} { return ${name}; },${name === 'DROPPED' ? '\n  set DROPPED(value: number) { DROPPED = value; },' : ''}`).join('\n');
  const types = `\nexport type ViewInternals = {\n${[...usedPrivate].sort().map(n => `  ${n}: View[${JSON.stringify(n)}];`).join('\n')}\n};\nconst a4Shared = {\n${shared}\n};\nexport type ViewShared = typeof a4Shared;\n`;
  edits.push({ start: ctx.source.length, end: ctx.source.length, after: types });
  edits.push({ start: cls.getStart(ctx.ast), end: cls.getStart(ctx.ast), after: imports.join('\n') + '\n\n' });
  outputs.set(ctx.file, editText(ctx.source, edits));
}

splitMain();
splitView();
for (const f of ['src/main.ts', 'src/render/view.ts']) outputs.set(f, pruneUnusedImports(f, outputs.get(f)));
// Validate generated TypeScript syntax before writing anything.
for (const [file, text] of outputs) {
  if (file !== 'src/main.ts' && file !== 'src/render/view.ts' && fs.existsSync(file) && !previous?.outputs[file]) throw new Error(`Destination exists: ${file}`);
  const a = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
  if (a.parseDiagnostics.length) throw new Error(`Generated syntax invalid: ${file}: ${a.parseDiagnostics.map(d => ts.flattenDiagnosticMessageText(d.messageText, '\n')).join('; ')}`);
  manifest.outputs[file] = hash(text);
}
for (const [file, text] of outputs) { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, text); }
// The locations registry is derived metadata: refresh it after moves without
// changing any switch's name, values, description or acceptance rule.
execFileSync(process.execPath, ['tools/config/linkSwitches.mjs'], { stdio: 'pipe', timeout: 15000 });
for (const file of ['config/link-switches.json', 'docs/LINK-SWITCHES.md']) manifest.outputs[file] = hash(read(file));
manifest.applyMs = Math.round((performance.now() - started) * 10) / 10;
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`Applied ${manifest.cuts.length} named cuts to ${outputs.size} files in ${manifest.applyMs} ms; behavioural proof NOT RUN`);
