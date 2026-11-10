# BloxRadar — deployable Roblox codes + rankings starter

## Run

Node 20+ required.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. Production: `npm run build && npm start`.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Import it into Vercel as a Next.js project.
3. Set `NEXT_PUBLIC_SITE_URL` to the real HTTPS domain.
4. Deploy and attach a custom domain.
5. Replace the placeholder contact details, review legal text, and add original editorial content.

## Important limitations

- **Not a full Roblox-wide leaderboard.** Rankings use a starter set of tracked games in `data/catalog.ts`. Expand via validated Roblox discovery and scheduled ingestion before advertising platform-wide coverage.
- **No verified codes shipped.** This is intentional: do not invent active codes. Add records to `catalog.ts` only after verifying the code with a reliable source, include `verifiedAt` in ISO date format, and keep status updated.
- Game details use Roblox public API endpoints and thumbnail API. Their availability and rate limits may change. When upstream requests fail, the UI shows unavailable rather than fake numbers.
- This starter does not have an editorial CMS, automated code verification, automated global game discovery, historical peak CCU database, consent management platform, or ad approval. Those are separate production tasks.
- Do not insert AdSense code before implementing required privacy/consent controls for your audience. Never encourage ad clicks.
- Test all IDs and API compatibility before public launch; external endpoints are not guaranteed.

## AdSense launch checklist

- Publish at a real domain, add an actual contact email, replace template policies with operator-specific legal policies.
- Add genuinely original game guides and code verification methodology; a thin directory may be rejected.
- Add a consent management platform where required and update privacy policy to reflect advertising partners.
- Apply for AdSense, connect the site, await approval, then install the official ad script and optional `ads.txt` publisher record.
- Monitor Google Search Console, Core Web Vitals, broken pages and indexing.

Roblox trademarks and assets belong to their owners. This site is not affiliated with Roblox Corporation.
