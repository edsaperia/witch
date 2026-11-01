/** Public telephone addresses are short; identity is a signing key, never the address itself. */
export interface TelephonePublicKey { algorithm: "Ed25519" | "ECDSA-P256"; spki: string }
export interface TelephoneIdentity { publicKey: TelephonePublicKey; privateKey: CryptoKey }
export interface TelephoneChallenge { nonce: string; caller: string; answerer: string }
export interface IdentityStore { read(): Promise<unknown>; write(identity: TelephoneIdentity): Promise<void> }
const bytes = (text: string) => new TextEncoder().encode(text);
const encode = (value: ArrayBuffer) => btoa(String.fromCharCode(...new Uint8Array(value))).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
const decode = (value: string) => {
  if (!/^[A-Za-z0-9_-]{1,512}$/.test(value)) throw new Error("Invalid telephone proof");
  const raw = atob(value.replace(/-/g, "+").replace(/_/g, "/")); return Uint8Array.from(raw, c => c.charCodeAt(0));
};
export const validPublicKey = (key: unknown): key is TelephonePublicKey => {
  if (!key || typeof key !== "object") return false;
  const k = key as TelephonePublicKey;
  return ["Ed25519", "ECDSA-P256"].includes(k.algorithm) && typeof k.spki === "string" && /^[A-Za-z0-9_-]{1,512}$/.test(k.spki);
};
export const publicKeyText = (key: TelephonePublicKey) => `${key.algorithm}:${key.spki}`;
export const samePublicKey = (a: TelephonePublicKey, b: TelephonePublicKey) => publicKeyText(a) === publicKeyText(b);
const algorithm = (key: TelephonePublicKey) => key.algorithm === "Ed25519" ? { name: "Ed25519" } : { name: "ECDSA", namedCurve: "P-256", hash: "SHA-256" };

export async function numberForKey(key: TelephonePublicKey): Promise<string> {
  if (!validPublicKey(key)) throw new Error("Invalid telephone key");
  const digest = await crypto.subtle.digest("SHA-256", bytes(publicKeyText(key)));
  const hex = [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, "0")).join("");
  return String(1000000 + Number(BigInt(`0x${hex}`) % 9000000n));
}
export function challengeText(challenge: TelephoneChallenge, role: "host" | "guest"): string {
  if (!challenge || !/^[a-f0-9]{64}$/.test(challenge.nonce) || !/^[1-9][0-9]{6}$/.test(challenge.caller) || !/^[1-9][0-9]{6}$/.test(challenge.answerer) || challenge.caller === challenge.answerer) throw new Error("Invalid telephone challenge");
  return JSON.stringify(["witch-telephone-identity-v1", challenge.nonce, challenge.caller, challenge.answerer, role]);
}
export async function signTelephone(identity: TelephoneIdentity, challenge: TelephoneChallenge, role: "host" | "guest"): Promise<string> {
  return encode(await crypto.subtle.sign(algorithm(identity.publicKey), identity.privateKey, bytes(challengeText(challenge, role))));
}
export async function verifyTelephone(key: TelephonePublicKey, challenge: TelephoneChallenge, role: "host" | "guest", signature: string): Promise<boolean> {
  try {
    if (!validPublicKey(key)) return false;
    const imported = await crypto.subtle.importKey("spki", decode(key.spki), algorithm(key), false, ["verify"]);
    return await crypto.subtle.verify(algorithm(key), imported, decode(signature), bytes(challengeText(challenge, role)));
  } catch { return false; }
}
async function generateIdentity(): Promise<TelephoneIdentity> {
  let pair: CryptoKeyPair, kind: TelephonePublicKey["algorithm"] = "Ed25519";
  try { pair = await crypto.subtle.generateKey({ name: "Ed25519" }, false, ["sign", "verify"]) as CryptoKeyPair; }
  catch { kind = "ECDSA-P256"; pair = await crypto.subtle.generateKey({ name: "ECDSA", namedCurve: "P-256" }, false, ["sign", "verify"]) as CryptoKeyPair; }
  return { publicKey: { algorithm: kind, spki: encode(await crypto.subtle.exportKey("spki", pair.publicKey)) }, privateKey: pair.privateKey };
}
/** Refuse broken storage rather than silently changing a friend's identity. Private keys are never exported. */
export async function loadTelephoneIdentity(store: IdentityStore): Promise<TelephoneIdentity> {
  const stored = await store.read();
  if (stored === undefined || stored === null) { const identity = await generateIdentity(); await store.write(identity); return identity; }
  const identity = stored as TelephoneIdentity;
  if (!validPublicKey(identity.publicKey) || !identity.privateKey || identity.privateKey.type !== "private" || identity.privateKey.extractable) throw new Error("The browser couldn't restore this telephone's identity.");
  const challenge = { nonce: [...crypto.getRandomValues(new Uint8Array(32))].map(b => b.toString(16).padStart(2, "0")).join(""), caller: "1000000", answerer: "1000001" };
  if (!await verifyTelephone(identity.publicKey, challenge, "host", await signTelephone(identity, challenge, "host"))) throw new Error("The telephone's saved keys don't match.");
  return identity;
}

export function browserTelephoneIdentityStore(factory: IDBFactory = indexedDB): IdentityStore {
  let opened: Promise<IDBDatabase> | null = null;
  const db = () => opened ??= new Promise((resolve, reject) => {
    const request = factory.open("witch.telephone.identity", 1);
    request.onupgradeneeded = () => request.result.createObjectStore("identity");
    request.onerror = () => reject(new Error("The browser couldn't open telephone identity storage."));
    request.onblocked = () => reject(new Error("Telephone identity storage is busy in another tab."));
    request.onsuccess = () => { const database = request.result; database.onversionchange = () => { database.close(); opened = null; }; resolve(database); };
  });
  const run = async (write: boolean, identity?: TelephoneIdentity): Promise<unknown> => {
    const database = await db();
    return new Promise((resolve, reject) => {
      const tx = database.transaction("identity", write ? "readwrite" : "readonly"), object = tx.objectStore("identity");
      // Add, not put: two tabs racing to initialise cannot overwrite the winner's key.
      const request = write ? object.add(identity, "self") : object.get("self");
      tx.oncomplete = () => resolve(request.result);
      tx.onerror = tx.onabort = () => reject(new Error("The browser couldn't save the telephone identity. Keep this page open and try again."));
    });
  };
  return { read: () => run(false), write: async identity => { await run(true, identity); } };
}
