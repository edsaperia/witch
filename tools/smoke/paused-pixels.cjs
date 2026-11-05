// Coordinator acceptance rule, 2026-11-01, #1614 comment6561733936.
const assert = require('node:assert/strict');
function assertRepaint({ changed, maxChannelChange, bbox }) {
  assert.ok(changed <= 8 && maxChannelChange.every(delta => delta <= 32),
    `unexpected same-version paused pixel difference: ${JSON.stringify({ changedPixels: changed, bbox, maxChannelChangeRGB: maxChannelChange })}`);
}
module.exports = { assertRepaint };
