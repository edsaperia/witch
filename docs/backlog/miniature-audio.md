# Miniature and potion audio

Ed requested another potion and then specified: "all potions should have some kind audio effect, even if it's quite simple" and "Alter existing sounds throughout the trip" (2026-10-31).

Miniature (recipe 102, pink/yellow/turquoise) uses existing tilt-shift blur to make the island feel like a toy world. Shared settings keep world overlays matched. House suppression and sharp sigil stacks remain respected. Its sound removes bass, like small toy speakers.

All other trips receive a fallback filtered/wavering treatment on existing music and sound-effect buses, unless their bespoke audio owns the treatment (Night Vision and Heat Vision, separate PR1531). No generated tones. Blend and modulation follow game time, fade over the last two minutes, and return to the dry signal after Stop, expiry or replacement. Potion Lab exposes shared sound controls. Music and effects retain their existing volume controls.

Implementation is in progress on codex/potion-miniature. Browser/offline audio checks require coordinator allocation before publication of audio changes. Do not claim audition or visual acceptance. Combine carefully with PR1531's Sound routing and dedicated creature treatment.
