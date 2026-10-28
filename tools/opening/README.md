# tools/opening

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `bedroom-budget.cjs`

The bedroom's main-thread budget: the built game loaded headless, its long tasks from witch:view on, while the bedroom shows and the island builds.

```
node tools/opening/bedroom-budget.cjs [dist] [throttle] [secs]   (OPENING=1, LIMIT=, OUT=<json>)
```

## `shots.cjs`

The new opening in the built game, a shot per beat into <out dir>: a fresh profile's first load, asleep in the dark while home's night is made, then waking in her bedroom in the treehouse, the pause page's What's new and Options, and the wake-up's beats.

```
node tools/opening/shots.cjs [out dir] (default previews/opening/)
```

## `wake-keys.cjs`

The wake-up's keys beside the bed: a fresh profile's first load, her in bed with her alarm ringing at the house camera, shot on the keyboard and on a pad, and checked: no wake card at the foot of the screen, the keys beside the bed on each side.

```
npm run build && node tools/opening/wake-keys.cjs [out dir]   (DIST=dist; default previews/opening/wake-keys)
```
