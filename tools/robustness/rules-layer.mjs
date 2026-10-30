import ts from "typescript";
import { readdirSync, readFileSync } from "node:fs";
import { resolve, dirname, relative } from "node:path";
import { pathToFileURL } from "node:url";
export function sources(dir) { return readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? sources(resolve(dir, e.name)) : /\.ts$/.test(e.name) && !/\.test\.ts$/.test(e.name) ? [resolve(dir, e.name)] : []); }
const forbidden = /^(three)(\/|$)|(^|\/)(render|ui|app|platform)(\/|$)/;
const dom = /^(window|document|navigator|location|localStorage|sessionStorage|screen|history|frames|parent|top|self|customElements|customElements|matchMedia|requestAnimationFrame|cancelAnimationFrame|requestIdleCallback|cancelIdleCallback|Image|ImageData|Audio|AudioContext|OffscreenCanvas|Worker|SharedWorker|DOM\w*|HTML\w*|WebGL\w*|Canvas\w*|Element|Node|Event|EventTarget|MouseEvent|KeyboardEvent|PointerEvent|TouchEvent|ResizeObserver|MutationObserver)$/;
export function violations(text, file = "fixture.ts") {
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true), errors = [];
  // Bind local declarations so `const top`, a parameter called window, or a local Node type is not a browser global.
  const options = { noLib: true, noResolve: true }, host = ts.createCompilerHost(options);
  host.getSourceFile = name => name.replaceAll("\\", "/") === file.replaceAll("\\", "/") ? source : undefined;
  const checker = ts.createProgram([file], options, host).getTypeChecker();
  function fail(node, what) { errors.push(`${file}:${source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1}: ${what}`); }
  function visit(node) {
    // All module specifiers, including import types, re-exports, require and dynamic import.
    if (ts.isStringLiteral(node) && ((ts.isImportDeclaration(node.parent) || ts.isExportDeclaration(node.parent)) && node.parent.moduleSpecifier === node || ts.isLiteralTypeNode(node.parent) && ts.isImportTypeNode(node.parent.parent) || ts.isCallExpression(node.parent) && (node.parent.expression.kind === ts.SyntaxKind.ImportKeyword || node.parent.expression.getText(source) === "require"))) {
      if (forbidden.test(node.text)) fail(node, `forbidden dependency ${node.text}`);
    }
    // Token inspection ignores comments and strings. Property names are permitted, except explicit globalThis/window access.
    if (ts.isIdentifier(node) && dom.test(node.text)) {
      const p = node.parent, property = ts.isPropertyAccessExpression(p) && p.name === node;
      const key = (ts.isPropertyAssignment(p) || ts.isPropertySignature(p)) && p.name === node;
      if ((ts.isInterfaceDeclaration(p) || ts.isTypeAliasDeclaration(p) || ts.isVariableDeclaration(p) || ts.isParameter(p) || ts.isFunctionDeclaration(p) || ts.isClassDeclaration(p)) && p.name === node) return;
      const localName = (name, at) => checker.resolveName(name, at, ts.SymbolFlags.Value | ts.SymbolFlags.Type, false)?.declarations?.some(d => d.getSourceFile() === source);
      const local = property || key ? false : localName(node.text, node);
      if ((!property && !key && !local) || property && /^(globalThis|window|self)$/.test(p.expression.getText(source)) && !localName(p.expression.getText(source), p.expression)) fail(node, `DOM global ${node.text}`);
    }
    if (ts.isElementAccessExpression(node) && /^(globalThis|window|self)$/.test(node.expression.getText(source)) && node.argumentExpression && ts.isStringLiteral(node.argumentExpression) && dom.test(node.argumentExpression.text)) fail(node, `DOM global ${node.argumentExpression.text}`);
    ts.forEachChild(node, visit);
  }
  visit(source);
  return errors;
}
export function cycles(files) {
  const all = new Set(files), graph = new Map();
  for (const file of files) {
    const s = ts.createSourceFile(file, readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true), edges = [];
    for (const stmt of s.statements) if (ts.isImportDeclaration(stmt) && stmt.moduleSpecifier && ts.isStringLiteral(stmt.moduleSpecifier) && !stmt.importClause?.isTypeOnly) {
      const named = stmt.importClause?.namedBindings;
      if (named && ts.isNamedImports(named) && !stmt.importClause.name && named.elements.length && named.elements.every(e => e.isTypeOnly)) continue;
      const target = resolve(dirname(file), `${stmt.moduleSpecifier.text}.ts`);
      if (all.has(target)) edges.push(target);
    }
    graph.set(file, edges);
  }
  let next = 0; const index = new Map(), low = new Map(), stack = [], active = new Set(), groups = [];
  function visit(v) {
    index.set(v, next); low.set(v, next++); stack.push(v); active.add(v);
    for (const w of graph.get(v) ?? []) { if (!index.has(w)) { visit(w); low.set(v, Math.min(low.get(v), low.get(w))); } else if (active.has(w)) low.set(v, Math.min(low.get(v), index.get(w))); }
    if (low.get(v) === index.get(v)) { const group = []; let w; do { w = stack.pop(); active.delete(w); group.push(w); } while (w !== v); if (group.length > 1) groups.push(group.sort()); }
  }
  for (const v of files) if (!index.has(v)) visit(v);
  return groups.map(g => g.map(f => relative(process.cwd(), f).replaceAll("\\", "/")));
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const files = sources("src/rules");
  console.log(JSON.stringify({ violations: files.flatMap(f => violations(readFileSync(f, "utf8"), f)), runtimeCycles: cycles(files) }, null, 2));
}
