export function uuidGenerator() {
  const cryptoObj = globalThis.crypto;

  const ts = BigInt(Date.now());
  const bytes = new Uint8Array(16);

  for (let i = 0; i < 6; i++) {
    const shift = BigInt((5 - i) * 8);
    bytes[i] = Number((ts >> shift) & 0xffn);
  }

  const rnd = new Uint8Array(10);
  cryptoObj.getRandomValues(rnd);
  bytes.set(rnd, 6);

  bytes[6] = (bytes[6] & 0x0f) | 0x10;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20, 32),
  ].join("-");
}

