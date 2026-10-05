// What's new (the start screen's panel): the changelog, collected at build time from one small
// file per change (Ed, 2026-10-05: "refactor so more work can run in parallel"; the one shared
// list was most of the merge conflicts). config/changelog/archive.json holds everything up to
// round 9, frozen; every change since adds its own config/changelog/<yyyy-mm-dd>-<slug>.json:
// { "version": null, "items": [...] }, its version written in (in that same file) once its
// build has a number. Fragments with the same version make one entry, the newest file's items
// first; the current build's (version null) come first, then the rest, newest version first.

export interface ChangelogEntry { version: number | null; items: string[] }
interface ChangelogFile { entries?: ChangelogEntry[]; version?: number | null; items?: string[] }

/** The entries, newest first, from the archive and the fragments (keyed by file path). */
export function collectChangelog(files: Record<string, ChangelogFile>): ChangelogEntry[] {
  const byVersion = new Map<number | null, string[]>(), archive: ChangelogEntry[] = [];
  // Fragments newest first by name (they're named by date), so a version's newest items lead.
  const names = Object.keys(files).sort().reverse();
  for (const name of names) {
    const f = files[name];
    if (f.entries) { archive.push(...f.entries); continue; }
    const v = f.version ?? null, list = byVersion.get(v) ?? [];
    list.push(...(f.items ?? []));
    byVersion.set(v, list);
  }
  for (const e of archive) byVersion.set(e.version, [...(byVersion.get(e.version) ?? []), ...e.items]);
  return [...byVersion.entries()]
    .sort(([a], [b]) => (a === null ? -1 : b === null ? 1 : b - a))
    .map(([version, items]) => ({ version, items }));
}

/** The game's changelog: every file in config/changelog, bundled at build time. */
export const CHANGELOG: ChangelogEntry[] = collectChangelog(import.meta.glob<ChangelogFile>("../config/changelog/*.json", { eager: true, import: "default" }));
