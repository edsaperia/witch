# Miniature and potion audio

**Audit status (2026-11-01): Built in source: Miniature and continuous shared potion audio; audition/visual acceptance is not inferred.**

The status index checks the requests below against prototype `ab06904b` and cited history. **Built** means code is present, not a new play/audition/performance pass. **Partly built** states the missing part. An em dash leaves an unimplemented request unmarked. Versions are verified changelog build labels where available; “unverified” means no first-live number was established. Historical/superseded requests are preserved, not re-authorised. Repeated details/build-order summaries are counted with their feature group, not again.

| Request / feature group | Status | Evidence and remaining gap |
|---|---|---|
| Miniature blur and thin-speaker sound | **Built** | #1536, git db1b05fec; registry102, miniatureTilt and audio route filters; fragment version null, first shipped version unverified. |
| Fallback continuous audio, bespoke exclusions and lifecycle | **Built** | #1536 plus #1531 dedicated Night/Heat Vision routing; music/sfx potion gates, game-clock envelopes and lab settings. First shipped version unverified; no listening claim. |


Ed requested another potion and then specified: "all potions should have some kind audio effect, even if it's quite simple" and "Alter existing sounds throughout the trip" (2026-10-31).

Miniature (recipe 102, pink/yellow/turquoise) uses existing tilt-shift blur to make the island feel like a toy world. Shared settings keep world overlays matched. House suppression and sharp sigil stacks remain respected. Its sound removes bass, like small toy speakers.

All other trips receive a fallback filtered/wavering treatment on existing music and sound-effect buses, unless their bespoke audio owns the treatment (Night Vision and Heat Vision, separate PR1531). No generated tones. Blend and modulation follow game time, fade over the last two minutes, and return to the dry signal after Stop, expiry or replacement. Potion Lab exposes shared sound controls. Music and effects retain their existing volume controls.

Implementation is locally complete on codex/potion-miniature, PR1536. Typecheck and 29 focused tests pass. Browser/offline audio checks require coordinator allocation before publication of audio changes; resume when a COORDINATOR comment grants the exact runner/commit or permits pushing for CI. Do not claim audition or visual acceptance. Combine carefully with PR1531's Sound routing and dedicated creature treatment.
