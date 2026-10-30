// Conservative runtime-import graph, shared by cache fingerprints and affected-job tools.
// No art is imported or executed. Job roots are supplied by the dispatcher analysis.
import ts from "typescript";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import { posix, resolve } from "node:path";

export interface SourceTree {
  exists(file: string): boolean;
  read(file: string): Uint8Array;
}
export const diskTree = (root: string): SourceTree => ({
  exists: file => existsSync(resolve(root, file)) && statSync(resolve(root, file)).isFile(),
  read: file => readFileSync(resolve(root, file)),
});
export interface DependencyOptions {
  /** Virtual modules must declare all content inputs, including empty-registry behavior. */
  virtual?: Record<string, string[]>;
  /** Installed dependencies must bind their version through the lockfile. */
  external?: Record<string, string[]>;
}
export interface JobDependencies {
  jobs: Record<string, string[]>;
  files: Record<string, string[]>;
  shared: string[];
}

function checked(file: string): string {
  const normalized = posix.normalize(file.replaceAll("\\", "/"));
  if (normalized.startsWith("../") || normalized.startsWith("/") || /^[A-Za-z]:/.test(normalized)) throw new Error(`Outside source tree: ${file}`);
  return normalized;
}

/** Fail closed on an unresolved edge; an incomplete graph must never become a cache hit. */
export function dependencyGraph(tree: SourceTree, roots: Record<string, string[]>, options: DependencyOptions = {}): JobDependencies {
  const parsed = new Map<string, string[]>();
  const requireFile = (file: string): string => {
    file = checked(file);
    if (!tree.exists(file)) throw new Error(`Missing art dependency: ${file}`);
    return file;
  };
  const resolveImport = (file: string, spec: string): string[] => {
    const declared = options.virtual?.[spec] ?? options.external?.[spec];
    if (declared) return declared.map(requireFile);
    if (!spec.startsWith(".")) throw new Error(`Undeclared art import ${spec} in ${file}`);
    const base = checked(posix.join(posix.dirname(file), spec));
    const candidates = [base, `${base}.ts`, `${base}.js`, `${base}.json`, `${base}/index.ts`, `${base}/index.js`];
    const found = candidates.find(f => tree.exists(f));
    if (!found) throw new Error(`Unresolved art import ${spec} in ${file}`);
    return [found];
  };
  const imports = (file: string): string[] => {
    const cached = parsed.get(file);
    if (cached) return cached;
    if (file.endsWith(".json") || !/\.[cm]?[jt]sx?$/.test(file)) { parsed.set(file, []); return []; }
    const source = ts.createSourceFile(file, Buffer.from(tree.read(file)).toString("utf8"), ts.ScriptTarget.Latest, true);
    const specs = new Set<string>();
    const visit = (node: ts.Node): void => {
      if (ts.isImportDeclaration(node)) {
        const clause = node.importClause;
        if (clause?.isTypeOnly) return;
        const bindings = clause?.namedBindings;
        if (!clause?.name && bindings && ts.isNamedImports(bindings) && bindings.elements.length && bindings.elements.every(e => e.isTypeOnly)) return;
        if (!ts.isStringLiteral(node.moduleSpecifier)) throw new Error(`Nonliteral import in ${file}`);
        specs.add(node.moduleSpecifier.text);
        return;
      }
      if (ts.isExportDeclaration(node) && node.moduleSpecifier) {
        if (node.isTypeOnly || (node.exportClause && ts.isNamedExports(node.exportClause) && node.exportClause.elements.length && node.exportClause.elements.every(e => e.isTypeOnly))) return;
        if (!ts.isStringLiteral(node.moduleSpecifier)) throw new Error(`Nonliteral export in ${file}`);
        specs.add(node.moduleSpecifier.text);
        return;
      }
      // Import types don't load code. Runtime dynamic imports and require are retained.
      if (ts.isImportTypeNode(node)) return;
      if (ts.isCallExpression(node) && (node.expression.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(node.expression) && node.expression.text === "require"))) {
        const spec = node.arguments[0];
        if (!spec || !ts.isStringLiteral(spec)) throw new Error(`Dynamic art dependency needs an explicit conservative root: ${file}`);
        specs.add(spec.text);
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
    const result = [...new Set([...specs].flatMap(spec => resolveImport(file, spec)))].sort();
    parsed.set(file, result);
    return result;
  };
  const jobs: Record<string, string[]> = {};
  for (const [kind, entries] of Object.entries(roots).sort(([a], [b]) => a.localeCompare(b))) {
    if (!entries.length) throw new Error(`Empty art roots: ${kind}`);
    const seen = new Set<string>();
    const walk = (file: string): void => {
      file = requireFile(file);
      if (seen.has(file)) return;
      seen.add(file);
      for (const edge of imports(file)) walk(edge);
    };
    for (const entry of entries) walk(entry);
    jobs[kind] = [...seen].sort();
  }
  const files: Record<string, string[]> = {};
  for (const [job, inputs] of Object.entries(jobs)) for (const file of inputs) (files[file] ??= []).push(job);
  const ordered = Object.fromEntries(Object.entries(files).sort(([a], [b]) => a.localeCompare(b)));
  return { jobs, files: ordered, shared: Object.keys(ordered).filter(f => ordered[f].length === Object.keys(jobs).length) };
}

/** Length-framed paths and bytes avoid ambiguous concatenations. Text normalizes CRLF. */
export function contentFingerprint(tree: SourceTree, files: string[], schema = "witch-art-kind-v1"): string {
  const h = createHash("sha256");
  const add = (data: Uint8Array | string): void => {
    const bytes = typeof data === "string" ? Buffer.from(data) : data;
    h.update(`${bytes.length}:`); h.update(bytes);
  };
  add(schema);
  for (const file of [...new Set(files.map(checked))].sort()) {
    add(file);
    const bytes = tree.read(file);
    add(/\.(?:[cm]?[jt]sx?|json)$/.test(file) ? Buffer.from(bytes).toString("utf8").replaceAll("\r\n", "\n") : bytes);
  }
  return h.digest("hex").slice(0, 24);
}

export const jobFingerprints = (tree: SourceTree, map: JobDependencies): Record<string, string> =>
  Object.fromEntries(Object.entries(map.jobs).map(([kind, files]) => [kind, contentFingerprint(tree, files)]));
