# Combat movement and mixed teams — #1622

Ed's 2026-11-01 instructions supersede the original experiment: "ship when ready, don't preserve", "do both together", and "Ship an early version before testing with cloud fights."

The early version combines numerical waiting movement, mixed-species team roles, youth weighting and damage withdrawal. Shared paths use radius, period, radial waves/lobes, stretch, heading following, formation offsets and a return envelope before attacks. Locomotion uses speed, cadence/duty/rest speed, stride, lift and turning multipliers. All 64 species have distinct resolved profiles, with deliberate variation among the ten home-island animals. Close passes use range bias and loop-centre displacement; hoppers can feint in and away, chargers can pass in staggered lanes and turn broadly. Movement alone causes no damage.

Teams group fighting youths/adults by side and target, including mixed posse members. Roles are seeded weighted choices among available melee/ranged/special capabilities, capped at one melee, two ranged, one special and four active. Species preferences and youth factors affect choices. Committed attacks finish before damage withdrawal; an all-hurt team retains an attacker to avoid deadlock. Species attack execution and telegraphs remain shared with existing combat. Babies and legends are excluded from team membership; waiting members react to hostile legend telegraph geometry.

Enabled by default, without a public spacing switch. A private tuning override remains for paired cloud measurement. No multiplayer source or game.ts multiplayer branches change. The game.ts integration is its shared spacing call, approved by the coordinator.

Calibration: canonical comment6563804925 supplied 64 species/four-age anatomical ground discs from exact11c301595f6220292ce26eea190fd3c7aa2ce91b, Linux/node v22.22.0, `node tools/combat-spacing/body-radii.mjs body-radii.json`, exit0. Values are adopted verbatim with provenance. These are conservative anatomical ground discs, not damage radii or every animated silhouette.

Before handoff: focused one-worker tests, typecheck and configuration checks, normal merge of current prototype, push own branch and report exact head. Canonical publishes when required non-art CI is green. The builder never publishes or merges protected branches.

After the first release, canonical runs at least20 paired cloud fights, difficulty comparisons (damage, duration, win share and landed attacks), and same-seed clips. CPU: `WITCH_CLOUD_CPU=1 node tools/combat-spacing/run.mjs --fights=20 --seconds=24`. Captures: `WITCH_CLOUD_CPU=1 BASE_URL=https://edsaperia.github.io/witch/pr-1622/ EXPECTED_SHA=FULL_HEAD node tools/combat-spacing/capture.cjs previews/combat-spacing-captures`. Difficulty instrumentation remains follow-up; no measurements or visual acceptance are claimed before returned results. No laptop heavy fights/browser captures.
