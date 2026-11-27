const ids=[2753915549,2440500124,920587237,1686885941,2316994223,994732206,111958650,142823291];
export async function onRequestGet({request}){
 const key=new Request(new URL('/api/rankings',request.url));
 const cache=caches.default;const hit=await cache.match(key);if(hit)return hit;
 const get=async url=>{const r=await fetch(url,{signal:AbortSignal.timeout(8000)});if(!r.ok)throw Error('HTTP '+r.status);return r.json()};
 const pairs=(await Promise.allSettled(ids.map(async id=>({id,universeId:(await get('https://apis.roblox.com/universes/v1/places/'+id+'/universe')).universeId})))).filter(x=>x.status==='fulfilled'&&Number.isSafeInteger(x.value.universeId)).map(x=>x.value);
 try{
 if(!pairs.length)throw Error('No universe IDs available');
 const data=await get('https://games.roblox.com/v1/games?universeIds='+pairs.map(x=>x.universeId).join(','));
 const games=pairs.flatMap(p=>{const g=data.data?.find(x=>x.id===p.universeId);return g&&Number.isSafeInteger(g.playing)&&Number.isSafeInteger(g.visits)?[{id:p.id,playing:g.playing,visits:g.visits}]:[]});
 if(!games.length)throw Error('No player counts available');
 const response=Response.json({games,updated:new Date().toISOString()},{headers:{'Cache-Control':'public, max-age=180'}});
 try{await cache.put(key,response.clone())}catch{}return response;
 }catch{return Response.json({games:[],error:'Roblox data unavailable'},{status:503,headers:{'Cache-Control':'no-store'}})}
}
