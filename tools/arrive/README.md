# tools/arrive

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `boot.cjs`

The first load's cost on the page: loads a build fresh, as a first load, the CPU slowed THROTTLE times from the start, and reports when each step came, whether the boot's map came from the worker, and the main thread's long tasks up to `witch:view` and a…

```
node tools/arrive/boot.cjs [out.json]   DIST=dist QUERY=opening=old THROTTLE=1 RUNS=1 SIZE=960x540 AFTER=5
```

## `time.cjs`

Sailing's cost on the new page: opens the sea chart on a build, chooses ISLAND, looks at it LOOK seconds, sails, and on the new page reports the time from the old page leaving to each of its steps, whether its map came from the worker, and its long tasks.

```
node tools/arrive/time.cjs [out.json]   DIST=dist ISLAND=fox WORLD=7 LOOK=4 THROTTLE=1 RUNS=1 SIZE=960x540
```
