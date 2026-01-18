// Decrypt workExperiences data for editing
// Usage: bun run scripts/decrypt-resume.ts

import * as crypto from 'node:crypto'
import * as fs from 'node:fs'
import * as path from 'node:path'

const MASTER_KEY = process.env.RESUME_MASTER_KEY
if (!MASTER_KEY) {
  console.error('Error: RESUME_MASTER_KEY environment variable is required')
  process.exit(1)
}
const masterKey: string = MASTER_KEY

const encryptedPath = path.join(
  process.cwd(),
  'src/data/resume.encrypted.json'
)
const outputPath = path.join(process.cwd(), 'resume.plaintext.ts')

function main() {
  if (!fs.existsSync(encryptedPath)) {
    console.error(`Error: ${encryptedPath} not found`)
    console.error('Run encrypt-resume.ts first to create the encrypted file')
    process.exit(1)
  }

  // Load encrypted data
  const encrypted = JSON.parse(fs.readFileSync(encryptedPath, 'utf-8'))
  const iv = Buffer.from(encrypted.iv, 'base64')
  const ciphertext = Buffer.from(encrypted.ciphertext, 'base64')

  // Decrypt (AES-256-GCM: last 16 bytes are auth tag)
  const key = Buffer.from(masterKey, 'hex')
  const tag = ciphertext.subarray(-16)
  const encryptedContent = ciphertext.subarray(0, -16)
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
  decipher.setAuthTag(tag)
  const plaintext = Buffer.concat([
    decipher.update(encryptedContent),
    decipher.final(),
  ])
  const workExperiences = JSON.parse(plaintext.toString('utf-8'))

  // Generate TypeScript file
  const output = `// This file is auto-generated. DO NOT commit to git.
import type { WorkExperience } from './src/data/resume'

export const workExperiences: WorkExperience[] = ${JSON.stringify(workExperiences, null, 2)}
`

  fs.writeFileSync(outputPath, output)
  console.log(`Decrypted to ${outputPath}`)
  console.log('Remember: DO NOT commit this file to git!')
}

main()
