// A build number says nothing about save compatibility. These explicit format contracts do.
// A shape edit must deliberately bump its format and record a new reviewed baseline, or migrate it.
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";

function contract(path: string, names: string[], omitFields: readonly string[] = []): string {
  const text = readFileSync(path, "utf8"), file = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true);
  const printer = ts.createPrinter({ removeComments: true, newLine: ts.NewLineKind.LineFeed });
  const declarations = file.statements.filter(s => (ts.isInterfaceDeclaration(s) || ts.isTypeAliasDeclaration(s)) && names.includes(s.name.text));
  expect(declarations).toHaveLength(names.length);
  const reviewed = declarations.map(s => ts.isInterfaceDeclaration(s) && omitFields.length
    ? ts.factory.updateInterfaceDeclaration(s, s.modifiers, s.name, s.typeParameters, s.heritageClauses,
      s.members.filter(member => !member.name || !omitFields.includes(member.name.getText(file)))) : s);
  return createHash("sha256").update(reviewed.map(s => printer.printNode(ts.EmitHint.Unspecified, s, file)).join("\n")).digest("hex");
}
function version(path: string, name: string): string {
  const file = ts.createSourceFile(path, readFileSync(path, "utf8"), ts.ScriptTarget.Latest, true);
  const declaration = file.statements.find(s => ts.isInterfaceDeclaration(s) && s.name.text === name);
  if (!declaration || !ts.isInterfaceDeclaration(declaration)) throw new Error(`Missing ${name}`);
  const field = declaration.members.find(s => ts.isPropertySignature(s) && s.name.getText(file) === "version");
  if (!field || !ts.isPropertySignature(field) || !field.type) throw new Error("Missing format version");
  return field.type.getText(file);
}
// Keep older entries: changing a fingerprint under an existing version would hide incompatibility.
const ENVELOPES: Record<string, string> = { "1": "24213f259fbb611b5006ad46d2ad0cb69e6ad64d0a4728a4a4edc0bccd63ffc6" };
const GRAPHS: Record<string, string> = { "1": "b8d8b776a773cd0bb13d0f73da868a28e3b720ab99fc39cc32c2d82b9659347e" };
const GAMES: Record<string, string> = { "1": "f32b65b969a1a5b1bf756d064ad01db325552e9e2ff37c3b32caedbdf7c0e292" };
// Compatible additive migration, not a replacement of the historical v1 contract:
// restoreGame seeds missing mushrooms from newGame; existing mushroom state is kept exactly.
// Runtime proof: nightSnapshot.test.ts "migrates older nights without mushroom state...".
const GAME_MIGRATIONS: Record<string, { fingerprint: string; addedFields: readonly string[] }> = {
  "1": { fingerprint: "c25636f8dab4e815d2a4f5b6274e6f9df0b8017933c430b53df59f02dd53abf3", addedFields: ["mushrooms"] },
};
describe("saved format contracts", () => {
  it("requires an explicit envelope-format review when SavedNight changes", () => {
    expect(contract("src/app/nightSave.ts", ["SavedNight"])).toBe(ENVELOPES[version("src/app/nightSave.ts", "SavedNight")]);
  });
  it("requires an explicit rules-format review when Game or the graph format changes", () => {
    const v = version("src/rules/nightSnapshot.ts", "NightSnapshot");
    expect(contract("src/rules/nightSnapshot.ts", ["Value", "Node", "Graph", "NightSnapshot"])).toBe(GRAPHS[v]);
    const migration = GAME_MIGRATIONS[v];
    expect(contract("src/rules/game.ts", ["Game"])).toBe(migration?.fingerprint ?? GAMES[v]);
    // Removing only the migrated fields must recover the unchanged historical contract.
    if (migration) expect(contract("src/rules/game.ts", ["Game"], migration.addedFields)).toBe(GAMES[v]);
  });
});
