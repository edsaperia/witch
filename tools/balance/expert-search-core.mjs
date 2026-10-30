// Deterministic, evaluation-independent coordinate search. The real-rules driver owns
// observation, cases and scoring; this module never imports or modifies game rules.
export const SEARCH_SCHEMA = 4;

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

// Ed's objective: wins, completed quests, all quests, find eligible to keep,
// then provisional finds, quest deliveries, non-win waves and signed time.
// Coordinator 6515138100: wins prefer fewer seconds; non-wins prefer survival.
// Won waves contribute zero, so delaying a win never earns wave credit. Partial progress
// never outranks the completed goals. Actual app persistence is not simulated.
// No finite progress/survival improvement can outweigh a win.
export function objective(rows) {
  if (!rows.length) throw Error("No objective cases");
  return rows.reduce((s, r) => {
    if (!["won", "lost", "censored"].includes(r.outcome) || !Number.isFinite(r.wavesPassed) || r.wavesPassed < 0 || !Number.isFinite(r.end) || r.end < 0) throw Error("Invalid objective row");
    if (!Number.isInteger(r.questsCompleted) || !Number.isInteger(r.questsTotal) || r.questsCompleted < 0 || r.questsCompleted > r.questsTotal || typeof r.upgradeEligibleToKeep !== "boolean") throw Error("Missing quest/find objective fields");
    if (![0, 1].includes(r.provisionalFindsCollected) || !Number.isInteger(r.questDeliveries) || r.questDeliveries < 0 || r.questDeliveries > r.questsTotal) throw Error("Missing/invalid partial-progress fields");
    if (r.upgradeEligibleToKeep && (r.outcome !== "won" || r.provisionalFindsCollected !== 1)) throw Error("Kept-find eligibility requires a won pickup");
    const won = r.outcome === "won";
    return [s[0] + Number(won), s[1] + r.questsCompleted, s[2] + Number(r.questsTotal > 0 && r.questsCompleted === r.questsTotal), s[3] + Number(r.upgradeEligibleToKeep), s[4] + r.provisionalFindsCollected, s[5] + r.questDeliveries, s[6] + (won ? 0 : r.wavesPassed), s[7] + (won ? -r.end : r.end)];
  }, [0, 0, 0, 0, 0, 0, 0, 0]);
}

export function better(a, b) {
  if (!Array.isArray(a) || a.length !== 8 || !a.every(Number.isFinite) || (b !== null && (!Array.isArray(b) || b.length !== 8 || !b.every(Number.isFinite)))) throw Error("Invalid objective");
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
