// A new forest: this page's link with a fresh seed, the rest of it kept (the island, the world, the switches). Sleeping in the
// treehouse's bed goes there (Ed, 2026-10-19: the bed's night replayed the same seed), the only way to a new night on the same
// island (Ed, 2026-10-21: the party's-over card's Play again and A new forest gone, "replace with the bed"; the card itself since 2026-10-26). The seed is 0 to 999999, as main.ts picks one when the link has none.
export function newForestHref(href: string, random: () => number = Math.random): string {
  const u = new URL(href);
  u.searchParams.set("seed", String(Math.floor(random() * 1e6)));
  return u.toString();
}
