// The sea chart's scale, shared by the chart (render/chart/seaChart.ts) and the worker that makes its islands' meshes
// (app/chartOutlines.worker.ts), with no three.js in it.
import { CHART_METRES } from "../../rules/archipelago";

/** The chart's disc: radius 1 on the flat chart is this many units here. */
export const CHART_SCALE = 100;
/** One true scale (hotel, the archipelago, rules/archipelago.ts; Ed, 2026-10-12: "strong fit, moderate straits"): every island at
 *  its real size in metres, CHART_METRES to the disc's radius, its home's middle where the archipelago places it, so neighbouring
 *  coasts follow each other across their straits. Units a metre. */
export const K = CHART_SCALE / CHART_METRES;
/** A sigil's art tiers on the chart (render/chart/seaChart.ts): from how many pixels it spans, drawn how many across; its ink made
 *  with the island off the page (app/chartOutlines.worker.ts), one tier each. */
export const SIGIL_TIERS = [{ from: 0, px: 48 }, { from: 64, px: 128 }, { from: 128, px: 256 }];
