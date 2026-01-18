// E2E Encryption utilities for resume data

export type EncryptedData = {
  iv: string // base64
  ciphertext: string // base64
}

export type Token = {
  key: string // hex形式のAESキー
  exp: number // Unix timestamp
  sig: string // HMAC署名
}

// Utility functions
function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = Number.parseInt(hex.slice(i, i + 2), 16)
  }
  return bytes
}

function base64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

function base64UrlDecode(str: string): string {
  // Replace base64url characters with standard base64
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
  // Add padding if needed
  const padding = (4 - (base64.length % 4)) % 4
  return atob(base64 + '='.repeat(padding))
}

// Verify HMAC signature using Web Crypto API
async function verifySignature(
  key: string,
  exp: number,
  sig: string,
  signingKey: string
): Promise<boolean> {
  const encoder = new TextEncoder()
  const data = encoder.encode(key + exp.toString())
  const keyData = encoder.encode(signingKey)

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const signature = await crypto.subtle.sign('HMAC', cryptoKey, data)
  const expectedSig = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')

  return expectedSig === sig
}

// Verify token (signature and expiration)
export async function verifyToken(
  tokenStr: string,
  signingKey: string
): Promise<Token | null> {
  try {
    const decoded = JSON.parse(base64UrlDecode(tokenStr))
    const { key, exp, sig } = decoded as Token

    // Check expiration
    if (Date.now() > exp * 1000) {
      return null
    }

    // Verify signature
    const isValid = await verifySignature(key, exp, sig, signingKey)
    if (!isValid) {
      return null
    }

    return { key, exp, sig }
  } catch {
    return null
  }
}

// Decrypt workExperiences using AES-256-GCM
export async function decryptWorkExperiences<T>(
  encryptedData: EncryptedData,
  aesKeyHex: string
): Promise<T> {
  const keyData = hexToBytes(aesKeyHex)
  const key = await crypto.subtle.importKey(
    'raw',
    keyData.buffer as ArrayBuffer,
    { name: 'AES-GCM' },
    false,
    ['decrypt']
  )

  const iv = base64ToBytes(encryptedData.iv)
  const ciphertext = base64ToBytes(encryptedData.ciphertext)

  const plaintext = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: iv.buffer as ArrayBuffer },
    key,
    ciphertext.buffer as ArrayBuffer
  )

  return JSON.parse(new TextDecoder().decode(plaintext))
}
