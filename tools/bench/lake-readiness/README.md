# Lake-readiness preparation

This driver is prepared for PR1855 and the granted **v7461 · f5b9ba7** artifact, never whatever is live later. It has not been run against a browser.

`legacy-probe.cjs` extracts the exact `bootProbe` observer from the existing local `intel-lake-compare.cjs` driver (whole-file SHA256 `ac96c805df97c3dd5b6894901a2d675e22d925822a671987d6e809a9fd7daed2`). It retains that driver's real `linkProgram` call timing and20ms KHR readiness polling. The new metadata wrapper observes submitted shader source/attachments to distinguish the actual ground plain/beach defines; it never substitutes shader source or forces uniform/log reads. Links, shader hashes, actual GPU identity, version, readiness walls, RAF gaps and errors are recorded locally. Public reports contain summaries only.

The measurement has two serial fresh contexts on one owned headless Intel/ANGLE D3D11 browser:

1. Home/world0/seed123, ordinary creator=0: the no-lakes baseline pair, up to70s.
2. Fox/world0/seed424242 with `lakelook=water`: diagnostic full nine-kind lake programs, plain and beach, up to140s. The forced look asks the existing game for its conservative full family; shader defines must prove all nine kinds. No source rewrite, fallback fixture or retry is allowed if the expected family is absent.

Both use960×540, quick art, chart warm/prep off, and ladder off. They measure the target's compilation/readiness in an isolated startup, not travel time or visual equivalence. Each context is fresh; OS/driver caches are not purged, and the baseline is first. Warm-cache and instrumentation effects remain limitations. Missing KHR/Intel identity, wrong version, page errors, missing family or timeout fail the run.

The pinned artifact has no favicon declaration or favicon.ico. The local harness answers only that absent optional request with204; all other missing assets/errors still fail normally. Artifact bytes are unchanged.

The driver ends at230s. The unchanged reviewed kernel watchdog stops its owned job at250s, reserving20s for verified cleanup (270s hard cap), well inside the granted15 minutes. The watchdog, process-identity ledger, handshake and kernel controller are external shared files, checked by their exact reviewed hashes before loading; they are not modified here. Its kernel handle owns descendants; numeric-PID tree killing is never used.

Offline preparation only: `node --test tools/bench/lake-readiness/preflight.test.cjs`; `node --check` each script. These checks start no browser, GPU or watchdog. No game tests changed.

Actual run, only after root reviews READY, posts a serialized allocation, obtains prior-owner FREE and fresh quiet evidence:

`node tools/bench/lake-readiness/run.cjs <private-local-inputs.json> <fresh-allocation.json>`

The private local inputs name artifact directory/ZIP/file-hash manifest, reviewed watchdog directory, installed Playwright module/package, Chromium executable and a new dedicated output directory. Do not put machine paths or raw telemetry on the PR. The launcher validates every artifact/driver/runtime pin before accepting freshness.

Allocation schema: `pr:1855`, `prepHead:<exact git HEAD>`, `targetSha:<full f5b9ba7 SHA>`, `targetVersion:<exact v7461 stamp>`, `slot:<root allocation>`, `priorFree:<actual GitHub FREE-report URL>`, `allocatedAt`, `expiresAt`, `quiet:{at,idleMs,edInUse:false}`. Allocation must be at most60s old, quiet at most15s old with at least60s idle, and enough time must remain for the270s cap. Root must establish quiet from fresh owner evidence; a file template or the old grant is not an allocation.

After validating that allocation, the launcher sets INTEL_SLOT/PRECEDING_RELEASE in its own parent environment for the reviewed watchdog's pre-spawn gate, and in spec.env for the driver. It restores the prior parent values on success or failure. The reviewed shared watchdog remains unchanged.

On a result or failure, inspect both measurement.json and watchdog.json. Claim cleanup only when cleanupVerified and withinCap are true and the kernel job is empty. Post a compact summary then SLOT DONE. No automatic retry, product change, publication, new service or spend is authorized.
