# tools/qa

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `core.cjs`

The QA check of Ed's core design, in the built game in headless Chromium at 1280×720 on a seed, frames stepped by hand, long stretches undrawn.

```
npm run build && node tools/qa/core.cjs [out dir] [seed]   (default previews/core, 123)
```

## `journey.cjs`

The QA journey: the built game in headless Chromium at 1280×720 on a seed, through a whole run's moments, a screenshot each: the bedroom, at the decks, the step-off, the first speaker, the boot, the first countdown, wave one, the treetops, a legend circle,…

```
npm run build && node tools/qa/journey.cjs [out dir] [seed]   (default previews/journey, 123)
```
