import { ACTIONS } from "../rules/combat/actions";

/** Select the intent a signature fixture exercises; retain the real attack executor. */
export function withCombatRoles(roles: Record<string, "melee" | "ranged" | "special">, run: () => void): () => void {
  return () => {
    const restore = setCombatRoles(roles);
    try { run(); } finally { restore(); }
  };
}

export function setCombatRoles(roles: Record<string, "melee" | "ranged" | "special">): () => void {
  const original = ACTIONS.species;
  ACTIONS.species = { ...original };
  // Existing signature fixtures use the old shorthand; production has no role preferences.
  for (const [species, role] of Object.entries(roles)) {
    const choices = original[species] ?? [], nativeMelee = choices.some(a => a.delivery === "melee" && a.attack !== "species");
    ACTIONS.species[species] = choices.map(action => ({...action, weight: action.delivery === (role === "special" ? "effect" : role) && !(role === "melee" && nativeMelee && action.attack === "species") ? 1 : 0}));
  }
  return () => { ACTIONS.species = original; };
}
