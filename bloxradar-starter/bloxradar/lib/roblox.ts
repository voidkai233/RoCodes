import {catalog} from '../data/catalog';
export type Game={id:number;placeId:number;name:string;playing:number;visits:number;genre:string;description:string;icon:string;updated:string;source:'live'|'unavailable'};
export async function getGames():Promise<Game[]>{
 const ids=catalog.map(x=>x.id);
 try{
 const [r,thumb]=await Promise.all([
 fetch('https://games.roblox.com/v1/games?universeIds='+ids.join(','),{next:{revalidate:180}}),
 fetch('https://thumbnails.roblox.com/v1/games/icons?universeIds='+ids.join(',')+'&size=150x150&format=Png&isCircular=false',{next:{revalidate:3600}})
 ]);
 if(!r.ok)throw Error('Roblox unavailable');
 const data=await r.json();const images=thumb.ok?(await thumb.json()).data||[]:[];
 return (data.data||[]).map((g:any)=>({id:g.id,placeId:g.rootPlaceId,name:g.name,playing:g.playing??0,visits:g.visits??0,genre:catalog.find(x=>x.id===g.id)?.category||g.genre||'Other',description:g.description||'',icon:images.find((i:any)=>i.targetId===g.id)?.imageUrl||'',updated:new Date().toISOString(),source:'live' as const})).sort((a:Game,b:Game)=>b.playing-a.playing);
 }catch{return catalog.map(g=>({id:g.id,placeId:0,name:g.name,playing:0,visits:0,genre:g.category,description:g.description,icon:'',updated:'',source:'unavailable' as const}));}
}
export const formatNumber=(n:number)=>new Intl.NumberFormat('en-US',{notation:'compact',maximumFractionDigits:1}).format(n);
