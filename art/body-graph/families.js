// A family adapter, not a new species registry. Roster design supplies the
// natural proportions/markings; this enables the shared graph implementation.
export function felineGraphGenome(base, { head = {}, coat = {}, flex = .02 } = {}) {
  if (base.template !== "quadruped" || base.builder !== "quad") throw new Error("Feline graph requires a quadruped record");
  const out = structuredClone(base);
  out.body = { ...out.body, graph: { family: "feline", flex } };
  out.head = { ...out.head, ...head };
  out.coat = { ...out.coat, ...coat };
  if (out.coat.rosettes) out.coat.rosettes = { ...out.coat.rosettes, wrap: true };
  // Keep each level's story features and ratios. Its own pattern override also
  // goes through the same surface projection, rather than a species branch.
  if (out.levels) for (const level of Object.values(out.levels)) {
    if (level?.coat?.rosettes) level.coat.rosettes = { ...level.coat.rosettes, wrap: true };
  }
  return out;
}
