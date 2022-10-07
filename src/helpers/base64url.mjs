import padString from './padString.mjs'

function encode(input, encoding = 'utf8') {
  if (Buffer.isBuffer(input)) {
    return fromBase64(input.toString('base64'))
  }
  return fromBase64(Buffer.from(input, encoding).toString('base64'))
}

function decode(base64url, encoding = 'utf8') {
  return Buffer.from(toBase64(base64url), 'base64').toString(encoding)
}

function toBase64(base64url) {
  // We this to be a string so we can do .replace on it. If it's
  // already a string, this is a noop.
  base64url = base64url.toString()
  return padString(base64url).replace(/\-/g, '+').replace(/_/g, '/')
}

function fromBase64(base64) {
  return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

function toBuffer(base64url) {
  return Buffer.from(toBase64(base64url), 'base64')
}

let base64url = encode

base64url.encode = encode
base64url.decode = decode
base64url.toBase64 = toBase64
base64url.fromBase64 = fromBase64
base64url.toBuffer = toBuffer

export default base64url
