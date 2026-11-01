# Backlog audit: mark what's already built

Brief for one builder (coordinator, 2026-11-01). Docs only, no code.

Ed asked whether the area-border work and the house/journey items were already done, and several are. The backlog pages' headings still say "not built", which misleads everyone. For example:
- `look.md`: the planting blend across borders shipped as the area blend (#1149, v4567; warp off in #1179, v4646). It has a pause-page slider, but ground cover keeps the exact border by default. Only the edges line is marked done.
- `creator-and-house.md`, `treehouse.md` and `journey.md` have "Not built yet" headings, but much of each is built: the walkable treehouse and its rooms, the wardrobe and dressing table, the Workshop, hats and brooms, the cauldron, islands and sailing.

## Task

For every page in `docs/backlog/`:
1. Check each item against the code and git history (`git log --grep`, the merged PRs and the changelog).
2. Mark each item **Built** (with PR number and version), **Partly built** (say what's missing), or leave it unmarked if it isn't built.
3. Fix each page's heading line so it states the true overall status.
4. Add a status column or tag to `docs/backlog/README.md`'s list.
5. Don't change what any item asks for, and don't start any work.

## Evidence

A short table in the PR body: page, items, built, partly built, not built. Plus the 5 most significant "partly built" gaps in one line each. Ed will read these to choose what's next.
