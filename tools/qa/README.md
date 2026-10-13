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

## `leash-lake.cjs`

The leash round a lake: the built game in headless Chromium at 1280×720 on Ed's island and seed, her in the treetops on the lake's shore where Ed was, two of the island's animals leashed to her on dry land across the lake, so they travel to her and their…

```
npm run build && node tools/qa/leash-lake.cjs [out dir]   (default previews/leash-lake)
```

## `win-strip.cjs`

A frame strip of the island won early: the built game in headless Chromium at 1280×720 on a seed, a few waves brought on, the wave's pulse partway along its link, then every area still to come cleared at once and the stragglers gone: the victory lap sets…

```
npm run build && node tools/qa/win-strip.cjs [out dir] [seed]   (default previews/win, 7)
```
