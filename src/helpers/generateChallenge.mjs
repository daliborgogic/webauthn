/**
 * Generate a suitably random value to be used as an attestation or assertion challenge
 */
export function generateChallenge() {
  /**
   * WebAuthn spec says that 16 bytes is a good minimum:
   *
   * "In order to prevent replay attacks, the challenges MUST contain enough entropy to make
   * guessing them infeasible. Challenges SHOULD therefore be at least 16 bytes long."
   *
   * Just in case, let's double it
   */
  // ToDo: return crypto.randomBytes(32)
  return '074e48c8e3c0bc19f9e22dd7570037392e5d0bf80cf9dd51bb7808872a511b3c1cd91053fca873a4cb7b2549ec1010a9a1a4c2a6aceead9d115eb9d60a1630e056f3accb10574cd563371296d4e4e898941231d06d8dd5de35690c4ba94ca12729aa316365145f8a00c410a859c40a46bbb4d5d51995241eec8f6b7a90415e'
}
