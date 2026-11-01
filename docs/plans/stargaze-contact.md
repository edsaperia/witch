# Stargazing contact investigation

Ed's playtest report: “witch lying above the beach instead of on it”, seed 723288, world 1268398697, clock 407.4816666666228, preview source 4a95ed59598a4cef8fed74db9da84b5f88ee19c5 (v6737).

Coordinator approval: PR1545 comment6550525827, 2026-10-31 23:22 UTC. Branch `codex/stargaze-contact`, isolated checkout `work/stargaze-contact`. PR1545 remains frozen; refraction and the shared capture harness retain separate ownership/checkpoints.

1. Offline measurement first: compare the baked contact anchor/body/shadow, sampled terrain and the actual ground triangle interpolation at the saved moment; report each gap in metres. The rules save lacks live GPU buffers, so reconstructed quantities must be labelled and missing render state must not be invented.
2. No laptop browser, heavy local run or new cloud runner without allocation. Lightweight bounded offline geometry and source work are permitted. No new monitor.
3. Only if measured projection explains the defect, isolate the correction to the stargaze batch using the existing ground-plane lie basis, including its anchor. No guessed downward offset. Pin standing/flying/other-party byte identity in focused tests.
4. Push the owned branch with typecheck and nearby tests; coordinator reviews and releases. Required visual/CI/art proof is reported honestly. Report2's dodge ring/spot effects need no change.

Initial saved-state evidence: mode ground, lift 0, stargazing true, no knockout or active potion, camera coast approximately 1/gaze 1/bearing -0.9854623897536978. The current camera spline gives angle 1.781009195073169 degrees, versus the art's default pitch 0.52 radians. This is a diagnostic lead, not a confirmed cause or fix.
