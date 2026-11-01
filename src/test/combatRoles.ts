import { SPACING } from "../rules/combatSpacing";

/** Select the intent a signature fixture exercises; retain the real attack executor. */
export function withCombatRoles(roles: Record<string, "melee" | "ranged" | "special">, run: () => void): () => void {
  return () => {
    const restore = setCombatRoles(roles);
    try { run(); } finally { restore(); }
  };
}

export function setCombatRoles(roles: Record<string, "melee" | "ranged" | "special">): () => void {
  const original = SPACING.preferences;
  SPACING.preferences = { default: original.default, species: { ...original.species } };
  for (const [species, role] of Object.entries(roles)) SPACING.preferences.species[species] = {
    ...original.species[species], melee: role === "melee" ? 1 : 0, ranged: role === "ranged" ? 1 : 0, special: role === "special" ? 1 : 0,
  };
  return () => { SPACING.preferences = original; };
}
