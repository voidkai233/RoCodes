# RoCodes Cloudflare Pages deployment

This Next.js project is located at the repository root.

Cloudflare Pages settings:
- Production branch: `main`
- Root directory: leave blank (repository root)
- Framework preset: Next.js (Static HTML Export)
- Build command: `npm run build`
- Build output directory: `out`

The project uses `output: 'export'` in `next.config.mjs`. Its rankings are currently static placeholders, not verified live Roblox player counts.

If a deployment log says `package.json` is missing, verify that the build is using the latest `main` commit rather than retrying an old commit.
