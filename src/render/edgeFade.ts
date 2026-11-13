// The edges that fade, pinned to the world (Ed, 2026-11-13, choosing from the two follow-ups #1963 "No crawl" left: "6 sounds
// good; scenery should fade rather than pop").
//
// 1. The grass's fade at the edge of her light, and the scenery's dithered fade at the edge of its budget (the quality ladder's
//    far edge: scenery.edgeDither), were ordered dithers fixed to the screen: as the camera moved, each tuft and tree slid under
//    a pattern that stood still, so its pixels blinked on and off. Each thing now carries the pattern with it: the dither's
//    grid starts at the thing's own foot on screen (the pixel its base is snapped to, PIXEL_SNAP_GLSL), so it moves a whole pixel
//    at a time with the thing, and a pixel of it changes only as the fade itself moves over it.
// 2. The scenery's radius follows the frame rate (rules/budget.ts). It came in at 40 m a second over a 40 m fade, so a thing
//    at the edge went in a second and came back when the frames recovered. It now moves at a walking pace (`eased` there), and
//    the string lights, which were cut at half the fade, go out bulb by bulb.
// `?edgefade=old`: all of it as it was, to compare.

/** Whether the link asks for the edges as they were (`?edgefade=old`, to compare). Read once, as the page loads. */
const EDGE_FADE_OLD = typeof location !== "undefined" && new URLSearchParams(location.search).get("edgefade") === "old";
export const edgeFadeOld = (): boolean => EDGE_FADE_OLD;

/** The uniform every edge's shader reads: 1 for the dithers fixed to the screen and the string lights' cut, as before. */
export const EDGE_UNIFORMS = { uEdgeOld: { value: EDGE_FADE_OLD ? 1 : 0 } };

/** In a vertex shader, after its base's clip position `b`: the pixel the thing's foot is snapped to (PIXEL_SNAP_GLSL's own
 *  floor), where its dither's grid starts. Needs uRes. */
export const EDGE_ANCHOR_GLSL = /* glsl */ `
vec2 edgeAnchor(vec4 b) { return floor((b.xy / b.w * 0.5 + 0.5) * uRes); }
`;

/** In a fragment shader: where this pixel is on the dither's grid, from the anchor its vertex shader passed (the same at every
 *  corner, rounded here against the interpolation's last bits): the thing's own pixels, or the screen's as before. */
export const EDGE_GRID_GLSL = /* glsl */ `
uniform float uEdgeOld;
vec2 edgeGrid(vec2 anchor) { return uEdgeOld > 0.5 ? gl_FragCoord.xy : gl_FragCoord.xy - floor(anchor + 0.5); }
`;
