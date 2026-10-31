# PR #1543 "Heat and magical refraction": QA at b21a00ac528779dbf838c13bb3ec12fa88b927a0

Checked 2026-10-31 15:54–16:25 UTC. Candidate served label `dev · b21a00a`; base `dev · 1ccec66` (claude/prototype 1ccec66195c5ec5df642efe1f6b61cf75e437982). Both were built locally with `WITCH_SHA=… npm run build` and served by `raw/scripts/serve.cjs`. Renderer: `ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero)), SwiftShader driver)`, 960×540. No game code was changed.

## Summary

| # | Item | Result |
|---|---|---|
| 0 | Setup: HEAD = b21a00a…, `npm ci`, `node tools/config/check.mjs` | **PASS** |
| 1a | OFF identity: no flag vs `refraction=0` (same build) | **PASS**: 0 px differ in every frame where the art had loaded the same way (beach fire 0 px; start 0 px against the rerun). Other differences come from art-loading timing, not the flag (see below). |
| 1b | OFF identity: candidate (no flag) vs base | **PASS**: only the version label differs (351–410 px, all inside box [900,518]–[949,528], "b21a00a" vs "1ccec66"). |
| 2a | Campfire, ON vs OFF (`capturePair 'fire'`) | **PASS, with caveats**: inside the form's box 693 px change (max channel 25) vs 696 px / max 1 for the OFF-return noise. The whole-frame numbers are swamped by the sea redrawing differently each render. The witch was not in front of the plume, so the foreground guard was **NOT TESTED** for fire. |
| 2b | Party-cast wave, ON vs OFF (`capturePair 'ring'`, age 0.20 s of 0.65 s) | **PASS**: 6,141 px change (1.18 %), mean diff 0.391, max 171, bounds [323,107]–[643,438]; OFF-return 0 px. The witch, DJ table and HUD are unchanged. |
| 3 | Refraction + potion wobble + Thick Canopy grading together (`capturePair …, true`) | **PASS (it composes)**: helper accepted (wobble 1, canopy 1, one fire form); no black frame (black px 14.67 % OFF vs 14.76 % ON = the night sky); NaN **not directly checked** (the shader's NaN markers, `uBroken`, were off); source order is refract → wobble (`src/render/post.ts:92–96`). Refraction's own share **can't be isolated** here: the per-render noise is bigger (see 3). |
| – | Screen edges, camera motion, slowed/paused clock, island swap, quality rung, GPU timing/memory | **NOT TESTED** (outside this brief's time box) |
| – | Page errors / console errors | **None** on any of 9 page loads |

## How frames were frozen

- An init script set `window.witch.manual = true` the moment the hooks object was assigned, so the page's real-time loop never stepped the game. `Math.random` was replaced by one fixed LCG on every page.
- Each run took the same steps with `witch.frame(controls, 1/60, draw)`:
  1. 30 frames, then `assets.whenIdle()` plus re-renders (scene **start**, t = 0.50);
  2. an ordinary cast through the rules' `castParty` control (spellAt = 0.5167) and 12 frames: scene **ring**, age 0.20 s;
  3. `witch.shot("at:x,z+3")` 3 m from the nearest beach campfire and 60 frames: scene **fire**, t = 1.72;
  4. a Thick Canopy trip (`blue+red+white`) started then and 30 frames: scene **combined**, t = 2.22.
- Second pass ("F-" folders): `performance.now`/`Date.now` were also pinned to constants for each screenshot and capture. That made the treehouse scenes byte-stable (0 px between two renders of the same frame).
- **Residual noise that freezing did not remove:** at the beach, two renders of the same frozen frame differ by 22,219 px (max 71, the lower half: sea/shore). With the potion trip on, they differ by about 84,000 px (max 147, whole frame). So something on the beach advances per render call, not per clock. This is present on the base build too, identically, so it is not from this PR.
- **Art-loading split:** the treehouse frames ("start", "ring") came out in one of two states (the crown/foliage drawn or not yet), about 63 % of pixels apart. Which state a page lands in depends on load timing, not on the build or the flag:
  - a rerun of `refraction=0` matched the no-flag run at 0 px;
  - the base with `&refraction=1` matched the base with no flag at 0 px;
  - in the frozen pass the no-flag candidate landed in the other state from both `refraction=0` and the base.
  So 1a/1b are judged on frames where the art matched; mismatched pairs are listed in the JSON for honesty.

## Numbers

### Batch 1: OFF identity

Taken from `diffs.json` (first pass) and `diffs-frozen.json` (frozen pass). "Diff px" is the number of differing pixels; "max" is the largest channel difference.

| Pair | Scene | Diff px | Max | Notes |
|---|---|---|---|---|
| no flag vs `refraction=0` | fire (both passes) | **0** | 0 | |
| no flag vs `refraction=0` | combined (pass 1) | **0** | 0 | frozen pass 4,653 px, inside the beach's 84k-px per-render noise |
| no flag vs `refraction=0` rerun | start | **0** | 0 | `raw/extra2.json` |
| `refraction=1` (no form yet) vs `refraction=0` | start | **0** | 0 | `raw/extra1.json` |
| candidate vs base, no flag | start (pass 1) | 351 | 180 | label only [900,518]–[949,527] |
| candidate vs base, no flag | fire (both passes) | 410 | 165 | label only |
| candidate vs base, no flag | combined (pass 1) | 407 | 168 | label only |
| base `refraction=1` vs base no flag | start | **0** | 0 | the flag means nothing to the base |

### Batch 2: ON vs OFF (frozen pass, `raw/F-cand-absent/cap-*`; helper turns the preview on in-page)

| Kind | Changed px | % | Mean diff | Max | Bounds | OFF-return vs OFF |
|---|---|---|---|---|---|---|
| ring (age 0.20 s) | 6,141 | 1.18 % | 0.391 | 171 | [323,107]–[643,438] | **0 px** |
| fire, whole frame | 26,994 | 5.21 % | 0.047 | 163 | [15,191]–[959,539] | 27,567 px (noise) |
| fire, form box [430,200]–[482,285] | 693 of 4,558 | 15 % | – | **25** | – | 696 px, max **1** |

Helper output (`capture.json` in each folder):
- ring form: centre (0.504, 0.502), half-size (0.472 × 0.875) of the screen, depth 0.965, phase 0.308, strength 2;
- fire form: centre (0.475, 0.552), half-size (0.017 × 0.058), strength 1.5;
- `offPngByteIdentity`: ring true, fire false (the beach noise).

**Artefacts looked for** (in `cap-ring-off-vs-on-x8.png`, `cap-fire-off-vs-on-x8.png`):
- The ring's changes form a broken arch around the DJ table and through the ground and treehouse bark. The witch's body, the table, the "120 BPM" sign and the HUD are untouched.
- One short streak at about [485,415]–[550,438], on the deck floor below the table, is the only change that low.
- No seams, smearing, edge wrap, or sampling pulled from off-screen were visible. The ring's ellipse is clipped by the frame edge (half-height 0.875): no wrap seen at the edge.
- The fire's change is a few art-pixel shifts within its 33×63 px box; at 960×540 it is very subtle.
- **Not staged:** a creature or the witch crossing the fire's plume, so the fire's foreground guard is unverified.

### Batch 3: combined

- `capturePair(page, sha, …, 'fire', true)` accepted: `potion.wobble` 1, `potion.canopy` 1, one fire form.
- Inside the form box: ON vs OFF 2,521 px (max 56); OFF-return vs OFF 3,493 px (max 81). The per-render noise is larger than the effect here, so this proves composition only, not refraction's exact pixels under potions.
- No black or blank frame. NaN was not directly checked: the shader's NaN markers (`uBroken`) were off.

## SwiftShader cost

| Step | Time |
|---|---|
| Page load to `witch.ready` | 47–103 s (4 pages at once: 85–103 s; 3 at once: 62–73 s; 2 at once: 47–49 s) |
| Each scene's settle + two renders + screenshots | 2.6–11.7 s |
| `capturePair` (3 renders + 3 screenshots) | ring 4.1 s, fire 1.9 s, combined 0.8 s |

Each capture renders exactly 3 frames (OFF, ON, OFF-return) at one frozen world time. Staging drew 1 frame in 10 (1 in 4 around the cast).

## Files

- `*-x8.png`: 8× amplified diffs (frozen pass):
  - `b1a-*` no flag vs `refraction=0`;
  - `b1b-*` candidate vs base;
  - `cap-*-off-vs-on-x8.png` refraction ON vs OFF.
- `raw/<run>/`:
  - `<scene>.png` and `<scene>-again.png` (two renders of one frozen frame);
  - `cap-*/off|on|off-return.png` and `capture.json` (helper output);
  - `meta.json`.
- `raw/log-*.txt`: run logs. `raw/scripts/`: the runner, server and diff scripts.
