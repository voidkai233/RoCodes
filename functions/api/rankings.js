const places={2753915549:2753915549,2440500124:6516141723,920587237:920587237,1686885941:4924922222,2316994223:6284583030,994732206:735030788,111958650:286090429,142823291:142823291};
export async function onRequestGet({request}){
 const key=new Request(new URL('/api/rankings?v=2',request.url));
 const cache=caches.default;const hit=await cache.match(key);if(hit)return hit;
 const get=async url=>{const r=await fetch(url,{signal:AbortSignal.timeout(8000)});if(!r.ok)throw Error('HTTP '+r.status);return r.json()};
 const pairs=(await Promise.allSettled(Object.entries(places).map(async ([id,placeId])=>({id:Number(id),placeId,universeId:(await get('https://apis.roblox.com/universes/v1/places/'+placeId+'/universe')).universeId})))).filter(x=>x.status==='fulfilled'&&Number.isSafeInteger(x.value.universeId)).map(x=>x.value);
 try{
 if(!pairs.length)throw Error('No universe IDs available');
 const data=await get('https://games.roblox.com/v1/games?universeIds='+pairs.map(x=>x.universeId).join(','));
 const icons=await get('https://thumbnails.roblox.com/v1/games/icons?universeIds='+pairs.map(x=>x.universeId).join(',')+'&size=150x150&format=Png&isCircular=false').catch(()=>({data:[]}));
 const games=pairs.flatMap(p=>{const g=data.data?.find(x=>x.id===p.universeId);return g&&g.rootPlaceId===p.placeId&&Number.isSafeInteger(g.playing)&&Number.isSafeInteger(g.visits)?[{id:p.id,playing:g.playing,visits:g.visits,icon:icons.data?.find(x=>x.targetId===p.universeId&&x.state==='Completed')?.imageUrl||''}]:[]});
 if(!games.length)throw Error('No player counts available');
 const response=Response.json({games,updated:new Date().toISOString()},{headers:{'Cache-Control':'public, max-age=180'}});
 try{await cache.put(key,response.clone())}catch{}return response;
 }catch{return Response.json({games:[],error:'Roblox data unavailable'},{status:503,headers:{'Cache-Control':'no-store'}})}
}
