# The Forest Counts — recipe 73

**Audit status (2026-11-01): Built in source: recipe 73 scenery/audio effect; subjective play review remains separate.**

The status index checks the requests below against prototype `ab06904b` and cited history. **Built** means code is present, not a new play/audition/performance pass. **Partly built** states the missing part. An em dash leaves an unimplemented request unmarked. Versions are verified changelog build labels where available; “unverified” means no first-live number was established. Historical/superseded requests are preserved, not re-authorised. Repeated details/build-order summaries are counted with their feature group, not again.

| Request / feature group | Status | Evidence and remaining gap |
|---|---|---|
| Beat-held wind/mist and audio; lab controls; lifecycle | **Built** | #1544, git 358bc79e7 and prototype merge ea42af826. Registry recipe73 implemented; potionCycle/frameUniforms/mist and potion audio hooks present. Changelog version null: first shipped version unverified; no new audition claimed. |


Ed, 2026-10-31: "make a potion". Implement the existing proposal: purple + yellow + green; wind and mist advance in musical steps while the witch and animals remain fluid. Use the real beat clock for sample-and-hold scenery time, and step the existing sound filter on the same beat boundaries. No simulation timing changes, render pass or new sound source. Expose beats per step, scenery clock speed and sound range in the Potion Lab. Full on waking, normal final-two-game-minute fade, replacement and Stop restore ordinary perception.

Depends on PR1536 shared audio at db1b05fec, on top of prototype003eb8cc0. Preserve PR1531's bespoke audio when combining. Coordinator owns CI and releases; Ed judges the effect in play. No laptop browser/audition.

PR1544 implements real beatAt/timeAt sampling (including tempo ramps), a local wind clock, a private mist drift clock, and a four-step filter pattern. The clocks are presentation-only. Existing wind/mist switches stay respected. No extra system or artwork; the effect is intended for Ed's in-game review.
