// Shared grouping for build-time batches and the legacy API. No data imports or runtime fetch here.
export interface ChangelogEntry { version: number | null; items: string[] }
export interface ChangelogFile { entries?: ChangelogEntry[]; version?: number | null; items?: string[]; title?: string }
export interface ChangelogChange { title: string | null; date: string | null; items: string[] }
export interface ChangelogVersion { version: number | null; date: string | null; changes: ChangelogChange[] }
export function collectChangelog(files: Record<string, ChangelogFile>): ChangelogEntry[] {
  const byVersion = new Map<number | null, string[]>(), archive: ChangelogEntry[] = [];
  for (const name of Object.keys(files).sort().reverse()) {
    const f = files[name];
    if (f.entries) { archive.push(...f.entries); continue; }
    const v = f.version ?? null, list = byVersion.get(v) ?? [];
    list.push(...(f.items ?? [])); byVersion.set(v, list);
  }
  for (const e of archive) byVersion.set(e.version, [...(byVersion.get(e.version) ?? []), ...e.items]);
  return [...byVersion.entries()].sort(([a], [b]) => a === null ? -1 : b === null ? 1 : b - a).map(([version, items]) => ({ version, items }));
}
const FRAGMENT = /(\d{4}-\d{2}-\d{2})-([a-z0-9-]+)\.json$/;
export function groupChangelog(files: Record<string, ChangelogFile>): ChangelogVersion[] {
  const byVersion = new Map<number | null, ChangelogChange[]>(), archive: ChangelogEntry[] = [];
  for (const name of Object.keys(files).sort().reverse()) {
    const f = files[name];
    if (f.entries) { archive.push(...f.entries); continue; }
    const m = FRAGMENT.exec(name), slug = m?.[2] ?? "", v = f.version ?? null;
    const title = f.title ?? (slug ? slug[0].toUpperCase() + slug.slice(1).replace(/-/g, " ") : null);
    if (!f.items?.length) continue;
    byVersion.set(v, [...(byVersion.get(v) ?? []), { title, date: m?.[1] ?? null, items: f.items }]);
  }
  for (const e of archive) byVersion.set(e.version, [...(byVersion.get(e.version) ?? []), { title: null, date: null, items: e.items }]);
  return [...byVersion.entries()].sort(([a], [b]) => a === null ? -1 : b === null ? 1 : b - a)
    .map(([version, changes]) => ({ version, date: changes.map(c => c.date).filter((d): d is string => !!d).sort().pop() ?? null, changes }));
}
