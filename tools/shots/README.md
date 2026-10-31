# tools/shots

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `headless.mjs`

Run one caller scenario in a fresh headless Chromium only after recorded canonical slot/FREE/idle/tab evidence; hard cap 270s.

## `pixels.mjs`

Exact decoded screenshot comparisons, masks and review PNGs; no browser or extra package.

## `push.mjs`

Publishing previews to claude/ed-shots safely.

```
node tools/shots/push.mjs <local file>[:<path on the branch>] ... [--to <dir on the branch>] [-m <message>]
```

## `run.mjs`

Run a small scenario in an explicitly allocated bounded headless slot, using a supplied Playwright runtime; never installs/launches without evidence.

```
node tools/shots/run.mjs <scenario.mjs> <url> <full-sha> <output> <slot.json> [playwright-module] [scenario-options.json]
```

## `still.mjs`

Shared still-frame API for a caller-owned allocated page: version, seeded/pinned stepping, warm-up, exact OFF-return and masks.

## Also here

- `headless.test.ts`
- `pixels.test.ts`
- `push.test.ts`
- `scenarios`
- `still.test.ts`
