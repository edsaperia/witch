// Per-job roots from the real dispatcher, plus conservative module-initialization inputs.
// Whole files are hashed: binding analysis narrows edges, never slices bytes out of a file.
import ts from "typescript";
import { posix } from "node:path";
import { createHash } from "node:crypto";
import { contentFingerprint, dependencyGraph, type DependencyOptions, type JobDependencies, type SourceTree } from "./artDependencies";

interface Binding { file: string; name: string }
interface Module {
  ast: ts.SourceFile;
  definitions: Map<string, ts.Node>;
  imports: Map<string, Binding>;
  exports: Map<string, Binding>;
  stars: string[];
}
// Bounded by file count, not revision count: history replays reuse unchanged ASTs
// without retaining every old tree. Hash validation also supports mutable readers.
const sourceCache = new Map<string, { hash: string; ast: ts.SourceFile }>();
type ReferenceUse = { name: string; member?: string };
const referenceCache = new WeakMap<ts.Node, ReferenceUse[]>();
const purityCache = new WeakMap<ts.Node, boolean>();
function sourceFile(file: string, bytes: Uint8Array): ts.SourceFile {
  const hash = createHash("sha256").update(bytes).digest("hex"), previous = sourceCache.get(file);
  if (previous?.hash === hash) return previous.ast;
  const ast = ts.createSourceFile(file, Buffer.from(bytes).toString("utf8").replaceAll("\r\n", "\n"), ts.ScriptTarget.Latest, true);
  sourceCache.set(file, { hash, ast }); return ast;
}
function referenceUses(node: ts.Node): ReferenceUse[] {
  const cached = referenceCache.get(node); if (cached) return cached;
  const uses = new Map<string, ReferenceUse>();
  const walk = (n: ts.Node): void => {
    if (ts.isTypeNode(n) || ts.isImportDeclaration(n) || ts.isExportDeclaration(n)) return;
    if (ts.isPropertyAccessExpression(n) && ts.isIdentifier(n.expression)) {
      const use = { name: n.expression.text, member: n.name.text };
      uses.set(`p:${use.name}:${use.member}`, use); return;
    }
    if (ts.isIdentifier(n)) uses.set("i:" + n.text, { name: n.text });
    ts.forEachChild(n, walk);
  };
  walk(node); const result = [...uses.values()]; referenceCache.set(node, result); return result;
}
export interface ArtFingerprintResult {
  scopeSources: string[];
  dependencies: JobDependencies;
  fingerprints: Record<string, string>;
  initialization: string[];
  initializationReasons: Record<string, string>;
  /** Initializers and bindings they evaluate, rather than unrelated function bodies. */
  initializationParts: Record<string, { file: string; source: string }>;
  /** Files hashed whole for drawing, separate from partial initialization inputs. */
  drawInputs: Record<string, string[]>;
  sharedHash: string;
  sharedWholeFiles: string[];
  conservative: string[];
}
export interface ArtFingerprintOptions extends DependencyOptions {
  /** Build-time producers are content inputs, not runtime art module entry points. */
  buildInputs?: string[];
}

export function artJobFingerprints(tree: SourceTree, options: ArtFingerprintOptions = {}, dispatcher = "src/render/artBuild.ts"): ArtFingerprintResult {
  const loaded = dependencyGraph(tree, { all: [dispatcher] }, options).jobs.all;
  const modules = new Map<string, Module>(), conservative = new Set<string>();
  const initializationReasons: Record<string, string> = {};
  const initializationParts: Record<string, { file: string; source: string }> = {};
  let initializationContext = "";
  const resolve = (file: string, spec: string): string => {
    if (!spec.startsWith(".")) throw new Error(`Binding import must be local: ${file}: ${spec}`);
    const base = posix.normalize(posix.join(posix.dirname(file), spec));
    const found = [base, base + ".ts", base + ".js", base + ".json", base + "/index.ts", base + "/index.js"].find(f => tree.exists(f));
    if (!found || found.startsWith("../")) throw new Error(`Unresolved binding: ${file}: ${spec}`);
    return found;
  };
  const names = (n: ts.BindingName): string[] => ts.isIdentifier(n) ? [n.text] : n.elements.flatMap(e => ts.isOmittedExpression(e) ? [] : names(e.name));
  const module = (file: string): Module => {
    const cached = modules.get(file); if (cached) return cached;
    const ast = sourceFile(file, tree.read(file));
    const m: Module = { ast, definitions: new Map(), imports: new Map(), exports: new Map(), stars: [] };
    modules.set(file, m);
    if (file.endsWith(".json") || !/\.[cm]?[jt]sx?$/.test(file)) return m;
    for (const s of ast.statements) {
      if (ts.isImportDeclaration(s) && ts.isStringLiteral(s.moduleSpecifier)) {
        const c = s.importClause; if (!c || c.isTypeOnly) continue;
        const spec = s.moduleSpecifier.text;
        // Virtual data bindings are included by the whole import graph when reached.
        const target = spec.startsWith(".") ? resolve(file, spec) : spec;
        if (c.name) m.imports.set(c.name.text, { file: target, name: "default" });
        if (c.namedBindings && ts.isNamespaceImport(c.namedBindings)) m.imports.set(c.namedBindings.name.text, { file: target, name: "*" });
        else if (c.namedBindings) for (const e of c.namedBindings.elements) if (!e.isTypeOnly) m.imports.set(e.name.text, { file: target, name: e.propertyName?.text ?? e.name.text });
      } else if (ts.isExportDeclaration(s) && !s.isTypeOnly) {
        const target = s.moduleSpecifier && ts.isStringLiteral(s.moduleSpecifier) ? resolve(file, s.moduleSpecifier.text) : file;
        if (s.exportClause && ts.isNamedExports(s.exportClause)) {
          for (const e of s.exportClause.elements) if (!e.isTypeOnly) m.exports.set(e.name.text, { file: target, name: e.propertyName?.text ?? e.name.text });
        } else if (!s.exportClause) m.stars.push(target);
      } else if (ts.isVariableStatement(s)) {
        for (const d of s.declarationList.declarations) for (const name of names(d.name)) m.definitions.set(name, d);
      } else if ((ts.isFunctionDeclaration(s) || ts.isClassDeclaration(s)) && s.name) m.definitions.set(s.name.text, s);
      else if (ts.isExportAssignment(s)) m.definitions.set("default", s.expression);
    }
    return m;
  };
  const fullCache = new Map<string, string[]>();
  const inputPart = (file: string): string => {
    const bytes = Buffer.from(tree.read(file));
    return /\.(?:[cm]?[jt]sx?|json)$/.test(file) ? "text:" + bytes.toString("utf8").replaceAll("\r\n", "\n") : "binary:" + bytes.toString("base64");
  };
  const full = (file: string): string[] => {
    let files = fullCache.get(file);
    if (!files) { files = dependencyGraph(tree, { fallback: [file] }, options).jobs.fallback; fullCache.set(file, files); }
    return files;
  };
  const addFull = (file: string, out: Set<string>, why: string): void => {
    conservative.add(why);
    for (const f of full(file)) {
      out.add(f);
      if (initializationContext) initializationParts[f + "#full"] = { file: f, source: inputPart(f) };
    }
  };
  const visitBinding = (file: string, name: string, out: Set<string>, seen: Set<string>): void => {
    const key = file + ":" + name; if (seen.has(key)) return; seen.add(key);
    if (!tree.exists(file)) {
      const declared = options.virtual?.[file] ?? options.external?.[file];
      if (!declared) throw new Error(`Undeclared binding source: ${file}`);
      for (const f of declared) addFull(f, out, `virtual initializer ${file}`);
      return;
    }
    if (initializationContext && !initializationReasons[file]) initializationReasons[file] = initializationContext;
    out.add(file);
    if (file.endsWith(".json") || !/\.[cm]?[jt]sx?$/.test(file)) {
      if (initializationContext) initializationParts[file + "#data"] = { file, source: inputPart(file) };
      return;
    }
    const m = module(file), imported = m.imports.get(name), exported = m.exports.get(name), definition = m.definitions.get(name);
    if (imported) { visitBinding(imported.file, imported.name, out, seen); return; }
    if (exported && (exported.file !== file || exported.name !== name)) { visitBinding(exported.file, exported.name, out, seen); return; }
    if (definition) {
      if (initializationContext) initializationParts[file + "#binding:" + name] = { file, source: definition.getText(m.ast) };
      references(file, definition, out, seen); return;
    }
    // Star exports and namespace escapes preserve complete module initialization.
    addFull(file, out, `whole-module ${file}:${name}`);
  };
  const references = (file: string, node: ts.Node, out: Set<string>, seen: Set<string>): void => {
    const m = module(file);
    for (const use of referenceUses(node)) {
      const imported = m.imports.get(use.name);
      if (use.member && imported?.name === "*") { visitBinding(imported.file, use.member, out, seen); continue; }
      if (imported || m.definitions.has(use.name)) visitBinding(file, use.name, out, seen);
      if (use.member && (m.imports.has(use.member) || m.definitions.has(use.member))) visitBinding(file, use.member, out, seen);
    }
  };
  // Only syntax whose evaluation cannot call user code is treated as inert.
  // Unknown calls, property reads, spreads and top-level statements bind all their
  // referenced declarations into every key, including transitive initializer calls.
  const inertClass = (n: ts.ClassLikeDeclaration): boolean => !n.heritageClauses?.length && !ts.getDecorators(n)?.length && n.members.every(member =>
    !ts.isClassStaticBlockDeclaration(member) && !(member.name && ts.isComputedPropertyName(member.name)) && !(ts.canHaveDecorators(member) && ts.getDecorators(member)?.length) &&
    !(ts.isPropertyDeclaration(member) && member.initializer && member.modifiers?.some(m => m.kind === ts.SyntaxKind.StaticKeyword)));
  const uncachedInert = (n: ts.Expression): boolean => {
    if (ts.isIdentifier(n) || ts.isLiteralExpression(n) || ts.isArrowFunction(n) || ts.isFunctionExpression(n) || n.kind === ts.SyntaxKind.NullKeyword || n.kind === ts.SyntaxKind.TrueKeyword || n.kind === ts.SyntaxKind.FalseKeyword) return true;
    if (ts.isParenthesizedExpression(n) || ts.isAsExpression(n) || ts.isTypeAssertionExpression(n) || ts.isNonNullExpression(n)) return inert(n.expression);
    if (ts.isClassExpression(n)) return inertClass(n);
    if (ts.isPrefixUnaryExpression(n)) return ts.isNumericLiteral(n.operand);
    if (ts.isArrayLiteralExpression(n)) return n.elements.every(e => !ts.isSpreadElement(e) && (ts.isOmittedExpression(e) || inert(e)));
    if (ts.isObjectLiteralExpression(n)) return n.properties.every(p => (ts.isShorthandPropertyAssignment(p) && !p.objectAssignmentInitializer) || (ts.isPropertyAssignment(p) && !ts.isComputedPropertyName(p.name) && inert(p.initializer)) || ((ts.isMethodDeclaration(p) || ts.isGetAccessorDeclaration(p) || ts.isSetAccessorDeclaration(p)) && !ts.isComputedPropertyName(p.name)));
    // These two built-ins only copy literal entries; no custom iterator or accessor.
    const m = module(n.getSourceFile().fileName), unbound = (name: string) => !m.definitions.has(name) && !m.imports.has(name);
    if (ts.isCallExpression(n) && n.expression.getText() === "Object.entries" && unbound("Object") && n.arguments.length === 1 && ts.isObjectLiteralExpression(n.arguments[0])) return n.arguments[0].properties.every(p => ts.isPropertyAssignment(p) && !ts.isComputedPropertyName(p.name) && inert(p.initializer));
    if (ts.isNewExpression(n) && ts.isIdentifier(n.expression) && ["Map", "Set"].includes(n.expression.text) && unbound(n.expression.text)) {
      if (!n.arguments?.length) return true;
      if (n.arguments.length !== 1 || !inert(n.arguments[0])) return false;
      const arg = n.arguments[0];
      if (ts.isCallExpression(arg)) return arg.expression.getText() === "Object.entries";
      return ts.isArrayLiteralExpression(arg) && (n.expression.text === "Set" || arg.elements.every(e => ts.isArrayLiteralExpression(e) && e.elements.length >= 2));
    }
    return false;
  };
  const initialization = new Set<string>();
  const inert = (n: ts.Expression): boolean => {
    const cached = purityCache.get(n); if (cached !== undefined) return cached;
    const value = uncachedInert(n); purityCache.set(n, value); return value;
  };
  const initializationSeen = new Set<string>();
  for (const file of loaded) {
    if (file.endsWith(".json") || !/\.[cm]?[jt]sx?$/.test(file)) continue;
    const m = module(file);
    // Runtime import ordering can change initialization even when binding text is
    // unchanged. Bind the load topology, without hashing unrelated function bodies.
    initializationParts[file + "#load-order"] = { file, source: m.ast.statements.filter(s => ts.isImportDeclaration(s) || (ts.isExportDeclaration(s) && s.moduleSpecifier)).map(s => s.getText(m.ast)).join("\n") };
    const order: string[] = [];
    let effect = 0;
    for (const s of m.ast.statements) {
      initializationContext = `${file}: ${s.getText(m.ast).slice(0, 140)}`;
      if (ts.isImportDeclaration(s) || ts.isExportDeclaration(s) || ts.isFunctionDeclaration(s) || ts.isInterfaceDeclaration(s) || ts.isTypeAliasDeclaration(s) || ts.isEmptyStatement(s) || (ts.isClassDeclaration(s) && inertClass(s))) continue;
      if (ts.isVariableStatement(s)) {
        // Even inert variable declarations can affect an initializer's reads when
        // reordered (notably var hoisting), so retain their relative positions.
        for (const d of s.declarationList.declarations) order.push("binding:" + names(d.name).join(","));
        for (const d of s.declarationList.declarations) if (d.initializer && !inert(d.initializer)) {
          const key = "init:" + names(d.name).join(",");
          initializationParts[file + "#" + key] = { file, source: d.getText(m.ast) };
          initialization.add(file); references(file, d.initializer, initialization, initializationSeen);
        }
      } else {
        const key = "effect:" + effect++; order.push(key);
        initializationParts[file + "#" + key] = { file, source: s.getText(m.ast) };
        initialization.add(file); references(file, s, initialization, initializationSeen);
      }
    }
    initializationParts[file + "#effect-order"] = { file, source: JSON.stringify(order) };
  }
  initializationContext = "";
  const d = module(dispatcher), run = d.definitions.get("runJob");
  if (!run || !ts.isFunctionDeclaration(run) || !run.body || !run.parameters[0] || !ts.isIdentifier(run.parameters[0].name)) throw new Error("Unsupported art dispatcher");
  const parameter = run.parameters[0].name.text, kinds = new Set<string>();
  const jobType = d.ast.statements.find(s => ts.isTypeAliasDeclaration(s) && s.name.text === "ArtJob");
  if (!jobType) throw new Error("ArtJob union not found");
  const findKinds = (n: ts.Node): void => { if (ts.isPropertySignature(n) && n.name.getText(d.ast) === "kind" && n.type) { const literals = (t: ts.Node): void => { if (ts.isStringLiteral(t)) kinds.add(t.text); ts.forEachChild(t, literals); }; literals(n.type); } ts.forEachChild(n, findKinds); };
  findKinds(jobType); if (!kinds.size) throw new Error("Empty art kind union");
  const condition = (n: ts.Expression, kind: string): boolean | undefined => {
    if (ts.isParenthesizedExpression(n)) return condition(n.expression, kind);
    if (!ts.isBinaryExpression(n)) return undefined;
    if (n.operatorToken.kind === ts.SyntaxKind.BarBarToken) { const a = condition(n.left, kind), b = condition(n.right, kind); return a === undefined || b === undefined ? undefined : a || b; }
    if (n.operatorToken.kind === ts.SyntaxKind.EqualsEqualsEqualsToken && n.left.getText(d.ast) === parameter + ".kind" && ts.isStringLiteral(n.right)) return n.right.text === kind;
    return undefined;
  };
  const returns = (n: ts.Statement): boolean => ts.isReturnStatement(n) || (ts.isBlock(n) && !!n.statements.length && returns(n.statements[n.statements.length - 1]));
  const jobs: Record<string, string[]> = {};
  const drawInputs: Record<string, string[]> = {};
  for (const kind of [...kinds].sort()) {
    const files = new Set(options.buildInputs ?? []); files.add(dispatcher);
    const seen = new Set(initializationSeen);
    for (const s of run.body.statements) {
      if (ts.isIfStatement(s)) {
        const yes = condition(s.expression, kind);
        if (yes === false) continue;
        if (yes === undefined) { addFull(dispatcher, files, `unknown dispatcher guard for ${kind}`); break; }
        references(dispatcher, s.thenStatement, files, seen);
        if (returns(s.thenStatement)) break;
      } else { references(dispatcher, s, files, seen); if (returns(s)) break; }
    }
    drawInputs[kind] = [...files].sort();
    jobs[kind] = [...new Set([...files, ...initialization, ...Object.values(initializationParts).filter(p => p.source.length).map(p => p.file)])].sort();
  }
  const reverse: Record<string, string[]> = {};
  for (const [kind, files] of Object.entries(jobs)) for (const file of files) (reverse[file] ??= []).push(kind);
  const files = Object.fromEntries(Object.entries(reverse).sort(([a], [b]) => a.localeCompare(b)));
  const shared = Object.keys(files).filter(f => files[f].length === kinds.size);
  const partTree: SourceTree = { exists: f => f in initializationParts, read: f => Buffer.from(initializationParts[f].source.replaceAll("\r\n", "\n")) };
  const initializationHash = contentFingerprint(partTree, Object.keys(initializationParts), "witch-art-initialization-v1");
  const fingerprints = Object.fromEntries(Object.entries(drawInputs).map(([kind, paths]) => [kind, contentFingerprint(tree, paths, "witch-art-kind-v1:" + initializationHash)]));
  const commonWholeFiles = Object.values(drawInputs)[0].filter(f => Object.values(drawInputs).every(inputs => inputs.includes(f)));
  const sharedHash = contentFingerprint(tree, commonWholeFiles, initializationHash);
  return { scopeSources: [...new Set([...loaded, ...(options.buildInputs ?? [])])].sort(), dependencies: { jobs, files, shared }, fingerprints, drawInputs, initialization: [...initialization].sort(), initializationReasons, initializationParts, sharedHash, sharedWholeFiles: commonWholeFiles, conservative: [...conservative].sort() };
}

/** Reusable affected-only selector: filename maps are upper bounds because shared
 * initialization may depend on one declaration, rather than a file's drawing code. */
export const affectedArtJobs = (before: ArtFingerprintResult, after: ArtFingerprintResult): string[] =>
  [...new Set([...Object.keys(before.fingerprints), ...Object.keys(after.fingerprints)])].sort().filter(k => before.fingerprints[k] !== after.fingerprints[k]);
