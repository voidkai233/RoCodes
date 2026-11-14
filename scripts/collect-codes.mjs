import { readFile, writeFile } from 'node:fs/promises';

const sources = JSON.parse(await readFile('data/sources.json', 'utf8')).sources;
const old = JSON.parse(await readFile('data/collected-codes.json', 'utf8'));
const catalogText = await readFile('data/catalog.ts', 'utf8');
const knownIds = new Set([...catalogText.matchAll(/\bid:(\d+),name:/g)].map(m => Number(m[1])));
const output = new Map(old.map(x => [x.gameId + ':' + x.code.toUpperCase(), x]));
const now = new Date().toISOString();
let failures = 0;

for (const source of sources) {
  try {
    if (!source.enabled) continue;
    if (source.type !== 'json' || source.permission !== 'official-or-authorized') throw Error('Source not authorized');
    if (!knownIds.has(Number(source.gameId))) throw Error('Unknown catalog game');
    const url = new URL(source.url);
    if (url.protocol !== 'https:' || url.username || url.password || url.port) throw Error('HTTPS required');
    if (!Array.isArray(source.allowedHosts) || !source.allowedHosts.includes(url.hostname)) throw Error('Host not allowlisted');
    const response = await fetch(url, { headers: { 'User-Agent': 'RoCodesCodeCollector/1.0 (+https://rocodes.pages.dev/contact)' }, signal: AbortSignal.timeout(12000), redirect: 'error' });
    if (!response.ok) throw Error('HTTP ' + response.status);
    const length = Number(response.headers.get('content-length') || 0);
    if (length > 250000) throw Error('Feed too large');
    const raw = await response.text();
    if (raw.length > 250000) throw Error('Feed too large');
    const feed = JSON.parse(raw);
    if (!Array.isArray(feed.codes)) throw Error('Expected {codes:[]} JSON feed');
    for (const item of feed.codes.slice(0, 300)) {
      if (typeof item.code !== 'string' || !/^[A-Za-z0-9_!.-]{3,64}$/.test(item.code)) continue;
      const reward = typeof item.reward === 'string' ? item.reward.slice(0, 180) : 'Reward not specified';
      const key = Number(source.gameId) + ':' + item.code.toUpperCase();
      const previous = output.get(key);
      output.set(key, {
        gameId: Number(source.gameId), code: item.code, reward,
        status: 'pending', firstSeen: previous?.firstSeen || now, lastSeen: now,
        sourceUrl: source.url, sourceName: String(source.name || 'Official source').slice(0, 80)
      });
    }
    console.log('Checked', source.name, 'at', now);
  } catch (error) {
    failures++;
    console.error('Source failed:', source.name, String(error));
  }
}

/** Read only public Roblox game descriptions; treat every extracted string as unverified. */
async function collectRobloxDescriptions() {
  const placeIds = [...knownIds];
  for (const placeId of placeIds) {
    try {
      // Catalog IDs are Roblox place IDs, not universe IDs.
      const lookup = await fetch('https://apis.roblox.com/universes/v1/places/' + placeId + '/universe', {
        signal: AbortSignal.timeout(12000), redirect: 'error',
        headers: { 'User-Agent': 'RoCodes/1.0 (public game metadata)' }
      });
      if (!lookup.ok) throw Error('Universe lookup HTTP ' + lookup.status);
      const universeId = Number((await lookup.json()).universeId);
      if (!Number.isSafeInteger(universeId) || universeId <= 0) throw Error('Invalid universe ID');
      const endpoint = 'https://games.roblox.com/v1/games?universeIds=' + universeId;
      const response = await fetch(endpoint, { signal: AbortSignal.timeout(12000), redirect: 'error',
        headers: { 'User-Agent': 'RoCodes/1.0 (public game metadata)' } });
      if (!response.ok) throw Error('Roblox HTTP ' + response.status);
      const game = (await response.json()).data?.find(g => g.id === universeId);
      if (!game || typeof game.description !== 'string') throw Error('Missing description');
      const lines = game.description.split(/\r?\n/).slice(0, 180);
      let found = 0;
      for (const line of lines) {
        // Only accept explicitly labeled code lines, never random uppercase words or links.
        const match = line.match(/(?:^|\s)(?:code|codes|redeem code|new code)\s*[:：-]\s*[`"'“]?([A-Za-z0-9_!-]{4,40})\b/i);
        if (!match) continue;
        const code = match[1];
        if (/^(none|soon|coming|update|expired|roblox|discord|codes)$/i.test(code)) continue;
        const key = placeId + ':' + code.toUpperCase();
        const previous = output.get(key);
        output.set(key, { gameId: placeId, code, reward: previous?.reward || 'See official game description',
          status: 'pending', firstSeen: previous?.firstSeen || now, lastSeen: now,
          sourceUrl: 'https://www.roblox.com/games/' + placeId,
          sourceName: 'Roblox game description' });
        found++;
      }
      console.log('Official description checked:', placeId, 'candidates:', found);
    } catch (error) {
      // One unavailable game must not stop collection of other games.
      console.warn('Roblox description unavailable:', placeId, String(error));
    }
  }
}

await collectRobloxDescriptions();

const sorted = [...output.values()].sort((a,b) => a.gameId-b.gameId || a.code.localeCompare(b.code));
await writeFile('data/collected-codes.json', JSON.stringify(sorted, null, 2) + '\n');
console.log('Saved', sorted.length, 'unverified candidate codes; failed sources:', failures);
if (failures) process.exitCode = 1;
