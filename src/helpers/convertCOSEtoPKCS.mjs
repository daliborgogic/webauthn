import { decodeCborFirst } from './decodeCbor.mjs'

/**
 * Takes COSE-encoded public key and converts it to PKCS key
 */
export function convertCOSEtoPKCS(cosePublicKey) {
  const struct = decodeCborFirst(cosePublicKey)

  const tag = Buffer.from([0x04])
  const x = struct.get(COSEKEYS.x)
  const y = struct.get(COSEKEYS.y)

  if (!x) {
    throw new Error('COSE public key was missing x')
  }

  if (y) {
    return Buffer.concat([tag, x, y])
  }

  return Buffer.concat([tag, x])
}

export const COSEKEYS = {
  kty: 1,
  alg: 3,
  crv: -1,
  x: -2,
  y: -3,
  n: -1,
  e: -2
}

export const COSEKTY = {
  OKP: 1,
  EC2: 2,
  RSA: 3
}

export const COSERSASCHEME = {
  '-3': 'pss-sha256',
  '-39': 'pss-sha512',
  '-38': 'pss-sha384',
  '-65535': 'pkcs1-sha1',
  '-257': 'pkcs1-sha256',
  '-258': 'pkcs1-sha384',
  '-259': 'pkcs1-sha512'
}

// See https://w3c.github.io/webauthn/#sctn-alg-identifier
export const COSECRV = {
  // alg: -7
  1: 'p256',
  // alg: -35
  2: 'p384',
  // alg: -36
  3: 'p521',
  // alg: -8
  6: 'ed25519'
}

export const COSEALGHASH = {
  '-65535': 'sha1',
  '-259': 'sha512',
  '-258': 'sha384',
  '-257': 'sha256',
  '-39': 'sha512',
  '-38': 'sha384',
  '-37': 'sha256',
  '-36': 'sha512',
  '-35': 'sha384',
  '-8': 'sha512',
  '-7': 'sha256'
}
