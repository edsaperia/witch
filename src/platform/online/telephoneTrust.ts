import { numberForKey, samePublicKey, signTelephone, validPublicKey, verifyTelephone, type TelephoneChallenge, type TelephoneIdentity, type TelephonePublicKey } from "./telephoneIdentity";
export const FRIEND_MISMATCH = "That isn't the friend saved under this number.";
/** One call's identity gate. It cannot be reused for a new nonce or pin a key before both ends connect. */
export function telephoneTrust(identity: TelephoneIdentity, pinned: (number: string) => TelephonePublicKey | null) {
  let epoch = 0;
  let current: { challenge: TelephoneChallenge; role: "host" | "guest"; peer: string; key: TelephonePublicKey; known: boolean; proof: boolean; agreed: boolean } | null = null;
  return {
    async challenge(challenge: TelephoneChallenge, role: "host" | "guest", key: TelephonePublicKey): Promise<string> {
      const attempt = ++epoch; current = null;
      if (!validPublicKey(key)) throw new Error("Invalid telephone key");
      const own = role === "host" ? challenge.caller : challenge.answerer, peer = role === "host" ? challenge.answerer : challenge.caller;
      if (await numberForKey(identity.publicKey) !== own || await numberForKey(key) !== peer) throw new Error("The telephone addresses don't match this call.");
      const saved = pinned(peer);
      if (saved && !samePublicKey(saved, key)) throw new Error(FRIEND_MISMATCH);
      const proof = await signTelephone(identity, challenge, role);
      if (epoch !== attempt) throw new Error("The call was cancelled.");
      current = { challenge, role, peer, key, known: !!saved, proof: false, agreed: false };
      return proof;
    },
    async proof(signature: string): Promise<"known" | "new"> {
      const c = current;
      if (!c || !await verifyTelephone(c.key, c.challenge, c.role === "host" ? "guest" : "host", signature) || current !== c) throw new Error(FRIEND_MISMATCH);
      c.proof = true; return c.known ? "known" : "new";
    },
    agree(): void { if (!current?.proof) throw new Error("The call's identity hasn't been checked."); current.agreed = true; },
    connected(role: "host" | "guest", number: string): TelephonePublicKey {
      if (!current?.proof || !current.agreed || current.role !== role || current.peer !== number) throw new Error("The call hasn't been verified by both players.");
      return current.key;
    },
    cancel(): void { epoch++; current = null; },
  };
}
