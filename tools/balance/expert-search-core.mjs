// Deterministic, evaluation-independent coordinate search. The real-rules driver owns
// observation, cases and scoring; this module never imports or modifies game rules.
export const SEARCH_SCHEMA = 1;

export function validateSpace(space) {
  const names = new Set();
  for (const [name, lo, hi, integer = false] of space) {
    if (typeof name !== "string" || !name || names.has(name) || !Number.isFinite(lo) || !Number.isFinite(hi) || lo >= hi || typeof integer !== "boolean" || (integer && (!Number.isInteger(lo) || !Number.isInteger(hi)))) throw Error("Invalid search space");
    names.add(name);
  }
  if (!space.length) throw Error("Empty search space");
}

function validatePoint(space, point) {
  if (Object.keys(point).length !== space.length) throw Error("Point does not match space");
  for (const [name, lo, hi, integer] of space) {
    const v = point[name];
    if (!Number.isFinite(v) || v < lo || v > hi || (integer && !Number.isInteger(v))) throw Error(`Invalid parameter ${name}`);
  }
}

export function startSearch(space, initial, seed = 1) {
  validateSpace(space); validatePoint(space, initial);
  if (!Number.isInteger(seed) || seed < 0 || seed > 0xffffffff) throw Error("Invalid search seed");
  return { schema: SEARCH_SCHEMA, space: structuredClone(space), seed, random: seed, evaluated: 0, incumbent: { ...initial }, score: null, pending: null };
}

// Lexicographic objective: aggregate wins, then wave passage, then survival.
// No finite progress/survival improvement can outweigh a win.
export function objective(rows) {
  if (!rows.length) throw Error("No objective cases");
  return rows.reduce((s, r) => {
    if (!["won", "lost", "censored"].includes(r.outcome) || !Number.isFinite(r.wavesPassed) || r.wavesPassed < 0 || !Number.isFinite(r.end) || r.end < 0) throw Error("Invalid objective row");
    return [s[0] + Number(r.outcome === "won"), s[1] + r.wavesPassed, s[2] + r.end];
  }, [0, 0, 0]);
}

export function better(a, b) {
  if (!Array.isArray(a) || a.length !== 3 || !a.every(Number.isFinite) || (b !== null && (!Array.isArray(b) || b.length !== 3 || !b.every(Number.isFinite)))) throw Error("Invalid objective");
  if (b === null) return true;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return a[i] > b[i];
  return false;
}

// Checkpoint after ask(), before a costly evaluation. Replaying ask() returns the
// identical pending candidate, including after a restart partway through its cases.
export function ask(state) {
  if (state.pending) return structuredClone(state.pending);
  validateSpace(state.space); validatePoint(state.space, state.incumbent);
  if (state.score === null) state.pending = { id: state.evaluated, point: { ...state.incumbent } };
  else {
    const unit = () => { state.random = (Math.imul(state.random, 1664525) + 1013904223) >>> 0; return (state.random + 0.5) / 4294967296; };
    const point = { ...state.incumbent };
    // A seeded full-space restart every tenth candidate, otherwise change one
    // coordinate. Cycling scales keeps exploration from shrinking to zero.
    const restart = state.evaluated % 10 === 0;
    const index = Math.floor(unit() * state.space.length);
    for (let i = 0; i < state.space.length; i++) {
      if (!restart && i !== index) continue;
      const [name, lo, hi, integer] = state.space[i];
      const scale = [0.5, 0.2, 0.08][Math.floor(state.evaluated / state.space.length) % 3];
      let v = restart ? lo + unit() * (hi - lo) : point[name] + (unit() < 0.5 ? -1 : 1) * (hi - lo) * scale;
      v = Math.max(lo, Math.min(hi, integer ? Math.round(v) : v));
      if (v === point[name]) v = point[name] === hi ? lo : hi;
      point[name] = v;
    }
    state.pending = { id: state.evaluated, point };
  }
  return structuredClone(state.pending);
}

export function tell(state, candidate, score) {
  if (!state.pending || JSON.stringify(candidate) !== JSON.stringify(state.pending)) throw Error("Candidate differs from checkpoint");
  const accepted = better(score, state.score);
  if (accepted) { state.incumbent = { ...candidate.point }; state.score = [...score]; }
  state.evaluated++; state.pending = null;
  return accepted;
}
