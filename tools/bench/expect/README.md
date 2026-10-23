# Declared bench differences

One file per branch that means to change the game: `tools/bench/expect/<branch>.json` (e.g. `claude/my-branch.json`),
`{ "reason": "...", "frames": { "<scene>": "why" }, "rules": { "<state part>": "why" } }`. See `tools/bench/README.md` and
`tools/bench/expect.cjs`.
