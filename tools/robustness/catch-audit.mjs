// Source inventory, not a runtime test. AST traversal excludes comments and generated string literals.
import ts from "typescript";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
function files(dir) { return readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? files(join(dir, e.name)) : /\.ts$/.test(e.name) && !/\.test\.ts$/.test(e.name) ? [join(dir, e.name)] : []); }
const rows = [];
for (const file of files("src")) {
  const text = readFileSync(file, "utf8"), source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
  function visit(node) {
    if (ts.isCatchClause(node)) {
      const body = node.block.getText(source), code = body.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");
      rows.push({ file: file.replaceAll("\\", "/"), line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
        bound: !!node.variableDeclaration, empty: /^\{\s*\}$/.test(code), logged: /logCaughtError|captureError|console\.(warn|error)|this\.failed|options\.onError/.test(body),
        body: body.replace(/\s+/g, " ").slice(0, 300) });
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
}
console.log(JSON.stringify({ total: rows.length, unbound: rows.filter(r => !r.bound).length, empty: rows.filter(r => r.empty).length, rows }, null, 2));
