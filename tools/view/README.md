# tools/view

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `build-budget.cjs`

The View's island build in slices: the built game loaded headless, the sliced builds' own longest step with the page's long tasks meanwhile, and its start's.

```
node tools/view/build-budget.cjs [dist] [query] [throttle]   (THROTTLE=, LIMIT=, FIRST=, SWAP=, PREP=1, OUT=<json>)
```

## `chart-target.cjs`

Select the requested island before waiting for its outline: selection prioritizes its worker queue.

## `coast-first-use.cjs`

Same live trace/browser: visit the coast after arrival, preserving the original arrival/settle result.

## `landing-limit-preload.cjs`

Explicitly allocated short headless demo only.

## `sail-timing.cjs`

The sail's transition timed: the built game loaded at home, the sea chart opened over the night as the map table opens it, an island chosen and sailed to with Enter, as she does; then the page's own marks from the press: the chart's flight done, the next…

```
npm run build && node tools/view/sail-timing.cjs [out] [dist]
```

## `start-hold.cjs`

The start hold: cold starts of the built game, a fresh browser each, ?creator=0&quick=1&seed=123, the start key pressed by the page itself the moment it's ready.

```
node tools/view/start-hold.cjs [dist] [runs] [out.json]     (NOENTER=1: no key; FENCE=1: the key only once the fence signals;
```

## `travel-failure.cjs`

Small, payload-free evidence retained even when a timing trip never reaches arrival.

## `travel-probe.cjs`

Opt-in browser instrumentation.

## `worker-checkpoint.cjs`

Durable host-side metadata checkpoints survive a later renderer/evaluation stall.
