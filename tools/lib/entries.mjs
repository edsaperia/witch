// The top-level entries of an object literal `export const <name> = {` in a module's text (the split registries' tools:
// tools/creatures.mjs, tools/data.mjs): [{ key, text (the value's source), before (comment lines of its own above it), after (a
// comment on its line after it) }], and the text's start and end (the braces' insides). A small scanner: strings, comments and
// nesting respected; a spread (`...X,`) is passed over and not an entry.
export function entriesOf(text, name) {
  const open = text.indexOf(`export const ${name} = {`);
  if (open < 0) throw new Error(`no "export const ${name} = {"`);
  let i = text.indexOf("{", open) + 1, depth = 1;
  const start = i, entries = [];
  let pendingComments = [], key = null, valueStart = 0;
  const skipString = q => { i++; while (i < text.length && text[i] !== q) { if (text[i] === "\\") i++; i++; } i++; };
  while (i < text.length && depth > 0) {
    const ch = text[i], two = text.slice(i, i + 2);
    if (ch === '"' || ch === "'" || ch === "`") { skipString(ch); continue; }
    if (two === "//") { const end = text.indexOf("\n", i), line = text.slice(i, end < 0 ? text.length : end); if (depth === 1 && key === null) { const lineStart = text.lastIndexOf("\n", i) + 1; if (!text.slice(lineStart, i).trim()) pendingComments.push(line); else if (entries.length) entries[entries.length - 1].after = line; } i = end < 0 ? text.length : end; continue; }
    if (two === "/*") { i = text.indexOf("*/", i) + 2; continue; }
    if (ch === "{" || ch === "[" || ch === "(") depth++;
    else if (ch === "}" || ch === "]" || ch === ")") { depth--; if (depth === 0) break; }
    else if (depth === 1 && key === null && /[A-Za-z_$"']/.test(ch)) {
      const m = /^("[^"]+"|'[^']+'|[A-Za-z_$][\w$]*)\s*:/.exec(text.slice(i));
      if (m) { key = m[1].replace(/^["']|["']$/g, ""); i += m[0].length; while (text[i] === " ") i++; valueStart = i; continue; }
    } else if (depth === 1 && key !== null && ch === ",") {
      entries.push({ key, text: text.slice(valueStart, i).trim(), before: pendingComments, after: "" }); pendingComments = []; key = null;
    }
    i++;
  }
  if (key !== null) { entries.push({ key, text: text.slice(valueStart, i).trim(), before: pendingComments, after: "" }); pendingComments = []; }
  return { entries, start, end: i, trailing: pendingComments };
}

/** Two record texts the same but for whitespace (a merge pasted back what the folder already holds). */
export const sameText = (a, b) => a.replace(/\s+/g, " ").trim() === b.replace(/\s+/g, " ").trim();
/** The file's own export (its text after `export const NAME = `, without the trailing semicolon and comment). */
export const exportedText = (text, name) => { const m = new RegExp(`export const ${name} = ([\\s\\S]*?);(\\s*//.*)?\\s*$`).exec(text.replace(/^import .*\n/gm, "")); return m ? m[1] : ""; };
/** The module's text with `import { names } from "<from>"` in it (after its last import, or at the top). */
export function withImport(text, names, from) {
  if (text.includes(`from "${from}"`)) return text;
  const line = `import { ${names.join(", ")} } from "${from}";\n`, imports = [...text.matchAll(/^import .*\n/gm)], at = imports.length ? imports[imports.length - 1].index + imports[imports.length - 1][0].length : 0;
  return text.slice(0, at) + line + text.slice(at);
}
