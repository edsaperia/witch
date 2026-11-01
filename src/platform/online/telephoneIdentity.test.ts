import { expect, it, vi } from "vitest";
import { loadTelephoneIdentity, numberForKey, signTelephone, verifyTelephone } from "./telephoneIdentity";
const store = () => { let value: unknown; return { read: async () => value, write: async (next: unknown) => { value = next; } }; };
const challenge = { nonce: "a".repeat(64), caller: "1234567", answerer: "7654321" };
it("keeps a non-extractable signing key across loads and a stable public address", async () => {
  const saved = store(), a = await loadTelephoneIdentity(saved), b = await loadTelephoneIdentity(saved);
  expect(a.privateKey.extractable).toBe(false); await expect(crypto.subtle.exportKey("pkcs8", a.privateKey)).rejects.toThrow();
  expect(await numberForKey(a.publicKey)).toBe(await numberForKey(b.publicKey));
  expect(await verifyTelephone(b.publicKey, challenge, "host", await signTelephone(a, challenge, "host"))).toBe(true);
});
it("rejects a different key, changed nonce, reversed roles and malformed proof", async () => {
  const a = await loadTelephoneIdentity(store()), b = await loadTelephoneIdentity(store()), proof = await signTelephone(a, challenge, "host");
  expect(await verifyTelephone(b.publicKey, challenge, "host", proof)).toBe(false);
  expect(await verifyTelephone(a.publicKey, { ...challenge, nonce: "b".repeat(64) }, "host", proof)).toBe(false);
  expect(await verifyTelephone(a.publicKey, challenge, "guest", proof)).toBe(false);
  expect(await verifyTelephone(a.publicKey, challenge, "host", "malformed!")).toBe(false);
});
it("does not silently generate a replacement if saved identity storage is corrupt or refused", async () => {
  await expect(loadTelephoneIdentity({ read: async () => ({}), write: async () => {} })).rejects.toThrow();
  await expect(loadTelephoneIdentity({ read: async () => { throw new Error("unavailable"); }, write: async () => {} })).rejects.toThrow("unavailable");
  await expect(loadTelephoneIdentity({ read: async () => null, write: async () => { throw new Error("write refused"); } })).rejects.toThrow("write refused");
});

it("falls back to a non-extractable P-256 key when Ed25519 generation is unavailable", async () => {
  const generate = vi.spyOn(crypto.subtle, "generateKey").mockRejectedValueOnce(new Error("not supported"));
  try {
    const identity = await loadTelephoneIdentity(store()); expect(identity.publicKey.algorithm).toBe("ECDSA-P256"); expect(identity.privateKey.extractable).toBe(false);
    expect(await verifyTelephone(identity.publicKey, challenge, "guest", await signTelephone(identity, challenge, "guest"))).toBe(true);
  } finally { generate.mockRestore(); }
});
