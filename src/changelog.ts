// Legacy eager API retained for tools/tests. The game fetches batches only from the What\'s new tab.
import { collectChangelog, groupChangelog, type ChangelogFile } from "./changelogData";
export * from "./changelogData";
const files = import.meta.glob<ChangelogFile>("../config/changelog/*.json", { eager: true, import: "default" });
export const CHANGELOG = collectChangelog(files);
export const CHANGELOG_VERSIONS = groupChangelog(files);
