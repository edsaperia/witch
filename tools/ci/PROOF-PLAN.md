Proof CI builder plan (inbox #1613)

Base: fe62217eb01bbd92900ec10b9082b7777064eba5. Branch: codex/proof-ci.
Brief read at 01c102be36d58e66be5a04739aa55041be9f4e9b.

Reuse game-dist for candidate. Resolve prototype once and cache its build and successful baseline measurement by exact SHA plus proof/browser fingerprint. Add a PR-only proofs job, preserving release/publish exclusions, fork restrictions and all existing gates. Begin with paused-world, explicitly declared CI-safe. Preserve every assertion, including exact pixel equality; #1612 is separate.

Match smoke Chromium version/install retry. Keep PNG/diff/pixel trace/log artifacts and per-proof failure/timing summaries. Run only source, syntax and nearby tests locally. Demonstrate an intentional regression red and corrected green in authorized CI, then report job wall minutes and proofs exceeding four minutes. No game changes in the final diff.

Accepted amendment (coordinator #1614 comments6561733936/6561781179, 2026-11-01): replace the exact-colour allow-list with at most eight changed pixels, each RGB channel changing by at most32, for same-art repaints. This supersedes the original pixel-equality requirement above. Keep all zero-draw and simulation/phase assertions unchanged. Test two small pixels passing, nine failing, one channel40 failing. Record grass hypothesis only; no game change/diagnostic. Measure complete queue-inclusive timing and same-run critical path before FINAL.

Final split (coordinator6562363630): fast PR mode is pause/Settings zero-draw holds only, no settle/pixels; settled pixel comparisons move to a separate informational03:17UTC/manual nightly workflow, candidate settle bound5min, one standing #1476 failure report. No PR dependency on nightly. Three consecutive same-head fast proof passes plus same-run timing required; one manually dispatched nightly result/duration is informational.

Cost correction6562620628: fast PR mode drops baseline entirely and uses30s pause/10s Settings; nightly retains baseline/60s. Three consecutive fast passes must be on the new final head, proof-only reruns after original workflow completes. Manual nightly dispatch is explicitly skipped under6562421137 until its registration after release.
