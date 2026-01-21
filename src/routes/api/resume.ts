import * as crypto from 'node:crypto'
import { createFileRoute } from '@tanstack/react-router'
import encryptedData from '@/data/resume.encrypted.json'

type Token = {
  key: string
  exp: number
  sig: string
}

type EncryptedData = {
  iv: string
  ciphertext: string
}

function base64UrlDecode(str: string): string {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
  const padding = (4 - (base64.length % 4)) % 4
  return Buffer.from(base64 + '='.repeat(padding), 'base64').toString('utf-8')
}

function verifyToken(tokenStr: string, signingKey: string): Token | null {
  try {
    const decoded = JSON.parse(base64UrlDecode(tokenStr))
    const { key, exp, sig } = decoded as Token

    // Check expiration
    if (Date.now() > exp * 1000) {
      return null
    }

    // Verify signature
    const expectedSig = crypto
      .createHmac('sha256', signingKey)
      .update(key + exp.toString())
      .digest('hex')

    if (expectedSig !== sig) {
      return null
    }

    return { key, exp, sig }
  } catch {
    return null
  }
}

function decryptWorkExperiences<T>(
  encrypted: EncryptedData,
  aesKeyHex: string
): T {
  const key = Buffer.from(aesKeyHex, 'hex')
  const iv = Buffer.from(encrypted.iv, 'base64')
  const ciphertext = Buffer.from(encrypted.ciphertext, 'base64')

  // AES-GCM: last 16 bytes are the auth tag
  const authTag = ciphertext.subarray(ciphertext.length - 16)
  const encryptedContent = ciphertext.subarray(0, ciphertext.length - 16)

  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
  decipher.setAuthTag(authTag)

  const decrypted = Buffer.concat([
    decipher.update(encryptedContent),
    decipher.final(),
  ])

  return JSON.parse(decrypted.toString('utf-8'))
}

export const Route = createFileRoute('/api/resume')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const signingKey = process.env.RESUME_SIGNING_KEY
        const masterKey = process.env.RESUME_MASTER_KEY

        if (!signingKey || !masterKey) {
          return Response.json(
            { error: 'Server configuration error' },
            { status: 500 }
          )
        }

        let body: { token?: string }
        try {
          body = await request.json()
        } catch {
          return Response.json(
            { error: 'Invalid request body' },
            { status: 400 }
          )
        }

        const { token } = body
        if (!token || typeof token !== 'string') {
          return Response.json({ error: 'Token is required' }, { status: 400 })
        }

        const verified = verifyToken(token, signingKey)
        if (!verified) {
          return Response.json(
            { error: 'Invalid or expired token' },
            { status: 401 }
          )
        }

        try {
          const data = decryptWorkExperiences(encryptedData, verified.key)
          return Response.json({
            data,
            exp: verified.exp,
          })
        } catch {
          return Response.json({ error: 'Decryption failed' }, { status: 500 })
        }
      },
    },
  },
})
