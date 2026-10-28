# tools/chart

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `diff.cjs`

Two screenshots compared pixel by pixel: the count that differ, the most any channel differs by, and where.

```
node tools/chart/diff.cjs a.png b.png [diff.png]
```

## `emerge.cjs`

A frame strip of an island rising out of the sea as its land arrives on the chart: opens chart.html on a build in a fresh browser, waits for the first island after home to arrive, then shoots it every EVERY ms of its rise for SECONDS seconds, and lays the…

```
node tools/chart/emerge.cjs [out dir]   DIST=dist WORLD=0 SIZE=960x600 EVERY=120 SECONDS=1.2 CROP=260
```

## `open.cjs`

The sea chart opened from the treehouse's map table, timed: the game loaded on a build, her stood at the map table and E pressed, then from that press: when the chart's first frame shows, when its first island stands, when all of them do, and the long…

```
node tools/chart/open.cjs [out.json]   DIST=dist SEED=123 SECONDS=240 SIZE=1280x720 PROFILE=0 QUERY= FREEZE=0
```

## `profile.cjs`

The sea chart's cost on the page's thread as its islands arrive: opens chart.html on a build with nothing kept, lets the islands come for SECONDS under the sampling profiler, times each `reshape` from outside, and reports the long animation frames, the…

```
node tools/chart/profile.cjs [out dir]   DIST=dist WORLD=0 SECONDS=70 SIZE=960x600
```
