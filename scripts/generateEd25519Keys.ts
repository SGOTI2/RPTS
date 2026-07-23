import * as ed from '@noble/ed25519';
import { sha512 } from '@noble/hashes/sha2.js';
import { bytesToHex } from '@noble/hashes/utils.js';
ed.hashes.sha512 = sha512;
import { writeFileSync } from "node:fs";

const { secretKey, publicKey } = ed.keygen();

writeFileSync(
  "private.pem",
  secretKey
);

writeFileSync(
  "src/PUBLIC_KEY.ts",
  `export const PUBLIC_KEY = "${bytesToHex(publicKey)}";\n`
);

console.log("Keys generated!");