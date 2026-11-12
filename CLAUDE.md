# Witch

Witch is a new videogame by Ed Saperia (Ed, 2026-10-03). Witch is its codename; Coven Rush is the top candidate for the release name (Ed, 2026-11-11). Its design so far is `DESIGN.md`. Engine (Ed, 2026-10-03): prototype in Three.js in the browser, port to Godot once Ed is happy; so the game's state and rules live in `src/rules/` with no Three.js in them, and `src/render/` draws them. Anything else not yet decided: ask Ed rather than assume, and record his answers in the area's note (here only if every builder needs them).

Work on Witch follows the shared rules in [edsaperia/dev-ops](https://github.com/edsaperia/dev-ops): `AGENTS.md`, `CONVENTIONS.md` and `claude/QUESTIONS-PAGE.md`. This file adds what is specific to Witch and wins where the two disagree.

## Notes and glossary

This file keeps only what every builder needs every time (housekeeping, Ed 2026-10-23: four pull requests went back for conflicts in one day, nearly all in this file); the rest lives in a note an area under `docs/notes/`. [`docs/notes/INDEX.md`](docs/notes/INDEX.md), made from the notes by `node tools/docs/glossary.mjs --write`, lists every note with what it covers, and the glossary: literal, stable names for the prototype's parts, as Ed and the builders agree them (the game's own terms are in `DESIGN.md`'s glossary).

**Read an area's note before working on it; add to the note, not to this file.**

## Deploys

**Merging to `main` deploys** the game to https://edsaperia.github.io/witch/; only the coordinator does that. Every pull request from this repository gets a preview at `/pr-<number>/`, linked on the PR (none for a documents-only one). How it works, and when a release counts as live (the public `version.json`): [`docs/notes/deploys.md`](docs/notes/deploys.md).

## Builders and the coordinator (Ed, 2026-10-29)

Several builders work in parallel (Claude sessions; Codex builders are paused); one **coordinator** session briefs them, combines their work, checks it and publishes. These rules win over older wording. Who is building what, and each builder's state and owned files, is in [`docs/active-builders.md`](docs/active-builders.md) (kept by the coordinator).

- **Branches.** Work on your own branch off `claude/prototype` (Codex: `codex/<topic>`), with a draft PR into `claude/prototype`. **Never push to `claude/prototype` or `main`, and never release:** the coordinator combines ready branches on one build, runs the full check once and publishes (Ed, 2026-10-28: "combine them on one branch, run one check, publish once").
- **Checks before a FINAL:** `npm run typecheck` plus the tests near what you touched (and `node art/check.mjs` when you touch the art). **Not** the full suite or the smoke tests: the coordinator runs those on the combined build (Ed, 2026-10-29: "Be economical ... Try and batch testing if it saves tokens"). CI still runs everything on your PR. See **Testing**.
- **Push first** (Ed, 2026-10-04: "All the builders should push first and run checks afterwards"): when a change works, run the fast checks and push straight away so CI builds a playable preview, then report; on a later failure, fix and push again. Never hold a playable build back for a slow check. Where the two differ, 2026-10-29 wins: builders leave the slow checks (smoke runs, preview sheets) to the coordinator.
- **Reports:** short. `REPORT:` while working, `QUESTION:` when blocked, `FINAL:` when done: what changed and why, the tests, anything you noticed but didn't fix, how Ed can check it in play. The coordinator's builder sessions send them to its session; a builder outside them (the Claude-app builder; Codex when it resumes) posts them as PR comments and reads `COORDINATOR:` comments there.
- **Talk only to the coordinator,** not to other builders: it relays (Ed, 2026-10-29). If you need another builder's area, say so in a `QUESTION:`.
- **Pictures only when Ed will look at them** (a visual change he asked for, a before/after); none for logic fixes. Publish them only with `node tools/shots/push.mjs` (2026-10-26), never by committing to `claude/ed-shots` from a checkout (`docs/notes/testing.md`, **Publishing previews**).
- **Small changes stay small:** no slow tools, no extra polish beyond the brief; take care and go slowly only when a problem is suspected (Ed, 2026-10-29).
- **Ed's words are the spec.** Quote them in comments and docs with the date; when a brief and Ed's words disagree, ask.
- **For Ed:** plain words, numbered points, UTC times, and honesty about quality (what's rough, what's unverified).
- **Possible mushroom trips** (Ed, 2026-10-30): when any work reveals an interesting possible trip effect, add it as a suggestion to `docs/backlog/cauldron.md` in the same piece of work (how, and the trips' sound rules: `docs/notes/cauldron.md`).

## What's new (Ed, 2026-10-05)

The start screen's What's new panel is made from **one small file per change** in `config/changelog/`, so builders working in parallel don't conflict (details: `docs/notes/config.md`, **Changelog fragments**).

- A push that changes something Ed can see adds its own fragment, `config/changelog/<yyyy-mm-dd>-<slug>.json`, holding `{ "version": null, "items": ["…"] }` in plain player-facing words ("Trees no longer pop in and out"), not commit-speak. Later pushes of the same work may add to it.
- Leave `version` null: the coordinator stamps fragments at each release (`node tools/config/stampChangelog.mjs`). Never edit anyone else's fragment, or the frozen `config/changelog/archive.json`. `src/changelog.test.ts` checks every file's shape.

## Fixing bugs (Ed, 2026-10-13)

Bring a bug back to Ed early rather than guess: he can answer questions, take a log or test in play faster than a builder can work round a gap.

- **Check the report first.** If it lacks something you need (the version, what he was doing, a screenshot, the L log), ask straight away, through the coordinator.
- **15 minutes to reproduce.** Can't make it happen by then? Stop and report what you tried and exactly what you need from Ed: a question, a log taken a certain way, or something to try in play.
- **No unconfirmed "fixed".** If you can't see the bug go away yourself, say so in the PR and give Ed a short in-game check (e.g. "load v36xx with an empty cache, start a night: is the witch visible?").
- **Make the next sighting count.** If the L log wouldn't show what went wrong, add the logging that would.
- **Visual bugs: measure, don't eyeball** (Ed, 2026-10-14, after the circle hunt). First write down what should hold (e.g. "see-through at full opacity draws the same as see-through off"), render both and pixel-diff them; bisect with that number, not by comparing screenshots in a dark forest. Try it on the cloud renderer before assuming it's Ed's machine.
- **No fix on an untested theory.** Push a fix only once the measurement changes; otherwise send Ed one build with every switch in it, not one build per guess.

## Testing

`node tools/checks/which.mjs [--base <ref>]` lists the checks your change needs, from its changed files and `config/checks.json`: the builder's, before a FINAL, and the coordinator's, on the combined build. The builder minimum is `npm run typecheck` and the tests near what you touched (`npx vitest related --run <files>`), plus `node art/check.mjs` when you touch the art (it isn't run on PRs). CI, the smoke tests and every other check: `docs/notes/testing.md` and the area's note.
