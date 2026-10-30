/** Transport-independent framing. Payload validation belongs to each message handler. */
export const ONLINE_PROTOCOL = 1;
export interface Envelope {
  protocol: typeof ONLINE_PROTOCOL;
  session: string;
  player: 0 | 1;
  sequence: number;
  payload: unknown;
}

/** One receiver per connection. Never trust a player ID supplied by the peer. */
export function envelopeReceiver(session: string, player: 0 | 1) {
  if (!session) throw new Error("An online session needs an ID");
  let lastSequence = -1;
  return (value: unknown): Envelope | null => {
    if (!value || typeof value !== "object" || Array.isArray(value)) return null;
    const m = value as Record<string, unknown>;
    if (m.protocol !== ONLINE_PROTOCOL || m.session !== session || m.player !== player
      || !Number.isSafeInteger(m.sequence) || (m.sequence as number) < 0
      || (m.sequence as number) <= lastSequence || !Object.hasOwn(m, "payload")) return null;
    lastSequence = m.sequence as number;
    return { protocol: ONLINE_PROTOCOL, session, player, sequence: lastSequence, payload: m.payload };
  };
}
