// Encrypt workExperiences data
// Usage: bun run scripts/encrypt-resume.ts

import * as crypto from 'node:crypto'
import * as fs from 'node:fs'
import * as path from 'node:path'

const MASTER_KEY = process.env.RESUME_MASTER_KEY
if (!MASTER_KEY) {
  console.error('Error: RESUME_MASTER_KEY environment variable is required')
  console.error('Generate one with: openssl rand -hex 32')
  process.exit(1)
}
const masterKey: string = MASTER_KEY

const plaintextPath = path.join(process.cwd(), 'resume.plaintext.ts')
const legacyPath = path.join(process.cwd(), 'src/data/resume.ts')
const outputPath = path.join(process.cwd(), 'src/data/resume.encrypted.json')

type Project = {
  title: string
  achievements: string[]
  description?: string
  technologies?: string[]
}

type WorkExperience = {
  company: string
  projects: Project[]
}

async function main() {
  let workExperiences: WorkExperience[]

  // Try to load from resume.plaintext.ts first, then fall back to resume.ts
  if (fs.existsSync(plaintextPath)) {
    console.log(`Loading from ${plaintextPath}`)
    const module = await import(plaintextPath)
    workExperiences = module.workExperiences
  } else {
    console.log(
      `${plaintextPath} not found, loading from ${legacyPath} (initial encryption)`
    )
    const module = await import(legacyPath)
    workExperiences = module.workExperiences
  }

  if (!workExperiences || !Array.isArray(workExperiences)) {
    console.error('Error: workExperiences not found or invalid')
    process.exit(1)
  }

  // Extract projects as company -> projects map
  const projectsMap: Record<string, Project[]> = {}
  for (const exp of workExperiences) {
    if (exp.projects && exp.projects.length > 0) {
      projectsMap[exp.company] = exp.projects
    }
  }

  // Encrypt
  const iv = crypto.randomBytes(12)
  const key = Buffer.from(masterKey, 'hex')
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
  const plaintext = JSON.stringify(projectsMap)
  const encrypted = Buffer.concat([
    cipher.update(plaintext, 'utf8'),
    cipher.final(),
  ])
  const tag = cipher.getAuthTag()

  // Combine encrypted data and auth tag (Web Crypto API expects them together)
  const combined = Buffer.concat([encrypted, tag])

  // Output
  const output = {
    iv: iv.toString('base64'),
    ciphertext: combined.toString('base64'),
  }

  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2))
  console.log(`Encrypted projects for ${Object.keys(projectsMap).length} companies`)
  console.log(`Written to ${outputPath}`)
}

main().catch((err) => {
  console.error('Encryption failed:', err)
  process.exit(1)
})
