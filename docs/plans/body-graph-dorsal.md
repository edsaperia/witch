# Shared dorsal crest and groove

Authority: coordinator1866#6707769764, 7 November 2026. Missing feature:
DONE in source; canonical image review remains pending. All switches stay OFF.

`art/body-graph/dorsal.js` carries the existing `q.spine` data shape, distinct
from the structural spine guide. A scalar or five named heights are linearly
interpolated at hip(-.5), loin(-.25), waist(0), ribcage(.25), shoulder(.48),
fading to zero over .35 beyond either end. Thirteen samples mount at the
analytic dorsal torso cross-section. Positive heights add crests; negative
heights subtract grooves from their parent torso only. No inward approximate
SDF depth estimate is used.

Existing profiles carry unchanged from boar, cheetah, elk, jaguar, lion,
sphinx, stag, stegosaurus, tiger and wolf. Selected wolf and stag graph
candidates inherit these automatically. Age-specific data takes precedence;
an explicit preset dorsal override takes precedence over inherited data.
Bear has no profile: the pinned de27db515 bear preset remains unchanged.

Each group still has at most three additive smooth-min primitives. Cuts use
max subtraction and stay with the parent group, excluded from the additive
cap so a groove can actually cut the torso. Group IDs remain eight-bit.

Focused tests cover interpolation, end fade, finite heights, inherited data,
precedence, real field subtraction, parent grouping, the additive cap,
wolf/stag integration and bear no-op behavior. Rendered likeness, native-pixel
readability and full art checks remain canonical gates; no local capture is
authorized by this source milestone.
