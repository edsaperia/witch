# Effects smoke proof for #1520

- CAND `6ed7f51728ac09f1082d9d2935daf1ff90ad40ad` (codex/coherence-housekeeping): adds draw assertions to the effects-off/effects-on smoke scenes.
- BASE `82e4e24c6886f789fcaa81bdb0c043875324d3d2` (claude/prototype): pictures only, no assertions.
- Each run: `timeout --kill-after=5s 2700s env ONLY=effects-off,effects-on node tools/smoke/smoke.cjs`, on the cloud container's software renderer, one run at a time (2026-10-31 UTC). Both builds ran `npm ci` and `WITCH_SHA=<sha> npx vite build` cleanly.
- Screenshots and the full log of each run are in `<run>/`.

## Table

| run | exit | wall | ok/FAIL lines | 30-ground-effects-off | 31-treetop-effects-off | 30-ground-effects-on | 31-treetop-effects-on |
|---|---|---|---|---|---|---|---|
| cand-1 | 0 | 1611 s | 4 ok, 0 FAIL | drawn | drawn | drawn (debug overlay) | drawn (debug overlay) |
| base-1 | 0 | 631 s | none (base has no assertions) | **black** (only the witch) | **mostly black** (one tree, top left) | drawn (debug overlay) | drawn (debug overlay) |
| cand-2 | 0 | 1645 s | 4 ok, 0 FAIL | drawn | drawn | drawn (debug overlay) | drawn (debug overlay) |
| base-2 | 1 | 641 s | none; TimeoutError in effects-on | drawn | drawn | not taken | not taken |

"drawn" = ground, paths and forest visible. The effects-on frames on both commits have the debug panel and rulers over their top half, but ground, paths and forest are visible beneath them.

## ok/FAIL lines, verbatim

cand-1:
```
ok   effects-off ground: complete forest and nonblank canvas ({"mode":"ground","colours":900,"trees":45,"batches":14,"drawCalls":90})
ok   effects-off treetop: complete forest and nonblank canvas ({"mode":"treetop","colours":417,"trees":1687,"batches":19,"drawCalls":115})
ok   effects-on ground: complete forest and nonblank canvas ({"mode":"ground","colours":751,"trees":84,"batches":16,"drawCalls":101})
ok   effects-on treetop: complete forest and nonblank canvas ({"mode":"treetop","colours":414,"trees":1558,"batches":19,"drawCalls":116})
smoke test passed
```

cand-2:
```
ok   effects-off ground: complete forest and nonblank canvas ({"mode":"ground","colours":849,"trees":54,"batches":14,"drawCalls":99})
ok   effects-off treetop: complete forest and nonblank canvas ({"mode":"treetop","colours":442,"trees":1625,"batches":20,"drawCalls":115})
ok   effects-on ground: complete forest and nonblank canvas ({"mode":"ground","colours":755,"trees":80,"batches":16,"drawCalls":102})
ok   effects-on treetop: complete forest and nonblank canvas ({"mode":"treetop","colours":424,"trees":1582,"batches":19,"drawCalls":116})
smoke test passed
```

base-1: only `shot previews/...` lines for all four shots, then `smoke test passed`.

base-2: `shot previews/30-ground-effects-off.png`, `shot previews/31-treetop-effects-off.png`, then:

## Errors, verbatim

base-2 (effects-on scene, getting off the house: `hold(page, "ArrowDown", 1.5)` in `offHouse`, her clock didn't advance 1.5 s within 240 s):
```
page.waitForFunction: Timeout 240000ms exceeded.
    at hold (/home/user/base/tools/smoke/smoke.cjs:137:16)
    at async offHouse (/home/user/base/tools/smoke/smoke.cjs:147:5)
    at async /home/user/base/tools/smoke/smoke.cjs:345:7
    at async run (/home/user/base/tools/smoke/smoke.cjs:106:5)
    at async main (/home/user/base/tools/smoke/smoke.cjs:343:5) {
  log: [],
  name: 'TimeoutError'
}
```
No CAND run had an error.

## Verdict

1. **CAND passes both times with all frames drawn:** exit 0 twice, 8 of 8 `ok` lines, every screenshot shows ground, paths and forest. Its new assertion never failed.
2. **The new assertion was not seen catching a black frame.** No CAND frame came out black, so these runs only show the assertion passing on good frames. They don't show it failing on a bad one.
3. **BASE reproduced the black pictures and passed anyway:** base-1's effects-off ground is black apart from the witch and its effects-off treetop is mostly black, yet it exited 0. This is the gap CAND's assertions are meant to close.
4. **BASE is flaky in another way too:** base-2 timed out getting her off the house in the effects-on scene (a 240 s hold timeout). That is separate from black frames, and these runs can't say whether CAND is less prone to it.
5. **CAND runs took about 2.5× as long as BASE (≈1630 s against ≈635 s).** These runs don't show why. Both CAND runs stayed under the 2700 s limit, but with less margin.
