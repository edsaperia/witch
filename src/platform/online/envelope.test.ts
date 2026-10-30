import { describe, expect, it } from "vitest";
import { envelopeReceiver, ONLINE_PROTOCOL } from "./envelope";

const packet = (sequence = 0) => ({ protocol: ONLINE_PROTOCOL, session: "night-a", player: 1, sequence, payload: { moveX: 1 } });

describe("online connection envelopes", () => {
  it("accepts serialized messages once and drops reordered older messages", () => {
    const receive = envelopeReceiver("night-a", 1);
    expect(receive(JSON.parse(JSON.stringify(packet(2))))?.sequence).toBe(2);
    expect(receive(packet(2))).toBeNull();
    expect(receive(packet(1))).toBeNull();
    expect(receive(packet(3))?.sequence).toBe(3);
  });

  it("binds authority to the session and connection, without consuming a rejected sequence", () => {
    const receive = envelopeReceiver("night-a", 1);
    for (const patch of [{ session: "night-b" }, { player: 0 }, { protocol: 2 }]) {
      expect(receive({ ...packet(100), ...patch })).toBeNull();
    }
    expect(receive(packet())?.player).toBe(1);
  });

  it("rejects malformed framing and unsafe sequence values", () => {
    const receive = envelopeReceiver("night-a", 1);
    for (const value of [null, [], "message", {}, ...[-1, 0.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1, "0"].map(sequence => ({ ...packet(), sequence }))]) {
      expect(receive(value)).toBeNull();
    }
    const { payload: _payload, ...missing } = packet();
    expect(receive(missing)).toBeNull();
    expect(receive(packet())?.sequence).toBe(0);
  });

  it("keeps independent connections independent", () => {
    const host = envelopeReceiver("night-a", 0), guest = envelopeReceiver("night-a", 1);
    expect(guest(packet(10))).not.toBeNull();
    expect(host({ ...packet(), player: 0 })?.sequence).toBe(0);
    expect(() => envelopeReceiver("", 1)).toThrow();
  });
});
