# RoCodes hourly collector

This collector runs hourly using GitHub Actions (public repository free-tier eligible). Cloudflare Pages continues to host the statically exported Next.js website and rebuilds after collected data changes.

## Add a permitted source

Edit `data/sources.json` and add a source with this shape:

```json
{
  "sources": [
    {
      "name": "Game developer's authorized code feed",
      "gameId": 2753915549,
      "type": "json",
      "url": "https://official.example.org/roblox-codes.json",
      "allowedHosts": ["official.example.org"],
      "permission": "official-or-authorized",
      "enabled": true
    }
  ]
}
```

The URL above is **only a placeholder**, not a real feed. Do not enable it. Get the actual URL and permission from the game's developer or a source that explicitly licenses syndication. A feed must return JSON like:

```json
{"codes":[{"code":"EXAMPLE123","reward":"Example reward"}]}
```

Only add sources you have permission to poll. Do not bypass anti-bot protections, logins, rate limits or robots.txt. This intentionally does **not** scrape arbitrary third-party articles or republish their prose.

## Status and validation

Every imported code is displayed as **Pending verification**; source publication does not prove that redemption succeeds. Imported records are never automatically labeled active. Old entries remain pending until an editor verifies or removes them. Hourly scheduling is best-effort, not a guaranteed exact-time service. GitHub Actions must be enabled and have permission to write repository contents. When the data file changes, Cloudflare Pages auto-deploys.

The source list starts empty because no authorized live feeds have been supplied. Until you add one, the collector runs but will not import any codes. Do not confuse this with a verified working source.
