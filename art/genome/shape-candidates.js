// Ed, 2026-11-05: only the five creature shapes; every switch starts OFF.
// Compose over the selected shipped paint record, never mutate a canonical genome.
export const CREATURE_SHAPE_SWITCHES = Object.freeze({
  mole: "shapeMole", hydra: "shapeHydra", lion: "shapeLion",
  woodlouse: "shapeWoodlouse", crocodile: "shapeCrocodile",
});
const shapeCandidateCache = new WeakMap();
export function creatureShapeCandidate(genome, context = {}) {
  const key = CREATURE_SHAPE_SWITCHES[genome.id];
  if (!key || context[key] !== 1) return genome;
  if (shapeCandidateCache.has(genome)) return shapeCandidateCache.get(genome);
  const g = structuredClone(genome);
  if (g.id === "mole") {
    g.look = { ...g.look, mole: { ...g.look?.mole,
      bodyLength: 1.15, bodyVerticalDepth: 1.32, bodyWidth: .98,
      forepawWidth: 1.5, forepawLength: 1.15, forepawThickness: 1.3,
      forepawSpread: 1.18, forepawForward: .06,
    } };
  } else if (g.id === "hydra") {
    g.hydra = { ...g.hydra, neckSpread: 1.65, neckStagger: 1.3 };
  } else {
    g.levels = Array.from({ length: 4 }, (_, age) => {
      const l = g.levels?.[age] ?? {};
      const body = { ...l.body };
      if (g.id === "woodlouse") {
        Object.assign(body, { legReach: 1.32, legThickness: 1.3, feelerThickness: 1.45 });
      } else if (g.id === "crocodile") {
        Object.assign(body, { tailRootK: 1.3, sprawl: .43 });
      } else if (g.id === "lion") {
        Object.assign(body, { tailTuftK: 1.65,
          front: (l.body?.front ?? g.body?.front ?? 1) * (age === 0 ? 1.04 : 1.12),
        });
        const head = { ...l.head, earRoundWidth: 1.2 };
        const parts = { ...l.parts, ears: { ...g.parts?.ears, ...l.parts?.ears,
          kind: "round", size: age === 0 ? 1 : .95 } };
        const features = (l.features ?? []).map(f => f.kind === "ruff"
          ? { ...f, size: f.size * 1.28, count: Math.round(f.count * 1.2), mat: "BODY2" } : f);
        if (age >= 2) features.push({ kind: "ruff", size: age === 3 ? .32 : .24,
          count: age === 3 ? 24 : 20, mat: "BODY2", along: -.13 });
        return { ...l, body, head, parts, features };
      }
      return { ...l, body };
    });
  }
  shapeCandidateCache.set(genome, g);
  return g;
}
