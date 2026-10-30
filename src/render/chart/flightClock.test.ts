import { describe, expect, it } from 'vitest';
import { stepChartFlight, type ChartFlightClock } from './flightClock';

describe('the chart keeps animating until its night is ready', () => {
  it('starts landing grace once at the normal wall-clock end, even when animation dt is clamped', () => {
    let due = 0;
    const f: ChartFlightClock = { t: 2, rate: 0.2, wall: 0, hold: () => true, landingDue: () => due++ };
    stepChartFlight(f, 0.1, 2, 9, 8.9); expect(due).toBe(0);
    stepChartFlight(f, 0.1, 2, 9, 9); expect(due).toBe(1);
    stepChartFlight(f, 0.1, 2, 9, 30); expect(due).toBe(1);
    expect(f.t).toBeLessThan(9); expect(f.wall).toBe(30);
  });
  it('does not hand over to a still when the slowdown cap expires before preparation finishes', () => {
    let ready = false;
    const f: ChartFlightClock = { t: 0, rate: 1, wall: 0, hold: () => !ready, slow: { rate: 0.2, ease: 0.5, cap: 24 } };
    const end = 9;
    let handedOver = false;
    for (let i = 0; i < 600; i++) {
      stepChartFlight(f, 0.1, 2, end);
      if (f.t >= end && !f.held) handedOver = true;
    }
    expect(f.wall).toBeGreaterThan(24);
    expect(f.t).toBe(end); // the cap still lets the camera finish approaching
    expect(handedOver).toBe(false);
    ready = true;
    stepChartFlight(f, 0.1, 2, end);
    expect(f.t >= end && !f.held).toBe(true);
  });

  it('keeps the readiness barrier when the player skips the camera flight', () => {
    let ready = false;
    // SeaChart.skipFlight removes the slowdown and jumps to the final shot.
    const f: ChartFlightClock = { t: 9, rate: 1, wall: 1, hold: () => !ready, slow: undefined, held: false };
    stepChartFlight(f, 0.1, 2, 9);
    expect(f.held).toBe(true);
    ready = true;
    stepChartFlight(f, 0.1, 2, 9);
    expect(f.held).toBe(false);
  });

  it('preserves an ordinary flight with no readiness hold', () => {
    const f: ChartFlightClock = { t: 0, rate: 1, wall: 0 };
    for (let i = 0; i < 100; i++) stepChartFlight(f, 0.1, 2, 9);
    expect(f.t).toBe(9);
    expect(f.held).toBe(false);
  });
});
