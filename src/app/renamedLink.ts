// A link that names a kind by an id it has since changed (rules/kinds.ts RENAMED; Ed, 2026-11-13: the swallowtail that wore the
// moth's id is the kind `butterfly`, and the moth is on the bench with no island): ?island=moth and ?found=...,moth,... mean the
// butterfly, as they did when they were shared. Rewritten in place, once, where a link is first read (main.ts, app/sail.ts,
// platform/online/entry.ts, app/linkParams.ts), so everything after reads today's id.
import { kindNow } from "../rules/kinds";

export function renamedLink<T extends URLSearchParams>(params: T): T {
  const island = params.get("island");
  if (island !== null && kindNow(island) !== island) params.set("island", kindNow(island));
  const found = params.get("found");
  if (found !== null) { const now = [...new Set(found.split(",").map(kindNow))].join(","); if (now !== found) params.set("found", now); }
  return params;
}
