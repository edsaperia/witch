Proof CI builder plan (inbox #1613)

Base: fe62217eb01bbd92900ec10b9082b7777064eba5. Branch: codex/proof-ci.
Brief read at 01c102be36d58e66be5a04739aa55041be9f4e9b.

Reuse game-dist for candidate. Resolve prototype once and cache its build and successful baseline measurement by exact SHA plus proof/browser fingerprint. Add a PR-only proofs job, preserving release/publish exclusions, fork restrictions and all existing gates. Begin with paused-world, explicitly declared CI-safe. Preserve every assertion, including exact pixel equality; #1612 is separate.

Match smoke Chromium version/install retry. Keep PNG/diff/pixel trace/log artifacts and per-proof failure/timing summaries. Run only source, syntax and nearby tests locally. Demonstrate an intentional regression red and corrected green in authorized CI, then report job wall minutes and proofs exceeding four minutes. No game changes in the final diff.
