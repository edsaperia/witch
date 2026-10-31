// Inventory real world-constructor calls and explicit small-fixture reasons; comments are not calls.
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { fileURLToPath } from "node:url";

export function worldCalls(source, file = "test.ts") {
  const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true), builders = new Set(), reasons = [];
  for (const node of tree.statements) if (ts.isImportDeclaration(node) && !node.importClause?.isTypeOnly) {
    const names = node.importClause?.namedBindings;
    if (names && ts.isNamedImports(names)) for (const entry of names.elements) if (!entry.isTypeOnly && ["newGame", "generateMap"].includes(entry.propertyName?.text ?? entry.name.text)) builders.add(entry.name.text);
  }
  const findFactories = node => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer && ts.isCallExpression(node.initializer) && node.initializer.expression.getText(tree) === "smallWorld") {
      builders.add(node.name.text);
      const reason = node.initializer.arguments[1];
      if (reason && ts.isStringLiteralLike(reason)) reasons.push(reason.text);
    }
    ts.forEachChild(node, findFactories);
  };
  findFactories(tree);
  const calls = [];
  const visit = node => {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && builders.has(node.expression.text)) {
      calls.push({ builder: node.expression.text, line: tree.getLineAndCharacterOfPosition(node.getStart(tree)).line + 1, seed: node.arguments[0]?.getText(tree) ?? "", tuning: node.arguments[1]?.getText(tree) ?? "" });
    }
    ts.forEachChild(node, visit);
  };
  visit(tree);
  return { calls, reasons };
}

export function auditWorlds(root = process.cwd()) {
  const rows = [];
  const walk = dir => { for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith(".test.ts")) {
      const file = path.relative(root, full).replaceAll("\\", "/"), result = worldCalls(fs.readFileSync(full, "utf8"), file);
      if (result.calls.length) rows.push({ file, ...result, reviewed: result.reasons.length > 0 });
    }
  } };
  walk(path.join(root, "src"));
  return { files: rows.length, constructorSites: rows.reduce((sum, row) => sum + row.calls.length, 0), explicitlySmall: rows.filter(row => row.reviewed).length, auditComplete: rows.every(row => row.reviewed), rows };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === fs.realpathSync(process.argv[1])) console.log(JSON.stringify(auditWorlds(), null, 2));
