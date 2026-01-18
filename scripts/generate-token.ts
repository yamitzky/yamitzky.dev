// Generate access token for resume page
// Usage: bun run scripts/generate-token.ts --days=7

import * as crypto from 'node:crypto'

const MASTER_KEY = process.env.RESUME_MASTER_KEY
const SIGNING_KEY = process.env.RESUME_SIGNING_KEY

if (!MASTER_KEY) {
  console.error('Error: RESUME_MASTER_KEY environment variable is required')
  process.exit(1)
}
if (!SIGNING_KEY) {
  console.error('Error: RESUME_SIGNING_KEY environment variable is required')
  process.exit(1)
}

// Parse --days argument
const daysArg = process.argv.find((a) => a.startsWith('--days='))
const days = daysArg ? Number.parseInt(daysArg.split('=')[1], 10) : 7

if (Number.isNaN(days) || days <= 0) {
  console.error('Error: Invalid days value')
  process.exit(1)
}

// Calculate expiration timestamp
const exp = Math.floor(Date.now() / 1000) + days * 24 * 60 * 60
const expDate = new Date(exp * 1000)

// Generate HMAC signature
const sig = crypto
  .createHmac('sha256', SIGNING_KEY)
  .update(MASTER_KEY + exp.toString())
  .digest('hex')

// Create token
const token = { key: MASTER_KEY, exp, sig }
const tokenStr = Buffer.from(JSON.stringify(token)).toString('base64url')

console.log(`Token (valid for ${days} days, until ${expDate.toISOString()}):`)
console.log(tokenStr)
console.log('')
console.log(`URL: /resume#token=${tokenStr}`)
