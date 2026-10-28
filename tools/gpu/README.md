# tools/gpu

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `budget.cjs`

The GPU memory budget measured: the built game in headless Chromium, flown a fixed 1/60 s at a time, the ledger read every 5 s of game time: MB in all and by kind, the budget, the sets let go.

```
npm run build && node tools/gpu/budget.cjs [out dir]   DIST=dist SEED=123 ISLAND=fox ONLY=night,sail,zoo,tight SECS=120 DRAW=4 TIGHT=220 WAIT=300
```
