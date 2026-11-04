// The bench's declared differences (Ed, 2026-10-23, the coordinator's housekeeping: "Make the 'game unchanged' bench mean
// something: ... let a PR declare its expected differences"): a PR that means to change the game says what it changes, with a
// reason, in tools/bench/expect/<its branch>.json, and the compare (compare.cjs --expect) is green when only what's declared
// differs and red on anything else. Keyed by the branch, so one PR's declaration never excuses another's differences.
//   { "reason": "what this PR changes, in a line",
//     "rules":  { "<state part, e.g. creatures>": "why", "*": "why (every part)" },
//     "frames": { "<scene, e.g. boot>": "why", "*": "why (every scene)" },
//     "start": { "<named scene>": "why its initial x/z intentionally changes" } }
// start allows finite x/z changes only; no wildcard and no other starting-state field can be declared.
// A mismatch is keyed rules:<part> (the state's part, on any seed) or frames:<scene> (its pixels, its size or where she ended);
// one with no key (a scene or seed missing, nothing to compare) can't be declared.

/** The declaration at `file`, or null (no file: nothing declared). Throws on a malformed one: a typo shouldn't pass. */
function readExpect(fs, file) {
  if (!file || !fs.existsSync(file)) return null;
  const e = JSON.parse(fs.readFileSync(file, "utf8"));
  if (typeof e.reason !== "string" || !e.reason.trim()) throw new Error(`${file}: a "reason" is needed (what the PR changes)`);
  for (const k of ["rules", "frames", "start"]) {
    if (e[k] === undefined) continue;
    if (!e[k] || typeof e[k] !== "object" || Array.isArray(e[k])) throw new Error(`${file}: "${k}" is { name: why }`);
    for (const [n, why] of Object.entries(e[k])) if (typeof why !== "string" || !why.trim()) throw new Error(`${file}: ${k}.${n} needs its reason`);
    if (k === "start" && Object.keys(e[k]).some(n => !n.trim() || n.includes("*"))) throw new Error(`${file}: start requires named scenes, no wildcard`);
  }
  for (const k of Object.keys(e)) if (!["reason", "rules", "frames", "start"].includes(k)) throw new Error(`${file}: unknown field "${k}" (reason, rules, frames, start)`);
  return e;
}

/** Why `key` (rules:<part> or frames:<scene>) may differ, or null if it isn't declared. */
function declared(expect, key) {
  if (!expect || !key) return null;
  const [kind, name] = key.split(/:(.*)/s);
  const table = expect[kind];
  return (table && (table[name] ?? (kind === "start" ? null : table["*"]))) || null;
}

/** Split only finite initial x/z from the strict boundary. Missing/invalid coordinates remain undeclarable. */
function startingDifferences(name, before, after) {
  const a = before ?? null, b = after ?? null;
  if (JSON.stringify(a) === JSON.stringify(b)) return [];
  const text = `frames ${name}: unequal controlled starting boundaries (${JSON.stringify(before)} vs ${JSON.stringify(after)})`;
  if (!a || !b || ![a.x, a.z, b.x, b.z].every(v => typeof v === "number" && Number.isFinite(v))) return [{ key: null, text }];
  const { x: ax, z: az, ...restA } = a, { x: bx, z: bz, ...restB } = b, bad = [];
  if (JSON.stringify(restA) !== JSON.stringify(restB)) bad.push({ key: null, text });
  if (ax !== bx || az !== bz) bad.push({ key: `start:${name}`, text: `frames ${name}: starting x/z changed (${ax},${az} → ${bx},${bz})` });
  return bad;
}

/** The mismatches (`{ key, text }`) split into the declared (with their reasons) and the rest; and what was declared but
 *  didn't differ (worth a look: stale, or a change that didn't happen). */
function judge(bad, expect) {
  const ok = [], left = [];
  for (const b of bad) { const why = declared(expect, b.key); (why ? ok : left).push(why ? { ...b, why } : b); }
  const seen = new Set(bad.map(b => b.key).filter(Boolean)), unseen = [];
  if (expect) for (const kind of ["rules", "frames", "start"]) for (const name of Object.keys(expect[kind] ?? {})) {
    if (name === "*" ? ![...seen].some(k => k.startsWith(kind + ":")) : !seen.has(`${kind}:${name}`)) unseen.push(`${kind}:${name}`);
  }
  return { ok, left, unseen };
}

module.exports = { readExpect, declared, judge, startingDifferences };
