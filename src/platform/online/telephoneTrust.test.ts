import { expect, it } from "vitest";
import { loadTelephoneIdentity, numberForKey, signTelephone } from "./telephoneIdentity";
import { FRIEND_MISMATCH, telephoneTrust } from "./telephoneTrust";
const make = () => loadTelephoneIdentity({ read: async () => null, write: async () => {} });
it("does not admit a world before proof plus explicit agreement, and verifies both directions", async () => {
  const a = await make(), b = await make(), caller = await numberForKey(a.publicKey), answerer = await numberForKey(b.publicKey), challenge = { nonce: "a".repeat(64), caller, answerer };
  const host = telephoneTrust(a, () => null), guest = telephoneTrust(b, () => null);
  const aProof = await host.challenge(challenge, "host", b.publicKey), bProof = await guest.challenge(challenge, "guest", a.publicKey);
  expect(() => host.connected("host", answerer)).toThrow(); expect(() => host.agree()).toThrow();
  expect(await host.proof(bProof)).toBe("new"); expect(await guest.proof(aProof)).toBe("new");
  expect(() => host.connected("host", answerer)).toThrow(); host.agree(); guest.agree();
  expect(host.connected("host", answerer)).toEqual(b.publicKey); expect(guest.connected("guest", caller)).toEqual(a.publicKey);
});
it("a changed holder is rejected against the saved key, and stale signatures cannot reconnect", async () => {
  const a = await make(), oldFriend = await make(), changed = await make(), answerer = await numberForKey(changed.publicKey), caller = await numberForKey(a.publicKey), challenge = { nonce: "b".repeat(64), caller, answerer };
  const pinned = telephoneTrust(a, () => oldFriend.publicKey);
  await expect(pinned.challenge(challenge, "host", changed.publicKey)).rejects.toThrow(FRIEND_MISMATCH);
  const first = telephoneTrust(a, () => changed.publicKey); await first.challenge(challenge, "host", changed.publicKey);
  const stale = await signTelephone(changed, challenge, "guest");
  await first.challenge({ ...challenge, nonce: "c".repeat(64) }, "host", changed.publicKey);
  await expect(first.proof(stale)).rejects.toThrow(FRIEND_MISMATCH);
});

it("a brute-forced seven-digit collision with a different key still fails the saved-friend check", async () => {
  const oldKey = { algorithm: "Ed25519" as const, spki: "MCowBQYDK2VwAyEADV7zdnqg1CPihvUiq-gktcY8RGA6lz4lu0wePSxaWWA" };
  const collision = { algorithm: "Ed25519" as const, spki: "MCowBQYDK2VwAyEA2rEmc1xVhxLG9GJ0oPQkqqGua2klZfhnc9wOTFvqYfI" };
  expect(await numberForKey(oldKey)).toBe("2773510"); expect(await numberForKey(collision)).toBe("2773510");
  let own = await make(); while (await numberForKey(own.publicKey) === "2773510") own = await make();
  const trust = telephoneTrust(own, () => oldKey);
  await expect(trust.challenge({ nonce: "d".repeat(64), caller: await numberForKey(own.publicKey), answerer: "2773510" }, "host", collision)).rejects.toThrow(FRIEND_MISMATCH);
});

it("cancellation during asynchronous signing cannot restore a verified call", async () => {
  const a = await make(), b = await make(), trust = telephoneTrust(a, () => null);
  const signing = trust.challenge({ nonce: "e".repeat(64), caller: await numberForKey(a.publicKey), answerer: await numberForKey(b.publicKey) }, "host", b.publicKey);
  trust.cancel(); await expect(signing).rejects.toThrow("cancelled");
  expect(() => trust.connected("host", "1234567")).toThrow();
});
