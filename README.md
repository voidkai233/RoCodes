# RoCodes / BloxRadar — Cloudflare Pages static edition

This build is configured for Cloudflare Pages **Next.js (Static HTML Export)**.

## Cloudflare settings
- Root directory: `/` (upload the contents of this folder to the repository root)
- Production branch: `main`
- Framework preset: `Next.js (Static HTML Export)`
- Build command: `npm run build`
- Output directory: `out`
- Node.js: 22

## Limitations
This version builds as a static website. It includes searchable catalog, category filtering, game pages, and code sections, but **does not provide real-time Roblox player counts or automatic code verification**. Missing data is labeled unavailable. A separate API/data pipeline is required before claiming live rankings. The website is not automatically eligible for AdSense.

To deploy, upload all files and directories from this folder directly into your GitHub repository root. Do not upload the enclosing folder.
