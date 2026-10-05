// The start screen's "Coming up" (Ed, 2026-10-05: show "what's upcoming, like the release reports"):
// what's in flight, one line each. Generated at deploy time from the open pull requests (the Pages
// workflow writes upcoming.generated.json, which vite.config.ts bakes in as __UPCOMING__), so it's
// never stale and nobody edits a shared file; then any items in config/upcoming/ (one small file
// each, for work without a pull request yet). At most eight.

export interface UpcomingItem { title: string; summary?: string; number?: number }

declare const __UPCOMING__: UpcomingItem[] | undefined;

const extra = import.meta.glob<UpcomingItem>("../../config/upcoming/*.json", { eager: true, import: "default" });

export const UPCOMING: UpcomingItem[] = [...(typeof __UPCOMING__ !== "undefined" ? __UPCOMING__ : []), ...Object.values(extra)]
  .filter(i => i && typeof i.title === "string" && i.title.trim())
  .slice(0, 8);
