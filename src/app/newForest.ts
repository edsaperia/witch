// A new forest: this page's link with a fresh seed, the rest of it kept (the island, the world, the switches). The
// afterparty's "A new forest" goes there, and so does sleeping in the treehouse's bed (Ed, 2026-10-19: the bed's night
// replayed the same seed). The seed is 0 to 999999, as main.ts picks one when the link has none.
export function newForestHref(href: string, random: () => number = Math.random): string {
  const u = new URL(href);
  u.searchParams.set("seed", String(Math.floor(random() * 1e6)));
  return u.toString();
}
