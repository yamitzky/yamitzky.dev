import * as crypto from 'node:crypto'
import { createServerFn } from '@tanstack/react-start'
import type { EncryptedProjects } from '@/data/resume'
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

    if (Date.now() > exp * 1000) {
      return null
    }

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

export const unlockResume = createServerFn({ method: 'POST' })
  .inputValidator((data: { token: string }) => data)
  .handler(async ({ data }) => {
    const signingKey = process.env.RESUME_SIGNING_KEY
    const masterKey = process.env.RESUME_MASTER_KEY

    if (!signingKey || !masterKey) {
      throw new Error('Server configuration error')
    }

    const verified = verifyToken(data.token, signingKey)
    if (!verified) {
      throw new Error('Invalid or expired token')
    }

    const projects = decryptWorkExperiences<EncryptedProjects>(
      encryptedData,
      verified.key
    )
    return {
      data: projects,
      exp: verified.exp,
    }
  })
