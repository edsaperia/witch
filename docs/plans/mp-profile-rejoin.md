# Multiplayer profile and rejoin investigation

Branch `codex/mp-profile-rejoin`, worktree `work/mp-profile-rejoin`, prototype base `74563b9d7`. Brief: COORDINATOR1476#6641468822. Saved-run derived analysis:1476#6641662783. No new browser run is authorized.

Matched profile windows show host3.42/3.34fps, guest2.69/3.57fps. The `mapPrep` bundle name does not identify map generation: its expensive begin/finish/decay/publish methods are effects rendering. Precise counts are once per rendered frame on both pages (host76/72, guest59/77), not a demonstrated guest-only rebuild. Beach generation remains zero. Do not fix an imagined identity-cache fault.

Rejoin: guest requests resume+5.324s and receives resumed+10.332s; host receives peer-resumed+15.443s and attempts state:start+15.503s. No guest checkpoint receipt is retained. Host original later closes1006 and replacement closes1008 `Resume unavailable`. Relay rejection reason is deliberately combined; saved telemetry does not reveal which guard failed. Characterize the source-supported silence-expiry path with an isolated fake-clock relay unit test before proposing a fix; retain20s limits and ticket validation. This cannot establish that the live failure used that path without additional evidence.

Checks: focused unit tests, one worker, and typecheck. No full suite, browser, Render, relay deployment or release. Any measured fix requires a regression; otherwise report the missing evidence and exact next check.

Local characterization: two fake-clock relay cases pass. A bare host transport termination at19999ms preserves the actor and the same correct ticket resumes at20001ms. Silence at20000ms terminates with1006 and releases the room; that same correct ticket then gets1008 `Resume unavailable`. This demonstrates a possible observed code pair without a wrong key; it does not establish the live cause or justify weakening the deadline. No production behavior changed.

The complete69-function call-count comparison and top10 sample tables are summarized on1476#6641662783. PR1819 QUESTION6641692012 asks whether the separately measured shared idle-FX scans should be optimized here; they are not a guest-only map-cache fault. Do not change the FX owner's code before this scope ruling.
