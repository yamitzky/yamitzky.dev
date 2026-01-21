# Project Overview

Mitsuki Ogasahara's portfolio website.

## Tech Stack

- React
- Tanstack Start
- Vercel

## Common Commands

- `bun add <package>` - Add a new dependency
- `bun dev` - Start development server (note: the user may already have this running in another terminal)
- `bun format` - Run linter and formatter
- `bun typecheck` - Run TypeScript type checking with tsc

# Development Rules

- Always run `bun format` and `bun typecheck` before completing any task
- Ensure both commands pass without errors before considering work done

# Resume Encryption Workflow

The `workExperiences` data in `/resume` is E2E encrypted. Only users with a valid time-limited token can view it.

## Environment Variables

Required in `.env.local` (for local development):
```
RESUME_MASTER_KEY=<32 bytes hex>
RESUME_SIGNING_KEY=<32 bytes hex>
```

Generate keys with: `openssl rand -hex 32`

For Vercel deployment, set the same environment variables in Project Settings > Environment Variables.
These are server-only variables (no `VITE_` prefix), so they won't be exposed to the browser.

## Editing workExperiences

1. Decrypt: `bun run scripts/decrypt-resume.ts`
2. Edit `resume.plaintext.ts`
3. Re-encrypt: `bun run scripts/encrypt-resume.ts`
4. Commit only `src/data/resume.encrypted.json` (never commit `resume.plaintext.ts`)

## Generating Access Tokens

```bash
bun run scripts/generate-token.ts --recipient=company_name --days=7
```

- `--recipient` (required): Identifier for the token recipient (e.g., company name)
- `--days` (optional, default: 7): Token validity period

Share the generated URL: `/resume#token=xxx`

Access logs include the recipient identifier, so leaked tokens can be traced back to their source.
