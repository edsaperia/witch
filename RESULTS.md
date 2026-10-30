# House profile results (not for merge)

- Checkout: b15736de4e76f1625a426f49bc339c9c4da4055e (HEAD confirmed), `npm ci` OK.
- Baseline 3ba6bc7297235bb1e383b2405b4da515de4c720c: worktree ../base, `npm ci` and `vite build --sourcemap --manifest` OK (31 s).
- Main build (WITCH_SHA=b15736de4...): OK (28 s).
- Profile run: NOT MEASURED. Exit code 125, wall-clock 0 s.
  Exact error: `timeout: invalid time interval '13m55s'` / `Try 'timeout --help' for more information.`
  (GNU timeout accepts only a number with suffix s/m/h/d, so `13m55s` is rejected.)
  Per instructions the command was not altered, so no summary markdown, no per-configuration max/p99/median and no slowest frames exist. previews/house-profile-b15736de4 was never created.
- Suggested fix for a rerun: `timeout --kill-after=5s 835s ...` (13m55s = 835 s).
